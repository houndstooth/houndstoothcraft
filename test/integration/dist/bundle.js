/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = __webpack_require__(9);

var _codeUtilities = __webpack_require__(1);

var state = (0, _codeUtilities.deepClone)(_store.defaults.DEFAULT_STATE);

exports.default = state;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var iterator = function iterator(layers) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { oneIndexed: false };

	var iterator = [].concat(_toConsumableArray(Array(Math.ceil(layers)).keys()));
	if (options.oneIndexed) iterator = iterator.map(function (k) {
		return k + 1;
	});
	return iterator;
};

var wrappedIndex = function wrappedIndex(_ref) {
	var array = _ref.array,
	    _ref$index = _ref.index,
	    index = _ref$index === undefined ? 0 : _ref$index;

	var i = void 0;
	if (index < 0) {
		i = array.length - Math.abs(index) % array.length;
		if (i === array.length) i = 0;
	} else {
		i = index % array.length;
	}
	return array[i];
};

var shallowEqual = function shallowEqual(a, b) {
	var sameKeyCount = Object.keys(a).length === Object.keys(b).length;
	return sameKeyCount && Object.entries(a).every(function (_ref2) {
		var _ref3 = _slicedToArray(_ref2, 2),
		    key = _ref3[0],
		    value = _ref3[1];

		return value === b[key];
	});
};

var deepClone = function deepClone(objectToDeepClone) {
	var clonedObject = {};
	setAllPropertiesOfObjectOnAnother({
		objectWithProperties: objectToDeepClone,
		objectToChange: clonedObject
	});
	return clonedObject;
};

var setAllPropertiesOfObjectOnAnother = function setAllPropertiesOfObjectOnAnother(_ref4) {
	var objectWithProperties = _ref4.objectWithProperties,
	    objectToChange = _ref4.objectToChange;

	Object.entries(objectWithProperties).forEach(function (_ref5) {
		var _ref6 = _slicedToArray(_ref5, 2),
		    propertyName = _ref6[0],
		    propertyValue = _ref6[1];

		objectToChange[propertyName] = deepCloneMaybeNotObject(propertyValue);
	});
};

var deepCloneMaybeNotObject = function deepCloneMaybeNotObject(maybeObjectToDeepClone) {
	var clonedMaybeObject = void 0;
	if (maybeObjectToDeepClone instanceof Array) {
		clonedMaybeObject = maybeObjectToDeepClone.slice();
	} else if (maybeObjectToDeepClone && (typeof maybeObjectToDeepClone === 'undefined' ? 'undefined' : _typeof(maybeObjectToDeepClone)) === 'object') {
		clonedMaybeObject = deepClone(maybeObjectToDeepClone);
	} else {
		clonedMaybeObject = maybeObjectToDeepClone;
	}
	return clonedMaybeObject;
};

var deeperPath = function deeperPath(_ref7) {
	var propertyPath = _ref7.propertyPath,
	    propertyName = _ref7.propertyName;

	var deeperPath = propertyPath.slice();
	deeperPath.push(propertyName);
	return deeperPath;
};

var accessChildPropertyOrCreatePath = function accessChildPropertyOrCreatePath(_ref8) {
	var objectWithProperties = _ref8.objectWithProperties,
	    propertyPath = _ref8.propertyPath;

	var childProperty = objectWithProperties;
	propertyPath.forEach(function (pathStep) {
		if (!isDefined(childProperty[pathStep])) childProperty[pathStep] = {};
		childProperty = childProperty[pathStep];
	});
	return childProperty;
};

var defaultToTrue = function defaultToTrue(property) {
	return isDefined(property) ? property : true;
};

var isDefined = function isDefined(property) {
	return typeof property !== 'undefined';
};

var propertyIsDefinedOnObject = function propertyIsDefinedOnObject(_ref9) {
	var propertyName = _ref9.propertyName,
	    objectWithProperties = _ref9.objectWithProperties;

	return isDefined(objectWithProperties[propertyName]);
};

var changeObjectIntoCopy = function changeObjectIntoCopy(_ref10) {
	var objectToChange = _ref10.objectToChange,
	    objectWithProperties = _ref10.objectWithProperties;

	Object.keys(objectToChange).forEach(function (key) {
		return delete objectToChange[key];
	});
	setAllPropertiesOfObjectOnAnother({ objectWithProperties: objectWithProperties, objectToChange: objectToChange });
};

var reversed = function reversed(array) {
	return array.slice().reverse();
};

exports.iterator = iterator;
exports.wrappedIndex = wrappedIndex;
exports.shallowEqual = shallowEqual;
exports.deepClone = deepClone;
exports.deepCloneMaybeNotObject = deepCloneMaybeNotObject;
exports.deeperPath = deeperPath;
exports.accessChildPropertyOrCreatePath = accessChildPropertyOrCreatePath;
exports.defaultToTrue = defaultToTrue;
exports.isDefined = isDefined;
exports.propertyIsDefinedOnObject = propertyIsDefinedOnObject;
exports.changeObjectIntoCopy = changeObjectIntoCopy;
exports.reversed = reversed;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
var mockDocument = {
	createElement: function createElement() {
		return null;
	},
	createTextNode: function createTextNode() {
		return null;
	},
	querySelector: function querySelector() {
		return null;
	},
	body: {
		appendChild: function appendChild() {
			return null;
		}
	}
};

var mockWindow = {
	clearInterval: function clearInterval() {
		return null;
	},
	setInterval: function setInterval() {
		return null;
	}
};

var _console = console;

var _document = global.window ? document : mockDocument;

var _window = global.window ? window : mockWindow;

exports.console = _console;
exports.document = _document;
exports.window = _window;
exports.default = _window;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var BLACK = { r: 0, g: 0, b: 0, a: 1 };
var WHITE = { r: 255, g: 255, b: 255, a: 1 };
var RED = { r: 255, g: 0, b: 0, a: 1 };
var GREEN = { r: 0, g: 255, b: 0, a: 1 };
var BLUE = { r: 0, g: 0, b: 255, a: 1 };
var CYAN = { r: 0, g: 255, b: 255, a: 1 };
var MAGENTA = { r: 255, g: 0, b: 255, a: 1 };
var YELLOW = { r: 255, g: 255, b: 0, a: 1 };

var TRANSPARENT = { a: 0 };
var ERASE = { a: -1 };

var EIGHTH_OF_CIRCLE_ROTATION = Math.PI / 4;
var QUARTER_OF_CIRCLE_ROTATION = Math.PI / 2;

var PERIMETER_SCALAR = 2;

var ANIMATION_RATE = 1.000005;

exports.BLACK = BLACK;
exports.WHITE = WHITE;
exports.RED = RED;
exports.GREEN = GREEN;
exports.BLUE = BLUE;
exports.CYAN = CYAN;
exports.MAGENTA = MAGENTA;
exports.YELLOW = YELLOW;
exports.TRANSPARENT = TRANSPARENT;
exports.ERASE = ERASE;
exports.EIGHTH_OF_CIRCLE_ROTATION = EIGHTH_OF_CIRCLE_ROTATION;
exports.QUARTER_OF_CIRCLE_ROTATION = QUARTER_OF_CIRCLE_ROTATION;
exports.PERIMETER_SCALAR = PERIMETER_SCALAR;
exports.ANIMATION_RATE = ANIMATION_RATE;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _page = __webpack_require__(13);

var _prepareFunctionsPerSetting = __webpack_require__(75);

var _prepareFunctionsPerSetting2 = _interopRequireDefault(_prepareFunctionsPerSetting);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _composeMainHoundstooth = __webpack_require__(76);

var _composeMainHoundstooth2 = _interopRequireDefault(_composeMainHoundstooth);

var _executeGrid = __webpack_require__(40);

var _executeGrid2 = _interopRequireDefault(_executeGrid);

var _executeAnimation = __webpack_require__(109);

