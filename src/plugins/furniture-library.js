import el from '../common/dom-el.js'
import createTabUi from './common/create-tab-ui.js'
import pickPointOnGroundPlane from './common/pick-point-on-ground-plane.js'

// internals

var PRESET_SEARCH = 'shelf'

var isInitialized = false
var tab
var searchResultsEl
var dropPlaneEl
var searchInputEl


function search (value) {

  io3d.furniture
    .search(value, {limit: 50})
    // ... and update view when ready
    .then(updateSearchResultsUi)
    // ... or catch errors
    .catch(function (error) {
      console.error(error)
      io3d.utils.message.error('Sorry, something went wrong:\n\n' + JSON.stringify(error, null, 2))
    })

}

function updateSearchResultsUi (items) {

  searchResultsEl.empty()

  if (!items.length) searchResultsEl.text('0 results')
  
  items.forEach(function(item){

    var itemEl = el('<div>', { class: 'furniture-search-result-item' }).appendTo(searchResultsEl)
    itemEl.setAttribute('draggable', true)

    el('<img>',{ src: item.indexImage }).appendTo(itemEl)

    itemEl.addEventListener('dragstart', function onFurnitureItemDragStart(e) {
      if (e.stopPropagation) e.stopPropagation() // stops the browser from redirecting.
      fadeInDropPlane()
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', item.id)
      return false
    }, false)

    itemEl.addEventListener('dragend', function onFurnitureItemDragEnd(e) {
      if (e.stopPropagation) e.stopPropagation() // stops the browser from redirecting.
      fadeOutDropPlane()
      return false
    }, false)

  })

}

function createUI () {

  var mainEl = el('<div>', {
    id: 'io3d-inspector-plugins___furniture-library___main-el'
  }).appendTo(document.body)

  tab = createTabUi()

  var headerEl = el('<div>', {
    id: 'io3d-inspector-plugins___furniture-library___header',
  }).appendTo(tab.el)

  el('<div>', {
    id: 'io3d-inspector-plugins___furniture-library___title',
    html: 'Furniture Library'
  }).appendTo(headerEl)

  el('<div>', {
    id: 'io3d-inspector-plugins___furniture-library___close-button',
    //text: 'X',
    click: hide
  }).appendTo(headerEl)

  searchInputEl = el('<input>', {
    id: 'io3d-inspector-plugins___furniture-library___search-input',
    value: PRESET_SEARCH
  }).appendTo(headerEl)
  searchInputEl.addEventListener('change', function () {
    search(searchInputEl.value)
  })

  el('<div>', {
    id: 'io3d-inspector-plugins___furniture-library___search-icon',
  }).appendTo(headerEl)

  var searchResultsContainerEl = el('<div>', {
    id: 'io3d-inspector-plugins___furniture-library___search-results-container',
  }).appendTo(tab.el)

  var searchResultsInfoEl = el('<div>', {
    id: 'io3d-inspector-plugins___furniture-library___search-results-info',
  }).appendTo(searchResultsContainerEl)

  searchResultsEl = el('<div>', {
    id: 'io3d-inspector-plugins___furniture-library___search-results',
  }).appendTo(searchResultsContainerEl)

  dropPlaneEl = el('<div>', {
    id: 'io3d-inspector-plugins___furniture-library___drop-plane',
    style: 'display: none;'
  }).appendTo(document.body)
  dropPlaneEl.addEventListener('dragover', onFurnitureItemDragOver, false)
  dropPlaneEl.addEventListener('drop', onFurnitureItemDrop, false)

  var dropPlaneInfoEl = el('<div>', {
    id: 'io3d-inspector-plugins___furniture-library___drop-plane-info',
    text: 'drop here'
  }).appendTo(dropPlaneEl)

  search(PRESET_SEARCH)

  isInitialized = true

}

function onFurnitureItemDragOver(e) {

  if (e.preventDefault) e.preventDefault() // Necessary. Allows us to drop.

  e.dataTransfer.dropEffect = 'move'  // See the section on the DataTransfer object.

  return false

}

function onFurnitureItemDrop (e) {

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

  // get furnitureId
  var furnitureId = e.dataTransfer.getData('text/plain')

  // add new entity to scene
  var newEntity = document.createElement('a-entity')
  newEntity.setAttribute('io3d-furniture', 'id', furnitureId)
  newEntity.setAttribute('position', position.x + ' 0 ' + position.z)
  document.querySelector('a-scene').appendChild(newEntity)

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
      searchInputEl.focus()
      searchInputEl.selectionStart = 10000
      searchInputEl.selectionEnd = 10000
    }, 10)
    if (typeof callback === 'function') callback()
  })
  return furnitureLibraryPlugin
}

function hide (callback) {
  tab.slideOut(callback)
  return furnitureLibraryPlugin
}

// expose API

var furnitureLibraryPlugin = {
  show: show,
  hide: hide
}

export default furnitureLibraryPlugin