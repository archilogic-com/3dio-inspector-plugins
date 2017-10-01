import el from '../../common/dom-el.js'
import createTabUi from './create-tab-ui.js'
import pickPointOnGroundPlane from './pick-point-on-ground-plane.js'
import getCenteredImageLayout from './get-centered-image-layout.js'

// internals

function createListTabUi (args) {

  // API

  var title = args.title
  var onSearchChangeCallback = args.onSearchChange
  var onSearchInputCallback = args.onSearchInput
  var onItemDropCallback = args.onItemDrop
  var onHide = args.onHide

  // internals

  var isInitialized = false
  var tab
  var listInfoEl
  var listItemContainerEl
  var dropPlaneEl
  var searchInputEl

  var scope = {
    setInfo: setInfo,
    setList: setList,
    getSearchValue: getSearchValue,
    setSearchValue: setSearchValue,
    init: init,
    show: show,
    hide: hide
  }

  // methods

  function getSearchValue (val) {

    return searchInputEl.value

  }

  function setSearchValue (val) {

    searchInputEl.value = val

  }

  function setInfo (el) {

    listInfoEl.empty()

    if (el) {
      listInfoEl.append(el).show()
    } else {
      listInfoEl.hide()
    }

  }

  function setList (items) {

    listItemContainerEl.empty()
    if (items) items.forEach(function (item) {

      var itemEl = el('<div>', {class: 'io3d-inspector-plugins___list-item'}).appendTo(listItemContainerEl)
      itemEl.setAttribute('draggable', true)

      if (item.thumb) {
        var img = el('<img>').appendTo(itemEl)
        img.addEventListener('load', function () {

          // center image filling container div
          var layout = getCenteredImageLayout({
            originalWidth: img.width,
            originalHeight: img.height,
            maxWidth: 90,
            maxHeight: 90
          })
          img.style.top = (layout.top + 3) + 'px'
          img.style.left = (layout.left + 3) + 'px'
          img.style.width = (layout.width + 3) + 'px'
          img.style.height = (layout.height + 3) + 'px'

          img.style.opacity = 1
          itemEl.style.borderColor = 'transparent'

        })
        img.src = item.thumb
      }

      itemEl.addEventListener('dragstart', function onItemDragStart (e) {
        if (e.stopPropagation) e.stopPropagation() // stops the browser from redirecting.
        fadeInDropPlane()
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', JSON.stringify(item))
        return false
      }, false)

      itemEl.addEventListener('dragend', function onItemDragEnd (e) {
        if (e.stopPropagation) e.stopPropagation() // stops the browser from redirecting.
        fadeOutDropPlane()
        return false
      }, false)

    })

  }

  function init () {

    tab = createTabUi()

    var headerEl = el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___header',
    }).appendTo(tab.el)

    el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___title',
      html: title
    }).appendTo(headerEl)

    el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___close-button',
      click: hide
    }).appendTo(headerEl)

    var listContainerEl = el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___list-container',
    }).appendTo(tab.el)

    listInfoEl = el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___list-info',
    }).appendTo(listContainerEl)

    listItemContainerEl = el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___list-item-container',
    }).appendTo(listContainerEl)

    dropPlaneEl = el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___drop-plane',
      style: 'display: none;'
    }).appendTo(document.body)
    dropPlaneEl.addEventListener('dragover', onItemDragOver, false)
    dropPlaneEl.addEventListener('drop', onItemDrop, false)
    
    if (onSearchInputCallback || onSearchChangeCallback) {

      // add search bar
      
      searchInputEl = el('<input>', {
        id: 'io3d-inspector-plugins___list-tab___search-input',
        placeholder: 'Search...'
      }).appendTo(headerEl)

      if (onSearchChangeCallback) searchInputEl.addEventListener('change', function () {
        onSearchChangeCallback(searchInputEl.value)
      })

      if (onSearchInputCallback) searchInputEl.addEventListener('input', function () {
        onSearchInputCallback(searchInputEl.value)
      })

      el('<div>', {
        id: 'io3d-inspector-plugins___list-tab___search-icon',
      }).appendTo(headerEl)

      headerEl.style.height = listContainerEl.style.top = '68px'

    } else {

      // no search bar

      headerEl.style.height = listContainerEl.style.top = '37px'

    }

    // overlay plane for drag and drop
    
    el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___drop-plane-info',
      text: 'drop here'
    }).appendTo(dropPlaneEl)

    isInitialized = true

  }

  function onItemDragOver (e) {

    if (e.preventDefault) e.preventDefault() // Necessary. Allows us to drop.

    e.dataTransfer.dropEffect = 'move'  // See the section on the DataTransfer object.

    return false

  }

  function onItemDrop (e) {

    if (e.preventDefault) e.preventDefault() // stops the browser from redirecting.
    if (e.stopPropagation) e.stopPropagation() // stops the browser from redirecting.

    // hide dropPlaneEl
    fadeOutDropPlane()

    // get picking point
    var position = pickPointOnGroundPlane({
      x: e.x,
      y: e.y,
      canvas: AFRAME.scenes[0].canvas,
      camera: AFRAME.INSPECTOR.EDITOR_CAMERA
    })

    // get item data
    var item = JSON.parse(e.dataTransfer.getData('text/plain'))

    onItemDropCallback(item, position)

    return false
  }

  function fadeInDropPlane () {
    dropPlaneEl.style.display = 'block'
    setTimeout(function () {
      dropPlaneEl.style.opacity = 1
    }, 50)
  }

  function fadeOutDropPlane () {
    dropPlaneEl.style.opacity = 0
    setTimeout(function () {
      dropPlaneEl.style.display = 'none'
    }, 300)
  }

  function show (callback, animate) {
    if (!isInitialized) init()
    tab.slideIn(function () {

      if (searchInputEl) {
        setTimeout(function () {
          searchInputEl.focus()
          searchInputEl.selectionStart = 10000
          searchInputEl.selectionEnd = 10000
        }, 50)
      }

      if (typeof callback === 'function') callback()
    }, animate)
  }

  function hide (callback, animate) {
    if (typeof onHide === 'function') onHide()
    tab.slideOut(callback, animate)
  }

// expose API

  return scope

}

export default createListTabUi