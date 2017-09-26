import el from '../../common/dom-el.js'
import createTabUi from './create-tab-ui.js'
import pickPointOnGroundPlane from './pick-point-on-ground-plane.js'

// internals

function createListTabUi (args) {

  // API

  var title = args.title
  var listInfo = args.listInfo
  var emptyList = args.emptyList || '0 results'
  var onSearchInputCallback = args.onSearchInput
  var onItemDropCallback = args.onItemDrop

  // internals

  var isInitialized = false
  var tab
  var listEl
  var dropPlaneEl

  var scope = {
    updateList: updateList,
    show: show,
    hide: hide,
    searchInputEl: null
  }

  // methods

  function updateList (items) {

    listEl.empty()

    if (!items.length) {
      var emptyEl =  el('<div>', {
        id: 'io3d-inspector-plugins___list-tab___list__info',
      }).appendTo(listEl)
      emptyEl.append(emptyList)
      return
    }

    if (listInfo) {
      var listInfoEl = el('<div>', {
        id: 'io3d-inspector-plugins___list-tab___list___info',
      }).appendTo(listEl)
      listInfoEl.append(listInfo)
    }

    items.forEach(function(item){

      var itemEl = el('<div>', { class: 'io3d-inspector-plugins___list-item' }).appendTo(listEl)
      itemEl.setAttribute('draggable', true)

      var img = el('<img>').appendTo(itemEl)
      img.addEventListener('load', function (){
        var ratio = img.width / img.height
        if (ratio>1) {
          // landscape
          img.style.top = ((90 - 90 / ratio) / 2) + 'px'
          img.style.height = (90 / ratio) + 'px'
          img.style.width = '90px'
        } else {
          // portrait
          img.style.left = ((90 - 90 * ratio) / 2) + 'px'
          img.style.width = (90 * ratio) + 'px'
          img.style.height = '90px'
        }
        img.style.opacity = 1
        itemEl.style.borderColor = 'transparent'
      })
      img.src = item.indexImage

      itemEl.addEventListener('dragstart', function onItemDragStart(e) {
        if (e.stopPropagation) e.stopPropagation() // stops the browser from redirecting.
        fadeInDropPlane()
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', JSON.stringify(item))
        return false
      }, false)

      itemEl.addEventListener('dragend', function onItemDragEnd(e) {
        if (e.stopPropagation) e.stopPropagation() // stops the browser from redirecting.
        fadeOutDropPlane()
        return false
      }, false)

    })

  }

  function createUI () {

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

    scope.searchInputEl = el('<input>', {
      id: 'io3d-inspector-plugins___list-tab___search-input',
      placeholder: 'Search...'
    }).appendTo(headerEl)
    scope.searchInputEl.addEventListener('change', function () {
      onSearchInputCallback(scope.searchInputEl.value)
    })

    el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___search-icon',
    }).appendTo(headerEl)

    var listContainerEl = el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___list-container',
    }).appendTo(tab.el)

    listEl = el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___list',
    }).appendTo(listContainerEl)

    dropPlaneEl = el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___drop-plane',
      style: 'display: none;'
    }).appendTo(document.body)
    dropPlaneEl.addEventListener('dragover', onItemDragOver, false)
    dropPlaneEl.addEventListener('drop', onItemDrop, false)

    el('<div>', {
      id: 'io3d-inspector-plugins___list-tab___drop-plane-info',
      text: 'drop here'
    }).appendTo(dropPlaneEl)

    isInitialized = true

  }

  function onItemDragOver(e) {

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
    setTimeout(function(){
      dropPlaneEl.style.opacity = 1
    }, 50)
  }

  function fadeOutDropPlane () {
    dropPlaneEl.style.opacity = 0
    setTimeout(function(){
      dropPlaneEl.style.display = 'none'
    }, 300)
  }

  function show (callback) {
    if (!isInitialized) createUI()
    tab.slideIn(function(){
      setTimeout(function(){
        scope.searchInputEl.focus()
        scope.searchInputEl.selectionStart = 10000
        scope.searchInputEl.selectionEnd = 10000
      }, 50)
      if (typeof callback === 'function') callback()
    })
  }

  function hide (callback) {
    tab.slideOut(callback)
  }

// expose API

  return scope

}

export default createListTabUi