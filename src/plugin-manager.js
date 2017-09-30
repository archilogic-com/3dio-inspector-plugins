import el from './common/dom-el.js'
import svg3dioLogo from './svg/3dio-logo.svg'

// internals

var isInitialized = false
var isVisibleMenu = false
var io3dButtonEl
var menuContainerEl
var menuEl
var activePluginName = null
var plugins = {}

// methods

function setPlugins (plugins_) {
  plugins = plugins_
}

function init () {

  isInitialized = true

  // DOM

  // 3d.io button in action bar

  io3dButtonEl = el('<div>', {
    id: 'io3d-inspector-plugins___3dio-button',
    class: 'io3d-inspector-plugins',
    html: svg3dioLogo,
    click: toggleMenu
  }).appendTo(document.body)

  // launcher menu

  menuContainerEl = el('<div>', {
    id: 'io3d-inspector-plugins___plugins-menu',
    class: 'io3d-inspector-plugins'
  }).appendTo(document.body)

  menuEl = el('<div>', {
    id: 'io3d-inspector-plugins___plugins-menu___container',
    style: 'display: none;'
  }).appendTo(menuContainerEl)

  var headerEl = el('<div>', {
    id: 'io3d-inspector-plugins___plugins-menu___header',
    text: '3d.io APIs'
  }).appendTo(menuEl)

  el('<div>', {
    id: 'io3d-inspector-plugins___plugins-menu___close-button',
    text: 'X',
    click: hideMenu
  }).appendTo(headerEl)

  Object.keys(plugins).forEach(function (name) {
    var pluginButton = el('<div>', {
      id: 'io3d-inspector-plugins___plugins-menu___button',
      html: plugins[name].displayTitle,
      click: function () {
        showPlugin(name)
      }
    })
    pluginButton.addEventListener('click', function () {

    })
    menuEl.append(pluginButton)
  })

  el('<div>', {
    id: 'io3d-inspector-plugins___plugins-menu___footer',
    html: 'You can use all of these APIs directly in your own 3D apps. <a target="_blank" href="https://3d.io/docs/api/1/">Read more</a>'
  }).appendTo(menuEl)

}

function showPlugin (name, animate) {

  if (activePluginName) {
    if (name === activePluginName && plugins[activePluginName].module.isVisible) {
      return
    } else {
      plugins[activePluginName].module.hide(null, animate)
    }
  }

  if (name) {
    if (!plugins[name]) {
      console.error('Plugin "' + name + '" not found. Available plugins are: "' + Object.keys(plugins).join('", "') + '"')

    } else {
      if (!plugins[name].module.isVisible) plugins[name].module.show(null, animate)

      activePluginName = name
      hideMenu()

    }
  }

}

function show () {

  if (!isInitialized) init()

  io3dButtonEl.show()

}

function hide (callback) {

  io3dButtonEl.hide()
  if (activePluginName) plugins[activePluginName].module.hide(callback)
  hideMenu()

}

function toggleMenu () {

  isVisibleMenu ? hideMenu() : showMenu()

}

function showMenu (callback) {

  if (isVisibleMenu) return
  isVisibleMenu = true

  menuEl.style.opacity = 0
  menuEl.style.display = 'block'

  menuEl.style['-webkit-animation'] = '600ms io3d-inspector-plugins___plugins-menu-slide-in cubic-bezier(0.2, 0.80, 0.5, 1)'
  menuEl.style['animation'] = '600ms io3d-inspector-plugins___plugins-menu-slide-in cubic-bezier(0.2, 0.80, 0.5, 1)'
  menuEl.style['-webkit-animation-fill-mode'] = 'forwards'
  menuEl.style['animation-fill-mode'] = 'forwards'

  if (callback && typeof callback === 'function') setTimeout(function () { callback(); }, 500)

  return pluginManager

}

function hideMenu (callback) {

  if (!isVisibleMenu) return
  isVisibleMenu = false

  menuEl.style['-webkit-animation'] = '600ms io3d-inspector-plugins___plugins-menu-slide-out ease-in'
  menuEl.style['animation'] = '600ms io3d-inspector-plugins___plugins-menu-slide-out ease-in'
  menuEl.style['-webkit-animation-fill-mode'] = 'forwards'
  menuEl.style['animation-fill-mode'] = 'forwards'

  // remove element
  setTimeout(function () {
    menuEl.style.display = 'none'
  }, 600)
  // trigger callback function
  if (callback && typeof callback === 'function') setTimeout(function () { callback(); }, 300)

  return pluginManager

}

// API

var pluginManager = {
  setPlugins: setPlugins,
  show: show,
  hide: hide,
  showPlugin: showPlugin
}

// expose API

export default pluginManager