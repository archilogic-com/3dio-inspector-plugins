import createListTabUi from './common/create-list-tab-ui.js'

// config

var DEFAULT_SEARCH_VALUE = 'house'

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
    title: 'Google Blocks',
    onSearchChange: search,
    onItemDrop: addToScene,
    onHide: function () {
      scope.isVisible = false
    }
  })

  isInitialized = true

}

function callSearchApi (offset, value) {
  return fetch('https://us-central1-gblock-api.cloudfunctions.net/search?limit=10&offset=' + offset + '&query=' + value).then(function (response) {
    return response.json()
  })
}

function search (value, offset) {

  listTab.setInfo('Loading ...')
  listTab.setList(null)

  Promise.all([
    // google has a limit fo max 10 result per call :/
    // so we do 3 api calls and merge the results into one
    callSearchApi(1, value),
    callSearchApi(11, value),
    callSearchApi(21, value)
  ]).then(function (results) {
    return results[0].items.concat(results[1].items).concat(results[2].items)
  }).then(function (results) {

    var items = results.map(function (item_) {
      return {
        title: item_.title + ' by ' + item_.author,
        thumb: item_.image,
        url: item_.url,
        author: item_.author
      }
    })

    listTab.setList(items)
    listTab.setInfo(items.length ? null : 'No results found.')

  }).catch(function (error) {
    console.error(error)
    io3d.utils.ui.message.error('Sorry, something went wrong:\n\n' + JSON.stringify(error, null, 2))
  })

}

function addToScene (item, position) {

  var uiMessage = io3d.utils.ui.message('Loading glTF from<br><a href="' + item.url + '" target="_blank">' + item.url + '</a>', 0)

  // add new entity to scene
  var newEntity = document.createElement('a-entity')

  newEntity.addEventListener('model-loaded', function (event) {

    uiMessage.close()
    io3d.utils.ui.message.success('Added<br><a href="' + item.url + '" target="_blank">' + item.url + '</a>')

    // center model to picking position
    var bb = new THREE.Box3().setFromObject(event.detail.model) // bounding box
    var size = new THREE.Vector3(Math.abs(bb.max.x - bb.min.x), Math.abs(bb.max.y - bb.min.y), Math.abs(bb.max.z - bb.min.z))
    position.set(
      position.x - bb.min.x - size.x / 2,
      -bb.min.y,
      position.z - bb.min.z - size.z / 2
    )

    newEntity.setAttribute('position', position.x + ' ' + position.y + ' ' + position.z)

  }, {once: true})

  newEntity.addEventListener('model-error', function (event) {

    uiMessage.close()
    io3d.utils.ui.message.error('Sorry: ' + event.detail.message + '<br/><a href="' + item.url + '" target="_blank">' + item.url + '</a>')

  }, {once: true})

  newEntity.setAttribute('gblock', item.url)
  document.querySelector('a-scene').appendChild(newEntity)

}

function show (callback, animate) {

  if (!isInitialized) init()

  if (scope.isVisible) return
  scope.isVisible = true

  listTab.show(callback, animate)

  if (!listTab.getSearchValue()) {
    search(DEFAULT_SEARCH_VALUE)
    listTab.setSearchValue(DEFAULT_SEARCH_VALUE)
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