var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../yoga-wasm-web/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  ALIGN_AUTO: () => ALIGN_AUTO,
  ALIGN_BASELINE: () => ALIGN_BASELINE,
  ALIGN_CENTER: () => ALIGN_CENTER,
  ALIGN_FLEX_END: () => ALIGN_FLEX_END,
  ALIGN_FLEX_START: () => ALIGN_FLEX_START,
  ALIGN_SPACE_AROUND: () => ALIGN_SPACE_AROUND,
  ALIGN_SPACE_BETWEEN: () => ALIGN_SPACE_BETWEEN,
  ALIGN_STRETCH: () => ALIGN_STRETCH,
  DIMENSION_HEIGHT: () => DIMENSION_HEIGHT,
  DIMENSION_WIDTH: () => DIMENSION_WIDTH,
  DIRECTION_INHERIT: () => DIRECTION_INHERIT,
  DIRECTION_LTR: () => DIRECTION_LTR,
  DIRECTION_RTL: () => DIRECTION_RTL,
  DISPLAY_FLEX: () => DISPLAY_FLEX,
  DISPLAY_NONE: () => DISPLAY_NONE,
  EDGE_ALL: () => EDGE_ALL,
  EDGE_BOTTOM: () => EDGE_BOTTOM,
  EDGE_END: () => EDGE_END,
  EDGE_HORIZONTAL: () => EDGE_HORIZONTAL,
  EDGE_LEFT: () => EDGE_LEFT,
  EDGE_RIGHT: () => EDGE_RIGHT,
  EDGE_START: () => EDGE_START,
  EDGE_TOP: () => EDGE_TOP,
  EDGE_VERTICAL: () => EDGE_VERTICAL,
  EXPERIMENTAL_FEATURE_ABSOLUTE_PERCENTAGE_AGAINST_PADDING_EDGE: () => EXPERIMENTAL_FEATURE_ABSOLUTE_PERCENTAGE_AGAINST_PADDING_EDGE,
  EXPERIMENTAL_FEATURE_FIX_ABSOLUTE_TRAILING_COLUMN_MARGIN: () => EXPERIMENTAL_FEATURE_FIX_ABSOLUTE_TRAILING_COLUMN_MARGIN,
  EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS: () => EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS,
  FLEX_DIRECTION_COLUMN: () => FLEX_DIRECTION_COLUMN,
  FLEX_DIRECTION_COLUMN_REVERSE: () => FLEX_DIRECTION_COLUMN_REVERSE,
  FLEX_DIRECTION_ROW: () => FLEX_DIRECTION_ROW,
  FLEX_DIRECTION_ROW_REVERSE: () => FLEX_DIRECTION_ROW_REVERSE,
  GUTTER_ALL: () => GUTTER_ALL,
  GUTTER_COLUMN: () => GUTTER_COLUMN,
  GUTTER_ROW: () => GUTTER_ROW,
  JUSTIFY_CENTER: () => JUSTIFY_CENTER,
  JUSTIFY_FLEX_END: () => JUSTIFY_FLEX_END,
  JUSTIFY_FLEX_START: () => JUSTIFY_FLEX_START,
  JUSTIFY_SPACE_AROUND: () => JUSTIFY_SPACE_AROUND,
  JUSTIFY_SPACE_BETWEEN: () => JUSTIFY_SPACE_BETWEEN,
  JUSTIFY_SPACE_EVENLY: () => JUSTIFY_SPACE_EVENLY,
  LOG_LEVEL_DEBUG: () => LOG_LEVEL_DEBUG,
  LOG_LEVEL_ERROR: () => LOG_LEVEL_ERROR,
  LOG_LEVEL_FATAL: () => LOG_LEVEL_FATAL,
  LOG_LEVEL_INFO: () => LOG_LEVEL_INFO,
  LOG_LEVEL_VERBOSE: () => LOG_LEVEL_VERBOSE,
  LOG_LEVEL_WARN: () => LOG_LEVEL_WARN,
  MEASURE_MODE_AT_MOST: () => MEASURE_MODE_AT_MOST,
  MEASURE_MODE_EXACTLY: () => MEASURE_MODE_EXACTLY,
  MEASURE_MODE_UNDEFINED: () => MEASURE_MODE_UNDEFINED,
  NODE_TYPE_DEFAULT: () => NODE_TYPE_DEFAULT,
  NODE_TYPE_TEXT: () => NODE_TYPE_TEXT,
  OVERFLOW_HIDDEN: () => OVERFLOW_HIDDEN,
  OVERFLOW_SCROLL: () => OVERFLOW_SCROLL,
  OVERFLOW_VISIBLE: () => OVERFLOW_VISIBLE,
  POSITION_TYPE_ABSOLUTE: () => POSITION_TYPE_ABSOLUTE,
  POSITION_TYPE_RELATIVE: () => POSITION_TYPE_RELATIVE,
  POSITION_TYPE_STATIC: () => POSITION_TYPE_STATIC,
  PRINT_OPTIONS_CHILDREN: () => PRINT_OPTIONS_CHILDREN,
  PRINT_OPTIONS_LAYOUT: () => PRINT_OPTIONS_LAYOUT,
  PRINT_OPTIONS_STYLE: () => PRINT_OPTIONS_STYLE,
  UNIT_AUTO: () => UNIT_AUTO,
  UNIT_PERCENT: () => UNIT_PERCENT,
  UNIT_POINT: () => UNIT_POINT,
  UNIT_UNDEFINED: () => UNIT_UNDEFINED,
  WRAP_NO_WRAP: () => WRAP_NO_WRAP,
  WRAP_WRAP: () => WRAP_WRAP,
  WRAP_WRAP_REVERSE: () => WRAP_WRAP_REVERSE,
  default: () => initYoga,
  initStreaming: () => initStreaming
});
module.exports = __toCommonJS(dist_exports);

