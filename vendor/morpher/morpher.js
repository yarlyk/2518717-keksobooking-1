(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Morpher = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var browser = createCommonjsModule(function (module, exports) {

    var getGlobal = function getGlobal() {
      // the only reliable means to get the global object is
      // `Function('return this')()`
      // However, this causes CSP violations in Chrome apps.
      if (typeof self !== 'undefined') {
        return self;
      }

      if (typeof window !== 'undefined') {
        return window;
      }

      if (typeof global !== 'undefined') {
        return global;
      }

      throw new Error('unable to locate global object');
    };

    var global = getGlobal();
    module.exports = exports = global.fetch; // Needed for TypeScript and Webpack.

    if (global.fetch) {
      exports["default"] = global.fetch.bind(global);
    }

    exports.Headers = global.Headers;
    exports.Request = global.Request;
    exports.Response = global.Response;
  });

  if (!commonjsGlobal.fetch) {
    commonjsGlobal.fetch = browser;
  }

  var Communicator = /*#__PURE__*/function () {
    function Communicator() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Communicator);

      _defineProperty(this, "baseUrl", 'https://ws3.morpher.ru');

      _defineProperty(this, "token", null);

      _defineProperty(this, "timeoutMs", 3000);

      if (params.baseUrl !== undefined) {
        if (params.baseUrl.indexOf('http') !== -1) {
          this.baseUrl = params.baseUrl;
        } else {
          this.baseUrl = 'http://' + params.baseUrl;
        }
      }

      if (params.token !== undefined) {
        this.token = params.token;
      }

      if (params.timeoutMs !== undefined) {
        this.timeoutMs = params.timeoutMs;
      }
    }

    _createClass(Communicator, [{
      key: "request",
      value: function request(path) {
        var _this = this;

        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();
        var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Communicator.METHOD_GET;
        var isContentBody = this.isContentBody(params, method);
        var requestParameters = isContentBody ? params.get(Communicator.CONTENT_BODY_KEY) : this.buildRequestParams(params);
        var url = this.isPost(method) ? this.buildUrl(path) : this.buildUrl(path, params);
        var contentType = isContentBody ? 'text/plain; charset=utf-8' : 'application/x-www-form-urlencoded';
        var init = {
          method: method,
          headers: {
            'Content-Type': contentType,
            'Accept': 'application/json'
          }
        };

        if (this.isPost(method)) {
          init.body = requestParameters;
        }

        return new Promise(function (resolve, reject) {
          var timer = setTimeout(function () {
            return reject(new Error('TIMEOUT'));
          }, _this.timeoutMs);

          _this.fetcher(url, init).then(function (value) {
            clearTimeout(timer);
            resolve(value);
          })["catch"](function (reason) {
            clearTimeout(timer);
            reject(reason);
          });
        });
      }
    }, {
      key: "buildUrl",
      value: function buildUrl(path) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();
        var url = new URL(path, this.baseUrl);
        params.forEach(function (value, name) {
          url.searchParams.append(name, value);
        });

        if (this.token) {
          url.searchParams.append('token', this.token);
        }

        return url.toString();
      }
    }, {
      key: "buildRequestParams",
      value: function buildRequestParams(params) {
        var sp = new URLSearchParams(params);
        return sp.toString();
      }
    }, {
      key: "_fetcher",
      value: function _fetcher(url, init) {
        return fetch(url, init);
      }
    }, {
      key: "fetcher",
      get: function get() {
        return this._fetcher;
      },
      set: function set(fn) {
        this._fetcher = fn;
      }
    }, {
      key: "isContentBody",
      value: function isContentBody(params, method) {
        return this.isPost(method) && params.size === 1 && params.has(Communicator.CONTENT_BODY_KEY);
      }
    }, {
      key: "isPost",
      value: function isPost(method) {
        return method.toUpperCase() === Communicator.METHOD_POST;
      }
    }]);

    return Communicator;
  }();

  _defineProperty(Communicator, "METHOD_GET", 'GET');

  _defineProperty(Communicator, "METHOD_DELETE", 'DELETE');

  _defineProperty(Communicator, "METHOD_POST", 'POST');

  _defineProperty(Communicator, "CONTENT_BODY_KEY", 'Content-Body');

  var communicator = Communicator;

  var DeclensionForms = function DeclensionForms(props) {
    _classCallCheck(this, DeclensionForms);

    if (props['И'] !== undefined) {
      this.nominative = props['И'];
      this['именительный'] = this.nominative;
    }

    this.genitive = props['Р'];
    this['родительный'] = this.genitive;
    this.dative = props['Д'];
    this['дательный'] = this.dative;
    this.accusative = props['В'];
    this['винительный'] = this.accusative;
    this.instrumental = props['Т'];
    this['творительный'] = this.instrumental;
    this.prepositional = props['П'];
    this['предложный'] = this.prepositional;

    if (props['П_о'] !== undefined) {
      this.prepositional_O = props['П_о'];
      this['предложный_О'] = this.prepositional_O;
    }
  };

  var declensionForms = DeclensionForms;

  var FullName = function FullName(props) {
    _classCallCheck(this, FullName);

    this.name = props['И'];
    this['имя'] = this.name;
    this.surname = props['Ф'];
    this['фамилия'] = this.surname;
    this.patronymic = props['О'];
    this['отчество'] = this.patronymic;
  };

  var fullName = FullName;

  var DeclensionResult = /*#__PURE__*/function (_DeclensionForms) {
    _inherits(DeclensionResult, _DeclensionForms);

    var _super = _createSuper(DeclensionResult);

    function DeclensionResult(props) {
      var _this;

      _classCallCheck(this, DeclensionResult);

      _this = _super.call(this, props);

      if (props['род'] !== undefined) {
        _this.gender = props['род'];
        _this['род'] = _this.gender;
      }

      if (props['множественное'] !== undefined) {
        _this.plural = new declensionForms(props['множественное']);
        _this['множественное'] = _this['plural'];
      }

      if (props['где'] !== undefined) {
        _this.where = props['где'];
        _this.locative = _this.where;
        _this.gde = _this.where;
        _this['где'] = _this.where;
      }

      if (props['куда'] !== undefined) {
        _this.where_to = props['куда'];
        _this.kuda = _this.where_to;
        _this['куда'] = _this.where_to;
      }

      if (props['откуда'] !== undefined) {
        _this.where_from = props['откуда'];
        _this.whence = _this.where_from;
        _this.otkuda = _this.where_from;
        _this['откуда'] = _this.where_from;
      }

      if (props['ФИО'] !== undefined) {
        _this.fullName = new fullName(props['ФИО']);
        _this['фио'] = _this.fullName;
      }

      return _this;
    }

    return DeclensionResult;
  }(declensionForms);

  var declensionResult = DeclensionResult;

  var NumberSpellingResult = function NumberSpellingResult(props) {
    _classCallCheck(this, NumberSpellingResult);

    this.n = new declensionForms(props['n']);
    this.unit = new declensionForms(props['unit']);
  };

  var numberSpellingResult = NumberSpellingResult;

  var DateSpellingResult = /*#__PURE__*/function (_DeclensionForms) {
    _inherits(DateSpellingResult, _DeclensionForms);

    var _super = _createSuper(DateSpellingResult);

    function DateSpellingResult(props) {
      _classCallCheck(this, DateSpellingResult);

      return _super.call(this, props);
    }

    return DateSpellingResult;
  }(declensionForms);

  var dateSpellingResult = DateSpellingResult;

  var AdjectiveGenders = function AdjectiveGenders(props) {
    _classCallCheck(this, AdjectiveGenders);

    this.feminine = props['feminine'];
    this['женский'] = this.feminine;
    this.neuter = props['neuter'];
    this['средний'] = this.neuter;
    this.plural = props['plural'];
    this['множественное'] = this.plural;
  };

  var adjectiveGenders = AdjectiveGenders;

  var CorrectionForms = function CorrectionForms(props) {
    _classCallCheck(this, CorrectionForms);

    if (props['И'] !== undefined) {
      this.nominative = props['И'];
      this['именительный'] = this.nominative;
    }

    if (props['Р'] !== undefined) {
      this.genitive = props['Р'];
      this['родительный'] = this.genitive;
    }

    if (props['Д'] !== undefined) {
      this.dative = props['Д'];
      this['дательный'] = this.dative;
    }

    if (props['В'] !== undefined) {
      this.accusative = props['В'];
      this['винительный'] = this.accusative;
    }

    if (props['Т'] !== undefined) {
      this.instrumental = props['Т'];
      this['творительный'] = this.instrumental;
    }

    if (props['П'] !== undefined) {
      this.prepositional = props['П'];
      this['предложный'] = this.prepositional;
    }

    if (props['М'] !== undefined) {
      this.locative = props['М'];
      this['местный'] = this.locative;
    }
  };

  var correctionForms = CorrectionForms;

  var CorrectionEntry = function CorrectionEntry(props) {
    _classCallCheck(this, CorrectionEntry);

    if (props['singular'] !== undefined) {
      this.singular = new correctionForms(props['singular']);
    }

    if (props['plural'] !== undefined) {
      this.plural = new correctionForms(props['plural']);
    }

    if (props['gender'] !== undefined) {
      this.gender = props['gender'];
    }
  };

  var correctionEntry = CorrectionEntry;

  var MorpherError = /*#__PURE__*/function (_Error) {
    _inherits(MorpherError, _Error);

    var _super = _createSuper(MorpherError);

    function MorpherError(message, code) {
      var _this;

      _classCallCheck(this, MorpherError);

      _this = _super.call(this, message);
      _this.code = code;
      return _this;
    }

    return MorpherError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  var morpherError = MorpherError;

  var UserDict = /*#__PURE__*/function () {
    function UserDict(communicator) {
      _classCallCheck(this, UserDict);

      _defineProperty(this, "path", '/russian/userdict');

      this.communicator = communicator;
    }

    _createClass(UserDict, [{
      key: "addOrUpdate",
      value: function addOrUpdate() {
        var correctionEntry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var params = new Map();

        if (correctionEntry.singular !== undefined) {
          if (correctionEntry.singular.nominative !== undefined) {
            params.set('И', correctionEntry.singular.nominative);
          }

          if (correctionEntry.singular.genitive !== undefined) {
            params.set('Р', correctionEntry.singular.genitive);
          }

          if (correctionEntry.singular.dative !== undefined) {
            params.set('Д', correctionEntry.singular.dative);
          }

          if (correctionEntry.singular.accusative !== undefined) {
            params.set('В', correctionEntry.singular.accusative);
          }

          if (correctionEntry.singular.instrumental !== undefined) {
            params.set('Т', correctionEntry.singular.instrumental);
          }

          if (correctionEntry.singular.prepositional !== undefined) {
            params.set('П', correctionEntry.singular.prepositional);
          }

          if (correctionEntry.singular.locative !== undefined) {
            params.set('М', correctionEntry.singular.locative);
          }
        }

        if (correctionEntry.plural !== undefined) {
          if (correctionEntry.plural.nominative !== undefined) {
            params.set('М_И', correctionEntry.plural.nominative);
          }

          if (correctionEntry.plural.genitive !== undefined) {
            params.set('М_Р', correctionEntry.plural.genitive);
          }

          if (correctionEntry.plural.dative !== undefined) {
            params.set('М_Д', correctionEntry.plural.dative);
          }

          if (correctionEntry.plural.accusative !== undefined) {
            params.set('М_В', correctionEntry.plural.accusative);
          }

          if (correctionEntry.plural.instrumental !== undefined) {
            params.set('М_Т', correctionEntry.plural.instrumental);
          }

          if (correctionEntry.plural.prepositional !== undefined) {
            params.set('М_П', correctionEntry.plural.prepositional);
          }

          if (correctionEntry.plural.locative !== undefined) {
            params.set('М_М', correctionEntry.plural.locative);
          }
        }

        return this.communicator.request(this.path, params, communicator.METHOD_POST).then(function (response) {
          return response.text();
        }).then(function (text) {
          // In the case of a successful request the service returns nothing,
          // and in the case of an error in the specified format.
          if (text === '') {
            return true;
          }

          var data = {};

          try {
            data = JSON.parse(text);
          } catch (e) {
            throw new Error(e.message);
          }

          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }
        });
      }
    }, {
      key: "getAll",
      value: function getAll() {
        return this.communicator.request(this.path, new Map(), communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return data.map(function (e) {
            return new correctionEntry(e);
          });
        });
      }
    }, {
      key: "remove",
      value: function remove() {
        var nominativeForm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var params = new Map();
        params.set('s', nominativeForm);
        return this.communicator.request(this.path, params, communicator.METHOD_DELETE).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return data;
        });
      }
    }]);

    return UserDict;
  }();

  var userDict = UserDict;

  var Client = /*#__PURE__*/function () {
    function Client(communicator) {
      _classCallCheck(this, Client);

      _defineProperty(this, "prefix", '/russian');

      this.communicator = communicator;
      this.userDict = new userDict(communicator);
    }

    _createClass(Client, [{
      key: "declension",
      value: function declension() {
        var phrase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var params = new Map();
        params.set('s', phrase);

        for (var _len = arguments.length, flags = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          flags[_key - 1] = arguments[_key];
        }

        if (flags.length > 0) {
          params.set('flags', flags.join(','));
        }

        var path = this.prefix + '/declension';
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return new declensionResult(data);
        });
      }
    }, {
      key: "spell",
      value: function spell() {
        var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var params = new Map();
        params.set('n', number);
        params.set('unit', unit);
        var path = this.prefix + '/spell';
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return new numberSpellingResult(data);
        });
      }
    }, {
      key: "spellOrdinal",
      value: function spellOrdinal() {
        var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var params = new Map();
        params.set('n', number);
        params.set('unit', unit);
        var path = this.prefix + '/spell-ordinal';
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return new numberSpellingResult(data);
        });
      }
    }, {
      key: "spellDate",
      value: function spellDate() {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var params = new Map();
        params.set('date', date);
        var path = this.prefix + '/spell-date';
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return new dateSpellingResult(data);
        });
      }
    }, {
      key: "adjectiveGenders",
      value: function adjectiveGenders$1() {
        var adjective = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var params = new Map();
        params.set('s', adjective);
        var path = this.prefix + '/genders';
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return new adjectiveGenders(data);
        });
      }
    }, {
      key: "adjectivize",
      value: function adjectivize() {
        var lemma = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var params = new Map();
        params.set('s', lemma);
        var path = this.prefix + '/adjectivize';
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return data;
        });
      }
    }, {
      key: "addStressMarks",
      value: function addStressMarks() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var params = new Map();
        params.set(communicator.CONTENT_BODY_KEY, text);
        var path = this.prefix + '/addstressmarks';
        return this.communicator.request(path, params, communicator.METHOD_POST).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return data;
        });
      }
    }]);

    return Client;
  }();

  var client = Client;

  var DeclensionForms$1 = function DeclensionForms(props) {
    _classCallCheck(this, DeclensionForms);

    if (props['Н'] !== undefined) {
      this.nominative = props['Н'];
      this['називний'] = this.nominative;
    }

    this.genitive = props['Р'];
    this['родовий'] = this.genitive;
    this.dative = props['Д'];
    this['давальний'] = this.dative;
    this.accusative = props['З'];
    this['знахідний'] = this.accusative;
    this.instrumental = props['О'];
    this['орудний'] = this.instrumental;
    this.prepositional = props['М'];
    this['місцевий'] = this.prepositional;
    this.vocative = props['К'];
    this['кличний'] = this.vocative;
  };

  var declensionForms$1 = DeclensionForms$1;

  var DeclensionResult$1 = /*#__PURE__*/function (_DeclensionForms) {
    _inherits(DeclensionResult, _DeclensionForms);

    var _super = _createSuper(DeclensionResult);

    function DeclensionResult(props) {
      var _this;

      _classCallCheck(this, DeclensionResult);

      _this = _super.call(this, props);

      if (props['рід'] !== undefined) {
        _this.gender = props['рід'];
        _this['рід'] = _this.gender;
      }

      return _this;
    }

    return DeclensionResult;
  }(declensionForms$1);

  var declensionResult$1 = DeclensionResult$1;

  var NumberSpellingResult$1 = function NumberSpellingResult(props) {
    _classCallCheck(this, NumberSpellingResult);

    this.n = new declensionForms$1(props['n']);
    this.unit = new declensionForms$1(props['unit']);
  };

  var numberSpellingResult$1 = NumberSpellingResult$1;

  var CorrectionForms$1 = function CorrectionForms(props) {
    _classCallCheck(this, CorrectionForms);

    if (props['Н'] !== undefined) {
      this.nominative = props['Н'];
      this['називний'] = this.nominative;
    }

    if (props['Р'] !== undefined) {
      this.genitive = props['Р'];
      this['родовий'] = this.genitive;
    }

    if (props['Д'] !== undefined) {
      this.dative = props['Д'];
      this['давальний'] = this.dative;
    }

    if (props['З'] !== undefined) {
      this.accusative = props['З'];
      this['знахідний'] = this.accusative;
    }

    if (props['О'] !== undefined) {
      this.instrumental = props['О'];
      this['орудний'] = this.instrumental;
    }

    if (props['М'] !== undefined) {
      this.prepositional = props['М'];
      this['місцевий'] = this.prepositional;
    }

    if (props['К'] !== undefined) {
      this.vocative = props['К'];
      this['кличний'] = this.vocative;
    }
  };

  var correctionForms$1 = CorrectionForms$1;

  var CorrectionEntry$1 = function CorrectionEntry(props) {
    _classCallCheck(this, CorrectionEntry);

    if (props['singular'] !== undefined) {
      this.singular = new correctionForms$1(props['singular']);
    }

    if (props['gender'] !== undefined) {
      this.gender = props['gender'];
    }
  };

  var correctionEntry$1 = CorrectionEntry$1;

  var UserDict$1 = /*#__PURE__*/function () {
    function UserDict(communicator) {
      _classCallCheck(this, UserDict);

      _defineProperty(this, "path", '/ukrainian/userdict');

      this.communicator = communicator;
    }

    _createClass(UserDict, [{
      key: "addOrUpdate",
      value: function addOrUpdate() {
        var correctionEntry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var params = new Map();

        if (correctionEntry.singular !== undefined) {
          if (correctionEntry.singular.nominative !== undefined) {
            params.set('Н', correctionEntry.singular.nominative);
          }

          if (correctionEntry.singular.genitive !== undefined) {
            params.set('Р', correctionEntry.singular.genitive);
          }

          if (correctionEntry.singular.dative !== undefined) {
            params.set('Д', correctionEntry.singular.dative);
          }

          if (correctionEntry.singular.accusative !== undefined) {
            params.set('З', correctionEntry.singular.accusative);
          }

          if (correctionEntry.singular.instrumental !== undefined) {
            params.set('О', correctionEntry.singular.instrumental);
          }

          if (correctionEntry.singular.prepositional !== undefined) {
            params.set('М', correctionEntry.singular.prepositional);
          }

          if (correctionEntry.singular.vocative !== undefined) {
            params.set('К', correctionEntry.singular.vocative);
          }
        }

        return this.communicator.request(this.path, params, communicator.METHOD_POST).then(function (response) {
          return response.text();
        }).then(function (text) {
          // In the case of a successful request the service returns nothing,
          // and in the case of an error in the specified format.
          if (text === '') {
            return true;
          }

          var data = {};

          try {
            data = JSON.parse(text);
          } catch (e) {
            throw new Error(e.message);
          }

          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }
        });
      }
    }, {
      key: "getAll",
      value: function getAll() {
        return this.communicator.request(this.path, new Map(), communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return data.map(function (e) {
            return new correctionEntry$1(e);
          });
        });
      }
    }, {
      key: "remove",
      value: function remove() {
        var nominativeForm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var params = new Map();
        params.set('s', nominativeForm);
        return this.communicator.request(this.path, params, communicator.METHOD_DELETE).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return data;
        });
      }
    }]);

    return UserDict;
  }();

  var userDict$1 = UserDict$1;

  var Client$1 = /*#__PURE__*/function () {
    function Client(communicator) {
      _classCallCheck(this, Client);

      _defineProperty(this, "prefix", '/ukrainian');

      this.communicator = communicator;
      this.userDict = new userDict$1(communicator);
    }

    _createClass(Client, [{
      key: "declension",
      value: function declension() {
        var phrase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var params = new Map();
        params.set('s', phrase);

        for (var _len = arguments.length, flags = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          flags[_key - 1] = arguments[_key];
        }

        if (flags.length > 0) {
          params.set('flags', flags.join(','));
        }

        var path = this.prefix + '/declension';
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return new declensionResult$1(data);
        });
      }
    }, {
      key: "spell",
      value: function spell() {
        var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var params = new Map();
        params.set('n', number);
        params.set('unit', unit);
        var path = this.prefix + '/spell';
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return new numberSpellingResult$1(data);
        });
      }
    }]);

    return Client;
  }();

  var client$1 = Client$1;

  var DeclensionForms$2 = function DeclensionForms(props) {
    _classCallCheck(this, DeclensionForms);

    if (props['A'] !== undefined) {
      this.nominative = props['A'];
      this['атау'] = this.nominative;
    }

    this.genitive = props['І'];
    this['ілік'] = this.genitive;
    this.dative = props['Б'];
    this['барыс'] = this.dative;
    this.accusative = props['Т'];
    this['табыс'] = this.accusative;
    this.ablative = props['Ш'];
    this['шығыс'] = this.ablative;
    this.locative = props['Ж'];
    this['жатыс'] = this.locative;
    this.instrumental = props['К'];
    this['көмектес'] = this.instrumental;
  };

  var declensionForms$2 = DeclensionForms$2;

  var SameNumberForms = /*#__PURE__*/function (_DeclensionForms) {
    _inherits(SameNumberForms, _DeclensionForms);

    var _super = _createSuper(SameNumberForms);

    function SameNumberForms(props) {
      var _this;

      _classCallCheck(this, SameNumberForms);

      _this = _super.call(this, props);
      _this.firstPerson = new declensionForms$2(props['менің']);
      _this['менің'] = _this.firstPerson;
      _this.secondPerson = new declensionForms$2(props['сенің']);
      _this['сенің'] = _this.secondPerson;
      _this.secondPersonRespectful = new declensionForms$2(props['сіздің']);
      _this['сіздің'] = _this.secondPersonRespectful;
      _this.thirdPerson = new declensionForms$2(props['оның']);
      _this['оның'] = _this.thirdPerson;
      _this.firstPersonPlural = new declensionForms$2(props['біздің']);
      _this['біздің'] = _this.firstPersonPlural;
      _this.secondPersonPlural = new declensionForms$2(props['сендердің']);
      _this['сендердің'] = _this.secondPersonPlural;
      _this.secondPersonRespectfulPlural = new declensionForms$2(props['сіздердің']);
      _this['сіздердің'] = _this.secondPersonRespectfulPlural;
      _this.thirdPersonPlural = new declensionForms$2(props['олардың']);
      _this['олардың'] = _this.thirdPersonPlural;
      return _this;
    }

    return SameNumberForms;
  }(declensionForms$2);

  var sameNumberForms = SameNumberForms;

  var DeclensionResult$2 = /*#__PURE__*/function (_SameNumberForms) {
    _inherits(DeclensionResult, _SameNumberForms);

    var _super = _createSuper(DeclensionResult);

    function DeclensionResult(props) {
      var _this;

      _classCallCheck(this, DeclensionResult);

      _this = _super.call(this, props);
      _this.plural = new sameNumberForms(props['көпше']);
      _this['көпше'] = _this.plural;
      return _this;
    }

    return DeclensionResult;
  }(sameNumberForms);

  var declensionResult$2 = DeclensionResult$2;

  var Client$2 = /*#__PURE__*/function () {
    function Client(communicator) {
      _classCallCheck(this, Client);

      _defineProperty(this, "prefix", '/qazaq');

      this.communicator = communicator;
    }

    _createClass(Client, [{
      key: "declension",
      value: function declension(phrase) {
        var params = new Map();
        params.set('s', phrase);
        var path = this.prefix + '/declension';
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return new declensionResult$2(data);
        });
      }
    }]);

    return Client;
  }();

  var client$2 = Client$2;

  var Morpher = /*#__PURE__*/function () {
    function Morpher(params) {
      _classCallCheck(this, Morpher);

      this.communicator = new communicator(params);
    }

    _createClass(Morpher, [{
      key: "communicator",
      get: function get() {
        return this._communicator;
      },
      set: function set(value) {
        this._communicator = value;
      }
    }, {
      key: "russian",
      get: function get() {
        return new client(this.communicator);
      }
    }, {
      key: "ukrainian",
      get: function get() {
        return new client$1(this.communicator);
      }
    }, {
      key: "qazaq",
      get: function get() {
        return new client$2(this.communicator);
      }
    }, {
      key: "getQueriesLeft",
      value: function getQueriesLeft() {
        var path = '/get-queries-left';
        var params = new Map();
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return data;
        });
      }
    }]);

    return Morpher;
  }();

  _defineProperty(Morpher, "FLAG_FEMININE", 'feminine');

  _defineProperty(Morpher, "FLAG_MASCULINE", 'masculine');

  _defineProperty(Morpher, "FLAG_ANIMATE", 'animate');

  _defineProperty(Morpher, "FLAG_INANIMATE", 'inanimate');

  _defineProperty(Morpher, "FLAG_COMMON", 'common');

  _defineProperty(Morpher, "FLAG_NAME", 'name');

  _defineProperty(Morpher, "FLAG_NEUTER", 'neuter');

  _defineProperty(Morpher, "FLAG_PLURAL", 'plural');

  var morpher = Morpher;

  return morpher;

})));
//# sourceMappingURL=morpher.js.map
