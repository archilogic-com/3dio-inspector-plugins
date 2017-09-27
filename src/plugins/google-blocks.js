import createListTabUi from './common/create-list-tab-ui.js'

var DEFAULT_SEARCH_VALUE = 'house'

var isInitialized = false
var listTab

function init () {

  listTab = createListTabUi({
    title: 'Google Blocks',
    emptyList: 'Sorry, no models found ...',
    listInfo: '',
    onSearchInput: search,
    onItemDrop: addToScene
  })

  isInitialized = true

}

function callSearchApi(offset, value) {
  return fetch('https://us-central1-gblock-api.cloudfunctions.net/search?limit=10&offset='+offset+'&query='+value).then(function (response) {
    return response.json()
  })
}

function search (value, offset) {

  Promise.all([
    // google has a limit fo max 10 result per call :/
    // so we do 3 api calls and merge the results into one
    callSearchApi(1, value),
    callSearchApi(11, value),
    callSearchApi(21, value)
  ]).then(function(results){
    return results[0].items.concat(results[1].items).concat(results[2].items)
  }).then(function (results) {

    var items = results.map(function(item_){
      return {
        title: item_.title,
        thumb: item_.smallImage || item_.largeImage,
        url: item_.url,
        author: item_.author
      }
    })

    listTab.setList(items)

  }).catch(function (error) {
    console.error(error)
    io3d.utils.ui.message.error('Sorry, something went wrong:\n\n' + JSON.stringify(error, null, 2))
  })

}

function addToScene (item, position) {

  var uiMessage = io3d.utils.ui.message('Loading glTF...', 0)

  // add new entity to scene
  var newEntity = document.createElement('a-entity')

  newEntity.addEventListener('model-loaded', function(event){

    uiMessage.close()
    io3d.utils.ui.message.success('Loaded Model: <a href="'+item.url+'" target="_blank">'+item.url+'</a>')

    // center model to picking position
    var bb = new THREE.Box3().setFromObject(event.detail.model) // bounding box
    var size = new THREE.Vector3( Math.abs(bb.max.x - bb.min.x), Math.abs(bb.max.y - bb.min.y), Math.abs(bb.max.z - bb.min.z))
    position.set(
      position.x - bb.min.x - size.x/2,
      -bb.min.y,
      position.z - bb.min.z - size.z/2
    )

    newEntity.setAttribute('position', position.x + ' ' + position.y + ' ' + position.z)

  }, { once: true })

  newEntity.addEventListener('model-error', function(event){

    uiMessage.close()
    io3d.utils.ui.message.error('Sorry: '+event.detail.message+'<br/><a href="'+item.url+'" target="_blank">'+item.url+'</a>')

  }, { once: true })

  newEntity.setAttribute('gblock', item.url)
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

function hide (callback) {

  if (!isInitialized) return

  listTab.hide(callback)

}

// expose API

var googleBlocksPlugin = {
  show: show,
  hide: hide
}

export default googleBlocksPlugin