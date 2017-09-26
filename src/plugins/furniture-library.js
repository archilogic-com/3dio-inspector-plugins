import createListTabUi from './common/create-list-tab-ui.js'

var DEFAULT_SEARCH_VALUE = 'chair'

var isInitialized = false
var listTab

function init () {

  listTab = createListTabUi({
    title: 'Furniture Library',
    emptyList: 'Sorry, we didn\'t find any furniture for your query.<br><br>Try one of the following: desk, couch, bathroom, bed, plant, office, outdoor, kids, lamp, chair, red chair, car, vitra, eames, zaha hadid, piano, black, blue ...',
    listInfo: 'All models have environment based texture sets, loading automatically small textures on mobile and DDS textures progressively on desktop. Enjoy ;)',
    onSearchInput: search,
    onItemDrop: addToScene
  })

  isInitialized = true

}

function search (value) {

  io3d.furniture
    .search(value, {limit: 150})
    // ... and update view when ready
    .then(function (results) {

      listTab.updateList(results)

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
  newEntity.setAttribute('io3d-furniture', 'id', item.id)
  newEntity.setAttribute('position', position.x + ' 0 ' + position.z)
  document.querySelector('a-scene').appendChild(newEntity)

}

function show () {

  if (!isInitialized) init()

  listTab.show()

  if (!listTab.searchInputEl.value) {
    search(DEFAULT_SEARCH_VALUE)
    listTab.searchInputEl.value = DEFAULT_SEARCH_VALUE
  }

}

function hide () {

  if (!isInitialized) return

  listTab.hide()

}

// expose API

var furnitureLibraryPlugin = {
  show: show,
  hide: hide
}

export default furnitureLibraryPlugin