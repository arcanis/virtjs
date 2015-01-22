module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(2);
	module.exports = function(path) {
	  return __webpack_require__(1)("./" + path + '.js');
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./arch/gb/Engine.js": 12,
		"./arch/gb/Environment.js": 13,
		"./arch/gb/Interpreter.js": 14,
		"./arch/gb/compilation/Helpers.js": 17,
		"./arch/gb/compilation/InterpreterHelpers.js": 18,
		"./arch/gb/compilation/instructions.js": 19,
		"./arch/gb/compilation/templates/assembly.js": 20,
		"./arch/gb/compilation/templates/javascript.js": 21,
		"./arch/gb/components/GPU.js": 22,
		"./arch/gb/components/KeyIO.js": 23,
		"./arch/gb/components/MMU.js": 24,
		"./arch/gb/constants.js": 15,
		"./arch/gb/mbcs/MBC1.js": 25,
		"./arch/gb/mbcs/MBC3.js": 26,
		"./arch/gb/mbcs/MBC5.js": 27,
		"./arch/gb/mbcs/NoMBC.js": 28,
		"./arch/gb/tools.js": 16,
		"./arch/gba/Engine.js": 29,
		"./arch/gba/Environment.js": 30,
		"./arch/gba/Interpreter.js": 31,
		"./arch/gba/components/GPU.js": 32,
		"./arch/gba/components/MMU.js": 33,
		"./core/Engine.js": 4,
		"./devices/inputs/ButtonInput.js": 34,
		"./devices/inputs/KeyboardInput.js": 35,
		"./devices/inputs/MixedInput.js": 36,
		"./devices/inputs/NullInput.js": 37,
		"./devices/screens/DataScreen.js": 38,
		"./devices/screens/NullScreen.js": 39,
		"./devices/screens/WebGLScreen.js": 40,
		"./devices/timers/AnimationFrameTimer.js": 41,
		"./devices/timers/ImmediateTimer.js": 42,
		"./devices/timers/NullTimer.js": 43,
		"./devices/timers/SerialTimer.js": 44,
		"./index.js": 3,
		"./mixins/EmitterMixin.js": 5,
		"./mixins/RunnableMixin.js": 6,
		"./utils/DataUtils.js": 7,
		"./utils/FormatUtils.js": 8,
		"./utils/MemoryUtils.js": 9,
		"./utils/ObjectUtils.js": 10,
		"./utils/TypeUtils.js": 11
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function(global) {
	  'use strict';
	  if (global.$traceurRuntime) {
	    return;
	  }
	  var $Object = Object;
	  var $TypeError = TypeError;
	  var $create = $Object.create;
	  var $defineProperties = $Object.defineProperties;
	  var $defineProperty = $Object.defineProperty;
	  var $freeze = $Object.freeze;
	  var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
	  var $getOwnPropertyNames = $Object.getOwnPropertyNames;
	  var $keys = $Object.keys;
	  var $hasOwnProperty = $Object.prototype.hasOwnProperty;
	  var $toString = $Object.prototype.toString;
	  var $preventExtensions = Object.preventExtensions;
	  var $seal = Object.seal;
	  var $isExtensible = Object.isExtensible;
	  function nonEnum(value) {
	    return {
	      configurable: true,
	      enumerable: false,
	      value: value,
	      writable: true
	    };
	  }
	  var types = {
	    void: function voidType() {},
	    any: function any() {},
	    string: function string() {},
	    number: function number() {},
	    boolean: function boolean() {}
	  };
	  var method = nonEnum;
	  var counter = 0;
	  function newUniqueString() {
	    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
	  }
	  var symbolInternalProperty = newUniqueString();
	  var symbolDescriptionProperty = newUniqueString();
	  var symbolDataProperty = newUniqueString();
	  var symbolValues = $create(null);
	  var privateNames = $create(null);
	  function createPrivateName() {
	    var s = newUniqueString();
	    privateNames[s] = true;
	    return s;
	  }
	  function isSymbol(symbol) {
	    return typeof symbol === 'object' && symbol instanceof SymbolValue;
	  }
	  function typeOf(v) {
	    if (isSymbol(v))
	      return 'symbol';
	    return typeof v;
	  }
	  function Symbol(description) {
	    var value = new SymbolValue(description);
	    if (!(this instanceof Symbol))
	      return value;
	    throw new TypeError('Symbol cannot be new\'ed');
	  }
	  $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
	  $defineProperty(Symbol.prototype, 'toString', method(function() {
	    var symbolValue = this[symbolDataProperty];
	    if (!getOption('symbols'))
	      return symbolValue[symbolInternalProperty];
	    if (!symbolValue)
	      throw TypeError('Conversion from symbol to string');
	    var desc = symbolValue[symbolDescriptionProperty];
	    if (desc === undefined)
	      desc = '';
	    return 'Symbol(' + desc + ')';
	  }));
	  $defineProperty(Symbol.prototype, 'valueOf', method(function() {
	    var symbolValue = this[symbolDataProperty];
	    if (!symbolValue)
	      throw TypeError('Conversion from symbol to string');
	    if (!getOption('symbols'))
	      return symbolValue[symbolInternalProperty];
	    return symbolValue;
	  }));
	  function SymbolValue(description) {
	    var key = newUniqueString();
	    $defineProperty(this, symbolDataProperty, {value: this});
	    $defineProperty(this, symbolInternalProperty, {value: key});
	    $defineProperty(this, symbolDescriptionProperty, {value: description});
	    freeze(this);
	    symbolValues[key] = this;
	  }
	  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
	  $defineProperty(SymbolValue.prototype, 'toString', {
	    value: Symbol.prototype.toString,
	    enumerable: false
	  });
	  $defineProperty(SymbolValue.prototype, 'valueOf', {
	    value: Symbol.prototype.valueOf,
	    enumerable: false
	  });
	  var hashProperty = createPrivateName();
	  var hashPropertyDescriptor = {value: undefined};
	  var hashObjectProperties = {
	    hash: {value: undefined},
	    self: {value: undefined}
	  };
	  var hashCounter = 0;
	  function getOwnHashObject(object) {
	    var hashObject = object[hashProperty];
	    if (hashObject && hashObject.self === object)
	      return hashObject;
	    if ($isExtensible(object)) {
	      hashObjectProperties.hash.value = hashCounter++;
	      hashObjectProperties.self.value = object;
	      hashPropertyDescriptor.value = $create(null, hashObjectProperties);
	      $defineProperty(object, hashProperty, hashPropertyDescriptor);
	      return hashPropertyDescriptor.value;
	    }
	    return undefined;
	  }
	  function freeze(object) {
	    getOwnHashObject(object);
	    return $freeze.apply(this, arguments);
	  }
	  function preventExtensions(object) {
	    getOwnHashObject(object);
	    return $preventExtensions.apply(this, arguments);
	  }
	  function seal(object) {
	    getOwnHashObject(object);
	    return $seal.apply(this, arguments);
	  }
	  Symbol.iterator = Symbol();
	  freeze(SymbolValue.prototype);
	  function toProperty(name) {
	    if (isSymbol(name))
	      return name[symbolInternalProperty];
	    return name;
	  }
	  function getOwnPropertyNames(object) {
	    var rv = [];
	    var names = $getOwnPropertyNames(object);
	    for (var i = 0; i < names.length; i++) {
	      var name = names[i];
	      if (!symbolValues[name] && !privateNames[name])
	        rv.push(name);
	    }
	    return rv;
	  }
	  function getOwnPropertyDescriptor(object, name) {
	    return $getOwnPropertyDescriptor(object, toProperty(name));
	  }
	  function getOwnPropertySymbols(object) {
	    var rv = [];
	    var names = $getOwnPropertyNames(object);
	    for (var i = 0; i < names.length; i++) {
	      var symbol = symbolValues[names[i]];
	      if (symbol)
	        rv.push(symbol);
	    }
	    return rv;
	  }
	  function hasOwnProperty(name) {
	    return $hasOwnProperty.call(this, toProperty(name));
	  }
	  function getOption(name) {
	    return global.traceur && global.traceur.options[name];
	  }
	  function setProperty(object, name, value) {
	    var sym,
	        desc;
	    if (isSymbol(name)) {
	      sym = name;
	      name = name[symbolInternalProperty];
	    }
	    object[name] = value;
	    if (sym && (desc = $getOwnPropertyDescriptor(object, name)))
	      $defineProperty(object, name, {enumerable: false});
	    return value;
	  }
	  function defineProperty(object, name, descriptor) {
	    if (isSymbol(name)) {
	      if (descriptor.enumerable) {
	        descriptor = $create(descriptor, {enumerable: {value: false}});
	      }
	      name = name[symbolInternalProperty];
	    }
	    $defineProperty(object, name, descriptor);
	    return object;
	  }
	  function polyfillObject(Object) {
	    $defineProperty(Object, 'defineProperty', {value: defineProperty});
	    $defineProperty(Object, 'getOwnPropertyNames', {value: getOwnPropertyNames});
	    $defineProperty(Object, 'getOwnPropertyDescriptor', {value: getOwnPropertyDescriptor});
	    $defineProperty(Object.prototype, 'hasOwnProperty', {value: hasOwnProperty});
	    $defineProperty(Object, 'freeze', {value: freeze});
	    $defineProperty(Object, 'preventExtensions', {value: preventExtensions});
	    $defineProperty(Object, 'seal', {value: seal});
	    Object.getOwnPropertySymbols = getOwnPropertySymbols;
	  }
	  function exportStar(object) {
	    for (var i = 1; i < arguments.length; i++) {
	      var names = $getOwnPropertyNames(arguments[i]);
	      for (var j = 0; j < names.length; j++) {
	        var name = names[j];
	        if (privateNames[name])
	          continue;
	        (function(mod, name) {
	          $defineProperty(object, name, {
	            get: function() {
	              return mod[name];
	            },
	            enumerable: true
	          });
	        })(arguments[i], names[j]);
	      }
	    }
	    return object;
	  }
	  function isObject(x) {
	    return x != null && (typeof x === 'object' || typeof x === 'function');
	  }
	  function toObject(x) {
	    if (x == null)
	      throw $TypeError();
	    return $Object(x);
	  }
	  function checkObjectCoercible(argument) {
	    if (argument == null) {
	      throw new TypeError('Value cannot be converted to an Object');
	    }
	    return argument;
	  }
	  function setupGlobals(global) {
	    global.Symbol = Symbol;
	    global.Reflect = global.Reflect || {};
	    global.Reflect.global = global.Reflect.global || global;
	    polyfillObject(global.Object);
	  }
	  setupGlobals(global);
	  global.$traceurRuntime = {
	    createPrivateName: createPrivateName,
	    exportStar: exportStar,
	    getOwnHashObject: getOwnHashObject,
	    privateNames: privateNames,
	    setProperty: setProperty,
	    setupGlobals: setupGlobals,
	    toObject: toObject,
	    isObject: isObject,
	    toProperty: toProperty,
	    type: types,
	    typeof: typeOf,
	    checkObjectCoercible: checkObjectCoercible,
	    hasOwnProperty: function(o, p) {
	      return hasOwnProperty.call(o, p);
	    },
	    defineProperties: $defineProperties,
	    defineProperty: $defineProperty,
	    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	    getOwnPropertyNames: $getOwnPropertyNames,
	    keys: $keys
	  };
	})(typeof global !== 'undefined' ? global : this);
	(function() {
	  'use strict';
	  function spread() {
	    var rv = [],
	        j = 0,
	        iterResult;
	    for (var i = 0; i < arguments.length; i++) {
	      var valueToSpread = $traceurRuntime.checkObjectCoercible(arguments[i]);
	      if (typeof valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)] !== 'function') {
	        throw new TypeError('Cannot spread non-iterable object.');
	      }
	      var iter = valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)]();
	      while (!(iterResult = iter.next()).done) {
	        rv[j++] = iterResult.value;
	      }
	    }
	    return rv;
	  }
	  $traceurRuntime.spread = spread;
	})();
	(function() {
	  'use strict';
	  var $Object = Object;
	  var $TypeError = TypeError;
	  var $create = $Object.create;
	  var $defineProperties = $traceurRuntime.defineProperties;
	  var $defineProperty = $traceurRuntime.defineProperty;
	  var $getOwnPropertyDescriptor = $traceurRuntime.getOwnPropertyDescriptor;
	  var $getOwnPropertyNames = $traceurRuntime.getOwnPropertyNames;
	  var $getPrototypeOf = Object.getPrototypeOf;
	  function superDescriptor(homeObject, name) {
	    var proto = $getPrototypeOf(homeObject);
	    do {
	      var result = $getOwnPropertyDescriptor(proto, name);
	      if (result)
	        return result;
	      proto = $getPrototypeOf(proto);
	    } while (proto);
	    return undefined;
	  }
	  function superCall(self, homeObject, name, args) {
	    return superGet(self, homeObject, name).apply(self, args);
	  }
	  function superGet(self, homeObject, name) {
	    var descriptor = superDescriptor(homeObject, name);
	    if (descriptor) {
	      if (!descriptor.get)
	        return descriptor.value;
	      return descriptor.get.call(self);
	    }
	    return undefined;
	  }
	  function superSet(self, homeObject, name, value) {
	    var descriptor = superDescriptor(homeObject, name);
	    if (descriptor && descriptor.set) {
	      descriptor.set.call(self, value);
	      return value;
	    }
	    throw $TypeError("super has no setter '" + name + "'.");
	  }
	  function getDescriptors(object) {
	    var descriptors = {},
	        name,
	        names = $getOwnPropertyNames(object);
	    for (var i = 0; i < names.length; i++) {
	      var name = names[i];
	      descriptors[name] = $getOwnPropertyDescriptor(object, name);
	    }
	    return descriptors;
	  }
	  function createClass(ctor, object, staticObject, superClass) {
	    $defineProperty(object, 'constructor', {
	      value: ctor,
	      configurable: true,
	      enumerable: false,
	      writable: true
	    });
	    if (arguments.length > 3) {
	      if (typeof superClass === 'function')
	        ctor.__proto__ = superClass;
	      ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
	    } else {
	      ctor.prototype = object;
	    }
	    $defineProperty(ctor, 'prototype', {
	      configurable: false,
	      writable: false
	    });
	    return $defineProperties(ctor, getDescriptors(staticObject));
	  }
	  function getProtoParent(superClass) {
	    if (typeof superClass === 'function') {
	      var prototype = superClass.prototype;
	      if ($Object(prototype) === prototype || prototype === null)
	        return superClass.prototype;
	      throw new $TypeError('super prototype must be an Object or null');
	    }
	    if (superClass === null)
	      return null;
	    throw new $TypeError(("Super expression must either be null or a function, not " + typeof superClass + "."));
	  }
	  function defaultSuperCall(self, homeObject, args) {
	    if ($getPrototypeOf(homeObject) !== null)
	      superCall(self, homeObject, 'constructor', args);
	  }
	  $traceurRuntime.createClass = createClass;
	  $traceurRuntime.defaultSuperCall = defaultSuperCall;
	  $traceurRuntime.superCall = superCall;
	  $traceurRuntime.superGet = superGet;
	  $traceurRuntime.superSet = superSet;
	})();
	(function() {
	  'use strict';
	  var createPrivateName = $traceurRuntime.createPrivateName;
	  var $defineProperties = $traceurRuntime.defineProperties;
	  var $defineProperty = $traceurRuntime.defineProperty;
	  var $create = Object.create;
	  var $TypeError = TypeError;
	  function nonEnum(value) {
	    return {
	      configurable: true,
	      enumerable: false,
	      value: value,
	      writable: true
	    };
	  }
	  var ST_NEWBORN = 0;
	  var ST_EXECUTING = 1;
	  var ST_SUSPENDED = 2;
	  var ST_CLOSED = 3;
	  var END_STATE = -2;
	  var RETHROW_STATE = -3;
	  function getInternalError(state) {
	    return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
	  }
	  function GeneratorContext() {
	    this.state = 0;
	    this.GState = ST_NEWBORN;
	    this.storedException = undefined;
	    this.finallyFallThrough = undefined;
	    this.sent_ = undefined;
	    this.returnValue = undefined;
	    this.tryStack_ = [];
	  }
	  GeneratorContext.prototype = {
	    pushTry: function(catchState, finallyState) {
	      if (finallyState !== null) {
	        var finallyFallThrough = null;
	        for (var i = this.tryStack_.length - 1; i >= 0; i--) {
	          if (this.tryStack_[i].catch !== undefined) {
	            finallyFallThrough = this.tryStack_[i].catch;
	            break;
	          }
	        }
	        if (finallyFallThrough === null)
	          finallyFallThrough = RETHROW_STATE;
	        this.tryStack_.push({
	          finally: finallyState,
	          finallyFallThrough: finallyFallThrough
	        });
	      }
	      if (catchState !== null) {
	        this.tryStack_.push({catch: catchState});
	      }
	    },
	    popTry: function() {
	      this.tryStack_.pop();
	    },
	    get sent() {
	      this.maybeThrow();
	      return this.sent_;
	    },
	    set sent(v) {
	      this.sent_ = v;
	    },
	    get sentIgnoreThrow() {
	      return this.sent_;
	    },
	    maybeThrow: function() {
	      if (this.action === 'throw') {
	        this.action = 'next';
	        throw this.sent_;
	      }
	    },
	    end: function() {
	      switch (this.state) {
	        case END_STATE:
	          return this;
	        case RETHROW_STATE:
	          throw this.storedException;
	        default:
	          throw getInternalError(this.state);
	      }
	    },
	    handleException: function(ex) {
	      this.GState = ST_CLOSED;
	      this.state = END_STATE;
	      throw ex;
	    }
	  };
	  function nextOrThrow(ctx, moveNext, action, x) {
	    switch (ctx.GState) {
	      case ST_EXECUTING:
	        throw new Error(("\"" + action + "\" on executing generator"));
	      case ST_CLOSED:
	        if (action == 'next') {
	          return {
	            value: undefined,
	            done: true
	          };
	        }
	        throw x;
	      case ST_NEWBORN:
	        if (action === 'throw') {
	          ctx.GState = ST_CLOSED;
	          throw x;
	        }
	        if (x !== undefined)
	          throw $TypeError('Sent value to newborn generator');
	      case ST_SUSPENDED:
	        ctx.GState = ST_EXECUTING;
	        ctx.action = action;
	        ctx.sent = x;
	        var value = moveNext(ctx);
	        var done = value === ctx;
	        if (done)
	          value = ctx.returnValue;
	        ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
	        return {
	          value: value,
	          done: done
	        };
	    }
	  }
	  var ctxName = createPrivateName();
	  var moveNextName = createPrivateName();
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	  GeneratorFunction.prototype = GeneratorFunctionPrototype;
	  $defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
	  GeneratorFunctionPrototype.prototype = {
	    constructor: GeneratorFunctionPrototype,
	    next: function(v) {
	      return nextOrThrow(this[ctxName], this[moveNextName], 'next', v);
	    },
	    throw: function(v) {
	      return nextOrThrow(this[ctxName], this[moveNextName], 'throw', v);
	    }
	  };
	  $defineProperties(GeneratorFunctionPrototype.prototype, {
	    constructor: {enumerable: false},
	    next: {enumerable: false},
	    throw: {enumerable: false}
	  });
	  Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function() {
	    return this;
	  }));
	  function createGeneratorInstance(innerFunction, functionObject, self) {
	    var moveNext = getMoveNext(innerFunction, self);
	    var ctx = new GeneratorContext();
	    var object = $create(functionObject.prototype);
	    object[ctxName] = ctx;
	    object[moveNextName] = moveNext;
	    return object;
	  }
	  function initGeneratorFunction(functionObject) {
	    functionObject.prototype = $create(GeneratorFunctionPrototype.prototype);
	    functionObject.__proto__ = GeneratorFunctionPrototype;
	    return functionObject;
	  }
	  function AsyncFunctionContext() {
	    GeneratorContext.call(this);
	    this.err = undefined;
	    var ctx = this;
	    ctx.result = new Promise(function(resolve, reject) {
	      ctx.resolve = resolve;
	      ctx.reject = reject;
	    });
	  }
	  AsyncFunctionContext.prototype = $create(GeneratorContext.prototype);
	  AsyncFunctionContext.prototype.end = function() {
	    switch (this.state) {
	      case END_STATE:
	        this.resolve(this.returnValue);
	        break;
	      case RETHROW_STATE:
	        this.reject(this.storedException);
	        break;
	      default:
	        this.reject(getInternalError(this.state));
	    }
	  };
	  AsyncFunctionContext.prototype.handleException = function() {
	    this.state = RETHROW_STATE;
	  };
	  function asyncWrap(innerFunction, self) {
	    var moveNext = getMoveNext(innerFunction, self);
	    var ctx = new AsyncFunctionContext();
	    ctx.createCallback = function(newState) {
	      return function(value) {
	        ctx.state = newState;
	        ctx.value = value;
	        moveNext(ctx);
	      };
	    };
	    ctx.errback = function(err) {
	      handleCatch(ctx, err);
	      moveNext(ctx);
	    };
	    moveNext(ctx);
	    return ctx.result;
	  }
	  function getMoveNext(innerFunction, self) {
	    return function(ctx) {
	      while (true) {
	        try {
	          return innerFunction.call(self, ctx);
	        } catch (ex) {
	          handleCatch(ctx, ex);
	        }
	      }
	    };
	  }
	  function handleCatch(ctx, ex) {
	    ctx.storedException = ex;
	    var last = ctx.tryStack_[ctx.tryStack_.length - 1];
	    if (!last) {
	      ctx.handleException(ex);
	      return;
	    }
	    ctx.state = last.catch !== undefined ? last.catch : last.finally;
	    if (last.finallyFallThrough !== undefined)
	      ctx.finallyFallThrough = last.finallyFallThrough;
	  }
	  $traceurRuntime.asyncWrap = asyncWrap;
	  $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
	  $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
	})();
	(function() {
	  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
	    var out = [];
	    if (opt_scheme) {
	      out.push(opt_scheme, ':');
	    }
	    if (opt_domain) {
	      out.push('//');
	      if (opt_userInfo) {
	        out.push(opt_userInfo, '@');
	      }
	      out.push(opt_domain);
	      if (opt_port) {
	        out.push(':', opt_port);
	      }
	    }
	    if (opt_path) {
	      out.push(opt_path);
	    }
	    if (opt_queryData) {
	      out.push('?', opt_queryData);
	    }
	    if (opt_fragment) {
	      out.push('#', opt_fragment);
	    }
	    return out.join('');
	  }
	  ;
	  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
	  var ComponentIndex = {
	    SCHEME: 1,
	    USER_INFO: 2,
	    DOMAIN: 3,
	    PORT: 4,
	    PATH: 5,
	    QUERY_DATA: 6,
	    FRAGMENT: 7
	  };
	  function split(uri) {
	    return (uri.match(splitRe));
	  }
	  function removeDotSegments(path) {
	    if (path === '/')
	      return '/';
	    var leadingSlash = path[0] === '/' ? '/' : '';
	    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
	    var segments = path.split('/');
	    var out = [];
	    var up = 0;
	    for (var pos = 0; pos < segments.length; pos++) {
	      var segment = segments[pos];
	      switch (segment) {
	        case '':
	        case '.':
	          break;
	        case '..':
	          if (out.length)
	            out.pop();
	          else
	            up++;
	          break;
	        default:
	          out.push(segment);
	      }
	    }
	    if (!leadingSlash) {
	      while (up-- > 0) {
	        out.unshift('..');
	      }
	      if (out.length === 0)
	        out.push('.');
	    }
	    return leadingSlash + out.join('/') + trailingSlash;
	  }
	  function joinAndCanonicalizePath(parts) {
	    var path = parts[ComponentIndex.PATH] || '';
	    path = removeDotSegments(path);
	    parts[ComponentIndex.PATH] = path;
	    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
	  }
	  function canonicalizeUrl(url) {
	    var parts = split(url);
	    return joinAndCanonicalizePath(parts);
	  }
	  function resolveUrl(base, url) {
	    var parts = split(url);
	    var baseParts = split(base);
	    if (parts[ComponentIndex.SCHEME]) {
	      return joinAndCanonicalizePath(parts);
	    } else {
	      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
	    }
	    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
	      if (!parts[i]) {
	        parts[i] = baseParts[i];
	      }
	    }
	    if (parts[ComponentIndex.PATH][0] == '/') {
	      return joinAndCanonicalizePath(parts);
	    }
	    var path = baseParts[ComponentIndex.PATH];
	    var index = path.lastIndexOf('/');
	    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
	    parts[ComponentIndex.PATH] = path;
	    return joinAndCanonicalizePath(parts);
	  }
	  function isAbsolute(name) {
	    if (!name)
	      return false;
	    if (name[0] === '/')
	      return true;
	    var parts = split(name);
	    if (parts[ComponentIndex.SCHEME])
	      return true;
	    return false;
	  }
	  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
	  $traceurRuntime.isAbsolute = isAbsolute;
	  $traceurRuntime.removeDotSegments = removeDotSegments;
	  $traceurRuntime.resolveUrl = resolveUrl;
	})();
	(function(global) {
	  'use strict';
	  var $__2 = $traceurRuntime,
	      canonicalizeUrl = $__2.canonicalizeUrl,
	      resolveUrl = $__2.resolveUrl,
	      isAbsolute = $__2.isAbsolute;
	  var moduleInstantiators = Object.create(null);
	  var baseURL;
	  if (global.location && global.location.href)
	    baseURL = resolveUrl(global.location.href, './');
	  else
	    baseURL = '';
	  var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
	    this.url = url;
	    this.value_ = uncoatedModule;
	  };
	  ($traceurRuntime.createClass)(UncoatedModuleEntry, {}, {});
	  var ModuleEvaluationError = function ModuleEvaluationError(erroneousModuleName, cause) {
	    this.message = this.constructor.name + (cause ? ': \'' + cause + '\'' : '') + ' in ' + erroneousModuleName;
	  };
	  ($traceurRuntime.createClass)(ModuleEvaluationError, {loadedBy: function(moduleName) {
	      this.message += '\n loaded by ' + moduleName;
	    }}, {}, Error);
	  var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
	    $traceurRuntime.superCall(this, $UncoatedModuleInstantiator.prototype, "constructor", [url, null]);
	    this.func = func;
	  };
	  var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
	  ($traceurRuntime.createClass)(UncoatedModuleInstantiator, {getUncoatedModule: function() {
	      if (this.value_)
	        return this.value_;
	      try {
	        return this.value_ = this.func.call(global);
	      } catch (ex) {
	        if (ex instanceof ModuleEvaluationError) {
	          ex.loadedBy(this.url);
	          throw ex;
	        }
	        throw new ModuleEvaluationError(this.url, ex);
	      }
	    }}, {}, UncoatedModuleEntry);
	  function getUncoatedModuleInstantiator(name) {
	    if (!name)
	      return;
	    var url = ModuleStore.normalize(name);
	    return moduleInstantiators[url];
	  }
	  ;
	  var moduleInstances = Object.create(null);
	  var liveModuleSentinel = {};
	  function Module(uncoatedModule) {
	    var isLive = arguments[1];
	    var coatedModule = Object.create(null);
	    Object.getOwnPropertyNames(uncoatedModule).forEach((function(name) {
	      var getter,
	          value;
	      if (isLive === liveModuleSentinel) {
	        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
	        if (descr.get)
	          getter = descr.get;
	      }
	      if (!getter) {
	        value = uncoatedModule[name];
	        getter = function() {
	          return value;
	        };
	      }
	      Object.defineProperty(coatedModule, name, {
	        get: getter,
	        enumerable: true
	      });
	    }));
	    Object.preventExtensions(coatedModule);
	    return coatedModule;
	  }
	  var ModuleStore = {
	    normalize: function(name, refererName, refererAddress) {
	      if (typeof name !== "string")
	        throw new TypeError("module name must be a string, not " + typeof name);
	      if (isAbsolute(name))
	        return canonicalizeUrl(name);
	      if (/[^\.]\/\.\.\//.test(name)) {
	        throw new Error('module name embeds /../: ' + name);
	      }
	      if (name[0] === '.' && refererName)
	        return resolveUrl(refererName, name);
	      return canonicalizeUrl(name);
	    },
	    get: function(normalizedName) {
	      var m = getUncoatedModuleInstantiator(normalizedName);
	      if (!m)
	        return undefined;
	      var moduleInstance = moduleInstances[m.url];
	      if (moduleInstance)
	        return moduleInstance;
	      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
	      return moduleInstances[m.url] = moduleInstance;
	    },
	    set: function(normalizedName, module) {
	      normalizedName = String(normalizedName);
	      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, (function() {
	        return module;
	      }));
	      moduleInstances[normalizedName] = module;
	    },
	    get baseURL() {
	      return baseURL;
	    },
	    set baseURL(v) {
	      baseURL = String(v);
	    },
	    registerModule: function(name, func) {
	      var normalizedName = ModuleStore.normalize(name);
	      if (moduleInstantiators[normalizedName])
	        throw new Error('duplicate module named ' + normalizedName);
	      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
	    },
	    bundleStore: Object.create(null),
	    register: function(name, deps, func) {
	      if (!deps || !deps.length && !func.length) {
	        this.registerModule(name, func);
	      } else {
	        this.bundleStore[name] = {
	          deps: deps,
	          execute: function() {
	            var $__0 = arguments;
	            var depMap = {};
	            deps.forEach((function(dep, index) {
	              return depMap[dep] = $__0[index];
	            }));
	            var registryEntry = func.call(this, depMap);
	            registryEntry.execute.call(this);
	            return registryEntry.exports;
	          }
	        };
	      }
	    },
	    getAnonymousModule: function(func) {
	      return new Module(func.call(global), liveModuleSentinel);
	    },
	    getForTesting: function(name) {
	      var $__0 = this;
	      if (!this.testingPrefix_) {
	        Object.keys(moduleInstances).some((function(key) {
	          var m = /(traceur@[^\/]*\/)/.exec(key);
	          if (m) {
	            $__0.testingPrefix_ = m[1];
	            return true;
	          }
	        }));
	      }
	      return this.get(this.testingPrefix_ + name);
	    }
	  };
	  ModuleStore.set('@traceur/src/runtime/ModuleStore', new Module({ModuleStore: ModuleStore}));
	  var setupGlobals = $traceurRuntime.setupGlobals;
	  $traceurRuntime.setupGlobals = function(global) {
	    setupGlobals(global);
	  };
	  $traceurRuntime.ModuleStore = ModuleStore;
	  global.System = {
	    register: ModuleStore.register.bind(ModuleStore),
	    get: ModuleStore.get,
	    set: ModuleStore.set,
	    normalize: ModuleStore.normalize
	  };
	  $traceurRuntime.getModuleImpl = function(name) {
	    var instantiator = getUncoatedModuleInstantiator(name);
	    return instantiator && instantiator.getUncoatedModule();
	  };
	})(typeof global !== 'undefined' ? global : this);
	System.register("traceur-runtime@0.0.58/src/runtime/polyfills/utils", [], function() {
	  "use strict";
	  var __moduleName = "traceur-runtime@0.0.58/src/runtime/polyfills/utils";
	  var $ceil = Math.ceil;
	  var $floor = Math.floor;
	  var $isFinite = isFinite;
	  var $isNaN = isNaN;
	  var $pow = Math.pow;
	  var $min = Math.min;
	  var toObject = $traceurRuntime.toObject;
	  function toUint32(x) {
	    return x >>> 0;
	  }
	  function isObject(x) {
	    return x && (typeof x === 'object' || typeof x === 'function');
	  }
	  function isCallable(x) {
	    return typeof x === 'function';
	  }
	  function isNumber(x) {
	    return typeof x === 'number';
	  }
	  function toInteger(x) {
	    x = +x;
	    if ($isNaN(x))
	      return 0;
	    if (x === 0 || !$isFinite(x))
	      return x;
	    return x > 0 ? $floor(x) : $ceil(x);
	  }
	  var MAX_SAFE_LENGTH = $pow(2, 53) - 1;
	  function toLength(x) {
	    var len = toInteger(x);
	    return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
	  }
	  function checkIterable(x) {
	    return !isObject(x) ? undefined : x[Symbol.iterator];
	  }
	  function isConstructor(x) {
	    return isCallable(x);
	  }
	  function createIteratorResultObject(value, done) {
	    return {
	      value: value,
	      done: done
	    };
	  }
	  function maybeDefine(object, name, descr) {
	    if (!(name in object)) {
	      Object.defineProperty(object, name, descr);
	    }
	  }
	  function maybeDefineMethod(object, name, value) {
	    maybeDefine(object, name, {
	      value: value,
	      configurable: true,
	      enumerable: false,
	      writable: true
	    });
	  }
	  function maybeDefineConst(object, name, value) {
	    maybeDefine(object, name, {
	      value: value,
	      configurable: false,
	      enumerable: false,
	      writable: false
	    });
	  }
	  function maybeAddFunctions(object, functions) {
	    for (var i = 0; i < functions.length; i += 2) {
	      var name = functions[i];
	      var value = functions[i + 1];
	      maybeDefineMethod(object, name, value);
	    }
	  }
	  function maybeAddConsts(object, consts) {
	    for (var i = 0; i < consts.length; i += 2) {
	      var name = consts[i];
	      var value = consts[i + 1];
	      maybeDefineConst(object, name, value);
	    }
	  }
	  function maybeAddIterator(object, func, Symbol) {
	    if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
	      return;
	    if (object['@@iterator'])
	      func = object['@@iterator'];
	    Object.defineProperty(object, Symbol.iterator, {
	      value: func,
	      configurable: true,
	      enumerable: false,
	      writable: true
	    });
	  }
	  var polyfills = [];
	  function registerPolyfill(func) {
	    polyfills.push(func);
	  }
	  function polyfillAll(global) {
	    polyfills.forEach((function(f) {
	      return f(global);
	    }));
	  }
	  return {
	    get toObject() {
	      return toObject;
	    },
	    get toUint32() {
	      return toUint32;
	    },
	    get isObject() {
	      return isObject;
	    },
	    get isCallable() {
	      return isCallable;
	    },
	    get isNumber() {
	      return isNumber;
	    },
	    get toInteger() {
	      return toInteger;
	    },
	    get toLength() {
	      return toLength;
	    },
	    get checkIterable() {
	      return checkIterable;
	    },
	    get isConstructor() {
	      return isConstructor;
	    },
	    get createIteratorResultObject() {
	      return createIteratorResultObject;
	    },
	    get maybeDefine() {
	      return maybeDefine;
	    },
	    get maybeDefineMethod() {
	      return maybeDefineMethod;
	    },
	    get maybeDefineConst() {
	      return maybeDefineConst;
	    },
	    get maybeAddFunctions() {
	      return maybeAddFunctions;
	    },
	    get maybeAddConsts() {
	      return maybeAddConsts;
	    },
	    get maybeAddIterator() {
	      return maybeAddIterator;
	    },
	    get registerPolyfill() {
	      return registerPolyfill;
	    },
	    get polyfillAll() {
	      return polyfillAll;
	    }
	  };
	});
	System.register("traceur-runtime@0.0.58/src/runtime/polyfills/Map", [], function() {
	  "use strict";
	  var __moduleName = "traceur-runtime@0.0.58/src/runtime/polyfills/Map";
	  var $__3 = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/utils"),
	      isObject = $__3.isObject,
	      maybeAddIterator = $__3.maybeAddIterator,
	      registerPolyfill = $__3.registerPolyfill;
	  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
	  var $hasOwnProperty = Object.prototype.hasOwnProperty;
	  var deletedSentinel = {};
	  function lookupIndex(map, key) {
	    if (isObject(key)) {
	      var hashObject = getOwnHashObject(key);
	      return hashObject && map.objectIndex_[hashObject.hash];
	    }
	    if (typeof key === 'string')
	      return map.stringIndex_[key];
	    return map.primitiveIndex_[key];
	  }
	  function initMap(map) {
	    map.entries_ = [];
	    map.objectIndex_ = Object.create(null);
	    map.stringIndex_ = Object.create(null);
	    map.primitiveIndex_ = Object.create(null);
	    map.deletedCount_ = 0;
	  }
	  var Map = function Map() {
	    var iterable = arguments[0];
	    if (!isObject(this))
	      throw new TypeError('Map called on incompatible type');
	    if ($hasOwnProperty.call(this, 'entries_')) {
	      throw new TypeError('Map can not be reentrantly initialised');
	    }
	    initMap(this);
	    if (iterable !== null && iterable !== undefined) {
	      for (var $__5 = iterable[Symbol.iterator](),
	          $__6; !($__6 = $__5.next()).done; ) {
	        var $__7 = $__6.value,
	            key = $__7[0],
	            value = $__7[1];
	        {
	          this.set(key, value);
	        }
	      }
	    }
	  };
	  ($traceurRuntime.createClass)(Map, {
	    get size() {
	      return this.entries_.length / 2 - this.deletedCount_;
	    },
	    get: function(key) {
	      var index = lookupIndex(this, key);
	      if (index !== undefined)
	        return this.entries_[index + 1];
	    },
	    set: function(key, value) {
	      var objectMode = isObject(key);
	      var stringMode = typeof key === 'string';
	      var index = lookupIndex(this, key);
	      if (index !== undefined) {
	        this.entries_[index + 1] = value;
	      } else {
	        index = this.entries_.length;
	        this.entries_[index] = key;
	        this.entries_[index + 1] = value;
	        if (objectMode) {
	          var hashObject = getOwnHashObject(key);
	          var hash = hashObject.hash;
	          this.objectIndex_[hash] = index;
	        } else if (stringMode) {
	          this.stringIndex_[key] = index;
	        } else {
	          this.primitiveIndex_[key] = index;
	        }
	      }
	      return this;
	    },
	    has: function(key) {
	      return lookupIndex(this, key) !== undefined;
	    },
	    delete: function(key) {
	      var objectMode = isObject(key);
	      var stringMode = typeof key === 'string';
	      var index;
	      var hash;
	      if (objectMode) {
	        var hashObject = getOwnHashObject(key);
	        if (hashObject) {
	          index = this.objectIndex_[hash = hashObject.hash];
	          delete this.objectIndex_[hash];
	        }
	      } else if (stringMode) {
	        index = this.stringIndex_[key];
	        delete this.stringIndex_[key];
	      } else {
	        index = this.primitiveIndex_[key];
	        delete this.primitiveIndex_[key];
	      }
	      if (index !== undefined) {
	        this.entries_[index] = deletedSentinel;
	        this.entries_[index + 1] = undefined;
	        this.deletedCount_++;
	      }
	    },
	    clear: function() {
	      initMap(this);
	    },
	    forEach: function(callbackFn) {
	      var thisArg = arguments[1];
	      for (var i = 0,
	          len = this.entries_.length; i < len; i += 2) {
	        var key = this.entries_[i];
	        var value = this.entries_[i + 1];
	        if (key === deletedSentinel)
	          continue;
	        callbackFn.call(thisArg, value, key, this);
	      }
	    },
	    entries: $traceurRuntime.initGeneratorFunction(function $__8() {
	      var i,
	          len,
	          key,
	          value;
	      return $traceurRuntime.createGeneratorInstance(function($ctx) {
	        while (true)
	          switch ($ctx.state) {
	            case 0:
	              i = 0, len = this.entries_.length;
	              $ctx.state = 12;
	              break;
	            case 12:
	              $ctx.state = (i < len) ? 8 : -2;
	              break;
	            case 4:
	              i += 2;
	              $ctx.state = 12;
	              break;
	            case 8:
	              key = this.entries_[i];
	              value = this.entries_[i + 1];
	              $ctx.state = 9;
	              break;
	            case 9:
	              $ctx.state = (key === deletedSentinel) ? 4 : 6;
	              break;
	            case 6:
	              $ctx.state = 2;
	              return [key, value];
	            case 2:
	              $ctx.maybeThrow();
	              $ctx.state = 4;
	              break;
	            default:
	              return $ctx.end();
	          }
	      }, $__8, this);
	    }),
	    keys: $traceurRuntime.initGeneratorFunction(function $__9() {
	      var i,
	          len,
	          key,
	          value;
	      return $traceurRuntime.createGeneratorInstance(function($ctx) {
	        while (true)
	          switch ($ctx.state) {
	            case 0:
	              i = 0, len = this.entries_.length;
	              $ctx.state = 12;
	              break;
	            case 12:
	              $ctx.state = (i < len) ? 8 : -2;
	              break;
	            case 4:
	              i += 2;
	              $ctx.state = 12;
	              break;
	            case 8:
	              key = this.entries_[i];
	              value = this.entries_[i + 1];
	              $ctx.state = 9;
	              break;
	            case 9:
	              $ctx.state = (key === deletedSentinel) ? 4 : 6;
	              break;
	            case 6:
	              $ctx.state = 2;
	              return key;
	            case 2:
	              $ctx.maybeThrow();
	              $ctx.state = 4;
	              break;
	            default:
	              return $ctx.end();
	          }
	      }, $__9, this);
	    }),
	    values: $traceurRuntime.initGeneratorFunction(function $__10() {
	      var i,
	          len,
	          key,
	          value;
	      return $traceurRuntime.createGeneratorInstance(function($ctx) {
	        while (true)
	          switch ($ctx.state) {
	            case 0:
	              i = 0, len = this.entries_.length;
	              $ctx.state = 12;
	              break;
	            case 12:
	              $ctx.state = (i < len) ? 8 : -2;
	              break;
	            case 4:
	              i += 2;
	              $ctx.state = 12;
	              break;
	            case 8:
	              key = this.entries_[i];
	              value = this.entries_[i + 1];
	              $ctx.state = 9;
	              break;
	            case 9:
	              $ctx.state = (key === deletedSentinel) ? 4 : 6;
	              break;
	            case 6:
	              $ctx.state = 2;
	              return value;
	            case 2:
	              $ctx.maybeThrow();
	              $ctx.state = 4;
	              break;
	            default:
	              return $ctx.end();
	          }
	      }, $__10, this);
	    })
	  }, {});
	  Object.defineProperty(Map.prototype, Symbol.iterator, {
	    configurable: true,
	    writable: true,
	    value: Map.prototype.entries
	  });
	  function polyfillMap(global) {
	    var $__7 = global,
	        Object = $__7.Object,
	        Symbol = $__7.Symbol;
	    if (!global.Map)
	      global.Map = Map;
	    var mapPrototype = global.Map.prototype;
	    if (mapPrototype.entries) {
	      maybeAddIterator(mapPrototype, mapPrototype.entries, Symbol);
	      maybeAddIterator(Object.getPrototypeOf(new global.Map().entries()), function() {
	        return this;
	      }, Symbol);
	    }
	  }
	  registerPolyfill(polyfillMap);
	  return {
	    get Map() {
	      return Map;
	    },
	    get polyfillMap() {
	      return polyfillMap;
	    }
	  };
	});
	System.get("traceur-runtime@0.0.58/src/runtime/polyfills/Map" + '');
	System.register("traceur-runtime@0.0.58/src/runtime/polyfills/Set", [], function() {
	  "use strict";
	  var __moduleName = "traceur-runtime@0.0.58/src/runtime/polyfills/Set";
	  var $__11 = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/utils"),
	      isObject = $__11.isObject,
	      maybeAddIterator = $__11.maybeAddIterator,
	      registerPolyfill = $__11.registerPolyfill;
	  var Map = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/Map").Map;
	  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
	  var $hasOwnProperty = Object.prototype.hasOwnProperty;
	  function initSet(set) {
	    set.map_ = new Map();
	  }
	  var Set = function Set() {
	    var iterable = arguments[0];
	    if (!isObject(this))
	      throw new TypeError('Set called on incompatible type');
	    if ($hasOwnProperty.call(this, 'map_')) {
	      throw new TypeError('Set can not be reentrantly initialised');
	    }
	    initSet(this);
	    if (iterable !== null && iterable !== undefined) {
	      for (var $__15 = iterable[Symbol.iterator](),
	          $__16; !($__16 = $__15.next()).done; ) {
	        var item = $__16.value;
	        {
	          this.add(item);
	        }
	      }
	    }
	  };
	  ($traceurRuntime.createClass)(Set, {
	    get size() {
	      return this.map_.size;
	    },
	    has: function(key) {
	      return this.map_.has(key);
	    },
	    add: function(key) {
	      return this.map_.set(key, key);
	    },
	    delete: function(key) {
	      return this.map_.delete(key);
	    },
	    clear: function() {
	      return this.map_.clear();
	    },
	    forEach: function(callbackFn) {
	      var thisArg = arguments[1];
	      var $__13 = this;
	      return this.map_.forEach((function(value, key) {
	        callbackFn.call(thisArg, key, key, $__13);
	      }));
	    },
	    values: $traceurRuntime.initGeneratorFunction(function $__18() {
	      var $__19,
	          $__20;
	      return $traceurRuntime.createGeneratorInstance(function($ctx) {
	        while (true)
	          switch ($ctx.state) {
	            case 0:
	              $__19 = this.map_.keys()[Symbol.iterator]();
	              $ctx.sent = void 0;
	              $ctx.action = 'next';
	              $ctx.state = 12;
	              break;
	            case 12:
	              $__20 = $__19[$ctx.action]($ctx.sentIgnoreThrow);
	              $ctx.state = 9;
	              break;
	            case 9:
	              $ctx.state = ($__20.done) ? 3 : 2;
	              break;
	            case 3:
	              $ctx.sent = $__20.value;
	              $ctx.state = -2;
	              break;
	            case 2:
	              $ctx.state = 12;
	              return $__20.value;
	            default:
	              return $ctx.end();
	          }
	      }, $__18, this);
	    }),
	    entries: $traceurRuntime.initGeneratorFunction(function $__21() {
	      var $__22,
	          $__23;
	      return $traceurRuntime.createGeneratorInstance(function($ctx) {
	        while (true)
	          switch ($ctx.state) {
	            case 0:
	              $__22 = this.map_.entries()[Symbol.iterator]();
	              $ctx.sent = void 0;
	              $ctx.action = 'next';
	              $ctx.state = 12;
	              break;
	            case 12:
	              $__23 = $__22[$ctx.action]($ctx.sentIgnoreThrow);
	              $ctx.state = 9;
	              break;
	            case 9:
	              $ctx.state = ($__23.done) ? 3 : 2;
	              break;
	            case 3:
	              $ctx.sent = $__23.value;
	              $ctx.state = -2;
	              break;
	            case 2:
	              $ctx.state = 12;
	              return $__23.value;
	            default:
	              return $ctx.end();
	          }
	      }, $__21, this);
	    })
	  }, {});
	  Object.defineProperty(Set.prototype, Symbol.iterator, {
	    configurable: true,
	    writable: true,
	    value: Set.prototype.values
	  });
	  Object.defineProperty(Set.prototype, 'keys', {
	    configurable: true,
	    writable: true,
	    value: Set.prototype.values
	  });
	  function polyfillSet(global) {
	    var $__17 = global,
	        Object = $__17.Object,
	        Symbol = $__17.Symbol;
	    if (!global.Set)
	      global.Set = Set;
	    var setPrototype = global.Set.prototype;
	    if (setPrototype.values) {
	      maybeAddIterator(setPrototype, setPrototype.values, Symbol);
	      maybeAddIterator(Object.getPrototypeOf(new global.Set().values()), function() {
	        return this;
	      }, Symbol);
	    }
	  }
	  registerPolyfill(polyfillSet);
	  return {
	    get Set() {
	      return Set;
	    },
	    get polyfillSet() {
	      return polyfillSet;
	    }
	  };
	});
	System.get("traceur-runtime@0.0.58/src/runtime/polyfills/Set" + '');
	System.register("traceur-runtime@0.0.58/node_modules/rsvp/lib/rsvp/asap", [], function() {
	  "use strict";
	  var __moduleName = "traceur-runtime@0.0.58/node_modules/rsvp/lib/rsvp/asap";
	  function asap(callback, arg) {
	    var length = queue.push([callback, arg]);
	    if (length === 1) {
	      scheduleFlush();
	    }
	  }
	  var $__default = asap;
	  ;
	  var browserGlobal = (typeof window !== 'undefined') ? window : {};
	  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	  function useNextTick() {
	    return function() {
	      process.nextTick(flush);
	    };
	  }
	  function useMutationObserver() {
	    var iterations = 0;
	    var observer = new BrowserMutationObserver(flush);
	    var node = document.createTextNode('');
	    observer.observe(node, {characterData: true});
	    return function() {
	      node.data = (iterations = ++iterations % 2);
	    };
	  }
	  function useSetTimeout() {
	    return function() {
	      setTimeout(flush, 1);
	    };
	  }
	  var queue = [];
	  function flush() {
	    for (var i = 0; i < queue.length; i++) {
	      var tuple = queue[i];
	      var callback = tuple[0],
	          arg = tuple[1];
	      callback(arg);
	    }
	    queue = [];
	  }
	  var scheduleFlush;
	  if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
	    scheduleFlush = useNextTick();
	  } else if (BrowserMutationObserver) {
	    scheduleFlush = useMutationObserver();
	  } else {
	    scheduleFlush = useSetTimeout();
	  }
	  return {get default() {
	      return $__default;
	    }};
	});
	System.register("traceur-runtime@0.0.58/src/runtime/polyfills/Promise", [], function() {
	  "use strict";
	  var __moduleName = "traceur-runtime@0.0.58/src/runtime/polyfills/Promise";
	  var async = System.get("traceur-runtime@0.0.58/node_modules/rsvp/lib/rsvp/asap").default;
	  var registerPolyfill = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/utils").registerPolyfill;
	  var promiseRaw = {};
	  function isPromise(x) {
	    return x && typeof x === 'object' && x.status_ !== undefined;
	  }
	  function idResolveHandler(x) {
	    return x;
	  }
	  function idRejectHandler(x) {
	    throw x;
	  }
	  function chain(promise) {
	    var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
	    var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
	    var deferred = getDeferred(promise.constructor);
	    switch (promise.status_) {
	      case undefined:
	        throw TypeError;
	      case 0:
	        promise.onResolve_.push(onResolve, deferred);
	        promise.onReject_.push(onReject, deferred);
	        break;
	      case +1:
	        promiseEnqueue(promise.value_, [onResolve, deferred]);
	        break;
	      case -1:
	        promiseEnqueue(promise.value_, [onReject, deferred]);
	        break;
	    }
	    return deferred.promise;
	  }
	  function getDeferred(C) {
	    if (this === $Promise) {
	      var promise = promiseInit(new $Promise(promiseRaw));
	      return {
	        promise: promise,
	        resolve: (function(x) {
	          promiseResolve(promise, x);
	        }),
	        reject: (function(r) {
	          promiseReject(promise, r);
	        })
	      };
	    } else {
	      var result = {};
	      result.promise = new C((function(resolve, reject) {
	        result.resolve = resolve;
	        result.reject = reject;
	      }));
	      return result;
	    }
	  }
	  function promiseSet(promise, status, value, onResolve, onReject) {
	    promise.status_ = status;
	    promise.value_ = value;
	    promise.onResolve_ = onResolve;
	    promise.onReject_ = onReject;
	    return promise;
	  }
	  function promiseInit(promise) {
	    return promiseSet(promise, 0, undefined, [], []);
	  }
	  var Promise = function Promise(resolver) {
	    if (resolver === promiseRaw)
	      return;
	    if (typeof resolver !== 'function')
	      throw new TypeError;
	    var promise = promiseInit(this);
	    try {
	      resolver((function(x) {
	        promiseResolve(promise, x);
	      }), (function(r) {
	        promiseReject(promise, r);
	      }));
	    } catch (e) {
	      promiseReject(promise, e);
	    }
	  };
	  ($traceurRuntime.createClass)(Promise, {
	    catch: function(onReject) {
	      return this.then(undefined, onReject);
	    },
	    then: function(onResolve, onReject) {
	      if (typeof onResolve !== 'function')
	        onResolve = idResolveHandler;
	      if (typeof onReject !== 'function')
	        onReject = idRejectHandler;
	      var that = this;
	      var constructor = this.constructor;
	      return chain(this, function(x) {
	        x = promiseCoerce(constructor, x);
	        return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
	      }, onReject);
	    }
	  }, {
	    resolve: function(x) {
	      if (this === $Promise) {
	        return promiseSet(new $Promise(promiseRaw), +1, x);
	      } else {
	        return new this(function(resolve, reject) {
	          resolve(x);
	        });
	      }
	    },
	    reject: function(r) {
	      if (this === $Promise) {
	        return promiseSet(new $Promise(promiseRaw), -1, r);
	      } else {
	        return new this((function(resolve, reject) {
	          reject(r);
	        }));
	      }
	    },
	    cast: function(x) {
	      if (x instanceof this)
	        return x;
	      if (isPromise(x)) {
	        var result = getDeferred(this);
	        chain(x, result.resolve, result.reject);
	        return result.promise;
	      }
	      return this.resolve(x);
	    },
	    all: function(values) {
	      var deferred = getDeferred(this);
	      var resolutions = [];
	      try {
	        var count = values.length;
	        if (count === 0) {
	          deferred.resolve(resolutions);
	        } else {
	          for (var i = 0; i < values.length; i++) {
	            this.resolve(values[i]).then(function(i, x) {
	              resolutions[i] = x;
	              if (--count === 0)
	                deferred.resolve(resolutions);
	            }.bind(undefined, i), (function(r) {
	              deferred.reject(r);
	            }));
	          }
	        }
	      } catch (e) {
	        deferred.reject(e);
	      }
	      return deferred.promise;
	    },
	    race: function(values) {
	      var deferred = getDeferred(this);
	      try {
	        for (var i = 0; i < values.length; i++) {
	          this.resolve(values[i]).then((function(x) {
	            deferred.resolve(x);
	          }), (function(r) {
	            deferred.reject(r);
	          }));
	        }
	      } catch (e) {
	        deferred.reject(e);
	      }
	      return deferred.promise;
	    }
	  });
	  var $Promise = Promise;
	  var $PromiseReject = $Promise.reject;
	  function promiseResolve(promise, x) {
	    promiseDone(promise, +1, x, promise.onResolve_);
	  }
	  function promiseReject(promise, r) {
	    promiseDone(promise, -1, r, promise.onReject_);
	  }
	  function promiseDone(promise, status, value, reactions) {
	    if (promise.status_ !== 0)
	      return;
	    promiseEnqueue(value, reactions);
	    promiseSet(promise, status, value);
	  }
	  function promiseEnqueue(value, tasks) {
	    async((function() {
	      for (var i = 0; i < tasks.length; i += 2) {
	        promiseHandle(value, tasks[i], tasks[i + 1]);
	      }
	    }));
	  }
	  function promiseHandle(value, handler, deferred) {
	    try {
	      var result = handler(value);
	      if (result === deferred.promise)
	        throw new TypeError;
	      else if (isPromise(result))
	        chain(result, deferred.resolve, deferred.reject);
	      else
	        deferred.resolve(result);
	    } catch (e) {
	      try {
	        deferred.reject(e);
	      } catch (e) {}
	    }
	  }
	  var thenableSymbol = '@@thenable';
	  function isObject(x) {
	    return x && (typeof x === 'object' || typeof x === 'function');
	  }
	  function promiseCoerce(constructor, x) {
	    if (!isPromise(x) && isObject(x)) {
	      var then;
	      try {
	        then = x.then;
	      } catch (r) {
	        var promise = $PromiseReject.call(constructor, r);
	        x[thenableSymbol] = promise;
	        return promise;
	      }
	      if (typeof then === 'function') {
	        var p = x[thenableSymbol];
	        if (p) {
	          return p;
	        } else {
	          var deferred = getDeferred(constructor);
	          x[thenableSymbol] = deferred.promise;
	          try {
	            then.call(x, deferred.resolve, deferred.reject);
	          } catch (r) {
	            deferred.reject(r);
	          }
	          return deferred.promise;
	        }
	      }
	    }
	    return x;
	  }
	  function polyfillPromise(global) {
	    if (!global.Promise)
	      global.Promise = Promise;
	  }
	  registerPolyfill(polyfillPromise);
	  return {
	    get Promise() {
	      return Promise;
	    },
	    get polyfillPromise() {
	      return polyfillPromise;
	    }
	  };
	});
	System.get("traceur-runtime@0.0.58/src/runtime/polyfills/Promise" + '');
	System.register("traceur-runtime@0.0.58/src/runtime/polyfills/StringIterator", [], function() {
	  "use strict";
	  var $__29;
	  var __moduleName = "traceur-runtime@0.0.58/src/runtime/polyfills/StringIterator";
	  var $__27 = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/utils"),
	      createIteratorResultObject = $__27.createIteratorResultObject,
	      isObject = $__27.isObject;
	  var $__30 = $traceurRuntime,
	      hasOwnProperty = $__30.hasOwnProperty,
	      toProperty = $__30.toProperty;
	  var iteratedString = Symbol('iteratedString');
	  var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
	  var StringIterator = function StringIterator() {};
	  ($traceurRuntime.createClass)(StringIterator, ($__29 = {}, Object.defineProperty($__29, "next", {
	    value: function() {
	      var o = this;
	      if (!isObject(o) || !hasOwnProperty(o, iteratedString)) {
	        throw new TypeError('this must be a StringIterator object');
	      }
	      var s = o[toProperty(iteratedString)];
	      if (s === undefined) {
	        return createIteratorResultObject(undefined, true);
	      }
	      var position = o[toProperty(stringIteratorNextIndex)];
	      var len = s.length;
	      if (position >= len) {
	        o[toProperty(iteratedString)] = undefined;
	        return createIteratorResultObject(undefined, true);
	      }
	      var first = s.charCodeAt(position);
	      var resultString;
	      if (first < 0xD800 || first > 0xDBFF || position + 1 === len) {
	        resultString = String.fromCharCode(first);
	      } else {
	        var second = s.charCodeAt(position + 1);
	        if (second < 0xDC00 || second > 0xDFFF) {
	          resultString = String.fromCharCode(first);
	        } else {
	          resultString = String.fromCharCode(first) + String.fromCharCode(second);
	        }
	      }
	      o[toProperty(stringIteratorNextIndex)] = position + resultString.length;
	      return createIteratorResultObject(resultString, false);
	    },
	    configurable: true,
	    enumerable: true,
	    writable: true
	  }), Object.defineProperty($__29, Symbol.iterator, {
	    value: function() {
	      return this;
	    },
	    configurable: true,
	    enumerable: true,
	    writable: true
	  }), $__29), {});
	  function createStringIterator(string) {
	    var s = String(string);
	    var iterator = Object.create(StringIterator.prototype);
	    iterator[toProperty(iteratedString)] = s;
	    iterator[toProperty(stringIteratorNextIndex)] = 0;
	    return iterator;
	  }
	  return {get createStringIterator() {
	      return createStringIterator;
	    }};
	});
	System.register("traceur-runtime@0.0.58/src/runtime/polyfills/String", [], function() {
	  "use strict";
	  var __moduleName = "traceur-runtime@0.0.58/src/runtime/polyfills/String";
	  var createStringIterator = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/StringIterator").createStringIterator;
	  var $__32 = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/utils"),
	      maybeAddFunctions = $__32.maybeAddFunctions,
	      maybeAddIterator = $__32.maybeAddIterator,
	      registerPolyfill = $__32.registerPolyfill;
	  var $toString = Object.prototype.toString;
	  var $indexOf = String.prototype.indexOf;
	  var $lastIndexOf = String.prototype.lastIndexOf;
	  function startsWith(search) {
	    var string = String(this);
	    if (this == null || $toString.call(search) == '[object RegExp]') {
	      throw TypeError();
	    }
	    var stringLength = string.length;
	    var searchString = String(search);
	    var searchLength = searchString.length;
	    var position = arguments.length > 1 ? arguments[1] : undefined;
	    var pos = position ? Number(position) : 0;
	    if (isNaN(pos)) {
	      pos = 0;
	    }
	    var start = Math.min(Math.max(pos, 0), stringLength);
	    return $indexOf.call(string, searchString, pos) == start;
	  }
	  function endsWith(search) {
	    var string = String(this);
	    if (this == null || $toString.call(search) == '[object RegExp]') {
	      throw TypeError();
	    }
	    var stringLength = string.length;
	    var searchString = String(search);
	    var searchLength = searchString.length;
	    var pos = stringLength;
	    if (arguments.length > 1) {
	      var position = arguments[1];
	      if (position !== undefined) {
	        pos = position ? Number(position) : 0;
	        if (isNaN(pos)) {
	          pos = 0;
	        }
	      }
	    }
	    var end = Math.min(Math.max(pos, 0), stringLength);
	    var start = end - searchLength;
	    if (start < 0) {
	      return false;
	    }
	    return $lastIndexOf.call(string, searchString, start) == start;
	  }
	  function contains(search) {
	    if (this == null) {
	      throw TypeError();
	    }
	    var string = String(this);
	    var stringLength = string.length;
	    var searchString = String(search);
	    var searchLength = searchString.length;
	    var position = arguments.length > 1 ? arguments[1] : undefined;
	    var pos = position ? Number(position) : 0;
	    if (isNaN(pos)) {
	      pos = 0;
	    }
	    var start = Math.min(Math.max(pos, 0), stringLength);
	    return $indexOf.call(string, searchString, pos) != -1;
	  }
	  function repeat(count) {
	    if (this == null) {
	      throw TypeError();
	    }
	    var string = String(this);
	    var n = count ? Number(count) : 0;
	    if (isNaN(n)) {
	      n = 0;
	    }
	    if (n < 0 || n == Infinity) {
	      throw RangeError();
	    }
	    if (n == 0) {
	      return '';
	    }
	    var result = '';
	    while (n--) {
	      result += string;
	    }
	    return result;
	  }
	  function codePointAt(position) {
	    if (this == null) {
	      throw TypeError();
	    }
	    var string = String(this);
	    var size = string.length;
	    var index = position ? Number(position) : 0;
	    if (isNaN(index)) {
	      index = 0;
	    }
	    if (index < 0 || index >= size) {
	      return undefined;
	    }
	    var first = string.charCodeAt(index);
	    var second;
	    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
	      second = string.charCodeAt(index + 1);
	      if (second >= 0xDC00 && second <= 0xDFFF) {
	        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
	      }
	    }
	    return first;
	  }
	  function raw(callsite) {
	    var raw = callsite.raw;
	    var len = raw.length >>> 0;
	    if (len === 0)
	      return '';
	    var s = '';
	    var i = 0;
	    while (true) {
	      s += raw[i];
	      if (i + 1 === len)
	        return s;
	      s += arguments[++i];
	    }
	  }
	  function fromCodePoint() {
	    var codeUnits = [];
	    var floor = Math.floor;
	    var highSurrogate;
	    var lowSurrogate;
	    var index = -1;
	    var length = arguments.length;
	    if (!length) {
	      return '';
	    }
	    while (++index < length) {
	      var codePoint = Number(arguments[index]);
	      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
	        throw RangeError('Invalid code point: ' + codePoint);
	      }
	      if (codePoint <= 0xFFFF) {
	        codeUnits.push(codePoint);
	      } else {
	        codePoint -= 0x10000;
	        highSurrogate = (codePoint >> 10) + 0xD800;
	        lowSurrogate = (codePoint % 0x400) + 0xDC00;
	        codeUnits.push(highSurrogate, lowSurrogate);
	      }
	    }
	    return String.fromCharCode.apply(null, codeUnits);
	  }
	  function stringPrototypeIterator() {
	    var o = $traceurRuntime.checkObjectCoercible(this);
	    var s = String(o);
	    return createStringIterator(s);
	  }
	  function polyfillString(global) {
	    var String = global.String;
	    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'contains', contains, 'endsWith', endsWith, 'startsWith', startsWith, 'repeat', repeat]);
	    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
	    maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
	  }
	  registerPolyfill(polyfillString);
	  return {
	    get startsWith() {
	      return startsWith;
	    },
	    get endsWith() {
	      return endsWith;
	    },
	    get contains() {
	      return contains;
	    },
	    get repeat() {
	      return repeat;
	    },
	    get codePointAt() {
	      return codePointAt;
	    },
	    get raw() {
	      return raw;
	    },
	    get fromCodePoint() {
	      return fromCodePoint;
	    },
	    get stringPrototypeIterator() {
	      return stringPrototypeIterator;
	    },
	    get polyfillString() {
	      return polyfillString;
	    }
	  };
	});
	System.get("traceur-runtime@0.0.58/src/runtime/polyfills/String" + '');
	System.register("traceur-runtime@0.0.58/src/runtime/polyfills/ArrayIterator", [], function() {
	  "use strict";
	  var $__36;
	  var __moduleName = "traceur-runtime@0.0.58/src/runtime/polyfills/ArrayIterator";
	  var $__34 = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/utils"),
	      toObject = $__34.toObject,
	      toUint32 = $__34.toUint32,
	      createIteratorResultObject = $__34.createIteratorResultObject;
	  var ARRAY_ITERATOR_KIND_KEYS = 1;
	  var ARRAY_ITERATOR_KIND_VALUES = 2;
	  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
	  var ArrayIterator = function ArrayIterator() {};
	  ($traceurRuntime.createClass)(ArrayIterator, ($__36 = {}, Object.defineProperty($__36, "next", {
	    value: function() {
	      var iterator = toObject(this);
	      var array = iterator.iteratorObject_;
	      if (!array) {
	        throw new TypeError('Object is not an ArrayIterator');
	      }
	      var index = iterator.arrayIteratorNextIndex_;
	      var itemKind = iterator.arrayIterationKind_;
	      var length = toUint32(array.length);
	      if (index >= length) {
	        iterator.arrayIteratorNextIndex_ = Infinity;
	        return createIteratorResultObject(undefined, true);
	      }
	      iterator.arrayIteratorNextIndex_ = index + 1;
	      if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
	        return createIteratorResultObject(array[index], false);
	      if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
	        return createIteratorResultObject([index, array[index]], false);
	      return createIteratorResultObject(index, false);
	    },
	    configurable: true,
	    enumerable: true,
	    writable: true
	  }), Object.defineProperty($__36, Symbol.iterator, {
	    value: function() {
	      return this;
	    },
	    configurable: true,
	    enumerable: true,
	    writable: true
	  }), $__36), {});
	  function createArrayIterator(array, kind) {
	    var object = toObject(array);
	    var iterator = new ArrayIterator;
	    iterator.iteratorObject_ = object;
	    iterator.arrayIteratorNextIndex_ = 0;
	    iterator.arrayIterationKind_ = kind;
	    return iterator;
	  }
	  function entries() {
	    return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
	  }
	  function keys() {
	    return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
	  }
	  function values() {
	    return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
	  }
	  return {
	    get entries() {
	      return entries;
	    },
	    get keys() {
	      return keys;
	    },
	    get values() {
	      return values;
	    }
	  };
	});
	System.register("traceur-runtime@0.0.58/src/runtime/polyfills/Array", [], function() {
	  "use strict";
	  var __moduleName = "traceur-runtime@0.0.58/src/runtime/polyfills/Array";
	  var $__37 = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/ArrayIterator"),
	      entries = $__37.entries,
	      keys = $__37.keys,
	      values = $__37.values;
	  var $__38 = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/utils"),
	      checkIterable = $__38.checkIterable,
	      isCallable = $__38.isCallable,
	      isConstructor = $__38.isConstructor,
	      maybeAddFunctions = $__38.maybeAddFunctions,
	      maybeAddIterator = $__38.maybeAddIterator,
	      registerPolyfill = $__38.registerPolyfill,
	      toInteger = $__38.toInteger,
	      toLength = $__38.toLength,
	      toObject = $__38.toObject;
	  function from(arrLike) {
	    var mapFn = arguments[1];
	    var thisArg = arguments[2];
	    var C = this;
	    var items = toObject(arrLike);
	    var mapping = mapFn !== undefined;
	    var k = 0;
	    var arr,
	        len;
	    if (mapping && !isCallable(mapFn)) {
	      throw TypeError();
	    }
	    if (checkIterable(items)) {
	      arr = isConstructor(C) ? new C() : [];
	      for (var $__39 = items[Symbol.iterator](),
	          $__40; !($__40 = $__39.next()).done; ) {
	        var item = $__40.value;
	        {
	          if (mapping) {
	            arr[k] = mapFn.call(thisArg, item, k);
	          } else {
	            arr[k] = item;
	          }
	          k++;
	        }
	      }
	      arr.length = k;
	      return arr;
	    }
	    len = toLength(items.length);
	    arr = isConstructor(C) ? new C(len) : new Array(len);
	    for (; k < len; k++) {
	      if (mapping) {
	        arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
	      } else {
	        arr[k] = items[k];
	      }
	    }
	    arr.length = len;
	    return arr;
	  }
	  function of() {
	    for (var items = [],
	        $__41 = 0; $__41 < arguments.length; $__41++)
	      items[$__41] = arguments[$__41];
	    var C = this;
	    var len = items.length;
	    var arr = isConstructor(C) ? new C(len) : new Array(len);
	    for (var k = 0; k < len; k++) {
	      arr[k] = items[k];
	    }
	    arr.length = len;
	    return arr;
	  }
	  function fill(value) {
	    var start = arguments[1] !== (void 0) ? arguments[1] : 0;
	    var end = arguments[2];
	    var object = toObject(this);
	    var len = toLength(object.length);
	    var fillStart = toInteger(start);
	    var fillEnd = end !== undefined ? toInteger(end) : len;
	    fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
	    fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
	    while (fillStart < fillEnd) {
	      object[fillStart] = value;
	      fillStart++;
	    }
	    return object;
	  }
	  function find(predicate) {
	    var thisArg = arguments[1];
	    return findHelper(this, predicate, thisArg);
	  }
	  function findIndex(predicate) {
	    var thisArg = arguments[1];
	    return findHelper(this, predicate, thisArg, true);
	  }
	  function findHelper(self, predicate) {
	    var thisArg = arguments[2];
	    var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
	    var object = toObject(self);
	    var len = toLength(object.length);
	    if (!isCallable(predicate)) {
	      throw TypeError();
	    }
	    for (var i = 0; i < len; i++) {
	      if (i in object) {
	        var value = object[i];
	        if (predicate.call(thisArg, value, i, object)) {
	          return returnIndex ? i : value;
	        }
	      }
	    }
	    return returnIndex ? -1 : undefined;
	  }
	  function polyfillArray(global) {
	    var $__42 = global,
	        Array = $__42.Array,
	        Object = $__42.Object,
	        Symbol = $__42.Symbol;
	    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
	    maybeAddFunctions(Array, ['from', from, 'of', of]);
	    maybeAddIterator(Array.prototype, values, Symbol);
	    maybeAddIterator(Object.getPrototypeOf([].values()), function() {
	      return this;
	    }, Symbol);
	  }
	  registerPolyfill(polyfillArray);
	  return {
	    get from() {
	      return from;
	    },
	    get of() {
	      return of;
	    },
	    get fill() {
	      return fill;
	    },
	    get find() {
	      return find;
	    },
	    get findIndex() {
	      return findIndex;
	    },
	    get polyfillArray() {
	      return polyfillArray;
	    }
	  };
	});
	System.get("traceur-runtime@0.0.58/src/runtime/polyfills/Array" + '');
	System.register("traceur-runtime@0.0.58/src/runtime/polyfills/Object", [], function() {
	  "use strict";
	  var __moduleName = "traceur-runtime@0.0.58/src/runtime/polyfills/Object";
	  var $__43 = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/utils"),
	      maybeAddFunctions = $__43.maybeAddFunctions,
	      registerPolyfill = $__43.registerPolyfill;
	  var $__44 = $traceurRuntime,
	      defineProperty = $__44.defineProperty,
	      getOwnPropertyDescriptor = $__44.getOwnPropertyDescriptor,
	      getOwnPropertyNames = $__44.getOwnPropertyNames,
	      keys = $__44.keys,
	      privateNames = $__44.privateNames;
	  function is(left, right) {
	    if (left === right)
	      return left !== 0 || 1 / left === 1 / right;
	    return left !== left && right !== right;
	  }
	  function assign(target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];
	      var props = keys(source);
	      var p,
	          length = props.length;
	      for (p = 0; p < length; p++) {
	        var name = props[p];
	        if (privateNames[name])
	          continue;
	        target[name] = source[name];
	      }
	    }
	    return target;
	  }
	  function mixin(target, source) {
	    var props = getOwnPropertyNames(source);
	    var p,
	        descriptor,
	        length = props.length;
	    for (p = 0; p < length; p++) {
	      var name = props[p];
	      if (privateNames[name])
	        continue;
	      descriptor = getOwnPropertyDescriptor(source, props[p]);
	      defineProperty(target, props[p], descriptor);
	    }
	    return target;
	  }
	  function polyfillObject(global) {
	    var Object = global.Object;
	    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
	  }
	  registerPolyfill(polyfillObject);
	  return {
	    get is() {
	      return is;
	    },
	    get assign() {
	      return assign;
	    },
	    get mixin() {
	      return mixin;
	    },
	    get polyfillObject() {
	      return polyfillObject;
	    }
	  };
	});
	System.get("traceur-runtime@0.0.58/src/runtime/polyfills/Object" + '');
	System.register("traceur-runtime@0.0.58/src/runtime/polyfills/Number", [], function() {
	  "use strict";
	  var __moduleName = "traceur-runtime@0.0.58/src/runtime/polyfills/Number";
	  var $__45 = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/utils"),
	      isNumber = $__45.isNumber,
	      maybeAddConsts = $__45.maybeAddConsts,
	      maybeAddFunctions = $__45.maybeAddFunctions,
	      registerPolyfill = $__45.registerPolyfill,
	      toInteger = $__45.toInteger;
	  var $abs = Math.abs;
	  var $isFinite = isFinite;
	  var $isNaN = isNaN;
	  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
	  var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
	  var EPSILON = Math.pow(2, -52);
	  function NumberIsFinite(number) {
	    return isNumber(number) && $isFinite(number);
	  }
	  ;
	  function isInteger(number) {
	    return NumberIsFinite(number) && toInteger(number) === number;
	  }
	  function NumberIsNaN(number) {
	    return isNumber(number) && $isNaN(number);
	  }
	  ;
	  function isSafeInteger(number) {
	    if (NumberIsFinite(number)) {
	      var integral = toInteger(number);
	      if (integral === number)
	        return $abs(integral) <= MAX_SAFE_INTEGER;
	    }
	    return false;
	  }
	  function polyfillNumber(global) {
	    var Number = global.Number;
	    maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
	    maybeAddFunctions(Number, ['isFinite', NumberIsFinite, 'isInteger', isInteger, 'isNaN', NumberIsNaN, 'isSafeInteger', isSafeInteger]);
	  }
	  registerPolyfill(polyfillNumber);
	  return {
	    get MAX_SAFE_INTEGER() {
	      return MAX_SAFE_INTEGER;
	    },
	    get MIN_SAFE_INTEGER() {
	      return MIN_SAFE_INTEGER;
	    },
	    get EPSILON() {
	      return EPSILON;
	    },
	    get isFinite() {
	      return NumberIsFinite;
	    },
	    get isInteger() {
	      return isInteger;
	    },
	    get isNaN() {
	      return NumberIsNaN;
	    },
	    get isSafeInteger() {
	      return isSafeInteger;
	    },
	    get polyfillNumber() {
	      return polyfillNumber;
	    }
	  };
	});
	System.get("traceur-runtime@0.0.58/src/runtime/polyfills/Number" + '');
	System.register("traceur-runtime@0.0.58/src/runtime/polyfills/polyfills", [], function() {
	  "use strict";
	  var __moduleName = "traceur-runtime@0.0.58/src/runtime/polyfills/polyfills";
	  var polyfillAll = System.get("traceur-runtime@0.0.58/src/runtime/polyfills/utils").polyfillAll;
	  polyfillAll(this);
	  var setupGlobals = $traceurRuntime.setupGlobals;
	  $traceurRuntime.setupGlobals = function(global) {
	    setupGlobals(global);
	    polyfillAll(global);
	  };
	  return {};
	});
	System.get("traceur-runtime@0.0.58/src/runtime/polyfills/polyfills" + '');
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(45)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  createEngine: {get: function() {
	      return createEngine;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var createEngine = function(library, options) {
	  return new library.Engine(options);
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  Engine: {get: function() {
	      return Engine;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var Engine = function Engine() {
	  var options = arguments[0] !== (void 0) ? arguments[0] : {};
	  var $__0 = this;
	  this.devices = options.devices;
	  this._setStatus('stopped');
	  this._waiting = false;
	  this._nextTick_ = (function() {
	    $__0._nextTick.call($__0);
	  });
	};
	($traceurRuntime.createClass)(Engine, {
	  load: function() {
	    var options = arguments[this.load.length - 1] || {};
	    var autoResume = options.autoResume;
	    if (typeof autoResume === 'undefined')
	      autoResume = true;
	    if (this._status !== 'stopped')
	      this._setStatus('paused');
	    this._load.apply(this, arguments);
	    if (this._status !== 'paused')
	      this._setStatus('paused');
	    if (autoResume)
	      this.resume();
	    return this;
	  },
	  resume: function() {
	    if (this._status !== 'paused')
	      return;
	    this._setStatus('running');
	    if (!this._waiting) {
	      this._nextTick();
	    }
	  },
	  pause: function() {
	    if (this._status !== 'running')
	      return;
	    this._setStatus('paused');
	  },
	  one: function() {
	    if (this._status !== 'paused')
	      return;
	    this._setStatus('running');
	    this.step();
	    this._setStatus('paused');
	  },
	  stop: function() {
	    if (this._status !== 'running' && this._status !== 'paused')
	      return;
	    this._setStatus('stopped');
	  },
	  _setStatus: function(status) {
	    this._status = status;
	    if (typeof preprocess !== 'undefined' && (preprocess.events || []).indexOf('status') !== -1) {
	      this.emit('status', {status: status});
	    }
	  },
	  _nextTick: function() {
	    if (this._status !== 'running') {
	      this._waiting = false;
	    } else {
	      this.devices.timer.nextTick(this._nextTick_);
	      this.step();
	      this._waiting = true;
	    }
	  },
	  _load: function() {
	    throw new Error('The _load() method has to be implemented by the engine.');
	  }
	}, {});
	;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  EmitterMixin: {get: function() {
	      return EmitterMixin;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var EmitterMixin = function EmitterMixin() {
	  this._listeners = {'*': []};
	};
	($traceurRuntime.createClass)(EmitterMixin, {
	  on: function(event, callback, context) {
	    if (typeof this._listeners[event] === 'undefined')
	      this._listeners[event] = [];
	    this._listeners[event].push([callback, context]);
	  },
	  off: function(event, callback, context) {
	    if (typeof this._listeners[event] === 'undefined')
	      return;
	    var listeners = this._listeners[event];
	    for (var t = 0,
	        T = listeners.length; t < T; ++t)
	      if (listeners[t][0] === callback && listeners[t][1] === context)
	        break;
	    listeners.splice(listeners.findIndex((function($__1) {
	      var $__2 = $__1,
	          lCallback = $__2[0],
	          lContext = $__2[1];
	      return lCallback === callback && lContext === context;
	    })), 1);
	  },
	  emit: function(event, data) {
	    if (typeof this._listeners[event] === 'undefined')
	      return;
	    this._listeners[event].forEach((function($__1) {
	      var $__2 = $__1,
	          callback = $__2[0],
	          context = $__2[1];
	      callback.call(context, data);
	    }));
	    this._listeners['*'].forEach((function($__1) {
	      var $__2 = $__1,
	          callback = $__2[0],
	          context = $__2[1];
	      callback.call(context, event, data);
	    }));
	  }
	}, {});
	;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  RunnableMixin: {get: function() {
	      return RunnableMixin;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var RunnableMixin = function RunnableMixin() {
	  this._runTimer = null;
	};
	($traceurRuntime.createClass)(RunnableMixin, {run: function() {
	    if (this._runTimer)
	      return;
	    if (!this._canStart())
	      return;
	    this._start();
	  }}, {});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, module) {"use strict";
	Object.defineProperties(exports, {
	  fetchArrayBuffer: {get: function() {
	      return fetchArrayBuffer;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var base64DataUrl = /^data:[^;]*;base64,([a-zA-Z0-9+/]+={0,2})$/;
	function nodeToUint8() {
	  for (var buffers = [],
	      $__0 = 0; $__0 < arguments.length; $__0++)
	    buffers[$__0] = arguments[$__0];
	  var totalByteLength = buffers.reduce((function(sum, buffer) {
	    return sum + buffer.length;
	  }), 0);
	  var array = new Uint8Array(totalByteLength),
	      offset = 0;
	  buffers.forEach((function(buffer) {
	    for (var t = 0,
	        T = array.length; t < T; ++t)
	      array[offset++] = buffer[t];
	  }));
	  return array;
	}
	function binaryStringToUint8() {
	  for (var strings = [],
	      $__1 = 0; $__1 < arguments.length; $__1++)
	    strings[$__1] = arguments[$__1];
	  var totalByteLength = strings.reduce((function(sum, string) {
	    return sum + string.length;
	  }), 0);
	  var array = new Uint8Array(totalByteLength),
	      offset = 0;
	  strings.forEach((function(string) {
	    for (var t = 0,
	        T = string.length; t < T; ++t)
	      array[offset++] = string.charCodeAt(t);
	  }));
	  return array;
	}
	function fetchArrayBuffer(path) {
	  return new Promise((function(resolve, reject) {
	    var isBlob = typeof Blob !== 'undefined' && path instanceof Blob;
	    var isDataURI = typeof path === 'string' && path.match(base64DataUrl);
	    var isBrowser = typeof window !== 'undefined';
	    var isWeb = isBrowser || /^(https?:\/\/|blob:)/.test(path);
	    if (!isWeb && path.indexOf(':') !== -1)
	      throw new Error('Invalid protocol');
	    if (isBlob) {
	      var fileReader = new FileReader();
	      fileReader.addEventListener('load', (function(e) {
	        resolve(e.target.result);
	      }));
	      fileReader.addEventListener('error', (function(e) {
	        reject();
	      }));
	      fileReader.readAsArrayBuffer(path);
	    } else if (isDataURI) {
	      if (isBrowser) {
	        resolve(binaryStringToUint8(atob(isDataURI[1])).buffer);
	      } else {
	        resolve(nodeToUint8(new Buffer(isDataURI[1], 'base64')).buffer);
	      }
	    } else if (isBrowser) {
	      var xhr = new XMLHttpRequest();
	      xhr.open('GET', path, true);
	      xhr.responseType = 'arraybuffer';
	      xhr.onload = (function() {
	        return resolve(xhr.response);
	      });
	      xhr.onerror = (function() {
	        return reject(xhr.status);
	      });
	      xhr.send(null);
	    } else if (isWeb) {
	      var protocol = path.substr(0, path.indexOf(':'));
	      var web = module.require(protocol);
	      var buffers = [];
	      web.get(path, function(res) {
	        res.on('data', (function(chunk) {
	          buffers.push(chunk);
	        }));
	        res.on('error', (function(err) {
	          reject(err.message);
	        }));
	        res.on('end', (function() {
	          resolve(nodeToUint8.apply(null, $traceurRuntime.spread(buffers)).buffer);
	        }));
	      });
	    } else {
	      var fs = module.require('fs');
	      fs.readFile(path, (function(err, buffer) {
	        if (err) {
	          reject(err);
	        } else {
	          resolve(nodeToUint8(buffer).buffer);
	        }
	      }));
	    }
	  }));
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(46).Buffer, __webpack_require__(47)(module)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  formatRelativeAddress: {get: function() {
	      return formatRelativeAddress;
	    }},
	  formatDecimal: {get: function() {
	      return formatDecimal;
	    }},
	  formatString: {get: function() {
	      return formatString;
	    }},
	  formatAddress: {get: function() {
	      return formatAddress;
	    }},
	  formatHexadecimal: {get: function() {
	      return formatHexadecimal;
	    }},
	  formatBinary: {get: function() {
	      return formatBinary;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	function formatRelativeAddress(sourceAddress, relativeAddress, sourceBits, relativeBits) {
	  var sign = relativeAddress < 0 ? '-' : '+';
	  if (typeof relativeAddress !== 'string' || !isNaN(relativeAddress))
	    relativeAddress = formatAddress(Math.abs(relativeAddress), relativeBits, false);
	  return formatAddress(sourceAddress, sourceBits) + sign + relativeAddress;
	}
	;
	function formatDecimal(value, size) {
	  if (isNaN(value))
	    return 'NaN';
	  var str = Number(str).toString();
	  if (typeof size === 'undefined')
	    return str;
	  for (var t = str.length; t < size; ++t)
	    str = '0' + str;
	  return str;
	}
	;
	function formatString(str, size) {
	  var leftAligned = arguments[2] !== (void 0) ? arguments[2] : true;
	  str = str.toString();
	  if (typeof size === 'undefined')
	    return str;
	  for (var t = str.length; t < size; ++t) {
	    if (leftAligned) {
	      str += ' ';
	    } else {
	      str = ' ' + str;
	    }
	  }
	  return str;
	}
	;
	function formatAddress(address, bits) {
	  var withPrefix = arguments[2] !== (void 0) ? arguments[2] : true;
	  if (isNaN(address))
	    return 'NaN';
	  var str = Number(address).toString(16).toLowerCase();
	  if (typeof bits !== 'undefined')
	    while (str.length < Math.ceil(bits / 4))
	      str = '0' + str;
	  if (withPrefix)
	    str = '$' + str;
	  return str;
	}
	;
	function formatHexadecimal(value, bits) {
	  var withPrefix = arguments[2] !== (void 0) ? arguments[2] : true;
	  if (isNaN(value))
	    return 'NaN';
	  var str = Number(value).toString(16).toLowerCase();
	  if (typeof bits !== 'undefined')
	    while (str.length < Math.ceil(bits / 4))
	      str = '0' + str;
	  if (withPrefix)
	    str = '0x' + str;
	  return str;
	}
	;
	function formatBinary(value, bits) {
	  if (isNaN(value))
	    return 'NaN';
	  var str = Number(value).toString(2);
	  if (typeof bits !== 'undefined')
	    while (str.length < bits)
	      str = '0' + str;
	  return '0b' + str;
	}
	;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  memset: {get: function() {
	      return memset;
	    }},
	  __esModule: {value: true}
	});
	var $__FormatUtils__;
	__webpack_require__(2);
	var formatAddress = ($__FormatUtils__ = __webpack_require__(8), $__FormatUtils__ && $__FormatUtils__.__esModule && $__FormatUtils__ || {default: $__FormatUtils__}).formatAddress;
	function memset(destination, value, offset, size) {
	  for (var t = 0; t < size; ++t)
	    destination[offset + t] = value;
	  return destination;
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  createDefensiveProxy: {get: function() {
	      return createDefensiveProxy;
	    }},
	  mixin: {get: function() {
	      return mixin;
	    }},
	  serializeArrayBuffer: {get: function() {
	      return serializeArrayBuffer;
	    }},
	  serialize: {get: function() {
	      return serialize;
	    }},
	  unserializeArrayBuffer: {get: function() {
	      return unserializeArrayBuffer;
	    }},
	  unserialize: {get: function() {
	      return unserialize;
	    }},
	  clone: {get: function() {
	      return clone;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	function createDefensiveProxy(object) {
	  if (typeof Proxy === 'undefined') {
	    console.warn('Proxies are not available in your browser, and have been turned off.');
	    return object;
	  } else {
	    console.warn('Proxies are slows, and should not be enabled in production.');
	    return new Proxy(object, {
	      get: (function(target, property) {
	        if (property in target) {
	          return target[property];
	        } else {
	          throw new Error('Undefined property cannot be get: ' + property);
	        }
	      }),
	      set: (function(target, property, value) {
	        if (property in target) {
	          target[property] = value;
	        } else {
	          throw new Error('Undefined property cannot be set: ' + property);
	        }
	      })
	    });
	  }
	}
	function mixin(Base) {
	  for (var mixins = [],
	      $__7 = 1; $__7 < arguments.length; $__7++)
	    mixins[$__7 - 1] = arguments[$__7];
	  if (!Base)
	    Base = (($traceurRuntime.createClass)(function() {}, {}, {}));
	  var mixed = (function($__super) {
	    var $__1 = function() {
	      for (var parameters = [],
	          $__8 = 0; $__8 < arguments.length; $__8++)
	        parameters[$__8] = arguments[$__8];
	      var $__0 = this;
	      $traceurRuntime.superCall(this, $__1.prototype, "constructor", $traceurRuntime.spread(parameters));
	      mixins.forEach((function(mixin) {
	        mixin.call($__0);
	      }));
	    };
	    return ($traceurRuntime.createClass)($__1, {}, {}, $__super);
	  }(Base));
	  for (var $__5 = mixins[Symbol.iterator](),
	      $__6; !($__6 = $__5.next()).done; ) {
	    var mixin = $__6.value;
	    {
	      for (var $__3 = Object.keys(mixin.prototype)[Symbol.iterator](),
	          $__4; !($__4 = $__3.next()).done; ) {
	        var method = $__4.value;
	        {
	          mixed.prototype[method] = mixin.prototype[method];
	        }
	      }
	    }
	  }
	  return mixed;
	}
	;
	function serializeArrayBuffer(arrayBuffer) {
	  var serialization = '';
	  for (var array = new Uint8Array(arrayBuffer),
	      t = 0,
	      T = array.length; t < T; ++t)
	    serialization += String.fromCharCode(array[t]);
	  return serialization;
	}
	function serialize(data) {
	  var getFormat = (function(data) {
	    return Object.keys(data).reduce((function(format, key) {
	      var value = data[key];
	      if (value instanceof ArrayBuffer) {
	        format[key] = 'arraybuffer';
	      } else if (value && value.constructor === Object) {
	        format[key] = getFormat(value);
	      } else {
	        format[key] = null;
	      }
	      return format;
	    }), {});
	  });
	  var simplify = (function(data) {
	    return Object.keys(data).reduce((function(simplified, key) {
	      var value = data[key];
	      if (value instanceof ArrayBuffer) {
	        simplified[key] = serializeArrayBuffer(value);
	      } else if (value && value.constructor === Object) {
	        simplified[key] = simplify(value);
	      } else {
	        simplified[key] = value;
	      }
	      return simplified;
	    }), {});
	  });
	  return JSON.stringify({
	    format: getFormat(data),
	    tree: simplify(data)
	  });
	}
	function unserializeArrayBuffer(serialization) {
	  var buffer = new ArrayBuffer(serialization.length);
	  var bufferView = new Uint8Array(buffer);
	  for (var t = 0,
	      T = bufferView.length; t < T; ++t)
	    bufferView[t] = serialization.charCodeAt(t);
	  return bufferView.buffer;
	}
	function unserialize(serialization) {
	  var complexify = (function(format, tree) {
	    return Object.keys(format).reduce((function(complexified, key) {
	      var type = format[key];
	      var node = tree[key];
	      if (type === 'arraybuffer') {
	        complexified[key] = unserializeArrayBuffer(node);
	      } else if (type && type.constructor === Object) {
	        complexified[key] = complexify(type, node);
	      } else {
	        complexified[key] = node;
	      }
	      return complexified;
	    }), {});
	  });
	  var $__9 = typeof serialization === 'object' ? serialization : JSON.parse(serialization),
	      format = $__9.format,
	      tree = $__9.tree;
	  return complexify(format, tree);
	}
	function clone(input) {
	  if (typeof input !== 'object')
	    return input;
	  if (input instanceof Array)
	    return input.map((function(value) {
	      return clone(value);
	    }));
	  if (input instanceof ArrayBuffer)
	    return input.slice(0);
	  var output = {};
	  for (var $__3 = Object.keys(input)[Symbol.iterator](),
	      $__4; !($__4 = $__3.next()).done; ) {
	    var key = $__4.value;
	    output[key] = clone(input[key]);
	  }
	  return output;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  toSigned8: {get: function() {
	      return toSigned8;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var toSigned8 = (function() {
	  var tmp = new Int8Array(1);
	  return function(n) {
	    tmp[0] = n;
	    return tmp[0];
	  };
	})();


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  Engine: {get: function() {
	      return Engine;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47__46__46__47_core_47_Engine__,
	    $___46__46__47__46__46__47_devices_47_inputs_47_NullInput__,
	    $___46__46__47__46__46__47_devices_47_screens_47_NullScreen__,
	    $___46__46__47__46__46__47_devices_47_timers_47_SerialTimer__,
	    $___46__46__47__46__46__47_mixins_47_EmitterMixin__,
	    $___46__46__47__46__46__47_utils_47_ObjectUtils__,
	    $__components_47_GPU__,
	    $__components_47_KeyIO__,
	    $__components_47_MMU__,
	    $__Environment__,
	    $__Interpreter__,
	    $__tools__;
	__webpack_require__(2);
	var BaseEngine = ($___46__46__47__46__46__47_core_47_Engine__ = __webpack_require__(4), $___46__46__47__46__46__47_core_47_Engine__ && $___46__46__47__46__46__47_core_47_Engine__.__esModule && $___46__46__47__46__46__47_core_47_Engine__ || {default: $___46__46__47__46__46__47_core_47_Engine__}).Engine;
	var NullInput = ($___46__46__47__46__46__47_devices_47_inputs_47_NullInput__ = __webpack_require__(37), $___46__46__47__46__46__47_devices_47_inputs_47_NullInput__ && $___46__46__47__46__46__47_devices_47_inputs_47_NullInput__.__esModule && $___46__46__47__46__46__47_devices_47_inputs_47_NullInput__ || {default: $___46__46__47__46__46__47_devices_47_inputs_47_NullInput__}).NullInput;
	var NullScreen = ($___46__46__47__46__46__47_devices_47_screens_47_NullScreen__ = __webpack_require__(39), $___46__46__47__46__46__47_devices_47_screens_47_NullScreen__ && $___46__46__47__46__46__47_devices_47_screens_47_NullScreen__.__esModule && $___46__46__47__46__46__47_devices_47_screens_47_NullScreen__ || {default: $___46__46__47__46__46__47_devices_47_screens_47_NullScreen__}).NullScreen;
	var SerialTimer = ($___46__46__47__46__46__47_devices_47_timers_47_SerialTimer__ = __webpack_require__(44), $___46__46__47__46__46__47_devices_47_timers_47_SerialTimer__ && $___46__46__47__46__46__47_devices_47_timers_47_SerialTimer__.__esModule && $___46__46__47__46__46__47_devices_47_timers_47_SerialTimer__ || {default: $___46__46__47__46__46__47_devices_47_timers_47_SerialTimer__}).SerialTimer;
	var EmitterMixin = ($___46__46__47__46__46__47_mixins_47_EmitterMixin__ = __webpack_require__(5), $___46__46__47__46__46__47_mixins_47_EmitterMixin__ && $___46__46__47__46__46__47_mixins_47_EmitterMixin__.__esModule && $___46__46__47__46__46__47_mixins_47_EmitterMixin__ || {default: $___46__46__47__46__46__47_mixins_47_EmitterMixin__}).EmitterMixin;
	var $__5 = ($___46__46__47__46__46__47_utils_47_ObjectUtils__ = __webpack_require__(10), $___46__46__47__46__46__47_utils_47_ObjectUtils__ && $___46__46__47__46__46__47_utils_47_ObjectUtils__.__esModule && $___46__46__47__46__46__47_utils_47_ObjectUtils__ || {default: $___46__46__47__46__46__47_utils_47_ObjectUtils__}),
	    createDefensiveProxy = $__5.createDefensiveProxy,
	    mixin = $__5.mixin;
	var GPU = ($__components_47_GPU__ = __webpack_require__(22), $__components_47_GPU__ && $__components_47_GPU__.__esModule && $__components_47_GPU__ || {default: $__components_47_GPU__}).GPU;
	var KeyIO = ($__components_47_KeyIO__ = __webpack_require__(23), $__components_47_KeyIO__ && $__components_47_KeyIO__.__esModule && $__components_47_KeyIO__ || {default: $__components_47_KeyIO__}).KeyIO;
	var MMU = ($__components_47_MMU__ = __webpack_require__(24), $__components_47_MMU__ && $__components_47_MMU__.__esModule && $__components_47_MMU__ || {default: $__components_47_MMU__}).MMU;
	var Environment = ($__Environment__ = __webpack_require__(13), $__Environment__ && $__Environment__.__esModule && $__Environment__ || {default: $__Environment__}).Environment;
	var Interpreter = ($__Interpreter__ = __webpack_require__(14), $__Interpreter__ && $__Interpreter__.__esModule && $__Interpreter__ || {default: $__Interpreter__}).Interpreter;
	var fixRomSize = ($__tools__ = __webpack_require__(16), $__tools__ && $__tools__.__esModule && $__tools__ || {default: $__tools__}).fixRomSize;
	var Engine = function Engine() {
	  var $__15,
	      $__16,
	      $__17;
	  var $__14 = arguments[0] !== (void 0) ? arguments[0] : {},
	      devices = ($__15 = $__14.devices) === void 0 ? {} : $__15,
	      advanced = ($__16 = $__14.advanced) === void 0 ? {} : $__16,
	      events = ($__17 = $__14.events) === void 0 ? [] : $__17;
	  $traceurRuntime.superCall(this, $Engine.prototype, "constructor", []);
	  this._startEvent = !!~events.indexOf('start') ? {} : null;
	  this._stopEvent = !!~events.indexOf('start') ? {} : null;
	  this._setupEvent = !!~events.indexOf('setup') ? {} : null;
	  this._errorEvent = !!~events.indexOf('error') ? {error: null} : null;
	  this._debugMode = Boolean(advanced.debugMode);
	  this.screen = devices.screen || new NullScreen();
	  this.timer = devices.timer || new SerialTimer();
	  this.input = devices.input || new NullInput();
	  this.gpu = new GPU({screen: this.screen});
	  this.keyio = new KeyIO({input: this.input});
	  this.mmu = new MMU({events: events});
	  this.interpreter = new Interpreter({
	    engine: this,
	    events: events
	  });
	  this.mmu.link({
	    keyio: this.keyio,
	    gpu: this.gpu
	  });
	  this.gpu.link({mmu: this.mmu});
	  this.interpreter.link({
	    mmu: this.mmu,
	    gpu: this.gpu
	  });
	  this._runTimer = null;
	};
	var $Engine = Engine;
	($traceurRuntime.createClass)(Engine, {
	  setup: function(environment) {
	    try {
	      this.environment = environment;
	      this.interpreter.setup(this.environment);
	      this.gpu.setup(this.environment);
	      this.keyio.setup(this.environment);
	      this.mmu.setup(this.environment);
	    } catch (err) {
	      this.environment = null;
	      if (this._errorEvent) {
	        this._errorEvent.error = err;
	        this.emit('error', this._errorEvent);
	      }
	      throw err;
	    }
	    if (this._setupEvent) {
	      this.emit('setup', this._setupEvent);
	    }
	  },
	  loadArrayBuffer: function(arrayBuffer) {
	    var $__16;
	    var $__15 = arguments[1] !== (void 0) ? arguments[1] : {},
	        initialState = $__15.initialState,
	        autoStart = ($__16 = $__15.autoStart) === void 0 ? true : $__16;
	    var environment = new Environment({
	      romBuffer: fixRomSize(arrayBuffer),
	      initialState: initialState
	    });
	    if (this._debugMode)
	      environment = createDefensiveProxy(environment);
	    this.setup(environment);
	    if (autoStart) {
	      this.run();
	    }
	  },
	  disassembleAt: function(address) {
	    return this.interpreter.disassembleAt(address);
	  },
	  isRunning: function() {
	    return this._runTimer !== null;
	  },
	  stop: function() {
	    if (!this._runTimer)
	      return;
	    this.interpreter.endFrame();
	    this.timer.cancelTick(this._runTimer);
	    this._runTimer = null;
	    if (this._stopEvent) {
	      this.emit('stop', this._stopEvent);
	    }
	  },
	  run: function() {
	    var $__12 = this;
	    if (this._runTimer)
	      return;
	    if (!this.environment)
	      return;
	    var run = (function() {
	      $__12._runTimer = $__12.timer.nextTick(entry);
	      $__12.interpreter.runFrame();
	    });
	    var tryRun = (function() {
	      try {
	        run();
	      } catch (err) {
	        $__12.stop();
	        $__12._errorEvent.error = err;
	        $__12.emit('error', $__12._errorEvent);
	      }
	    });
	    if (this._startEvent)
	      this.emit('start', this._startEvent);
	    var entry = this._errorEvent ? tryRun : run;
	    this._runTimer = this.timer.nextTick(entry);
	  }
	}, {}, mixin(null, EmitterMixin));
	;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  Environment: {get: function() {
	      return Environment;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47__46__46__47_utils_47_MemoryUtils__,
	    $___46__46__47__46__46__47_utils_47_ObjectUtils__,
	    $__components_47_GPU__;
	__webpack_require__(2);
	var memset = ($___46__46__47__46__46__47_utils_47_MemoryUtils__ = __webpack_require__(9), $___46__46__47__46__46__47_utils_47_MemoryUtils__ && $___46__46__47__46__46__47_utils_47_MemoryUtils__.__esModule && $___46__46__47__46__46__47_utils_47_MemoryUtils__ || {default: $___46__46__47__46__46__47_utils_47_MemoryUtils__}).memset;
	var clone = ($___46__46__47__46__46__47_utils_47_ObjectUtils__ = __webpack_require__(10), $___46__46__47__46__46__47_utils_47_ObjectUtils__ && $___46__46__47__46__46__47_utils_47_ObjectUtils__.__esModule && $___46__46__47__46__46__47_utils_47_ObjectUtils__ || {default: $___46__46__47__46__46__47_utils_47_ObjectUtils__}).clone;
	var VBLANK_MODE = ($__components_47_GPU__ = __webpack_require__(22), $__components_47_GPU__ && $__components_47_GPU__.__esModule && $__components_47_GPU__ || {default: $__components_47_GPU__}).VBLANK_MODE;
	var Environment = function Environment() {
	  var $__7 = arguments[0] !== (void 0) ? arguments[0] : {},
	      romBuffer = $__7.romBuffer,
	      initialState = $__7.initialState;
	  var $__3 = this;
	  this.pc = 0x0100;
	  this.sp = 0xFFFE;
	  this.a = 0x11;
	  this.f = 0xB0;
	  this.b = 0x00;
	  this.c = 0x13;
	  this.d = 0x00;
	  this.e = 0xD8;
	  this.h = 0x01;
	  this.l = 0x4D;
	  this.pendingInterrupts = 0;
	  this.enabledInterrupts = 0;
	  this.romBuffer = romBuffer;
	  this.ramBuffer = new ArrayBuffer(8192 * 16);
	  this.hramBuffer = new ArrayBuffer(127);
	  this.wramBuffer = memset(new ArrayBuffer(4096 * 8), 0xFF, 0, 4096 * 8);
	  this.vramBuffer = new ArrayBuffer(8192 * 2);
	  this.oamBuffer = new ArrayBuffer(175);
	  this.cgbUnlocked = new Uint8Array(this.romBuffer)[0x0143] & 0x80;
	  this.cgbCurrentSpeed = 0;
	  this.cgbPrepareSpeedSwitch = 0;
	  this.cgbVramBank = 0;
	  this.cgbVramDmaSource = 0x0000;
	  this.cgbVramDmaDestination = 0x0000;
	  this.cgbVramDmaLength = 0;
	  this.cgbVramDmaStatus = 1;
	  this.cgbBackgroundCgbPalettes = new Uint8Array(8 * 4 * 2);
	  this.cgbBackgroundRgbPalettes = [[0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000]];
	  this.cgbBackgroundPaletteOffset = 0;
	  this.cgbBackgroundPaletteIncrement = false;
	  this.cgbSpriteCgbPalettes = new Uint8Array(8 * 4 * 2);
	  this.cgbSpriteRgbPalettes = [[0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000], [0x000000, 0x000000, 0x000000, 0x000000]];
	  this.cgbSpritePaletteOffset = 0;
	  this.cgbSpritePaletteIncrement = false;
	  this.mmuWramBank = 1;
	  this.mbcMode = 0;
	  this.mbcRamFeature = false;
	  this.mbcRtc = [0, 0, 0, 0, 0];
	  this.mbcRomBank = 0;
	  this.mbcRamBank = 0;
	  this.mbcRtcIndex = 0;
	  this.cpuInterruptSwitch = false;
	  this.cpuInterruptSwitchDelay = -1;
	  this.cpuInterruptFeature = false;
	  this.cpuStop = false;
	  this.cpuHalt = false;
	  this.ioKeyColumn = 0x00;
	  this.gpuLcdFeature = true;
	  this.gpuBackgroundFeature = true;
	  this.gpuSpriteFeature = false;
	  this.gpuWindowFeature = false;
	  this.gpuSpriteSize = 0;
	  this.gpuTilesetBase = 1;
	  this.gpuBackgroundBase = 0;
	  this.gpuWindowBase = 0;
	  this.gpuInterrupts = 0x80;
	  this.gpuMode = VBLANK_MODE;
	  this.gpuClock = 296;
	  this.gpuLine = 144;
	  this.gpuLy = 144;
	  this.gpuLyc = 0;
	  this.gpuBgScroll = [0, 0];
	  this.gpuWindowPosition = [0, 0];
	  this.gpuCoincidence = false;
	  this.gpuPalettes = [0x00, 0x00, 0x00];
	  this.timerDivider = 0;
	  this.timerDividerBuffer = 0;
	  this.timerCounter = 0;
	  this.timerCounterBuffer = 0;
	  this.timerCounterFrequency = 0;
	  this.timerCounterFeature = false;
	  this.timerCounterModulo = 0;
	  this.timerCounterControl = 0;
	  var merge = (function(high, low) {
	    return ({get: (function() {
	        return ($__3[high] << 8) | ($__3[low]);
	      })});
	  });
	  Object.defineProperty(this, 'af', merge('a', 'f'));
	  Object.defineProperty(this, 'bc', merge('b', 'c'));
	  Object.defineProperty(this, 'de', merge('d', 'e'));
	  Object.defineProperty(this, 'hl', merge('h', 'l'));
	  if (initialState != null) {
	    this.loadState(initialState);
	  }
	};
	($traceurRuntime.createClass)(Environment, {
	  saveState: function() {
	    var dataStore = {};
	    var ignoredProperties = ['romBuffer'];
	    for (var $__5 = Object.keys(this)[Symbol.iterator](),
	        $__6; !($__6 = $__5.next()).done; ) {
	      var key = $__6.value;
	      if (ignoredProperties.indexOf(key) === -1)
	        dataStore[key] = this[key];
	    }
	    return dataStore;
	  },
	  loadState: function(state) {
	    for (var $__5 = Object.keys(state)[Symbol.iterator](),
	        $__6; !($__6 = $__5.next()).done; ) {
	      var key = $__6.value;
	      {
	        this[key] = clone(state[key]);
	      }
	    }
	  }
	}, {});


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	Object.defineProperties(exports, {
	  NORMAL_SPEED: {get: function() {
	      return NORMAL_SPEED;
	    }},
	  DOUBLE_SPEED: {get: function() {
	      return DOUBLE_SPEED;
	    }},
	  Interpreter: {get: function() {
	      return Interpreter;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47__46__46__47_mixins_47_EmitterMixin__,
	    $___46__46__47__46__46__47_utils_47_FormatUtils__,
	    $___46__46__47__46__46__47_utils_47_ObjectUtils__,
	    $__compilation_47_templates_47_assembly__,
	    $__compilation_47_templates_47_javascript__,
	    $__compilation_47_InterpreterHelpers__,
	    $__compilation_47_instructions__,
	    $__compilation_47_instructions__,
	    $__components_47_GPU__;
	__webpack_require__(2);
	var EmitterMixin = ($___46__46__47__46__46__47_mixins_47_EmitterMixin__ = __webpack_require__(5), $___46__46__47__46__46__47_mixins_47_EmitterMixin__ && $___46__46__47__46__46__47_mixins_47_EmitterMixin__.__esModule && $___46__46__47__46__46__47_mixins_47_EmitterMixin__ || {default: $___46__46__47__46__46__47_mixins_47_EmitterMixin__}).EmitterMixin;
	var formatHexadecimal = ($___46__46__47__46__46__47_utils_47_FormatUtils__ = __webpack_require__(8), $___46__46__47__46__46__47_utils_47_FormatUtils__ && $___46__46__47__46__46__47_utils_47_FormatUtils__.__esModule && $___46__46__47__46__46__47_utils_47_FormatUtils__ || {default: $___46__46__47__46__46__47_utils_47_FormatUtils__}).formatHexadecimal;
	var mixin = ($___46__46__47__46__46__47_utils_47_ObjectUtils__ = __webpack_require__(10), $___46__46__47__46__46__47_utils_47_ObjectUtils__ && $___46__46__47__46__46__47_utils_47_ObjectUtils__.__esModule && $___46__46__47__46__46__47_utils_47_ObjectUtils__ || {default: $___46__46__47__46__46__47_utils_47_ObjectUtils__}).mixin;
	var assemblyTemplates = ($__compilation_47_templates_47_assembly__ = __webpack_require__(20), $__compilation_47_templates_47_assembly__ && $__compilation_47_templates_47_assembly__.__esModule && $__compilation_47_templates_47_assembly__ || {default: $__compilation_47_templates_47_assembly__}).templates;
	var javascriptTemplates = ($__compilation_47_templates_47_javascript__ = __webpack_require__(21), $__compilation_47_templates_47_javascript__ && $__compilation_47_templates_47_javascript__.__esModule && $__compilation_47_templates_47_javascript__ || {default: $__compilation_47_templates_47_javascript__}).templates;
	var InterpreterHelpers = ($__compilation_47_InterpreterHelpers__ = __webpack_require__(18), $__compilation_47_InterpreterHelpers__ && $__compilation_47_InterpreterHelpers__.__esModule && $__compilation_47_InterpreterHelpers__ || {default: $__compilation_47_InterpreterHelpers__}).InterpreterHelpers;
	var $__6 = ($__compilation_47_instructions__ = __webpack_require__(19), $__compilation_47_instructions__ && $__compilation_47_instructions__.__esModule && $__compilation_47_instructions__ || {default: $__compilation_47_instructions__}),
	    instructions = $__6.instructions,
	    cbInstructions = $__6.cbInstructions;
	var $__7 = ($__compilation_47_instructions__ = __webpack_require__(19), $__compilation_47_instructions__ && $__compilation_47_instructions__.__esModule && $__compilation_47_instructions__ || {default: $__compilation_47_instructions__}),
	    x8_t = $__7.x8_t,
	    i8_t = $__7.i8_t,
	    u8_t = $__7.u8_t,
	    u16_t = $__7.u16_t;
	var $__8 = ($__components_47_GPU__ = __webpack_require__(22), $__components_47_GPU__ && $__components_47_GPU__.__esModule && $__components_47_GPU__ || {default: $__components_47_GPU__}),
	    VBLANK_MODE = $__8.VBLANK_MODE,
	    CYCLES_PER_VBLANK_LINE = $__8.CYCLES_PER_VBLANK_LINE;
	var interruptLocations = new Uint16Array(256);
	interruptLocations[1 << 0] = 0x0040;
	interruptLocations[1 << 1] = 0x0048;
	interruptLocations[1 << 2] = 0x0050;
	interruptLocations[1 << 3] = 0x0060;
	var NORMAL_SPEED = 0;
	var DOUBLE_SPEED = 1;
	function getInstructionSize(parameters) {
	  return parameters.reduce((function(sum, parameter) {
	    switch (parameter) {
	      case x8_t:
	        return sum + 1;
	      case i8_t:
	        return sum + 1;
	      case u8_t:
	        return sum + 1;
	      case u16_t:
	        return sum + 2;
	      default:
	        return sum;
	    }
	  }), 0);
	}
	function getInstructionStaticArguments(parameters, address, mmu) {
	  var parameterOffset = 0;
	  var getParameterOffset = (function(size) {
	    var offset = parameterOffset;
	    parameterOffset += 1;
	    return offset;
	  });
	  return parameters.map((function(parameter) {
	    switch (parameter) {
	      case x8_t:
	        return null;
	      case i8_t:
	        return mmu.readInt8(address + getParameterOffset(1));
	      case u8_t:
	        return mmu.readUint8(address + getParameterOffset(1));
	      case u16_t:
	        return mmu.readUint16(address + getParameterOffset(2));
	      default:
	        return parameter;
	    }
	  })).filter((function(value) {
	    return value !== null;
	  }));
	}
	function getInstructionDynamicArguments(parameters, address) {
	  var parameterOffset = 0;
	  var getParameterOffset = (function(size) {
	    var offset = parameterOffset;
	    parameterOffset += 1;
	    return offset;
	  });
	  return parameters.map((function(parameter) {
	    switch (parameter) {
	      case i8_t:
	        return ("interpreter._mmu.readInt8(address + " + getParameterOffset(1) + ")");
	      case u8_t:
	        return ("interpreter._mmu.readUint8(address + " + getParameterOffset(1) + ")");
	      case u16_t:
	        return ("interpreter._mmu.readUint16(address + " + getParameterOffset(2) + ")");
	      default:
	        return parameter;
	    }
	  }));
	}
	var Interpreter = function Interpreter($__12) {
	  var $__14;
	  var $__13 = $__12,
	      engine = $__13.engine,
	      events = ($__14 = $__13.events) === void 0 ? [] : $__14;
	  $traceurRuntime.superCall(this, $Interpreter.prototype, "constructor", []);
	  this._engine = engine;
	  this._helpers = new InterpreterHelpers();
	  this._instructions = this._importInstructions(instructions);
	  this._instructionEvent = !!~events.indexOf('instruction') ? {} : null;
	  this._postInstructionEvent = !!~events.indexOf('instruction') ? {} : null;
	  this._mmu = null;
	  this._gpu = null;
	  this._environment = null;
	};
	var $Interpreter = Interpreter;
	($traceurRuntime.createClass)(Interpreter, {
	  link: function($__12) {
	    var $__14 = $__12,
	        mmu = $__14.mmu,
	        gpu = $__14.gpu;
	    this._mmu = mmu;
	    this._gpu = gpu;
	  },
	  setup: function(environment) {
	    this._environment = environment;
	  },
	  disassembleAt: function(address) {
	    var address = address;
	    var opcode = this._mmu.readUint8(address);
	    if (opcode === 0xCB)
	      opcode = 0xCB00 | this._mmu.readUint8(address + 1);
	    var $__12 = instructions[opcode],
	        type = $__12[0],
	        parameters = $__12[1],
	        flags = $__12[2];
	    var size = getInstructionSize(parameters);
	    var args = getInstructionStaticArguments(parameters, address + 1, this._mmu);
	    var assembly = type !== null ? assemblyTemplates[type](address, address + size, args) : ("<invalid opcode " + formatHexadecimal(opcode, 8) + ">");
	    return {
	      type: type,
	      opcode: opcode,
	      flags: flags,
	      begin: address,
	      end: address + size + 1,
	      size: size + 1,
	      parameters: args,
	      assembly: assembly
	    };
	  },
	  runFrame: function() {
	    var environment = this._environment;
	    for (this._running = true; this._running; ) {
	      if (environment.cpuHalt) {
	        this._applyClockCycles(1);
	        this._triggerInterrupts();
	      } else {
	        var address = environment.pc;
	        var opcode = this._mmu.readUint8(address);
	        if (opcode === 0xCB)
	          opcode = 0xCB00 | this._mmu.readUint8(address + 1);
	        if (this._instructionEvent) {
	          this._triggerInstructionEvent(address, opcode);
	          if (this._instructionEvent.breakRequested) {
	            this._engine.stop();
	            continue;
	          }
	        }
	        var functor = this._instructions[opcode];
	        environment.pc = functor(this, environment, address);
	        this._triggerInterrupts();
	        if (this._postInstructionEvent) {
	          this._triggerPostInstructionEvent(address, opcode);
	        }
	      }
	    }
	  },
	  endFrame: function() {
	    this._running = false;
	  },
	  _importInstructions: function(instructions) {
	    var script = '/* Will contain the code required to fill the instruction array */';
	    var opcodes = Object.keys(instructions);
	    var functors = new Array(opcodes.length);
	    for (var $__10 = opcodes[Symbol.iterator](),
	        $__11; !($__11 = $__10.next()).done; ) {
	      var opcode = $__11.value;
	      {
	        var code = this._craftInstructionFunctor(instructions[opcode]);
	        script += ("functors[" + opcode + "] = " + code + ";");
	      }
	    }
	    var generator = this._compileFunction('functors', script);
	    return generator(functors), functors;
	  },
	  _craftInstructionFunctor: function($__12) {
	    var $__14 = $__12,
	        type = $__14[0],
	        parameters = $__14[1],
	        flags = $__14[2];
	    if (!type || type === 'PREFIX_CB')
	      return null;
	    var argumentOffset = 1;
	    var offset = (function(increment) {
	      var currentOffset = argumentOffset;
	      argumentOffset += increment;
	      return currentOffset;
	    });
	    var size = parameters.reduce((function(sum, parameter) {
	      switch (parameter) {
	        case x8_t:
	          return sum + 1;
	        case i8_t:
	          return sum + 1;
	        case u8_t:
	          return sum + 1;
	        case u16_t:
	          return sum + 2;
	        default:
	          return sum;
	      }
	    }), 1);
	    var args = parameters.map((function(parameter) {
	      switch (parameter) {
	        case x8_t:
	          return null;
	        case i8_t:
	          return ("interpreter._mmu.readInt8(address + " + offset(1) + ")");
	        case u8_t:
	          return ("interpreter._mmu.readUint8(address + " + offset(1) + ")");
	        case u16_t:
	          return ("interpreter._mmu.readUint16(address + " + offset(2) + ")");
	        default:
	          return parameter;
	      }
	    })).filter((function(value) {
	      return value !== null;
	    }));
	    var address = 'address';
	    var nextAddress = this._helpers.add16('address', size);
	    var body = javascriptTemplates[type](address, nextAddress, args, this._helpers);
	    var epilogue = this._helpers.jumpTo(nextAddress);
	    return ("(function (interpreter, environment, address) { " + (body + epilogue) + " })");
	  },
	  _compileFunction: function(parameters, body) {
	    var g = typeof global !== 'undefined' ? global : window;
	    return g.eval(("(function (" + parameters + ") { " + body + " })"));
	  },
	  _triggerInstructionEvent: function(address, opcode) {
	    this._instructionEvent.address = address;
	    this._instructionEvent.opcode = opcode;
	    this._instructionEvent.breakRequested = false;
	    this.emit('instruction', this._instructionEvent);
	    return this._instructionEvent;
	  },
	  _triggerPostInstructionEvent: function(address, opcode) {
	    this._postInstructionEvent.address = address;
	    this._postInstructionEvent.opcode = opcode;
	    this.emit('post-instruction', this._postInstructionEvent);
	    return this._postInstructionEvent;
	  },
	  _triggerInterrupts: function() {
	    var environment = this._environment;
	    if (environment.cpuInterruptSwitchDelay >= 0)
	      if (--environment.cpuInterruptSwitchDelay === -1)
	        environment.cpuInterruptFeature = environment.cpuInterruptSwitch;
	    var enabledInterrupts = environment.enabledInterrupts;
	    var pendingInterrupts = environment.pendingInterrupts;
	    var firedInterrupts = pendingInterrupts & enabledInterrupts;
	    if (!firedInterrupts)
	      return;
	    environment.cpuStop = environment.cpuHalt = false;
	    if (!environment.cpuInterruptFeature)
	      return;
	    environment.cpuInterruptFeature = false;
	    var interrupt = firedInterrupts & (~firedInterrupts + 1);
	    environment.pendingInterrupts ^= interrupt;
	    environment.sp = (environment.sp - 2) & 0xFFFF;
	    this._mmu.writeUint8(environment.sp + 0, (environment.pc & 0x00FF) >>> 0);
	    this._mmu.writeUint8(environment.sp + 1, (environment.pc & 0xFF00) >>> 8);
	    environment.pc = interruptLocations[interrupt];
	    this._applyClockCycles(20);
	  },
	  _applyClockCycles: function(count) {
	    var environment = this._environment;
	    if (environment.cgbUnlocked && environment.cgbCurrentSpeed)
	      count /= 2;
	    if (environment.gpuLcdFeature) {
	      environment.gpuClock -= count;
	      if (environment.gpuMode === VBLANK_MODE && environment.gpuLy === 153 && CYCLES_PER_VBLANK_LINE - environment.gpuClock >= 8)
	        this._gpu.setLy(0);
	      if (environment.gpuClock <= 0) {
	        if (this._gpu.nextMode()) {
	          this._running = false;
	        }
	      }
	    }
	    if (true) {
	      environment.timerDividerBuffer += count;
	      while (environment.timerDividerBuffer >= 256) {
	        environment.timerDividerBuffer -= 256;
	        environment.timerDivider = ((environment.timerDivider + 1) & 0xFF) >>> 0;
	      }
	    }
	    if (environment.timerCounterFeature) {
	      environment.timerCounterBuffer += count;
	      while (environment.timerCounterBuffer >= environment.timerCounterFrequency) {
	        environment.timerCounterBuffer -= environment.timerCounterFrequency;
	        environment.timerCounter = ((environment.timerCounter + 1) & 0xFF) >>> 0;
	        if (environment.timerCounter === 0) {
	          environment.timerCounter = environment.timerCounterModulo;
	          environment.pendingInterrupts |= 0x04;
	        }
	      }
	    }
	  }
	}, {}, mixin(null, EmitterMixin));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  inputs: {get: function() {
	      return inputs;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var inputs = {
	  RIGHT: 0x21,
	  LEFT: 0x22,
	  UP: 0x24,
	  DOWN: 0x28,
	  A: 0x11,
	  B: 0x12,
	  SELECT: 0x14,
	  START: 0x18
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  fixRomSize: {get: function() {
	      return fixRomSize;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	function fixRomSize(romBuffer) {
	  if (romBuffer.byteLength % 0x4000 === 0)
	    return romBuffer;
	  var source = new Uint8Array(romBuffer);
	  var destination = new Uint8Array(Math.ceil(romBuffer.byteLength / 0x4000) * 0x4000);
	  for (var t = 0,
	      T = romBuffer.byteLength; t < T; ++t)
	    destination[t] = source[t];
	  return destination.buffer;
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  full16BitRegisters: {get: function() {
	      return full16BitRegisters;
	    }},
	  Helpers: {get: function() {
	      return Helpers;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var full16BitRegisters = ['sp'];
	var Helpers = function Helpers() {
	  this.baseAddress = 0;
	};
	($traceurRuntime.createClass)(Helpers, {
	  jumpTo: function(addressExpression) {
	    throw new Error('Unimplemented');
	  },
	  endFrame: function() {
	    throw new Error('Unimplemented');
	  },
	  stop: function() {
	    return "{\n\n        environment.cpuStop = true;\n\n    }";
	  },
	  halt: function() {
	    return "{\n\n        environment.cpuHalt = true;\n\n    }";
	  },
	  applySpeedSwitch: function() {
	    return "{\n\n        if ( environment.cgbPrepareSpeedSwitch ) {\n\n            environment.cgbPrepareSpeedSwitch = 0;\n\n            if ( environment.cgbCurrentSpeed ) {\n                environment.cgbCurrentSpeed = 0;\n            } else {\n                environment.cgbCurrentSpeed = 1;\n            }\n\n        }\n\n    }";
	  },
	  delayInterruptSwitch: function(value, delay) {
	    return ("{\n\n        environment.cpuInterruptSwitch = " + value + ";\n        environment.cpuInterruptSwitchDelay = " + delay + ";\n\n    }");
	  },
	  readR8: function(register) {
	    return ("(environment." + register + " >>> 0)");
	  },
	  readR16: function(register) {
	    if (full16BitRegisters.indexOf(register) === -1) {
	      return ("(((" + this.readR8(register[0]) + " << 8) | " + this.readR8(register[1]) + ") >>> 0)");
	    } else {
	      return ("(environment." + register + " >>> 0)");
	    }
	  },
	  readMem16: function(addressExpression) {
	    return ("(((" + this.readMem8(this.add16(addressExpression, 1)) + " << 8) | " + this.readMem8(addressExpression) + ") >>> 0)");
	  },
	  writeR8: function(register, valueExpression) {
	    return ("{\n\n        environment." + register + " = (" + valueExpression + ") >>> 0;\n\n    }");
	  },
	  writeR16: function(register, valueExpression) {
	    if (full16BitRegisters.indexOf(register) !== -1) {
	      return ("{\n\n            environment." + register + " = (" + valueExpression + ") >>> 0;\n\n        }");
	    } else {
	      return ("{\n\n            var writeR16_value = (" + valueExpression + ") >>> 0;\n\n            " + this.writeR8(register[1], '(writeR16_value & 0x00FF) >>> 0') + ";\n            " + this.writeR8(register[0], '(writeR16_value & 0xFF00) >>> 8') + ";\n\n        }");
	    }
	  },
	  writeMem16: function(addressExpression, valueExpression) {
	    return ("{\n\n        var writeMem16_address = (" + addressExpression + ") >>> 0;\n        var writeMem16_value = (" + valueExpression + ") >>> 0;\n\n        " + this.writeMem8(this.add16('writeMem16_address', 0), '(writeMem16_value & 0x00FF) >>> 0') + ";\n        " + this.writeMem8(this.add16('writeMem16_address', 1), '(writeMem16_value & 0xFF00) >>> 8') + "\n\n    }");
	  },
	  pushStack: function(valueExpression) {
	    return ("{\n\n        " + this.writeR16('sp', this.sub16(this.readR16('sp'), 2)) + ";\n        " + this.writeMem16(this.readR16('sp'), valueExpression) + ";\n\n    }");
	  },
	  popStack: function(targetIdentifier) {
	    return ("{\n\n        " + targetIdentifier + " = " + this.readMem16(this.readR16('sp')) + ";\n        " + this.writeR16('sp', this.add16(this.readR16('sp'), 2)) + ";\n\n    }");
	  },
	  add8: function(expressionA, expressionB) {
	    return ("(((" + expressionA + ") + (" + expressionB + ")) & 0xFF)");
	  },
	  add16: function(expressionA, expressionB) {
	    return ("(((" + expressionA + ") + (" + expressionB + ")) & 0xFFFF)");
	  },
	  sub8: function(expressionA, expressionB) {
	    return ("(((" + expressionA + ") - (" + expressionB + ")) & 0xFF)");
	  },
	  sub16: function(expressionA, expressionB) {
	    return ("(((" + expressionA + ") - (" + expressionB + ")) & 0xFFFF)");
	  },
	  getFlag: function(flag) {
	    return ("(((environment.f & (" + flag + ")) === (" + flag + ")) | 0)");
	  },
	  setFlag: function(flag) {
	    var expression = arguments[1] !== (void 0) ? arguments[1] : 'true';
	    if (typeof expression === 'boolean') {
	      if (expression) {
	        return ("{\n                environment.f |= " + flag + ";\n            }");
	      } else {
	        return ("{\n                environment.f &= ~" + flag + ";\n            }");
	      }
	    } else {
	      return ("{\n\n            if (" + expression + ") {\n                environment.f |= " + flag + ";\n            } else {\n                environment.f &= ~" + flag + ";\n            }\n\n        }");
	    }
	  },
	  bcd: function(expression) {
	    if (typeof expression === 'boolean') {
	      return this.setFlag(0x40, expression);
	    } else if (typeof expression !== 'undefined') {
	      throw new Error('Please cast this flag parameter to boolean');
	    } else {
	      return this.getFlag(0x40);
	    }
	  },
	  zero: function(expression) {
	    if (typeof expression === 'boolean') {
	      return this.setFlag(0x80, expression);
	    } else if (typeof expression !== 'undefined') {
	      return this.setFlag(0x80, ("((" + expression + ") === 0)"));
	    } else {
	      return this.getFlag(0x80);
	    }
	  },
	  half: function(after, op, before) {
	    var mask = arguments[3] !== (void 0) ? arguments[3] : 0x0F;
	    if (typeof after === 'boolean') {
	      return this.setFlag(0x20, after);
	    } else if (typeof after !== 'undefined') {
	      return this.setFlag(0x20, ("(((" + after + ") & (" + mask + ")) " + op + " ((" + before + ") & (" + mask + ")))"));
	    } else {
	      return this.getFlag(0x20);
	    }
	  },
	  carry: function(after, op, before) {
	    var mask = arguments[3] !== (void 0) ? arguments[3] : 0xFF;
	    if (typeof after === 'boolean') {
	      return this.setFlag(0x10, after);
	    } else if (typeof after !== 'undefined') {
	      return this.setFlag(0x10, ("(((" + after + ") & (" + mask + ")) " + op + " ((" + before + ") & (" + mask + ")))"));
	    } else {
	      return this.getFlag(0x10);
	    }
	  }
	}, {});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  InterpreterHelpers: {get: function() {
	      return InterpreterHelpers;
	    }},
	  __esModule: {value: true}
	});
	var $__Helpers__;
	__webpack_require__(2);
	var Helpers = ($__Helpers__ = __webpack_require__(17), $__Helpers__ && $__Helpers__.__esModule && $__Helpers__ || {default: $__Helpers__}).Helpers;
	var InterpreterHelpers = function InterpreterHelpers() {
	  $traceurRuntime.defaultSuperCall(this, $InterpreterHelpers.prototype, arguments);
	};
	var $InterpreterHelpers = InterpreterHelpers;
	($traceurRuntime.createClass)(InterpreterHelpers, {
	  checkForInvalidation: function() {
	    return "{\n\n    }";
	  },
	  applyClockCycles: function(countExpression) {
	    return ("{\n\n        interpreter._applyClockCycles((" + countExpression + ") * 4);\n\n    }");
	  },
	  jumpTo: function(addressExpression) {
	    return ("{\n\n        return " + addressExpression + ";\n\n    }");
	  },
	  endFrame: function() {
	    return "{\n\n        interpreter._running = false;\n\n    }";
	  },
	  writeMem8: function(addressExpression, valueExpression) {
	    return ("{\n\n        interpreter._mmu.writeUint8((" + addressExpression + "), (" + valueExpression + "));\n\n    }");
	  },
	  readMem8: function(addressExpression) {
	    return ("interpreter._mmu.readUint8(" + addressExpression + ")");
	  }
	}, {}, Helpers);


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  x8_t: {get: function() {
	      return x8_t;
	    }},
	  i8_t: {get: function() {
	      return i8_t;
	    }},
	  u8_t: {get: function() {
	      return u8_t;
	    }},
	  u16_t: {get: function() {
	      return u16_t;
	    }},
	  instructions: {get: function() {
	      return instructions;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var x8_t = {};
	var i8_t = {};
	var u8_t = {};
	var u16_t = {};
	var instructions = {
	  0x00: ['NOP', [], {}],
	  0x01: ['LD_r16_u16', ['bc', u16_t], {}],
	  0x02: ['LD_(r16)_r8', ['bc', 'a'], {}],
	  0x03: ['INC_r16', ['bc'], {}],
	  0x04: ['INC_r8', ['b'], {}],
	  0x05: ['DEC_r8', ['b'], {}],
	  0x06: ['LD_r8_u8', ['b', u8_t], {}],
	  0x07: ['RLCA', [], {}],
	  0x08: ['LD_(u16)_r16', [u16_t, 'sp'], {}],
	  0x09: ['ADD_r16_r16', ['hl', 'bc'], {}],
	  0x0A: ['LD_r8_(r16)', ['a', 'bc'], {}],
	  0x0B: ['DEC_r16', ['bc'], {}],
	  0x0C: ['INC_r8', ['c'], {}],
	  0x0D: ['DEC_r8', ['c'], {}],
	  0x0E: ['LD_r8_u8', ['c', u8_t], {}],
	  0x0F: ['RRCA', [], {}],
	  0x10: ['STOP_u8', [u8_t], {final: true}],
	  0x11: ['LD_r16_u16', ['de', u16_t], {}],
	  0x12: ['LD_(r16)_r8', ['de', 'a'], {}],
	  0x13: ['INC_r16', ['de'], {}],
	  0x14: ['INC_r8', ['d'], {}],
	  0x15: ['DEC_r8', ['d'], {}],
	  0x16: ['LD_r8_u8', ['d', u8_t], {}],
	  0x17: ['RLA', [], {}],
	  0x18: ['JR_i8', [i8_t], {final: true}],
	  0x19: ['ADD_r16_r16', ['hl', 'de'], {}],
	  0x1A: ['LD_r8_(r16)', ['a', 'de'], {}],
	  0x1B: ['DEC_r16', ['de'], {}],
	  0x1C: ['INC_r8', ['e'], {}],
	  0x1D: ['DEC_r8', ['e'], {}],
	  0x1E: ['LD_r8_u8', ['e', u8_t], {}],
	  0x1F: ['RRA', [], {}],
	  0x20: ['JR_NZ_i8', [i8_t], {}],
	  0x21: ['LD_r16_u16', ['hl', u16_t], {}],
	  0x22: ['LDI_(r16)_r8', ['hl', 'a'], {}],
	  0x23: ['INC_r16', ['hl'], {}],
	  0x24: ['INC_r8', ['h'], {}],
	  0x25: ['DEC_r8', ['h'], {}],
	  0x26: ['LD_r8_u8', ['h', u8_t], {}],
	  0x27: ['DAA', [], {}],
	  0x28: ['JR_Z_i8', [i8_t], {}],
	  0x29: ['ADD_r16_r16', ['hl', 'hl'], {}],
	  0x2A: ['LDI_r8_(r16)', ['a', 'hl'], {}],
	  0x2B: ['DEC_r16', ['hl'], {}],
	  0x2C: ['INC_r8', ['l'], {}],
	  0x2D: ['DEC_r8', ['l'], {}],
	  0x2E: ['LD_r8_u8', ['l', u8_t], {}],
	  0x2F: ['CPL_r8', ['a'], {}],
	  0x30: ['JR_NC_i8', [i8_t], {}],
	  0x31: ['LD_r16_u16', ['sp', u16_t], {}],
	  0x32: ['LDD_(r16)_r8', ['hl', 'a'], {}],
	  0x33: ['INC_r16', ['sp'], {}],
	  0x34: ['INC_(r16)', ['hl'], {}],
	  0x35: ['DEC_(r16)', ['hl'], {}],
	  0x36: ['LD_(r16)_u8', ['hl', u8_t], {}],
	  0x37: ['SCF', [], {}],
	  0x38: ['JR_C_i8', [i8_t], {}],
	  0x39: ['ADD_r16_r16', ['hl', 'sp'], {}],
	  0x3A: ['LDD_r8_(r16)', ['a', 'hl'], {}],
	  0x3B: ['DEC_r16', ['sp'], {}],
	  0x3C: ['INC_r8', ['a'], {}],
	  0x3D: ['DEC_r8', ['a'], {}],
	  0x3E: ['LD_r8_u8', ['a', u8_t], {}],
	  0x3F: ['CCF', [], {}],
	  0x40: ['LD_r8_r8', ['b', 'b'], {}],
	  0x41: ['LD_r8_r8', ['b', 'c'], {}],
	  0x42: ['LD_r8_r8', ['b', 'd'], {}],
	  0x43: ['LD_r8_r8', ['b', 'e'], {}],
	  0x44: ['LD_r8_r8', ['b', 'h'], {}],
	  0x45: ['LD_r8_r8', ['b', 'l'], {}],
	  0x46: ['LD_r8_(r16)', ['b', 'hl'], {}],
	  0x47: ['LD_r8_r8', ['b', 'a'], {}],
	  0x48: ['LD_r8_r8', ['c', 'b'], {}],
	  0x49: ['LD_r8_r8', ['c', 'c'], {}],
	  0x4A: ['LD_r8_r8', ['c', 'd'], {}],
	  0x4B: ['LD_r8_r8', ['c', 'e'], {}],
	  0x4C: ['LD_r8_r8', ['c', 'h'], {}],
	  0x4D: ['LD_r8_r8', ['c', 'l'], {}],
	  0x4E: ['LD_r8_(r16)', ['c', 'hl'], {}],
	  0x4F: ['LD_r8_r8', ['c', 'a'], {}],
	  0x50: ['LD_r8_r8', ['d', 'b'], {}],
	  0x51: ['LD_r8_r8', ['d', 'c'], {}],
	  0x52: ['LD_r8_r8', ['d', 'd'], {}],
	  0x53: ['LD_r8_r8', ['d', 'e'], {}],
	  0x54: ['LD_r8_r8', ['d', 'h'], {}],
	  0x55: ['LD_r8_r8', ['d', 'l'], {}],
	  0x56: ['LD_r8_(r16)', ['d', 'hl'], {}],
	  0x57: ['LD_r8_r8', ['d', 'a'], {}],
	  0x58: ['LD_r8_r8', ['e', 'b'], {}],
	  0x59: ['LD_r8_r8', ['e', 'c'], {}],
	  0x5A: ['LD_r8_r8', ['e', 'd'], {}],
	  0x5B: ['LD_r8_r8', ['e', 'e'], {}],
	  0x5C: ['LD_r8_r8', ['e', 'h'], {}],
	  0x5D: ['LD_r8_r8', ['e', 'l'], {}],
	  0x5E: ['LD_r8_(r16)', ['e', 'hl'], {}],
	  0x5F: ['LD_r8_r8', ['e', 'a'], {}],
	  0x60: ['LD_r8_r8', ['h', 'b'], {}],
	  0x61: ['LD_r8_r8', ['h', 'c'], {}],
	  0x62: ['LD_r8_r8', ['h', 'd'], {}],
	  0x63: ['LD_r8_r8', ['h', 'e'], {}],
	  0x64: ['LD_r8_r8', ['h', 'h'], {}],
	  0x65: ['LD_r8_r8', ['h', 'l'], {}],
	  0x66: ['LD_r8_(r16)', ['h', 'hl'], {}],
	  0x67: ['LD_r8_r8', ['h', 'a'], {}],
	  0x68: ['LD_r8_r8', ['l', 'b'], {}],
	  0x69: ['LD_r8_r8', ['l', 'c'], {}],
	  0x6A: ['LD_r8_r8', ['l', 'd'], {}],
	  0x6B: ['LD_r8_r8', ['l', 'e'], {}],
	  0x6C: ['LD_r8_r8', ['l', 'h'], {}],
	  0x6D: ['LD_r8_r8', ['l', 'l'], {}],
	  0x6E: ['LD_r8_(r16)', ['l', 'hl'], {}],
	  0x6F: ['LD_r8_r8', ['l', 'a'], {}],
	  0x70: ['LD_(r16)_r8', ['hl', 'b'], {}],
	  0x71: ['LD_(r16)_r8', ['hl', 'c'], {}],
	  0x72: ['LD_(r16)_r8', ['hl', 'd'], {}],
	  0x73: ['LD_(r16)_r8', ['hl', 'e'], {}],
	  0x74: ['LD_(r16)_r8', ['hl', 'h'], {}],
	  0x75: ['LD_(r16)_r8', ['hl', 'l'], {}],
	  0x76: ['HALT', [], {final: true}],
	  0x77: ['LD_(r16)_r8', ['hl', 'a'], {}],
	  0x78: ['LD_r8_r8', ['a', 'b'], {}],
	  0x79: ['LD_r8_r8', ['a', 'c'], {}],
	  0x7A: ['LD_r8_r8', ['a', 'd'], {}],
	  0x7B: ['LD_r8_r8', ['a', 'e'], {}],
	  0x7C: ['LD_r8_r8', ['a', 'h'], {}],
	  0x7D: ['LD_r8_r8', ['a', 'l'], {}],
	  0x7E: ['LD_r8_(r16)', ['a', 'hl'], {}],
	  0x7F: ['LD_r8_r8', ['a', 'a'], {}],
	  0x80: ['ADD_r8_r8', ['a', 'b'], {}],
	  0x81: ['ADD_r8_r8', ['a', 'c'], {}],
	  0x82: ['ADD_r8_r8', ['a', 'd'], {}],
	  0x83: ['ADD_r8_r8', ['a', 'e'], {}],
	  0x84: ['ADD_r8_r8', ['a', 'h'], {}],
	  0x85: ['ADD_r8_r8', ['a', 'l'], {}],
	  0x86: ['ADD_r8_(r16)', ['a', 'hl'], {}],
	  0x87: ['ADD_r8_r8', ['a', 'a'], {}],
	  0x88: ['ADC_r8_r8', ['a', 'b'], {}],
	  0x89: ['ADC_r8_r8', ['a', 'c'], {}],
	  0x8A: ['ADC_r8_r8', ['a', 'd'], {}],
	  0x8B: ['ADC_r8_r8', ['a', 'e'], {}],
	  0x8C: ['ADC_r8_r8', ['a', 'h'], {}],
	  0x8D: ['ADC_r8_r8', ['a', 'l'], {}],
	  0x8E: ['ADC_r8_(r16)', ['a', 'hl'], {}],
	  0x8F: ['ADC_r8_r8', ['a', 'a'], {}],
	  0x90: ['SUB_r8_r8', ['a', 'b'], {}],
	  0x91: ['SUB_r8_r8', ['a', 'c'], {}],
	  0x92: ['SUB_r8_r8', ['a', 'd'], {}],
	  0x93: ['SUB_r8_r8', ['a', 'e'], {}],
	  0x94: ['SUB_r8_r8', ['a', 'h'], {}],
	  0x95: ['SUB_r8_r8', ['a', 'l'], {}],
	  0x96: ['SUB_r8_(r16)', ['a', 'hl'], {}],
	  0x97: ['SUB_r8_r8', ['a', 'a'], {}],
	  0x98: ['SBC_r8_r8', ['a', 'b'], {}],
	  0x99: ['SBC_r8_r8', ['a', 'c'], {}],
	  0x9A: ['SBC_r8_r8', ['a', 'd'], {}],
	  0x9B: ['SBC_r8_r8', ['a', 'e'], {}],
	  0x9C: ['SBC_r8_r8', ['a', 'h'], {}],
	  0x9D: ['SBC_r8_r8', ['a', 'l'], {}],
	  0x9E: ['SBC_r8_(r16)', ['a', 'hl'], {}],
	  0x9F: ['SBC_r8_r8', ['a', 'a'], {}],
	  0xA0: ['AND_r8_r8', ['a', 'b'], {}],
	  0xA1: ['AND_r8_r8', ['a', 'c'], {}],
	  0xA2: ['AND_r8_r8', ['a', 'd'], {}],
	  0xA3: ['AND_r8_r8', ['a', 'e'], {}],
	  0xA4: ['AND_r8_r8', ['a', 'h'], {}],
	  0xA5: ['AND_r8_r8', ['a', 'l'], {}],
	  0xA6: ['AND_r8_(r16)', ['a', 'hl'], {}],
	  0xA7: ['AND_r8_r8', ['a', 'a'], {}],
	  0xA9: ['XOR_r8_r8', ['a', 'c'], {}],
	  0xA8: ['XOR_r8_r8', ['a', 'b'], {}],
	  0xAA: ['XOR_r8_r8', ['a', 'd'], {}],
	  0xAB: ['XOR_r8_r8', ['a', 'e'], {}],
	  0xAC: ['XOR_r8_r8', ['a', 'h'], {}],
	  0xAD: ['XOR_r8_r8', ['a', 'l'], {}],
	  0xAE: ['XOR_r8_(r16)', ['a', 'hl'], {}],
	  0xAF: ['XOR_r8_r8', ['a', 'a'], {}],
	  0xB0: ['OR_r8_r8', ['a', 'b'], {}],
	  0xB1: ['OR_r8_r8', ['a', 'c'], {}],
	  0xB2: ['OR_r8_r8', ['a', 'd'], {}],
	  0xB3: ['OR_r8_r8', ['a', 'e'], {}],
	  0xB4: ['OR_r8_r8', ['a', 'h'], {}],
	  0xB5: ['OR_r8_r8', ['a', 'l'], {}],
	  0xB6: ['OR_r8_(r16)', ['a', 'hl'], {}],
	  0xB7: ['OR_r8_r8', ['a', 'a'], {}],
	  0xB8: ['CP_r8_r8', ['a', 'b'], {}],
	  0xB9: ['CP_r8_r8', ['a', 'c'], {}],
	  0xBA: ['CP_r8_r8', ['a', 'd'], {}],
	  0xBB: ['CP_r8_r8', ['a', 'e'], {}],
	  0xBC: ['CP_r8_r8', ['a', 'h'], {}],
	  0xBD: ['CP_r8_r8', ['a', 'l'], {}],
	  0xBE: ['CP_r8_(r16)', ['a', 'hl'], {}],
	  0xBF: ['CP_r8_r8', ['a', 'a'], {}],
	  0xC0: ['RET_NZ', [], {}],
	  0xC1: ['POP_r16', ['bc'], {}],
	  0xC2: ['JP_NZ_u16', [u16_t], {}],
	  0xC3: ['JP_u16', [u16_t], {final: true}],
	  0xC4: ['CALL_NZ_u16', [u16_t], {}],
	  0xC5: ['PUSH_r16', ['bc'], {}],
	  0xC6: ['ADD_r8_u8', ['a', u8_t], {}],
	  0xC7: ['RST_u8', [0x00], {final: true}],
	  0xC8: ['RET_Z', [], {}],
	  0xC9: ['RET', [], {final: true}],
	  0xCA: ['JP_Z_u16', [u16_t], {}],
	  0xCB: ['PREFIX_CB', [u8_t], {}],
	  0xCC: ['CALL_Z_u16', [u16_t], {}],
	  0xCD: ['CALL_u16', [u16_t], {
	    final: true,
	    returns: true
	  }],
	  0xCE: ['ADC_r8_u8', ['a', u8_t], {}],
	  0xCF: ['RST_u8', [0x08], {
	    final: true,
	    returns: true
	  }],
	  0xD0: ['RET_NC', [], {}],
	  0xD1: ['POP_r16', ['de'], {}],
	  0xD2: ['JP_NC_u16', [u16_t], {}],
	  0xD3: [null, [], {}],
	  0xD4: ['CALL_NC_u16', [u16_t], {}],
	  0xD5: ['PUSH_r16', ['de'], {}],
	  0xD6: ['SUB_r8_u8', ['a', u8_t], {}],
	  0xD7: ['RST_u8', [0x10], {
	    final: true,
	    returns: true
	  }],
	  0xD8: ['RET_C', [], {}],
	  0xD9: ['RETI', [], {final: true}],
	  0xDA: ['JP_C_u16', [u16_t], {}],
	  0xDB: [null, [], {}],
	  0xDC: ['CALL_C_u16', [u16_t], {}],
	  0xDD: [null, [], {}],
	  0xDE: ['SBC_r8_u8', ['a', u8_t], {}],
	  0xDF: ['RST_u8', [0x18], {
	    final: true,
	    returns: true
	  }],
	  0xE0: ['LDH_(u8)_r8', [u8_t, 'a'], {}],
	  0xE1: ['POP_r16', ['hl'], {}],
	  0xE2: ['LD_(r8)_r8', ['c', 'a'], {}],
	  0xE3: [null, [], {}],
	  0xE4: [null, [], {}],
	  0xE5: ['PUSH_r16', ['hl'], {}],
	  0xE6: ['AND_r8_u8', ['a', u8_t], {}],
	  0xE7: ['RST_u8', [0x20], {
	    final: true,
	    returns: true
	  }],
	  0xE8: ['ADD_r16_i8', ['sp', i8_t], {}],
	  0xE9: ['JP_r16', ['hl'], {final: true}],
	  0xEA: ['LD_(u16)_r8', [u16_t, 'a'], {}],
	  0xEB: [null, [], {}],
	  0xEC: [null, [], {}],
	  0xED: [null, [], {}],
	  0xEE: ['XOR_r8_u8', ['a', u8_t], {}],
	  0xEF: ['RST_u8', [0x28], {
	    final: true,
	    returns: true
	  }],
	  0xF0: ['LDH_r8_(u8)', ['a', u8_t], {}],
	  0xF1: ['POP_AF', [], {}],
	  0xF2: ['LD_r8_(r8)', ['a', 'c'], {}],
	  0xF3: ['DI', [], {interrupts: false}],
	  0xF4: [null, [], {}],
	  0xF5: ['PUSH_r16', ['af'], {}],
	  0xF6: ['OR_r8_u8', ['a', u8_t], {}],
	  0xF7: ['RST_u8', [0x30], {
	    final: true,
	    returns: true
	  }],
	  0xF8: ['LDHL_r16_i8', ['sp', i8_t], {}],
	  0xF9: ['LD_r16_r16', ['sp', 'hl'], {}],
	  0xFA: ['LD_r8_(u16)', ['a', u16_t], {}],
	  0xFB: ['EI', [], {interrupts: true}],
	  0xFC: [null, [], {}],
	  0xFD: [null, [], {}],
	  0xFE: ['CP_r8_u8', ['a', u8_t], {}],
	  0xFF: ['RST_u8', [0x38], {
	    final: true,
	    returns: true
	  }],
	  0xCB00: ['RLC_r8', [x8_t, 'b'], {}],
	  0xCB01: ['RLC_r8', [x8_t, 'c'], {}],
	  0xCB02: ['RLC_r8', [x8_t, 'd'], {}],
	  0xCB03: ['RLC_r8', [x8_t, 'e'], {}],
	  0xCB04: ['RLC_r8', [x8_t, 'h'], {}],
	  0xCB05: ['RLC_r8', [x8_t, 'l'], {}],
	  0xCB06: ['RLC_(r16)', [x8_t, 'hl'], {}],
	  0xCB07: ['RLC_r8', [x8_t, 'a'], {}],
	  0xCB08: ['RRC_r8', [x8_t, 'b'], {}],
	  0xCB09: ['RRC_r8', [x8_t, 'c'], {}],
	  0xCB0A: ['RRC_r8', [x8_t, 'd'], {}],
	  0xCB0B: ['RRC_r8', [x8_t, 'e'], {}],
	  0xCB0C: ['RRC_r8', [x8_t, 'h'], {}],
	  0xCB0D: ['RRC_r8', [x8_t, 'l'], {}],
	  0xCB0E: ['RRC_(r16)', [x8_t, 'hl'], {}],
	  0xCB0F: ['RRC_r8', [x8_t, 'a'], {}],
	  0xCB10: ['RL_r8', [x8_t, 'b'], {}],
	  0xCB11: ['RL_r8', [x8_t, 'c'], {}],
	  0xCB12: ['RL_r8', [x8_t, 'd'], {}],
	  0xCB13: ['RL_r8', [x8_t, 'e'], {}],
	  0xCB14: ['RL_r8', [x8_t, 'h'], {}],
	  0xCB15: ['RL_r8', [x8_t, 'l'], {}],
	  0xCB16: ['RL_(r16)', [x8_t, 'hl'], {}],
	  0xCB17: ['RL_r8', [x8_t, 'a'], {}],
	  0xCB18: ['RR_r8', [x8_t, 'b'], {}],
	  0xCB19: ['RR_r8', [x8_t, 'c'], {}],
	  0xCB1A: ['RR_r8', [x8_t, 'd'], {}],
	  0xCB1B: ['RR_r8', [x8_t, 'e'], {}],
	  0xCB1C: ['RR_r8', [x8_t, 'h'], {}],
	  0xCB1D: ['RR_r8', [x8_t, 'l'], {}],
	  0xCB1E: ['RR_(r16)', [x8_t, 'hl'], {}],
	  0xCB1F: ['RR_r8', [x8_t, 'a'], {}],
	  0xCB20: ['SLA_r8', [x8_t, 'b'], {}],
	  0xCB21: ['SLA_r8', [x8_t, 'c'], {}],
	  0xCB22: ['SLA_r8', [x8_t, 'd'], {}],
	  0xCB23: ['SLA_r8', [x8_t, 'e'], {}],
	  0xCB24: ['SLA_r8', [x8_t, 'h'], {}],
	  0xCB25: ['SLA_r8', [x8_t, 'l'], {}],
	  0xCB26: ['SLA_(r16)', [x8_t, 'hl'], {}],
	  0xCB27: ['SLA_r8', [x8_t, 'a'], {}],
	  0xCB28: ['SRA_r8', [x8_t, 'b'], {}],
	  0xCB29: ['SRA_r8', [x8_t, 'c'], {}],
	  0xCB2A: ['SRA_r8', [x8_t, 'd'], {}],
	  0xCB2B: ['SRA_r8', [x8_t, 'e'], {}],
	  0xCB2C: ['SRA_r8', [x8_t, 'h'], {}],
	  0xCB2D: ['SRA_r8', [x8_t, 'l'], {}],
	  0xCB2E: ['SRA_(r16)', [x8_t, 'hl'], {}],
	  0xCB2F: ['SRA_r8', [x8_t, 'a'], {}],
	  0xCB30: ['SWAP_r8', [x8_t, 'b'], {}],
	  0xCB31: ['SWAP_r8', [x8_t, 'c'], {}],
	  0xCB32: ['SWAP_r8', [x8_t, 'd'], {}],
	  0xCB33: ['SWAP_r8', [x8_t, 'e'], {}],
	  0xCB34: ['SWAP_r8', [x8_t, 'h'], {}],
	  0xCB35: ['SWAP_r8', [x8_t, 'l'], {}],
	  0xCB36: ['SWAP_(r16)', [x8_t, 'hl'], {}],
	  0xCB37: ['SWAP_r8', [x8_t, 'a'], {}],
	  0xCB38: ['SRL_r8', [x8_t, 'b'], {}],
	  0xCB39: ['SRL_r8', [x8_t, 'c'], {}],
	  0xCB3A: ['SRL_r8', [x8_t, 'd'], {}],
	  0xCB3B: ['SRL_r8', [x8_t, 'e'], {}],
	  0xCB3C: ['SRL_r8', [x8_t, 'h'], {}],
	  0xCB3D: ['SRL_r8', [x8_t, 'l'], {}],
	  0xCB3E: ['SRL_(r16)', [x8_t, 'hl'], {}],
	  0xCB3F: ['SRL_r8', [x8_t, 'a'], {}],
	  0xCB40: ['BIT_u8_r8', [x8_t, 0, 'b'], {}],
	  0xCB41: ['BIT_u8_r8', [x8_t, 0, 'c'], {}],
	  0xCB42: ['BIT_u8_r8', [x8_t, 0, 'd'], {}],
	  0xCB43: ['BIT_u8_r8', [x8_t, 0, 'e'], {}],
	  0xCB44: ['BIT_u8_r8', [x8_t, 0, 'h'], {}],
	  0xCB45: ['BIT_u8_r8', [x8_t, 0, 'l'], {}],
	  0xCB46: ['BIT_u8_(r16)', [x8_t, 0, 'hl'], {}],
	  0xCB47: ['BIT_u8_r8', [x8_t, 0, 'a'], {}],
	  0xCB48: ['BIT_u8_r8', [x8_t, 1, 'b'], {}],
	  0xCB49: ['BIT_u8_r8', [x8_t, 1, 'c'], {}],
	  0xCB4A: ['BIT_u8_r8', [x8_t, 1, 'd'], {}],
	  0xCB4B: ['BIT_u8_r8', [x8_t, 1, 'e'], {}],
	  0xCB4C: ['BIT_u8_r8', [x8_t, 1, 'h'], {}],
	  0xCB4D: ['BIT_u8_r8', [x8_t, 1, 'l'], {}],
	  0xCB4E: ['BIT_u8_(r16)', [x8_t, 1, 'hl'], {}],
	  0xCB4F: ['BIT_u8_r8', [x8_t, 1, 'a'], {}],
	  0xCB50: ['BIT_u8_r8', [x8_t, 2, 'b'], {}],
	  0xCB51: ['BIT_u8_r8', [x8_t, 2, 'c'], {}],
	  0xCB52: ['BIT_u8_r8', [x8_t, 2, 'd'], {}],
	  0xCB53: ['BIT_u8_r8', [x8_t, 2, 'e'], {}],
	  0xCB54: ['BIT_u8_r8', [x8_t, 2, 'h'], {}],
	  0xCB55: ['BIT_u8_r8', [x8_t, 2, 'l'], {}],
	  0xCB56: ['BIT_u8_(r16)', [x8_t, 2, 'hl'], {}],
	  0xCB57: ['BIT_u8_r8', [x8_t, 2, 'a'], {}],
	  0xCB58: ['BIT_u8_r8', [x8_t, 3, 'b'], {}],
	  0xCB59: ['BIT_u8_r8', [x8_t, 3, 'c'], {}],
	  0xCB5A: ['BIT_u8_r8', [x8_t, 3, 'd'], {}],
	  0xCB5B: ['BIT_u8_r8', [x8_t, 3, 'e'], {}],
	  0xCB5C: ['BIT_u8_r8', [x8_t, 3, 'h'], {}],
	  0xCB5D: ['BIT_u8_r8', [x8_t, 3, 'l'], {}],
	  0xCB5E: ['BIT_u8_(r16)', [x8_t, 3, 'hl'], {}],
	  0xCB5F: ['BIT_u8_r8', [x8_t, 3, 'a'], {}],
	  0xCB60: ['BIT_u8_r8', [x8_t, 4, 'b'], {}],
	  0xCB61: ['BIT_u8_r8', [x8_t, 4, 'c'], {}],
	  0xCB62: ['BIT_u8_r8', [x8_t, 4, 'd'], {}],
	  0xCB63: ['BIT_u8_r8', [x8_t, 4, 'e'], {}],
	  0xCB64: ['BIT_u8_r8', [x8_t, 4, 'h'], {}],
	  0xCB65: ['BIT_u8_r8', [x8_t, 4, 'l'], {}],
	  0xCB66: ['BIT_u8_(r16)', [x8_t, 4, 'hl'], {}],
	  0xCB67: ['BIT_u8_r8', [x8_t, 4, 'a'], {}],
	  0xCB68: ['BIT_u8_r8', [x8_t, 5, 'b'], {}],
	  0xCB69: ['BIT_u8_r8', [x8_t, 5, 'c'], {}],
	  0xCB6A: ['BIT_u8_r8', [x8_t, 5, 'd'], {}],
	  0xCB6B: ['BIT_u8_r8', [x8_t, 5, 'e'], {}],
	  0xCB6C: ['BIT_u8_r8', [x8_t, 5, 'h'], {}],
	  0xCB6D: ['BIT_u8_r8', [x8_t, 5, 'l'], {}],
	  0xCB6E: ['BIT_u8_(r16)', [x8_t, 5, 'hl'], {}],
	  0xCB6F: ['BIT_u8_r8', [x8_t, 5, 'a'], {}],
	  0xCB70: ['BIT_u8_r8', [x8_t, 6, 'b'], {}],
	  0xCB71: ['BIT_u8_r8', [x8_t, 6, 'c'], {}],
	  0xCB72: ['BIT_u8_r8', [x8_t, 6, 'd'], {}],
	  0xCB73: ['BIT_u8_r8', [x8_t, 6, 'e'], {}],
	  0xCB74: ['BIT_u8_r8', [x8_t, 6, 'h'], {}],
	  0xCB75: ['BIT_u8_r8', [x8_t, 6, 'l'], {}],
	  0xCB76: ['BIT_u8_(r16)', [x8_t, 6, 'hl'], {}],
	  0xCB77: ['BIT_u8_r8', [x8_t, 6, 'a'], {}],
	  0xCB78: ['BIT_u8_r8', [x8_t, 7, 'b'], {}],
	  0xCB79: ['BIT_u8_r8', [x8_t, 7, 'c'], {}],
	  0xCB7A: ['BIT_u8_r8', [x8_t, 7, 'd'], {}],
	  0xCB7B: ['BIT_u8_r8', [x8_t, 7, 'e'], {}],
	  0xCB7C: ['BIT_u8_r8', [x8_t, 7, 'h'], {}],
	  0xCB7D: ['BIT_u8_r8', [x8_t, 7, 'l'], {}],
	  0xCB7E: ['BIT_u8_(r16)', [x8_t, 7, 'hl'], {}],
	  0xCB7F: ['BIT_u8_r8', [x8_t, 7, 'a'], {}],
	  0xCB80: ['RES_u8_r8', [x8_t, 0, 'b'], {}],
	  0xCB81: ['RES_u8_r8', [x8_t, 0, 'c'], {}],
	  0xCB82: ['RES_u8_r8', [x8_t, 0, 'd'], {}],
	  0xCB83: ['RES_u8_r8', [x8_t, 0, 'e'], {}],
	  0xCB84: ['RES_u8_r8', [x8_t, 0, 'h'], {}],
	  0xCB85: ['RES_u8_r8', [x8_t, 0, 'l'], {}],
	  0xCB86: ['RES_u8_(r16)', [x8_t, 0, 'hl'], {}],
	  0xCB87: ['RES_u8_r8', [x8_t, 0, 'a'], {}],
	  0xCB88: ['RES_u8_r8', [x8_t, 1, 'b'], {}],
	  0xCB89: ['RES_u8_r8', [x8_t, 1, 'c'], {}],
	  0xCB8A: ['RES_u8_r8', [x8_t, 1, 'd'], {}],
	  0xCB8B: ['RES_u8_r8', [x8_t, 1, 'e'], {}],
	  0xCB8C: ['RES_u8_r8', [x8_t, 1, 'h'], {}],
	  0xCB8D: ['RES_u8_r8', [x8_t, 1, 'l'], {}],
	  0xCB8E: ['RES_u8_(r16)', [x8_t, 1, 'hl'], {}],
	  0xCB8F: ['RES_u8_r8', [x8_t, 1, 'a'], {}],
	  0xCB90: ['RES_u8_r8', [x8_t, 2, 'b'], {}],
	  0xCB91: ['RES_u8_r8', [x8_t, 2, 'c'], {}],
	  0xCB92: ['RES_u8_r8', [x8_t, 2, 'd'], {}],
	  0xCB93: ['RES_u8_r8', [x8_t, 2, 'e'], {}],
	  0xCB94: ['RES_u8_r8', [x8_t, 2, 'h'], {}],
	  0xCB95: ['RES_u8_r8', [x8_t, 2, 'l'], {}],
	  0xCB96: ['RES_u8_(r16)', [x8_t, 2, 'hl'], {}],
	  0xCB97: ['RES_u8_r8', [x8_t, 2, 'a'], {}],
	  0xCB98: ['RES_u8_r8', [x8_t, 3, 'b'], {}],
	  0xCB99: ['RES_u8_r8', [x8_t, 3, 'c'], {}],
	  0xCB9A: ['RES_u8_r8', [x8_t, 3, 'd'], {}],
	  0xCB9B: ['RES_u8_r8', [x8_t, 3, 'e'], {}],
	  0xCB9C: ['RES_u8_r8', [x8_t, 3, 'h'], {}],
	  0xCB9D: ['RES_u8_r8', [x8_t, 3, 'l'], {}],
	  0xCB9E: ['RES_u8_(r16)', [x8_t, 3, 'hl'], {}],
	  0xCB9F: ['RES_u8_r8', [x8_t, 3, 'a'], {}],
	  0xCBA0: ['RES_u8_r8', [x8_t, 4, 'b'], {}],
	  0xCBA1: ['RES_u8_r8', [x8_t, 4, 'c'], {}],
	  0xCBA2: ['RES_u8_r8', [x8_t, 4, 'd'], {}],
	  0xCBA3: ['RES_u8_r8', [x8_t, 4, 'e'], {}],
	  0xCBA4: ['RES_u8_r8', [x8_t, 4, 'h'], {}],
	  0xCBA5: ['RES_u8_r8', [x8_t, 4, 'l'], {}],
	  0xCBA6: ['RES_u8_(r16)', [x8_t, 4, 'hl'], {}],
	  0xCBA7: ['RES_u8_r8', [x8_t, 4, 'a'], {}],
	  0xCBA8: ['RES_u8_r8', [x8_t, 5, 'b'], {}],
	  0xCBA9: ['RES_u8_r8', [x8_t, 5, 'c'], {}],
	  0xCBAA: ['RES_u8_r8', [x8_t, 5, 'd'], {}],
	  0xCBAB: ['RES_u8_r8', [x8_t, 5, 'e'], {}],
	  0xCBAC: ['RES_u8_r8', [x8_t, 5, 'h'], {}],
	  0xCBAD: ['RES_u8_r8', [x8_t, 5, 'l'], {}],
	  0xCBAE: ['RES_u8_(r16)', [x8_t, 5, 'hl'], {}],
	  0xCBAF: ['RES_u8_r8', [x8_t, 5, 'a'], {}],
	  0xCBB0: ['RES_u8_r8', [x8_t, 6, 'b'], {}],
	  0xCBB1: ['RES_u8_r8', [x8_t, 6, 'c'], {}],
	  0xCBB2: ['RES_u8_r8', [x8_t, 6, 'd'], {}],
	  0xCBB3: ['RES_u8_r8', [x8_t, 6, 'e'], {}],
	  0xCBB4: ['RES_u8_r8', [x8_t, 6, 'h'], {}],
	  0xCBB5: ['RES_u8_r8', [x8_t, 6, 'l'], {}],
	  0xCBB6: ['RES_u8_(r16)', [x8_t, 6, 'hl'], {}],
	  0xCBB7: ['RES_u8_r8', [x8_t, 6, 'a'], {}],
	  0xCBB8: ['RES_u8_r8', [x8_t, 7, 'b'], {}],
	  0xCBB9: ['RES_u8_r8', [x8_t, 7, 'c'], {}],
	  0xCBBA: ['RES_u8_r8', [x8_t, 7, 'd'], {}],
	  0xCBBB: ['RES_u8_r8', [x8_t, 7, 'e'], {}],
	  0xCBBC: ['RES_u8_r8', [x8_t, 7, 'h'], {}],
	  0xCBBD: ['RES_u8_r8', [x8_t, 7, 'l'], {}],
	  0xCBBE: ['RES_u8_(r16)', [x8_t, 7, 'hl'], {}],
	  0xCBBF: ['RES_u8_r8', [x8_t, 7, 'a'], {}],
	  0xCBC0: ['SET_u8_r8', [x8_t, 0, 'b'], {}],
	  0xCBC1: ['SET_u8_r8', [x8_t, 0, 'c'], {}],
	  0xCBC2: ['SET_u8_r8', [x8_t, 0, 'd'], {}],
	  0xCBC3: ['SET_u8_r8', [x8_t, 0, 'e'], {}],
	  0xCBC4: ['SET_u8_r8', [x8_t, 0, 'h'], {}],
	  0xCBC5: ['SET_u8_r8', [x8_t, 0, 'l'], {}],
	  0xCBC6: ['SET_u8_(r16)', [x8_t, 0, 'hl'], {}],
	  0xCBC7: ['SET_u8_r8', [x8_t, 0, 'a'], {}],
	  0xCBC8: ['SET_u8_r8', [x8_t, 1, 'b'], {}],
	  0xCBC9: ['SET_u8_r8', [x8_t, 1, 'c'], {}],
	  0xCBCA: ['SET_u8_r8', [x8_t, 1, 'd'], {}],
	  0xCBCB: ['SET_u8_r8', [x8_t, 1, 'e'], {}],
	  0xCBCC: ['SET_u8_r8', [x8_t, 1, 'h'], {}],
	  0xCBCD: ['SET_u8_r8', [x8_t, 1, 'l'], {}],
	  0xCBCE: ['SET_u8_(r16)', [x8_t, 1, 'hl'], {}],
	  0xCBCF: ['SET_u8_r8', [x8_t, 1, 'a'], {}],
	  0xCBD0: ['SET_u8_r8', [x8_t, 2, 'b'], {}],
	  0xCBD1: ['SET_u8_r8', [x8_t, 2, 'c'], {}],
	  0xCBD2: ['SET_u8_r8', [x8_t, 2, 'd'], {}],
	  0xCBD3: ['SET_u8_r8', [x8_t, 2, 'e'], {}],
	  0xCBD4: ['SET_u8_r8', [x8_t, 2, 'h'], {}],
	  0xCBD5: ['SET_u8_r8', [x8_t, 2, 'l'], {}],
	  0xCBD6: ['SET_u8_(r16)', [x8_t, 2, 'hl'], {}],
	  0xCBD7: ['SET_u8_r8', [x8_t, 2, 'a'], {}],
	  0xCBD8: ['SET_u8_r8', [x8_t, 3, 'b'], {}],
	  0xCBD9: ['SET_u8_r8', [x8_t, 3, 'c'], {}],
	  0xCBDA: ['SET_u8_r8', [x8_t, 3, 'd'], {}],
	  0xCBDB: ['SET_u8_r8', [x8_t, 3, 'e'], {}],
	  0xCBDC: ['SET_u8_r8', [x8_t, 3, 'h'], {}],
	  0xCBDD: ['SET_u8_r8', [x8_t, 3, 'l'], {}],
	  0xCBDE: ['SET_u8_(r16)', [x8_t, 3, 'hl'], {}],
	  0xCBDF: ['SET_u8_r8', [x8_t, 3, 'a'], {}],
	  0xCBE0: ['SET_u8_r8', [x8_t, 4, 'b'], {}],
	  0xCBE1: ['SET_u8_r8', [x8_t, 4, 'c'], {}],
	  0xCBE2: ['SET_u8_r8', [x8_t, 4, 'd'], {}],
	  0xCBE3: ['SET_u8_r8', [x8_t, 4, 'e'], {}],
	  0xCBE4: ['SET_u8_r8', [x8_t, 4, 'h'], {}],
	  0xCBE5: ['SET_u8_r8', [x8_t, 4, 'l'], {}],
	  0xCBE6: ['SET_u8_(r16)', [x8_t, 4, 'hl'], {}],
	  0xCBE7: ['SET_u8_r8', [x8_t, 4, 'a'], {}],
	  0xCBE8: ['SET_u8_r8', [x8_t, 5, 'b'], {}],
	  0xCBE9: ['SET_u8_r8', [x8_t, 5, 'c'], {}],
	  0xCBEA: ['SET_u8_r8', [x8_t, 5, 'd'], {}],
	  0xCBEB: ['SET_u8_r8', [x8_t, 5, 'e'], {}],
	  0xCBEC: ['SET_u8_r8', [x8_t, 5, 'h'], {}],
	  0xCBED: ['SET_u8_r8', [x8_t, 5, 'l'], {}],
	  0xCBEE: ['SET_u8_(r16)', [x8_t, 5, 'hl'], {}],
	  0xCBEF: ['SET_u8_r8', [x8_t, 5, 'a'], {}],
	  0xCBF0: ['SET_u8_r8', [x8_t, 6, 'b'], {}],
	  0xCBF1: ['SET_u8_r8', [x8_t, 6, 'c'], {}],
	  0xCBF2: ['SET_u8_r8', [x8_t, 6, 'd'], {}],
	  0xCBF3: ['SET_u8_r8', [x8_t, 6, 'e'], {}],
	  0xCBF4: ['SET_u8_r8', [x8_t, 6, 'h'], {}],
	  0xCBF5: ['SET_u8_r8', [x8_t, 6, 'l'], {}],
	  0xCBF6: ['SET_u8_(r16)', [x8_t, 6, 'hl'], {}],
	  0xCBF7: ['SET_u8_r8', [x8_t, 6, 'a'], {}],
	  0xCBF8: ['SET_u8_r8', [x8_t, 7, 'b'], {}],
	  0xCBF9: ['SET_u8_r8', [x8_t, 7, 'c'], {}],
	  0xCBFA: ['SET_u8_r8', [x8_t, 7, 'd'], {}],
	  0xCBFB: ['SET_u8_r8', [x8_t, 7, 'e'], {}],
	  0xCBFC: ['SET_u8_r8', [x8_t, 7, 'h'], {}],
	  0xCBFD: ['SET_u8_r8', [x8_t, 7, 'l'], {}],
	  0xCBFE: ['SET_u8_(r16)', [x8_t, 7, 'hl'], {}],
	  0xCBFF: ['SET_u8_r8', [x8_t, 7, 'a'], {}]
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  templates: {get: function() {
	      return templates;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47__46__46__47__46__46__47__46__46__47_utils_47_FormatUtils__;
	__webpack_require__(2);
	var $__0 = ($___46__46__47__46__46__47__46__46__47__46__46__47_utils_47_FormatUtils__ = __webpack_require__(8), $___46__46__47__46__46__47__46__46__47__46__46__47_utils_47_FormatUtils__ && $___46__46__47__46__46__47__46__46__47__46__46__47_utils_47_FormatUtils__.__esModule && $___46__46__47__46__46__47__46__46__47__46__46__47_utils_47_FormatUtils__ || {default: $___46__46__47__46__46__47__46__46__47__46__46__47_utils_47_FormatUtils__}),
	    formatAddress = $__0.formatAddress,
	    formatHexadecimal = $__0.formatHexadecimal,
	    formatRelativeAddress = $__0.formatRelativeAddress;
	var label = (function(address) {
	  switch (address) {
	    case 0xFF40:
	      return ' ; lcd control';
	    case 0xFF41:
	      return ' ; lcd stat';
	    case 0xFF42:
	      return ' ; scroll y';
	    case 0xFF43:
	      return ' ; scroll x';
	    case 0xFF45:
	      return ' ; lyc';
	    case 0xFF47:
	      return ' ; background palette';
	    case 0xFF48:
	      return ' ; obj palette 0';
	    case 0xFF49:
	      return ' ; obj palette 1';
	    case 0xFF41:
	      return ' ; window y';
	    case 0xFFFF:
	      return ' ; interrupt enable';
	    default:
	      return '';
	  }
	});
	var templates = {
	  'NOP': (function(address, nextAddress, parameters) {
	    return "nop";
	  }),
	  'STOP_u8': (function(address, nextAddress, parameters) {
	    return "stop";
	  }),
	  'HALT': (function(address, nextAddress, parameters) {
	    return "halt";
	  }),
	  'DI': (function(address, nextAddress, parameters) {
	    return "di";
	  }),
	  'EI': (function(address, nextAddress, parameters) {
	    return "ei";
	  }),
	  'PUSH_r16': (function(address, nextAddress, parameters) {
	    return ("push " + parameters[0]);
	  }),
	  'POP_r16': (function(address, nextAddress, parameters) {
	    return ("pop " + parameters[0]);
	  }),
	  'POP_AF': (function(address, nextAddress, parameters) {
	    return "pop af";
	  }),
	  'CCF': (function(address, nextAddress, parameters) {
	    return "ccf";
	  }),
	  'SCF': (function(address, nextAddress, parameters) {
	    return "scf";
	  }),
	  'DAA': (function(address, nextAddress, parameters) {
	    return "daa";
	  }),
	  'INC_r8': (function(address, nextAddress, parameters) {
	    return ("inc " + parameters[0]);
	  }),
	  'INC_r16': (function(address, nextAddress, parameters) {
	    return ("inc " + parameters[0]);
	  }),
	  'INC_(r16)': (function(address, nextAddress, parameters) {
	    return ("inc [" + parameters[0] + "]");
	  }),
	  'DEC_r8': (function(address, nextAddress, parameters) {
	    return ("dec " + parameters[0]);
	  }),
	  'DEC_r16': (function(address, nextAddress, parameters) {
	    return ("dec " + parameters[0]);
	  }),
	  'DEC_(r16)': (function(address, nextAddress, parameters) {
	    return ("dec [" + parameters[0] + "]");
	  }),
	  'JR_NZ_i8': (function(address, nextAddress, parameters) {
	    return ("jr nz " + formatAddress(nextAddress + parameters[0], 16));
	  }),
	  'JR_Z_i8': (function(address, nextAddress, parameters) {
	    return ("jr z " + formatAddress(nextAddress + parameters[0], 16));
	  }),
	  'JR_NC_i8': (function(address, nextAddress, parameters) {
	    return ("jr nc " + formatAddress(nextAddress + parameters[0], 16));
	  }),
	  'JR_C_i8': (function(address, nextAddress, parameters) {
	    return ("jr c " + formatAddress(nextAddress + parameters[0], 16));
	  }),
	  'JR_i8': (function(address, nextAddress, parameters) {
	    return ("jr " + formatAddress(nextAddress + parameters[0], 16));
	  }),
	  'JP_NZ_u16': (function(address, nextAddress, parameters) {
	    return ("jp nz " + formatAddress(parameters[0], 16) + label(parameters[0]));
	  }),
	  'JP_Z_u16': (function(address, nextAddress, parameters) {
	    return ("jp z " + formatAddress(parameters[0], 16) + label(parameters[0]));
	  }),
	  'JP_NC_u16': (function(address, nextAddress, parameters) {
	    return ("jp nc " + formatAddress(parameters[0], 16) + label(parameters[0]));
	  }),
	  'JP_C_u16': (function(address, nextAddress, parameters) {
	    return ("jp c " + formatAddress(parameters[0], 16) + label(parameters[0]));
	  }),
	  'JP_u16': (function(address, nextAddress, parameters) {
	    return ("jp " + formatAddress(parameters[0], 16) + label(parameters[0]));
	  }),
	  'JP_r16': (function(address, nextAddress, parameters) {
	    return ("jp " + parameters[0]);
	  }),
	  'CALL_NZ_u16': (function(address, nextAddress, parameters) {
	    return ("call nz " + formatAddress(parameters[0], 16) + label(parameters[0]));
	  }),
	  'CALL_Z_u16': (function(address, nextAddress, parameters) {
	    return ("call z " + formatAddress(parameters[0], 16) + label(parameters[0]));
	  }),
	  'CALL_NC_u16': (function(address, nextAddress, parameters) {
	    return ("call nc " + formatAddress(parameters[0], 16) + label(parameters[0]));
	  }),
	  'CALL_C_u16': (function(address, nextAddress, parameters) {
	    return ("call c " + formatAddress(parameters[0], 16) + label(parameters[0]));
	  }),
	  'CALL_u16': (function(address, nextAddress, parameters) {
	    return ("call " + formatAddress(parameters[0], 16) + label(parameters[0]));
	  }),
	  'RET_NZ': (function(address, nextAddress, parameters) {
	    return "ret nz";
	  }),
	  'RET_Z': (function(address, nextAddress, parameters) {
	    return "ret z";
	  }),
	  'RET_NC': (function(address, nextAddress, parameters) {
	    return "ret nc";
	  }),
	  'RET_C': (function(address, nextAddress, parameters) {
	    return "ret c";
	  }),
	  'RET': (function(address, nextAddress, parameters) {
	    return "ret";
	  }),
	  'RETI': (function(address, nextAddress, parameters) {
	    return "reti";
	  }),
	  'RST_u8': (function(address, nextAddress, parameters) {
	    return ("rst " + formatAddress(parameters[0], 16));
	  }),
	  'ADC_r8_r8': (function(address, nextAddress, parameters) {
	    return ("adc " + parameters[0] + ", " + parameters[1]);
	  }),
	  'ADC_r8_u8': (function(address, nextAddress, parameters) {
	    return ("adc " + parameters[0] + ", " + formatHexadecimal(parameters[1], 8));
	  }),
	  'ADC_r8_(r16)': (function(address, nextAddress, parameters) {
	    return ("adc " + parameters[0] + ", [" + parameters[1] + "]");
	  }),
	  'ADD_r8_r8': (function(address, nextAddress, parameters) {
	    return ("add " + parameters[0] + ", " + parameters[1]);
	  }),
	  'ADD_r8_u8': (function(address, nextAddress, parameters) {
	    return ("add " + parameters[0] + ", " + formatHexadecimal(parameters[1], 8));
	  }),
	  'ADD_r8_(r16)': (function(address, nextAddress, parameters) {
	    return ("add " + parameters[0] + ", [" + parameters[1] + "]");
	  }),
	  'ADD_r16_i8': (function(address, nextAddress, parameters) {
	    return ("add " + parameters[0] + ", " + parameters[1]);
	  }),
	  'ADD_r16_r16': (function(address, nextAddress, parameters) {
	    return ("add " + parameters[0] + ", " + parameters[1]);
	  }),
	  'SBC_r8_r8': (function(address, nextAddress, parameters) {
	    return ("sbc " + parameters[0] + ", " + parameters[1]);
	  }),
	  'SBC_r8_u8': (function(address, nextAddress, parameters) {
	    return ("sbc " + parameters[0] + ", " + formatHexadecimal(parameters[1], 8));
	  }),
	  'SBC_r8_(r16)': (function(address, nextAddress, parameters) {
	    return ("sbc " + parameters[0] + ", [" + parameters[1] + "]");
	  }),
	  'SUB_r8_r8': (function(address, nextAddress, parameters) {
	    return ("sub " + parameters[0] + ", " + parameters[1]);
	  }),
	  'SUB_r8_u8': (function(address, nextAddress, parameters) {
	    return ("sub " + parameters[0] + ", " + formatHexadecimal(parameters[1], 8));
	  }),
	  'SUB_r8_(r16)': (function(address, nextAddress, parameters) {
	    return ("sub " + parameters[0] + ", [" + parameters[1] + "]");
	  }),
	  'CP_r8_r8': (function(address, nextAddress, parameters) {
	    return ("cp " + parameters[0] + ", " + parameters[1]);
	  }),
	  'CP_r8_u8': (function(address, nextAddress, parameters) {
	    return ("cp " + parameters[0] + ", " + formatHexadecimal(parameters[1], 8));
	  }),
	  'CP_r8_(r16)': (function(address, nextAddress, parameters) {
	    return ("cp " + parameters[0] + ", [" + parameters[1] + "]");
	  }),
	  'AND_r8_r8': (function(address, nextAddress, parameters) {
	    return ("and " + parameters[0] + ", " + parameters[1]);
	  }),
	  'AND_r8_u8': (function(address, nextAddress, parameters) {
	    return ("and " + parameters[0] + ", " + formatHexadecimal(parameters[1], 8));
	  }),
	  'AND_r8_(r16)': (function(address, nextAddress, parameters) {
	    return ("and " + parameters[0] + ", [" + parameters[1] + "]");
	  }),
	  'OR_r8_r8': (function(address, nextAddress, parameters) {
	    return ("xor " + parameters[0] + ", " + parameters[1]);
	  }),
	  'OR_r8_u8': (function(address, nextAddress, parameters) {
	    return ("xor " + parameters[0] + ", " + formatHexadecimal(parameters[1], 8));
	  }),
	  'OR_r8_(r16)': (function(address, nextAddress, parameters) {
	    return ("xor " + parameters[0] + ", [" + parameters[1] + "]");
	  }),
	  'XOR_r8_r8': (function(address, nextAddress, parameters) {
	    return ("xor " + parameters[0] + ", " + parameters[1]);
	  }),
	  'XOR_r8_u8': (function(address, nextAddress, parameters) {
	    return ("xor " + parameters[0] + ", " + formatHexadecimal(parameters[1], 8));
	  }),
	  'XOR_r8_(r16)': (function(address, nextAddress, parameters) {
	    return ("xor " + parameters[0] + ", [" + parameters[1] + "]");
	  }),
	  'CPL_r8': (function(address, nextAddress, parameters) {
	    return ("cpl " + parameters[0]);
	  }),
	  'RR_r8': (function(address, nextAddress, parameters) {
	    return ("rr " + parameters[0]);
	  }),
	  'RR_(r16)': (function(address, nextAddress, parameters) {
	    return ("rr [" + parameters[0] + "]");
	  }),
	  'RRC_r8': (function(address, nextAddress, parameters) {
	    return ("rrc " + parameters[0]);
	  }),
	  'RRC_(r16)': (function(address, nextAddress, parameters) {
	    return ("rrc [" + parameters[0] + "]");
	  }),
	  'RRA': (function(address, nextAddress, parameters) {
	    return "rra";
	  }),
	  'RRCA': (function(address, nextAddress, parameters) {
	    return "rrca";
	  }),
	  'RL_r8': (function(address, nextAddress, parameters) {
	    return ("rl " + parameters[0]);
	  }),
	  'RL_(r16)': (function(address, nextAddress, parameters) {
	    return ("rl [" + parameters[0] + "]");
	  }),
	  'RLC_r8': (function(address, nextAddress, parameters) {
	    return ("rlc " + parameters[0]);
	  }),
	  'RLC_(r16)': (function(address, nextAddress, parameters) {
	    return ("rlc [" + parameters[0] + "]");
	  }),
	  'RLA': (function(address, nextAddress, parameters) {
	    return "rla";
	  }),
	  'RLCA': (function(address, nextAddress, parameters) {
	    return "rlca";
	  }),
	  'SLA_r8': (function(address, nextAddress, parameters) {
	    return ("sla " + parameters[0]);
	  }),
	  'SLA_(r16)': (function(address, nextAddress, parameters) {
	    return ("sla [" + parameters[0] + "]");
	  }),
	  'SRA_r8': (function(address, nextAddress, parameters) {
	    return ("sra " + parameters[0]);
	  }),
	  'SRA_(r16)': (function(address, nextAddress, parameters) {
	    return ("sra [" + parameters[0] + "]");
	  }),
	  'SRL_r8': (function(address, nextAddress, parameters) {
	    return ("srl " + parameters[0]);
	  }),
	  'SRL_(r16)': (function(address, nextAddress, parameters) {
	    return ("srl [" + parameters[0] + "]");
	  }),
	  'BIT_u8_r8': (function(address, nextAddress, parameters) {
	    return ("bit " + parameters[0] + " " + parameters[1]);
	  }),
	  'BIT_u8_(r16)': (function(address, nextAddress, parameters) {
	    return ("bit " + parameters[0] + " [" + parameters[1] + "]");
	  }),
	  'RES_u8_r8': (function(address, nextAddress, parameters) {
	    return ("res " + parameters[0] + " " + parameters[1]);
	  }),
	  'RES_u8_(r16)': (function(address, nextAddress, parameters) {
	    return ("res " + parameters[0] + " [" + parameters[1] + "]");
	  }),
	  'SET_u8_r8': (function(address, nextAddress, parameters) {
	    return ("set " + parameters[0] + " " + parameters[1]);
	  }),
	  'SET_u8_(r16)': (function(address, nextAddress, parameters) {
	    return ("set " + parameters[0] + " [" + parameters[1] + "]");
	  }),
	  'SWAP_r8': (function(address, nextAddress, parameters) {
	    return ("swap " + parameters[0]);
	  }),
	  'SWAP_(r16)': (function(address, nextAddress, parameters) {
	    return ("swap [" + parameters[0] + "]");
	  }),
	  'LD_r16_r16': (function(address, nextAddress, parameters) {
	    return ("ld " + parameters[0] + ", " + parameters[1]);
	  }),
	  'LD_r16_u16': (function(address, nextAddress, parameters) {
	    return ("ld " + parameters[0] + ", " + formatHexadecimal(parameters[1], 16));
	  }),
	  'LD_r8_r8': (function(address, nextAddress, parameters) {
	    return ("ld " + parameters[0] + ", " + parameters[1]);
	  }),
	  'LD_r8_u8': (function(address, nextAddress, parameters) {
	    return ("ld " + parameters[0] + ", " + formatHexadecimal(parameters[1], 8));
	  }),
	  'LD_(u16)_r8': (function(address, nextAddress, parameters) {
	    return ("ld [" + formatAddress(parameters[0], 16) + "], " + parameters[1] + label(parameters[0]));
	  }),
	  'LD_(u16)_r16': (function(address, nextAddress, parameters) {
	    return ("ld [" + formatAddress(parameters[0], 16) + "], " + parameters[1] + label(parameters[0]));
	  }),
	  'LD_(r16)_u8': (function(address, nextAddress, parameters) {
	    return ("ld [" + parameters[0] + "], " + formatHexadecimal(parameters[1], 8));
	  }),
	  'LD_(r16)_r8': (function(address, nextAddress, parameters) {
	    return ("ld [" + parameters[0] + "], " + parameters[1]);
	  }),
	  'LD_r8_(u16)': (function(address, nextAddress, parameters) {
	    return ("ld " + parameters[0] + ", [" + formatAddress(parameters[1], 16) + "]" + label(parameters[1]));
	  }),
	  'LD_r8_(r16)': (function(address, nextAddress, parameters) {
	    return ("ld " + parameters[0] + ", [" + parameters[1] + "]");
	  }),
	  'LD_r8_(r8)': (function(address, nextAddress, parameters) {
	    return ("ld " + parameters[0] + ", [" + parameters[1] + "]");
	  }),
	  'LD_(r8)_r8': (function(address, nextAddress, parameters) {
	    return ("ld [" + parameters[0] + "], " + parameters[1]);
	  }),
	  'LDH_r8_(u8)': (function(address, nextAddress, parameters) {
	    return ("ld " + parameters[0] + ", [" + formatRelativeAddress(0xFF00, parameters[1], 16, 8) + "]" + label(0xFF00 + parameters[1]));
	  }),
	  'LDH_(u8)_r8': (function(address, nextAddress, parameters) {
	    return ("ld [" + formatRelativeAddress(0xFF00, parameters[0], 16, 8) + "], " + parameters[1] + label(0xFF00 + parameters[0]));
	  }),
	  'LDHL_r16_i8': (function(address, nextAddress, parameters) {
	    return ("ld hl, [" + formatAddress(parameters[0], parameters[1], null, 8) + "]");
	  }),
	  'LDI_(r16)_r8': (function(address, nextAddress, parameters) {
	    return ("ld [" + parameters[0] + "+], " + parameters[1]);
	  }),
	  'LDI_r8_(r16)': (function(address, nextAddress, parameters) {
	    return ("ld " + parameters[0] + ", [" + parameters[1] + "+]");
	  }),
	  'LDD_(r16)_r8': (function(address, nextAddress, parameters) {
	    return ("ld [" + parameters[0] + "-], " + parameters[1]);
	  }),
	  'LDD_r8_(r16)': (function(address, nextAddress, parameters) {
	    return ("ld " + parameters[0] + ", [" + parameters[1] + "-]");
	  })
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  templates: {get: function() {
	      return templates;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var templates = {
	  'NOP': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'DI': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.delayInterruptSwitch(false, 0) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'EI': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        // Note that EI is the only instruction to have a delayed interrupt switch (not even RETI!)\n\n        " + h.delayInterruptSwitch(true, 1) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'PUSH_r16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.pushStack(h.readR16(parameters[0])) + ";\n\n        " + h.applyClockCycles(4) + ";\n\n    ");
	  }),
	  'POP_r16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var value;\n        " + h.popStack('value') + ";\n\n        " + h.writeR16(parameters[0], 'value') + ";\n\n        " + h.applyClockCycles(3) + ";\n\n    ");
	  }),
	  'POP_AF': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var value;\n        " + h.popStack('value') + ";\n\n        " + h.writeR16('af', 'value & 0xFFF0') + ";\n\n        " + h.applyClockCycles(3) + ";\n\n    ");
	  }),
	  'LD_r16_r16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.writeR16(parameters[0], h.readR16(parameters[1])) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LD_r16_u16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.writeR16(parameters[0], parameters[1]) + ";\n\n        " + h.applyClockCycles(3) + ";\n\n    ");
	  }),
	  'LD_r8_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.writeR8(parameters[0], h.readR8(parameters[1])) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'LD_r8_u8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.writeR8(parameters[0], parameters[1]) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LD_r8_(u16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.applyClockCycles(2) + ";\n\n        " + h.writeR8(parameters[0], h.readMem8(parameters[1])) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LD_(u16)_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.applyClockCycles(2) + ";\n\n        " + h.writeMem8(parameters[0], h.readR8(parameters[1])) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LD_(u16)_r16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.writeMem16(parameters[0], h.readR16(parameters[1])) + ";\n\n        " + h.applyClockCycles(5) + ";\n\n    ");
	  }),
	  'LD_(r16)_u8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8(h.readR16(parameters[0]), parameters[1]) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LD_(r16)_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.writeMem8(h.readR16(parameters[0]), h.readR8(parameters[1])) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LD_r8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.writeR8(parameters[0], h.readMem8(h.readR16(parameters[1]))) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LD_r8_(r8)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.writeR8(parameters[0], h.readMem8(h.add16(0xFF00, h.readR8(parameters[1])))) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LD_(r8)_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.writeMem8(h.add16(0xFF00, h.readR8(parameters[0])), h.readR8(parameters[1])) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LDH_r8_(u8)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeR8(parameters[0], h.readMem8(h.add16(0xFF00, parameters[1]))) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LDH_(u8)_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8(h.add16(0xFF00, parameters[0]), h.readR8(parameters[1])) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LDHL_r16_i8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var hlBefore = " + h.readR16(parameters[0]) + ";\n        var hlAfter = " + h.add16('hlBefore', parameters[1]) + ";\n\n        " + h.writeR16('hl', 'hlAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero(false) + ";\n        " + h.half('hlAfter', '<', 'hlBefore') + ";\n        " + h.carry('hlAfter', '<', 'hlBefore') + ";\n\n        " + h.applyClockCycles(3) + ";\n\n    ");
	  }),
	  'LDI_(r16)_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var position = " + h.readR16(parameters[0]) + ";\n        " + h.writeMem8('position', h.readR8(parameters[1])) + ";\n\n        " + h.writeR16(parameters[0], h.add16('position', 1)) + "\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LDI_r8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var position = " + h.readR16(parameters[1]) + ";\n        " + h.writeR8(parameters[0], h.readMem8('position')) + ";\n\n        " + h.writeR16(parameters[1], h.add16('position', 1)) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LDD_(r16)_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var position = " + h.readR16(parameters[0]) + ";\n        " + h.writeMem8('position', h.readR8(parameters[1])) + ";\n\n        " + h.writeR16(parameters[0], h.sub16('position', 1)) + "\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'LDD_r8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var position = " + h.readR16(parameters[1]) + ";\n        " + h.writeR8(parameters[0], h.readMem8('position')) + ";\n\n        " + h.writeR16(parameters[1], h.sub16('position', 1)) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'CCF': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.bcd(false) + ";\n        " + h.half(false) + ";\n\n        if (" + h.carry() + ") {\n            " + h.carry(false) + ";\n        } else {\n            " + h.carry(true) + ";\n        }\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'SCF': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.bcd(false) + ";\n        " + h.half(false) + ";\n        " + h.carry(true) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'DAA': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var tmpA = " + h.readR8('a') + ";\n        var correction = 0;\n\n        if (" + h.half() + ")\n            correction |= 0x06;\n        if (" + h.carry() + ")\n            correction |= 0x60;\n\n        if (" + h.bcd() + ") {\n\n            " + h.writeR8('a', h.sub8('tmpA', 'correction')) + ";\n\n        } else {\n\n            if ((tmpA & 0x0F) > 0x09)\n                correction |= 0x06;\n            if ((tmpA & 0xFF) > 0x99)\n                correction |= 0x60;\n\n            " + h.writeR8('a', h.add8('tmpA', 'correction')) + "\n\n        }\n\n        " + h.zero(h.readR8('a')) + ";\n        " + h.half(false) + ";\n\n        if (correction & 0x60) {\n            " + h.carry(true) + "\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'INC_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.add8('rBefore', 1) + ";\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half('rAfter', '<', 'rBefore') + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'INC_r16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.writeR16(parameters[0], h.add16(h.readR16(parameters[0]), 1)) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'INC_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var target = " + h.readR16(parameters[0]) + ";\n\n        var mBefore = " + h.readMem8('target') + ";\n        var mAfter = " + h.add8('mBefore', 1) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8('target', 'mAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('mAfter') + ";\n        " + h.half('mAfter', '<', 'mBefore') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'DEC_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.sub8('rBefore', 1) + ";\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(true) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half('rAfter', '>', 'rBefore') + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'DEC_r16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.writeR16(parameters[0], h.sub16(h.readR16(parameters[0]), 1)) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'DEC_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var target = " + h.readR16(parameters[0]) + ";\n\n        var mBefore = " + h.readMem8('target') + ";\n        var mAfter = " + h.sub8('mBefore', 1) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8('target', 'mAfter') + ";\n\n        " + h.bcd(true) + ";\n        " + h.zero('mAfter') + ";\n        " + h.half('mAfter', '>', 'mBefore') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'JR_NZ_i8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.zero() + " === 0) {\n\n            " + h.applyClockCycles(3) + ";\n            " + h.jumpTo(h.add16(nextAddress, parameters[0])) + ";\n\n        } else {\n\n            " + h.applyClockCycles(2) + ";\n\n        }\n\n    ");
	  }),
	  'JR_Z_i8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.zero() + " === 1) {\n\n            " + h.applyClockCycles(3) + ";\n            " + h.jumpTo(h.add16(nextAddress, parameters[0])) + ";\n\n        } else {\n\n            " + h.applyClockCycles(2) + ";\n\n        }\n\n    ");
	  }),
	  'JR_NC_i8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.carry() + " === 0) {\n\n            " + h.applyClockCycles(3) + ";\n            " + h.jumpTo(h.add16(nextAddress, parameters[0])) + ";\n\n        } else {\n\n            " + h.applyClockCycles(2) + ";\n\n        }\n\n    ");
	  }),
	  'JR_C_i8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.carry() + " === 1) {\n\n            " + h.applyClockCycles(3) + ";\n            " + h.jumpTo(h.add16(nextAddress, parameters[0])) + ";\n\n        } else {\n\n            " + h.applyClockCycles(2) + ";\n\n        }\n\n    ");
	  }),
	  'JR_i8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.applyClockCycles(3) + ";\n        " + h.jumpTo(h.add16(nextAddress, parameters[0])) + ";\n\n    ");
	  }),
	  'JP_NZ_u16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.zero() + " === 0) {\n\n            " + h.applyClockCycles(4) + ";\n            " + h.jumpTo(parameters[0]) + ";\n\n        } else {\n\n            " + h.applyClockCycles(3) + ";\n\n        }\n\n    ");
	  }),
	  'JP_Z_u16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.zero() + " === 1) {\n\n            " + h.applyClockCycles(4) + ";\n            " + h.jumpTo(parameters[0]) + ";\n\n        } else {\n\n            " + h.applyClockCycles(3) + ";\n\n        }\n\n    ");
	  }),
	  'JP_NC_u16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.carry() + " === 0) {\n\n            " + h.applyClockCycles(4) + ";\n            " + h.jumpTo(parameters[0]) + ";\n\n        } else {\n\n            " + h.applyClockCycles(3) + ";\n\n        }\n\n    ");
	  }),
	  'JP_C_u16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.carry() + " === 1) {\n\n            " + h.applyClockCycles(4) + ";\n            " + h.jumpTo(parameters[0]) + ";\n\n        } else {\n\n            " + h.applyClockCycles(3) + ";\n\n        }\n\n    ");
	  }),
	  'JP_u16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.applyClockCycles(4) + ";\n        " + h.jumpTo(parameters[0]) + ";\n\n    ");
	  }),
	  'JP_r16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.applyClockCycles(1) + ";\n        " + h.jumpTo(h.readR16(parameters[0])) + ";\n\n    ");
	  }),
	  'CALL_NZ_u16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.zero() + " === 0) {\n\n            " + h.pushStack(nextAddress) + ";\n\n            " + h.applyClockCycles(6) + ";\n            " + h.jumpTo(parameters[0]) + ";\n\n        } else {\n\n            " + h.applyClockCycles(3) + ";\n\n        }\n\n    ");
	  }),
	  'CALL_Z_u16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.zero() + " === 1) {\n\n            " + h.pushStack(nextAddress) + ";\n\n            " + h.applyClockCycles(6) + ";\n            " + h.jumpTo(parameters[0]) + ";\n\n        } else {\n\n            " + h.applyClockCycles(3) + ";\n\n        }\n\n    ");
	  }),
	  'CALL_NC_u16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.carry() + " === 0) {\n\n            " + h.pushStack(nextAddress) + ";\n\n            " + h.applyClockCycles(6) + ";\n            " + h.jumpTo(parameters[0]) + ";\n\n        } else {\n\n            " + h.applyClockCycles(3) + ";\n\n        }\n\n    ");
	  }),
	  'CALL_C_u16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.carry() + " === 1) {\n\n            " + h.pushStack(nextAddress) + ";\n\n            " + h.applyClockCycles(6) + ";\n            " + h.jumpTo(parameters[0]) + ";\n\n        } else {\n\n            " + h.applyClockCycles(3) + ";\n\n        }\n\n    ");
	  }),
	  'CALL_u16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.pushStack(nextAddress) + ";\n\n        " + h.applyClockCycles(6) + ";\n        " + h.jumpTo(parameters[0]) + ";\n\n    ");
	  }),
	  'RET_NZ': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.zero() + " === 0) {\n\n            var retTarget;\n            " + h.popStack('retTarget') + ";\n\n            " + h.applyClockCycles(5) + ";\n            " + h.jumpTo('retTarget') + ";\n\n        } else {\n\n            " + h.applyClockCycles(2) + ";\n\n        }\n\n    ");
	  }),
	  'RET_Z': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.zero() + " === 1) {\n\n            var retTarget;\n            " + h.popStack('retTarget') + ";\n\n            " + h.applyClockCycles(5) + ";\n            " + h.jumpTo('retTarget') + ";\n\n        } else {\n\n            " + h.applyClockCycles(2) + ";\n\n        }\n\n    ");
	  }),
	  'RET_NC': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.carry() + " === 0) {\n\n            var retTarget;\n            " + h.popStack('retTarget') + ";\n\n            " + h.applyClockCycles(5) + ";\n            " + h.jumpTo('retTarget') + ";\n\n        } else {\n\n            " + h.applyClockCycles(2) + ";\n\n        }\n\n    ");
	  }),
	  'RET_C': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        if (" + h.carry() + " === 1) {\n\n            var retTarget;\n            " + h.popStack('retTarget') + ";\n\n            " + h.applyClockCycles(5) + ";\n            " + h.jumpTo('retTarget') + ";\n\n        } else {\n\n            " + h.applyClockCycles(2) + ";\n\n        }\n\n    ");
	  }),
	  'RET': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var retTarget;\n        " + h.popStack('retTarget') + ";\n\n        " + h.applyClockCycles(4) + ";\n        " + h.jumpTo('retTarget') + ";\n\n    ");
	  }),
	  'RETI': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.delayInterruptSwitch(true, 0) + ";\n\n        var retTarget;\n        " + h.popStack('retTarget') + ";\n\n        " + h.applyClockCycles(4) + ";\n        " + h.jumpTo('retTarget') + ";\n\n    ");
	  }),
	  'RST_u8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.pushStack(nextAddress) + ";\n\n        " + h.applyClockCycles(4) + ";\n        " + h.jumpTo(parameters[0]) + ";\n\n    ");
	  }),
	  'ADC_r8_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.add8('rBefore', h.readR8(parameters[1])) + ";\n        var rAfterCarry = " + h.add8('rAfter', h.carry()) + ";\n\n        " + h.writeR8(parameters[0], 'rAfterCarry') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfterCarry') + ";\n\n        " + h.half('rAfter', '<', 'rBefore') + ";\n        " + h.carry('rAfter', '<', 'rBefore') + ";\n\n        if (" + h.half() + " === 0)\n            " + h.half('rAfterCarry', '<', 'rAfter') + ";\n\n        if (" + h.carry() + " === 0)\n            " + h.carry('rAfterCarry', '<', 'rAfter') + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'ADC_r8_u8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.add8('rBefore', parameters[1]) + ";\n        var rAfterCarry = " + h.add8('rAfter', h.carry()) + ";\n\n        " + h.writeR8(parameters[0], 'rAfterCarry') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfterCarry') + ";\n\n        " + h.half('rAfter', '<', 'rBefore') + ";\n        " + h.carry('rAfter', '<', 'rBefore') + ";\n\n        if (" + h.half() + " === 0)\n            " + h.half('rAfterCarry', '<', 'rAfter') + ";\n\n        if (" + h.carry() + " === 0)\n            " + h.carry('rAfterCarry', '<', 'rAfter') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'ADC_r8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.add8('rBefore', h.readMem8(h.readR16(parameters[1]))) + ";\n        var rAfterCarry = " + h.add8('rAfter', h.carry()) + ";\n\n        " + h.writeR8(parameters[0], 'rAfterCarry') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfterCarry') + ";\n\n        " + h.half('rAfter', '<', 'rBefore') + ";\n        " + h.carry('rAfter', '<', 'rBefore') + ";\n\n        if (" + h.half() + " === 0)\n            " + h.half('rAfterCarry', '<', 'rAfter') + ";\n\n        if (" + h.carry() + " === 0)\n            " + h.carry('rAfterCarry', '<', 'rAfter') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'ADD_r8_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.add8('rBefore', h.readR8(parameters[1])) + ";\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half('rAfter', '<', 'rBefore') + ";\n        " + h.carry('rAfter', '<', 'rBefore') + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'ADD_r8_u8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.add8('rBefore', parameters[1]) + ";\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half('rAfter', '<', 'rBefore') + ";\n        " + h.carry('rAfter', '<', 'rBefore') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'ADD_r16_r16': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR16(parameters[0]) + ";\n        var rAfter = " + h.add16('rBefore', h.readR16(parameters[1])) + ";\n\n        " + h.writeR16(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.half('rAfter', '<', 'rBefore', 0x0FFF) + ";\n        " + h.carry('rAfter', '<', 'rBefore', 0xFFFF) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'ADD_r8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.add8('rBefore', h.readMem8(h.readR16(parameters[1]))) + ";\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half('rAfter', '<', 'rBefore') + ";\n        " + h.carry('rAfter', '<', 'rBefore') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'ADD_r16_i8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rrBefore = " + h.readR16(parameters[0]) + ";\n        var rrAfter = " + h.add16('rrBefore', parameters[1]) + ";\n\n        " + h.writeR16(parameters[0], 'rrAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero(false) + ";\n        " + h.half('rrAfter', '<', 'rrBefore') + ";\n        " + h.carry('rrAfter', '<', 'rrBefore') + ";\n\n        " + h.applyClockCycles(4) + ";\n\n    ");
	  }),
	  'SBC_r8_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.sub8('rBefore', h.readR8(parameters[1])) + ";\n        var rAfterCarry = " + h.sub8('rAfter', h.carry()) + ";\n\n        " + h.writeR8(parameters[0], 'rAfterCarry') + ";\n\n        " + h.bcd(true) + ";\n        " + h.zero('rAfterCarry') + ";\n\n        " + h.half('rAfter', '>', 'rBefore') + ";\n        " + h.carry('rAfter', '>', 'rBefore') + ";\n\n        if (" + h.half() + " === 0)\n            " + h.half('rAfterCarry', '>', 'rAfter') + ";\n\n        if (" + h.carry() + " === 0)\n            " + h.carry('rAfterCarry', '>', 'rAfter') + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'SBC_r8_u8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.sub8('rBefore', parameters[1]) + ";\n        var rAfterCarry = " + h.sub8('rAfter', h.carry()) + ";\n\n        " + h.writeR8(parameters[0], 'rAfterCarry') + ";\n\n        " + h.bcd(true) + ";\n        " + h.zero('rAfterCarry') + ";\n\n        " + h.half('rAfter', '>', 'rBefore') + ";\n        " + h.carry('rAfter', '>', 'rBefore') + ";\n\n        if (" + h.half() + " === 0)\n            " + h.half('rAfterCarry', '>', 'rAfter') + ";\n\n        if (" + h.carry() + " === 0)\n            " + h.carry('rAfterCarry', '>', 'rAfter') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'SBC_r8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.sub8('rBefore', h.readMem8(h.readR16(parameters[1]))) + ";\n        var rAfterCarry = " + h.sub8('rAfter', h.carry()) + ";\n\n        " + h.writeR8(parameters[0], 'rAfterCarry') + ";\n\n        " + h.bcd(true) + ";\n        " + h.zero('rAfterCarry') + ";\n\n        " + h.half('rAfter', '>', 'rBefore') + ";\n        " + h.carry('rAfter', '>', 'rBefore') + ";\n\n        if (" + h.half() + " === 0)\n            " + h.half('rAfterCarry', '>', 'rAfter') + ";\n\n        if (" + h.carry() + " === 0)\n            " + h.carry('rAfterCarry', '>', 'rAfter') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'CP_r8_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var tmp = " + h.readR8(parameters[0]) + ";\n        var cmp = " + h.sub8('tmp', h.readR8(parameters[1])) + ";\n\n        " + h.bcd(true) + ";\n        " + h.zero('cmp') + ";\n        " + h.half('cmp', '>', 'tmp') + ";\n        " + h.carry('cmp', '>', 'tmp') + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'CP_r8_u8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var tmp = " + h.readR8(parameters[0]) + ";\n        var cmp = " + h.sub8('tmp', parameters[1]) + ";\n\n        " + h.bcd(true) + ";\n        " + h.zero('cmp') + ";\n        " + h.half('cmp', '>', 'tmp') + ";\n        " + h.carry('cmp', '>', 'tmp') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'CP_r8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var tmp = " + h.readR8(parameters[0]) + ";\n        var cmp = " + h.sub8('tmp', h.readMem8(h.readR16(parameters[1]))) + ";\n\n        " + h.bcd(true) + ";\n        " + h.zero('cmp') + ";\n        " + h.half('cmp', '>', 'tmp') + ";\n        " + h.carry('cmp', '>', 'tmp') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'SUB_r8_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.sub8('rBefore', h.readR8(parameters[1])) + ";\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(true) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half('rAfter', '>', 'rBefore') + ";\n        " + h.carry('rAfter', '>', 'rBefore') + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'SUB_r8_u8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.sub8('rBefore', parameters[1]) + ";\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(true) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half('rAfter', '>', 'rBefore') + ";\n        " + h.carry('rAfter', '>', 'rBefore') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'SUB_r8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = " + h.sub8('rBefore', h.readMem8(h.readR16(parameters[1]))) + ";\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(true) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half('rAfter', '>', 'rBefore') + ";\n        " + h.carry('rAfter', '>', 'rBefore') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'AND_r8_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var value = " + h.readR8(parameters[0]) + " & " + h.readR8(parameters[1]) + ";\n\n        " + h.writeR8(parameters[0], 'value') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('value') + ";\n        " + h.half(true) + ";\n        " + h.carry(false) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'AND_r8_u8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var value = " + h.readR8(parameters[0]) + " & " + parameters[1] + ";\n\n        " + h.writeR8(parameters[0], 'value') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('value') + ";\n        " + h.half(true) + ";\n        " + h.carry(false) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'AND_r8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var value = " + h.readR8(parameters[0]) + " & " + h.readMem8(h.readR16(parameters[1])) + ";\n\n        " + h.writeR8(parameters[0], 'value') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('value') + ";\n        " + h.half(true) + ";\n        " + h.carry(false) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'OR_r8_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var value = " + h.readR8(parameters[0]) + " | " + h.readR8(parameters[1]) + ";\n\n        " + h.writeR8(parameters[0], 'value') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('value') + ";\n        " + h.half(false) + ";\n        " + h.carry(false) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'OR_r8_u8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var value = " + h.readR8(parameters[0]) + " | " + parameters[1] + ";\n\n        " + h.writeR8(parameters[0], 'value') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('value') + ";\n        " + h.half(false) + ";\n        " + h.carry(false) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'OR_r8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var value = " + h.readR8(parameters[0]) + " | " + h.readMem8(h.readR16(parameters[1])) + ";\n\n        " + h.writeR8(parameters[0], 'value') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('value') + ";\n        " + h.half(false) + ";\n        " + h.carry(false) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'XOR_r8_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var value = " + h.readR8(parameters[0]) + " ^ " + h.readR8(parameters[1]) + ";\n\n        " + h.writeR8('a', 'value') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('value') + ";\n        " + h.half(false) + ";\n        " + h.carry(false) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'XOR_r8_u8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var value = " + h.readR8(parameters[0]) + " ^ " + parameters[1] + ";\n\n        " + h.writeR8('a', 'value') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('value') + ";\n        " + h.half(false) + ";\n        " + h.carry(false) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'XOR_r8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var value = " + h.readR8(parameters[0]) + " ^ " + h.readMem8(h.readR16(parameters[1])) + ";\n\n        " + h.writeR8('a', 'value') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('value') + ";\n        " + h.half(false) + ";\n        " + h.carry(false) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'CPL_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rAfter = ( ~ rBefore ) & 0xFF;\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(true) + ";\n        " + h.half(true) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'RR_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rightMostBit = rBefore & 0x01;\n\n        var rAfter = (rBefore >>> 1) | (" + h.carry() + " << 7);\n        " + h.writeR8(parameters[0], 'rAfter') + "\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half(false) + ";\n\n        if (rightMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'RR_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var target = " + h.readR16(parameters[0]) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n        var mBefore = " + h.readMem8('target') + ";\n        var rightMostBit = mBefore & 0x01;\n        var mAfter = (mBefore >>> 1) | (" + h.carry() + " << 7);\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8('target', 'mAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('mAfter') + ";\n        " + h.half(false) + ";\n\n        if (rightMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'RRC_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rightMostBit = rBefore & 0x01;\n        var rAfter = (rBefore >>> 1) | (rightMostBit << 7);\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half(false) + ";\n\n        if (rightMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'RRC_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var target = " + h.readR16(parameters[0]) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n        var mBefore = " + h.readMem8('target') + ";\n        var rightMostBit = mBefore & 0x01;\n        var mAfter = (mBefore >>> 1) | (rightMostBit << 7);\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8('target', 'mAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('mAfter') + ";\n        " + h.half(false) + ";\n\n        if (rightMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'RRA': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8('a') + ";\n        var rightMostBit = rBefore & 0x01;\n        var rAfter = (rBefore >>> 1) | (" + h.carry() + " << 7);\n\n        " + h.writeR8('a', 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero(false) + ";\n        " + h.half(false) + ";\n\n        if (rightMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'RRCA': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8('a') + ";\n        var rightMostBit = rBefore & 0x01;\n        var rAfter = (rBefore >>> 1) | (rightMostBit << 7);\n\n        " + h.writeR8('a', 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero(false) + ";\n        " + h.half(false) + ";\n\n        if (rightMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'RL_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var leftMostBit = rBefore >>> 7;\n        var rAfter = ((rBefore << 1) | " + h.carry() + ") & 0xFF;\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half(false) + ";\n\n        if (leftMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'RL_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var target = " + h.readR16(parameters[0]) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n        var mBefore = " + h.readMem8('target') + ";\n        var leftMostBit = mBefore >>> 7;\n        var mAfter = ((mBefore << 1) | " + h.carry() + ") & 0xFF;\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8('target', 'mAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('mAfter') + ";\n        " + h.half(false) + ";\n\n        if (leftMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'RLC_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var leftMostBit = rBefore >>> 7;\n        var rAfter = ((rBefore << 1) | leftMostBit) & 0xFF;\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half(false) + ";\n\n        if (leftMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'RLC_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var target = " + h.readR16(parameters[0]) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n        var mBefore = " + h.readMem8('target') + ";\n        var leftMostBit = mBefore >>> 7;\n        var mAfter = ((mBefore << 1) | leftMostBit) & 0xFF;\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8('target', 'mAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('mAfter') + ";\n        " + h.half(false) + ";\n\n        if (leftMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'RLA': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8('a') + ";\n        var leftMostBit = rBefore >>> 7;\n        var rAfter = ((rBefore << 1) | " + h.carry() + ") & 0xFF;\n\n        " + h.writeR8('a', 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero(false) + ";\n        " + h.half(false) + ";\n\n        if (leftMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'RLCA': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8('a') + ";\n        var leftMostBit = rBefore >>> 7;\n        var rAfter = ((rBefore << 1) | leftMostBit) & 0xFF;\n\n        " + h.writeR8('a', 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero(false) + ";\n        " + h.half(false) + ";\n\n        if (leftMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'SLA_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var leftMostBit = rBefore >>> 7;\n        var rAfter = (rBefore << 1) & 0xFF;\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half(false) + ";\n\n        if (leftMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'SLA_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var target = " + h.readR16(parameters[0]) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n        var rBefore = " + h.readMem8('target') + ";\n        var leftMostBit = rBefore >>> 7;\n        var rAfter = (rBefore << 1) & 0xFF;\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8('target', 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half(false) + ";\n\n        if (leftMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'SRA_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var leftMostBit = rBefore >>> 7;\n        var rightMostBit = rBefore & 0x01;\n        var rAfter = (rBefore >>> 1) | (leftMostBit << 7);\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half(false) + ";\n\n        if (rightMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'SRA_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var target = " + h.readR16(parameters[0]) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n        var rBefore = " + h.readMem8('target') + ";\n        var leftMostBit = rBefore >>> 7;\n        var rightMostBit = rBefore & 0x01;\n        var rAfter = (rBefore >>> 1) | (leftMostBit << 7);\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8('target', 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half(false) + ";\n\n        if (rightMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'SRL_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n        var rightMostBit = rBefore & 0x01;\n        var rAfter = rBefore >>> 1;\n\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half(false) + ";\n\n        if (rightMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'SRL_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var target = " + h.readR16(parameters[0]) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n        var rBefore = " + h.readMem8('target') + ";\n        var rightMostBit = rBefore & 0x01;\n        var rAfter = rBefore >> 1;\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8('target', 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half(false) + ";\n\n        if (rightMostBit === 1) {\n            " + h.carry(true) + ";\n        } else {\n            " + h.carry(false) + ";\n        }\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'BIT_u8_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var bit = " + h.readR8(parameters[1]) + " & (1 << " + parameters[0] + ");\n\n        " + h.bcd(false) + ";\n        " + h.zero('bit') + ";\n        " + h.half(true) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'BIT_u8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.applyClockCycles(1) + ";\n\n        var bit = " + h.readMem8(h.readR16(parameters[1])) + " & (1 << " + parameters[0] + ");\n\n        " + h.bcd(false) + ";\n        " + h.zero('bit') + ";\n        " + h.half(true) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'RES_u8_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rAfter = " + h.readR8(parameters[1]) + " & ~(1 << " + parameters[0] + ");\n        " + h.writeR8(parameters[1], 'rAfter') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'RES_u8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var target = " + h.readR16(parameters[1]) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n        var rAfter = " + h.readMem8('target') + " & ~(1 << " + parameters[0] + ");\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8('target', 'rAfter') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'SET_u8_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rAfter = " + h.readR8(parameters[1]) + " | (1 << " + parameters[0] + ");\n        " + h.writeR8(parameters[1], 'rAfter') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'SET_u8_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var target = " + h.readR16(parameters[1]) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n        var rAfter = " + h.readMem8('target') + " | (1 << " + parameters[0] + ");\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8('target', 'rAfter') + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'SWAP_r8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var rBefore = " + h.readR8(parameters[0]) + ";\n\n        var rAfter = ((rBefore << 4) | (rBefore >>> 4)) & 0xFF;\n        " + h.writeR8(parameters[0], 'rAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('rAfter') + ";\n        " + h.half(false) + ";\n        " + h.carry(false) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'SWAP_(r16)': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        var target = " + h.readR16(parameters[0]) + ";\n\n        " + h.applyClockCycles(1) + ";\n\n        var mBefore = " + h.readMem8('target') + ";\n        var mAfter = ((mBefore << 4) | (mBefore >>> 4)) & 0xFF;\n\n        " + h.applyClockCycles(1) + ";\n\n        " + h.writeMem8('target', 'mAfter') + ";\n\n        " + h.bcd(false) + ";\n        " + h.zero('mAfter') + ";\n        " + h.half(false) + ";\n        " + h.carry(false) + ";\n\n        " + h.applyClockCycles(2) + ";\n\n    ");
	  }),
	  'STOP_u8': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.stop() + ";\n\n        " + h.applySpeedSwitch() + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  }),
	  'HALT': (function(address, nextAddress, parameters, h) {
	    return ("\n\n        " + h.halt() + ";\n\n        " + h.applyClockCycles(1) + ";\n\n    ");
	  })
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  HBLANK_MODE: {get: function() {
	      return HBLANK_MODE;
	    }},
	  VBLANK_MODE: {get: function() {
	      return VBLANK_MODE;
	    }},
	  OAM_MODE: {get: function() {
	      return OAM_MODE;
	    }},
	  VRAM_MODE: {get: function() {
	      return VRAM_MODE;
	    }},
	  CYCLES_PER_HBLANK_LINE: {get: function() {
	      return CYCLES_PER_HBLANK_LINE;
	    }},
	  CYCLES_PER_VBLANK_LINE: {get: function() {
	      return CYCLES_PER_VBLANK_LINE;
	    }},
	  CYCLES_PER_OAM: {get: function() {
	      return CYCLES_PER_OAM;
	    }},
	  CYCLES_PER_VRAM: {get: function() {
	      return CYCLES_PER_VRAM;
	    }},
	  HBLANK_LINE_COUNT: {get: function() {
	      return HBLANK_LINE_COUNT;
	    }},
	  MAX_VIRTUAL_LINE_COUNT: {get: function() {
	      return MAX_VIRTUAL_LINE_COUNT;
	    }},
	  GPU: {get: function() {
	      return GPU;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var defaultColorsets = [[0xE3E6C9, 0xC3C4A5, 0x8E8B61, 0x6C6C4E], [0xE3E6C9, 0xC3C4A5, 0x8E8B61, 0x6C6C4E], [0xE3E6C9, 0xC3C4A5, 0x8E8B61, 0x6C6C4E]];
	var p005 = [[0xffffff, 0x52ff00, 0xff4200, 0x000000], [0xffffff, 0x52ff00, 0xff4200, 0x000000], [0xffffff, 0x52ff00, 0xff4200, 0x000000]];
	var p006 = [[0xffffff, 0xff9c00, 0xff0000, 0x000000], [0xffffff, 0xff9c00, 0xff0000, 0x000000], [0xffffff, 0xff9c00, 0xff0000, 0x000000]];
	var p007 = [[0xffffff, 0xffff00, 0xff0000, 0x000000], [0xffffff, 0xffff00, 0xff0000, 0x000000], [0xffffff, 0xffff00, 0xff0000, 0x000000]];
	var p008 = [[0xa59cff, 0xffff00, 0x006300, 0x000000], [0xa59cff, 0xffff00, 0x006300, 0x000000], [0xa59cff, 0xffff00, 0x006300, 0x000000]];
	var p012 = [[0xffffff, 0xffad63, 0x843100, 0x000000], [0xffffff, 0xffad63, 0x843100, 0x000000], [0xffffff, 0xffad63, 0x843100, 0x000000]];
	var p013 = [[0x000000, 0x008484, 0xffde00, 0xffffff], [0x000000, 0x008484, 0xffde00, 0xffffff], [0x000000, 0x008484, 0xffde00, 0xffffff]];
	var p016 = [[0xffffff, 0xa5a5a5, 0x525252, 0x000000], [0xffffff, 0xa5a5a5, 0x525252, 0x000000], [0xffffff, 0xa5a5a5, 0x525252, 0x000000]];
	var p017 = [[0xffffa5, 0xff9494, 0x9494ff, 0x000000], [0xffffa5, 0xff9494, 0x9494ff, 0x000000], [0xffffa5, 0xff9494, 0x9494ff, 0x000000]];
	var p100 = [[0xffffff, 0xadad84, 0x42737b, 0x000000], [0xffffff, 0xff7300, 0x944200, 0x000000], [0xffffff, 0xadad84, 0x42737b, 0x000000]];
	var p10B = [[0xffffff, 0x63a5ff, 0x0000ff, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000]];
	var p10D = [[0xffffff, 0x8c8cde, 0x52528c, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0x8c8cde, 0x52528c, 0x000000]];
	var p110 = [[0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0x7bff31, 0x008400, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000]];
	var p11C = [[0xffffff, 0x7bff31, 0x0063c5, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0x7bff31, 0x0063c5, 0x000000]];
	var p20B = [[0xffffff, 0x63a5ff, 0x0000ff, 0x000000], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000]];
	var p20C = [[0xffffff, 0x8c8cde, 0x52528c, 0x000000], [0xffffff, 0x8c8cde, 0x52528c, 0x000000], [0xffc542, 0xffd600, 0x943a00, 0x4a0000]];
	var p300 = [[0xffffff, 0xadad84, 0x42737b, 0x000000], [0xffffff, 0xff7300, 0x944200, 0x000000], [0xffffff, 0xff7300, 0x944200, 0x000000]];
	var p304 = [[0xffffff, 0x7bff00, 0xb57300, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000]];
	var p305 = [[0xffffff, 0x52ff00, 0xff4200, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000]];
	var p306 = [[0xffffff, 0xff9c00, 0xff0000, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000]];
	var p308 = [[0xa59cff, 0xffff00, 0x006300, 0x000000], [0xff6352, 0xd60000, 0x630000, 0x000000], [0xff6352, 0xd60000, 0x630000, 0x000000]];
	var p30A = [[0xb5b5ff, 0xffff94, 0xad5a42, 0x000000], [0x000000, 0xffffff, 0xff8484, 0x943a3a], [0x000000, 0xffffff, 0xff8484, 0x943a3a]];
	var p30C = [[0xffffff, 0x8c8cde, 0x52528c, 0x000000], [0xffc542, 0xffd600, 0x943a00, 0x4a0000], [0xffc542, 0xffd600, 0x943a00, 0x4a0000]];
	var p30D = [[0xffffff, 0x8c8cde, 0x52528c, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000]];
	var p30E = [[0xffffff, 0x7bff31, 0x008400, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000]];
	var p30F = [[0xffffff, 0xffad63, 0x843100, 0x000000], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000]];
	var p312 = [[0xffffff, 0xffad63, 0x843100, 0x000000], [0xffffff, 0x7bff31, 0x008400, 0x000000], [0xffffff, 0x7bff31, 0x008400, 0x000000]];
	var p319 = [[0xffe6c5, 0xce9c84, 0x846b29, 0x5a3108], [0xffffff, 0xffad63, 0x843100, 0x000000], [0xffffff, 0xffad63, 0x843100, 0x000000]];
	var p31C = [[0xffffff, 0x7bff31, 0x0063c5, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000]];
	var p405 = [[0xffffff, 0x52ff00, 0xff4200, 0x000000], [0xffffff, 0x52ff00, 0xff4200, 0x000000], [0xffffff, 0x5abdff, 0xff0000, 0x0000ff]];
	var p406 = [[0xffffff, 0xff9c00, 0xff0000, 0x000000], [0xffffff, 0xff9c00, 0xff0000, 0x000000], [0xffffff, 0x5abdff, 0xff0000, 0x0000ff]];
	var p407 = [[0xffffff, 0xffff00, 0xff0000, 0x000000], [0xffffff, 0xffff00, 0xff0000, 0x000000], [0xffffff, 0x5abdff, 0xff0000, 0x0000ff]];
	var p500 = [[0xffffff, 0xadad84, 0x42737b, 0x000000], [0xffffff, 0xff7300, 0x944200, 0x000000], [0xffffff, 0x5abdff, 0xff0000, 0x0000ff]];
	var p501 = [[0xffff9c, 0x94b5ff, 0x639473, 0x003a3a], [0xffc542, 0xffd600, 0x943a00, 0x4a0000], [0xffffff, 0xff8484, 0x943a3a, 0x000000]];
	var p502 = [[0x6bff00, 0xffffff, 0xff524a, 0x000000], [0xffffff, 0xffffff, 0x63a5ff, 0x0000ff], [0xffffff, 0xffad63, 0x843100, 0x000000]];
	var p503 = [[0x52de00, 0xff8400, 0xffff00, 0xffffff], [0xffffff, 0xffffff, 0x63a5ff, 0x0000ff], [0xffffff, 0xff8484, 0x943a3a, 0x000000]];
	var p508 = [[0xa59cff, 0xffff00, 0x006300, 0x000000], [0xff6352, 0xd60000, 0x630000, 0x000000], [0x0000ff, 0xffffff, 0xffff7b, 0x0084ff]];
	var p509 = [[0xffffce, 0x63efef, 0x9c8431, 0x5a5a5a], [0xffffff, 0xff7300, 0x944200, 0x000000], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000]];
	var p50B = [[0xffffff, 0x63a5ff, 0x0000ff, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0xffff7b, 0x0084ff, 0xff0000]];
	var p50C = [[0xffffff, 0x8c8cde, 0x52528c, 0x000000], [0xffc542, 0xffd600, 0x943a00, 0x4a0000], [0xffffff, 0x5abdff, 0xff0000, 0x0000ff]];
	var p50D = [[0xffffff, 0x8c8cde, 0x52528c, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0xffad63, 0x843100, 0x000000]];
	var p50E = [[0xffffff, 0x7bff31, 0x008400, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000]];
	var p50F = [[0xffffff, 0xffad63, 0x843100, 0x000000], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000], [0xffffff, 0x7bff31, 0x008400, 0x000000]];
	var p510 = [[0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0x7bff31, 0x008400, 0x000000], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000]];
	var p511 = [[0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0x00ff00, 0x318400, 0x004a00], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000]];
	var p512 = [[0xffffff, 0xffad63, 0x843100, 0x000000], [0xffffff, 0x7bff31, 0x008400, 0x000000], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000]];
	var p514 = [[0xffffff, 0x63a5ff, 0x0000ff, 0x000000], [0xffff00, 0xff0000, 0x630000, 0x000000], [0xffffff, 0x7bff31, 0x008400, 0x000000]];
	var p515 = [[0xffffff, 0xadad84, 0x42737b, 0x000000], [0xffffff, 0xffad63, 0x843100, 0x000000], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000]];
	var p518 = [[0xffffff, 0x63a5ff, 0x0000ff, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0x7bff31, 0x008400, 0x000000]];
	var p51A = [[0xffffff, 0xffff00, 0x7b4a00, 0x000000], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000], [0xffffff, 0x7bff31, 0x008400, 0x000000]];
	var p51C = [[0xffffff, 0x7bff31, 0x0063c5, 0x000000], [0xffffff, 0xff8484, 0x943a3a, 0x000000], [0xffffff, 0x63a5ff, 0x0000ff, 0x000000]];
	var compatibilityColorsetsMap = {
	  "ALLEY WAY": p008,
	  "ASTEROIDS/MISCMD": p30E,
	  "BA.TOSHINDEN": p50F,
	  "BALLOON KID": p006,
	  "BASEBALL": p503,
	  "BOY AND BLOB GB1": p512,
	  "BOY AND BLOB GB2": p512,
	  "BT2RAGNAROKWORLD": p312,
	  "DEFENDER/JOUST": p50F,
	  "DMG FOOTBALL": p30E,
	  "DONKEY KONG": p306,
	  "DONKEYKONGLAND": p50C,
	  "DONKEYKONGLAND 2": p50C,
	  "DONKEYKONGLAND 3": p50C,
	  "DONKEYKONGLAND95": p501,
	  "DR.MARIO": p20B,
	  "DYNABLASTER": p30F,
	  "F1RACE": p012,
	  "G&W GALLERY": p304,
	  "GALAGA&GALAXIAN": p013,
	  "GAME&WATCH": p012,
	  "GAMEBOY GALLERY": p304,
	  "GAMEBOY GALLERY2": p304,
	  "GBWARS": p500,
	  "GOLF": p30E,
	  "Game and Watch 2": p304,
	  "HOSHINOKA-BI": p508,
	  "JAMES  BOND  007": p11C,
	  "KAERUNOTAMENI": p10D,
	  "KEN GRIFFEY JR": p31C,
	  "KID ICARUS": p30D,
	  "KILLERINSTINCT95": p50D,
	  "KINGOFTHEZOO": p30F,
	  "KIRAKIRA KIDS": p012,
	  "KIRBY BLOCKBALL": p508,
	  "KIRBY DREAM LAND": p508,
	  "KIRBY'S PINBALL": p308,
	  "KIRBY2": p508,
	  "LOLO2": p50F,
	  "MAGNETIC SOCCER": p50E,
	  "MANSELL": p012,
	  "MARIO & YOSHI": p305,
	  "MARIO'S PICROSS": p012,
	  "MARIOLAND2": p509,
	  "MEGA MAN 2": p50F,
	  "MEGAMAN": p50F,
	  "MEGAMAN3": p50F,
	  "METROID2": p514,
	  "MILLI/CENTI/PEDE": p31C,
	  "MOGURANYA": p300,
	  "MYSTIC QUEST": p50E,
	  "NETTOU KOF 95": p50F,
	  "NEW CHESSMASTER": p30F,
	  "OTHELLO": p50E,
	  "PAC-IN-TIME": p51C,
	  "PICROSS 2": p012,
	  "PINOCCHIO": p20C,
	  "POKEBOM": p30C,
	  "POKEMON BLUE": p10B,
	  "POKEMON GREEN": p11C,
	  "POKEMON RED": p110,
	  "POKEMON YELLOW": p007,
	  "QIX": p407,
	  "RADARMISSION": p100,
	  "ROCKMAN WORLD": p50F,
	  "ROCKMAN WORLD2": p50F,
	  "ROCKMANWORLD3": p50F,
	  "SEIKEN DENSETSU": p50E,
	  "SOCCER": p502,
	  "SOLARSTRIKER": p013,
	  "SPACE INVADERS": p013,
	  "STAR STACKER": p012,
	  "STAR WARS": p512,
	  "STAR WARS-NOA": p512,
	  "STREET FIGHTER 2": p50F,
	  "SUPER MARIOLAND": p30A,
	  "SUPER RC PRO-AM": p50F,
	  "SUPERDONKEYKONG": p501,
	  "SUPERMARIOLAND3": p500,
	  "TENNIS": p502,
	  "TETRIS": p007,
	  "TETRIS ATTACK": p405,
	  "TETRIS BLAST": p006,
	  "TETRIS FLASH": p407,
	  "TETRIS PLUS": p31C,
	  "TETRIS2": p407,
	  "THE CHESSMASTER": p30F,
	  "TOPRANKINGTENNIS": p502,
	  "TOPRANKTENNIS": p502,
	  "TOY STORY": p30E,
	  "TRIP WORLD": p500,
	  "VEGAS STAKES": p50E,
	  "WARIO BLAST": p31C,
	  "WARIOLAND2": p515,
	  "WAVERACE": p50B,
	  "WORLD CUP": p30E,
	  "X": p016,
	  "YAKUMAN": p012,
	  "YOSHI'S COOKIE": p406,
	  "YOSSY NO COOKIE": p406,
	  "YOSSY NO PANEPON": p405,
	  "YOSSY NO TAMAGO": p305,
	  "ZELDA": p511
	};
	var HBLANK_MODE = 0x00;
	var VBLANK_MODE = 0x01;
	var OAM_MODE = 0x02;
	var VRAM_MODE = 0x03;
	var CYCLES_PER_HBLANK_LINE = 51 * 4;
	var CYCLES_PER_VBLANK_LINE = 114 * 4;
	var CYCLES_PER_OAM = 20 * 4;
	var CYCLES_PER_VRAM = 43 * 4;
	var HBLANK_LINE_COUNT = 144;
	var MAX_VIRTUAL_LINE_COUNT = 154;
	var GPU = function GPU($__1) {
	  var screen = $__1.screen;
	  this._screen = screen;
	  this._screen.setInputSize(160, 144);
	  this._scanline = new Uint32Array(160);
	  this._mmu = null;
	  this._environment = null;
	  this._oam = null;
	  this._vramBanks = null;
	  this._vramBank00 = null;
	  this._vramBank01 = null;
	  this._dmgColorsets = null;
	  this._dmgRgbPalettes = null;
	  this._sprites = null;
	  this._tilesets = null;
	};
	($traceurRuntime.createClass)(GPU, {
	  link: function($__1) {
	    var mmu = $__1.mmu;
	    this._mmu = mmu;
	  },
	  setup: function(environment) {
	    this._environment = environment;
	    this._oam = new Uint8Array(environment.oamBuffer);
	    this._vramBanks = [];
	    for (var vramBank = 0; vramBank * 0x2000 < this._environment.vramBuffer.byteLength; ++vramBank)
	      this._vramBanks[vramBank] = new Uint8Array(this._environment.vramBuffer, vramBank * 0x2000, 0x2000);
	    this._vramBank00 = this._vramBanks[0x00];
	    this._vramBank01 = this._vramBanks[0x01];
	    this._dmgColorsets = defaultColorsets;
	    var romView = new Uint8Array(this._environment.romBuffer);
	    if (!(romView[0x0143] & 0x80)) {
	      for (var title = '',
	          t = 0; t < 0x10 && romView[0x0134 + t] !== 0; ++t)
	        title += String.fromCharCode(romView[0x0134 + t]);
	      var colorsets = compatibilityColorsetsMap[title];
	      if (colorsets) {
	        this._dmgColorsets = colorsets;
	      }
	    }
	    this._dmgRgbPalettes = [];
	    for (var t = 0,
	        T = this._environment.gpuPalettes.length; t < T; ++t) {
	      this._dmgRgbPalettes[t] = [0x000000, 0x000000, 0x000000, 0x000000];
	      this.updateDmgPalette(t);
	    }
	    this._sprites = [];
	    for (var t = 0; t < 40; ++t)
	      this._sprites[t] = {
	        x: 0,
	        y: 0,
	        bank: 0,
	        tile: 0,
	        paletteDmg: 0,
	        paletteCgb: 0,
	        xflip: 0,
	        yflip: 0,
	        priority: 0
	      };
	    for (var t = 0; t < 160; ++t)
	      this.updateSprite(t);
	    this._tilesets = [[], []];
	    for (var t = 0; t < 384; ++t) {
	      this._tilesets[0][t] = [];
	      this._tilesets[1][t] = [];
	      for (var y = 0; y < 8; ++y) {
	        this._tilesets[0][t][y] = new Uint8Array(8);
	        this._tilesets[1][t][y] = new Uint8Array(8);
	      }
	    }
	    for (var t = 0; t < 384 * 16; ++t) {
	      this.updateTile(0, t);
	      this.updateTile(1, t);
	    }
	    this._metadata = [];
	    for (var t = 0; t < 32 * 32 * 2; ++t)
	      this._metadata[t] = {
	        bank: 0,
	        paletteCgb: 0,
	        xflip: 0,
	        yflip: 0,
	        priority: 0
	      };
	    for (var t = 0; t < 32 * 32 * 2; ++t) {
	      this.updateMetadata(t);
	    }
	  },
	  resetClock: function() {
	    this._environment.gpuClock = CYCLES_PER_OAM;
	    this._environment.gpuMode = OAM_MODE;
	    this._environment.gpuLine = 0;
	    this.setLy(0);
	  },
	  setLy: function(value) {
	    this._environment.gpuLy = value;
	    this._environment.gpuCoincidence = this._environment.gpuLy === this._environment.gpuLyc;
	    if (this._environment.gpuCoincidence) {
	      if (this._environment.gpuInterrupts & (1 << 6)) {
	        this._environment.pendingInterrupts |= 0x02;
	      }
	    }
	  },
	  transferDma: function(value) {
	    var start = value << 8;
	    for (var offset = 0; offset < 160; ++offset) {
	      this._oam[offset] = this._mmu.readUint8(start + offset);
	      this.updateSprite(offset);
	    }
	  },
	  updateSprite: function(address) {
	    var sprite = this._sprites[address >>> 2];
	    var value = this._oam[address];
	    switch (address & 0x03) {
	      case 0:
	        sprite.y = value - 16;
	        break;
	      case 1:
	        sprite.x = value - 8;
	        break;
	      case 2:
	        sprite.tile = value;
	        break;
	      case 3:
	        sprite.paletteCgb = (value & 7) >>> 0;
	        sprite.bank = (value & 8) >>> 3;
	        sprite.paletteDmg = (value & 16) >>> 4;
	        sprite.xflip = (value & 32) >>> 5;
	        sprite.yflip = (value & 64) >>> 6;
	        sprite.priority = (value & 128) >>> 7;
	    }
	  },
	  updateMetadata: function(index) {
	    var metadata = this._metadata[index];
	    var value = this._vramBank01[0x1800 + index];
	    metadata.paletteCgb = (value & 7) >>> 0;
	    metadata.bank = (value & 8) >>> 3;
	    metadata.xflip = (value & 32) >>> 5;
	    metadata.yflip = (value & 64) >>> 6;
	    metadata.priority = (value & 128) >>> 7;
	  },
	  updateTile: function(vramBank, address) {
	    var rowAddress = address & 0xFFFE;
	    var vramBankNN = this._vramBanks[vramBank];
	    var tileIndex = rowAddress >>> 4;
	    var y = (rowAddress >>> 1) & 0x7;
	    for (var x = 0; x < 8; ++x) {
	      var mask = 1 << (7 - x);
	      this._tilesets[vramBank][tileIndex][y][x] = (vramBankNN[rowAddress + 0] & mask ? 0x1 : 0x0) | (vramBankNN[rowAddress + 1] & mask ? 0x2 : 0x0);
	      ;
	    }
	  },
	  updateDmgPalette: function(index) {
	    var palette = this._dmgRgbPalettes[index];
	    var dmgColor = this._environment.gpuPalettes[index];
	    palette[0] = this._dmgColorsets[index][(dmgColor >> 0) & 0x3];
	    palette[1] = this._dmgColorsets[index][(dmgColor >> 2) & 0x3];
	    palette[2] = this._dmgColorsets[index][(dmgColor >> 4) & 0x3];
	    palette[3] = this._dmgColorsets[index][(dmgColor >> 6) & 0x3];
	  },
	  compileCgbPaletteToRgb: function(destination, source, colorOffset) {
	    var cgb15 = (source[colorOffset + 1] << 8) | (source[colorOffset]);
	    var tr = (cgb15 >>> 0) & 0x1F;
	    var tg = (cgb15 >>> 5) & 0x1F;
	    var tb = (cgb15 >>> 10) & 0x1F;
	    var rgb32 = (((tr * 13 + tg * 2 + tb) >>> 1) << 16) | ((tg * 3 + tb) << 9) | ((tr * 3 + tg * 2 + tb * 11) >>> 1);
	    var paletteIndex = (colorOffset >>> (2 + 1));
	    var colorIndex = (colorOffset >>> 1) & 3;
	    destination[paletteIndex][colorIndex] = rgb32;
	  },
	  nextMode: function() {
	    switch (this._environment.gpuMode) {
	      case HBLANK_MODE:
	        this._environment.gpuLine += 1;
	        this.setLy(this._environment.gpuLine);
	        if (this._environment.gpuLine < HBLANK_LINE_COUNT) {
	          this._environment.gpuClock += CYCLES_PER_OAM;
	          this._setMode(OAM_MODE);
	        } else {
	          this._environment.gpuClock += CYCLES_PER_VBLANK_LINE;
	          this._setMode(VBLANK_MODE);
	          return true;
	        }
	        return false;
	      case VBLANK_MODE:
	        this._environment.gpuLine += 1;
	        if (this._environment.gpuLine === MAX_VIRTUAL_LINE_COUNT)
	          this._environment.gpuLine = 0;
	        if (this._environment.gpuLine !== 0)
	          this.setLy(this._environment.gpuLine);
	        if (this._environment.gpuLine === 0) {
	          this._environment.gpuClock += CYCLES_PER_OAM;
	          this._setMode(OAM_MODE);
	        } else {
	          this._environment.gpuClock += CYCLES_PER_VBLANK_LINE;
	        }
	        return false;
	      case OAM_MODE:
	        this._environment.gpuClock += CYCLES_PER_VRAM;
	        this._setMode(VRAM_MODE);
	        return false;
	      case 0x03:
	        this._environment.gpuClock += CYCLES_PER_HBLANK_LINE;
	        this._setMode(HBLANK_MODE);
	        if (this._environment.cgbUnlocked && this._environment.cgbVramDmaStatus === 0) {
	          var source = 0x0000 + (this._environment.cgbVramDmaSource & 65520);
	          var destination = 0x8000 + (this._environment.cgbVramDmaDestination & 8176);
	          this._environment.cgbVramDmaSource += 0x10;
	          this._environment.cgbVramDmaDestination += 0x10;
	          this._mmu.triggerVramDmaTransferCycles(source, destination, 0x10);
	          if (this._environment.cgbVramDmaLength > 0) {
	            this._environment.cgbVramDmaLength -= 1;
	          } else {
	            this._environment.cgbVramDmaStatus = 1;
	          }
	        }
	        return false;
	    }
	  },
	  _setMode: function(mode) {
	    this._environment.gpuMode = mode;
	    if (mode === HBLANK_MODE) {
	      this._triggerHblank(this._environment.gpuLine);
	    } else if (mode === VBLANK_MODE) {
	      this._triggerVblank();
	    }
	    if (mode !== VRAM_MODE && this._environment.gpuInterrupts & (1 << (3 + mode))) {
	      this._environment.pendingInterrupts |= 0x02;
	    }
	  },
	  _triggerHblank: function(line) {
	    var showSomething = this._environment.gpuLcdFeature;
	    var showBackground = this._environment.gpuBackgroundFeature || this._environment.cgbUnlocked;
	    var showWindow = showBackground && this._environment.gpuWindowFeature;
	    var showSprites = this._environment.gpuSpriteFeature;
	    if (!showSomething || !showBackground)
	      for (var x = 0,
	          X = this._scanline.length; x < X; ++x)
	        this._scanline[x] = 0x00FFFFFF;
	    if (!showSomething)
	      return;
	    if (showBackground)
	      this._drawBackgroundScanline(line);
	    if (showWindow)
	      this._drawWindowScanline(line);
	    if (showSprites)
	      this._drawSpriteScanline(line);
	    for (var x = 0,
	        X = this._scanline.length; x < X; ++x) {
	      var color = this._scanline[x] & 0x00FFFFFF;
	      this._screen.setPixel(x, line, color);
	    }
	  },
	  _triggerVblank: function() {
	    this._environment.pendingInterrupts |= 0x01;
	    this._screen.flushScreen();
	  },
	  _drawBackgroundScanline: function(line) {
	    var backgroundMapBaseAddress = this._environment.gpuBackgroundBase ? 0x1C00 : 0x1800;
	    var scrollX = this._environment.gpuBgScroll[0];
	    var scrollY = this._environment.gpuBgScroll[1];
	    this._drawMixedScanline(backgroundMapBaseAddress, 0, line, scrollX, scrollY);
	  },
	  _drawWindowScanline: function(line) {
	    var backgroundMapBaseAddress = this._environment.gpuWindowBase ? 0x1C00 : 0x1800;
	    var positionX = this._environment.gpuWindowPosition[0] - 7;
	    var positionY = this._environment.gpuWindowPosition[1];
	    if (positionY > line || positionY + 144 <= line)
	      return;
	    this._drawMixedScanline(backgroundMapBaseAddress, positionX, line - positionY, 0, 0);
	  },
	  _drawMixedScanline: function(baseAddress, offsetX, line, scrollX, scrollY) {
	    var tilesOffset = this._environment.gpuTilesetBase ? 0 : 256;
	    var actualY = (scrollY + line) & 0xFF;
	    var mapOffsetY = (actualY >>> 3) << 5;
	    var tileY = actualY & 0x7;
	    var palette = this._dmgRgbPalettes[0];
	    var vramBank = 0x00;
	    for (var x = 0; x < 160; ++x) {
	      var actualX = (scrollX + offsetX + x) & 0xFF;
	      var mapOffsetX = (actualX >>> 3) & 31;
	      var tileX = actualX & 0x7;
	      var mapOffset = baseAddress + mapOffsetY + mapOffsetX;
	      var tileIndex = this._vramBank00[mapOffset];
	      if (!this._environment.gpuTilesetBase)
	        if (tileIndex > 0x7f)
	          tileIndex -= 0x100;
	      if (this._environment.cgbUnlocked) {
	        var metadata = this._metadata[mapOffset - 0x1800];
	        if (metadata.xflip)
	          tileX = 8 - (tileX + 1);
	        if (metadata.yflip)
	          tileY = 8 - (tileY + 1);
	        vramBank = metadata.bank;
	        palette = this._environment.cgbBackgroundRgbPalettes[metadata.paletteCgb];
	      }
	      var paletteIndex = this._tilesets[vramBank][tilesOffset + tileIndex][tileY][tileX];
	      var trueColor = palette[paletteIndex];
	      this._scanline[x] = (paletteIndex << 24) | trueColor;
	    }
	  },
	  _drawSpriteScanline: function(line) {
	    var size = this._environment.gpuSpriteSize ? 16 : 8;
	    var vramBank = 0x00;
	    for (var t = 0; t < 40; ++t) {
	      var sprite = this._sprites[t];
	      if (sprite.y + size <= line || sprite.y > line)
	        continue;
	      var tileIndex = sprite.tile;
	      if (this._environment.gpuSpriteSize) {
	        var isBottomTile = line - sprite.y >= 8;
	        if (sprite.yflip)
	          isBottomTile = !isBottomTile;
	        tileIndex = isBottomTile ? tileIndex | 0x01 : tileIndex & 0xFE;
	        ;
	      }
	      if (this._environment.cgbUnlocked) {
	        vramBank = sprite.bank;
	        var palette = this._environment.cgbSpriteRgbPalettes[sprite.paletteCgb];
	      } else {
	        var palette = this._dmgRgbPalettes[1 + sprite.paletteDmg];
	      }
	      var tileY = (line - sprite.y) & 0x07;
	      if (sprite.yflip)
	        tileY = 7 - tileY;
	      var tileRow = this._tilesets[vramBank][tileIndex][tileY];
	      var useSpritePriority = !this._environment.cgbUnlocked || this._environment.gpuBackgroundFeature;
	      for (var tileX = 0; tileX < 8; ++tileX) {
	        var x = sprite.x + tileX;
	        if (x < 0 || x >= 160)
	          continue;
	        var actualTileX = sprite.xflip ? 7 - tileX : tileX;
	        var paletteIndex = tileRow[actualTileX];
	        if (paletteIndex === 0)
	          continue;
	        if (useSpritePriority && sprite.priority && (this._scanline[x] & 0xFF000000))
	          continue;
	        var trueColor = palette[paletteIndex];
	        this._scanline[x] = (paletteIndex << 24) | trueColor;
	      }
	    }
	  }
	}, {});
	;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  KeyIO: {get: function() {
	      return KeyIO;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var KeyIO = function KeyIO($__2) {
	  var input = $__2.input;
	  var $__0 = this;
	  this._keys = {
	    0x10: 0,
	    0x20: 0
	  };
	  this._environment = null;
	  input.on('keydown', (function(key) {
	    if (!($__0._keys[key & 0xF0] & (key & 0x0F)))
	      return;
	    $__0._keys[key & 0xF0] &= key ^ 0x0F;
	    if (key & $__0._environment.ioKeyColumn) {
	      $__0._environment.pendingInterrupts[1] |= 0x10;
	    }
	  }));
	  input.on('keyup', (function(key) {
	    $__0._keys[key & 0xF0] |= key & 0x0F;
	  }));
	};
	($traceurRuntime.createClass)(KeyIO, {
	  setup: function(environment) {
	    this._environment = environment;
	    this._keys[0x10] = 0x0F;
	    this._keys[0x20] = 0x0F;
	  },
	  read: function() {
	    var keyline = this._environment.ioKeyColumn | 0x0F;
	    if (this._environment.ioKeyColumn & 0x10)
	      keyline &= this._keys[0x10];
	    if (this._environment.ioKeyColumn & 0x20)
	      keyline &= this._keys[0x20];
	    return keyline;
	  }
	}, {});


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  MMU: {get: function() {
	      return MMU;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47__46__46__47__46__46__47_mixins_47_EmitterMixin__,
	    $___46__46__47__46__46__47__46__46__47_utils_47_FormatUtils__,
	    $___46__46__47__46__46__47__46__46__47_utils_47_ObjectUtils__,
	    $___46__46__47_mbcs_47_MBC1__,
	    $___46__46__47_mbcs_47_MBC3__,
	    $___46__46__47_mbcs_47_MBC5__,
	    $___46__46__47_mbcs_47_NoMBC__;
	__webpack_require__(2);
	var EmitterMixin = ($___46__46__47__46__46__47__46__46__47_mixins_47_EmitterMixin__ = __webpack_require__(5), $___46__46__47__46__46__47__46__46__47_mixins_47_EmitterMixin__ && $___46__46__47__46__46__47__46__46__47_mixins_47_EmitterMixin__.__esModule && $___46__46__47__46__46__47__46__46__47_mixins_47_EmitterMixin__ || {default: $___46__46__47__46__46__47__46__46__47_mixins_47_EmitterMixin__}).EmitterMixin;
	var formatHexadecimal = ($___46__46__47__46__46__47__46__46__47_utils_47_FormatUtils__ = __webpack_require__(8), $___46__46__47__46__46__47__46__46__47_utils_47_FormatUtils__ && $___46__46__47__46__46__47__46__46__47_utils_47_FormatUtils__.__esModule && $___46__46__47__46__46__47__46__46__47_utils_47_FormatUtils__ || {default: $___46__46__47__46__46__47__46__46__47_utils_47_FormatUtils__}).formatHexadecimal;
	var mixin = ($___46__46__47__46__46__47__46__46__47_utils_47_ObjectUtils__ = __webpack_require__(10), $___46__46__47__46__46__47__46__46__47_utils_47_ObjectUtils__ && $___46__46__47__46__46__47__46__46__47_utils_47_ObjectUtils__.__esModule && $___46__46__47__46__46__47__46__46__47_utils_47_ObjectUtils__ || {default: $___46__46__47__46__46__47__46__46__47_utils_47_ObjectUtils__}).mixin;
	var MBC1 = ($___46__46__47_mbcs_47_MBC1__ = __webpack_require__(25), $___46__46__47_mbcs_47_MBC1__ && $___46__46__47_mbcs_47_MBC1__.__esModule && $___46__46__47_mbcs_47_MBC1__ || {default: $___46__46__47_mbcs_47_MBC1__}).MBC1;
	var MBC3 = ($___46__46__47_mbcs_47_MBC3__ = __webpack_require__(26), $___46__46__47_mbcs_47_MBC3__ && $___46__46__47_mbcs_47_MBC3__.__esModule && $___46__46__47_mbcs_47_MBC3__ || {default: $___46__46__47_mbcs_47_MBC3__}).MBC3;
	var MBC5 = ($___46__46__47_mbcs_47_MBC5__ = __webpack_require__(27), $___46__46__47_mbcs_47_MBC5__ && $___46__46__47_mbcs_47_MBC5__.__esModule && $___46__46__47_mbcs_47_MBC5__ || {default: $___46__46__47_mbcs_47_MBC5__}).MBC5;
	var NoMBC = ($___46__46__47_mbcs_47_NoMBC__ = __webpack_require__(28), $___46__46__47_mbcs_47_NoMBC__ && $___46__46__47_mbcs_47_NoMBC__.__esModule && $___46__46__47_mbcs_47_NoMBC__ || {default: $___46__46__47_mbcs_47_NoMBC__}).NoMBC;
	var MBC4 = function() {
	  throw new Error('MBC4 is not yet supported :(');
	};
	var timerFrequencies = {
	  0: 1024,
	  1: 16,
	  2: 64,
	  3: 256
	};
	var cartridgeTypes = {
	  0x00: NoMBC,
	  0x01: MBC1.bind(null, {}),
	  0x02: MBC1.bind(null, {ram: true}),
	  0x03: MBC1.bind(null, {
	    ram: true,
	    battery: true
	  }),
	  0x0F: MBC3.bind(null, {
	    timer: true,
	    battery: true
	  }),
	  0x10: MBC3.bind(null, {
	    ram: true,
	    timer: true,
	    battery: true
	  }),
	  0x11: MBC3.bind(null, {}),
	  0x12: MBC3.bind(null, {ram: true}),
	  0x13: MBC3.bind(null, {
	    ram: true,
	    battery: true
	  }),
	  0x15: MBC4.bind(null, {}),
	  0x16: MBC4.bind(null, {ram: true}),
	  0x17: MBC4.bind(null, {
	    ram: true,
	    battery: true
	  }),
	  0x19: MBC5.bind(null, {}),
	  0x1A: MBC5.bind(null, {ram: true}),
	  0x1B: MBC5.bind(null, {
	    ram: true,
	    battery: true
	  }),
	  0x1C: MBC5.bind(null, {rumble: true}),
	  0x1D: MBC5.bind(null, {
	    rumble: true,
	    ram: true
	  }),
	  0x1E: MBC5.bind(null, {
	    rumble: true,
	    ram: true,
	    battery: true
	  })
	};
	var unsignedToSignedConverter = new Int8Array(1);
	var MMU = function MMU($__8) {
	  var $__10;
	  var $__9 = $__8,
	      events = ($__10 = $__9.events) === void 0 ? [] : $__10;
	  $traceurRuntime.superCall(this, $MMU.prototype, "constructor", []);
	  this._fastReadUint8Event = !!~events.indexOf('read') ? {} : null;
	  this._writeEvent = !!~events.indexOf('write') ? {} : null;
	  this._postWriteEvent = this._writeEvent ? {} : null;
	  if (!this._readEvent)
	    this.readUint8 = this._fastReadUint8;
	  if (!this._writeEvent && !this._postWriteEvent)
	    this.writeUint8 = this._fastWriteUint8;
	  this._gpu = null;
	  this._keyio = null;
	  this._environment = null;
	  this._hram = null;
	  this._oam = null;
	  this._vramBanks = null;
	  this._vramBankNN = null;
	  this._wramBanks = null;
	  this._wramBank00 = null;
	  this._wramBankNN = null;
	  this.mbc = null;
	};
	var $MMU = MMU;
	($traceurRuntime.createClass)(MMU, {
	  link: function($__8) {
	    var $__10 = $__8,
	        gpu = $__10.gpu,
	        keyio = $__10.keyio;
	    this._gpu = gpu;
	    this._keyio = keyio;
	  },
	  setup: function(environment) {
	    this._environment = environment;
	    this._hram = new Uint8Array(this._environment.hramBuffer);
	    this._oam = new Uint8Array(this._environment.oamBuffer);
	    this._wramBanks = [];
	    for (var wramBank = 0; wramBank * 0x1000 < this._environment.wramBuffer.byteLength; ++wramBank)
	      this._wramBanks[wramBank] = new Uint8Array(this._environment.wramBuffer, wramBank * 0x1000, 0x1000);
	    this._wramBank00 = this._wramBanks[0x00];
	    this._wramBankNN = this._wramBanks[this._environment.mmuWramBank];
	    this._vramBanks = [];
	    for (var vramBank = 0; vramBank * 0x2000 < this._environment.vramBuffer.byteLength; ++vramBank)
	      this._vramBanks[vramBank] = new Uint8Array(this._environment.vramBuffer, vramBank * 0x2000, 0x2000);
	    this._vramBankNN = this._vramBanks[this._environment.cgbVramBank];
	    var type = new Uint8Array(this._environment.romBuffer)[0x0147];
	    if (!cartridgeTypes[type])
	      throw new Error(("Invalid cartridge type " + formatHexadecimal(type, 8)));
	    this.mbc = new (cartridgeTypes[type])();
	    this.mbc.link({});
	    this.mbc.setup(this._environment);
	  },
	  readUint8: function(address) {
	    var value = this._fastReadUint8(address);
	    this._readEvent.address = address;
	    this._readEvent.value = value;
	    this.emit('read', this._readEvent);
	    value = this._readEvent.value & 0xFF;
	    return value;
	  },
	  writeUint8: function(address, value) {
	    this._writeEvent.address = address;
	    this._writeEvent.value = value;
	    this.emit('write', this._writeEvent);
	    value = this._writeEvent.value & 0xFF;
	    this._fastWriteUint8(address, value);
	    this._postWriteEvent.address = address;
	    this._postWriteEvent.value = value;
	    this.emit('post-write', this._postWriteEvent);
	  },
	  _fastReadUint8: function(address) {
	    if (address >= 0x0000 && address < 0x8000)
	      return this.mbc.readRomUint8(address);
	    else if (address >= 0x8000 && address < 0xA000)
	      return this._vramBankNN[address & 0x1FFF];
	    else if (address >= 0xA000 && address < 0xC000)
	      return this.mbc.readRamUint8(address - 0xA000);
	    else if (address >= 0xC000 && address < 0xD000)
	      return this._wramBank00[address - 0xC000];
	    else if (address >= 0xD000 && address < 0xE000)
	      return this._wramBankNN[address - 0xD000];
	    else if (address >= 0xE000 && address < 0xF000)
	      return this._wramBank00[address - 0xE000];
	    else if (address >= 0xF000 && address < 0xFE00)
	      return this._wramBankNN[address - 0xF000];
	    else if (address >= 0xFE00 && address < 0xFEA0)
	      return this._oam[address - 0xFE00];
	    else if (address >= 0xFF80 && address < 0xFFFF)
	      return this._hram[address - 0xFF80];
	    else
	      switch (address) {
	        case 0xFF00:
	          return this._keyio.read();
	        case 0xFF04:
	          return this._environment.timerDivider;
	        case 0xFF05:
	          return this._environment.timerCounter;
	        case 0xFF06:
	          return this._environment.timerCounterModulo;
	        case 0xFF07:
	          return this._environment.timerCounterControl;
	        case 0xFF0F:
	          return this._environment.pendingInterrupts;
	        case 0xFF40:
	          return ((this._environment.gpuBackgroundFeature ? 1 << 0 : 0) | (this._environment.gpuSpriteFeature ? 1 << 1 : 0) | (this._environment.gpuSpriteSize ? 1 << 2 : 0) | (this._environment.gpuBackgroundBase ? 1 << 3 : 0) | (this._environment.gpuTilesetBase ? 1 << 4 : 0) | (this._environment.gpuWindowFeature ? 1 << 5 : 0) | (this._environment.gpuWindowBase ? 1 << 6 : 0) | (this._environment.gpuLcdFeature ? 1 << 7 : 0));
	        case 0xFF41:
	          return ((this._environment.gpuMode << 0) | (this._environment.gpuCoincidence << 2) | (this._environment.gpuInterrupts << 0));
	        case 0xFF42:
	          return this._environment.gpuBgScroll[1];
	        case 0xFF43:
	          return this._environment.gpuBgScroll[0];
	        case 0xFF44:
	          return this._environment.gpuLy;
	        case 0xFF45:
	          return this._environment.gpuLyc;
	        case 0xFF47:
	          return this._environment.gpuPalettes[0];
	        case 0xFF48:
	          return this._environment.gpuPalettes[1];
	        case 0xFF49:
	          return this._environment.gpuPalettes[2];
	        case 0xFF4A:
	          return this._environment.gpuWindowPosition[1];
	        case 0xFF4B:
	          return this._environment.gpuWindowPosition[0];
	        case 0xFF4D:
	          if (this._environment.cgbUnlocked) {
	            return (this._environment.cgbCurrentSpeed << 7) | 126 | (this._environment.cgbPrepareSpeedSwitch << 0);
	          } else {
	            return 0;
	          }
	          break;
	        case 0xFF4F:
	          if (this._environment.cgbUnlocked) {
	            return this._environment.cgbVramBank;
	          } else {
	            return 0;
	          }
	          break;
	        case 0xFF51:
	          if (this._environment.cgbUnlocked) {
	            return (this._environment.cgbVramDmaSource & 0xFF00) >>> 8;
	          } else {
	            return 0;
	          }
	          break;
	        case 0xFF52:
	          if (this._environment.cgbUnlocked) {
	            return (this._environment.cgbVramDmaSource & 0x00FF) >>> 0;
	          } else {
	            return 0;
	          }
	          break;
	        case 0xFF53:
	          if (this._environment.cgbUnlocked) {
	            return (this._environment.cgbVramDmaDestination & 0xFF00) >>> 8;
	          } else {
	            return 0;
	          }
	          break;
	        case 0xFF54:
	          if (this._environment.cgbUnlocked) {
	            return (this._environment.cgbVramDmaDestination & 0x00FF) >>> 0;
	          } else {
	            return 0;
	          }
	          break;
	        case 0xFF55:
	          if (this._environment.cgbUnlocked) {
	            return this._environment.cgbVramDmaLength | (this._environment.cgbVramDmaStatus << 7);
	          } else {
	            return 0;
	          }
	          break;
	        case 0xFF68:
	          if (this._environment.cgbUnlocked) {
	            return this._environment.cgbBackgroundPaletteOffset | (this._environment.cgbBackgroundPaletteIncrement << 7);
	          } else {
	            return 0;
	          }
	          break;
	        case 0xFF69:
	          if (this._environment.cgbUnlocked) {
	            return this._environment.cgbBackgroundCgbPalettes[this._environment.cgbBackgroundPaletteOffset];
	          } else {
	            return 0;
	          }
	          break;
	        case 0xFF6A:
	          if (this._environment.cgbUnlocked) {
	            return this._environment.cgbSpritePaletteOffset | (this._environment.cgbSpritePaletteIncrement << 7);
	          } else {
	            return 0;
	          }
	          break;
	        case 0xFF6B:
	          if (this._environment.cgbUnlocked) {
	            return this._environment.cgbSpriteCgbPalettes[this._environment.cgbSpritePaletteOffset];
	          } else {
	            return 0;
	          }
	          break;
	        case 0xFF70:
	          if (this._environment.cgbUnlocked) {
	            return 0x40 | this._environment.mmuWramBank;
	          } else {
	            return 0;
	          }
	          break;
	        case 0xFFFF:
	          return this._environment.enabledInterrupts;
	        default:
	          return 0;
	      }
	  },
	  _fastWriteUint8: function(address, value) {
	    if (address >= 0x0000 && address < 0x8000)
	      this.mbc.writeRomUint8(address, value);
	    else if (address >= 0x8000 && address < 0xA000) {
	      if (!this._environment.gpuLcdFeature || this._environment.gpuMode !== 0x03) {
	        this._vramBankNN[address & 0x1FFF] = value;
	        if (address < 0x9800) {
	          this._gpu.updateTile(this._environment.cgbVramBank, address & 0x1FFF);
	        } else if (this._environment.cgbVramBank === 0x01) {
	          this._gpu.updateMetadata(address - 0x9800);
	        }
	      }
	    } else if (address >= 0xA000 && address < 0xC000)
	      this.mbc.writeRamUint8(address - 0xA000, value);
	    else if (address >= 0xC000 && address < 0xD000)
	      this._wramBank00[address - 0xC000] = value;
	    else if (address >= 0xD000 && address < 0xE000)
	      this._wramBankNN[address - 0xD000] = value;
	    else if (address >= 0xE000 && address < 0xF000)
	      this._wramBank00[address - 0xE000] = value;
	    else if (address >= 0xF000 && address < 0xFE00)
	      this._wramBankNN[address - 0xF000] = value;
	    else if (address >= 0xFE00 && address < 0xFEA0) {
	      if (!this._environment.gpuLcdFeature || this._environment.gpuMode <= 0x01) {
	        this._oam[address - 0xFE00] = value;
	        this._gpu.updateSprite(address - 0xFE00);
	      }
	    } else if (address >= 0xFF80 && address < 0xFFFF)
	      this._hram[address - 0xFF80] = value;
	    else
	      switch (address) {
	        case 0xFF00:
	          this._environment.ioKeyColumn = value & 0x30;
	          break;
	        case 0xFF04:
	          this._environment.timerDivider = 0;
	          break;
	        case 0xFF05:
	          this._environment.timerCounter = value;
	          break;
	        case 0xFF06:
	          this._environment.timerCounterModulo = value;
	          break;
	        case 0xFF07:
	          this._environment.timerCounterFeature = (value & 4) >>> 2;
	          this._environment.timerCounterFrequency = timerFrequencies[(value & 3) >>> 0];
	          this._environment.timerCounterControl = (value & 7) >>> 0;
	          break;
	        case 0xFF0F:
	          this._environment.pendingInterrupts = value;
	          break;
	        case 0xFF40:
	          var oldLcdFeature = this._environment.gpuLcdFeature;
	          this._environment.gpuBackgroundFeature = value & (1 << 0) ? true : false;
	          this._environment.gpuSpriteFeature = value & (1 << 1) ? true : false;
	          this._environment.gpuSpriteSize = value & (1 << 2) ? 1 : 0;
	          this._environment.gpuBackgroundBase = value & (1 << 3) ? 1 : 0;
	          this._environment.gpuTilesetBase = value & (1 << 4) ? 1 : 0;
	          this._environment.gpuWindowFeature = value & (1 << 5) ? true : false;
	          this._environment.gpuWindowBase = value & (1 << 6) ? 1 : 0;
	          this._environment.gpuLcdFeature = value & (1 << 7) ? true : false;
	          if (this._environment.gpuLcdFeature !== oldLcdFeature) {
	            this._gpu.resetClock();
	          }
	          break;
	        case 0xFF41:
	          this._environment.gpuInterrupts = 0x80 | (value & 0x78);
	          break;
	        case 0xFF42:
	          this._environment.gpuBgScroll[1] = value;
	          break;
	        case 0xFF43:
	          this._environment.gpuBgScroll[0] = value;
	          break;
	        case 0xFF44:
	          this._environment.gpuLine = 0;
	          this._gpu.setLy(0);
	          break;
	        case 0xFF45:
	          this._environment.gpuLyc = value;
	          break;
	        case 0xFF46:
	          this._gpu.transferDma(value);
	          break;
	        case 0xFF47:
	          this._environment.gpuPalettes[0] = value;
	          this._gpu.updateDmgPalette(0);
	        case 0xFF48:
	          this._environment.gpuPalettes[1] = value;
	          this._gpu.updateDmgPalette(1);
	        case 0xFF49:
	          this._environment.gpuPalettes[2] = value;
	          this._gpu.updateDmgPalette(2);
	        case 0xFF4A:
	          this._environment.gpuWindowPosition[1] = value;
	          break;
	        case 0xFF4B:
	          this._environment.gpuWindowPosition[0] = value;
	          break;
	        case 0xFF4D:
	          if (this._environment.cgbUnlocked) {
	            this._environment.cgbPrepareSpeedSwitch = value & 1;
	          }
	          break;
	        case 0xFF4F:
	          if (this._environment.cgbUnlocked) {
	            this._environment.cgbVramBank = value & 1;
	            this._rebankVram();
	          }
	          break;
	        case 0xFF51:
	          if (this._environment.cgbUnlocked) {
	            this._environment.cgbVramDmaSource &= this._environment.cgbVramDmaSource & 0x00FF;
	            this._environment.cgbVramDmaSource |= value << 8;
	          }
	          break;
	        case 0xFF52:
	          if (this._environment.cgbUnlocked) {
	            this._environment.cgbVramDmaSource &= this._environment.cgbVramDmaSource & 0xFF00;
	            this._environment.cgbVramDmaSource |= value << 0;
	          }
	          break;
	        case 0xFF53:
	          if (this._environment.cgbUnlocked) {
	            this._environment.cgbVramDmaDestination &= this._environment.cgbVramDmaDestination & 0x00FF;
	            this._environment.cgbVramDmaDestination |= value << 8;
	          }
	          break;
	        case 0xFF54:
	          if (this._environment.cgbUnlocked) {
	            this._environment.cgbVramDmaDestination &= this._environment.cgbVramDmaDestination & 0xFF00;
	            this._environment.cgbVramDmaDestination |= value << 0;
	          }
	          break;
	        case 0xFF55:
	          if (this._environment.cgbUnlocked) {
	            this._environment.cgbVramDmaLength = value & ~(1 << 7);
	            if ((value >>> 7) === 0) {
	              if (this._environment.cgbVramDmaStatus === 1) {
	                var source = 0x0000 + (this._environment.cgbVramDmaSource & 65520);
	                var destination = 0x8000 + (this._environment.cgbVramDmaDestination & 8176);
	                this.triggerVramDmaTransferCycles(source, destination, (this._environment.cgbVramDmaLength + 1) * 0x10);
	              } else {
	                this._environment.cgbVramDmaStatus = 1;
	              }
	            } else {
	              this._environment.cgbVramDmaStatus = 0;
	            }
	          }
	          break;
	        case 0xFF68:
	          if (this._environment.cgbUnlocked) {
	            this._environment.cgbBackgroundPaletteOffset = value & 0x3F;
	            this._environment.cgbBackgroundPaletteIncrement = value >>> 7;
	          }
	          break;
	        case 0xFF69:
	          if (this._environment.cgbUnlocked) {
	            this._environment.cgbBackgroundCgbPalettes[this._environment.cgbBackgroundPaletteOffset] = value;
	            this._gpu.compileCgbPaletteToRgb(this._environment.cgbBackgroundRgbPalettes, this._environment.cgbBackgroundCgbPalettes, this._environment.cgbBackgroundPaletteOffset & ~1);
	            if (this._environment.cgbBackgroundPaletteIncrement) {
	              this._environment.cgbBackgroundPaletteOffset = (this._environment.cgbBackgroundPaletteOffset + 1) & 0x3F;
	            }
	          }
	          break;
	        case 0xFF6A:
	          if (this._environment.cgbUnlocked) {
	            this._environment.cgbSpritePaletteOffset = value & 0x3F;
	            this._environment.cgbSpritePaletteIncrement = value >>> 7;
	          }
	          break;
	        case 0xFF6B:
	          if (this._environment.cgbUnlocked) {
	            this._environment.cgbSpriteCgbPalettes[this._environment.cgbSpritePaletteOffset] = value;
	            this._gpu.compileCgbPaletteToRgb(this._environment.cgbSpriteRgbPalettes, this._environment.cgbSpriteCgbPalettes, this._environment.cgbSpritePaletteOffset & ~1);
	            if (this._environment.cgbSpritePaletteIncrement) {
	              this._environment.cgbSpritePaletteOffset = (this._environment.cgbSpritePaletteOffset + 1) & 0x3F;
	            }
	          }
	          break;
	        case 0xFF70:
	          if (this._environment.cgbUnlocked) {
	            this._environment.mmuWramBank = value & 7;
	            this._wramBankNN = this._wramBanks[Math.max(1, this._environment.mmuWramBank)];
	          }
	          break;
	        case 0xFFFF:
	          this._environment.enabledInterrupts = value;
	          break;
	      }
	  },
	  readUint16: function(address) {
	    var low = this.readUint8(address + 0);
	    var high = this.readUint8(address + 1);
	    return (high << 8) | low;
	  },
	  readInt8: function(address) {
	    var n = this.readUint8(address);
	    unsignedToSignedConverter[0] = n;
	    return unsignedToSignedConverter[0];
	  },
	  triggerVramDmaTransferCycles: function(source, destination, length) {
	    for (var t = 0; t < length; ++t) {
	      this.writeUint8(destination + t, this.readUint8(source + t));
	    }
	  },
	  _rebankVram: function() {
	    this._vramBankNN = this._vramBanks[this._environment.cgbVramBank];
	  }
	}, {}, mixin(null, EmitterMixin));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  MBC1: {get: function() {
	      return MBC1;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var MBC1 = function MBC1(features) {
	  this._environment = null;
	  this._romBanks = [];
	  this._ramBanks = [];
	  this._romBank00 = null;
	  this._romBankNN = null;
	  this._ramBankNN = null;
	};
	($traceurRuntime.createClass)(MBC1, {
	  link: function($__1) {
	    var $__3 = $__1;
	  },
	  setup: function(environment) {
	    this._environment = environment;
	    for (var romBank = 0; romBank * 0x4000 < this._environment.romBuffer.byteLength; ++romBank)
	      this._romBanks[romBank] = new Uint8Array(this._environment.romBuffer, romBank * 0x4000, 0x4000);
	    for (var ramBank = 0; ramBank * 0x2000 < this._environment.ramBuffer.byteLength; ++ramBank)
	      this._ramBanks[ramBank] = new Uint8Array(this._environment.ramBuffer, ramBank * 0x2000, 0x2000);
	    this._romBank00 = this._romBanks[0x00];
	    this._rebank();
	  },
	  readRomUint8: function(address) {
	    if (address < 0x4000) {
	      return this._romBank00[address] | 0;
	    } else {
	      return this._romBankNN[address - 0x4000] | 0;
	    }
	  },
	  readRamUint8: function(address) {
	    if (this._environment.mbcRamFeature) {
	      return this._ramBankNN[address] | 0;
	    } else {
	      return 0;
	    }
	  },
	  writeRomUint8: function(address, value) {
	    if (address < 0x2000) {
	      this._environment.mbcRamFeature = (value & 0x0A) === 0x0A;
	    } else if (address < 0x4000) {
	      this._environment.mbcRomBank &= 96;
	      this._environment.mbcRomBank |= value & 31;
	      this._rebank();
	    } else if (address < 0x6000) {
	      this._environment.mbcRomBank &= 31;
	      this._environment.mbcRomBank |= (value & 3) << 5;
	      this._environment.mbcRamBank = value & 3;
	      this._rebank();
	    } else {
	      this._environment.mbcMode = value & 1;
	      this._rebank();
	    }
	  },
	  writeRamUint8: function(address, value) {
	    if (this._environment.mbcRamFeature) {
	      this._ramBankNN[address] = value;
	    }
	  },
	  _rebank: function() {
	    var romBank = this._environment.mbcRomBank;
	    var ramBank = this._environment.mbcRamBank;
	    if (this._environment.mbcMode === 0) {
	      ramBank = 0x00;
	    } else {
	      romBank &= 0x1F;
	    }
	    if ((romBank & 0x1F) === 0)
	      romBank += 1;
	    this._romBankNN = this._romBanks[romBank];
	    this._ramBankNN = this._ramBanks[ramBank];
	  }
	}, {});


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  MBC3: {get: function() {
	      return MBC3;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var MBC3 = function MBC3() {
	  this._environment = null;
	  this._romBanks = [];
	  this._ramBanks = [];
	  this._romBank00 = null;
	  this._romBankNN = null;
	  this._ramBankNN = null;
	};
	($traceurRuntime.createClass)(MBC3, {
	  link: function($__1) {
	    var $__3 = $__1;
	  },
	  setup: function(environment) {
	    this._environment = environment;
	    this._rtc = environment.mbcRtc;
	    for (var romBank = 0; romBank * 0x4000 < this._environment.romBuffer.byteLength; ++romBank)
	      this._romBanks[romBank] = new Uint8Array(this._environment.romBuffer, romBank * 0x4000, 0x4000);
	    for (var ramBank = 0; ramBank * 0x2000 < this._environment.ramBuffer.byteLength; ++ramBank)
	      this._ramBanks[ramBank] = new Uint8Array(this._environment.ramBuffer, ramBank * 0x2000, 0x2000);
	    this._romBank00 = this._romBanks[0x00];
	    this._rebank();
	  },
	  readRomUint8: function(address) {
	    if (address < 0x4000) {
	      return this._romBank00[address] | 0;
	    } else {
	      return this._romBankNN[address - 0x4000] | 0;
	    }
	  },
	  readRamUint8: function(address) {
	    if (this._environment.mbcRamFeature) {
	      return this._ramBankNN[address] | 0;
	    } else {
	      return this._rtc[this._environment.mbcRtcIndex] | 0;
	    }
	  },
	  writeRomUint8: function(address, value) {
	    if (address < 0x2000) {
	      this._environment.mbcRamFeature = (value & 0x0A) === 0x0A;
	    } else if (address < 0x4000) {
	      this._environment.mbcRomBank = value & 0x7F;
	      if (this._environment.mbcRomBank === 0)
	        this._environment.mbcRomBank += 1;
	      this._rebank();
	    } else if (address < 0x6000) {
	      this._environment.mbcRamFeature = value <= 0x03;
	      if (this._environment.mbcRamFeature) {
	        this._environment.mbcRamBank = value & 0x03;
	        this._environment.mbcRtcIndex = 0;
	      } else {
	        this._environment.mbcRtcIndex = value - 0x08;
	        this._environment.mbcRamBank = 0x00;
	      }
	      this._rebank();
	    } else {
	      var previousLatch = this._environment.mbcLatch;
	      this._environment.mbcLatch = value;
	      if (previousLatch === 0x00 && value === 0x01) {
	        this._latch();
	      }
	    }
	  },
	  writeRamUint8: function(address, value) {
	    if (this._environment.mbcRamFeature) {
	      this._ramBankNN[address] = value;
	    } else {
	      this._rtc[this._environment.mbcRtcIndex] = value;
	    }
	  },
	  _rebank: function() {
	    var romBank = this._environment.mbcRomBank;
	    var ramBank = this._environment.mbcRamBank;
	    this._romBankNN = this._romBanks[romBank];
	    this._ramBankNN = this._ramBanks[ramBank];
	  },
	  _latch: function() {
	    var d = new Date();
	    this._rtc[0] = d.getSeconds();
	    this._rtc[1] = d.getMinutes();
	    this._rtc[2] = d.getHours();
	    this._rtc[3] = 0;
	    this._rtc[4] = 0;
	  }
	}, {});


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  MBC5: {get: function() {
	      return MBC5;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var MBC5 = function MBC5() {
	  this._environment = null;
	  this._romBanks = [];
	  this._ramBanks = [];
	  this._romBank00 = null;
	  this._romBankNN = null;
	  this._ramBankNN = null;
	};
	($traceurRuntime.createClass)(MBC5, {
	  link: function($__1) {
	    var $__3 = $__1;
	  },
	  setup: function(environment) {
	    this._environment = environment;
	    for (var romBank = 0; romBank * 0x4000 < this._environment.romBuffer.byteLength; ++romBank)
	      this._romBanks[romBank] = new Uint8Array(this._environment.romBuffer, romBank * 0x4000, 0x4000);
	    for (var ramBank = 0; ramBank * 0x2000 < this._environment.ramBuffer.byteLength; ++ramBank)
	      this._ramBanks[ramBank] = new Uint8Array(this._environment.ramBuffer, ramBank * 0x2000, 0x2000);
	    this._romBank00 = this._romBanks[0x00];
	    this._rebank();
	  },
	  readRomUint8: function(address) {
	    if (address < 0x4000) {
	      return this._romBank00[address] | 0;
	    } else {
	      return this._romBankNN[address - 0x4000] | 0;
	    }
	  },
	  readRamUint8: function(address) {
	    if (this._environment.mbcRamFeature) {
	      return this._ramBankNN[address] | 0;
	    } else {
	      return 0;
	    }
	  },
	  writeRomUint8: function(address, value) {
	    if (address < 0x2000) {
	      this._environment.mbcRamFeature = (value & 0x0A) === 0x0A;
	    } else if (address < 0x3000) {
	      this._environment.mbcRomBank &= 0x100;
	      this._environment.mbcRomBank |= value;
	      this._rebank();
	    } else if (address < 0x4000) {
	      this._environment.mbcRomBank &= 0x0FF;
	      this._environment.mbcRomBank |= (value & 0x01) << 8;
	      this._rebank();
	    } else {
	      this._environment.mbcRamBank = value & 0x0F;
	      this._rebank();
	    }
	  },
	  writeRamUint8: function(address, value) {
	    if (this._environment.mbcRamFeature) {
	      this._ramBankNN[address] = value;
	    }
	  },
	  _rebank: function() {
	    var romBank = this._environment.mbcRomBank;
	    var ramBank = this._environment.mbcRamBank;
	    this._romBankNN = this._romBanks[romBank];
	    this._ramBankNN = this._ramBanks[ramBank];
	  }
	}, {});


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  NoMBC: {get: function() {
	      return NoMBC;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var NoMBC = function NoMBC() {};
	($traceurRuntime.createClass)(NoMBC, {
	  link: function($__1) {
	    var $__3 = $__1;
	  },
	  setup: function(environment) {
	    this._rom = new Uint8Array(environment.romBuffer);
	    this._ram = new Uint8Array(environment.ramBuffer);
	  },
	  readRomUint8: function(address) {
	    return this._rom[address] | 0;
	  },
	  readRamUint8: function(address) {
	    return this._ram[address] | 0;
	  },
	  writeRomUint8: function(address, value) {
	    return;
	  },
	  writeRamUint8: function(address, value) {
	    this._ram[address] = value;
	  }
	}, {});


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  Engine: {get: function() {
	      return Engine;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47__46__46__47_devices_47_inputs_47_NullInput__,
	    $___46__46__47__46__46__47_devices_47_screens_47_NullScreen__,
	    $___46__46__47__46__46__47_devices_47_timers_47_SerialTimer__,
	    $___46__46__47__46__46__47_mixins_47_EmitterMixin__,
	    $___46__46__47__46__46__47_mixins_47_EmitterMixin__,
	    $___46__46__47__46__46__47_utils_47_ObjectUtils__,
	    $__components_47_GPU__,
	    $__components_47_MMU__,
	    $__Interpreter__;
	__webpack_require__(2);
	var NullInput = ($___46__46__47__46__46__47_devices_47_inputs_47_NullInput__ = __webpack_require__(37), $___46__46__47__46__46__47_devices_47_inputs_47_NullInput__ && $___46__46__47__46__46__47_devices_47_inputs_47_NullInput__.__esModule && $___46__46__47__46__46__47_devices_47_inputs_47_NullInput__ || {default: $___46__46__47__46__46__47_devices_47_inputs_47_NullInput__}).NullInput;
	var NullScreen = ($___46__46__47__46__46__47_devices_47_screens_47_NullScreen__ = __webpack_require__(39), $___46__46__47__46__46__47_devices_47_screens_47_NullScreen__ && $___46__46__47__46__46__47_devices_47_screens_47_NullScreen__.__esModule && $___46__46__47__46__46__47_devices_47_screens_47_NullScreen__ || {default: $___46__46__47__46__46__47_devices_47_screens_47_NullScreen__}).NullScreen;
	var SerialTimer = ($___46__46__47__46__46__47_devices_47_timers_47_SerialTimer__ = __webpack_require__(44), $___46__46__47__46__46__47_devices_47_timers_47_SerialTimer__ && $___46__46__47__46__46__47_devices_47_timers_47_SerialTimer__.__esModule && $___46__46__47__46__46__47_devices_47_timers_47_SerialTimer__ || {default: $___46__46__47__46__46__47_devices_47_timers_47_SerialTimer__}).SerialTimer;
	var EmitterMixin = ($___46__46__47__46__46__47_mixins_47_EmitterMixin__ = __webpack_require__(5), $___46__46__47__46__46__47_mixins_47_EmitterMixin__ && $___46__46__47__46__46__47_mixins_47_EmitterMixin__.__esModule && $___46__46__47__46__46__47_mixins_47_EmitterMixin__ || {default: $___46__46__47__46__46__47_mixins_47_EmitterMixin__}).EmitterMixin;
	var RunnableMixin = ($___46__46__47__46__46__47_mixins_47_EmitterMixin__ = __webpack_require__(5), $___46__46__47__46__46__47_mixins_47_EmitterMixin__ && $___46__46__47__46__46__47_mixins_47_EmitterMixin__.__esModule && $___46__46__47__46__46__47_mixins_47_EmitterMixin__ || {default: $___46__46__47__46__46__47_mixins_47_EmitterMixin__}).RunnableMixin;
	var mixin = ($___46__46__47__46__46__47_utils_47_ObjectUtils__ = __webpack_require__(10), $___46__46__47__46__46__47_utils_47_ObjectUtils__ && $___46__46__47__46__46__47_utils_47_ObjectUtils__.__esModule && $___46__46__47__46__46__47_utils_47_ObjectUtils__ || {default: $___46__46__47__46__46__47_utils_47_ObjectUtils__}).mixin;
	var GPU = ($__components_47_GPU__ = __webpack_require__(32), $__components_47_GPU__ && $__components_47_GPU__.__esModule && $__components_47_GPU__ || {default: $__components_47_GPU__}).GPU;
	var MMU = ($__components_47_MMU__ = __webpack_require__(33), $__components_47_MMU__ && $__components_47_MMU__.__esModule && $__components_47_MMU__ || {default: $__components_47_MMU__}).MMU;
	var Interpreter = ($__Interpreter__ = __webpack_require__(31), $__Interpreter__ && $__Interpreter__.__esModule && $__Interpreter__ || {default: $__Interpreter__}).Interpreter;
	var Engine = function Engine() {
	  var $__12,
	      $__13,
	      $__14;
	  var $__11 = arguments[0] !== (void 0) ? arguments[0] : {},
	      devices = ($__12 = $__11.devices) === void 0 ? {} : $__12,
	      advanced = ($__13 = $__11.advanced) === void 0 ? {} : $__13,
	      hooks = ($__14 = $__11.hooks) === void 0 ? {} : $__14;
	  $traceurRuntime.superCall(this, $Engine.prototype, "constructor", []);
	  this._hooks = hooks;
	  this._loop = null;
	  this.screen = devices.screen || new NullScreen();
	  this.timer = devices.timer || new SerialTimer();
	  this.input = devices.input || new NullInput();
	  this.gpu = new GPU({
	    screen: this.screen,
	    hooks: this._hooks
	  });
	  this.mmu = new MMU({hooks: this._hooks});
	  this.interpreter = new Interpreter({hooks: this._hooks});
	  this.gpu.link({mmu: this.mmu});
	  this.mmu.link({gpu: this.gpu});
	  this.interpreter.link({
	    mmu: this.mmu,
	    gpu: this.gpu
	  });
	};
	var $Engine = Engine;
	($traceurRuntime.createClass)(Engine, {
	  loadArrayBuffer: function(arrayBuffer) {
	    var $__13;
	    var $__12 = arguments[1] !== (void 0) ? arguments[1] : {},
	        initialState = $__12.initialState,
	        autoStart = ($__13 = $__12.autoStart) === void 0 ? true : $__13;
	    var environment = new Environment({initialState: initialState});
	    this.setup(environment);
	    if (autoStart) {
	      this.run();
	    }
	  },
	  setup: function(environment) {
	    this.gpu.setup(environment);
	    this.mmu.setup(environment);
	  },
	  start: function() {
	    var $__9 = this;
	    if (this._loop)
	      return;
	    if (!this.environment)
	      return;
	    var run = (function() {
	      $__9._loop = $__9.timer.nextTick(run);
	      $__9.interpreter.iterate();
	    });
	    this._loop = this.timer.nextTick(run);
	    if (this._hooks.start) {
	      this._hooks.start();
	    }
	  },
	  stop: function() {
	    if (!this._loop)
	      return;
	    this.interpreter.drop();
	    this.timer.cancelTick(this._loop);
	    if (this._hooks.stop) {
	      this._hooks.stop();
	    }
	  },
	  _iteration: function() {
	    this.interpreter.nextTick();
	  }
	}, {});


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  Environment: {get: function() {
	      return Environment;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var Environment = function Environment() {
	  var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
	      romBuffer = $__1.romBuffer,
	      initialState = $__1.initialState;
	};
	($traceurRuntime.createClass)(Environment, {}, {});


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  Interpreter: {get: function() {
	      return Interpreter;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var Interpreter = function Interpreter() {
	  this._continue = false;
	  this._gpu = null;
	  this._mmu = null;
	};
	($traceurRuntime.createClass)(Interpreter, {
	  link: function($__1) {
	    var $__2 = $__1,
	        gpu = $__2.gpu,
	        mmu = $__2.mmu;
	    this._gpu = gpu;
	    this._mmu = mmu;
	  },
	  iterate: function() {
	    this._continue = true;
	    while (this._continue && !this._gpu.ready)
	      this._execute();
	    if (this._gpu.ready)
	      this._gpu.commit();
	    this._continue = false;
	  },
	  drop: function() {
	    this._continue = false;
	  },
	  _execute: function() {}
	}, {});


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  GPU: {get: function() {
	      return GPU;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var GPU = function GPU($__1) {
	  var $__2 = $__1,
	      screen = $__2.screen,
	      hooks = $__2.hooks;
	  this._screen = screen;
	  this._hooks = hooks;
	  this._mmu = null;
	  this._environment = null;
	  this.ready = false;
	};
	($traceurRuntime.createClass)(GPU, {
	  link: function($__1) {
	    var mmu = $__1.mmu;
	    this._mmu = mmu;
	  },
	  setup: function(environment) {
	    this._environment = null;
	  },
	  commit: function() {
	    this._screen.flushScreen();
	    this.ready = false;
	  }
	}, {});


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  MMU: {get: function() {
	      return MMU;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var MMU = function MMU($__1) {
	  var hooks = $__1.hooks;
	};
	($traceurRuntime.createClass)(MMU, {
	  link: function($__1) {
	    var gpu = $__1.gpu;
	    this._gpu = gpu;
	  },
	  setup: function(environment) {
	    this._environment = environment;
	  },
	  _get: function(address) {
	    switch (address) {
	      case 0x04000000:
	        return this._io[0x0000];
	    }
	  },
	  _set: function(address, value) {
	    switch (address) {
	      case 0x04000000:
	        this._io[0x0000] = value;
	        this._gpu.setLcdControl(value);
	    }
	  }
	}, {});


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  ButtonInput: {get: function() {
	      return ButtonInput;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47__46__46__47_mixins_47_EmitterMixin__,
	    $___46__46__47__46__46__47_utils_47_ObjectUtils__;
	__webpack_require__(2);
	var EmitterMixin = ($___46__46__47__46__46__47_mixins_47_EmitterMixin__ = __webpack_require__(5), $___46__46__47__46__46__47_mixins_47_EmitterMixin__ && $___46__46__47__46__46__47_mixins_47_EmitterMixin__.__esModule && $___46__46__47__46__46__47_mixins_47_EmitterMixin__ || {default: $___46__46__47__46__46__47_mixins_47_EmitterMixin__}).EmitterMixin;
	var mixin = ($___46__46__47__46__46__47_utils_47_ObjectUtils__ = __webpack_require__(10), $___46__46__47__46__46__47_utils_47_ObjectUtils__ && $___46__46__47__46__46__47_utils_47_ObjectUtils__.__esModule && $___46__46__47__46__46__47_utils_47_ObjectUtils__ || {default: $___46__46__47__46__46__47_utils_47_ObjectUtils__}).mixin;
	var ButtonInput = function ButtonInput() {
	  var options = arguments[0] !== (void 0) ? arguments[0] : {};
	  this._code = options.code;
	  this._element = options.element || document.body;
	  this._onMouseDown_ = this._onMouseDown.bind(this);
	  this._onMouseUp_ = this._onMouseUp.bind(this);
	  this._attach();
	};
	($traceurRuntime.createClass)(ButtonInput, {
	  destroy: function() {
	    this._detach();
	  },
	  _attach: function() {
	    if (!this._code)
	      return;
	    this._element.addEventListener('mousedown', this._onMouseDown_);
	    this._element.addEventListener('mouseup', this._onMouseUp_);
	  },
	  _detach: function() {
	    if (!this._code)
	      return;
	    this._element.removeEventListener('mousedown', this._onMouseDown_);
	    this._element.removeEventListener('mouseup', this._onMouseUp_);
	  },
	  _onMouseDown: function() {
	    this.emit('keydown', this._code);
	  },
	  _onMouseUp: function() {
	    if (typeof this._options.code === 'undefined')
	      return;
	    this.emit('keyup', this._code);
	  }
	}, {}, mixin(null, EmitterMixin));
	;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  KeyboardInput: {get: function() {
	      return KeyboardInput;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47__46__46__47_mixins_47_EmitterMixin__,
	    $___46__46__47__46__46__47_utils_47_ObjectUtils__;
	__webpack_require__(2);
	var EmitterMixin = ($___46__46__47__46__46__47_mixins_47_EmitterMixin__ = __webpack_require__(5), $___46__46__47__46__46__47_mixins_47_EmitterMixin__ && $___46__46__47__46__46__47_mixins_47_EmitterMixin__.__esModule && $___46__46__47__46__46__47_mixins_47_EmitterMixin__ || {default: $___46__46__47__46__46__47_mixins_47_EmitterMixin__}).EmitterMixin;
	var mixin = ($___46__46__47__46__46__47_utils_47_ObjectUtils__ = __webpack_require__(10), $___46__46__47__46__46__47_utils_47_ObjectUtils__ && $___46__46__47__46__46__47_utils_47_ObjectUtils__.__esModule && $___46__46__47__46__46__47_utils_47_ObjectUtils__ || {default: $___46__46__47__46__46__47_utils_47_ObjectUtils__}).mixin;
	var automapData = {
	  LEFT: [37],
	  RIGHT: [39],
	  UP: [38],
	  DOWN: [40],
	  A: [65, 81],
	  B: [90, 87],
	  START: [13],
	  SELECT: [32]
	};
	var KeyboardInput = function KeyboardInput() {
	  var $__5,
	      $__6;
	  var $__4 = arguments[0] !== (void 0) ? arguments[0] : {},
	      map = ($__5 = $__4.map) === void 0 ? null : $__5,
	      element = ($__6 = $__4.element) === void 0 ? document.body : $__6,
	      inputs = $__4.inputs;
	  var $__2 = this;
	  $traceurRuntime.superCall(this, $KeyboardInput.prototype, "constructor", []);
	  this.element = null;
	  this.map = map;
	  this._onKeyDown_ = (function(e) {
	    $__2._onKeyDown(e);
	  });
	  this._onKeyUp_ = (function(e) {
	    $__2._onKeyUp(e);
	  });
	  if (element)
	    this.setElement(element);
	  if (inputs) {
	    this.setInputs(inputs);
	  }
	};
	var $KeyboardInput = KeyboardInput;
	($traceurRuntime.createClass)(KeyboardInput, {
	  setElement: function(element) {
	    if (this.element)
	      this._detach(element);
	    this.element = element;
	    this._attach(element);
	  },
	  setInputs: function(inputs) {
	    this.map = this._createAutomap(inputs);
	  },
	  destroy: function() {
	    this.setElement(null);
	  },
	  _createAutomap: function(inputs) {
	    var map = {};
	    Object.keys(inputs).forEach(function(name) {
	      if (!automapData[name])
	        return;
	      automapData[name].forEach(function(keyCode) {
	        map[keyCode] = inputs[name];
	      });
	    }, this);
	    return map;
	  },
	  _attach: function(element) {
	    element.addEventListener('keydown', this._onKeyDown_);
	    element.addEventListener('keyup', this._onKeyUp_);
	  },
	  _detach: function() {
	    element.removeEventListener('keydown', this._onKeyDown_);
	    element.removeEventListener('keyup', this._onKeyUp_);
	  },
	  _onKeyDown: function(e) {
	    if (e.keyCode === 8)
	      e.preventDefault();
	    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
	      return;
	    if (!this.map)
	      return;
	    if (typeof this.map[e.keyCode] === 'undefined')
	      return;
	    e.preventDefault();
	    this.emit('keydown', this.map[e.keyCode]);
	  },
	  _onKeyUp: function(e) {
	    if (!this.map)
	      return;
	    if (typeof this.map[e.keyCode] === 'undefined')
	      return;
	    this.emit('keyup', this.map[e.keyCode]);
	  }
	}, {}, mixin(null, EmitterMixin));
	;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  MixedInput: {get: function() {
	      return MixedInput;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47__46__46__47_mixins_47_EmitterMixin__,
	    $___46__46__47__46__46__47_utils_47_ObjectUtils__;
	__webpack_require__(2);
	var EmitterMixin = ($___46__46__47__46__46__47_mixins_47_EmitterMixin__ = __webpack_require__(5), $___46__46__47__46__46__47_mixins_47_EmitterMixin__ && $___46__46__47__46__46__47_mixins_47_EmitterMixin__.__esModule && $___46__46__47__46__46__47_mixins_47_EmitterMixin__ || {default: $___46__46__47__46__46__47_mixins_47_EmitterMixin__}).EmitterMixin;
	var mixin = ($___46__46__47__46__46__47_utils_47_ObjectUtils__ = __webpack_require__(10), $___46__46__47__46__46__47_utils_47_ObjectUtils__ && $___46__46__47__46__46__47_utils_47_ObjectUtils__.__esModule && $___46__46__47__46__46__47_utils_47_ObjectUtils__ || {default: $___46__46__47__46__46__47_utils_47_ObjectUtils__}).mixin;
	var MixedInput = function MixedInput() {
	  var inputs = arguments[0] !== (void 0) ? arguments[0] : [];
	  this._inputs = inputs;
	  this._onEmit_ = this._onEmit.bind(this);
	  this._attach();
	};
	($traceurRuntime.createClass)(MixedInput, {
	  destroy: function() {
	    this._detach();
	  },
	  _attach: function() {
	    var $__2 = this;
	    this._inputs.forEach((function(input) {
	      input.on('*', $__2._onEmit);
	    }));
	  },
	  _detach: function() {
	    this._inputs.forEach((function(input) {
	      input.destroy();
	    }));
	  },
	  _onEmit: function(type, e) {
	    this.emit(type, e);
	  }
	}, {}, mixin(null, EmitterMixin));
	;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  NullInput: {get: function() {
	      return NullInput;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47__46__46__47_mixins_47_EmitterMixin__,
	    $___46__46__47__46__46__47_utils_47_ObjectUtils__;
	__webpack_require__(2);
	var EmitterMixin = ($___46__46__47__46__46__47_mixins_47_EmitterMixin__ = __webpack_require__(5), $___46__46__47__46__46__47_mixins_47_EmitterMixin__ && $___46__46__47__46__46__47_mixins_47_EmitterMixin__.__esModule && $___46__46__47__46__46__47_mixins_47_EmitterMixin__ || {default: $___46__46__47__46__46__47_mixins_47_EmitterMixin__}).EmitterMixin;
	var mixin = ($___46__46__47__46__46__47_utils_47_ObjectUtils__ = __webpack_require__(10), $___46__46__47__46__46__47_utils_47_ObjectUtils__ && $___46__46__47__46__46__47_utils_47_ObjectUtils__.__esModule && $___46__46__47__46__46__47_utils_47_ObjectUtils__ || {default: $___46__46__47__46__46__47_utils_47_ObjectUtils__}).mixin;
	var NullInput = function NullInput() {
	  $traceurRuntime.defaultSuperCall(this, $NullInput.prototype, arguments);
	};
	var $NullInput = NullInput;
	($traceurRuntime.createClass)(NullInput, {}, {}, mixin(null, EmitterMixin));
	;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  DataScreen: {get: function() {
	      return DataScreen;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var DataScreen = function DataScreen() {
	  this.data = null;
	  this.inputWidth = 0;
	  this.inputHeight = 0;
	};
	($traceurRuntime.createClass)(DataScreen, {
	  setInputSize: function(width, height) {
	    this.inputWidth = width;
	    this.inputHeight = height;
	    this.data = new Uint8Array(this.inputWidth * this.inputHeight * 3);
	  },
	  setData: function(data) {
	    if (data.length !== this.inputWidth * this.inputHeight * 3)
	      throw new Error('Invalid data buffer');
	    this.data.set(data);
	  },
	  setPixel: function(x, y, color) {
	    var target = this.data;
	    var index = (y * this.inputWidth + x) * 3;
	    target[index + 0] = (color & 0xFF0000) >>> 16;
	    target[index + 1] = (color & 0x00FF00) >>> 8;
	    target[index + 2] = (color & 0x0000FF) >>> 0;
	  },
	  flushScreen: function() {},
	  toDataUrl: function() {
	    var mimeType = arguments[0] !== (void 0) ? arguments[0] : 'image/png';
	    var canvas = document.createElement('canvas');
	    var context = canvas.getContext('2d');
	    canvas.width = this.inputWidth;
	    canvas.height = this.inputHeight;
	    var data = this.data;
	    var pixels = context.createImageData(canvas.width, canvas.height);
	    for (var t = 0,
	        T = canvas.width * canvas.height; t < T; ++t) {
	      pixels.data[t * 4 + 0] = data[t * 3 + 0];
	      pixels.data[t * 4 + 1] = data[t * 3 + 1];
	      pixels.data[t * 4 + 2] = data[t * 3 + 2];
	      pixels.data[t * 4 + 3] = 255;
	    }
	    context.putImageData(pixels, 0, 0);
	    return canvas.toDataURL(mimeType);
	  }
	}, {});


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  NullScreen: {get: function() {
	      return NullScreen;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var NullScreen = function NullScreen() {};
	($traceurRuntime.createClass)(NullScreen, {
	  setInputSize: function(width, height) {},
	  setOutputSize: function(width, height) {},
	  setPixel: function(x, y, r, g, b) {},
	  flushLine: function() {},
	  flushScreen: function() {}
	}, {});
	;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  WebGLScreen: {get: function() {
	      return WebGLScreen;
	    }},
	  __esModule: {value: true}
	});
	var $__DataScreen__;
	__webpack_require__(2);
	var DataScreen = ($__DataScreen__ = __webpack_require__(38), $__DataScreen__ && $__DataScreen__.__esModule && $__DataScreen__ || {default: $__DataScreen__}).DataScreen;
	var gVertexShaderScript = "\n\n    precision mediump float;\n\n    uniform mat4 uMatrix;\n\n    attribute vec3 aVertexPosition;\n    attribute vec2 aVertexTextureUv;\n\n    varying vec2 vTextureCoordinates;\n\n    void main( void ) {\n\n        vTextureCoordinates = vec2( aVertexTextureUv.s, 1.0 - aVertexTextureUv.t );\n\n        gl_Position = uMatrix * vec4( aVertexPosition, 1.0 );\n\n    }\n\n";
	var gFragmentShaderScript = "\n\n    precision mediump float;\n\n    uniform sampler2D uScreenTexture;\n\n    varying vec2 vTextureCoordinates;\n\n    void main( void ) {\n\n        gl_FragColor = texture2D( uScreenTexture, vTextureCoordinates );\n\n    }\n\n";
	var WebGLScreen = function WebGLScreen(options) {
	  var $__4,
	      $__5;
	  $traceurRuntime.superCall(this, $WebGLScreen.prototype, "constructor", [options]);
	  var $__3 = options,
	      canvas = ($__4 = $__3.canvas) === void 0 ? document.createElement('canvas') : $__4,
	      useDebugContext = ($__5 = $__3.useDebugContext) === void 0 ? false : $__5;
	  this.canvas = canvas;
	  this.gl = null;
	  this.outputWidth = 0;
	  this.outputHeight = 0;
	  this._useDebugContext = useDebugContext;
	  this._shaderProgram = null;
	  this._uMatrixLocation = null;
	  this._uScreenTextureLocation = null;
	  this._uInputResolutionLocation = null;
	  this._uOutputResolutionLocation = null;
	  this._aVertexPositionLocation = null;
	  this._aVertexTextureUvLocation = null;
	  this._textureIndex = 0;
	  this._setupGl();
	  var boundingBox = this.canvas.getBoundingClientRect();
	  var width = boundingBox.width,
	      height = boundingBox.height;
	  this.setInputSize(width, height);
	  this.setOutputSize(width, height);
	};
	var $WebGLScreen = WebGLScreen;
	($traceurRuntime.createClass)(WebGLScreen, {
	  setInputSize: function(width, height) {
	    $traceurRuntime.superCall(this, $WebGLScreen.prototype, "setInputSize", [width, height]);
	    this._updateViewport();
	    this._draw();
	  },
	  setOutputSize: function(width, height) {
	    this.outputWidth = width;
	    this.outputHeight = height;
	    this._updateViewport();
	    this._draw();
	  },
	  setShaderProgram: function(shaderProgram) {
	    if (this._shaderProgram !== null)
	      this.gl.deleteProgram(this._shaderProgram);
	    this._shaderProgram = shaderProgram;
	    this.gl.useProgram(shaderProgram);
	    this._uMatrixLocation = this.gl.getUniformLocation(shaderProgram, 'uMatrix');
	    this._uScreenTextureLocation = this.gl.getUniformLocation(shaderProgram, 'uScreenTexture');
	    this.gl.uniform1i(this._uScreenTextureLocation, 0);
	    this._uInputResolutionLocation = this.gl.getUniformLocation(shaderProgram, 'uInputResolution');
	    this._uOutputResolutionLocation = this.gl.getUniformLocation(shaderProgram, 'uOutputResolution');
	    this._uViewportResolutionLocation = this.gl.getUniformLocation(shaderProgram, 'uViewportResolution');
	    this._aVertexPositionLocation = this.gl.getAttribLocation(shaderProgram, 'aVertexPosition');
	    this.gl.enableVertexAttribArray(this._aVertexPositionLocation);
	    this._aVertexTextureUvLocation = this.gl.getAttribLocation(shaderProgram, 'aVertexTextureUv');
	    this.gl.enableVertexAttribArray(this._aVertexTextureUvLocation);
	    this.gl.bindBuffer(this._vertexPositionBuffer.bufferTarget, this._vertexPositionBuffer);
	    this.gl.vertexAttribPointer(this._aVertexPositionLocation, this._vertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
	    this.gl.bindBuffer(this._vertexTextureUvBuffer.bufferTarget, this._vertexTextureUvBuffer);
	    this.gl.vertexAttribPointer(this._aVertexTextureUvLocation, this._vertexTextureUvBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
	  },
	  flushScreen: function() {
	    this._draw();
	  },
	  _createTexture: function() {
	    var texture = this.gl.createTexture();
	    return texture;
	  },
	  _createBuffer: function(target, count, content) {
	    var buffer = this.gl.createBuffer();
	    buffer.bufferTarget = target;
	    buffer.itemCount = count;
	    buffer.itemSize = content.length / count;
	    this.gl.bindBuffer(buffer.bufferTarget, buffer);
	    this.gl.bufferData(buffer.bufferTarget, content, this.gl.STATIC_DRAW);
	    return buffer;
	  },
	  _createOrthoMatrix: function(left, right, bottom, top, near, far) {
	    var lr = 1 / (left - right),
	        bt = 1 / (bottom - top),
	        nf = 1 / (near - far);
	    return [-2 * lr, 0, 0, 0, 0, -2 * bt, 0, 0, 0, 0, 2 * nf, 0, (left + right) * lr, (bottom + top) * bt, (near + far) * nf, 1];
	  },
	  _setupGl: function() {
	    var $__1 = this;
	    var options = {};
	    this.gl = this.canvas.getContext('webgl', options) || this.canvas.getContext('experimental-webgl', options);
	    if (this._useDebugContext)
	      this.gl = WebGLDebugUtils.makeDebugContext(this.gl);
	    this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
	    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
	    this.gl.enable(this.gl.BLEND);
	    this._vertexPositionBuffer = this._createBuffer(this.gl.ARRAY_BUFFER, 4, new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]));
	    this._vertexTextureUvBuffer = this._createBuffer(this.gl.ARRAY_BUFFER, 4, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]));
	    this._vertexIndexBuffer = this._createBuffer(this.gl.ELEMENT_ARRAY_BUFFER, 4, new Uint16Array([0, 1, 3, 2]));
	    this._fragmentShader = this._createShader(this.gl.FRAGMENT_SHADER, gFragmentShaderScript);
	    this._vertexShader = this._createShader(this.gl.VERTEX_SHADER, gVertexShaderScript);
	    this._linkShaders(this._fragmentShader, this._vertexShader);
	    this.gl.activeTexture(this.gl.TEXTURE0);
	    this._textures = [this._createTexture(), this._createTexture()];
	    this._textures.forEach((function(texture) {
	      $__1.gl.bindTexture($__1.gl.TEXTURE_2D, texture);
	      $__1.gl.texParameteri($__1.gl.TEXTURE_2D, $__1.gl.TEXTURE_MAG_FILTER, $__1.gl.NEAREST);
	      $__1.gl.texParameteri($__1.gl.TEXTURE_2D, $__1.gl.TEXTURE_MIN_FILTER, $__1.gl.NEAREST);
	      $__1.gl.texParameteri($__1.gl.TEXTURE_2D, $__1.gl.TEXTURE_WRAP_S, $__1.gl.CLAMP_TO_EDGE);
	      $__1.gl.texParameteri($__1.gl.TEXTURE_2D, $__1.gl.TEXTURE_WRAP_T, $__1.gl.CLAMP_TO_EDGE);
	    }));
	  },
	  _createShader: function(type, script) {
	    var shader = this.gl.createShader(type);
	    this.gl.shaderSource(shader, script);
	    this.gl.compileShader(shader);
	    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
	      throw new Error('Shader compilation failed : ' + this.gl.getShaderInfoLog(shader));
	    return shader;
	  },
	  _linkShaders: function(vertexShader, fragmentShader) {
	    var shaderProgram = this.gl.createProgram();
	    this.gl.attachShader(shaderProgram, vertexShader);
	    this.gl.attachShader(shaderProgram, fragmentShader);
	    this.gl.linkProgram(shaderProgram);
	    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS))
	      throw new Error('Shader linking failed : ' + this.gl.getError());
	    this.setShaderProgram(shaderProgram);
	  },
	  _updateViewport: function() {
	    var inputWidth = this.inputWidth;
	    var inputHeight = this.inputHeight;
	    var outputWidth = this.outputWidth;
	    var outputHeight = this.outputHeight;
	    var isUndefined = (function(value) {
	      return value == null || value === '';
	    });
	    if (isUndefined(outputWidth) && isUndefined(outputHeight))
	      outputWidth = inputWidth, outputHeight = inputHeight;
	    if (isUndefined(outputWidth))
	      outputWidth = inputWidth * (outputHeight / inputHeight);
	    if (isUndefined(outputHeight))
	      outputHeight = inputHeight * (outputWidth / inputWidth);
	    var widthRatio = outputWidth / inputWidth;
	    var heightRatio = outputHeight / inputHeight;
	    var ratio = Math.min(widthRatio, heightRatio);
	    var viewportWidth = widthRatio / ratio;
	    var viewportHeight = heightRatio / ratio;
	    this.canvas.width = outputWidth;
	    this.canvas.height = outputHeight;
	    var matrix = this._createOrthoMatrix(-viewportWidth, viewportWidth, -viewportHeight, viewportHeight, -100, 100);
	    this.gl.uniformMatrix4fv(this._uMatrixLocation, false, matrix);
	    this.gl.uniform2f(this._uInputResolutionLocation, inputWidth, inputHeight);
	    this.gl.uniform2f(this._uOutputResolutionLocation, outputWidth, outputHeight);
	    this.gl.uniform2f(this._uViewportResolutionLocation, viewportWidth * inputWidth, viewportHeight * inputHeight);
	    this.gl.viewport(0, 0, outputWidth, outputHeight);
	  },
	  _draw: function() {
	    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	    if (this.inputWidth === 0 || this.inputHeight === 0)
	      return;
	    var textureIndex = (this._textureIndex++) % 2;
	    this.gl.bindTexture(this.gl.TEXTURE_2D, this._textures[textureIndex]);
	    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.inputWidth, this.inputHeight, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, this.data);
	    this.gl.bindBuffer(this._vertexIndexBuffer.bufferTarget, this._vertexIndexBuffer);
	    this.gl.drawElements(this.gl.TRIANGLE_STRIP, this._vertexIndexBuffer.itemCount, this.gl.UNSIGNED_SHORT, 0);
	  }
	}, {}, DataScreen);
	;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  AnimationFrameTimer: {get: function() {
	      return AnimationFrameTimer;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var AnimationFrameTimer = function AnimationFrameTimer() {};
	($traceurRuntime.createClass)(AnimationFrameTimer, {
	  nextTick: function(callback) {
	    return requestAnimationFrame(callback);
	  },
	  cancelTick: function(marker) {
	    cancelAnimationFrame(marker);
	  }
	}, {});


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  ImmediateTimer: {get: function() {
	      return ImmediateTimer;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var ImmediateTimer = function ImmediateTimer() {};
	($traceurRuntime.createClass)(ImmediateTimer, {
	  nextTick: function(callback) {
	    return setImmediate(callback);
	  },
	  cancelTick: function(marker) {
	    clearImmediate(marker);
	  }
	}, {});
	;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  NullTimer: {get: function() {
	      return NullTimer;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var NullTimer = function NullTimer() {};
	($traceurRuntime.createClass)(NullTimer, {
	  nextTick: function(callback) {},
	  cancelTimeout: function(marker) {}
	}, {});
	;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  SerialTimer: {get: function() {
	      return SerialTimer;
	    }},
	  __esModule: {value: true}
	});
	__webpack_require__(2);
	var SerialTimer = function SerialTimer() {
	  this._actions = [];
	};
	($traceurRuntime.createClass)(SerialTimer, {
	  nextTick: function(callback) {
	    this._actions.push(callback);
	    return callback;
	  },
	  cancelTick: function(marker) {
	    var index = this._aactions.indexOf(marker);
	    if (index === -1)
	      return;
	    this._actions.splice(index, 1);
	  },
	  tick: function() {
	    var count = arguments[0] !== (void 0) ? arguments[0] : 1;
	    for (; count; --count) {
	      var actions = this._actions;
	      this._actions = [];
	      for (var $__1 = actions[Symbol.iterator](),
	          $__2; !($__2 = $__1.next()).done; ) {
	        var action = $__2.value;
	        {
	          action();
	        }
	      }
	    }
	    return this;
	  }
	}, {});


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(2);
	var process = module.exports = {};
	process.nextTick = (function() {
	  var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
	  var canMutationObserver = typeof window !== 'undefined' && window.MutationObserver;
	  var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
	  ;
	  if (canSetImmediate) {
	    return function(f) {
	      return window.setImmediate(f);
	    };
	  }
	  var queue = [];
	  if (canMutationObserver) {
	    var hiddenDiv = document.createElement("div");
	    var observer = new MutationObserver(function() {
	      var queueList = queue.slice();
	      queue.length = 0;
	      queueList.forEach(function(fn) {
	        fn();
	      });
	    });
	    observer.observe(hiddenDiv, {attributes: true});
	    return function nextTick(fn) {
	      if (!queue.length) {
	        hiddenDiv.setAttribute('yes', 'no');
	      }
	      queue.push(fn);
	    };
	  }
	  if (canPost) {
	    window.addEventListener('message', function(ev) {
	      var source = ev.source;
	      if ((source === window || source === null) && ev.data === 'process-tick') {
	        ev.stopPropagation();
	        if (queue.length > 0) {
	          var fn = queue.shift();
	          fn();
	        }
	      }
	    }, true);
	    return function nextTick(fn) {
	      queue.push(fn);
	      window.postMessage('process-tick', '*');
	    };
	  }
	  return function nextTick(fn) {
	    setTimeout(fn, 0);
	  };
	})();
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	function noop() {}
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.binding = function(name) {
	  throw new Error('process.binding is not supported');
	};
	process.cwd = function() {
	  return '/';
	};
	process.chdir = function(dir) {
	  throw new Error('process.chdir is not supported');
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";
	__webpack_require__(2);
	var base64 = __webpack_require__(50);
	var ieee754 = __webpack_require__(48);
	var isArray = __webpack_require__(49);
	exports.Buffer = Buffer;
	exports.SlowBuffer = Buffer;
	exports.INSPECT_MAX_BYTES = 50;
	Buffer.poolSize = 8192;
	var kMaxLength = 0x3fffffff;
	Buffer.TYPED_ARRAY_SUPPORT = (function() {
	  try {
	    var buf = new ArrayBuffer(0);
	    var arr = new Uint8Array(buf);
	    arr.foo = function() {
	      return 42;
	    };
	    return 42 === arr.foo() && typeof arr.subarray === 'function' && new Uint8Array(1).subarray(1, 1).byteLength === 0;
	  } catch (e) {
	    return false;
	  }
	})();
	function Buffer(subject, encoding, noZero) {
	  if (!(this instanceof Buffer))
	    return new Buffer(subject, encoding, noZero);
	  var type = typeof subject;
	  var length;
	  if (type === 'number')
	    length = subject > 0 ? subject >>> 0 : 0;
	  else if (type === 'string') {
	    if (encoding === 'base64')
	      subject = base64clean(subject);
	    length = Buffer.byteLength(subject, encoding);
	  } else if (type === 'object' && subject !== null) {
	    if (subject.type === 'Buffer' && isArray(subject.data))
	      subject = subject.data;
	    length = +subject.length > 0 ? Math.floor(+subject.length) : 0;
	  } else
	    throw new TypeError('must start with number, buffer, array or string');
	  if (this.length > kMaxLength)
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength.toString(16) + ' bytes');
	  var buf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    buf = Buffer._augment(new Uint8Array(length));
	  } else {
	    buf = this;
	    buf.length = length;
	    buf._isBuffer = true;
	  }
	  var i;
	  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
	    buf._set(subject);
	  } else if (isArrayish(subject)) {
	    if (Buffer.isBuffer(subject)) {
	      for (i = 0; i < length; i++)
	        buf[i] = subject.readUInt8(i);
	    } else {
	      for (i = 0; i < length; i++)
	        buf[i] = ((subject[i] % 256) + 256) % 256;
	    }
	  } else if (type === 'string') {
	    buf.write(subject, 0, encoding);
	  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
	    for (i = 0; i < length; i++) {
	      buf[i] = 0;
	    }
	  }
	  return buf;
	}
	Buffer.isBuffer = function(b) {
	  return !!(b != null && b._isBuffer);
	};
	Buffer.compare = function(a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
	    throw new TypeError('Arguments must be Buffers');
	  var x = a.length;
	  var y = b.length;
	  for (var i = 0,
	      len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
	  if (i !== len) {
	    x = a[i];
	    y = b[i];
	  }
	  if (x < y)
	    return -1;
	  if (y < x)
	    return 1;
	  return 0;
	};
	Buffer.isEncoding = function(encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true;
	    default:
	      return false;
	  }
	};
	Buffer.concat = function(list, totalLength) {
	  if (!isArray(list))
	    throw new TypeError('Usage: Buffer.concat(list[, length])');
	  if (list.length === 0) {
	    return new Buffer(0);
	  } else if (list.length === 1) {
	    return list[0];
	  }
	  var i;
	  if (totalLength === undefined) {
	    totalLength = 0;
	    for (i = 0; i < list.length; i++) {
	      totalLength += list[i].length;
	    }
	  }
	  var buf = new Buffer(totalLength);
	  var pos = 0;
	  for (i = 0; i < list.length; i++) {
	    var item = list[i];
	    item.copy(buf, pos);
	    pos += item.length;
	  }
	  return buf;
	};
	Buffer.byteLength = function(str, encoding) {
	  var ret;
	  str = str + '';
	  switch (encoding || 'utf8') {
	    case 'ascii':
	    case 'binary':
	    case 'raw':
	      ret = str.length;
	      break;
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = str.length * 2;
	      break;
	    case 'hex':
	      ret = str.length >>> 1;
	      break;
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8ToBytes(str).length;
	      break;
	    case 'base64':
	      ret = base64ToBytes(str).length;
	      break;
	    default:
	      ret = str.length;
	  }
	  return ret;
	};
	Buffer.prototype.length = undefined;
	Buffer.prototype.parent = undefined;
	Buffer.prototype.toString = function(encoding, start, end) {
	  var loweredCase = false;
	  start = start >>> 0;
	  end = end === undefined || end === Infinity ? this.length : end >>> 0;
	  if (!encoding)
	    encoding = 'utf8';
	  if (start < 0)
	    start = 0;
	  if (end > this.length)
	    end = this.length;
	  if (end <= start)
	    return '';
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end);
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end);
	      case 'ascii':
	        return asciiSlice(this, start, end);
	      case 'binary':
	        return binarySlice(this, start, end);
	      case 'base64':
	        return base64Slice(this, start, end);
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end);
	      default:
	        if (loweredCase)
	          throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	};
	Buffer.prototype.equals = function(b) {
	  if (!Buffer.isBuffer(b))
	    throw new TypeError('Argument must be a Buffer');
	  return Buffer.compare(this, b) === 0;
	};
	Buffer.prototype.inspect = function() {
	  var str = '';
	  var max = exports.INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max)
	      str += ' ... ';
	  }
	  return '<Buffer ' + str + '>';
	};
	Buffer.prototype.compare = function(b) {
	  if (!Buffer.isBuffer(b))
	    throw new TypeError('Argument must be a Buffer');
	  return Buffer.compare(this, b);
	};
	Buffer.prototype.get = function(offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.');
	  return this.readUInt8(offset);
	};
	Buffer.prototype.set = function(v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.');
	  return this.writeUInt8(v, offset);
	};
	function hexWrite(buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }
	  var strLen = string.length;
	  if (strLen % 2 !== 0)
	    throw new Error('Invalid hex string');
	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; i++) {
	    var byte = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(byte))
	      throw new Error('Invalid hex string');
	    buf[offset + i] = byte;
	  }
	  return i;
	}
	function utf8Write(buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length);
	  return charsWritten;
	}
	function asciiWrite(buf, string, offset, length) {
	  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length);
	  return charsWritten;
	}
	function binaryWrite(buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length);
	}
	function base64Write(buf, string, offset, length) {
	  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length);
	  return charsWritten;
	}
	function utf16leWrite(buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length);
	  return charsWritten;
	}
	Buffer.prototype.write = function(string, offset, length, encoding) {
	  if (isFinite(offset)) {
	    if (!isFinite(length)) {
	      encoding = length;
	      length = undefined;
	    }
	  } else {
	    var swap = encoding;
	    encoding = offset;
	    offset = length;
	    length = swap;
	  }
	  offset = Number(offset) || 0;
	  var remaining = this.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }
	  encoding = String(encoding || 'utf8').toLowerCase();
	  var ret;
	  switch (encoding) {
	    case 'hex':
	      ret = hexWrite(this, string, offset, length);
	      break;
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8Write(this, string, offset, length);
	      break;
	    case 'ascii':
	      ret = asciiWrite(this, string, offset, length);
	      break;
	    case 'binary':
	      ret = binaryWrite(this, string, offset, length);
	      break;
	    case 'base64':
	      ret = base64Write(this, string, offset, length);
	      break;
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = utf16leWrite(this, string, offset, length);
	      break;
	    default:
	      throw new TypeError('Unknown encoding: ' + encoding);
	  }
	  return ret;
	};
	Buffer.prototype.toJSON = function() {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  };
	};
	function base64Slice(buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf);
	  } else {
	    return base64.fromByteArray(buf.slice(start, end));
	  }
	}
	function utf8Slice(buf, start, end) {
	  var res = '';
	  var tmp = '';
	  end = Math.min(buf.length, end);
	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
	      tmp = '';
	    } else {
	      tmp += '%' + buf[i].toString(16);
	    }
	  }
	  return res + decodeUtf8Char(tmp);
	}
	function asciiSlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret;
	}
	function binarySlice(buf, start, end) {
	  return asciiSlice(buf, start, end);
	}
	function hexSlice(buf, start, end) {
	  var len = buf.length;
	  if (!start || start < 0)
	    start = 0;
	  if (!end || end < 0 || end > len)
	    end = len;
	  var out = '';
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i]);
	  }
	  return out;
	}
	function utf16leSlice(buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res;
	}
	Buffer.prototype.slice = function(start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;
	  if (start < 0) {
	    start += len;
	    if (start < 0)
	      start = 0;
	  } else if (start > len) {
	    start = len;
	  }
	  if (end < 0) {
	    end += len;
	    if (end < 0)
	      end = 0;
	  } else if (end > len) {
	    end = len;
	  }
	  if (end < start)
	    end = start;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    return Buffer._augment(this.subarray(start, end));
	  } else {
	    var sliceLen = end - start;
	    var newBuf = new Buffer(sliceLen, undefined, true);
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start];
	    }
	    return newBuf;
	  }
	};
	function checkOffset(offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0)
	    throw new RangeError('offset is not uint');
	  if (offset + ext > length)
	    throw new RangeError('Trying to access beyond buffer length');
	}
	Buffer.prototype.readUInt8 = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 1, this.length);
	  return this[offset];
	};
	Buffer.prototype.readUInt16LE = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8);
	};
	Buffer.prototype.readUInt16BE = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1];
	};
	Buffer.prototype.readUInt32LE = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length);
	  return ((this[offset]) | (this[offset + 1] << 8) | (this[offset + 2] << 16)) + (this[offset + 3] * 0x1000000);
	};
	Buffer.prototype.readUInt32BE = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length);
	  return (this[offset] * 0x1000000) + ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3]);
	};
	Buffer.prototype.readInt8 = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80))
	    return (this[offset]);
	  return ((0xff - this[offset] + 1) * -1);
	};
	Buffer.prototype.readInt16LE = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length);
	  var val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val;
	};
	Buffer.prototype.readInt16BE = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val;
	};
	Buffer.prototype.readInt32LE = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length);
	  return (this[offset]) | (this[offset + 1] << 8) | (this[offset + 2] << 16) | (this[offset + 3] << 24);
	};
	Buffer.prototype.readInt32BE = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length);
	  return (this[offset] << 24) | (this[offset + 1] << 16) | (this[offset + 2] << 8) | (this[offset + 3]);
	};
	Buffer.prototype.readFloatLE = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, true, 23, 4);
	};
	Buffer.prototype.readFloatBE = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, false, 23, 4);
	};
	Buffer.prototype.readDoubleLE = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, true, 52, 8);
	};
	Buffer.prototype.readDoubleBE = function(offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, false, 52, 8);
	};
	function checkInt(buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf))
	    throw new TypeError('buffer must be a Buffer instance');
	  if (value > max || value < min)
	    throw new TypeError('value is out of bounds');
	  if (offset + ext > buf.length)
	    throw new TypeError('index out of range');
	}
	Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert)
	    checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT)
	    value = Math.floor(value);
	  this[offset] = value;
	  return offset + 1;
	};
	function objectWriteUInt16(buf, value, offset, littleEndian) {
	  if (value < 0)
	    value = 0xffff + value + 1;
	  for (var i = 0,
	      j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>> (littleEndian ? i : 1 - i) * 8;
	  }
	}
	Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value;
	    this[offset + 1] = (value >>> 8);
	  } else
	    objectWriteUInt16(this, value, offset, true);
	  return offset + 2;
	};
	Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = value;
	  } else
	    objectWriteUInt16(this, value, offset, false);
	  return offset + 2;
	};
	function objectWriteUInt32(buf, value, offset, littleEndian) {
	  if (value < 0)
	    value = 0xffffffff + value + 1;
	  for (var i = 0,
	      j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
	  }
	}
	Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 1] = (value >>> 8);
	    this[offset] = value;
	  } else
	    objectWriteUInt32(this, value, offset, true);
	  return offset + 4;
	};
	Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = value;
	  } else
	    objectWriteUInt32(this, value, offset, false);
	  return offset + 4;
	};
	Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert)
	    checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT)
	    value = Math.floor(value);
	  if (value < 0)
	    value = 0xff + value + 1;
	  this[offset] = value;
	  return offset + 1;
	};
	Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value;
	    this[offset + 1] = (value >>> 8);
	  } else
	    objectWriteUInt16(this, value, offset, true);
	  return offset + 2;
	};
	Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = value;
	  } else
	    objectWriteUInt16(this, value, offset, false);
	  return offset + 2;
	};
	Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value;
	    this[offset + 1] = (value >>> 8);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 3] = (value >>> 24);
	  } else
	    objectWriteUInt32(this, value, offset, true);
	  return offset + 4;
	};
	Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0)
	    value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = value;
	  } else
	    objectWriteUInt32(this, value, offset, false);
	  return offset + 4;
	};
	function checkIEEE754(buf, value, offset, ext, max, min) {
	  if (value > max || value < min)
	    throw new TypeError('value is out of bounds');
	  if (offset + ext > buf.length)
	    throw new TypeError('index out of range');
	}
	function writeFloat(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert)
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
	  ieee754.write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4;
	}
	Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert);
	};
	Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert);
	};
	function writeDouble(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert)
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
	  ieee754.write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8;
	}
	Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert);
	};
	Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert);
	};
	Buffer.prototype.copy = function(target, target_start, start, end) {
	  var source = this;
	  if (!start)
	    start = 0;
	  if (!end && end !== 0)
	    end = this.length;
	  if (!target_start)
	    target_start = 0;
	  if (end === start)
	    return;
	  if (target.length === 0 || source.length === 0)
	    return;
	  if (end < start)
	    throw new TypeError('sourceEnd < sourceStart');
	  if (target_start < 0 || target_start >= target.length)
	    throw new TypeError('targetStart out of bounds');
	  if (start < 0 || start >= source.length)
	    throw new TypeError('sourceStart out of bounds');
	  if (end < 0 || end > source.length)
	    throw new TypeError('sourceEnd out of bounds');
	  if (end > this.length)
	    end = this.length;
	  if (target.length - target_start < end - start)
	    end = target.length - target_start + start;
	  var len = end - start;
	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + target_start] = this[i + start];
	    }
	  } else {
	    target._set(this.subarray(start, start + len), target_start);
	  }
	};
	Buffer.prototype.fill = function(value, start, end) {
	  if (!value)
	    value = 0;
	  if (!start)
	    start = 0;
	  if (!end)
	    end = this.length;
	  if (end < start)
	    throw new TypeError('end < start');
	  if (end === start)
	    return;
	  if (this.length === 0)
	    return;
	  if (start < 0 || start >= this.length)
	    throw new TypeError('start out of bounds');
	  if (end < 0 || end > this.length)
	    throw new TypeError('end out of bounds');
	  var i;
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value;
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString());
	    var len = bytes.length;
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len];
	    }
	  }
	  return this;
	};
	Buffer.prototype.toArrayBuffer = function() {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer;
	    } else {
	      var buf = new Uint8Array(this.length);
	      for (var i = 0,
	          len = buf.length; i < len; i += 1) {
	        buf[i] = this[i];
	      }
	      return buf.buffer;
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser');
	  }
	};
	var BP = Buffer.prototype;
	Buffer._augment = function(arr) {
	  arr.constructor = Buffer;
	  arr._isBuffer = true;
	  arr._get = arr.get;
	  arr._set = arr.set;
	  arr.get = BP.get;
	  arr.set = BP.set;
	  arr.write = BP.write;
	  arr.toString = BP.toString;
	  arr.toLocaleString = BP.toString;
	  arr.toJSON = BP.toJSON;
	  arr.equals = BP.equals;
	  arr.compare = BP.compare;
	  arr.copy = BP.copy;
	  arr.slice = BP.slice;
	  arr.readUInt8 = BP.readUInt8;
	  arr.readUInt16LE = BP.readUInt16LE;
	  arr.readUInt16BE = BP.readUInt16BE;
	  arr.readUInt32LE = BP.readUInt32LE;
	  arr.readUInt32BE = BP.readUInt32BE;
	  arr.readInt8 = BP.readInt8;
	  arr.readInt16LE = BP.readInt16LE;
	  arr.readInt16BE = BP.readInt16BE;
	  arr.readInt32LE = BP.readInt32LE;
	  arr.readInt32BE = BP.readInt32BE;
	  arr.readFloatLE = BP.readFloatLE;
	  arr.readFloatBE = BP.readFloatBE;
	  arr.readDoubleLE = BP.readDoubleLE;
	  arr.readDoubleBE = BP.readDoubleBE;
	  arr.writeUInt8 = BP.writeUInt8;
	  arr.writeUInt16LE = BP.writeUInt16LE;
	  arr.writeUInt16BE = BP.writeUInt16BE;
	  arr.writeUInt32LE = BP.writeUInt32LE;
	  arr.writeUInt32BE = BP.writeUInt32BE;
	  arr.writeInt8 = BP.writeInt8;
	  arr.writeInt16LE = BP.writeInt16LE;
	  arr.writeInt16BE = BP.writeInt16BE;
	  arr.writeInt32LE = BP.writeInt32LE;
	  arr.writeInt32BE = BP.writeInt32BE;
	  arr.writeFloatLE = BP.writeFloatLE;
	  arr.writeFloatBE = BP.writeFloatBE;
	  arr.writeDoubleLE = BP.writeDoubleLE;
	  arr.writeDoubleBE = BP.writeDoubleBE;
	  arr.fill = BP.fill;
	  arr.inspect = BP.inspect;
	  arr.toArrayBuffer = BP.toArrayBuffer;
	  return arr;
	};
	var INVALID_BASE64_RE = /[^+\/0-9A-z]/g;
	function base64clean(str) {
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str;
	}
	function stringtrim(str) {
	  if (str.trim)
	    return str.trim();
	  return str.replace(/^\s+|\s+$/g, '');
	}
	function isArrayish(subject) {
	  return isArray(subject) || Buffer.isBuffer(subject) || subject && typeof subject === 'object' && typeof subject.length === 'number';
	}
	function toHex(n) {
	  if (n < 16)
	    return '0' + n.toString(16);
	  return n.toString(16);
	}
	function utf8ToBytes(str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; i++) {
	    var b = str.charCodeAt(i);
	    if (b <= 0x7F) {
	      byteArray.push(b);
	    } else {
	      var start = i;
	      if (b >= 0xD800 && b <= 0xDFFF)
	        i++;
	      var h = encodeURIComponent(str.slice(start, i + 1)).substr(1).split('%');
	      for (var j = 0; j < h.length; j++) {
	        byteArray.push(parseInt(h[j], 16));
	      }
	    }
	  }
	  return byteArray;
	}
	function asciiToBytes(str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; i++) {
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray;
	}
	function utf16leToBytes(str) {
	  var c,
	      hi,
	      lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; i++) {
	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }
	  return byteArray;
	}
	function base64ToBytes(str) {
	  return base64.toByteArray(str);
	}
	function blitBuffer(src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length))
	      break;
	    dst[i + offset] = src[i];
	  }
	  return i;
	}
	function decodeUtf8Char(str) {
	  try {
	    return decodeURIComponent(str);
	  } catch (err) {
	    return String.fromCharCode(0xFFFD);
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(46).Buffer))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(2);
	module.exports = function(module) {
	  if (!module.webpackPolyfill) {
	    module.deprecate = function() {};
	    module.paths = [];
	    module.children = [];
	    module.webpackPolyfill = 1;
	  }
	  return module;
	};


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(2);
	exports.read = function(buffer, offset, isLE, mLen, nBytes) {
	  var e,
	      m,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = -7,
	      i = isLE ? (nBytes - 1) : 0,
	      d = isLE ? -1 : 1,
	      s = buffer[offset + i];
	  i += d;
	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8)
	    ;
	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8)
	    ;
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity);
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};
	exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
	  var e,
	      m,
	      c,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
	      i = isLE ? 0 : (nBytes - 1),
	      d = isLE ? 1 : -1,
	      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
	  value = Math.abs(value);
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8)
	    ;
	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8)
	    ;
	  buffer[offset + i - d] |= s * 128;
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(2);
	var isArray = Array.isArray;
	var str = Object.prototype.toString;
	module.exports = isArray || function(val) {
	  return !!val && '[object Array]' == str.call(val);
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
	  "use strict";
	  __webpack_require__(2);
	  var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  ;
	  (function(exports) {
	    'use strict';
	    var Arr = (typeof Uint8Array !== 'undefined') ? Uint8Array : Array;
	    var PLUS = '+'.charCodeAt(0);
	    var SLASH = '/'.charCodeAt(0);
	    var NUMBER = '0'.charCodeAt(0);
	    var LOWER = 'a'.charCodeAt(0);
	    var UPPER = 'A'.charCodeAt(0);
	    function decode(elt) {
	      var code = elt.charCodeAt(0);
	      if (code === PLUS)
	        return 62;
	      if (code === SLASH)
	        return 63;
	      if (code < NUMBER)
	        return -1;
	      if (code < NUMBER + 10)
	        return code - NUMBER + 26 + 26;
	      if (code < UPPER + 26)
	        return code - UPPER;
	      if (code < LOWER + 26)
	        return code - LOWER + 26;
	    }
	    function b64ToByteArray(b64) {
	      var i,
	          j,
	          l,
	          tmp,
	          placeHolders,
	          arr;
	      if (b64.length % 4 > 0) {
	        throw new Error('Invalid string. Length must be a multiple of 4');
	      }
	      var len = b64.length;
	      placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;
	      arr = new Arr(b64.length * 3 / 4 - placeHolders);
	      l = placeHolders > 0 ? b64.length - 4 : b64.length;
	      var L = 0;
	      function push(v) {
	        arr[L++] = v;
	      }
	      for (i = 0, j = 0; i < l; i += 4, j += 3) {
	        tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3));
	        push((tmp & 0xFF0000) >> 16);
	        push((tmp & 0xFF00) >> 8);
	        push(tmp & 0xFF);
	      }
	      if (placeHolders === 2) {
	        tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4);
	        push(tmp & 0xFF);
	      } else if (placeHolders === 1) {
	        tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2);
	        push((tmp >> 8) & 0xFF);
	        push(tmp & 0xFF);
	      }
	      return arr;
	    }
	    function uint8ToBase64(uint8) {
	      var i,
	          extraBytes = uint8.length % 3,
	          output = "",
	          temp,
	          length;
	      function encode(num) {
	        return lookup.charAt(num);
	      }
	      function tripletToBase64(num) {
	        return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
	      }
	      for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
	        temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
	        output += tripletToBase64(temp);
	      }
	      switch (extraBytes) {
	        case 1:
	          temp = uint8[uint8.length - 1];
	          output += encode(temp >> 2);
	          output += encode((temp << 4) & 0x3F);
	          output += '==';
	          break;
	        case 2:
	          temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
	          output += encode(temp >> 10);
	          output += encode((temp >> 4) & 0x3F);
	          output += encode((temp << 2) & 0x3F);
	          output += '=';
	          break;
	      }
	      return output;
	    }
	    exports.toByteArray = b64ToByteArray;
	    exports.fromByteArray = uint8ToBase64;
	  }(false ? (this.base64js = {}) : exports));
	  return {};
	}.call(Reflect.global);


/***/ }
/******/ ])