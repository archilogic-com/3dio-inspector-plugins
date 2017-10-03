import el from '../common/dom-el.js'

var isInitialized = false
var isVisible = false
var mainUiEl

// methods

function init () {

  if (isInitialized) return
  isInitialized = true

  createUi()

}

/**
 * @param selected - THREE.Object3D or DOM query string selector referencing A-Frame element
 */

function bakeLightmaps (object3D) {

  if (!object3D) {
    io3d.utils.ui.message.error('Please select a group or a single object.')
    return
  }

  // in case input is a query selector
  if (typeof object3D === 'string' && object3D[0] === '#') {
    object3D = document.querySelector(object3D).object3D
  }

  // run

  var timestamp, previousTimestamp = Date.now()

  function getDuration () {
    timestamp = Date.now()
    var duration = timestamp - previousTimestamp
    previousTimestamp = timestamp
    return Math.round(duration / 1000) + 's'
  }

  var uiMessage = io3d.utils.ui.message('Light map baking in progress...', 0)

  io3d.storage.importThreeObject(object3D).then(function (storageId) {

    console.log('Imported model to storage: ' + getDuration())
    console.log('Imported file: ' + io3d.utils.data3d.getInspectorUrl(storageId))

    return Promise.all([
      // send baking request and
      io3d.light.bake(storageId).then(io3d.utils.processing.whenDone),
      // wait for hi-res DDS texture generation
      io3d.utils.processing.whenHiResTexturesReady(storageId)
    ])

  }).then(function (results) {
    var bakedStorageId = results[0]

    timestamp = Date.now()
    console.log('Bake done: ' + getDuration())
    console.log('Baked file: ' + io3d.utils.data3d.getInspectorUrl(bakedStorageId))

    uiMessage.close()
    io3d.utils.ui.message.success('Baking Successful')

    addBakedModelToScene(object3D, bakedStorageId)

  }, io3d.utils.ui.message.error)

}

function addBakedModelToScene (object3D, storageId) {

  // position object next to selected one
  var boundingBox = new THREE.Box3().setFromObject(object3D)
  var width = (boundingBox.max.x - boundingBox.min.x)
  var position = new THREE.Vector3(
    object3D.parent.position.x + width + width * 0.2,
    object3D.parent.position.x,
    object3D.parent.position.z
  )

  // add baked element to aframe scene
  var bakedEl = document.createElement('a-entity')
  bakedEl.setAttribute('position', position)
  bakedEl.setAttribute('io3d-data3d', 'key:' + storageId + ';lightMapExposure:1.1;lightMapIntensity:0.85;')
  object3D.el.parentElement.append(bakedEl)

  // select baked file
  bakedEl.addEventListener('model-loaded', function () {
    AFRAME.INSPECTOR.selectEntity(bakedEl)
  })

}

function createUi () {

  mainUiEl = el('<div>',{
    id: 'io3d-inspector-plugins___bake-lightmaps___container'
  }).appendTo(document.body)

  var mainBar = el('<div>',{
    id: 'io3d-inspector-plugins___bake-lightmaps___main-bar'
  }).appendTo(mainUiEl)

  el('<span>', {
    html: 'bake lightmaps API 🔥'
  }).appendTo(mainBar)

  el('<a>', {
    html: 'github',
    href: 'https://github.com/archilogic-com/3dio-inspector-plugins/'
  }).appendTo(mainBar)

  el('<a>', {
    html: 'questions?',
    href: window.encodeURI('https://stackoverflow.com/questions/tagged/aframe and 3d.io or archilogic')
  }).appendTo(mainBar)

  el('<a>', {
    html: 'x',
    click: hide
  }).appendTo(mainBar)

  el('<div>',{
    id: 'io3d-inspector-plugins___bake-lightmaps___bake-button',
    text: 'BAKE',
    click: function () {
      bakeLightmaps(AFRAME.INSPECTOR.selected)
    }
  }).appendTo(mainUiEl)

}

function show () {

  init()
  if (isVisible) return
  isVisible = true

  mainUiEl.show()

}

function hide () {

  if (!isVisible) return
  isVisible = false

  mainUiEl.hide()

}

// expose API

var bakeLightmapsPlugin = {
  show: show,
  hide: hide,
  bakeLightmaps: bakeLightmaps
}

export default bakeLightmapsPlugin