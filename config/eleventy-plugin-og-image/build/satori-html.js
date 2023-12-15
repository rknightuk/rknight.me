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

// ../satori-html/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  html: () => html
});
module.exports = __toCommonJS(dist_exports);

// ../ultrahtml/dist/index.js
var R = 0;
var k = 1;
var j = 2;
var b = Symbol("Fragment");
var D = /* @__PURE__ */ new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]);
var x = /* @__PURE__ */ new Set(["script", "style"]);
var _ = /([\@\.a-z0-9_\:\-]*)\s*?=?\s*?(['"]?)([\s\S]*?)\2\s+/gim;
var o = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:-]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!)([\s\S]*?)(>))/gm;
function P(e) {
  let t = {}, a;
  if (e)
    for (_.lastIndex = 0, e = " " + (e || "") + " "; a = _.exec(e); )
      a[0] !== " " && (t[a[1]] = a[3]);
  return t;
}
function w(e) {
  let t = typeof e == "string" ? e : e.value, a, r, n, i, l, d2, g2, h, s, c = [];
  o.lastIndex = 0, r = a = { type: 0, children: [] };
  let E3 = 0;
  function m() {
    i = t.substring(E3, o.lastIndex - n[0].length), i && r.children.push({ type: 2, value: i, parent: r });
  }
  for (; n = o.exec(t); ) {
    if (d2 = n[5] || n[8], g2 = n[6] || n[9], h = n[7] || n[10], x.has(r.name) && n[2] !== r.name) {
      l = o.lastIndex - n[0].length, r.children.length > 0 && (r.children[0].value += n[0]);
      continue;
    } else if (d2 === "<!--") {
      if (l = o.lastIndex - n[0].length, x.has(r.name))
        continue;
      s = { type: 3, value: g2, parent: r, loc: [{ start: l, end: l + d2.length }, { start: o.lastIndex - h.length, end: o.lastIndex }] }, c.push(s), s.parent.children.push(s);
    } else if (d2 === "<!")
      l = o.lastIndex - n[0].length, s = { type: 4, value: g2, parent: r, loc: [{ start: l, end: l + d2.length }, { start: o.lastIndex - h.length, end: o.lastIndex }] }, c.push(s), s.parent.children.push(s);
    else if (n[1] !== "/")
      if (m(), x.has(r.name)) {
        E3 = o.lastIndex, m();
        continue;
      } else
        s = { type: 1, name: n[2] + "", attributes: P(n[3]), parent: r, children: [], loc: [{ start: o.lastIndex - n[0].length, end: o.lastIndex }] }, c.push(s), s.parent.children.push(s), n[4] && n[4].indexOf("/") > -1 || D.has(s.name) ? (s.loc[1] = s.loc[0], s.isSelfClosingTag = true) : r = s;
    else
      m(), n[2] + "" === r.name ? (s = r, r = s.parent, s.loc.push({ start: o.lastIndex - n[0].length, end: o.lastIndex }), i = t.substring(s.loc[0].end, s.loc[1].start), s.children.length === 0 && s.children.push({ type: 2, value: i, parent: r })) : n[2] + "" === c[c.length - 1].name && c[c.length - 1].isSelfClosingTag === true && (s = c[c.length - 1], s.loc.push({ start: o.lastIndex - n[0].length, end: o.lastIndex }));
    E3 = o.lastIndex;
  }
  return i = t.slice(E3), r.children.push({ type: 2, value: i, parent: r }), a;
}
var O = class {
  constructor(t) {
    this.callback = t;
  }
  visit(t, a, r) {
    if (this.callback(t, a, r), Array.isArray(t.children))
      for (let n = 0; n < t.children.length; n++) {
        let i = t.children[n];
        this.visit(i, t, n);
      }
  }
};
var N = Symbol("HTMLString");
var S = Symbol("AttrString");
var u = Symbol("RenderFn");
function p(e, t = [N]) {
  let a = { value: e };
  for (let r of t)
    Object.defineProperty(a, r, { value: true, enumerable: false, writable: false });
  return a;
}
var I = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };
function y(e) {
  return e.replace(/[&<>]/g, (t) => I[t] || t);
}
function f(e) {
  let t = "";
  for (let [a, r] of Object.entries(e))
    t += ` ${a}="${r}"`;
  return p(t, [N, S]);
}
function F(e, ...t) {
  let a = "";
  for (let r = 0; r < e.length; r++) {
    a += e[r];
    let n = t[r];
    a.endsWith("...") && n && typeof n == "object" ? (a = a.slice(0, -3).trimEnd(), a += f(n).value) : n && n[S] ? (a = a.trimEnd(), a += n.value) : n && n[N] ? a += n.value : typeof n == "string" ? a += y(n) : (n || n === 0) && (a += String(n));
  }
  return p(a);
}
function z(e, t) {
  return new O(t).visit(e);
}

