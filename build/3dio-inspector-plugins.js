/**
 * @preserve
 * @name 3dio-inspector-plugins
 * @version 0.0.1
 * @date 2017/09/25 16:59
 * @branch master
 * @commit 16ad6b4a83d8415854ce4b0e02722c2c9b1c151a
 * @description Connects A-Frame Inspector to 3d.io APIs
 * @see https://3d.io
 * @tutorial https://github.com/archilogic-com/3dio-inspector-plugins
 * @author archilogic <dev.rocks@archilogic.com> (https://archilogic.com)
 * @license MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.io3dInspectorPlugins = factory());
}(this, (function () { 'use strict';

	var BUILD_DATE='2017/09/25 16:59', GIT_BRANCH = 'master', GIT_COMMIT = '16ad6b4a83d8415854ce4b0e02722c2c9b1c151a'

	var css = "#io3d-inspector-plugins {\n  font-family: Roboto, BlinkMacSystemFont, -apple-system, \"Segoe UI\", Helvetica, Arial, sans-serif;\n  font-size: 12px;\n}\n#io3d-inspector-plugins___3dio-button {\n  z-index: 100000;\n  position: absolute;\n  top: 38px;\n  left: 181px;\n  height: 20px;\n  text-align: right;\n  border-radius: 3px;\n  cursor: pointer;\n}\n#io3d-inspector-plugins___3dio-button svg {\n  height: 100%;\n}\n#io3d-inspector-plugins___3dio-button svg g {\n  fill: #bcbcbc;\n  stroke: #bcbcbc;\n  stroke-width: 13;\n}\n#io3d-inspector-plugins___3dio-button svg g:hover {\n  fill: #1faaf2;\n  stroke: #1faaf2;\n  stroke-width: 13;\n}\n#io3d-inspector-plugins___plugins-menu {\n  z-index: 100001;\n  position: absolute;\n  top: 0;\n  left: 250px;\n  width: 230px;\n}\n@-webkit-keyframes io3d-inspector-plugins___plugins-menu-slide-in {\n  0% {\n    -webkit-transform: translateY(-40%);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: translateY(0%);\n    opacity: 1;\n  }\n}\n@keyframes io3d-inspector-plugins___plugins-menu-slide-in {\n  0% {\n    transform: translateY(-40%);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0%);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes io3d-inspector-plugins___plugins-menu-slide-out {\n  0% {\n    -webkit-transform: translateY(0%);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateY(-40%);\n    opacity: 0;\n  }\n}\n@keyframes io3d-inspector-plugins___plugins-menu-slide-out {\n  0% {\n    transform: translateY(0%);\n    opacity: 1;\n  }\n  100% {\n    transform: translateY(-40%);\n    opacity: 0;\n  }\n}\n#io3d-inspector-plugins___plugins-menu___container {\n  background-color: rgba(0, 0, 0, 0.9);\n  padding: 0 12px 0 12px;\n}\n#io3d-inspector-plugins___plugins-menu___header {\n  padding: 14px 0 14px 0;\n  border-bottom: 1px solid #bcbcbc;\n}\n#io3d-inspector-plugins___plugins-menu___close-button {\n  position: absolute;\n  top: 0;\n  right: 12px;\n  padding: 14px 0 14px 0;\n  cursor: pointer;\n}\n#io3d-inspector-plugins___plugins-menu___button {\n  padding: 10px 0 10px 0;\n  border-bottom: 1px solid #bcbcbc;\n  cursor: pointer;\n}\n#io3d-inspector-plugins___plugins-menu___button:hover {\n  background-color: rgba(255, 255, 255, 0.2);\n}\n#io3d-inspector-plugins___plugins-menu___footer {\n  padding: 14px 0 14px 0;\n}\n#io3d-inspector-plugins___plugins-menu___footer a {\n  color: white;\n}\n#io3d-inspector-plugins___bake-lightmaps___container {\n  font-family: Roboto, BlinkMacSystemFont, -apple-system, \"Segoe UI\", Helvetica, Arial, sans-serif;\n  position: absolute;\n  top: 0px;\n  left: 246px;\n  z-index: 100000;\n}\n#io3d-inspector-plugins___bake-lightmaps___main-bar span,\n#io3d-inspector-plugins___bake-lightmaps___main-bar a {\n  text-decoration: none;\n  display: inline-block;\n  height: 33px;\n  line-height: 33px;\n  padding: 0 12px 0 12px;\n  margin: 0 0 0 0;\n  border-left: 1px solid rgba(255, 255, 255, 0.5);\n  white-space: nowrap;\n  font-weight: 400;\n  letter-spacing: 1px;\n  font-size: 12px;\n  color: white;\n  background-color: rgba(0, 0, 0, 0.8);\n}\n#io3d-inspector-plugins___bake-lightmaps___bake-button {\n  display: inline-block;\n  cursor: pointer;\n  text-decoration: none;\n  color: white;\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: 0px;\n  height: 38px;\n  line-height: 40px;\n  padding: 0 13px 0 13px;\n  background-color: #1faaf2;\n  border-radius: 2px;\n  margin: 16px 0 0 0;\n  position: relative;\n  left: 2px;\n  top: -2px;\n  box-shadow: -2px 2px 0px 0px #105576;\n}\n#io3d-inspector-plugins___bake-lightmaps___bake-button:hover {\n  background-color: #44c3f2;\n}\n#io3d-inspector-plugins___bake-lightmaps___bake-button:active {\n  left: -1px;\n  top: 1px;\n  background-color: #105576;\n  box-shadow: -2px 2px 0px 0px rgba(0, 0, 0, 0);\n}\n";

	// basic element utils for convenience inspired by jquery API

	var elementStringRegex = /^<(\S+)>$/i;

	// main

	var el = function (x, attributes) {

	  if (x) {
	    if (typeof x === 'string') {
	      // create element
	      var tagSearch = elementStringRegex.exec(x);
	      var tag = tagSearch ? tagSearch[1] : null;
	      if (tag) {
	        return addElement(tag, attributes)
	      } else {
	        throw 'Only basic tags like "<div>" without attributes are currently supported. (No queries and no HTML strings)'
	      }
	    } else if (isElement(x)) {
	      // only add convenience methods
	      extendWithConvenienceMethods(x);
	    } else {
	      throw 'Please provide html element string (i.e. "<div>") or element object as first argument.'
	    }
	  }
	};

	// utils
	el.isElement = isElement;

	// helpers

	function addElement (type, attrs) {
	  
	  // create element
	  var el = document.createElement(type);

	  // add attributes
	  if (attrs) Object.keys(attrs).forEach(function (key) {
	    if (key === 'text') {
	      // text
	      el.appendChild(document.createTextNode(attrs.text));
	    } else if (key === 'html') {
	      // html
	      el.innerHTML = attrs.html;
	    } else if (key === 'click' || key === 'keydown' || key === 'keyup') {
	      // events
	      el.addEventListener(key, attrs[key]);
	    } else {
	      // any other attributes
	      el.setAttribute(key, attrs[key]);
	    }
	  });

	  extendWithConvenienceMethods(el);

	  return el
	}

	function extendWithConvenienceMethods (el) {
	  el.remove = function removeElement (child) {
	    child ? el.removeChild(child) : el.parentNode.removeChild(el);
	    return el
	  };
	  el.append = function append (o) {
	    if (o) isElement(o) ? el.appendChild(o) : el.innerHTML = o;
	    return el
	  };
	  el.appendTo = function appendToElement (parentEl) {
	    parentEl === 'body' ? document.body.appendChild(el) : parentEl.appendChild(el);
	    return el
	  };
	  el.prependTo = function prependToElement (parentEl) {
	    parentEl === 'body' ? document.body.prepend(el) : parentEl.prepend(el);
	    return el
	  };
	  el.val = function handleValue (str) {
	    str ? el.setAttribute('value', str) : null;
	    return el.value
	  };
	  el.addClass = function addCssClass (str) {
	    el.classList.add(str);
	    return el
	  };
	  el.removeClass = function removeCssClass (str) {
	    el.classList.remove(str);
	    return el
	  };
	  el.hide = function hideElement () {
	    el.___originalStyleDisplay = el.style.display;
	    el.style.display = 'none';
	    return el
	  };
	  el.show = function showElement () {
	    el.style.display = el.___originalStyleDisplay && el.___originalStyleDisplay !== '' ? el.___originalStyleDisplay : 'block';
	    return el
	  };
	  el.toggleSlide = function toggleSlide () {
	    toggleSlideEl(el);
	  };
	}

	// Returns true if it is a DOM element
	// https://stackoverflow.com/a/384380/2835973
	function isElement(o){
	  return (
	    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
	      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
	  );
	}

	// https://stackoverflow.com/a/3797442/2835973
	function getHiddenElementHeight (el) {
	  var el_style = window.getComputedStyle(el),
	    el_display = el_style.display,
	    el_position = el_style.position,
	    el_visibility = el_style.visibility,
	    el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),

	    wanted_height = 0;

	  // if its not hidden we just return normal height
	  if (el_display !== 'none' && el_max_height !== '0') {
	    return el.offsetHeight;
	  }

	  // the element is hidden so:
	  // making the el block so we can meassure its height but still be hidden
	  el.style.position = 'absolute';
	  el.style.visibility = 'hidden';
	  el.style.display = 'block';

	  wanted_height = el.offsetHeight;

	  // reverting to the original values
	  el.style.display = el_display;
	  el.style.position = el_position;
	  el.style.visibility = el_visibility;

	  return wanted_height;
	}

	// https://stackoverflow.com/a/3797442/2835973
	function toggleSlideEl (el) {
	  var el_max_height = 0;

	  if (el.getAttribute('data-max-height')) {
	    // we've already used this before, so everything is setup
	    if (el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
	      el.style.maxHeight = el.getAttribute('data-max-height');
	      el.style.opacity = 1;
	    } else {
	      el.style.maxHeight = 0;
	      el.style.opacity = 0;
	    }
	  } else {
	    el_max_height = getHiddenElementHeight(el) + 'px';
	    //el.style['-webkit-transition'] = 'background 0.5a linear, max-height 0.5s ease-in-out';
	    el.style['-webkit-transition'] = 'opacity 0.5s ease-out, max-height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
	    el.style.transition = 'opacity 0.5s ease-out, max-height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
	    el.style.overflowY = 'hidden';
	    el.style.maxHeight = '0';
	    el.setAttribute('data-max-height', el_max_height);
	    el.style.display = 'block';

	    // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
	    setTimeout(function () {
	      el.style.maxHeight = el_max_height;
	      el.style.opacity = 1;
	    }, 10);
	  }
	}

	var svg3dioLogo = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 644 300\" enable-background=\"new 0 0 644 300\" xml:space=\"preserve\">\n<g>\n\t<rect stroke-width=\"0\" fill=\"#333333\" width=\"644\" height=\"300\"/>\n\t<path stroke-miterlimit=\"10\" d=\"M129.6,156.8c-5.4-5.4-11.8-9.8-18.8-12.9\n\t\tc-5.6-2.5-11.5-4.2-17.6-5c7.4-10.2,14.9-20.5,22.5-30.5c8.7-11.5,17.5-23.3,26.1-35.1c1-1.4,0.7-3.4-0.7-4.5\n\t\tc-0.5-0.4-1.2-0.6-1.9-0.6H46.7c-1.8,0-3.2,1.4-3.2,3.2v10.1c0,1.8,1.4,3.2,3.2,3.2h67.9c-7.7,10.7-15.6,21.6-23.5,32.4\n\t\tc-8.9,12.1-18,24.7-27.2,37.5c-1,1.4-0.7,3.4,0.7,4.5c1.1,0.8,2.6,0.8,3.7,0c4.5-3.4,10-5.3,15.6-5.3c6.1,0,12.2,1.2,17.9,3.6\n\t\tc5.5,2.3,10.5,5.6,14.8,9.6c4.2,4.1,7.6,9,10,14.3c2.5,5.6,3.7,11.6,3.7,17.7c0,6-1.2,11.9-3.7,17.4c-2.4,5.4-5.8,10.4-10,14.5\n\t\tc-4.3,4.2-9.3,7.5-14.8,9.9c-5.6,2.5-11.7,3.7-17.9,3.7c-6.3,0.1-12.6-1.5-18.2-4.4c-5.4-2.8-10.3-6.7-14.3-11.4\n\t\tc-1.1-1.3-3.2-1.5-4.5-0.4c-0.1,0.1-0.1,0.1-0.2,0.2l-7.6,7.6c-1.2,1.2-1.3,3.2-0.1,4.4c5.7,6.1,12.6,11.1,20.1,14.7\n\t\tc8,3.7,16.8,5.6,25.6,5.5c8.3,0,16.5-1.6,24.1-4.9c14.8-6.4,26.6-18.1,33.1-32.9c6.5-15.2,6.6-32.3,0.3-47.5\n\t\tC139.3,168.6,135,162.2,129.6,156.8z\"/>\n\t<path stroke-miterlimit=\"10\" d=\"M305.1,38.7h-9.9c-1.8,0-3.2,1.4-3.2,3.2v120.6\n\t\tc-0.5-0.6-1-1.3-1.5-1.9c-3.3-3.9-7.1-7.4-11.3-10.3c-4.5-3.1-9.4-5.4-14.5-7c-5.6-1.7-11.4-2.6-17.3-2.5c-8-0.1-16,1.5-23.4,4.6\n\t\tc-7.1,3-13.5,7.3-19,12.6c-5.5,5.4-9.9,11.9-12.8,19.1c-6.1,15.1-6.2,32-0.2,47.1c2.9,7.1,7.1,13.5,12.5,18.9\n\t\tc5.4,5.4,11.8,9.7,18.9,12.8c7.5,3.2,15.5,4.8,23.7,4.8c11.4,0.3,22.5-3,32-9.3c4.9-3.3,9.3-7.4,13.1-12c0,1,0,1.9,0,2.9v13.2\n\t\tc0,1.8,1.4,3.2,3.2,3.2h9.9c1.8,0,3.2-1.4,3.2-3.2V41.9C308.3,40.1,306.8,38.7,305.1,38.7z M265.2,241.2\n\t\tc-5.5,2.3-11.4,3.4-17.4,3.4v0c-6,0-11.9-1.1-17.4-3.4c-16.3-6.8-26.9-22.8-26.8-40.4c0-6,1.1-11.9,3.4-17.4\n\t\tc4.3-10.6,12.7-19.1,23.4-23.4c11.1-4.6,23.6-4.6,34.7,0c10.6,4.3,19.1,12.7,23.4,23.4c2.3,5.5,3.4,11.4,3.4,17.4\n\t\tC292.2,218.5,281.6,234.5,265.2,241.2z\"/>\n\t<path stroke-miterlimit=\"10\" d=\"M362.3,235.1c-3.1,0-6,1.2-8.2,3.5c-2.3,2.2-3.5,5.3-3.5,8.5\n\t\tc-0.1,3.2,1.2,6.2,3.5,8.4c4.5,4.4,11.7,4.4,16.2,0c2.3-2.2,3.6-5.2,3.5-8.4c0.1-3.2-1.2-6.2-3.5-8.5\n\t\tC368.3,236.3,365.4,235.1,362.3,235.1z\"/>\n\t<path stroke-miterlimit=\"10\" d=\"M424.6,96.4c-3.1,0-6,1.2-8.2,3.5c-2.3,2.2-3.5,5.3-3.5,8.5\n\t\tc-0.1,3.2,1.2,6.2,3.5,8.4c2.2,2.1,5.1,3.3,8.1,3.3c6.3-0.1,11.4-5.3,11.4-11.7c0.1-3.2-1.2-6.2-3.5-8.5\n\t\tC430.5,97.7,427.6,96.5,424.6,96.4z\"/>\n\t<path stroke-miterlimit=\"10\" d=\"M429.1,143.2h-9.6c-1.8,0-3.2,1.4-3.2,3.2v109\n\t\tc0,1.8,1.4,3.2,3.2,3.2h9.6c1.8,0,3.2-1.4,3.2-3.2v-109C432.3,144.7,430.9,143.2,429.1,143.2z\"/>\n\t<path stroke-miterlimit=\"10\" d=\"M597.2,177.3c-6.1-14.5-17.6-26-32.1-32.1\n\t\tc-15-6.4-32-6.4-47.1,0c-14.5,6.1-26,17.6-32.1,32.1c-6.4,15.1-6.4,32.1,0,47.2c3,7,7.4,13.4,12.8,18.9c5.5,5.4,11.9,9.7,19.1,12.7\n\t\tc7.4,3.1,15.4,4.7,23.5,4.6c8.2,0.1,16.3-1.6,23.8-4.8c7.1-3,13.6-7.4,19.1-12.8c5.5-5.4,9.9-11.8,12.9-18.9\n\t\tc3.2-7.4,4.8-15.4,4.8-23.4C602,192.7,600.4,184.7,597.2,177.3z M582,218c-2.2,5.2-5.4,9.9-9.4,13.9c-4.1,4-8.9,7.1-14.1,9.3\n\t\tc-5.4,2.3-11.3,3.4-17.2,3.4l0,0c-24.3-0.1-44-19.9-43.9-44.3c0-5.8,1.2-11.5,3.4-16.8c2.2-5.2,5.4-10,9.3-14.1\n\t\tc4-4,8.7-7.2,13.9-9.4c11-4.5,23.4-4.5,34.4,0c10.6,4.5,19.1,12.9,23.5,23.5C586.6,194.6,586.6,207,582,218z\"/>\n</g>\n</svg>\n";

	// internals

	var isInitialized = false;
	var isVisibleMenu = false;
	var io3dButtonEl;
	var menuContainerEl;
	var menuEl;
	var activePluginName = null;
	var plugins = {};

	// methods

	function setPlugins(plugins_) {
	  plugins = plugins_;
	}

	function init$1() {
	  if (isInitialized) return
	  isInitialized = true;

	  // DOM

	  // 3d.io button in action bar
	  
	  io3dButtonEl = el('<div>', {
	    id: 'io3d-inspector-plugins___3dio-button',
	    html: svg3dioLogo,
	    click: toggleMenu
	  }).appendTo(document.body);

	  // launcher menu

	  menuContainerEl = el('<div>', {
	    id: 'io3d-inspector-plugins___plugins-menu'
	  }).appendTo(document.body);

	  menuEl = el('<div>', {
	    id: 'io3d-inspector-plugins___plugins-menu___container',
	    style: 'display: none;'
	  }).appendTo(menuContainerEl);

	  var headerEl = el('<div>', {
	    id: 'io3d-inspector-plugins___plugins-menu___header',
	    text: '3d.io APIs'
	  }).appendTo(menuEl);

	  el('<div>', {
	    id: 'io3d-inspector-plugins___plugins-menu___close-button',
	    text: 'X',
	    click: hideMenu
	  }).appendTo(headerEl);

	  Object.keys(plugins).forEach(function(name){
	    var pluginButton = el('<div>', {
	      id: 'io3d-inspector-plugins___plugins-menu___button',
	      html: plugins[name].displayTitle,
	      click: function () {
	        showPlugin(name);
	      }
	    });
	    pluginButton.addEventListener('click', function(){

	    });
	    menuEl.append(pluginButton);
	  });

	  el('<div>', {
	    id: 'io3d-inspector-plugins___plugins-menu___footer',
	    html: 'You can use all of these APIs directly in your own 3D apps. <a target="_blank" href="https://3d.io/docs/api/1/">Read more</a>'
	  }).appendTo(menuEl);

	}

	function showPlugin(name) {
	  if (activePluginName) {
	    plugins[activePluginName].module.hide();
	  }
	  if (name) {
	    if (!plugins[name]) {
	      console.error('Plugin "'+name+'" not found. Available plugins are: "'+Object.keys(plugins).join('", "')+'"');
	    } else {
	      plugins[name].module.show();
	      activePluginName = name;
	      hideMenu();
	    }
	  }
	}

	function show() {

	  init$1();
	  io3dButtonEl.show();
	  
	}

	function hide() {

	  io3dButtonEl.hide();
	  hideMenu();

	}

	function toggleMenu () {

	  isVisibleMenu ? hideMenu() : showMenu();

	}

	function showMenu (callback) {

	  if (isVisibleMenu) return
	  isVisibleMenu = true;

	  menuEl.style.opacity = 0;
	  menuEl.style.display = 'block';

	  menuEl.style['-webkit-animation'] = '600ms io3d-inspector-plugins___plugins-menu-slide-in cubic-bezier(0.2, 0.80, 0.5, 1)';
	  menuEl.style['animation'] = '600ms io3d-inspector-plugins___plugins-menu-slide-in cubic-bezier(0.2, 0.80, 0.5, 1)';
	  menuEl.style['-webkit-animation-fill-mode'] = 'forwards';
	  menuEl.style['animation-fill-mode'] = 'forwards';

	  if (callback && typeof callback === 'function') setTimeout(function(){ callback(); }, 500);

	  return pluginManager

	}

	function hideMenu (callback) {

	  if (!isVisibleMenu) return
	  isVisibleMenu = false;

	  menuEl.style['-webkit-animation'] = '600ms io3d-inspector-plugins___plugins-menu-slide-out ease-in';
	  menuEl.style['animation'] = '600ms io3d-inspector-plugins___plugins-menu-slide-out ease-in';
	  menuEl.style['-webkit-animation-fill-mode'] = 'forwards';
	  menuEl.style['animation-fill-mode'] = 'forwards';

	  // remove element
	  setTimeout(function(){
	    menuEl.style.display = 'none';
	  }, 600);
	  // trigger callback function
	  if (callback && typeof callback === 'function') setTimeout(function(){ callback(); }, 300);

	  return pluginManager

	}

	// API

	var pluginManager = {
	  setPlugins: setPlugins,
	  show: show,
	  hide: hide,
	  showPlugin: showPlugin
	};

	// WIP

	function show$1() {

	}

	function hide$1() {

	}

	// expose API

	var furnitureLibraryPlugin = {
	  show: show$1,
	  hide: hide$1
	};

	var isInitialized$1 = false;
	var isVisible = false;
	var mainUiEl;

	// methods

	function init$2 () {

	  if (isInitialized$1) return
	  isInitialized$1 = true;

	  createUi();

	}

	/**
	 * @param selected - THREE.Object3D or DOM query string selector referencing A-Frame element
	 */

	function bakeLightmaps (selected) {

	  if (!selected) {
	    io3d.utils.ui.message.error('Please select a group or a single object.');
	    return
	  }

	  if (typeof selected === 'string') {
	    selected = document.querySelector(selected).object3D;
	  }

	  // run

	  var timestamp, previousTimestamp = Date.now();

	  function getDuration () {
	    timestamp = Date.now();
	    var duration = timestamp - previousTimestamp;
	    previousTimestamp = timestamp;
	    return Math.round(duration / 1000) + 's'
	  }

	  var uiMessage = io3d.utils.ui.message('Light map baking in progress...', 0);

	  io3d.publish(selected).then(function (storageId) {

	    console.log('Imported model to as data3d: ' + getDuration());
	    console.log('Imported file: ' + io3d.utils.data3d.getInspectorUrl(storageId));

	    return Promise.all([
	      // send baking request and
	      io3d.light.bake(storageId).then(io3d.light.bake.whenDone),
	      // wait for hi-res DDS texture generation
	      io3d.publish.whenHiResTexturesReady(storageId)
	    ])

	  }).then(function (results) {
	    var bakedStorageId = results[0];

	    timestamp = Date.now();
	    console.log('Bake done: ' + getDuration());
	    console.log('Baked file: ' + io3d.utils.data3d.getInspectorUrl(bakedStorageId));

	    uiMessage.close();
	    io3d.utils.ui.message.success('Baking Successful');

	    addBakedModelToScene(selected, bakedStorageId);

	  }, io3d.utils.ui.message.error);

	}

	function addBakedModelToScene (selected, storageId) {

	  var parent = selected.parent;

	  var boundingBox = new THREE.Box3().setFromObject(selected);
	  var width = (boundingBox.max.x - boundingBox.min.x);
	  var position = new THREE.Vector3(
	    parent.position.x + width + width * 0.2,
	    parent.position.x,
	    parent.position.z
	  );

	  // add baked element to aframe scene
	  var bakedEl = document.createElement('a-entity');
	  bakedEl.setAttribute('position', position);
	  bakedEl.setAttribute('io3d-data3d', 'key:' + storageId + ';lightMapExposure:1.1;lightMapIntensity:0.85;');
	  parent.el.append(bakedEl);

	  // select baked file
	  bakedEl.addEventListener('model-loaded', function () {
	    AFRAME.INSPECTOR.selectEntity(bakedEl);
	  });

	}

	function createUi () {

	  mainUiEl = el('<div>',{
	    id: 'io3d-inspector-plugins___bake-lightmaps___container'
	  }).appendTo(document.body);

	  var mainBar = el('<div>',{
	    id: 'io3d-inspector-plugins___bake-lightmaps___main-bar'
	  }).appendTo(mainUiEl);

	  el('<span>', {
	    html: 'bake lightmaps API 🔥'
	  }).appendTo(mainBar);

	  el('<a>', {
	    html: 'github',
	    href: 'https://github.com/archilogic-com/3dio-inspector-plugins/'
	  }).appendTo(mainBar);

	  el('<a>', {
	    html: 'questions?',
	    href: window.encodeURI('https://stackoverflow.com/questions/tagged/aframe and 3d.io or archilogic')
	  }).appendTo(mainBar);

	  el('<a>', {
	    html: 'x',
	    click: hide$2
	  }).appendTo(mainBar);

	  el('<div>',{
	    id: 'io3d-inspector-plugins___bake-lightmaps___bake-button',
	    text: 'BAKE',
	    click: function () {
	      bakeLightmaps(AFRAME.INSPECTOR.selected);
	    }
	  }).appendTo(mainUiEl);

	}

	function show$2 () {

	  init$2();
	  if (isVisible) return
	  isVisible = true;

	  mainUiEl.show();

	}

	function hide$2 () {

	  if (!isVisible) return
	  isVisible = false;

	  mainUiEl.hide();

	}

	// expose API

	var bakeLightmapsPlugin = {
	  show: show$2,
	  hide: hide$2,
	  bakeLightmaps: bakeLightmaps
	};

	// plugin manager & menu
	// plugins
	var PLUGINS = {
	  // name
	  furnitureLibrary: {
	    // ui
	    displayTitle: '🏠&nbsp;&nbsp;furniture library',
	    // access
	    module: furnitureLibraryPlugin
	  },
	  bakeLightmaps: {
	    displayTitle: '🔥&nbsp;&nbsp;bake lightmaps',
	    module: bakeLightmapsPlugin
	  }
	};

	var initialPluginName = null;

	function setInitialPlugin (name) {
	  initialPluginName = name;
	}

	// check dependencies
	if (!window.AFRAME) {
	  throw 'Error loading 3d.io Inspector Plugins: Missing dependency: "AFRAME"\n'+
	  'Please add "<script src="https://aframe.io/releases/0.6.1/aframe.min.js"></script>" to "<head>" tag before loading 3d.io plugins.'+
	  'Read more: https://aframe.io/docs/0.7.0/introduction/'
	}
	if (!window.io3d) {
	  throw 'Error loading 3d.io Inspector Plugins: Missing dependency: "io3d"\n'+
	  'Please add "<script src="https://dist.3d.io/3dio-js/1.x.x-beta/3dio.min.js"></script>" to "<head>" tag before loading 3d.io plugins.'+
	  'Read more: https://3d.io/docs/api/1/get-started-browser.html'
	}

	// prevents 3dio lib from loading plugins (ie in dev mode)
	  window.io3d.aFrame.pluginsLoaded = true;

	// add css to page
	el('<style>', {media: 'screen', text: css}).appendTo(document.head);

	// initializes launcher with plugins
	pluginManager.setPlugins(PLUGINS);

	// handle inspector events
	if (AFRAME && AFRAME.INSPECTOR && AFRAME.INSPECTOR.opened) {
	  // inspector opened: init immediately
	  init();
	} else {
	  // initialize on inspector ready event
	  window.addEventListener('inspector-loaded', init);
	}

	function init() {
	  pluginManager.show();
	  if (initialPluginName) pluginManager.showPlugin(initialPluginName);
	}

	// expose API

	var io3dInspectorPlugins = {
	  setInitialPlugin: setInitialPlugin
	};

	return io3dInspectorPlugins;

})));
//# sourceMappingURL=3dio-inspector-plugins.js.map