// ../yoga-wasm-web/dist/wrapAsm-f766f97f.js
var YGEnums = {};
var ALIGN_AUTO = YGEnums.ALIGN_AUTO = 0;
var ALIGN_FLEX_START = YGEnums.ALIGN_FLEX_START = 1;
var ALIGN_CENTER = YGEnums.ALIGN_CENTER = 2;
var ALIGN_FLEX_END = YGEnums.ALIGN_FLEX_END = 3;
var ALIGN_STRETCH = YGEnums.ALIGN_STRETCH = 4;
var ALIGN_BASELINE = YGEnums.ALIGN_BASELINE = 5;
var ALIGN_SPACE_BETWEEN = YGEnums.ALIGN_SPACE_BETWEEN = 6;
var ALIGN_SPACE_AROUND = YGEnums.ALIGN_SPACE_AROUND = 7;
var DIMENSION_WIDTH = YGEnums.DIMENSION_WIDTH = 0;
var DIMENSION_HEIGHT = YGEnums.DIMENSION_HEIGHT = 1;
var DIRECTION_INHERIT = YGEnums.DIRECTION_INHERIT = 0;
var DIRECTION_LTR = YGEnums.DIRECTION_LTR = 1;
var DIRECTION_RTL = YGEnums.DIRECTION_RTL = 2;
var DISPLAY_FLEX = YGEnums.DISPLAY_FLEX = 0;
var DISPLAY_NONE = YGEnums.DISPLAY_NONE = 1;
var EDGE_LEFT = YGEnums.EDGE_LEFT = 0;
var EDGE_TOP = YGEnums.EDGE_TOP = 1;
var EDGE_RIGHT = YGEnums.EDGE_RIGHT = 2;
var EDGE_BOTTOM = YGEnums.EDGE_BOTTOM = 3;
var EDGE_START = YGEnums.EDGE_START = 4;
var EDGE_END = YGEnums.EDGE_END = 5;
var EDGE_HORIZONTAL = YGEnums.EDGE_HORIZONTAL = 6;
var EDGE_VERTICAL = YGEnums.EDGE_VERTICAL = 7;
var EDGE_ALL = YGEnums.EDGE_ALL = 8;
var EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS = YGEnums.EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS = 0;
var EXPERIMENTAL_FEATURE_ABSOLUTE_PERCENTAGE_AGAINST_PADDING_EDGE = YGEnums.EXPERIMENTAL_FEATURE_ABSOLUTE_PERCENTAGE_AGAINST_PADDING_EDGE = 1;
var EXPERIMENTAL_FEATURE_FIX_ABSOLUTE_TRAILING_COLUMN_MARGIN = YGEnums.EXPERIMENTAL_FEATURE_FIX_ABSOLUTE_TRAILING_COLUMN_MARGIN = 2;
var FLEX_DIRECTION_COLUMN = YGEnums.FLEX_DIRECTION_COLUMN = 0;
var FLEX_DIRECTION_COLUMN_REVERSE = YGEnums.FLEX_DIRECTION_COLUMN_REVERSE = 1;
var FLEX_DIRECTION_ROW = YGEnums.FLEX_DIRECTION_ROW = 2;
var FLEX_DIRECTION_ROW_REVERSE = YGEnums.FLEX_DIRECTION_ROW_REVERSE = 3;
var GUTTER_COLUMN = YGEnums.GUTTER_COLUMN = 0;
var GUTTER_ROW = YGEnums.GUTTER_ROW = 1;
var GUTTER_ALL = YGEnums.GUTTER_ALL = 2;
var JUSTIFY_FLEX_START = YGEnums.JUSTIFY_FLEX_START = 0;
var JUSTIFY_CENTER = YGEnums.JUSTIFY_CENTER = 1;
var JUSTIFY_FLEX_END = YGEnums.JUSTIFY_FLEX_END = 2;
var JUSTIFY_SPACE_BETWEEN = YGEnums.JUSTIFY_SPACE_BETWEEN = 3;
var JUSTIFY_SPACE_AROUND = YGEnums.JUSTIFY_SPACE_AROUND = 4;
var JUSTIFY_SPACE_EVENLY = YGEnums.JUSTIFY_SPACE_EVENLY = 5;
var LOG_LEVEL_ERROR = YGEnums.LOG_LEVEL_ERROR = 0;
var LOG_LEVEL_WARN = YGEnums.LOG_LEVEL_WARN = 1;
var LOG_LEVEL_INFO = YGEnums.LOG_LEVEL_INFO = 2;
var LOG_LEVEL_DEBUG = YGEnums.LOG_LEVEL_DEBUG = 3;
var LOG_LEVEL_VERBOSE = YGEnums.LOG_LEVEL_VERBOSE = 4;
var LOG_LEVEL_FATAL = YGEnums.LOG_LEVEL_FATAL = 5;
var MEASURE_MODE_UNDEFINED = YGEnums.MEASURE_MODE_UNDEFINED = 0;
var MEASURE_MODE_EXACTLY = YGEnums.MEASURE_MODE_EXACTLY = 1;
var MEASURE_MODE_AT_MOST = YGEnums.MEASURE_MODE_AT_MOST = 2;
var NODE_TYPE_DEFAULT = YGEnums.NODE_TYPE_DEFAULT = 0;
var NODE_TYPE_TEXT = YGEnums.NODE_TYPE_TEXT = 1;
var OVERFLOW_VISIBLE = YGEnums.OVERFLOW_VISIBLE = 0;
var OVERFLOW_HIDDEN = YGEnums.OVERFLOW_HIDDEN = 1;
var OVERFLOW_SCROLL = YGEnums.OVERFLOW_SCROLL = 2;
var POSITION_TYPE_STATIC = YGEnums.POSITION_TYPE_STATIC = 0;
var POSITION_TYPE_RELATIVE = YGEnums.POSITION_TYPE_RELATIVE = 1;
var POSITION_TYPE_ABSOLUTE = YGEnums.POSITION_TYPE_ABSOLUTE = 2;
var PRINT_OPTIONS_LAYOUT = YGEnums.PRINT_OPTIONS_LAYOUT = 1;
var PRINT_OPTIONS_STYLE = YGEnums.PRINT_OPTIONS_STYLE = 2;
var PRINT_OPTIONS_CHILDREN = YGEnums.PRINT_OPTIONS_CHILDREN = 4;
var UNIT_UNDEFINED = YGEnums.UNIT_UNDEFINED = 0;
var UNIT_POINT = YGEnums.UNIT_POINT = 1;
var UNIT_PERCENT = YGEnums.UNIT_PERCENT = 2;
var UNIT_AUTO = YGEnums.UNIT_AUTO = 3;
var WRAP_NO_WRAP = YGEnums.WRAP_NO_WRAP = 0;
var WRAP_WRAP = YGEnums.WRAP_WRAP = 1;
var WRAP_WRAP_REVERSE = YGEnums.WRAP_WRAP_REVERSE = 2;
var wrapAsm = (E) => {
  function _(E2, _2, T2) {
    let N2 = E2[_2];
    E2[_2] = function(...E3) {
      return T2.call(this, N2, ...E3);
    };
  }
  for (let T2 of ["setPosition", "setMargin", "setFlexBasis", "setWidth", "setHeight", "setMinWidth", "setMinHeight", "setMaxWidth", "setMaxHeight", "setPadding"]) {
    let N2 = { [YGEnums.UNIT_POINT]: E.Node.prototype[T2], [YGEnums.UNIT_PERCENT]: E.Node.prototype[`${T2}Percent`], [YGEnums.UNIT_AUTO]: E.Node.prototype[`${T2}Auto`] };
    _(E.Node.prototype, T2, function(E2, ..._2) {
      let I, L;
      let O = _2.pop();
      if ("auto" === O)
        I = YGEnums.UNIT_AUTO, L = void 0;
      else if ("object" == typeof O)
        I = O.unit, L = O.valueOf();
      else if (I = "string" == typeof O && O.endsWith("%") ? YGEnums.UNIT_PERCENT : YGEnums.UNIT_POINT, L = parseFloat(O), !Number.isNaN(O) && Number.isNaN(L))
        throw Error(`Invalid value ${O} for ${T2}`);
      if (!N2[I])
        throw Error(`Failed to execute "${T2}": Unsupported unit '${O}'`);
      return void 0 !== L ? N2[I].call(this, ..._2, L) : N2[I].call(this, ..._2);
    });
  }
  function T(_2) {
    return E.MeasureCallback.implement({ measure: (...E2) => {
      let { width: T2, height: N2 } = _2(...E2);
      return { width: T2 ?? NaN, height: N2 ?? NaN };
    } });
  }
  function N(_2) {
    return E.DirtiedCallback.implement({ dirtied: _2 });
  }
  return _(E.Node.prototype, "setMeasureFunc", function(E2, _2) {
    return _2 ? E2.call(this, T(_2)) : this.unsetMeasureFunc();
  }), _(E.Node.prototype, "setDirtiedFunc", function(E2, _2) {
    E2.call(this, N(_2));
  }), _(E.Config.prototype, "free", function() {
    E.Config.destroy(this);
  }), _(E.Node, "create", (_2, T2) => T2 ? E.Node.createWithConfig(T2) : E.Node.createDefault()), _(E.Node.prototype, "free", function() {
    E.Node.destroy(this);
  }), _(E.Node.prototype, "freeRecursive", function() {
    for (let E2 = 0, _2 = this.getChildCount(); E2 < _2; ++E2)
      this.getChild(0).freeRecursive();
    this.free();
  }), _(E.Node.prototype, "calculateLayout", function(E2, _2 = NaN, T2 = NaN, N2 = YGEnums.DIRECTION_LTR) {
    return E2.call(this, _2, T2, N2);
  }), { Config: E.Config, Node: E.Node, ...YGEnums };
};

