import createListTabUi from './common/create-list-tab-ui.js'

// config

var DEFAULT_SEARCH_VALUE = 'chair'

// export

var scope = {
  show: show,
  hide: hide,
  isVisible: false
}

// internals

var isInitialized = false
var listTab

// methods

function init () {

  listTab = createListTabUi({
    title: 'Furniture Library',
    emptyList: 'Sorry, we didn\'t find any furniture for your query.<br><br>Try one of the following: desk, couch, bathroom, bed, plant, office, outdoor, kids, lamp, chair, red chair, car, vitra, eames, zaha hadid, piano, black, blue ...',
    listInfo: 'All models have environment based texture sets, loading automatically small textures on mobile and DDS textures progressively on desktop. Enjoy ;)',
    onSearchInput: search,
    onItemDrop: addToScene,
    onHide: function () {
      scope.isVisible = false
    }
  })

  isInitialized = true

}

function search (value) {

  io3d.furniture
    .search(value, {limit: 150})
    // ... and update view when ready
    .then(function (results) {

      var items = results.map(function (item_) {
        return {
          title: item_.name,
          thumb: item_.indexImage,
          furnitureId: item_.id
        }
      })

      listTab.setList(items)

    })
    // ... or catch errors
    .catch(function (error) {
      console.error(error)
      io3d.utils.message.error('Sorry, something went wrong:\n\n' + JSON.stringify(error, null, 2))
    })

}

function addToScene (item, position) {

  // add new entity to scene
  var newEntity = document.createElement('a-entity')
  newEntity.setAttribute('io3d-furniture', 'id', item.furnitureId)
  newEntity.setAttribute('position', position.x + ' 0 ' + position.z)
  document.querySelector('a-scene').appendChild(newEntity)

}

function show (callback, animate) {

  if (!isInitialized) init()

  if (scope.isVisible) return
  scope.isVisible = true

  listTab.show(callback, animate)

  if (!listTab.searchInputEl.value) {
    search(DEFAULT_SEARCH_VALUE)
    listTab.searchInputEl.value = DEFAULT_SEARCH_VALUE
  }

}

function hide (callback, animate) {

  if (!isInitialized) return

  if (!scope.isVisible) return
  scope.isVisible = false

  listTab.hide(callback, animate)

}

// expose API

export default scope