// ../ultrahtml/dist/selector.js
var w2 = { attribute: /\[\s*(?:(?<namespace>\*|[-\w\P{ASCII}]*)\|)?(?<name>[-\w\P{ASCII}]+)\s*(?:(?<operator>\W?=)\s*(?<value>.+?)\s*(\s(?<caseSensitive>[iIsS]))?\s*)?\]/gu, id: /#(?<name>[-\w\P{ASCII}]+)/gu, class: /\.(?<name>[-\w\P{ASCII}]+)/gu, comma: /\s*,\s*/g, combinator: /\s*[\s>+~]\s*/g, "pseudo-element": /::(?<name>[-\w\P{ASCII}]+)(?:\((?<argument>¶*)\))?/gu, "pseudo-class": /:(?<name>[-\w\P{ASCII}]+)(?:\((?<argument>¶*)\))?/gu, universal: /(?:(?<namespace>\*|[-\w\P{ASCII}]*)\|)?\*/gu, type: /(?:(?<namespace>\*|[-\w\P{ASCII}]*)\|)?(?<name>[-\w\P{ASCII}]+)/gu };
var v = /* @__PURE__ */ new Set(["combinator", "comma"]);
var A = /* @__PURE__ */ new Set(["not", "is", "where", "has", "matches", "-moz-any", "-webkit-any", "nth-child", "nth-last-child"]);
var E = /(?<index>[\dn+-]+)\s+of\s+(?<subtree>.+)/;
var k2 = { "nth-child": E, "nth-last-child": E };
var T = (t) => {
  switch (t) {
    case "pseudo-element":
    case "pseudo-class":
      return new RegExp(w2[t].source.replace("(?<argument>\xB6*)", "(?<argument>.*)"), "gu");
    default:
      return w2[t];
  }
};
function M(t, n) {
  let e = 0, r = "";
  for (; n < t.length; n++) {
    let s = t[n];
    switch (s) {
      case "(":
        ++e;
        break;
      case ")":
        --e;
    }
    if (r += s, e === 0)
      return r;
  }
  return r;
}
function O2(t, n = w2) {
  if (!t)
    return [];
  let e = [t];
  for (let [s, o2] of Object.entries(n))
    for (let i = 0; i < e.length; i++) {
      let c = e[i];
      if (typeof c != "string")
        continue;
      o2.lastIndex = 0;
      let a = o2.exec(c);
      if (!a)
        continue;
      let u2 = a.index - 1, l = [], h = a[0], m = c.slice(0, u2 + 1);
      m && l.push(m), l.push({ ...a.groups, type: s, content: h });
      let y2 = c.slice(u2 + h.length + 1);
      y2 && l.push(y2), e.splice(i, 1, ...l);
    }
  let r = 0;
  for (let s of e)
    switch (typeof s) {
      case "string":
        throw new Error(`Unexpected sequence ${s} found at index ${r}`);
      case "object":
        r += s.content.length, s.pos = [r - s.content.length, r], v.has(s.type) && (s.content = s.content.trim() || " ");
    }
  return e;
}
var $ = /(['"])([^\\\n]+?)\1/g;
var P2 = /\\./g;
function U(t, n = w2) {
  if ((t = t.trim()) === "")
    return [];
  let e = [];
  t = (t = t.replace(P2, (o2, i) => (e.push({ value: o2, offset: i }), "\uE000".repeat(o2.length)))).replace($, (o2, i, c, a) => (e.push({ value: o2, offset: a }), `${i}${"\uE001".repeat(c.length)}${i}`));
  {
    let o2, i = 0;
    for (; (o2 = t.indexOf("(", i)) > -1; ) {
      let c = M(t, o2);
      e.push({ value: c, offset: o2 }), t = `${t.substring(0, o2)}(${"\xB6".repeat(c.length - 2)})${t.substring(o2 + c.length)}`, i = o2 + c.length;
    }
  }
  let r = O2(t, n), s = /* @__PURE__ */ new Set();
  for (let o2 of e.reverse())
    for (let i of r) {
      let { offset: c, value: a } = o2;
      if (!(i.pos[0] <= c && c + a.length <= i.pos[1]))
        continue;
      let { content: u2 } = i, l = c - i.pos[0];
      i.content = u2.slice(0, l) + a + u2.slice(l + a.length), i.content !== u2 && s.add(i);
    }
  for (let o2 of s) {
    let i = T(o2.type);
    if (!i)
      throw new Error(`Unknown token type: ${o2.type}`);
    i.lastIndex = 0;
    let c = i.exec(o2.content);
    if (!c)
      throw new Error(`Unable to parse content for ${o2.type}: ${o2.content}`);
    Object.assign(o2, c.groups);
  }
  return r;
}
function g(t, { list: n = true } = {}) {
  if (n && t.find((e) => e.type === "comma")) {
    let e = [], r = [];
    for (let s = 0; s < t.length; s++)
      if (t[s].type === "comma") {
        if (r.length === 0)
          throw new Error("Incorrect comma at " + s);
        e.push(g(r, { list: false })), r.length = 0;
      } else
        r.push(t[s]);
    if (r.length === 0)
      throw new Error("Trailing comma");
    return e.push(g(r, { list: false })), { type: "list", list: e };
  }
  for (let e = t.length - 1; e >= 0; e--) {
    let r = t[e];
    if (r.type === "combinator") {
      let s = t.slice(0, e), o2 = t.slice(e + 1);
      return { type: "complex", combinator: r.content, left: g(s), right: g(o2) };
    }
  }
  switch (t.length) {
    case 0:
      throw new Error("Could not build AST.");
    case 1:
      return t[0];
    default:
      return { type: "compound", list: [...t] };
  }
}
function* p2(t, n) {
  switch (t.type) {
    case "list":
      for (let e of t.list)
        yield* p2(e, t);
      break;
    case "complex":
      yield* p2(t.left, t), yield* p2(t.right, t);
      break;
    case "compound":
      yield* t.list.map((e) => [e, t]);
      break;
    default:
      yield [t, n];
  }
}
function b2(t, { recursive: n = true, list: e = true } = {}) {
  let r = U(t);
  if (!r)
    return;
  let s = g(r, { list: e });
  if (!n)
    return s;
  for (let [o2] of p2(s)) {
    if (o2.type !== "pseudo-class" || !o2.argument || !A.has(o2.name))
      continue;
    let i = o2.argument, c = k2[o2.name];
    if (c) {
      let a = c.exec(i);
      if (!a)
        continue;
      Object.assign(o2, a.groups), i = a.groups.subtree;
    }
    i && Object.assign(o2, { subtree: b2(i, { recursive: true, list: true }) });
  }
  return s;
}
function x2(t, n) {
  return n = n || Math.max(...t) + 1, t[0] * (n << 1) + t[1] * n + t[2];
}
function N2(t) {
  let n = t;
  if (typeof n == "string" && (n = b2(n, { recursive: true })), !n)
    return [];
  if (n.type === "list" && "list" in n) {
    let r = 10, s = n.list.map((i) => {
      let c = N2(i);
      return r = Math.max(r, ...N2(i)), c;
    }), o2 = s.map((i) => x2(i, r));
    return s[o2.indexOf(Math.max(...o2))];
  }
  let e = [0, 0, 0];
  for (let [r] of p2(n))
    switch (r.type) {
      case "id":
        e[0]++;
        break;
      case "class":
      case "attribute":
        e[1]++;
        break;
      case "pseudo-element":
      case "type":
        e[2]++;
        break;
      case "pseudo-class":
        if (r.name === "where")
          break;
        if (!A.has(r.name) || !r.subtree) {
          e[1]++;
          break;
        }
        N2(r.subtree).forEach((s, o2) => e[o2] += s), r.name !== "nth-child" && r.name !== "nth-last-child" || e[1]++;
    }
  return e;
}
function G(t) {
  return x2(N2(t), 10);
}
function R2(t, n) {
  let e = d(n);
  return C(t, (r, s, o2) => {
    let i = e(r, s, o2);
    return i || false;
  });
}
function C(t, n, e = { single: false }) {
  let r = [];
  return z(t, (s, o2, i) => {
    if (!(s && s.type !== k) && n(s, o2, i)) {
      if (e.single)
        throw s;
      r.push(s);
    }
  }), r;
}
var L = (t) => {
  let { operator: n = "=" } = t;
  switch (n) {
    case "=":
      return (e, r) => e === r;
    case "~=":
      return (e, r) => e.split(/\s+/g).includes(r);
    case "|=":
      return (e, r) => e.startsWith(r + "-");
    case "*=":
      return (e, r) => e.indexOf(r) > -1;
    case "$=":
      return (e, r) => e.endsWith(r);
    case "^=":
      return (e, r) => e.startsWith(r);
  }
  return (e, r) => false;
};
var I2 = (t, n) => n == null ? void 0 : n.children.filter((e) => e.type === k).findIndex((e) => e === t);
var W = (t) => {
  let [n, e = "1", r = "0"] = /^\s*(?:(-?(?:\d+)?)n)?\s*\+?\s*(\d+)?\s*$/gm.exec(t) ?? [];
  e.length === 0 && (e = "1");
  let s = Number.parseInt(e === "-" ? "-1" : e), o2 = Number.parseInt(r);
  return (i) => s * i + o2;
};
var D2 = (t, n) => (n == null ? void 0 : n.children.filter((e) => e.type === k).pop()) === t;
var q = (t, n) => (n == null ? void 0 : n.children.filter((e) => e.type === k).shift()) === t;
var z2 = (t, n) => (n == null ? void 0 : n.children.filter((e) => e.type === k).length) === 1;
var S2 = (t) => {
  switch (t.type) {
    case "type":
      return (n) => t.content === "*" ? true : n.name === t.name;
    case "class":
      return (n) => {
        var e, r;
        return (r = (e = n.attributes) == null ? void 0 : e.class) == null ? void 0 : r.split(/\s+/g).includes(t.name);
      };
    case "id":
      return (n) => {
        var e;
        return ((e = n.attributes) == null ? void 0 : e.id) === t.name;
      };
    case "pseudo-class":
      switch (t.name) {
        case "global":
          return (...n) => d(b2(t.argument))(...n);
        case "not":
          return (...n) => !S2(t.subtree)(...n);
        case "is":
          return (...n) => d(t.subtree)(...n);
        case "where":
          return (...n) => d(t.subtree)(...n);
        case "root":
          return (n, e) => n.type === k && n.name === "html";
        case "empty":
          return (n) => n.type === k && (n.children.length === 0 || n.children.every((e) => e.type === j && e.value.trim() === ""));
        case "first-child":
          return (n, e) => q(n, e);
        case "last-child":
          return (n, e) => D2(n, e);
        case "only-child":
          return (n, e) => z2(n, e);
        case "nth-child":
          return (n, e) => {
            let r = I2(n, e) + 1;
            if (Number.isNaN(Number(t.argument)))
              switch (t.argument) {
                case "odd":
                  return Math.abs(r % 2) == 1;
                case "even":
                  return r % 2 === 0;
                default: {
                  if (!t.argument)
                    throw new Error("Unsupported empty nth-child selector!");
                  let s = W(t.argument), o2 = e == null ? void 0 : e.children.filter((c) => c.type === k), i = I2(n, e) + 1;
                  for (let c = 0; c < o2.length; c++) {
                    let a = s(c);
                    if (a > o2.length)
                      return false;
                    if (a === i)
                      return true;
                  }
                  return false;
                }
              }
            return r === Number(t.argument);
          };
        default:
          throw new Error(`Unhandled pseudo-class: ${t.name}!`);
      }
    case "attribute":
      return (n) => {
        let { caseSensitive: e, name: r, value: s } = t;
        if (!n.attributes)
          return false;
        let o2 = Object.entries(n.attributes);
        for (let [i, c] of o2)
          if (e === "i" && (s = r.toLowerCase(), c = i.toLowerCase()), i === r) {
            if (!s)
              return true;
            if ((s[0] === '"' || s[0] === "'") && s[0] === s[s.length - 1] && (s = JSON.parse(s)), s)
              return L(t)(c, s);
          }
        return false;
      };
    case "universal":
      return (n) => true;
    default:
      throw new Error(`Unhandled selector: ${t.type}`);
  }
};
var d = (t) => {
  let n = typeof t == "string" ? b2(t) : t;
  switch (n == null ? void 0 : n.type) {
    case "list": {
      let e = n.list.map((r) => S2(r));
      return (r, s, o2) => {
        for (let i of e)
          if (i(r, s))
            return true;
        return false;
      };
    }
    case "compound": {
      let e = n.list.map((r) => S2(r));
      return (r, s, o2) => {
        for (let i of e)
          if (!i(r, s))
            return false;
        return true;
      };
    }
    case "complex": {
      let { left: e, right: r, combinator: s } = n, o2 = d(e), i = d(r), c = /* @__PURE__ */ new WeakSet();
      return (a, u2, l = 0) => {
        if ((o2(a) || u2 && c.has(u2) && s === " ") && c.add(a), !i(a))
          return false;
        switch (s) {
          case " ":
          case ">":
            return u2 ? c.has(u2) : false;
          case "~": {
            if (!u2)
              return false;
            for (let h of u2.children.slice(0, l))
              if (c.has(h))
                return true;
            return false;
          }
          case "+": {
            if (!u2)
              return false;
            let h = u2.children.slice(0, l).filter((y2) => y2.type === k);
            if (h.length === 0)
              return false;
            let m = h[h.length - 1];
            if (!m)
              return false;
            if (c.has(m))
              return true;
          }
          default:
            return false;
        }
      };
    }
    default:
      return S2(n);
  }
};

// ../ultrahtml/dist/transformers/inline.js
var Te = "comm";
var Pe = "rule";
var Ie = "decl";
var Ne = Math.abs;
var q2 = String.fromCharCode;
function $2(e) {
  return e.trim();
}
function Z(e, r, t) {
  return e.replace(r, t);
}
function we(e, r) {
  return e.indexOf(r);
}
function V(e, r) {
  return e.charCodeAt(r) | 0;
}
function M2(e, r, t) {
  return e.slice(r, t);
}
function C2(e) {
  return e.length;
}
function ke(e) {
  return e.length;
}
function F2(e, r) {
  return r.push(e), e;
}
var J = 1;
var D3 = 1;
var Oe = 0;
var w3 = 0;
var E2 = 0;
var B = "";
function ee(e, r, t, o2, n, i, a) {
  return { value: e, root: r, parent: t, type: o2, props: n, children: i, line: J, column: D3, length: a, return: "" };
}
function Re() {
  return E2;
}
function Ce() {
  return E2 = w3 > 0 ? V(B, --w3) : 0, D3--, E2 === 10 && (D3 = 1, J--), E2;
}
function k3() {
  return E2 = w3 < Oe ? V(B, w3++) : 0, D3++, E2 === 10 && (D3 = 1, J++), E2;
}
function A2() {
  return V(B, w3);
}
function U2() {
  return w3;
}
function te(e, r) {
  return M2(B, e, r);
}
function pe(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Ae(e) {
  return J = D3 = 1, Oe = C2(B = e), w3 = 0, [];
}
function Se(e) {
  return B = "", e;
}
function re(e) {
  return $2(te(w3 - 1, ce(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function _e(e) {
  for (; (E2 = A2()) && E2 < 33; )
    k3();
  return pe(e) > 2 || pe(E2) > 3 ? "" : " ";
}
function Me(e, r) {
  for (; --r && k3() && !(E2 < 48 || E2 > 102 || E2 > 57 && E2 < 65 || E2 > 70 && E2 < 97); )
    ;
  return te(e, U2() + (r < 6 && A2() == 32 && k3() == 32));
}
function ce(e) {
  for (; k3(); )
    switch (E2) {
      case e:
        return w3;
      case 34:
      case 39:
        e !== 34 && e !== 39 && ce(E2);
        break;
      case 40:
        e === 41 && ce(e);
        break;
      case 92:
        k3();
        break;
    }
  return w3;
}
function Le(e, r) {
  for (; k3() && e + E2 !== 47 + 10; )
    if (e + E2 === 42 + 42 && A2() === 47)
      break;
  return "/*" + te(r, w3 - 1) + "*" + q2(e === 47 ? e : k3());
}
function Ve(e) {
  for (; !pe(A2()); )
    k3();
  return te(e, w3);
}
function de(e) {
  return Se(ne("", null, null, null, [""], e = Ae(e), 0, [0], e));
}
function ne(e, r, t, o2, n, i, a, s, l) {
  for (var p3 = 0, u2 = 0, c = a, d2 = 0, f2 = 0, m = 0, v2 = 1, T2 = 1, x3 = 1, y2 = 0, P3 = "", N3 = n, b3 = i, g2 = o2, h = P3; T2; )
    switch (m = y2, y2 = k3()) {
      case 40:
        if (m != 108 && V(h, c - 1) == 58) {
          we(h += Z(re(y2), "&", "&\f"), "&\f") != -1 && (x3 = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        h += re(y2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        h += _e(m);
        break;
      case 92:
        h += Me(U2() - 1, 7);
        continue;
      case 47:
        switch (A2()) {
          case 42:
          case 47:
            F2(vt(Le(k3(), U2()), r, t), l);
            break;
          default:
            h += "/";
        }
        break;
      case 123 * v2:
        s[p3++] = C2(h) * x3;
      case 125 * v2:
      case 59:
      case 0:
        switch (y2) {
          case 0:
          case 125:
            T2 = 0;
          case 59 + u2:
            f2 > 0 && C2(h) - c && F2(f2 > 32 ? De(h + ";", o2, t, c - 1) : De(Z(h, " ", "") + ";", o2, t, c - 2), l);
            break;
          case 59:
            h += ";";
          default:
            if (F2(g2 = Fe(h, r, t, p3, u2, n, s, P3, N3 = [], b3 = [], c), i), y2 === 123)
              if (u2 === 0)
                ne(h, r, g2, g2, N3, i, c, s, b3);
              else
                switch (d2) {
                  case 100:
                  case 109:
                  case 115:
                    ne(e, g2, g2, o2 && F2(Fe(e, g2, g2, 0, 0, n, s, P3, n, N3 = [], c), b3), n, b3, c, s, o2 ? N3 : b3);
                    break;
                  default:
                    ne(h, g2, g2, g2, [""], b3, 0, s, b3);
                }
        }
        p3 = u2 = f2 = 0, v2 = x3 = 1, P3 = h = "", c = a;
        break;
      case 58:
        c = 1 + C2(h), f2 = m;
      default:
        if (v2 < 1) {
          if (y2 == 123)
            --v2;
          else if (y2 == 125 && v2++ == 0 && Ce() == 125)
            continue;
        }
        switch (h += q2(y2), y2 * v2) {
          case 38:
            x3 = u2 > 0 ? 1 : (h += "\f", -1);
            break;
          case 44:
            s[p3++] = (C2(h) - 1) * x3, x3 = 1;
            break;
          case 64:
            A2() === 45 && (h += re(k3())), d2 = A2(), u2 = c = C2(P3 = h += Ve(U2())), y2++;
            break;
          case 45:
            m === 45 && C2(h) == 2 && (v2 = 0);
        }
    }
  return i;
}
function Fe(e, r, t, o2, n, i, a, s, l, p3, u2) {
  for (var c = n - 1, d2 = n === 0 ? i : [""], f2 = ke(d2), m = 0, v2 = 0, T2 = 0; m < o2; ++m)
    for (var x3 = 0, y2 = M2(e, c + 1, c = Ne(v2 = a[m])), P3 = e; x3 < f2; ++x3)
      (P3 = $2(v2 > 0 ? d2[x3] + " " + y2 : Z(y2, /&\f/g, d2[x3]))) && (l[T2++] = P3);
  return ee(e, r, t, n === 0 ? Pe : s, l, p3, u2);
}
function vt(e, r, t) {
  return ee(e, r, t, Te, q2(Re()), M2(e, 2, -2), 0);
}
function De(e, r, t, o2) {
  return ee(e, r, t, Ie, M2(e, 0, o2), M2(e, o2 + 1, -1), o2);
}
var R3 = (e) => typeof e == "object" && e !== null && "errid" in e;
var yt = (e) => {
  let r = [[]], t = [];
  for (let o2 of e)
    if (o2.type === "comma" && t.length === 0)
      r.push([]);
    else {
      switch (o2.type) {
        case "function":
        case "(":
          t.push(")");
          break;
        case "[":
          t.push("]");
          break;
        case "{":
          t.push("}");
          break;
        case ")":
        case "]":
        case "}":
          t.at(-1) === o2.type && t.pop();
          break;
      }
      r[r.length - 1].push(o2);
    }
  return r;
};
var Be = (e) => {
  let r = yt(e);
  if (r.length === 1 && r[0].length === 0)
    return { type: "query-list", mediaQueries: [{ type: "query" }] };
  {
    let t = [];
    for (let o2 of r) {
      let n = Ge(o2);
      R3(n) ? t.push({ type: "query", prefix: "not" }) : t.push(n);
    }
    return { type: "query-list", mediaQueries: t };
  }
};
var Ge = (e) => {
  var r, t, o2;
  let n = e.at(0);
  if (n) {
    if (n.type === "(") {
      let i = S3(e, true);
      if (R3(i)) {
        let { start: a, end: s } = (r = e.at(1)) !== null && r !== void 0 ? r : n;
        return { errid: "EXPECT_FEATURE_OR_CONDITION", start: a, end: s, child: i };
      }
      return { type: "query", mediaCondition: i };
    }
    if (n.type === "ident") {
      let i, a, { value: s, end: l } = n;
      s !== "only" && s !== "not" || (i = s);
      let p3 = i === void 0 ? 0 : 1, u2 = e.at(p3);
      if (!u2)
        return { errid: "EXPECT_LPAREN_OR_TYPE", start: l, end: l };
      if (u2.type !== "ident") {
        if (i === "not" && u2.type === "(") {
          let c = S3(e.slice(p3), true);
          if (R3(c)) {
            let { start: d2, end: f2 } = (t = e.at(p3 + 1)) !== null && t !== void 0 ? t : u2;
            return { errid: "EXPECT_CONDITION", start: d2, end: f2, child: c };
          }
          return { type: "query", mediaCondition: { type: "condition", operator: "not", children: [c] } };
        }
        {
          let { start: c, end: d2 } = u2;
          return { errid: "EXPECT_TYPE", start: c, end: d2 };
        }
      }
      {
        let { value: c, start: d2, end: f2 } = u2;
        if (c === "all")
          a = void 0;
        else if (c === "print" || c === "screen")
          a = c;
        else {
          if (c !== "tty" && c !== "tv" && c !== "projection" && c !== "handheld" && c !== "braille" && c !== "embossed" && c !== "aural" && c !== "speech")
            return { errid: "EXPECT_TYPE", start: d2, end: f2 };
          i = i === "not" ? void 0 : "not", a = void 0;
        }
      }
      if (p3 + 1 === e.length)
        return { type: "query", prefix: i, mediaType: a };
      {
        let c = e[p3 + 1];
        if (c.type === "ident" && c.value === "and") {
          let d2 = e.at(-1), f2 = e.at(p3 + 2), m, v2 = d2.end + 1;
          if ((f2 == null ? void 0 : f2.type) === "ident" && f2.value === "not") {
            v2 += 1;
            let y2 = S3(e.slice(p3 + 3), false);
            m = R3(y2) ? y2 : { type: "condition", operator: "not", children: [y2] };
          } else
            m = S3(e.slice(p3 + 2), false);
          let { start: T2, end: x3 } = (o2 = e.at(p3 + 2)) !== null && o2 !== void 0 ? o2 : { start: v2, end: v2 };
          return R3(m) ? { errid: "EXPECT_CONDITION", start: T2, end: x3, child: m } : { type: "query", prefix: i, mediaType: a, mediaCondition: m };
        }
        return { errid: "EXPECT_AND", start: c.start, end: c.end };
      }
    }
    return { errid: "EXPECT_LPAREN_OR_TYPE_OR_MODIFIER", start: n.start, end: n.end };
  }
  return { errid: "EMPTY_QUERY", start: 0, end: 0 };
};
var S3 = (e, r, t) => {
  let o2 = e.at(0);
  if (o2) {
    if (o2.type !== "(")
      return { errid: "EXPECT_LPAREN", start: o2.start, end: o2.end };
    let n, i = e.length - 1, a = 0, s = 0;
    for (let [p3, u2] of e.entries())
      if (u2.type === "(" ? (s += 1, a = Math.max(a, s)) : u2.type === ")" && (s -= 1), s === 0) {
        i = p3;
        break;
      }
    if (s !== 0)
      return { errid: "MISMATCH_PARENS", start: o2.start, end: e[e.length - 1].end };
    let l = e.slice(0, i + 1);
    if (n = a === 1 ? qe(l) : l[1].type === "ident" && l[1].value === "not" ? S3(l.slice(2, -1), true, "not") : S3(l.slice(1, -1), true), R3(n))
      return { errid: "EXPECT_FEATURE_OR_CONDITION", start: o2.start, end: l[l.length - 1].end, child: n };
    if (i === e.length - 1)
      return { type: "condition", operator: t, children: [n] };
    {
      let p3 = e[i + 1];
      if (p3.type !== "ident" || p3.value !== "and" && p3.value !== "or")
        return { errid: "EXPECT_AND_OR_OR", start: p3.start, end: p3.end };
      if (t !== void 0 && t !== p3.value)
        return { errid: "MIX_AND_WITH_OR", start: p3.start, end: p3.end };
      if (p3.value === "or" && !r)
        return { errid: "MIX_AND_WITH_OR", start: p3.start, end: p3.end };
      let u2 = S3(e.slice(i + 2), r, p3.value);
      return R3(u2) ? u2 : { type: "condition", operator: p3.value, children: [n, ...u2.children] };
    }
  }
  return { errid: "EMPTY_CONDITION", start: 0, end: 0 };
};
var qe = (e) => {
  let r = e.at(0);
  if (r) {
    if (r.type !== "(")
      return { errid: "EXPECT_LPAREN", start: r.start, end: r.end };
    let t = e[e.length - 1];
    if (t.type !== ")")
      return { errid: "EXPECT_RPAREN", start: t.end + 1, end: t.end + 1 };
    let o2 = [e[0]];
    for (let i = 1; i < e.length; i++) {
      if (i < e.length - 2) {
        let a = e[i], s = e[i + 1], l = e[i + 2];
        if (a.type === "number" && a.value > 0 && s.type === "delim" && s.value === 47 && l.type === "number" && l.value > 0) {
          o2.push({ type: "ratio", numerator: a.value, denominator: l.value, hasSpaceBefore: a.hasSpaceBefore, hasSpaceAfter: l.hasSpaceAfter, start: a.start, end: l.end }), i += 2;
          continue;
        }
      }
      o2.push(e[i]);
    }
    let n = o2[1];
    if (n.type === "ident" && o2.length === 3)
      return { type: "feature", context: "boolean", feature: n.value };
    if (o2.length === 5 && o2[1].type === "ident" && o2[2].type === "colon") {
      let i = o2[3];
      if (i.type === "number" || i.type === "dimension" || i.type === "ratio" || i.type === "ident") {
        let a, s = o2[1].value, l = s.slice(0, 4);
        l === "min-" ? (a = "min", s = s.slice(4)) : l === "max-" && (a = "max", s = s.slice(4));
        let { hasSpaceBefore: p3, hasSpaceAfter: u2, start: c, end: d2, ...f2 } = i;
        return { type: "feature", context: "value", prefix: a, feature: s, value: f2 };
      }
      return { errid: "EXPECT_VALUE", start: i.start, end: i.end };
    }
    if (o2.length >= 5) {
      let i = gt(o2);
      if (R3(i))
        return { errid: "EXPECT_RANGE", start: r.start, end: o2[o2.length - 1].end, child: i };
      {
        let { feature: a, ...s } = i;
        return { type: "feature", context: "range", feature: a, range: s };
      }
    }
    return { errid: "INVALID_FEATURE", start: r.start, end: e[e.length - 1].end };
  }
  return { errid: "EMPTY_FEATURE", start: 0, end: 0 };
};
var gt = (e) => {
  var r, t, o2, n, i, a, s, l;
  if (e.length < 5)
    return { errid: "INVALID_RANGE", start: (t = (r = e.at(0)) === null || r === void 0 ? void 0 : r.start) !== null && t !== void 0 ? t : 0, end: (n = (o2 = e.at(-1)) === null || o2 === void 0 ? void 0 : o2.end) !== null && n !== void 0 ? n : 0 };
  if (e[0].type !== "(")
    return { errid: "EXPECT_LPAREN", start: e[0].start, end: e[0].end };
  let p3 = e[e.length - 1];
  if (p3.type !== ")")
    return { errid: "EXPECT_RPAREN", start: p3.start, end: p3.end };
  let u2 = { feature: "" }, c = e[1].type === "number" || e[1].type === "dimension" || e[1].type === "ratio" || e[1].type === "ident" && e[1].value === "infinite";
  if (e[2].type === "delim") {
    if (e[2].value === 60)
      e[3].type !== "delim" || e[3].value !== 61 || e[3].hasSpaceBefore ? u2[c ? "leftOp" : "rightOp"] = "<" : u2[c ? "leftOp" : "rightOp"] = "<=";
    else if (e[2].value === 62)
      e[3].type !== "delim" || e[3].value !== 61 || e[3].hasSpaceBefore ? u2[c ? "leftOp" : "rightOp"] = ">" : u2[c ? "leftOp" : "rightOp"] = ">=";
    else {
      if (e[2].value !== 61)
        return { errid: "INVALID_RANGE", start: e[0].start, end: p3.end };
      u2[c ? "leftOp" : "rightOp"] = "=";
    }
    if (c)
      u2.leftToken = e[1];
    else {
      if (e[1].type !== "ident")
        return { errid: "INVALID_RANGE", start: e[0].start, end: p3.end };
      u2.feature = e[1].value;
    }
    let d2 = 2 + ((a = (i = u2[c ? "leftOp" : "rightOp"]) === null || i === void 0 ? void 0 : i.length) !== null && a !== void 0 ? a : 0), f2 = e[d2];
    if (c) {
      if (f2.type !== "ident")
        return { errid: "INVALID_RANGE", start: e[0].start, end: p3.end };
      if (u2.feature = f2.value, e.length >= 7) {
        let g2 = e[d2 + 1], h = e[d2 + 2];
        if (g2.type !== "delim")
          return { errid: "INVALID_RANGE", start: e[0].start, end: p3.end };
        {
          let H = g2.value;
          if (H === 60)
            h.type !== "delim" || h.value !== 61 || h.hasSpaceBefore ? u2.rightOp = "<" : u2.rightOp = "<=";
          else {
            if (H !== 62)
              return { errid: "INVALID_RANGE", start: e[0].start, end: p3.end };
            h.type !== "delim" || h.value !== 61 || h.hasSpaceBefore ? u2.rightOp = ">" : u2.rightOp = ">=";
          }
          let W2 = d2 + 1 + ((l = (s = u2.rightOp) === null || s === void 0 ? void 0 : s.length) !== null && l !== void 0 ? l : 0), G2 = e.at(W2);
          if (W2 + 2 !== e.length)
            return { errid: "INVALID_RANGE", start: e[0].start, end: p3.end };
          u2.rightToken = G2;
        }
      } else if (d2 + 2 !== e.length)
        return { errid: "INVALID_RANGE", start: e[0].start, end: p3.end };
    } else
      u2.rightToken = f2;
    let m, { leftToken: v2, leftOp: T2, feature: x3, rightOp: y2, rightToken: P3 } = u2, N3, b3;
    if (v2 !== void 0) {
      if (v2.type === "ident") {
        let { type: g2, value: h } = v2;
        h === "infinite" && (N3 = { type: g2, value: h });
      } else if (v2.type === "number" || v2.type === "dimension" || v2.type === "ratio") {
        let { hasSpaceBefore: g2, hasSpaceAfter: h, start: H, end: W2, ...G2 } = v2;
        N3 = G2;
      }
    }
    if (P3 !== void 0) {
      if (P3.type === "ident") {
        let { type: g2, value: h } = P3;
        h === "infinite" && (b3 = { type: g2, value: h });
      } else if (P3.type === "number" || P3.type === "dimension" || P3.type === "ratio") {
        let { hasSpaceBefore: g2, hasSpaceAfter: h, start: H, end: W2, ...G2 } = P3;
        b3 = G2;
      }
    }
    if (N3 !== void 0 && b3 !== void 0)
      if (T2 !== "<" && T2 !== "<=" || y2 !== "<" && y2 !== "<=") {
        if (T2 !== ">" && T2 !== ">=" || y2 !== ">" && y2 !== ">=")
          return { errid: "INVALID_RANGE", start: e[0].start, end: p3.end };
        m = { leftToken: N3, leftOp: T2, feature: x3, rightOp: y2, rightToken: b3 };
      } else
        m = { leftToken: N3, leftOp: T2, feature: x3, rightOp: y2, rightToken: b3 };
    else
      (N3 === void 0 && T2 === void 0 && y2 !== void 0 && b3 !== void 0 || N3 !== void 0 && T2 !== void 0 && y2 === void 0 && b3 === void 0) && (m = { leftToken: N3, leftOp: T2, feature: x3, rightOp: y2, rightToken: b3 });
    return m ?? { errid: "INVALID_RANGE", start: e[0].start, end: p3.end };
  }
  return { errid: "INVALID_RANGE", start: e[0].start, end: p3.end };
};
var Ue = (e) => ({ type: "query-list", mediaQueries: e.mediaQueries.map((r) => Qe(r)) });
var Qe = (e) => e.mediaCondition ? { type: "query", prefix: e.prefix, mediaType: e.mediaType, mediaCondition: fe(e.mediaCondition) } : e;
var fe = (e) => {
  let r = [];
  for (let t of e.children)
    if (t.type === "condition") {
      let o2 = fe(t);
      o2.operator === void 0 && o2.children.length === 1 ? r.push(o2.children[0]) : o2.operator !== e.operator || o2.operator !== "and" && o2.operator !== "or" ? r.push(o2) : r.push(...o2.children);
    } else
      r.push(t);
  if (r.length === 1) {
    let t = r[0];
    if (t.type === "condition") {
      if (e.operator === void 0)
        return t;
      if (e.operator === "not" && t.operator === "not")
        return { type: "condition", children: t.children };
    }
  }
  return { type: "condition", operator: e.operator, children: r };
};
var Ye = (e) => {
  let r = [e];
  for (let t = e.child; t !== void 0; t = t.child)
    r.push(t);
  for (let t = r.length - 2; t >= 0; t--)
    r[t + 1].child = r.at(t);
  return delete r[0].child, r.at(-1);
};
var _2 = (e) => {
  switch (e.type) {
    case "query-list":
      for (let r of e.mediaQueries)
        _2(r);
      return e;
    case "query":
      return e.prefix === void 0 && delete e.prefix, e.mediaType === void 0 && delete e.mediaType, e.mediaCondition === void 0 ? delete e.mediaCondition : _2(e.mediaCondition), e;
    case "condition":
      e.operator === void 0 && delete e.operator;
      for (let r of e.children)
        _2(r);
      return e;
    case "feature":
      return e.context === "value" ? (e.prefix === void 0 && delete e.prefix, _2(e.value)) : e.context === "range" && (e.range.leftOp === void 0 && delete e.range.leftOp, e.range.rightOp === void 0 && delete e.range.rightOp, e.range.leftToken === void 0 ? delete e.range.leftToken : _2(e.range.leftToken), e.range.rightToken === void 0 ? delete e.range.rightToken : _2(e.range.rightToken)), e;
    default:
      return e;
  }
};
var me;
var je = (e) => {
  let r = (() => {
    let n;
    return me ? n = me : (n = new TextEncoder(), me = n), n;
  })().encode(e), t = [], o2 = r.length;
  for (let n = 0; n < o2; n += 1) {
    let i = r.at(n);
    if (i < 128)
      switch (i) {
        case 0:
          t.push(65533);
          break;
        case 12:
          t.push(10);
          break;
        case 13:
          t.push(10), r.at(n + 1) === 10 && (n += 1);
          break;
        default:
          t.push(i);
      }
    else
      i < 224 ? t.push(i << 59 >>> 53 | r[++n] << 58 >>> 58) : i < 240 ? t.push(i << 60 >>> 48 | r[++n] << 58 >>> 52 | r[++n] << 58 >>> 58) : t.push(i << 61 >>> 43 | r[++n] << 58 >>> 46 | r[++n] << 58 >>> 52 | r[++n] << 58 >>> 58);
  }
  return t;
};
var Ke = (e) => {
  let r = [], t = false;
  for (let o2 of e)
    switch (o2.type) {
      case "{":
        return { errid: "NO_LCURLY", start: o2.start, end: o2.end };
      case "semicolon":
        return { errid: "NO_SEMICOLON", start: o2.start, end: o2.end };
      case "whitespace":
        t = true, r.length > 0 && (r[r.length - 1].hasSpaceAfter = true);
        break;
      case "EOF":
        break;
      default:
        r.push({ ...o2, hasSpaceBefore: t, hasSpaceAfter: false }), t = false;
    }
  return r;
};
var He = (e, r = 0) => {
  let t = [];
  for (; r < e.length; r += 1) {
    let o2 = e.at(r), n = r;
    if (o2 === 47 && e.at(r + 1) === 42) {
      r += 2;
      for (let i = e.at(r); i !== void 0; i = e.at(++r))
        if (i === 42 && e.at(r + 1) === 47) {
          r += 1;
          break;
        }
    } else if (o2 === 9 || o2 === 32 || o2 === 10) {
      let i = e.at(++r);
      for (; i === 9 || i === 32 || i === 10; )
        i = e.at(++r);
      r -= 1;
      let a = t.at(-1);
      (a == null ? void 0 : a.type) === "whitespace" ? (t.pop(), t.push({ type: "whitespace", start: a.start, end: r })) : t.push({ type: "whitespace", start: n, end: r });
    } else if (o2 === 34) {
      let i = ze(e, r);
      if (i === null)
        return { errid: "INVALID_STRING", start: r, end: r };
      let [a, s] = i;
      r = a, t.push({ type: "string", value: s, start: n, end: r });
    } else if (o2 === 35) {
      if (r + 1 < e.length) {
        let i = e.at(r + 1);
        if (i === 95 || i >= 65 && i <= 90 || i >= 97 && i <= 122 || i >= 128 || i >= 48 && i <= 57 || i === 92 && r + 2 < e.length && e.at(r + 2) !== 10) {
          let a = We(e, r + 1) ? "id" : "unrestricted", s = $e(e, r + 1);
          if (s !== null) {
            let [l, p3] = s;
            r = l, t.push({ type: "hash", value: p3.toLowerCase(), flag: a, start: n, end: r });
            continue;
          }
        }
      }
      t.push({ type: "delim", value: o2, start: n, end: r });
    } else if (o2 === 39) {
      let i = ze(e, r);
      if (i === null)
        return { errid: "INVALID_STRING", start: r, end: r };
      let [a, s] = i;
      r = a, t.push({ type: "string", value: s, start: n, end: r });
    } else if (o2 === 40)
      t.push({ type: "(", start: n, end: r });
    else if (o2 === 41)
      t.push({ type: ")", start: n, end: r });
    else if (o2 === 43) {
      let i = oe(e, r);
      if (i === null)
        t.push({ type: "delim", value: o2, start: n, end: r });
      else {
        let [a, s] = i;
        r = a, s[0] === "dimension" ? t.push({ type: "dimension", value: s[1], unit: s[2].toLowerCase(), flag: "number", start: n, end: r }) : s[0] === "number" ? t.push({ type: s[0], value: s[1], flag: s[2], start: n, end: r }) : t.push({ type: s[0], value: s[1], flag: "number", start: n, end: r });
      }
    } else if (o2 === 44)
      t.push({ type: "comma", start: n, end: r });
    else if (o2 === 45) {
      let i = oe(e, r);
      if (i !== null) {
        let [s, l] = i;
        r = s, l[0] === "dimension" ? t.push({ type: "dimension", value: l[1], unit: l[2].toLowerCase(), flag: "number", start: n, end: r }) : l[0] === "number" ? t.push({ type: l[0], value: l[1], flag: l[2], start: n, end: r }) : t.push({ type: l[0], value: l[1], flag: "number", start: n, end: r });
        continue;
      }
      if (r + 2 < e.length) {
        let s = e.at(r + 1), l = e.at(r + 2);
        if (s === 45 && l === 62) {
          r += 2, t.push({ type: "CDC", start: n, end: r });
          continue;
        }
      }
      let a = Xe(e, r);
      if (a !== null) {
        let [s, l, p3] = a;
        r = s, t.push({ type: p3, value: l, start: n, end: r });
        continue;
      }
      t.push({ type: "delim", value: o2, start: n, end: r });
    } else if (o2 === 46) {
      let i = oe(e, r);
      if (i !== null) {
        let [a, s] = i;
        r = a, s[0] === "dimension" ? t.push({ type: "dimension", value: s[1], unit: s[2].toLowerCase(), flag: "number", start: n, end: r }) : s[0] === "number" ? t.push({ type: s[0], value: s[1], flag: s[2], start: n, end: r }) : t.push({ type: s[0], value: s[1], flag: "number", start: n, end: r });
        continue;
      }
      t.push({ type: "delim", value: o2, start: n, end: r });
    } else if (o2 === 58)
      t.push({ type: "colon", start: n, end: r });
    else if (o2 === 59)
      t.push({ type: "semicolon", start: n, end: r });
    else if (o2 === 60) {
      if (r + 3 < e.length) {
        let i = e.at(r + 1), a = e.at(r + 2), s = e.at(r + 3);
        if (i === 33 && a === 45 && s === 45) {
          r += 3, t.push({ type: "CDO", start: n, end: r });
          continue;
        }
      }
      t.push({ type: "delim", value: o2, start: n, end: r });
    } else if (o2 === 64) {
      let i = ve(e, r + 1);
      if (i !== null) {
        let [a, s] = i;
        r = a, t.push({ type: "at-keyword", value: s.toLowerCase(), start: n, end: r });
        continue;
      }
      t.push({ type: "delim", value: o2, start: n, end: r });
    } else if (o2 === 91)
      t.push({ type: "[", start: n, end: r });
    else if (o2 === 93)
      t.push({ type: "]", start: n, end: r });
    else if (o2 === 123)
      t.push({ type: "{", start: n, end: r });
    else if (o2 === 125)
      t.push({ type: "}", start: n, end: r });
    else if (o2 >= 48 && o2 <= 57) {
      let i = oe(e, r), [a, s] = i;
      r = a, s[0] === "dimension" ? t.push({ type: "dimension", value: s[1], unit: s[2].toLowerCase(), flag: "number", start: n, end: r }) : s[0] === "number" ? t.push({ type: s[0], value: s[1], flag: s[2], start: n, end: r }) : t.push({ type: s[0], value: s[1], flag: "number", start: n, end: r });
    } else if (o2 === 95 || o2 >= 65 && o2 <= 90 || o2 >= 97 && o2 <= 122 || o2 >= 128 || o2 === 92) {
      let i = Xe(e, r);
      if (i === null)
        t.push({ type: "delim", value: o2, start: n, end: r });
      else {
        let [a, s, l] = i;
        r = a, t.push({ type: l, value: s, start: n, end: r });
      }
    } else
      t.push({ type: "delim", value: o2, start: n, end: r });
  }
  return t.push({ type: "EOF", start: r, end: r }), t;
};
var ze = (e, r) => {
  if (e.length <= r + 1)
    return null;
  let t = e.at(r), o2 = [];
  for (let n = r + 1; n < e.length; n += 1) {
    let i = e.at(n);
    if (i === t)
      return [n, String.fromCodePoint(...o2)];
    if (i === 92) {
      let a = he(e, n);
      if (a === null)
        return null;
      let [s, l] = a;
      o2.push(l), n = s;
    } else {
      if (i === 10)
        return null;
      o2.push(i);
    }
  }
  return null;
};
var We = (e, r) => {
  let t = e.at(r);
  if (t === void 0)
    return false;
  if (t === 45) {
    let o2 = e.at(r + 1);
    return o2 === void 0 ? false : o2 === 45 || o2 === 95 || o2 >= 65 && o2 <= 90 || o2 >= 97 && o2 <= 122 || o2 >= 128 ? true : o2 === 92 ? e.length <= r + 2 ? false : e.at(r + 2) !== 10 : false;
  }
  return t === 95 || t >= 65 && t <= 90 || t >= 97 && t <= 122 || t >= 128 ? true : t === 92 ? e.length <= r + 1 ? false : e.at(r + 1) !== 10 : false;
};
var he = (e, r) => {
  if (e.length <= r + 1 || e.at(r) !== 92)
    return null;
  let t = e.at(r + 1);
  if (t === 10)
    return null;
  if (t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102) {
    let o2 = [t], n = Math.min(r + 7, e.length), i = r + 2;
    for (; i < n; i += 1) {
      let a = e.at(i);
      if (!(a >= 48 && a <= 57 || a >= 65 && a <= 70 || a >= 97 && a <= 102))
        break;
      o2.push(a);
    }
    if (i < e.length) {
      let a = e.at(i);
      a !== 9 && a !== 32 && a !== 10 || (i += 1);
    }
    return [i - 1, Number.parseInt(String.fromCodePoint(...o2), 16)];
  }
  return [r + 1, t];
};
var oe = (e, r) => {
  let t = xt(e, r);
  if (t === null)
    return null;
  let [o2, n, i] = t, a = ve(e, o2 + 1);
  if (a !== null) {
    let [s, l] = a;
    return [s, ["dimension", n, l]];
  }
  return o2 + 1 < e.length && e.at(o2 + 1) === 37 ? [o2 + 1, ["percentage", n]] : [o2, ["number", n, i]];
};
var xt = (e, r) => {
  let t = e.at(r);
  if (t === void 0)
    return null;
  let o2 = "integer", n = [];
  for (t !== 43 && t !== 45 || (r += 1, t === 45 && n.push(45)); r < e.length; ) {
    let s = e.at(r);
    if (!(s >= 48 && s <= 57))
      break;
    n.push(s), r += 1;
  }
  if (r + 1 < e.length) {
    let s = e.at(r), l = e.at(r + 1);
    if (s === 46 && l >= 48 && l <= 57)
      for (n.push(s, l), o2 = "number", r += 2; r < e.length; ) {
        let p3 = e.at(r);
        if (!(p3 >= 48 && p3 <= 57))
          break;
        n.push(p3), r += 1;
      }
  }
  if (r + 1 < e.length) {
    let s = e.at(r), l = e.at(r + 1), p3 = e.at(r + 2);
    if (s === 69 || s === 101) {
      let u2 = false;
      if (l >= 48 && l <= 57 ? (n.push(69, l), r += 2, u2 = true) : (l === 45 || l === 43) && p3 !== void 0 && p3 >= 48 && p3 <= 57 && (n.push(69), l === 45 && n.push(45), n.push(p3), r += 3, u2 = true), u2)
        for (o2 = "number"; r < e.length; ) {
          let c = e.at(r);
          if (!(c >= 48 && c <= 57))
            break;
          n.push(c), r += 1;
        }
    }
  }
  let i = String.fromCodePoint(...n), a = o2 === "number" ? Number.parseFloat(i) : Number.parseInt(i);
  return a === 0 && (a = 0), Number.isNaN(a) ? null : [r - 1, a, o2];
};
var $e = (e, r) => {
  if (e.length <= r)
    return null;
  let t = [];
  for (let o2 = e.at(r); r < e.length; o2 = e.at(++r)) {
    if (!(o2 === 45 || o2 === 95 || o2 >= 65 && o2 <= 90 || o2 >= 97 && o2 <= 122 || o2 >= 128 || o2 >= 48 && o2 <= 57)) {
      {
        let n = he(e, r);
        if (n !== null) {
          let [i, a] = n;
          t.push(a), r = i;
          continue;
        }
      }
      break;
    }
    t.push(o2);
  }
  return r === 0 ? null : [r - 1, String.fromCodePoint(...t)];
};
var ve = (e, r) => We(e, r) ? $e(e, r) : null;
var bt = (e, r) => {
  let t = e.at(r);
  for (; t === 9 || t === 32 || t === 10; )
    t = e.at(++r);
  let o2 = [], n = false;
  for (; r < e.length; ) {
    if (t === 41)
      return [r, String.fromCodePoint(...o2)];
    if (t === 34 || t === 39 || t === 40)
      return null;
    if (t === 9 || t === 32 || t === 10)
      !n && o2.length > 0 && (n = true);
    else if (t === 92) {
      let i = he(e, r);
      if (i === null || n)
        return null;
      let [a, s] = i;
      o2.push(s), r = a;
    } else {
      if (n)
        return null;
      o2.push(t);
    }
    t = e.at(++r);
  }
  return null;
};
var Xe = (e, r) => {
  let t = ve(e, r);
  if (t === null)
    return null;
  let [o2, n] = t;
  if (n.toLowerCase() === "url") {
    if (e.length > o2 + 1 && e.at(o2 + 1) === 40) {
      for (let i = 2; o2 + i < e.length; i += 1) {
        let a = e.at(o2 + i);
        if (a === 34 || a === 39)
          return [o2 + 1, n.toLowerCase(), "function"];
        if (a !== 9 && a !== 32 && a !== 10) {
          let s = bt(e, o2 + i);
          if (s === null)
            return null;
          let [l, p3] = s;
          return [l, p3, "url"];
        }
      }
      return [o2 + 1, n.toLowerCase(), "function"];
    }
  } else if (e.length > o2 + 1 && e.at(o2 + 1) === 40)
    return [o2 + 1, n.toLowerCase(), "function"];
  return [o2, n.toLowerCase(), "ident"];
};
var Ze = (e) => {
  let r = He(je(e));
  return R3(r) ? r : Ke(r);
};
var ie = (e) => typeof e == "object" && e !== null && "errid" in e;
var Je = (e) => {
  let r = Ze(e);
  return ie(r) ? Ye(r) : _2(Ue(Be(r)));
};
var se = { "any-hover": { none: 1, hover: 1 }, "any-pointer": { none: 1, coarse: 1, fine: 1 }, "color-gamut": { srgb: 1, p3: 1, rec2020: 1 }, grid: { 0: 1, 1: 1 }, hover: { none: 1, hover: 1 }, "overflow-block": { none: 1, scroll: 1, paged: 1 }, "overflow-inline": { none: 1, scroll: 1 }, pointer: { none: 1, coarse: 1, fine: 1 }, scan: { interlace: 1, progressive: 1 }, update: { none: 1, slow: 1, fast: 1 }, "display-mode": { fullscreen: 1, standalone: 1, "minimal-ui": 1, browser: 1 }, "dynamic-range": { standard: 1, high: 1 }, "environment-blending": { opaque: 1, additive: 1, subtractive: 1 }, "forced-colors": { none: 1, active: 1 }, "inverted-colors": { none: 1, inverted: 1 }, "nav-controls": { none: 1, back: 1 }, "prefers-color-scheme": { light: 1, dark: 1 }, "prefers-contrast": { "no-preference": 1, less: 1, more: 1, custom: 1 }, "prefers-reduced-data": { "no-preference": 1, reduce: 1 }, "prefers-reduced-motion": { "no-preference": 1, reduce: 1 }, "prefers-reduced-transparency": { "no-preference": 1, reduce: 1 }, scripting: { none: 1, "initial-only": 1, enabled: 1 }, "video-color-gamut": { srgb: 1, p3: 1, rec2020: 1 }, "video-dynamic-range": { standard: 1, high: 1 } };
var Q = { color: { feature: "color", type: "integer", bounds: [true, 0, 1 / 0, false] }, "color-index": { feature: "color-index", type: "integer", bounds: [true, 0, 1 / 0, false] }, monochrome: { feature: "monochrome", type: "integer", bounds: [true, 0, 1 / 0, false] }, "device-height": { feature: "device-height", type: "length", bounds: [true, 0, 1 / 0, false] }, "device-width": { feature: "device-width", type: "length", bounds: [true, 0, 1 / 0, false] }, height: { feature: "height", type: "length", bounds: [true, 0, 1 / 0, false] }, width: { feature: "width", type: "length", bounds: [true, 0, 1 / 0, false] }, resolution: { feature: "resolution", type: "resolution", bounds: [true, 0, 1 / 0, false] }, "horizontal-viewport-segments": { feature: "horizontal-viewport-segments", type: "integer", bounds: [true, 0, 1 / 0, false] }, "vertical-viewport-segments": { feature: "vertical-viewport-segments", type: "integer", bounds: [true, 0, 1 / 0, false] } };
var ye = { "aspect-ratio": { feature: "aspect-ratio", type: "ratio", bounds: [false, [0, 1], [1 / 0, 1], false] }, "device-aspect-ratio": { feature: "device-aspect-ratio", type: "ratio", bounds: [false, [0, 1], [1 / 0, 1], false] } };
var Y = (e) => Object.entries(e).filter((r) => r[1] !== void 0);
var et = new Set(Object.keys(se));
var tt = (e) => et.has(e[0]);
var le = (e) => et.has(e);
var rt = new Set(Object.keys(ye));
var j2 = (e) => rt.has(e[0]);
var K = (e) => rt.has(e);
var nt = new Set(Object.keys(Q));
var ge = (e) => nt.has(e[0]);
var ot = (e) => nt.has(e);
var it = (e) => ge(e) || j2(e);
var xe = (e) => ot(e) || K(e);
var be = (e) => ot(e) || K(e) || le(e);
var L2 = (e, r) => {
  e[r[0]] = r[1];
};
var ae = (...e) => e.reduce((r, t) => r === "{true}" ? t : t === "{true}" ? r : r === "{false}" || t === "{false}" ? "{false}" : ((o2, n) => {
  let [i, a, s, l] = o2, p3 = typeof a == "number" ? a : a[0] / a[1], u2 = typeof s == "number" ? s : s[0] / s[1], [c, d2, f2, m] = n, v2 = typeof d2 == "number" ? d2 : d2[0] / d2[1], T2 = typeof f2 == "number" ? f2 : f2[0] / f2[1], x3 = i !== c && !i;
  p3 !== v2 && (x3 = p3 > v2);
  let y2 = l !== m && !l;
  u2 !== T2 && (y2 = u2 < T2);
  let P3 = x3 ? i : c, N3 = x3 ? a : d2, b3 = y2 ? s : f2, g2 = y2 ? l : m;
  return N3 > b3 || N3 === b3 && (!P3 || !g2) ? "{false}" : [P3, N3, b3, g2];
})(r, t), "{true}");
var ue = (e) => {
  if (j2(e)) {
    let { bounds: r } = ye[e[0]], t = ae(e[1], r);
    if (typeof t == "string")
      return t;
    if (t[0] === r[0] && t[1][0] === r[1][0] && t[1][1] === r[1][1] && t[2][0] === r[2][0] && t[2][1] === r[2][1] && t[3] === r[3])
      return "{true}";
    {
      let o2 = t[1][0] / t[1][1], n = t[2][0] / t[2][1];
      return o2 > n || o2 === n && (!t[0] || !t[3]) ? "{false}" : t;
    }
  }
  {
    let { bounds: r } = Q[e[0]], t = ae(e[1], r);
    return typeof t == "string" ? t : t[0] === r[0] && t[1] === r[1] && t[2] === r[2] && t[3] === r[3] ? "{true}" : t[1] > t[2] || t[1] === t[2] && (!t[0] || !t[3]) ? "{false}" : t;
  }
};
var at = (e) => {
  if (typeof e[1] == "string")
    throw new Error("expected range");
  let { bounds: r } = ye[e[0]], [t, o2, n, i] = e[1], a = o2[0] / o2[1], s = n[0] / n[1], l = r[1][0] / r[1][1], p3 = r[0], u2 = r[2][0] / r[2][1], c = r[3], d2 = s > u2 || s === u2 && !(c && !i);
  return a < l || a === l && !(p3 && !t) ? d2 ? "{false}" : [[!i, n, r[2], r[3]]] : d2 ? [[r[0], r[1], o2, !t]] : [[r[0], r[1], o2, !t], [!i, n, r[2], r[3]]];
};
function st(e) {
  if (typeof e[1] == "string")
    throw new Error("expected range");
  let { bounds: r } = Q[e[0]], [t, o2, n, i] = e[1], a = r[1], s = r[0], l = r[2], p3 = r[3], u2 = n > l || n === l && !(p3 && !i);
  return o2 < a || o2 === a && !(s && !t) ? u2 ? "{false}" : [[!i, n, r[2], r[3]]] : u2 ? [[r[0], r[1], o2, !t]] : [[r[0], r[1], o2, !t], [!i, n, r[2], r[3]]];
}
var Et = { widthPx: 1920, heightPx: 1080, writingMode: "horizontal-tb", emPx: 16, lhPx: 16, exPx: 8, chPx: 8, capPx: 11, icPx: 16 };
var O3 = (e, r) => {
  if (e.type === "number")
    return { type: "number", value: e.value };
  if (e.type === "dimension") {
    let t;
    switch (e.unit) {
      case "s":
      case "ms":
        t = "time";
        break;
      case "hz":
      case "khz":
        t = "frequency";
        break;
      case "dpi":
      case "dpcm":
      case "dppx":
      case "x":
        t = "resolution";
        break;
      default:
        t = "length";
    }
    if (e.unit === "px")
      return { type: "dimension", subtype: "length", px: e.value };
    if (t === "time")
      return { type: "dimension", subtype: "time", ms: e.unit === "s" ? Math.round(1e3 * e.value) : e.value };
    if (t === "frequency")
      return { type: "dimension", subtype: "frequency", hz: e.unit === "khz" ? Math.round(1e3 * e.value) : e.value };
    if (t === "resolution") {
      let o2 = e.value;
      return e.unit === "dpi" ? o2 = Number.parseFloat((0.0104166667 * e.value).toFixed(3)) : e.unit === "dpcm" && (o2 = Number.parseFloat((0.0264583333 * e.value).toFixed(3))), { type: "dimension", subtype: "resolution", dppx: o2 };
    }
    if (e.unit in r) {
      let o2 = r[e.unit];
      return { type: "dimension", subtype: "length", px: Number.parseFloat((e.value * o2).toFixed(3)) };
    }
    return { type: "ident", value: "{never}" };
  }
  return e.type === "ident" ? e.value === "infinite" ? { type: "infinite" } : { type: "ident", value: e.value } : { type: "ratio", numerator: e.numerator, denominator: e.denominator };
};
var lt = (e) => {
  let r = {};
  typeof e.emPx == "number" && (r = { exPx: Math.round(0.5 * e.emPx), chPx: Math.round(0.5 * e.emPx), capPx: Math.round(0.7 * e.emPx), icPx: Math.round(e.emPx) });
  let t = { ...Et, ...r, ...e }, { widthPx: o2, heightPx: n, writingMode: i, emPx: a, lhPx: s, exPx: l, chPx: p3, capPx: u2, icPx: c } = t, d2 = o2 / 100, f2 = n / 100;
  return { em: a, rem: a, lh: s, rlh: s, ex: l, ch: p3, cap: u2, ic: c, vw: d2, vh: f2, vmin: Math.min(f2, d2), vmax: Math.max(f2, d2), vi: i === "horizontal-tb" ? d2 : f2, vb: i === "horizontal-tb" ? f2 : d2, cm: 37.79527559, mm: 0.03779527559, in: 96, q: 0.009448818898, pc: 16, pt: 16 };
};
var Tt = { "<": ">", "<=": ">=", ">": "<", ">=": "<=" };
var ut = (e, r) => {
  if (e.context === "range") {
    if (xe(e.feature)) {
      let { range: t, feature: o2 } = e;
      return t.leftToken !== void 0 && t.rightToken !== void 0 ? t.leftOp === "<" || t.leftOp === "<=" ? { type: "double", name: o2, minOp: t.leftOp, min: O3(t.leftToken, r), maxOp: t.rightOp, max: O3(t.rightToken, r) } : { type: "double", name: o2, minOp: t.rightOp === ">" ? "<" : "<=", min: O3(t.rightToken, r), maxOp: t.leftOp ? "<" : "<=", max: O3(t.leftToken, r) } : t.rightToken === void 0 ? t.leftOp === "=" ? { type: "equals", name: o2, value: O3(t.leftToken, r) } : { type: "single", name: o2, op: Tt[t.leftOp], value: O3(t.leftToken, r) } : t.rightOp === "=" ? { type: "equals", name: o2, value: O3(t.rightToken, r) } : { type: "single", name: o2, op: t.rightOp, value: O3(t.rightToken, r) };
    }
  } else if (e.context === "value") {
    if (e.feature === "orientation") {
      if (e.prefix === void 0 && e.value.type === "ident") {
        if (e.value.value === "portrait")
          return { type: "single", name: "aspect-ratio", op: "<=", value: { type: "ratio", numerator: 1, denominator: 1 } };
        if (e.value.value === "landscape")
          return { type: "single", name: "aspect-ratio", op: ">=", value: { type: "ratio", numerator: 1, denominator: 1 } };
      }
    } else if (be(e.feature)) {
      if (e.prefix === void 0)
        return { type: "equals", name: e.feature, value: O3(e.value, r) };
      if (xe(e.feature))
        return e.prefix === "min" ? { type: "single", name: e.feature, op: ">=", value: O3(e.value, r) } : { type: "single", name: e.feature, op: "<=", value: O3(e.value, r) };
    }
  } else {
    if (e.feature === "orientation")
      return { type: "double", name: "aspect-ratio", min: { type: "ratio", numerator: 0, denominator: 1 }, minOp: "<", maxOp: "<", max: { type: "ratio", numerator: Number.POSITIVE_INFINITY, denominator: 1 } };
    if (be(e.feature))
      return { type: "boolean", name: e.feature };
  }
  return { type: "invalid", name: e.feature };
};
var z3 = (e) => e.type === "number" && e.value > 0 ? [e.value, 1] : e.type === "ratio" ? [e.numerator, e.denominator] : null;
var X = (e, r) => {
  let t = Q[r];
  if (e.type === "infinite") {
    if (r === "resolution")
      return Number.POSITIVE_INFINITY;
  } else if (t.type === "integer") {
    if (e.type === "number" && Number.isInteger(e.value))
      return e.value;
  } else if (t.type === "resolution") {
    if (e.type === "dimension" && e.subtype === "resolution")
      return e.dppx;
  } else if (t.type === "length") {
    if (e.type === "dimension" && e.subtype === "length")
      return e.px;
    if (e.type === "number" && e.value === 0)
      return 0;
  }
  return null;
};
var pt = (e, r) => {
  let t = [];
  for (let o2 of e)
    for (let n of r) {
      let i = Pt(o2, n);
      Object.keys(i).length > 0 && t.push(i);
    }
  return t;
};
var Pt = (e, r) => {
  let t = {};
  for (let o2 of Y(e))
    o2[1] !== void 0 && L2(t, o2);
  for (let o2 of Y(r))
    if (o2[0] in t) {
      if (t[o2[0]] !== void 0) {
        let n = t;
        if (o2[0] !== "media-type") {
          if (o2[0] === "invalid-features")
            n[o2[0]].push(...o2[1]);
          else if (n[o2[0]] === "{false}" || o2[1] === "{false}")
            n[o2[0]] = "{false}";
          else if (n[o2[0]] === "{true}")
            L2(n, o2);
          else if (o2[1] !== "{true}") {
            let i = t;
            ge(o2) || j2(o2) ? L2(i, [o2[0], ae(i[o2[0]], o2[1])]) : o2[0] === "color-gamut" || o2[0] === "video-color-gamut" ? i[o2[0]] = [i[o2[0]][0] && o2[1][0], i[o2[0]][1] && o2[1][1], i[o2[0]][2] && o2[1][2], i[o2[0]][3] && o2[1][3]] : L2(i, [o2[0], i[o2[0]] === o2[1] ? i[o2[0]] : "{false}"]);
          }
        }
      }
    } else
      L2(t, o2);
  return t;
};
var ct = (e) => e.map((r) => dt(r)).reduce((r, t) => pt(r, t));
var dt = (e) => {
  let r = Y(e), t = [];
  for (let n of r)
    if (n[1] !== void 0) {
      let i, a;
      if (n[0] === "invalid-features")
        return [{ [n[0]]: n[1] }];
      if (n[0] === "media-type")
        continue;
      if (i = n, n[1] === "{false}")
        a = [[n[0], "{true}"]];
      else if (n[1] === "{true}")
        a = [[n[0], "{false}"]];
      else if (tt(n))
        if (n[0] === "color-gamut") {
          let s = n[1];
          a = [["color-gamut", [!s[0], !s[1], !s[2], !s[3]]]];
        } else
          a = n[0] === "grid" ? [["grid", n[1] === 0 ? 1 : 0]] : Object.keys(se[n[0]]).filter((s) => s !== n[1]).map((s) => [n[0], s]);
      else if (j2(n)) {
        let s = at(n);
        a = (s === "{false}" ? ["{false}"] : s).map((l) => [n[0], l]);
      } else {
        let s = st(n);
        a = (s === "{false}" ? ["{false}"] : s).map((l) => [n[0], l]);
      }
      t.push([i, a]);
    }
  let o2 = [];
  for (let [, n] of t)
    for (let i of n)
      o2.push({ [i[0]]: i[1] });
  return o2;
};
var It = (e, r) => {
  let t = ut(e, r), o2 = [{ "invalid-features": [e.feature] }];
  if (t.type === "invalid")
    return o2;
  if (t.type === "boolean")
    return t.name === "color-gamut" ? [{ "color-gamut": [false, true, true, true] }] : t.name === "grid" ? [{ grid: 1 }] : le(t.name) ? dt({ [t.name]: "none" }) : K(t.name) ? [{ [t.name]: [false, [0, 1], [Number.POSITIVE_INFINITY, 1], true] }] : [{ [t.name]: [false, 0, Number.POSITIVE_INFINITY, true] }];
  if (le(t.name)) {
    if (t.type === "equals") {
      let n = t.value;
      if (t.name === "grid") {
        if (n.type === "number" && (n.value === 0 || n.value === 1))
          return [{ grid: n.value }];
      } else if (n.type === "ident" && n.value in se[t.name]) {
        if (t.name !== "color-gamut")
          return [{ [t.name]: n.value }];
        {
          let i = ["srgb", "p3", "rec2020"].indexOf(n.value);
          if (i !== -1)
            return [{ "color-gamut": [false, i <= 0, i <= 1, i <= 2] }];
        }
      }
    }
    return o2;
  }
  if (K(t.name)) {
    let n = null;
    if (t.type === "equals") {
      let i = z3(t.value);
      i !== null && (n = [true, i, i, true]);
    } else if (t.type === "single") {
      let i = z3(t.value);
      i !== null && (n = t.op === "<" ? [true, [Number.NEGATIVE_INFINITY, 1], i, false] : t.op === "<=" ? [true, [Number.NEGATIVE_INFINITY, 1], i, true] : t.op === ">" ? [false, i, [Number.POSITIVE_INFINITY, 1], true] : [true, i, [Number.POSITIVE_INFINITY, 1], true]);
    } else if (t.type === "double") {
      let i = z3(t.min), a = z3(t.max);
      i !== null && a !== null && (n = [t.minOp === "<=", i, a, t.maxOp === "<="]);
    }
    return n === null ? o2 : [{ [t.name]: ue([t.name, n]) }];
  }
  {
    let n = null;
    if (t.type === "equals") {
      let i = X(t.value, t.name);
      i !== null && (n = [true, i, i, true]);
    } else if (t.type === "single") {
      let i = X(t.value, t.name);
      i !== null && (n = t.op === "<" ? [true, Number.NEGATIVE_INFINITY, i, false] : t.op === "<=" ? [true, Number.NEGATIVE_INFINITY, i, true] : t.op === ">" ? [false, i, Number.POSITIVE_INFINITY, true] : [true, i, Number.POSITIVE_INFINITY, true]);
    } else if (t.type === "double") {
      let i = X(t.min, t.name), a = X(t.max, t.name);
      i !== null && a !== null && (n = [t.minOp === "<=", i, a, t.maxOp === "<="]);
    }
    return n === null ? o2 : [{ [t.name]: ue([t.name, n]) }];
  }
};
var Ee = (e, r) => {
  let t = [];
  for (let o2 of e.children)
    "context" in o2 ? t.push(It(o2, r)) : t.push(Ee(o2, r));
  return e.operator === "or" || e.operator === void 0 ? t.flat() : e.operator === "and" ? t.reduce((o2, n) => pt(o2, n)) : ct(t[0]);
};
var Nt = (e) => {
  let r = [], t = /* @__PURE__ */ new Set(), o2 = /* @__PURE__ */ new Set();
  for (let n of e) {
    let i = false;
    if (Array.isArray(n["invalid-features"]) && n["invalid-features"].length > 0) {
      for (let s of n["invalid-features"])
        t.add(s);
      i = true;
    }
    let a = {};
    for (let s of Y(n))
      if (s[0] !== "invalid-features") {
        if (s[0] === "color-gamut") {
          let l = s[1].toString();
          l === "false,false,false,false" ? s[1] = "{false}" : l === "true,true,true,true" && (s[1] = "{true}");
        } else
          it(s) && (s[1] = ue(s));
        s[1] === "{false}" ? (o2.add(s[0]), i = true) : s[1] === "{true}" || s[0] === "media-type" && s[1] === "all" || L2(a, s);
      }
    i || r.push(a);
  }
  return { simplePerms: r, invalidFeatures: [...t].sort(), falseFeatures: [...o2].sort() };
};
var wt = (e, r = {}) => {
  let t = lt(r), o2 = [];
  for (let n of e.mediaQueries) {
    let i = [];
    n.prefix === "not" ? (n.mediaType === "print" ? i.push({ "media-type": "not-print" }) : n.mediaType === "screen" && i.push({ "media-type": "not-screen" }), n.mediaCondition !== void 0 && i.push(...ct(Ee(n.mediaCondition, t)))) : n.mediaCondition === void 0 ? i.push({ "media-type": n.mediaType }) : i.push(...Ee(n.mediaCondition, t).map((a) => ({ ...a, "media-type": n.mediaType }))), o2.push(...i);
  }
  return Nt(o2);
};
var ft = (e, r = {}) => {
  let t = Je(e);
  if (ie(t))
    throw new Error(`Error parsing media query list: ${t.errid} at chars ${t.start}:${t.end}`);
  return wt(t, r);
};
var kt = { mediaType: "screen", anyHover: "hover", anyPointer: "fine", colorGamut: "srgb-but-not-p3", grid: "bitmap", hover: "hover", overflowBlock: "scroll", overflowInline: "scroll", pointer: "fine", scan: "progressive", update: "fast", colorIndex: "none", colorBits: 8, monochromeBits: "not-monochrome", displayMode: "browser", dynamicRange: "not-hdr", environmentBlending: "opaque", forcedColors: "none", invertedColors: "none", navControls: "back", prefersColorScheme: "no-preference", prefersContrast: "no-preference", prefersReducedData: "no-preference", prefersReducedMotion: "no-preference", prefersReducedTransparency: "no-preference", scripting: "enabled", videoColorGamut: "srgb-but-not-p3", videoDynamicRange: "not-hdr", horizontalViewportSegments: 1, verticalViewportSegments: 1 };
var I3 = (e) => new Error(`Invalid option: ${e}`);
var Ot = (e) => {
  if (e.mediaType !== "screen" && e.mediaType !== "print" && e.mediaType !== "not-screen-or-print")
    throw I3("mediaType");
  if (e.anyHover !== "none" && e.anyHover !== "hover")
    throw I3("anyHover");
  if (e.anyPointer !== "none" && e.anyPointer !== "coarse" && e.anyPointer !== "fine")
    throw I3("anyPointer");
  if (e.colorGamut !== "not-srgb" && e.colorGamut !== "srgb-but-not-p3" && e.colorGamut !== "p3-but-not-rec2020" && e.colorGamut !== "rec2020")
    throw I3("colorGamut");
  if (e.grid !== "bitmap" && e.grid !== "grid")
    throw I3("grid");
  if (e.hover !== "none" && e.hover !== "hover")
    throw I3("hover");
  if (e.overflowBlock !== "none" && e.overflowBlock !== "scroll" && e.overflowBlock !== "paged")
    throw I3("overflowBlock");
  if (e.overflowInline !== "none" && e.overflowInline !== "scroll")
    throw I3("overflowInline");
  if (e.pointer !== "none" && e.pointer !== "coarse" && e.pointer !== "fine")
    throw I3("pointer");
  if (e.scan !== "interlace" && e.scan !== "progressive")
    throw I3("scan");
  if (e.update !== "none" && e.update !== "slow" && e.update !== "fast")
    throw I3("update");
  if (!(Number.isInteger(e.widthPx) && e.widthPx >= 0))
    throw I3("widthPx");
  if (!(Number.isInteger(e.heightPx) && e.heightPx >= 0))
    throw I3("heightPx");
  if (!(Number.isInteger(e.deviceWidthPx) && e.deviceWidthPx >= 0))
    throw I3("deviceWidthPx");
  if (!(Number.isInteger(e.deviceHeightPx) && e.deviceHeightPx >= 0))
    throw I3("deviceHeightPx");
  if (!(Number.isInteger(e.colorBits) && e.colorBits >= 0))
    throw I3("colorBits");
  if (e.dppx <= 0)
    throw I3("dppx");
  if (e.monochromeBits !== "not-monochrome" && !(Number.isInteger(e.monochromeBits) && e.monochromeBits >= 0))
    throw I3("monochromeBits");
  if (e.colorIndex !== "none" && !(Number.isInteger(e.colorIndex) && e.colorIndex >= 0))
    throw I3("colorIndex");
};
var mt = (e, r) => {
  let t = { ...kt, ...r };
  Ot(t);
  for (let o2 of e.simplePerms) {
    let n = true;
    for (let i in o2) {
      let a = i, s = o2;
      if (a === "media-type") {
        let l = s[a];
        if (l === "print") {
          if (t.mediaType === "screen" || t.mediaType === "not-screen-or-print") {
            n = false;
            break;
          }
        } else if (l === "screen") {
          if (t.mediaType === "print" || t.mediaType === "not-screen-or-print") {
            n = false;
            break;
          }
        } else if (l === "not-screen") {
          if (t.mediaType === "screen") {
            n = false;
            break;
          }
        } else if (t.mediaType === "print") {
          n = false;
          break;
        }
      } else if (a === "any-hover") {
        if (s[a] !== t.anyHover) {
          n = false;
          break;
        }
      } else if (a === "hover") {
        if (s[a] !== t.hover) {
          n = false;
          break;
        }
      } else if (a === "any-pointer") {
        if (s[a] !== t.anyPointer) {
          n = false;
          break;
        }
      } else if (a === "pointer") {
        if (s[a] !== t.pointer) {
          n = false;
          break;
        }
      } else if (a === "grid") {
        let l = s[a];
        if (l === 0 && t.grid === "grid" || l === 1 && t.grid === "bitmap") {
          n = false;
          break;
        }
      } else if (a === "color-gamut") {
        let [l, p3, u2, c] = s[a];
        if (t.colorGamut === "not-srgb" && !l || t.colorGamut === "srgb-but-not-p3" && !p3 || t.colorGamut === "p3-but-not-rec2020" && !u2 || t.colorGamut === "rec2020" && !c) {
          n = false;
          break;
        }
      } else if (a === "video-color-gamut") {
        let [l, p3, u2, c] = s[a];
        if (t.videoColorGamut === "not-srgb" && !l || t.videoColorGamut === "srgb-but-not-p3" && !p3 || t.videoColorGamut === "p3-but-not-rec2020" && !u2 || t.videoColorGamut === "rec2020" && !c) {
          n = false;
          break;
        }
      } else if (a === "overflow-block") {
        if (s[a] !== t.overflowBlock) {
          n = false;
          break;
        }
      } else if (a === "overflow-inline") {
        if (s[a] !== t.overflowInline) {
          n = false;
          break;
        }
      } else if (a === "scan") {
        if (s[a] !== t.scan) {
          n = false;
          break;
        }
      } else if (a === "update") {
        if (s[a] !== t.update) {
          n = false;
          break;
        }
      } else if (a === "scripting") {
        if (s[a] !== t.scripting) {
          n = false;
          break;
        }
      } else if (a === "display-mode") {
        if (s[a] !== t.displayMode) {
          n = false;
          break;
        }
      } else if (a === "environment-blending") {
        if (s[a] !== t.environmentBlending) {
          n = false;
          break;
        }
      } else if (a === "forced-colors") {
        if (s[a] !== t.forcedColors) {
          n = false;
          break;
        }
      } else if (a === "inverted-colors") {
        if (s[a] !== t.invertedColors) {
          n = false;
          break;
        }
      } else if (a === "nav-controls") {
        if (s[a] !== t.navControls) {
          n = false;
          break;
        }
      } else if (a === "prefers-color-scheme") {
        if (s[a] !== t.prefersColorScheme) {
          n = false;
          break;
        }
      } else if (a === "prefers-contrast") {
        if (s[a] !== t.prefersContrast) {
          n = false;
          break;
        }
      } else if (a === "prefers-reduced-data") {
        if (s[a] !== t.prefersReducedData) {
          n = false;
          break;
        }
      } else if (a === "prefers-reduced-motion") {
        if (s[a] !== t.prefersReducedMotion) {
          n = false;
          break;
        }
      } else if (a === "prefers-reduced-transparency") {
        if (s[a] !== t.prefersReducedTransparency) {
          n = false;
          break;
        }
      } else if (a === "dynamic-range") {
        if (s[a] === "high" && t.dynamicRange === "not-hdr") {
          n = false;
          break;
        }
      } else if (a === "video-dynamic-range") {
        if (s[a] === "high" && t.videoDynamicRange === "not-hdr") {
          n = false;
          break;
        }
      } else if (a === "vertical-viewport-segments") {
        let [l, p3, u2, c] = s[a];
        if (t.verticalViewportSegments < p3 || t.verticalViewportSegments > u2 || p3 === t.verticalViewportSegments && !l || u2 === t.verticalViewportSegments && !c) {
          n = false;
          break;
        }
      } else if (a === "horizontal-viewport-segments") {
        let [l, p3, u2, c] = s[a];
        if (t.horizontalViewportSegments < p3 || t.horizontalViewportSegments > u2 || p3 === t.horizontalViewportSegments && !l || u2 === t.horizontalViewportSegments && !c) {
          n = false;
          break;
        }
      } else if (a === "width") {
        let [l, p3, u2, c] = s[a];
        if (t.widthPx < p3 || t.widthPx > u2 || p3 === t.widthPx && !l || u2 === t.widthPx && !c) {
          n = false;
          break;
        }
      } else if (a === "device-width") {
        let [l, p3, u2, c] = s[a];
        if (t.deviceWidthPx < p3 || t.deviceWidthPx > u2 || p3 === t.deviceWidthPx && !l || u2 === t.deviceWidthPx && !c) {
          n = false;
          break;
        }
      } else if (a === "height") {
        let [l, p3, u2, c] = s[a];
        if (t.heightPx < p3 || t.heightPx > u2 || p3 === t.heightPx && !l || u2 === t.heightPx && !c) {
          n = false;
          break;
        }
      } else if (a === "device-height") {
        let [l, p3, u2, c] = s[a];
        if (t.deviceHeightPx < p3 || t.deviceHeightPx > u2 || p3 === t.deviceHeightPx && !l || u2 === t.deviceHeightPx && !c) {
          n = false;
          break;
        }
      } else if (a === "color") {
        let [l, p3, u2, c] = s[a];
        if (t.colorBits < p3 || t.colorBits > u2 || p3 === t.colorBits && !l || u2 === t.colorBits && !c) {
          n = false;
          break;
        }
      } else if (a === "monochrome") {
        let [l, p3, u2, c] = s[a];
        if (t.monochromeBits === "not-monochrome")
          (p3 > 0 || p3 === 0 && !l || u2 === 0 && !c) && (n = false);
        else if (t.monochromeBits < p3 || t.monochromeBits > u2 || p3 === t.monochromeBits && !l || u2 === t.monochromeBits && !c) {
          n = false;
          break;
        }
      } else if (a === "resolution") {
        let [l, p3, u2, c] = s[a];
        if (t.dppx < p3 || t.dppx > u2 || p3 === t.dppx && !l || u2 === t.dppx && !c) {
          n = false;
          break;
        }
      } else if (a === "color-index") {
        let [l, p3, u2, c] = s[a];
        if (t.colorIndex === "none") {
          if (p3 > 0 || p3 === 0 && !l || u2 === 0 && !c) {
            n = false;
            break;
          }
        } else if (t.colorIndex < p3 || t.colorIndex > u2 || p3 === t.colorIndex && !l || u2 === t.colorIndex && !c) {
          n = false;
          break;
        }
      } else if (a === "aspect-ratio") {
        let [l, p3, u2, c] = s[a], d2 = p3[0] / p3[1], f2 = u2[0] / u2[1], m = t.widthPx / t.heightPx;
        if (m < d2 || m > f2 || d2 === m && !l || f2 === m && !c) {
          n = false;
          break;
        }
      } else {
        let [l, p3, u2, c] = s[a], d2 = p3[0] / p3[1], f2 = u2[0] / u2[1], m = t.deviceWidthPx / t.deviceHeightPx;
        if (m < d2 || m > f2 || d2 === m && !l || f2 === m && !c) {
          n = false;
          break;
        }
      }
    }
    if (n)
      return true;
  }
  return false;
};
function _t(e) {
  let { useObjectSyntax: r = false } = e ?? {};
  return (t) => {
    let o2 = r ? [":where([style]) {}"] : [], n = [];
    z(t, (u2, c) => {
      u2.type === k && u2.name === "style" && (o2.push(u2.children.map((d2) => d2.type === j ? d2.value : "").join("")), n.push(() => {
        c.children = c.children.filter((d2) => d2 !== u2);
      }));
    });
    for (let u2 of n)
      u2();
    let i = o2.join(`
`), a = de(i), s = /* @__PURE__ */ new Map();
    function l(u2) {
      if (u2.type === "rule") {
        let c = Object.fromEntries(u2.children.map((d2) => [d2.props, d2.children]));
        for (let d2 of u2.props) {
          let f2 = Object.assign(s.get(d2) ?? {}, c);
          s.set(d2, f2);
        }
      } else if (u2.type === "@media" && (e == null ? void 0 : e.env)) {
        let c = Mt(e.env), f2 = (Array.isArray(u2.props) ? u2.props : [u2.props]).map((m) => ft(m));
        for (let m of f2)
          if (mt(m, c)) {
            for (let v2 of u2.children)
              l(v2);
            return;
          }
      }
    }
    for (let u2 of a)
      l(u2);
    let p3 = /* @__PURE__ */ new Map();
    for (let [u2, c] of Array.from(s).sort(([d2], [f2]) => {
      let m = G(d2), v2 = G(f2);
      return m > v2 ? 1 : v2 > m ? -1 : 0;
    })) {
      let d2 = R2(t, u2);
      for (let f2 of d2) {
        let m = p3.get(f2) ?? {};
        p3.set(f2, Object.assign(m, c));
      }
    }
    for (let [u2, c] of p3) {
      let d2 = u2.attributes.style ?? "", f2 = {};
      for (let m of de(d2))
        m.type === "decl" && typeof m.props == "string" && typeof m.children == "string" && (f2[m.props] = m.children);
      f2 = Object.assign({}, c, f2), r ? u2.attributes.style = f2 : u2.attributes.style = `${Object.entries(f2).map(([m, v2]) => `${m}:${v2.replace("!important", "")};`).join("")}`;
    }
    return t;
  };
}
function Mt(e) {
  let { width: r, height: t, dppx: o2 = 1, widthPx: n = r, heightPx: i = t, deviceWidthPx: a = r * o2, deviceHeightPx: s = t * o2, ...l } = e;
  return { widthPx: n, heightPx: i, deviceWidthPx: a, deviceHeightPx: s, dppx: o2, ...l };
}

// ../satori-html/dist/index.js
var TW_NAMES = /* @__PURE__ */ new Set([
  /[mp](t|b|r|l|x|y)?-/,
  `color-`,
  `flex`,
  `h-`,
  `w-`,
  `min-w-`,
  `min-h-`,
  `max-w-`,
  `max-h-`,
  `leading-`,
  `text-`,
  `opacity-`,
  `font-`,
  `aspect-`,
  `tint-`,
  `bg-`,
  `opacity-`,
  `shadow-`,
  `rounded`,
  `top-`,
  `right-`,
  `bottom-`,
  `left-`,
  `inset-`,
  `border`,
  `elevation-`,
  `tracking-`,
  `z-`
]);
var inliner = _t({ useObjectSyntax: true });
var tw = (doc) => {
  z(doc, (node) => {
    if (node.type !== k)
      return;
    if (node.attributes.class && !node.attributes.tw) {
      const classNames = node.attributes.class.split(/\s+/);
      let match = false;
      for (const name of TW_NAMES) {
        if (match)
          break;
        for (const item of classNames) {
          if (match)
            break;
          if (item.indexOf(":") > -1) {
            match = true;
          } else if (typeof name === "string") {
            match = item.startsWith(name);
          } else {
            match = name.test(item);
          }
        }
      }
      if (match) {
        node.attributes.tw = node.attributes.class;
      }
    }
  });
};
var camelize = (ident) => ident.replace(/-([a-z])/g, (_3, char) => char.toUpperCase());
function html(templates, ...expressions) {
  const result = F.call(null, templates, ...expressions);
  let doc = w(result.value.trim());
  inliner(doc);
  tw(doc);
  const nodeMap = /* @__PURE__ */ new WeakMap();
  let root = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
      },
      children: []
    }
  };
  z(doc, (node, parent, index) => {
    let newNode = {};
    if (node.type === R) {
      nodeMap.set(node, root);
    } else if (node.type === k) {
      newNode.type = node.name;
      const { style, "": _3, ...props } = node.attributes;
      if (typeof style === "object") {
        props["style"] = {};
        for (const [decl, value] of Object.entries(style)) {
          props["style"][camelize(decl)] = value;
        }
      }
      props.children = [];
      Object.assign(newNode, { props });
      nodeMap.set(node, newNode);
      if (parent) {
        const newParent = nodeMap.get(parent);
        newParent.props.children[index] = newNode;
      }
    } else if (node.type === j) {
      newNode = node.value.trim();
      if (newNode.trim()) {
        if (parent) {
          const newParent = nodeMap.get(parent);
          if (parent.children.length === 1) {
            newParent.props.children = newNode;
          } else {
            newParent.props.children[index] = newNode;
          }
        }
      }
    }
  });
  return root;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  html
});
/*! Bundled license information:

ultrahtml/dist/transformers/inline.js:
  (**! media-query-parser | Tom Golden <oss@tom.bio> (https://tom.bio) | @license MIT  *)
*/