// ../yoga-wasm-web/dist/index.js
var yoga = (() => {
  var n = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0;
  return function(t = {}) {
    u || (u = void 0 !== t ? t : {}), u.ready = new Promise(function(n2, t2) {
      c = n2, f = t2;
    });
    var r, e, a = Object.assign({}, u), i = "";
    "undefined" != typeof document && document.currentScript && (i = document.currentScript.src), n && (i = n), i = 0 !== i.indexOf("blob:") ? i.substr(0, i.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "";
    var o = console.log.bind(console), s = console.warn.bind(console);
    Object.assign(u, a), a = null, "object" != typeof WebAssembly && w("no native wasm support detected");
    var u, c, f, l, h = false;
    function p(n2, t2, r2) {
      r2 = t2 + r2;
      for (var e2 = ""; !(t2 >= r2); ) {
        var a2 = n2[t2++];
        if (!a2)
          break;
        if (128 & a2) {
          var i2 = 63 & n2[t2++];
          if (192 == (224 & a2))
            e2 += String.fromCharCode((31 & a2) << 6 | i2);
          else {
            var o2 = 63 & n2[t2++];
            65536 > (a2 = 224 == (240 & a2) ? (15 & a2) << 12 | i2 << 6 | o2 : (7 & a2) << 18 | i2 << 12 | o2 << 6 | 63 & n2[t2++]) ? e2 += String.fromCharCode(a2) : (a2 -= 65536, e2 += String.fromCharCode(55296 | a2 >> 10, 56320 | 1023 & a2));
          }
        } else
          e2 += String.fromCharCode(a2);
      }
      return e2;
    }
    function v() {
      var n2 = l.buffer;
      u.HEAP8 = d = new Int8Array(n2), u.HEAP16 = m = new Int16Array(n2), u.HEAP32 = g = new Int32Array(n2), u.HEAPU8 = y = new Uint8Array(n2), u.HEAPU16 = E = new Uint16Array(n2), u.HEAPU32 = _ = new Uint32Array(n2), u.HEAPF32 = T = new Float32Array(n2), u.HEAPF64 = L = new Float64Array(n2);
    }
    var d, y, m, E, g, _, T, L, A, O = [], P = [], b = [], N = 0, I = null;
    function w(n2) {
      throw s(n2 = "Aborted(" + n2 + ")"), h = true, f(n2 = new WebAssembly.RuntimeError(n2 + ". Build with -sASSERTIONS for more info.")), n2;
    }
    function S() {
      return r.startsWith("data:application/octet-stream;base64,");
    }
    function R() {
      try {
        throw "both async and sync fetching of the wasm failed";
      } catch (n2) {
        w(n2);
      }
    }
    function C(n2) {
      for (; 0 < n2.length; )
        n2.shift()(u);
    }
    function W(n2) {
      if (void 0 === n2)
        return "_unknown";
      var t2 = (n2 = n2.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
      return 48 <= t2 && 57 >= t2 ? "_" + n2 : n2;
    }
    function U(n2, t2) {
      return n2 = W(n2), function() {
        return t2.apply(this, arguments);
      };
    }
    r = "yoga.wasm", S() || (r = i + r);
    var M = [{}, { value: void 0 }, { value: null }, { value: true }, { value: false }], F = [];
    function D(n2) {
      var t2 = Error, r2 = U(n2, function(t3) {
        this.name = n2, this.message = t3, void 0 !== (t3 = Error(t3).stack) && (this.stack = this.toString() + "\n" + t3.replace(/^Error(:[^\n]*)?\n/, ""));
      });
      return r2.prototype = Object.create(t2.prototype), r2.prototype.constructor = r2, r2.prototype.toString = function() {
        return void 0 === this.message ? this.name : this.name + ": " + this.message;
      }, r2;
    }
    var k = void 0;
    function V(n2) {
      throw new k(n2);
    }
    var j = (n2) => (n2 || V("Cannot use deleted val. handle = " + n2), M[n2].value), G = (n2) => {
      switch (n2) {
        case void 0:
          return 1;
        case null:
          return 2;
        case true:
          return 3;
        case false:
          return 4;
        default:
          var t2 = F.length ? F.pop() : M.length;
          return M[t2] = { fa: 1, value: n2 }, t2;
      }
    }, Y = void 0, X = void 0;
    function B(n2) {
      for (var t2 = ""; y[n2]; )
        t2 += X[y[n2++]];
      return t2;
    }
    var H = [];
    function x() {
      for (; H.length; ) {
        var n2 = H.pop();
        n2.L.Z = false, n2.delete();
      }
    }
    var z = void 0, $ = {};
    function Z(n2, t2) {
      for (void 0 === t2 && V("ptr should not be undefined"); n2.P; )
        t2 = n2.aa(t2), n2 = n2.P;
      return t2;
    }
    var J = {};
    function q(n2) {
      var t2 = B(n2 = nz(n2));
      return nZ(n2), t2;
    }
    function K(n2, t2) {
      var r2 = J[n2];
      return void 0 === r2 && V(t2 + " has unknown type " + q(n2)), r2;
    }
    function Q() {
    }
    var nn = false;
    function nt(n2) {
      --n2.count.value, 0 === n2.count.value && (n2.S ? n2.T.V(n2.S) : n2.O.M.V(n2.N));
    }
    var nr = {}, ne = void 0;
    function na(n2) {
      throw new ne(n2);
    }
    function ni(n2, t2) {
      return t2.O && t2.N || na("makeClassHandle requires ptr and ptrType"), !!t2.T != !!t2.S && na("Both smartPtrType and smartPtr must be specified"), t2.count = { value: 1 }, no(Object.create(n2, { L: { value: t2 } }));
    }
    function no(n2) {
      return "undefined" == typeof FinalizationRegistry ? (no = (n3) => n3, n2) : (nn = new FinalizationRegistry((n3) => {
        nt(n3.L);
      }), no = (n3) => {
        var t2 = n3.L;
        return t2.S && nn.register(n3, { L: t2 }, n3), n3;
      }, Q = (n3) => {
        nn.unregister(n3);
      }, no(n2));
    }
    var ns = {};
    function nu(n2) {
      for (; n2.length; ) {
        var t2 = n2.pop();
        n2.pop()(t2);
      }
    }
    function nc(n2) {
      return this.fromWireType(g[n2 >> 2]);
    }
    var nf = {}, nl = {};
    function nh(n2, t2, r2) {
      function e2(t3) {
        (t3 = r2(t3)).length !== n2.length && na("Mismatched type converter count");
        for (var e3 = 0; e3 < n2.length; ++e3)
          nv(n2[e3], t3[e3]);
      }
      n2.forEach(function(n3) {
        nl[n3] = t2;
      });
      var a2 = Array(t2.length), i2 = [], o2 = 0;
      t2.forEach((n3, t3) => {
        J.hasOwnProperty(n3) ? a2[t3] = J[n3] : (i2.push(n3), nf.hasOwnProperty(n3) || (nf[n3] = []), nf[n3].push(() => {
          a2[t3] = J[n3], ++o2 === i2.length && e2(a2);
        }));
      }), 0 === i2.length && e2(a2);
    }
    function np(n2) {
      switch (n2) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw TypeError("Unknown type size: " + n2);
      }
    }
    function nv(n2, t2, r2 = {}) {
      if (!("argPackAdvance" in t2))
        throw TypeError("registerType registeredInstance requires argPackAdvance");
      var e2 = t2.name;
      if (n2 || V('type "' + e2 + '" must have a positive integer typeid pointer'), J.hasOwnProperty(n2)) {
        if (r2.ta)
          return;
        V("Cannot register type '" + e2 + "' twice");
      }
      J[n2] = t2, delete nl[n2], nf.hasOwnProperty(n2) && (t2 = nf[n2], delete nf[n2], t2.forEach((n3) => n3()));
    }
    function nd(n2) {
      V(n2.L.O.M.name + " instance already deleted");
    }
    function ny() {
    }
    function nm(n2, t2, r2) {
      if (void 0 === n2[t2].R) {
        var e2 = n2[t2];
        n2[t2] = function() {
          return n2[t2].R.hasOwnProperty(arguments.length) || V("Function '" + r2 + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + n2[t2].R + ")!"), n2[t2].R[arguments.length].apply(this, arguments);
        }, n2[t2].R = [], n2[t2].R[e2.Y] = e2;
      }
    }
    function nE(n2, t2, r2, e2, a2, i2, o2, s2) {
      this.name = n2, this.constructor = t2, this.W = r2, this.V = e2, this.P = a2, this.oa = i2, this.aa = o2, this.ma = s2, this.ia = [];
    }
    function ng(n2, t2, r2) {
      for (; t2 !== r2; )
        t2.aa || V("Expected null or instance of " + r2.name + ", got an instance of " + t2.name), n2 = t2.aa(n2), t2 = t2.P;
      return n2;
    }
    function n_(n2, t2) {
      return null === t2 ? (this.da && V("null is not a valid " + this.name), 0) : (t2.L || V('Cannot pass "' + nC(t2) + '" as a ' + this.name), t2.L.N || V("Cannot pass deleted object as a pointer of type " + this.name), ng(t2.L.N, t2.L.O.M, this.M));
    }
    function nT(n2, t2) {
      if (null === t2) {
        if (this.da && V("null is not a valid " + this.name), this.ca) {
          var r2 = this.ea();
          return null !== n2 && n2.push(this.V, r2), r2;
        }
        return 0;
      }
      if (t2.L || V('Cannot pass "' + nC(t2) + '" as a ' + this.name), t2.L.N || V("Cannot pass deleted object as a pointer of type " + this.name), !this.ba && t2.L.O.ba && V("Cannot convert argument of type " + (t2.L.T ? t2.L.T.name : t2.L.O.name) + " to parameter type " + this.name), r2 = ng(t2.L.N, t2.L.O.M, this.M), this.ca)
        switch (void 0 === t2.L.S && V("Passing raw pointer to smart pointer is illegal"), this.Aa) {
          case 0:
            t2.L.T === this ? r2 = t2.L.S : V("Cannot convert argument of type " + (t2.L.T ? t2.L.T.name : t2.L.O.name) + " to parameter type " + this.name);
            break;
          case 1:
            r2 = t2.L.S;
            break;
          case 2:
            if (t2.L.T === this)
              r2 = t2.L.S;
            else {
              var e2 = t2.clone();
              r2 = this.wa(r2, G(function() {
                e2.delete();
              })), null !== n2 && n2.push(this.V, r2);
            }
            break;
          default:
            V("Unsupporting sharing policy");
        }
      return r2;
    }
    function nL(n2, t2) {
      return null === t2 ? (this.da && V("null is not a valid " + this.name), 0) : (t2.L || V('Cannot pass "' + nC(t2) + '" as a ' + this.name), t2.L.N || V("Cannot pass deleted object as a pointer of type " + this.name), t2.L.O.ba && V("Cannot convert argument of type " + t2.L.O.name + " to parameter type " + this.name), ng(t2.L.N, t2.L.O.M, this.M));
    }
    function nA(n2, t2, r2, e2) {
      this.name = n2, this.M = t2, this.da = r2, this.ba = e2, this.ca = false, this.V = this.wa = this.ea = this.ja = this.Aa = this.va = void 0, void 0 !== t2.P ? this.toWireType = nT : (this.toWireType = e2 ? n_ : nL, this.U = null);
    }
    var nO = [];
    function nP(n2) {
      var t2 = nO[n2];
      return t2 || (n2 >= nO.length && (nO.length = n2 + 1), nO[n2] = t2 = A.get(n2)), t2;
    }
    function nb(n2, t2) {
      var r2, e2, a2 = (n2 = B(n2)).includes("j") ? (r2 = n2, e2 = [], function() {
        if (e2.length = 0, Object.assign(e2, arguments), r2.includes("j")) {
          var n3 = u["dynCall_" + r2];
          n3 = e2 && e2.length ? n3.apply(null, [t2].concat(e2)) : n3.call(null, t2);
        } else
          n3 = nP(t2).apply(null, e2);
        return n3;
      }) : nP(t2);
      return "function" != typeof a2 && V("unknown function pointer with signature " + n2 + ": " + t2), a2;
    }
    var nN = void 0;
    function nI(n2, t2) {
      var r2 = [], e2 = {};
      throw t2.forEach(function n3(t3) {
        e2[t3] || J[t3] || (nl[t3] ? nl[t3].forEach(n3) : (r2.push(t3), e2[t3] = true));
      }), new nN(n2 + ": " + r2.map(q).join([", "]));
    }
    function nw(n2, t2, r2, e2, a2) {
      var i2 = t2.length;
      2 > i2 && V("argTypes array size mismatch! Must at least get return value and 'this' types!");
      var o2 = null !== t2[1] && null !== r2, s2 = false;
      for (r2 = 1; r2 < t2.length; ++r2)
        if (null !== t2[r2] && void 0 === t2[r2].U) {
          s2 = true;
          break;
        }
      var u2 = "void" !== t2[0].name, c2 = i2 - 2, f2 = Array(c2), l2 = [], h2 = [];
      return function() {
        if (arguments.length !== c2 && V("function " + n2 + " called with " + arguments.length + " arguments, expected " + c2 + " args!"), h2.length = 0, l2.length = o2 ? 2 : 1, l2[0] = a2, o2) {
          var r3 = t2[1].toWireType(h2, this);
          l2[1] = r3;
        }
        for (var i3 = 0; i3 < c2; ++i3)
          f2[i3] = t2[i3 + 2].toWireType(h2, arguments[i3]), l2.push(f2[i3]);
        if (i3 = e2.apply(null, l2), s2)
          nu(h2);
        else
          for (var p2 = o2 ? 1 : 2; p2 < t2.length; p2++) {
            var v2 = 1 === p2 ? r3 : f2[p2 - 2];
            null !== t2[p2].U && t2[p2].U(v2);
          }
        return u2 ? t2[0].fromWireType(i3) : void 0;
      };
    }
    function nS(n2, t2) {
      for (var r2 = [], e2 = 0; e2 < n2; e2++)
        r2.push(_[t2 + 4 * e2 >> 2]);
      return r2;
    }
    function nR(n2) {
      4 < n2 && 0 == --M[n2].fa && (M[n2] = void 0, F.push(n2));
    }
    function nC(n2) {
      if (null === n2)
        return "null";
      var t2 = typeof n2;
      return "object" === t2 || "array" === t2 || "function" === t2 ? n2.toString() : "" + n2;
    }
    function nW(n2, t2) {
      for (var r2 = "", e2 = 0; !(e2 >= t2 / 2); ++e2) {
        var a2 = m[n2 + 2 * e2 >> 1];
        if (0 == a2)
          break;
        r2 += String.fromCharCode(a2);
      }
      return r2;
    }
    function nU(n2, t2, r2) {
      if (void 0 === r2 && (r2 = 2147483647), 2 > r2)
        return 0;
      r2 -= 2;
      var e2 = t2;
      r2 = r2 < 2 * n2.length ? r2 / 2 : n2.length;
      for (var a2 = 0; a2 < r2; ++a2)
        m[t2 >> 1] = n2.charCodeAt(a2), t2 += 2;
      return m[t2 >> 1] = 0, t2 - e2;
    }
    function nM(n2) {
      return 2 * n2.length;
    }
    function nF(n2, t2) {
      for (var r2 = 0, e2 = ""; !(r2 >= t2 / 4); ) {
        var a2 = g[n2 + 4 * r2 >> 2];
        if (0 == a2)
          break;
        ++r2, 65536 <= a2 ? (a2 -= 65536, e2 += String.fromCharCode(55296 | a2 >> 10, 56320 | 1023 & a2)) : e2 += String.fromCharCode(a2);
      }
      return e2;
    }
    function nD(n2, t2, r2) {
      if (void 0 === r2 && (r2 = 2147483647), 4 > r2)
        return 0;
      var e2 = t2;
      r2 = e2 + r2 - 4;
      for (var a2 = 0; a2 < n2.length; ++a2) {
        var i2 = n2.charCodeAt(a2);
        if (55296 <= i2 && 57343 >= i2 && (i2 = 65536 + ((1023 & i2) << 10) | 1023 & n2.charCodeAt(++a2)), g[t2 >> 2] = i2, (t2 += 4) + 4 > r2)
          break;
      }
      return g[t2 >> 2] = 0, t2 - e2;
    }
    function nk(n2) {
      for (var t2 = 0, r2 = 0; r2 < n2.length; ++r2) {
        var e2 = n2.charCodeAt(r2);
        55296 <= e2 && 57343 >= e2 && ++r2, t2 += 4;
      }
      return t2;
    }
    var nV = {};
    function nj(n2) {
      var t2 = nV[n2];
      return void 0 === t2 ? B(n2) : t2;
    }
    var nG = [], nY = [], nX = [null, [], []];
    k = u.BindingError = D("BindingError"), u.count_emval_handles = function() {
      for (var n2 = 0, t2 = 5; t2 < M.length; ++t2)
        void 0 !== M[t2] && ++n2;
      return n2;
    }, u.get_first_emval = function() {
      for (var n2 = 5; n2 < M.length; ++n2)
        if (void 0 !== M[n2])
          return M[n2];
      return null;
    }, Y = u.PureVirtualError = D("PureVirtualError");
    for (var nB = Array(256), nH = 0; 256 > nH; ++nH)
      nB[nH] = String.fromCharCode(nH);
    X = nB, u.getInheritedInstanceCount = function() {
      return Object.keys($).length;
    }, u.getLiveInheritedInstances = function() {
      var n2, t2 = [];
      for (n2 in $)
        $.hasOwnProperty(n2) && t2.push($[n2]);
      return t2;
    }, u.flushPendingDeletes = x, u.setDelayFunction = function(n2) {
      z = n2, H.length && z && z(x);
    }, ne = u.InternalError = D("InternalError"), ny.prototype.isAliasOf = function(n2) {
      if (!(this instanceof ny && n2 instanceof ny))
        return false;
      var t2 = this.L.O.M, r2 = this.L.N, e2 = n2.L.O.M;
      for (n2 = n2.L.N; t2.P; )
        r2 = t2.aa(r2), t2 = t2.P;
      for (; e2.P; )
        n2 = e2.aa(n2), e2 = e2.P;
      return t2 === e2 && r2 === n2;
    }, ny.prototype.clone = function() {
      if (this.L.N || nd(this), this.L.$)
        return this.L.count.value += 1, this;
      var n2 = no, t2 = Object, r2 = t2.create, e2 = Object.getPrototypeOf(this), a2 = this.L;
      return n2 = n2(r2.call(t2, e2, { L: { value: { count: a2.count, Z: a2.Z, $: a2.$, N: a2.N, O: a2.O, S: a2.S, T: a2.T } } })), n2.L.count.value += 1, n2.L.Z = false, n2;
    }, ny.prototype.delete = function() {
      this.L.N || nd(this), this.L.Z && !this.L.$ && V("Object already scheduled for deletion"), Q(this), nt(this.L), this.L.$ || (this.L.S = void 0, this.L.N = void 0);
    }, ny.prototype.isDeleted = function() {
      return !this.L.N;
    }, ny.prototype.deleteLater = function() {
      return this.L.N || nd(this), this.L.Z && !this.L.$ && V("Object already scheduled for deletion"), H.push(this), 1 === H.length && z && z(x), this.L.Z = true, this;
    }, nA.prototype.pa = function(n2) {
      return this.ja && (n2 = this.ja(n2)), n2;
    }, nA.prototype.ga = function(n2) {
      this.V && this.V(n2);
    }, nA.prototype.argPackAdvance = 8, nA.prototype.readValueFromPointer = nc, nA.prototype.deleteObject = function(n2) {
      null !== n2 && n2.delete();
    }, nA.prototype.fromWireType = function(n2) {
      function t2() {
        return this.ca ? ni(this.M.W, { O: this.va, N: e2, T: this, S: n2 }) : ni(this.M.W, { O: this, N: n2 });
      }
      var r2, e2 = this.pa(n2);
      if (!e2)
        return this.ga(n2), null;
      var a2 = $[Z(this.M, e2)];
      if (void 0 !== a2)
        return 0 === a2.L.count.value ? (a2.L.N = e2, a2.L.S = n2, a2.clone()) : (a2 = a2.clone(), this.ga(n2), a2);
      if (!(a2 = nr[a2 = this.M.oa(e2)]))
        return t2.call(this);
      a2 = this.ba ? a2.ka : a2.pointerType;
      var i2 = function n3(t3, r3, e3) {
        return r3 === e3 ? t3 : void 0 === e3.P ? null : null === (t3 = n3(t3, r3, e3.P)) ? null : e3.ma(t3);
      }(e2, this.M, a2.M);
      return null === i2 ? t2.call(this) : this.ca ? ni(a2.M.W, { O: a2, N: i2, T: this, S: n2 }) : ni(a2.M.W, { O: a2, N: i2 });
    }, nN = u.UnboundTypeError = D("UnboundTypeError");
    var nx = { q: function(n2, t2, r2) {
      n2 = B(n2), t2 = K(t2, "wrapper"), r2 = j(r2);
      var e2 = [].slice, a2 = t2.M, i2 = a2.W, o2 = a2.P.W, s2 = a2.P.constructor;
      for (var u2 in n2 = U(n2, function() {
        a2.P.ia.forEach(function(n3) {
          if (this[n3] === o2[n3])
            throw new Y("Pure virtual function " + n3 + " must be implemented in JavaScript");
        }.bind(this)), Object.defineProperty(this, "__parent", { value: i2 }), this.__construct.apply(this, e2.call(arguments));
      }), i2.__construct = function() {
        this === i2 && V("Pass correct 'this' to __construct");
        var n3 = s2.implement.apply(void 0, [this].concat(e2.call(arguments)));
        Q(n3);
        var t3 = n3.L;
        n3.notifyOnDestruction(), t3.$ = true, Object.defineProperties(this, { L: { value: t3 } }), no(this), n3 = Z(a2, n3 = t3.N), $.hasOwnProperty(n3) ? V("Tried to register registered instance: " + n3) : $[n3] = this;
      }, i2.__destruct = function() {
        this === i2 && V("Pass correct 'this' to __destruct"), Q(this);
        var n3 = this.L.N;
        n3 = Z(a2, n3), $.hasOwnProperty(n3) ? delete $[n3] : V("Tried to unregister unregistered instance: " + n3);
      }, n2.prototype = Object.create(i2), r2)
        n2.prototype[u2] = r2[u2];
      return G(n2);
    }, l: function(n2) {
      var t2 = ns[n2];
      delete ns[n2];
      var r2 = t2.ea, e2 = t2.V, a2 = t2.ha;
      nh([n2], a2.map((n3) => n3.sa).concat(a2.map((n3) => n3.ya)), (n3) => {
        var i2 = {};
        return a2.forEach((t3, r3) => {
          var e3 = n3[r3], o2 = t3.qa, s2 = t3.ra, u2 = n3[r3 + a2.length], c2 = t3.xa, f2 = t3.za;
          i2[t3.na] = { read: (n4) => e3.fromWireType(o2(s2, n4)), write: (n4, t4) => {
            var r4 = [];
            c2(f2, n4, u2.toWireType(r4, t4)), nu(r4);
          } };
        }), [{ name: t2.name, fromWireType: function(n4) {
          var t3, r3 = {};
          for (t3 in i2)
            r3[t3] = i2[t3].read(n4);
          return e2(n4), r3;
        }, toWireType: function(n4, t3) {
          for (var a3 in i2)
            if (!(a3 in t3))
              throw TypeError('Missing field:  "' + a3 + '"');
          var o2 = r2();
          for (a3 in i2)
            i2[a3].write(o2, t3[a3]);
          return null !== n4 && n4.push(e2, o2), o2;
        }, argPackAdvance: 8, readValueFromPointer: nc, U: e2 }];
      });
    }, v: function() {
    }, B: function(n2, t2, r2, e2, a2) {
      var i2 = np(r2);
      nv(n2, { name: t2 = B(t2), fromWireType: function(n3) {
        return !!n3;
      }, toWireType: function(n3, t3) {
        return t3 ? e2 : a2;
      }, argPackAdvance: 8, readValueFromPointer: function(n3) {
        if (1 === r2)
          var e3 = d;
        else if (2 === r2)
          e3 = m;
        else if (4 === r2)
          e3 = g;
        else
          throw TypeError("Unknown boolean type size: " + t2);
        return this.fromWireType(e3[n3 >> i2]);
      }, U: null });
    }, h: function(n2, t2, r2, e2, a2, i2, o2, s2, c2, f2, l2, h2, p2) {
      l2 = B(l2), i2 = nb(a2, i2), s2 && (s2 = nb(o2, s2)), f2 && (f2 = nb(c2, f2)), p2 = nb(h2, p2);
      var v2, d2 = W(l2);
      v2 = function() {
        nI("Cannot construct " + l2 + " due to unbound types", [e2]);
      }, u.hasOwnProperty(d2) ? (V("Cannot register public name '" + d2 + "' twice"), nm(u, d2, d2), u.hasOwnProperty(void 0) && V("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"), u[d2].R[void 0] = v2) : u[d2] = v2, nh([n2, t2, r2], e2 ? [e2] : [], function(t3) {
        if (t3 = t3[0], e2)
          var r3, a3 = t3.M, o3 = a3.W;
        else
          o3 = ny.prototype;
        t3 = U(d2, function() {
          if (Object.getPrototypeOf(this) !== c3)
            throw new k("Use 'new' to construct " + l2);
          if (void 0 === h3.X)
            throw new k(l2 + " has no accessible constructor");
          var n3 = h3.X[arguments.length];
          if (void 0 === n3)
            throw new k("Tried to invoke ctor of " + l2 + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(h3.X).toString() + ") parameters instead!");
          return n3.apply(this, arguments);
        });
        var c3 = Object.create(o3, { constructor: { value: t3 } });
        t3.prototype = c3;
        var h3 = new nE(l2, t3, c3, p2, a3, i2, s2, f2);
        a3 = new nA(l2, h3, true, false), o3 = new nA(l2 + "*", h3, false, false);
        var v3 = new nA(l2 + " const*", h3, false, true);
        return nr[n2] = { pointerType: o3, ka: v3 }, r3 = t3, u.hasOwnProperty(d2) || na("Replacing nonexistant public symbol"), u[d2] = r3, u[d2].Y = void 0, [a3, o3, v3];
      });
    }, d: function(n2, t2, r2, e2, a2, i2, o2) {
      var s2 = nS(r2, e2);
      t2 = B(t2), i2 = nb(a2, i2), nh([], [n2], function(n3) {
        function e3() {
          nI("Cannot call " + a3 + " due to unbound types", s2);
        }
        var a3 = (n3 = n3[0]).name + "." + t2;
        t2.startsWith("@@") && (t2 = Symbol[t2.substring(2)]);
        var u2 = n3.M.constructor;
        return void 0 === u2[t2] ? (e3.Y = r2 - 1, u2[t2] = e3) : (nm(u2, t2, a3), u2[t2].R[r2 - 1] = e3), nh([], s2, function(n4) {
          return n4 = nw(a3, [n4[0], null].concat(n4.slice(1)), null, i2, o2), void 0 === u2[t2].R ? (n4.Y = r2 - 1, u2[t2] = n4) : u2[t2].R[r2 - 1] = n4, [];
        }), [];
      });
    }, p: function(n2, t2, r2, e2, a2, i2) {
      0 < t2 || w();
      var o2 = nS(t2, r2);
      a2 = nb(e2, a2), nh([], [n2], function(n3) {
        var r3 = "constructor " + (n3 = n3[0]).name;
        if (void 0 === n3.M.X && (n3.M.X = []), void 0 !== n3.M.X[t2 - 1])
          throw new k("Cannot register multiple constructors with identical number of parameters (" + (t2 - 1) + ") for class '" + n3.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
        return n3.M.X[t2 - 1] = () => {
          nI("Cannot construct " + n3.name + " due to unbound types", o2);
        }, nh([], o2, function(e3) {
          return e3.splice(1, 0, null), n3.M.X[t2 - 1] = nw(r3, e3, null, a2, i2), [];
        }), [];
      });
    }, a: function(n2, t2, r2, e2, a2, i2, o2, s2) {
      var u2 = nS(r2, e2);
      t2 = B(t2), i2 = nb(a2, i2), nh([], [n2], function(n3) {
        function e3() {
          nI("Cannot call " + a3 + " due to unbound types", u2);
        }
        var a3 = (n3 = n3[0]).name + "." + t2;
        t2.startsWith("@@") && (t2 = Symbol[t2.substring(2)]), s2 && n3.M.ia.push(t2);
        var c2 = n3.M.W, f2 = c2[t2];
        return void 0 === f2 || void 0 === f2.R && f2.className !== n3.name && f2.Y === r2 - 2 ? (e3.Y = r2 - 2, e3.className = n3.name, c2[t2] = e3) : (nm(c2, t2, a3), c2[t2].R[r2 - 2] = e3), nh([], u2, function(e4) {
          return e4 = nw(a3, e4, n3, i2, o2), void 0 === c2[t2].R ? (e4.Y = r2 - 2, c2[t2] = e4) : c2[t2].R[r2 - 2] = e4, [];
        }), [];
      });
    }, A: function(n2, t2) {
      nv(n2, { name: t2 = B(t2), fromWireType: function(n3) {
        var t3 = j(n3);
        return nR(n3), t3;
      }, toWireType: function(n3, t3) {
        return G(t3);
      }, argPackAdvance: 8, readValueFromPointer: nc, U: null });
    }, n: function(n2, t2, r2) {
      r2 = np(r2), nv(n2, { name: t2 = B(t2), fromWireType: function(n3) {
        return n3;
      }, toWireType: function(n3, t3) {
        return t3;
      }, argPackAdvance: 8, readValueFromPointer: function(n3, t3) {
        switch (t3) {
          case 2:
            return function(n4) {
              return this.fromWireType(T[n4 >> 2]);
            };
          case 3:
            return function(n4) {
              return this.fromWireType(L[n4 >> 3]);
            };
          default:
            throw TypeError("Unknown float type: " + n3);
        }
      }(t2, r2), U: null });
    }, e: function(n2, t2, r2, e2, a2) {
      t2 = B(t2), -1 === a2 && (a2 = 4294967295), a2 = np(r2);
      var i2 = (n3) => n3;
      if (0 === e2) {
        var o2 = 32 - 8 * r2;
        i2 = (n3) => n3 << o2 >>> o2;
      }
      r2 = t2.includes("unsigned") ? function(n3, t3) {
        return t3 >>> 0;
      } : function(n3, t3) {
        return t3;
      }, nv(n2, { name: t2, fromWireType: i2, toWireType: r2, argPackAdvance: 8, readValueFromPointer: function(n3, t3, r3) {
        switch (t3) {
          case 0:
            return r3 ? function(n4) {
              return d[n4];
            } : function(n4) {
              return y[n4];
            };
          case 1:
            return r3 ? function(n4) {
              return m[n4 >> 1];
            } : function(n4) {
              return E[n4 >> 1];
            };
          case 2:
            return r3 ? function(n4) {
              return g[n4 >> 2];
            } : function(n4) {
              return _[n4 >> 2];
            };
          default:
            throw TypeError("Unknown integer type: " + n3);
        }
      }(t2, a2, 0 !== e2), U: null });
    }, b: function(n2, t2, r2) {
      function e2(n3) {
        n3 >>= 2;
        var t3 = _;
        return new a2(t3.buffer, t3[n3 + 1], t3[n3]);
      }
      var a2 = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][t2];
      nv(n2, { name: r2 = B(r2), fromWireType: e2, argPackAdvance: 8, readValueFromPointer: e2 }, { ta: true });
    }, o: function(n2, t2) {
      var r2 = "std::string" === (t2 = B(t2));
      nv(n2, { name: t2, fromWireType: function(n3) {
        var t3 = _[n3 >> 2], e2 = n3 + 4;
        if (r2)
          for (var a2 = e2, i2 = 0; i2 <= t3; ++i2) {
            var o2 = e2 + i2;
            if (i2 == t3 || 0 == y[o2]) {
              if (a2 = a2 ? p(y, a2, o2 - a2) : "", void 0 === s2)
                var s2 = a2;
              else
                s2 += "\0" + a2;
              a2 = o2 + 1;
            }
          }
        else {
          for (i2 = 0, s2 = Array(t3); i2 < t3; ++i2)
            s2[i2] = String.fromCharCode(y[e2 + i2]);
          s2 = s2.join("");
        }
        return nZ(n3), s2;
      }, toWireType: function(n3, t3) {
        t3 instanceof ArrayBuffer && (t3 = new Uint8Array(t3));
        var e2, a2 = "string" == typeof t3;
        if (a2 || t3 instanceof Uint8Array || t3 instanceof Uint8ClampedArray || t3 instanceof Int8Array || V("Cannot pass non-string to std::string"), r2 && a2) {
          var i2 = 0;
          for (e2 = 0; e2 < t3.length; ++e2) {
            var o2 = t3.charCodeAt(e2);
            127 >= o2 ? i2++ : 2047 >= o2 ? i2 += 2 : 55296 <= o2 && 57343 >= o2 ? (i2 += 4, ++e2) : i2 += 3;
          }
          e2 = i2;
        } else
          e2 = t3.length;
        if (o2 = (i2 = n$(4 + e2 + 1)) + 4, _[i2 >> 2] = e2, r2 && a2) {
          if (a2 = o2, o2 = e2 + 1, e2 = y, 0 < o2) {
            o2 = a2 + o2 - 1;
            for (var s2 = 0; s2 < t3.length; ++s2) {
              var u2 = t3.charCodeAt(s2);
              if (55296 <= u2 && 57343 >= u2 && (u2 = 65536 + ((1023 & u2) << 10) | 1023 & t3.charCodeAt(++s2)), 127 >= u2) {
                if (a2 >= o2)
                  break;
                e2[a2++] = u2;
              } else {
                if (2047 >= u2) {
                  if (a2 + 1 >= o2)
                    break;
                  e2[a2++] = 192 | u2 >> 6;
                } else {
                  if (65535 >= u2) {
                    if (a2 + 2 >= o2)
                      break;
                    e2[a2++] = 224 | u2 >> 12;
                  } else {
                    if (a2 + 3 >= o2)
                      break;
                    e2[a2++] = 240 | u2 >> 18, e2[a2++] = 128 | u2 >> 12 & 63;
                  }
                  e2[a2++] = 128 | u2 >> 6 & 63;
                }
                e2[a2++] = 128 | 63 & u2;
              }
            }
            e2[a2] = 0;
          }
        } else if (a2)
          for (a2 = 0; a2 < e2; ++a2)
            255 < (s2 = t3.charCodeAt(a2)) && (nZ(o2), V("String has UTF-16 code units that do not fit in 8 bits")), y[o2 + a2] = s2;
        else
          for (a2 = 0; a2 < e2; ++a2)
            y[o2 + a2] = t3[a2];
        return null !== n3 && n3.push(nZ, i2), i2;
      }, argPackAdvance: 8, readValueFromPointer: nc, U: function(n3) {
        nZ(n3);
      } });
    }, k: function(n2, t2, r2) {
      if (r2 = B(r2), 2 === t2)
        var e2 = nW, a2 = nU, i2 = nM, o2 = () => E, s2 = 1;
      else
        4 === t2 && (e2 = nF, a2 = nD, i2 = nk, o2 = () => _, s2 = 2);
      nv(n2, { name: r2, fromWireType: function(n3) {
        for (var r3, a3 = _[n3 >> 2], i3 = o2(), u2 = n3 + 4, c2 = 0; c2 <= a3; ++c2) {
          var f2 = n3 + 4 + c2 * t2;
          (c2 == a3 || 0 == i3[f2 >> s2]) && (u2 = e2(u2, f2 - u2), void 0 === r3 ? r3 = u2 : r3 += "\0" + u2, u2 = f2 + t2);
        }
        return nZ(n3), r3;
      }, toWireType: function(n3, e3) {
        "string" != typeof e3 && V("Cannot pass non-string to C++ string type " + r2);
        var o3 = i2(e3), u2 = n$(4 + o3 + t2);
        return _[u2 >> 2] = o3 >> s2, a2(e3, u2 + 4, o3 + t2), null !== n3 && n3.push(nZ, u2), u2;
      }, argPackAdvance: 8, readValueFromPointer: nc, U: function(n3) {
        nZ(n3);
      } });
    }, m: function(n2, t2, r2, e2, a2, i2) {
      ns[n2] = { name: B(t2), ea: nb(r2, e2), V: nb(a2, i2), ha: [] };
    }, c: function(n2, t2, r2, e2, a2, i2, o2, s2, u2, c2) {
      ns[n2].ha.push({ na: B(t2), sa: r2, qa: nb(e2, a2), ra: i2, ya: o2, xa: nb(s2, u2), za: c2 });
    }, C: function(n2, t2) {
      nv(n2, { ua: true, name: t2 = B(t2), argPackAdvance: 0, fromWireType: function() {
      }, toWireType: function() {
      } });
    }, t: function(n2, t2, r2, e2, a2) {
      n2 = nG[n2], t2 = j(t2), r2 = nj(r2);
      var i2 = [];
      return _[e2 >> 2] = G(i2), n2(t2, r2, i2, a2);
    }, j: function(n2, t2, r2, e2) {
      n2 = nG[n2], n2(t2 = j(t2), r2 = nj(r2), null, e2);
    }, f: nR, g: function(n2, t2) {
      var r2, e2, a2 = function(n3, t3) {
        for (var r3 = Array(n3), e3 = 0; e3 < n3; ++e3)
          r3[e3] = K(_[t3 + 4 * e3 >> 2], "parameter " + e3);
        return r3;
      }(n2, t2), i2 = a2[0], o2 = nY[t2 = i2.name + "_$" + a2.slice(1).map(function(n3) {
        return n3.name;
      }).join("_") + "$"];
      if (void 0 !== o2)
        return o2;
      var s2 = Array(n2 - 1);
      return r2 = (t3, r3, e3, o3) => {
        for (var u2 = 0, c2 = 0; c2 < n2 - 1; ++c2)
          s2[c2] = a2[c2 + 1].readValueFromPointer(o3 + u2), u2 += a2[c2 + 1].argPackAdvance;
        for (c2 = 0, t3 = t3[r3].apply(t3, s2); c2 < n2 - 1; ++c2)
          a2[c2 + 1].la && a2[c2 + 1].la(s2[c2]);
        if (!i2.ua)
          return i2.toWireType(e3, t3);
      }, e2 = nG.length, nG.push(r2), o2 = e2, nY[t2] = o2;
    }, r: function(n2) {
      4 < n2 && (M[n2].fa += 1);
    }, s: function(n2) {
      nu(j(n2)), nR(n2);
    }, i: function() {
      w("");
    }, x: function(n2, t2, r2) {
      y.copyWithin(n2, t2, t2 + r2);
    }, w: function(n2) {
      var t2 = y.length;
      if (2147483648 < (n2 >>>= 0))
        return false;
      for (var r2 = 1; 4 >= r2; r2 *= 2) {
        var e2 = t2 * (1 + 0.2 / r2);
        e2 = Math.min(e2, n2 + 100663296);
        var a2 = Math, i2 = a2.min;
        e2 = Math.max(n2, e2), e2 += (65536 - e2 % 65536) % 65536;
        n: {
          var o2 = l.buffer;
          try {
            l.grow(i2.call(a2, 2147483648, e2) - o2.byteLength + 65535 >>> 16), v();
            var s2 = 1;
            break n;
          } catch (n3) {
          }
          s2 = void 0;
        }
        if (s2)
          return true;
      }
      return false;
    }, z: function() {
      return 52;
    }, u: function() {
      return 70;
    }, y: function(n2, t2, r2, e2) {
      for (var a2 = 0, i2 = 0; i2 < r2; i2++) {
        var u2 = _[t2 >> 2], c2 = _[t2 + 4 >> 2];
        t2 += 8;
        for (var f2 = 0; f2 < c2; f2++) {
          var l2 = y[u2 + f2], h2 = nX[n2];
          0 === l2 || 10 === l2 ? ((1 === n2 ? o : s)(p(h2, 0)), h2.length = 0) : h2.push(l2);
        }
        a2 += c2;
      }
      return _[e2 >> 2] = a2, 0;
    } };
    !function() {
      function n2(n3) {
        u.asm = n3.exports, l = u.asm.D, v(), A = u.asm.I, P.unshift(u.asm.E), 0 == --N && I && (n3 = I, I = null, n3());
      }
      function t2(t3) {
        n2(t3.instance);
      }
      function e2(n3) {
        return ("function" == typeof fetch ? fetch(r, { credentials: "same-origin" }).then(function(n4) {
          if (!n4.ok)
            throw "failed to load wasm binary file at '" + r + "'";
          return n4.arrayBuffer();
        }).catch(function() {
          return R();
        }) : Promise.resolve().then(function() {
          return R();
        })).then(function(n4) {
          return WebAssembly.instantiate(n4, a2);
        }).then(function(n4) {
          return n4;
        }).then(n3, function(n4) {
          s("failed to asynchronously prepare wasm: " + n4), w(n4);
        });
      }
      var a2 = { a: nx };
      if (N++, u.instantiateWasm)
        try {
          return u.instantiateWasm(a2, n2);
        } catch (n3) {
          s("Module.instantiateWasm callback failed with error: " + n3), f(n3);
        }
      ("function" != typeof WebAssembly.instantiateStreaming || S() || "function" != typeof fetch ? e2(t2) : fetch(r, { credentials: "same-origin" }).then(function(n3) {
        return WebAssembly.instantiateStreaming(n3, a2).then(t2, function(n4) {
          return s("wasm streaming compile failed: " + n4), s("falling back to ArrayBuffer instantiation"), e2(t2);
        });
      })).catch(f);
    }();
    var nz = u.___getTypeName = function() {
      return (nz = u.___getTypeName = u.asm.F).apply(null, arguments);
    };
    function n$() {
      return (n$ = u.asm.H).apply(null, arguments);
    }
    function nZ() {
      return (nZ = u.asm.J).apply(null, arguments);
    }
    function nJ() {
      0 < N || (C(O), 0 < N || e || (e = true, u.calledRun = true, h || (C(P), c(u), C(b))));
    }
    return u.__embind_initialize_bindings = function() {
      return (u.__embind_initialize_bindings = u.asm.G).apply(null, arguments);
    }, u.dynCall_jiji = function() {
      return (u.dynCall_jiji = u.asm.K).apply(null, arguments);
    }, I = function n2() {
      e || nJ(), e || (I = n2);
    }, nJ(), t.ready;
  };
})();
async function initYoga(t) {
  let r = await yoga({ instantiateWasm(n, r2) {
    WebAssembly.instantiate(t, n).then((n2) => {
      n2 instanceof WebAssembly.Instance ? r2(n2) : r2(n2.instance);
    });
  } });
  return wrapAsm(r);
}
async function initStreaming(t) {
  let r = await yoga({ instantiateWasm(n, r2) {
    WebAssembly.instantiateStreaming(t, n).then(({ instance: n2 }) => {
      r2(n2);
    });
  } });
  return wrapAsm(r);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ALIGN_AUTO,
  ALIGN_BASELINE,
  ALIGN_CENTER,
  ALIGN_FLEX_END,
  ALIGN_FLEX_START,
  ALIGN_SPACE_AROUND,
  ALIGN_SPACE_BETWEEN,
  ALIGN_STRETCH,
  DIMENSION_HEIGHT,
  DIMENSION_WIDTH,
  DIRECTION_INHERIT,
  DIRECTION_LTR,
  DIRECTION_RTL,
  DISPLAY_FLEX,
  DISPLAY_NONE,
  EDGE_ALL,
  EDGE_BOTTOM,
  EDGE_END,
  EDGE_HORIZONTAL,
  EDGE_LEFT,
  EDGE_RIGHT,
  EDGE_START,
  EDGE_TOP,
  EDGE_VERTICAL,
  EXPERIMENTAL_FEATURE_ABSOLUTE_PERCENTAGE_AGAINST_PADDING_EDGE,
  EXPERIMENTAL_FEATURE_FIX_ABSOLUTE_TRAILING_COLUMN_MARGIN,
  EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS,
  FLEX_DIRECTION_COLUMN,
  FLEX_DIRECTION_COLUMN_REVERSE,
  FLEX_DIRECTION_ROW,
  FLEX_DIRECTION_ROW_REVERSE,
  GUTTER_ALL,
  GUTTER_COLUMN,
  GUTTER_ROW,
  JUSTIFY_CENTER,
  JUSTIFY_FLEX_END,
  JUSTIFY_FLEX_START,
  JUSTIFY_SPACE_AROUND,
  JUSTIFY_SPACE_BETWEEN,
  JUSTIFY_SPACE_EVENLY,
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_ERROR,
  LOG_LEVEL_FATAL,
  LOG_LEVEL_INFO,
  LOG_LEVEL_VERBOSE,
  LOG_LEVEL_WARN,
  MEASURE_MODE_AT_MOST,
  MEASURE_MODE_EXACTLY,
  MEASURE_MODE_UNDEFINED,
  NODE_TYPE_DEFAULT,
  NODE_TYPE_TEXT,
  OVERFLOW_HIDDEN,
  OVERFLOW_SCROLL,
  OVERFLOW_VISIBLE,
  POSITION_TYPE_ABSOLUTE,
  POSITION_TYPE_RELATIVE,
  POSITION_TYPE_STATIC,
  PRINT_OPTIONS_CHILDREN,
  PRINT_OPTIONS_LAYOUT,
  PRINT_OPTIONS_STYLE,
  UNIT_AUTO,
  UNIT_PERCENT,
  UNIT_POINT,
  UNIT_UNDEFINED,
  WRAP_NO_WRAP,
  WRAP_WRAP,
  WRAP_WRAP_REVERSE,
  initStreaming
});
