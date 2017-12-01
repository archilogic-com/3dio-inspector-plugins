import css from './less/style.less'
import el from './common/dom-el.js'
// plugin manager & menu
import pluginManager from './plugin-manager.js'
// plugins
import furnitureLibrary from './plugins/furniture-library.js'
import polyModels from './plugins/poly-models.js'
import staffPicks from './plugins/staff-picks.js'

var PLUGINS = {
  // name
  furnitureLibrary: {
    // ui
    displayTitle: '🏠&nbsp;&nbsp;furniture library',
    // access
    module: furnitureLibrary
  },
  polyModels: {
    displayTitle: '🥑&nbsp;&nbsp;poly.google.com',
    module: polyModels
  },
  staffPicks: {
    displayTitle: '✨&nbsp;&nbsp;staff picks',
    module: staffPicks
  }
}

window.io3d.aFrame.activePluginName = null

function setInitialPlugin (name) {
  window.io3d.aFrame.activePluginName = name
}

// check dependencies
if (!window.AFRAME) {
  throw 'Error loading 3d.io Inspector Plugins: Missing dependency: "AFRAME"\n' +
  'Please add "<script src="https://aframe.io/releases/0.6.1/aframe.min.js"></script>" to "<head>" tag before loading 3d.io plugins.' +
  'Read more: https://aframe.io/docs/0.7.0/introduction/'
}
if (!window.io3d) {
  throw 'Error loading 3d.io Inspector Plugins: Missing dependency: "io3d"\n' +
  'Please add "<script src="https://dist.3d.io/3dio-js/1.x.x-beta/3dio.min.js"></script>" to "<head>" tag before loading 3d.io plugins.' +
  'Read more: https://3d.io/docs/api/1/get-started-browser.html'
}

// prevents 3dio lib from loading plugins (ie in dev mode)
window.io3d.aFrame.pluginsLoaded = true

// add css to page
var cssEl = el('<style>', {
  id: 'io3d-inspector-plugins___css',
  media: 'screen',
  text: css
})

function appendCss () {
  cssEl.appendTo(document.head)
}

function detachCss () {
  document.head.removeChild(cssEl)
}

// initializes launcher with plugins
pluginManager.setPlugins(PLUGINS)

// handle inspector events
if (AFRAME && AFRAME.INSPECTOR && AFRAME.INSPECTOR.opened) {
  // inspector opened: init immediately
  init()
} else {
  // initialize on inspector ready event
  window.addEventListener('inspector-loaded', init, {once: true})
}

function init () {

  if (typeof AFRAME.INSPECTOR.on !== 'function') {
    console.warn('3dio.js: 3d.io inspector plugins require A-Frame version 0.7.0 or higher.')

  } else {

    if (AFRAME.INSPECTOR.opened) show()
    AFRAME.INSPECTOR.on('inspectormodechanged', function (isOpen) {
      isOpen ? show() : hide()
    })

  }

}

function show () {
  appendCss()
  pluginManager.show3dioButton()
  if (window.io3d.aFrame.activePluginName) pluginManager.showPlugin(window.io3d.aFrame.activePluginName, false)
}

function hide () {
  setInitialPlugin(null)
  pluginManager.hide3dioButton(function () {
    detachCss()
  })
}

// expose API

var io3dInspectorPlugins = {
  setInitialPlugin: setInitialPlugin,
  showMenu: pluginManager.showMenu,
  hideMenu: pluginManager.hideMenu
}

export default io3dInspectorPlugins