/**
 * @preserve
 * @name 3dio-inspector-plugins
 * @version 0.0.3
 * @date 2017/10/04 22:29
 * @branch master
 * @commit 0904403455c21a9aeaa0d6b3d81b83075ab380c8
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

	var BUILD_DATE='2017/10/04 22:29', GIT_BRANCH = 'master', GIT_COMMIT = '0904403455c21a9aeaa0d6b3d81b83075ab380c8'

	var css = "#io3d-inspector-plugins * {\n  outline: none;\n  -webkit-box-sizing: border-box;\n  /* Safari/Chrome, other WebKit */\n  -moz-box-sizing: border-box;\n  /* Firefox, other Gecko */\n  box-sizing: border-box;\n  /* Opera/IE 8+ */\n}\n.io3d-inspector-plugins * {\n  outline: none;\n  -webkit-box-sizing: border-box;\n  /* Safari/Chrome, other WebKit */\n  -moz-box-sizing: border-box;\n  /* Firefox, other Gecko */\n  box-sizing: border-box;\n  /* Opera/IE 8+ */\n}\n.io3d-inspector-plugins___tab-container {\n  position: absolute;\n  font-family: Roboto, BlinkMacSystemFont, -apple-system, \"Segoe UI\", Helvetica, Arial, sans-serif;\n  font-size: 12px;\n  top: 30px;\n  left: 0;\n  bottom: 0;\n  z-index: 100000;\n}\n.io3d-inspector-plugins___tab {\n  position: absolute;\n  font-size: 12px;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 230px;\n  background-color: #2b2b2b;\n}\n@-webkit-keyframes io3d-inspector-plugins___tab___slide-in {\n  0% {\n    -webkit-transform: translateX(-40%);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: translateX(0%);\n    opacity: 1;\n  }\n}\n@keyframes io3d-inspector-plugins___tab___slide-in {\n  0% {\n    transform: translateX(-40%);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0%);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes io3d-inspector-plugins___tab___slide-out {\n  0% {\n    -webkit-transform: translateX(0%);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateX(-40%);\n    opacity: 0;\n  }\n}\n@keyframes io3d-inspector-plugins___tab___slide-out {\n  0% {\n    transform: translateX(0%);\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(-40%);\n    opacity: 0;\n  }\n}\n#io3d-inspector-plugins___3dio-button {\n  z-index: 100000;\n  position: absolute;\n  top: 39px;\n  left: 184px;\n  height: 18px;\n  text-align: right;\n  border-radius: 3px;\n  cursor: pointer;\n}\n#io3d-inspector-plugins___3dio-button svg {\n  height: 100%;\n}\n#io3d-inspector-plugins___3dio-button svg g {\n  fill: #bcbcbc;\n  stroke: #bcbcbc;\n  stroke-width: 13;\n}\n#io3d-inspector-plugins___3dio-button svg g:hover {\n  fill: #1faaf2;\n  stroke: #1faaf2;\n  stroke-width: 13;\n}\n#io3d-inspector-plugins___plugins-menu {\n  z-index: 100001;\n  position: absolute;\n  top: 0;\n  left: 250px;\n  width: 230px;\n  font-family: Roboto, BlinkMacSystemFont, -apple-system, \"Segoe UI\", Helvetica, Arial, sans-serif;\n  font-size: 12px;\n  letter-spacing: 0px;\n  color: #bcbcbc;\n}\n@-webkit-keyframes io3d-inspector-plugins___plugins-menu-slide-in {\n  0% {\n    -webkit-transform: translateY(-40%);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: translateY(0%);\n    opacity: 1;\n  }\n}\n@keyframes io3d-inspector-plugins___plugins-menu-slide-in {\n  0% {\n    transform: translateY(-40%);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0%);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes io3d-inspector-plugins___plugins-menu-slide-out {\n  0% {\n    -webkit-transform: translateY(0%);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: translateY(-40%);\n    opacity: 0;\n  }\n}\n@keyframes io3d-inspector-plugins___plugins-menu-slide-out {\n  0% {\n    transform: translateY(0%);\n    opacity: 1;\n  }\n  100% {\n    transform: translateY(-40%);\n    opacity: 0;\n  }\n}\n#io3d-inspector-plugins___plugins-menu___container {\n  background-color: rgba(0, 0, 0, 0.9);\n  padding: 0 12px 0 12px;\n}\n#io3d-inspector-plugins___plugins-menu___header {\n  padding: 14px 0 14px 0;\n  border-bottom: 1px solid #bcbcbc;\n}\n#io3d-inspector-plugins___plugins-menu___close-button {\n  position: absolute;\n  top: 0;\n  right: 12px;\n  padding: 14px 0 14px 0;\n  cursor: pointer;\n}\n#io3d-inspector-plugins___plugins-menu___button {\n  padding: 10px 0 10px 0;\n  border-bottom: 1px solid #bcbcbc;\n  cursor: pointer;\n}\n#io3d-inspector-plugins___plugins-menu___button:hover {\n  background-color: rgba(255, 255, 255, 0.2);\n}\n#io3d-inspector-plugins___plugins-menu___footer {\n  padding: 14px 0 14px 0;\n  line-height: 1.3;\n}\n#io3d-inspector-plugins___plugins-menu___footer a {\n  color: #bcbcbc;\n}\n#io3d-inspector-plugins___plugins-menu___footer a:hover {\n  color: white;\n}\n#io3d-inspector-plugins___bake-lightmaps___container {\n  font-family: Roboto, BlinkMacSystemFont, -apple-system, \"Segoe UI\", Helvetica, Arial, sans-serif;\n  position: absolute;\n  top: 0px;\n  left: 246px;\n  z-index: 100000;\n}\n#io3d-inspector-plugins___bake-lightmaps___main-bar span,\n#io3d-inspector-plugins___bake-lightmaps___main-bar a {\n  text-decoration: none;\n  display: inline-block;\n  height: 33px;\n  line-height: 33px;\n  padding: 0 12px 0 12px;\n  margin: 0 0 0 0;\n  border-left: 1px solid rgba(255, 255, 255, 0.5);\n  white-space: nowrap;\n  font-weight: 400;\n  letter-spacing: 1px;\n  font-size: 12px;\n  color: white;\n  background-color: rgba(0, 0, 0, 0.8);\n}\n#io3d-inspector-plugins___bake-lightmaps___bake-button {\n  display: inline-block;\n  cursor: pointer;\n  text-decoration: none;\n  color: white;\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: 0px;\n  height: 38px;\n  line-height: 40px;\n  padding: 0 13px 0 13px;\n  background-color: #1faaf2;\n  border-radius: 2px;\n  margin: 16px 0 0 0;\n  position: relative;\n  left: 2px;\n  top: -2px;\n  box-shadow: -2px 2px 0px 0px #105576;\n}\n#io3d-inspector-plugins___bake-lightmaps___bake-button:hover {\n  background-color: #44c3f2;\n}\n#io3d-inspector-plugins___bake-lightmaps___bake-button:active {\n  left: -1px;\n  top: 1px;\n  background-color: #105576;\n  box-shadow: -2px 2px 0px 0px rgba(0, 0, 0, 0);\n}\n#io3d-inspector-plugins___list-tab___header {\n  position: absolute;\n  width: 100%;\n  height: 64px;\n  background-color: #333;\n  top: 0;\n  left: 0;\n}\n#io3d-inspector-plugins___list-tab___title {\n  position: absolute;\n  width: 100%;\n  height: 38px;\n  line-height: 38px;\n  color: #bcbcbc;\n  padding: 0 0 0 8px;\n  top: 0;\n  left: 0;\n  letter-spacing: 1px;\n}\n#io3d-inspector-plugins___list-tab___close-button {\n  -webkit-font-smoothing: antialiased;\n  font-family: FontAwesome;\n  font-size: 16px;\n  font-weight: 200;\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  line-height: 20px;\n  border-radius: 50%;\n  text-align: center;\n  top: 9px;\n  right: 4px;\n  cursor: pointer;\n  color: #bcbcbc;\n}\n#io3d-inspector-plugins___list-tab___close-button:hover {\n  color: #1faaf2;\n}\n#io3d-inspector-plugins___list-tab___close-button:before {\n  content: \"\\f00d\";\n}\n#io3d-inspector-plugins___list-tab___search-input {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  writing-mode: horizontal-tb;\n  -webkit-rtl-ordering: logical;\n  -webkit-border-image: none;\n  font-family: \"Roboto Mono\", Consolas, \"Andale Mono\", Monaco, \"Courier New\", monospace;\n  font-size: 11px;\n  font-weight: normal;\n  letter-spacing: 0px;\n  position: absolute;\n  width: 218px;\n  height: 26px;\n  line-height: 26px;\n  top: 37px;\n  left: 6px;\n  padding: 0 0 0 7px;\n  border-radius: 5px;\n  border: 0;\n  background-color: #222222;\n}\n#io3d-inspector-plugins___list-tab___search-icon {\n  font-family: FontAwesome;\n  font-size: 12px;\n  position: absolute;\n  width: 26px;\n  height: 26px;\n  line-height: 26px;\n  top: 37px;\n  right: 0;\n  color: #4d4d4d;\n}\n#io3d-inspector-plugins___list-tab___search-icon:before {\n  content: \"\\f002\";\n}\n#io3d-inspector-plugins___list-tab___list-container {\n  position: absolute;\n  width: 100%;\n  top: 64px;\n  left: 0;\n  bottom: 0;\n  padding: 0 0 20px 0;\n  overflow: auto;\n  background-color: #2b2b2b;\n}\n#io3d-inspector-plugins___list-tab___list-info {\n  position: relative;\n  display: block;\n  padding: 10px;\n  width: 100%;\n  color: #bcbcbc;\n  line-height: 1.3;\n}\n#io3d-inspector-plugins___list-tab___list-info a {\n  color: #bcbcbc;\n}\n#io3d-inspector-plugins___list-tab___list-info a:hover {\n  color: white;\n}\n#io3d-inspector-plugins___list-tab___list-item-container {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 4px 0 0 4px;\n}\n#io3d-inspector-plugins___list-tab___list-item-container .io3d-inspector-plugins___list-item {\n  display: inline-block;\n  margin: 4px 0 0 4px;\n  position: relative;\n  width: 98px;\n  height: 98px;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  user-select: none;\n  /* Required to make elements draggable in old WebKit */\n  -khtml-user-drag: element;\n  -webkit-user-drag: element;\n  border: 1px dotted rgba(255, 255, 255, 0.4);\n  border-radius: 3px;\n  overflow: hidden;\n  -webkit-transition: border-color 1500ms;\n  transition: border-color 1500ms;\n  cursor: move;\n  /* fallback if grab cursor is unsupported */\n  cursor: grab;\n  cursor: -moz-grab;\n  cursor: -webkit-grab;\n}\n#io3d-inspector-plugins___list-tab___list-item-container .io3d-inspector-plugins___list-item:active {\n  cursor: grabbing;\n  cursor: -moz-grabbing;\n  cursor: -webkit-grabbing;\n}\n#io3d-inspector-plugins___list-tab___list-item-container .io3d-inspector-plugins___list-item:hover {\n  background-color: #333;\n}\n#io3d-inspector-plugins___list-tab___list-item-container .io3d-inspector-plugins___list-item img {\n  position: absolute;\n  opacity: 0;\n  -webkit-transition: opacity 1500ms;\n  transition: opacity 1500ms;\n}\n#io3d-inspector-plugins___list-tab___drop-plane {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 230px;\n  height: 100%;\n  background-color: rgba(33, 172, 242, 0.15);\n  border: 2px solid #21acf2;\n  z-index: 100000;\n  opacity: 0;\n  -webkit-transition: opacity 200ms;\n  transition: opacity 200ms;\n}\n#io3d-inspector-plugins___list-tab___drop-plane-info {\n  width: 100%;\n  height: 100%;\n  line-height: 100vh;\n  text-align: center;\n  color: rgba(33, 172, 242, 0.2);\n  font-size: 68px;\n  font-weight: 400;\n  letter-spacing: 2px;\n}\n";

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
	  el.empty = function emptyElement () {
	    while (el.lastChild) el.removeChild(el.lastChild);
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

	function setPlugins (plugins_) {
	  plugins = plugins_;
	}

	function init$1 () {

	  isInitialized = true;

	  // DOM

	  // 3d.io button in action bar

	  io3dButtonEl = el('<div>', {
	    id: 'io3d-inspector-plugins___3dio-button',
	    class: 'io3d-inspector-plugins',
	    html: svg3dioLogo,
	    click: toggleMenu
	  }).appendTo(document.body);

	  // launcher menu

	  menuContainerEl = el('<div>', {
	    id: 'io3d-inspector-plugins___plugins-menu',
	    class: 'io3d-inspector-plugins'
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

	  Object.keys(plugins).forEach(function (name) {
	    var pluginButton = el('<div>', {
	      id: 'io3d-inspector-plugins___plugins-menu___button',
	      html: plugins[name].displayTitle,
	      click: function () {
	        showPlugin(name);
	      }
	    });
	    pluginButton.addEventListener('click', function () {

	    });
	    menuEl.append(pluginButton);
	  });

	  el('<div>', {
	    id: 'io3d-inspector-plugins___plugins-menu___footer',
	    html: 'This project is <a target="_blank" href="https://github.com/archilogic-com/3dio-inspector-plugins">open source</a>. You can also use all APIs directly in your own webVR & webAR apps. <a target="_blank" href="https://3d.io/docs/api/1/">Read more</a>'
	  }).appendTo(menuEl);

	}

	function showPlugin (name, animate) {

	  if (activePluginName) {
	    if (name === activePluginName && plugins[activePluginName].module.isVisible) {
	      return
	    } else {
	      plugins[activePluginName].module.hide(null, animate);
	    }
	  }

	  if (name) {
	    if (!plugins[name]) {
	      console.error('Plugin "' + name + '" not found. Available plugins are: "' + Object.keys(plugins).join('", "') + '"');

	    } else {
	      if (!plugins[name].module.isVisible) plugins[name].module.show(null, animate);

	      activePluginName = name;
	      hideMenu();

	    }
	  }

	}

	function show3dioButton () {

	  if (!isInitialized) init$1();

	  io3dButtonEl.show();

	}

	function hide3dioButton (callback) {

	  io3dButtonEl.hide();
	  if (activePluginName) plugins[activePluginName].module.hide(callback);
	  hideMenu();

	}

	function toggleMenu () {

	  isVisibleMenu ? hideMenu() : showMenu();

	}

	function showMenu (callback) {

	  if (isVisibleMenu) return
	  isVisibleMenu = true;

	  if (!isInitialized) init$1();

	  window.dispatchEvent(new CustomEvent('io3d-inspector-plugins-menu-state', {detail: {isVisible: true}}));

	  menuEl.style.opacity = 0;
	  menuEl.style.display = 'block';

	  menuEl.style['-webkit-animation'] = '600ms io3d-inspector-plugins___plugins-menu-slide-in cubic-bezier(0.2, 0.80, 0.5, 1)';
	  menuEl.style['animation'] = '600ms io3d-inspector-plugins___plugins-menu-slide-in cubic-bezier(0.2, 0.80, 0.5, 1)';
	  menuEl.style['-webkit-animation-fill-mode'] = 'forwards';
	  menuEl.style['animation-fill-mode'] = 'forwards';

	  if (callback && typeof callback === 'function') setTimeout(function () { callback(); }, 500);

	  return pluginManager

	}

	function hideMenu (callback) {

	  if (!isVisibleMenu) return
	  isVisibleMenu = false;

	  window.dispatchEvent(new CustomEvent('io3d-inspector-plugins-menu-state', {detail: {isVisible: false}}));

	  menuEl.style['-webkit-animation'] = '600ms io3d-inspector-plugins___plugins-menu-slide-out ease-in';
	  menuEl.style['animation'] = '600ms io3d-inspector-plugins___plugins-menu-slide-out ease-in';
	  menuEl.style['-webkit-animation-fill-mode'] = 'forwards';
	  menuEl.style['animation-fill-mode'] = 'forwards';

	  // remove element
	  setTimeout(function () {
	    menuEl.style.display = 'none';
	  }, 600);
	  // trigger callback function
	  if (callback && typeof callback === 'function') setTimeout(function () { callback(); }, 300);

	  return pluginManager

	}

	// API

	var pluginManager = {
	  setPlugins: setPlugins,
	  showPlugin: showPlugin,
	  show3dioButton: show3dioButton,
	  hide3dioButton: hide3dioButton,
	  showMenu: showMenu,
	  hideMenu: hideMenu
	};

	function createTabUi () {

	  // internals

	  var isVisible = false;

	  // DOM

	  var tabContainerEl = el('<div>', {
	    class: 'io3d-inspector-plugins io3d-inspector-plugins___tab-container',
	  }).appendTo(document.body);

	  var tabEl = el('<div>', {
	    class: 'io3d-inspector-plugins___tab'
	  }).appendTo(tabContainerEl);

	  // methods

	  function slideIn (callback, animate) {

	    if (isVisible) return
	    isVisible = true;

	    animate = animate !== undefined ? animate : true;

	    if (animate) {

	      tabEl.style.opacity = 0;
	      tabEl.style.display = 'block';

	      tabEl.style['-webkit-animation'] = '600ms io3d-inspector-plugins___tab___slide-in cubic-bezier(0.2, 0.80, 0.5, 1)';
	      tabEl.style['animation'] = '600ms io3d-inspector-plugins___tab___slide-in cubic-bezier(0.2, 0.80, 0.5, 1)';
	      tabEl.style['-webkit-animation-fill-mode'] = 'forwards';
	      tabEl.style['animation-fill-mode'] = 'forwards';

	      if (typeof callback === 'function') setTimeout(function () { callback(); }, 500);

	    } else {

	      if (typeof callback === 'function') callback();

	    }

	  }

	  function slideOut (callback, animate) {

	    if (!isVisible) return
	    isVisible = false;

	    animate = animate !== undefined ? animate : true;

	    if (animate) {

	      tabEl.style['-webkit-animation'] = '600ms io3d-inspector-plugins___tab___slide-out ease-in';
	      tabEl.style['animation'] = '600ms io3d-inspector-plugins___tab___slide-out ease-in';
	      tabEl.style['-webkit-animation-fill-mode'] = 'forwards';
	      tabEl.style['animation-fill-mode'] = 'forwards';

	      // remove element
	      setTimeout(function () {
	        tabEl.style.display = 'none';
	      }, 600);

	      if (typeof callback === 'function') setTimeout(function () { callback(); }, 300);

	    } else {

	      if (typeof callback === 'function') callback();

	    }

	  }

	  // expose API

	  return {
	    slideIn: slideIn,
	    slideOut: slideOut,
	    el: tabEl
	  }

	}

	var pickingPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000000, 1000000), new THREE.MeshBasicMaterial());
	pickingPlane.rotation.x = -Math.PI / 2;
	pickingPlane.updateMatrixWorld();
	var pickingVector = new THREE.Vector3();
	var pickingRaycaster = new THREE.Raycaster();

	function pickPointOnGroundPlane (args) {

	  // API
	  var x = args.x;
	  var y = args.y;
	  var canvas = args.canvas;
	  var camera = args.camera;

	  // get normalized 2D coordinates
	  var viewport = canvas.getBoundingClientRect();
	  var nX = 2 * (x - viewport.left) / viewport.width - 1;
	  var nY = -(2 * (y - viewport.top) / viewport.height - 1);

	  // setup raycaster
	  pickingRaycaster.set(
	    camera.position,
	    pickingVector.set(nX, nY, 1).unproject(camera).sub(camera.position).normalize()
	  );

	  // shoot ray
	  var intersects = pickingRaycaster.intersectObject(pickingPlane);

	  // in case of no result
	  if (!intersects.length === 0) {
	    console.warn('Picking raycaster got 0 results.');
	    return new THREE.Vector3()
	  }

	  return intersects[0].point

	}

	function getCenteredImageLayout (args) {

	  // API
	  var originalWidth = args.originalWidth,
	    originalHeight = args.originalHeight,
	    maxWidth = args.maxWidth,
	    maxHeight = args.maxHeight;

	  // internals
	  var top, left, newWidth, newHeight,
	    ratio = originalWidth / originalHeight;

	  if (ratio > 1) {
	    // landscape
	    top = Math.round((maxHeight - maxHeight / ratio) / 2);
	    left = 0;
	    newWidth = maxWidth;
	    newHeight = Math.round(maxHeight / ratio);
	  } else {
	    // portrait
	    top = 0;
	    left = Math.round((maxWidth - maxWidth * ratio) / 2);
	    newWidth = Math.round(maxWidth * ratio);
	    newHeight = maxHeight;
	  }

	  return { top:top, left:left, width:newWidth, height:newHeight }

	}

	// internals

	function createListTabUi (args) {

	  // API

	  var title = args.title;
	  var onSearchChangeCallback = args.onSearchChange;
	  var onSearchInputCallback = args.onSearchInput;
	  var onItemDropCallback = args.onItemDrop;
	  var onHide = args.onHide;

	  // internals

	  var isInitialized = false;
	  var tab;
	  var listInfoEl;
	  var listItemContainerEl;
	  var dropPlaneEl;
	  var searchInputEl;

	  var scope = {
	    setInfo: setInfo,
	    setList: setList,
	    getSearchValue: getSearchValue,
	    setSearchValue: setSearchValue,
	    init: init,
	    show: show,
	    hide: hide,
	    focusSearchEl: focusSearchEl
	  };

	  // methods

	  function getSearchValue (val) {

	    return searchInputEl.value

	  }

	  function setSearchValue (val) {

	    searchInputEl.value = val;

	  }

	  function setInfo (el$$1) {

	    listInfoEl.empty();

	    if (el$$1) {
	      listInfoEl.append(el$$1).show();
	    } else {
	      listInfoEl.hide();
	    }

	  }

	  function setList (items) {

	    listItemContainerEl.empty();
	    if (items) items.forEach(function (item) {

	      var itemEl = el('<div>', {
	        class: 'io3d-inspector-plugins___list-item',
	        title: item.title ? item.title : '[no title]'
	      }).appendTo(listItemContainerEl);
	      itemEl.setAttribute('draggable', true);

	      if (item.thumb) {
	        var img = el('<img>').appendTo(itemEl);
	        img.addEventListener('load', function () {

	          // center image filling container div
	          var layout = getCenteredImageLayout({
	            originalWidth: img.width,
	            originalHeight: img.height,
	            maxWidth: 90,
	            maxHeight: 90
	          });
	          img.style.top = (layout.top + 3) + 'px';
	          img.style.left = (layout.left + 3) + 'px';
	          img.style.width = (layout.width + 3) + 'px';
	          img.style.height = (layout.height + 3) + 'px';

	          img.style.opacity = 1;
	          itemEl.style.borderColor = 'transparent';

	        });
	        img.src = item.thumb;
	      }

	      itemEl.addEventListener('dragstart', function onItemDragStart (e) {
	        if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting.
	        fadeInDropPlane();
	        e.dataTransfer.effectAllowed = 'move';
	        e.dataTransfer.setData('text/plain', JSON.stringify(item));
	        return false
	      }, false);

	      itemEl.addEventListener('dragend', function onItemDragEnd (e) {
	        if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting.
	        fadeOutDropPlane();
	        return false
	      }, false);

	      itemEl.addEventListener('click', function onItemDragStart (e) {
	        if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting.
	        io3d.utils.ui.message('Hint: Drag & drop item into the scene ;)');
	        return false
	      }, false);

	    });

	  }

	  function init () {

	    tab = createTabUi();

	    var headerEl = el('<div>', {
	      id: 'io3d-inspector-plugins___list-tab___header',
	    }).appendTo(tab.el);

	    el('<div>', {
	      id: 'io3d-inspector-plugins___list-tab___title',
	      html: title
	    }).appendTo(headerEl);

	    el('<div>', {
	      id: 'io3d-inspector-plugins___list-tab___close-button',
	      click: hide
	    }).appendTo(headerEl);

	    var listContainerEl = el('<div>', {
	      id: 'io3d-inspector-plugins___list-tab___list-container',
	    }).appendTo(tab.el);

	    listInfoEl = el('<div>', {
	      id: 'io3d-inspector-plugins___list-tab___list-info',
	    }).appendTo(listContainerEl);

	    listItemContainerEl = el('<div>', {
	      id: 'io3d-inspector-plugins___list-tab___list-item-container',
	    }).appendTo(listContainerEl);

	    dropPlaneEl = el('<div>', {
	      id: 'io3d-inspector-plugins___list-tab___drop-plane',
	      style: 'display: none;'
	    }).appendTo(document.body);
	    dropPlaneEl.addEventListener('dragover', onItemDragOver, false);
	    dropPlaneEl.addEventListener('drop', onItemDrop, false);
	    
	    if (onSearchInputCallback || onSearchChangeCallback) {

	      // add search bar
	      
	      searchInputEl = el('<input>', {
	        id: 'io3d-inspector-plugins___list-tab___search-input',
	        placeholder: 'Search...'
	      }).appendTo(headerEl);

	      if (onSearchChangeCallback) searchInputEl.addEventListener('change', function () {
	        onSearchChangeCallback(searchInputEl.value);
	      });

	      if (onSearchInputCallback) searchInputEl.addEventListener('input', function () {
	        onSearchInputCallback(searchInputEl.value);
	      });

	      el('<div>', {
	        id: 'io3d-inspector-plugins___list-tab___search-icon',
	      }).appendTo(headerEl);

	      headerEl.style.height = listContainerEl.style.top = '68px';

	    } else {

	      // no search bar

	      headerEl.style.height = listContainerEl.style.top = '37px';

	    }

	    // overlay plane for drag and drop
	    
	    el('<div>', {
	      id: 'io3d-inspector-plugins___list-tab___drop-plane-info',
	      text: 'drop here'
	    }).appendTo(dropPlaneEl);

	    isInitialized = true;

	  }

	  function onItemDragOver (e) {

	    if (e.preventDefault) e.preventDefault(); // Necessary. Allows us to drop.

	    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

	    return false

	  }

	  function onItemDrop (e) {

	    if (e.preventDefault) e.preventDefault(); // stops the browser from redirecting.
	    if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting.

	    // hide dropPlaneEl
	    fadeOutDropPlane();

	    // get picking point
	    var position = pickPointOnGroundPlane({
	      x: e.x,
	      y: e.y,
	      canvas: AFRAME.scenes[0].canvas,
	      camera: AFRAME.INSPECTOR.EDITOR_CAMERA
	    });

	    // get item data
	    var item = JSON.parse(e.dataTransfer.getData('text/plain'));

	    onItemDropCallback(item, position);

	    return false
	  }

	  function fadeInDropPlane () {
	    dropPlaneEl.style.display = 'block';
	    setTimeout(function () {
	      dropPlaneEl.style.opacity = 1;
	    }, 50);
	  }

	  function fadeOutDropPlane () {
	    dropPlaneEl.style.opacity = 0;
	    setTimeout(function () {
	      dropPlaneEl.style.display = 'none';
	    }, 300);
	  }

	  function show (callback, animate) {
	    if (!isInitialized) init();
	    tab.slideIn(function () {
	      focusSearchEl();
	      if (typeof callback === 'function') callback();
	    }, animate);
	  }

	  function hide (callback, animate) {
	    if (typeof onHide === 'function') onHide();
	    tab.slideOut(callback, animate);
	  }

	  function focusSearchEl () {
	    if (searchInputEl) {
	      setTimeout(function () {
	        searchInputEl.focus();
	        searchInputEl.selectionStart = 10000;
	        searchInputEl.selectionEnd = 10000;
	      }, 50);
	    }
	  }

	  // expose API

	  return scope

	}

	function debounce (func, options) {

	  // API
	  options = options || {};
	  var wait = options.wait !== undefined ? options.wait : 500;
	  var immediate = options.immediate !== undefined ? options.immediate : false;
	  var context = options.context !== undefined ? options.context : this;

	  // validate
	  if (wait === 0) throw 'param "wait" must be larger than 0'
	  if (typeof func !== 'function') throw 'Please provide a function as first argument'

	  // internals
	  var args, timeout = null;

	  // (based on underscore)
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  function runLater () {
	    timeout = null;
	    if (!immediate) func.apply(context, args);
	  }

	  return function debounced () {
	    args = arguments;
	    if (timeout) clearTimeout(timeout);
	    timeout = setTimeout(runLater, wait);
	    if (immediate && !timeout) func.apply(context, args);
	  }

	}

	var searchDebounced = debounce(function search(value){

	  listTab.setList(null);
	  listTab.setInfo('Loading ...');

	  io3d.furniture
	    .search(value, {limit: 150})
	    // ... and update view when ready
	    .then(function (results) {

	      var items = results.map(function (item_) {
	        return {
	          title: item_.name,
	          thumb: 'https://res.cloudinary.com/archilogic/image/fetch/c_limit,h_150,w_150/' + item_.indexImage,
	          furnitureId: item_.id
	        }
	      });

	      listTab.setList(items);

	      if (items.length) {
	        // show some info on models
	        listTab.setInfo('<a target="_blank" href="https://furniture.3d.io/">3d.io Furniture Library</a>. All models have environment based texture sets: loading automatically small textures on mobile and DDS textures progressively on desktop. Enjoy ;)');
	      } else {
	        // show no result text
	        listTab.setInfo('Sorry, we didn\'t find any furniture for your query.<br><br>Try one of the following: desk, couch, bathroom, bed, plant, office, outdoor, kids, lamp, chair, red chair, car, vitra, eames, zaha hadid, piano, black, blue ...');
	      }

	    })
	    // ... or catch errors
	    .catch(function (error) {
	      console.error(error);
	      io3d.utils.message.error('Sorry, something went wrong:\n\n' + JSON.stringify(error, null, 2));
	    });

	});

	// config

	var DEFAULT_SEARCH_VALUE = 'chair';

	// export

	var scope = {
	  show: show$1,
	  hide: hide$1,
	  isVisible: false
	};

	// internals

	var isInitialized$1 = false;
	var listTab;

	// methods

	function init$2 () {

	  listTab = createListTabUi({
	    title: 'Furniture Library',
	    onSearchInput: searchDebounced,
	    onItemDrop: addToScene,
	    onHide: function () {
	      scope.isVisible = false;
	    }
	  });

	  isInitialized$1 = true;

	}

	function addToScene (item, position) {

	  // add new entity to scene
	  var newEntity = document.createElement('a-entity');
	  newEntity.setAttribute('io3d-furniture', 'id', item.furnitureId);
	  newEntity.setAttribute('position', position.x + ' 0 ' + position.z);
	  document.querySelector('a-scene').appendChild(newEntity);

	}

	function show$1 (callback, animate) {

	  if (!isInitialized$1) init$2();

	  if (scope.isVisible) return
	  scope.isVisible = true;

	  listTab.show(callback, animate);

	  if (!listTab.getSearchValue()) {
	    searchDebounced(DEFAULT_SEARCH_VALUE);
	    listTab.setSearchValue(DEFAULT_SEARCH_VALUE);
	  }

	}

	function hide$1 (callback, animate) {

	  if (!isInitialized$1) return

	  if (!scope.isVisible) return
	  scope.isVisible = false;

	  listTab.hide(callback, animate);

	}

	// config

	var DEFAULT_SEARCH_VALUE$1 = 'house';

	// export

	var scope$1 = {
	  show: show$2,
	  hide: hide$2,
	  isVisible: false
	};

	// internals

	var isInitialized$2 = false;
	var listTab$1;

	// methods

	function init$3 () {

	  listTab$1 = createListTabUi({
	    title: 'Google Blocks',
	    onSearchChange: search,
	    onItemDrop: addToScene$1,
	    onHide: function () {
	      scope$1.isVisible = false;
	    }
	  });

	  isInitialized$2 = true;

	}

	function callSearchApi (offset, value) {
	  return fetch('https://gblock.3d.io/api/search?limit=10&offset=' + offset + '&query=' + value).then(function (response) {
	    return response.json()
	  })
	}

	function search (value, offset) {

	  listTab$1.setInfo('Loading ...');
	  listTab$1.setList(null);

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
	    });

	    listTab$1.setList(items);
	    var info = 'API code is open sourced on <a target="_blank" href="https://github.com/archilogic-com/aframe-gblock/blob/master/server/api-methods.js">github</a>';
	    listTab$1.setInfo(items.length ? info : 'No results found.');

	  }).catch(function (error) {
	    console.error(error);
	    io3d.utils.ui.message.error('Sorry, something went wrong:\n\n' + JSON.stringify(error, null, 2));
	  });

	}

	function addToScene$1 (item, position) {

	  var uiMessage = io3d.utils.ui.message('Loading glTF from<br><a href="' + item.url + '" target="_blank">' + item.url + '</a>', 0);

	  // add new entity to scene
	  var newEntity = document.createElement('a-entity');

	  newEntity.addEventListener('model-loaded', function (event) {

	    uiMessage.close();
	    io3d.utils.ui.message.success('Added<br><a href="' + item.url + '" target="_blank">' + item.url + '</a>');

	    // center model to picking position
	    var bb = new THREE.Box3().setFromObject(event.detail.model); // bounding box
	    var size = new THREE.Vector3(Math.abs(bb.max.x - bb.min.x), Math.abs(bb.max.y - bb.min.y), Math.abs(bb.max.z - bb.min.z));
	    position.set(
	      position.x - bb.min.x - size.x / 2,
	      -bb.min.y,
	      position.z - bb.min.z - size.z / 2
	    );

	    newEntity.setAttribute('position', position.x + ' ' + position.y + ' ' + position.z);

	  }, {once: true});

	  newEntity.addEventListener('model-error', function (event) {

	    uiMessage.close();
	    io3d.utils.ui.message.error('Sorry: ' + event.detail.message + '<br/><a href="' + item.url + '" target="_blank">' + item.url + '</a>');

	  }, {once: true});

	  newEntity.setAttribute('gblock', item.url);
	  document.querySelector('a-scene').appendChild(newEntity);

	}

	function show$2 (callback, animate) {

	  if (!isInitialized$2) init$3();

	  if (scope$1.isVisible) return
	  scope$1.isVisible = true;

	  listTab$1.show(callback, animate);

	  if (!listTab$1.getSearchValue()) {
	    search(DEFAULT_SEARCH_VALUE$1);
	    listTab$1.setSearchValue(DEFAULT_SEARCH_VALUE$1);
	  }

	}

	function hide$2 (callback, animate) {

	  if (!isInitialized$2) return

	  if (!scope$1.isVisible) return
	  scope$1.isVisible = false;

	  listTab$1.hide(callback, animate);

	}

	var staffPickItems = [{
	  title: 'Steve Jobs Theatre',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_17-55-42_Ow0tyt/sadasd.png',
	  editorUrl: 'https://spaces.archilogic.com/model/archilogic/clxtnlsv?modelResourceId=6f3a27fa-51e0-4773-9cb7-87d497b554af&mode=edit',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/171002-1952-zypqqx/archilogic_2017-10-02_19-51-14_6MiTgp.gz.data3d.buffer',
	    lightMapExposure: 0.626,
	    lightMapIntensity: 2.166
	  }
	},{
	  title: 'Millennium Falcon',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_17-57-37_4xyPaE/localhost_8081_examples_staff-picks_html_4.png',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/170903-1554-hl8t6r/archilogic_2017-09-03_15-47-13_dkhZ1I.gz.data3d.buffer'
	  },
	  type: 'io3d-data3d'
	},{
	  title: 'Loewy House by Albert Frey',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_14-51-45_Obk9pz/Cursor_and_Archilogic.png',
	  editorUrl: 'https://spaces.archilogic.com/model/archilogic/wlnobthy?modelResourceId=88ac69d1-28c1-406c-890c-1f86531e2a31&mode=edit',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/171002-1928-ticazn/archilogic_2017-10-02_19-25-55_TGu8vT.gz.data3d.buffer'
	  }
	},{
	  title: 'Architecture Cardboard Model',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_14-26-46_cBo1I6/localhost_8081_examples_staff-picks_html_copy.png',
	  editorUrl: 'https://spaces.archilogic.com/model/archilogic/psm59wss?modelResourceId=3e03a0e7-587b-473f-86b1-32fba6c13a8d&mode=edit',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/171002-1509-2xzmx3/archilogic_2017-10-02_14-50-27_85SdOH.gz.data3d.buffer',
	    lightMapIntensity: 0.850,
	    lightMapExposure: 0.9
	  }
	},{
	  title: 'Big Bang Theory',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_16-30-51_8ZMkZR/Cursor_and_Archilogic_2.png',
	  editorUrl: 'https://spaces.archilogic.com/model/archilogic/fljox97z?modelResourceId=60dde7c8-d481-475f-9c0f-8ecbe57cef05&mode=edit',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/171002-1837-069qe5/archilogic_2017-10-02_18-36-42_jZBOac.gz.data3d.buffer',
	    lightMapIntensity: 3,
	    lightMapExposure: 0.541
	  }
	},{
	  title: 'Room (with lightmaps)',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_12-39-00_OoAMZ9/localhost_8081.png',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/170918-2056-hp86we/archilogic_2017-09-18_20-56-43_B4LLEX.gz.data3d.buffer',
	  }
	},{
	  title: 'Bridge House',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_14-54-19_hRwy6W/localhost_8081_examples_staff-picks_html.png',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/170927-2018-a10bpi/archilogic_2017-09-27_20-18-12_GT3EQI.gz.data3d.buffer'
	  }
	},{
	  title: 'The Office',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_14-57-25_gyGxcm/khjghfd.png',
	  editorUrl: 'https://spaces.archilogic.com/3d/archilogic/nsh7wfvq?modelResourceId=3d6acff4-abcd-4c58-b3f3-d56d99642199&mode=edit',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/171004-1708-j45k01/archilogic_2017-10-04_17-07-52_TZmYmS.gz.data3d.buffer'
	  }
	},{
	  title: '55 West 17th Street @night',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_16-31-03_NaN4m8/Cursor_and_Archilogic_3.png',
	  editorUrl: 'https://spaces.archilogic.com/model/archilogic/empzwgkx?modelResourceId=e717c8e5-3d7c-423b-b2f2-21874665a5b3&mode=edit',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/171002-1827-w81rq6/archilogic_2017-10-02_18-25-28_CYLCC5.gz.data3d.buffer',
	    lightMapIntensity: 2, //2.86,
	    lightMapExposure: 0.6 //0.672
	  }
	},{
	  title: null,
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_16-47-24_dmVHK7/localhost_8081_examples_staff-picks_html_2.png',
	  editorUrl: null,
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/processing/2017-09-20_11-42-38_Vnv6ma/lighting.gz.data3d.buffer',
	    lightMapIntensity: 1.2,
	    lightMapExposure: 0.6
	  }
	},{
	  title: 'Apartment (with lightmaps)',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_14-49-30_4F8kDN/apt.png',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/170725-1421-wujxjb/archilogic_2017-07-25_14-19-02_hn9axa.gz.data3d.buffer'
	  }
	},{
	  title: 'Case Study House 4, Ralph Rapson',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_16-01-30_aXZWGC/jzthgf.png',
	  editorUrl: 'https://spaces.archilogic.com/model/archilogic/krxvla7n?modelResourceId=ac682b97-3c9b-45a0-9c90-f1534ea769d3&mode=edit',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/171002-1754-b4u6gv/archilogic_2017-10-02_17-52-50_41hXdK.gz.data3d.buffer',
	    lightMapIntensity: 2,
	    lightMapExposure: 0.576
	  }
	},{
	  title: 'Stahl House',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_14-41-55_xBsnUO/sadsad.png',
	  editorUrl: 'https://spaces.archilogic.com/model/archilogic/la7jhe3t?modelResourceId=216cfcbc-82d3-4ad0-a834-e6cfbb173dcb&mode=edit',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/171002-1639-r2mus5/archilogic_2017-10-02_16-39-08_HYWIGh.gz.data3d.buffer'
	  }
	},{
	  title: 'The Office (baked white)',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-04_16-22-37_Od7ppw/qwesadsad-1.png',
	  editorUrl: 'https://spaces.archilogic.com/model/archilogic/uhyxqfvr?modelResourceId=34bfdbba-a44d-4268-bdb8-6b7cfe719555',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/171002-1644-4cfpoh/archilogic_2017-10-02_16-44-01_5CoeyU.gz.data3d.buffer',
	    lightMapIntensity: 1.4,
	    lightMapExposure: 0.83
	  }
	},{
	  title: 'Empty apartment (with lightmaps)',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-04_16-21-52_z16iGz/localhost_8081_examples_staff-picks_html_5.png',
	  editorUrl: 'https://spaces.archilogic.com/3d/archilogic/h4959x0g?modelResourceId=62cb3510-6708-4f62-94c3-f9936db7e20b',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/bake/2017-06-30_11-05-49_P144IW/regular/lighting.gz.data3d.buffer',
	    lightMapIntensity: 1.2,
	    lightMapExposure: 0.6
	  }
	},{
	  title: 'Room (no lightmaps)',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_14-31-08_k31wKT/sdasd.png',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/535e624259ee6b0200000484/170918-2106-0sr2cn/9fd87fec-8bdd-4bc1-b9ba-bbfc47d08008.gz.data3d.buffer'
	  },
	},{
	  title: 'Test Cube',
	  thumb: 'https://storage.3d.io/535e624259ee6b0200000484/2017-10-02_12-30-54_8do34C/localhost_8081.png',
	  type: 'io3d-data3d',
	  attributes: {
	    url: 'https://storage.3d.io/archilogic/sample-models/cube-with-texture/data3d/cube-with-texture.gz.data3d.buffer',
	  }
	}];

	// export

	var scope$2 = {
	  show: show$3,
	  hide: hide$3,
	  isVisible: false
	};

	// internal

	var isInitialized$3 = false;
	var listTab$2;

	// method

	function init$4 () {

	  listTab$2 = createListTabUi({
	    title: 'Staff Pics',
	    listInfo: 'A growing list of models for testing and demo purposes.',
	    onItemDrop: addToScene$2,
	    onHide: function () {
	      scope$2.isVisible = false;
	    }
	  });

	  listTab$2.init();

	  listTab$2.setInfo('<a target="_blank" href="https://spaces.archilogic.com">Archilogic Models</a> for experimenting & testing. Kudos to <a target="_blank" href="https://twitter.com/Pandatology">@Pandatology</a>, <a target="_blank" href="https://twitter.com/anialdam">@anialdam</a>');
	  listTab$2.setList(staffPickItems);

	  isInitialized$3 = true;

	}

	function addToScene$2 (item, position) {

	  var uiMessage = io3d.utils.ui.message('Loading'+(item.title ? ' "'+item.title+'" ' : ' ') +'...', 0);

	  // add new entity to scene
	  var newEntity = document.createElement('a-entity');

	  newEntity.addEventListener('model-loaded', function (event) {

	    uiMessage.close();
	    io3d.utils.ui.message.success('Added'+(item.title ? ' "'+item.title+'"' : 'model'));

	    // center model to picking position

	    var bb = new THREE.Box3().setFromObject(event.detail.model); // bounding box
	    var size = new THREE.Vector3(Math.abs(bb.max.x - bb.min.x), Math.abs(bb.max.y - bb.min.y), Math.abs(bb.max.z - bb.min.z));
	    position.set(
	      position.x - bb.min.x - size.x / 2,
	      -bb.min.y,
	      position.z - bb.min.z - size.z / 2
	    );

	    newEntity.setAttribute('position', position.x + ' 0 ' + position.z);

	  }, {once: true});

	  newEntity.setAttribute(item.type, stringifyAttributes(item.attributes));

	  // add other attributes

	  document.querySelector('a-scene').appendChild(newEntity);

	}

	function show$3 (callback, animate) {

	  if (!isInitialized$3) init$4();

	  if (scope$2.isVisible) return
	  scope$2.isVisible = true;

	  listTab$2.show(callback, animate);

	}

	function hide$3 (callback, animate) {

	  if (!isInitialized$3) return

	  if (!scope$2.isVisible) return
	  scope$2.isVisible = false;

	  listTab$2.hide(callback, animate);

	}

	function stringifyAttributes (attributes) {
	  var s = '';
	  Object.keys(attributes).forEach(function(name){
	    s += name +': '+ attributes[name] +'; ';
	  });
	  return s
	}

	// plugin manager & menu
	// plugins
	var PLUGINS = {
	  // name
	  furnitureLibrary: {
	    // ui
	    displayTitle: '🏠&nbsp;&nbsp;furniture library',
	    // access
	    module: scope
	  },
	  googleBlocks: {
	    displayTitle: '🥑&nbsp;&nbsp;google blocks',
	    module: scope$1
	  },
	  staffPicks: {
	    displayTitle: '✨&nbsp;&nbsp;staff picks',
	    module: scope$2
	  }
	};

	window.io3d.aFrame.activePluginName = null;

	function setInitialPlugin (name) {
	  window.io3d.aFrame.activePluginName = name;
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
	window.io3d.aFrame.pluginsLoaded = true;

	// add css to page
	var cssEl = el('<style>', {
	  id: 'io3d-inspector-plugins___css',
	  media: 'screen',
	  text: css
	});

	function appendCss () {
	  cssEl.appendTo(document.head);
	}

	function detachCss () {
	  document.head.removeChild(cssEl);
	}

	// initializes launcher with plugins
	pluginManager.setPlugins(PLUGINS);

	// handle inspector events
	if (AFRAME && AFRAME.INSPECTOR && AFRAME.INSPECTOR.opened) {
	  // inspector opened: init immediately
	  init();
	} else {
	  // initialize on inspector ready event
	  window.addEventListener('inspector-loaded', init, {once: true});
	}

	function init () {

	  if (typeof AFRAME.INSPECTOR.on !== 'function') {
	    console.warn('3dio.js: 3d.io inspector plugins require A-Frame version 0.7.0 or higher.');

	  } else {

	    if (AFRAME.INSPECTOR.opened) show();
	    AFRAME.INSPECTOR.on('inspectormodechanged', function (isOpen) {
	      isOpen ? show() : hide();
	    });

	  }

	}

	function show () {
	  appendCss();
	  pluginManager.show3dioButton();
	  if (window.io3d.aFrame.activePluginName) pluginManager.showPlugin(window.io3d.aFrame.activePluginName, false);
	}

	function hide () {
	  setInitialPlugin(null);
	  pluginManager.hide3dioButton(function () {
	    detachCss();
	  });
	}

	// expose API

	var io3dInspectorPlugins = {
	  setInitialPlugin: setInitialPlugin,
	  showMenu: pluginManager.showMenu,
	  hideMenu: pluginManager.hideMenu
	};

	return io3dInspectorPlugins;

})));
//# sourceMappingURL=3dio-inspector-plugins.js.map
