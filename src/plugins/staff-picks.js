import createListTabUi from './common/create-list-tab-ui.js'
import staffPickItems from './staff-picks/items.js'

// export

var scope = {
  show: show,
  hide: hide,
  isVisible: false
}

// internal

var isInitialized = false
var listTab

// method

function init () {

  listTab = createListTabUi({
    title: 'Staff Pics',
    listInfo: 'A growing list of models for testing and demo purposes.',
    onItemDrop: addToScene,
    onHide: function () {
      scope.isVisible = false
    }
  })

  listTab.init()

  listTab.setList(staffPickItems)

  isInitialized = true

}

function addToScene (item, position) {

  var uiMessage = io3d.utils.ui.message('Loading'+(item.title ? ' "'+item.title+'" ' : ' ') +'...', 0)

  // add new entity to scene
  var newEntity = document.createElement('a-entity')

  newEntity.addEventListener('model-loaded', function (event) {

    uiMessage.close()
    io3d.utils.ui.message.success('Added'+(item.title ? ' "'+item.title+'"' : 'model'))

    // center model to picking position

    var bb = new THREE.Box3().setFromObject(event.detail.model) // bounding box
    var size = new THREE.Vector3(Math.abs(bb.max.x - bb.min.x), Math.abs(bb.max.y - bb.min.y), Math.abs(bb.max.z - bb.min.z))
    position.set(
      position.x - bb.min.x - size.x / 2,
      -bb.min.y,
      position.z - bb.min.z - size.z / 2
    )

    newEntity.setAttribute('position', position.x + ' 0 ' + position.z)

  }, {once: true})

  newEntity.setAttribute(item.type, stringifyAttributes(item.attributes))

  // add other attributes

  document.querySelector('a-scene').appendChild(newEntity)

}

function show (callback, animate) {

  if (!isInitialized) init()

  if (scope.isVisible) return
  scope.isVisible = true

  listTab.show(callback, animate)

}

function hide (callback, animate) {

  if (!isInitialized) return

  if (!scope.isVisible) return
  scope.isVisible = false

  listTab.hide(callback, animate)

}

function stringifyAttributes (attributes) {
  var s = ''
  Object.keys(attributes).forEach(function(name){
    s += name +': '+ attributes[name] +'; '
  })
  return s
}

// expose API

export default scope