var _executeAnimation2 = _interopRequireDefault(_executeAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var executeSelectedHoundstoothEffects = function executeSelectedHoundstoothEffects() {
	var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    _ref$houndstoothOverr = _ref.houndstoothOverrides,
	    houndstoothOverrides = _ref$houndstoothOverr === undefined ? {} : _ref$houndstoothOverr;

	(0, _composeMainHoundstooth2.default)({ houndstoothEffects: _state2.default.selectedHoundstoothEffects, houndstoothOverrides: houndstoothOverrides });

	var layerFunctions = (0, _prepareFunctionsPerSetting2.default)({
		settingsFunctions: _state2.default.mainHoundstooth.layersPattern
	});

	(0, _page.createContexts)();
	if (_state2.default.exportFrames) _state2.default.mixingDown = true;
	if (_state2.default.mixingDown) _state2.default.mixedDownContext = (0, _page.createMixedDownCanvas)();

	if (_state2.default.animating) {
		var animationFunctions = (0, _prepareFunctionsPerSetting2.default)({
			settingsFunctions: _state2.default.mainHoundstooth.animationsPattern
		});
		(0, _executeAnimation2.default)({ animationFunctions: animationFunctions, layerFunctions: layerFunctions });
	} else {
		(0, _executeGrid2.default)({ layerFunctions: layerFunctions });
	}
};

exports.default = executeSelectedHoundstoothEffects;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _setElementDimensions = __webpack_require__(29);

var _setElementDimensions2 = _interopRequireDefault(_setElementDimensions);

var _getCanvasSize = __webpack_require__(20);

var _getCanvasSize2 = _interopRequireDefault(_getCanvasSize);

var _createCanvasContainer = __webpack_require__(19);

var _createCanvasContainer2 = _interopRequireDefault(_createCanvasContainer);

var _testMarkersClear = __webpack_require__(121);

var _testMarkersClear2 = _interopRequireDefault(_testMarkersClear);

var _createTestMarkersCanvas = __webpack_require__(23);

var _createTestMarkersCanvas2 = _interopRequireDefault(_createTestMarkersCanvas);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prepareCanvasForDisplayInTest = function prepareCanvasForDisplayInTest(canvas) {
	canvas.style.display = 'block';
	canvas.style.position = 'absolute';
	canvas.style.top = 0;
	canvas.style.left = 0;
};

var activateTestMarkersCanvas = function activateTestMarkersCanvas() {
	(0, _testMarkersClear2.default)();

	var testMarkersCanvas = document.querySelector('.test-markers-canvas') || (0, _createTestMarkersCanvas2.default)();

	prepareCanvasForDisplayInTest(testMarkersCanvas);
	testMarkersCanvas.style.zIndex = 9001;

	var canvasSize = (0, _getCanvasSize2.default)();
	testMarkersCanvas.width = canvasSize[0];
	testMarkersCanvas.height = canvasSize[1];

	var testCanvasDisplayArea = document.querySelector('.test-canvas-display-area');
	testCanvasDisplayArea.style.display = 'block';

	(0, _setElementDimensions2.default)(testCanvasDisplayArea, canvasSize);

	var canvasContainer = document.querySelector('.canvas-container') || (0, _createCanvasContainer2.default)({ canvasSize: canvasSize });
	prepareCanvasForDisplayInTest(canvasContainer);

	_state2.default.mixingDown = true;
};

exports.default = activateTestMarkersCanvas;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.constants = exports.state = exports.addEffectToggles = exports.defaults = exports.rotateCoordinateAboutPoint = exports.solid = exports.executeSelectedHoundstoothEffects = exports.tileCenter = exports.perStripe = exports.standardAnimation = undefined;

var _animation = __webpack_require__(16);

var _components = __webpack_require__(41);

var _execute = __webpack_require__(21);

var _render = __webpack_require__(15);

var _space = __webpack_require__(22);

var _store = __webpack_require__(9);

var _ui = __webpack_require__(37);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _constants = __webpack_require__(3);

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.standardAnimation = _animation.standardAnimation;
exports.perStripe = _components.perStripe;
exports.tileCenter = _components.tileCenter;
exports.executeSelectedHoundstoothEffects = _execute.executeSelectedHoundstoothEffects;
exports.solid = _render.solid;
exports.rotateCoordinateAboutPoint = _space.rotateCoordinateAboutPoint;
exports.defaults = _store.defaults;
exports.addEffectToggles = _ui.addEffectToggles;
exports.state = _state2.default;
exports.constants = constants;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mixDownContexts = exports.layerIterator = exports.getCurrentContext = exports.getCanvasSize = exports.clear = undefined;

var _clear = __webpack_require__(30);

var _clear2 = _interopRequireDefault(_clear);

var _getCanvasSize = __webpack_require__(20);

var _getCanvasSize2 = _interopRequireDefault(_getCanvasSize);

var _getCurrentContext = __webpack_require__(68);

var _getCurrentContext2 = _interopRequireDefault(_getCurrentContext);

var _layerIterator = __webpack_require__(69);

var _layerIterator2 = _interopRequireDefault(_layerIterator);

var _mixDownContexts = __webpack_require__(70);

var _mixDownContexts2 = _interopRequireDefault(_mixDownContexts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.clear = _clear2.default;
exports.getCanvasSize = _getCanvasSize2.default;
exports.getCurrentContext = _getCurrentContext2.default;
exports.layerIterator = _layerIterator2.default;
exports.mixDownContexts = _mixDownContexts2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tileSectorCenterIsColor = __webpack_require__(10);

var _tileSectorCenterIsColor2 = _interopRequireDefault(_tileSectorCenterIsColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var standardTileIsColors = function standardTileIsColors(_ref) {
	var originInPixels = _ref.originInPixels,
	    tileSizeInPixels = _ref.tileSizeInPixels,
	    colors = _ref.colors,
	    baseId = _ref.baseId;

	var expectations = [{ originInPixels: originInPixels, tileSizeInPixels: tileSizeInPixels, x: 0, y: 0, n: 4, color: colors[0], id: baseId + 0 }, { originInPixels: originInPixels, tileSizeInPixels: tileSizeInPixels, x: 2, y: 0, n: 4, color: colors[1], id: baseId + 1 }, { originInPixels: originInPixels, tileSizeInPixels: tileSizeInPixels, x: 1, y: 1, n: 4, color: colors[1], id: baseId + 2 }, { originInPixels: originInPixels, tileSizeInPixels: tileSizeInPixels, x: 0, y: 2, n: 4, color: colors[1], id: baseId + 3 }, { originInPixels: originInPixels, tileSizeInPixels: tileSizeInPixels, x: 3, y: 1, n: 4, color: colors[0], id: baseId + 4 }, { originInPixels: originInPixels, tileSizeInPixels: tileSizeInPixels, x: 2, y: 2, n: 4, color: colors[0], id: baseId + 5 }, { originInPixels: originInPixels, tileSizeInPixels: tileSizeInPixels, x: 1, y: 3, n: 4, color: colors[0], id: baseId + 6 }, { originInPixels: originInPixels, tileSizeInPixels: tileSizeInPixels, x: 3, y: 3, n: 4, color: colors[1], id: baseId + 7 }];

	return expectations.every(_tileSectorCenterIsColor2.default);
};

exports.default = standardTileIsColors;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.resetState = exports.PATTERN_STRUCTURE = exports.HOUNDSTOOTH_STRUCTURE = exports.defaults = undefined;

var _defaults = __webpack_require__(18);

var defaults = _interopRequireWildcard(_defaults);

var _structures = __webpack_require__(66);

var _resetState = __webpack_require__(27);

var _resetState2 = _interopRequireDefault(_resetState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.defaults = defaults;
exports.HOUNDSTOOTH_STRUCTURE = _structures.HOUNDSTOOTH_STRUCTURE;
exports.PATTERN_STRUCTURE = _structures.PATTERN_STRUCTURE;
exports.resetState = _resetState2.default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _drawPassMarker = __webpack_require__(48);

var _drawPassMarker2 = _interopRequireDefault(_drawPassMarker);

var _pixelIsColor = __webpack_require__(24);

var _pixelIsColor2 = _interopRequireDefault(_pixelIsColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tileSectorIsColor = function tileSectorIsColor(_ref) {
	var originInPixels = _ref.originInPixels,
	    tileSizeInPixels = _ref.tileSizeInPixels,
	    x = _ref.x,
	    y = _ref.y,
	    n = _ref.n,
	    color = _ref.color,
	    id = _ref.id;

	var coordinateUnderTest = sectorCenter({ originInPixels: originInPixels, tileSizeInPixels: tileSizeInPixels, x: x, y: y, n: n });
	var passed = (0, _pixelIsColor2.default)(coordinateUnderTest, color);
	(0, _drawPassMarker2.default)({ passed: passed, coordinateUnderTest: coordinateUnderTest, id: id });
	return passed;
};

var sectorCenter = function sectorCenter(_ref2) {
	var originInPixels = _ref2.originInPixels,
	    x = _ref2.x,
	    y = _ref2.y,
	    n = _ref2.n,
	    tileSizeInPixels = _ref2.tileSizeInPixels;

	var sectorSize = tileSizeInPixels / n;
	return [originInPixels[0] + (x + 0.5) * sectorSize, originInPixels[1] + (y + 0.5) * sectorSize];
};

exports.default = tileSectorIsColor;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var STRIPE_COUNT = ['stripeSettings', 'stripePositionSettings', 'stripeCountSetting'];
var ZOOM = ['viewSettings', 'zoom'];
var CANVAS_SIZE = ['viewSettings', 'canvasSize'];
var TILE_SIZE = ['tileSettings', 'tileSizeSetting'];
var GRID_SIZE = ['gridSettings', 'gridSize'];
var OPACITY = ['colorSettings', 'opacity'];

exports.STRIPE_COUNT = STRIPE_COUNT;
exports.ZOOM = ZOOM;
exports.CANVAS_SIZE = CANVAS_SIZE;
exports.TILE_SIZE = TILE_SIZE;
exports.GRID_SIZE = GRID_SIZE;
exports.OPACITY = OPACITY;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _codeUtilities = __webpack_require__(1);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _defaults = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFromBasePatternOrDefault = function getFromBasePatternOrDefault(settingsPath) {
	var childSetting = _state2.default.mainHoundstooth.basePattern;
	var notThere = void 0;
	settingsPath.forEach(function (pathStep) {
		if (notThere) return;
		if (!(0, _codeUtilities.isDefined)(childSetting[pathStep])) {
			childSetting = undefined;
			notThere = true;
			return;
		}
		childSetting = childSetting[pathStep];
	});

	var setting = void 0;
	if ((0, _codeUtilities.isDefined)(childSetting)) {
		setting = (0, _codeUtilities.accessChildPropertyOrCreatePath)({
			objectWithProperties: _state2.default.mainHoundstooth.basePattern,
			propertyPath: settingsPath
		});
	} else {
		setting = (0, _codeUtilities.accessChildPropertyOrCreatePath)({
			objectWithProperties: _defaults.DEFAULT_PATTERN,
			propertyPath: settingsPath
		});
	}
	return setting;
};

exports.default = getFromBasePatternOrDefault;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createWarningsContainer = exports.createMixedDownCanvas = exports.createEffectTogglesContainer = exports.createContexts = undefined;

var _createContexts = __webpack_require__(67);

var _createContexts2 = _interopRequireDefault(_createContexts);

var _createEffectTogglesContainer = __webpack_require__(32);

var _createEffectTogglesContainer2 = _interopRequireDefault(_createEffectTogglesContainer);

var _createMixedDownCanvas = __webpack_require__(72);

var _createMixedDownCanvas2 = _interopRequireDefault(_createMixedDownCanvas);

var _createWarningsContainer = __webpack_require__(74);

var _createWarningsContainer2 = _interopRequireDefault(_createWarningsContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createContexts = _createContexts2.default;
exports.createEffectTogglesContainer = _createEffectTogglesContainer2.default;
exports.createMixedDownCanvas = _createMixedDownCanvas2.default;
exports.createWarningsContainer = _createWarningsContainer2.default;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var triangularNumber = function triangularNumber(n) {
	return n * (n + 1) / 2;
};

var triangularRoot = function triangularRoot(n) {
	return 0.5 * Math.sqrt(8 * n + 1) - 0.5;
};

var quarterSquareNumber = function quarterSquareNumber(n) {
	return Math.floor(Math.pow(n, 2) / 4);
};

var trapezoidalNumber = function trapezoidalNumber(_ref) {
	var start = _ref.start,
	    height = _ref.height;
	return triangularNumber(start + height) - triangularNumber(start);
};

var termialRoot = function termialRoot(_ref2) {
	var rangeStart = _ref2.rangeStart,
	    rangeDelta = _ref2.rangeDelta,
	    n = _ref2.n;

	var c = 2 * rangeStart;
	var a = Math.pow(c - rangeDelta, 2);
	var b = 8 * rangeDelta * n;
	var d = 2 * rangeDelta;
	return (Math.sqrt(a + b) - c + rangeDelta) / d;
};

exports.trapezoidalNumber = trapezoidalNumber;
exports.triangularNumber = triangularNumber;
exports.triangularRoot = triangularRoot;
exports.quarterSquareNumber = quarterSquareNumber;
exports.termialRoot = termialRoot;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.solid = exports.shape = exports.parseColor = exports.getColor = undefined;

var _getColor = __webpack_require__(42);

var _getColor2 = _interopRequireDefault(_getColor);

var _parseColor = __webpack_require__(43);

var _parseColor2 = _interopRequireDefault(_parseColor);

var _shape = __webpack_require__(87);

var _shape2 = _interopRequireDefault(_shape);

var _solid = __webpack_require__(45);

var _solid2 = _interopRequireDefault(_solid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getColor = _getColor2.default;
exports.parseColor = _parseColor2.default;
exports.shape = _shape2.default;
exports.solid = _solid2.default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.standardAnimation = exports.buildStopConditionFunction = exports.buildAnimationFunction = exports.animator = undefined;

var _animator = __webpack_require__(110);

var _animator2 = _interopRequireDefault(_animator);

var _buildAnimationFunction = __webpack_require__(112);

var _buildAnimationFunction2 = _interopRequireDefault(_buildAnimationFunction);

var _buildStopConditionFunction = __webpack_require__(118);

var _buildStopConditionFunction2 = _interopRequireDefault(_buildStopConditionFunction);

var _standardAnimation = __webpack_require__(119);

var _standardAnimation2 = _interopRequireDefault(_standardAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.animator = _animator2.default;
exports.buildAnimationFunction = _buildAnimationFunction2.default;
exports.buildStopConditionFunction = _buildStopConditionFunction2.default;
exports.standardAnimation = _standardAnimation2.default;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _resetState = __webpack_require__(27);

var _resetState2 = _interopRequireDefault(_resetState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(function () {
  return (0, _resetState2.default)(_state2.default);
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DEFAULT_STRIPE_COUNT = exports.DEFAULT_BASE_STRIPE_DIAGONAL = exports.DEFAULT_FRAME_RATE = exports.DEFAULT_END_LAYER = exports.DEFAULT_START_LAYER = exports.DEFAULT_OPACITY = exports.DEFAULT_COLOR_SET = exports.DEFAULT_COLOR_ASSIGNMENT = exports.DEFAULT_TILE_SIZE = exports.DEFAULT_GRID_SIZE = exports.DEFAULT_ZOOM = exports.DEFAULT_CANVAS_SIZE = exports.DEFAULT_PATTERN = exports.DEFAULT_HOUNDSTOOTH = exports.DEFAULT_STATE = undefined;

var _constants = __webpack_require__(3);

var DEFAULT_CANVAS_SIZE = 800;
var DEFAULT_ZOOM = 1;
var DEFAULT_GRID_SIZE = 16;
var DEFAULT_TILE_SIZE = 50;
var DEFAULT_COLOR_SET = [_constants.BLACK, _constants.TRANSPARENT];
var DEFAULT_COLOR_ASSIGNMENT = {
	assignmentMode: 'WEAVE',
	weave: { rows: [1, 0], columns: [0, 1] },
	supertile: [[[1, 0], [0, 0]], [[1, 1], [0, 1]]]
};
var DEFAULT_OPACITY = 1;
var DEFAULT_STRIPE_COUNT = 4;
var DEFAULT_BASE_STRIPE_DIAGONAL = 'MINOR';
var DEFAULT_FRAME_RATE = 1.005;
var DEFAULT_START_LAYER = 0;
var DEFAULT_END_LAYER = 0;

var DEFAULT_PATTERN = {
	viewSettings: {
		canvasSize: DEFAULT_CANVAS_SIZE,
		zoom: DEFAULT_ZOOM
	},
	gridSettings: {
		gridSize: DEFAULT_GRID_SIZE
	},
	tileSettings: {
		tileSizeSetting: DEFAULT_TILE_SIZE
	},
	colorSettings: {
		colorSet: DEFAULT_COLOR_SET,
		assignment: DEFAULT_COLOR_ASSIGNMENT,
		opacity: DEFAULT_OPACITY
	},
	stripeSettings: {
		stripePositionSettings: {
			stripeCountSetting: DEFAULT_STRIPE_COUNT
		},
		baseStripeDiagonal: DEFAULT_BASE_STRIPE_DIAGONAL
	},
	animationSettings: {
		frameRate: DEFAULT_FRAME_RATE
	},
	layerSettings: {
		startLayer: DEFAULT_START_LAYER,
		endLayer: DEFAULT_END_LAYER
	}
};

var DEFAULT_HOUNDSTOOTH = {
	basePattern: DEFAULT_PATTERN,
	animationsPattern: {},
	layersPattern: {},
	name: 'standard'
};

var DEFAULT_STATE = {
	currentLayer: 0,
	currentAnimationFrame: 0,
	contexts: [],
	mixedDownContext: null,
	lastSavedAnimationFrame: 0,
	interval: null,
	animating: false,
	exportFrames: false,
	mixingDown: false,
	performanceLogging: false,
	selectedHoundstoothEffects: [],
	mainHoundstooth: DEFAULT_HOUNDSTOOTH
};

exports.DEFAULT_STATE = DEFAULT_STATE;
exports.DEFAULT_HOUNDSTOOTH = DEFAULT_HOUNDSTOOTH;
exports.DEFAULT_PATTERN = DEFAULT_PATTERN;
exports.DEFAULT_CANVAS_SIZE = DEFAULT_CANVAS_SIZE;
exports.DEFAULT_ZOOM = DEFAULT_ZOOM;
exports.DEFAULT_GRID_SIZE = DEFAULT_GRID_SIZE;
exports.DEFAULT_TILE_SIZE = DEFAULT_TILE_SIZE;
exports.DEFAULT_COLOR_ASSIGNMENT = DEFAULT_COLOR_ASSIGNMENT;
exports.DEFAULT_COLOR_SET = DEFAULT_COLOR_SET;
exports.DEFAULT_OPACITY = DEFAULT_OPACITY;
exports.DEFAULT_START_LAYER = DEFAULT_START_LAYER;
exports.DEFAULT_END_LAYER = DEFAULT_END_LAYER;
exports.DEFAULT_FRAME_RATE = DEFAULT_FRAME_RATE;
exports.DEFAULT_BASE_STRIPE_DIAGONAL = DEFAULT_BASE_STRIPE_DIAGONAL;
exports.DEFAULT_STRIPE_COUNT = DEFAULT_STRIPE_COUNT;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _setElementDimensions = __webpack_require__(29);

var _setElementDimensions2 = _interopRequireDefault(_setElementDimensions);

var _canvas = __webpack_require__(7);

var _windowWrapper = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createCanvasContainer = function createCanvasContainer() {
	var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    canvasSize = _ref.canvasSize;

	if (!canvasSize) canvasSize = (0, _canvas.getCanvasSize)();

	var canvasContainer = _windowWrapper.document.createElement('div');
	canvasContainer.classList.add('canvas-container');

	(0, _setElementDimensions2.default)(canvasContainer, canvasSize);

	_windowWrapper.document.body.appendChild(canvasContainer);

	return canvasContainer;
};

exports.default = createCanvasContainer;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _store = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCanvasSize = function getCanvasSize() {
	var viewSettings = _state2.default.mainHoundstooth.basePattern.viewSettings;
	var canvasSize = viewSettings && viewSettings.canvasSize || _store.defaults.DEFAULT_CANVAS_SIZE;

	var oblong = canvasSize instanceof Array;
	var width = oblong ? canvasSize[0] : canvasSize;
	var height = oblong ? canvasSize[1] : canvasSize;

	return [width, height];
};

exports.default = getCanvasSize;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.executeSelectedHoundstoothEffects = exports.executeGrid = exports.callFunctionsPerSetting = undefined;

var _callFunctionsPerSetting = __webpack_require__(39);

var _callFunctionsPerSetting2 = _interopRequireDefault(_callFunctionsPerSetting);

var _executeGrid = __webpack_require__(40);

var _executeGrid2 = _interopRequireDefault(_executeGrid);

var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.callFunctionsPerSetting = _callFunctionsPerSetting2.default;
exports.executeGrid = _executeGrid2.default;
exports.executeSelectedHoundstoothEffects = _executeSelectedHoundstoothEffects2.default;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.stripeOutline = exports.squareOutline = exports.rotateCoordinateAboutPoint = undefined;

var _rotateCoordinateAboutPoint = __webpack_require__(98);

var _rotateCoordinateAboutPoint2 = _interopRequireDefault(_rotateCoordinateAboutPoint);

var _squareOutline = __webpack_require__(99);

var _squareOutline2 = _interopRequireDefault(_squareOutline);

var _stripeOutline = __webpack_require__(100);

var _stripeOutline2 = _interopRequireDefault(_stripeOutline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.rotateCoordinateAboutPoint = _rotateCoordinateAboutPoint2.default;
exports.squareOutline = _squareOutline2.default;
exports.stripeOutline = _stripeOutline2.default;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var createTestMarkersCanvas = function createTestMarkersCanvas() {
	var testCanvasDisplayArea = document.createElement('div');
	testCanvasDisplayArea.classList.add('test-canvas-display-area');

	document.body.insertBefore(testCanvasDisplayArea, document.body.firstChild);

	var testMarkersCanvas = document.createElement('canvas');
	testMarkersCanvas.classList.add('test-markers-canvas');
	testCanvasDisplayArea.appendChild(testMarkersCanvas);

	return testMarkersCanvas;
};

exports.default = createTestMarkersCanvas;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _isCloseTo = __webpack_require__(120);

var _isCloseTo2 = _interopRequireDefault(_isCloseTo);

var _windowWrapper = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pixelIsColor = function pixelIsColor(coordinateUnderTest, expectedColor) {
	var actualColor = pixel(coordinateUnderTest);

	if (actualColor.a === 0 && actualColor.a === expectedColor.a) return true;

	for (var i = 0; i < Object.keys(actualColor).length; i++) {
		var firstColorProperty = Object.entries(actualColor)[i];
		var firstColorPropertyValue = firstColorProperty[1];
		var firstColorPropertyKey = firstColorProperty[0];
		var secondColorPropertyValue = expectedColor[firstColorPropertyKey];
		if (!(0, _isCloseTo2.default)(firstColorPropertyValue, secondColorPropertyValue)) {
			_windowWrapper.console.error('actual color: ' + actualColor + ' / expected color ' + expectedColor);
			return false;
		}
	}

	return true;
};

var pixel = function pixel(_ref) {
	var _ref2 = _slicedToArray(_ref, 2),
	    x = _ref2[0],
	    y = _ref2[1];

	var mixedDownCanvas = document.querySelector('.mixed-down-canvas');
	var pixelData = mixedDownCanvas.getContext('2d').getImageData(x, y, 1, 1).data;
	return {
		r: pixelData[0],
		g: pixelData[1],
		b: pixelData[2],
		a: pixelData[3] / 255
	};
};

exports.default = pixelIsColor;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _drawPassMarker = __webpack_require__(48);

var _drawPassMarker2 = _interopRequireDefault(_drawPassMarker);

var _pixelIsColor = __webpack_require__(24);

var _pixelIsColor2 = _interopRequireDefault(_pixelIsColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pixelIsColorWithMarker = function pixelIsColorWithMarker(_ref) {
	var coordinateUnderTest = _ref.coordinateUnderTest,
	    expectedColor = _ref.expectedColor,
	    id = _ref.id;

	var passed = (0, _pixelIsColor2.default)(coordinateUnderTest, expectedColor);
	(0, _drawPassMarker2.default)({ passed: passed, coordinateUnderTest: coordinateUnderTest, id: id });
	return passed;
};

exports.default = pixelIsColorWithMarker;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var thisAnimationFrameOnly = function thisAnimationFrameOnly(frame) {
	return {
		startAnimationFrame: frame,
		endAnimationFrame: frame
	};
};

var thisLayerOnly = function thisLayerOnly(frame) {
	return {
		startLayer: frame,
		endLayer: frame
	};
};

exports.thisAnimationFrameOnly = thisAnimationFrameOnly;
exports.thisLayerOnly = thisLayerOnly;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defaults = __webpack_require__(18);

var _codeUtilities = __webpack_require__(1);

var resetState = function resetState(state) {
	(0, _codeUtilities.changeObjectIntoCopy)({
		objectToChange: state,
		objectWithProperties: _defaults.DEFAULT_STATE
	});
};

exports.default = resetState;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _standardTileIsColors = __webpack_require__(8);

var _standardTileIsColors2 = _interopRequireDefault(_standardTileIsColors);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _constants = __webpack_require__(3);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('standard houndstooth pattern', function () {
	it('repeats a 2x2 pattern of a solid black, solid white, and two b&w diagonally striped tiles, the striped tiles having four stripes each, and their diagonal stripes being the minor diagonal', function () {
		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: { basePattern: { gridSettings: { gridSize: 4 } } } });

		var tileSizeInPixels = _state2.default.mainHoundstooth.basePattern.tileSettings.tileSizeSetting;
		var firstSupertile = [{
			baseId: 0,
			originInPixels: [0 * tileSizeInPixels, 0 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.TRANSPARENT, _constants.BLACK]
		}, {
			baseId: 8,
			originInPixels: [0 * tileSizeInPixels, 1 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.BLACK]
		}, {
			baseId: 16,
			originInPixels: [1 * tileSizeInPixels, 0 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
		}, {
			baseId: 24,
			originInPixels: [1 * tileSizeInPixels, 1 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.TRANSPARENT]
		}];
		var secondSupertile = [{
			baseId: 32,
			originInPixels: [2 * tileSizeInPixels, 0 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.TRANSPARENT, _constants.BLACK]
		}, {
			baseId: 40,
			originInPixels: [2 * tileSizeInPixels, 1 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.BLACK]
		}, {
			baseId: 48,
			originInPixels: [3 * tileSizeInPixels, 0 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
		}, {
			baseId: 56,
			originInPixels: [3 * tileSizeInPixels, 1 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.TRANSPARENT]
		}];
		var thirdSupertile = [{
			baseId: 64,
			originInPixels: [0 * tileSizeInPixels, 2 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.TRANSPARENT, _constants.BLACK]
		}, {
			baseId: 72,
			originInPixels: [0 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.BLACK]
		}, {
			baseId: 80,
			originInPixels: [1 * tileSizeInPixels, 2 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
		}, {
			baseId: 88,
			originInPixels: [1 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.TRANSPARENT]
		}];
		var fourthSupertile = [{
			baseId: 96,
			originInPixels: [2 * tileSizeInPixels, 2 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.TRANSPARENT, _constants.BLACK]
		}, {
			baseId: 104,
			originInPixels: [2 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.BLACK]
		}, {
			baseId: 112,
			originInPixels: [3 * tileSizeInPixels, 2 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
		}, {
			baseId: 120,
			originInPixels: [3 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.TRANSPARENT]
		}];
		var tiles = firstSupertile.concat(secondSupertile).concat(thirdSupertile).concat(fourthSupertile);
		tiles.forEach(function (tile) {
			return expect((0, _standardTileIsColors2.default)(tile)).toBe(true);
		});
	});
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var setElementDimenions = function setElementDimenions(element, dimensions) {
	element.style.width = inPx(dimensions[0]);
	element.style.height = inPx(dimensions[1]);
};

var inPx = function inPx(number) {
	return number + "px";
};

exports.default = setElementDimenions;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _getCanvasSize = __webpack_require__(20);

var _getCanvasSize2 = _interopRequireDefault(_getCanvasSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clear = function clear() {
	var canvasSize = (0, _getCanvasSize2.default)();
	_state2.default.contexts.forEach(function (context) {
		return clearContext({ context: context, canvasSize: canvasSize });
	});

	var mixedDownContext = _state2.default.mixedDownContext;
	mixedDownContext && clearContext({ context: mixedDownContext, canvasSize: canvasSize });
};

var clearContext = function clearContext(_ref) {
	var context = _ref.context,
	    canvasSize = _ref.canvasSize;

	context.clearRect(0, 0, canvasSize[0], canvasSize[1]);
};

exports.default = clear;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _windowWrapper = __webpack_require__(2);

var createContext = function createContext(_ref) {
	var canvasContainer = _ref.canvasContainer,
	    canvasSize = _ref.canvasSize;

	var canvas = _windowWrapper.document.createElement('canvas');
	canvas.style.position = 'absolute';
	canvas.width = canvasSize[0];
	canvas.height = canvasSize[1];

	canvasContainer.appendChild(canvas);

	return canvas.getContext('2d');
};

exports.default = createContext;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _insertElementRightAfter = __webpack_require__(33);

var _insertElementRightAfter2 = _interopRequireDefault(_insertElementRightAfter);

var _createCanvasContainer = __webpack_require__(19);

var _createCanvasContainer2 = _interopRequireDefault(_createCanvasContainer);

var _windowWrapper = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createEffectTogglesContainer = function createEffectTogglesContainer() {
	var effectTogglesContainer = _windowWrapper.document.createElement('div');
	effectTogglesContainer.classList.add('effect-toggles-container');
	effectTogglesContainer.style.padding = '20px';

	var canvasContainer = _windowWrapper.document.querySelector('.canvas-container') || (0, _createCanvasContainer2.default)();
	(0, _insertElementRightAfter2.default)(effectTogglesContainer, canvasContainer);

	return effectTogglesContainer;
};

exports.default = createEffectTogglesContainer;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var insertElementRightAfter = function insertElementRightAfter(element, elementRightAfterWhichToInsert) {
	elementRightAfterWhichToInsert.parentNode.insertBefore(element, elementRightAfterWhichToInsert.nextSibling);
};

exports.default = insertElementRightAfter;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _windowWrapper = __webpack_require__(2);

var _store = __webpack_require__(9);

var houndstoothHasOnlyRecognizedPatterns = function houndstoothHasOnlyRecognizedPatterns(houndstooth) {
	return Object.keys(houndstooth).every(function (patternName) {
		if (!Object.keys(_store.HOUNDSTOOTH_STRUCTURE).includes(patternName)) {
			_windowWrapper.console.error('attempted to compose a houndstooth with an unrecognized pattern: ' + patternName);
			return false;
		}
		return true;
	});
};

exports.default = houndstoothHasOnlyRecognizedPatterns;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _windowWrapper = __webpack_require__(2);

var _codeUtilities = __webpack_require__(1);

var _maybeWarnAboutConflicts = __webpack_require__(77);

var _maybeWarnAboutConflicts2 = _interopRequireDefault(_maybeWarnAboutConflicts);

var _settingPath = __webpack_require__(36);

var _settingPath2 = _interopRequireDefault(_settingPath);

var _store = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composePatterns = function composePatterns(_ref) {
	var patternToBeMergedOnto = _ref.patternToBeMergedOnto,
	    patternToMerge = _ref.patternToMerge,
	    _ref$settingsPath = _ref.settingsPath,
	    settingsPath = _ref$settingsPath === undefined ? [] : _ref$settingsPath,
	    _ref$patternStructure = _ref.patternStructureChecker,
	    patternStructureChecker = _ref$patternStructure === undefined ? _store.PATTERN_STRUCTURE : _ref$patternStructure,
	    warnAboutConflicts = _ref.warnAboutConflicts;

	if (!patternToMerge) return;
	Object.entries(patternToMerge).forEach(function (_ref2) {
		var _ref3 = _slicedToArray(_ref2, 2),
		    settingName = _ref3[0],
		    overridingSetting = _ref3[1];

		if (!settingIsDefinedOnPatternStructure({ settingName: settingName, settingsPath: settingsPath, patternStructureChecker: patternStructureChecker })) return;
		var deeperPatternStructureChecker = patternStructureChecker[settingName];

		if (overridingSetting && (typeof overridingSetting === 'undefined' ? 'undefined' : _typeof(overridingSetting)) === 'object' && !overridingSetting.length && settingIsNotColor(overridingSetting)) {
			composePatterns({
				patternToBeMergedOnto: patternToBeMergedOnto,
				patternToMerge: overridingSetting,
				settingsPath: (0, _codeUtilities.deeperPath)({ propertyPath: settingsPath, propertyName: settingName }),
				patternStructureChecker: deeperPatternStructureChecker,
				warnAboutConflicts: warnAboutConflicts
			});
		} else {
			var settingsWithSettingToBeOverridden = (0, _codeUtilities.accessChildPropertyOrCreatePath)({
				objectWithProperties: patternToBeMergedOnto,
				propertyPath: settingsPath
			});

			var existingSetting = settingsWithSettingToBeOverridden[settingName];

			(0, _maybeWarnAboutConflicts2.default)({ warnAboutConflicts: warnAboutConflicts, settingsPath: settingsPath, settingName: settingName, existingSetting: existingSetting, overridingSetting: overridingSetting });

			settingsWithSettingToBeOverridden[settingName] = overridingSetting;
		}
	});
};

var settingIsDefinedOnPatternStructure = function settingIsDefinedOnPatternStructure(_ref4) {
	var settingsPath = _ref4.settingsPath,
	    settingName = _ref4.settingName,
	    objectWithProperties = _ref4.patternStructureChecker;

	if ((0, _codeUtilities.propertyIsDefinedOnObject)({ propertyName: settingName, objectWithProperties: objectWithProperties })) return true;
	_windowWrapper.console.error('attempted to compose a pattern with an unrecognized setting: ' + (0, _settingPath2.default)(settingsPath, settingName));
};

var settingIsNotColor = function settingIsNotColor(setting) {
	var defined = _codeUtilities.isDefined;
	var r = setting.r,
	    g = setting.g,
	    b = setting.b,
	    a = setting.a;

	return !(defined(r) || defined(g) || defined(b) || defined(a));
};

exports.default = composePatterns;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var settingPath = function settingPath(settingsPath, settingName) {
  return settingsPath.join('.') + '.' + settingName;
};

exports.default = settingPath;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.warn = exports.addEffectToggles = undefined;

var _addEffectToggles = __webpack_require__(38);

var _addEffectToggles2 = _interopRequireDefault(_addEffectToggles);

var _warn = __webpack_require__(107);

var _warn2 = _interopRequireDefault(_warn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.addEffectToggles = _addEffectToggles2.default;
exports.warn = _warn2.default;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addEffectToggle = __webpack_require__(78);

var _addEffectToggle2 = _interopRequireDefault(_addEffectToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addEffectToggles = function addEffectToggles(effects) {
  return effects.forEach(_addEffectToggle2.default);
};

exports.default = addEffectToggles;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _codeUtilities = __webpack_require__(1);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callFunctionsPerSetting = function callFunctionsPerSetting(_ref) {
	var settingsFunctions = _ref.settingsFunctions;

	settingsFunctions.forEach(function (settingsFunction) {
		var settingsPath = settingsFunction.settingsPath,
		    settingName = settingsFunction.settingName,
		    settingFunctionItself = settingsFunction.settingFunctionItself;

		var settingsWithSettingToCallFunctionOn = (0, _codeUtilities.accessChildPropertyOrCreatePath)({
			objectWithProperties: _state2.default.mainHoundstooth.basePattern,
			propertyPath: settingsPath
		});
		settingsWithSettingToCallFunctionOn[settingName] = settingFunctionItself(settingsWithSettingToCallFunctionOn[settingName]);
	});
};

exports.default = callFunctionsPerSetting;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _callFunctionsPerSetting = __webpack_require__(39);

var _callFunctionsPerSetting2 = _interopRequireDefault(_callFunctionsPerSetting);

var _canvas = __webpack_require__(7);

var _gridAndMaybeLogging = __webpack_require__(83);

var _gridAndMaybeLogging2 = _interopRequireDefault(_gridAndMaybeLogging);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var executeGrid = function executeGrid(_ref) {
	var layerFunctions = _ref.layerFunctions;

	var _ref2 = _state2.default.mainHoundstooth.basePattern.layerSettings || {},
	    startLayer = _ref2.startLayer,
	    endLayer = _ref2.endLayer;

	startLayer = startLayer || 0;

	for (var n = 0; n <= endLayer; n++) {
		if (n >= startLayer) {
			(0, _gridAndMaybeLogging2.default)();
		}
		if (n < endLayer) {
			(0, _callFunctionsPerSetting2.default)({ settingsFunctions: layerFunctions });
		}
		_state2.default.currentLayer++;
	}

	if (_state2.default.mixingDown) (0, _canvas.mixDownContexts)();

	_state2.default.currentLayer = 0;
};

exports.default = executeGrid;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.tileCenter = exports.perStripe = exports.grid = undefined;

var _grid = __webpack_require__(84);

var _grid2 = _interopRequireDefault(_grid);

var _perStripe = __webpack_require__(47);

var _perStripe2 = _interopRequireDefault(_perStripe);

var _tileCenter = __webpack_require__(106);

var _tileCenter2 = _interopRequireDefault(_tileCenter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.grid = _grid2.default;
exports.perStripe = _perStripe2.default;
exports.tileCenter = _tileCenter2.default;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _codeUtilities = __webpack_require__(1);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getColor = function getColor(_ref) {
	var index = _ref.index;

	var array = _state2.default.mainHoundstooth.basePattern.colorSettings.colorSet;
	return (0, _codeUtilities.wrappedIndex)({ array: array, index: index });
};

exports.default = getColor;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var parseColor = function parseColor(_ref) {
  var r = _ref.r,
      g = _ref.g,
      b = _ref.b,
      a = _ref.a;
  return 'rgba(' + [r, g, b, a].join(',') + ')';
};

exports.default = parseColor;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var buildPath = function buildPath(_ref) {
	var context = _ref.context,
	    outline = _ref.outline;

	context.beginPath();
	context.moveTo(outline[0][0], outline[0][1]);
	outline.slice(1).forEach(function (coordinate) {
		return context.lineTo(coordinate[0], coordinate[1]);
	});
};

exports.default = buildPath;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _draw = __webpack_require__(91);

var _draw2 = _interopRequireDefault(_draw);

var _getColor = __webpack_require__(42);

var _getColor2 = _interopRequireDefault(_getColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var solid = function solid(_ref) {
	var context = _ref.context,
	    outline = _ref.outline,
	    shapeColorIndex = _ref.shapeColorIndex;

	var shapeColor = (0, _getColor2.default)({ index: shapeColorIndex });
	if (shapeColor.a === 0) return;

	(0, _draw2.default)({ context: context, shapeColor: shapeColor, outline: outline });
};

exports.default = solid;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.applyView = exports.applyOpacity = exports.applyBackgroundColor = undefined;

var _applyBackgroundColor = __webpack_require__(92);

var _applyBackgroundColor2 = _interopRequireDefault(_applyBackgroundColor);

var _applyOpacity = __webpack_require__(93);

var _applyOpacity2 = _interopRequireDefault(_applyOpacity);

var _applyView = __webpack_require__(94);

var _applyView2 = _interopRequireDefault(_applyView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.applyBackgroundColor = _applyBackgroundColor2.default;
exports.applyOpacity = _applyOpacity2.default;
exports.applyView = _applyView2.default;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _constants = __webpack_require__(3);

var _codeUtilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var perStripe = function perStripe(_ref) {
	var getStripePosition = _ref.getStripePosition;

	var stripeCount = _state2.default.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.stripeCountSetting;
	return (0, _codeUtilities.iterator)(stripeCount).map(function (stripeIndex) {
		return getStripePosition({ stripeIndex: stripeIndex, stripeCount: stripeCount }) * _constants.PERIMETER_SCALAR;
	});
};

exports.default = perStripe;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createTestMarkersCanvas = __webpack_require__(23);

var _createTestMarkersCanvas2 = _interopRequireDefault(_createTestMarkersCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drawPassMarker = function drawPassMarker(_ref) {
	var passed = _ref.passed,
	    coordinateUnderTest = _ref.coordinateUnderTest,
	    id = _ref.id;

	var testMarkersCanvas = document.querySelector('.test-markers-canvas') || (0, _createTestMarkersCanvas2.default)();
	var testMarkersContext = testMarkersCanvas.getContext('2d');

	testMarkersContext.strokeStyle = passed ? 'green' : 'red';
	testMarkersContext.beginPath();

	testMarkersContext.arc(coordinateUnderTest[0], coordinateUnderTest[1], 2, 0, 2 * Math.PI);

	testMarkersContext.closePath();
	testMarkersContext.stroke();

	if (!passed) {
		testMarkersContext.font = '8px Arial';
		testMarkersContext.fillStyle = 'red';
		testMarkersContext.fillText(id, coordinateUnderTest[0] + 3, coordinateUnderTest[1] + 3);
	}
};

exports.default = drawPassMarker;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _addEffectToggles = __webpack_require__(38);

var _addEffectToggles2 = _interopRequireDefault(_addEffectToggles);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _index = __webpack_require__(122);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

xdescribe('effect toggles', function () {
	it('attaches click handlers which cause the settings of the main houndstooth to change based on the effect', function () {
		(0, _addEffectToggles2.default)(Object.values(_index2.default));
		_state2.default.mainHoundstooth.basePattern = {
			tileSettings: {
				tileSizeSetting: 50
			}
		};
		document.querySelector('input.houndsmorphosis').click();
		expect(_state2.default.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(0);
		document.querySelector('input.houndsmorphosis').click();
		expect(_state2.default.mainHoundstooth.basePattern.tileSettings.tileSizeSetting).toBe(50);
	});
});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _src = __webpack_require__(125);

var _src2 = __webpack_require__(6);

var cmyktoothEffect = {
	name: 'cmyktooth',
	basePattern: {
		tileSettings: {
			tileSizeSetting: _src2.defaults.DEFAULT_CANVAS_SIZE
		},
		viewSettings: {
			centerViewOnCenterOfTileAtHomeAddress: true,
			rotateViewAboutCanvasCenter: 0,
			canvasSize: _src2.defaults.DEFAULT_CANVAS_SIZE
		},
		gridSettings: {
			gridSize: 31,
			includeNegativeQuadrants: true
		},
		colorSettings: {
			colorSet: (0, _src.cmyktoothColorSet)(-1),
			opacity: .5,
			assignment: {
				offsetAddress: _src.cmyktoothOffsetAddress
			}
		},
		layerSettings: {
			startLayer: 0,
			endLayer: 16
		}
	},
	layersPattern: {
		tileSettings: {
			tileSizeSetting: _src.cmyktoothTileSize
		},
		colorSettings: {
			colorSet: _src.cmyktoothColorSet,
			opacity: _src.cmyktoothOpacity
		},
		viewSettings: {
			rotateViewAboutCanvasCenter: _src.cmyktoothViewRotationAboutCanvasCenter
		}
	}
};

exports.default = cmyktoothEffect;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _src = __webpack_require__(135);

var _src2 = __webpack_require__(6);

var ginghamChevronContinuumEffect = {
	name: 'gingham chevron continuum',
	basePattern: {
		stripeSettings: {
			stripePositionSettings: {
				stripeCountMode: 'GINGHAM_CHEVRON_CONTINUUM',
				stripeCountContinuumSettings: {
					deltaStripeCount: 1,
					initialStripeCount: 1
				},
				getStripePositions: _src.getGinghamChevronContinuumStripePositions
			}
		},
		colorSettings: {
			assignment: {
				transformTileColorIndices: _src.realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid
			}
		}
	},
	animationsPattern: {
		stripeSettings: {
			stripePositionSettings: {
				stripeCountContinuumSettings: {
					deltaStripeCount: _src2.standardAnimation,
					initialStripeCount: _src2.standardAnimation
				}
			}
		}
	}
};

exports.default = ginghamChevronContinuumEffect;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mathUtilities = __webpack_require__(14);

var _src = __webpack_require__(6);

var neededStripeCountToCoverGrid = function neededStripeCountToCoverGrid() {
	var _state$mainHoundstoot = _src.state.mainHoundstooth.basePattern,
	    stripeSettings = _state$mainHoundstoot.stripeSettings,
	    gridSettings = _state$mainHoundstoot.gridSettings;
	var _stripeSettings$strip = stripeSettings.stripePositionSettings.stripeCountContinuumSettings,
	    initialStripeCount = _stripeSettings$strip.initialStripeCount,
	    deltaStripeCount = _stripeSettings$strip.deltaStripeCount;

	return initialStripeCount + deltaStripeCount * (0, _mathUtilities.triangularNumber)(gridSettings.gridSize);
};

exports.default = neededStripeCountToCoverGrid;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _src = __webpack_require__(6);

var _src2 = __webpack_require__(143);

var BLACK = _src.constants.BLACK,
    BLUE = _src.constants.BLUE,
    GREEN = _src.constants.GREEN,
    RED = _src.constants.RED,
    WHITE = _src.constants.WHITE;


var gongramEffect = {
	name: 'gongram',
	basePattern: {
		colorSettings: {
			colorSet: [BLACK, BLUE, WHITE, GREEN, RED],
			assignment: {
				supertile: (0, _src2.gongramSupertile)(),
				weave: (0, _src2.gongramWeave)()
			}
		}
	}
};

exports.default = gongramEffect;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _src = __webpack_require__(6);

var _src2 = __webpack_require__(149);

var harmonitoothEffect = {
	name: 'harmonitooth',
	basePattern: {
		stripeSettings: {
			stripePositionSettings: {
				stripeCountSetting: 1,
				getStripePositions: _src2.getHarmonicContinuumStripePositions
			}
		}
	},
	animationsPattern: {
		stripeSettings: {
			stripePositionSettings: {
				stripeCountSetting: _src.standardAnimation
			}
		}
	}
};

exports.default = harmonitoothEffect;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _src = __webpack_require__(154);

var houndazzleEffect = {
	name: 'houndazzle',
	basePattern: {
		textureSettings: {
			renderTexture: _src.substripeTexture
		}
	}
};

exports.default = houndazzleEffect;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _src = __webpack_require__(165);

var houndsmorphosisEffect = {
	name: 'houndsmorphosis',
	basePattern: {
		viewSettings: {
			zoomOnCanvasCenter: true,
			centerViewOnCenterOfTileAtHomeAddress: true
		},
		tileSettings: {
			tileSizeSetting: 0,
			getTileOriginAndSize: _src.getHoundsmorphosisTileOriginAndSize
		},
		colorSettings: {
			assignment: {
				assignmentMode: 'SUPERTILE',
				supertile: [[[0, 0], [0, 1]], [[1, 1], [1, 0]]],
				offsetAddress: _src.getHoundsmorphosisAddressOffset
			}
		},
		gridSettings: {
			gridSize: 71,
			includeNegativeQuadrants: true
		}
	}
};

exports.default = houndsmorphosisEffect;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _pixelIsColorWithMarker = __webpack_require__(25);

var _pixelIsColorWithMarker2 = _interopRequireDefault(_pixelIsColorWithMarker);

var _constants = __webpack_require__(3);

var _standardTileIsColors = __webpack_require__(8);

var _standardTileIsColors2 = _interopRequireDefault(_standardTileIsColors);

var _codeUtilities = __webpack_require__(1);

var _settingsPaths = __webpack_require__(11);

var _getFromBasePatternOrDefault = __webpack_require__(12);

var _getFromBasePatternOrDefault2 = _interopRequireDefault(_getFromBasePatternOrDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('.colorSettings', function () {
	var tileSizeInPixels = (0, _getFromBasePatternOrDefault2.default)(_settingsPaths.TILE_SIZE);

	describe('.colorSet', function () {
		it('lets you change the colors of the pattern', function () {
			var sufficientTileCountToDemonstrateSetting = 2;
			var houndstoothOverrides = {
				basePattern: {
					colorSettings: {
						colorSet: [_constants.YELLOW, _constants.BLUE]
					},
					gridSettings: {
						gridSize: sufficientTileCountToDemonstrateSetting
					},
					viewSettings: {
						canvasSize: tileSizeInPixels * sufficientTileCountToDemonstrateSetting
					}
				}
			};
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			expect((0, _pixelIsColorWithMarker2.default)({ coordinateUnderTest: [25, 75], expectedColor: _constants.YELLOW, id: 1 })).toBe(true);
			expect((0, _pixelIsColorWithMarker2.default)({ coordinateUnderTest: [75, 25], expectedColor: _constants.BLUE, id: 2 })).toBe(true);
		});

		it('works for more than two colors', function () {
			var sufficientTileCountToDemonstrateSetting = 3;
			var simplestWeaveToDemonstrateSetting = [0, 1, 2];
			var houndstoothOverrides = {
				basePattern: {
					colorSettings: {
						colorSet: [_constants.YELLOW, _constants.BLUE, _constants.CYAN],
						assignment: {
							weave: {
								rows: simplestWeaveToDemonstrateSetting,
								columns: simplestWeaveToDemonstrateSetting
							}
						}
					},
					gridSettings: {
						gridSize: sufficientTileCountToDemonstrateSetting
					},
					viewSettings: {
						canvasSize: tileSizeInPixels * sufficientTileCountToDemonstrateSetting
					}
				}
			};
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			expect((0, _standardTileIsColors2.default)({
				baseId: 0,
				originInPixels: [0 * tileSizeInPixels, 0 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.YELLOW, _constants.YELLOW]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 8,
				originInPixels: [1 * tileSizeInPixels, 0 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.YELLOW, _constants.BLUE]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 16,
				originInPixels: [2 * tileSizeInPixels, 0 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.YELLOW, _constants.CYAN]
			})).toBe(true);

			expect((0, _standardTileIsColors2.default)({
				baseId: 24,
				originInPixels: [0 * tileSizeInPixels, 1 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.BLUE, _constants.YELLOW]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 32,
				originInPixels: [1 * tileSizeInPixels, 1 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.BLUE, _constants.BLUE]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 40,
				originInPixels: [2 * tileSizeInPixels, 1 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.BLUE, _constants.CYAN]
			})).toBe(true);

			expect((0, _standardTileIsColors2.default)({
				baseId: 48,
				originInPixels: [0 * tileSizeInPixels, 2 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.CYAN, _constants.YELLOW]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 56,
				originInPixels: [1 * tileSizeInPixels, 2 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.CYAN, _constants.BLUE]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 64,
				originInPixels: [2 * tileSizeInPixels, 2 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.CYAN, _constants.CYAN]
			})).toBe(true);
		});
	});

	describe('.assignment', function () {
		describe('.assignmentMode', function () {
			describe('weave', function () {
				it('is the simplest way to describe a pattern whose colors do not vary within its rows and columns', function () {
					var sufficientTileCountToDemonstrateSetting = 8;
					var houndstoothOverrides = {
						basePattern: {
							colorSettings: {
								assignment: {
									weave: {
										rows: [0, 1, 1, 0],
										columns: [1, 0, 1]
									}
								}
							},
							gridSettings: {
								gridSize: sufficientTileCountToDemonstrateSetting
							},
							viewSettings: {
								canvasSize: tileSizeInPixels * sufficientTileCountToDemonstrateSetting
							}
						}
					};

					(0, _activateTestMarkerCanvas2.default)();

					(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

					var firstSuperweave = [{
						baseId: 0,
						originInPixels: [0 * tileSizeInPixels, 0 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}, {
						baseId: 8,
						originInPixels: [1 * tileSizeInPixels, 0 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.BLACK]
					}, {
						baseId: 16,
						originInPixels: [2 * tileSizeInPixels, 0 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}, {
						baseId: 24,
						originInPixels: [0 * tileSizeInPixels, 1 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 32,
						originInPixels: [1 * tileSizeInPixels, 1 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.BLACK]
					}, {
						baseId: 40,
						originInPixels: [2 * tileSizeInPixels, 1 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 48,
						originInPixels: [0 * tileSizeInPixels, 2 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 56,
						originInPixels: [1 * tileSizeInPixels, 2 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.BLACK]
					}, {
						baseId: 64,
						originInPixels: [2 * tileSizeInPixels, 2 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 72,
						originInPixels: [0 * tileSizeInPixels, 3 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}, {
						baseId: 80,
						originInPixels: [1 * tileSizeInPixels, 3 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.BLACK]
					}, {
						baseId: 88,
						originInPixels: [2 * tileSizeInPixels, 3 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}];
					var secondSuperweave = [{
						baseId: 96,
						originInPixels: [3 * tileSizeInPixels, 0 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}, {
						baseId: 104,
						originInPixels: [4 * tileSizeInPixels, 0 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.BLACK]
					}, {
						baseId: 112,
						originInPixels: [5 * tileSizeInPixels, 0 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}, {
						baseId: 120,
						originInPixels: [3 * tileSizeInPixels, 1 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 128,
						originInPixels: [4 * tileSizeInPixels, 1 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.BLACK]
					}, {
						baseId: 136,
						originInPixels: [5 * tileSizeInPixels, 1 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 144,
						originInPixels: [3 * tileSizeInPixels, 2 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 152,
						originInPixels: [4 * tileSizeInPixels, 2 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.BLACK]
					}, {
						baseId: 160,
						originInPixels: [5 * tileSizeInPixels, 2 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 168,
						originInPixels: [3 * tileSizeInPixels, 3 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}, {
						baseId: 176,
						originInPixels: [4 * tileSizeInPixels, 3 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.BLACK]
					}, {
						baseId: 184,
						originInPixels: [5 * tileSizeInPixels, 3 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}];
					var thirdSuperweave = [{
						baseId: 192,
						originInPixels: [0 * tileSizeInPixels, 4 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}, {
						baseId: 200,
						originInPixels: [1 * tileSizeInPixels, 4 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.BLACK]
					}, {
						baseId: 208,
						originInPixels: [2 * tileSizeInPixels, 4 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}, {
						baseId: 216,
						originInPixels: [0 * tileSizeInPixels, 5 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 224,
						originInPixels: [1 * tileSizeInPixels, 5 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.BLACK]
					}, {
						baseId: 232,
						originInPixels: [2 * tileSizeInPixels, 5 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 240,
						originInPixels: [0 * tileSizeInPixels, 6 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 248,
						originInPixels: [1 * tileSizeInPixels, 6 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.BLACK]
					}, {
						baseId: 256,
						originInPixels: [2 * tileSizeInPixels, 6 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 264,
						originInPixels: [0 * tileSizeInPixels, 7 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}, {
						baseId: 272,
						originInPixels: [1 * tileSizeInPixels, 7 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.BLACK]
					}, {
						baseId: 280,
						originInPixels: [2 * tileSizeInPixels, 7 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}];
					var fourthSuperweave = [{
						baseId: 288,
						originInPixels: [3 * tileSizeInPixels, 4 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}, {
						baseId: 296,
						originInPixels: [4 * tileSizeInPixels, 4 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.BLACK]
					}, {
						baseId: 304,
						originInPixels: [5 * tileSizeInPixels, 4 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}, {
						baseId: 312,
						originInPixels: [3 * tileSizeInPixels, 5 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 320,
						originInPixels: [4 * tileSizeInPixels, 5 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.BLACK]
					}, {
						baseId: 328,
						originInPixels: [5 * tileSizeInPixels, 5 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 336,
						originInPixels: [3 * tileSizeInPixels, 6 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 344,
						originInPixels: [4 * tileSizeInPixels, 6 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.BLACK]
					}, {
						baseId: 352,
						originInPixels: [5 * tileSizeInPixels, 6 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
					}, {
						baseId: 360,
						originInPixels: [3 * tileSizeInPixels, 7 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}, {
						baseId: 368,
						originInPixels: [4 * tileSizeInPixels, 7 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.BLACK]
					}, {
						baseId: 376,
						originInPixels: [5 * tileSizeInPixels, 7 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLACK, _constants.TRANSPARENT]
					}];
					var tiles = firstSuperweave.concat(secondSuperweave).concat(thirdSuperweave).concat(fourthSuperweave);
					tiles.forEach(function (tile) {
						return expect((0, _standardTileIsColors2.default)(tile)).toBe(true);
					});
				});
			});

			describe('supertile', function () {
				it('assigns colors to tiles of patterns in any arbitrary way, repeating in a supertile of n by n tiles', function () {
					var sufficientTileCountToDemonstrateSetting = 4;
					var houndstoothOverrides = {
						basePattern: {
							colorSettings: {
								colorSet: [_constants.YELLOW, _constants.BLUE, _constants.CYAN, _constants.MAGENTA],
								assignment: {
									assignmentMode: 'SUPERTILE',
									supertile: [[[2, 0], [0, 1]], [[1, 2], [3, 3]]]
								}
							},
							gridSettings: {
								gridSize: sufficientTileCountToDemonstrateSetting
							},
							viewSettings: {
								canvasSize: tileSizeInPixels * sufficientTileCountToDemonstrateSetting
							}
						}
					};

					(0, _activateTestMarkerCanvas2.default)();

					(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

					var firstSupertile = [{
						baseId: 0,
						originInPixels: [0 * tileSizeInPixels, 0 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.CYAN, _constants.YELLOW]
					}, {
						baseId: 8,
						originInPixels: [0 * tileSizeInPixels, 1 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.YELLOW, _constants.BLUE]
					}, {
						baseId: 16,
						originInPixels: [1 * tileSizeInPixels, 0 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLUE, _constants.CYAN]
					}, {
						baseId: 24,
						originInPixels: [1 * tileSizeInPixels, 1 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.MAGENTA, _constants.MAGENTA]
					}];
					var secondSupertile = [{
						baseId: 32,
						originInPixels: [2 * tileSizeInPixels, 0 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.CYAN, _constants.YELLOW]
					}, {
						baseId: 40,
						originInPixels: [2 * tileSizeInPixels, 1 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.YELLOW, _constants.BLUE]
					}, {
						baseId: 48,
						originInPixels: [3 * tileSizeInPixels, 0 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLUE, _constants.CYAN]
					}, {
						baseId: 56,
						originInPixels: [3 * tileSizeInPixels, 1 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.MAGENTA, _constants.MAGENTA]
					}];
					var thirdSupertile = [{
						baseId: 64,
						originInPixels: [0 * tileSizeInPixels, 2 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.CYAN, _constants.YELLOW]
					}, {
						baseId: 72,
						originInPixels: [0 * tileSizeInPixels, 3 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.YELLOW, _constants.BLUE]
					}, {
						baseId: 80,
						originInPixels: [1 * tileSizeInPixels, 2 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLUE, _constants.CYAN]
					}, {
						baseId: 88,
						originInPixels: [1 * tileSizeInPixels, 3 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.MAGENTA, _constants.MAGENTA]
					}];
					var fourthSupertile = [{
						baseId: 96,
						originInPixels: [2 * tileSizeInPixels, 2 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.CYAN, _constants.YELLOW]
					}, {
						baseId: 104,
						originInPixels: [2 * tileSizeInPixels, 3 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.YELLOW, _constants.BLUE]
					}, {
						baseId: 112,
						originInPixels: [3 * tileSizeInPixels, 2 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.BLUE, _constants.CYAN]
					}, {
						baseId: 120,
						originInPixels: [3 * tileSizeInPixels, 3 * tileSizeInPixels],
						tileSizeInPixels: tileSizeInPixels,
						colors: [_constants.MAGENTA, _constants.MAGENTA]
					}];
					var tiles = firstSupertile.concat(secondSupertile).concat(thirdSupertile).concat(fourthSupertile);
					tiles.forEach(function (tile) {
						return expect((0, _standardTileIsColors2.default)(tile)).toBe(true);
					});
				});
			});
		});

		describe('.switcheroo', function () {
			it('causes the two striped tiles to alternate by diagonal rather than rows/columns', function () {
				var sufficientTileCountToDemonstrateSetting = 4;
				var houndstoothOverrides = {
					basePattern: {
						colorSettings: {
							assignment: {
								switcheroo: true
							}
						},
						gridSettings: {
							gridSize: sufficientTileCountToDemonstrateSetting
						},
						viewSettings: {
							canvasSize: sufficientTileCountToDemonstrateSetting * tileSizeInPixels
						}
					}
				};

				(0, _activateTestMarkerCanvas2.default)();

				(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

				expect((0, _standardTileIsColors2.default)({
					baseId: 0,
					originInPixels: [0 * tileSizeInPixels, 0 * tileSizeInPixels],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.TRANSPARENT, _constants.BLACK]
				})).toBe(true);
				expect((0, _standardTileIsColors2.default)({
					baseId: 8,
					originInPixels: [1 * tileSizeInPixels, 1 * tileSizeInPixels],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.TRANSPARENT, _constants.BLACK]
				})).toBe(true);
				expect((0, _standardTileIsColors2.default)({
					baseId: 16,
					originInPixels: [2 * tileSizeInPixels, 2 * tileSizeInPixels],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.TRANSPARENT, _constants.BLACK]
				})).toBe(true);
				expect((0, _standardTileIsColors2.default)({
					baseId: 24,
					originInPixels: [3 * tileSizeInPixels, 3 * tileSizeInPixels],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.TRANSPARENT, _constants.BLACK]
				})).toBe(true);

				expect((0, _standardTileIsColors2.default)({
					baseId: 32,
					originInPixels: [2 * tileSizeInPixels, 0 * tileSizeInPixels],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.BLACK, _constants.TRANSPARENT]
				})).toBe(true);
				expect((0, _standardTileIsColors2.default)({
					baseId: 40,
					originInPixels: [3 * tileSizeInPixels, 1 * tileSizeInPixels],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.BLACK, _constants.TRANSPARENT]
				})).toBe(true);
				expect((0, _standardTileIsColors2.default)({
					baseId: 48,
					originInPixels: [0 * tileSizeInPixels, 2 * tileSizeInPixels],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.BLACK, _constants.TRANSPARENT]
				})).toBe(true);
				expect((0, _standardTileIsColors2.default)({
					baseId: 56,
					originInPixels: [1 * tileSizeInPixels, 3 * tileSizeInPixels],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.BLACK, _constants.TRANSPARENT]
				})).toBe(true);
			});
		});

		describe('.flipGrain', function () {
			it('rotates the stripes by 180 degrees, in effect (switching the colors if there are only two) reversing the grain of the pattern', function () {
				var sufficientTileCountToDemonstrateSetting = 2;
				var houndstoothOverrides = {
					basePattern: {
						colorSettings: {
							assignment: {
								flipGrain: true
							}
						},
						gridSettings: {
							gridSize: sufficientTileCountToDemonstrateSetting
						},
						viewSettings: {
							canvasSize: sufficientTileCountToDemonstrateSetting * tileSizeInPixels
						}
					}
				};
				(0, _activateTestMarkerCanvas2.default)();

				(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

				var tiles = [{
					baseId: 0,
					originInPixels: [0 * tileSizeInPixels, 0 * tileSizeInPixels],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.BLACK, _constants.TRANSPARENT]
				}, {
					baseId: 8,
					originInPixels: [0 * tileSizeInPixels, 1 * tileSizeInPixels],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.BLACK, _constants.BLACK]
				}, {
					baseId: 16,
					originInPixels: [1 * tileSizeInPixels, 0 * tileSizeInPixels],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
				}, {
					baseId: 24,
					originInPixels: [1 * tileSizeInPixels, 1 * tileSizeInPixels],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.TRANSPARENT, _constants.BLACK]
				}];

				tiles.forEach(function (tile) {
					return expect((0, _standardTileIsColors2.default)(tile)).toBe(true);
				});
			});
		});
	});

	describe('.opacity', function () {
		it('affects the alpha of the pixels rendered', function () {
			var sufficientTileCountToDemonstrateSetting = 2;
			var opacity = 0.5;
			var houndstoothOverrides = {
				basePattern: {
					colorSettings: {
						colorSet: [_constants.BLACK, _constants.BLUE],
						opacity: opacity
					},
					gridSettings: {
						gridSize: sufficientTileCountToDemonstrateSetting
					},
					viewSettings: {
						canvasSize: tileSizeInPixels * sufficientTileCountToDemonstrateSetting
					}
				}
			};
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			var partiallySeeThroughBlack = (0, _codeUtilities.deepClone)(_constants.BLACK);
			partiallySeeThroughBlack.a *= opacity;
			var partiallySeeThroughBlue = (0, _codeUtilities.deepClone)(_constants.BLUE);
			partiallySeeThroughBlue.a *= opacity;

			expect((0, _pixelIsColorWithMarker2.default)({ coordinateUnderTest: [25, 75], expectedColor: partiallySeeThroughBlack, id: 1 })).toBe(true);
			expect((0, _pixelIsColorWithMarker2.default)({ coordinateUnderTest: [75, 25], expectedColor: partiallySeeThroughBlue, id: 2 })).toBe(true);
		});
	});

	describe('.backgroundColor', function () {
		it('paints it yellow', function () {
			var sufficientTileCountToDemonstrateSetting = 2;
			var houndstoothOverrides = {
				basePattern: {
					colorSettings: {
						colorSet: [_constants.BLACK, _constants.TRANSPARENT],
						backgroundColor: _constants.YELLOW
					},
					gridSettings: {
						gridSize: sufficientTileCountToDemonstrateSetting
					},
					viewSettings: {
						canvasSize: tileSizeInPixels * sufficientTileCountToDemonstrateSetting
					}
				}
			};
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			expect((0, _pixelIsColorWithMarker2.default)({ coordinateUnderTest: [75, 25], expectedColor: _constants.YELLOW, id: 2 })).toBe(true);
		});
	});
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _standardTileIsColors = __webpack_require__(8);

var _standardTileIsColors2 = _interopRequireDefault(_standardTileIsColors);

var _constants = __webpack_require__(3);

var _settingsPaths = __webpack_require__(11);

var _getFromBasePatternOrDefault = __webpack_require__(12);

var _getFromBasePatternOrDefault2 = _interopRequireDefault(_getFromBasePatternOrDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('.gridSettings', function () {
	var tileSizeInPixels = (0, _getFromBasePatternOrDefault2.default)(_settingsPaths.TILE_SIZE);

	describe('.gridSize', function () {
		it('changes how many tiles there are', function () {
			var houndstoothOverrides = {
				basePattern: {
					viewSettings: {
						canvasSize: 200
					},
					colorSettings: {
						colorSet: [_constants.BLACK, _constants.WHITE]
					},
					gridSettings: {
						gridSize: 3
					}
				}
			};
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			var tiles = [{
				baseId: 0,
				originInPixels: [0 * tileSizeInPixels, 0 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.WHITE, _constants.BLACK]
			}, {
				baseId: 8,
				originInPixels: [0 * tileSizeInPixels, 1 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.BLACK, _constants.BLACK]
			}, {
				baseId: 16,
				originInPixels: [0 * tileSizeInPixels, 2 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.WHITE, _constants.BLACK]
			}, {
				baseId: 24,
				originInPixels: [0 * tileSizeInPixels, 3 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			}, {
				baseId: 32,
				originInPixels: [1 * tileSizeInPixels, 0 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.WHITE, _constants.WHITE]
			}, {
				baseId: 40,
				originInPixels: [1 * tileSizeInPixels, 1 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.BLACK, _constants.WHITE]
			}, {
				baseId: 48,
				originInPixels: [1 * tileSizeInPixels, 2 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.WHITE, _constants.WHITE]
			}, {
				baseId: 56,
				originInPixels: [1 * tileSizeInPixels, 3 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			}, {
				baseId: 64,
				originInPixels: [2 * tileSizeInPixels, 0 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.WHITE, _constants.BLACK]
			}, {
				baseId: 72,
				originInPixels: [2 * tileSizeInPixels, 1 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.BLACK, _constants.BLACK]
			}, {
				baseId: 80,
				originInPixels: [2 * tileSizeInPixels, 2 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.WHITE, _constants.BLACK]
			}, {
				baseId: 88,
				originInPixels: [2 * tileSizeInPixels, 3 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			}, {
				baseId: 96,
				originInPixels: [3 * tileSizeInPixels, 0 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			}, {
				baseId: 104,
				originInPixels: [3 * tileSizeInPixels, 1 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			}, {
				baseId: 112,
				originInPixels: [3 * tileSizeInPixels, 2 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			}, {
				baseId: 120,
				originInPixels: [3 * tileSizeInPixels, 3 * tileSizeInPixels],
				tileSizeInPixels: tileSizeInPixels,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			}];

			tiles.forEach(function (tile) {
				return expect((0, _standardTileIsColors2.default)(tile)).toBe(true);
			});
		});
	});

	describe('.includeNegativeQuadrants', function () {
		it('quadruples the number of tiles, adding them not only in the positive x positive y quadrant, but negative x positive y, positive x negative y, and negative x negative y', function () {
			var tileSizeSetting = 50;
			var houndstoothOverrides = {
				basePattern: {
					viewSettings: {
						canvasSize: 300,
						centerViewOnCenterOfTileAtHomeAddress: true
					},
					tileSettings: {
						tileSizeSetting: tileSizeSetting
					},
					gridSettings: {
						gridSize: 1,
						includeNegativeQuadrants: true
					}
				}
			};
			(0, _activateTestMarkerCanvas2.default)();
			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			var tiles = [{
				baseId: 0,
				originInPixels: [125, 125],
				tileSizeInPixels: tileSizeSetting,
				colors: [_constants.TRANSPARENT, _constants.BLACK]
			}, {
				baseId: 8,
				originInPixels: [75, 125],
				tileSizeInPixels: tileSizeSetting,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			}, {
				baseId: 24,
				originInPixels: [75, 75],
				tileSizeInPixels: tileSizeSetting,
				colors: [_constants.BLACK, _constants.TRANSPARENT]
			}, {
				baseId: 16,
				originInPixels: [125, 75],
				tileSizeInPixels: tileSizeSetting,
				colors: [_constants.BLACK, _constants.BLACK]
			}];
			tiles.forEach(function (tile) {
				return expect((0, _standardTileIsColors2.default)(tile)).toBe(true);
			});
		});
	});
});

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pixelIsColorWithMarker = __webpack_require__(25);

var _pixelIsColorWithMarker2 = _interopRequireDefault(_pixelIsColorWithMarker);

var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _constants = __webpack_require__(3);

var _standardTileIsColors = __webpack_require__(8);

var _standardTileIsColors2 = _interopRequireDefault(_standardTileIsColors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('.layerSettings', function () {
	it('blends colors from semi-translucent layers', function () {
		var houndstoothOverrides = {
			basePattern: {
				viewSettings: { canvasSize: 100 },
				gridSettings: { gridSize: 2 },
				colorSettings: { backgroundColor: _constants.YELLOW },
				layerSettings: { endLayer: 1 }
			},
			layersPattern: {
				colorSettings: {
					backgroundColor: function backgroundColor() {
						return _constants.CYAN;
					},
					opacity: function opacity() {
						return 0.25;
					}
				}
			}
		};
		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		var BLENDED_COLOR = { r: 192, g: 255, b: 63, a: 1 };
		var pixelInCellThatDemonstratesBlending = [75, 25];
		var passed = (0, _pixelIsColorWithMarker2.default)({
			coordinateUnderTest: pixelInCellThatDemonstratesBlending,
			expectedColor: BLENDED_COLOR,
			id: 1
		});
		expect(passed).toBe(true);
	});

	it('erasing makes holes so material from lower layers shows through', function () {
		var houndstoothOverrides = {
			basePattern: {
				viewSettings: { canvasSize: 100 },
				gridSettings: { gridSize: 0 },
				colorSettings: { backgroundColor: _constants.YELLOW },
				layerSettings: { endLayer: 1 }
			},
			layersPattern: {
				gridSettings: { gridSize: function gridSize() {
						return 2;
					} },
				colorSettings: {
					colorSet: function colorSet() {
						return [_constants.TRANSPARENT, _constants.ERASE];
					},
					backgroundColor: function backgroundColor() {
						return _constants.CYAN;
					}
				}
			}
		};
		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		expect((0, _standardTileIsColors2.default)({
			baseId: 0,
			originInPixels: [0, 0],
			tileSizeInPixels: 50,
			colors: [_constants.YELLOW, _constants.CYAN]
		})).toBe(true);
		expect((0, _standardTileIsColors2.default)({
			baseId: 8,
			originInPixels: [50, 0],
			tileSizeInPixels: 50,
			colors: [_constants.YELLOW, _constants.YELLOW]
		})).toBe(true);
		expect((0, _standardTileIsColors2.default)({
			baseId: 16,
			originInPixels: [0, 50],
			tileSizeInPixels: 50,
			colors: [_constants.CYAN, _constants.CYAN]
		})).toBe(true);
		expect((0, _standardTileIsColors2.default)({
			baseId: 24,
			originInPixels: [50, 50],
			tileSizeInPixels: 50,
			colors: [_constants.CYAN, _constants.YELLOW]
		})).toBe(true);
	});
});

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _standardTileIsColors = __webpack_require__(8);

var _standardTileIsColors2 = _interopRequireDefault(_standardTileIsColors);

var _tileSectorCenterIsColor = __webpack_require__(10);

var _tileSectorCenterIsColor2 = _interopRequireDefault(_tileSectorCenterIsColor);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _constants = __webpack_require__(3);

var _settingsPaths = __webpack_require__(11);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _getFromBasePatternOrDefault = __webpack_require__(12);

var _getFromBasePatternOrDefault2 = _interopRequireDefault(_getFromBasePatternOrDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('.stripeSettings', function () {
	var tileSizeInPixels = (0, _getFromBasePatternOrDefault2.default)(_settingsPaths.TILE_SIZE);
	describe('.stripePositionSettings', function () {
		describe('.stripeCountMode', function () {
			var houndstoothOverrides = void 0;
			beforeEach(function () {
				houndstoothOverrides = {
					basePattern: {
						viewSettings: { canvasSize: tileSizeInPixels },
						gridSettings: { gridSize: 1 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCountMode: undefined
							}
						}
					}
				};
			});

			it('works in standard mode', function () {
				(0, _activateTestMarkerCanvas2.default)();

				(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

				var tile = {
					baseId: 0,
					originInPixels: [0, 0],
					tileSizeInPixels: tileSizeInPixels,
					colors: [_constants.TRANSPARENT, _constants.BLACK]
				};
				expect((0, _standardTileIsColors2.default)(tile)).toBe(true);
			});
		});

		describe('.stripeCountSetting', function () {
			it('changes the number of stripes in striped tiles', function () {
				var houndstoothOverrides = {
					basePattern: {
						gridSettings: { gridSize: 2 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCountSetting: 5
							}
						}
					}
				};
				(0, _activateTestMarkerCanvas2.default)();
				(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

				var originInPixels = [0 * tileSizeInPixels, 0 * tileSizeInPixels];
				expect((0, _tileSectorCenterIsColor2.default)({
					id: 1,
					originInPixels: originInPixels,
					tileSizeInPixels: tileSizeInPixels,
					x: 0,
					y: 0,
					n: 5,
					color: _constants.TRANSPARENT
				})).toBe(true);
				expect((0, _tileSectorCenterIsColor2.default)({
					id: 2,
					originInPixels: originInPixels,
					tileSizeInPixels: tileSizeInPixels,
					x: 1,
					y: 1,
					n: 5,
					color: _constants.BLACK
				})).toBe(true);
				expect((0, _tileSectorCenterIsColor2.default)({
					id: 3,
					originInPixels: originInPixels,
					tileSizeInPixels: tileSizeInPixels,
					x: 2,
					y: 2,
					n: 5,
					color: _constants.TRANSPARENT
				})).toBe(true);
				expect((0, _tileSectorCenterIsColor2.default)({
					id: 4,
					originInPixels: originInPixels,
					tileSizeInPixels: tileSizeInPixels,
					x: 3,
					y: 3,
					n: 5,
					color: _constants.BLACK
				})).toBe(true);
				expect((0, _tileSectorCenterIsColor2.default)({
					id: 5,
					originInPixels: originInPixels,
					tileSizeInPixels: tileSizeInPixels,
					x: 4,
					y: 4,
					n: 5,
					color: _constants.TRANSPARENT
				})).toBe(true);

				originInPixels = [1 * tileSizeInPixels, 1 * tileSizeInPixels];
				expect((0, _tileSectorCenterIsColor2.default)({
					id: 6,
					originInPixels: originInPixels,
					tileSizeInPixels: tileSizeInPixels,
					x: 0,
					y: 0,
					n: 5,
					color: _constants.BLACK
				})).toBe(true);
				expect((0, _tileSectorCenterIsColor2.default)({
					id: 7,
					originInPixels: originInPixels,
					tileSizeInPixels: tileSizeInPixels,
					x: 1,
					y: 1,
					n: 5,
					color: _constants.TRANSPARENT
				})).toBe(true);
				expect((0, _tileSectorCenterIsColor2.default)({
					id: 8,
					originInPixels: originInPixels,
					tileSizeInPixels: tileSizeInPixels,
					x: 2,
					y: 2,
					n: 5,
					color: _constants.BLACK
				})).toBe(true);
				expect((0, _tileSectorCenterIsColor2.default)({
					id: 9,
					originInPixels: originInPixels,
					tileSizeInPixels: tileSizeInPixels,
					x: 3,
					y: 3,
					n: 5,
					color: _constants.TRANSPARENT
				})).toBe(true);
				expect((0, _tileSectorCenterIsColor2.default)({
					id: 10,
					originInPixels: originInPixels,
					tileSizeInPixels: tileSizeInPixels,
					x: 4,
					y: 4,
					n: 5,
					color: _constants.BLACK
				})).toBe(true);
			});
		});
	});

	xdescribe('.baseStripeDiagonal', function () {
		it('can be set to principal, to change the orientation of the stripes', function () {
			var houndstoothOverrides = {
				basePattern: {
					stripeSettings: {
						baseStripeDiagonal: 'PRINCIPAL'
					}
				}
			};
			(0, _activateTestMarkerCanvas2.default)();
			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			var originInPixels = void 0;
			var tileSizeInPixels = _state2.default.mainHoundstooth.basePattern.tileSettings.tileSizeSetting;

			originInPixels = [0 * tileSizeInPixels, 0 * tileSizeInPixels];

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 1,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 0,
				y: 3,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 2,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 0,
				y: 1,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 3,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 1,
				y: 2,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 4,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 2,
				y: 3,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 5,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 1,
				y: 0,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 6,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 2,
				y: 1,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 7,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 3,
				y: 2,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 8,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 3,
				y: 0,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);

			originInPixels = [1 * tileSizeInPixels, 1 * tileSizeInPixels];

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 9,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 0,
				y: 3,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 10,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 0,
				y: 1,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 11,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 1,
				y: 2,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 12,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 2,
				y: 3,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 13,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 1,
				y: 0,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 14,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 2,
				y: 1,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 15,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 3,
				y: 2,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 16,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeInPixels,
				x: 3,
				y: 0,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
		});
	});
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _standardTileIsColors = __webpack_require__(8);

var _standardTileIsColors2 = _interopRequireDefault(_standardTileIsColors);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _constants = __webpack_require__(3);

var _clear = __webpack_require__(30);

var _clear2 = _interopRequireDefault(_clear);

var _buildMockContext = __webpack_require__(169);

var _buildMockContext2 = _interopRequireDefault(_buildMockContext);

var _createContext = __webpack_require__(31);

var createContext = _interopRequireWildcard(_createContext);

var _page = __webpack_require__(13);

var page = _interopRequireWildcard(_page);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('.tileSettings', function () {
	describe('.tileSizeSetting', function () {
		it('adjusts the size in pixels of each tile', function () {
			var houndstoothOverrides = {
				basePattern: {
					tileSettings: {
						tileSizeSetting: 30
					}
				}
			};
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			var tiles = [{ baseId: 0, originInPixels: [0, 0], tileSizeInPixels: 30, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 8, originInPixels: [0, 30], tileSizeInPixels: 30, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 16, originInPixels: [30, 0], tileSizeInPixels: 30, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 24, originInPixels: [30, 30], tileSizeInPixels: 30, colors: [_constants.BLACK, _constants.TRANSPARENT] }];
			tiles.forEach(function (tile) {
				return expect((0, _standardTileIsColors2.default)(tile)).toBe(true);
			});
		});

		describe('when also zooming', function () {
			it('multiplies the effect of taking up more pixels', function () {
				var houndstoothOverrides = {
					basePattern: {
						viewSettings: {
							zoom: 3
						},
						tileSettings: {
							tileSizeSetting: 30
						}
					}
				};
				(0, _activateTestMarkerCanvas2.default)();

				(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

				var tiles = [{ baseId: 0, originInPixels: [0, 0], tileSizeInPixels: 90, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 8, originInPixels: [0, 90], tileSizeInPixels: 90, colors: [_constants.BLACK, _constants.BLACK] }, {
					baseId: 16,
					originInPixels: [90, 0],
					tileSizeInPixels: 90,
					colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
				}, { baseId: 24, originInPixels: [90, 90], tileSizeInPixels: 90, colors: [_constants.BLACK, _constants.TRANSPARENT] }];
				tiles.forEach(function (tile) {
					return expect((0, _standardTileIsColors2.default)(tile)).toBe(true);
				});
			});
		});
	});

	describe('.collapseSameColoredShapesWithinTile', function () {
		var houndstoothOverrides = void 0;
		var mockContext = void 0;
		var contextCallsOrder = void 0;
		beforeEach(function () {
			contextCallsOrder = [];
			(0, _clear2.default)();
			houndstoothOverrides = {
				basePattern: {
					gridSettings: { gridSize: 1 },
					colorSettings: { colorSet: [_constants.BLACK, _constants.BLACK] }
				}
			};
			mockContext = (0, _buildMockContext2.default)({ contextCallsOrder: contextCallsOrder });
			spyOn(createContext, 'default').and.returnValue(mockContext);
			spyOn(page, 'createMixedDownCanvas').and.returnValue((0, _buildMockContext2.default)());
		});

		it('defaults to true, causing tiles whose stripes are the same color to merge into single solid shape', function () {
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			expect(contextCallsOrder.length).toBe(7);
			expect(contextCallsOrder[0].method).toBe('beginPath');
			expect(contextCallsOrder[1].method).toBe('moveTo');
			expect(contextCallsOrder[2].method).toBe('lineTo');
			expect(contextCallsOrder[3].method).toBe('lineTo');
			expect(contextCallsOrder[4].method).toBe('lineTo');
			expect(contextCallsOrder[5].method).toBe('closePath');
			expect(contextCallsOrder[6].method).toBe('fill');
		});

		it('when set to false, causes the shapes to be rendered separately', function () {
			houndstoothOverrides.basePattern.tileSettings = { collapseSameColoredShapesWithinTile: false };
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			expect(contextCallsOrder.length).toBe(26);

			expect(contextCallsOrder[0].method).toBe('beginPath');
			expect(contextCallsOrder[1].method).toBe('moveTo');
			expect(contextCallsOrder[2].method).toBe('lineTo');
			expect(contextCallsOrder[3].method).toBe('lineTo');
			expect(contextCallsOrder[4].method).toBe('closePath');
			expect(contextCallsOrder[5].method).toBe('fill');

			expect(contextCallsOrder[6].method).toBe('beginPath');
			expect(contextCallsOrder[7].method).toBe('moveTo');
			expect(contextCallsOrder[8].method).toBe('lineTo');
			expect(contextCallsOrder[9].method).toBe('lineTo');
			expect(contextCallsOrder[10].method).toBe('lineTo');
			expect(contextCallsOrder[11].method).toBe('closePath');
			expect(contextCallsOrder[12].method).toBe('fill');

			expect(contextCallsOrder[13].method).toBe('beginPath');
			expect(contextCallsOrder[14].method).toBe('moveTo');
			expect(contextCallsOrder[15].method).toBe('lineTo');
			expect(contextCallsOrder[16].method).toBe('lineTo');
			expect(contextCallsOrder[17].method).toBe('lineTo');
			expect(contextCallsOrder[18].method).toBe('closePath');
			expect(contextCallsOrder[19].method).toBe('fill');

			expect(contextCallsOrder[20].method).toBe('beginPath');
			expect(contextCallsOrder[21].method).toBe('moveTo');
			expect(contextCallsOrder[22].method).toBe('lineTo');
			expect(contextCallsOrder[23].method).toBe('lineTo');
			expect(contextCallsOrder[24].method).toBe('closePath');
			expect(contextCallsOrder[25].method).toBe('fill');
		});
	});
});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _pixelIsColor = __webpack_require__(24);

var _pixelIsColor2 = _interopRequireDefault(_pixelIsColor);

var _constants = __webpack_require__(3);

var _standardTileIsColors = __webpack_require__(8);

var _standardTileIsColors2 = _interopRequireDefault(_standardTileIsColors);

var _settingsPaths = __webpack_require__(11);

var _getFromBasePatternOrDefault = __webpack_require__(12);

var _getFromBasePatternOrDefault2 = _interopRequireDefault(_getFromBasePatternOrDefault);

var _tileSectorCenterIsColor = __webpack_require__(10);

var _tileSectorCenterIsColor2 = _interopRequireDefault(_tileSectorCenterIsColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('.viewSettings', function () {
	var tileSizeSetting = (0, _getFromBasePatternOrDefault2.default)(_settingsPaths.TILE_SIZE);
	describe('.canvasSize', function () {
		it('works', function () {
			var houndstoothOverrides = {
				basePattern: {
					colorSettings: { colorSet: [_constants.BLACK] },
					viewSettings: { canvasSize: 125 }
				}
			};
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			expect((0, _pixelIsColor2.default)([0, 0], _constants.BLACK)).toBe(true);
			expect((0, _pixelIsColor2.default)([124, 0], _constants.BLACK)).toBe(true);
			expect((0, _pixelIsColor2.default)([0, 124], _constants.BLACK)).toBe(true);
			expect((0, _pixelIsColor2.default)([124, 124], _constants.BLACK)).toBe(true);
			expect((0, _pixelIsColor2.default)([125, 0], _constants.TRANSPARENT)).toBe(true);
			expect((0, _pixelIsColor2.default)([0, 125], _constants.TRANSPARENT)).toBe(true);
			expect((0, _pixelIsColor2.default)([125, 125], _constants.TRANSPARENT)).toBe(true);
		});
	});

	describe('.zoom', function () {
		it('works', function () {
			var zoom = 2;
			var houndstoothOverrides = {
				basePattern: {
					viewSettings: { zoom: zoom },
					gridSettings: { gridSize: 2 }
				}
			};
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			expect((0, _standardTileIsColors2.default)({
				baseId: 0,
				originInPixels: [0 * zoom * tileSizeSetting, 0 * zoom * tileSizeSetting],
				tileSizeInPixels: zoom * tileSizeSetting,
				colors: [_constants.TRANSPARENT, _constants.BLACK]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 8,
				originInPixels: [1 * zoom * tileSizeSetting, 0 * zoom * tileSizeSetting],
				tileSizeInPixels: zoom * tileSizeSetting,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 16,
				originInPixels: [0 * zoom * tileSizeSetting, 1 * zoom * tileSizeSetting],
				tileSizeInPixels: zoom * tileSizeSetting,
				colors: [_constants.BLACK, _constants.BLACK]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 24,
				originInPixels: [1 * zoom * tileSizeSetting, 1 * zoom * tileSizeSetting],
				tileSizeInPixels: zoom * tileSizeSetting,
				colors: [_constants.BLACK, _constants.TRANSPARENT]
			})).toBe(true);
		});
	});

	describe('.zoomOnCanvasCenter', function () {
		it('leaves the right and bottom quadrants empty if the grid would take up only the top left before zooming, because instead of growing from the origin in the top left it grows away from the center', function () {
			var zoom = 2;
			var houndstoothOverrides = {
				basePattern: {
					viewSettings: {
						zoomOnCanvasCenter: true,
						zoom: 2
					},
					gridSettings: { gridSize: 8 }
				}
			};
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			expect((0, _standardTileIsColors2.default)({
				baseId: 0,
				originInPixels: [3 * zoom * tileSizeSetting, 3 * zoom * tileSizeSetting],
				tileSizeInPixels: zoom * tileSizeSetting,
				colors: [_constants.BLACK, _constants.TRANSPARENT]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 8,
				originInPixels: [3 * zoom * tileSizeSetting, 4 * zoom * tileSizeSetting],
				tileSizeInPixels: zoom * tileSizeSetting,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 16,
				originInPixels: [4 * zoom * tileSizeSetting, 3 * zoom * tileSizeSetting],
				tileSizeInPixels: zoom * tileSizeSetting,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 24,
				originInPixels: [4 * zoom * tileSizeSetting, 4 * zoom * tileSizeSetting],
				tileSizeInPixels: zoom * tileSizeSetting,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			})).toBe(true);
		});
	});

	describe('.centerViewOnCenterOfTileAtHomeAddress', function () {
		it('is self-explanatory', function () {
			var tileSizeSetting = 100;
			var houndstoothOverrides = {
				basePattern: {
					tileSettings: { tileSizeSetting: tileSizeSetting },
					viewSettings: { centerViewOnCenterOfTileAtHomeAddress: true },
					gridSettings: { gridSize: 2 }
				}
			};
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			expect((0, _standardTileIsColors2.default)({
				baseId: 0,
				originInPixels: [350, 350],
				tileSizeInPixels: 100,
				colors: [_constants.TRANSPARENT, _constants.BLACK]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 8,
				originInPixels: [450, 350],
				tileSizeInPixels: 100,
				colors: [_constants.TRANSPARENT, _constants.TRANSPARENT]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 16,
				originInPixels: [350, 450],
				tileSizeInPixels: 100,
				colors: [_constants.BLACK, _constants.BLACK]
			})).toBe(true);
			expect((0, _standardTileIsColors2.default)({
				baseId: 24,
				originInPixels: [450, 450],
				tileSizeInPixels: 100,
				colors: [_constants.BLACK, _constants.TRANSPARENT]
			})).toBe(true);
		});
	});

	describe('.rotateViewAboutCanvasCenter', function () {
		it('rotates the entire grid about the canvas center', function () {
			var houndstoothOverrides = {
				basePattern: {
					viewSettings: {
						canvasSize: 300,
						rotateViewAboutCanvasCenter: Math.PI / 2
					},
					tileSettings: {
						tileSizeSetting: tileSizeSetting
					},
					gridSettings: {
						gridSize: 2
					}
				}
			};
			(0, _activateTestMarkerCanvas2.default)();

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			var originInPixels = [200, 0];

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 1,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 0,
				y: 3,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 2,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 0,
				y: 1,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 3,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 1,
				y: 2,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 4,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 2,
				y: 3,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 5,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 1,
				y: 0,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 6,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 2,
				y: 1,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 7,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 3,
				y: 2,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 8,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 3,
				y: 0,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);

			originInPixels = [250, 0];

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 9,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 0,
				y: 3,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 10,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 0,
				y: 1,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 11,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 1,
				y: 2,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 12,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 2,
				y: 3,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 13,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 1,
				y: 0,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 14,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 2,
				y: 1,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 15,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 3,
				y: 2,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 16,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 3,
				y: 0,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);

			originInPixels = [200, 50];

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 17,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 0,
				y: 3,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 18,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 0,
				y: 1,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 19,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 1,
				y: 2,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 20,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 2,
				y: 3,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 21,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 1,
				y: 0,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 22,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 2,
				y: 1,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 23,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 3,
				y: 2,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 24,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 3,
				y: 0,
				n: 4,
				color: _constants.BLACK
			})).toBe(true);

			originInPixels = [250, 50];

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 25,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 0,
				y: 3,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 26,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 0,
				y: 1,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 27,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 1,
				y: 2,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 28,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 2,
				y: 3,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 29,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 1,
				y: 0,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 30,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 2,
				y: 1,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
			expect((0, _tileSectorCenterIsColor2.default)({
				id: 31,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 3,
				y: 2,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);

			expect((0, _tileSectorCenterIsColor2.default)({
				id: 32,
				originInPixels: originInPixels,
				tileSizeInPixels: tileSizeSetting,
				x: 3,
				y: 0,
				n: 4,
				color: _constants.TRANSPARENT
			})).toBe(true);
		});
	});
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(64);

var testsContext = __webpack_require__(65);
testsContext.keys().forEach(testsContext);

var effectTestsContext = __webpack_require__(171);
effectTestsContext.keys().forEach(effectTestsContext);

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


new EventSource('http://localhost:1234/codeUpdates').addEventListener('message', function () {
  return window.location.reload();
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 17,
	"./effects/standardPatternTest": 28,
	"./effects/standardPatternTest.js": 28,
	"./features/effectTogglesTest": 49,
	"./features/effectTogglesTest.js": 49,
	"./index": 17,
	"./index.js": 17,
	"./settings/colorSettingsTest": 57,
	"./settings/colorSettingsTest.js": 57,
	"./settings/gridSettingsTest": 58,
	"./settings/gridSettingsTest.js": 58,
	"./settings/layerSettingsTest": 59,
	"./settings/layerSettingsTest.js": 59,
	"./settings/stripeSettingsTest": 60,
	"./settings/stripeSettingsTest.js": 60,
	"./settings/tileSettingsTest": 61,
	"./settings/tileSettingsTest.js": 61,
	"./settings/viewSettingsTest": 62,
	"./settings/viewSettingsTest.js": 62
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 65;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var PATTERN_STRUCTURE = {
	viewSettings: {
		canvasSize: true,
		zoom: true,
		zoomOnCanvasCenter: true,
		centerViewOnCenterOfTileAtHomeAddress: true,
		rotateViewAboutCanvasCenter: true
	},
	gridSettings: {
		gridSize: true,
		includeNegativeQuadrants: true
	},
	tileSettings: {
		tileSizeSetting: true,
		getTileOriginAndSize: true,
		collapseSameColoredShapesWithinTile: true
	},
	colorSettings: {
		colorSet: true,
		assignment: {
			switcheroo: true,
			flipGrain: true,
			transformTileColorIndices: true,
			assignmentMode: true,
			offsetAddress: true,
			supertile: true,
			weave: {
				rows: true,
				columns: true
			}
		},
		opacity: true,
		backgroundColor: true
	},
	stripeSettings: {
		stripePositionSettings: {
			stripeCountMode: true,
			stripeCountSetting: true,
			stripeCountContinuumSettings: {
				initialStripeCount: true,
				deltaStripeCount: true
			},
			getStripePositions: true
		},
		baseStripeDiagonal: true
	},
	textureSettings: {
		renderTexture: true
	},
	animationSettings: {
		frameRate: true,
		startAnimationFrame: true,
		endAnimationFrame: true,
		refreshCanvas: true
	},
	layerSettings: {
		startLayer: true,
		endLayer: true
	}
};

var HOUNDSTOOTH_STRUCTURE = {
	basePattern: true,
	animationsPattern: true,
	layersPattern: true,
	name: true
};

var STATE_STRUCTURE = {
	currentLayer: true,
	currentAnimationFrame: true,
	contexts: true,
	mixedDownContext: true,
	lastSavedAnimationFrame: true,
	interval: true,
	animating: true,
	exportFrames: true,
	mixingDown: true,
	performanceLogging: true,
	selectedHoundstoothEffects: true,
	mainHoundstooth: true
};

exports.PATTERN_STRUCTURE = PATTERN_STRUCTURE;
exports.HOUNDSTOOTH_STRUCTURE = HOUNDSTOOTH_STRUCTURE;
exports.STATE_STRUCTURE = STATE_STRUCTURE;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _createCanvasContainer = __webpack_require__(19);

var _createCanvasContainer2 = _interopRequireDefault(_createCanvasContainer);

var _canvas = __webpack_require__(7);

var _createContext = __webpack_require__(31);

var _createContext2 = _interopRequireDefault(_createContext);

var _windowWrapper = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createContexts = function createContexts() {
	var canvasSize = (0, _canvas.getCanvasSize)();

	var canvasContainer = _windowWrapper.document.querySelector('.canvas-container') || (0, _createCanvasContainer2.default)({ canvasSize: canvasSize });
	canvasContainer.innerHTML = '';

	_state2.default.contexts = (0, _canvas.layerIterator)().map(function () {
		return (0, _createContext2.default)({ canvasContainer: canvasContainer, canvasSize: canvasSize });
	});
};

exports.default = createContexts;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCurrentContext = function getCurrentContext() {
  return _state2.default.contexts[_state2.default.currentLayer];
};

exports.default = getCurrentContext;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _codeUtilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var layerIterator = function layerIterator() {
	var layerSettings = _state2.default.mainHoundstooth.basePattern.layerSettings;
	var endLayer = layerSettings && layerSettings.endLayer || 0;
	var layerCount = endLayer + 1;

	return (0, _codeUtilities.iterator)(layerCount);
};

exports.default = layerIterator;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mixDownContexts = function mixDownContexts() {
	return _state2.default.contexts.forEach(function (context) {
		_state2.default.mixedDownContext.drawImage(context.canvas, 0, 0);
	});
};

exports.default = mixDownContexts;

/***/ }),
/* 71 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _deleteElementIfExists = __webpack_require__(73);

var _deleteElementIfExists2 = _interopRequireDefault(_deleteElementIfExists);

var _canvas = __webpack_require__(7);

var _windowWrapper = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createMixedDownCanvas = function createMixedDownCanvas() {
	(0, _deleteElementIfExists2.default)('.mixed-down-canvas');

	var mixedDownCanvas = _windowWrapper.document.createElement('canvas');
	mixedDownCanvas.classList.add('mixed-down-canvas');
	_windowWrapper.document.body.appendChild(mixedDownCanvas);

	var canvasSize = (0, _canvas.getCanvasSize)();
	mixedDownCanvas.width = canvasSize[0];
	mixedDownCanvas.height = canvasSize[1];

	mixedDownCanvas.style.display = 'none';

	return mixedDownCanvas.getContext('2d');
};

exports.default = createMixedDownCanvas;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _windowWrapper = __webpack_require__(2);

var deleteElementIfExists = function deleteElementIfExists(selector) {
	var element = _windowWrapper.document.querySelector(selector);
	element && element.parentNode.removeChild(element);
};

exports.default = deleteElementIfExists;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _insertElementRightAfter = __webpack_require__(33);

var _insertElementRightAfter2 = _interopRequireDefault(_insertElementRightAfter);

var _createEffectTogglesContainer = __webpack_require__(32);

var _createEffectTogglesContainer2 = _interopRequireDefault(_createEffectTogglesContainer);

var _windowWrapper = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createWarningsContainer = function createWarningsContainer() {
	var warningsContainer = _windowWrapper.document.createElement('div');
	warningsContainer.classList.add('warnings-container');
	warningsContainer.style.padding = '20px';

	var effectTogglesContainer = _windowWrapper.document.querySelector('.effect-toggles-container') || (0, _createEffectTogglesContainer2.default)();
	(0, _insertElementRightAfter2.default)(warningsContainer, effectTogglesContainer);

	return warningsContainer;
};

exports.default = createWarningsContainer;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _windowWrapper = __webpack_require__(2);

var _codeUtilities = __webpack_require__(1);

var prepareFunctionsPerSetting = function prepareFunctionsPerSetting(_ref) {
	var settingsFunctions = _ref.settingsFunctions,
	    _ref$settingsPath = _ref.settingsPath,
	    settingsPath = _ref$settingsPath === undefined ? [] : _ref$settingsPath,
	    _ref$functionsArray = _ref.functionsArray,
	    functionsArray = _ref$functionsArray === undefined ? [] : _ref$functionsArray;

	Object.entries(settingsFunctions).forEach(function (_ref2) {
		var _ref3 = _slicedToArray(_ref2, 2),
		    settingName = _ref3[0],
		    maybeSettingFunction = _ref3[1];

		if (typeof maybeSettingFunction === 'function') {
			functionsArray.push({ settingFunctionItself: maybeSettingFunction, settingsPath: settingsPath, settingName: settingName });
		} else if ((typeof maybeSettingFunction === 'undefined' ? 'undefined' : _typeof(maybeSettingFunction)) === 'object' && !(maybeSettingFunction instanceof Array)) {
			prepareFunctionsPerSetting({
				settingsFunctions: maybeSettingFunction,
				settingsPath: (0, _codeUtilities.deeperPath)({ propertyPath: settingsPath, propertyName: settingName }),
				functionsArray: functionsArray
			});
		} else {
			_windowWrapper.console.error('These settings should map onto basePattern settings, and be functions to call for them each animation frame / layer. However, you have provided a non-function ' + maybeSettingFunction + ' at path ' + settingsPath + ' ' + settingName);
		}
	});
	return functionsArray;
};

exports.default = prepareFunctionsPerSetting;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _houndstoothHasOnlyRecognizedPatterns = __webpack_require__(34);

var _houndstoothHasOnlyRecognizedPatterns2 = _interopRequireDefault(_houndstoothHasOnlyRecognizedPatterns);

var _composePatterns = __webpack_require__(35);

var _composePatterns2 = _interopRequireDefault(_composePatterns);

var _windowWrapper = __webpack_require__(2);

var _store = __webpack_require__(9);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _combineHoundstoothEffects = __webpack_require__(108);

var _combineHoundstoothEffects2 = _interopRequireDefault(_combineHoundstoothEffects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composeMainHoundstooth = function composeMainHoundstooth() {
	var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    _ref$houndstoothEffec = _ref.houndstoothEffects,
	    houndstoothEffects = _ref$houndstoothEffec === undefined ? [] : _ref$houndstoothEffec,
	    _ref$houndstoothOverr = _ref.houndstoothOverrides,
	    houndstoothOverrides = _ref$houndstoothOverr === undefined ? {} : _ref$houndstoothOverr,
	    logComposedMainHoundstooth = _ref.logComposedMainHoundstooth;

	var combinedHoundstoothEffects = (0, _combineHoundstoothEffects2.default)({ houndstoothEffects: houndstoothEffects });

	if (unrecognizedPatternsFound({ combinedHoundstoothEffects: combinedHoundstoothEffects, houndstoothOverrides: houndstoothOverrides })) return;

	composePattern({
		patternToCompose: _state2.default.mainHoundstooth.basePattern,
		houndstoothDefaults: _store.defaults.DEFAULT_HOUNDSTOOTH.basePattern,
		houndstoothEffects: combinedHoundstoothEffects.basePattern,
		houndstoothOverrides: houndstoothOverrides.basePattern
	});
	composePattern({
		patternToCompose: _state2.default.mainHoundstooth.layersPattern,
		houndstoothDefaults: _store.defaults.DEFAULT_HOUNDSTOOTH.layersPattern,
		houndstoothEffects: combinedHoundstoothEffects.layersPattern,
		houndstoothOverrides: houndstoothOverrides.layersPattern
	});
	composePattern({
		patternToCompose: _state2.default.mainHoundstooth.animationsPattern,
		houndstoothDefaults: _store.defaults.DEFAULT_HOUNDSTOOTH.animationsPattern,
		houndstoothEffects: combinedHoundstoothEffects.animationsPattern,
		houndstoothOverrides: houndstoothOverrides.animationsPattern
	});

	if (logComposedMainHoundstooth) _windowWrapper.console.log(_state2.default.mainHoundstooth);
};

var unrecognizedPatternsFound = function unrecognizedPatternsFound(_ref2) {
	var combinedHoundstoothEffects = _ref2.combinedHoundstoothEffects,
	    houndstoothOverrides = _ref2.houndstoothOverrides;

	if (!(0, _houndstoothHasOnlyRecognizedPatterns2.default)(_state2.default.mainHoundstooth)) return true;
	if (!(0, _houndstoothHasOnlyRecognizedPatterns2.default)(_store.defaults.DEFAULT_HOUNDSTOOTH)) return true;
	if (!combinedHoundstoothEffects) return true;
	if (!(0, _houndstoothHasOnlyRecognizedPatterns2.default)(houndstoothOverrides)) return true;
	return false;
};

var composePattern = function composePattern(_ref3) {
	var patternToCompose = _ref3.patternToCompose,
	    houndstoothDefaults = _ref3.houndstoothDefaults,
	    houndstoothEffects = _ref3.houndstoothEffects,
	    houndstoothOverrides = _ref3.houndstoothOverrides;

	(0, _composePatterns2.default)({
		patternToBeMergedOnto: patternToCompose,
		patternToMerge: houndstoothDefaults
	});
	(0, _composePatterns2.default)({
		patternToBeMergedOnto: patternToCompose,
		patternToMerge: houndstoothEffects
	});
	(0, _composePatterns2.default)({
		patternToBeMergedOnto: patternToCompose,
		patternToMerge: houndstoothOverrides
	});
};

exports.default = composeMainHoundstooth;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _codeUtilities = __webpack_require__(1);

var _settingPath = __webpack_require__(36);

var _settingPath2 = _interopRequireDefault(_settingPath);

var _windowWrapper = __webpack_require__(2);

var _ui = __webpack_require__(37);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var maybeWarnAboutConflicts = function maybeWarnAboutConflicts(_ref) {
	var warnAboutConflicts = _ref.warnAboutConflicts,
	    settingsPath = _ref.settingsPath,
	    settingName = _ref.settingName,
	    existingSetting = _ref.existingSetting,
	    overridingSetting = _ref.overridingSetting;

	if (shouldWarnAboutConflicts({ warnAboutConflicts: warnAboutConflicts, existingSetting: existingSetting, overridingSetting: overridingSetting })) {
		var warning = buildWarningMessage({ settingsPath: settingsPath, settingName: settingName, existingSetting: existingSetting, overridingSetting: overridingSetting });
		_windowWrapper.console.warn(warning);
		(0, _ui.warn)(warning);
	}
};

var shouldWarnAboutConflicts = function shouldWarnAboutConflicts(_ref2) {
	var warnAboutConflicts = _ref2.warnAboutConflicts,
	    existingSetting = _ref2.existingSetting,
	    overridingSetting = _ref2.overridingSetting;

	return warnAboutConflicts && (0, _codeUtilities.isDefined)(existingSetting) && !settingsAreEqual(existingSetting, overridingSetting);
};

var settingsAreEqual = function settingsAreEqual(a, b) {
	if (typeof a === 'function') {
		if (typeof b === 'function') {
			return a.toString() === b.toString();
		} else {
			return false;
		}
	} else if (a instanceof Array) {
		if (b instanceof Array) {
			return a.every(function (aEntry, index) {
				return aEntry === b[index];
			});
		} else {
			return false;
		}
	}
	return a === b;
};

var buildWarningMessage = function buildWarningMessage(_ref3) {
	var settingsPath = _ref3.settingsPath,
	    settingName = _ref3.settingName,
	    existingSetting = _ref3.existingSetting,
	    overridingSetting = _ref3.overridingSetting;

	var formattedExistingSetting = formatSettingForWarning(existingSetting);
	var formattedOverridingSetting = formatSettingForWarning(overridingSetting);
	var fullSettingPath = (0, _settingPath2.default)(settingsPath, settingName);
	return 'some effects have conflicts on setting `' + fullSettingPath + '`: `' + formattedExistingSetting + '` was overridden by `' + formattedOverridingSetting + '`';
};

var formatSettingForWarning = function formatSettingForWarning(setting) {
	if (typeof setting === 'function') {
		return setting.toString().replace(/\n/g, '').replace(/\t/g, '');
	} else if (typeof setting === 'string') {
		return setting;
	}
	return JSON.stringify(setting);
};

exports.default = maybeWarnAboutConflicts;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _page = __webpack_require__(13);

var _windowWrapper = __webpack_require__(2);

var _createLabel = __webpack_require__(79);

var _createLabel2 = _interopRequireDefault(_createLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addEffectToggle = function addEffectToggle(houndstoothEffect) {
	var label = (0, _createLabel2.default)(houndstoothEffect);

	var effectTogglesContainer = _windowWrapper.document.querySelector('.effect-toggles-container') || (0, _page.createEffectTogglesContainer)();
	effectTogglesContainer.appendChild(label);
};

exports.default = addEffectToggle;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createCheckbox = __webpack_require__(80);

var _createCheckbox2 = _interopRequireDefault(_createCheckbox);

var _windowWrapper = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLabel = function createLabel(houndstoothEffect) {
	var label = _windowWrapper.document.createElement('label');

	label.style.cursor = 'pointer';
	label.style.display = 'block';

	var checkbox = (0, _createCheckbox2.default)(houndstoothEffect);
	label.appendChild(checkbox);

	var name = _windowWrapper.document.createTextNode(houndstoothEffect.name);
	label.appendChild(name);

	return label;
};

exports.default = createLabel;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _buildEffectToggleClickHandler = __webpack_require__(81);

var _buildEffectToggleClickHandler2 = _interopRequireDefault(_buildEffectToggleClickHandler);

var _windowWrapper = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createCheckbox = function createCheckbox(houndstoothEffect) {
	var checkbox = _windowWrapper.document.createElement('input');

	checkbox.setAttribute('type', 'checkbox');
	checkbox.classList.add(houndstoothEffect.name.replace(/ /g, '-'));
	checkbox.onclick = (0, _buildEffectToggleClickHandler2.default)(checkbox, houndstoothEffect);
	checkbox.style.cursor = 'pointer';

	return checkbox;
};

exports.default = createCheckbox;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _resetInterface = __webpack_require__(82);

var _resetInterface2 = _interopRequireDefault(_resetInterface);

var _execute = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildEffectToggleClickHandler = function buildEffectToggleClickHandler(checkbox, houndstoothEffect) {
	return function () {
		(0, _resetInterface2.default)();

		checkbox.checked ? addEffect(houndstoothEffect) : removeEffect(houndstoothEffect);

		(0, _execute.executeSelectedHoundstoothEffects)();
	};
};

var addEffect = function addEffect(houndstoothEffect) {
	return _state2.default.selectedHoundstoothEffects.push(houndstoothEffect);
};

var removeEffect = function removeEffect(houndstoothEffect) {
	_state2.default.selectedHoundstoothEffects = _state2.default.selectedHoundstoothEffects.filter(function (selectedHoundstoothEffect) {
		return selectedHoundstoothEffect.name !== houndstoothEffect.name;
	});
};

exports.default = buildEffectToggleClickHandler;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _canvas = __webpack_require__(7);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _store = __webpack_require__(9);

var _page = __webpack_require__(13);

var _windowWrapper = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resetInterface = function resetInterface() {
	var warnings = _windowWrapper.document.querySelector('.warnings-container') || (0, _page.createWarningsContainer)();
	warnings.innerHTML = '';

	(0, _canvas.clear)();
	_windowWrapper.window.clearInterval(_state2.default.interval);

	var existingEffects = _state2.default.selectedHoundstoothEffects.slice();
	(0, _store.resetState)(_state2.default);
	_state2.default.selectedHoundstoothEffects = existingEffects;
};

exports.default = resetInterface;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _windowWrapper = __webpack_require__(2);

var _components = __webpack_require__(41);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gridAndMaybeLogging = function gridAndMaybeLogging() {
	var performanceLogging = _state2.default.performanceLogging,
	    animating = _state2.default.animating,
	    currentAnimationFrame = _state2.default.currentAnimationFrame,
	    currentLayer = _state2.default.currentLayer;

	if (performanceLogging) _windowWrapper.console.time('grid');
	(0, _components.grid)();
	if (performanceLogging) {
		if (animating) {
			_windowWrapper.console.log('current animation frame / layer: ' + currentAnimationFrame + '/' + currentLayer);
		} else {
			_windowWrapper.console.log('current layer: ' + currentLayer);
		}
		_windowWrapper.console.timeEnd('grid');
	}
};

exports.default = gridAndMaybeLogging;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tile = __webpack_require__(85);

var _tile2 = _interopRequireDefault(_tile);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _view = __webpack_require__(46);

var _codeUtilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grid = function grid() {
	var _ref = _state2.default.mainHoundstooth.basePattern.gridSettings || {},
	    includeNegativeQuadrants = _ref.includeNegativeQuadrants,
	    gridSize = _ref.gridSize;

	(0, _view.applyOpacity)();
	(0, _view.applyBackgroundColor)();

	if (includeNegativeQuadrants) {
		(0, _codeUtilities.iterator)(gridSize * 2).forEach(function (x) {
			(0, _codeUtilities.iterator)(gridSize * 2).forEach(function (y) {
				(0, _tile2.default)({ gridAddress: [x - gridSize, y - gridSize] });
			});
		});
	} else {
		(0, _codeUtilities.iterator)(gridSize).forEach(function (x) {
			(0, _codeUtilities.iterator)(gridSize).forEach(function (y) {
				(0, _tile2.default)({ gridAddress: [x, y] });
			});
		});
	}
};

exports.default = grid;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _isTileUniform = __webpack_require__(86);

var _isTileUniform2 = _interopRequireDefault(_isTileUniform);

var _codeUtilities = __webpack_require__(1);

var _render = __webpack_require__(15);

var _getTileColorIndices = __webpack_require__(103);

var _getTileColorIndices2 = _interopRequireDefault(_getTileColorIndices);

var _getTileOriginAndSize2 = __webpack_require__(104);

var _getTileOriginAndSize3 = _interopRequireDefault(_getTileOriginAndSize2);

var _getStripePositionsForTile = __webpack_require__(105);

var _getStripePositionsForTile2 = _interopRequireDefault(_getStripePositionsForTile);

var _space = __webpack_require__(22);

var _constants = __webpack_require__(3);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tile = function tile(_ref) {
	var gridAddress = _ref.gridAddress;

	var _getTileOriginAndSize = (0, _getTileOriginAndSize3.default)({ gridAddress: gridAddress }),
	    tileOrigin = _getTileOriginAndSize.tileOrigin,
	    tileSize = _getTileOriginAndSize.tileSize;

	if (!tileOrigin) return;

	var tileColorIndices = (0, _getTileColorIndices2.default)({ gridAddress: gridAddress });
	var args = { gridAddress: gridAddress, tileOrigin: tileOrigin, tileSize: tileSize, tileColorIndices: tileColorIndices };
	shouldUseSquare({ tileColorIndices: tileColorIndices }) ? squareTile(args) : stripedTile(args);
};

var shouldUseSquare = function shouldUseSquare(_ref2) {
	var tileColorIndices = _ref2.tileColorIndices;

	var _ref3 = _state2.default.mainHoundstooth.basePattern.tileSettings || {},
	    collapseSameColoredShapesWithinTile = _ref3.collapseSameColoredShapesWithinTile;

	var shouldCollapseSameColoredShapes = (0, _codeUtilities.defaultToTrue)(collapseSameColoredShapesWithinTile);
	return shouldCollapseSameColoredShapes && (0, _isTileUniform2.default)({ tileColorIndices: tileColorIndices });
};

var squareTile = function squareTile(args) {
	args.getOutline = _space.squareOutline;
	(0, _render.shape)(args);
};

var stripedTile = function stripedTile(args) {
	var stripePositions = (0, _getStripePositionsForTile2.default)({ gridAddress: args.gridAddress });
	stripePositions.forEach(function (stripeStart, stripeIndex) {
		var stripeArgs = getStripeArgs({ args: args, stripeStart: stripeStart, stripeIndex: stripeIndex, stripePositions: stripePositions });
		(0, _render.shape)(stripeArgs);
	});
};

var getStripeArgs = function getStripeArgs(_ref4) {
	var args = _ref4.args,
	    stripeStart = _ref4.stripeStart,
	    stripeIndex = _ref4.stripeIndex,
	    stripePositions = _ref4.stripePositions;

	var stripeArgs = (0, _codeUtilities.deepClone)(args);

	stripeArgs.getOutline = _space.stripeOutline;
	stripeArgs.stripeIndex = stripeIndex;
	var stripeEnd = stripePositions[stripeIndex + 1] || _constants.PERIMETER_SCALAR;
	stripeArgs.outlineOptions = { stripeStart: stripeStart, stripeEnd: stripeEnd };

	return stripeArgs;
};

exports.default = tile;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _render = __webpack_require__(15);

var _codeUtilities = __webpack_require__(1);

var isTileUniform = function isTileUniform(_ref) {
	var tileColorIndices = _ref.tileColorIndices;

	for (var i = 0; i < tileColorIndices.length - 1; i++) {
		var colorOne = (0, _render.getColor)({ index: tileColorIndices[i] });
		var colorTwo = (0, _render.getColor)({ index: tileColorIndices[i + 1] });
		if (!(0, _codeUtilities.shallowEqual)(colorOne, colorTwo)) return false;
	}
	return true;
};

exports.default = isTileUniform;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _codeUtilities = __webpack_require__(1);

var _texture = __webpack_require__(88);

var _texture2 = _interopRequireDefault(_texture);

var _canvas = __webpack_require__(7);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _solid = __webpack_require__(45);

var _solid2 = _interopRequireDefault(_solid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shape = function shape(_ref) {
	var tileOrigin = _ref.tileOrigin,
	    tileSize = _ref.tileSize,
	    tileColorIndices = _ref.tileColorIndices,
	    stripeIndex = _ref.stripeIndex,
	    getOutline = _ref.getOutline,
	    outlineOptions = _ref.outlineOptions;

	var outline = getOutline({ tileOrigin: tileOrigin, tileSize: tileSize, outlineOptions: outlineOptions });
	if (!outline) return;

	var context = (0, _canvas.getCurrentContext)();
	var shapeColorIndex = (0, _codeUtilities.wrappedIndex)({ array: tileColorIndices, index: stripeIndex });

	var textureSettings = _state2.default.mainHoundstooth.basePattern.textureSettings;
	var renderTexture = textureSettings && textureSettings.renderTexture;

	var someArgs = { context: context, outline: outline, tileColorIndices: tileColorIndices, tileOrigin: tileOrigin, tileSize: tileSize, renderTexture: renderTexture, shapeColorIndex: shapeColorIndex };
	renderTexture ? (0, _texture2.default)(someArgs) : (0, _solid2.default)(someArgs);
};

exports.default = shape;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _buildPath = __webpack_require__(44);

var _buildPath2 = _interopRequireDefault(_buildPath);

var _clipPath = __webpack_require__(89);

var _clipPath2 = _interopRequireDefault(_clipPath);

var _resetClip = __webpack_require__(90);

var _resetClip2 = _interopRequireDefault(_resetClip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var texture = function texture(textureArgs) {
	var context = textureArgs.context,
	    outline = textureArgs.outline,
	    renderTexture = textureArgs.renderTexture;


	(0, _buildPath2.default)({ context: context, outline: outline });
	(0, _clipPath2.default)({ context: context });
	renderTexture(textureArgs);
	(0, _resetClip2.default)({ context: context });
};

exports.default = texture;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var clipPath = function clipPath(_ref) {
	var context = _ref.context;

	context.save();
	context.clip();
};

exports.default = clipPath;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var resetClip = function resetClip(_ref) {
  var context = _ref.context;
  return context.restore();
};

exports.default = resetClip;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _view = __webpack_require__(46);

var _fill = __webpack_require__(101);

var _fill2 = _interopRequireDefault(_fill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var draw = function draw(_ref) {
	var context = _ref.context,
	    shapeColor = _ref.shapeColor,
	    outline = _ref.outline;

	if (outline.length < 3) return;
	outline = (0, _view.applyView)(outline);

	(0, _fill2.default)({ context: context, shapeColor: shapeColor, outline: outline });
};

exports.default = draw;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _render = __webpack_require__(15);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _canvas = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyBackgroundColor = function applyBackgroundColor() {
	var colorSettings = _state2.default.mainHoundstooth.basePattern.colorSettings;
	var backgroundColor = colorSettings && colorSettings.backgroundColor;
	if (!backgroundColor) return;

	var canvasSize = (0, _canvas.getCanvasSize)();

	var context = (0, _canvas.getCurrentContext)();
	context.fillStyle = (0, _render.parseColor)(backgroundColor);
	context.fillRect(0, 0, canvasSize[0], canvasSize[1]);
};

exports.default = applyBackgroundColor;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _canvas = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyOpacity = function applyOpacity() {
	var colorSettings = _state2.default.mainHoundstooth.basePattern.colorSettings;
	if (!(colorSettings && colorSettings.opacity) || colorSettings.opacity === 1) return;

	var context = (0, _canvas.getCurrentContext)();
	context.globalAlpha = colorSettings.opacity;
};

exports.default = applyOpacity;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _applyZoom = __webpack_require__(95);

var _applyZoom2 = _interopRequireDefault(_applyZoom);

var _applyScroll = __webpack_require__(96);

var _applyScroll2 = _interopRequireDefault(_applyScroll);

var _applyTilt = __webpack_require__(97);

var _applyTilt2 = _interopRequireDefault(_applyTilt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyView = function applyView(outline) {
	outline = (0, _applyZoom2.default)(outline);
	outline = (0, _applyScroll2.default)(outline);
	outline = (0, _applyTilt2.default)(outline);
	return outline;
};

exports.default = applyView;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyZoom = function applyZoom(outline) {
	return outline.map(adjustCoordinateForZoom);
};

var adjustCoordinateForZoom = function adjustCoordinateForZoom(coordinate) {
	var _ref = _state2.default.mainHoundstooth.basePattern.viewSettings || {},
	    zoom = _ref.zoom,
	    zoomOnCanvasCenter = _ref.zoomOnCanvasCenter,
	    canvasSize = _ref.canvasSize,
	    centerViewOnCenterOfTileAtHomeAddress = _ref.centerViewOnCenterOfTileAtHomeAddress;

	var canvasCenter = canvasSize / 2;
	var shouldAdjustForCentering = zoomOnCanvasCenter && !centerViewOnCenterOfTileAtHomeAddress;

	if (shouldAdjustForCentering) coordinate = coordinate.map(function (c) {
		return c -= canvasCenter;
	});
	coordinate = coordinate.map(function (c) {
		return c *= zoom;
	});
	if (shouldAdjustForCentering) coordinate = coordinate.map(function (c) {
		return c += canvasCenter;
	});

	return coordinate;
};

exports.default = applyZoom;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyScroll = function applyScroll(outline) {
	var viewSettings = _state2.default.mainHoundstooth.basePattern.viewSettings;
	var centerViewOnCenterOfTileAtHomeAddress = viewSettings.centerViewOnCenterOfTileAtHomeAddress;

	if (!centerViewOnCenterOfTileAtHomeAddress) return outline;

	return outline.map(applyCenterViewOnCenterOfTileAtHomeAddress);
};

var applyCenterViewOnCenterOfTileAtHomeAddress = function applyCenterViewOnCenterOfTileAtHomeAddress(coordinate) {
	var canvasSize = _state2.default.mainHoundstooth.basePattern.viewSettings.canvasSize;
	var canvasCenter = canvasSize / 2;

	var tileSizeSetting = _state2.default.mainHoundstooth.basePattern.tileSettings.tileSizeSetting;
	var halfTileSize = tileSizeSetting / 2;

	return [coordinate[0] + canvasCenter - halfTileSize, coordinate[1] + canvasCenter - halfTileSize];
};

exports.default = applyScroll;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _space = __webpack_require__(22);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyTilt = function applyTilt(outline) {
	var _ref = _state2.default.mainHoundstooth.basePattern.viewSettings || {},
	    canvasSize = _ref.canvasSize,
	    rotateViewAboutCanvasCenter = _ref.rotateViewAboutCanvasCenter;

	if (!rotateViewAboutCanvasCenter) return outline;

	var point = [canvasSize / 2, canvasSize / 2];
	return outline.map(function (coordinate) {
		return (0, _space.rotateCoordinateAboutPoint)({
			point: point,
			coordinate: coordinate,
			rotation: rotateViewAboutCanvasCenter
		});
	});
};

exports.default = applyTilt;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var rotateCoordinateAboutPoint = function rotateCoordinateAboutPoint(_ref) {
	var coordinate = _ref.coordinate,
	    point = _ref.point,
	    rotation = _ref.rotation;

	var sin = Math.sin(rotation);
	var cos = Math.cos(rotation);

	var relativeX = coordinate[0] - point[0];
	var relativeY = coordinate[1] - point[1];

	return [point[0] + relativeX * cos - relativeY * sin, point[1] + relativeX * sin + relativeY * cos];
};

exports.default = rotateCoordinateAboutPoint;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var squareOutline = function squareOutline(_ref) {
	var tileOrigin = _ref.tileOrigin,
	    tileSize = _ref.tileSize;

	var x = tileOrigin[0];
	var y = tileOrigin[1];

	return [[x, y], [x + tileSize, y], [x + tileSize, y + tileSize], [x, y + tileSize]];
};

exports.default = squareOutline;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var stripeOutline = function stripeOutline(_ref) {
	var tileOrigin = _ref.tileOrigin,
	    tileSize = _ref.tileSize,
	    outlineOptions = _ref.outlineOptions;
	var stripeStart = outlineOptions.stripeStart,
	    stripeEnd = outlineOptions.stripeEnd;

	var tileArgs = { x: tileOrigin[0], y: tileOrigin[1], tileSize: tileSize };

	var stripeStartsInTopLeftHalf = stripeStart < 1;
	var stripeEndsInBottomRightHalf = stripeEnd > 1;

	var outline = [];
	firstPoint({ outline: outline, stripeStartsInTopLeftHalf: stripeStartsInTopLeftHalf, tileArgs: tileArgs, stripeStart: stripeStart });
	middlePoints({ outline: outline, stripeStartsInTopLeftHalf: stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf: stripeEndsInBottomRightHalf, tileArgs: tileArgs, stripeEnd: stripeEnd });
	lastPoints({ outline: outline, stripeStartsInTopLeftHalf: stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf: stripeEndsInBottomRightHalf, tileArgs: tileArgs, stripeStart: stripeStart });
	return outline;
};

var firstPoint = function firstPoint(_ref2) {
	var outline = _ref2.outline,
	    stripeStartsInTopLeftHalf = _ref2.stripeStartsInTopLeftHalf,
	    tileArgs = _ref2.tileArgs,
	    stripeStart = _ref2.stripeStart;

	if (stripeStartsInTopLeftHalf) {
		outline.push(pointAlongTopEdge(tileArgs, { stripePosition: stripeStart }));
	} else {
		outline.push(pointAlongRightEdge(tileArgs, { stripePosition: stripeStart }));
	}
};

var middlePoints = function middlePoints(_ref3) {
	var outline = _ref3.outline,
	    stripeStartsInTopLeftHalf = _ref3.stripeStartsInTopLeftHalf,
	    stripeEndsInBottomRightHalf = _ref3.stripeEndsInBottomRightHalf,
	    tileArgs = _ref3.tileArgs,
	    stripeEnd = _ref3.stripeEnd;

	if (!stripeEndsInBottomRightHalf) {
		outline.push(pointAlongTopEdge(tileArgs, { stripePosition: stripeEnd }));
		outline.push(pointAlongLeftEdge(tileArgs, { stripePosition: stripeEnd }));
	} else {
		if (stripeStartsInTopLeftHalf) {
			outline.push(pointInTopRightCorner(tileArgs));
		}

		var stripeEndsInBottomRightCorner = stripeEnd === 2;
		if (stripeEndsInBottomRightCorner) {
			outline.push(pointInBottomRightCorner(tileArgs));
		} else {
			outline.push(pointAlongRightEdge(tileArgs, { stripePosition: stripeEnd }));
			outline.push(pointAlongBottomEdge(tileArgs, { stripePosition: stripeEnd }));
		}
	}
};

var lastPoints = function lastPoints(_ref4) {
	var outline = _ref4.outline,
	    stripeStartsInTopLeftHalf = _ref4.stripeStartsInTopLeftHalf,
	    stripeEndsInBottomRightHalf = _ref4.stripeEndsInBottomRightHalf,
	    tileArgs = _ref4.tileArgs,
	    stripeStart = _ref4.stripeStart;

	var stripeStartsInTopLeftCorner = stripeStart === 0;
	if (!stripeStartsInTopLeftCorner) {
		if (stripeStartsInTopLeftHalf) {
			stripeEndsInBottomRightHalf && outline.push(pointInBottomLeftCorner(tileArgs));
			outline.push(pointAlongLeftEdge(tileArgs, { stripePosition: stripeStart }));
		} else {
			outline.push(pointAlongBottomEdge(tileArgs, { stripePosition: stripeStart }));
		}
	} else {
		if (stripeEndsInBottomRightHalf) {
			outline.push(pointInBottomLeftCorner(tileArgs));
		}
	}
};

var pointAlongTopEdge = function pointAlongTopEdge(_ref5, _ref6) {
	var x = _ref5.x,
	    y = _ref5.y,
	    tileSize = _ref5.tileSize;
	var stripePosition = _ref6.stripePosition;
	return [x + stripePosition * tileSize, y];
};

var pointAlongLeftEdge = function pointAlongLeftEdge(_ref7, _ref8) {
	var x = _ref7.x,
	    y = _ref7.y,
	    tileSize = _ref7.tileSize;
	var stripePosition = _ref8.stripePosition;
	return [x, y + stripePosition * tileSize];
};

var pointAlongRightEdge = function pointAlongRightEdge(_ref9, _ref10) {
	var x = _ref9.x,
	    y = _ref9.y,
	    tileSize = _ref9.tileSize;
	var stripePosition = _ref10.stripePosition;
	return [x + tileSize, y + (stripePosition - 1) * tileSize];
};

var pointAlongBottomEdge = function pointAlongBottomEdge(_ref11, _ref12) {
	var x = _ref11.x,
	    y = _ref11.y,
	    tileSize = _ref11.tileSize;
	var stripePosition = _ref12.stripePosition;
	return [x + (stripePosition - 1) * tileSize, y + tileSize];
};

var pointInTopRightCorner = function pointInTopRightCorner(_ref13) {
	var x = _ref13.x,
	    y = _ref13.y,
	    tileSize = _ref13.tileSize;
	return [x + tileSize, y];
};

var pointInBottomRightCorner = function pointInBottomRightCorner(_ref14) {
	var x = _ref14.x,
	    y = _ref14.y,
	    tileSize = _ref14.tileSize;
	return [x + tileSize, y + tileSize];
};

var pointInBottomLeftCorner = function pointInBottomLeftCorner(_ref15) {
	var x = _ref15.x,
	    y = _ref15.y,
	    tileSize = _ref15.tileSize;
	return [x, y + tileSize];
};

exports.default = stripeOutline;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _parseColor = __webpack_require__(43);

var _parseColor2 = _interopRequireDefault(_parseColor);

var _buildPath = __webpack_require__(44);

var _buildPath2 = _interopRequireDefault(_buildPath);

var _fillPath = __webpack_require__(102);

var _fillPath2 = _interopRequireDefault(_fillPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fill = function fill(_ref) {
	var context = _ref.context,
	    shapeColor = _ref.shapeColor,
	    outline = _ref.outline;

	context.globalCompositeOperation = shapeColor.a === -1 ? 'destination-out' : 'source-over';

	context.fillStyle = (0, _parseColor2.default)(shapeColor);

	(0, _buildPath2.default)({ context: context, outline: outline });

	(0, _fillPath2.default)({ context: context });
};

exports.default = fill;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var fillPath = function fillPath(_ref) {
	var context = _ref.context;

	context.closePath();
	context.fill();
};

exports.default = fillPath;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _codeUtilities = __webpack_require__(1);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTileColorIndices = function getTileColorIndices(_ref) {
	var gridAddress = _ref.gridAddress;

	var assignment = _state2.default.mainHoundstooth.basePattern.colorSettings.assignment;

	var tileColorIndices = getIndices({ gridAddress: gridAddress, assignment: assignment });

	return maybeAdjustTileColorIndices({ assignment: assignment, gridAddress: gridAddress, tileColorIndices: tileColorIndices });
};

var maybeAdjustTileColorIndices = function maybeAdjustTileColorIndices(_ref2) {
	var assignment = _ref2.assignment,
	    gridAddress = _ref2.gridAddress,
	    tileColorIndices = _ref2.tileColorIndices;
	var transformTileColorIndices = assignment.transformTileColorIndices,
	    flipGrain = assignment.flipGrain,
	    switcheroo = assignment.switcheroo;


	if (flipGrain) tileColorIndices = (0, _codeUtilities.reversed)(tileColorIndices);
	if (switcheroo) tileColorIndices = applySwitcheroo({ tileColorIndices: tileColorIndices, gridAddress: gridAddress });
	if (transformTileColorIndices) tileColorIndices = transformTileColorIndices({ tileColorIndices: tileColorIndices, gridAddress: gridAddress });

	return tileColorIndices;
};

var getIndices = function getIndices(_ref3) {
	var gridAddress = _ref3.gridAddress,
	    assignment = _ref3.assignment;
	var offsetAddress = assignment.offsetAddress,
	    assignmentMode = assignment.assignmentMode,
	    weave = assignment.weave,
	    supertile = assignment.supertile;


	var addressOffset = offsetAddress ? offsetAddress({ gridAddress: gridAddress }) : [0, 0];

	var getter = void 0;
	if (assignmentMode === 'WEAVE') {
		getter = getByWeave;
	} else if (assignmentMode === 'SUPERTILE') {
		getter = getBySupertile;
	}
	return getter({ gridAddress: gridAddress, addressOffset: addressOffset, weave: weave, supertile: supertile });
};

var getByWeave = function getByWeave(_ref4) {
	var gridAddress = _ref4.gridAddress,
	    addressOffset = _ref4.addressOffset,
	    weave = _ref4.weave;
	var rows = weave.rows,
	    columns = weave.columns;

	var columnsIndex = (0, _codeUtilities.wrappedIndex)({ array: columns, index: gridAddress[0] + addressOffset[0] });
	var rowsIndex = (0, _codeUtilities.wrappedIndex)({ array: rows, index: gridAddress[1] + addressOffset[1] });
	return [rowsIndex, columnsIndex];
};

var getBySupertile = function getBySupertile(_ref5) {
	var gridAddress = _ref5.gridAddress,
	    addressOffset = _ref5.addressOffset,
	    supertile = _ref5.supertile;

	var supertileColumn = (0, _codeUtilities.wrappedIndex)({
		array: supertile,
		index: gridAddress[0] + addressOffset[0]
	});
	return (0, _codeUtilities.wrappedIndex)({ array: supertileColumn, index: gridAddress[1] + addressOffset[1] });
};

var applySwitcheroo = function applySwitcheroo(_ref6) {
	var tileColorIndices = _ref6.tileColorIndices,
	    gridAddress = _ref6.gridAddress;

	var xMod = gridAddress[0] % 4;
	var yMod = gridAddress[1] % 4;
	if (xMod === 1 && yMod === 1 || xMod === 3 && yMod === 3 || xMod === 2 && yMod === 0 || xMod === 0 && yMod === 2) {
		return (0, _codeUtilities.reversed)(tileColorIndices);
	}

	return tileColorIndices;
};

exports.default = getTileColorIndices;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTileOriginAndSize = function getTileOriginAndSize(_ref) {
	var gridAddress = _ref.gridAddress;

	var getTileOriginAndSize = _state2.default.mainHoundstooth.basePattern.tileSettings.getTileOriginAndSize || getStandardTileOriginAndSize;
	return getTileOriginAndSize({ gridAddress: gridAddress });
};

var getStandardTileOriginAndSize = function getStandardTileOriginAndSize(_ref2) {
	var gridAddress = _ref2.gridAddress;

	var tileSize = _state2.default.mainHoundstooth.basePattern.tileSettings.tileSizeSetting;
	return {
		tileOrigin: [gridAddress[0] * tileSize, gridAddress[1] * tileSize],
		tileSize: tileSize
	};
};

exports.default = getTileOriginAndSize;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _perStripe = __webpack_require__(47);

var _perStripe2 = _interopRequireDefault(_perStripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStripePositionsForTile = function getStripePositionsForTile() {
	var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    gridAddress = _ref.gridAddress;

	var getStripePositions = _state2.default.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.getStripePositions;
	var getStripePositionsForTile = getStripePositions || standardStripePositions;
	return getStripePositionsForTile({ gridAddress: gridAddress });
};

var standardStripePositions = function standardStripePositions() {
	return (0, _perStripe2.default)({ getStripePosition: standardStripePosition });
};

var standardStripePosition = function standardStripePosition(_ref2) {
	var stripeIndex = _ref2.stripeIndex,
	    stripeCount = _ref2.stripeCount;
	return stripeIndex / stripeCount;
};

exports.default = getStripePositionsForTile;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var tileCenter = function tileCenter(_ref) {
	var tileOrigin = _ref.tileOrigin,
	    tileSize = _ref.tileSize;
	return [tileOrigin[0] + tileSize / 2, tileOrigin[1] + tileSize / 2];
};

exports.default = tileCenter;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _page = __webpack_require__(13);

var _windowWrapper = __webpack_require__(2);

var warn = function warn(warningMessage) {
	var warning = _windowWrapper.document.createElement('div');
	warning.innerHTML = warningMessage;

	var warningsContainer = _windowWrapper.document.querySelector('.warnings-container') || (0, _page.createWarningsContainer)();

	warningsContainer.appendChild(warning);
};

exports.default = warn;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _houndstoothHasOnlyRecognizedPatterns = __webpack_require__(34);

var _houndstoothHasOnlyRecognizedPatterns2 = _interopRequireDefault(_houndstoothHasOnlyRecognizedPatterns);

var _composePatterns = __webpack_require__(35);

var _composePatterns2 = _interopRequireDefault(_composePatterns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var combineHoundstoothEffects = function combineHoundstoothEffects(_ref) {
	var houndstoothEffects = _ref.houndstoothEffects;

	var basePattern = {};
	var layersPattern = {};
	var animationsPattern = {};

	var anyIssues = false;
	houndstoothEffects.forEach(function (houndstoothEffect) {
		if (!(0, _houndstoothHasOnlyRecognizedPatterns2.default)(houndstoothEffect)) {
			anyIssues = true;
			return;
		}
		(0, _composePatterns2.default)({
			patternToBeMergedOnto: basePattern,
			patternToMerge: houndstoothEffect.basePattern,
			warnAboutConflicts: true
		});
		(0, _composePatterns2.default)({
			patternToBeMergedOnto: layersPattern,
			patternToMerge: houndstoothEffect.layersPattern,
			warnAboutConflicts: true
		});
		(0, _composePatterns2.default)({
			patternToBeMergedOnto: animationsPattern,
			patternToMerge: houndstoothEffect.animationsPattern,
			warnAboutConflicts: true
		});
	});

	if (anyIssues) {
		return null;
	}
	return { basePattern: basePattern, layersPattern: layersPattern, animationsPattern: animationsPattern };
};

exports.default = combineHoundstoothEffects;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _codeUtilities = __webpack_require__(1);

var _animation = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var executeAnimation = function executeAnimation(_ref) {
	var layerFunctions = _ref.layerFunctions,
	    animationFunctions = _ref.animationFunctions;

	var _ref2 = _state2.default.mainHoundstooth.basePattern.animationSettings || {},
	    frameRate = _ref2.frameRate,
	    refreshCanvas = _ref2.refreshCanvas,
	    startAnimationFrame = _ref2.startAnimationFrame,
	    endAnimationFrame = _ref2.endAnimationFrame;

	startAnimationFrame = startAnimationFrame || 0;
	refreshCanvas = (0, _codeUtilities.defaultToTrue)(refreshCanvas);

	_state2.default.lastSavedAnimationFrame = startAnimationFrame;

	var animationFunction = (0, _animation.buildAnimationFunction)({ startAnimationFrame: startAnimationFrame, animationFunctions: animationFunctions, layerFunctions: layerFunctions, refreshCanvas: refreshCanvas });
	var stopConditionFunction = (0, _animation.buildStopConditionFunction)({ endAnimationFrame: endAnimationFrame });

	(0, _animation.animator)({ animationFunction: animationFunction, frameRate: frameRate, stopConditionFunction: stopConditionFunction });
};

exports.default = executeAnimation;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _buildIntervalFunction = __webpack_require__(111);

var _buildIntervalFunction2 = _interopRequireDefault(_buildIntervalFunction);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _windowWrapper = __webpack_require__(2);

var _windowWrapper2 = _interopRequireDefault(_windowWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animator = function animator(_ref) {
	var animationFunction = _ref.animationFunction,
	    frameRate = _ref.frameRate,
	    stopConditionFunction = _ref.stopConditionFunction;

	var intervalFunction = (0, _buildIntervalFunction2.default)({ animationFunction: animationFunction, stopConditionFunction: stopConditionFunction });
	_state2.default.interval = _windowWrapper2.default.setInterval(intervalFunction, frameRate);
};

exports.default = animator;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _windowWrapper = __webpack_require__(2);

var _windowWrapper2 = _interopRequireDefault(_windowWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildIntervalFunction = function buildIntervalFunction(_ref) {
	var animationFunction = _ref.animationFunction,
	    stopConditionFunction = _ref.stopConditionFunction;
	return function () {
		animationFunction();
		if (stopConditionFunction()) _windowWrapper2.default.clearInterval(_state2.default.interval);
	};
};

exports.default = buildIntervalFunction;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _execute = __webpack_require__(21);

var _canvas = __webpack_require__(7);

var _exportFrame = __webpack_require__(113);

var _exportFrame2 = _interopRequireDefault(_exportFrame);

var _codeUtilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildAnimationFunction = function buildAnimationFunction(_ref) {
	var startAnimationFrame = _ref.startAnimationFrame,
	    animationFunctions = _ref.animationFunctions,
	    layerFunctions = _ref.layerFunctions,
	    refreshCanvas = _ref.refreshCanvas;
	return function () {
		if (_state2.default.exportFrames && _state2.default.currentAnimationFrame > _state2.default.lastSavedAnimationFrame) return;

		if (_state2.default.currentAnimationFrame >= startAnimationFrame) {
			if (refreshCanvas) (0, _canvas.clear)();

			var preLayerSettings = (0, _codeUtilities.deepClone)(_state2.default.mainHoundstooth.basePattern);
			(0, _execute.executeGrid)({ layerFunctions: layerFunctions });
			Object.assign(_state2.default.mainHoundstooth.basePattern, preLayerSettings);

			if (_state2.default.exportFrames) (0, _exportFrame2.default)();
		}

		(0, _execute.callFunctionsPerSetting)({ settingsFunctions: animationFunctions });
		_state2.default.currentAnimationFrame++;
	};
};

exports.default = buildAnimationFunction;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _saveFrame = __webpack_require__(114);

var _saveFrame2 = _interopRequireDefault(_saveFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exportFrame = function exportFrame() {
  return _state2.default.mixedDownContext.canvas.toBlob(_saveFrame2.default);
};

exports.default = exportFrame;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fileSaver = __webpack_require__(115);

var _fileSaver2 = _interopRequireDefault(_fileSaver);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveFrame = function saveFrame(blob) {
	_fileSaver2.default.saveAs(blob, _state2.default.lastSavedAnimationFrame + '.png');
	_state2.default.lastSavedAnimationFrame++;
};

exports.default = saveFrame;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if (("function" !== "undefined" && __webpack_require__(116) !== null) && (__webpack_require__(117) !== null)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
    return saveAs;
  }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 117 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildStopConditionFunction = function buildStopConditionFunction(_ref) {
  var endAnimationFrame = _ref.endAnimationFrame;
  return function () {
    return _state2.default.currentAnimationFrame > endAnimationFrame;
  };
};

exports.default = buildStopConditionFunction;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _constants = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var standardAnimation = function standardAnimation(p) {
  return p * Math.pow(_constants.ANIMATION_RATE, _state2.default.currentAnimationFrame);
};

exports.default = standardAnimation;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var isCloseTo = function isCloseTo(numberOne, numberTwo) {
	var precision = 2;

	var pow = Math.pow(10, precision + 1);
	var delta = Math.abs(numberOne - numberTwo);
	var maxDelta = Math.pow(10, -precision) / 2;

	return Math.round(delta * pow) / pow <= maxDelta;
};

exports.default = isCloseTo;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _settingsPaths = __webpack_require__(11);

var _getFromBasePatternOrDefault = __webpack_require__(12);

var _getFromBasePatternOrDefault2 = _interopRequireDefault(_getFromBasePatternOrDefault);

var _createTestMarkersCanvas = __webpack_require__(23);

var _createTestMarkersCanvas2 = _interopRequireDefault(_createTestMarkersCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testMarkersClear = function testMarkersClear() {
	var testMarkersCanvas = document.querySelector('.test-markers-canvas') || (0, _createTestMarkersCanvas2.default)();
	var testMarkersContext = testMarkersCanvas.getContext('2d');

	var canvasSize = (0, _getFromBasePatternOrDefault2.default)(_settingsPaths.CANVAS_SIZE);

	testMarkersContext.clearRect(0, 0, canvasSize, canvasSize);
};

exports.default = testMarkersClear;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.houndsmorphosisEffect = exports.houndazzleEffect = exports.harmonitoothEffect = exports.gongramEffect = exports.ginghamChevronContinuumEffect = exports.cmyktoothEffect = undefined;

var _cmyktooth = __webpack_require__(123);

var _ginghamChevronContinuum = __webpack_require__(133);

var _gongram = __webpack_require__(141);

var _harmonitooth = __webpack_require__(147);

var _houndazzle = __webpack_require__(152);

var _houndsmorphosis = __webpack_require__(163);

// import { ginghoundstoothamEffect } from './ginghoundstootham'
exports.cmyktoothEffect = _cmyktooth.cmyktoothEffect;
exports.ginghamChevronContinuumEffect = _ginghamChevronContinuum.ginghamChevronContinuumEffect;
exports.gongramEffect = _gongram.gongramEffect;
exports.harmonitoothEffect = _harmonitooth.harmonitoothEffect;
exports.houndazzleEffect = _houndazzle.houndazzleEffect;
exports.houndsmorphosisEffect = _houndsmorphosis.houndsmorphosisEffect;
// import { derasterizedEffect } from './derasterized'

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmyktoothEffect = undefined;

var _effects = __webpack_require__(124);

exports.cmyktoothEffect = _effects.cmyktoothEffect;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmyktoothEffect = undefined;

var _cmyktoothEffect = __webpack_require__(50);

var _cmyktoothEffect2 = _interopRequireDefault(_cmyktoothEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.cmyktoothEffect = _cmyktoothEffect2.default;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cmyktoothViewRotationAboutCanvasCenter = exports.cmyktoothTileSize = exports.cmyktoothOpacity = exports.cmyktoothOffsetAddress = exports.cmyktoothColorSet = undefined;

var _components = __webpack_require__(126);

var _view = __webpack_require__(130);

exports.cmyktoothColorSet = _components.cmyktoothColorSet;
exports.cmyktoothOffsetAddress = _components.cmyktoothOffsetAddress;
exports.cmyktoothOpacity = _view.cmyktoothOpacity;
exports.cmyktoothTileSize = _components.cmyktoothTileSize;
exports.cmyktoothViewRotationAboutCanvasCenter = _view.cmyktoothViewRotationAboutCanvasCenter;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cmyktoothTileSize = exports.cmyktoothOffsetAddress = exports.cmyktoothColorSet = undefined;

var _cmyktoothColorSet = __webpack_require__(127);

var _cmyktoothColorSet2 = _interopRequireDefault(_cmyktoothColorSet);

var _cmyktoothOffsetAddress = __webpack_require__(128);

var _cmyktoothOffsetAddress2 = _interopRequireDefault(_cmyktoothOffsetAddress);

var _cmyktoothTileSize = __webpack_require__(129);

var _cmyktoothTileSize2 = _interopRequireDefault(_cmyktoothTileSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.cmyktoothColorSet = _cmyktoothColorSet2.default;
exports.cmyktoothOffsetAddress = _cmyktoothOffsetAddress2.default;
exports.cmyktoothTileSize = _cmyktoothTileSize2.default;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _src = __webpack_require__(6);

var BLACK = _src.constants.BLACK,
    CYAN = _src.constants.CYAN,
    MAGENTA = _src.constants.MAGENTA,
    YELLOW = _src.constants.YELLOW,
    TRANSPARENT = _src.constants.TRANSPARENT;


var CMYKTOOTH_COLORS = [BLACK, CYAN, MAGENTA, YELLOW];

var cmyktoothColorSet = function cmyktoothColorSet() {
  return [CMYKTOOTH_COLORS[_src.state.currentLayer % 4], TRANSPARENT];
};

exports.default = cmyktoothColorSet;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var cmyktoothOffsetAddress = function cmyktoothOffsetAddress() {
  return [1, 0];
};

exports.default = cmyktoothOffsetAddress;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var cmyktoothTileSize = function cmyktoothTileSize(p) {
  return p / Math.sqrt(2);
};

exports.default = cmyktoothTileSize;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cmyktoothViewRotationAboutCanvasCenter = exports.cmyktoothOpacity = undefined;

var _cmyktoothOpacity = __webpack_require__(131);

var _cmyktoothOpacity2 = _interopRequireDefault(_cmyktoothOpacity);

var _cmyktoothViewRotationAboutCanvasCenter = __webpack_require__(132);

var _cmyktoothViewRotationAboutCanvasCenter2 = _interopRequireDefault(_cmyktoothViewRotationAboutCanvasCenter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.cmyktoothOpacity = _cmyktoothOpacity2.default;
exports.cmyktoothViewRotationAboutCanvasCenter = _cmyktoothViewRotationAboutCanvasCenter2.default;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _src = __webpack_require__(6);

var cmyktoothOpacity = function cmyktoothOpacity() {
  return 1 / (_src.state.currentLayer + 2);
};

exports.default = cmyktoothOpacity;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _src = __webpack_require__(6);

var cmyktoothViewRotationAboutCanvasCenter = function cmyktoothViewRotationAboutCanvasCenter(p) {
  return p + _src.constants.EIGHTH_OF_CIRCLE_ROTATION;
};

exports.default = cmyktoothViewRotationAboutCanvasCenter;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ginghamChevronContinuumEffect = undefined;

var _effects = __webpack_require__(134);

exports.ginghamChevronContinuumEffect = _effects.ginghamChevronContinuumEffect;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ginghamChevronContinuumEffect = undefined;

var _ginghamChevronContinuumEffect = __webpack_require__(51);

var _ginghamChevronContinuumEffect2 = _interopRequireDefault(_ginghamChevronContinuumEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ginghamChevronContinuumEffect = _ginghamChevronContinuumEffect2.default;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid = exports.getGinghamChevronContinuumStripePositions = undefined;

var _components = __webpack_require__(136);

exports.getGinghamChevronContinuumStripePositions = _components.getGinghamChevronContinuumStripePositions;
exports.realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid = _components.realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid = exports.getGinghamChevronContinuumStripePositions = undefined;

var _getGinghamChevronContinuumStripePositions = __webpack_require__(137);

var _getGinghamChevronContinuumStripePositions2 = _interopRequireDefault(_getGinghamChevronContinuumStripePositions);

var _realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid = __webpack_require__(139);

var _realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid2 = _interopRequireDefault(_realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getGinghamChevronContinuumStripePositions = _getGinghamChevronContinuumStripePositions2.default;
exports.realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid = _realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid2.default;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _neededStripeCountToCoverGrid = __webpack_require__(52);

var _neededStripeCountToCoverGrid2 = _interopRequireDefault(_neededStripeCountToCoverGrid);

var _mathUtilities = __webpack_require__(14);

var _src = __webpack_require__(6);

var _getDistanceFromHomeAddress = __webpack_require__(138);

var _getDistanceFromHomeAddress2 = _interopRequireDefault(_getDistanceFromHomeAddress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getGinghamChevronContinuumStripePositions = function getGinghamChevronContinuumStripePositions(_ref) {
	var gridAddress = _ref.gridAddress;
	var _state$mainHoundstoot = _src.state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.stripeCountContinuumSettings,
	    initialStripeCount = _state$mainHoundstoot.initialStripeCount,
	    deltaStripeCount = _state$mainHoundstoot.deltaStripeCount;

	var stripes = [0];
	var distanceFromHomeAddress = (0, _getDistanceFromHomeAddress2.default)({ gridAddress: gridAddress });

	for (var n = 0; n < (0, _neededStripeCountToCoverGrid2.default)(); n++) {
		var stripe = (0, _mathUtilities.termialRoot)({ rangeStart: initialStripeCount, rangeDelta: deltaStripeCount, n: n }) * 2;
		if (stripe >= distanceFromHomeAddress + 2) {
			return stripes;
		}
		if (stripe > distanceFromHomeAddress) {
			stripes.push((stripe - distanceFromHomeAddress) % 2);
		}
	}

	return stripes;
};

exports.default = getGinghamChevronContinuumStripePositions;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var getDistanceFromHomeAddress = function getDistanceFromHomeAddress(_ref) {
	var gridAddress = _ref.gridAddress;

	return gridAddress.reduce(function (a, b) {
		return Math.abs(a) + Math.abs(b);
	}, 0);
};

exports.default = getDistanceFromHomeAddress;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _indexOfFirstGridStripeCrossingThisTile = __webpack_require__(140);

var _indexOfFirstGridStripeCrossingThisTile2 = _interopRequireDefault(_indexOfFirstGridStripeCrossingThisTile);

var _codeUtilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid = function realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid(_ref) {
	var tileColorIndices = _ref.tileColorIndices,
	    gridAddress = _ref.gridAddress;

	var stripeIndex = (0, _indexOfFirstGridStripeCrossingThisTile2.default)({ gridAddress: gridAddress });
	return stripeIndex % 2 === 1 ? (0, _codeUtilities.reversed)(tileColorIndices) : tileColorIndices;
};

exports.default = realignTileColorIndicesToMaintainGinghamChevronContinuumAcrossGrid;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _neededStripeCountToCoverGrid = __webpack_require__(52);

var _neededStripeCountToCoverGrid2 = _interopRequireDefault(_neededStripeCountToCoverGrid);

var _mathUtilities = __webpack_require__(14);

var _src = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexOfFirstGridStripeCrossingThisTile = function indexOfFirstGridStripeCrossingThisTile(_ref) {
	var gridAddress = _ref.gridAddress;
	var _state$mainHoundstoot = _src.state.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings.stripeCountContinuumSettings,
	    initialStripeCount = _state$mainHoundstoot.initialStripeCount,
	    deltaStripeCount = _state$mainHoundstoot.deltaStripeCount;


	for (var stripeIndex = 0; stripeIndex < (0, _neededStripeCountToCoverGrid2.default)(); stripeIndex++) {
		var stripePosition = (0, _mathUtilities.termialRoot)({
			rangeStart: initialStripeCount,
			rangeDelta: deltaStripeCount,
			n: stripeIndex
		}) * 2;
		if (stripePosition > gridAddress[0] + gridAddress[1]) return stripeIndex;
	}
};

exports.default = indexOfFirstGridStripeCrossingThisTile;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gongramEffect = undefined;

var _effects = __webpack_require__(142);

exports.gongramEffect = _effects.gongramEffect;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gongramEffect = undefined;

var _gongramEffect = __webpack_require__(53);

var _gongramEffect2 = _interopRequireDefault(_gongramEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.gongramEffect = _gongramEffect2.default;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.gongramWeave = exports.gongramSupertile = undefined;

var _components = __webpack_require__(144);

exports.gongramSupertile = _components.gongramSupertile;
exports.gongramWeave = _components.gongramWeave;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.gongramWeave = exports.gongramSupertile = undefined;

var _gongramSupertile = __webpack_require__(145);

var _gongramSupertile2 = _interopRequireDefault(_gongramSupertile);

var _gongramWeave = __webpack_require__(146);

var _gongramWeave2 = _interopRequireDefault(_gongramWeave);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.gongramSupertile = _gongramSupertile2.default;
exports.gongramWeave = _gongramWeave2.default;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _codeUtilities = __webpack_require__(1);

var gongramSupertile = function gongramSupertile() {
  return (0, _codeUtilities.iterator)(5).map(function (x) {
    return (0, _codeUtilities.iterator)(5).map(function (y) {
      return [y * 2 % 5, x];
    });
  });
};

exports.default = gongramSupertile;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _codeUtilities = __webpack_require__(1);

var gongramWeave = function gongramWeave() {
	return {
		rows: (0, _codeUtilities.iterator)(5).map(function (y) {
			return y * 2 % 5;
		}),
		columns: (0, _codeUtilities.iterator)(5)
	};
};

exports.default = gongramWeave;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.harmonitoothEffect = undefined;

var _effects = __webpack_require__(148);

exports.harmonitoothEffect = _effects.harmonitoothEffect;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.harmonitoothEffect = undefined;

var _harmonitoothEffect = __webpack_require__(54);

var _harmonitoothEffect2 = _interopRequireDefault(_harmonitoothEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.harmonitoothEffect = _harmonitoothEffect2.default;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHarmonicContinuumStripePositions = undefined;

var _components = __webpack_require__(150);

exports.getHarmonicContinuumStripePositions = _components.getHarmonicContinuumStripePositions;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHarmonicContinuumStripePositions = undefined;

var _getHarmonicContinuumStripePositions = __webpack_require__(151);

var _getHarmonicContinuumStripePositions2 = _interopRequireDefault(_getHarmonicContinuumStripePositions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getHarmonicContinuumStripePositions = _getHarmonicContinuumStripePositions2.default;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mathUtilities = __webpack_require__(14);

var _src = __webpack_require__(6);

var getHarmonicContinuumStripePositions = function getHarmonicContinuumStripePositions() {
  return (0, _src.perStripe)({ getStripePosition: harmonicContinuumStripePosition });
};

var harmonicContinuumStripePosition = function harmonicContinuumStripePosition(_ref) {
  var stripeIndex = _ref.stripeIndex,
      stripeCount = _ref.stripeCount;
  return (0, _mathUtilities.triangularRoot)(stripeIndex) / (0, _mathUtilities.triangularRoot)(stripeCount);
};

exports.default = getHarmonicContinuumStripePositions;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.houndazzleEffect = undefined;

var _effects = __webpack_require__(153);

exports.houndazzleEffect = _effects.houndazzleEffect;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.houndazzleEffect = undefined;

var _houndazzleEffect = __webpack_require__(55);

var _houndazzleEffect2 = _interopRequireDefault(_houndazzleEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.houndazzleEffect = _houndazzleEffect2.default;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.substripeTexture = undefined;

var _textures = __webpack_require__(155);

exports.substripeTexture = _textures.substripeTexture;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.substripeTexture = undefined;

var _substripeTexture = __webpack_require__(156);

var _substripeTexture2 = _interopRequireDefault(_substripeTexture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.substripeTexture = _substripeTexture2.default;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _houndazzleConstants = __webpack_require__(157);

var _codeUtilities = __webpack_require__(1);

var _components = __webpack_require__(158);

exports.default = function (_ref) {
	var context = _ref.context,
	    tileColorIndices = _ref.tileColorIndices,
	    tileOrigin = _ref.tileOrigin,
	    tileSize = _ref.tileSize,
	    shapeColorIndex = _ref.shapeColorIndex;

	var substripeCount = _houndazzleConstants.SUBSTRIPE_COUNT * 2;
	var colorsCount = tileColorIndices.length;

	(0, _codeUtilities.iterator)(substripeCount).forEach(function (substripeIndex) {
		(0, _components.substripe)({
			context: context,
			tileOrigin: tileOrigin,
			tileSize: tileSize,
			shapeColorIndex: shapeColorIndex,
			substripeIndex: substripeIndex,
			substripeCount: substripeCount,
			colorsCount: colorsCount
		});
	});
};

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var SUBSTRIPE_COUNT = 16;

exports.SUBSTRIPE_COUNT = SUBSTRIPE_COUNT;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.substripe = undefined;

var _substripe = __webpack_require__(159);

var _substripe2 = _interopRequireDefault(_substripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.substripe = _substripe2.default;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _space = __webpack_require__(160);

var _src = __webpack_require__(6);

var substripe = function substripe(_ref) {
	var context = _ref.context,
	    tileOrigin = _ref.tileOrigin,
	    tileSize = _ref.tileSize,
	    shapeColorIndex = _ref.shapeColorIndex,
	    substripeIndex = _ref.substripeIndex,
	    substripeCount = _ref.substripeCount,
	    colorsCount = _ref.colorsCount;

	var outline = (0, _space.substripeOutline)({ tileOrigin: tileOrigin, tileSize: tileSize, substripeIndex: substripeIndex, substripeCount: substripeCount });
	outline = (0, _space.orientSubstripeOutline)({ colorsCount: colorsCount, shapeColorIndex: shapeColorIndex, outline: outline, tileOrigin: tileOrigin, tileSize: tileSize });
	(0, _src.solid)({ context: context, outline: outline, shapeColorIndex: substripeIndex });
};

exports.default = substripe;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.substripeOutline = exports.orientSubstripeOutline = undefined;

var _orientSubstripeOutline = __webpack_require__(161);

var _orientSubstripeOutline2 = _interopRequireDefault(_orientSubstripeOutline);

var _substripeOutline = __webpack_require__(162);

var _substripeOutline2 = _interopRequireDefault(_substripeOutline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.orientSubstripeOutline = _orientSubstripeOutline2.default;
exports.substripeOutline = _substripeOutline2.default;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _src = __webpack_require__(6);

var orientSubstripeOutline = function orientSubstripeOutline(_ref) {
	var colorsCount = _ref.colorsCount,
	    shapeColorIndex = _ref.shapeColorIndex,
	    outline = _ref.outline,
	    tileOrigin = _ref.tileOrigin,
	    tileSize = _ref.tileSize;

	var rotationUnit = Math.PI / colorsCount;
	var rotation = rotationUnit * shapeColorIndex;

	return outline.map(function (coordinate) {
		return (0, _src.rotateCoordinateAboutPoint)({
			coordinate: coordinate,
			point: (0, _src.tileCenter)({ tileOrigin: tileOrigin, tileSize: tileSize }),
			rotation: rotation
		});
	});
};

exports.default = orientSubstripeOutline;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var substripeOutline = function substripeOutline(_ref) {
	var tileOrigin = _ref.tileOrigin,
	    tileSize = _ref.tileSize,
	    substripeIndex = _ref.substripeIndex,
	    substripeCount = _ref.substripeCount;

	var substripeWidth = tileSize * 2 / substripeCount;
	var substripeSlack = tileSize / 2;

	var x = tileOrigin[0];
	var y = tileOrigin[1];

	return [[x - substripeSlack, y - substripeSlack + substripeIndex * substripeWidth], [x + tileSize + substripeSlack, y - substripeSlack + substripeIndex * substripeWidth], [x + tileSize + substripeSlack, y - substripeSlack + (substripeIndex + 1) * substripeWidth], [x - substripeSlack, y - substripeSlack + (substripeIndex + 1) * substripeWidth]];
};

exports.default = substripeOutline;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.houndsmorphosisEffect = undefined;

var _effects = __webpack_require__(164);

exports.houndsmorphosisEffect = _effects.houndsmorphosisEffect;

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.houndsmorphosisEffect = undefined;

var _houndsmorphosisEffect = __webpack_require__(56);

var _houndsmorphosisEffect2 = _interopRequireDefault(_houndsmorphosisEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.houndsmorphosisEffect = _houndsmorphosisEffect2.default;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getHoundsmorphosisAddressOffset = exports.getHoundsmorphosisTileOriginAndSize = undefined;

var _components = __webpack_require__(166);

exports.getHoundsmorphosisTileOriginAndSize = _components.getHoundsmorphosisTileOriginAndSize;
exports.getHoundsmorphosisAddressOffset = _components.getHoundsmorphosisAddressOffset;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getHoundsmorphosisTileOriginAndSize = exports.getHoundsmorphosisAddressOffset = undefined;

var _getHoundsmorphosisAddressOffset = __webpack_require__(167);

var _getHoundsmorphosisAddressOffset2 = _interopRequireDefault(_getHoundsmorphosisAddressOffset);

var _getHoundsmorphosisTileOriginAndSize = __webpack_require__(168);

var _getHoundsmorphosisTileOriginAndSize2 = _interopRequireDefault(_getHoundsmorphosisTileOriginAndSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getHoundsmorphosisAddressOffset = _getHoundsmorphosisAddressOffset2.default;
exports.getHoundsmorphosisTileOriginAndSize = _getHoundsmorphosisTileOriginAndSize2.default;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var getHoundsmorphosisAddressOffset = function getHoundsmorphosisAddressOffset(_ref) {
	var gridAddress = _ref.gridAddress;

	var xOffset = 0;
	var yOffset = 0;

	if (gridAddress[0] < 0) {
		yOffset += 1;
		xOffset += 1;
	}

	if (gridAddress[1] < 0) {
		xOffset += 1;
	}

	return [xOffset, yOffset];
};

exports.default = getHoundsmorphosisAddressOffset;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mathUtilities = __webpack_require__(14);

var getHoundsmorphosisTileOriginAndSize = function getHoundsmorphosisTileOriginAndSize(_ref) {
	var gridAddress = _ref.gridAddress;

	if (gridAddress[0] === 0 || gridAddress[1] === 0) return { tileOrigin: null, tileSize: null };

	var addressX = Math.abs(gridAddress[0]);
	var addressY = Math.abs(gridAddress[1]);

	var baseSize = Math.floor(addressY / 2);

	var tileSize = houndsmorphosisTileSize({ baseSize: baseSize, addressX: addressX, addressY: addressY });
	var tileOrigin = houndsmorphosisTileOrigin({ baseSize: baseSize, addressX: addressX, addressY: addressY, tileSize: tileSize, gridAddress: gridAddress });

	return { tileOrigin: tileOrigin, tileSize: tileSize };
};

var houndsmorphosisTileSize = function houndsmorphosisTileSize(_ref2) {
	var baseSize = _ref2.baseSize,
	    addressX = _ref2.addressX,
	    addressY = _ref2.addressY;

	return addressY % 2 !== 0 ? addressX + baseSize : baseSize;
};

var houndsmorphosisTileOrigin = function houndsmorphosisTileOrigin(_ref3) {
	var tileSize = _ref3.tileSize,
	    gridAddress = _ref3.gridAddress,
	    baseSize = _ref3.baseSize,
	    addressX = _ref3.addressX,
	    addressY = _ref3.addressY;

	var x = (0, _mathUtilities.trapezoidalNumber)({ start: baseSize, height: addressX - 1 });
	var y = (0, _mathUtilities.quarterSquareNumber)(addressY) + (addressX - 1) * baseSize;

	if (gridAddress[0] < 0) {
		x *= -1;
		x -= tileSize;
	}
	if (gridAddress[1] < 0) {
		y *= -1;
		y -= tileSize;
	}
	return [x, y];
};

exports.default = getHoundsmorphosisTileOriginAndSize;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _noop = __webpack_require__(170);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildMockContext = function buildMockContext() {
	var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    _ref$contextCallsOrde = _ref.contextCallsOrder,
	    contextCallsOrder = _ref$contextCallsOrde === undefined ? [] : _ref$contextCallsOrde,
	    toBlobSpy = _ref.toBlobSpy;

	return {
		beginPath: function beginPath() {
			return contextCallsOrder.push({ method: 'beginPath' });
		},
		moveTo: function moveTo(x, y) {
			return contextCallsOrder.push({ method: 'moveTo', x: x, y: y });
		},
		lineTo: function lineTo(x, y) {
			return contextCallsOrder.push({ method: 'lineTo', x: x, y: y });
		},
		closePath: function closePath() {
			return contextCallsOrder.push({ method: 'closePath' });
		},
		fill: function fill() {
			return contextCallsOrder.push({ method: 'fill' });
		},
		clip: function clip() {
			return contextCallsOrder.push({ method: 'clip' });
		},
		save: function save() {
			return contextCallsOrder.push({ method: 'save' });
		},
		restore: function restore() {
			return contextCallsOrder.push({ method: 'restore' });
		},
		clearRect: function clearRect() {
			return contextCallsOrder.push({ method: 'clearRect' });
		},
		canvas: { toBlob: toBlobSpy },
		drawImage: _noop2.default
	};
};

exports.default = buildMockContext;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var noop = function noop() {
  return null;
};

exports.default = noop;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./cmyktooth/test/integration/effects/cmyktoothEffectTest.js": 172,
	"./gingham-chevron-continuum/test/integration/effects/ginghamChevronContinuumEffectTest.js": 173,
	"./gongram/test/integration/effects/gongramEffectTest.js": 174,
	"./harmonitooth/test/integration/effects/harmonitoothEffectTest.js": 175,
	"./houndazzle/test/integration/effects/houndazzleEffectTest.js": 176,
	"./houndsmorphosis/test/integration/effects/houndsmorphosisEffectTest.js": 177
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 171;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cmyktoothEffect = __webpack_require__(50);

var _cmyktoothEffect2 = _interopRequireDefault(_cmyktoothEffect);

var _tileSectorCenterIsColor = __webpack_require__(10);

var _tileSectorCenterIsColor2 = _interopRequireDefault(_tileSectorCenterIsColor);

var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _constants = __webpack_require__(3);

var _codeUtilities = __webpack_require__(1);

var _thisFrameOnly = __webpack_require__(26);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('cmyktooth effect', function () {
	it('the absolute center is always blank', function () {
		_state2.default.selectedHoundstoothEffects = [_cmyktoothEffect2.default];
		var houndstoothOverrides = { basePattern: { layerSettings: (0, _thisFrameOnly.thisLayerOnly)(32) } };

		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		var color = _constants.TRANSPARENT;
		var tileSizeInPixels = 800;
		var originInPixels = [0, 0];
		var x = 0;
		var y = 0;
		var n = 1;
		var id = 0;
		expect((0, _tileSectorCenterIsColor2.default)({ originInPixels: originInPixels, tileSizeInPixels: tileSizeInPixels, x: x, y: y, n: n, color: color, id: id }));
	});

	it('layer 0 is totally blank', function () {
		_state2.default.selectedHoundstoothEffects = [_cmyktoothEffect2.default];
		var houndstoothOverrides = { basePattern: { layerSettings: (0, _thisFrameOnly.thisLayerOnly)(0) } };
		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		var basicallyCheckWholeCanvasPoints = (0, _codeUtilities.iterator)(8).map(function (x) {
			return (0, _codeUtilities.iterator)(8).map(function (y) {
				return [x * 100, y * 100];
			});
		}).reduce(function (a, b) {
			return a.concat(b);
		});

		var color = _constants.TRANSPARENT;
		var tileSizeInPixels = 100;
		var x = 0;
		var y = 0;
		var n = 1;
		basicallyCheckWholeCanvasPoints.forEach(function (originInPixels, id) {
			(0, _tileSectorCenterIsColor2.default)({ originInPixels: originInPixels, tileSizeInPixels: tileSizeInPixels, x: x, y: y, n: n, color: color, id: id });
		});
	});

	it('layer 1 is black, grain going to the right', function () {
		_state2.default.selectedHoundstoothEffects = [_cmyktoothEffect2.default];
		var houndstoothOverrides = { basePattern: { layerSettings: (0, _thisFrameOnly.thisLayerOnly)(1) } };
		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		var SEMI_BLACK = { r: 0, g: 0, b: 0, a: 0.5 };
		var tileSizeInPixels = 800 / 4;

		solid({ address: [0, 0], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 0 });
		solid({ address: [1, 0], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 2 });
		principal({ address: [2, 0], tileSizeInPixels: tileSizeInPixels, colors: [SEMI_BLACK, _constants.TRANSPARENT], baseId: 4 });
		solid({ address: [3, 0], tileSizeInPixels: tileSizeInPixels, color: SEMI_BLACK, baseId: 6 });

		minor({ address: [0, 1], tileSizeInPixels: tileSizeInPixels, colors: [SEMI_BLACK, _constants.TRANSPARENT], baseId: 8 });
		solid({ address: [1, 1], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 10 });
		solid({ address: [2, 1], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 12 });
		solid({ address: [3, 1], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 14 });

		principal({ address: [0, 2], tileSizeInPixels: tileSizeInPixels, colors: [_constants.TRANSPARENT, SEMI_BLACK], baseId: 16 });
		solid({ address: [1, 2], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 18 });
		solid({ address: [2, 2], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 20 });
		solid({ address: [3, 2], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 22 });

		solid({ address: [0, 3], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 24 });
		solid({ address: [1, 3], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 26 });
		minor({ address: [2, 3], tileSizeInPixels: tileSizeInPixels, colors: [_constants.TRANSPARENT, SEMI_BLACK], baseId: 28 });
		solid({ address: [3, 3], tileSizeInPixels: tileSizeInPixels, color: SEMI_BLACK, baseId: 30 });
	});

	it('layer 2 is cyan, grain going to the right bottom', function () {
		_state2.default.selectedHoundstoothEffects = [_cmyktoothEffect2.default];
		var houndstoothOverrides = { basePattern: { layerSettings: (0, _thisFrameOnly.thisLayerOnly)(2) } };
		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		var SEMI_CYAN = { r: 0, g: 255, b: 255, a: 0.3333 };
		var tileSizeInPixels = 800 / 4;

		solid({ address: [0, 0], tileSizeInPixels: tileSizeInPixels, color: SEMI_CYAN, baseId: 0 });
		principal({ address: [1, 0], tileSizeInPixels: tileSizeInPixels, colors: [_constants.TRANSPARENT, SEMI_CYAN], baseId: 2 });
		principal({ address: [2, 0], tileSizeInPixels: tileSizeInPixels, colors: [SEMI_CYAN, _constants.TRANSPARENT], baseId: 4 });
		solid({ address: [3, 0], tileSizeInPixels: tileSizeInPixels, color: SEMI_CYAN, baseId: 6 });

		principal({ address: [0, 1], tileSizeInPixels: tileSizeInPixels, colors: [SEMI_CYAN, _constants.TRANSPARENT], baseId: 8 });
		solid({ address: [1, 1], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 10 });
		solid({ address: [2, 1], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 12 });
		principal({ address: [3, 1], tileSizeInPixels: tileSizeInPixels, colors: [_constants.TRANSPARENT, SEMI_CYAN], baseId: 14 });

		principal({ address: [0, 2], tileSizeInPixels: tileSizeInPixels, colors: [_constants.TRANSPARENT, SEMI_CYAN], baseId: 16 });
		solid({ address: [1, 2], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 18 });
		solid({ address: [2, 2], tileSizeInPixels: tileSizeInPixels, color: _constants.TRANSPARENT, baseId: 20 });
		principal({ address: [3, 2], tileSizeInPixels: tileSizeInPixels, colors: [SEMI_CYAN, _constants.TRANSPARENT], baseId: 22 });

		solid({ address: [0, 3], tileSizeInPixels: tileSizeInPixels, color: SEMI_CYAN, baseId: 24 });
		principal({ address: [1, 3], tileSizeInPixels: tileSizeInPixels, colors: [SEMI_CYAN, _constants.TRANSPARENT], baseId: 26 });
		principal({ address: [2, 3], tileSizeInPixels: tileSizeInPixels, colors: [_constants.TRANSPARENT, SEMI_CYAN], baseId: 28 });
		solid({ address: [3, 3], tileSizeInPixels: tileSizeInPixels, color: SEMI_CYAN, baseId: 30 });
	});

	it('layer 3 is magenta, grain going to the bottom', function () {
		_state2.default.selectedHoundstoothEffects = [_cmyktoothEffect2.default];
		var houndstoothOverrides = { basePattern: { layerSettings: (0, _thisFrameOnly.thisLayerOnly)(3) } };
		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		var SEMI_MAGENTA = { r: 255, g: 0, b: 255, a: 0.25 };
		var tileSizeInPixels = 800 / 8;

		var expectedSectorRows = [[['solid', 'trans'], ['minor', 'trans'], ['princ', 'color'], ['solid', 'color'], ['solid', 'color'], ['minor', 'color'], ['princ', 'trans'], ['solid', 'trans']], [['solid', 'trans'], ['solid', 'color'], ['solid', 'trans'], ['sldls', 'color'], ['solid', 'color'], ['solid', 'trans'], ['solid', 'color'], ['solid', 'trans']], [['princ', 'trans'], ['solid', 'color'], ['solid', 'trans'], ['minor', 'color'], ['princ', 'color'], ['solid', 'trans'], ['solid', 'color'], ['minor', 'trans']], [['solid', 'color'], ['sldls', 'color'], ['solid', 'trans'], ['solid', 'trans'], ['solid', 'trans'], ['solid', 'trans'], ['solid', 'color'], ['solid', 'color']], [['solid', 'color'], ['minor', 'color'], ['princ', 'trans'], ['solid', 'trans'], ['solid', 'trans'], ['minor', 'trans'], ['princ', 'color'], ['solid', 'color']], [['solid', 'color'], ['solid', 'trans'], ['solid', 'color'], ['solid', 'trans'], ['solid', 'trans'], ['solid', 'color'], ['solid', 'trans'], ['sldls', 'color']], [['princ', 'color'], ['solid', 'trans'], ['solid', 'color'], ['minor', 'trans'], ['princ', 'trans'], ['solid', 'color'], ['solid', 'trans'], ['minor', 'color']], [['solid', 'trans'], ['solid', 'trans'], ['solid', 'color'], ['solid', 'color'], ['solid', 'color'], ['sldls', 'color'], ['solid', 'trans'], ['solid', 'trans']]];

		expectedSectorRows.forEach(function (expectedSectorRow, row) {
			expectedSectorRow.forEach(function (expectedSector, col) {
				expectSector({ expectedSector: expectedSector, address: [col, row], tileSizeInPixels: tileSizeInPixels, solidColor: SEMI_MAGENTA });
			});
		});
	});

	it('layer 4 is yellow, grain going to the bottom left', function () {
		_state2.default.selectedHoundstoothEffects = [_cmyktoothEffect2.default];
		var houndstoothOverrides = { basePattern: { layerSettings: (0, _thisFrameOnly.thisLayerOnly)(4) } };
		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		var SEMI_YELLOW = { r: 255, g: 255, b: 0, a: 0.2 };
		var tileSizeInPixels = 800 / 8;

		var expectedSectorRows = [[['solid', 'trans'], ['minor', 'trans'], ['minor', 'color'], ['solid', 'trans'], ['solid', 'trans'], ['minor', 'trans'], ['minor', 'color'], ['solid', 'trans']], [['minor', 'color'], ['solid', 'color'], ['solid', 'color'], ['minor', 'trans'], ['minor', 'color'], ['solid', 'color'], ['solid', 'color'], ['minor', 'trans']], [['minor', 'trans'], ['solid', 'color'], ['solid', 'color'], ['minor', 'color'], ['minor', 'trans'], ['solid', 'color'], ['solid', 'color'], ['minor', 'color']], [['solid', 'trans'], ['minor', 'color'], ['minor', 'trans'], ['solid', 'trans'], ['solid', 'trans'], ['minor', 'color'], ['minor', 'trans'], ['solid', 'trans']]];

		expectedSectorRows.concat(expectedSectorRows).forEach(function (expectedSectorRow, row) {
			expectedSectorRow.forEach(function (expectedSector, col) {
				expectSector({ expectedSector: expectedSector, address: [col, row], tileSizeInPixels: tileSizeInPixels, solidColor: SEMI_YELLOW });
			});
		});
	});
});

var principal = function principal(_ref) {
	var address = _ref.address,
	    tileSizeInPixels = _ref.tileSizeInPixels,
	    colors = _ref.colors,
	    baseId = _ref.baseId;

	var originInPixels = [address[0] * tileSizeInPixels, address[1] * tileSizeInPixels];
	expect((0, _tileSectorCenterIsColor2.default)({
		originInPixels: originInPixels,
		tileSizeInPixels: tileSizeInPixels,
		n: 2,
		x: 1,
		y: 0,
		color: colors[0],
		id: baseId
	})).toBe(true);
	expect((0, _tileSectorCenterIsColor2.default)({
		originInPixels: originInPixels,
		tileSizeInPixels: tileSizeInPixels,
		n: 2,
		x: 0,
		y: 1,
		color: colors[1],
		id: baseId + 1
	})).toBe(true);
};

var minor = function minor(_ref2) {
	var address = _ref2.address,
	    tileSizeInPixels = _ref2.tileSizeInPixels,
	    colors = _ref2.colors,
	    baseId = _ref2.baseId;

	var originInPixels = [address[0] * tileSizeInPixels, address[1] * tileSizeInPixels];
	expect((0, _tileSectorCenterIsColor2.default)({
		originInPixels: originInPixels,
		tileSizeInPixels: tileSizeInPixels,
		n: 2,
		x: 0,
		y: 0,
		color: colors[0],
		id: baseId
	})).toBe(true);
	expect((0, _tileSectorCenterIsColor2.default)({
		originInPixels: originInPixels,
		tileSizeInPixels: tileSizeInPixels,
		n: 2,
		x: 1,
		y: 1,
		color: colors[1],
		id: baseId + 1
	})).toBe(true);
};

var solid = function solid(_ref3) {
	var address = _ref3.address,
	    tileSizeInPixels = _ref3.tileSizeInPixels,
	    color = _ref3.color,
	    baseId = _ref3.baseId;

	var originInPixels = [address[0] * tileSizeInPixels, address[1] * tileSizeInPixels];
	expect((0, _tileSectorCenterIsColor2.default)({
		originInPixels: originInPixels,
		tileSizeInPixels: tileSizeInPixels,
		n: 1,
		x: 0,
		y: 0,
		color: color,
		id: baseId
	})).toBe(true);
};

var expectSector = function expectSector(_ref4) {
	var expectedSector = _ref4.expectedSector,
	    address = _ref4.address,
	    tileSizeInPixels = _ref4.tileSizeInPixels,
	    solidColor = _ref4.solidColor;

	var method = void 0,
	    color = void 0,
	    colors = void 0;
	if (expectedSector[0] === 'solid') {
		if (expectedSector[1] === 'trans') color = _constants.TRANSPARENT;
		if (expectedSector[1] === 'color') color = solidColor;

		solid({ address: address, tileSizeInPixels: tileSizeInPixels, color: color });
	} else if (expectedSector[0] === 'sldls') {
		principal({ address: address, tileSizeInPixels: tileSizeInPixels, colors: [solidColor, solidColor] });
	} else {
		if (expectedSector[0] === 'minor') method = minor;
		if (expectedSector[0] === 'princ') method = principal;

		if (expectedSector[1] === 'trans') colors = [_constants.TRANSPARENT, solidColor];
		if (expectedSector[1] === 'color') colors = [solidColor, _constants.TRANSPARENT];

		method({ address: address, tileSizeInPixels: tileSizeInPixels, colors: colors });
	}
};

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _tileSectorCenterIsColor = __webpack_require__(10);

var _tileSectorCenterIsColor2 = _interopRequireDefault(_tileSectorCenterIsColor);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _constants = __webpack_require__(3);

var _ginghamChevronContinuumEffect = __webpack_require__(51);

var _ginghamChevronContinuumEffect2 = _interopRequireDefault(_ginghamChevronContinuumEffect);

var _getFromBasePatternOrDefault = __webpack_require__(12);

var _getFromBasePatternOrDefault2 = _interopRequireDefault(_getFromBasePatternOrDefault);

var _settingsPaths = __webpack_require__(11);

var _thisFrameOnly = __webpack_require__(26);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _codeUtilities = __webpack_require__(1);

var _index = __webpack_require__(16);

var animation = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('gingham chevron continuum effect', function () {
	it('each new diagonal row has an extra stripe', function () {
		var tileSizeInPixels = (0, _getFromBasePatternOrDefault2.default)(_settingsPaths.TILE_SIZE);
		_state2.default.selectedHoundstoothEffects = [_ginghamChevronContinuumEffect2.default];
		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: { basePattern: { gridSettings: { gridSize: 8 } } } });

		expect((0, _tileSectorCenterIsColor2.default)({
			id: 1,
			originInPixels: [0 * tileSizeInPixels, 0 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			x: 0,
			y: 0,
			n: 1,
			color: _constants.BLACK
		})).toBe(true);

		expect((0, _tileSectorCenterIsColor2.default)({
			id: 1,
			originInPixels: [1 * tileSizeInPixels, 1 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			x: 0,
			y: 0,
			n: 2,
			color: _constants.BLACK
		})).toBe(true);
		expect((0, _tileSectorCenterIsColor2.default)({
			id: 1,
			originInPixels: [1 * tileSizeInPixels, 1 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			x: 1,
			y: 1,
			n: 2,
			color: _constants.TRANSPARENT
		})).toBe(true);

		expect((0, _tileSectorCenterIsColor2.default)({
			id: 1,
			originInPixels: [2 * tileSizeInPixels, 2 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			x: 0,
			y: 0,
			n: 3,
			color: _constants.TRANSPARENT
		})).toBe(true);
		expect((0, _tileSectorCenterIsColor2.default)({
			id: 1,
			originInPixels: [2 * tileSizeInPixels, 2 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			x: 1,
			y: 1,
			n: 3,
			color: _constants.BLACK
		})).toBe(true);
		expect((0, _tileSectorCenterIsColor2.default)({
			id: 1,
			originInPixels: [2 * tileSizeInPixels, 2 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			x: 2,
			y: 2,
			n: 3,
			color: _constants.TRANSPARENT
		})).toBe(true);

		expect((0, _tileSectorCenterIsColor2.default)({
			id: 1,
			originInPixels: [3 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			x: 0,
			y: 0,
			n: 4,
			color: _constants.TRANSPARENT
		})).toBe(true);
		expect((0, _tileSectorCenterIsColor2.default)({
			id: 1,
			originInPixels: [3 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			x: 1,
			y: 1,
			n: 4,
			color: _constants.BLACK
		})).toBe(true);
		expect((0, _tileSectorCenterIsColor2.default)({
			id: 1,
			originInPixels: [3 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			x: 2,
			y: 2,
			n: 4,
			color: _constants.TRANSPARENT
		})).toBe(true);
		expect((0, _tileSectorCenterIsColor2.default)({
			id: 1,
			originInPixels: [3 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			x: 3,
			y: 3,
			n: 4,
			color: _constants.BLACK
		})).toBe(true);
	});

	describe('animating', function () {
		var ginghamChevronContinuumAnimationTestHoundstoothOverrides = {
			basePattern: {
				gridSettings: { gridSize: 4 },
				viewSettings: { canvasSize: 200 },
				tileSettings: { tileSizeSetting: 50 }
			}
		};

		beforeEach(function () {
			spyOn(animation, 'animator').and.callFake(function (_ref) {
				var animationFunction = _ref.animationFunction,
				    stopConditionFunction = _ref.stopConditionFunction;

				while (!stopConditionFunction()) {
					animationFunction();
				}
			});
		});

		it('frame 0 looks just like the normal pattern', function () {
			var houndstoothOverrides = (0, _codeUtilities.deepClone)(ginghamChevronContinuumAnimationTestHoundstoothOverrides);
			houndstoothOverrides.basePattern.animationSettings = (0, _thisFrameOnly.thisAnimationFrameOnly)(0);
			_state2.default.selectedHoundstoothEffects = [_ginghamChevronContinuumEffect2.default];
			(0, _activateTestMarkerCanvas2.default)();
			_state2.default.animating = true;

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			expectStripedTile({ coordinate: 0, stripeCount: 1, firstColor: _constants.BLACK });
			expectStripedTile({ coordinate: 1, stripeCount: 2, firstColor: _constants.BLACK });
			expectStripedTile({ coordinate: 2, stripeCount: 3, firstColor: _constants.TRANSPARENT });
			expectStripedTile({ coordinate: 3, stripeCount: 4, firstColor: _constants.TRANSPARENT });
		});

		it('around frame 525 each tile has twice its original stripe count', function () {
			var houndstoothOverrides = (0, _codeUtilities.deepClone)(ginghamChevronContinuumAnimationTestHoundstoothOverrides);
			houndstoothOverrides.basePattern.animationSettings = (0, _thisFrameOnly.thisAnimationFrameOnly)(525);
			_state2.default.selectedHoundstoothEffects = [_ginghamChevronContinuumEffect2.default];
			(0, _activateTestMarkerCanvas2.default)();
			_state2.default.animating = true;

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			expectStripedTile({ coordinate: 0, stripeCount: 2, firstColor: _constants.BLACK });
			expectStripedTile({ coordinate: 1, stripeCount: 4, firstColor: _constants.TRANSPARENT });
			expectStripedTile({ coordinate: 2, stripeCount: 6, firstColor: _constants.BLACK });
			expectStripedTile({ coordinate: 3, stripeCount: 8, firstColor: _constants.TRANSPARENT });
		});

		it('around frame 666 each tile has thrice its original stripe count', function () {
			var houndstoothOverrides = (0, _codeUtilities.deepClone)(ginghamChevronContinuumAnimationTestHoundstoothOverrides);
			houndstoothOverrides.basePattern.animationSettings = (0, _thisFrameOnly.thisAnimationFrameOnly)(666);
			_state2.default.selectedHoundstoothEffects = [_ginghamChevronContinuumEffect2.default];
			(0, _activateTestMarkerCanvas2.default)();
			_state2.default.animating = true;

			(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

			expectStripedTile({ coordinate: 0, stripeCount: 3, firstColor: _constants.BLACK });
			expectStripedTile({ coordinate: 1, stripeCount: 6, firstColor: _constants.BLACK });
			expectStripedTile({ coordinate: 2, stripeCount: 9, firstColor: _constants.TRANSPARENT });
			expectStripedTile({ coordinate: 3, stripeCount: 12, firstColor: _constants.TRANSPARENT });
		});
	});
});

var expectStripedTile = function expectStripedTile(_ref2) {
	var coordinate = _ref2.coordinate,
	    stripeCount = _ref2.stripeCount,
	    firstColor = _ref2.firstColor;

	var tileSizeInPixels = (0, _getFromBasePatternOrDefault2.default)(_settingsPaths.TILE_SIZE);
	(0, _codeUtilities.iterator)(stripeCount).forEach(function (stripe) {
		expect((0, _tileSectorCenterIsColor2.default)({
			id: 1,
			originInPixels: [coordinate * tileSizeInPixels, coordinate * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			x: stripe,
			y: stripe,
			n: stripeCount,
			color: stripe % 2 === 0 ? firstColor : firstColor === _constants.BLACK ? _constants.TRANSPARENT : _constants.BLACK
		})).toBe(true);
	});
};

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _standardTileIsColors = __webpack_require__(8);

var _standardTileIsColors2 = _interopRequireDefault(_standardTileIsColors);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _constants = __webpack_require__(3);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _gongramEffect = __webpack_require__(53);

var _gongramEffect2 = _interopRequireDefault(_gongramEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('gongram coloration', function () {
	it('arranges the 5 MTG colors by rows in the cycle of allies, and by columns in the cycle of enemies', function () {
		var tileSizeInPixels = 50;
		var sufficientGridSizeToDemonstratePattern = 10;
		_state2.default.selectedHoundstoothEffects = [_gongramEffect2.default];
		var houndstoothOverrides = {
			basePattern: {
				tileSettings: {
					tileSizeSetting: tileSizeInPixels
				},
				viewSettings: {
					canvasSize: sufficientGridSizeToDemonstratePattern * tileSizeInPixels
				},
				gridSettings: {
					gridSize: sufficientGridSizeToDemonstratePattern
				}
			}
		};
		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		var rowOneTiles = [{
			baseId: 0,
			originInPixels: [0 * tileSizeInPixels, 0 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.BLACK]
		}, {
			baseId: 0,
			originInPixels: [1 * tileSizeInPixels, 0 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.BLUE]
		}, {
			baseId: 0,
			originInPixels: [2 * tileSizeInPixels, 0 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.WHITE]
		}, {
			baseId: 0,
			originInPixels: [3 * tileSizeInPixels, 0 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.GREEN]
		}, {
			baseId: 0,
			originInPixels: [4 * tileSizeInPixels, 0 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLACK, _constants.RED]
		}];
		var rowTwoTiles = [{
			baseId: 0,
			originInPixels: [0 * tileSizeInPixels, 1 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.WHITE, _constants.BLACK]
		}, {
			baseId: 0,
			originInPixels: [1 * tileSizeInPixels, 1 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.WHITE, _constants.BLUE]
		}, {
			baseId: 0,
			originInPixels: [2 * tileSizeInPixels, 1 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.WHITE, _constants.WHITE]
		}, {
			baseId: 0,
			originInPixels: [3 * tileSizeInPixels, 1 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.WHITE, _constants.GREEN]
		}, {
			baseId: 0,
			originInPixels: [4 * tileSizeInPixels, 1 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.WHITE, _constants.RED]
		}];
		var rowThreeTiles = [{
			baseId: 0,
			originInPixels: [0 * tileSizeInPixels, 2 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.RED, _constants.BLACK]
		}, {
			baseId: 0,
			originInPixels: [1 * tileSizeInPixels, 2 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.RED, _constants.BLUE]
		}, {
			baseId: 0,
			originInPixels: [2 * tileSizeInPixels, 2 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.RED, _constants.WHITE]
		}, {
			baseId: 0,
			originInPixels: [3 * tileSizeInPixels, 2 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.RED, _constants.GREEN]
		}, {
			baseId: 0,
			originInPixels: [4 * tileSizeInPixels, 2 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.RED, _constants.RED]
		}];
		var rowFourTiles = [{
			baseId: 0,
			originInPixels: [0 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLUE, _constants.BLACK]
		}, {
			baseId: 0,
			originInPixels: [1 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLUE, _constants.BLUE]
		}, {
			baseId: 0,
			originInPixels: [2 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLUE, _constants.WHITE]
		}, {
			baseId: 0,
			originInPixels: [3 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLUE, _constants.GREEN]
		}, {
			baseId: 0,
			originInPixels: [4 * tileSizeInPixels, 3 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.BLUE, _constants.RED]
		}];
		var rowFiveTiles = [{
			baseId: 0,
			originInPixels: [0 * tileSizeInPixels, 4 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.GREEN, _constants.BLACK]
		}, {
			baseId: 0,
			originInPixels: [1 * tileSizeInPixels, 4 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.GREEN, _constants.BLUE]
		}, {
			baseId: 0,
			originInPixels: [2 * tileSizeInPixels, 4 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.GREEN, _constants.WHITE]
		}, {
			baseId: 0,
			originInPixels: [3 * tileSizeInPixels, 4 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.GREEN, _constants.GREEN]
		}, {
			baseId: 0,
			originInPixels: [4 * tileSizeInPixels, 4 * tileSizeInPixels],
			tileSizeInPixels: tileSizeInPixels,
			colors: [_constants.GREEN, _constants.RED]
		}];
		var tiles = rowOneTiles.concat(rowTwoTiles).concat(rowThreeTiles).concat(rowFourTiles).concat(rowFiveTiles);

		tiles.forEach(function (tile) {
			return expect((0, _standardTileIsColors2.default)(tile)).toBe(true);
		});
	});
});

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _harmonitoothEffect = __webpack_require__(54);

var _harmonitoothEffect2 = _interopRequireDefault(_harmonitoothEffect);

var _pixelIsColorWithMarker = __webpack_require__(25);

var _pixelIsColorWithMarker2 = _interopRequireDefault(_pixelIsColorWithMarker);

var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _constants = __webpack_require__(3);

var _codeUtilities = __webpack_require__(1);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

var _thisFrameOnly = __webpack_require__(26);

var _index = __webpack_require__(16);

var animation = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('harmonitooth effect', function () {
	var harmonitoothTestHoundstoothOverrides = {
		basePattern: {
			gridSettings: { gridSize: 2 },
			viewSettings: { canvasSize: 100 },
			tileSettings: { tileSizeSetting: 50 }
		}
	};

	beforeEach(function () {
		spyOn(animation, 'animator').and.callFake(function (_ref) {
			var animationFunction = _ref.animationFunction,
			    stopConditionFunction = _ref.stopConditionFunction;

			while (!stopConditionFunction()) {
				animationFunction();
			}
		});
	});

	it('at frame 0, the striped squares have only a single stripe, so are solid', function () {
		var houndstoothOverrides = (0, _codeUtilities.deepClone)(harmonitoothTestHoundstoothOverrides);
		houndstoothOverrides.basePattern.animationSettings = (0, _thisFrameOnly.thisAnimationFrameOnly)(0);
		_state2.default.selectedHoundstoothEffects = [_harmonitoothEffect2.default];
		(0, _activateTestMarkerCanvas2.default)();
		_state2.default.animating = true;

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		expectWholeTile({ color: _constants.TRANSPARENT, address: [0, 0] });
		expectWholeTile({ color: _constants.TRANSPARENT, address: [1, 0] });
		expectWholeTile({ color: _constants.BLACK, address: [0, 1] });
		expectWholeTile({ color: _constants.BLACK, address: [1, 1] });
	});

	it('around frame 500, it has two harmonically proportioned stripes', function () {
		var houndstoothOverrides = (0, _codeUtilities.deepClone)(harmonitoothTestHoundstoothOverrides);
		houndstoothOverrides.basePattern.animationSettings = (0, _thisFrameOnly.thisAnimationFrameOnly)(500);
		_state2.default.selectedHoundstoothEffects = [_harmonitoothEffect2.default];
		(0, _activateTestMarkerCanvas2.default)();
		_state2.default.animating = true;

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		expectHarmonicStripedTile({ stripeCount: 2, color: _constants.TRANSPARENT, address: 0 });
		expectHarmonicStripedTile({ stripeCount: 2, color: _constants.BLACK, address: 1 });
		expectWholeTile({ color: _constants.BLACK, address: [0, 1] });
		expectWholeTile({ color: _constants.TRANSPARENT, address: [1, 0] });
	});

	it('around frame 650, it has three harmonically proportioned stripes', function () {
		var houndstoothOverrides = (0, _codeUtilities.deepClone)(harmonitoothTestHoundstoothOverrides);
		houndstoothOverrides.basePattern.animationSettings = (0, _thisFrameOnly.thisAnimationFrameOnly)(650);
		_state2.default.selectedHoundstoothEffects = [_harmonitoothEffect2.default];
		(0, _activateTestMarkerCanvas2.default)();
		_state2.default.animating = true;

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		expectHarmonicStripedTile({ stripeCount: 3, color: _constants.TRANSPARENT, address: 0 });
		expectHarmonicStripedTile({ stripeCount: 3, color: _constants.BLACK, address: 1 });
		expectWholeTile({ color: _constants.BLACK, address: [0, 1] });
		expectWholeTile({ color: _constants.TRANSPARENT, address: [1, 0] });
	});

	it('around frame 750, it has four harmonically proportioned stripes', function () {
		var houndstoothOverrides = (0, _codeUtilities.deepClone)(harmonitoothTestHoundstoothOverrides);
		houndstoothOverrides.basePattern.animationSettings = (0, _thisFrameOnly.thisAnimationFrameOnly)(750);
		_state2.default.selectedHoundstoothEffects = [_harmonitoothEffect2.default];
		(0, _activateTestMarkerCanvas2.default)();
		_state2.default.animating = true;

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		expectHarmonicStripedTile({ stripeCount: 4, color: _constants.TRANSPARENT, address: 0 });
		expectHarmonicStripedTile({ stripeCount: 4, color: _constants.BLACK, address: 1 });
		expectWholeTile({ color: _constants.BLACK, address: [0, 1] });
		expectWholeTile({ color: _constants.TRANSPARENT, address: [1, 0] });
	});

	it('around frame 800, it has two harmonically proportioned stripes', function () {
		var houndstoothOverrides = (0, _codeUtilities.deepClone)(harmonitoothTestHoundstoothOverrides);
		houndstoothOverrides.basePattern.animationSettings = (0, _thisFrameOnly.thisAnimationFrameOnly)(800);
		_state2.default.selectedHoundstoothEffects = [_harmonitoothEffect2.default];
		(0, _activateTestMarkerCanvas2.default)();
		_state2.default.animating = true;

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		expectHarmonicStripedTile({ stripeCount: 5, color: _constants.TRANSPARENT, address: 0 });
		expectHarmonicStripedTile({ stripeCount: 5, color: _constants.BLACK, address: 1 });
		expectWholeTile({ color: _constants.BLACK, address: [0, 1] });
		expectWholeTile({ color: _constants.TRANSPARENT, address: [1, 0] });
	});
});

var expectHarmonicStripedTile = function expectHarmonicStripedTile(_ref2) {
	var stripeCount = _ref2.stripeCount,
	    color = _ref2.color,
	    address = _ref2.address;

	(0, _codeUtilities.iterator)(stripeCount, { oneIndexed: true }).forEach(function (stripe) {
		var expectedColor = stripe % 2 === 1 ? color : color === _constants.BLACK ? _constants.TRANSPARENT : _constants.BLACK;
		var coordinateUnderTest = harmonicStripeCenter({ index: stripe, total: stripeCount, address: address });
		expect((0, _pixelIsColorWithMarker2.default)({ coordinateUnderTest: coordinateUnderTest, expectedColor: expectedColor, id: stripe })).toBe(true);
	});
};

var harmonicStripeCenter = function harmonicStripeCenter(_ref3) {
	var index = _ref3.index,
	    total = _ref3.total,
	    address = _ref3.address;

	var fullProportions = (0, _codeUtilities.iterator)(total).reduce(function (sum, val) {
		return sum + 1 / (val + 2);
	}, 0);
	var thisProportion = (0, _codeUtilities.iterator)(index).reduce(function (sum, val) {
		return sum + 1 / (val + 2);
	}, 0);
	var adjustForHalf = 1 / ((index + 2) * 2);
	var coordinate = (thisProportion - adjustForHalf) / fullProportions;
	var coordinateScaledAndTransposed = (address + coordinate) * 50;
	return [coordinateScaledAndTransposed, coordinateScaledAndTransposed];
};

var expectWholeTile = function expectWholeTile(_ref4) {
	var expectedColor = _ref4.color,
	    address = _ref4.address;

	(0, _codeUtilities.iterator)(12).forEach(function (check) {
		var coordinateUnderTest = [50 * (address[0] + check / 12), 50 * (address[1] + check / 12)];
		expect((0, _pixelIsColorWithMarker2.default)({ coordinateUnderTest: coordinateUnderTest, expectedColor: expectedColor, id: check })).toBe(true);
	});
};

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _tileSectorCenterIsColor = __webpack_require__(10);

var _tileSectorCenterIsColor2 = _interopRequireDefault(_tileSectorCenterIsColor);

var _constants = __webpack_require__(3);

var _houndazzleEffect = __webpack_require__(55);

var _houndazzleEffect2 = _interopRequireDefault(_houndazzleEffect);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('houndazzle effect', function () {
	it('portrays houndstooth using horizontal against vertical striped textures, rather than simply black against white', function () {
		_state2.default.selectedHoundstoothEffects = [_houndazzleEffect2.default];
		var tileSizeInPixels = 200;
		var houndstoothOverrides = {
			basePattern: {
				tileSettings: {
					tileSizeSetting: tileSizeInPixels
				},
				gridSettings: {
					gridSize: 4
				},
				viewSettings: {
					canvasSize: 800
				}
			}
		};
		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		var partA = [[['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['xxxxx', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['xxxxx', 'black']], [['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['xxxxx', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['xxxxx', 'white'], ['solid', 'black']], [['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['xxxxx', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['xxxxx', 'black'], ['solid', 'white'], ['solid', 'black']], [['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['xxxxx', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['xxxxx', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black']], [['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['xxxxx', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['xxxxx', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black']], [['solid', 'white'], ['solid', 'black'], ['xxxxx', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['xxxxx', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black']], [['solid', 'white'], ['xxxxx', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['xxxxx', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black']], [['xxxxx', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['xxxxx', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black']]];
		var partB = [[['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['xxxxx', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['xxxxx', 'black']], [['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['xxxxx', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['xxxxx', 'white'], ['solid', 'white']], [['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['xxxxx', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['xxxxx', 'black'], ['solid', 'black'], ['solid', 'black']], [['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['xxxxx', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['xxxxx', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white']], [['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['xxxxx', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['xxxxx', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black']], [['solid', 'white'], ['solid', 'white'], ['xxxxx', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['xxxxx', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white']], [['solid', 'black'], ['xxxxx', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['xxxxx', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black']], [['xxxxx', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['xxxxx', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white']]];
		var topLeftTile = partA.concat(partB);

		var alteratingRow = [['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black'], ['solid', 'white'], ['solid', 'black']];
		var topRightTile = [alteratingRow, alteratingRow, alteratingRow, alteratingRow, alteratingRow, alteratingRow, alteratingRow, alteratingRow, alteratingRow, alteratingRow, alteratingRow, alteratingRow, alteratingRow, alteratingRow, alteratingRow, alteratingRow];

		var blackRow = [['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black'], ['solid', 'black']];
		var whiteRow = [['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white'], ['solid', 'white']];
		var bottomLeftTile = [blackRow, whiteRow, blackRow, whiteRow, blackRow, whiteRow, blackRow, whiteRow, blackRow, whiteRow, blackRow, whiteRow, blackRow, whiteRow, blackRow, whiteRow];

		var bottomRightTile = partB.concat(partA);

		topLeftTile.forEach(function (expectedSectorRows, row) {
			expectedSectorRows.forEach(function (expectedSector, col) {
				expectSector({ expectedSector: expectedSector, address: [col, row], origin: [0, 0], tileSizeInPixels: tileSizeInPixels });
			});
		});

		topRightTile.forEach(function (expectedSectorRows, row) {
			expectedSectorRows.forEach(function (expectedSector, col) {
				expectSector({ expectedSector: expectedSector, address: [col, row], origin: [1, 0], tileSizeInPixels: tileSizeInPixels });
			});
		});

		bottomLeftTile.forEach(function (expectedSectorRows, row) {
			expectedSectorRows.forEach(function (expectedSector, col) {
				expectSector({ expectedSector: expectedSector, address: [col, row], origin: [0, 1], tileSizeInPixels: tileSizeInPixels });
			});
		});

		bottomRightTile.forEach(function (expectedSectorRows, row) {
			expectedSectorRows.forEach(function (expectedSector, col) {
				expectSector({ expectedSector: expectedSector, address: [col, row], origin: [1, 1], tileSizeInPixels: tileSizeInPixels });
			});
		});
	});
});

var expectSector = function expectSector(_ref) {
	var expectedSector = _ref.expectedSector,
	    address = _ref.address,
	    origin = _ref.origin,
	    tileSizeInPixels = _ref.tileSizeInPixels;

	var sectorType = expectedSector[0];
	var sectorDefiningColor = expectedSector[1] === 'black' ? _constants.BLACK : _constants.TRANSPARENT;

	if (sectorType === 'solid') {
		solid({ origin: origin, address: address, tileSizeInPixels: tileSizeInPixels, color: sectorDefiningColor });
	} else if (sectorType === 'xxxxx') {
		minor({ origin: origin, address: address, tileSizeInPixels: tileSizeInPixels, colors: [sectorDefiningColor, sectorDefiningColor] });
	} else if (sectorType === 'minor') {
		var otherColor = sectorDefiningColor === 'black' ? _constants.TRANSPARENT : _constants.BLACK;
		minor({ origin: origin, address: address, tileSizeInPixels: tileSizeInPixels, colors: [sectorDefiningColor, otherColor] });
	}
};

var solid = function solid(_ref2) {
	var origin = _ref2.origin,
	    address = _ref2.address,
	    tileSizeInPixels = _ref2.tileSizeInPixels,
	    color = _ref2.color;

	var originInPixels = calculateOriginInPixels({ origin: origin, address: address, tileSizeInPixels: tileSizeInPixels });
	expect((0, _tileSectorCenterIsColor2.default)({
		originInPixels: originInPixels,
		tileSizeInPixels: tileSizeInPixels / 16,
		n: 1,
		x: 0,
		y: 0,
		color: color
	})).toBe(true);
};

var minor = function minor(_ref3) {
	var origin = _ref3.origin,
	    address = _ref3.address,
	    tileSizeInPixels = _ref3.tileSizeInPixels,
	    colors = _ref3.colors;

	var originInPixels = calculateOriginInPixels({ origin: origin, address: address, tileSizeInPixels: tileSizeInPixels });
	expect((0, _tileSectorCenterIsColor2.default)({
		originInPixels: originInPixels,
		tileSizeInPixels: tileSizeInPixels / 16,
		n: 2,
		x: 0,
		y: 0,
		color: colors[0]
	})).toBe(true);
	expect((0, _tileSectorCenterIsColor2.default)({
		originInPixels: originInPixels,
		tileSizeInPixels: tileSizeInPixels / 16,
		n: 2,
		x: 1,
		y: 1,
		color: colors[1]
	})).toBe(true);
};

var calculateOriginInPixels = function calculateOriginInPixels(_ref4) {
	var origin = _ref4.origin,
	    address = _ref4.address,
	    tileSizeInPixels = _ref4.tileSizeInPixels;
	return [origin[0] * tileSizeInPixels + address[0] * tileSizeInPixels / 16, origin[1] * tileSizeInPixels + address[1] * tileSizeInPixels / 16];
};

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _executeSelectedHoundstoothEffects = __webpack_require__(4);

var _executeSelectedHoundstoothEffects2 = _interopRequireDefault(_executeSelectedHoundstoothEffects);

var _standardTileIsColors = __webpack_require__(8);

var _standardTileIsColors2 = _interopRequireDefault(_standardTileIsColors);

var _constants = __webpack_require__(3);

var _houndsmorphosisEffect = __webpack_require__(56);

var _houndsmorphosisEffect2 = _interopRequireDefault(_houndsmorphosisEffect);

var _activateTestMarkerCanvas = __webpack_require__(5);

var _activateTestMarkerCanvas2 = _interopRequireDefault(_activateTestMarkerCanvas);

var _state = __webpack_require__(0);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('houndsmorphosis', function () {
	it('lays out the tiles in alternating growing rows and steady rows', function () {
		_state2.default.selectedHoundstoothEffects = [_houndsmorphosisEffect2.default];
		var houndstoothOverrides = {
			basePattern: {
				gridSettings: {
					gridSize: 6
				},
				viewSettings: {
					zoom: 10,
					canvasSize: 400
				}
			}
		};
		(0, _activateTestMarkerCanvas2.default)();

		(0, _executeSelectedHoundstoothEffects2.default)({ houndstoothOverrides: houndstoothOverrides });

		var negativeXnegativeYquadrantFirstRowTiles = [{ baseId: 0, originInPixels: [190, 190], tileSizeInPixels: 10, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 8, originInPixels: [170, 180], tileSizeInPixels: 20, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 16, originInPixels: [140, 170], tileSizeInPixels: 30, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 24, originInPixels: [100, 160], tileSizeInPixels: 40, colors: [_constants.BLACK, _constants.BLACK] }];
		var negativeXnegativeYquadrantSecondRowTiles = [{ baseId: 32, originInPixels: [190, 180], tileSizeInPixels: 10, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 40, originInPixels: [170, 170], tileSizeInPixels: 10, colors: [_constants.BLACK, _constants.TRANSPARENT] }, { baseId: 48, originInPixels: [140, 160], tileSizeInPixels: 10, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 56, originInPixels: [100, 150], tileSizeInPixels: 10, colors: [_constants.BLACK, _constants.TRANSPARENT] }];
		var negativeXnegativeYquadrantThirdRowTiles = [{ baseId: 64, originInPixels: [180, 160], tileSizeInPixels: 20, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 72, originInPixels: [150, 140], tileSizeInPixels: 30, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 80, originInPixels: [110, 120], tileSizeInPixels: 40, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 88, originInPixels: [60, 100], tileSizeInPixels: 50, colors: [_constants.BLACK, _constants.BLACK] }];
		var negativeXnegativeYquadrantFourthRowTiles = [{ baseId: 96, originInPixels: [180, 140], tileSizeInPixels: 20, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 104, originInPixels: [150, 120], tileSizeInPixels: 20, colors: [_constants.BLACK, _constants.TRANSPARENT] }, { baseId: 112, originInPixels: [110, 100], tileSizeInPixels: 20, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 120, originInPixels: [60, 80], tileSizeInPixels: 20, colors: [_constants.BLACK, _constants.TRANSPARENT] }];

		var positiveXnegativeYquadrantFirstRowTiles = [{ baseId: 128, originInPixels: [200, 190], tileSizeInPixels: 10, colors: [_constants.BLACK, _constants.TRANSPARENT] }, { baseId: 136, originInPixels: [210, 180], tileSizeInPixels: 20, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 144, originInPixels: [230, 170], tileSizeInPixels: 30, colors: [_constants.BLACK, _constants.TRANSPARENT] }, { baseId: 152, originInPixels: [260, 160], tileSizeInPixels: 40, colors: [_constants.TRANSPARENT, _constants.BLACK] }];
		var positiveXnegativeYquadrantSecondRowTiles = [{ baseId: 160, originInPixels: [200, 180], tileSizeInPixels: 10, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 168, originInPixels: [220, 170], tileSizeInPixels: 10, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 176, originInPixels: [250, 160], tileSizeInPixels: 10, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 184, originInPixels: [290, 150], tileSizeInPixels: 10, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }];
		var positiveXnegativeYquadrantThirdRowTiles = [{ baseId: 192, originInPixels: [200, 160], tileSizeInPixels: 20, colors: [_constants.BLACK, _constants.TRANSPARENT] }, { baseId: 200, originInPixels: [220, 140], tileSizeInPixels: 30, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 208, originInPixels: [250, 120], tileSizeInPixels: 40, colors: [_constants.BLACK, _constants.TRANSPARENT] }, { baseId: 216, originInPixels: [290, 100], tileSizeInPixels: 50, colors: [_constants.TRANSPARENT, _constants.BLACK] }];
		var positiveXnegativeYquadrantFourthRowTiles = [{ baseId: 224, originInPixels: [200, 140], tileSizeInPixels: 20, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 232, originInPixels: [230, 120], tileSizeInPixels: 20, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 240, originInPixels: [270, 100], tileSizeInPixels: 20, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 248, originInPixels: [320, 80], tileSizeInPixels: 20, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }];

		var negativeXpositiveYquadrantFirstRowTiles = [{ baseId: 256, originInPixels: [190, 200], tileSizeInPixels: 10, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 264, originInPixels: [170, 200], tileSizeInPixels: 20, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 272, originInPixels: [140, 200], tileSizeInPixels: 30, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 280, originInPixels: [100, 200], tileSizeInPixels: 40, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }];
		var negativeXpositiveYquadrantSecondRowTiles = [{ baseId: 288, originInPixels: [190, 210], tileSizeInPixels: 10, colors: [_constants.BLACK, _constants.TRANSPARENT] }, { baseId: 296, originInPixels: [170, 220], tileSizeInPixels: 10, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 304, originInPixels: [140, 230], tileSizeInPixels: 10, colors: [_constants.BLACK, _constants.TRANSPARENT] }, { baseId: 312, originInPixels: [100, 240], tileSizeInPixels: 10, colors: [_constants.TRANSPARENT, _constants.BLACK] }];
		var negativeXpositiveYquadrantThirdRowTiles = [{ baseId: 320, originInPixels: [180, 220], tileSizeInPixels: 20, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 328, originInPixels: [150, 230], tileSizeInPixels: 30, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 336, originInPixels: [110, 240], tileSizeInPixels: 40, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 344, originInPixels: [60, 250], tileSizeInPixels: 50, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }];
		var negativeXpositiveYquadrantFourthRowTiles = [{ baseId: 352, originInPixels: [180, 240], tileSizeInPixels: 20, colors: [_constants.BLACK, _constants.TRANSPARENT] }, { baseId: 360, originInPixels: [150, 260], tileSizeInPixels: 20, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 368, originInPixels: [110, 280], tileSizeInPixels: 20, colors: [_constants.BLACK, _constants.TRANSPARENT] }, { baseId: 376, originInPixels: [60, 300], tileSizeInPixels: 20, colors: [_constants.TRANSPARENT, _constants.BLACK] }];

		var positiveXpositiveYquadrantFirstRowTiles = [{ baseId: 384, originInPixels: [200, 200], tileSizeInPixels: 10, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 392, originInPixels: [210, 200], tileSizeInPixels: 20, colors: [_constants.BLACK, _constants.TRANSPARENT] }, { baseId: 400, originInPixels: [230, 200], tileSizeInPixels: 30, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 408, originInPixels: [260, 200], tileSizeInPixels: 40, colors: [_constants.BLACK, _constants.TRANSPARENT] }];
		var positiveXpositiveYquadrantSecondRowTiles = [{ baseId: 416, originInPixels: [200, 210], tileSizeInPixels: 10, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 424, originInPixels: [220, 220], tileSizeInPixels: 10, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 432, originInPixels: [250, 230], tileSizeInPixels: 10, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 440, originInPixels: [290, 240], tileSizeInPixels: 10, colors: [_constants.BLACK, _constants.BLACK] }];
		var positiveXpositiveYquadrantThirdRowTiles = [{ baseId: 448, originInPixels: [200, 220], tileSizeInPixels: 20, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 456, originInPixels: [220, 230], tileSizeInPixels: 30, colors: [_constants.BLACK, _constants.TRANSPARENT] }, { baseId: 464, originInPixels: [250, 240], tileSizeInPixels: 40, colors: [_constants.TRANSPARENT, _constants.BLACK] }, { baseId: 472, originInPixels: [290, 250], tileSizeInPixels: 50, colors: [_constants.BLACK, _constants.TRANSPARENT] }];
		var positiveXpositiveYquadrantFourthRowTiles = [{ baseId: 480, originInPixels: [200, 240], tileSizeInPixels: 20, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 488, originInPixels: [230, 260], tileSizeInPixels: 20, colors: [_constants.BLACK, _constants.BLACK] }, { baseId: 496, originInPixels: [270, 280], tileSizeInPixels: 20, colors: [_constants.TRANSPARENT, _constants.TRANSPARENT] }, { baseId: 504, originInPixels: [320, 300], tileSizeInPixels: 20, colors: [_constants.BLACK, _constants.BLACK] }];

		var negativeXnegativeYquadrantTiles = negativeXnegativeYquadrantFirstRowTiles.concat(negativeXnegativeYquadrantSecondRowTiles).concat(negativeXnegativeYquadrantThirdRowTiles).concat(negativeXnegativeYquadrantFourthRowTiles);

		var positiveXnegativeYquadrantTiles = positiveXnegativeYquadrantFirstRowTiles.concat(positiveXnegativeYquadrantSecondRowTiles).concat(positiveXnegativeYquadrantThirdRowTiles).concat(positiveXnegativeYquadrantFourthRowTiles);

		var negativeXpositiveYquadrantTiles = negativeXpositiveYquadrantFirstRowTiles.concat(negativeXpositiveYquadrantSecondRowTiles).concat(negativeXpositiveYquadrantThirdRowTiles).concat(negativeXpositiveYquadrantFourthRowTiles);

		var positiveXpositiveYquadrantTiles = positiveXpositiveYquadrantFirstRowTiles.concat(positiveXpositiveYquadrantSecondRowTiles).concat(positiveXpositiveYquadrantThirdRowTiles).concat(positiveXpositiveYquadrantFourthRowTiles);

		var tiles = negativeXnegativeYquadrantTiles.concat(positiveXnegativeYquadrantTiles).concat(negativeXpositiveYquadrantTiles).concat(positiveXpositiveYquadrantTiles);

		tiles.forEach(function (tile) {
			return expect((0, _standardTileIsColors2.default)(tile)).toBe(true);
		});
	});
});

/***/ })
/******/ ]);