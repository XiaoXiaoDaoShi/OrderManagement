/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ?
		define(["exports"], e) : e(t.echarts = {})
}(this, function(t) {
	"use strict";
	var e = 2311,
		n = function() {
			return e++
		},
		m = "object" == typeof wx && "function" == typeof wx.getSystemInfoSync ? {
			browser: {},
			os: {},
			node: !1,
			wxa: !0,
			canvasSupported: !0,
			svgSupported: !1,
			touchEventsSupported: !0,
			domSupported: !1
		} : "undefined" == typeof document && "undefined" != typeof self ? {
			browser: {},
			os: {},
			node: !1,
			worker: !0,
			canvasSupported: !0,
			domSupported: !1
		} : "undefined" == typeof navigator ? {
			browser: {},
			os: {},
			node: !0,
			worker: !1,
			canvasSupported: !0,
			svgSupported: !0,
			domSupported: !1
		} : function(t) {
			var e = {},
				i = t.match(/Firefox\/([\d.]+)/),
				n = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/),
				r = t.match(/Edge\/([\d.]+)/),
				a = /micromessenger/i.test(t);
			i && (e.firefox = !0, e.version = i[1]);
			n && (e.ie = !0, e.version = n[1]);
			r && (e.edge = !0, e.version = r[1]);
			a && (e.weChat = !0);
			return {
				browser: e,
				os: {},
				node: !1,
				canvasSupported: !!document.createElement("canvas").getContext,
				svgSupported: "undefined" != typeof SVGRect,
				touchEventsSupported: "ontouchstart" in window && !e.ie && !e.edge,
				pointerEventsSupported: "onpointerdown" in window && (e.edge || e.ie && 11 <= e.version),
				domSupported: "undefined" != typeof document
			}
		}(navigator.userAgent);
	var s = {
			"[object Function]": 1,
			"[object RegExp]": 1,
			"[object Date]": 1,
			"[object Error]": 1,
			"[object CanvasGradient]": 1,
			"[object CanvasPattern]": 1,
			"[object Image]": 1,
			"[object Canvas]": 1
		},
		l = {
			"[object Int8Array]": 1,
			"[object Uint8Array]": 1,
			"[object Uint8ClampedArray]": 1,
			"[object Int16Array]": 1,
			"[object Uint16Array]": 1,
			"[object Int32Array]": 1,
			"[object Uint32Array]": 1,
			"[object Float32Array]": 1,
			"[object Float64Array]": 1
		},
		h = Object.prototype.toString,
		i = Array.prototype,
		o = i.forEach,
		u = i.filter,
		r = i.slice,
		c = i.map,
		d = i.reduce,
		a = {};

	function f(t, e) {
		"createCanvas" === t && (y = null), a[t] = e
	}

	function b(t) {
		if (null == t || "object" != typeof t) return t;
		var e = t,
			i = h.call(t);
		if ("[object Array]" === i) {
			if (!$(t)) {
				e = [];
				for (var n = 0, r = t.length; n < r; n++) e[n] = b(t[n])
			}
		} else if (l[i]) {
			if (!$(t)) {
				var a = t.constructor;
				if (t.constructor.from) e = a.from(t);
				else {
					e = new a(t.length);
					for (n = 0, r = t.length; n < r; n++) e[n] = b(t[n])
				}
			}
		} else if (!s[i] && !$(t) && !V(t))
			for (var o in e = {}, t) t.hasOwnProperty(o) && (e[o] = b(t[o]));
		return e
	}

	function v(t, e, i) {
		if (!N(e) || !N(t)) return i ? b(e) : t;
		for (var n in e)
			if (e.hasOwnProperty(n)) {
				var r = t[n],
					a = e[n];
				!N(a) || !N(r) || O(a) || O(r) || V(a) || V(r) || R(a) || R(r) || $(a) || $(r) ? !i && n in t || (t[n] = b(e[n])) :
					v(r, a, i)
			} return t
	}

	function p(t, e) {
		for (var i = t[0], n = 1, r = t.length; n < r; n++) i = v(i, t[n], e);
		return i
	}

	function k(t, e) {
		for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
		return t
	}

	function T(t, e, i) {
		for (var n in e) e.hasOwnProperty(n) && (i ? null != e[n] : null == t[n]) && (t[n] = e[n]);
		return t
	}

	function g() {
		return a.createCanvas()
	}
	var y;

	function _() {
		return y = y || g().getContext("2d")
	}

	function x(t, e) {
		if (t) {
			if (t.indexOf) return t.indexOf(e);
			for (var i = 0, n = t.length; i < n; i++)
				if (t[i] === e) return i
		}
		return -1
	}

	function w(t, e) {
		var i = t.prototype;

		function n() {}
		for (var r in n.prototype = e.prototype, t.prototype = new n, i) i.hasOwnProperty(r) && (t.prototype[r] = i[r]);
		(t.prototype.constructor = t).superClass = e
	}

	function S(t, e, i) {
		T(t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, i)
	}

	function L(t) {
		if (t) return "string" != typeof t && "number" == typeof t.length
	}

	function D(t, e, i) {
		if (t && e)
			if (t.forEach && t.forEach === o) t.forEach(e, i);
			else if (t.length === +t.length)
			for (var n = 0, r = t.length; n < r; n++) e.call(i, t[n], n, t);
		else
			for (var a in t) t.hasOwnProperty(a) && e.call(i, t[a], a, t)
	}

	function P(t, e, i) {
		if (t && e) {
			if (t.map && t.map === c) return t.map(e, i);
			for (var n = [], r = 0, a = t.length; r < a; r++) n.push(e.call(i, t[r], r, t));
			return n
		}
	}

	function M(t, e, i, n) {
		if (t && e) {
			if (t.reduce && t.reduce === d) return t.reduce(e, i, n);
			for (var r = 0, a = t.length; r < a; r++) i = e.call(n, i, t[r], r, t);
			return i
		}
	}

	function I(t, e, i) {
		if (t && e) {
			if (t.filter && t.filter === u) return t.filter(e, i);
			for (var n = [], r = 0, a = t.length; r < a; r++) e.call(i, t[r], r, t) && n.push(t[r]);
			return n
		}
	}

	function C(t, e) {
		var i = r.call(arguments, 2);
		return function() {
			return t.apply(e, i.concat(r.call(arguments)))
		}
	}

	function A(t) {
		var e = r.call(arguments, 1);
		return function() {
			return t.apply(this, e.concat(r.call(arguments)))
		}
	}

	function O(t) {
		return "[object Array]" === h.call(t)
	}

	function z(t) {
		return "function" == typeof t
	}

	function E(t) {
		return "[object String]" === h.call(t)
	}

	function N(t) {
		var e = typeof t;
		return "function" == e || !!t && "object" == e
	}

	function R(t) {
		return !!s[h.call(t)]
	}

	function B(t) {
		return !!l[h.call(t)]
	}

	function V(t) {
		return "object" == typeof t && "number" == typeof t.nodeType && "object" == typeof t.ownerDocument
	}

	function F(t) {
		return t != t
	}

	function H(t) {
		for (var e = 0, i = arguments.length; e < i; e++)
			if (null != arguments[e]) return arguments[e]
	}

	function G(t, e) {
		return null != t ? t : e
	}

	function W(t, e, i) {
		return null != t ? t : null != e ? e : i
	}

	function Z() {
		return Function.call.apply(r, arguments)
	}

	function U(t) {
		if ("number" == typeof t) return [t, t, t, t];
		var e = t.length;
		return 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t
	}

	function X(t, e) {
		if (!t) throw new Error(e)
	}

	function Y(t) {
		return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			"")
	}
	a.createCanvas = function() {
		return document.createElement("canvas")
	};
	var j = "__ec_primitive__";

	function q(t) {
		t[j] = !0
	}

	function $(t) {
		return t[j]
	}

	function K(t) {
		var i = O(t);
		this.data = {};
		var n = this;

		function e(t, e) {
			i ? n.set(t, e) : n.set(e, t)
		}
		t instanceof K ? t.each(e) : t && D(t, e)
	}

	function Q(t) {
		return new K(t)
	}

	function J() {}
	K.prototype = {
		constructor: K,
		get: function(t) {
			return this.data.hasOwnProperty(t) ? this.data[t] : null
		},
		set: function(t, e) {
			return this.data[t] = e
		},
		each: function(t, e) {
			for (var i in void 0 !== e && (t = C(t, e)), this.data) this.data.hasOwnProperty(i) && t(this.data[i], i)
		},
		removeKey: function(t) {
			delete this.data[t]
		}
	};
	var tt = (Object.freeze || Object)({
			$override: f,
			clone: b,
			merge: v,
			mergeAll: p,
			extend: k,
			defaults: T,
			createCanvas: g,
			getContext: _,
			indexOf: x,
			inherits: w,
			mixin: S,
			isArrayLike: L,
			each: D,
			map: P,
			reduce: M,
			filter: I,
			find: function(t, e, i) {
				if (t && e)
					for (var n = 0, r = t.length; n < r; n++)
						if (e.call(i, t[n], n, t)) return t[n]
			},
			bind: C,
			curry: A,
			isArray: O,
			isFunction: z,
			isString: E,
			isObject: N,
			isBuiltInObject: R,
			isTypedArray: B,
			isDom: V,
			eqNaN: F,
			retrieve: H,
			retrieve2: G,
			retrieve3: W,
			slice: Z,
			normalizeCssArray: U,
			assert: X,
			trim: Y,
			setAsPrimitive: q,
			isPrimitive: $,
			createHashMap: Q,
			concatArray: function(t, e) {
				for (var i = new t.constructor(t.length + e.length), n = 0; n < t.length; n++) i[n] = t[n];
				var r = t.length;
				for (n = 0; n < e.length; n++) i[n + r] = e[n];
				return i
			},
			noop: J
		}),
		et = "undefined" == typeof Float32Array ? Array : Float32Array;

	function it(t, e) {
		var i = new et(2);
		return null == t && (t = 0), null == e && (e = 0), i[0] = t, i[1] = e, i
	}

	function nt(t, e) {
		return t[0] = e[0], t[1] = e[1], t
	}

	function rt(t) {
		var e = new et(2);
		return e[0] = t[0], e[1] = t[1], e
	}

	function at(t, e, i) {
		return t[0] = e[0] + i[0], t[1] = e[1] + i[1], t
	}

	function ot(t, e, i, n) {
		return t[0] = e[0] + i[0] * n, t[1] = e[1] + i[1] * n, t
	}

	function st(t, e, i) {
		return t[0] = e[0] - i[0], t[1] = e[1] - i[1], t
	}

	function lt(t) {
		return Math.sqrt(ut(t))
	}
	var ht = lt;

	function ut(t) {
		return t[0] * t[0] + t[1] * t[1]
	}
	var ct = ut;

	function dt(t, e, i) {
		return t[0] = e[0] * i, t[1] = e[1] * i, t
	}

	function ft(t, e) {
		var i = lt(e);
		return 0 === i ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / i, t[1] = e[1] / i), t
	}

	function pt(t, e) {
		return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
	}
	var gt = pt;

	function vt(t, e) {
		return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
	}
	var mt = vt;

	function yt(t, e, i) {
		var n = e[0],
			r = e[1];
		return t[0] = i[0] * n + i[2] * r + i[4], t[1] = i[1] * n + i[3] * r + i[5], t
	}

	function _t(t, e, i) {
		return t[0] = Math.min(e[0], i[0]), t[1] = Math.min(e[1], i[1]), t
	}

	function xt(t, e, i) {
		return t[0] = Math.max(e[0], i[0]), t[1] = Math.max(e[1], i[1]), t
	}
	var wt = (Object.freeze || Object)({
		create: it,
		copy: nt,
		clone: rt,
		set: function(t, e, i) {
			return t[0] = e, t[1] = i, t
		},
		add: at,
		scaleAndAdd: ot,
		sub: st,
		len: lt,
		length: ht,
		lenSquare: ut,
		lengthSquare: ct,
		mul: function(t, e, i) {
			return t[0] = e[0] * i[0], t[1] = e[1] * i[1], t
		},
		div: function(t, e, i) {
			return t[0] = e[0] / i[0], t[1] = e[1] / i[1], t
		},
		dot: function(t, e) {
			return t[0] * e[0] + t[1] * e[1]
		},
		scale: dt,
		normalize: ft,
		distance: pt,
		dist: gt,
		distanceSquare: vt,
		distSquare: mt,
		negate: function(t, e) {
			return t[0] = -e[0], t[1] = -e[1], t
		},
		lerp: function(t, e, i, n) {
			return t[0] = e[0] + n * (i[0] - e[0]), t[1] = e[1] + n * (i[1] - e[1]), t
		},
		applyTransform: yt,
		min: _t,
		max: xt
	});

	function bt() {
		this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd,
			this), this.on("globalout", this._dragEnd, this)
	}

	function St(t, e) {
		return {
			target: t,
			topTarget: e && e.topTarget
		}
	}
	bt.prototype = {
		constructor: bt,
		_dragStart: function(t) {
			var e = t.target;
			e && e.draggable && ((this._draggingTarget = e).dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.dispatchToElement(
				St(e, t), "dragstart", t.event))
		},
		_drag: function(t) {
			var e = this._draggingTarget;
			if (e) {
				var i = t.offsetX,
					n = t.offsetY,
					r = i - this._x,
					a = n - this._y;
				this._x = i, this._y = n, e.drift(r, a, t), this.dispatchToElement(St(e, t), "drag", t.event);
				var o = this.findHover(i, n, e).target,
					s = this._dropTarget;
				e !== (this._dropTarget = o) && (s && o !== s && this.dispatchToElement(St(s, t), "dragleave", t.event), o && o !==
					s && this.dispatchToElement(St(o, t), "dragenter", t.event))
			}
		},
		_dragEnd: function(t) {
			var e = this._draggingTarget;
			e && (e.dragging = !1), this.dispatchToElement(St(e, t), "dragend", t.event), this._dropTarget && this.dispatchToElement(
				St(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null
		}
	};
	var Mt = Array.prototype.slice,
		It = function(t) {
			this._$handlers = {}, this._$eventProcessor = t
		};

	function Ct(t, e, i, n, r, a) {
		var o = t._$handlers;
		if ("function" == typeof i && (r = n, n = i, i = null), !n || !e) return t;
		i = function(t, e) {
			var i = t._$eventProcessor;
			return null != e && i && i.normalizeQuery && (e = i.normalizeQuery(e)), e
		}(t, i), o[e] || (o[e] = []);
		for (var s = 0; s < o[e].length; s++)
			if (o[e][s].h === n) return t;
		var l = {
				h: n,
				one: a,
				query: i,
				ctx: r || t,
				callAtLast: n.zrEventfulCallAtLast
			},
			h = o[e].length - 1,
			u = o[e][h];
		return u && u.callAtLast ? o[e].splice(h, 0, l) : o[e].push(l), t
	}
	It.prototype = {
		constructor: It,
		one: function(t, e, i, n) {
			return Ct(this, t, e, i, n, !0)
		},
		on: function(t, e, i, n) {
			return Ct(this, t, e, i, n, !1)
		},
		isSilent: function(t) {
			var e = this._$handlers;
			return !e[t] || !e[t].length
		},
		off: function(t, e) {
			var i = this._$handlers;
			if (!t) return this._$handlers = {}, this;
			if (e) {
				if (i[t]) {
					for (var n = [], r = 0, a = i[t].length; r < a; r++) i[t][r].h !== e && n.push(i[t][r]);
					i[t] = n
				}
				i[t] && 0 === i[t].length && delete i[t]
			} else delete i[t];
			return this
		},
		trigger: function(t) {
			var e = this._$handlers[t],
				i = this._$eventProcessor;
			if (e) {
				var n = arguments,
					r = n.length;
				3 < r && (n = Mt.call(n, 1));
				for (var a = e.length, o = 0; o < a;) {
					var s = e[o];
					if (i && i.filter && null != s.query && !i.filter(t, s.query)) o++;
					else {
						switch (r) {
							case 1:
								s.h.call(s.ctx);
								break;
							case 2:
								s.h.call(s.ctx, n[1]);
								break;
							case 3:
								s.h.call(s.ctx, n[1], n[2]);
								break;
							default:
								s.h.apply(s.ctx, n)
						}
						s.one ? (e.splice(o, 1), a--) : o++
					}
				}
			}
			return i && i.afterTrigger && i.afterTrigger(t), this
		},
		triggerWithContext: function(t) {
			var e = this._$handlers[t],
				i = this._$eventProcessor;
			if (e) {
				var n = arguments,
					r = n.length;
				4 < r && (n = Mt.call(n, 1, n.length - 1));
				for (var a = n[n.length - 1], o = e.length, s = 0; s < o;) {
					var l = e[s];
					if (i && i.filter && null != l.query && !i.filter(t, l.query)) s++;
					else {
						switch (r) {
							case 1:
								l.h.call(a);
								break;
							case 2:
								l.h.call(a, n[1]);
								break;
							case 3:
								l.h.call(a, n[1], n[2]);
								break;
							default:
								l.h.apply(a, n)
						}
						l.one ? (e.splice(s, 1), o--) : s++
					}
				}
			}
			return i && i.afterTrigger && i.afterTrigger(t), this
		}
	};
	var At = Math.log(2);

	function Tt(t, e, i, n, r, a) {
		var o = n + "-" + r,
			s = t.length;
		if (a.hasOwnProperty(o)) return a[o];
		if (1 === e) {
			var l = Math.round(Math.log((1 << s) - 1 & ~r) / At);
			return t[i][l]
		}
		for (var h = n | 1 << i, u = i + 1; n & 1 << u;) u++;
		for (var c = 0, d = 0, f = 0; d < s; d++) {
			var p = 1 << d;
			p & r || (c += (f % 2 ? -1 : 1) * t[i][d] * Tt(t, e - 1, u, h, r | p, a), f++)
		}
		return a[o] = c
	}
	var Dt = "undefined" != typeof window && !!window.addEventListener,
		kt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		Pt = "___zrEVENTSAVED",
		Lt = [];

	function Ot(t, e, i, n) {
		return i = i || {}, n || !m.canvasSupported ? zt(t, e, i) : m.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ?
			(i.zrX = e.layerX, i.zrY = e.layerY) : null != e.offsetX ? (i.zrX = e.offsetX, i.zrY = e.offsetY) : zt(t, e, i), i
	}

	function zt(t, e, i) {
		if (t.getBoundingClientRect && m.domSupported) {
			var n = e.clientX,
				r = e.clientY;
			if ("CANVAS" === t.nodeName.toUpperCase()) {
				var a = t.getBoundingClientRect();
				return i.zrX = n - a.left, void(i.zrY = r - a.top)
			}
			var o = t[Pt] || (t[Pt] = {}),
				s = function(t, e) {
					for (var i = e.transformer, n = e.srcCoords, r = !0, a = [], o = [], s = 0; s < 4; s++) {
						var l = t[s].getBoundingClientRect(),
							h = 2 * s,
							u = l.left,
							c = l.top;
						a.push(u, c), r &= n && u === n[h] && c === n[1 + h], o.push(t[s].offsetLeft, t[s].offsetTop)
					}
					return r ? i : (e.srcCoords = a, e.transformer = function(t, e) {
						var i = [
								[t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1]],
								[0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1]],
								[t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3]],
								[0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3]],
								[t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5]],
								[0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5]],
								[t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7]],
								[0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7]]
							],
							n = {},
							r = Tt(i, 8, 0, 0, 0, n);
						if (0 !== r) {
							for (var a = [], o = 0; o < 8; o++)
								for (var s = 0; s < 8; s++) null == a[s] && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * Tt(i, 7, 0 === o ?
									1 : 0, 1 << o, 1 << s, n) / r * e[o];
							return function(t, e, i) {
								var n = e * a[6] + i * a[7] + 1;
								t[0] = (e * a[0] + i * a[1] + a[2]) / n, t[1] = (e * a[3] + i * a[4] + a[5]) / n
							}
						}
					}(a, o))
				}(function(t, e) {
					var i = e.markers;
					if (i) return i;
					i = e.markers = [];
					for (var n = ["left", "right"], r = ["top", "bottom"], a = 0; a < 4; a++) {
						var o = document.createElement("div"),
							s = o.style,
							l = a % 2,
							h = (a >> 1) % 2;
						s.cssText = ["position:absolute", "visibility: hidden", "padding: 0", "margin: 0", "border-width: 0", "width:0",
							"height:0", n[l] + ":0", r[h] + ":0", n[1 - l] + ":auto", r[1 - h] + ":auto", ""
						].join("!important;"), t.appendChild(o), i.push(o)
					}
					return i
				}(t, o), o);
			if (s) return s(Lt, n, r), i.zrX = Lt[0], void(i.zrY = Lt[1])
		}
		i.zrX = i.zrY = 0
	}

	function Et(t, e, i) {
		if (null != (e = e || window.event).zrX) return e;
		var n = e.type;
		if (n && 0 <= n.indexOf("touch")) {
			var r = "touchend" !== n ? e.targetTouches[0] : e.changedTouches[0];
			r && Ot(t, r, e, i)
		} else Ot(t, e, e, i), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
		var a = e.button;
		return null == e.which && void 0 !== a && kt.test(e.type) && (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
	}

	function Nt(t, e, i) {
		Dt ? t.addEventListener(e, i) : t.attachEvent("on" + e, i)
	}
	var Rt = Dt ? function(t) {
		t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0
	} : function(t) {
		t.returnValue = !1, t.cancelBubble = !0
	};

	function Bt(t) {
		return 2 === t.which || 3 === t.which
	}

	function Vt() {
		this._track = []
	}

	function Ft(t) {
		var e = t[1][0] - t[0][0],
			i = t[1][1] - t[0][1];
		return Math.sqrt(e * e + i * i)
	}
	Vt.prototype = {
		constructor: Vt,
		recognize: function(t, e, i) {
			return this._doTrack(t, e, i), this._recognize(t)
		},
		clear: function() {
			return this._track.length = 0, this
		},
		_doTrack: function(t, e, i) {
			var n = t.touches;
			if (n) {
				for (var r = {
						points: [],
						touches: [],
						target: e,
						event: t
					}, a = 0, o = n.length; a < o; a++) {
					var s = n[a],
						l = Ot(i, s, {});
					r.points.push([l.zrX, l.zrY]), r.touches.push(s)
				}
				this._track.push(r)
			}
		},
		_recognize: function(t) {
			for (var e in Ht)
				if (Ht.hasOwnProperty(e)) {
					var i = Ht[e](this._track, t);
					if (i) return i
				}
		}
	};
	var Ht = {
			pinch: function(t, e) {
				var i = t.length;
				if (i) {
					var n = (t[i - 1] || {}).points,
						r = (t[i - 2] || {}).points || n;
					if (r && 1 < r.length && n && 1 < n.length) {
						var a = Ft(n) / Ft(r);
						isFinite(a) || (a = 1), e.pinchScale = a;
						var o = function(t) {
							return [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2]
						}(n);
						return e.pinchX = o[0], e.pinchY = o[1], {
							type: "pinch",
							target: t[0].target,
							event: e
						}
					}
				}
			}
		},
		Gt = "silent";

	function Wt(t) {
		Rt(this.event)
	}

	function Zt() {}
	Zt.prototype.dispose = function() {};

	function Ut(t, e, i, n) {
		It.call(this), this.storage = t, this.painter = e, this.painterRoot = n, i = i || new Zt, this.proxy = null, this._hovered = {},
			this._lastTouchMoment, this._lastX, this._lastY, this._gestureMgr, bt.call(this), this.setHandlerProxy(i)
	}
	var Xt = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"];

	function Yt(t, e, i) {
		if (t[t.rectHover ? "rectContain" : "contain"](e, i)) {
			for (var n, r = t; r;) {
				if (r.clipPath && !r.clipPath.contain(e, i)) return !1;
				r.silent && (n = !0), r = r.parent
			}
			return !n || Gt
		}
		return !1
	}
	Ut.prototype = {
		constructor: Ut,
		setHandlerProxy: function(e) {
			this.proxy && this.proxy.dispose(), e && (D(Xt, function(t) {
				e.on && e.on(t, this[t], this)
			}, this), e.handler = this), this.proxy = e
		},
		mousemove: function(t) {
			var e = t.zrX,
				i = t.zrY,
				n = this._hovered,
				r = n.target;
			r && !r.__zr && (r = (n = this.findHover(n.x, n.y)).target);
			var a = this._hovered = this.findHover(e, i),
				o = a.target,
				s = this.proxy;
			s.setCursor && s.setCursor(o ? o.cursor : "default"), r && o !== r && this.dispatchToElement(n, "mouseout", t),
				this.dispatchToElement(a, "mousemove", t), o && o !== r && this.dispatchToElement(a, "mouseover", t)
		},
		mouseout: function(t) {
			this.dispatchToElement(this._hovered, "mouseout", t);
			for (var e, i = t.toElement || t.relatedTarget;
				(i = i && i.parentNode) && 9 !== i.nodeType && !(e = i === this.painterRoot););
			e || this.trigger("globalout", {
				event: t
			})
		},
		resize: function(t) {
			this._hovered = {}
		},
		dispatch: function(t, e) {
			var i = this[t];
			i && i.call(this, e)
		},
		dispose: function() {
			this.proxy.dispose(), this.storage = this.proxy = this.painter = null
		},
		setCursorStyle: function(t) {
			var e = this.proxy;
			e.setCursor && e.setCursor(t)
		},
		dispatchToElement: function(t, e, i) {
			var n = (t = t || {}).target;
			if (!n || !n.silent) {
				for (var r = "on" + e, a = function(t, e, i) {
						return {
							type: t,
							event: i,
							target: e.target,
							topTarget: e.topTarget,
							cancelBubble: !1,
							offsetX: i.zrX,
							offsetY: i.zrY,
							gestureEvent: i.gestureEvent,
							pinchX: i.pinchX,
							pinchY: i.pinchY,
							pinchScale: i.pinchScale,
							wheelDelta: i.zrDelta,
							zrByTouch: i.zrByTouch,
							which: i.which,
							stop: Wt
						}
					}(e, t, i); n && (n[r] && (a.cancelBubble = n[r].call(n, a)), n.trigger(e, a), n = n.parent, !a.cancelBubble);)
				;
				a.cancelBubble || (this.trigger(e, a), this.painter && this.painter.eachOtherLayer(function(t) {
					"function" == typeof t[r] && t[r].call(t, a), t.trigger && t.trigger(e, a)
				}))
			}
		},
		findHover: function(t, e, i) {
			for (var n = this.storage.getDisplayList(), r = {
					x: t,
					y: e
				}, a = n.length - 1; 0 <= a; a--) {
				var o;
				if (n[a] !== i && !n[a].ignore && (o = Yt(n[a], t, e)) && (r.topTarget || (r.topTarget = n[a]), o !== Gt)) {
					r.target = n[a];
					break
				}
			}
			return r
		},
		processGesture: function(t, e) {
			this._gestureMgr || (this._gestureMgr = new Vt);
			var i = this._gestureMgr;
			"start" === e && i.clear();
			var n = i.recognize(t, this.findHover(t.zrX, t.zrY, null).target, this.proxy.dom);
			if ("end" === e && i.clear(), n) {
				var r = n.type;
				t.gestureEvent = r, this.dispatchToElement({
					target: n.target
				}, r, n.event)
			}
		}
	}, D(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(n) {
		Ut.prototype[n] = function(t) {
			var e = this.findHover(t.zrX, t.zrY),
				i = e.target;
			if ("mousedown" === n) this._downEl = i, this._downPoint = [t.zrX, t.zrY], this._upEl = i;
			else if ("mouseup" === n) this._upEl = i;
			else if ("click" === n) {
				if (this._downEl !== this._upEl || !this._downPoint || 4 < gt(this._downPoint, [t.zrX, t.zrY])) return;
				this._downPoint = null
			}
			this.dispatchToElement(e, n, t)
		}
	}), S(Ut, It), S(Ut, bt);
	var jt = "undefined" == typeof Float32Array ? Array : Float32Array;

	function qt() {
		var t = new jt(6);
		return $t(t), t
	}

	function $t(t) {
		return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
	}

	function Kt(t, e) {
		return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
	}

	function Qt(t, e, i) {
		var n = e[0] * i[0] + e[2] * i[1],
			r = e[1] * i[0] + e[3] * i[1],
			a = e[0] * i[2] + e[2] * i[3],
			o = e[1] * i[2] + e[3] * i[3],
			s = e[0] * i[4] + e[2] * i[5] + e[4],
			l = e[1] * i[4] + e[3] * i[5] + e[5];
		return t[0] = n, t[1] = r, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t
	}

	function Jt(t, e, i) {
		return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + i[0], t[5] = e[5] + i[1], t
	}

	function te(t, e, i) {
		var n = e[0],
			r = e[2],
			a = e[4],
			o = e[1],
			s = e[3],
			l = e[5],
			h = Math.sin(i),
			u = Math.cos(i);
		return t[0] = n * u + o * h, t[1] = -n * h + o * u, t[2] = r * u + s * h, t[3] = -r * h + u * s, t[4] = u * a + h *
			l, t[5] = u * l - h * a, t
	}

	function ee(t, e, i) {
		var n = i[0],
			r = i[1];
		return t[0] = e[0] * n, t[1] = e[1] * r, t[2] = e[2] * n, t[3] = e[3] * r, t[4] = e[4] * n, t[5] = e[5] * r, t
	}

	function ie(t, e) {
		var i = e[0],
			n = e[2],
			r = e[4],
			a = e[1],
			o = e[3],
			s = e[5],
			l = i * o - a * n;
		return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -n * l, t[3] = i * l, t[4] = (n * s - o * r) * l, t[5] =
			(a * r - i * s) * l, t) : null
	}
	var ne = (Object.freeze || Object)({
			create: qt,
			identity: $t,
			copy: Kt,
			mul: Qt,
			translate: Jt,
			rotate: te,
			scale: ee,
			invert: ie,
			clone: function(t) {
				var e = qt();
				return Kt(e, t), e
			}
		}),
		re = $t;

	function ae(t) {
		return 5e-5 < t || t < -5e-5
	}
	var oe = function(t) {
			(t = t || {}).position || (this.position = [0, 0]), null == t.rotation && (this.rotation = 0), t.scale || (this.scale = [
				1, 1
			]), this.origin = this.origin || null
		},
		se = oe.prototype;
	se.transform = null, se.needLocalTransform = function() {
		return ae(this.rotation) || ae(this.position[0]) || ae(this.position[1]) || ae(this.scale[0] - 1) || ae(this.scale[
			1] - 1)
	};
	var le = [];
	se.updateTransform = function() {
		var t = this.parent,
			e = t && t.transform,
			i = this.needLocalTransform(),
			n = this.transform;
		if (i || e) {
			n = n || qt(), i ? this.getLocalTransform(n) : re(n), e && (i ? Qt(n, t.transform, n) : Kt(n, t.transform)), this.transform =
				n;
			var r = this.globalScaleRatio;
			if (null != r && 1 !== r) {
				this.getGlobalScale(le);
				var a = le[0] < 0 ? -1 : 1,
					o = le[1] < 0 ? -1 : 1,
					s = ((le[0] - a) * r + a) / le[0] || 0,
					l = ((le[1] - o) * r + o) / le[1] || 0;
				n[0] *= s, n[1] *= s, n[2] *= l, n[3] *= l
			}
			this.invTransform = this.invTransform || qt(), ie(this.invTransform, n)
		} else n && re(n)
	}, se.getLocalTransform = function(t) {
		return oe.getLocalTransform(this, t)
	}, se.setTransform = function(t) {
		var e = this.transform,
			i = t.dpr || 1;
		e ? t.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : t.setTransform(i, 0, 0, i, 0, 0)
	}, se.restoreTransform = function(t) {
		var e = t.dpr || 1;
		t.setTransform(e, 0, 0, e, 0, 0)
	};
	var he = [],
		ue = qt();
	se.setLocalTransform = function(t) {
		if (t) {
			var e = t[0] * t[0] + t[1] * t[1],
				i = t[2] * t[2] + t[3] * t[3],
				n = this.position,
				r = this.scale;
			ae(e - 1) && (e = Math.sqrt(e)), ae(i - 1) && (i = Math.sqrt(i)), t[0] < 0 && (e = -e), t[3] < 0 && (i = -i), n[0] =
				t[4], n[1] = t[5], r[0] = e, r[1] = i, this.rotation = Math.atan2(-t[1] / i, t[0] / e)
		}
	}, se.decomposeTransform = function() {
		if (this.transform) {
			var t = this.parent,
				e = this.transform;
			t && t.transform && (Qt(he, t.invTransform, e), e = he);
			var i = this.origin;
			i && (i[0] || i[1]) && (ue[4] = i[0], ue[5] = i[1], Qt(he, e, ue), he[4] -= i[0], he[5] -= i[1], e = he), this.setLocalTransform(
				e)
		}
	}, se.getGlobalScale = function(t) {
		var e = this.transform;
		return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]),
			e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1])) : (t[0] = 1, t[1] = 1), t
	}, se.transformCoordToLocal = function(t, e) {
		var i = [t, e],
			n = this.invTransform;
		return n && yt(i, i, n), i
	}, se.transformCoordToGlobal = function(t, e) {
		var i = [t, e],
			n = this.transform;
		return n && yt(i, i, n), i
	}, oe.getLocalTransform = function(t, e) {
		re(e = e || []);
		var i = t.origin,
			n = t.scale || [1, 1],
			r = t.rotation || 0,
			a = t.position || [0, 0];
		return i && (e[4] -= i[0], e[5] -= i[1]), ee(e, e, n), r && te(e, e, r), i && (e[4] += i[0], e[5] += i[1]), e[4] +=
			a[0], e[5] += a[1], e
	};
	var ce = {
		linear: function(t) {
			return t
		},
		quadraticIn: function(t) {
			return t * t
		},
		quadraticOut: function(t) {
			return t * (2 - t)
		},
		quadraticInOut: function(t) {
			return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
		},
		cubicIn: function(t) {
			return t * t * t
		},
		cubicOut: function(t) {
			return --t * t * t + 1
		},
		cubicInOut: function(t) {
			return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
		},
		quarticIn: function(t) {
			return t * t * t * t
		},
		quarticOut: function(t) {
			return 1 - --t * t * t * t
		},
		quarticInOut: function(t) {
			return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
		},
		quinticIn: function(t) {
			return t * t * t * t * t
		},
		quinticOut: function(t) {
			return --t * t * t * t * t + 1
		},
		quinticInOut: function(t) {
			return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
		},
		sinusoidalIn: function(t) {
			return 1 - Math.cos(t * Math.PI / 2)
		},
		sinusoidalOut: function(t) {
			return Math.sin(t * Math.PI / 2)
		},
		sinusoidalInOut: function(t) {
			return .5 * (1 - Math.cos(Math.PI * t))
		},
		exponentialIn: function(t) {
			return 0 === t ? 0 : Math.pow(1024, t - 1)
		},
		exponentialOut: function(t) {
			return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
		},
		exponentialInOut: function(t) {
			return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
		},
		circularIn: function(t) {
			return 1 - Math.sqrt(1 - t * t)
		},
		circularOut: function(t) {
			return Math.sqrt(1 - --t * t)
		},
		circularInOut: function(t) {
			return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
		},
		elasticIn: function(t) {
			var e, i = .1;
			return 0 === t ? 0 : 1 === t ? 1 : (e = !i || i < 1 ? (i = 1, .1) : .4 * Math.asin(1 / i) / (2 * Math.PI), -i *
				Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4))
		},
		elasticOut: function(t) {
			var e, i = .1;
			return 0 === t ? 0 : 1 === t ? 1 : (e = !i || i < 1 ? (i = 1, .1) : .4 * Math.asin(1 / i) / (2 * Math.PI), i *
				Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / .4) + 1)
		},
		elasticInOut: function(t) {
			var e, i = .1;
			return 0 === t ? 0 : 1 === t ? 1 : (e = !i || i < 1 ? (i = 1, .1) : .4 * Math.asin(1 / i) / (2 * Math.PI), (t *=
				2) < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * -.5 : i * Math.pow(2, -10 *
				(t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * .5 + 1)
		},
		backIn: function(t) {
			return t * t * (2.70158 * t - 1.70158)
		},
		backOut: function(t) {
			return --t * t * (2.70158 * t + 1.70158) + 1
		},
		backInOut: function(t) {
			var e = 2.5949095;
			return (t *= 2) < 1 ? t * t * ((1 + e) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + e) * t + e) + 2)
		},
		bounceIn: function(t) {
			return 1 - ce.bounceOut(1 - t)
		},
		bounceOut: function(t) {
			return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ?
				7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
		},
		bounceInOut: function(t) {
			return t < .5 ? .5 * ce.bounceIn(2 * t) : .5 * ce.bounceOut(2 * t - 1) + .5
		}
	};

	function de(t) {
		this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, this._initialized = !1, this.loop =
			null != t.loop && t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this
			.ondestroy = t.ondestroy, this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1
	}
	de.prototype = {
		constructor: de,
		step: function(t, e) {
			if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), this._paused) this._pausedTime +=
				e;
			else {
				var i = (t - this._startTime - this._pausedTime) / this._life;
				if (!(i < 0)) {
					i = Math.min(i, 1);
					var n = this.easing,
						r = "string" == typeof n ? ce[n] : n,
						a = "function" == typeof r ? r(i) : i;
					return this.fire("frame", a), 1 === i ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0,
						"destroy") : null
				}
			}
		},
		restart: function(t) {
			var e = (t - this._startTime - this._pausedTime) % this._life;
			this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1
		},
		fire: function(t, e) {
			this[t = "on" + t] && this[t](this._target, e)
		},
		pause: function() {
			this._paused = !0
		},
		resume: function() {
			this._paused = !1
		}
	};

	function fe() {
		this.head = null, this.tail = null, this._len = 0
	}
	var pe = fe.prototype;
	pe.insert = function(t) {
		var e = new ve(t);
		return this.insertEntry(e), e
	}, pe.insertEntry = function(t) {
		this.head ? ((this.tail.next = t).prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this
			._len++
	}, pe.remove = function(t) {
		var e = t.prev,
			i = t.next;
		e ? e.next = i : this.head = i, i ? i.prev = e : this.tail = e, t.next = t.prev = null, this._len--
	}, pe.len = function() {
		return this._len
	}, pe.clear = function() {
		this.head = this.tail = null, this._len = 0
	};

	function ge(t) {
		this._list = new fe, this._map = {}, this._maxSize = t || 10, this._lastRemovedEntry = null
	}
	var ve = function(t) {
			this.value = t, this.next, this.prev
		},
		me = ge.prototype;
	me.put = function(t, e) {
		var i = this._list,
			n = this._map,
			r = null;
		if (null == n[t]) {
			var a = i.len(),
				o = this._lastRemovedEntry;
			if (a >= this._maxSize && 0 < a) {
				var s = i.head;
				i.remove(s), delete n[s.key], r = s.value, this._lastRemovedEntry = s
			}
			o ? o.value = e : o = new ve(e), o.key = t, i.insertEntry(o), n[t] = o
		}
		return r
	}, me.get = function(t) {
		var e = this._map[t],
			i = this._list;
		if (null != e) return e !== i.tail && (i.remove(e), i.insertEntry(e)), e.value
	}, me.clear = function() {
		this._list.clear(), this._map = {}
	};
	var ye = {
		transparent: [0, 0, 0, 0],
		aliceblue: [240, 248, 255, 1],
		antiquewhite: [250, 235, 215, 1],
		aqua: [0, 255, 255, 1],
		aquamarine: [127, 255, 212, 1],
		azure: [240, 255, 255, 1],
		beige: [245, 245, 220, 1],
		bisque: [255, 228, 196, 1],
		black: [0, 0, 0, 1],
		blanchedalmond: [255, 235, 205, 1],
		blue: [0, 0, 255, 1],
		blueviolet: [138, 43, 226, 1],
		brown: [165, 42, 42, 1],
		burlywood: [222, 184, 135, 1],
		cadetblue: [95, 158, 160, 1],
		chartreuse: [127, 255, 0, 1],
		chocolate: [210, 105, 30, 1],
		coral: [255, 127, 80, 1],
		cornflowerblue: [100, 149, 237, 1],
		cornsilk: [255, 248, 220, 1],
		crimson: [220, 20, 60, 1],
		cyan: [0, 255, 255, 1],
		darkblue: [0, 0, 139, 1],
		darkcyan: [0, 139, 139, 1],
		darkgoldenrod: [184, 134, 11, 1],
		darkgray: [169, 169, 169, 1],
		darkgreen: [0, 100, 0, 1],
		darkgrey: [169, 169, 169, 1],
		darkkhaki: [189, 183, 107, 1],
		darkmagenta: [139, 0, 139, 1],
		darkolivegreen: [85, 107, 47, 1],
		darkorange: [255, 140, 0, 1],
		darkorchid: [153, 50, 204, 1],
		darkred: [139, 0, 0, 1],
		darksalmon: [233, 150, 122, 1],
		darkseagreen: [143, 188, 143, 1],
		darkslateblue: [72, 61, 139, 1],
		darkslategray: [47, 79, 79, 1],
		darkslategrey: [47, 79, 79, 1],
		darkturquoise: [0, 206, 209, 1],
		darkviolet: [148, 0, 211, 1],
		deeppink: [255, 20, 147, 1],
		deepskyblue: [0, 191, 255, 1],
		dimgray: [105, 105, 105, 1],
		dimgrey: [105, 105, 105, 1],
		dodgerblue: [30, 144, 255, 1],
		firebrick: [178, 34, 34, 1],
		floralwhite: [255, 250, 240, 1],
		forestgreen: [34, 139, 34, 1],
		fuchsia: [255, 0, 255, 1],
		gainsboro: [220, 220, 220, 1],
		ghostwhite: [248, 248, 255, 1],
		gold: [255, 215, 0, 1],
		goldenrod: [218, 165, 32, 1],
		gray: [128, 128, 128, 1],
		green: [0, 128, 0, 1],
		greenyellow: [173, 255, 47, 1],
		grey: [128, 128, 128, 1],
		honeydew: [240, 255, 240, 1],
		hotpink: [255, 105, 180, 1],
		indianred: [205, 92, 92, 1],
		indigo: [75, 0, 130, 1],
		ivory: [255, 255, 240, 1],
		khaki: [240, 230, 140, 1],
		lavender: [230, 230, 250, 1],
		lavenderblush: [255, 240, 245, 1],
		lawngreen: [124, 252, 0, 1],
		lemonchiffon: [255, 250, 205, 1],
		lightblue: [173, 216, 230, 1],
		lightcoral: [240, 128, 128, 1],
		lightcyan: [224, 255, 255, 1],
		lightgoldenrodyellow: [250, 250, 210, 1],
		lightgray: [211, 211, 211, 1],
		lightgreen: [144, 238, 144, 1],
		lightgrey: [211, 211, 211, 1],
		lightpink: [255, 182, 193, 1],
		lightsalmon: [255, 160, 122, 1],
		lightseagreen: [32, 178, 170, 1],
		lightskyblue: [135, 206, 250, 1],
		lightslategray: [119, 136, 153, 1],
		lightslategrey: [119, 136, 153, 1],
		lightsteelblue: [176, 196, 222, 1],
		lightyellow: [255, 255, 224, 1],
		lime: [0, 255, 0, 1],
		limegreen: [50, 205, 50, 1],
		linen: [250, 240, 230, 1],
		magenta: [255, 0, 255, 1],
		maroon: [128, 0, 0, 1],
		mediumaquamarine: [102, 205, 170, 1],
		mediumblue: [0, 0, 205, 1],
		mediumorchid: [186, 85, 211, 1],
		mediumpurple: [147, 112, 219, 1],
		mediumseagreen: [60, 179, 113, 1],
		mediumslateblue: [123, 104, 238, 1],
		mediumspringgreen: [0, 250, 154, 1],
		mediumturquoise: [72, 209, 204, 1],
		mediumvioletred: [199, 21, 133, 1],
		midnightblue: [25, 25, 112, 1],
		mintcream: [245, 255, 250, 1],
		mistyrose: [255, 228, 225, 1],
		moccasin: [255, 228, 181, 1],
		navajowhite: [255, 222, 173, 1],
		navy: [0, 0, 128, 1],
		oldlace: [253, 245, 230, 1],
		olive: [128, 128, 0, 1],
		olivedrab: [107, 142, 35, 1],
		orange: [255, 165, 0, 1],
		orangered: [255, 69, 0, 1],
		orchid: [218, 112, 214, 1],
		palegoldenrod: [238, 232, 170, 1],
		palegreen: [152, 251, 152, 1],
		paleturquoise: [175, 238, 238, 1],
		palevioletred: [219, 112, 147, 1],
		papayawhip: [255, 239, 213, 1],
		peachpuff: [255, 218, 185, 1],
		peru: [205, 133, 63, 1],
		pink: [255, 192, 203, 1],
		plum: [221, 160, 221, 1],
		powderblue: [176, 224, 230, 1],
		purple: [128, 0, 128, 1],
		red: [255, 0, 0, 1],
		rosybrown: [188, 143, 143, 1],
		royalblue: [65, 105, 225, 1],
		saddlebrown: [139, 69, 19, 1],
		salmon: [250, 128, 114, 1],
		sandybrown: [244, 164, 96, 1],
		seagreen: [46, 139, 87, 1],
		seashell: [255, 245, 238, 1],
		sienna: [160, 82, 45, 1],
		silver: [192, 192, 192, 1],
		skyblue: [135, 206, 235, 1],
		slateblue: [106, 90, 205, 1],
		slategray: [112, 128, 144, 1],
		slategrey: [112, 128, 144, 1],
		snow: [255, 250, 250, 1],
		springgreen: [0, 255, 127, 1],
		steelblue: [70, 130, 180, 1],
		tan: [210, 180, 140, 1],
		teal: [0, 128, 128, 1],
		thistle: [216, 191, 216, 1],
		tomato: [255, 99, 71, 1],
		turquoise: [64, 224, 208, 1],
		violet: [238, 130, 238, 1],
		wheat: [245, 222, 179, 1],
		white: [255, 255, 255, 1],
		whitesmoke: [245, 245, 245, 1],
		yellow: [255, 255, 0, 1],
		yellowgreen: [154, 205, 50, 1]
	};

	function _e(t) {
		return (t = Math.round(t)) < 0 ? 0 : 255 < t ? 255 : t
	}

	function xe(t) {
		return t < 0 ? 0 : 1 < t ? 1 : t
	}

	function we(t) {
		return t.length && "%" === t.charAt(t.length - 1) ? _e(parseFloat(t) / 100 * 255) : _e(parseInt(t, 10))
	}

	function be(t) {
		return t.length && "%" === t.charAt(t.length - 1) ? xe(parseFloat(t) / 100) : xe(parseFloat(t))
	}

	function Se(t, e, i) {
		return i < 0 ? i += 1 : 1 < i && (i -= 1), 6 * i < 1 ? t + (e - t) * i * 6 : 2 * i < 1 ? e : 3 * i < 2 ? t + (e - t) *
			(2 / 3 - i) * 6 : t
	}

	function Me(t, e, i) {
		return t + (e - t) * i
	}

	function Ie(t, e, i, n, r) {
		return t[0] = e, t[1] = i, t[2] = n, t[3] = r, t
	}

	function Ce(t, e) {
		return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
	}
	var Ae = new ge(20),
		Te = null;

	function De(t, e) {
		Te && Ce(Te, e), Te = Ae.put(t, Te || e.slice())
	}

	function ke(t, e) {
		if (t) {
			e = e || [];
			var i = Ae.get(t);
			if (i) return Ce(e, i);
			var n, r = (t += "").replace(/ /g, "").toLowerCase();
			if (r in ye) return Ce(e, ye[r]), De(t, e), e;
			if ("#" === r.charAt(0)) return 4 === r.length ? 0 <= (n = parseInt(r.substr(1), 16)) && n <= 4095 ? (Ie(e, (3840 &
				n) >> 4 | (3840 & n) >> 8, 240 & n | (240 & n) >> 4, 15 & n | (15 & n) << 4, 1), De(t, e), e) : void Ie(e, 0, 0,
				0, 1) : 7 === r.length ? 0 <= (n = parseInt(r.substr(1), 16)) && n <= 16777215 ? (Ie(e, (16711680 & n) >> 16, (
				65280 & n) >> 8, 255 & n, 1), De(t, e), e) : void Ie(e, 0, 0, 0, 1) : void 0;
			var a = r.indexOf("("),
				o = r.indexOf(")");
			if (-1 !== a && o + 1 === r.length) {
				var s = r.substr(0, a),
					l = r.substr(a + 1, o - (a + 1)).split(","),
					h = 1;
				switch (s) {
					case "rgba":
						if (4 !== l.length) return void Ie(e, 0, 0, 0, 1);
						h = be(l.pop());
					case "rgb":
						return 3 !== l.length ? void Ie(e, 0, 0, 0, 1) : (Ie(e, we(l[0]), we(l[1]), we(l[2]), h), De(t, e), e);
					case "hsla":
						return 4 !== l.length ? void Ie(e, 0, 0, 0, 1) : (l[3] = be(l[3]), Pe(l, e), De(t, e), e);
					case "hsl":
						return 3 !== l.length ? void Ie(e, 0, 0, 0, 1) : (Pe(l, e), De(t, e), e);
					default:
						return
				}
			}
			Ie(e, 0, 0, 0, 1)
		}
	}

	function Pe(t, e) {
		var i = (parseFloat(t[0]) % 360 + 360) % 360 / 360,
			n = be(t[1]),
			r = be(t[2]),
			a = r <= .5 ? r * (n + 1) : r + n - r * n,
			o = 2 * r - a;
		return Ie(e = e || [], _e(255 * Se(o, a, i + 1 / 3)), _e(255 * Se(o, a, i)), _e(255 * Se(o, a, i - 1 / 3)), 1), 4 ===
			t.length && (e[3] = t[3]), e
	}

	function Le(t, e) {
		var i = ke(t);
		if (i) {
			for (var n = 0; n < 3; n++) i[n] = e < 0 ? i[n] * (1 - e) | 0 : (255 - i[n]) * e + i[n] | 0, 255 < i[n] ? i[n] =
				255 : t[n] < 0 && (i[n] = 0);
			return Ve(i, 4 === i.length ? "rgba" : "rgb")
		}
	}

	function Oe(t) {
		var e = ke(t);
		if (e) return ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1)
	}

	function ze(t, e, i) {
		if (e && e.length && 0 <= t && t <= 1) {
			i = i || [];
			var n = t * (e.length - 1),
				r = Math.floor(n),
				a = Math.ceil(n),
				o = e[r],
				s = e[a],
				l = n - r;
			return i[0] = _e(Me(o[0], s[0], l)), i[1] = _e(Me(o[1], s[1], l)), i[2] = _e(Me(o[2], s[2], l)), i[3] = xe(Me(o[3],
				s[3], l)), i
		}
	}
	var Ee = ze;

	function Ne(t, e, i) {
		if (e && e.length && 0 <= t && t <= 1) {
			var n = t * (e.length - 1),
				r = Math.floor(n),
				a = Math.ceil(n),
				o = ke(e[r]),
				s = ke(e[a]),
				l = n - r,
				h = Ve([_e(Me(o[0], s[0], l)), _e(Me(o[1], s[1], l)), _e(Me(o[2], s[2], l)), xe(Me(o[3], s[3], l))], "rgba");
			return i ? {
				color: h,
				leftIndex: r,
				rightIndex: a,
				value: n
			} : h
		}
	}
	var Re = Ne;

	function Be(t, e) {
		if ((t = ke(t)) && null != e) return t[3] = xe(e), Ve(t, "rgba")
	}

	function Ve(t, e) {
		if (t && t.length) {
			var i = t[0] + "," + t[1] + "," + t[2];
			return "rgba" !== e && "hsva" !== e && "hsla" !== e || (i += "," + t[3]), e + "(" + i + ")"
		}
	}
	var Fe = (Object.freeze || Object)({
			parse: ke,
			lift: Le,
			toHex: Oe,
			fastLerp: ze,
			fastMapToColor: Ee,
			lerp: Ne,
			mapToColor: Re,
			modifyHSL: function(t, e, i, n) {
				if (t = ke(t)) return t = function(t) {
					if (t) {
						var e, i, n = t[0] / 255,
							r = t[1] / 255,
							a = t[2] / 255,
							o = Math.min(n, r, a),
							s = Math.max(n, r, a),
							l = s - o,
							h = (s + o) / 2;
						if (0 == l) i = e = 0;
						else {
							i = h < .5 ? l / (s + o) : l / (2 - s - o);
							var u = ((s - n) / 6 + l / 2) / l,
								c = ((s - r) / 6 + l / 2) / l,
								d = ((s - a) / 6 + l / 2) / l;
							n === s ? e = d - c : r === s ? e = 1 / 3 + u - d : a === s && (e = 2 / 3 + c - u), e < 0 && (e += 1), 1 <
								e && (e -= 1)
						}
						var f = [360 * e, i, h];
						return null != t[3] && f.push(t[3]), f
					}
				}(t), null != e && (t[0] = function(t) {
					return (t = Math.round(t)) < 0 ? 0 : 360 < t ? 360 : t
				}(e)), null != i && (t[1] = be(i)), null != n && (t[2] = be(n)), Ve(Pe(t), "rgba")
			},
			modifyAlpha: Be,
			stringify: Ve
		}),
		He = Array.prototype.slice;

	function Ge(t, e) {
		return t[e]
	}

	function We(t, e, i) {
		t[e] = i
	}

	function Ze(t, e, i) {
		return (e - t) * i + t
	}

	function Ue(t, e, i) {
		return .5 < i ? e : t
	}

	function Xe(t, e, i, n, r) {
		var a = t.length;
		if (1 === r)
			for (var o = 0; o < a; o++) n[o] = Ze(t[o], e[o], i);
		else {
			var s = a && t[0].length;
			for (o = 0; o < a; o++)
				for (var l = 0; l < s; l++) n[o][l] = Ze(t[o][l], e[o][l], i)
		}
	}

	function Ye(t, e, i) {
		var n = t.length,
			r = e.length;
		if (n !== r)
			if (r < n) t.length = r;
			else
				for (var a = n; a < r; a++) t.push(1 === i ? e[a] : He.call(e[a]));
		var o = t[0] && t[0].length;
		for (a = 0; a < t.length; a++)
			if (1 === i) isNaN(t[a]) && (t[a] = e[a]);
			else
				for (var s = 0; s < o; s++) isNaN(t[a][s]) && (t[a][s] = e[a][s])
	}

	function je(t, e, i) {
		if (t === e) return !0;
		var n = t.length;
		if (n !== e.length) return !1;
		if (1 === i) {
			for (var r = 0; r < n; r++)
				if (t[r] !== e[r]) return !1
		} else {
			var a = t[0].length;
			for (r = 0; r < n; r++)
				for (var o = 0; o < a; o++)
					if (t[r][o] !== e[r][o]) return !1
		}
		return !0
	}

	function qe(t, e, i, n, r, a, o, s, l) {
		var h = t.length;
		if (1 === l)
			for (var u = 0; u < h; u++) s[u] = $e(t[u], e[u], i[u], n[u], r, a, o);
		else {
			var c = t[0].length;
			for (u = 0; u < h; u++)
				for (var d = 0; d < c; d++) s[u][d] = $e(t[u][d], e[u][d], i[u][d], n[u][d], r, a, o)
		}
	}

	function $e(t, e, i, n, r, a, o) {
		var s = .5 * (i - t),
			l = .5 * (n - e);
		return (2 * (e - i) + s + l) * o + (-3 * (e - i) - 2 * s - l) * a + s * r + e
	}

	function Ke(t) {
		if (L(t)) {
			var e = t.length;
			if (L(t[0])) {
				for (var i = [], n = 0; n < e; n++) i.push(He.call(t[n]));
				return i
			}
			return He.call(t)
		}
		return t
	}

	function Qe(t) {
		return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")"
	}

	function Je(t, e, i, n, a, r) {
		var o = t._getter,
			s = t._setter,
			l = "spline" === e,
			h = n.length;
		if (h) {
			var u, c = L(n[0].value),
				d = !1,
				f = !1,
				p = c ? function(t) {
					var e = t[t.length - 1].value;
					return L(e && e[0]) ? 2 : 1
				}(n) : 0;
			n.sort(function(t, e) {
				return t.time - e.time
			}), u = n[h - 1].time;
			for (var g = [], v = [], m = n[0].value, y = !0, _ = 0; _ < h; _++) {
				g.push(n[_].time / u);
				var x = n[_].value;
				if (c && je(x, m, p) || !c && x === m || (y = !1), "string" == typeof(m = x)) {
					var w = ke(x);
					w ? (x = w, d = !0) : f = !0
				}
				v.push(x)
			}
			if (r || !y) {
				var b = v[h - 1];
				for (_ = 0; _ < h - 1; _++) c ? Ye(v[_], b, p) : !isNaN(v[_]) || isNaN(b) || f || d || (v[_] = b);
				c && Ye(o(t._target, a), b, p);
				var S, M, I, C, A, T = 0,
					D = 0;
				if (d) var k = [0, 0, 0, 0];
				var P = new de({
					target: t._target,
					life: u,
					loop: t._loop,
					delay: t._delay,
					onframe: function(t, e) {
						var i;
						if (e < 0) i = 0;
						else if (e < D) {
							for (i = Math.min(T + 1, h - 1); 0 <= i && !(g[i] <= e); i--);
							i = Math.min(i, h - 2)
						} else {
							for (i = T; i < h && !(g[i] > e); i++);
							i = Math.min(i - 1, h - 2)
						}
						D = e;
						var n = g[(T = i) + 1] - g[i];
						if (0 != n)
							if (S = (e - g[i]) / n, l)
								if (I = v[i], M = v[0 === i ? i : i - 1], C = v[h - 2 < i ? h - 1 : i + 1], A = v[h - 3 < i ? h - 1 : i + 2],
									c) qe(M, I, C, A, S, S * S, S * S * S, o(t, a), p);
								else {
									if (d) r = qe(M, I, C, A, S, S * S, S * S * S, k, 1), r = Qe(k);
									else {
										if (f) return Ue(I, C, S);
										r = $e(M, I, C, A, S, S * S, S * S * S)
									}
									s(t, a, r)
								}
						else if (c) Xe(v[i], v[i + 1], S, o(t, a), p);
						else {
							var r;
							if (d) Xe(v[i], v[i + 1], S, k, 1), r = Qe(k);
							else {
								if (f) return Ue(v[i], v[i + 1], S);
								r = Ze(v[i], v[i + 1], S)
							}
							s(t, a, r)
						}
					},
					ondestroy: i
				});
				return e && "spline" !== e && (P.easing = e), P
			}
		}
	}

	function ti(t, e, i, n) {
		this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = i || Ge, this._setter = n || We, this._clipCount =
			0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
	}
	ti.prototype = {
		when: function(t, e) {
			var i = this._tracks;
			for (var n in e)
				if (e.hasOwnProperty(n)) {
					if (!i[n]) {
						i[n] = [];
						var r = this._getter(this._target, n);
						if (null == r) continue;
						0 !== t && i[n].push({
							time: 0,
							value: Ke(r)
						})
					}
					i[n].push({
						time: t,
						value: e[n]
					})
				} return this
		},
		during: function(t) {
			return this._onframeList.push(t), this
		},
		pause: function() {
			for (var t = 0; t < this._clipList.length; t++) this._clipList[t].pause();
			this._paused = !0
		},
		resume: function() {
			for (var t = 0; t < this._clipList.length; t++) this._clipList[t].resume();
			this._paused = !1
		},
		isPaused: function() {
			return !!this._paused
		},
		_doneCallback: function() {
			this._tracks = {}, this._clipList.length = 0;
			for (var t = this._doneList, e = t.length, i = 0; i < e; i++) t[i].call(this)
		},
		start: function(t, e) {
			function i() {
				--a || r._doneCallback()
			}
			var n, r = this,
				a = 0;
			for (var o in this._tracks)
				if (this._tracks.hasOwnProperty(o)) {
					var s = Je(this, t, i, this._tracks[o], o, e);
					s && (this._clipList.push(s), a++, this.animation && this.animation.addClip(s), n = s)
				} if (n) {
				var l = n.onframe;
				n.onframe = function(t, e) {
					l(t, e);
					for (var i = 0; i < r._onframeList.length; i++) r._onframeList[i](t, e)
				}
			}
			return a || this._doneCallback(), this
		},
		stop: function(t) {
			for (var e = this._clipList, i = this.animation, n = 0; n < e.length; n++) {
				var r = e[n];
				t && r.onframe(this._target, 1), i && i.removeClip(r)
			}
			e.length = 0
		},
		delay: function(t) {
			return this._delay = t, this
		},
		done: function(t) {
			return t && this._doneList.push(t), this
		},
		getClips: function() {
			return this._clipList
		}
	};
	var ei = 1;
	"undefined" != typeof window && (ei = Math.max(window.devicePixelRatio || 1, 1));
	var ii = ei,
		ni = function() {};

	function ri() {
		this.animators = []
	}
	var ai = ni;

	function oi(t, e, i, n, r, a, o, s) {
		E(n) ? (a = r, r = n, n = 0) : z(r) ? (a = r, r = "linear", n = 0) : z(n) ? (a = n, n = 0) : i = z(i) ? (a = i, 500) :
			i || 500, t.stopAnimation(),
			function t(e, i, n, r, a, o, s) {
				var l = {};
				var h = 0;
				for (var u in r) r.hasOwnProperty(u) && (null != n[u] ? N(r[u]) && !L(r[u]) ? t(e, i ? i + "." + u : u, n[u], r[u],
					a, o, s) : (s ? (l[u] = n[u], si(e, i, u, r[u])) : l[u] = r[u], h++) : null == r[u] || s || si(e, i, u, r[u]));
				0 < h && e.animate(i, !1).when(null == a ? 500 : a, l).delay(o || 0)
			}(t, "", t, e, i, n, s);
		var l = t.animators.slice(),
			h = l.length;

		function u() {
			--h || a && a()
		}
		h || a && a();
		for (var c = 0; c < l.length; c++) l[c].done(u).start(r, o)
	}

	function si(t, e, i, n) {
		if (e) {
			var r = {};
			r[e] = {}, r[e][i] = n, t.attr(r)
		} else t.attr(i, n)
	}
	ri.prototype = {
		constructor: ri,
		animate: function(t, e) {
			var i, n = !1,
				r = this,
				a = this.__zr;
			if (t) {
				var o = t.split("."),
					s = r;
				n = "shape" === o[0];
				for (var l = 0, h = o.length; l < h; l++) s = s && s[o[l]];
				s && (i = s)
			} else i = r;
			if (i) {
				var u = r.animators,
					c = new ti(i, e);
				return c.during(function(t) {
					r.dirty(n)
				}).done(function() {
					u.splice(x(u, c), 1)
				}), u.push(c), a && a.animation.addAnimator(c), c
			}
			ai('Property "' + t + '" is not existed in element ' + r.id)
		},
		stopAnimation: function(t) {
			for (var e = this.animators, i = e.length, n = 0; n < i; n++) e[n].stop(t);
			return e.length = 0, this
		},
		animateTo: function(t, e, i, n, r, a) {
			oi(this, t, e, i, n, r, a)
		},
		animateFrom: function(t, e, i, n, r, a) {
			oi(this, t, e, i, n, r, a, !0)
		}
	};
	var li = function(t) {
		oe.call(this, t), It.call(this, t), ri.call(this, t), this.id = t.id || n()
	};
	li.prototype = {
		type: "element",
		name: "",
		__zr: null,
		ignore: !1,
		clipPath: null,
		isGroup: !1,
		drift: function(t, e) {
			switch (this.draggable) {
				case "horizontal":
					e = 0;
					break;
				case "vertical":
					t = 0
			}
			var i = this.transform;
			(i = i || (this.transform = [1, 0, 0, 1, 0, 0]))[4] += t, i[5] += e, this.decomposeTransform(), this.dirty(!1)
		},
		beforeUpdate: function() {},
		afterUpdate: function() {},
		update: function() {
			this.updateTransform()
		},
		traverse: function(t, e) {},
		attrKV: function(t, e) {
			if ("position" === t || "scale" === t || "origin" === t) {
				if (e) {
					var i = this[t];
					(i = i || (this[t] = []))[0] = e[0], i[1] = e[1]
				}
			} else this[t] = e
		},
		hide: function() {
			this.ignore = !0, this.__zr && this.__zr.refresh()
		},
		show: function() {
			this.ignore = !1, this.__zr && this.__zr.refresh()
		},
		attr: function(t, e) {
			if ("string" == typeof t) this.attrKV(t, e);
			else if (N(t))
				for (var i in t) t.hasOwnProperty(i) && this.attrKV(i, t[i]);
			return this.dirty(!1), this
		},
		setClipPath: function(t) {
			var e = this.__zr;
			e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), (this.clipPath = t).__zr =
				e, (t.__clipTarget = this).dirty(!1)
		},
		removeClipPath: function() {
			var t = this.clipPath;
			t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, this.clipPath = null, this.dirty(
				!1))
		},
		addSelfToZr: function(t) {
			this.__zr = t;
			var e = this.animators;
			if (e)
				for (var i = 0; i < e.length; i++) t.animation.addAnimator(e[i]);
			this.clipPath && this.clipPath.addSelfToZr(t)
		},
		removeSelfFromZr: function(t) {
			this.__zr = null;
			var e = this.animators;
			if (e)
				for (var i = 0; i < e.length; i++) t.animation.removeAnimator(e[i]);
			this.clipPath && this.clipPath.removeSelfFromZr(t)
		}
	}, S(li, ri), S(li, oe), S(li, It);
	var hi, ui, ci, di, fi = yt,
		pi = Math.min,
		gi = Math.max;

	function vi(t, e, i, n) {
		i < 0 && (t += i, i = -i), n < 0 && (e += n, n = -n), this.x = t, this.y = e, this.width = i, this.height = n
	}
	vi.prototype = {
		constructor: vi,
		union: function(t) {
			var e = pi(t.x, this.x),
				i = pi(t.y, this.y);
			this.width = gi(t.x + t.width, this.x + this.width) - e, this.height = gi(t.y + t.height, this.y + this.height) -
				i, this.x = e, this.y = i
		},
		applyTransform: (hi = [], ui = [], ci = [], di = [], function(t) {
			if (t) {
				hi[0] = ci[0] = this.x, hi[1] = di[1] = this.y, ui[0] = di[0] = this.x + this.width, ui[1] = ci[1] = this.y +
					this.height, fi(hi, hi, t), fi(ui, ui, t), fi(ci, ci, t), fi(di, di, t), this.x = pi(hi[0], ui[0], ci[0], di[0]),
					this.y = pi(hi[1], ui[1], ci[1], di[1]);
				var e = gi(hi[0], ui[0], ci[0], di[0]),
					i = gi(hi[1], ui[1], ci[1], di[1]);
				this.width = e - this.x, this.height = i - this.y
			}
		}),
		calculateTransform: function(t) {
			var e = t.width / this.width,
				i = t.height / this.height,
				n = qt();
			return Jt(n, n, [-this.x, -this.y]), ee(n, n, [e, i]), Jt(n, n, [t.x, t.y]), n
		},
		intersect: function(t) {
			if (!t) return !1;
			t instanceof vi || (t = vi.create(t));
			var e = this,
				i = e.x,
				n = e.x + e.width,
				r = e.y,
				a = e.y + e.height,
				o = t.x,
				s = t.x + t.width,
				l = t.y,
				h = t.y + t.height;
			return !(n < o || s < i || a < l || h < r)
		},
		contain: function(t, e) {
			var i = this;
			return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height
		},
		clone: function() {
			return new vi(this.x, this.y, this.width, this.height)
		},
		copy: function(t) {
			this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
		},
		plain: function() {
			return {
				x: this.x,
				y: this.y,
				width: this.width,
				height: this.height
			}
		}
	}, vi.create = function(t) {
		return new vi(t.x, t.y, t.width, t.height)
	};
	var mi = function(t) {
		for (var e in t = t || {}, li.call(this, t), t) t.hasOwnProperty(e) && (this[e] = t[e]);
		this._children = [], this.__storage = null, this.__dirty = !0
	};
	mi.prototype = {
		constructor: mi,
		isGroup: !0,
		type: "group",
		silent: !1,
		children: function() {
			return this._children.slice()
		},
		childAt: function(t) {
			return this._children[t]
		},
		childOfName: function(t) {
			for (var e = this._children, i = 0; i < e.length; i++)
				if (e[i].name === t) return e[i]
		},
		childCount: function() {
			return this._children.length
		},
		add: function(t) {
			return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this
		},
		addBefore: function(t, e) {
			if (t && t !== this && t.parent !== this && e && e.parent === this) {
				var i = this._children,
					n = i.indexOf(e);
				0 <= n && (i.splice(n, 0, t), this._doAdd(t))
			}
			return this
		},
		_doAdd: function(t) {
			t.parent && t.parent.remove(t);
			var e = (t.parent = this).__storage,
				i = this.__zr;
			e && e !== t.__storage && (e.addToStorage(t), t instanceof mi && t.addChildrenToStorage(e)), i && i.refresh()
		},
		remove: function(t) {
			var e = this.__zr,
				i = this.__storage,
				n = this._children,
				r = x(n, t);
			return r < 0 || (n.splice(r, 1), t.parent = null, i && (i.delFromStorage(t), t instanceof mi && t.delChildrenFromStorage(
				i)), e && e.refresh()), this
		},
		removeAll: function() {
			var t, e, i = this._children,
				n = this.__storage;
			for (e = 0; e < i.length; e++) t = i[e], n && (n.delFromStorage(t), t instanceof mi && t.delChildrenFromStorage(n)),
				t.parent = null;
			return i.length = 0, this
		},
		eachChild: function(t, e) {
			for (var i = this._children, n = 0; n < i.length; n++) {
				var r = i[n];
				t.call(e, r, n)
			}
			return this
		},
		traverse: function(t, e) {
			for (var i = 0; i < this._children.length; i++) {
				var n = this._children[i];
				t.call(e, n), "group" === n.type && n.traverse(t, e)
			}
			return this
		},
		addChildrenToStorage: function(t) {
			for (var e = 0; e < this._children.length; e++) {
				var i = this._children[e];
				t.addToStorage(i), i instanceof mi && i.addChildrenToStorage(t)
			}
		},
		delChildrenFromStorage: function(t) {
			for (var e = 0; e < this._children.length; e++) {
				var i = this._children[e];
				t.delFromStorage(i), i instanceof mi && i.delChildrenFromStorage(t)
			}
		},
		dirty: function() {
			return this.__dirty = !0, this.__zr && this.__zr.refresh(), this
		},
		getBoundingRect: function(t) {
			for (var e = null, i = new vi(0, 0, 0, 0), n = t || this._children, r = [], a = 0; a < n.length; a++) {
				var o = n[a];
				if (!o.ignore && !o.invisible) {
					var s = o.getBoundingRect(),
						l = o.getLocalTransform(r);
					l ? (i.copy(s), i.applyTransform(l), (e = e || i.clone()).union(i)) : (e = e || s.clone()).union(s)
				}
			}
			return e || i
		}
	}, w(mi, li);
	var yi = 32,
		_i = 7;

	function xi(t, e, i, n) {
		var r = e + 1;
		if (r === i) return 1;
		if (n(t[r++], t[e]) < 0) {
			for (; r < i && n(t[r], t[r - 1]) < 0;) r++;
			! function(t, e, i) {
				i--;
				for (; e < i;) {
					var n = t[e];
					t[e++] = t[i], t[i--] = n
				}
			}(t, e, r)
		} else
			for (; r < i && 0 <= n(t[r], t[r - 1]);) r++;
		return r - e
	}

	function wi(t, e, i, n, r) {
		for (n === e && n++; n < i; n++) {
			for (var a, o = t[n], s = e, l = n; s < l;) r(o, t[a = s + l >>> 1]) < 0 ? l = a : s = 1 + a;
			var h = n - s;
			switch (h) {
				case 3:
					t[s + 3] = t[s + 2];
				case 2:
					t[s + 2] = t[s + 1];
				case 1:
					t[s + 1] = t[s];
					break;
				default:
					for (; 0 < h;) t[s + h] = t[s + h - 1], h--
			}
			t[s] = o
		}
	}

	function bi(t, e, i, n, r, a) {
		var o = 0,
			s = 0,
			l = 1;
		if (0 < a(t, e[i + r])) {
			for (s = n - r; l < s && 0 < a(t, e[i + r + l]);)(l = 1 + ((o = l) << 1)) <= 0 && (l = s);
			s < l && (l = s), o += r, l += r
		} else {
			for (s = r + 1; l < s && a(t, e[i + r - l]) <= 0;)(l = 1 + ((o = l) << 1)) <= 0 && (l = s);
			s < l && (l = s);
			var h = o;
			o = r - l, l = r - h
		}
		for (o++; o < l;) {
			var u = o + (l - o >>> 1);
			0 < a(t, e[i + u]) ? o = u + 1 : l = u
		}
		return l
	}

	function Si(t, e, i, n, r, a) {
		var o = 0,
			s = 0,
			l = 1;
		if (a(t, e[i + r]) < 0) {
			for (s = r + 1; l < s && a(t, e[i + r - l]) < 0;)(l = 1 + ((o = l) << 1)) <= 0 && (l = s);
			s < l && (l = s);
			var h = o;
			o = r - l, l = r - h
		} else {
			for (s = n - r; l < s && 0 <= a(t, e[i + r + l]);)(l = 1 + ((o = l) << 1)) <= 0 && (l = s);
			s < l && (l = s), o += r, l += r
		}
		for (o++; o < l;) {
			var u = o + (l - o >>> 1);
			a(t, e[i + u]) < 0 ? l = u : o = u + 1
		}
		return l
	}

	function Mi(p, g) {
		var o, s, v = _i,
			l = 0,
			m = [];

		function e(t) {
			var e = o[t],
				i = s[t],
				n = o[t + 1],
				r = s[t + 1];
			s[t] = i + r, t === l - 3 && (o[t + 1] = o[t + 2], s[t + 1] = s[t + 2]), l--;
			var a = Si(p[n], p, e, i, 0, g);
			e += a, 0 !== (i -= a) && 0 !== (r = bi(p[e + i - 1], p, n, r, r - 1, g)) && (i <= r ? function(t, e, i, n) {
				var r = 0;
				for (r = 0; r < e; r++) m[r] = p[t + r];
				var a = 0,
					o = i,
					s = t;
				if (p[s++] = p[o++], 0 == --n) {
					for (r = 0; r < e; r++) p[s + r] = m[a + r];
					return
				}
				if (1 === e) {
					for (r = 0; r < n; r++) p[s + r] = p[o + r];
					return p[s + n] = m[a]
				}
				var l, h, u, c = v;
				for (;;) {
					h = l = 0, u = !1;
					do {
						if (g(p[o], m[a]) < 0) {
							if (p[s++] = p[o++], h++, (l = 0) == --n) {
								u = !0;
								break
							}
						} else if (p[s++] = m[a++], l++, h = 0, 1 == --e) {
							u = !0;
							break
						}
					} while ((l | h) < c);
					if (u) break;
					do {
						if (0 !== (l = Si(p[o], m, a, e, 0, g))) {
							for (r = 0; r < l; r++) p[s + r] = m[a + r];
							if (s += l, a += l, (e -= l) <= 1) {
								u = !0;
								break
							}
						}
						if (p[s++] = p[o++], 0 == --n) {
							u = !0;
							break
						}
						if (0 !== (h = bi(m[a], p, o, n, 0, g))) {
							for (r = 0; r < h; r++) p[s + r] = p[o + r];
							if (s += h, o += h, 0 === (n -= h)) {
								u = !0;
								break
							}
						}
						if (p[s++] = m[a++], 1 == --e) {
							u = !0;
							break
						}
						c--
					} while (_i <= l || _i <= h);
					if (u) break;
					c < 0 && (c = 0), c += 2
				}
				if ((v = c) < 1 && (v = 1), 1 === e) {
					for (r = 0; r < n; r++) p[s + r] = p[o + r];
					p[s + n] = m[a]
				} else {
					if (0 === e) throw new Error;
					for (r = 0; r < e; r++) p[s + r] = m[a + r]
				}
			}(e, i, n, r) : function(t, e, i, n) {
				var r = 0;
				for (r = 0; r < n; r++) m[r] = p[i + r];
				var a = t + e - 1,
					o = n - 1,
					s = i + n - 1,
					l = 0,
					h = 0;
				if (p[s--] = p[a--], 0 == --e) {
					for (l = s - (n - 1), r = 0; r < n; r++) p[l + r] = m[r];
					return
				}
				if (1 === n) {
					for (h = (s -= e) + 1, l = (a -= e) + 1, r = e - 1; 0 <= r; r--) p[h + r] = p[l + r];
					return p[s] = m[o]
				}
				var u = v;
				for (;;) {
					var c = 0,
						d = 0,
						f = !1;
					do {
						if (g(m[o], p[a]) < 0) {
							if (p[s--] = p[a--], c++, (d = 0) == --e) {
								f = !0;
								break
							}
						} else if (p[s--] = m[o--], d++, c = 0, 1 == --n) {
							f = !0;
							break
						}
					} while ((c | d) < u);
					if (f) break;
					do {
						if (0 !== (c = e - Si(m[o], p, t, e, e - 1, g))) {
							for (e -= c, h = (s -= c) + 1, l = (a -= c) + 1, r = c - 1; 0 <= r; r--) p[h + r] = p[l + r];
							if (0 === e) {
								f = !0;
								break
							}
						}
						if (p[s--] = m[o--], 1 == --n) {
							f = !0;
							break
						}
						if (0 !== (d = n - bi(p[a], m, 0, n, n - 1, g))) {
							for (n -= d, h = (s -= d) + 1, l = (o -= d) + 1, r = 0; r < d; r++) p[h + r] = m[l + r];
							if (n <= 1) {
								f = !0;
								break
							}
						}
						if (p[s--] = p[a--], 0 == --e) {
							f = !0;
							break
						}
						u--
					} while (_i <= c || _i <= d);
					if (f) break;
					u < 0 && (u = 0), u += 2
				}(v = u) < 1 && (v = 1);
				if (1 === n) {
					for (h = (s -= e) + 1, l = (a -= e) + 1, r = e - 1; 0 <= r; r--) p[h + r] = p[l + r];
					p[s] = m[o]
				} else {
					if (0 === n) throw new Error;
					for (l = s - (n - 1), r = 0; r < n; r++) p[l + r] = m[r]
				}
			}(e, i, n, r))
		}
		o = [], s = [], this.mergeRuns = function() {
			for (; 1 < l;) {
				var t = l - 2;
				if (1 <= t && s[t - 1] <= s[t] + s[t + 1] || 2 <= t && s[t - 2] <= s[t] + s[t - 1]) s[t - 1] < s[t + 1] && t--;
				else if (s[t] > s[t + 1]) break;
				e(t)
			}
		}, this.forceMergeRuns = function() {
			for (; 1 < l;) {
				var t = l - 2;
				0 < t && s[t - 1] < s[t + 1] && t--, e(t)
			}
		}, this.pushRun = function(t, e) {
			o[l] = t, s[l] = e, l += 1
		}
	}

	function Ii(t, e, i, n) {
		i = i || 0;
		var r = (n = n || t.length) - i;
		if (!(r < 2)) {
			var a = 0;
			if (r < yi) wi(t, i, n, i + (a = xi(t, i, n, e)), e);
			else {
				var o = new Mi(t, e),
					s = function(t) {
						for (var e = 0; yi <= t;) e |= 1 & t, t >>= 1;
						return t + e
					}(r);
				do {
					if ((a = xi(t, i, n, e)) < s) {
						var l = r;
						s < l && (l = s), wi(t, i, i + l, i + a, e), a = l
					}
					o.pushRun(i, a), o.mergeRuns(), r -= a, i += a
				} while (0 !== r);
				o.forceMergeRuns()
			}
		}
	}

	function Ci(t, e) {
		return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel
	}

	function Ai() {
		this._roots = [], this._displayList = [], this._displayListLen = 0
	}
	Ai.prototype = {
		constructor: Ai,
		traverse: function(t, e) {
			for (var i = 0; i < this._roots.length; i++) this._roots[i].traverse(t, e)
		},
		getDisplayList: function(t, e) {
			return e = e || !1, t && this.updateDisplayList(e), this._displayList
		},
		updateDisplayList: function(t) {
			this._displayListLen = 0;
			for (var e = this._roots, i = this._displayList, n = 0, r = e.length; n < r; n++) this._updateAndAddDisplayable(e[
				n], null, t);
			i.length = this._displayListLen, m.canvasSupported && Ii(i, Ci)
		},
		_updateAndAddDisplayable: function(t, e, i) {
			if (!t.ignore || i) {
				t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();
				var n = t.clipPath;
				if (n) {
					e = e ? e.slice() : [];
					for (var r = n, a = t; r;) r.parent = a, r.updateTransform(), e.push(r), r = (a = r).clipPath
				}
				if (t.isGroup) {
					for (var o = t._children, s = 0; s < o.length; s++) {
						var l = o[s];
						t.__dirty && (l.__dirty = !0), this._updateAndAddDisplayable(l, e, i)
					}
					t.__dirty = !1
				} else t.__clipPaths = e, this._displayList[this._displayListLen++] = t
			}
		},
		addRoot: function(t) {
			t.__storage !== this && (t instanceof mi && t.addChildrenToStorage(this), this.addToStorage(t), this._roots.push(
				t))
		},
		delRoot: function(t) {
			if (null == t) {
				for (var e = 0; e < this._roots.length; e++) {
					var i = this._roots[e];
					i instanceof mi && i.delChildrenFromStorage(this)
				}
				return this._roots = [], this._displayList = [], void(this._displayListLen = 0)
			}
			if (t instanceof Array) {
				e = 0;
				for (var n = t.length; e < n; e++) this.delRoot(t[e])
			} else {
				var r = x(this._roots, t);
				0 <= r && (this.delFromStorage(t), this._roots.splice(r, 1), t instanceof mi && t.delChildrenFromStorage(this))
			}
		},
		addToStorage: function(t) {
			return t && (t.__storage = this, t.dirty(!1)), this
		},
		delFromStorage: function(t) {
			return t && (t.__storage = null), this
		},
		dispose: function() {
			this._renderList = this._roots = null
		},
		displayableSortFunc: Ci
	};
	var Ti = {
			shadowBlur: 1,
			shadowOffsetX: 1,
			shadowOffsetY: 1,
			textShadowBlur: 1,
			textShadowOffsetX: 1,
			textShadowOffsetY: 1,
			textBoxShadowBlur: 1,
			textBoxShadowOffsetX: 1,
			textBoxShadowOffsetY: 1
		},
		Di = function(t, e, i) {
			return Ti.hasOwnProperty(e) ? i * t.dpr : i
		},
		ki = {
			NONE: 0,
			STYLE_BIND: 1,
			PLAIN_TEXT: 2
		},
		Pi = 9,
		Li = [
			["shadowBlur", 0],
			["shadowOffsetX", 0],
			["shadowOffsetY", 0],
			["shadowColor", "#000"],
			["lineCap", "butt"],
			["lineJoin", "miter"],
			["miterLimit", 10]
		],
		Oi = function(t) {
			this.extendFrom(t, !1)
		};

	function zi(t, e, i) {
		var n = null == e.x ? 0 : e.x,
			r = null == e.x2 ? 1 : e.x2,
			a = null == e.y ? 0 : e.y,
			o = null == e.y2 ? 0 : e.y2;
		return e.global || (n = n * i.width + i.x, r = r * i.width + i.x, a = a * i.height + i.y, o = o * i.height + i.y), n =
			isNaN(n) ? 0 : n, r = isNaN(r) ? 1 : r, a = isNaN(a) ? 0 : a, o = isNaN(o) ? 0 : o, t.createLinearGradient(n, a, r,
				o)
	}

	function Ei(t, e, i) {
		var n = i.width,
			r = i.height,
			a = Math.min(n, r),
			o = null == e.x ? .5 : e.x,
			s = null == e.y ? .5 : e.y,
			l = null == e.r ? .5 : e.r;
		return e.global || (o = o * n + i.x, s = s * r + i.y, l *= a), t.createRadialGradient(o, s, 0, o, s, l)
	}
	Oi.prototype = {
		constructor: Oi,
		fill: "#000",
		stroke: null,
		opacity: 1,
		fillOpacity: null,
		strokeOpacity: null,
		lineDash: null,
		lineDashOffset: 0,
		shadowBlur: 0,
		shadowOffsetX: 0,
		shadowOffsetY: 0,
		lineWidth: 1,
		strokeNoScale: !1,
		text: null,
		font: null,
		textFont: null,
		fontStyle: null,
		fontWeight: null,
		fontSize: null,
		fontFamily: null,
		textTag: null,
		textFill: "#000",
		textStroke: null,
		textWidth: null,
		textHeight: null,
		textStrokeWidth: 0,
		textLineHeight: null,
		textPosition: "inside",
		textRect: null,
		textOffset: null,
		textAlign: null,
		textVerticalAlign: null,
		textDistance: 5,
		textShadowColor: "transparent",
		textShadowBlur: 0,
		textShadowOffsetX: 0,
		textShadowOffsetY: 0,
		textBoxShadowColor: "transparent",
		textBoxShadowBlur: 0,
		textBoxShadowOffsetX: 0,
		textBoxShadowOffsetY: 0,
		transformText: !1,
		textRotation: 0,
		textOrigin: null,
		textBackgroundColor: null,
		textBorderColor: null,
		textBorderWidth: 0,
		textBorderRadius: 0,
		textPadding: null,
		rich: null,
		truncate: null,
		blend: null,
		bind: function(t, e, i) {
			var n = this,
				r = i && i.style,
				a = !r || t.__attrCachedBy !== ki.STYLE_BIND;
			t.__attrCachedBy = ki.STYLE_BIND;
			for (var o = 0; o < Li.length; o++) {
				var s = Li[o],
					l = s[0];
				!a && n[l] === r[l] || (t[l] = Di(t, l, n[l] || s[1]))
			}
			if (!a && n.fill === r.fill || (t.fillStyle = n.fill), !a && n.stroke === r.stroke || (t.strokeStyle = n.stroke),
				!a && n.opacity === r.opacity || (t.globalAlpha = null == n.opacity ? 1 : n.opacity), !a && n.blend === r.blend ||
				(t.globalCompositeOperation = n.blend || "source-over"), this.hasStroke()) {
				var h = n.lineWidth;
				t.lineWidth = h / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1)
			}
		},
		hasFill: function() {
			var t = this.fill;
			return null != t && "none" !== t
		},
		hasStroke: function() {
			var t = this.stroke;
			return null != t && "none" !== t && 0 < this.lineWidth
		},
		extendFrom: function(t, e) {
			if (t)
				for (var i in t) !t.hasOwnProperty(i) || !0 !== e && (!1 === e ? this.hasOwnProperty(i) : null == t[i]) || (this[
					i] = t[i])
		},
		set: function(t, e) {
			"string" == typeof t ? this[t] = e : this.extendFrom(t, !0)
		},
		clone: function() {
			var t = new this.constructor;
			return t.extendFrom(this, !0), t
		},
		getGradient: function(t, e, i) {
			for (var n = ("radial" === e.type ? Ei : zi)(t, e, i), r = e.colorStops, a = 0; a < r.length; a++) n.addColorStop(
				r[a].offset, r[a].color);
			return n
		}
	};
	for (var Ni = Oi.prototype, Ri = 0; Ri < Li.length; Ri++) {
		var Bi = Li[Ri];
		Bi[0] in Ni || (Ni[Bi[0]] = Bi[1])
	}
	Oi.getGradient = Ni.getGradient;

	function Vi(t, e) {
		this.image = t, this.repeat = e, this.type = "pattern"
	}

	function Fi() {
		return !1
	}

	function Hi(t, e, i) {
		var n = g(),
			r = e.getWidth(),
			a = e.getHeight(),
			o = n.style;
		return o && (o.position = "absolute", o.left = 0, o.top = 0, o.width = r + "px", o.height = a + "px", n.setAttribute(
			"data-zr-dom-id", t)), n.width = r * i, n.height = a * i, n
	}

	function Gi(t, e, i) {
		var n;
		i = i || ii, "string" == typeof t ? n = Hi(t, e, i) : N(t) && (t = (n = t).id), this.id = t;
		var r = (this.dom = n).style;
		r && (n.onselectstart = Fi, r["-webkit-user-select"] = "none", r["user-select"] = "none", r["-webkit-touch-callout"] =
				"none", r["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", r.padding = 0, r.margin = 0, r["border-width"] = 0),
			this.domBack = null, this.ctxBack = null, this.painter = e, this.config = null, this.clearColor = 0, this.motionBlur = !
			1, this.lastFrameAlpha = .7, this.dpr = i
	}
	Gi.prototype = {
		constructor: Gi,
		__dirty: !0,
		__used: !(Vi.prototype.getCanvasPattern = function(t) {
			return t.createPattern(this.image, this.repeat || "repeat")
		}),
		__drawIndex: 0,
		__startIndex: 0,
		__endIndex: 0,
		incremental: !1,
		getElementCount: function() {
			return this.__endIndex - this.__startIndex
		},
		initContext: function() {
			this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr
		},
		createBackBuffer: function() {
			var t = this.dpr;
			this.domBack = Hi("back-" + this.id, this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 1 !== t &&
				this.ctxBack.scale(t, t)
		},
		resize: function(t, e) {
			var i = this.dpr,
				n = this.dom,
				r = n.style,
				a = this.domBack;
			r && (r.width = t + "px", r.height = e + "px"), n.width = t * i, n.height = e * i, a && (a.width = t * i, a.height =
				e * i, 1 !== i && this.ctxBack.scale(i, i))
		},
		clear: function(t, e) {
			var i, n = this.dom,
				r = this.ctx,
				a = n.width,
				o = n.height,
				s = (e = e || this.clearColor, this.motionBlur && !t),
				l = this.lastFrameAlpha,
				h = this.dpr;
			s && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(
				n, 0, 0, a / h, o / h)), r.clearRect(0, 0, a, o), e && "transparent" !== e && (e.colorStops ? (i = e.__canvasGradient ||
					Oi.getGradient(r, e, {
						x: 0,
						y: 0,
						width: a,
						height: o
					}), e.__canvasGradient = i) : e.image && (i = Vi.prototype.getCanvasPattern.call(e, r)), r.save(), r.fillStyle =
				i || e, r.fillRect(0, 0, a, o), r.restore());
			if (s) {
				var u = this.domBack;
				r.save(), r.globalAlpha = l, r.drawImage(u, 0, 0, a, o), r.restore()
			}
		}
	};
	var Wi = "undefined" != typeof window && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) ||
			window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame) || function(t) {
			setTimeout(t, 16)
		},
		Zi = new ge(50);

	function Ui(t) {
		if ("string" != typeof t) return t;
		var e = Zi.get(t);
		return e && e.image
	}

	function Xi(t, e, i, n, r) {
		if (t) {
			if ("string" != typeof t) return t;
			if (e && e.__zrImageSrc === t || !i) return e;
			var a = Zi.get(t),
				o = {
					hostEl: i,
					cb: n,
					cbPayload: r
				};
			return a ? ji(e = a.image) || a.pending.push(o) : ((e = new Image).onload = e.onerror = Yi, Zi.put(t, e.__cachedImgObj = {
				image: e,
				pending: [o]
			}), e.src = e.__zrImageSrc = t), e
		}
		return e
	}

	function Yi() {
		var t = this.__cachedImgObj;
		this.onload = this.onerror = this.__cachedImgObj = null;
		for (var e = 0; e < t.pending.length; e++) {
			var i = t.pending[e],
				n = i.cb;
			n && n(this, i.cbPayload), i.hostEl.dirty()
		}
		t.pending.length = 0
	}

	function ji(t) {
		return t && t.width && t.height
	}
	var qi = {},
		$i = 0,
		Ki = 5e3,
		Qi = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,
		Ji = "12px sans-serif",
		tn = {};

	function en(t, e) {
		var i = t + ":" + (e = e || Ji);
		if (qi[i]) return qi[i];
		for (var n, r, a = (t + "").split("\n"), o = 0, s = 0, l = a.length; s < l; s++) o = Math.max((n = a[s], r = e, tn.measureText(
			n, r)).width, o);
		return Ki < $i && ($i = 0, qi = {}), $i++, qi[i] = o
	}

	function nn(t, e, i, n, r, a, o, s) {
		return o ? function(t, e, i, n, r, a, o, s) {
			var l = fn(t, {
					rich: o,
					truncate: s,
					font: e,
					textAlign: i,
					textPadding: r,
					textLineHeight: a
				}),
				h = l.outerWidth,
				u = l.outerHeight,
				c = rn(0, h, i),
				d = an(0, u, n);
			return new vi(c, d, h, u)
		}(t, e, i, n, r, a, o, s) : function(t, e, i, n, r, a, o) {
			var s = dn(t, e, r, a, o),
				l = en(t, e);
			r && (l += r[1] + r[3]);
			var h = s.outerHeight,
				u = rn(0, l, i),
				c = an(0, h, n),
				d = new vi(u, c, l, h);
			return d.lineHeight = s.lineHeight, d
		}(t, e, i, n, r, a, s)
	}

	function rn(t, e, i) {
		return "right" === i ? t -= e : "center" === i && (t -= e / 2), t
	}

	function an(t, e, i) {
		return "middle" === i ? t -= e / 2 : "bottom" === i && (t -= e), t
	}

	function on(t, e, i) {
		var n = e.textPosition,
			r = e.textDistance,
			a = i.x,
			o = i.y;
		r = r || 0;
		var s = i.height,
			l = i.width,
			h = s / 2,
			u = "left",
			c = "top";
		switch (n) {
			case "left":
				a -= r, o += h, u = "right", c = "middle";
				break;
			case "right":
				a += r + l, o += h, c = "middle";
				break;
			case "top":
				a += l / 2, o -= r, u = "center", c = "bottom";
				break;
			case "bottom":
				a += l / 2, o += s + r, u = "center";
				break;
			case "inside":
				a += l / 2, o += h, u = "center", c = "middle";
				break;
			case "insideLeft":
				a += r, o += h, c = "middle";
				break;
			case "insideRight":
				a += l - r, o += h, u = "right", c = "middle";
				break;
			case "insideTop":
				a += l / 2, o += r, u = "center";
				break;
			case "insideBottom":
				a += l / 2, o += s - r, u = "center", c = "bottom";
				break;
			case "insideTopLeft":
				a += r, o += r;
				break;
			case "insideTopRight":
				a += l - r, o += r, u = "right";
				break;
			case "insideBottomLeft":
				a += r, o += s - r, c = "bottom";
				break;
			case "insideBottomRight":
				a += l - r, o += s - r, u = "right", c = "bottom"
		}
		return (t = t || {}).x = a, t.y = o, t.textAlign = u, t.textVerticalAlign = c, t
	}

	function sn(t, e, i, n, r) {
		if (!e) return "";
		var a = (t + "").split("\n");
		r = ln(e, i, n, r);
		for (var o = 0, s = a.length; o < s; o++) a[o] = hn(a[o], r);
		return a.join("\n")
	}

	function ln(t, e, i, n) {
		(n = k({}, n)).font = e;
		i = G(i, "...");
		n.maxIterations = G(n.maxIterations, 2);
		var r = n.minChar = G(n.minChar, 0);
		n.cnCharWidth = en("国", e);
		var a = n.ascCharWidth = en("a", e);
		n.placeholder = G(n.placeholder, "");
		for (var o = t = Math.max(0, t - 1), s = 0; s < r && a <= o; s++) o -= a;
		var l = en(i, e);
		return o < l && (i = "", l = 0), o = t - l, n.ellipsis = i, n.ellipsisWidth = l, n.contentWidth = o, n.containerWidth =
			t, n
	}

	function hn(t, e) {
		var i = e.containerWidth,
			n = e.font,
			r = e.contentWidth;
		if (!i) return "";
		var a = en(t, n);
		if (a <= i) return t;
		for (var o = 0;; o++) {
			if (a <= r || o >= e.maxIterations) {
				t += e.ellipsis;
				break
			}
			var s = 0 === o ? un(t, r, e.ascCharWidth, e.cnCharWidth) : 0 < a ? Math.floor(t.length * r / a) : 0;
			a = en(t = t.substr(0, s), n)
		}
		return "" === t && (t = e.placeholder), t
	}

	function un(t, e, i, n) {
		for (var r = 0, a = 0, o = t.length; a < o && r < e; a++) {
			var s = t.charCodeAt(a);
			r += 0 <= s && s <= 127 ? i : n
		}
		return a
	}

	function cn(t) {
		return en("国", t)
	}

	function dn(t, e, i, n, r) {
		null != t && (t += "");
		var a = G(n, cn(e)),
			o = t ? t.split("\n") : [],
			s = o.length * a,
			l = s,
			h = !0;
		if (i && (l += i[0] + i[2]), t && r) {
			h = !1;
			var u = r.outerHeight,
				c = r.outerWidth;
			if (null != u && u < l) t = "", o = [];
			else if (null != c)
				for (var d = ln(c - (i ? i[1] + i[3] : 0), e, r.ellipsis, {
						minChar: r.minChar,
						placeholder: r.placeholder
					}), f = 0, p = o.length; f < p; f++) o[f] = hn(o[f], d)
		}
		return {
			lines: o,
			height: s,
			outerHeight: l,
			lineHeight: a,
			canCacheByTextString: h
		}
	}

	function fn(t, e) {
		var i = {
			lines: [],
			width: 0,
			height: 0
		};
		if (null != t && (t += ""), !t) return i;
		for (var n, r = Qi.lastIndex = 0; null != (n = Qi.exec(t));) {
			var a = n.index;
			r < a && pn(i, t.substring(r, a)), pn(i, n[2], n[1]), r = Qi.lastIndex
		}
		r < t.length && pn(i, t.substring(r, t.length));
		var o = i.lines,
			s = 0,
			l = 0,
			h = [],
			u = e.textPadding,
			c = e.truncate,
			d = c && c.outerWidth,
			f = c && c.outerHeight;
		u && (null != d && (d -= u[1] + u[3]), null != f && (f -= u[0] + u[2]));
		for (var p = 0; p < o.length; p++) {
			for (var g = o[p], v = 0, m = 0, y = 0; y < g.tokens.length; y++) {
				var _ = (D = g.tokens[y]).styleName && e.rich[D.styleName] || {},
					x = D.textPadding = _.textPadding,
					w = D.font = _.font || e.font,
					b = D.textHeight = G(_.textHeight, cn(w));
				if (x && (b += x[0] + x[2]), D.height = b, D.lineHeight = W(_.textLineHeight, e.textLineHeight, b), D.textAlign =
					_ && _.textAlign || e.textAlign, D.textVerticalAlign = _ && _.textVerticalAlign || "middle", null != f && s + D.lineHeight >
					f) return {
					lines: [],
					width: 0,
					height: 0
				};
				D.textWidth = en(D.text, w);
				var S = _.textWidth,
					M = null == S || "auto" === S;
				if ("string" == typeof S && "%" === S.charAt(S.length - 1)) D.percentWidth = S, h.push(D), S = 0;
				else {
					if (M) {
						S = D.textWidth;
						var I = _.textBackgroundColor,
							C = I && I.image;
						C && ji(C = Ui(C)) && (S = Math.max(S, C.width * b / C.height))
					}
					var A = x ? x[1] + x[3] : 0;
					S += A;
					var T = null != d ? d - m : null;
					null != T && T < S && (!M || T < A ? (D.text = "", D.textWidth = S = 0) : (D.text = sn(D.text, T - A, w, c.ellipsis, {
						minChar: c.minChar
					}), D.textWidth = en(D.text, w), S = D.textWidth + A))
				}
				m += D.width = S, _ && (v = Math.max(v, D.lineHeight))
			}
			g.width = m, s += g.lineHeight = v, l = Math.max(l, m)
		}
		i.outerWidth = i.width = G(e.textWidth, l), i.outerHeight = i.height = G(e.textHeight, s), u && (i.outerWidth += u[1] +
			u[3], i.outerHeight += u[0] + u[2]);
		for (p = 0; p < h.length; p++) {
			var D, k = (D = h[p]).percentWidth;
			D.width = parseInt(k, 10) / 100 * l
		}
		return i
	}

	function pn(t, e, i) {
		for (var n = "" === e, r = e.split("\n"), a = t.lines, o = 0; o < r.length; o++) {
			var s = r[o],
				l = {
					styleName: i,
					text: s,
					isLineHolder: !s && !n
				};
			if (o) a.push({
				tokens: [l]
			});
			else {
				var h = (a[a.length - 1] || (a[0] = {
						tokens: []
					})).tokens,
					u = h.length;
				1 === u && h[0].isLineHolder ? h[0] = l : !s && u && !n || h.push(l)
			}
		}
	}

	function gn(t) {
		var e = (t.fontSize || t.fontFamily) && [t.fontStyle, t.fontWeight, (t.fontSize || 12) + "px", t.fontFamily ||
			"sans-serif"
		].join(" ");
		return e && Y(e) || t.textFont || t.font
	}

	function vn(t, e) {
		var i, n, r, a, o, s = e.x,
			l = e.y,
			h = e.width,
			u = e.height,
			c = e.r;
		h < 0 && (s += h, h = -h), u < 0 && (l += u, u = -u), "number" == typeof c ? i = n = r = a = c : c instanceof Array ?
			1 === c.length ? i = n = r = a = c[0] : 2 === c.length ? (i = r = c[0], n = a = c[1]) : 3 === c.length ? (i = c[0],
				n = a = c[1], r = c[2]) : (i = c[0], n = c[1], r = c[2], a = c[3]) : i = n = r = a = 0, h < i + n && (i *= h / (o =
				i + n), n *= h / o), h < r + a && (r *= h / (o = r + a), a *= h / o), u < n + r && (n *= u / (o = n + r), r *= u /
				o), u < i + a && (i *= u / (o = i + a), a *= u / o), t.moveTo(s + i, l), t.lineTo(s + h - n, l), 0 !== n && t.arc(
				s + h - n, l + n, n, -Math.PI / 2, 0), t.lineTo(s + h, l + u - r), 0 !== r && t.arc(s + h - r, l + u - r, r, 0,
				Math.PI / 2), t.lineTo(s + a, l + u), 0 !== a && t.arc(s + a, l + u - a, a, Math.PI / 2, Math.PI), t.lineTo(s, l +
				i), 0 !== i && t.arc(s + i, l + i, i, Math.PI, 1.5 * Math.PI)
	}
	tn.measureText = function(t, e) {
		var i = _();
		return i.font = e || Ji, i.measureText(t)
	};
	var mn = Ji,
		yn = {
			left: 1,
			right: 1,
			center: 1
		},
		_n = {
			top: 1,
			bottom: 1,
			middle: 1
		},
		xn = [
			["textShadowBlur", "shadowBlur", 0],
			["textShadowOffsetX", "shadowOffsetX", 0],
			["textShadowOffsetY", "shadowOffsetY", 0],
			["textShadowColor", "shadowColor", "transparent"]
		],
		wn = {},
		bn = {};

	function Sn(t) {
		return Mn(t), D(t.rich, Mn), t
	}

	function Mn(t) {
		if (t) {
			t.font = gn(t);
			var e = t.textAlign;
			"middle" === e && (e = "center"), t.textAlign = null == e || yn[e] ? e : "left";
			var i = t.textVerticalAlign || t.textBaseline;
			"center" === i && (i = "middle"), t.textVerticalAlign = null == i || _n[i] ? i : "top", t.textPadding && (t.textPadding =
				U(t.textPadding))
		}
	}

	function In(t, e, i, n, r, a) {
		n.rich ? function(t, e, i, n, r, a) {
			a !== Pi && (e.__attrCachedBy = ki.NONE);
			var o = t.__textCotentBlock;
			o && !t.__dirtyText || (o = t.__textCotentBlock = fn(i, n));
			! function(t, e, i, n, r) {
				var a = i.width,
					o = i.outerWidth,
					s = i.outerHeight,
					l = n.textPadding,
					h = Pn(bn, t, n, r),
					u = h.baseX,
					c = h.baseY,
					d = h.textAlign,
					f = h.textVerticalAlign;
				Cn(e, n, r, u, c);
				var p = rn(u, o, d),
					g = an(c, s, f),
					v = p,
					m = g;
				l && (v += l[3], m += l[0]);
				var y = v + a;
				Tn(n) && Dn(t, e, n, p, g, o, s);
				for (var _ = 0; _ < i.lines.length; _++) {
					for (var x, w = i.lines[_], b = w.tokens, S = b.length, M = w.lineHeight, I = w.width, C = 0, A = v, T = y, D =
							S - 1; C < S && (!(x = b[C]).textAlign || "left" === x.textAlign);) An(t, e, x, n, M, m, A, "left"), I -= x.width,
						A += x.width, C++;
					for (; 0 <= D && "right" === (x = b[D]).textAlign;) An(t, e, x, n, M, m, T, "right"), I -= x.width, T -= x.width,
						D--;
					for (A += (a - (A - v) - (y - T) - I) / 2; C <= D;) x = b[C], An(t, e, x, n, M, m, A + x.width / 2, "center"), A +=
						x.width, C++;
					m += M
				}
			}(t, e, o, n, r)
		}(t, e, i, n, r, a) : function(t, e, i, n, r, a) {
			var o, s = Tn(n),
				l = !1,
				h = e.__attrCachedBy === ki.PLAIN_TEXT;
			a !== Pi ? (a && (o = a.style, l = !s && h && o), e.__attrCachedBy = s ? ki.NONE : ki.PLAIN_TEXT) : h && (e.__attrCachedBy =
				ki.NONE);
			var u = n.font || mn;
			l && u === (o.font || mn) || (e.font = u);
			var c = t.__computedFont;
			t.__styleFont !== u && (t.__styleFont = u, c = t.__computedFont = e.font);
			var d = n.textPadding,
				f = n.textLineHeight,
				p = t.__textCotentBlock;
			p && !t.__dirtyText || (p = t.__textCotentBlock = dn(i, c, d, f, n.truncate));
			var g = p.outerHeight,
				v = p.lines,
				m = p.lineHeight,
				y = Pn(bn, t, n, r),
				_ = y.baseX,
				x = y.baseY,
				w = y.textAlign || "left",
				b = y.textVerticalAlign;
			Cn(e, n, r, _, x);
			var S = an(x, g, b),
				M = _,
				I = S;
			if (s || d) {
				var C = en(i, c);
				d && (C += d[1] + d[3]);
				var A = rn(_, C, w);
				s && Dn(t, e, n, A, S, C, g), d && (M = Nn(_, w, d), I += d[0])
			}
			e.textAlign = w, e.textBaseline = "middle", e.globalAlpha = n.opacity || 1;
			for (var T = 0; T < xn.length; T++) {
				var D = xn[T],
					k = D[0],
					P = D[1],
					L = n[k];
				l && L === o[k] || (e[P] = Di(e, P, L || D[2]))
			}
			I += m / 2;
			var O = n.textStrokeWidth,
				z = l ? o.textStrokeWidth : null,
				E = !l || O !== z,
				N = !l || E || n.textStroke !== o.textStroke,
				R = On(n.textStroke, O),
				B = zn(n.textFill);
			R && (E && (e.lineWidth = O), N && (e.strokeStyle = R));
			B && (l && n.textFill === o.textFill || (e.fillStyle = B));
			if (1 === v.length) R && e.strokeText(v[0], M, I), B && e.fillText(v[0], M, I);
			else
				for (T = 0; T < v.length; T++) R && e.strokeText(v[T], M, I), B && e.fillText(v[T], M, I), I += m
		}(t, e, i, n, r, a)
	}

	function Cn(t, e, i, n, r) {
		if (i && e.textRotation) {
			var a = e.textOrigin;
			"center" === a ? (n = i.width / 2 + i.x, r = i.height / 2 + i.y) : a && (n = a[0] + i.x, r = a[1] + i.y), t.translate(
				n, r), t.rotate(-e.textRotation), t.translate(-n, -r)
		}
	}

	function An(t, e, i, n, r, a, o, s) {
		var l = n.rich[i.styleName] || {};
		l.text = i.text;
		var h = i.textVerticalAlign,
			u = a + r / 2;
		"top" === h ? u = a + i.height / 2 : "bottom" === h && (u = a + r - i.height / 2), !i.isLineHolder && Tn(l) && Dn(t,
			e, l, "right" === s ? o - i.width : "center" === s ? o - i.width / 2 : o, u - i.height / 2, i.width, i.height);
		var c = i.textPadding;
		c && (o = Nn(o, s, c), u -= i.height / 2 - c[2] - i.textHeight / 2), Ln(e, "shadowBlur", W(l.textShadowBlur, n.textShadowBlur,
			0)), Ln(e, "shadowColor", l.textShadowColor || n.textShadowColor || "transparent"), Ln(e, "shadowOffsetX", W(l.textShadowOffsetX,
			n.textShadowOffsetX, 0)), Ln(e, "shadowOffsetY", W(l.textShadowOffsetY, n.textShadowOffsetY, 0)), Ln(e,
			"textAlign", s), Ln(e, "textBaseline", "middle"), Ln(e, "font", i.font || mn);
		var d = On(l.textStroke || n.textStroke, p),
			f = zn(l.textFill || n.textFill),
			p = G(l.textStrokeWidth, n.textStrokeWidth);
		d && (Ln(e, "lineWidth", p), Ln(e, "strokeStyle", d), e.strokeText(i.text, o, u)), f && (Ln(e, "fillStyle", f), e.fillText(
			i.text, o, u))
	}

	function Tn(t) {
		return !!(t.textBackgroundColor || t.textBorderWidth && t.textBorderColor)
	}

	function Dn(t, e, i, n, r, a, o) {
		var s = i.textBackgroundColor,
			l = i.textBorderWidth,
			h = i.textBorderColor,
			u = E(s);
		if (Ln(e, "shadowBlur", i.textBoxShadowBlur || 0), Ln(e, "shadowColor", i.textBoxShadowColor || "transparent"), Ln(e,
				"shadowOffsetX", i.textBoxShadowOffsetX || 0), Ln(e, "shadowOffsetY", i.textBoxShadowOffsetY || 0), u || l && h) {
			e.beginPath();
			var c = i.textBorderRadius;
			c ? vn(e, {
				x: n,
				y: r,
				width: a,
				height: o,
				r: c
			}) : e.rect(n, r, a, o), e.closePath()
		}
		if (u)
			if (Ln(e, "fillStyle", s), null != i.fillOpacity) {
				var d = e.globalAlpha;
				e.globalAlpha = i.fillOpacity * i.opacity, e.fill(), e.globalAlpha = d
			} else e.fill();
		else if (N(s)) {
			var f = s.image;
			(f = Xi(f, null, t, kn, s)) && ji(f) && e.drawImage(f, n, r, a, o)
		}
		if (l && h)
			if (Ln(e, "lineWidth", l), Ln(e, "strokeStyle", h), null != i.strokeOpacity) {
				d = e.globalAlpha;
				e.globalAlpha = i.strokeOpacity * i.opacity, e.stroke(), e.globalAlpha = d
			} else e.stroke()
	}

	function kn(t, e) {
		e.image = t
	}

	function Pn(t, e, i, n) {
		var r = i.x || 0,
			a = i.y || 0,
			o = i.textAlign,
			s = i.textVerticalAlign;
		if (n) {
			var l = i.textPosition;
			if (l instanceof Array) r = n.x + En(l[0], n.width), a = n.y + En(l[1], n.height);
			else {
				var h = e && e.calculateTextPosition ? e.calculateTextPosition(wn, i, n) : on(wn, i, n);
				r = h.x, a = h.y, o = o || h.textAlign, s = s || h.textVerticalAlign
			}
			var u = i.textOffset;
			u && (r += u[0], a += u[1])
		}
		return (t = t || {}).baseX = r, t.baseY = a, t.textAlign = o, t.textVerticalAlign = s, t
	}

	function Ln(t, e, i) {
		return t[e] = Di(t, e, i), t[e]
	}

	function On(t, e) {
		return null == t || e <= 0 || "transparent" === t || "none" === t ? null : t.image || t.colorStops ? "#000" : t
	}

	function zn(t) {
		return null == t || "none" === t ? null : t.image || t.colorStops ? "#000" : t
	}

	function En(t, e) {
		return "string" == typeof t ? 0 <= t.lastIndexOf("%") ? parseFloat(t) / 100 * e : parseFloat(t) : t
	}

	function Nn(t, e, i) {
		return "right" === e ? t - i[1] : "center" === e ? t + i[3] / 2 - i[1] / 2 : t + i[3]
	}

	function Rn(t, e) {
		return null != t && (t || e.textBackgroundColor || e.textBorderWidth && e.textBorderColor || e.textPadding)
	}

	function Bn() {}
	var Vn = new vi;

	function Fn(t) {
		for (var e in t = t || {}, li.call(this, t), t) t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
		this.style = new Oi(t.style, this), this._rect = null, this.__clipPaths = null
	}

	function Hn(t) {
		Fn.call(this, t)
	}
	Fn.prototype = {
		constructor: Fn,
		type: "displayable",
		__dirty: !0,
		invisible: !(Bn.prototype = {
			constructor: Bn,
			drawRectText: function(t, e) {
				var i = this.style;
				e = i.textRect || e, this.__dirty && Sn(i);
				var n = i.text;
				if (null != n && (n += ""), Rn(n, i)) {
					t.save();
					var r = this.transform;
					i.transformText ? this.setTransform(t) : r && (Vn.copy(e), Vn.applyTransform(r), e = Vn), In(this, t, n, i, e,
						Pi), t.restore()
				}
			}
		}),
		z: 0,
		z2: 0,
		zlevel: 0,
		draggable: !1,
		dragging: !1,
		silent: !1,
		culling: !1,
		cursor: "pointer",
		rectHover: !1,
		progressive: !1,
		incremental: !1,
		globalScaleRatio: 1,
		beforeBrush: function(t) {},
		afterBrush: function(t) {},
		brush: function(t, e) {},
		getBoundingRect: function() {},
		contain: function(t, e) {
			return this.rectContain(t, e)
		},
		traverse: function(t, e) {
			t.call(e, this)
		},
		rectContain: function(t, e) {
			var i = this.transformCoordToLocal(t, e);
			return this.getBoundingRect().contain(i[0], i[1])
		},
		dirty: function() {
			this.__dirty = this.__dirtyText = !0, this._rect = null, this.__zr && this.__zr.refresh()
		},
		animateStyle: function(t) {
			return this.animate("style", t)
		},
		attrKV: function(t, e) {
			"style" !== t ? li.prototype.attrKV.call(this, t, e) : this.style.set(e)
		},
		setStyle: function(t, e) {
			return this.style.set(t, e), this.dirty(!1), this
		},
		useStyle: function(t) {
			return this.style = new Oi(t, this), this.dirty(!1), this
		},
		calculateTextPosition: null
	}, w(Fn, li), S(Fn, Bn), Hn.prototype = {
		constructor: Hn,
		type: "image",
		brush: function(t, e) {
			var i = this.style,
				n = i.image;
			i.bind(t, this, e);
			var r = this._image = Xi(n, this._image, this, this.onload);
			if (r && ji(r)) {
				var a = i.x || 0,
					o = i.y || 0,
					s = i.width,
					l = i.height,
					h = r.width / r.height;
				if (null == s && null != l ? s = l * h : null == l && null != s ? l = s / h : null == s && null == l && (s = r.width,
						l = r.height), this.setTransform(t), i.sWidth && i.sHeight) {
					var u = i.sx || 0,
						c = i.sy || 0;
					t.drawImage(r, u, c, i.sWidth, i.sHeight, a, o, s, l)
				} else if (i.sx && i.sy) {
					var d = s - (u = i.sx),
						f = l - (c = i.sy);
					t.drawImage(r, u, c, d, f, a, o, s, l)
				} else t.drawImage(r, a, o, s, l);
				null != i.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()))
			}
		},
		getBoundingRect: function() {
			var t = this.style;
			return this._rect || (this._rect = new vi(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), this._rect
		}
	}, w(Hn, Fn);
	var Gn = 314159;

	function Wn(t) {
		return parseInt(t, 10)
	}
	var Zn = new vi(0, 0, 0, 0),
		Un = new vi(0, 0, 0, 0);

	function Xn(t, e, i) {
		this.type = "canvas";
		var n = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();
		this._opts = i = k({}, i || {}), this.dpr = i.devicePixelRatio || ii, this._singleCanvas = n;
		var r = (this.root = t).style;
		r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r[
			"-webkit-touch-callout"] = "none", t.innerHTML = ""), this.storage = e;
		var a = this._zlevelList = [],
			o = this._layers = {};
		if (this._layerConfig = {}, this._needsManuallyCompositing = !1, n) {
			var s = t.width,
				l = t.height;
			null != i.width && (s = i.width), null != i.height && (l = i.height), this.dpr = i.devicePixelRatio || 1, t.width =
				s * this.dpr, t.height = l * this.dpr, this._width = s, this._height = l;
			var h = new Gi(t, this, this.dpr);
			h.__builtin__ = !0, h.initContext(), (o[Gn] = h).zlevel = Gn, a.push(Gn), this._domRoot = t
		} else {
			this._width = this._getSize(0), this._height = this._getSize(1);
			var u = this._domRoot = function(t, e) {
				var i = document.createElement("div");
				return i.style.cssText = ["position:relative", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0",
					"border-width:0"
				].join(";") + ";", i
			}(this._width, this._height);
			t.appendChild(u)
		}
		this._hoverlayer = null, this._hoverElements = []
	}
	Xn.prototype = {
		constructor: Xn,
		getType: function() {
			return "canvas"
		},
		isSingleCanvas: function() {
			return this._singleCanvas
		},
		getViewportRoot: function() {
			return this._domRoot
		},
		getViewportRootOffset: function() {
			var t = this.getViewportRoot();
			if (t) return {
				offsetLeft: t.offsetLeft || 0,
				offsetTop: t.offsetTop || 0
			}
		},
		refresh: function(t) {
			var e = this.storage.getDisplayList(!0),
				i = this._zlevelList;
			this._redrawId = Math.random(), this._paintList(e, t, this._redrawId);
			for (var n = 0; n < i.length; n++) {
				var r = i[n],
					a = this._layers[r];
				if (!a.__builtin__ && a.refresh) {
					var o = 0 === n ? this._backgroundColor : null;
					a.refresh(o)
				}
			}
			return this.refreshHover(), this
		},
		addHover: function(t, e) {
			if (!t.__hoverMir) {
				var i = new t.constructor({
					style: t.style,
					shape: t.shape,
					z: t.z,
					z2: t.z2,
					silent: t.silent
				});
				return (i.__from = t).__hoverMir = i, e && i.setStyle(e), this._hoverElements.push(i), i
			}
		},
		removeHover: function(t) {
			var e = t.__hoverMir,
				i = this._hoverElements,
				n = x(i, e);
			0 <= n && i.splice(n, 1), t.__hoverMir = null
		},
		clearHover: function(t) {
			for (var e = this._hoverElements, i = 0; i < e.length; i++) {
				var n = e[i].__from;
				n && (n.__hoverMir = null)
			}
			e.length = 0
		},
		refreshHover: function() {
			var t = this._hoverElements,
				e = t.length,
				i = this._hoverlayer;
			if (i && i.clear(), e) {
				Ii(t, this.storage.displayableSortFunc);
				var n = {};
				(i = i || (this._hoverlayer = this.getLayer(1e5))).ctx.save();
				for (var r = 0; r < e;) {
					var a = t[r],
						o = a.__from;
					o && o.__zr ? (r++, o.invisible || (a.transform = o.transform, a.invTransform = o.invTransform, a.__clipPaths =
						o.__clipPaths, this._doPaintEl(a, i, !0, n))) : (t.splice(r, 1), o.__hoverMir = null, e--)
				}
				i.ctx.restore()
			}
		},
		getHoverLayer: function() {
			return this.getLayer(1e5)
		},
		_paintList: function(t, e, i) {
			if (this._redrawId === i) {
				e = e || !1, this._updateLayerStatus(t);
				var n = this._doPaintList(t, e);
				if (this._needsManuallyCompositing && this._compositeManually(), !n) {
					var r = this;
					Wi(function() {
						r._paintList(t, e, i)
					})
				}
			}
		},
		_compositeManually: function() {
			var e = this.getLayer(Gn).ctx,
				i = this._domRoot.width,
				n = this._domRoot.height;
			e.clearRect(0, 0, i, n), this.eachBuiltinLayer(function(t) {
				t.virtual && e.drawImage(t.dom, 0, 0, i, n)
			})
		},
		_doPaintList: function(t, e) {
			for (var i = [], n = 0; n < this._zlevelList.length; n++) {
				var r = this._zlevelList[n];
				(s = this._layers[r]).__builtin__ && s !== this._hoverlayer && (s.__dirty || e) && i.push(s)
			}
			for (var a = !0, o = 0; o < i.length; o++) {
				var s, l = (s = i[o]).ctx,
					h = {};
				l.save();
				var u = e ? s.__startIndex : s.__drawIndex,
					c = !e && s.incremental && Date.now,
					d = c && Date.now(),
					f = s.zlevel === this._zlevelList[0] ? this._backgroundColor : null;
				if (s.__startIndex === s.__endIndex) s.clear(!1, f);
				else if (u === s.__startIndex) {
					var p = t[u];
					p.incremental && p.notClear && !e || s.clear(!1, f)
				} - 1 === u && (console.error("For some unknown reason. drawIndex is -1"), u = s.__startIndex);
				for (var g = u; g < s.__endIndex; g++) {
					var v = t[g];
					if (this._doPaintEl(v, s, e, h), v.__dirty = v.__dirtyText = !1, c)
						if (15 < Date.now() - d) break
				}
				s.__drawIndex = g, s.__drawIndex < s.__endIndex && (a = !1), h.prevElClipPaths && l.restore(), l.restore()
			}
			return m.wxa && D(this._layers, function(t) {
				t && t.ctx && t.ctx.draw && t.ctx.draw()
			}), a
		},
		_doPaintEl: function(t, e, i, n) {
			var r = e.ctx,
				a = t.transform;
			if ((e.__dirty || i) && !t.invisible && 0 !== t.style.opacity && (!a || a[0] || a[3]) && (!t.culling || ! function(
					t, e, i) {
					return Zn.copy(t.getBoundingRect()), t.transform && Zn.applyTransform(t.transform), Un.width = e, Un.height =
						i, !Zn.intersect(Un)
				}(t, this._width, this._height))) {
				var o = t.__clipPaths,
					s = n.prevElClipPaths;
				s && ! function(t, e) {
					if (t === e) return !1;
					if (!t || !e || t.length !== e.length) return !0;
					for (var i = 0; i < t.length; i++)
						if (t[i] !== e[i]) return !0;
					return !1
				}(o, s) || (s && (r.restore(), n.prevElClipPaths = null, n.prevEl = null), o && (r.save(), function(t, e) {
					for (var i = 0; i < t.length; i++) {
						var n = t[i];
						n.setTransform(e), e.beginPath(), n.buildPath(e, n.shape), e.clip(), n.restoreTransform(e)
					}
				}(o, r), n.prevElClipPaths = o)), t.beforeBrush && t.beforeBrush(r), t.brush(r, n.prevEl || null), (n.prevEl =
					t).afterBrush && t.afterBrush(r)
			}
		},
		getLayer: function(t, e) {
			this._singleCanvas && !this._needsManuallyCompositing && (t = Gn);
			var i = this._layers[t];
			return i || ((i = new Gi("zr_" + t, this, this.dpr)).zlevel = t, i.__builtin__ = !0, this._layerConfig[t] && v(i,
				this._layerConfig[t], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i
		},
		insertLayer: function(t, e) {
			var i = this._layers,
				n = this._zlevelList,
				r = n.length,
				a = null,
				o = -1,
				s = this._domRoot;
			if (i[t]) ai("ZLevel " + t + " has been used already");
			else if (function(t) {
					return !!t && (!!t.__builtin__ || "function" == typeof t.resize && "function" == typeof t.refresh)
				}(e)) {
				if (0 < r && t > n[0]) {
					for (o = 0; o < r - 1 && !(n[o] < t && n[o + 1] > t); o++);
					a = i[n[o]]
				}
				if (n.splice(o + 1, 0, t), !(i[t] = e).virtual)
					if (a) {
						var l = a.dom;
						l.nextSibling ? s.insertBefore(e.dom, l.nextSibling) : s.appendChild(e.dom)
					} else s.firstChild ? s.insertBefore(e.dom, s.firstChild) : s.appendChild(e.dom)
			} else ai("Layer of zlevel " + t + " is not valid")
		},
		eachLayer: function(t, e) {
			var i, n, r = this._zlevelList;
			for (n = 0; n < r.length; n++) i = r[n], t.call(e, this._layers[i], i)
		},
		eachBuiltinLayer: function(t, e) {
			var i, n, r, a = this._zlevelList;
			for (r = 0; r < a.length; r++) n = a[r], (i = this._layers[n]).__builtin__ && t.call(e, i, n)
		},
		eachOtherLayer: function(t, e) {
			var i, n, r, a = this._zlevelList;
			for (r = 0; r < a.length; r++) n = a[r], (i = this._layers[n]).__builtin__ || t.call(e, i, n)
		},
		getLayers: function() {
			return this._layers
		},
		_updateLayerStatus: function(t) {
			function e(t) {
				n && (n.__endIndex !== t && (n.__dirty = !0), n.__endIndex = t)
			}
			if (this.eachBuiltinLayer(function(t, e) {
					t.__dirty = t.__used = !1
				}), this._singleCanvas)
				for (var i = 1; i < t.length; i++) {
					if ((a = t[i]).zlevel !== t[i - 1].zlevel || a.incremental) {
						this._needsManuallyCompositing = !0;
						break
					}
				}
			var n = null,
				r = 0;
			for (i = 0; i < t.length; i++) {
				var a, o, s = (a = t[i]).zlevel;
				a.incremental ? ((o = this.getLayer(s + .001, this._needsManuallyCompositing)).incremental = !0, r = 1) : o =
					this.getLayer(s + (0 < r ? .01 : 0), this._needsManuallyCompositing), o.__builtin__ || ai("ZLevel " + s +
						" has been used by unkown layer " + o.id), o !== n && (o.__used = !0, o.__startIndex !== i && (o.__dirty = !0),
						o.__startIndex = i, o.incremental ? o.__drawIndex = -1 : o.__drawIndex = i, e(i), n = o), a.__dirty && (o.__dirty = !
						0, o.incremental && o.__drawIndex < 0 && (o.__drawIndex = i))
			}
			e(i), this.eachBuiltinLayer(function(t, e) {
				!t.__used && 0 < t.getElementCount() && (t.__dirty = !0, t.__startIndex = t.__endIndex = t.__drawIndex = 0), t
					.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex)
			})
		},
		clear: function() {
			return this.eachBuiltinLayer(this._clearLayer), this
		},
		_clearLayer: function(t) {
			t.clear()
		},
		setBackgroundColor: function(t) {
			this._backgroundColor = t
		},
		configLayer: function(t, e) {
			if (e) {
				var i = this._layerConfig;
				i[t] ? v(i[t], e, !0) : i[t] = e;
				for (var n = 0; n < this._zlevelList.length; n++) {
					var r = this._zlevelList[n];
					if (r === t || r === t + .01) v(this._layers[r], i[t], !0)
				}
			}
		},
		delLayer: function(t) {
			var e = this._layers,
				i = this._zlevelList,
				n = e[t];
			n && (n.dom.parentNode.removeChild(n.dom), delete e[t], i.splice(x(i, t), 1))
		},
		resize: function(e, i) {
			if (this._domRoot.style) {
				var t = this._domRoot;
				t.style.display = "none";
				var n = this._opts;
				if (null != e && (n.width = e), null != i && (n.height = i), e = this._getSize(0), i = this._getSize(1), t.style
					.display = "", this._width !== e || i !== this._height) {
					for (var r in t.style.width = e + "px", t.style.height = i + "px", this._layers) this._layers.hasOwnProperty(r) &&
						this._layers[r].resize(e, i);
					D(this._progressiveLayers, function(t) {
						t.resize(e, i)
					}), this.refresh(!0)
				}
				this._width = e, this._height = i
			} else {
				if (null == e || null == i) return;
				this._width = e, this._height = i, this.getLayer(Gn).resize(e, i)
			}
			return this
		},
		clearLayer: function(t) {
			var e = this._layers[t];
			e && e.clear()
		},
		dispose: function() {
			this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
		},
		getRenderedCanvas: function(t) {
			if (t = t || {}, this._singleCanvas && !this._compositeManually) return this._layers[Gn].dom;
			var e = new Gi("image", this, t.pixelRatio || this.dpr);
			if (e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor), t.pixelRatio <= this.dpr) {
				this.refresh();
				var i = e.dom.width,
					n = e.dom.height,
					r = e.ctx;
				this.eachLayer(function(t) {
					t.__builtin__ ? r.drawImage(t.dom, 0, 0, i, n) : t.renderToCanvas && (e.ctx.save(), t.renderToCanvas(e.ctx),
						e.ctx.restore())
				})
			} else
				for (var a = {}, o = this.storage.getDisplayList(!0), s = 0; s < o.length; s++) {
					var l = o[s];
					this._doPaintEl(l, e, !0, a)
				}
			return e.dom
		},
		getWidth: function() {
			return this._width
		},
		getHeight: function() {
			return this._height
		},
		_getSize: function(t) {
			var e = this._opts,
				i = ["width", "height"][t],
				n = ["clientWidth", "clientHeight"][t],
				r = ["paddingLeft", "paddingTop"][t],
				a = ["paddingRight", "paddingBottom"][t];
			if (null != e[i] && "auto" !== e[i]) return parseFloat(e[i]);
			var o = this.root,
				s = document.defaultView.getComputedStyle(o);
			return (o[n] || Wn(s[i]) || Wn(o.style[i])) - (Wn(s[r]) || 0) - (Wn(s[a]) || 0) | 0
		},
		pathToImage: function(t, e) {
			e = e || this.dpr;
			var i = document.createElement("canvas"),
				n = i.getContext("2d"),
				r = t.getBoundingRect(),
				a = t.style,
				o = a.shadowBlur * e,
				s = a.shadowOffsetX * e,
				l = a.shadowOffsetY * e,
				h = a.hasStroke() ? a.lineWidth : 0,
				u = Math.max(h / 2, o - s),
				c = Math.max(h / 2, s + o),
				d = Math.max(h / 2, o - l),
				f = Math.max(h / 2, l + o),
				p = r.width + u + c,
				g = r.height + d + f;
			i.width = p * e, i.height = g * e, n.scale(e, e), n.clearRect(0, 0, p, g), n.dpr = e;
			var v = {
				position: t.position,
				rotation: t.rotation,
				scale: t.scale
			};
			t.position = [u - r.x, d - r.y], t.rotation = 0, t.scale = [1, 1], t.updateTransform(), t && t.brush(n);
			var m = new Hn({
				style: {
					x: 0,
					y: 0,
					image: i
				}
			});
			return null != v.position && (m.position = t.position = v.position), null != v.rotation && (m.rotation = t.rotation =
				v.rotation), null != v.scale && (m.scale = t.scale = v.scale), m
		}
	};

	function Yn(t) {
		t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function() {}, this._clips = [], this._running = !
			1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, It.call(this)
	}
	Yn.prototype = {
		constructor: Yn,
		addClip: function(t) {
			this._clips.push(t)
		},
		addAnimator: function(t) {
			t.animation = this;
			for (var e = t.getClips(), i = 0; i < e.length; i++) this.addClip(e[i])
		},
		removeClip: function(t) {
			var e = x(this._clips, t);
			0 <= e && this._clips.splice(e, 1)
		},
		removeAnimator: function(t) {
			for (var e = t.getClips(), i = 0; i < e.length; i++) this.removeClip(e[i]);
			t.animation = null
		},
		_update: function() {
			for (var t = (new Date).getTime() - this._pausedTime, e = t - this._time, i = this._clips, n = i.length, r = [],
					a = [], o = 0; o < n; o++) {
				var s = i[o],
					l = s.step(t, e);
				l && (r.push(l), a.push(s))
			}
			for (o = 0; o < n;) i[o]._needsRemove ? (i[o] = i[n - 1], i.pop(), n--) : o++;
			n = r.length;
			for (o = 0; o < n; o++) a[o].fire(r[o]);
			this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update()
		},
		_startLoop: function() {
			var e = this;
			this._running = !0, Wi(function t() {
				e._running && (Wi(t), e._paused || e._update())
			})
		},
		start: function() {
			this._time = (new Date).getTime(), this._pausedTime = 0, this._startLoop()
		},
		stop: function() {
			this._running = !1
		},
		pause: function() {
			this._paused || (this._pauseStart = (new Date).getTime(), this._paused = !0)
		},
		resume: function() {
			this._paused && (this._pausedTime += (new Date).getTime() - this._pauseStart, this._paused = !1)
		},
		clear: function() {
			this._clips = []
		},
		isFinished: function() {
			return !this._clips.length
		},
		animate: function(t, e) {
			var i = new ti(t, (e = e || {}).loop, e.getter, e.setter);
			return this.addAnimator(i), i
		}
	}, S(Yn, It);
	var jn = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
		qn = ["touchstart", "touchend", "touchmove"],
		$n = {
			pointerdown: 1,
			pointerup: 1,
			pointermove: 1,
			pointerout: 1
		},
		Kn = P(jn, function(t) {
			var e = t.replace("mouse", "pointer");
			return $n[e] ? e : t
		});

	function Qn(t) {
		return "mousewheel" === t && m.browser.firefox ? "DOMMouseScroll" : t
	}

	function Jn(t) {
		t._touching = !0, clearTimeout(t._touchTimer), t._touchTimer = setTimeout(function() {
			t._touching = !1
		}, 700)
	}
	var tr = {
		mousemove: function(t) {
			t = Et(this.dom, t), this.trigger("mousemove", t)
		},
		mouseout: function(t) {
			var e = (t = Et(this.dom, t)).toElement || t.relatedTarget;
			if (e !== this.dom)
				for (; e && 9 !== e.nodeType;) {
					if (e === this.dom) return;
					e = e.parentNode
				}
			this.trigger("mouseout", t)
		},
		touchstart: function(t) {
			(t = Et(this.dom, t)).zrByTouch = !0, this._lastTouchMoment = new Date, this.handler.processGesture(t, "start"),
				tr.mousemove.call(this, t), tr.mousedown.call(this, t), Jn(this)
		},
		touchmove: function(t) {
			(t = Et(this.dom, t)).zrByTouch = !0, this.handler.processGesture(t, "change"), tr.mousemove.call(this, t), Jn(
				this)
		},
		touchend: function(t) {
			(t = Et(this.dom, t)).zrByTouch = !0, this.handler.processGesture(t, "end"), tr.mouseup.call(this, t), +new Date -
				this._lastTouchMoment < 300 && tr.click.call(this, t), Jn(this)
		},
		pointerdown: function(t) {
			tr.mousedown.call(this, t)
		},
		pointermove: function(t) {
			er(t) || tr.mousemove.call(this, t)
		},
		pointerup: function(t) {
			tr.mouseup.call(this, t)
		},
		pointerout: function(t) {
			er(t) || tr.mouseout.call(this, t)
		}
	};

	function er(t) {
		var e = t.pointerType;
		return "pen" === e || "touch" === e
	}

	function ir(i) {
		function t(t, e) {
			D(t, function(t) {
				Nt(i, Qn(t), e._handlers[t])
			}, e)
		}
		It.call(this), this.dom = i, this._touching = !1, this._touchTimer, this._handlers = {},
			function(e) {
				D(qn, function(t) {
					e._handlers[t] = C(tr[t], e)
				}), D(Kn, function(t) {
					e._handlers[t] = C(tr[t], e)
				}), D(jn, function(t) {
					e._handlers[t] = function(t, e) {
						return function() {
							if (!e._touching) return t.apply(e, arguments)
						}
					}(tr[t], e)
				})
			}(this), m.pointerEventsSupported ? t(Kn, this) : (m.touchEventsSupported && t(qn, this), t(jn, this))
	}
	D(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(e) {
		tr[e] = function(t) {
			t = Et(this.dom, t), this.trigger(e, t)
		}
	});
	var nr = ir.prototype;
	nr.dispose = function() {
		for (var t, e, i, n = jn.concat(qn), r = 0; r < n.length; r++) {
			var a = n[r];
			t = this.dom, e = Qn(a), i = this._handlers[a], Dt ? t.removeEventListener(e, i) : t.detachEvent("on" + e, i)
		}
	}, nr.setCursor = function(t) {
		this.dom.style && (this.dom.style.cursor = t || "default")
	}, S(ir, It);
	var rr = !m.canvasSupported,
		ar = {
			canvas: Xn
		},
		or = {};

	function sr(t, e) {
		var i = new hr(n(), t, e);
		return or[i.id] = i
	}

	function lr(t, e) {
		ar[t] = e
	}
	var hr = function(t, e, i) {
		i = i || {}, this.dom = e, this.id = t;
		var n = this,
			r = new Ai,
			a = i.renderer;
		if (rr) {
			if (!ar.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");
			a = "vml"
		} else a && ar[a] || (a = "canvas");
		var o = new ar[a](e, r, i, t);
		this.storage = r, this.painter = o;
		var s = m.node || m.worker ? null : new ir(o.getViewportRoot());
		this.handler = new Ut(r, o, s, o.root), this.animation = new Yn({
			stage: {
				update: C(this.flush, this)
			}
		}), this.animation.start(), this._needsRefresh;
		var l = r.delFromStorage,
			h = r.addToStorage;
		r.delFromStorage = function(t) {
			l.call(r, t), t && t.removeSelfFromZr(n)
		}, r.addToStorage = function(t) {
			h.call(r, t), t.addSelfToZr(n)
		}
	};
	hr.prototype = {
		constructor: hr,
		getId: function() {
			return this.id
		},
		add: function(t) {
			this.storage.addRoot(t), this._needsRefresh = !0
		},
		remove: function(t) {
			this.storage.delRoot(t), this._needsRefresh = !0
		},
		configLayer: function(t, e) {
			this.painter.configLayer && this.painter.configLayer(t, e), this._needsRefresh = !0
		},
		setBackgroundColor: function(t) {
			this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this._needsRefresh = !0
		},
		refreshImmediately: function() {
			this._needsRefresh = this._needsRefreshHover = !1, this.painter.refresh(), this._needsRefresh = this._needsRefreshHover = !
				1
		},
		refresh: function() {
			this._needsRefresh = !0
		},
		flush: function() {
			var t;
			this._needsRefresh && (t = !0, this.refreshImmediately()), this._needsRefreshHover && (t = !0, this.refreshHoverImmediately()),
				t && this.trigger("rendered")
		},
		addHover: function(t, e) {
			if (this.painter.addHover) {
				var i = this.painter.addHover(t, e);
				return this.refreshHover(), i
			}
		},
		removeHover: function(t) {
			this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover())
		},
		clearHover: function() {
			this.painter.clearHover && (this.painter.clearHover(), this.refreshHover())
		},
		refreshHover: function() {
			this._needsRefreshHover = !0
		},
		refreshHoverImmediately: function() {
			this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover()
		},
		resize: function(t) {
			t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize()
		},
		clearAnimation: function() {
			this.animation.clear()
		},
		getWidth: function() {
			return this.painter.getWidth()
		},
		getHeight: function() {
			return this.painter.getHeight()
		},
		pathToImage: function(t, e) {
			return this.painter.pathToImage(t, e)
		},
		setCursorStyle: function(t) {
			this.handler.setCursorStyle(t)
		},
		findHover: function(t, e) {
			return this.handler.findHover(t, e)
		},
		on: function(t, e, i) {
			this.handler.on(t, e, i)
		},
		off: function(t, e) {
			this.handler.off(t, e)
		},
		trigger: function(t, e) {
			this.handler.trigger(t, e)
		},
		clear: function() {
			this.storage.delRoot(), this.painter.clear()
		},
		dispose: function() {
			this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this
				.animation = this.storage = this.painter = this.handler = null,
				function(t) {
					delete or[t]
				}(this.id)
		}
	};
	var ur = (Object.freeze || Object)({
			version: "4.1.2",
			init: sr,
			dispose: function(t) {
				if (t) t.dispose();
				else {
					for (var e in or) or.hasOwnProperty(e) && or[e].dispose();
					or = {}
				}
				return this
			},
			getInstance: function(t) {
				return or[t]
			},
			registerPainter: lr
		}),
		cr = D,
		dr = N,
		fr = O,
		pr = "series\0";

	function gr(t) {
		return t instanceof Array ? t : null == t ? [] : [t]
	}

	function vr(t, e, i) {
		if (t) {
			t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};
			for (var n = 0, r = i.length; n < r; n++) {
				var a = i[n];
				!t.emphasis[e].hasOwnProperty(a) && t[e].hasOwnProperty(a) && (t.emphasis[e][a] = t[e][a])
			}
		}
	}
	var mr = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor",
		"textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor",
		"shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX",
		"textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"
	];

	function yr(t) {
		return !dr(t) || fr(t) || t instanceof Date ? t : t.value
	}

	function _r(t, r) {
		r = (r || []).slice();
		var a = P(t || [], function(t, e) {
			return {
				exist: t
			}
		});
		return cr(r, function(t, e) {
			if (dr(t)) {
				for (var i = 0; i < a.length; i++)
					if (!a[i].option && null != t.id && a[i].exist.id === t.id + "") return a[i].option = t, void(r[e] = null);
				for (i = 0; i < a.length; i++) {
					var n = a[i].exist;
					if (!(a[i].option || null != n.id && null != t.id || null == t.name || br(t) || br(n) || n.name !== t.name + ""))
						return a[i].option = t, void(r[e] = null)
				}
			}
		}), cr(r, function(t, e) {
			if (dr(t)) {
				for (var i = 0; i < a.length; i++) {
					var n = a[i].exist;
					if (!a[i].option && !br(n) && null == t.id) {
						a[i].option = t;
						break
					}
				}
				i >= a.length && a.push({
					option: t
				})
			}
		}), a
	}

	function xr(t) {
		var o = Q();
		cr(t, function(t, e) {
			var i = t.exist;
			i && o.set(i.id, t)
		}), cr(t, function(t, e) {
			var i = t.option;
			X(!i || null == i.id || !o.get(i.id) || o.get(i.id) === t, "id duplicates: " + (i && i.id)), i && null != i.id &&
				o.set(i.id, t), t.keyInfo || (t.keyInfo = {})
		}), cr(t, function(t, e) {
			var i = t.exist,
				n = t.option,
				r = t.keyInfo;
			if (dr(n)) {
				if (r.name = null != n.name ? n.name + "" : i ? i.name : pr + e, i) r.id = i.id;
				else if (null != n.id) r.id = n.id + "";
				else
					for (var a = 0; r.id = "\0" + r.name + "\0" + a++, o.get(r.id););
				o.set(r.id, t)
			}
		})
	}

	function wr(t) {
		var e = t.name;
		return !(!e || !e.indexOf(pr))
	}

	function br(t) {
		return dr(t) && t.id && 0 === (t.id + "").indexOf("\0_ec_\0")
	}

	function Sr(e, t) {
		return null != t.dataIndexInside ? t.dataIndexInside : null != t.dataIndex ? O(t.dataIndex) ? P(t.dataIndex,
			function(t) {
				return e.indexOfRawIndex(t)
			}) : e.indexOfRawIndex(t.dataIndex) : null != t.name ? O(t.name) ? P(t.name, function(t) {
			return e.indexOfName(t)
		}) : e.indexOfName(t.name) : void 0
	}

	function Mr() {
		var e = "__\0ec_inner_" + Ir++ + "_" + Math.random().toFixed(5);
		return function(t) {
			return t[e] || (t[e] = {})
		}
	}
	var Ir = 0;

	function Cr(s, l, h) {
		if (E(l)) {
			var t = {};
			t[l + "Index"] = 0, l = t
		}
		var e = h && h.defaultMainType;
		!e || Ar(l, e + "Index") || Ar(l, e + "Id") || Ar(l, e + "Name") || (l[e + "Index"] = 0);
		var u = {};
		return cr(l, function(t, e) {
			t = l[e];
			if ("dataIndex" !== e && "dataIndexInside" !== e) {
				var i = e.match(/^(\w+)(Index|Id|Name)$/) || [],
					n = i[1],
					r = (i[2] || "").toLowerCase();
				if (!(!n || !r || null == t || "index" === r && "none" === t || h && h.includeMainTypes && x(h.includeMainTypes,
						n) < 0)) {
					var a = {
						mainType: n
					};
					"index" === r && "all" === t || (a[r] = t);
					var o = s.queryComponents(a);
					u[n + "Models"] = o, u[n + "Model"] = o[0]
				}
			} else u[e] = t
		}), u
	}

	function Ar(t, e) {
		return t && t.hasOwnProperty(e)
	}

	function Tr(t, e, i) {
		t.setAttribute ? t.setAttribute(e, i) : t[e] = i
	}

	function Dr(t) {
		return "auto" === t ? m.domSupported ? "html" : "richText" : t || "html"
	}
	var kr = ".",
		Pr = "___EC__COMPONENT__CONTAINER___";

	function Lr(t) {
		var e = {
			main: "",
			sub: ""
		};
		return t && (t = t.split(kr), e.main = t[0] || "", e.sub = t[1] || ""), e
	}

	function Or(t) {
		(t.$constructor = t).extend = function(t) {
			function e() {
				t.$constructor ? t.$constructor.apply(this, arguments) : i.apply(this, arguments)
			}
			var i = this;
			return k(e.prototype, t), e.extend = this.extend, e.superCall = Nr, e.superApply = Rr, w(e, this), e.superClass =
				i, e
		}
	}
	var zr = 0;

	function Er(t) {
		var e = ["__\0is_clz", zr++, Math.random().toFixed(3)].join("_");
		t.prototype[e] = !0, t.isInstance = function(t) {
			return !(!t || !t[e])
		}
	}

	function Nr(t, e) {
		var i = Z(arguments, 2);
		return this.superClass.prototype[e].apply(t, i)
	}

	function Rr(t, e, i) {
		return this.superClass.prototype[e].apply(t, i)
	}

	function Br(i, t) {
		t = t || {};
		var r = {};
		if (i.registerClass = function(t, e) {
				if (e)
					if (function(t) {
							X(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal')
						}(e), (e = Lr(e)).sub) {
						if (e.sub !== Pr) {
							(function(t) {
								var e = r[t.main];
								e && e[Pr] || ((e = r[t.main] = {})[Pr] = !0);
								return e
							})(e)[e.sub] = t
						}
					} else r[e.main] = t;
				return t
			}, i.getClass = function(t, e, i) {
				var n = r[t];
				if (n && n[Pr] && (n = e ? n[e] : null), i && !n) throw new Error(e ? "Component " + t + "." + (e || "") +
					" not exists. Load it first." : t + ".type should be specified.");
				return n
			}, i.getClassesByMainType = function(t) {
				t = Lr(t);
				var i = [],
					e = r[t.main];
				return e && e[Pr] ? D(e, function(t, e) {
					e !== Pr && i.push(t)
				}) : i.push(e), i
			}, i.hasClass = function(t) {
				return t = Lr(t), !!r[t.main]
			}, i.getAllClassMainTypes = function() {
				var i = [];
				return D(r, function(t, e) {
					i.push(e)
				}), i
			}, i.hasSubTypes = function(t) {
				t = Lr(t);
				var e = r[t.main];
				return e && e[Pr]
			}, i.parseClassType = Lr, t.registerWhenExtend) {
			var n = i.extend;
			n && (i.extend = function(t) {
				var e = n.call(this, t);
				return i.registerClass(e, t.type)
			})
		}
		return i
	}

	function Vr(s) {
		for (var t = 0; t < s.length; t++) s[t][1] || (s[t][1] = s[t][0]);
		return function(t, e, i) {
			for (var n = {}, r = 0; r < s.length; r++) {
				var a = s[r][1];
				if (!(e && 0 <= x(e, a) || i && x(i, a) < 0)) {
					var o = t.getShallow(a);
					null != o && (n[s[r][0]] = o)
				}
			}
			return n
		}
	}
	var Fr = Vr([
			["lineWidth", "width"],
			["stroke", "color"],
			["opacity"],
			["shadowBlur"],
			["shadowOffsetX"],
			["shadowOffsetY"],
			["shadowColor"]
		]),
		Hr = {
			getLineStyle: function(t) {
				var e = Fr(this, t);
				return e.lineDash = this.getLineDash(e.lineWidth), e
			},
			getLineDash: function(t) {
				null == t && (t = 1);
				var e = this.get("type"),
					i = Math.max(t, 2),
					n = 4 * t;
				return "solid" !== e && null != e && ("dashed" === e ? [n, n] : [i, i])
			}
		},
		Gr = Vr([
			["fill", "color"],
			["shadowBlur"],
			["shadowOffsetX"],
			["shadowOffsetY"],
			["opacity"],
			["shadowColor"]
		]),
		Wr = {
			getAreaStyle: function(t, e) {
				return Gr(this, t, e)
			}
		},
		Zr = Math.pow,
		Ur = Math.sqrt,
		Xr = 1e-8,
		Yr = 1e-4,
		jr = Ur(3),
		qr = 1 / 3,
		$r = it(),
		Kr = it(),
		Qr = it();

	function Jr(t) {
		return -Xr < t && t < Xr
	}

	function ta(t) {
		return Xr < t || t < -Xr
	}

	function ea(t, e, i, n, r) {
		var a = 1 - r;
		return a * a * (a * t + 3 * r * e) + r * r * (r * n + 3 * a * i)
	}

	function ia(t, e, i, n, r) {
		var a = 1 - r;
		return 3 * (((e - t) * a + 2 * (i - e) * r) * a + (n - i) * r * r)
	}

	function na(t, e, i, n, r) {
		var a = 6 * i - 12 * e + 6 * t,
			o = 9 * e + 3 * n - 3 * t - 9 * i,
			s = 3 * e - 3 * t,
			l = 0;
		if (Jr(o)) {
			if (ta(a)) 0 <= (u = -s / a) && u <= 1 && (r[l++] = u)
		} else {
			var h = a * a - 4 * o * s;
			if (Jr(h)) r[0] = -a / (2 * o);
			else if (0 < h) {
				var u, c = Ur(h),
					d = (-a - c) / (2 * o);
				0 <= (u = (-a + c) / (2 * o)) && u <= 1 && (r[l++] = u), 0 <= d && d <= 1 && (r[l++] = d)
			}
		}
		return l
	}

	function ra(t, e, i, n, r, a) {
		var o = (e - t) * r + t,
			s = (i - e) * r + e,
			l = (n - i) * r + i,
			h = (s - o) * r + o,
			u = (l - s) * r + s,
			c = (u - h) * r + h;
		a[0] = t, a[1] = o, a[2] = h, a[3] = c, a[4] = c, a[5] = u, a[6] = l, a[7] = n
	}

	function aa(t, e, i, n) {
		var r = 1 - n;
		return r * (r * t + 2 * n * e) + n * n * i
	}

	function oa(t, e, i, n) {
		return 2 * ((1 - n) * (e - t) + n * (i - e))
	}

	function sa(t, e, i) {
		var n = t + i - 2 * e;
		return 0 == n ? .5 : (t - e) / n
	}

	function la(t, e, i, n, r) {
		var a = (e - t) * n + t,
			o = (i - e) * n + e,
			s = (o - a) * n + a;
		r[0] = t, r[1] = a, r[2] = s, r[3] = s, r[4] = o, r[5] = i
	}
	var ha = Math.min,
		ua = Math.max,
		ca = Math.sin,
		da = Math.cos,
		fa = 2 * Math.PI,
		pa = it(),
		ga = it(),
		va = it();

	function ma(t, e, i) {
		if (0 !== t.length) {
			var n, r = t[0],
				a = r[0],
				o = r[0],
				s = r[1],
				l = r[1];
			for (n = 1; n < t.length; n++) r = t[n], a = ha(a, r[0]), o = ua(o, r[0]), s = ha(s, r[1]), l = ua(l, r[1]);
			e[0] = a, e[1] = s, i[0] = o, i[1] = l
		}
	}

	function ya(t, e, i, n, r, a) {
		r[0] = ha(t, i), r[1] = ha(e, n), a[0] = ua(t, i), a[1] = ua(e, n)
	}
	var _a = [],
		xa = [];

	function wa(t, e, i, n, r, a, o, s, l, h) {
		var u, c = na,
			d = ea,
			f = c(t, i, r, o, _a);
		for (l[0] = 1 / 0, l[1] = 1 / 0, h[0] = -1 / 0, h[1] = -1 / 0, u = 0; u < f; u++) {
			var p = d(t, i, r, o, _a[u]);
			l[0] = ha(p, l[0]), h[0] = ua(p, h[0])
		}
		for (f = c(e, n, a, s, xa), u = 0; u < f; u++) {
			var g = d(e, n, a, s, xa[u]);
			l[1] = ha(g, l[1]), h[1] = ua(g, h[1])
		}
		l[0] = ha(t, l[0]), h[0] = ua(t, h[0]), l[0] = ha(o, l[0]), h[0] = ua(o, h[0]), l[1] = ha(e, l[1]), h[1] = ua(e, h[1]),
			l[1] = ha(s, l[1]), h[1] = ua(s, h[1])
	}

	function ba(t, e, i, n, r, a, o, s, l) {
		var h = _t,
			u = xt,
			c = Math.abs(r - a);
		if (c % fa < 1e-4 && 1e-4 < c) return s[0] = t - i, s[1] = e - n, l[0] = t + i, void(l[1] = e + n);
		if (pa[0] = da(r) * i + t, pa[1] = ca(r) * n + e, ga[0] = da(a) * i + t, ga[1] = ca(a) * n + e, h(s, pa, ga), u(l,
				pa, ga), (r %= fa) < 0 && (r += fa), (a %= fa) < 0 && (a += fa), a < r && !o ? a += fa : r < a && o && (r += fa),
			o) {
			var d = a;
			a = r, r = d
		}
		for (var f = 0; f < a; f += Math.PI / 2) r < f && (va[0] = da(f) * i + t, va[1] = ca(f) * n + e, h(s, va, s), u(l,
			va, l))
	}
	var Sa = {
			M: 1,
			L: 2,
			C: 3,
			Q: 4,
			A: 5,
			Z: 6,
			R: 7
		},
		Ma = [],
		Ia = [],
		Ca = [],
		Aa = [],
		Ta = Math.min,
		Da = Math.max,
		ka = Math.cos,
		Pa = Math.sin,
		La = Math.sqrt,
		Oa = Math.abs,
		za = "undefined" != typeof Float32Array,
		Ea = function(t) {
			this._saveData = !t, this._saveData && (this.data = []), this._ctx = null
		};

	function Na(t, e, i, n, r, a, o) {
		if (0 === r) return !1;
		var s = r,
			l = 0;
		if (e + s < o && n + s < o || o < e - s && o < n - s || t + s < a && i + s < a || a < t - s && a < i - s) return !1;
		if (t === i) return Math.abs(a - t) <= s / 2;
		var h = (l = (e - n) / (t - i)) * a - o + (t * n - i * e) / (t - i);
		return h * h / (l * l + 1) <= s / 2 * s / 2
	}

	function Ra(t, e, i, n, r, a, o, s, l, h, u) {
		if (0 === l) return !1;
		var c = l;
		return !(e + c < u && n + c < u && a + c < u && s + c < u || u < e - c && u < n - c && u < a - c && u < s - c || t +
			c < h && i + c < h && r + c < h && o + c < h || h < t - c && h < i - c && h < r - c && h < o - c) && function(t, e,
			i, n, r, a, o, s, l, h, u) {
			var c, d, f, p, g, v = .005,
				m = 1 / 0;
			$r[0] = l, $r[1] = h;
			for (var y = 0; y < 1; y += .05) Kr[0] = ea(t, i, r, o, y), Kr[1] = ea(e, n, a, s, y), (p = mt($r, Kr)) < m && (c =
				y, m = p);
			m = 1 / 0;
			for (var _ = 0; _ < 32 && !(v < Yr); _++) d = c - v, f = c + v, Kr[0] = ea(t, i, r, o, d), Kr[1] = ea(e, n, a, s,
				d), p = mt(Kr, $r), 0 <= d && p < m ? (c = d, m = p) : (Qr[0] = ea(t, i, r, o, f), Qr[1] = ea(e, n, a, s, f), g =
				mt(Qr, $r), f <= 1 && g < m ? (c = f, m = g) : v *= .5);
			return u && (u[0] = ea(t, i, r, o, c), u[1] = ea(e, n, a, s, c)), Ur(m)
		}(t, e, i, n, r, a, o, s, h, u, null) <= c / 2
	}

	function Ba(t, e, i, n, r, a, o, s, l) {
		if (0 === o) return !1;
		var h = o;
		return !(e + h < l && n + h < l && a + h < l || l < e - h && l < n - h && l < a - h || t + h < s && i + h < s && r +
			h < s || s < t - h && s < i - h && s < r - h) && function(t, e, i, n, r, a, o, s, l) {
			var h, u = .005,
				c = 1 / 0;
			$r[0] = o, $r[1] = s;
			for (var d = 0; d < 1; d += .05) {
				Kr[0] = aa(t, i, r, d), Kr[1] = aa(e, n, a, d), (v = mt($r, Kr)) < c && (h = d, c = v)
			}
			c = 1 / 0;
			for (var f = 0; f < 32 && !(u < Yr); f++) {
				var p = h - u,
					g = h + u;
				Kr[0] = aa(t, i, r, p), Kr[1] = aa(e, n, a, p);
				var v = mt(Kr, $r);
				if (0 <= p && v < c) h = p, c = v;
				else {
					Qr[0] = aa(t, i, r, g), Qr[1] = aa(e, n, a, g);
					var m = mt(Qr, $r);
					g <= 1 && m < c ? (h = g, c = m) : u *= .5
				}
			}
			return l && (l[0] = aa(t, i, r, h), l[1] = aa(e, n, a, h)), Ur(c)
		}(t, e, i, n, r, a, s, l, null) <= h / 2
	}
	Ea.prototype = {
		constructor: Ea,
		_xi: 0,
		_yi: 0,
		_x0: 0,
		_y0: 0,
		_ux: 0,
		_uy: 0,
		_len: 0,
		_lineDash: null,
		_dashOffset: 0,
		_dashIdx: 0,
		_dashSum: 0,
		setScale: function(t, e, i) {
			i = i || 0, this._ux = Oa(i / ii / t) || 0, this._uy = Oa(i / ii / e) || 0
		},
		getContext: function() {
			return this._ctx
		},
		beginPath: function(t) {
			return (this._ctx = t) && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), this._lineDash &&
				(this._lineDash = null, this._dashOffset = 0), this
		},
		moveTo: function(t, e) {
			return this.addData(Sa.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t,
				this._yi = e, this
		},
		lineTo: function(t, e) {
			var i = Oa(t - this._xi) > this._ux || Oa(e - this._yi) > this._uy || this._len < 5;
			return this.addData(Sa.L, t, e), this._ctx && i && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(
				t, e)), i && (this._xi = t, this._yi = e), this
		},
		bezierCurveTo: function(t, e, i, n, r, a) {
			return this.addData(Sa.C, t, e, i, n, r, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, i, n, r,
				a) : this._ctx.bezierCurveTo(t, e, i, n, r, a)), this._xi = r, this._yi = a, this
		},
		quadraticCurveTo: function(t, e, i, n) {
			return this.addData(Sa.Q, t, e, i, n), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, i, n) :
				this._ctx.quadraticCurveTo(t, e, i, n)), this._xi = i, this._yi = n, this
		},
		arc: function(t, e, i, n, r, a) {
			return this.addData(Sa.A, t, e, i, i, n, r - n, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, n, r, a), this
				._xi = ka(r) * i + t, this._yi = Pa(r) * i + e, this
		},
		arcTo: function(t, e, i, n, r) {
			return this._ctx && this._ctx.arcTo(t, e, i, n, r), this
		},
		rect: function(t, e, i, n) {
			return this._ctx && this._ctx.rect(t, e, i, n), this.addData(Sa.R, t, e, i, n), this
		},
		closePath: function() {
			this.addData(Sa.Z);
			var t = this._ctx,
				e = this._x0,
				i = this._y0;
			return t && (this._needsDash() && this._dashedLineTo(e, i), t.closePath()), this._xi = e, this._yi = i, this
		},
		fill: function(t) {
			t && t.fill(), this.toStatic()
		},
		stroke: function(t) {
			t && t.stroke(), this.toStatic()
		},
		setLineDash: function(t) {
			if (t instanceof Array) {
				this._lineDash = t;
				for (var e = this._dashIdx = 0, i = 0; i < t.length; i++) e += t[i];
				this._dashSum = e
			}
			return this
		},
		setLineDashOffset: function(t) {
			return this._dashOffset = t, this
		},
		len: function() {
			return this._len
		},
		setData: function(t) {
			var e = t.length;
			this.data && this.data.length === e || !za || (this.data = new Float32Array(e));
			for (var i = 0; i < e; i++) this.data[i] = t[i];
			this._len = e
		},
		appendPath: function(t) {
			t instanceof Array || (t = [t]);
			for (var e = t.length, i = 0, n = this._len, r = 0; r < e; r++) i += t[r].len();
			za && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
			for (r = 0; r < e; r++)
				for (var a = t[r].data, o = 0; o < a.length; o++) this.data[n++] = a[o];
			this._len = n
		},
		addData: function(t) {
			if (this._saveData) {
				var e = this.data;
				this._len + arguments.length > e.length && (this._expandData(), e = this.data);
				for (var i = 0; i < arguments.length; i++) e[this._len++] = arguments[i];
				this._prevCmd = t
			}
		},
		_expandData: function() {
			if (!(this.data instanceof Array)) {
				for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
				this.data = t
			}
		},
		_needsDash: function() {
			return this._lineDash
		},
		_dashedLineTo: function(t, e) {
			var i, n, r = this._dashSum,
				a = this._dashOffset,
				o = this._lineDash,
				s = this._ctx,
				l = this._xi,
				h = this._yi,
				u = t - l,
				c = e - h,
				d = La(u * u + c * c),
				f = l,
				p = h,
				g = o.length;
			for (a < 0 && (a = r + a), f -= (a %= r) * (u /= d), p -= a * (c /= d); 0 < u && f <= t || u < 0 && t <= f || 0 ===
				u && (0 < c && p <= e || c < 0 && e <= p);) f += u * (i = o[n = this._dashIdx]), p += c * i, this._dashIdx = (n +
				1) % g, 0 < u && f < l || u < 0 && l < f || 0 < c && p < h || c < 0 && h < p || s[n % 2 ? "moveTo" : "lineTo"](
				0 <= u ? Ta(f, t) : Da(f, t), 0 <= c ? Ta(p, e) : Da(p, e));
			u = f - t, c = p - e, this._dashOffset = -La(u * u + c * c)
		},
		_dashedBezierTo: function(t, e, i, n, r, a) {
			var o, s, l, h, u, c = this._dashSum,
				d = this._dashOffset,
				f = this._lineDash,
				p = this._ctx,
				g = this._xi,
				v = this._yi,
				m = ea,
				y = 0,
				_ = this._dashIdx,
				x = f.length,
				w = 0;
			for (d < 0 && (d = c + d), d %= c, o = 0; o < 1; o += .1) s = m(g, t, i, r, o + .1) - m(g, t, i, r, o), l = m(v,
				e, n, a, o + .1) - m(v, e, n, a, o), y += La(s * s + l * l);
			for (; _ < x && !(d < (w += f[_])); _++);
			for (o = (w - d) / y; o <= 1;) h = m(g, t, i, r, o), u = m(v, e, n, a, o), _ % 2 ? p.moveTo(h, u) : p.lineTo(h, u),
				o += f[_] / y, _ = (_ + 1) % x;
			_ % 2 != 0 && p.lineTo(r, a), s = r - h, l = a - u, this._dashOffset = -La(s * s + l * l)
		},
		_dashedQuadraticTo: function(t, e, i, n) {
			var r = i,
				a = n;
			i = (i + 2 * t) / 3, n = (n + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, this._dashedBezierTo(
				t, e, i, n, r, a)
		},
		toStatic: function() {
			var t = this.data;
			t instanceof Array && (t.length = this._len, za && (this.data = new Float32Array(t)))
		},
		getBoundingRect: function() {
			Ma[0] = Ma[1] = Ca[0] = Ca[1] = Number.MAX_VALUE, Ia[0] = Ia[1] = Aa[0] = Aa[1] = -Number.MAX_VALUE;
			for (var t, e, i, n, r, a, o, s, l, h, u, c, d, f, p = this.data, g = 0, v = 0, m = 0, y = 0, _ = 0; _ < p.length;) {
				var x = p[_++];
				switch (1 === _ && (m = g = p[_], y = v = p[_ + 1]), x) {
					case Sa.M:
						g = m = p[_++], v = y = p[_++], Ca[0] = m, Ca[1] = y, Aa[0] = m, Aa[1] = y;
						break;
					case Sa.L:
						ya(g, v, p[_], p[_ + 1], Ca, Aa), g = p[_++], v = p[_++];
						break;
					case Sa.C:
						wa(g, v, p[_++], p[_++], p[_++], p[_++], p[_], p[_ + 1], Ca, Aa), g = p[_++], v = p[_++];
						break;
					case Sa.Q:
						t = g, e = v, i = p[_++], n = p[_++], r = p[_], a = p[_ + 1], o = Ca, s = Aa, h = l = void 0, h = aa, u = ua(
							ha((l = sa)(t, i, r), 1), 0), c = ua(ha(l(e, n, a), 1), 0), d = h(t, i, r, u), f = h(e, n, a, c), o[0] = ha(
							t, r, d), o[1] = ha(e, a, f), s[0] = ua(t, r, d), s[1] = ua(e, a, f), g = p[_++], v = p[_++];
						break;
					case Sa.A:
						var w = p[_++],
							b = p[_++],
							S = p[_++],
							M = p[_++],
							I = p[_++],
							C = p[_++] + I;
						_ += 1;
						var A = 1 - p[_++];
						1 === _ && (m = ka(I) * S + w, y = Pa(I) * M + b), ba(w, b, S, M, I, C, A, Ca, Aa), g = ka(C) * S + w, v = Pa(
							C) * M + b;
						break;
					case Sa.R:
						ya(m = g = p[_++], y = v = p[_++], m + p[_++], y + p[_++], Ca, Aa);
						break;
					case Sa.Z:
						g = m, v = y
				}
				_t(Ma, Ma, Ca), xt(Ia, Ia, Aa)
			}
			return 0 === _ && (Ma[0] = Ma[1] = Ia[0] = Ia[1] = 0), new vi(Ma[0], Ma[1], Ia[0] - Ma[0], Ia[1] - Ma[1])
		},
		rebuildPath: function(t) {
			for (var e, i, n, r, a, o, s = this.data, l = this._ux, h = this._uy, u = this._len, c = 0; c < u;) {
				var d = s[c++];
				switch (1 === c && (e = n = s[c], i = r = s[c + 1]), d) {
					case Sa.M:
						e = n = s[c++], i = r = s[c++], t.moveTo(n, r);
						break;
					case Sa.L:
						a = s[c++], o = s[c++], (Oa(a - n) > l || Oa(o - r) > h || c === u - 1) && (t.lineTo(a, o), n = a, r = o);
						break;
					case Sa.C:
						t.bezierCurveTo(s[c++], s[c++], s[c++], s[c++], s[c++], s[c++]), n = s[c - 2], r = s[c - 1];
						break;
					case Sa.Q:
						t.quadraticCurveTo(s[c++], s[c++], s[c++], s[c++]), n = s[c - 2], r = s[c - 1];
						break;
					case Sa.A:
						var f = s[c++],
							p = s[c++],
							g = s[c++],
							v = s[c++],
							m = s[c++],
							y = s[c++],
							_ = s[c++],
							x = s[c++],
							w = v < g ? g : v,
							b = v < g ? 1 : g / v,
							S = v < g ? v / g : 1,
							M = m + y;
						.001 < Math.abs(g - v) ? (t.translate(f, p), t.rotate(_), t.scale(b, S), t.arc(0, 0, w, m, M, 1 - x), t.scale(
							1 / b, 1 / S), t.rotate(-_), t.translate(-f, -p)) : t.arc(f, p, w, m, M, 1 - x), 1 === c && (e = ka(m) * g +
							f, i = Pa(m) * v + p), n = ka(M) * g + f, r = Pa(M) * v + p;
						break;
					case Sa.R:
						e = n = s[c], i = r = s[c + 1], t.rect(s[c++], s[c++], s[c++], s[c++]);
						break;
					case Sa.Z:
						t.closePath(), n = e, r = i
				}
			}
		}
	}, Ea.CMD = Sa;
	var Va = 2 * Math.PI;

	function Fa(t) {
		return (t %= Va) < 0 && (t += Va), t
	}
	var Ha = 2 * Math.PI;

	function Ga(t, e, i, n, r, a, o, s, l) {
		if (0 === o) return !1;
		var h = o;
		s -= t, l -= e;
		var u = Math.sqrt(s * s + l * l);
		if (i < u - h || u + h < i) return !1;
		if (Math.abs(n - r) % Ha < 1e-4) return !0;
		if (a) {
			var c = n;
			n = Fa(r), r = Fa(c)
		} else n = Fa(n), r = Fa(r);
		r < n && (r += Ha);
		var d = Math.atan2(l, s);
		return d < 0 && (d += Ha), n <= d && d <= r || n <= d + Ha && d + Ha <= r
	}

	function Wa(t, e, i, n, r, a) {
		if (e < a && n < a || a < e && a < n) return 0;
		if (n === e) return 0;
		var o = n < e ? 1 : -1,
			s = (a - e) / (n - e);
		1 != s && 0 != s || (o = n < e ? .5 : -.5);
		var l = s * (i - t) + t;
		return l === r ? 1 / 0 : r < l ? o : 0
	}
	var Za = Ea.CMD,
		Ua = 2 * Math.PI,
		Xa = 1e-4;
	var Ya = [-1, -1, -1],
		ja = [-1, -1];

	function qa(t, e, i, n, r, a, o, s, l, h) {
		if (e < h && n < h && a < h && s < h || h < e && h < n && h < a && h < s) return 0;
		var u, c = function(t, e, i, n, r, a) {
			var o = n + 3 * (e - i) - t,
				s = 3 * (i - 2 * e + t),
				l = 3 * (e - t),
				h = t - r,
				u = s * s - 3 * o * l,
				c = s * l - 9 * o * h,
				d = l * l - 3 * s * h,
				f = 0;
			if (Jr(u) && Jr(c)) {
				if (Jr(s)) a[0] = 0;
				else 0 <= (M = -l / s) && M <= 1 && (a[f++] = M)
			} else {
				var p = c * c - 4 * u * d;
				if (Jr(p)) {
					var g = c / u,
						v = -g / 2;
					0 <= (M = -s / o + g) && M <= 1 && (a[f++] = M), 0 <= v && v <= 1 && (a[f++] = v)
				} else if (0 < p) {
					var m = Ur(p),
						y = u * s + 1.5 * o * (-c + m),
						_ = u * s + 1.5 * o * (-c - m);
					0 <= (M = (-s - ((y = y < 0 ? -Zr(-y, qr) : Zr(y, qr)) + (_ = _ < 0 ? -Zr(-_, qr) : Zr(_, qr)))) / (3 * o)) && M <=
						1 && (a[f++] = M)
				} else {
					var x = (2 * u * s - 3 * o * c) / (2 * Ur(u * u * u)),
						w = Math.acos(x) / 3,
						b = Ur(u),
						S = Math.cos(w),
						M = (-s - 2 * b * S) / (3 * o),
						I = (v = (-s + b * (S + jr * Math.sin(w))) / (3 * o), (-s + b * (S - jr * Math.sin(w))) / (3 * o));
					0 <= M && M <= 1 && (a[f++] = M), 0 <= v && v <= 1 && (a[f++] = v), 0 <= I && I <= 1 && (a[f++] = I)
				}
			}
			return f
		}(e, n, a, s, h, Ya);
		if (0 === c) return 0;
		for (var d, f, p = 0, g = -1, v = 0; v < c; v++) {
			var m = Ya[v],
				y = 0 === m || 1 === m ? .5 : 1;
			ea(t, i, r, o, m) < l || (g < 0 && (g = na(e, n, a, s, ja), ja[1] < ja[0] && 1 < g && (void 0, u = ja[0], ja[0] =
					ja[1], ja[1] = u), d = ea(e, n, a, s, ja[0]), 1 < g && (f = ea(e, n, a, s, ja[1]))), 2 === g ? m < ja[0] ? p +=
				d < e ? y : -y : m < ja[1] ? p += f < d ? y : -y : p += s < f ? y : -y : m < ja[0] ? p += d < e ? y : -y : p += s <
				d ? y : -y)
		}
		return p
	}

	function $a(t, e, i, n, r, a, o, s) {
		if (e < s && n < s && a < s || s < e && s < n && s < a) return 0;
		var l = function(t, e, i, n, r) {
			var a = t - 2 * e + i,
				o = 2 * (e - t),
				s = t - n,
				l = 0;
			if (Jr(a)) {
				if (ta(o)) 0 <= (u = -s / o) && u <= 1 && (r[l++] = u)
			} else {
				var h = o * o - 4 * a * s;
				if (Jr(h)) 0 <= (u = -o / (2 * a)) && u <= 1 && (r[l++] = u);
				else if (0 < h) {
					var u, c = Ur(h),
						d = (-o - c) / (2 * a);
					0 <= (u = (-o + c) / (2 * a)) && u <= 1 && (r[l++] = u), 0 <= d && d <= 1 && (r[l++] = d)
				}
			}
			return l
		}(e, n, a, s, Ya);
		if (0 === l) return 0;
		var h = sa(e, n, a);
		if (0 <= h && h <= 1) {
			for (var u = 0, c = aa(e, n, a, h), d = 0; d < l; d++) {
				var f = 0 === Ya[d] || 1 === Ya[d] ? .5 : 1;
				aa(t, i, r, Ya[d]) < o || (Ya[d] < h ? u += c < e ? f : -f : u += a < c ? f : -f)
			}
			return u
		}
		f = 0 === Ya[0] || 1 === Ya[0] ? .5 : 1;
		return aa(t, i, r, Ya[0]) < o ? 0 : a < e ? f : -f
	}

	function Ka(t, e, i, n, r, a, o, s) {
		if (i < (s -= e) || s < -i) return 0;
		var l = Math.sqrt(i * i - s * s);
		Ya[0] = -l, Ya[1] = l;
		var h = Math.abs(n - r);
		if (h < 1e-4) return 0;
		if (h % Ua < 1e-4) {
			r = Ua;
			var u = a ? 1 : -1;
			return o >= Ya[n = 0] + t && o <= Ya[1] + t ? u : 0
		}
		if (a) {
			l = n;
			n = Fa(r), r = Fa(l)
		} else n = Fa(n), r = Fa(r);
		r < n && (r += Ua);
		for (var c = 0, d = 0; d < 2; d++) {
			var f = Ya[d];
			if (o < f + t) {
				var p = Math.atan2(s, f);
				u = a ? 1 : -1;
				p < 0 && (p = Ua + p), (n <= p && p <= r || n <= p + Ua && p + Ua <= r) && (p > Math.PI / 2 && p < 1.5 * Math.PI &&
					(u = -u), c += u)
			}
		}
		return c
	}

	function Qa(t, e, i, n, r) {
		for (var a = 0, o = 0, s = 0, l = 0, h = 0, u = 0; u < t.length;) {
			var c = t[u++];
			switch (c === Za.M && 1 < u && (i || (a += Wa(o, s, l, h, n, r))), 1 === u && (l = o = t[u], h = s = t[u + 1]), c) {
				case Za.M:
					o = l = t[u++], s = h = t[u++];
					break;
				case Za.L:
					if (i) {
						if (Na(o, s, t[u], t[u + 1], e, n, r)) return !0
					} else a += Wa(o, s, t[u], t[u + 1], n, r) || 0;
					o = t[u++], s = t[u++];
					break;
				case Za.C:
					if (i) {
						if (Ra(o, s, t[u++], t[u++], t[u++], t[u++], t[u], t[u + 1], e, n, r)) return !0
					} else a += qa(o, s, t[u++], t[u++], t[u++], t[u++], t[u], t[u + 1], n, r) || 0;
					o = t[u++], s = t[u++];
					break;
				case Za.Q:
					if (i) {
						if (Ba(o, s, t[u++], t[u++], t[u], t[u + 1], e, n, r)) return !0
					} else a += $a(o, s, t[u++], t[u++], t[u], t[u + 1], n, r) || 0;
					o = t[u++], s = t[u++];
					break;
				case Za.A:
					var d = t[u++],
						f = t[u++],
						p = t[u++],
						g = t[u++],
						v = t[u++],
						m = t[u++];
					u += 1;
					var y = 1 - t[u++],
						_ = Math.cos(v) * p + d,
						x = Math.sin(v) * g + f;
					1 < u ? a += Wa(o, s, _, x, n, r) : (l = _, h = x);
					var w = (n - d) * g / p + d;
					if (i) {
						if (Ga(d, f, g, v, v + m, y, e, w, r)) return !0
					} else a += Ka(d, f, g, v, v + m, y, w, r);
					o = Math.cos(v + m) * p + d, s = Math.sin(v + m) * g + f;
					break;
				case Za.R:
					l = o = t[u++], h = s = t[u++];
					_ = l + t[u++], x = h + t[u++];
					if (i) {
						if (Na(l, h, _, h, e, n, r) || Na(_, h, _, x, e, n, r) || Na(_, x, l, x, e, n, r) || Na(l, x, l, h, e, n, r))
							return !0
					} else a += Wa(_, h, _, x, n, r), a += Wa(l, x, l, h, n, r);
					break;
				case Za.Z:
					if (i) {
						if (Na(o, s, l, h, e, n, r)) return !0
					} else a += Wa(o, s, l, h, n, r);
					o = l, s = h
			}
		}
		return i || function(t, e) {
			return Math.abs(t - e) < Xa
		}(s, h) || (a += Wa(o, s, l, h, n, r) || 0), 0 !== a
	}
	var Ja = Vi.prototype.getCanvasPattern,
		to = Math.abs,
		eo = new Ea(!0);

	function io(t) {
		Fn.call(this, t), this.path = null
	}
	io.prototype = {
		constructor: io,
		type: "path",
		__dirtyPath: !0,
		strokeContainThreshold: 5,
		segmentIgnoreThreshold: 0,
		subPixelOptimize: !1,
		brush: function(t, e) {
			var i, n = this.style,
				r = this.path || eo,
				a = n.hasStroke(),
				o = n.hasFill(),
				s = n.fill,
				l = n.stroke,
				h = o && !!s.colorStops,
				u = a && !!l.colorStops,
				c = o && !!s.image,
				d = a && !!l.image;
			n.bind(t, this, e), this.setTransform(t), this.__dirty && (h && (i = i || this.getBoundingRect(), this._fillGradient =
				n.getGradient(t, s, i)), u && (i = i || this.getBoundingRect(), this._strokeGradient = n.getGradient(t, l, i)));
			h ? t.fillStyle = this._fillGradient : c && (t.fillStyle = Ja.call(s, t)), u ? t.strokeStyle = this._strokeGradient :
				d && (t.strokeStyle = Ja.call(l, t));
			var f = n.lineDash,
				p = n.lineDashOffset,
				g = !!t.setLineDash,
				v = this.getGlobalScale();
			if (r.setScale(v[0], v[1], this.segmentIgnoreThreshold), this.__dirtyPath || f && !g && a ? (r.beginPath(t), f &&
					!g && (r.setLineDash(f), r.setLineDashOffset(p)), this.buildPath(r, this.shape, !1), this.path && (this.__dirtyPath = !
						1)) : (t.beginPath(), this.path.rebuildPath(t)), o)
				if (null != n.fillOpacity) {
					var m = t.globalAlpha;
					t.globalAlpha = n.fillOpacity * n.opacity, r.fill(t), t.globalAlpha = m
				} else r.fill(t);
			if (f && g && (t.setLineDash(f), t.lineDashOffset = p), a)
				if (null != n.strokeOpacity) {
					m = t.globalAlpha;
					t.globalAlpha = n.strokeOpacity * n.opacity, r.stroke(t), t.globalAlpha = m
				} else r.stroke(t);
			f && g && t.setLineDash([]), null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()))
		},
		buildPath: function(t, e, i) {},
		createPathProxy: function() {
			this.path = new Ea
		},
		getBoundingRect: function() {
			var t = this._rect,
				e = this.style,
				i = !t;
			if (i) {
				var n = this.path;
				n = n || (this.path = new Ea), this.__dirtyPath && (n.beginPath(), this.buildPath(n, this.shape, !1)), t = n.getBoundingRect()
			}
			if (this._rect = t, e.hasStroke()) {
				var r = this._rectWithStroke || (this._rectWithStroke = t.clone());
				if (this.__dirty || i) {
					r.copy(t);
					var a = e.lineWidth,
						o = e.strokeNoScale ? this.getLineScale() : 1;
					e.hasFill() || (a = Math.max(a, this.strokeContainThreshold || 4)), 1e-10 < o && (r.width += a / o, r.height +=
						a / o, r.x -= a / o / 2, r.y -= a / o / 2)
				}
				return r
			}
			return t
		},
		contain: function(t, e) {
			var i = this.transformCoordToLocal(t, e),
				n = this.getBoundingRect(),
				r = this.style;
			if (t = i[0], e = i[1], n.contain(t, e)) {
				var a = this.path.data;
				if (r.hasStroke()) {
					var o = r.lineWidth,
						s = r.strokeNoScale ? this.getLineScale() : 1;
					if (1e-10 < s && (r.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), function(t, e, i, n) {
							return Qa(t, e, !0, i, n)
						}(a, o / s, t, e))) return !0
				}
				if (r.hasFill()) return function(t, e, i) {
					return Qa(t, 0, !1, e, i)
				}(a, t, e)
			}
			return !1
		},
		dirty: function(t) {
			null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = this.__dirtyText = !0, this
				.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty()
		},
		animateShape: function(t) {
			return this.animate("shape", t)
		},
		attrKV: function(t, e) {
			"shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : Fn.prototype.attrKV.call(this, t,
				e)
		},
		setShape: function(t, e) {
			var i = this.shape;
			if (i) {
				if (N(t))
					for (var n in t) t.hasOwnProperty(n) && (i[n] = t[n]);
				else i[t] = e;
				this.dirty(!0)
			}
			return this
		},
		getLineScale: function() {
			var t = this.transform;
			return t && 1e-10 < to(t[0] - 1) && 1e-10 < to(t[3] - 1) ? Math.sqrt(to(t[0] * t[3] - t[2] * t[1])) : 1
		}
	}, io.extend = function(r) {
		function t(t) {
			io.call(this, t), r.style && this.style.extendFrom(r.style, !1);
			var e = r.shape;
			if (e) {
				this.shape = this.shape || {};
				var i = this.shape;
				for (var n in e) !i.hasOwnProperty(n) && e.hasOwnProperty(n) && (i[n] = e[n])
			}
			r.init && r.init.call(this, t)
		}
		for (var e in w(t, io), r) "style" !== e && "shape" !== e && (t.prototype[e] = r[e]);
		return t
	}, w(io, Fn);

	function no(t) {
		return Math.sqrt(t[0] * t[0] + t[1] * t[1])
	}
	var ro = Ea.CMD,
		ao = [
			[],
			[],
			[]
		],
		oo = Math.sqrt,
		so = Math.atan2,
		lo = function(t, e) {
			var i, n, r, a, o, s = t.data,
				l = ro.M,
				h = ro.C,
				u = ro.L,
				c = ro.R,
				d = ro.A,
				f = ro.Q;
			for (a = r = 0; r < s.length;) {
				switch (i = s[r++], a = r, n = 0, i) {
					case l:
					case u:
						n = 1;
						break;
					case h:
						n = 3;
						break;
					case f:
						n = 2;
						break;
					case d:
						var p = e[4],
							g = e[5],
							v = oo(e[0] * e[0] + e[1] * e[1]),
							m = oo(e[2] * e[2] + e[3] * e[3]),
							y = so(-e[1] / m, e[0] / v);
						s[r] *= v, s[r++] += p, s[r] *= m, s[r++] += g, s[r++] *= v, s[r++] *= m, s[r++] += y, s[r++] += y, a = r += 2;
						break;
					case c:
						_[0] = s[r++], _[1] = s[r++], yt(_, _, e), s[a++] = _[0], s[a++] = _[1], _[0] += s[r++], _[1] += s[r++], yt(_, _,
							e), s[a++] = _[0], s[a++] = _[1]
				}
				for (o = 0; o < n; o++) {
					var _;
					(_ = ao[o])[0] = s[r++], _[1] = s[r++], yt(_, _, e), s[a++] = _[0], s[a++] = _[1]
				}
			}
		},
		ho = Math.sqrt,
		uo = Math.sin,
		co = Math.cos,
		fo = Math.PI,
		po = function(t, e) {
			return (t[0] * e[0] + t[1] * e[1]) / (no(t) * no(e))
		},
		go = function(t, e) {
			return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(po(t, e))
		};

	function vo(t, e, i, n, r, a, o, s, l, h, u) {
		var c = l * (fo / 180),
			d = co(c) * (t - i) / 2 + uo(c) * (e - n) / 2,
			f = -1 * uo(c) * (t - i) / 2 + co(c) * (e - n) / 2,
			p = d * d / (o * o) + f * f / (s * s);
		1 < p && (o *= ho(p), s *= ho(p));
		var g = (r === a ? -1 : 1) * ho((o * o * (s * s) - o * o * (f * f) - s * s * (d * d)) / (o * o * (f * f) + s * s * (
				d * d))) || 0,
			v = g * o * f / s,
			m = g * -s * d / o,
			y = (t + i) / 2 + co(c) * v - uo(c) * m,
			_ = (e + n) / 2 + uo(c) * v + co(c) * m,
			x = go([1, 0], [(d - v) / o, (f - m) / s]),
			w = [(d - v) / o, (f - m) / s],
			b = [(-1 * d - v) / o, (-1 * f - m) / s],
			S = go(w, b);
		po(w, b) <= -1 && (S = fo), 1 <= po(w, b) && (S = 0), 0 === a && 0 < S && (S -= 2 * fo), 1 === a && S < 0 && (S += 2 *
			fo), u.addData(h, y, _, o, s, x, S, c, a)
	}
	var mo = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,
		yo = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;

	function _o(t, e) {
		var i = function(t) {
			if (!t) return new Ea;
			for (var e, i = 0, n = 0, r = i, a = n, o = new Ea, s = Ea.CMD, l = t.match(mo), h = 0; h < l.length; h++) {
				for (var u, c = l[h], d = c.charAt(0), f = c.match(yo) || [], p = f.length, g = 0; g < p; g++) f[g] = parseFloat(
					f[g]);
				for (var v = 0; v < p;) {
					var m, y, _, x, w, b, S, M = i,
						I = n;
					switch (d) {
						case "l":
							i += f[v++], n += f[v++], u = s.L, o.addData(u, i, n);
							break;
						case "L":
							i = f[v++], n = f[v++], u = s.L, o.addData(u, i, n);
							break;
						case "m":
							i += f[v++], n += f[v++], u = s.M, o.addData(u, i, n), r = i, a = n, d = "l";
							break;
						case "M":
							i = f[v++], n = f[v++], u = s.M, o.addData(u, i, n), r = i, a = n, d = "L";
							break;
						case "h":
							i += f[v++], u = s.L, o.addData(u, i, n);
							break;
						case "H":
							i = f[v++], u = s.L, o.addData(u, i, n);
							break;
						case "v":
							n += f[v++], u = s.L, o.addData(u, i, n);
							break;
						case "V":
							n = f[v++], u = s.L, o.addData(u, i, n);
							break;
						case "C":
							u = s.C, o.addData(u, f[v++], f[v++], f[v++], f[v++], f[v++], f[v++]), i = f[v - 2], n = f[v - 1];
							break;
						case "c":
							u = s.C, o.addData(u, f[v++] + i, f[v++] + n, f[v++] + i, f[v++] + n, f[v++] + i, f[v++] + n), i += f[v - 2],
								n += f[v - 1];
							break;
						case "S":
							m = i, y = n;
							var C = o.len(),
								A = o.data;
							e === s.C && (m += i - A[C - 4], y += n - A[C - 3]), u = s.C, M = f[v++], I = f[v++], i = f[v++], n = f[v++],
								o.addData(u, m, y, M, I, i, n);
							break;
						case "s":
							m = i, y = n;
							C = o.len(), A = o.data;
							e === s.C && (m += i - A[C - 4], y += n - A[C - 3]), u = s.C, M = i + f[v++], I = n + f[v++], i += f[v++], n +=
								f[v++], o.addData(u, m, y, M, I, i, n);
							break;
						case "Q":
							M = f[v++], I = f[v++], i = f[v++], n = f[v++], u = s.Q, o.addData(u, M, I, i, n);
							break;
						case "q":
							M = f[v++] + i, I = f[v++] + n, i += f[v++], n += f[v++], u = s.Q, o.addData(u, M, I, i, n);
							break;
						case "T":
							m = i, y = n;
							C = o.len(), A = o.data;
							e === s.Q && (m += i - A[C - 4], y += n - A[C - 3]), i = f[v++], n = f[v++], u = s.Q, o.addData(u, m, y, i, n);
							break;
						case "t":
							m = i, y = n;
							C = o.len(), A = o.data;
							e === s.Q && (m += i - A[C - 4], y += n - A[C - 3]), i += f[v++], n += f[v++], u = s.Q, o.addData(u, m, y, i,
								n);
							break;
						case "A":
							_ = f[v++], x = f[v++], w = f[v++], b = f[v++], S = f[v++], vo(M = i, I = n, i = f[v++], n = f[v++], b, S, _,
								x, w, u = s.A, o);
							break;
						case "a":
							_ = f[v++], x = f[v++], w = f[v++], b = f[v++], S = f[v++], vo(M = i, I = n, i += f[v++], n += f[v++], b, S, _,
								x, w, u = s.A, o)
					}
				}
				"z" !== d && "Z" !== d || (u = s.Z, o.addData(u), i = r, n = a), e = u
			}
			return o.toStatic(), o
		}(t);
		return (e = e || {}).buildPath = function(t) {
			if (t.setData) {
				t.setData(i.data), (e = t.getContext()) && t.rebuildPath(e)
			} else {
				var e = t;
				i.rebuildPath(e)
			}
		}, e.applyTransform = function(t) {
			lo(i, t), this.dirty(!0)
		}, e
	}

	function xo(t, e) {
		return new io(_o(t, e))
	}
	var wo = function(t) {
		Fn.call(this, t)
	};
	wo.prototype = {
		constructor: wo,
		type: "text",
		brush: function(t, e) {
			var i = this.style;
			this.__dirty && Sn(i), i.fill = i.stroke = i.shadowBlur = i.shadowColor = i.shadowOffsetX = i.shadowOffsetY =
				null;
			var n = i.text;
			null != n && (n += ""), Rn(n, i) ? (this.setTransform(t), In(this, t, n, i, null, e), this.restoreTransform(t)) :
				t.__attrCachedBy = ki.NONE
		},
		getBoundingRect: function() {
			var t = this.style;
			if (this.__dirty && Sn(t), !this._rect) {
				var e = t.text;
				null != e ? e += "" : e = "";
				var i = nn(t.text + "", t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich);
				if (i.x += t.x || 0, i.y += t.y || 0, On(t.textStroke, t.textStrokeWidth)) {
					var n = t.textStrokeWidth;
					i.x -= n / 2, i.y -= n / 2, i.width += n, i.height += n
				}
				this._rect = i
			}
			return this._rect
		}
	}, w(wo, Fn);

	function bo(l) {
		return m.browser.ie && 11 <= m.browser.version ? function() {
			var t, e = this.__clipPaths,
				i = this.style;
			if (e)
				for (var n = 0; n < e.length; n++) {
					var r = e[n],
						a = r && r.shape,
						o = r && r.type;
					if (a && ("sector" === o && a.startAngle === a.endAngle || "rect" === o && (!a.width || !a.height))) {
						for (var s = 0; s < Mo.length; s++) Mo[s][2] = i[Mo[s][0]], i[Mo[s][0]] = Mo[s][1];
						t = !0;
						break
					}
				}
			if (l.apply(this, arguments), t)
				for (s = 0; s < Mo.length; s++) i[Mo[s][0]] = Mo[s][2]
		} : l
	}
	var So = io.extend({
			type: "circle",
			shape: {
				cx: 0,
				cy: 0,
				r: 0
			},
			buildPath: function(t, e, i) {
				i && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0)
			}
		}),
		Mo = [
			["shadowBlur", 0],
			["shadowColor", "#000"],
			["shadowOffsetX", 0],
			["shadowOffsetY", 0]
		],
		Io = io.extend({
			type: "sector",
			shape: {
				cx: 0,
				cy: 0,
				r0: 0,
				r: 0,
				startAngle: 0,
				endAngle: 2 * Math.PI,
				clockwise: !0
			},
			brush: bo(io.prototype.brush),
			buildPath: function(t, e) {
				var i = e.cx,
					n = e.cy,
					r = Math.max(e.r0 || 0, 0),
					a = Math.max(e.r, 0),
					o = e.startAngle,
					s = e.endAngle,
					l = e.clockwise,
					h = Math.cos(o),
					u = Math.sin(o);
				t.moveTo(h * r + i, u * r + n), t.lineTo(h * a + i, u * a + n), t.arc(i, n, a, o, s, !l), t.lineTo(Math.cos(s) *
					r + i, Math.sin(s) * r + n), 0 !== r && t.arc(i, n, r, s, o, l), t.closePath()
			}
		}),
		Co = io.extend({
			type: "ring",
			shape: {
				cx: 0,
				cy: 0,
				r: 0,
				r0: 0
			},
			buildPath: function(t, e) {
				var i = e.cx,
					n = e.cy,
					r = 2 * Math.PI;
				t.moveTo(i + e.r, n), t.arc(i, n, e.r, 0, r, !1), t.moveTo(i + e.r0, n), t.arc(i, n, e.r0, 0, r, !0)
			}
		});

	function Ao(t, e, i, n, r, a, o) {
		var s = .5 * (i - t),
			l = .5 * (n - e);
		return (2 * (e - i) + s + l) * o + (-3 * (e - i) - 2 * s - l) * a + s * r + e
	}

	function To(t, e, i) {
		var n = e.points,
			r = e.smooth;
		if (n && 2 <= n.length) {
			if (r && "spline" !== r) {
				var a = function(t, e, i, n) {
					var r, a, o, s, l = [],
						h = [],
						u = [],
						c = [];
					if (n) {
						o = [1 / 0, 1 / 0], s = [-1 / 0, -1 / 0];
						for (var d = 0, f = t.length; d < f; d++) _t(o, o, t[d]), xt(s, s, t[d]);
						_t(o, o, n[0]), xt(s, s, n[1])
					}
					for (d = 0, f = t.length; d < f; d++) {
						var p = t[d];
						if (i) r = t[d ? d - 1 : f - 1], a = t[(d + 1) % f];
						else {
							if (0 === d || d === f - 1) {
								l.push(rt(t[d]));
								continue
							}
							r = t[d - 1], a = t[d + 1]
						}
						st(h, a, r), dt(h, h, e);
						var g = pt(p, r),
							v = pt(p, a),
							m = g + v;
						0 !== m && (g /= m, v /= m), dt(u, h, -g), dt(c, h, v);
						var y = at([], p, u),
							_ = at([], p, c);
						n && (xt(y, y, o), _t(y, y, s), xt(_, _, o), _t(_, _, s)), l.push(y), l.push(_)
					}
					return i && l.push(l.shift()), l
				}(n, r, i, e.smoothConstraint);
				t.moveTo(n[0][0], n[0][1]);
				for (var o = n.length, s = 0; s < (i ? o : o - 1); s++) {
					var l = a[2 * s],
						h = a[2 * s + 1],
						u = n[(s + 1) % o];
					t.bezierCurveTo(l[0], l[1], h[0], h[1], u[0], u[1])
				}
			} else {
				"spline" === r && (n = function(t, e) {
					for (var i = t.length, n = [], r = 0, a = 1; a < i; a++) r += pt(t[a - 1], t[a]);
					var o = r / 2;
					o = o < i ? i : o;
					for (a = 0; a < o; a++) {
						var s, l, h, u = a / (o - 1) * (e ? i : i - 1),
							c = Math.floor(u),
							d = u - c,
							f = t[c % i];
						h = e ? (s = t[(c - 1 + i) % i], l = t[(c + 1) % i], t[(c + 2) % i]) : (s = t[0 === c ? c : c - 1], l = t[i -
							2 < c ? i - 1 : c + 1], t[i - 3 < c ? i - 1 : c + 2]);
						var p = d * d,
							g = d * p;
						n.push([Ao(s[0], f[0], l[0], h[0], d, p, g), Ao(s[1], f[1], l[1], h[1], d, p, g)])
					}
					return n
				}(n, i)), t.moveTo(n[0][0], n[0][1]);
				s = 1;
				for (var c = n.length; s < c; s++) t.lineTo(n[s][0], n[s][1])
			}
			i && t.closePath()
		}
	}
	var Do = io.extend({
			type: "polygon",
			shape: {
				points: null,
				smooth: !1,
				smoothConstraint: null
			},
			buildPath: function(t, e) {
				To(t, e, !0)
			}
		}),
		ko = io.extend({
			type: "polyline",
			shape: {
				points: null,
				smooth: !1,
				smoothConstraint: null
			},
			style: {
				stroke: "#000",
				fill: null
			},
			buildPath: function(t, e) {
				To(t, e, !1)
			}
		}),
		Po = Math.round;

	function Lo(t, e, i) {
		var n = i && i.lineWidth;
		if (e && n) {
			var r = e.x1,
				a = e.x2,
				o = e.y1,
				s = e.y2;
			Po(2 * r) === Po(2 * a) ? t.x1 = t.x2 = zo(r, n, !0) : (t.x1 = r, t.x2 = a), Po(2 * o) === Po(2 * s) ? t.y1 = t.y2 =
				zo(o, n, !0) : (t.y1 = o, t.y2 = s)
		}
	}

	function Oo(t, e, i) {
		var n = i && i.lineWidth;
		if (e && n) {
			var r = e.x,
				a = e.y,
				o = e.width,
				s = e.height;
			t.x = zo(r, n, !0), t.y = zo(a, n, !0), t.width = Math.max(zo(r + o, n, !1) - t.x, 0 === o ? 0 : 1), t.height =
				Math.max(zo(a + s, n, !1) - t.y, 0 === s ? 0 : 1)
		}
	}

	function zo(t, e, i) {
		var n = Po(2 * t);
		return (n + Po(e)) % 2 == 0 ? n / 2 : (n + (i ? 1 : -1)) / 2
	}
	var Eo = {},
		No = io.extend({
			type: "rect",
			shape: {
				r: 0,
				x: 0,
				y: 0,
				width: 0,
				height: 0
			},
			buildPath: function(t, e) {
				var i, n, r, a;
				this.subPixelOptimize ? (Oo(Eo, e, this.style), i = Eo.x, n = Eo.y, r = Eo.width, a = Eo.height, Eo.r = e.r, e =
					Eo) : (i = e.x, n = e.y, r = e.width, a = e.height), e.r ? vn(t, e) : t.rect(i, n, r, a), t.closePath()
			}
		}),
		Ro = {},
		Bo = io.extend({
			type: "line",
			shape: {
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 0,
				percent: 1
			},
			style: {
				stroke: "#000",
				fill: null
			},
			buildPath: function(t, e) {
				var i, n, r, a;
				a = this.subPixelOptimize ? (Lo(Ro, e, this.style), i = Ro.x1, n = Ro.y1, r = Ro.x2, Ro.y2) : (i = e.x1, n = e.y1,
					r = e.x2, e.y2);
				var o = e.percent;
				0 !== o && (t.moveTo(i, n), o < 1 && (r = i * (1 - o) + r * o, a = n * (1 - o) + a * o), t.lineTo(r, a))
			},
			pointAt: function(t) {
				var e = this.shape;
				return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t]
			}
		}),
		Vo = [];

	function Fo(t, e, i) {
		var n = t.cpx2,
			r = t.cpy2;
		return null === n || null === r ? [(i ? ia : ea)(t.x1, t.cpx1, t.cpx2, t.x2, e), (i ? ia : ea)(t.y1, t.cpy1, t.cpy2,
			t.y2, e)] : [(i ? oa : aa)(t.x1, t.cpx1, t.x2, e), (i ? oa : aa)(t.y1, t.cpy1, t.y2, e)]
	}

	function Ho(t) {
		this.colorStops = t || []
	}
	var Go = io.extend({
			type: "bezier-curve",
			shape: {
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 0,
				cpx1: 0,
				cpy1: 0,
				percent: 1
			},
			style: {
				stroke: "#000",
				fill: null
			},
			buildPath: function(t, e) {
				var i = e.x1,
					n = e.y1,
					r = e.x2,
					a = e.y2,
					o = e.cpx1,
					s = e.cpy1,
					l = e.cpx2,
					h = e.cpy2,
					u = e.percent;
				0 !== u && (t.moveTo(i, n), null == l || null == h ? (u < 1 && (la(i, o, r, u, Vo), o = Vo[1], r = Vo[2], la(n,
					s, a, u, Vo), s = Vo[1], a = Vo[2]), t.quadraticCurveTo(o, s, r, a)) : (u < 1 && (ra(i, o, l, r, u, Vo), o =
					Vo[1], l = Vo[2], r = Vo[3], ra(n, s, h, a, u, Vo), s = Vo[1], h = Vo[2], a = Vo[3]), t.bezierCurveTo(o, s,
					l, h, r, a)))
			},
			pointAt: function(t) {
				return Fo(this.shape, t, !1)
			},
			tangentAt: function(t) {
				var e = Fo(this.shape, t, !0);
				return ft(e, e)
			}
		}),
		Wo = io.extend({
			type: "arc",
			shape: {
				cx: 0,
				cy: 0,
				r: 0,
				startAngle: 0,
				endAngle: 2 * Math.PI,
				clockwise: !0
			},
			style: {
				stroke: "#000",
				fill: null
			},
			buildPath: function(t, e) {
				var i = e.cx,
					n = e.cy,
					r = Math.max(e.r, 0),
					a = e.startAngle,
					o = e.endAngle,
					s = e.clockwise,
					l = Math.cos(a),
					h = Math.sin(a);
				t.moveTo(l * r + i, h * r + n), t.arc(i, n, r, a, o, !s)
			}
		}),
		Zo = io.extend({
			type: "compound",
			shape: {
				paths: null
			},
			_updatePathDirty: function() {
				for (var t = this.__dirtyPath, e = this.shape.paths, i = 0; i < e.length; i++) t = t || e[i].__dirtyPath;
				this.__dirtyPath = t, this.__dirty = this.__dirty || t
			},
			beforeBrush: function() {
				this._updatePathDirty();
				for (var t = this.shape.paths || [], e = this.getGlobalScale(), i = 0; i < t.length; i++) t[i].path || t[i].createPathProxy(),
					t[i].path.setScale(e[0], e[1], t[i].segmentIgnoreThreshold)
			},
			buildPath: function(t, e) {
				for (var i = e.paths || [], n = 0; n < i.length; n++) i[n].buildPath(t, i[n].shape, !0)
			},
			afterBrush: function() {
				for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].__dirtyPath = !1
			},
			getBoundingRect: function() {
				return this._updatePathDirty(), io.prototype.getBoundingRect.call(this)
			}
		});
	Ho.prototype = {
		constructor: Ho,
		addColorStop: function(t, e) {
			this.colorStops.push({
				offset: t,
				color: e
			})
		}
	};

	function Uo(t, e, i, n, r, a) {
		this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == i ? 1 : i, this.y2 = null == n ? 0 : n,
			this.type = "linear", this.global = a || !1, Ho.call(this, r)
	}
	Uo.prototype = {
		constructor: Uo
	}, w(Uo, Ho);

	function Xo(t, e, i, n, r) {
		this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == i ? .5 : i, this.type = "radial", this.global =
			r || !1, Ho.call(this, n)
	}

	function Yo(t) {
		Fn.call(this, t), this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.notClear = !0
	}
	Xo.prototype = {
		constructor: Xo
	}, w(Xo, Ho), Yo.prototype.incremental = !0, Yo.prototype.clearDisplaybles = function() {
		this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.dirty(), this.notClear = !1
	}, Yo.prototype.addDisplayable = function(t, e) {
		e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty()
	}, Yo.prototype.addDisplayables = function(t, e) {
		e = e || !1;
		for (var i = 0; i < t.length; i++) this.addDisplayable(t[i], e)
	}, Yo.prototype.eachPendingDisplayable = function(t) {
		for (var e = this._cursor; e < this._displayables.length; e++) t && t(this._displayables[e]);
		for (e = 0; e < this._temporaryDisplayables.length; e++) t && t(this._temporaryDisplayables[e])
	}, Yo.prototype.update = function() {
		this.updateTransform();
		for (var t = this._cursor; t < this._displayables.length; t++) {
			(e = this._displayables[t]).parent = this, e.update(), e.parent = null
		}
		for (t = 0; t < this._temporaryDisplayables.length; t++) {
			var e;
			(e = this._temporaryDisplayables[t]).parent = this, e.update(), e.parent = null
		}
	}, Yo.prototype.brush = function(t, e) {
		for (var i = this._cursor; i < this._displayables.length; i++) {
			(n = this._displayables[i]).beforeBrush && n.beforeBrush(t), n.brush(t, i === this._cursor ? null : this._displayables[
				i - 1]), n.afterBrush && n.afterBrush(t)
		}
		this._cursor = i;
		for (i = 0; i < this._temporaryDisplayables.length; i++) {
			var n;
			(n = this._temporaryDisplayables[i]).beforeBrush && n.beforeBrush(t), n.brush(t, 0 === i ? null : this._temporaryDisplayables[
				i - 1]), n.afterBrush && n.afterBrush(t)
		}
		this._temporaryDisplayables = [], this.notClear = !0
	};
	var jo = [];
	Yo.prototype.getBoundingRect = function() {
		if (!this._rect) {
			for (var t = new vi(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0; e < this._displayables.length; e++) {
				var i = this._displayables[e],
					n = i.getBoundingRect().clone();
				i.needLocalTransform() && n.applyTransform(i.getLocalTransform(jo)), t.union(n)
			}
			this._rect = t
		}
		return this._rect
	}, Yo.prototype.contain = function(t, e) {
		var i = this.transformCoordToLocal(t, e);
		if (this.getBoundingRect().contain(i[0], i[1]))
			for (var n = 0; n < this._displayables.length; n++) {
				if (this._displayables[n].contain(t, e)) return !0
			}
		return !1
	}, w(Yo, Fn);
	var qo = Math.max,
		$o = Math.min,
		Ko = {},
		Qo = 1,
		Jo = "emphasis",
		ts = "normal",
		es = 1,
		is = {},
		ns = {};

	function rs(t) {
		return io.extend(t)
	}

	function as(t, e) {
		ns[t] = e
	}

	function os(t) {
		if (ns.hasOwnProperty(t)) return ns[t]
	}

	function ss(t, e, i, n) {
		var r = xo(t, e);
		return i && ("center" === n && (i = hs(i, r.getBoundingRect())), cs(r, i)), r
	}

	function ls(t, i, n) {
		var r = new Hn({
			style: {
				image: t,
				x: i.x,
				y: i.y,
				width: i.width,
				height: i.height
			},
			onload: function(t) {
				if ("center" === n) {
					var e = {
						width: t.width,
						height: t.height
					};
					r.setStyle(hs(i, e))
				}
			}
		});
		return r
	}

	function hs(t, e) {
		var i, n = e.width / e.height,
			r = t.height * n;
		return i = r <= t.width ? t.height : (r = t.width) / n, {
			x: t.x + t.width / 2 - r / 2,
			y: t.y + t.height / 2 - i / 2,
			width: r,
			height: i
		}
	}

	function us(t, e) {
		for (var i = [], n = t.length, r = 0; r < n; r++) {
			var a = t[r];
			a.path || a.createPathProxy(), a.__dirtyPath && a.buildPath(a.path, a.shape, !0), i.push(a.path)
		}
		var o = new io(e);
		return o.createPathProxy(), o.buildPath = function(t) {
			t.appendPath(i);
			var e = t.getContext();
			e && t.rebuildPath(e)
		}, o
	}

	function cs(t, e) {
		if (t.applyTransform) {
			var i = t.getBoundingRect().calculateTransform(e);
			t.applyTransform(i)
		}
	}
	var ds = zo;

	function fs(t) {
		return null != t && "none" !== t
	}
	var ps = Q(),
		gs = 0;

	function vs(t) {
		var e = t.__hoverStl;
		if (e && !t.__highlighted) {
			var i = t.__zr,
				n = t.useHoverLayer && i && "canvas" === i.painter.type;
			if (t.__highlighted = n ? "layer" : "plain", !(t.isGroup || !i && t.useHoverLayer)) {
				var r = t,
					a = t.style;
				n && (a = (r = i.addHover(t)).style), Ns(a), n || function(t) {
					if (t.__hoverStlDirty) {
						t.__hoverStlDirty = !1;
						var e = t.__hoverStl;
						if (e) {
							var i = t.__cachedNormalStl = {};
							t.__cachedNormalZ2 = t.z2;
							var n = t.style;
							for (var r in e) null != e[r] && (i[r] = n[r]);
							i.fill = n.fill, i.stroke = n.stroke
						} else t.__cachedNormalStl = t.__cachedNormalZ2 = null
					}
				}(r), a.extendFrom(e), ms(a, e, "fill"), ms(a, e, "stroke"), Es(a), n || (t.dirty(!1), t.z2 += Qo)
			}
		}
	}

	function ms(t, e, i) {
		!fs(e[i]) && fs(t[i]) && (t[i] = function(t) {
			if ("string" != typeof t) return t;
			var e = ps.get(t);
			return e || (e = Le(t, -.1), gs < 1e4 && (ps.set(t, e), gs++)), e
		}(t[i]))
	}

	function ys(t) {
		var e = t.__highlighted;
		if (e && (t.__highlighted = !1, !t.isGroup))
			if ("layer" === e) t.__zr && t.__zr.removeHover(t);
			else {
				var i = t.style,
					n = t.__cachedNormalStl;
				n && (Ns(i), t.setStyle(n), Es(i));
				var r = t.__cachedNormalZ2;
				null != r && t.z2 - r === Qo && (t.z2 = r)
			}
	}

	function _s(t, e, i) {
		var n, r = ts,
			a = ts;
		t.__highlighted && (r = Jo, n = !0), e(t, i), t.__highlighted && (a = Jo, n = !0), t.isGroup && t.traverse(function(
			t) {
			t.isGroup || e(t, i)
		}), n && t.__highDownOnUpdate && t.__highDownOnUpdate(r, a)
	}

	function xs(t, e) {
		e = t.__hoverStl = !1 !== e && (t.hoverStyle || e || {}), t.__hoverStlDirty = !0, t.__highlighted && (t.__cachedNormalStl =
			null, ys(t), vs(t))
	}

	function ws(t) {
		Is(this, t) || this.__highByOuter || _s(this, vs)
	}

	function bs(t) {
		Is(this, t) || this.__highByOuter || _s(this, ys)
	}

	function Ss(t) {
		this.__highByOuter |= 1 << (t || 0), _s(this, vs)
	}

	function Ms(t) {
		(this.__highByOuter &= ~(1 << (t || 0))) || _s(this, ys)
	}

	function Is(t, e) {
		return t.__highDownSilentOnTouch && e.zrByTouch
	}

	function Cs(t, e) {
		As(t, !0), _s(t, xs, e)
	}

	function As(t, e) {
		var i = !1 === e;
		if (t.__highDownSilentOnTouch = t.highDownSilentOnTouch, t.__highDownOnUpdate = t.highDownOnUpdate, !i || t.__highDownDispatcher) {
			var n = i ? "off" : "on";
			t[n]("mouseover", ws)[n]("mouseout", bs), t[n]("emphasis", Ss)[n]("normal", Ms), t.__highByOuter = t.__highByOuter ||
				0, t.__highDownDispatcher = !i
		}
	}

	function Ts(t) {
		return !(!t || !t.__highDownDispatcher)
	}

	function Ds(t) {
		var e = is[t];
		return null == e && es <= 32 && (e = is[t] = es++), e
	}

	function ks(t, e, i, n, r, a, o) {
		var s, l = (r = r || Ko).labelFetcher,
			h = r.labelDataIndex,
			u = r.labelDimIndex,
			c = i.getShallow("show"),
			d = n.getShallow("show");
		(c || d) && (l && (s = l.getFormattedLabel(h, "normal", null, u)), null == s && (s = z(r.defaultText) ? r.defaultText(
			h, r) : r.defaultText));
		var f = c ? s : null,
			p = d ? G(l ? l.getFormattedLabel(h, "emphasis", null, u) : null, s) : null;
		null == f && null == p || (Ps(t, i, a, r), Ps(e, n, o, r, !0)), t.text = f, e.text = p
	}

	function Ps(t, e, i, n, r) {
		return Ls(t, e, n, r), i && k(t, i), t
	}

	function Ls(t, e, i, n) {
		if ((i = i || Ko).isRectText) {
			var r;
			i.getTextPosition ? r = i.getTextPosition(e, n) : "outside" === (r = e.getShallow("position") || (n ? null :
				"inside")) && (r = "top"), t.textPosition = r, t.textOffset = e.getShallow("offset");
			var a = e.getShallow("rotate");
			null != a && (a *= Math.PI / 180), t.textRotation = a, t.textDistance = G(e.getShallow("distance"), n ? null : 5)
		}
		var o, s = e.ecModel,
			l = s && s.option.textStyle,
			h = function(t) {
				var e;
				for (; t && t !== t.ecModel;) {
					var i = (t.option || Ko).rich;
					if (i)
						for (var n in e = e || {}, i) i.hasOwnProperty(n) && (e[n] = 1);
					t = t.parentModel
				}
				return e
			}(e);
		if (h)
			for (var u in o = {}, h)
				if (h.hasOwnProperty(u)) {
					var c = e.getModel(["rich", u]);
					Os(o[u] = {}, c, l, i, n)
				} return t.rich = o, Os(t, e, l, i, n, !0), i.forceRich && !i.textStyle && (i.textStyle = {}), t
	}

	function Os(t, e, i, n, r, a) {
		i = !r && i || Ko, t.textFill = zs(e.getShallow("color"), n) || i.color, t.textStroke = zs(e.getShallow(
				"textBorderColor"), n) || i.textBorderColor, t.textStrokeWidth = G(e.getShallow("textBorderWidth"), i.textBorderWidth),
			r || (a && (t.insideRollbackOpt = n, Es(t)), null == t.textFill && (t.textFill = n.autoColor)), t.fontStyle = e.getShallow(
				"fontStyle") || i.fontStyle, t.fontWeight = e.getShallow("fontWeight") || i.fontWeight, t.fontSize = e.getShallow(
				"fontSize") || i.fontSize, t.fontFamily = e.getShallow("fontFamily") || i.fontFamily, t.textAlign = e.getShallow(
				"align"), t.textVerticalAlign = e.getShallow("verticalAlign") || e.getShallow("baseline"), t.textLineHeight = e.getShallow(
				"lineHeight"), t.textWidth = e.getShallow("width"), t.textHeight = e.getShallow("height"), t.textTag = e.getShallow(
				"tag"), a && n.disableBox || (t.textBackgroundColor = zs(e.getShallow("backgroundColor"), n), t.textPadding = e.getShallow(
				"padding"), t.textBorderColor = zs(e.getShallow("borderColor"), n), t.textBorderWidth = e.getShallow(
				"borderWidth"), t.textBorderRadius = e.getShallow("borderRadius"), t.textBoxShadowColor = e.getShallow(
				"shadowColor"), t.textBoxShadowBlur = e.getShallow("shadowBlur"), t.textBoxShadowOffsetX = e.getShallow(
				"shadowOffsetX"), t.textBoxShadowOffsetY = e.getShallow("shadowOffsetY")), t.textShadowColor = e.getShallow(
				"textShadowColor") || i.textShadowColor, t.textShadowBlur = e.getShallow("textShadowBlur") || i.textShadowBlur, t.textShadowOffsetX =
			e.getShallow("textShadowOffsetX") || i.textShadowOffsetX, t.textShadowOffsetY = e.getShallow("textShadowOffsetY") ||
			i.textShadowOffsetY
	}

	function zs(t, e) {
		return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null
	}

	function Es(t) {
		var e, i = t.textPosition,
			n = t.insideRollbackOpt;
		if (n && null == t.textFill) {
			var r = n.autoColor,
				a = n.isRectText,
				o = n.useInsideStyle,
				s = !1 !== o && (!0 === o || a && i && "string" == typeof i && 0 <= i.indexOf("inside")),
				l = !s && null != r;
			(s || l) && (e = {
				textFill: t.textFill,
				textStroke: t.textStroke,
				textStrokeWidth: t.textStrokeWidth
			}), s && (t.textFill = "#fff", null == t.textStroke && (t.textStroke = r, null == t.textStrokeWidth && (t.textStrokeWidth =
				2))), l && (t.textFill = r)
		}
		t.insideRollback = e
	}

	function Ns(t) {
		var e = t.insideRollback;
		e && (t.textFill = e.textFill, t.textStroke = e.textStroke, t.textStrokeWidth = e.textStrokeWidth, t.insideRollback =
			null)
	}

	function Rs(t, e) {
		var i = e || e.getModel("textStyle");
		return Y([t.fontStyle || i && i.getShallow("fontStyle") || "", t.fontWeight || i && i.getShallow("fontWeight") || "",
			(t.fontSize || i && i.getShallow("fontSize") || 12) + "px", t.fontFamily || i && i.getShallow("fontFamily") ||
			"sans-serif"
		].join(" "))
	}

	function Bs(t, e, i, n, r, a) {
		if ("function" == typeof r && (a = r, r = null), n && n.isAnimationEnabled()) {
			var o = t ? "Update" : "",
				s = n.getShallow("animationDuration" + o),
				l = n.getShallow("animationEasing" + o),
				h = n.getShallow("animationDelay" + o);
			"function" == typeof h && (h = h(r, n.getAnimationDelayParams ? n.getAnimationDelayParams(e, r) : null)),
				"function" == typeof s && (s = s(r)), 0 < s ? e.animateTo(i, s, h || 0, l, a, !!a) : (e.stopAnimation(), e.attr(i),
					a && a())
		} else e.stopAnimation(), e.attr(i), a && a()
	}

	function Vs(t, e, i, n, r) {
		Bs(!0, t, e, i, n, r)
	}

	function Fs(t, e, i, n, r) {
		Bs(!1, t, e, i, n, r)
	}

	function Hs(t, e) {
		for (var i = $t([]); t && t !== e;) Qt(i, t.getLocalTransform(), i), t = t.parent;
		return i
	}

	function Gs(t, e, i) {
		return e && !L(e) && (e = oe.getLocalTransform(e)), i && (e = ie([], e)), yt([], t, e)
	}

	function Ws(t, e, i) {
		var n = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]),
			r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]),
			a = ["left" === t ? -n : "right" === t ? n : 0, "top" === t ? -r : "bottom" === t ? r : 0];
		return a = Gs(a, e, i), Math.abs(a[0]) > Math.abs(a[1]) ? 0 < a[0] ? "right" : "left" : 0 < a[1] ? "bottom" : "top"
	}

	function Zs(t, e, n, i) {
		if (t && e) {
			var r, a = (r = {}, t.traverse(function(t) {
				!t.isGroup && t.anid && (r[t.anid] = t)
			}), r);
			e.traverse(function(t) {
				if (!t.isGroup && t.anid) {
					var e = a[t.anid];
					if (e) {
						var i = o(t);
						t.attr(o(e)), Vs(t, i, n, t.dataIndex)
					}
				}
			})
		}

		function o(t) {
			var e = {
				position: rt(t.position),
				rotation: t.rotation
			};
			return t.shape && (e.shape = k({}, t.shape)), e
		}
	}

	function Us(t, n) {
		return P(t, function(t) {
			var e = t[0];
			e = qo(e, n.x), e = $o(e, n.x + n.width);
			var i = t[1];
			return i = qo(i, n.y), [e, i = $o(i, n.y + n.height)]
		})
	}

	function Xs(t, e, i) {
		var n = (e = k({
			rectHover: !0
		}, e)).style = {
			strokeNoScale: !0
		};
		if (i = i || {
				x: -1,
				y: -1,
				width: 2,
				height: 2
			}, t) return 0 === t.indexOf("image://") ? (n.image = t.slice(8), T(n, i), new Hn(e)) : ss(t.replace("path://", ""),
			e, i, "center")
	}

	function Ys(t, e, i, n, r, a, o, s) {
		var l = i - t,
			h = n - e,
			u = o - r,
			c = s - a,
			d = js(u, c, l, h);
		if (function(t) {
				return t <= 1e-6 && -1e-6 <= t
			}(d)) return !1;
		var f = t - r,
			p = e - a,
			g = js(f, p, l, h) / d;
		if (g < 0 || 1 < g) return !1;
		var v = js(f, p, u, c) / d;
		return !(v < 0 || 1 < v)
	}

	function js(t, e, i, n) {
		return t * n - i * e
	}
	as("circle", So), as("sector", Io), as("ring", Co), as("polygon", Do), as("polyline", ko), as("rect", No), as("line",
		Bo), as("bezierCurve", Go), as("arc", Wo);
	var qs = (Object.freeze || Object)({
			Z2_EMPHASIS_LIFT: Qo,
			CACHED_LABEL_STYLE_PROPERTIES: {
				color: "textFill",
				textBorderColor: "textStroke",
				textBorderWidth: "textStrokeWidth"
			},
			extendShape: rs,
			extendPath: function(t, e) {
				return function(t, e) {
					return io.extend(_o(t, e))
				}(t, e)
			},
			registerShape: as,
			getShapeClass: os,
			makePath: ss,
			makeImage: ls,
			mergePath: us,
			resizePath: cs,
			subPixelOptimizeLine: function(t) {
				return Lo(t.shape, t.shape, t.style), t
			},
			subPixelOptimizeRect: function(t) {
				return Oo(t.shape, t.shape, t.style), t
			},
			subPixelOptimize: ds,
			setElementHoverStyle: xs,
			setHoverStyle: Cs,
			setAsHighDownDispatcher: As,
			isHighDownDispatcher: Ts,
			getHighlightDigit: Ds,
			setLabelStyle: ks,
			modifyLabelStyle: function(t, e, i) {
				var n = t.style;
				e && (Ns(n), t.setStyle(e), Es(n)), n = t.__hoverStl, i && n && (Ns(n), k(n, i), Es(n))
			},
			setTextStyle: Ps,
			setText: function(t, e, i) {
				var n, r = {
					isRectText: !0
				};
				!1 === i ? n = !0 : r.autoColor = i, Ls(t, e, r, n)
			},
			getFont: Rs,
			updateProps: Vs,
			initProps: Fs,
			getTransform: Hs,
			applyTransform: Gs,
			transformDirection: Ws,
			groupTransition: Zs,
			clipPointsByRect: Us,
			clipRectByRect: function(t, e) {
				var i = qo(t.x, e.x),
					n = $o(t.x + t.width, e.x + e.width),
					r = qo(t.y, e.y),
					a = $o(t.y + t.height, e.y + e.height);
				if (i <= n && r <= a) return {
					x: i,
					y: r,
					width: n - i,
					height: a - r
				}
			},
			createIcon: Xs,
			linePolygonIntersect: function(t, e, i, n, r) {
				for (var a = 0, o = r[r.length - 1]; a < r.length; a++) {
					var s = r[a];
					if (Ys(t, e, i, n, s[0], s[1], o[0], o[1])) return !0;
					o = s
				}
			},
			lineLineIntersect: Ys,
			Group: mi,
			Image: Hn,
			Text: wo,
			Circle: So,
			Sector: Io,
			Ring: Co,
			Polygon: Do,
			Polyline: ko,
			Rect: No,
			Line: Bo,
			BezierCurve: Go,
			Arc: Wo,
			IncrementalDisplayable: Yo,
			CompoundPath: Zo,
			LinearGradient: Uo,
			RadialGradient: Xo,
			BoundingRect: vi
		}),
		$s = ["textStyle", "color"],
		Ks = {
			getTextColor: function(t) {
				var e = this.ecModel;
				return this.getShallow("color") || (!t && e ? e.get($s) : null)
			},
			getFont: function() {
				return Rs({
					fontStyle: this.getShallow("fontStyle"),
					fontWeight: this.getShallow("fontWeight"),
					fontSize: this.getShallow("fontSize"),
					fontFamily: this.getShallow("fontFamily")
				}, this.ecModel)
			},
			getTextRect: function(t) {
				return nn(t, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow(
					"baseline"), this.getShallow("padding"), this.getShallow("lineHeight"), this.getShallow("rich"), this.getShallow(
					"truncateText"))
			}
		},
		Qs = Vr([
			["fill", "color"],
			["stroke", "borderColor"],
			["lineWidth", "borderWidth"],
			["opacity"],
			["shadowBlur"],
			["shadowOffsetX"],
			["shadowOffsetY"],
			["shadowColor"],
			["textPosition"],
			["textAlign"]
		]),
		Js = {
			getItemStyle: function(t, e) {
				var i = Qs(this, t, e),
					n = this.getBorderLineDash();
				return n && (i.lineDash = n), i
			},
			getBorderLineDash: function() {
				var t = this.get("borderType");
				return "solid" === t || null == t ? null : "dashed" === t ? [5, 5] : [1, 1]
			}
		},
		tl = S,
		el = Mr();

	function il(t, e, i) {
		this.parentModel = e, this.ecModel = i, this.option = t
	}

	function nl(t, e, i) {
		for (var n = 0; n < e.length && (!e[n] || null != (t = t && "object" == typeof t ? t[e[n]] : null)); n++);
		return null == t && i && (t = i.get(e)), t
	}

	function rl(t, e) {
		var i = el(t).getParent;
		return i ? i.call(t, e) : t.parentModel
	}
	il.prototype = {
		constructor: il,
		init: null,
		mergeOption: function(t) {
			v(this.option, t, !0)
		},
		get: function(t, e) {
			return null == t ? this.option : nl(this.option, this.parsePath(t), !e && rl(this, t))
		},
		getShallow: function(t, e) {
			var i = this.option,
				n = null == i ? i : i[t],
				r = !e && rl(this, t);
			return null == n && r && (n = r.getShallow(t)), n
		},
		getModel: function(t, e) {
			var i;
			return new il(null == t ? this.option : nl(this.option, t = this.parsePath(t)), e = e || (i = rl(this, t)) && i.getModel(
				t), this.ecModel)
		},
		isEmpty: function() {
			return null == this.option
		},
		restoreData: function() {},
		clone: function() {
			return new this.constructor(b(this.option))
		},
		setReadOnly: function(t) {},
		parsePath: function(t) {
			return "string" == typeof t && (t = t.split(".")), t
		},
		customizeGetParent: function(t) {
			el(this).getParent = t
		},
		isAnimationEnabled: function() {
			if (!m.node) {
				if (null != this.option.animation) return !!this.option.animation;
				if (this.parentModel) return this.parentModel.isAnimationEnabled()
			}
		}
	}, Or(il), Er(il), tl(il, Hr), tl(il, Wr), tl(il, Ks), tl(il, Js);
	var al = 0;

	function ol(t) {
		return [t || "", al++, Math.random().toFixed(5)].join("_")
	}
	var sl = 1e-4;

	function ll(t, e, i, n) {
		var r = e[1] - e[0],
			a = i[1] - i[0];
		if (0 == r) return 0 == a ? i[0] : (i[0] + i[1]) / 2;
		if (n)
			if (0 < r) {
				if (t <= e[0]) return i[0];
				if (t >= e[1]) return i[1]
			} else {
				if (t >= e[0]) return i[0];
				if (t <= e[1]) return i[1]
			}
		else {
			if (t === e[0]) return i[0];
			if (t === e[1]) return i[1]
		}
		return (t - e[0]) / r * a + i[0]
	}

	function hl(t, e) {
		switch (t) {
			case "center":
			case "middle":
				t = "50%";
				break;
			case "left":
			case "top":
				t = "0%";
				break;
			case "right":
			case "bottom":
				t = "100%"
		}
		return "string" == typeof t ? function(t) {
			return t.replace(/^\s+|\s+$/g, "")
		}(t).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : null == t ? NaN : +t
	}

	function ul(t, e, i) {
		return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), t = (+t).toFixed(e), i ? t : +t
	}

	function cl(t) {
		return t.sort(function(t, e) {
			return t - e
		}), t
	}

	function dl(t) {
		if (t = +t, isNaN(t)) return 0;
		for (var e = 1, i = 0; Math.round(t * e) / e !== t;) e *= 10, i++;
		return i
	}

	function fl(t) {
		var e = t.toString(),
			i = e.indexOf("e");
		if (0 < i) {
			var n = +e.slice(i + 1);
			return n < 0 ? -n : 0
		}
		var r = e.indexOf(".");
		return r < 0 ? 0 : e.length - 1 - r
	}

	function pl(t, e) {
		var i = Math.log,
			n = Math.LN10,
			r = Math.floor(i(t[1] - t[0]) / n),
			a = Math.round(i(Math.abs(e[1] - e[0])) / n),
			o = Math.min(Math.max(-r + a, 0), 20);
		return isFinite(o) ? o : 20
	}

	function gl(t, e, i) {
		if (!t[e]) return 0;
		var n = M(t, function(t, e) {
			return t + (isNaN(e) ? 0 : e)
		}, 0);
		if (0 === n) return 0;
		for (var r = Math.pow(10, i), a = P(t, function(t) {
				return (isNaN(t) ? 0 : t) / n * r * 100
			}), o = 100 * r, s = P(a, function(t) {
				return Math.floor(t)
			}), l = M(s, function(t, e) {
				return t + e
			}, 0), h = P(a, function(t, e) {
				return t - s[e]
			}); l < o;) {
			for (var u = Number.NEGATIVE_INFINITY, c = null, d = 0, f = h.length; d < f; ++d) h[d] > u && (u = h[d], c = d);
			++s[c], h[c] = 0, ++l
		}
		return s[e] / r
	}

	function vl(t) {
		var e = 2 * Math.PI;
		return (t % e + e) % e
	}

	function ml(t) {
		return -sl < t && t < sl
	}
	var yl =
		/^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;

	function _l(t) {
		if (t instanceof Date) return t;
		if ("string" != typeof t) return null == t ? new Date(NaN) : new Date(Math.round(t));
		var e = yl.exec(t);
		if (!e) return new Date(NaN);
		if (e[8]) {
			var i = +e[4] || 0;
			return "Z" !== e[8].toUpperCase() && (i -= e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1,
				i, +(e[5] || 0), +e[6] || 0, +e[7] || 0))
		}
		return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, +e[7] || 0)
	}

	function xl(t) {
		return Math.pow(10, wl(t))
	}

	function wl(t) {
		if (0 === t) return 0;
		var e = Math.floor(Math.log(t) / Math.LN10);
		return 10 <= t / Math.pow(10, e) && e++, e
	}

	function bl(t, e) {
		var i = wl(t),
			n = Math.pow(10, i),
			r = t / n;
		return t = (e ? r < 1.5 ? 1 : r < 2.5 ? 2 : r < 4 ? 3 : r < 7 ? 5 : 10 : r < 1 ? 1 : r < 2 ? 2 : r < 3 ? 3 : r < 5 ?
			5 : 10) * n, -20 <= i ? +t.toFixed(i < 0 ? -i : 0) : t
	}
	var Sl = (Object.freeze || Object)({
		linearMap: ll,
		parsePercent: hl,
		round: ul,
		asc: cl,
		getPrecision: dl,
		getPrecisionSafe: fl,
		getPixelPrecision: pl,
		getPercentWithPrecision: gl,
		MAX_SAFE_INTEGER: 9007199254740991,
		remRadian: vl,
		isRadianAroundZero: ml,
		parseDate: _l,
		quantity: xl,
		quantityExponent: wl,
		nice: bl,
		quantile: function(t, e) {
			var i = (t.length - 1) * e + 1,
				n = Math.floor(i),
				r = +t[n - 1],
				a = i - n;
			return a ? r + a * (t[n] - r) : r
		},
		reformIntervals: function(t) {
			t.sort(function(t, e) {
				return function t(e, i, n) {
					return e.interval[n] < i.interval[n] || e.interval[n] === i.interval[n] && (e.close[n] - i.close[n] == (n ?
						-1 : 1) || !n && t(e, i, 1))
				}(t, e, 0) ? -1 : 1
			});
			for (var e = -1 / 0, i = 1, n = 0; n < t.length;) {
				for (var r = t[n].interval, a = t[n].close, o = 0; o < 2; o++) r[o] <= e && (r[o] = e, a[o] = o ? 1 : 1 - i), e =
					r[o], i = a[o];
				r[0] === r[1] && a[0] * a[1] != 1 ? t.splice(n, 1) : n++
			}
			return t
		},
		isNumeric: function(t) {
			return 0 <= t - parseFloat(t)
		}
	});

	function Ml(t) {
		return isNaN(t) ? "-" : (t = (t + "").split("."))[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (1 < t.length ?
			"." + t[1] : "")
	}

	function Il(t, e) {
		return t = (t || "").toLowerCase().replace(/-(.)/g, function(t, e) {
			return e.toUpperCase()
		}), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t
	}
	var Cl = U,
		Al = /([&<>"'])/g,
		Tl = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;"
		};

	function Dl(t) {
		return null == t ? "" : (t + "").replace(Al, function(t, e) {
			return Tl[e]
		})
	}

	function kl(t, e) {
		return "{" + t + (null == e ? "" : e) + "}"
	}
	var Pl = ["a", "b", "c", "d", "e", "f", "g"];

	function Ll(t, e, i) {
		O(e) || (e = [e]);
		var n = e.length;
		if (!n) return "";
		for (var r = e[0].$vars || [], a = 0; a < r.length; a++) {
			var o = Pl[a];
			t = t.replace(kl(o), kl(o, 0))
		}
		for (var s = 0; s < n; s++)
			for (var l = 0; l < r.length; l++) {
				var h = e[s][r[l]];
				t = t.replace(kl(Pl[l], s), i ? Dl(h) : h)
			}
		return t
	}

	function Ol(t, e) {
		var i = (t = E(t) ? {
				color: t,
				extraCssText: e
			} : t || {}).color,
			n = t.type,
			r = (e = t.extraCssText, t.renderMode || "html"),
			a = t.markerId || "X";
		return i ? "html" === r ? "subItem" === n ?
			'<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' +
			Dl(i) + ";" + (e || "") + '"></span>' :
			'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
			Dl(i) + ";" + (e || "") + '"></span>' : {
				renderMode: r,
				content: "{marker" + a + "|}  ",
				style: {
					color: i
				}
			} : ""
	}

	function zl(t, e) {
		return "0000".substr(0, e - (t += "").length) + t
	}

	function El(t, e, i) {
		"week" !== t && "month" !== t && "quarter" !== t && "half-year" !== t && "year" !== t || (t = "MM-dd\nyyyy");
		var n = _l(e),
			r = i ? "UTC" : "",
			a = n["get" + r + "FullYear"](),
			o = n["get" + r + "Month"]() + 1,
			s = n["get" + r + "Date"](),
			l = n["get" + r + "Hours"](),
			h = n["get" + r + "Minutes"](),
			u = n["get" + r + "Seconds"](),
			c = n["get" + r + "Milliseconds"]();
		return t = t.replace("MM", zl(o, 2)).replace("M", o).replace("yyyy", a).replace("yy", a % 100).replace("dd", zl(s, 2))
			.replace("d", s).replace("hh", zl(l, 2)).replace("h", l).replace("mm", zl(h, 2)).replace("m", h).replace("ss", zl(u,
				2)).replace("s", u).replace("SSS", zl(c, 3))
	}

	function Nl(t) {
		return t ? t.charAt(0).toUpperCase() + t.substr(1) : t
	}
	var Rl = sn;
	var Bl = (Object.freeze || Object)({
			addCommas: Ml,
			toCamelCase: Il,
			normalizeCssArray: Cl,
			encodeHTML: Dl,
			formatTpl: Ll,
			formatTplSimple: function(i, t, n) {
				return D(t, function(t, e) {
					i = i.replace("{" + e + "}", n ? Dl(t) : t)
				}), i
			},
			getTooltipMarker: Ol,
			formatTime: El,
			capitalFirst: Nl,
			truncateText: Rl,
			getTextBoundingRect: function(t) {
				return nn(t.text, t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich, t.truncate)
			},
			getTextRect: function(t, e, i, n, r, a, o, s) {
				return nn(t, e, i, n, r, s, a, o)
			}
		}),
		Vl = D,
		Fl = ["left", "right", "top", "bottom", "width", "height"],
		Hl = [
			["width", "left", "right"],
			["height", "top", "bottom"]
		];

	function Gl(u, c, d, f, p) {
		var g = 0,
			v = 0;
		null == f && (f = 1 / 0), null == p && (p = 1 / 0);
		var m = 0;
		c.eachChild(function(t, e) {
			var i, n, r = t.position,
				a = t.getBoundingRect(),
				o = c.childAt(e + 1),
				s = o && o.getBoundingRect();
			if ("horizontal" === u) {
				var l = a.width + (s ? -s.x + a.x : 0);
				m = f < (i = g + l) || t.newline ? (g = 0, i = l, v += m + d, a.height) : Math.max(m, a.height)
			} else {
				var h = a.height + (s ? -s.y + a.y : 0);
				m = p < (n = v + h) || t.newline ? (g += m + d, v = 0, n = h, a.width) : Math.max(m, a.width)
			}
			t.newline || (r[0] = g, r[1] = v, "horizontal" === u ? g = i + d : v = n + d)
		})
	}
	var Wl = Gl;
	A(Gl, "vertical"), A(Gl, "horizontal");

	function Zl(t, e, i) {
		i = Cl(i || 0);
		var n = e.width,
			r = e.height,
			a = hl(t.left, n),
			o = hl(t.top, r),
			s = hl(t.right, n),
			l = hl(t.bottom, r),
			h = hl(t.width, n),
			u = hl(t.height, r),
			c = i[2] + i[0],
			d = i[1] + i[3],
			f = t.aspect;
		switch (isNaN(h) && (h = n - s - d - a), isNaN(u) && (u = r - l - c - o), null != f && (isNaN(h) && isNaN(u) && (n /
			r < f ? h = .8 * n : u = .8 * r), isNaN(h) && (h = f * u), isNaN(u) && (u = h / f)), isNaN(a) && (a = n - s - h -
			d), isNaN(o) && (o = r - l - u - c), t.left || t.right) {
			case "center":
				a = n / 2 - h / 2 - i[3];
				break;
			case "right":
				a = n - h - d
		}
		switch (t.top || t.bottom) {
			case "middle":
			case "center":
				o = r / 2 - u / 2 - i[0];
				break;
			case "bottom":
				o = r - u - c
		}
		a = a || 0, o = o || 0, isNaN(h) && (h = n - d - a - (s || 0)), isNaN(u) && (u = r - c - o - (l || 0));
		var p = new vi(a + i[3], o + i[0], h, u);
		return p.margin = i, p
	}

	function Ul(t, e, i, n, r) {
		var a = !r || !r.hv || r.hv[0],
			o = !r || !r.hv || r.hv[1],
			s = r && r.boundingMode || "all";
		if (a || o) {
			var l;
			if ("raw" === s) l = "group" === t.type ? new vi(0, 0, +e.width || 0, +e.height || 0) : t.getBoundingRect();
			else if (l = t.getBoundingRect(), t.needLocalTransform()) {
				var h = t.getLocalTransform();
				(l = l.clone()).applyTransform(h)
			}
			e = Zl(T({
				width: l.width,
				height: l.height
			}, e), i, n);
			var u = t.position,
				c = a ? e.x - l.x : 0,
				d = o ? e.y - l.y : 0;
			t.attr("position", "raw" === s ? [c, d] : [u[0] + c, u[1] + d])
		}
	}

	function Xl(l, h, t) {
		N(t) || (t = {});
		var u = t.ignoreSize;
		O(u) || (u = [u, u]);
		var e = n(Hl[0], 0),
			i = n(Hl[1], 1);

		function n(t, e) {
			var i = {},
				n = 0,
				r = {},
				a = 0;
			if (Vl(t, function(t) {
					r[t] = l[t]
				}), Vl(t, function(t) {
					c(h, t) && (i[t] = r[t] = h[t]), d(i, t) && n++, d(r, t) && a++
				}), u[e]) return d(h, t[1]) ? r[t[2]] = null : d(h, t[2]) && (r[t[1]] = null), r;
			if (2 !== a && n) {
				if (2 <= n) return i;
				for (var o = 0; o < t.length; o++) {
					var s = t[o];
					if (!c(i, s) && c(l, s)) {
						i[s] = l[s];
						break
					}
				}
				return i
			}
			return r
		}

		function c(t, e) {
			return t.hasOwnProperty(e)
		}

		function d(t, e) {
			return null != t[e] && "auto" !== t[e]
		}

		function r(t, e, i) {
			Vl(t, function(t) {
				e[t] = i[t]
			})
		}
		r(Hl[0], l, e), r(Hl[1], l, i)
	}

	function Yl(t) {
		return jl({}, t)
	}

	function jl(e, i) {
		return i && e && Vl(Fl, function(t) {
			i.hasOwnProperty(t) && (e[t] = i[t])
		}), e
	}
	var ql, $l, Kl, Ql = Mr(),
		Jl = il.extend({
			type: "component",
			id: "",
			name: "",
			mainType: "",
			subType: "",
			componentIndex: 0,
			defaultOption: null,
			ecModel: null,
			dependentModels: [],
			uid: null,
			layoutMode: null,
			$constructor: function(t, e, i, n) {
				il.call(this, t, e, i, n), this.uid = ol("ec_cpt_model")
			},
			init: function(t, e, i, n) {
				this.mergeDefaultAndTheme(t, i)
			},
			mergeDefaultAndTheme: function(t, e) {
				var i = this.layoutMode,
					n = i ? Yl(t) : {};
				v(t, e.getTheme().get(this.mainType)), v(t, this.getDefaultOption()), i && Xl(t, n, i)
			},
			mergeOption: function(t, e) {
				v(this.option, t, !0);
				var i = this.layoutMode;
				i && Xl(this.option, t, i)
			},
			optionUpdated: function(t, e) {},
			getDefaultOption: function() {
				var t = Ql(this);
				if (!t.defaultOption) {
					for (var e = [], i = this.constructor; i;) {
						var n = i.prototype.defaultOption;
						n && e.push(n), i = i.superClass
					}
					for (var r = {}, a = e.length - 1; 0 <= a; a--) r = v(r, e[a], !0);
					t.defaultOption = r
				}
				return t.defaultOption
			},
			getReferringComponents: function(t) {
				return this.ecModel.queryComponents({
					mainType: t,
					index: this.get(t + "Index", !0),
					id: this.get(t + "Id", !0)
				})
			}
		});

	function th(t, e) {
		return t[e] || (t[e] = {
			predecessor: [],
			successor: []
		}), t[e]
	}
	Br(Jl, {
		registerWhenExtend: !0
	}), $l = {}, (ql = Jl).registerSubTypeDefaulter = function(t, e) {
		t = Lr(t), $l[t.main] = e
	}, ql.determineSubType = function(t, e) {
		var i = e.type;
		if (!i) {
			var n = Lr(t).main;
			ql.hasSubTypes(t) && $l[n] && (i = $l[n](e))
		}
		return i
	}, Kl = function(t) {
		var e = [];
		D(Jl.getClassesByMainType(t), function(t) {
			e = e.concat(t.prototype.dependencies || [])
		}), e = P(e, function(t) {
			return Lr(t).main
		}), "dataset" !== t && x(e, "dataset") <= 0 && e.unshift("dataset");
		return e
	}, Jl.topologicalTravel = function(t, e, i, n) {
		if (t.length) {
			var r = function(e) {
					var r = {},
						a = [];
					return D(e, function(i) {
						var n = th(r, i),
							t = function(t, e) {
								var i = [];
								return D(t, function(t) {
									0 <= x(e, t) && i.push(t)
								}), i
							}(n.originalDeps = Kl(i), e);
						n.entryCount = t.length, 0 === n.entryCount && a.push(i), D(t, function(t) {
							x(n.predecessor, t) < 0 && n.predecessor.push(t);
							var e = th(r, t);
							x(e.successor, t) < 0 && e.successor.push(i)
						})
					}), {
						graph: r,
						noEntryList: a
					}
				}(e),
				a = r.graph,
				o = r.noEntryList,
				s = {};
			for (D(t, function(t) {
					s[t] = !0
				}); o.length;) {
				var l = o.pop(),
					h = a[l],
					u = !!s[l];
				u && (i.call(n, l, h.originalDeps.slice()), delete s[l]), D(h.successor, u ? d : c)
			}
			D(s, function() {
				throw new Error("Circle dependency may exists")
			})
		}

		function c(t) {
			a[t].entryCount--, 0 === a[t].entryCount && o.push(t)
		}

		function d(t) {
			s[t] = !0, c(t)
		}
	}, S(Jl, {
		getBoxLayoutParams: function() {
			return {
				left: this.get("left"),
				top: this.get("top"),
				right: this.get("right"),
				bottom: this.get("bottom"),
				width: this.get("width"),
				height: this.get("height")
			}
		}
	});
	var eh = "";
	"undefined" != typeof navigator && (eh = navigator.platform || "");
	var ih = {
			color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074",
				"#546570", "#c4ccd3"
			],
			gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
			textStyle: {
				fontFamily: eh.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
				fontSize: 12,
				fontStyle: "normal",
				fontWeight: "normal"
			},
			blendMode: null,
			animation: "auto",
			animationDuration: 1e3,
			animationDurationUpdate: 300,
			animationEasing: "exponentialOut",
			animationEasingUpdate: "cubicOut",
			animationThreshold: 2e3,
			progressiveThreshold: 3e3,
			progressive: 400,
			hoverLayerThreshold: 3e3,
			useUTC: !1
		},
		nh = Mr();
	var rh = {
		clearColorPalette: function() {
			nh(this).colorIdx = 0, nh(this).colorNameMap = {}
		},
		getColorFromPalette: function(t, e, i) {
			var n = nh(e = e || this),
				r = n.colorIdx || 0,
				a = n.colorNameMap = n.colorNameMap || {};
			if (a.hasOwnProperty(t)) return a[t];
			var o = gr(this.get("color", !0)),
				s = this.get("colorLayer", !0),
				l = null != i && s ? function(t, e) {
					for (var i = t.length, n = 0; n < i; n++)
						if (t[n].length > e) return t[n];
					return t[i - 1]
				}(s, i) : o;
			if ((l = l || o) && l.length) {
				var h = l[r];
				return t && (a[t] = h), n.colorIdx = (r + 1) % l.length, h
			}
		}
	};

	function ah(t) {
		var e = t.get("coordinateSystem"),
			i = {
				coordSysName: e,
				coordSysDims: [],
				axisMap: Q(),
				categoryAxisMap: Q()
			},
			n = oh[e];
		if (n) return n(t, i, i.axisMap, i.categoryAxisMap), i
	}
	var oh = {
		cartesian2d: function(t, e, i, n) {
			var r = t.getReferringComponents("xAxis")[0],
				a = t.getReferringComponents("yAxis")[0];
			e.coordSysDims = ["x", "y"], i.set("x", r), i.set("y", a), sh(r) && (n.set("x", r), e.firstCategoryDimIndex = 0),
				sh(a) && (n.set("y", a), e.firstCategoryDimIndex = 1)
		},
		singleAxis: function(t, e, i, n) {
			var r = t.getReferringComponents("singleAxis")[0];
			e.coordSysDims = ["single"], i.set("single", r), sh(r) && (n.set("single", r), e.firstCategoryDimIndex = 0)
		},
		polar: function(t, e, i, n) {
			var r = t.getReferringComponents("polar")[0],
				a = r.findAxisModel("radiusAxis"),
				o = r.findAxisModel("angleAxis");
			e.coordSysDims = ["radius", "angle"], i.set("radius", a), i.set("angle", o), sh(a) && (n.set("radius", a), e.firstCategoryDimIndex =
				0), sh(o) && (n.set("angle", o), e.firstCategoryDimIndex = 1)
		},
		geo: function(t, e, i, n) {
			e.coordSysDims = ["lng", "lat"]
		},
		parallel: function(t, r, a, o) {
			var s = t.ecModel,
				e = s.getComponent("parallel", t.get("parallelIndex")),
				l = r.coordSysDims = e.dimensions.slice();
			D(e.parallelAxisIndex, function(t, e) {
				var i = s.getComponent("parallelAxis", t),
					n = l[e];
				a.set(n, i), sh(i) && null == r.firstCategoryDimIndex && (o.set(n, i), r.firstCategoryDimIndex = e)
			})
		}
	};

	function sh(t) {
		return "category" === t.get("type")
	}
	var lh = "original",
		hh = "arrayRows",
		uh = "objectRows",
		ch = "keyedColumns",
		dh = "unknown",
		fh = "typedArray",
		ph = "column",
		gh = "row";

	function vh(t) {
		this.fromDataset = t.fromDataset, this.data = t.data || (t.sourceFormat === ch ? {} : []), this.sourceFormat = t.sourceFormat ||
			dh, this.seriesLayoutBy = t.seriesLayoutBy || ph, this.dimensionsDefine = t.dimensionsDefine, this.encodeDefine = t
			.encodeDefine && Q(t.encodeDefine), this.startIndex = t.startIndex || 0, this.dimensionsDetectCount = t.dimensionsDetectCount
	}
	vh.seriesDataToSource = function(t) {
		return new vh({
			data: t,
			sourceFormat: B(t) ? fh : lh,
			fromDataset: !1
		})
	}, Er(vh);
	var mh = Mr();

	function yh(t) {
		var e = t.option,
			i = e.data,
			n = B(i) ? fh : lh,
			r = !1,
			a = e.seriesLayoutBy,
			o = e.sourceHeader,
			s = e.dimensions,
			l = function(t) {
				var e = t.option;
				if (!e.data) return t.ecModel.getComponent("dataset", e.datasetIndex || 0)
			}(t);
		if (l) {
			var h = l.option;
			i = h.source, n = mh(l).sourceFormat, r = !0, a = a || h.seriesLayoutBy, null == o && (o = h.sourceHeader), s = s ||
				h.dimensions
		}
		var u = function(t, e, i, n, r) {
				if (!t) return {
					dimensionsDefine: _h(r)
				};
				var a, o, s, l;
				if (e === hh) "auto" === n || null == n ? xh(function(t) {
					null != t && "-" !== t && (E(t) ? null == o && (o = 1) : o = 0)
				}, i, t, 10) : o = n ? 1 : 0, r || 1 !== o || (r = [], xh(function(t, e) {
					r[e] = null != t ? t : ""
				}, i, t)), a = r ? r.length : i === gh ? t.length : t[0] ? t[0].length : null;
				else if (e === uh) r || (r = function(t) {
					var e, i = 0;
					for (; i < t.length && !(e = t[i++]););
					if (e) {
						var n = [];
						return D(e, function(t, e) {
							n.push(e)
						}), n
					}
				}(t), s = !0);
				else if (e === ch) r || (r = [], s = !0, D(t, function(t, e) {
					r.push(e)
				}));
				else if (e === lh) {
					var h = yr(t[0]);
					a = O(h) && h.length || 1
				}
				s && D(r, function(t, e) {
					"name" === (N(t) ? t.name : t) && (l = e)
				});
				return {
					startIndex: o,
					dimensionsDefine: _h(r),
					dimensionsDetectCount: a,
					potentialNameDimIndex: l
				}
			}(i, n, a, o, s),
			c = e.encode;
		!c && l && (c = function(t, e, i, n, r, a) {
			var o = ah(t),
				s = {},
				l = [],
				h = [],
				u = t.subType,
				c = Q(["pie", "map", "funnel"]),
				d = Q(["line", "bar", "pictorialBar", "scatter", "effectScatter", "candlestick", "boxplot"]);
			if (o && null != d.get(u)) {
				var f = t.ecModel,
					p = mh(f).datasetMap,
					g = e.uid + "_" + r,
					v = p.get(g) || p.set(g, {
						categoryWayDim: 1,
						valueWayDim: 0
					});
				D(o.coordSysDims, function(t) {
					if (null == o.firstCategoryDimIndex) {
						var e = v.valueWayDim++;
						s[t] = e, h.push(e)
					} else if (o.categoryAxisMap.get(t)) s[t] = 0, l.push(0);
					else {
						e = v.categoryWayDim++;
						s[t] = e, h.push(e)
					}
				})
			} else if (null != c.get(u)) {
				for (var m, y = 0; y < 5 && null == m; y++) wh(i, n, r, a.dimensionsDefine, a.startIndex, y) || (m = y);
				if (null != m) {
					s.value = m;
					var _ = a.potentialNameDimIndex || Math.max(m - 1, 0);
					h.push(_), l.push(_)
				}
			}
			return l.length && (s.itemName = l), h.length && (s.seriesName = h), s
		}(t, l, i, n, a, u)), mh(t).source = new vh({
			data: i,
			fromDataset: r,
			seriesLayoutBy: a,
			sourceFormat: n,
			dimensionsDefine: u.dimensionsDefine,
			startIndex: u.startIndex,
			dimensionsDetectCount: u.dimensionsDetectCount,
			encodeDefine: c
		})
	}

	function _h(t) {
		if (t) {
			var n = Q();
			return P(t, function(t, e) {
				if (null == (t = k({}, N(t) ? t : {
						name: t
					})).name) return t;
				t.name += "", null == t.displayName && (t.displayName = t.name);
				var i = n.get(t.name);
				return i ? t.name += "-" + i.count++ : n.set(t.name, {
					count: 1
				}), t
			})
		}
	}

	function xh(t, e, i, n) {
		if (null == n && (n = 1 / 0), e === gh)
			for (var r = 0; r < i.length && r < n; r++) t(i[r] ? i[r][0] : null, r);
		else {
			var a = i[0] || [];
			for (r = 0; r < a.length && r < n; r++) t(a[r], r)
		}
	}

	function wh(t, e, i, n, r, a) {
		var o, s;
		if (B(t)) return !1;
		if (n && (s = N(s = n[a]) ? s.name : s), e === hh)
			if (i === gh) {
				for (var l = t[a], h = 0; h < (l || []).length && h < 5; h++)
					if (null != (o = f(l[r + h]))) return o
			} else
				for (h = 0; h < t.length && h < 5; h++) {
					var u = t[r + h];
					if (u && null != (o = f(u[a]))) return o
				} else if (e === uh) {
					if (!s) return;
					for (h = 0; h < t.length && h < 5; h++) {
						if ((c = t[h]) && null != (o = f(c[s]))) return o
					}
				} else if (e === ch) {
			if (!s) return;
			if (!(l = t[s]) || B(l)) return !1;
			for (h = 0; h < l.length && h < 5; h++)
				if (null != (o = f(l[h]))) return o
		} else if (e === lh)
			for (h = 0; h < t.length && h < 5; h++) {
				var c, d = yr(c = t[h]);
				if (!O(d)) return !1;
				if (null != (o = f(d[a]))) return o
			}

		function f(t) {
			return (null == t || !isFinite(t) || "" === t) && (!(!E(t) || "-" === t) || void 0)
		}
		return !1
	}
	var bh = "\0_ec_inner",
		Sh = il.extend({
			init: function(t, e, i, n) {
				i = i || {}, this.option = null, this._theme = new il(i), this._optionManager = n
			},
			setOption: function(t, e) {
				X(!(bh in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), this.resetOption(null)
			},
			resetOption: function(t) {
				var e = !1,
					i = this._optionManager;
				if (!t || "recreate" === t) {
					var n = i.mountOption("recreate" === t);
					this.option && "recreate" !== t ? (this.restoreData(), this.mergeOption(n)) : function(t) {
						t = t, this.option = {}, this.option[bh] = 1, this._componentsMap = Q({
								series: []
							}), this._seriesIndices, this._seriesIndicesMap,
							function(i, t) {
								var n = i.color && !i.colorLayer;
								D(t, function(t, e) {
									"colorLayer" === e && n || Jl.hasClass(e) || ("object" == typeof t ? i[e] = i[e] ? v(i[e], t, !1) : b(t) :
										null == i[e] && (i[e] = t))
								})
							}(t, this._theme.option), v(t, ih, !1), this.mergeOption(t)
					}.call(this, n), e = !0
				}
				if ("timeline" !== t && "media" !== t || this.restoreData(), !t || "recreate" === t || "timeline" === t) {
					var r = i.getTimelineOption(this);
					r && (this.mergeOption(r), e = !0)
				}
				if (!t || "recreate" === t || "media" === t) {
					var a = i.getMediaOption(this, this._api);
					a.length && D(a, function(t) {
						this.mergeOption(t, e = !0)
					}, this)
				}
				return e
			},
			mergeOption: function(n) {
				var l = this.option,
					h = this._componentsMap,
					i = [];
				! function(t) {
					mh(t).datasetMap = Q()
				}(this), D(n, function(t, e) {
					null != t && (Jl.hasClass(e) ? e && i.push(e) : l[e] = null == l[e] ? b(t) : v(l[e], t, !0))
				}), Jl.topologicalTravel(i, Jl.getAllClassMainTypes(), function(o, t) {
					var e = gr(n[o]),
						i = _r(h.get(o), e);
					xr(i), D(i, function(t, e) {
						var i = t.option;
						N(i) && (t.keyInfo.mainType = o, t.keyInfo.subType = function(t, e, i) {
							return e.type ? e.type : i ? i.subType : Jl.determineSubType(t, e)
						}(o, i, t.exist))
					});
					var s = function(e, t) {
						O(t) || (t = t ? [t] : []);
						var i = {};
						return D(t, function(t) {
							i[t] = (e.get(t) || []).slice()
						}), i
					}(h, t);
					l[o] = [], h.set(o, []), D(i, function(t, e) {
						var i = t.exist,
							n = t.option;
						if (X(N(n) || i, "Empty component definition"), n) {
							var r = Jl.getClass(o, t.keyInfo.subType, !0);
							if (i && i.constructor === r) i.name = t.keyInfo.name, i.mergeOption(n, this), i.optionUpdated(n, !1);
							else {
								var a = k({
									dependentModels: s,
									componentIndex: e
								}, t.keyInfo);
								k(i = new r(n, this, this, a), a), i.init(n, this, this, a), i.optionUpdated(null, !0)
							}
						} else i.mergeOption({}, this), i.optionUpdated({}, !1);
						h.get(o)[e] = i, l[o][e] = i.option
					}, this), "series" === o && Mh(this, h.get("series"))
				}, this), this._seriesIndicesMap = Q(this._seriesIndices = this._seriesIndices || [])
			},
			getOption: function() {
				var n = b(this.option);
				return D(n, function(t, e) {
					if (Jl.hasClass(e)) {
						for (var i = (t = gr(t)).length - 1; 0 <= i; i--) br(t[i]) && t.splice(i, 1);
						n[e] = t
					}
				}), delete n[bh], n
			},
			getTheme: function() {
				return this._theme
			},
			getComponent: function(t, e) {
				var i = this._componentsMap.get(t);
				if (i) return i[e || 0]
			},
			queryComponents: function(t) {
				var e = t.mainType;
				if (!e) return [];
				var i, n = t.index,
					r = t.id,
					a = t.name,
					o = this._componentsMap.get(e);
				if (!o || !o.length) return [];
				if (null != n) O(n) || (n = [n]), i = I(P(n, function(t) {
					return o[t]
				}), function(t) {
					return !!t
				});
				else if (null != r) {
					var s = O(r);
					i = I(o, function(t) {
						return s && 0 <= x(r, t.id) || !s && t.id === r
					})
				} else if (null != a) {
					var l = O(a);
					i = I(o, function(t) {
						return l && 0 <= x(a, t.name) || !l && t.name === a
					})
				} else i = o.slice();
				return Ih(i, t)
			},
			findComponents: function(t) {
				var e, i, n, r, a, o = t.query,
					s = t.mainType,
					l = (i = s + "Index", n = s + "Id", r = s + "Name", !(e = o) || null == e[i] && null == e[n] && null == e[r] ?
						null : {
							mainType: s,
							index: e[i],
							id: e[n],
							name: e[r]
						}),
					h = l ? this.queryComponents(l) : this._componentsMap.get(s);
				return a = Ih(h, t), t.filter ? I(a, t.filter) : a
			},
			eachComponent: function(t, n, r) {
				var e = this._componentsMap;
				if ("function" == typeof t) r = n, n = t, e.each(function(t, i) {
					D(t, function(t, e) {
						n.call(r, i, t, e)
					})
				});
				else if (E(t)) D(e.get(t), n, r);
				else if (N(t)) {
					D(this.findComponents(t), n, r)
				}
			},
			getSeriesByName: function(e) {
				return I(this._componentsMap.get("series"), function(t) {
					return t.name === e
				})
			},
			getSeriesByIndex: function(t) {
				return this._componentsMap.get("series")[t]
			},
			getSeriesByType: function(e) {
				return I(this._componentsMap.get("series"), function(t) {
					return t.subType === e
				})
			},
			getSeries: function() {
				return this._componentsMap.get("series").slice()
			},
			getSeriesCount: function() {
				return this._componentsMap.get("series").length
			},
			eachSeries: function(i, n) {
				D(this._seriesIndices, function(t) {
					var e = this._componentsMap.get("series")[t];
					i.call(n, e, t)
				}, this)
			},
			eachRawSeries: function(t, e) {
				D(this._componentsMap.get("series"), t, e)
			},
			eachSeriesByType: function(i, n, r) {
				D(this._seriesIndices, function(t) {
					var e = this._componentsMap.get("series")[t];
					e.subType === i && n.call(r, e, t)
				}, this)
			},
			eachRawSeriesByType: function(t, e, i) {
				return D(this.getSeriesByType(t), e, i)
			},
			isSeriesFiltered: function(t) {
				return null == this._seriesIndicesMap.get(t.componentIndex)
			},
			getCurrentSeriesIndices: function() {
				return (this._seriesIndices || []).slice()
			},
			filterSeries: function(t, e) {
				var i = I(this._componentsMap.get("series"), t, e);
				Mh(this, i)
			},
			restoreData: function(i) {
				var n = this._componentsMap;
				Mh(this, n.get("series"));
				var r = [];
				n.each(function(t, e) {
					r.push(e)
				}), Jl.topologicalTravel(r, Jl.getAllClassMainTypes(), function(e, t) {
					D(n.get(e), function(t) {
						"series" === e && function(t, e) {
							if (e) {
								var i = e.seiresIndex,
									n = e.seriesId,
									r = e.seriesName;
								return null != i && t.componentIndex !== i || null != n && t.id !== n || null != r && t.name !== r
							}
						}(t, i) || t.restoreData()
					})
				})
			}
		});

	function Mh(t, e) {
		t._seriesIndicesMap = Q(t._seriesIndices = P(e, function(t) {
			return t.componentIndex
		}) || [])
	}

	function Ih(t, e) {
		return e.hasOwnProperty("subType") ? I(t, function(t) {
			return t.subType === e.subType
		}) : t
	}
	S(Sh, rh);
	var Ch = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on",
		"off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel",
		"getViewOfSeriesModel"
	];

	function Ah(e) {
		D(Ch, function(t) {
			this[t] = C(e[t], e)
		}, this)
	}
	var Th = {};

	function Dh() {
		this._coordinateSystems = []
	}
	Dh.prototype = {
		constructor: Dh,
		create: function(n, r) {
			var a = [];
			D(Th, function(t, e) {
				var i = t.create(n, r);
				a = a.concat(i || [])
			}), this._coordinateSystems = a
		},
		update: function(e, i) {
			D(this._coordinateSystems, function(t) {
				t.update && t.update(e, i)
			})
		},
		getCoordinateSystems: function() {
			return this._coordinateSystems.slice()
		}
	}, Dh.register = function(t, e) {
		Th[t] = e
	}, Dh.get = function(t) {
		return Th[t]
	};
	var kh = D,
		Ph = b,
		Lh = P,
		Oh = v,
		zh = /^(min|max)?(.+)$/;

	function Eh(t) {
		this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, this._currentMediaIndices = [],
			this._optionBackup, this._newBaseOption
	}

	function Nh(t, e, i) {
		var a = {
				width: e,
				height: i,
				aspectratio: e / i
			},
			o = !0;
		return D(t, function(t, e) {
			var i = e.match(zh);
			if (i && i[1] && i[2]) {
				var n = i[1],
					r = i[2].toLowerCase();
				! function(t, e, i) {
					return "min" === i ? e <= t : "max" === i ? t <= e : t === e
				}(a[r], t, n) && (o = !1)
			}
		}), o
	}
	Eh.prototype = {
		constructor: Eh,
		setOption: function(t, e) {
			t && D(gr(t.series), function(t) {
				t && t.data && B(t.data) && q(t.data)
			}), t = Ph(t);
			var i = this._optionBackup,
				n = function(t, i, n) {
					var e, r, a = [],
						o = [],
						s = t.timeline;
					t.baseOption && (r = t.baseOption);
					(s || t.options) && (r = r || {}, a = (t.options || []).slice());
					if (t.media) {
						r = r || {};
						var l = t.media;
						kh(l, function(t) {
							t && t.option && (t.query ? o.push(t) : e = e || t)
						})
					}
					r = r || t;
					r.timeline || (r.timeline = s);
					return kh([r].concat(a).concat(P(o, function(t) {
						return t.option
					})), function(e) {
						kh(i, function(t) {
							t(e, n)
						})
					}), {
						baseOption: r,
						timelineOptions: a,
						mediaDefault: e,
						mediaList: o
					}
				}.call(this, t, e, !i);
			this._newBaseOption = n.baseOption, i ? (function(r, t) {
						kh(t = t || {}, function(t, e) {
							if (null != t) {
								var i = r[e];
								if (Jl.hasClass(e)) {
									t = gr(t);
									var n = _r(i = gr(i), t);
									r[e] = Lh(n, function(t) {
										return t.option && t.exist ? Oh(t.exist, t.option, !0) : t.exist || t.option
									})
								} else r[e] = Oh(i, t, !0)
							}
						})
					}(i.baseOption, n.baseOption), n.timelineOptions.length && (i.timelineOptions = n.timelineOptions), n.mediaList
					.length && (i.mediaList = n.mediaList), n.mediaDefault && (i.mediaDefault = n.mediaDefault)) : this._optionBackup =
				n
		},
		mountOption: function(t) {
			var e = this._optionBackup;
			return this._timelineOptions = Lh(e.timelineOptions, Ph), this._mediaList = Lh(e.mediaList, Ph), this._mediaDefault =
				Ph(e.mediaDefault), this._currentMediaIndices = [], Ph(t ? e.baseOption : this._newBaseOption)
		},
		getTimelineOption: function(t) {
			var e, i = this._timelineOptions;
			if (i.length) {
				var n = t.getComponent("timeline");
				n && (e = Ph(i[n.getCurrentIndex()], !0))
			}
			return e
		},
		getMediaOption: function(t) {
			var e = this._api.getWidth(),
				i = this._api.getHeight(),
				n = this._mediaList,
				r = this._mediaDefault,
				a = [],
				o = [];
			if (!n.length && !r) return o;
			for (var s = 0, l = n.length; s < l; s++) Nh(n[s].query, e, i) && a.push(s);
			return !a.length && r && (a = [-1]), a.length && ! function(t, e) {
				return t.join(",") === e.join(",")
			}(a, this._currentMediaIndices) && (o = Lh(a, function(t) {
				return Ph(-1 === t ? r.option : n[t].option)
			})), this._currentMediaIndices = a, o
		}
	};
	var Rh = D,
		Bh = N,
		Vh = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];

	function Fh(t) {
		var e = t && t.itemStyle;
		if (e)
			for (var i = 0, n = Vh.length; i < n; i++) {
				var r = Vh[i],
					a = e.normal,
					o = e.emphasis;
				a && a[r] && (t[r] = t[r] || {}, t[r].normal ? v(t[r].normal, a[r]) : t[r].normal = a[r], a[r] = null), o && o[r] &&
					(t[r] = t[r] || {}, t[r].emphasis ? v(t[r].emphasis, o[r]) : t[r].emphasis = o[r], o[r] = null)
			}
	}

	function Hh(t, e, i) {
		if (t && t[e] && (t[e].normal || t[e].emphasis)) {
			var n = t[e].normal,
				r = t[e].emphasis;
			n && (i ? (t[e].normal = t[e].emphasis = null, T(t[e], n)) : t[e] = n), r && (t.emphasis = t.emphasis || {}, t.emphasis[
				e] = r)
		}
	}

	function Gh(t) {
		Hh(t, "itemStyle"), Hh(t, "lineStyle"), Hh(t, "areaStyle"), Hh(t, "label"), Hh(t, "labelLine"), Hh(t, "upperLabel"),
			Hh(t, "edgeLabel")
	}

	function Wh(t, e) {
		var i = Bh(t) && t[e],
			n = Bh(i) && i.textStyle;
		if (n)
			for (var r = 0, a = mr.length; r < a; r++) {
				e = mr[r];
				n.hasOwnProperty(e) && (i[e] = n[e])
			}
	}

	function Zh(t) {
		t && (Gh(t), Wh(t, "label"), t.emphasis && Wh(t.emphasis, "label"))
	}

	function Uh(t) {
		return O(t) ? t : t ? [t] : []
	}

	function Xh(t) {
		return (O(t) ? t[0] : t) || {}
	}

	function Yh(e, t) {
		Rh(Uh(e.series), function(t) {
			Bh(t) && function(t) {
				if (Bh(t)) {
					Fh(t), Gh(t), Wh(t, "label"), Wh(t, "upperLabel"), Wh(t, "edgeLabel"), t.emphasis && (Wh(t.emphasis, "label"),
							Wh(t.emphasis, "upperLabel"), Wh(t.emphasis, "edgeLabel")), (i = t.markPoint) && (Fh(i), Zh(i)), (n = t.markLine) &&
						(Fh(n), Zh(n));
					var e = t.markArea;
					e && Zh(e);
					var i, n, r = t.data;
					if ("graph" === t.type) {
						r = r || t.nodes;
						var a = t.links || t.edges;
						if (a && !B(a))
							for (var o = 0; o < a.length; o++) Zh(a[o]);
						D(t.categories, function(t) {
							Gh(t)
						})
					}
					if (r && !B(r))
						for (o = 0; o < r.length; o++) Zh(r[o]);
					if ((i = t.markPoint) && i.data) {
						var s = i.data;
						for (o = 0; o < s.length; o++) Zh(s[o])
					}
					if ((n = t.markLine) && n.data) {
						var l = n.data;
						for (o = 0; o < l.length; o++) O(l[o]) ? (Zh(l[o][0]), Zh(l[o][1])) : Zh(l[o])
					}
					"gauge" === t.type ? (Wh(t, "axisLabel"), Wh(t, "title"), Wh(t, "detail")) : "treemap" === t.type ? (Hh(t.breadcrumb,
						"itemStyle"), D(t.levels, function(t) {
						Gh(t)
					})) : "tree" === t.type && Gh(t.leaves)
				}
			}(t)
		});
		var i = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
		t && i.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Rh(i, function(t) {
			Rh(Uh(e[t]), function(t) {
				t && (Wh(t, "axisLabel"), Wh(t.axisPointer, "label"))
			})
		}), Rh(Uh(e.parallel), function(t) {
			var e = t && t.parallelAxisDefault;
			Wh(e, "axisLabel"), Wh(e && e.axisPointer, "label")
		}), Rh(Uh(e.calendar), function(t) {
			Hh(t, "itemStyle"), Wh(t, "dayLabel"), Wh(t, "monthLabel"), Wh(t, "yearLabel")
		}), Rh(Uh(e.radar), function(t) {
			Wh(t, "name")
		}), Rh(Uh(e.geo), function(t) {
			Bh(t) && (Zh(t), Rh(Uh(t.regions), function(t) {
				Zh(t)
			}))
		}), Rh(Uh(e.timeline), function(t) {
			Zh(t), Hh(t, "label"), Hh(t, "itemStyle"), Hh(t, "controlStyle", !0);
			var e = t.data;
			O(e) && D(e, function(t) {
				N(t) && (Hh(t, "label"), Hh(t, "itemStyle"))
			})
		}), Rh(Uh(e.toolbox), function(t) {
			Hh(t, "iconStyle"), Rh(t.feature, function(t) {
				Hh(t, "iconStyle")
			})
		}), Wh(Xh(e.axisPointer), "label"), Wh(Xh(e.tooltip).axisPointer, "label")
	}

	function jh(e) {
		D(qh, function(t) {
			t[0] in e && !(t[1] in e) && (e[t[1]] = e[t[0]])
		})
	}
	var qh = [
			["x", "left"],
			["y", "top"],
			["x2", "right"],
			["y2", "bottom"]
		],
		$h = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"],
		Kh = function(i, t) {
			Yh(i, t), i.series = gr(i.series), D(i.series, function(t) {
				if (N(t)) {
					var e = t.type;
					if ("line" === e) null != t.clipOverflow && (t.clip = t.clipOverflow);
					else if ("pie" === e || "gauge" === e) null != t.clockWise && (t.clockwise = t.clockWise);
					else if ("gauge" === e) {
						var i = function(t, e) {
							e = e.split(",");
							for (var i = t, n = 0; n < e.length && null != (i = i && i[e[n]]); n++);
							return i
						}(t, "pointer.color");
						null != i && function(t, e, i, n) {
							e = e.split(",");
							for (var r, a = t, o = 0; o < e.length - 1; o++) null == a[r = e[o]] && (a[r] = {}), a = a[r];
							!n && null != a[e[o]] || (a[e[o]] = i)
						}(t, "itemStyle.color", i)
					}
					jh(t)
				}
			}), i.dataRange && (i.visualMap = i.dataRange), D($h, function(t) {
				var e = i[t];
				e && (O(e) || (e = [e]), D(e, function(t) {
					jh(t)
				}))
			})
		};

	function Qh(v) {
		D(v, function(u, c) {
			var d = [],
				f = [NaN, NaN],
				t = [u.stackResultDimension, u.stackedOverDimension],
				p = u.data,
				g = u.isStackedByIndex,
				e = p.map(t, function(t, e, i) {
					var n, r, a = p.get(u.stackedDimension, i);
					if (isNaN(a)) return f;
					g ? r = p.getRawIndex(i) : n = p.get(u.stackedByDimension, i);
					for (var o = NaN, s = c - 1; 0 <= s; s--) {
						var l = v[s];
						if (g || (r = l.data.rawIndexOf(l.stackedByDimension, n)), 0 <= r) {
							var h = l.data.getByRawIndex(l.stackResultDimension, r);
							if (0 <= a && 0 < h || a <= 0 && h < 0) {
								a += h, o = h;
								break
							}
						}
					}
					return d[0] = a, d[1] = o, d
				});
			p.hostModel.setData(e), u.data = e
		})
	}

	function Jh(t, e) {
		vh.isInstance(t) || (t = vh.seriesDataToSource(t)), this._source = t;
		var i = this._data = t.data,
			n = t.sourceFormat;
		n === fh && (this._offset = 0, this._dimSize = e, this._data = i), k(this, eu[n === hh ? n + "_" + t.seriesLayoutBy :
			n])
	}
	var tu = Jh.prototype;
	tu.pure = !1;
	var eu = {
		arrayRows_column: {
			pure: tu.persistent = !0,
			count: function() {
				return Math.max(0, this._data.length - this._source.startIndex)
			},
			getItem: function(t) {
				return this._data[t + this._source.startIndex]
			},
			appendData: ru
		},
		arrayRows_row: {
			pure: !0,
			count: function() {
				var t = this._data[0];
				return t ? Math.max(0, t.length - this._source.startIndex) : 0
			},
			getItem: function(t) {
				t += this._source.startIndex;
				for (var e = [], i = this._data, n = 0; n < i.length; n++) {
					var r = i[n];
					e.push(r ? r[t] : null)
				}
				return e
			},
			appendData: function() {
				throw new Error('Do not support appendData when set seriesLayoutBy: "row".')
			}
		},
		objectRows: {
			pure: !0,
			count: iu,
			getItem: nu,
			appendData: ru
		},
		keyedColumns: {
			pure: !0,
			count: function() {
				var t = this._source.dimensionsDefine[0].name,
					e = this._data[t];
				return e ? e.length : 0
			},
			getItem: function(t) {
				for (var e = [], i = this._source.dimensionsDefine, n = 0; n < i.length; n++) {
					var r = this._data[i[n].name];
					e.push(r ? r[t] : null)
				}
				return e
			},
			appendData: function(t) {
				var r = this._data;
				D(t, function(t, e) {
					for (var i = r[e] || (r[e] = []), n = 0; n < (t || []).length; n++) i.push(t[n])
				})
			}
		},
		original: {
			count: iu,
			getItem: nu,
			appendData: ru
		},
		typedArray: {
			persistent: !(tu.getSource = function() {
				return this._source
			}),
			pure: !0,
			count: function() {
				return this._data ? this._data.length / this._dimSize : 0
			},
			getItem: function(t, e) {
				t -= this._offset, e = e || [];
				for (var i = this._dimSize * t, n = 0; n < this._dimSize; n++) e[n] = this._data[i + n];
				return e
			},
			appendData: function(t) {
				this._data = t
			},
			clean: function() {
				this._offset += this.count(), this._data = null
			}
		}
	};

	function iu() {
		return this._data.length
	}

	function nu(t) {
		return this._data[t]
	}

	function ru(t) {
		for (var e = 0; e < t.length; e++) this._data.push(t[e])
	}
	var au = {
		arrayRows: ou,
		objectRows: function(t, e, i, n) {
			return null != i ? t[n] : t
		},
		keyedColumns: ou,
		original: function(t, e, i, n) {
			var r = yr(t);
			return null != i && r instanceof Array ? r[i] : r
		},
		typedArray: ou
	};

	function ou(t, e, i, n) {
		return null != i ? t[i] : t
	}
	var su = {
		arrayRows: lu,
		objectRows: function(t, e, i, n) {
			return hu(t[e], this._dimensionInfos[e])
		},
		keyedColumns: lu,
		original: function(t, e, i, n) {
			var r = t && (null == t.value ? t : t.value);
			return !this._rawData.pure && function(t) {
				return dr(t) && !(t instanceof Array)
			}(t) && (this.hasItemOption = !0), hu(r instanceof Array ? r[n] : r, this._dimensionInfos[e])
		},
		typedArray: function(t, e, i, n) {
			return t[n]
		}
	};

	function lu(t, e, i, n) {
		return hu(t[n], this._dimensionInfos[e])
	}

	function hu(t, e) {
		var i = e && e.type;
		if ("ordinal" !== i) return "time" === i && "number" != typeof t && null != t && "-" !== t && (t = +_l(t)), null ==
			t || "" === t ? NaN : +t;
		var n = e && e.ordinalMeta;
		return n ? n.parseAndCollect(t) : t
	}

	function uu(t, e, i) {
		if (t) {
			var n = t.getRawDataItem(e);
			if (null != n) {
				var r, a, o = t.getProvider().getSource().sourceFormat,
					s = t.getDimensionInfo(i);
				return s && (r = s.name, a = s.index), au[o](n, e, a, r)
			}
		}
	}

	function cu(t, e, i) {
		if (t) {
			var n = t.getProvider().getSource().sourceFormat;
			if (n === lh || n === uh) {
				var r = t.getRawDataItem(e);
				return n !== lh || N(r) || (r = null), r ? r[i] : void 0
			}
		}
	}
	var du = /\{@(.+?)\}/g,
		fu = {
			getDataParams: function(t, e) {
				var i = this.getData(e),
					n = this.getRawValue(t, e),
					r = i.getRawIndex(t),
					a = i.getName(t),
					o = i.getRawDataItem(t),
					s = i.getItemVisual(t, "color"),
					l = i.getItemVisual(t, "borderColor"),
					h = this.ecModel.getComponent("tooltip"),
					u = Dr(h && h.get("renderMode")),
					c = this.mainType,
					d = "series" === c,
					f = i.userOutput;
				return {
					componentType: c,
					componentSubType: this.subType,
					componentIndex: this.componentIndex,
					seriesType: d ? this.subType : null,
					seriesIndex: this.seriesIndex,
					seriesId: d ? this.id : null,
					seriesName: d ? this.name : null,
					name: a,
					dataIndex: r,
					data: o,
					dataType: e,
					value: n,
					color: s,
					borderColor: l,
					dimensionNames: f ? f.dimensionNames : null,
					encode: f ? f.encode : null,
					marker: Ol({
						color: s,
						renderMode: u
					}),
					$vars: ["seriesName", "name", "value"]
				}
			},
			getFormattedLabel: function(n, t, e, i, r) {
				t = t || "normal";
				var a = this.getData(e),
					o = a.getItemModel(n),
					s = this.getDataParams(n, e);
				null != i && s.value instanceof Array && (s.value = s.value[i]);
				var l = o.get("normal" === t ? [r || "label", "formatter"] : [t, r || "label", "formatter"]);
				return "function" == typeof l ? (s.status = t, s.dimensionIndex = i, l(s)) : "string" == typeof l ? Ll(l, s).replace(
					du,
					function(t, e) {
						var i = e.length;
						return "[" === e.charAt(0) && "]" === e.charAt(i - 1) && (e = +e.slice(1, i - 1)), uu(a, n, e)
					}) : void 0
			},
			getRawValue: function(t, e) {
				return uu(this.getData(e), t)
			},
			formatTooltip: function() {}
		};

	function pu(t) {
		return new gu(t)
	}

	function gu(t) {
		t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !
			0, this.context
	}
	var vu = gu.prototype;
	vu.perform = function(t) {
		var e, i = this._upstream,
			n = t && t.skip;
		if (this._dirty && i) {
			var r = this.context;
			r.data = r.outputData = i.context.outputData
		}
		this.__pipeline && (this.__pipeline.currentTask = this), this._plan && !n && (e = this._plan(this.context));
		var a, o = u(this._modBy),
			s = this._modDataCount || 0,
			l = u(t && t.modBy),
			h = t && t.modDataCount || 0;

		function u(t) {
			return 1 <= t || (t = 1), t
		}
		o === l && s === h || (e = "reset"), !this._dirty && "reset" !== e || (this._dirty = !1, a = function(t, e) {
			var i, n;
			t._dueIndex = t._outputDueEnd = t._dueEnd = 0, t._settedOutputEnd = null, !e && t._reset && ((i = t._reset(t.context)) &&
				i.progress && (n = i.forceFirstProgress, i = i.progress), O(i) && !i.length && (i = null));
			t._progress = i, t._modBy = t._modDataCount = null;
			var r = t._downstream;
			return r && r.dirty(), n
		}(this, n)), this._modBy = l, this._modDataCount = h;
		var c = t && t.step;
		if (this._dueEnd = i ? i._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, this._progress) {
			var d = this._dueIndex,
				f = Math.min(null != c ? this._dueIndex + c : 1 / 0, this._dueEnd);
			if (!n && (a || d < f)) {
				var p = this._progress;
				if (O(p))
					for (var g = 0; g < p.length; g++) Cu(this, p[g], d, f, l, h);
				else Cu(this, p, d, f, l, h)
			}
			this._dueIndex = f;
			var v = null != this._settedOutputEnd ? this._settedOutputEnd : f;
			this._outputDueEnd = v
		} else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
		return this.unfinished()
	};
	var mu, yu, _u, xu, wu, bu, Su = bu = {
		reset: function(t, e, i, n) {
			yu = t, mu = e, _u = i, xu = n, wu = Math.ceil(xu / _u), bu.next = 1 < _u && 0 < xu ? Iu : Mu
		}
	};

	function Mu() {
		return yu < mu ? yu++ : null
	}

	function Iu() {
		var t = yu % wu * _u + Math.ceil(yu / wu),
			e = mu <= yu ? null : t < xu ? t : yu;
		return yu++, e
	}

	function Cu(t, e, i, n, r, a) {
		Su.reset(i, n, r, a), t._callingProgress = e, t._callingProgress({
			start: i,
			end: n,
			count: n - i,
			next: Su.next
		}, t.context)
	}
	vu.dirty = function() {
		this._dirty = !0, this._onDirty && this._onDirty(this.context)
	}, vu.unfinished = function() {
		return this._progress && this._dueIndex < this._dueEnd
	}, vu.pipe = function(t) {
		this._downstream === t && !this._dirty || ((this._downstream = t)._upstream = this, t.dirty())
	}, vu.dispose = function() {
		this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream =
			null), this._dirty = !1, this._disposed = !0)
	}, vu.getUpstream = function() {
		return this._upstream
	}, vu.getDownstream = function() {
		return this._downstream
	}, vu.setOutputEnd = function(t) {
		this._outputDueEnd = this._settedOutputEnd = t
	};
	var Au = Mr(),
		Tu = Jl.extend({
			type: "series.__base__",
			seriesIndex: 0,
			coordinateSystem: null,
			defaultOption: null,
			legendDataProvider: null,
			visualColorAccessPath: "itemStyle.color",
			visualBorderColorAccessPath: "itemStyle.borderColor",
			layoutMode: null,
			init: function(t, e, i, n) {
				this.seriesIndex = this.componentIndex, this.dataTask = pu({
					count: ku,
					reset: Pu
				}), this.dataTask.context = {
					model: this
				}, this.mergeDefaultAndTheme(t, i), yh(this);
				var r = this.getInitialData(t, i);
				Ou(r, this), this.dataTask.context.data = r, Au(this).dataBeforeProcessed = r, Du(this)
			},
			mergeDefaultAndTheme: function(t, e) {
				var i = this.layoutMode,
					n = i ? Yl(t) : {},
					r = this.subType;
				Jl.hasClass(r) && (r += "Series"), v(t, e.getTheme().get(this.subType)), v(t, this.getDefaultOption()), vr(t,
					"label", ["show"]), this.fillDataTextStyle(t.data), i && Xl(t, n, i)
			},
			mergeOption: function(t, e) {
				t = v(this.option, t, !0), this.fillDataTextStyle(t.data);
				var i = this.layoutMode;
				i && Xl(this.option, t, i), yh(this);
				var n = this.getInitialData(t, e);
				Ou(n, this), this.dataTask.dirty(), this.dataTask.context.data = n, Au(this).dataBeforeProcessed = n, Du(this)
			},
			fillDataTextStyle: function(t) {
				if (t && !B(t))
					for (var e = ["show"], i = 0; i < t.length; i++) t[i] && t[i].label && vr(t[i], "label", e)
			},
			getInitialData: function() {},
			appendData: function(t) {
				this.getRawData().appendData(t.data)
			},
			getData: function(t) {
				var e = Eu(this);
				if (e) {
					var i = e.context.data;
					return null == t ? i : i.getLinkedData(t)
				}
				return Au(this).data
			},
			setData: function(t) {
				var e = Eu(this);
				if (e) {
					var i = e.context;
					i.data !== t && e.modifyOutputEnd && e.setOutputEnd(t.count()), i.outputData = t, e !== this.dataTask && (i.data =
						t)
				}
				Au(this).data = t
			},
			getSource: function() {
				return function(t) {
					return mh(t).source
				}(this)
			},
			getRawData: function() {
				return Au(this).dataBeforeProcessed
			},
			getBaseAxis: function() {
				var t = this.coordinateSystem;
				return t && t.getBaseAxis && t.getBaseAxis()
			},
			formatTooltip: function(r, u, t, c) {
				var d = this,
					e = "html" === (c = c || "html") ? "<br/>" : "\n",
					f = "richText" === c,
					p = {},
					g = 0;

				function i(t) {
					return {
						renderMode: c,
						content: Dl(Ml(t)),
						style: p
					}
				}
				var v = this.getData(),
					a = v.mapDimension("defaultedTooltip", !0),
					n = a.length,
					o = this.getRawValue(r),
					s = O(o),
					m = v.getItemVisual(r, "color");
				N(m) && m.colorStops && (m = (m.colorStops[0] || {}).color), m = m || "transparent";
				var l = (1 < n || s && !n ? function(t) {
						var l = M(t, function(t, e, i) {
								var n = v.getDimensionInfo(i);
								return t | (n && !1 !== n.tooltip && null != n.displayName)
							}, 0),
							h = [];

						function e(t, e) {
							var i = v.getDimensionInfo(e);
							if (i && !1 !== i.otherDims.tooltip) {
								var n = i.type,
									r = "sub" + d.seriesIndex + "at" + g,
									a = Ol({
										color: m,
										type: "subItem",
										renderMode: c,
										markerId: r
									}),
									o = "string" == typeof a ? a : a.content,
									s = (l ? o + Dl(i.displayName || "-") + ": " : "") + Dl("ordinal" === n ? t + "" : "time" === n ? u ? "" :
										El("yyyy/MM/dd hh:mm:ss", t) : Ml(t));
								s && h.push(s), f && (p[r] = m, ++g)
							}
						}
						a.length ? D(a, function(t) {
							e(uu(v, r, t), t)
						}) : D(t, e);
						var i = l ? f ? "\n" : "<br/>" : "",
							n = i + h.join(i || ", ");
						return {
							renderMode: c,
							content: n,
							style: p
						}
					}(o) : i(n ? uu(v, r, a[0]) : s ? o[0] : o)).content,
					h = d.seriesIndex + "at" + g,
					y = Ol({
						color: m,
						type: "item",
						renderMode: c,
						markerId: h
					});
				p[h] = m, ++g;
				var _ = v.getName(r),
					x = this.name;
				wr(this) || (x = ""), x = x ? Dl(x) + (u ? ": " : e) : "";
				var w = "string" == typeof y ? y : y.content;
				return {
					html: u ? w + x + l : x + w + (_ ? Dl(_) + ": " + l : l),
					markers: p
				}
			},
			isAnimationEnabled: function() {
				if (m.node) return !1;
				var t = this.getShallow("animation");
				return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), t
			},
			restoreData: function() {
				this.dataTask.dirty()
			},
			getColorFromPalette: function(t, e, i) {
				var n = this.ecModel,
					r = rh.getColorFromPalette.call(this, t, e, i);
				return r = r || n.getColorFromPalette(t, e, i)
			},
			coordDimToDataDim: function(t) {
				return this.getRawData().mapDimension(t, !0)
			},
			getProgressive: function() {
				return this.get("progressive")
			},
			getProgressiveThreshold: function() {
				return this.get("progressiveThreshold")
			},
			getAxisTooltipData: null,
			getTooltipPosition: null,
			pipeTask: null,
			preventIncremental: null,
			pipelineContext: null
		});

	function Du(t) {
		var e = t.name;
		wr(t) || (t.name = function(t) {
			var i = t.getRawData(),
				e = i.mapDimension("seriesName", !0),
				n = [];
			return D(e, function(t) {
				var e = i.getDimensionInfo(t);
				e.displayName && n.push(e.displayName)
			}), n.join(" ")
		}(t) || e)
	}

	function ku(t) {
		return t.model.getRawData().count()
	}

	function Pu(t) {
		var e = t.model;
		return e.setData(e.getRawData().cloneShallow()), Lu
	}

	function Lu(t, e) {
		t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData)
	}

	function Ou(e, i) {
		D(e.CHANGABLE_METHODS, function(t) {
			e.wrapMethod(t, A(zu, i))
		})
	}

	function zu(t) {
		var e = Eu(t);
		e && e.setOutputEnd(this.count())
	}

	function Eu(t) {
		var e = (t.ecModel || {}).scheduler,
			i = e && e.getPipeline(t.uid);
		if (i) {
			var n = i.currentTask;
			if (n) {
				var r = n.agentStubMap;
				r && (n = r.get(t.uid))
			}
			return n
		}
	}
	S(Tu, fu), S(Tu, rh);
	var Nu = function() {
		this.group = new mi, this.uid = ol("viewComponent")
	};
	Nu.prototype = {
		constructor: Nu,
		init: function(t, e) {},
		render: function(t, e, i, n) {},
		dispose: function() {},
		filterForExposedEvent: null
	};
	var Ru = Nu.prototype;
	Ru.updateView = Ru.updateLayout = Ru.updateVisual = function(t, e, i, n) {}, Or(Nu), Br(Nu, {
		registerWhenExtend: !0
	});

	function Bu() {
		var s = Mr();
		return function(t) {
			var e = s(t),
				i = t.pipelineContext,
				n = e.large,
				r = e.progressiveRender,
				a = e.large = i.large,
				o = e.progressiveRender = i.progressiveRender;
			return !!(n ^ a || r ^ o) && "reset"
		}
	}
	var Vu = Mr(),
		Fu = Bu();

	function Hu() {
		this.group = new mi, this.uid = ol("viewChart"), this.renderTask = pu({
			plan: Uu,
			reset: Xu
		}), this.renderTask.context = {
			view: this
		}
	}
	var Gu = Hu.prototype = {
		type: "chart",
		init: function(t, e) {},
		render: function(t, e, i, n) {},
		highlight: function(t, e, i, n) {
			Zu(t.getData(), n, "emphasis")
		},
		downplay: function(t, e, i, n) {
			Zu(t.getData(), n, "normal")
		},
		remove: function(t, e) {
			this.group.removeAll()
		},
		dispose: function() {},
		incrementalPrepareRender: null,
		incrementalRender: null,
		updateTransform: null,
		filterForExposedEvent: null
	};

	function Wu(t, e, i) {
		if (t && (t.trigger(e, i), t.isGroup && !Ts(t)))
			for (var n = 0, r = t.childCount(); n < r; n++) Wu(t.childAt(n), e, i)
	}

	function Zu(e, t, i) {
		var n = Sr(e, t),
			r = t && null != t.highlightKey ? Ds(t.highlightKey) : null;
		null != n ? D(gr(n), function(t) {
			Wu(e.getItemGraphicEl(t), i, r)
		}) : e.eachItemGraphicEl(function(t) {
			Wu(t, i, r)
		})
	}

	function Uu(t) {
		return Fu(t.model)
	}

	function Xu(t) {
		var e = t.model,
			i = t.ecModel,
			n = t.api,
			r = t.payload,
			a = e.pipelineContext.progressiveRender,
			o = t.view,
			s = r && Vu(r).updateMethod,
			l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
		return "render" !== l && o[l](e, i, n, r), Yu[l]
	}
	Gu.updateView = Gu.updateLayout = Gu.updateVisual = function(t, e, i, n) {
		this.render(t, e, i, n)
	}, Or(Hu), Br(Hu, {
		registerWhenExtend: !0
	}), Hu.markUpdateMethod = function(t, e) {
		Vu(t).updateMethod = e
	};
	var Yu = {
			incrementalPrepareRender: {
				progress: function(t, e) {
					e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload)
				}
			},
			render: {
				forceFirstProgress: !0,
				progress: function(t, e) {
					e.view.render(e.model, e.ecModel, e.api, e.payload)
				}
			}
		},
		ju = "\0__throttleOriginMethod",
		qu = "\0__throttleRate",
		$u = "\0__throttleType";

	function Ku(t, i, n) {
		var r, a, o, s, l, h = 0,
			u = 0,
			c = null;

		function d() {
			u = (new Date).getTime(), c = null, t.apply(o, s || [])
		}
		i = i || 0;

		function e() {
			r = (new Date).getTime(), o = this, s = arguments;
			var t = l || i,
				e = l || n;
			l = null, a = r - (e ? h : u) - t, clearTimeout(c), e ? c = setTimeout(d, t) : 0 <= a ? d() : c = setTimeout(d, -a),
				h = r
		}
		return e.clear = function() {
			c && (clearTimeout(c), c = null)
		}, e.debounceNextCall = function(t) {
			l = t
		}, e
	}

	function Qu(t, e, i, n) {
		var r = t[e];
		if (r) {
			var a = r[ju] || r,
				o = r[$u];
			if (r[qu] !== i || o !== n) {
				if (null == i || !n) return t[e] = a;
				(r = t[e] = Ku(a, i, "debounce" === n))[ju] = a, r[$u] = n, r[qu] = i
			}
			return r
		}
	}

	function Ju(t, e) {
		var i = t[e];
		i && i[ju] && (t[e] = i[ju])
	}
	var tc = {
			createOnAllSeries: !0,
			performRawSeries: !0,
			reset: function(e, t) {
				var i = e.getData(),
					a = (e.visualColorAccessPath || "itemStyle.color").split("."),
					n = e.get(a) || e.getColorFromPalette(e.name, null, t.getSeriesCount());
				i.setVisual("color", n);
				var o = (e.visualBorderColorAccessPath || "itemStyle.borderColor").split("."),
					r = e.get(o);
				if (i.setVisual("borderColor", r), !t.isSeriesFiltered(e)) {
					"function" != typeof n || n instanceof Ho || i.each(function(t) {
						i.setItemVisual(t, "color", n(e.getDataParams(t)))
					});
					return {
						dataEach: i.hasItemOption ? function(t, e) {
							var i = t.getItemModel(e),
								n = i.get(a, !0),
								r = i.get(o, !0);
							null != n && t.setItemVisual(e, "color", n), null != r && t.setItemVisual(e, "borderColor", r)
						} : null
					}
				}
			}
		},
		ec = {
			legend: {
				selector: {
					all: "All",
					inverse: "Inv"
				}
			},
			toolbox: {
				brush: {
					title: {
						rect: "Box Select",
						polygon: "Lasso Select",
						lineX: "Horizontally Select",
						lineY: "Vertically Select",
						keep: "Keep Selections",
						clear: "Clear Selections"
					}
				},
				dataView: {
					title: "Data View",
					lang: ["Data View", "Close", "Refresh"]
				},
				dataZoom: {
					title: {
						zoom: "Zoom",
						back: "Zoom Reset"
					}
				},
				magicType: {
					title: {
						line: "Switch to Line Chart",
						bar: "Switch to Bar Chart",
						stack: "Stack",
						tiled: "Tile"
					}
				},
				restore: {
					title: "Restore"
				},
				saveAsImage: {
					title: "Save as Image",
					lang: ["Right Click to Save Image"]
				}
			},
			aria: {
				general: {
					withTitle: 'This is a chart about "{title}"',
					withoutTitle: "This is a chart"
				},
				series: {
					single: {
						prefix: "",
						withName: " with type {seriesType} named {seriesName}.",
						withoutName: " with type {seriesType}."
					},
					multiple: {
						prefix: ". It consists of {seriesCount} series count.",
						withName: " The {seriesId} series is a {seriesType} representing {seriesName}.",
						withoutName: " The {seriesId} series is a {seriesType}.",
						separator: {
							middle: "",
							end: ""
						}
					}
				},
				data: {
					allData: "The data is as follows: ",
					partialData: "The first {displayCnt} items are: ",
					withName: "the data for {name} is {value}",
					withoutName: "{value}",
					separator: {
						middle: ",",
						end: "."
					}
				}
			}
		},
		ic = function(t, e) {
			var a = e.getModel("aria");
			if (a.get("show"))
				if (a.get("description")) t.setAttribute("aria-label", a.get("description"));
				else {
					var u = 0;
					e.eachSeries(function(t, e) {
						++u
					}, this);
					var i, c = a.get("data.maxCount") || 10,
						n = a.get("series.maxCount") || 10,
						d = Math.min(u, n);
					if (!(u < 1)) {
						var r = function() {
							var t = e.getModel("title").option;
							t && t.length && (t = t[0]);
							return t && t.text
						}();
						i = r ? p(g("general.withTitle"), {
							title: r
						}) : g("general.withoutTitle");
						var f = [];
						i += p(g(1 < u ? "series.multiple.prefix" : "series.single.prefix"), {
							seriesCount: u
						}), e.eachSeries(function(t, e) {
							if (e < d) {
								var i, n = t.get("name"),
									r = "series." + (1 < u ? "multiple" : "single") + ".";
								i = p(i = g(n ? r + "withName" : r + "withoutName"), {
									seriesId: t.seriesIndex,
									seriesName: t.get("name"),
									seriesType: function(t) {
										return ec.series.typeNames[t] || "自定义图"
									}(t.subType)
								});
								var a = t.getData();
								(window.data = a).count() > c ? i += p(g("data.partialData"), {
									displayCnt: c
								}) : i += g("data.allData");
								for (var o = [], s = 0; s < a.count(); s++)
									if (s < c) {
										var l = a.getName(s),
											h = uu(a, s);
										o.push(p(g(l ? "data.withName" : "data.withoutName"), {
											name: l,
											value: h
										}))
									} i += o.join(g("data.separator.middle")) + g("data.separator.end"), f.push(i)
							}
						}), i += f.join(g("series.multiple.separator.middle")) + g("series.multiple.separator.end"), t.setAttribute(
							"aria-label", i)
					}
				}
			function p(t, e) {
				if ("string" != typeof t) return t;
				var i = t;
				return D(e, function(t, e) {
					i = i.replace(new RegExp("\\{\\s*" + e + "\\s*\\}", "g"), t)
				}), i
			}

			function g(t) {
				var e = a.get(t);
				if (null != e) return e;
				for (var i = t.split("."), n = ec.aria, r = 0; r < i.length; ++r) n = n[i[r]];
				return n
			}
		},
		nc = Math.PI;

	function rc(t, e, i, n) {
		this.ecInstance = t, this.api = e, this.unfinished;
		i = this._dataProcessorHandlers = i.slice(), n = this._visualHandlers = n.slice();
		this._allHandlers = i.concat(n), this._stageTaskMap = Q()
	}
	var ac = rc.prototype;

	function oc(l, t, h, u, c) {
		var d;

		function f(t, e) {
			return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id))
		}
		c = c || {}, D(t, function(n, t) {
			if (!c.visualType || c.visualType === n.visualType) {
				var e = l._stageTaskMap.get(n.uid),
					i = e.seriesTaskMap,
					r = e.overallTask;
				if (r) {
					var a, o = r.agentStubMap;
					o.each(function(t) {
						f(c, t) && (t.dirty(), a = !0)
					}), a && r.dirty(), sc(r, u);
					var s = l.getPerformArgs(r, c.block);
					o.each(function(t) {
						t.perform(s)
					}), d |= r.perform(s)
				} else i && i.each(function(t, e) {
					f(c, t) && t.dirty();
					var i = l.getPerformArgs(t, c.block);
					i.skip = !n.performRawSeries && h.isSeriesFiltered(t.context.model), sc(t, u), d |= t.perform(i)
				})
			}
		}), l.unfinished |= d
	}
	ac.restoreData = function(t, e) {
		t.restoreData(e), this._stageTaskMap.each(function(t) {
			var e = t.overallTask;
			e && e.dirty()
		})
	}, ac.getPerformArgs = function(t, e) {
		if (t.__pipeline) {
			var i = this._pipelineMap.get(t.__pipeline.id),
				n = i.context,
				r = !e && i.progressiveEnabled && (!n || n.progressiveRender) && t.__idxInPipeline > i.blockIndex ? i.step : null,
				a = n && n.modDataCount;
			return {
				step: r,
				modBy: null != a ? Math.ceil(a / r) : null,
				modDataCount: a
			}
		}
	}, ac.getPipeline = function(t) {
		return this._pipelineMap.get(t)
	}, ac.updateStreamModes = function(t, e) {
		var i = this._pipelineMap.get(t.uid),
			n = t.getData().count(),
			r = i.progressiveEnabled && e.incrementalPrepareRender && n >= i.threshold,
			a = t.get("large") && n >= t.get("largeThreshold"),
			o = "mod" === t.get("progressiveChunkMode") ? n : null;
		t.pipelineContext = i.context = {
			progressiveRender: r,
			modDataCount: o,
			large: a
		}
	}, ac.restorePipelines = function(t) {
		var n = this,
			r = n._pipelineMap = Q();
		t.eachSeries(function(t) {
			var e = t.getProgressive(),
				i = t.uid;
			r.set(i, {
				id: i,
				head: null,
				tail: null,
				threshold: t.getProgressiveThreshold(),
				progressiveEnabled: e && !(t.preventIncremental && t.preventIncremental()),
				blockIndex: -1,
				step: Math.round(e || 700),
				count: 0
			}), mc(n, t, t.dataTask)
		})
	}, ac.prepareStageTasks = function() {
		var i = this._stageTaskMap,
			n = this.ecInstance.getModel(),
			r = this.api;
		D(this._allHandlers, function(t) {
			var e = i.get(t.uid) || i.set(t.uid, []);
			t.reset && function(n, r, t, a, o) {
				var s = t.seriesTaskMap || (t.seriesTaskMap = Q()),
					e = r.seriesType,
					i = r.getTargetSeries;
				r.createOnAllSeries ? a.eachRawSeries(l) : e ? a.eachRawSeriesByType(e, l) : i && i(a, o).each(l);

				function l(t) {
					var e = t.uid,
						i = s.get(e) || s.set(e, pu({
							plan: dc,
							reset: fc,
							count: vc
						}));
					i.context = {
						model: t,
						ecModel: a,
						api: o,
						useClearVisual: r.isVisual && !r.isLayout,
						plan: r.plan,
						reset: r.reset,
						scheduler: n
					}, mc(n, t, i)
				}
				var h = n._pipelineMap;
				s.each(function(t, e) {
					h.get(e) || (t.dispose(), s.removeKey(e))
				})
			}(this, t, e, n, r), t.overallReset && function(n, t, e, i, r) {
				var a = e.overallTask = e.overallTask || pu({
					reset: lc
				});
				a.context = {
					ecModel: i,
					api: r,
					overallReset: t.overallReset,
					scheduler: n
				};
				var o = a.agentStubMap = a.agentStubMap || Q(),
					s = t.seriesType,
					l = t.getTargetSeries,
					h = !0,
					u = t.modifyOutputEnd;
				s ? i.eachRawSeriesByType(s, c) : l ? l(i, r).each(c) : (h = !1, D(i.getSeries(), c));

				function c(t) {
					var e = t.uid,
						i = o.get(e);
					i || (i = o.set(e, pu({
						reset: hc,
						onDirty: cc
					})), a.dirty()), i.context = {
						model: t,
						overallProgress: h,
						modifyOutputEnd: u
					}, i.agent = a, i.__block = h, mc(n, t, i)
				}
				var d = n._pipelineMap;
				o.each(function(t, e) {
					d.get(e) || (t.dispose(), a.dirty(), o.removeKey(e))
				})
			}(this, t, e, n, r)
		}, this)
	}, ac.prepareView = function(t, e, i, n) {
		var r = t.renderTask,
			a = r.context;
		a.model = e, a.ecModel = i, a.api = n, r.__block = !t.incrementalPrepareRender, mc(this, e, r)
	}, ac.performDataProcessorTasks = function(t, e) {
		oc(this, this._dataProcessorHandlers, t, e, {
			block: !0
		})
	}, ac.performVisualTasks = function(t, e, i) {
		oc(this, this._visualHandlers, t, e, i)
	}, ac.performSeriesTasks = function(t) {
		var e;
		t.eachSeries(function(t) {
			e |= t.dataTask.perform()
		}), this.unfinished |= e
	}, ac.plan = function() {
		this._pipelineMap.each(function(t) {
			var e = t.tail;
			do {
				if (e.__block) {
					t.blockIndex = e.__idxInPipeline;
					break
				}
				e = e.getUpstream()
			} while (e)
		})
	};
	var sc = ac.updatePayload = function(t, e) {
		"remain" !== e && (t.context.payload = e)
	};

	function lc(t) {
		t.overallReset(t.ecModel, t.api, t.payload)
	}

	function hc(t, e) {
		return t.overallProgress && uc
	}

	function uc() {
		this.agent.dirty(), this.getDownstream().dirty()
	}

	function cc() {
		this.agent && this.agent.dirty()
	}

	function dc(t) {
		return t.plan && t.plan(t.model, t.ecModel, t.api, t.payload)
	}

	function fc(t) {
		t.useClearVisual && t.data.clearAllVisual();
		var e = t.resetDefines = gr(t.reset(t.model, t.ecModel, t.api, t.payload));
		return 1 < e.length ? P(e, function(t, e) {
			return gc(e)
		}) : pc
	}
	var pc = gc(0);

	function gc(a) {
		return function(t, e) {
			var i = e.data,
				n = e.resetDefines[a];
			if (n && n.dataEach)
				for (var r = t.start; r < t.end; r++) n.dataEach(i, r);
			else n && n.progress && n.progress(t, i)
		}
	}

	function vc(t) {
		return t.data.count()
	}

	function mc(t, e, i) {
		var n = e.uid,
			r = t._pipelineMap.get(n);
		r.head || (r.head = i), r.tail && r.tail.pipe(i), (r.tail = i).__idxInPipeline = r.count++, i.__pipeline = r
	}
	rc.wrapStageHandler = function(t, e) {
		return z(t) && (t = {
			overallReset: t,
			seriesType: function(t) {
				yc = null;
				try {
					t(_c, xc)
				} catch (t) {}
				return yc
			}(t)
		}), t.uid = ol("stageHandler"), e && (t.visualType = e), t
	};
	var yc, _c = {},
		xc = {};

	function wc(t, e) {
		for (var i in e.prototype) t[i] = J
	}
	wc(_c, Sh), wc(xc, Ah), _c.eachSeriesByType = _c.eachRawSeriesByType = function(t) {
		yc = t
	}, _c.eachComponent = function(t) {
		"series" === t.mainType && t.subType && (yc = t.subType)
	};

	function bc() {
		return {
			axisLine: {
				lineStyle: {
					color: Ic
				}
			},
			axisTick: {
				lineStyle: {
					color: Ic
				}
			},
			axisLabel: {
				textStyle: {
					color: Ic
				}
			},
			splitLine: {
				lineStyle: {
					type: "dashed",
					color: "#aaa"
				}
			},
			splitArea: {
				areaStyle: {
					color: Ic
				}
			}
		}
	}
	var Sc = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1",
			"#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"
		],
		Mc = {
			color: Sc,
			colorLayer: [
				["#37A2DA", "#ffd85c", "#fd7b5f"],
				["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"],
				["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], Sc
			]
		},
		Ic = "#eee",
		Cc = ["#dd6b66", "#759aa0", "#e69d87", "#8dc1a9", "#ea7e53", "#eedd78", "#73a373", "#73b9bc", "#7289ab", "#91ca8c",
			"#f49f42"
		],
		Ac = {
			color: Cc,
			backgroundColor: "#333",
			tooltip: {
				axisPointer: {
					lineStyle: {
						color: Ic
					},
					crossStyle: {
						color: Ic
					}
				}
			},
			legend: {
				textStyle: {
					color: Ic
				}
			},
			textStyle: {
				color: Ic
			},
			title: {
				textStyle: {
					color: Ic
				}
			},
			toolbox: {
				iconStyle: {
					normal: {
						borderColor: Ic
					}
				}
			},
			dataZoom: {
				textStyle: {
					color: Ic
				}
			},
			visualMap: {
				textStyle: {
					color: Ic
				}
			},
			timeline: {
				lineStyle: {
					color: Ic
				},
				itemStyle: {
					normal: {
						color: Cc[1]
					}
				},
				label: {
					normal: {
						textStyle: {
							color: Ic
						}
					}
				},
				controlStyle: {
					normal: {
						color: Ic,
						borderColor: Ic
					}
				}
			},
			timeAxis: bc(),
			logAxis: bc(),
			valueAxis: bc(),
			categoryAxis: bc(),
			line: {
				symbol: "circle"
			},
			graph: {
				color: Cc
			},
			gauge: {
				title: {
					textStyle: {
						color: Ic
					}
				}
			},
			candlestick: {
				itemStyle: {
					normal: {
						color: "#FD1050",
						color0: "#0CF49B",
						borderColor: "#FD1050",
						borderColor0: "#0CF49B"
					}
				}
			}
		};
	Ac.categoryAxis.splitLine.show = !1, Jl.extend({
		type: "dataset",
		defaultOption: {
			seriesLayoutBy: ph,
			sourceHeader: null,
			dimensions: null,
			source: null
		},
		optionUpdated: function() {
			! function(t) {
				var e = t.option.source,
					i = dh;
				if (B(e)) i = fh;
				else if (O(e)) {
					0 === e.length && (i = hh);
					for (var n = 0, r = e.length; n < r; n++) {
						var a = e[n];
						if (null != a) {
							if (O(a)) {
								i = hh;
								break
							}
							if (N(a)) {
								i = uh;
								break
							}
						}
					}
				} else if (N(e)) {
					for (var o in e)
						if (e.hasOwnProperty(o) && L(e[o])) {
							i = ch;
							break
						}
				} else if (null != e) throw new Error("Invalid data");
				mh(t).sourceFormat = i
			}(this)
		}
	}), Nu.extend({
		type: "dataset"
	});
	var Tc = io.extend({
			type: "ellipse",
			shape: {
				cx: 0,
				cy: 0,
				rx: 0,
				ry: 0
			},
			buildPath: function(t, e) {
				var i = e.cx,
					n = e.cy,
					r = e.rx,
					a = e.ry,
					o = .5522848 * r,
					s = .5522848 * a;
				t.moveTo(i - r, n), t.bezierCurveTo(i - r, n - s, i - o, n - a, i, n - a), t.bezierCurveTo(i + o, n - a, i + r,
					n - s, i + r, n), t.bezierCurveTo(i + r, n + s, i + o, n + a, i, n + a), t.bezierCurveTo(i - o, n + a, i - r,
					n + s, i - r, n), t.closePath()
			}
		}),
		Dc = /[\s,]+/;

	function kc(t) {
		E(t) && (t = (new DOMParser).parseFromString(t, "text/xml"));
		for (9 === t.nodeType && (t = t.firstChild);
			"svg" !== t.nodeName.toLowerCase() || 1 !== t.nodeType;) t = t.nextSibling;
		return t
	}
	var Pc = {
			g: function(t, e) {
				var i = new mi;
				return Oc(e, i), Nc(t, i, this._defs), i
			},
			rect: function(t, e) {
				var i = new No;
				return Oc(e, i), Nc(t, i, this._defs), i.setShape({
					x: parseFloat(t.getAttribute("x") || 0),
					y: parseFloat(t.getAttribute("y") || 0),
					width: parseFloat(t.getAttribute("width") || 0),
					height: parseFloat(t.getAttribute("height") || 0)
				}), i
			},
			circle: function(t, e) {
				var i = new So;
				return Oc(e, i), Nc(t, i, this._defs), i.setShape({
					cx: parseFloat(t.getAttribute("cx") || 0),
					cy: parseFloat(t.getAttribute("cy") || 0),
					r: parseFloat(t.getAttribute("r") || 0)
				}), i
			},
			line: function(t, e) {
				var i = new Bo;
				return Oc(e, i), Nc(t, i, this._defs), i.setShape({
					x1: parseFloat(t.getAttribute("x1") || 0),
					y1: parseFloat(t.getAttribute("y1") || 0),
					x2: parseFloat(t.getAttribute("x2") || 0),
					y2: parseFloat(t.getAttribute("y2") || 0)
				}), i
			},
			ellipse: function(t, e) {
				var i = new Tc;
				return Oc(e, i), Nc(t, i, this._defs), i.setShape({
					cx: parseFloat(t.getAttribute("cx") || 0),
					cy: parseFloat(t.getAttribute("cy") || 0),
					rx: parseFloat(t.getAttribute("rx") || 0),
					ry: parseFloat(t.getAttribute("ry") || 0)
				}), i
			},
			polygon: function(t, e) {
				var i = t.getAttribute("points");
				i = i && zc(i);
				var n = new Do({
					shape: {
						points: i || []
					}
				});
				return Oc(e, n), Nc(t, n, this._defs), n
			},
			polyline: function(t, e) {
				var i = new io;
				Oc(e, i), Nc(t, i, this._defs);
				var n = t.getAttribute("points");
				return n = n && zc(n), new ko({
					shape: {
						points: n || []
					}
				})
			},
			image: function(t, e) {
				var i = new Hn;
				return Oc(e, i), Nc(t, i, this._defs), i.setStyle({
					image: t.getAttribute("xlink:href"),
					x: t.getAttribute("x"),
					y: t.getAttribute("y"),
					width: t.getAttribute("width"),
					height: t.getAttribute("height")
				}), i
			},
			text: function(t, e) {
				var i = t.getAttribute("x") || 0,
					n = t.getAttribute("y") || 0,
					r = t.getAttribute("dx") || 0,
					a = t.getAttribute("dy") || 0;
				this._textX = parseFloat(i) + parseFloat(r), this._textY = parseFloat(n) + parseFloat(a);
				var o = new mi;
				return Oc(e, o), Nc(t, o, this._defs), o
			},
			tspan: function(t, e) {
				var i = t.getAttribute("x"),
					n = t.getAttribute("y");
				null != i && (this._textX = parseFloat(i)), null != n && (this._textY = parseFloat(n));
				var r = t.getAttribute("dx") || 0,
					a = t.getAttribute("dy") || 0,
					o = new mi;
				return Oc(e, o), Nc(t, o, this._defs), this._textX += r, this._textY += a, o
			},
			path: function(t, e) {
				var i = xo(t.getAttribute("d") || "");
				return Oc(e, i), Nc(t, i, this._defs), i
			}
		},
		Lc = {
			lineargradient: function(t) {
				var e = parseInt(t.getAttribute("x1") || 0, 10),
					i = parseInt(t.getAttribute("y1") || 0, 10),
					n = parseInt(t.getAttribute("x2") || 10, 10),
					r = parseInt(t.getAttribute("y2") || 0, 10),
					a = new Uo(e, i, n, r);
				return function(t, e) {
					var i = t.firstChild;
					for (; i;) {
						if (1 === i.nodeType) {
							var n = i.getAttribute("offset");
							n = 0 < n.indexOf("%") ? parseInt(n, 10) / 100 : n ? parseFloat(n) : 0;
							var r = i.getAttribute("stop-color") || "#000000";
							e.addColorStop(n, r)
						}
						i = i.nextSibling
					}
				}(t, a), a
			},
			radialgradient: function(t) {}
		};

	function Oc(t, e) {
		t && t.__inheritedStyle && (e.__inheritedStyle || (e.__inheritedStyle = {}), T(e.__inheritedStyle, t.__inheritedStyle))
	}

	function zc(t) {
		for (var e = Y(t).split(Dc), i = [], n = 0; n < e.length; n += 2) {
			var r = parseFloat(e[n]),
				a = parseFloat(e[n + 1]);
			i.push([r, a])
		}
		return i
	}
	var Ec = {
		fill: "fill",
		stroke: "stroke",
		"stroke-width": "lineWidth",
		opacity: "opacity",
		"fill-opacity": "fillOpacity",
		"stroke-opacity": "strokeOpacity",
		"stroke-dasharray": "lineDash",
		"stroke-dashoffset": "lineDashOffset",
		"stroke-linecap": "lineCap",
		"stroke-linejoin": "lineJoin",
		"stroke-miterlimit": "miterLimit",
		"font-family": "fontFamily",
		"font-size": "fontSize",
		"font-style": "fontStyle",
		"font-weight": "fontWeight",
		"text-align": "textAlign",
		"alignment-baseline": "textBaseline"
	};

	function Nc(t, e, i, n) {
		var r = e.__inheritedStyle || {},
			a = "text" === e.type;
		if (1 === t.nodeType && (function(t, e) {
				var i = t.getAttribute("transform");
				if (i) {
					i = i.replace(/,/g, " ");
					var n = null,
						r = [];
					i.replace(Vc, function(t, e, i) {
						r.push(e, i)
					});
					for (var a = r.length - 1; 0 < a; a -= 2) {
						var o = r[a],
							s = r[a - 1];
						switch (n = n || qt(), s) {
							case "translate":
								o = Y(o).split(Dc), Jt(n, n, [parseFloat(o[0]), parseFloat(o[1] || 0)]);
								break;
							case "scale":
								o = Y(o).split(Dc), ee(n, n, [parseFloat(o[0]), parseFloat(o[1] || o[0])]);
								break;
							case "rotate":
								o = Y(o).split(Dc), te(n, n, parseFloat(o[0]));
								break;
							case "skew":
								o = Y(o).split(Dc), console.warn("Skew transform is not supported yet");
								break;
							case "matrix":
								o = Y(o).split(Dc);
								n[0] = parseFloat(o[0]), n[1] = parseFloat(o[1]), n[2] = parseFloat(o[2]), n[3] = parseFloat(o[3]), n[4] =
									parseFloat(o[4]), n[5] = parseFloat(o[5])
						}
					}
					e.setLocalTransform(n)
				}
			}(t, e), k(r, function(t) {
				var e = t.getAttribute("style"),
					i = {};
				if (!e) return i;
				var n, r = {};
				Fc.lastIndex = 0;
				for (; null != (n = Fc.exec(e));) r[n[1]] = n[2];
				for (var a in Ec) Ec.hasOwnProperty(a) && null != r[a] && (i[Ec[a]] = r[a]);
				return i
			}(t)), !n))
			for (var o in Ec)
				if (Ec.hasOwnProperty(o)) {
					var s = t.getAttribute(o);
					null != s && (r[Ec[o]] = s)
				} var l = a ? "textFill" : "fill",
			h = a ? "textStroke" : "stroke";
		e.style = e.style || new Oi;
		var u = e.style;
		null != r.fill && u.set(l, Bc(r.fill, i)), null != r.stroke && u.set(h, Bc(r.stroke, i)), D(["lineWidth", "opacity",
				"fillOpacity", "strokeOpacity", "miterLimit", "fontSize"
			], function(t) {
				var e = "lineWidth" === t && a ? "textStrokeWidth" : t;
				null != r[t] && u.set(e, parseFloat(r[t]))
			}), r.textBaseline && "auto" !== r.textBaseline || (r.textBaseline = "alphabetic"), "alphabetic" === r.textBaseline &&
			(r.textBaseline = "bottom"), "start" === r.textAlign && (r.textAlign = "left"), "end" === r.textAlign && (r.textAlign =
				"right"), D(["lineDashOffset", "lineCap", "lineJoin", "fontWeight", "fontFamily", "fontStyle", "textAlign",
				"textBaseline"
			], function(t) {
				null != r[t] && u.set(t, r[t])
			}), r.lineDash && (e.style.lineDash = Y(r.lineDash).split(Dc)), u[h] && "none" !== u[h] && (e[h] = !0), e.__inheritedStyle =
			r
	}
	var Rc = /url\(\s*#(.*?)\)/;

	function Bc(t, e) {
		var i = e && t && t.match(Rc);
		return i ? e[Y(i[1])] : t
	}
	var Vc = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g;
	var Fc = /([^\s:;]+)\s*:\s*([^:;]+)/g;
	var Hc = Q(),
		Gc = function(t, e, i) {
			var n;
			return D(n = O(e) ? e : e.svg ? [{
				type: "svg",
				source: e.svg,
				specialAreas: e.specialAreas
			}] : (e.geoJson && !e.features && (i = e.specialAreas, e = e.geoJson), [{
				type: "geoJSON",
				source: e,
				specialAreas: i
			}]), function(t) {
				var e = t.type;
				"geoJson" === e && (e = t.type = "geoJSON"), (0, Zc[e])(t)
			}), Hc.set(t, n)
		},
		Wc = function(t) {
			return Hc.get(t)
		},
		Zc = {
			geoJSON: function(t) {
				var e = t.source;
				t.geoJSON = E(e) ? "undefined" != typeof JSON && JSON.parse ? JSON.parse(e) : new Function("return (" + e + ");")
					() : e
			},
			svg: function(t) {
				t.svgXML = kc(t.source)
			}
		},
		Uc = X,
		Xc = D,
		Yc = z,
		jc = N,
		qc = Jl.parseClassType,
		$c = {
			PROCESSOR: {
				FILTER: 1e3,
				SERIES_FILTER: 800,
				STATISTIC: 5e3
			},
			VISUAL: {
				LAYOUT: 1e3,
				PROGRESSIVE_LAYOUT: 1100,
				GLOBAL: 2e3,
				CHART: 3e3,
				POST_CHART_LAYOUT: 3500,
				COMPONENT: 4e3,
				BRUSH: 5e3
			}
		},
		Kc = "__flagInMainProcess",
		Qc = "__optionUpdated",
		Jc = /^[a-zA-Z0-9_]+$/;

	function td(n, r) {
		return function(t, e, i) {
			!r && this._disposed || (t = t && t.toLowerCase(), It.prototype[n].call(this, t, e, i))
		}
	}

	function ed() {
		It.call(this)
	}

	function id(t, e, i) {
		i = i || {}, "string" == typeof e && (e = Cd[e]), this.id, this.group, this._dom = t;
		var n = this._zr = sr(t, {
			renderer: i.renderer || "canvas",
			devicePixelRatio: i.devicePixelRatio,
			width: i.width,
			height: i.height
		});
		this._throttledZrFlush = Ku(C(n.flush, n), 17), (e = b(e)) && Kh(e, !0), this._theme = e, this._chartsViews = [],
			this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, this._coordSysMgr = new Dh;
		var r = this._api = function(i) {
			var t = i._coordSysMgr;
			return k(new Ah(i), {
				getCoordinateSystems: C(t.getCoordinateSystems, t),
				getComponentByElement: function(t) {
					for (; t;) {
						var e = t.__ecComponentInfo;
						if (null != e) return i._model.getComponent(e.mainType, e.index);
						t = t.parent
					}
				}
			})
		}(this);

		function a(t, e) {
			return t.__prio - e.__prio
		}
		Ii(Id, a), Ii(bd, a), this._scheduler = new rc(this, r, bd, Id), It.call(this, this._ecEventProcessor = new _d),
			this._messageCenter = new ed, this._initEvents(), this.resize = C(this.resize, this), this._pendingActions = [], n.animation
			.on("frame", this._onframe, this),
			function(t, e) {
				t.on("rendered", function() {
					e.trigger("rendered"), !t.animation.isFinished() || e[Qc] || e._scheduler.unfinished || e._pendingActions.length ||
						e.trigger("finished")
				})
			}(n, this), q(this)
	}
	ed.prototype.on = td("on", !0), ed.prototype.off = td("off", !0), ed.prototype.one = td("one", !0), S(ed, It);
	var nd = id.prototype;

	function rd(t, e, i) {
		if (!this._disposed) {
			var n, r = this._model,
				a = this._coordSysMgr.getCoordinateSystems();
			e = Cr(r, e);
			for (var o = 0; o < a.length; o++) {
				var s = a[o];
				if (s[t] && null != (n = s[t](r, e, i))) return n
			}
		}
	}
	nd._onframe = function() {
			if (!this._disposed) {
				var t = this._scheduler;
				if (this[Qc]) {
					var e = this[Qc].silent;
					this[Kc] = !0, od(this), ad.update.call(this), this[Kc] = !1, this[Qc] = !1, ud.call(this, e), cd.call(this, e)
				} else if (t.unfinished) {
					var i = 1,
						n = this._model,
						r = this._api;
					t.unfinished = !1;
					do {
						var a = +new Date;
						t.performSeriesTasks(n), t.performDataProcessorTasks(n), ld(this, n), t.performVisualTasks(n), gd(this, this._model,
							r, "remain"), i -= +new Date - a
					} while (0 < i && t.unfinished);
					t.unfinished || this._zr.flush()
				}
			}
		}, nd.getDom = function() {
			return this._dom
		}, nd.getZr = function() {
			return this._zr
		}, nd.setOption = function(t, e, i) {
			if (!this._disposed) {
				var n;
				if (jc(e) && (i = e.lazyUpdate, n = e.silent, e = e.notMerge), this[Kc] = !0, !this._model || e) {
					var r = new Eh(this._api),
						a = this._theme,
						o = this._model = new Sh;
					o.scheduler = this._scheduler, o.init(null, null, a, r)
				}
				this._model.setOption(t, Sd), i ? (this[Qc] = {
					silent: n
				}, this[Kc] = !1) : (od(this), ad.update.call(this), this._zr.flush(), this[Qc] = !1, this[Kc] = !1, ud.call(this,
					n), cd.call(this, n))
			}
		}, nd.setTheme = function() {
			console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0")
		}, nd.getModel = function() {
			return this._model
		}, nd.getOption = function() {
			return this._model && this._model.getOption()
		}, nd.getWidth = function() {
			return this._zr.getWidth()
		}, nd.getHeight = function() {
			return this._zr.getHeight()
		}, nd.getDevicePixelRatio = function() {
			return this._zr.painter.dpr || window.devicePixelRatio || 1
		}, nd.getRenderedCanvas = function(t) {
			if (m.canvasSupported) return (t = t || {}).pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor ||
				this._model.get("backgroundColor"), this._zr.painter.getRenderedCanvas(t)
		}, nd.getSvgDataUrl = function() {
			if (m.svgSupported) {
				var t = this._zr;
				return D(t.storage.getDisplayList(), function(t) {
					t.stopAnimation(!0)
				}), t.painter.pathToDataUrl()
			}
		}, nd.getDataURL = function(t) {
			if (!this._disposed) {
				var e = (t = t || {}).excludeComponents,
					i = this._model,
					n = [],
					r = this;
				Xc(e, function(t) {
					i.eachComponent({
						mainType: t
					}, function(t) {
						var e = r._componentsMap[t.__viewId];
						e.group.ignore || (n.push(e), e.group.ignore = !0)
					})
				});
				var a = "svg" === this._zr.painter.getType() ? this.getSvgDataUrl() : this.getRenderedCanvas(t).toDataURL("image/" +
					(t && t.type || "png"));
				return Xc(n, function(t) {
					t.group.ignore = !1
				}), a
			}
		}, nd.getConnectedDataURL = function(r) {
			if (!this._disposed && m.canvasSupported) {
				var a = this.group,
					o = Math.min,
					s = Math.max;
				if (Dd[a]) {
					var l = 1 / 0,
						h = 1 / 0,
						u = -1 / 0,
						c = -1 / 0,
						d = [],
						i = r && r.pixelRatio || 1;
					D(Td, function(t, e) {
						if (t.group === a) {
							var i = t.getRenderedCanvas(b(r)),
								n = t.getDom().getBoundingClientRect();
							l = o(n.left, l), h = o(n.top, h), u = s(n.right, u), c = s(n.bottom, c), d.push({
								dom: i,
								left: n.left,
								top: n.top
							})
						}
					});
					var t = (u *= i) - (l *= i),
						e = (c *= i) - (h *= i),
						n = g();
					n.width = t, n.height = e;
					var f = sr(n);
					return r.connectedBackgroundColor && f.add(new No({
						shape: {
							x: 0,
							y: 0,
							width: t,
							height: e
						},
						style: {
							fill: r.connectedBackgroundColor
						}
					})), Xc(d, function(t) {
						var e = new Hn({
							style: {
								x: t.left * i - l,
								y: t.top * i - h,
								image: t.dom
							}
						});
						f.add(e)
					}), f.refreshImmediately(), n.toDataURL("image/" + (r && r.type || "png"))
				}
				return this.getDataURL(r)
			}
		}, nd.convertToPixel = A(rd, "convertToPixel"), nd.convertFromPixel = A(rd, "convertFromPixel"), nd.containPixel =
		function(t, r) {
			var a;
			if (!this._disposed) return D(t = Cr(this._model, t), function(t, n) {
				0 <= n.indexOf("Models") && D(t, function(t) {
					var e = t.coordinateSystem;
					if (e && e.containPoint) a |= !!e.containPoint(r);
					else if ("seriesModels" === n) {
						var i = this._chartsMap[t.__viewId];
						i && i.containPoint && (a |= i.containPoint(r, t))
					}
				}, this)
			}, this), !!a
		}, nd.getVisual = function(t, e) {
			var i = (t = Cr(this._model, t, {
					defaultMainType: "series"
				})).seriesModel.getData(),
				n = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? i.indexOfRawIndex(t.dataIndex) :
				null;
			return null != n ? i.getItemVisual(n, e) : i.getVisual(e)
		}, nd.getViewOfComponentModel = function(t) {
			return this._componentsMap[t.__viewId]
		}, nd.getViewOfSeriesModel = function(t) {
			return this._chartsMap[t.__viewId]
		};
	var ad = {
		prepareAndUpdate: function(t) {
			od(this), ad.update.call(this, t)
		},
		update: function(t) {
			var e = this._model,
				i = this._api,
				n = this._zr,
				r = this._coordSysMgr,
				a = this._scheduler;
			if (e) {
				a.restoreData(e, t), a.performSeriesTasks(e), r.create(e, i), a.performDataProcessorTasks(e, t), ld(this, e), r.update(
					e, i), fd(e), a.performVisualTasks(e, t), pd(this, e, i, t);
				var o = e.get("backgroundColor") || "transparent";
				if (m.canvasSupported) n.setBackgroundColor(o);
				else {
					var s = ke(o);
					o = Ve(s, "rgb"), 0 === s[3] && (o = "transparent")
				}
				vd(e, i)
			}
		},
		updateTransform: function(r) {
			var a = this._model,
				o = this,
				s = this._api;
			if (a) {
				var l = [];
				a.eachComponent(function(t, e) {
					var i = o.getViewOfComponentModel(e);
					if (i && i.__alive)
						if (i.updateTransform) {
							var n = i.updateTransform(e, a, s, r);
							n && n.update && l.push(i)
						} else l.push(i)
				});
				var n = Q();
				a.eachSeries(function(t) {
					var e = o._chartsMap[t.__viewId];
					if (e.updateTransform) {
						var i = e.updateTransform(t, a, s, r);
						i && i.update && n.set(t.uid, 1)
					} else n.set(t.uid, 1)
				}), fd(a), this._scheduler.performVisualTasks(a, r, {
					setDirty: !0,
					dirtyMap: n
				}), gd(o, a, s, r, n), vd(a, this._api)
			}
		},
		updateView: function(t) {
			var e = this._model;
			e && (Hu.markUpdateMethod(t, "updateView"), fd(e), this._scheduler.performVisualTasks(e, t, {
				setDirty: !0
			}), pd(this, this._model, this._api, t), vd(e, this._api))
		},
		updateVisual: function(t) {
			ad.update.call(this, t)
		},
		updateLayout: function(t) {
			ad.update.call(this, t)
		}
	};

	function od(t) {
		var e = t._model,
			i = t._scheduler;
		i.restorePipelines(e), i.prepareStageTasks(), dd(t, "component", e, i), dd(t, "chart", e, i), i.plan()
	}

	function sd(e, i, n, r, t) {
		var a = e._model;
		if (r) {
			var o = {};
			o[r + "Id"] = n[r + "Id"], o[r + "Index"] = n[r + "Index"], o[r + "Name"] = n[r + "Name"];
			var s = {
				mainType: r,
				query: o
			};
			t && (s.subType = t);
			var l = n.excludeSeriesId;
			null != l && (l = Q(gr(l))), a && a.eachComponent(s, function(t) {
				l && null != l.get(t.id) || h(e["series" === r ? "_chartsMap" : "_componentsMap"][t.__viewId])
			}, e)
		} else Xc(e._componentsViews.concat(e._chartsViews), h);

		function h(t) {
			t && t.__alive && t[i] && t[i](t.__model, a, e._api, n)
		}
	}

	function ld(t, e) {
		var i = t._chartsMap,
			n = t._scheduler;
		e.eachSeries(function(t) {
			n.updateStreamModes(t, i[t.__viewId])
		})
	}

	function hd(e, t) {
		var i = e.type,
			n = e.escapeConnect,
			r = xd[i],
			a = r.actionInfo,
			o = (a.update || "update").split(":"),
			s = o.pop();
		o = null != o[0] && qc(o[0]), this[Kc] = !0;
		var l = [e],
			h = !1;
		e.batch && (h = !0, l = P(e.batch, function(t) {
			return (t = T(k({}, t), e)).batch = null, t
		}));
		var u, c = [],
			d = "highlight" === i || "downplay" === i;
		Xc(l, function(t) {
			(u = (u = r.action(t, this._model, this._api)) || k({}, t)).type = a.event || u.type, c.push(u), d ? sd(this, s,
				t, "series") : o && sd(this, s, t, o.main, o.sub)
		}, this), "none" === s || d || o || (this[Qc] ? (od(this), ad.update.call(this, e), this[Qc] = !1) : ad[s].call(
			this, e)), u = h ? {
			type: a.event || i,
			escapeConnect: n,
			batch: c
		} : c[0], this[Kc] = !1, t || this._messageCenter.trigger(u.type, u)
	}

	function ud(t) {
		for (var e = this._pendingActions; e.length;) {
			var i = e.shift();
			hd.call(this, i, t)
		}
	}

	function cd(t) {
		t || this.trigger("updated")
	}

	function dd(t, e, r, a) {
		for (var o = "component" === e, s = o ? t._componentsViews : t._chartsViews, l = o ? t._componentsMap : t._chartsMap,
				h = t._zr, u = t._api, i = 0; i < s.length; i++) s[i].__alive = !1;

		function n(t) {
			var e = "_ec_" + t.id + "_" + t.type,
				i = l[e];
			if (!i) {
				var n = qc(t.type);
				(i = new(o ? Nu.getClass(n.main, n.sub) : Hu.getClass(n.sub))).init(r, u), l[e] = i, s.push(i), h.add(i.group)
			}
			t.__viewId = i.__id = e, i.__alive = !0, i.__model = t, i.group.__ecComponentInfo = {
				mainType: t.mainType,
				index: t.componentIndex
			}, o || a.prepareView(i, t, r, u)
		}
		o ? r.eachComponent(function(t, e) {
			"series" !== t && n(e)
		}) : r.eachSeries(n);
		for (i = 0; i < s.length;) {
			var c = s[i];
			c.__alive ? i++ : (o || c.renderTask.dispose(), h.remove(c.group), c.dispose(r, u), s.splice(i, 1), delete l[c.__id],
				c.__id = c.group.__ecComponentInfo = null)
		}
	}

	function fd(t) {
		t.clearColorPalette(), t.eachSeries(function(t) {
			t.clearColorPalette()
		})
	}

	function pd(t, e, i, n) {
		! function(t, i, n, r, e) {
			Xc(e || t._componentsViews, function(t) {
				var e = t.__model;
				t.render(e, i, n, r), yd(e, t)
			})
		}(t, e, i, n), Xc(t._chartsViews, function(t) {
			t.__alive = !1
		}), gd(t, e, i, n), Xc(t._chartsViews, function(t) {
			t.__alive || t.remove(e, i)
		})
	}

	function gd(n, t, e, r, a) {
		var o, s = n._scheduler;
		t.eachSeries(function(t) {
				var e = n._chartsMap[t.__viewId];
				e.__alive = !0;
				var i = e.renderTask;
				s.updatePayload(i, r), a && a.get(t.uid) && i.dirty(), o |= i.perform(s.getPerformArgs(i)), e.group.silent = !!t.get(
						"silent"), yd(t, e),
					function(t, e) {
						var i = t.get("blendMode") || null;
						e.group.traverse(function(t) {
							t.isGroup || t.style.blend !== i && t.setStyle("blend", i), t.eachPendingDisplayable && t.eachPendingDisplayable(
								function(t) {
									t.setStyle("blend", i)
								})
						})
					}(t, e)
			}), s.unfinished |= o,
			function(i, t) {
				var e = i._zr.storage,
					n = 0;
				e.traverse(function(t) {
					n++
				}), n > t.get("hoverLayerThreshold") && !m.node && t.eachSeries(function(t) {
					if (!t.preventUsingHoverLayer) {
						var e = i._chartsMap[t.__viewId];
						e.__alive && e.group.traverse(function(t) {
							t.useHoverLayer = !0
						})
					}
				})
			}(n, t), ic(n._zr.dom, t)
	}

	function vd(e, i) {
		Xc(Md, function(t) {
			t(e, i)
		})
	}
	nd.resize = function(t) {
		if (!this._disposed) {
			this._zr.resize(t);
			var e = this._model;
			if (this._loadingFX && this._loadingFX.resize(), e) {
				var i = e.resetOption("media"),
					n = t && t.silent;
				this[Kc] = !0, i && od(this), ad.update.call(this), this[Kc] = !1, ud.call(this, n), cd.call(this, n)
			}
		}
	}, nd.showLoading = function(t, e) {
		if (!this._disposed && (jc(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), Ad[t])) {
			var i = Ad[t](this._api, e),
				n = this._zr;
			this._loadingFX = i, n.add(i)
		}
	}, nd.hideLoading = function() {
		this._disposed || (this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null)
	}, nd.makeActionFromEvent = function(t) {
		var e = k({}, t);
		return e.type = wd[t.type], e
	}, nd.dispatchAction = function(t, e) {
		this._disposed || (jc(e) || (e = {
			silent: !!e
		}), xd[t.type] && this._model && (this[Kc] ? this._pendingActions.push(t) : (hd.call(this, t, e.silent), e.flush ?
			this._zr.flush(!0) : !1 !== e.flush && m.browser.weChat && this._throttledZrFlush(), ud.call(this, e.silent),
			cd.call(this, e.silent))))
	}, nd.appendData = function(t) {
		if (!this._disposed) {
			var e = t.seriesIndex;
			this.getModel().getSeriesByIndex(e).appendData(t), this._scheduler.unfinished = !0
		}
	}, nd.on = td("on", !1), nd.off = td("off", !1), nd.one = td("one", !1);
	var md = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout",
		"contextmenu"
	];

	function yd(t, e) {
		var i = t.get("z"),
			n = t.get("zlevel");
		e.group.traverse(function(t) {
			"group" !== t.type && (null != i && (t.z = i), null != n && (t.zlevel = n))
		})
	}

	function _d() {
		this.eventInfo
	}
	nd._initEvents = function() {
		Xc(md, function(h) {
			function t(t) {
				var e, i = this.getModel(),
					n = t.target;
				if ("globalout" === h) e = {};
				else if (n && null != n.dataIndex) {
					var r = n.dataModel || i.getSeriesByIndex(n.seriesIndex);
					e = r && r.getDataParams(n.dataIndex, n.dataType, n) || {}
				} else n && n.eventData && (e = k({}, n.eventData));
				if (e) {
					var a = e.componentType,
						o = e.componentIndex;
					"markLine" !== a && "markPoint" !== a && "markArea" !== a || (a = "series", o = e.seriesIndex);
					var s = a && null != o && i.getComponent(a, o),
						l = s && this["series" === s.mainType ? "_chartsMap" : "_componentsMap"][s.__viewId];
					e.event = t, e.type = h, this._ecEventProcessor.eventInfo = {
						targetEl: n,
						packedEvent: e,
						model: s,
						view: l
					}, this.trigger(h, e)
				}
			}
			t.zrEventfulCallAtLast = !0, this._zr.on(h, t, this)
		}, this), Xc(wd, function(t, e) {
			this._messageCenter.on(e, function(t) {
				this.trigger(e, t)
			}, this)
		}, this)
	}, nd.isDisposed = function() {
		return this._disposed
	}, nd.clear = function() {
		this._disposed || this.setOption({
			series: []
		}, !0)
	}, nd.dispose = function() {
		if (!this._disposed) {
			this._disposed = !0, Tr(this.getDom(), Ld, "");
			var e = this._api,
				i = this._model;
			Xc(this._componentsViews, function(t) {
				t.dispose(i, e)
			}), Xc(this._chartsViews, function(t) {
				t.dispose(i, e)
			}), this._zr.dispose(), delete Td[this.id]
		}
	}, S(id, It), _d.prototype = {
		constructor: _d,
		normalizeQuery: function(t) {
			var s = {},
				l = {},
				h = {};
			if (E(t)) {
				var e = qc(t);
				s.mainType = e.main || null, s.subType = e.sub || null
			} else {
				var u = ["Index", "Name", "Id"],
					c = {
						name: 1,
						dataIndex: 1,
						dataType: 1
					};
				D(t, function(t, e) {
					for (var i = !1, n = 0; n < u.length; n++) {
						var r = u[n],
							a = e.lastIndexOf(r);
						if (0 < a && a === e.length - r.length) {
							var o = e.slice(0, a);
							"data" !== o && (s.mainType = o, s[r.toLowerCase()] = t, i = !0)
						}
					}
					c.hasOwnProperty(e) && (l[e] = t, i = !0), i || (h[e] = t)
				})
			}
			return {
				cptQuery: s,
				dataQuery: l,
				otherQuery: h
			}
		},
		filter: function(t, e, i) {
			var n = this.eventInfo;
			if (!n) return !0;
			var r = n.targetEl,
				a = n.packedEvent,
				o = n.model,
				s = n.view;
			if (!o || !s) return !0;
			var l = e.cptQuery,
				h = e.dataQuery;
			return u(l, o, "mainType") && u(l, o, "subType") && u(l, o, "index", "componentIndex") && u(l, o, "name") && u(l,
				o, "id") && u(h, a, "name") && u(h, a, "dataIndex") && u(h, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(
				t, e.otherQuery, r, a));

			function u(t, e, i, n) {
				return null == t[i] || e[n || i] === t[i]
			}
		},
		afterTrigger: function() {
			this.eventInfo = null
		}
	};
	var xd = {},
		wd = {},
		bd = [],
		Sd = [],
		Md = [],
		Id = [],
		Cd = {},
		Ad = {},
		Td = {},
		Dd = {},
		kd = new Date - 0,
		Pd = new Date - 0,
		Ld = "_echarts_instance_";

	function Od(t) {
		Dd[t] = !1
	}
	var zd = Od;

	function Ed(t) {
		return Td[function(t, e) {
			return t.getAttribute ? t.getAttribute(e) : t[e]
		}(t, Ld)]
	}

	function Nd(t, e) {
		Cd[t] = e
	}

	function Rd(t) {
		Sd.push(t)
	}

	function Bd(t, e) {
		Gd(bd, t, e, 1e3)
	}

	function Vd(t, e, i) {
		"function" == typeof e && (i = e, e = "");
		var n = jc(t) ? t.type : [t, t = {
			event: e
		}][0];
		t.event = (t.event || n).toLowerCase(), e = t.event, Uc(Jc.test(n) && Jc.test(e)), xd[n] || (xd[n] = {
			action: i,
			actionInfo: t
		}), wd[e] = n
	}

	function Fd(t, e) {
		Gd(Id, t, e, 1e3, "layout")
	}

	function Hd(t, e) {
		Gd(Id, t, e, 3e3, "visual")
	}

	function Gd(t, e, i, n, r) {
		(Yc(e) || jc(e)) && (i = e, e = n);
		var a = rc.wrapStageHandler(i, r);
		return a.__prio = e, a.__raw = i, t.push(a), a
	}

	function Wd(t, e) {
		Ad[t] = e
	}

	function Zd(t) {
		return Jl.extend(t)
	}

	function Ud(t) {
		return Nu.extend(t)
	}

	function Xd(t) {
		return Tu.extend(t)
	}

	function Yd(t) {
		return Hu.extend(t)
	}
	Hd(2e3, tc), Rd(Kh), Bd(900, function(t) {
		var a = Q();
		t.eachSeries(function(t) {
			var e = t.get("stack");
			if (e) {
				var i = a.get(e) || a.set(e, []),
					n = t.getData(),
					r = {
						stackResultDimension: n.getCalculationInfo("stackResultDimension"),
						stackedOverDimension: n.getCalculationInfo("stackedOverDimension"),
						stackedDimension: n.getCalculationInfo("stackedDimension"),
						stackedByDimension: n.getCalculationInfo("stackedByDimension"),
						isStackedByIndex: n.getCalculationInfo("isStackedByIndex"),
						data: n,
						seriesModel: t
					};
				if (!r.stackedDimension || !r.isStackedByIndex && !r.stackedByDimension) return;
				i.length && n.setCalculationInfo("stackedOnSeries", i[i.length - 1].seriesModel), i.push(r)
			}
		}), a.each(Qh)
	}), Wd("default", function(n, t) {
		T(t = t || {}, {
			text: "loading",
			color: "#c23531",
			textColor: "#000",
			maskColor: "rgba(255, 255, 255, 0.8)",
			zlevel: 0
		});
		var r = new No({
				style: {
					fill: t.maskColor
				},
				zlevel: t.zlevel,
				z: 1e4
			}),
			a = new Wo({
				shape: {
					startAngle: -nc / 2,
					endAngle: -nc / 2 + .1,
					r: 10
				},
				style: {
					stroke: t.color,
					lineCap: "round",
					lineWidth: 5
				},
				zlevel: t.zlevel,
				z: 10001
			}),
			o = new No({
				style: {
					fill: "none",
					text: t.text,
					textPosition: "right",
					textDistance: 10,
					textFill: t.textColor
				},
				zlevel: t.zlevel,
				z: 10001
			});
		a.animateShape(!0).when(1e3, {
			endAngle: 3 * nc / 2
		}).start("circularInOut"), a.animateShape(!0).when(1e3, {
			startAngle: 3 * nc / 2
		}).delay(300).start("circularInOut");
		var e = new mi;
		return e.add(a), e.add(o), e.add(r), e.resize = function() {
			var t = n.getWidth() / 2,
				e = n.getHeight() / 2;
			a.setShape({
				cx: t,
				cy: e
			});
			var i = a.shape.r;
			o.setShape({
				x: t - i,
				y: e - i,
				width: 2 * i,
				height: 2 * i
			}), r.setShape({
				x: 0,
				y: 0,
				width: n.getWidth(),
				height: n.getHeight()
			})
		}, e.resize(), e
	}), Vd({
		type: "highlight",
		event: "highlight",
		update: "highlight"
	}, J), Vd({
		type: "downplay",
		event: "downplay",
		update: "downplay"
	}, J), Nd("light", Mc), Nd("dark", Ac);

	function jd(t) {
		return t
	}

	function qd(t, e, i, n, r) {
		this._old = t, this._new = e, this._oldKeyGetter = i || jd, this._newKeyGetter = n || jd, this.context = r
	}

	function $d(t, e, i, n, r) {
		for (var a = 0; a < t.length; a++) {
			var o = "_ec_" + r[n](t[a], a),
				s = e[o];
			null == s ? (i.push(o), e[o] = a) : (s.length || (e[o] = s = [s]), s.push(a))
		}
	}
	qd.prototype = {
		constructor: qd,
		add: function(t) {
			return this._add = t, this
		},
		update: function(t) {
			return this._update = t, this
		},
		remove: function(t) {
			return this._remove = t, this
		},
		execute: function() {
			var t = this._old,
				e = this._new,
				i = {},
				n = [],
				r = [];
			for ($d(t, {}, n, "_oldKeyGetter", this), $d(e, i, r, "_newKeyGetter", this), a = 0; a < t.length; a++) {
				if (null != (s = i[o = n[a]]))(h = s.length) ? (1 === h && (i[o] = null), s = s.shift()) : i[o] = null, this._update &&
					this._update(s, a);
				else this._remove && this._remove(a)
			}
			for (var a = 0; a < r.length; a++) {
				var o = r[a];
				if (i.hasOwnProperty(o)) {
					var s;
					if (null == (s = i[o])) continue;
					if (s.length)
						for (var l = 0, h = s.length; l < h; l++) this._add && this._add(s[l]);
					else this._add && this._add(s)
				}
			}
		}
	};
	var Kd = Q(["tooltip", "label", "itemName", "itemId", "seriesName"]);

	function Qd(t, e) {
		return t.hasOwnProperty(e) || (t[e] = []), t[e]
	}
	var Jd = N,
		tf = "undefined",
		ef = {
			float: typeof Float64Array == tf ? Array : Float64Array,
			int: typeof Int32Array == tf ? Array : Int32Array,
			ordinal: Array,
			number: Array,
			time: Array
		},
		nf = typeof Uint32Array == tf ? Array : Uint32Array,
		rf = typeof Int32Array == tf ? Array : Int32Array,
		af = typeof Uint16Array == tf ? Array : Uint16Array;

	function of (t) {
		return 65535 < t._rawCount ? nf : af
	}
	var sf = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_rawData", "_chunkSize", "_chunkCount",
			"_dimValueGetter", "_count", "_rawCount", "_nameDimIdx", "_idDimIdx"
		],
		lf = ["_extent", "_approximateExtent", "_rawExtent"];

	function hf(e, i) {
		D(sf.concat(i.__wrappedMethods || []), function(t) {
			i.hasOwnProperty(t) && (e[t] = i[t])
		}), e.__wrappedMethods = i.__wrappedMethods, D(lf, function(t) {
			e[t] = b(i[t])
		}), e._calculationInfo = k(i._calculationInfo)
	}
	var uf = function(t, e) {
			t = t || ["x", "y"];
			for (var i = {}, n = [], r = {}, a = 0; a < t.length; a++) {
				var o = t[a];
				E(o) && (o = {
					name: o
				});
				var s = o.name;
				o.type = o.type || "float", o.coordDim || (o.coordDim = s, o.coordDimIndex = 0), o.otherDims = o.otherDims || {},
					n.push(s), (i[s] = o).index = a, o.createInvertedIndices && (r[s] = [])
			}
			this.dimensions = n, this._dimensionInfos = i, this.hostModel = e, this.dataType, this._indices = null, this._count =
				0, this._rawCount = 0, this._storage = {}, this._nameList = [], this._idList = [], this._optionModels = [], this._visual = {},
				this._layout = {}, this._itemVisuals = [], this.hasItemVisual = {}, this._itemLayouts = [], this._graphicEls = [],
				this._chunkSize = 1e5, this._chunkCount = 0, this._rawData, this._rawExtent = {}, this._extent = {}, this._approximateExtent = {},
				this._dimensionsSummary = function(n) {
					var t = {},
						a = t.encode = {},
						o = Q(),
						s = [],
						l = [],
						h = t.userOutput = {
							dimensionNames: n.dimensions.slice(),
							encode: {}
						};
					D(n.dimensions, function(t) {
						var r = n.getDimensionInfo(t),
							e = r.coordDim;
						if (e) {
							var i = r.coordDimIndex;
							Qd(a, e)[i] = t, r.isExtraCoord || (o.set(e, 1), function(t) {
								return !("ordinal" === t || "time" === t)
							}(r.type) && (s[0] = t), Qd(h.encode, e)[i] = r.index), r.defaultTooltip && l.push(t)
						}
						Kd.each(function(t, e) {
							var i = Qd(a, e),
								n = r.otherDims[e];
							null != n && !1 !== n && (i[n] = r.name)
						})
					});
					var r = [],
						u = {};
					o.each(function(t, e) {
						var i = a[e];
						u[e] = i[0], r = r.concat(i)
					}), t.dataDimsOnCoord = r, t.encodeFirstDimNotExtra = u;
					var e = a.label;
					e && e.length && (s = e.slice());
					var i = a.tooltip;
					return i && i.length ? l = i.slice() : l.length || (l = s.slice()), a.defaultedLabel = s, a.defaultedTooltip = l,
						t
				}(this), this._invertedIndicesMap = r, this._calculationInfo = {}, this.userOutput = this._dimensionsSummary.userOutput
		},
		cf = uf.prototype;

	function df(t, e, i, n, r) {
		var a = ef[e.type],
			o = n - 1,
			s = e.name,
			l = t[s][o];
		if (l && l.length < i) {
			for (var h = new a(Math.min(r - o * i, i)), u = 0; u < l.length; u++) h[u] = l[u];
			t[s][o] = h
		}
		for (var c = n * i; c < r; c += i) t[s].push(new a(Math.min(r - c, i)))
	}

	function ff(r) {
		var a = r._invertedIndicesMap;
		D(a, function(t, e) {
			var i = r._dimensionInfos[e].ordinalMeta;
			if (i) {
				t = a[e] = new rf(i.categories.length);
				for (var n = 0; n < t.length; n++) t[n] = -1;
				for (n = 0; n < r._count; n++) t[r.get(e, n)] = n
			}
		})
	}

	function pf(t, e, i) {
		var n;
		if (null != e) {
			var r = t._chunkSize,
				a = Math.floor(i / r),
				o = i % r,
				s = t.dimensions[e],
				l = t._storage[s][a];
			if (l) {
				n = l[o];
				var h = t._dimensionInfos[s].ordinalMeta;
				h && h.categories.length && (n = h.categories[n])
			}
		}
		return n
	}

	function gf(t) {
		return t
	}

	function vf(t) {
		return t < this._count && 0 <= t ? this._indices[t] : -1
	}

	function mf(t, e) {
		var i = t._idList[e];
		return null == i && (i = pf(t, t._idDimIdx, e)), null == i && (i = "e\0\0" + e), i
	}

	function yf(t) {
		return O(t) || (t = [t]), t
	}

	function _f(t, e) {
		var i = t.dimensions,
			n = new uf(P(i, t.getDimensionInfo, t), t.hostModel);
		hf(n, t);
		for (var r = n._storage = {}, a = t._storage, o = 0; o < i.length; o++) {
			var s = i[o];
			a[s] && (0 <= x(e, s) ? (r[s] = xf(a[s]), n._rawExtent[s] = wf(), n._extent[s] = null) : r[s] = a[s])
		}
		return n
	}

	function xf(t) {
		for (var e, i, n = new Array(t.length), r = 0; r < t.length; r++) n[r] = (e = t[r], i = void 0, (i = e.constructor) ===
			Array ? e.slice() : new i(e));
		return n
	}

	function wf() {
		return [1 / 0, -1 / 0]
	}
	cf.type = "list", cf.hasItemOption = !0, cf.getDimension = function(t) {
		return "number" != typeof t && (isNaN(t) || this._dimensionInfos.hasOwnProperty(t)) || (t = this.dimensions[t]), t
	}, cf.getDimensionInfo = function(t) {
		return this._dimensionInfos[this.getDimension(t)]
	}, cf.getDimensionsOnCoord = function() {
		return this._dimensionsSummary.dataDimsOnCoord.slice()
	}, cf.mapDimension = function(t, e) {
		var i = this._dimensionsSummary;
		if (null == e) return i.encodeFirstDimNotExtra[t];
		var n = i.encode[t];
		return !0 === e ? (n || []).slice() : n && n[e]
	}, cf.initData = function(t, e, i) {
		(vh.isInstance(t) || L(t)) && (t = new Jh(t, this.dimensions.length)), this._rawData = t, this._storage = {}, this._indices =
			null, this._nameList = e || [], this._idList = [], this._nameRepeatCount = {}, i || (this.hasItemOption = !1),
			this.defaultDimValueGetter = su[this._rawData.getSource().sourceFormat], this._dimValueGetter = i = i || this.defaultDimValueGetter,
			this._dimValueGetterArrayRows = su.arrayRows, this._rawExtent = {}, this._initDataFromProvider(0, t.count()), t.pure &&
			(this.hasItemOption = !1)
	}, cf.getProvider = function() {
		return this._rawData
	}, cf.appendData = function(t) {
		var e = this._rawData,
			i = this.count();
		e.appendData(t);
		var n = e.count();
		e.persistent || (n += i), this._initDataFromProvider(i, n)
	}, cf.appendValues = function(t, e) {
		for (var i = this._chunkSize, n = this._storage, r = this.dimensions, a = r.length, o = this._rawExtent, s = this.count(),
				l = s + Math.max(t.length, e ? e.length : 0), h = this._chunkCount, u = 0; u < a; u++) {
			o[m = r[u]] || (o[m] = wf()), n[m] || (n[m] = []), df(n, this._dimensionInfos[m], i, h, l), this._chunkCount = n[m]
				.length
		}
		for (var c = new Array(a), d = s; d < l; d++) {
			for (var f = d - s, p = Math.floor(d / i), g = d % i, v = 0; v < a; v++) {
				var m = r[v],
					y = this._dimValueGetterArrayRows(t[f] || c, m, f, v);
				n[m][p][g] = y;
				var _ = o[m];
				y < _[0] && (_[0] = y), y > _[1] && (_[1] = y)
			}
			e && (this._nameList[d] = e[f])
		}
		this._rawCount = this._count = l, this._extent = {}, ff(this)
	}, cf._initDataFromProvider = function(t, e) {
		if (!(e <= t)) {
			for (var i, n = this._chunkSize, r = this._rawData, a = this._storage, o = this.dimensions, s = o.length, l = this
					._dimensionInfos, h = this._nameList, u = this._idList, c = this._rawExtent, d = this._nameRepeatCount = {}, f =
					this._chunkCount, p = 0; p < s; p++) {
				c[w = o[p]] || (c[w] = wf());
				var g = l[w];
				0 === g.otherDims.itemName && (i = this._nameDimIdx = p), 0 === g.otherDims.itemId && (this._idDimIdx = p), a[w] ||
					(a[w] = []), df(a, g, n, f, e), this._chunkCount = a[w].length
			}
			for (var v = new Array(s), m = t; m < e; m++) {
				v = r.getItem(m, v);
				for (var y = Math.floor(m / n), _ = m % n, x = 0; x < s; x++) {
					var w, b = a[w = o[x]][y],
						S = this._dimValueGetter(v, w, m, x);
					b[_] = S;
					var M = c[w];
					S < M[0] && (M[0] = S), S > M[1] && (M[1] = S)
				}
				if (!r.pure) {
					var I = h[m];
					if (v && null == I)
						if (null != v.name) h[m] = I = v.name;
						else if (null != i) {
						var C = o[i],
							A = a[C][y];
						if (A) {
							I = A[_];
							var T = l[C].ordinalMeta;
							T && T.categories.length && (I = T.categories[I])
						}
					}
					var D = null == v ? null : v.id;
					null == D && null != I && (d[I] = d[I] || 0, 0 < d[D = I] && (D += "__ec__" + d[I]), d[I]++), null != D && (u[m] =
						D)
				}
			}!r.persistent && r.clean && r.clean(), this._rawCount = this._count = e, this._extent = {}, ff(this)
		}
	}, cf.count = function() {
		return this._count
	}, cf.getIndices = function() {
		var t = this._indices;
		if (t) {
			var e = t.constructor,
				i = this._count;
			if (e === Array) {
				r = new e(i);
				for (var n = 0; n < i; n++) r[n] = t[n]
			} else r = new e(t.buffer, 0, i)
		} else {
			var r = new(e = of (this))(this.count());
			for (n = 0; n < r.length; n++) r[n] = n
		}
		return r
	}, cf.get = function(t, e) {
		if (!(0 <= e && e < this._count)) return NaN;
		var i = this._storage;
		if (!i[t]) return NaN;
		e = this.getRawIndex(e);
		var n = Math.floor(e / this._chunkSize),
			r = e % this._chunkSize;
		return i[t][n][r]
	}, cf.getByRawIndex = function(t, e) {
		if (!(0 <= e && e < this._rawCount)) return NaN;
		var i = this._storage[t];
		if (!i) return NaN;
		var n = Math.floor(e / this._chunkSize),
			r = e % this._chunkSize;
		return i[n][r]
	}, cf._getFast = function(t, e) {
		var i = Math.floor(e / this._chunkSize),
			n = e % this._chunkSize;
		return this._storage[t][i][n]
	}, cf.getValues = function(t, e) {
		var i = [];
		O(t) || (e = t, t = this.dimensions);
		for (var n = 0, r = t.length; n < r; n++) i.push(this.get(t[n], e));
		return i
	}, cf.hasValue = function(t) {
		for (var e = this._dimensionsSummary.dataDimsOnCoord, i = 0, n = e.length; i < n; i++)
			if (isNaN(this.get(e[i], t))) return !1;
		return !0
	}, cf.getDataExtent = function(t) {
		t = this.getDimension(t);
		var e = this._storage[t],
			i = wf();
		if (!e) return i;
		var n, r = this.count();
		if (!this._indices) return this._rawExtent[t].slice();
		if (n = this._extent[t]) return n.slice();
		for (var a = (n = i)[0], o = n[1], s = 0; s < r; s++) {
			var l = this._getFast(t, this.getRawIndex(s));
			l < a && (a = l), o < l && (o = l)
		}
		return n = [a, o], this._extent[t] = n
	}, cf.getApproximateExtent = function(t) {
		return t = this.getDimension(t), this._approximateExtent[t] || this.getDataExtent(t)
	}, cf.setApproximateExtent = function(t, e) {
		e = this.getDimension(e), this._approximateExtent[e] = t.slice()
	}, cf.getCalculationInfo = function(t) {
		return this._calculationInfo[t]
	}, cf.setCalculationInfo = function(t, e) {
		Jd(t) ? k(this._calculationInfo, t) : this._calculationInfo[t] = e
	}, cf.getSum = function(t) {
		var e = 0;
		if (this._storage[t])
			for (var i = 0, n = this.count(); i < n; i++) {
				var r = this.get(t, i);
				isNaN(r) || (e += r)
			}
		return e
	}, cf.getMedian = function(t) {
		var i = [];
		this.each(t, function(t, e) {
			isNaN(t) || i.push(t)
		});
		var e = [].concat(i).sort(function(t, e) {
				return t - e
			}),
			n = this.count();
		return 0 === n ? 0 : n % 2 == 1 ? e[(n - 1) / 2] : (e[n / 2] + e[n / 2 - 1]) / 2
	}, cf.rawIndexOf = function(t, e) {
		var i = (t && this._invertedIndicesMap[t])[e];
		return null == i || isNaN(i) ? -1 : i
	}, cf.indexOfName = function(t) {
		for (var e = 0, i = this.count(); e < i; e++)
			if (this.getName(e) === t) return e;
		return -1
	}, cf.indexOfRawIndex = function(t) {
		if (t >= this._rawCount || t < 0) return -1;
		if (!this._indices) return t;
		var e = this._indices,
			i = e[t];
		if (null != i && i < this._count && i === t) return t;
		for (var n = 0, r = this._count - 1; n <= r;) {
			var a = (n + r) / 2 | 0;
			if (e[a] < t) n = 1 + a;
			else {
				if (!(e[a] > t)) return a;
				r = a - 1
			}
		}
		return -1
	}, cf.indicesOfNearest = function(t, e, i) {
		var n = [];
		if (!this._storage[t]) return n;
		null == i && (i = 1 / 0);
		for (var r = Number.MAX_VALUE, a = -1, o = 0, s = this.count(); o < s; o++) {
			var l = e - this.get(t, o),
				h = Math.abs(l);
			l <= i && h <= r && ((h < r || 0 <= l && a < 0) && (r = h, a = l, n.length = 0), n.push(o))
		}
		return n
	}, cf.getRawIndex = gf, cf.getRawDataItem = function(t) {
		if (this._rawData.persistent) return this._rawData.getItem(this.getRawIndex(t));
		for (var e = [], i = 0; i < this.dimensions.length; i++) {
			var n = this.dimensions[i];
			e.push(this.get(n, t))
		}
		return e
	}, cf.getName = function(t) {
		var e = this.getRawIndex(t);
		return this._nameList[e] || pf(this, this._nameDimIdx, e) || ""
	}, cf.getId = function(t) {
		return mf(this, this.getRawIndex(t))
	}, cf.each = function(t, e, i, n) {
		if (this._count) {
			"function" == typeof t && (n = i, i = e, e = t, t = []), i = i || n || this;
			for (var r = (t = P(yf(t), this.getDimension, this)).length, a = 0; a < this.count(); a++) switch (r) {
				case 0:
					e.call(i, a);
					break;
				case 1:
					e.call(i, this.get(t[0], a), a);
					break;
				case 2:
					e.call(i, this.get(t[0], a), this.get(t[1], a), a);
					break;
				default:
					for (var o = 0, s = []; o < r; o++) s[o] = this.get(t[o], a);
					s[o] = a, e.apply(i, s)
			}
		}
	}, cf.filterSelf = function(t, e, i, n) {
		if (this._count) {
			"function" == typeof t && (n = i, i = e, e = t, t = []), i = i || n || this, t = P(yf(t), this.getDimension, this);
			for (var r = this.count(), a = new( of (this))(r), o = [], s = t.length, l = 0, h = t[0], u = 0; u < r; u++) {
				var c, d = this.getRawIndex(u);
				if (0 === s) c = e.call(i, u);
				else if (1 === s) {
					var f = this._getFast(h, d);
					c = e.call(i, f, u)
				} else {
					for (var p = 0; p < s; p++) o[p] = this._getFast(h, d);
					o[p] = u, c = e.apply(i, o)
				}
				c && (a[l++] = d)
			}
			return l < r && (this._indices = a), this._count = l, this._extent = {}, this.getRawIndex = this._indices ? vf :
				gf, this
		}
	}, cf.selectRange = function(t) {
		if (this._count) {
			var e = [];
			for (var i in t) t.hasOwnProperty(i) && e.push(i);
			var n = e.length;
			if (n) {
				var r = this.count(),
					a = new( of (this))(r),
					o = 0,
					s = e[0],
					l = t[s][0],
					h = t[s][1],
					u = !1;
				if (!this._indices) {
					var c = 0;
					if (1 === n) {
						for (var d = this._storage[e[0]], f = 0; f < this._chunkCount; f++)
							for (var p = d[f], g = Math.min(this._count - f * this._chunkSize, this._chunkSize), v = 0; v < g; v++) {
								(l <= (w = p[v]) && w <= h || isNaN(w)) && (a[o++] = c), c++
							}
						u = !0
					} else if (2 === n) {
						d = this._storage[s];
						var m = this._storage[e[1]],
							y = t[e[1]][0],
							_ = t[e[1]][1];
						for (f = 0; f < this._chunkCount; f++) {
							p = d[f];
							var x = m[f];
							for (g = Math.min(this._count - f * this._chunkSize, this._chunkSize), v = 0; v < g; v++) {
								var w = p[v],
									b = x[v];
								(l <= w && w <= h || isNaN(w)) && (y <= b && b <= _ || isNaN(b)) && (a[o++] = c), c++
							}
						}
						u = !0
					}
				}
				if (!u)
					if (1 === n)
						for (v = 0; v < r; v++) {
							var S = this.getRawIndex(v);
							(l <= (w = this._getFast(s, S)) && w <= h || isNaN(w)) && (a[o++] = S)
						} else
							for (v = 0; v < r; v++) {
								var M = !0;
								for (S = this.getRawIndex(v), f = 0; f < n; f++) {
									var I = e[f];
									((w = this._getFast(i, S)) < t[I][0] || w > t[I][1]) && (M = !1)
								}
								M && (a[o++] = this.getRawIndex(v))
							}
				return o < r && (this._indices = a), this._count = o, this._extent = {}, this.getRawIndex = this._indices ? vf :
					gf, this
			}
		}
	}, cf.mapArray = function(t, e, i, n) {
		"function" == typeof t && (n = i, i = e, e = t, t = []), i = i || n || this;
		var r = [];
		return this.each(t, function() {
			r.push(e && e.apply(this, arguments))
		}, i), r
	}, cf.map = function(t, e, i, n) {
		i = i || n || this;
		var r = _f(this, t = P(yf(t), this.getDimension, this));
		r._indices = this._indices, r.getRawIndex = r._indices ? vf : gf;
		for (var a = r._storage, o = [], s = this._chunkSize, l = t.length, h = this.count(), u = [], c = r._rawExtent, d =
				0; d < h; d++) {
			for (var f = 0; f < l; f++) u[f] = this.get(t[f], d);
			u[l] = d;
			var p = e && e.apply(i, u);
			if (null != p) {
				"object" != typeof p && (o[0] = p, p = o);
				for (var g = this.getRawIndex(d), v = Math.floor(g / s), m = g % s, y = 0; y < p.length; y++) {
					var _ = t[y],
						x = p[y],
						w = c[_],
						b = a[_];
					b && (b[v][m] = x), x < w[0] && (w[0] = x), x > w[1] && (w[1] = x)
				}
			}
		}
		return r
	}, cf.downSample = function(t, e, i, n) {
		for (var r = _f(this, [t]), a = r._storage, o = [], s = Math.floor(1 / e), l = a[t], h = this.count(), u = this._chunkSize,
				c = r._rawExtent[t], d = new( of (this))(h), f = 0, p = 0; p < h; p += s) {
			h - p < s && (s = h - p, o.length = s);
			for (var g = 0; g < s; g++) {
				var v = this.getRawIndex(p + g),
					m = Math.floor(v / u),
					y = v % u;
				o[g] = l[m][y]
			}
			var _ = i(o),
				x = this.getRawIndex(Math.min(p + n(o, _) || 0, h - 1)),
				w = x % u;
			(l[Math.floor(x / u)][w] = _) < c[0] && (c[0] = _), _ > c[1] && (c[1] = _), d[f++] = x
		}
		return r._count = f, r._indices = d, r.getRawIndex = vf, r
	}, cf.getItemModel = function(t) {
		var e = this.hostModel;
		return new il(this.getRawDataItem(t), e, e && e.ecModel)
	}, cf.diff = function(e) {
		var i = this;
		return new qd(e ? e.getIndices() : [], this.getIndices(), function(t) {
			return mf(e, t)
		}, function(t) {
			return mf(i, t)
		})
	}, cf.getVisual = function(t) {
		var e = this._visual;
		return e && e[t]
	}, cf.setVisual = function(t, e) {
		if (Jd(t))
			for (var i in t) t.hasOwnProperty(i) && this.setVisual(i, t[i]);
		else this._visual = this._visual || {}, this._visual[t] = e
	}, cf.setLayout = function(t, e) {
		if (Jd(t))
			for (var i in t) t.hasOwnProperty(i) && this.setLayout(i, t[i]);
		else this._layout[t] = e
	}, cf.getLayout = function(t) {
		return this._layout[t]
	}, cf.getItemLayout = function(t) {
		return this._itemLayouts[t]
	}, cf.setItemLayout = function(t, e, i) {
		this._itemLayouts[t] = i ? k(this._itemLayouts[t] || {}, e) : e
	}, cf.clearItemLayouts = function() {
		this._itemLayouts.length = 0
	}, cf.getItemVisual = function(t, e, i) {
		var n = this._itemVisuals[t],
			r = n && n[e];
		return null != r || i ? r : this.getVisual(e)
	}, cf.setItemVisual = function(t, e, i) {
		var n = this._itemVisuals[t] || {},
			r = this.hasItemVisual;
		if (this._itemVisuals[t] = n, Jd(e))
			for (var a in e) e.hasOwnProperty(a) && (n[a] = e[a], r[a] = !0);
		else n[e] = i, r[e] = !0
	}, cf.clearAllVisual = function() {
		this._visual = {}, this._itemVisuals = [], this.hasItemVisual = {}
	};

	function bf(t) {
		t.seriesIndex = this.seriesIndex, t.dataIndex = this.dataIndex, t.dataType = this.dataType
	}

	function Sf(t, e, i) {
		vh.isInstance(e) || (e = vh.seriesDataToSource(e)), i = i || {}, t = (t || []).slice();
		for (var n = (i.dimsDef || []).slice(), l = Q(i.encodeDef), r = Q(), a = Q(), h = [], o = function(t, e, i, n) {
				var r = Math.max(t.dimensionsDetectCount || 1, e.length, i.length, n || 0);
				return D(e, function(t) {
					var e = t.dimsDef;
					e && (r = Math.max(r, e.length))
				}), r
			}(e, t, n, i.dimCount), s = 0; s < o; s++) {
			var u = n[s] = k({}, N(n[s]) ? n[s] : {
					name: n[s]
				}),
				c = u.name,
				d = h[s] = {
					otherDims: {}
				};
			null != c && null == r.get(c) && (d.name = d.displayName = c, r.set(c, s)), null != u.type && (d.type = u.type),
				null != u.displayName && (d.displayName = u.displayName)
		}
		l.each(function(t, i) {
			if (1 === (t = gr(t).slice()).length && !E(t[0]) && t[0] < 0) l.set(i, !1);
			else {
				var n = l.set(i, []);
				D(t, function(t, e) {
					E(t) && (t = r.get(t)), null != t && t < o && (n[e] = t, p(h[t], i, e))
				})
			}
		});
		var f = 0;

		function p(t, e, i) {
			null != Kd.get(e) ? t.otherDims[e] = i : (t.coordDim = e, t.coordDimIndex = i, a.set(e, !0))
		}
		D(t, function(r, t) {
			var a, o, s;
			if (E(r)) a = r, r = {};
			else {
				a = r.name;
				var e = r.ordinalMeta;
				r.ordinalMeta = null, (r = b(r)).ordinalMeta = e, o = r.dimsDef, s = r.otherDims, r.name = r.coordDim = r.coordDimIndex =
					r.dimsDef = r.otherDims = null
			}
			if (!1 !== (i = l.get(a))) {
				var i;
				if (!(i = gr(i)).length)
					for (var n = 0; n < (o && o.length || 1); n++) {
						for (; f < h.length && null != h[f].coordDim;) f++;
						f < h.length && i.push(f++)
					}
				D(i, function(t, e) {
					var i = h[t];
					if (p(T(i, r), a, e), null == i.name && o) {
						var n = o[e];
						N(n) || (n = {
							name: n
						}), i.name = i.displayName = n.name, i.defaultTooltip = n.defaultTooltip
					}
					s && T(i.otherDims, s)
				})
			}
		});
		var g = i.generateCoord,
			v = i.generateCoordCount,
			m = null != v;
		v = g ? v || 1 : 0;
		for (var y, _, x = g || "value", w = 0; w < o; w++) {
			null == (d = h[w] = h[w] || {}).coordDim && (d.coordDim = Mf(x, a, m), d.coordDimIndex = 0, (!g || v <= 0) && (d.isExtraCoord = !
				0), v--), null == d.name && (d.name = Mf(d.coordDim, r)), null == d.type && (y = e, _ = w, d.name, wh(y.data, y.sourceFormat,
				y.seriesLayoutBy, y.dimensionsDefine, y.startIndex, _)) && (d.type = "ordinal")
		}
		return h
	}

	function Mf(t, e, i) {
		if (i || null != e.get(t)) {
			for (var n = 0; null != e.get(t + n);) n++;
			t += n
		}
		return e.set(t, !0), t
	}
	cf.setItemGraphicEl = function(t, e) {
		var i = this.hostModel;
		e && (e.dataIndex = t, e.dataType = this.dataType, e.seriesIndex = i && i.seriesIndex, "group" === e.type && e.traverse(
			bf, e)), this._graphicEls[t] = e
	}, cf.getItemGraphicEl = function(t) {
		return this._graphicEls[t]
	}, cf.eachItemGraphicEl = function(i, n) {
		D(this._graphicEls, function(t, e) {
			t && i && i.call(n, t, e)
		})
	}, cf.cloneShallow = function(t) {
		if (!t) {
			var e = P(this.dimensions, this.getDimensionInfo, this);
			t = new uf(e, this.hostModel)
		}
		if (t._storage = this._storage, hf(t, this), this._indices) {
			var i = this._indices.constructor;
			t._indices = new i(this._indices)
		} else t._indices = null;
		return t.getRawIndex = t._indices ? vf : gf, t
	}, cf.wrapMethod = function(t, e) {
		var i = this[t];
		"function" == typeof i && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[
			t] = function() {
			var t = i.apply(this, arguments);
			return e.apply(this, [t].concat(Z(arguments)))
		})
	}, cf.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"], cf.CHANGABLE_METHODS = ["filterSelf",
		"selectRange"
	];
	var If = function(t, e) {
		return Sf((e = e || {}).coordDimensions || [], t, {
			dimsDef: e.dimensionsDefine || t.dimensionsDefine,
			encodeDef: e.encodeDefine || t.encodeDefine,
			dimCount: e.dimensionsCount,
			generateCoord: e.generateCoord,
			generateCoordCount: e.generateCoordCount
		})
	};

	function Cf(t, i, e) {
		var n, r, a, o, s = (e = e || {}).byIndex,
			l = e.stackedCoordDimension,
			h = !(!t || !t.get("stack"));
		if (D(i, function(t, e) {
				E(t) && (i[e] = t = {
					name: t
				}), h && !t.isExtraCoord && (s || n || !t.ordinalMeta || (n = t), r || "ordinal" === t.type || "time" === t.type ||
					l && l !== t.coordDim || (r = t))
			}), !r || s || n || (s = !0), r) {
			a = "__\0ecstackresult", o = "__\0ecstackedover", n && (n.createInvertedIndices = !0);
			var u = r.coordDim,
				c = r.type,
				d = 0;
			D(i, function(t) {
				t.coordDim === u && d++
			}), i.push({
				name: a,
				coordDim: u,
				coordDimIndex: d,
				type: c,
				isExtraCoord: !0,
				isCalculationCoord: !0
			}), d++, i.push({
				name: o,
				coordDim: o,
				coordDimIndex: d,
				type: c,
				isExtraCoord: !0,
				isCalculationCoord: !0
			})
		}
		return {
			stackedDimension: r && r.name,
			stackedByDimension: n && n.name,
			isStackedByIndex: s,
			stackedOverDimension: o,
			stackResultDimension: a
		}
	}

	function Af(t, e) {
		return !!e && e === t.getCalculationInfo("stackedDimension")
	}

	function Tf(t, e) {
		return Af(t, e) ? t.getCalculationInfo("stackResultDimension") : e
	}

	function Df(t, e, i) {
		i = i || {}, vh.isInstance(t) || (t = vh.seriesDataToSource(t));
		var n, r = e.get("coordinateSystem"),
			a = Dh.get(r),
			o = ah(e);
		o && (n = P(o.coordSysDims, function(t) {
			var e = {
					name: t
				},
				i = o.axisMap.get(t);
			if (i) {
				var n = i.get("type");
				e.type = function(t) {
					return "category" === t ? "ordinal" : "time" === t ? "time" : "float"
				}(n)
			}
			return e
		})), n = n || (a && (a.getDimensionsInfo ? a.getDimensionsInfo() : a.dimensions.slice()) || ["x", "y"]);
		var s, l, h = If(t, {
			coordDimensions: n,
			generateCoord: i.generateCoord
		});
		o && D(h, function(t, e) {
			var i = t.coordDim,
				n = o.categoryAxisMap.get(i);
			n && (null == s && (s = e), t.ordinalMeta = n.getOrdinalMeta()), null != t.otherDims.itemName && (l = !0)
		}), l || null == s || (h[s].otherDims.itemName = 0);
		var u = Cf(e, h),
			c = new uf(h, e);
		c.setCalculationInfo(u);
		var d = null != s && function(t) {
			if (t.sourceFormat === lh) {
				var e = function(t) {
					var e = 0;
					for (; e < t.length && null == t[e];) e++;
					return t[e]
				}(t.data || []);
				return null != e && !O(yr(e))
			}
		}(t) ? function(t, e, i, n) {
			return n === s ? i : this.defaultDimValueGetter(t, e, i, n)
		} : null;
		return c.hasItemOption = !1, c.initData(t, null, d), c
	}

	function kf(t) {
		this._setting = t || {}, this._extent = [1 / 0, -1 / 0], this._interval = 0, this.init && this.init.apply(this,
			arguments)
	}

	function Pf(t) {
		this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this
			._map
	}
	kf.prototype.parse = function(t) {
		return t
	}, kf.prototype.getSetting = function(t) {
		return this._setting[t]
	}, kf.prototype.contain = function(t) {
		var e = this._extent;
		return t >= e[0] && t <= e[1]
	}, kf.prototype.normalize = function(t) {
		var e = this._extent;
		return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0])
	}, kf.prototype.scale = function(t) {
		var e = this._extent;
		return t * (e[1] - e[0]) + e[0]
	}, kf.prototype.unionExtent = function(t) {
		var e = this._extent;
		t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1])
	}, kf.prototype.unionExtentFromData = function(t, e) {
		this.unionExtent(t.getApproximateExtent(e))
	}, kf.prototype.getExtent = function() {
		return this._extent.slice()
	}, kf.prototype.setExtent = function(t, e) {
		var i = this._extent;
		isNaN(t) || (i[0] = t), isNaN(e) || (i[1] = e)
	}, kf.prototype.isBlank = function() {
		return this._isBlank
	}, kf.prototype.setBlank = function(t) {
		this._isBlank = t
	}, kf.prototype.getLabel = null, Or(kf), Br(kf, {
		registerWhenExtend: !0
	}), Pf.createByAxisModel = function(t) {
		var e = t.option,
			i = e.data,
			n = i && P(i, zf);
		return new Pf({
			categories: n,
			needCollect: !n,
			deduplication: !1 !== e.dedplication
		})
	};
	var Lf = Pf.prototype;

	function Of(t) {
		return t._map || (t._map = Q(t.categories))
	}

	function zf(t) {
		return N(t) && null != t.value ? t.value : t + ""
	}
	Lf.getOrdinal = function(t) {
		return Of(this).get(t)
	}, Lf.parseAndCollect = function(t) {
		var e, i = this._needCollect;
		if ("string" != typeof t && !i) return t;
		if (i && !this._deduplication) return e = this.categories.length, this.categories[e] = t, e;
		var n = Of(this);
		return null == (e = n.get(t)) && (i ? (e = this.categories.length, this.categories[e] = t, n.set(t, e)) : e = NaN),
			e
	};
	var Ef = kf.prototype,
		Nf = kf.extend({
			type: "ordinal",
			init: function(t, e) {
				t && !O(t) || (t = new Pf({
					categories: t
				})), this._ordinalMeta = t, this._extent = e || [0, t.categories.length - 1]
			},
			parse: function(t) {
				return "string" == typeof t ? this._ordinalMeta.getOrdinal(t) : Math.round(t)
			},
			contain: function(t) {
				return t = this.parse(t), Ef.contain.call(this, t) && null != this._ordinalMeta.categories[t]
			},
			normalize: function(t) {
				return Ef.normalize.call(this, this.parse(t))
			},
			scale: function(t) {
				return Math.round(Ef.scale.call(this, t))
			},
			getTicks: function() {
				for (var t = [], e = this._extent, i = e[0]; i <= e[1];) t.push(i), i++;
				return t
			},
			getLabel: function(t) {
				if (!this.isBlank()) return this._ordinalMeta.categories[t]
			},
			count: function() {
				return this._extent[1] - this._extent[0] + 1
			},
			unionExtentFromData: function(t, e) {
				this.unionExtent(t.getApproximateExtent(e))
			},
			getOrdinalMeta: function() {
				return this._ordinalMeta
			},
			niceTicks: J,
			niceExtent: J
		});
	Nf.create = function() {
		return new Nf
	};
	var Rf = ul;

	function Bf(t) {
		return fl(t) + 2
	}

	function Vf(t, e, i) {
		t[e] = Math.max(Math.min(t[e], i[1]), i[0])
	}

	function Ff(t, e) {
		isFinite(t[0]) || (t[0] = e[0]), isFinite(t[1]) || (t[1] = e[1]), Vf(t, 0, e), Vf(t, 1, e), t[0] > t[1] && (t[0] = t[
			1])
	}
	var Hf = ul,
		Gf = kf.extend({
			type: "interval",
			_interval: 0,
			_intervalPrecision: 2,
			setExtent: function(t, e) {
				var i = this._extent;
				isNaN(t) || (i[0] = parseFloat(t)), isNaN(e) || (i[1] = parseFloat(e))
			},
			unionExtent: function(t) {
				var e = this._extent;
				t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), Gf.prototype.setExtent.call(this, e[0], e[1])
			},
			getInterval: function() {
				return this._interval
			},
			setInterval: function(t) {
				this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = Bf(t)
			},
			getTicks: function() {
				return function(t, e, i, n) {
					var r = [];
					if (!t) return r;
					e[0] < i[0] && r.push(e[0]);
					for (var a = i[0]; a <= i[1] && (r.push(a), (a = Rf(a + t, n)) !== r[r.length - 1]);)
						if (1e4 < r.length) return [];
					return e[1] > (r.length ? r[r.length - 1] : i[1]) && r.push(e[1]), r
				}(this._interval, this._extent, this._niceExtent, this._intervalPrecision)
			},
			getLabel: function(t, e) {
				if (null == t) return "";
				var i = e && e.precision;
				return null == i ? i = fl(t) || 0 : "auto" === i && (i = this._intervalPrecision), Ml(t = Hf(t, i, !0))
			},
			niceTicks: function(t, e, i) {
				t = t || 5;
				var n = this._extent,
					r = n[1] - n[0];
				if (isFinite(r)) {
					r < 0 && (r = -r, n.reverse());
					var a = function(t, e, i, n) {
						var r = {},
							a = t[1] - t[0],
							o = r.interval = bl(a / e, !0);
						null != i && o < i && (o = r.interval = i), null != n && n < o && (o = r.interval = n);
						var s = r.intervalPrecision = Bf(o);
						return Ff(r.niceTickExtent = [Rf(Math.ceil(t[0] / o) * o, s), Rf(Math.floor(t[1] / o) * o, s)], t), r
					}(n, t, e, i);
					this._intervalPrecision = a.intervalPrecision, this._interval = a.interval, this._niceExtent = a.niceTickExtent
				}
			},
			niceExtent: function(t) {
				var e = this._extent;
				if (e[0] === e[1])
					if (0 !== e[0]) {
						var i = e[0];
						t.fixMax || (e[1] += i / 2), e[0] -= i / 2
					} else e[1] = 1;
				var n = e[1] - e[0];
				isFinite(n) || (e[0] = 0, e[1] = 1), this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
				var r = this._interval;
				t.fixMin || (e[0] = Hf(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = Hf(Math.ceil(e[1] / r) * r))
			}
		});
	Gf.create = function() {
		return new Gf
	};
	var Wf = "__ec_stack_",
		Zf = "undefined" != typeof Float32Array ? Float32Array : Array;

	function Uf(t) {
		return t.get("stack") || Wf + t.seriesIndex
	}

	function Xf(t) {
		return t.dim + t.index
	}

	function Yf(t, e) {
		var i = [];
		return e.eachSeriesByType(t, function(t) {
			Kf(t) && !Qf(t) && i.push(t)
		}), i
	}

	function jf(t) {
		var g = function(t) {
				var l = {};
				D(t, function(t) {
					var e = t.coordinateSystem.getBaseAxis();
					if ("time" === e.type || "value" === e.type)
						for (var i = t.getData(), n = e.dim + "_" + e.index, r = i.mapDimension(e.dim), a = 0, o = i.count(); a < o; ++
							a) {
							var s = i.get(r, a);
							l[n] ? l[n].push(s) : l[n] = [s]
						}
				});
				var e = [];
				for (var i in l)
					if (l.hasOwnProperty(i)) {
						var n = l[i];
						if (n) {
							n.sort(function(t, e) {
								return t - e
							});
							for (var r = null, a = 1; a < n.length; ++a) {
								var o = n[a] - n[a - 1];
								0 < o && (r = null === r ? o : Math.min(r, o))
							}
							e[i] = r
						}
					} return e
			}(t),
			v = [];
		return D(t, function(t) {
				var e, i = t.coordinateSystem.getBaseAxis(),
					n = i.getExtent();
				if ("category" === i.type) e = i.getBandWidth();
				else if ("value" === i.type || "time" === i.type) {
					var r = i.dim + "_" + i.index,
						a = g[r],
						o = Math.abs(n[1] - n[0]),
						s = i.scale.getExtent(),
						l = Math.abs(s[1] - s[0]);
					e = a ? o / l * a : o
				} else {
					var h = t.getData();
					e = Math.abs(n[1] - n[0]) / h.count()
				}
				var u = hl(t.get("barWidth"), e),
					c = hl(t.get("barMaxWidth"), e),
					d = hl(t.get("barMinWidth") || 1, e),
					f = t.get("barGap"),
					p = t.get("barCategoryGap");
				v.push({
					bandWidth: e,
					barWidth: u,
					barMaxWidth: c,
					barMinWidth: d,
					barGap: f,
					barCategoryGap: p,
					axisKey: Xf(i),
					stackId: Uf(t)
				})
			}),
			function(t) {
				var d = {};
				D(t, function(t, e) {
					var i = t.axisKey,
						n = t.bandWidth,
						r = d[i] || {
							bandWidth: n,
							remainedWidth: n,
							autoWidthCount: 0,
							categoryGap: "20%",
							gap: "30%",
							stacks: {}
						},
						a = r.stacks;
					d[i] = r;
					var o = t.stackId;
					a[o] || r.autoWidthCount++, a[o] = a[o] || {
						width: 0,
						maxWidth: 0
					};
					var s = t.barWidth;
					s && !a[o].width && (a[o].width = s, s = Math.min(r.remainedWidth, s), r.remainedWidth -= s);
					var l = t.barMaxWidth;
					l && (a[o].maxWidth = l);
					var h = t.barMinWidth;
					h && (a[o].minWidth = h);
					var u = t.barGap;
					null != u && (r.gap = u);
					var c = t.barCategoryGap;
					null != c && (r.categoryGap = c)
				});
				var f = {};
				return D(d, function(t, i) {
					f[i] = {};
					var e = t.stacks,
						n = t.bandWidth,
						r = hl(t.categoryGap, n),
						a = hl(t.gap, 1),
						o = t.remainedWidth,
						s = t.autoWidthCount,
						l = (o - r) / (s + (s - 1) * a);
					l = Math.max(l, 0), D(e, function(t) {
						var e = t.maxWidth,
							i = t.minWidth;
						if (t.width) {
							n = t.width;
							e && (n = Math.min(n, e)), i && (n = Math.max(n, i)), t.width = n, o -= n, s--
						} else {
							var n = l;
							e && e < n && (n = Math.min(e, o)), i && n < i && (n = i), n !== l && (t.width = n, o -= n, s--)
						}
					}), l = (o - r) / (s + (s - 1) * a), l = Math.max(l, 0);
					var h, u = 0;
					D(e, function(t, e) {
						t.width || (t.width = l), u += (h = t).width * (1 + a)
					}), h && (u -= h.width * a);
					var c = -u / 2;
					D(e, function(t, e) {
						f[i][e] = f[i][e] || {
							bandWidth: n,
							offset: c,
							width: t.width
						}, c += t.width * (1 + a)
					})
				}), f
			}(v)
	}

	function qf(t, e, i) {
		if (t && e) {
			var n = t[Xf(e)];
			return null != n && null != i && (n = n[Uf(i)]), n
		}
	}
	var $f = {
		seriesType: "bar",
		plan: Bu(),
		reset: function(t) {
			if (Kf(t) && Qf(t)) {
				var e = t.getData(),
					u = t.coordinateSystem,
					c = u.getBaseAxis(),
					d = u.getOtherAxis(c),
					f = e.mapDimension(d.dim),
					p = e.mapDimension(c.dim),
					g = d.isHorizontal(),
					v = g ? 0 : 1,
					m = qf(jf([t]), c, t).width;
				return .5 < m || (m = .5), {
					progress: function(t, e) {
						var i, n = t.count,
							r = new Zf(2 * n),
							a = new Zf(n),
							o = [],
							s = [],
							l = 0,
							h = 0;
						for (; null != (i = t.next());) s[v] = e.get(f, i), s[1 - v] = e.get(p, i), o = u.dataToPoint(s, null, o), r[
							l++] = o[0], r[l++] = o[1], a[h++] = i;
						e.setLayout({
							largePoints: r,
							largeDataIndices: a,
							barWidth: m,
							valueAxisStart: Jf(c, d, !1),
							valueAxisHorizontal: g
						})
					}
				}
			}
		}
	};

	function Kf(t) {
		return t.coordinateSystem && "cartesian2d" === t.coordinateSystem.type
	}

	function Qf(t) {
		return t.pipelineContext && t.pipelineContext.large
	}

	function Jf(t, e) {
		return e.toGlobalCoord(e.dataToCoord("log" === e.type ? 1 : 0))
	}
	var tp = Gf.prototype,
		ep = Math.ceil,
		ip = Math.floor,
		np = 36e5,
		rp = 864e5,
		ap = Gf.extend({
			type: "time",
			getLabel: function(t) {
				var e = this._stepLvl,
					i = new Date(t);
				return El(e[0], i, this.getSetting("useUTC"))
			},
			niceExtent: function(t) {
				var e = this._extent;
				if (e[0] === e[1] && (e[0] -= rp, e[1] += rp), e[1] === -1 / 0 && e[0] === 1 / 0) {
					var i = new Date;
					e[1] = +new Date(i.getFullYear(), i.getMonth(), i.getDate()), e[0] = e[1] - rp
				}
				this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
				var n = this._interval;
				t.fixMin || (e[0] = ul(ip(e[0] / n) * n)), t.fixMax || (e[1] = ul(ep(e[1] / n) * n))
			},
			niceTicks: function(t, e, i) {
				t = t || 10;
				var n = this._extent,
					r = n[1] - n[0],
					a = r / t;
				null != e && a < e && (a = e), null != i && i < a && (a = i);
				var o = op.length,
					s = function(t, e, i, n) {
						for (; i < n;) {
							var r = i + n >>> 1;
							t[r][1] < e ? i = 1 + r : n = r
						}
						return i
					}(op, a, 0, o),
					l = op[Math.min(s, o - 1)],
					h = l[1];
				"year" === l[0] && (h *= bl(r / h / t, !0));
				var u = this.getSetting("useUTC") ? 0 : 60 * new Date(+n[0] || +n[1]).getTimezoneOffset() * 1e3,
					c = [Math.round(ep((n[0] - u) / h) * h + u), Math.round(ip((n[1] - u) / h) * h + u)];
				Ff(c, n), this._stepLvl = l, this._interval = h, this._niceExtent = c
			},
			parse: function(t) {
				return +_l(t)
			}
		});
	D(["contain", "normalize"], function(e) {
		ap.prototype[e] = function(t) {
			return tp[e].call(this, this.parse(t))
		}
	});
	var op = [
		["hh:mm:ss", 1e3],
		["hh:mm:ss", 5e3],
		["hh:mm:ss", 1e4],
		["hh:mm:ss", 15e3],
		["hh:mm:ss", 3e4],
		["hh:mm\nMM-dd", 6e4],
		["hh:mm\nMM-dd", 3e5],
		["hh:mm\nMM-dd", 6e5],
		["hh:mm\nMM-dd", 9e5],
		["hh:mm\nMM-dd", 18e5],
		["hh:mm\nMM-dd", np],
		["hh:mm\nMM-dd", 72e5],
		["hh:mm\nMM-dd", 6 * np],
		["hh:mm\nMM-dd", 432e5],
		["MM-dd\nyyyy", rp],
		["MM-dd\nyyyy", 2 * rp],
		["MM-dd\nyyyy", 3 * rp],
		["MM-dd\nyyyy", 4 * rp],
		["MM-dd\nyyyy", 5 * rp],
		["MM-dd\nyyyy", 6 * rp],
		["week", 7 * rp],
		["MM-dd\nyyyy", 864e6],
		["week", 14 * rp],
		["week", 21 * rp],
		["month", 31 * rp],
		["week", 42 * rp],
		["month", 62 * rp],
		["week", 70 * rp],
		["quarter", 95 * rp],
		["month", 31 * rp * 4],
		["month", 13392e6],
		["half-year", 16416e6],
		["month", 31 * rp * 8],
		["month", 26784e6],
		["year", 380 * rp]
	];
	ap.create = function(t) {
		return new ap({
			useUTC: t.ecModel.get("useUTC")
		})
	};
	var sp = kf.prototype,
		lp = Gf.prototype,
		hp = fl,
		up = ul,
		cp = Math.floor,
		dp = Math.ceil,
		fp = Math.pow,
		pp = Math.log,
		gp = kf.extend({
			type: "log",
			base: 10,
			$constructor: function() {
				kf.apply(this, arguments), this._originalScale = new Gf
			},
			getTicks: function() {
				var i = this._originalScale,
					n = this._extent,
					r = i.getExtent();
				return P(lp.getTicks.call(this), function(t) {
					var e = ul(fp(this.base, t));
					return e = t === n[0] && i.__fixMin ? vp(e, r[0]) : e, e = t === n[1] && i.__fixMax ? vp(e, r[1]) : e
				}, this)
			},
			getLabel: lp.getLabel,
			scale: function(t) {
				return t = sp.scale.call(this, t), fp(this.base, t)
			},
			setExtent: function(t, e) {
				var i = this.base;
				t = pp(t) / pp(i), e = pp(e) / pp(i), lp.setExtent.call(this, t, e)
			},
			getExtent: function() {
				var t = this.base,
					e = sp.getExtent.call(this);
				e[0] = fp(t, e[0]), e[1] = fp(t, e[1]);
				var i = this._originalScale,
					n = i.getExtent();
				return i.__fixMin && (e[0] = vp(e[0], n[0])), i.__fixMax && (e[1] = vp(e[1], n[1])), e
			},
			unionExtent: function(t) {
				this._originalScale.unionExtent(t);
				var e = this.base;
				t[0] = pp(t[0]) / pp(e), t[1] = pp(t[1]) / pp(e), sp.unionExtent.call(this, t)
			},
			unionExtentFromData: function(t, e) {
				this.unionExtent(t.getApproximateExtent(e))
			},
			niceTicks: function(t) {
				t = t || 10;
				var e = this._extent,
					i = e[1] - e[0];
				if (!(i == 1 / 0 || i <= 0)) {
					var n = xl(i);
					for (t / i * n <= .5 && (n *= 10); !isNaN(n) && Math.abs(n) < 1 && 0 < Math.abs(n);) n *= 10;
					var r = [ul(dp(e[0] / n) * n), ul(cp(e[1] / n) * n)];
					this._interval = n, this._niceExtent = r
				}
			},
			niceExtent: function(t) {
				lp.niceExtent.call(this, t);
				var e = this._originalScale;
				e.__fixMin = t.fixMin, e.__fixMax = t.fixMax
			}
		});

	function vp(t, e) {
		return up(t, hp(e))
	}

	function mp(t, e) {
		var i, n, r, a = t.type,
			o = e.getMin(),
			s = e.getMax(),
			l = null != o,
			h = null != s,
			u = t.getExtent();
		"ordinal" === a ? i = e.getCategories().length : (O(n = e.get("boundaryGap")) || (n = [n || 0, n || 0]), "boolean" ==
				typeof n[0] && (n = [0, 0]), n[0] = hl(n[0], 1), n[1] = hl(n[1], 1), r = u[1] - u[0] || Math.abs(u[0])), null == o &&
			(o = "ordinal" === a ? i ? 0 : NaN : u[0] - n[0] * r), null == s && (s = "ordinal" === a ? i ? i - 1 : NaN : u[1] +
				n[1] * r), "dataMin" === o ? o = u[0] : "function" == typeof o && (o = o({
				min: u[0],
				max: u[1]
			})), "dataMax" === s ? s = u[1] : "function" == typeof s && (s = s({
				min: u[0],
				max: u[1]
			})), null != o && isFinite(o) || (o = NaN), null != s && isFinite(s) || (s = NaN), t.setBlank(F(o) || F(s) ||
				"ordinal" === a && !t.getOrdinalMeta().categories.length), e.getNeedCrossZero() && (0 < o && 0 < s && !l && (o = 0),
				o < 0 && s < 0 && !h && (s = 0));
		var c = e.ecModel;
		if (c && "time" === a) {
			var d, f = Yf("bar", c);
			if (D(f, function(t) {
					d |= t.getBaseAxis() === e.axis
				}), d) {
				var p = jf(f),
					g = function(t, e, i, n) {
						var r = i.axis.getExtent(),
							a = r[1] - r[0],
							o = qf(n, i.axis);
						if (void 0 === o) return {
							min: t,
							max: e
						};
						var s = 1 / 0;
						D(o, function(t) {
							s = Math.min(t.offset, s)
						});
						var l = -1 / 0;
						D(o, function(t) {
							l = Math.max(t.offset + t.width, l)
						}), s = Math.abs(s), l = Math.abs(l);
						var h = s + l,
							u = e - t,
							c = u / (1 - (s + l) / a) - u;
						return {
							min: t -= s / h * c,
							max: e += l / h * c
						}
					}(o, s, e, p);
				o = g.min, s = g.max
			}
		}
		return [o, s]
	}

	function yp(t, e) {
		var i = mp(t, e),
			n = null != e.getMin(),
			r = null != e.getMax(),
			a = e.get("splitNumber");
		"log" === t.type && (t.base = e.get("logBase"));
		var o = t.type;
		t.setExtent(i[0], i[1]), t.niceExtent({
			splitNumber: a,
			fixMin: n,
			fixMax: r,
			minInterval: "interval" === o || "time" === o ? e.get("minInterval") : null,
			maxInterval: "interval" === o || "time" === o ? e.get("maxInterval") : null
		});
		var s = e.get("interval");
		null != s && t.setInterval && t.setInterval(s)
	}

	function _p(t, e) {
		if (e = e || t.get("type")) switch (e) {
			case "category":
				return new Nf(t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(), [1 / 0, -1 / 0]);
			case "value":
				return new Gf;
			default:
				return (kf.getClass(e) || Gf).create(t)
		}
	}

	function xp(i) {
		var e, n = i.getLabelModel().get("formatter"),
			r = "category" === i.type ? i.scale.getExtent()[0] : null;
		return "string" == typeof n ? (e = n, n = function(t) {
			return t = i.scale.getLabel(t), e.replace("{value}", null != t ? t : "")
		}) : "function" == typeof n ? function(t, e) {
			return null != r && (e = t - r), n(wp(i, t), e)
		} : function(t) {
			return i.scale.getLabel(t)
		}
	}

	function wp(t, e) {
		return "category" === t.type ? t.scale.getLabel(e) : e
	}

	function bp(t) {
		var e = t.get("interval");
		return null == e ? "auto" : e
	}

	function Sp(t) {
		return "category" === t.type && 0 === bp(t.getLabelModel())
	}
	D(["contain", "normalize"], function(e) {
		gp.prototype[e] = function(t) {
			return t = pp(t) / pp(this.base), sp[e].call(this, t)
		}
	}), gp.create = function() {
		return new gp
	};
	var Mp = {
			getMin: function(t) {
				var e = this.option,
					i = t || null == e.rangeStart ? e.min : e.rangeStart;
				return this.axis && null != i && "dataMin" !== i && "function" != typeof i && !F(i) && (i = this.axis.scale.parse(
					i)), i
			},
			getMax: function(t) {
				var e = this.option,
					i = t || null == e.rangeEnd ? e.max : e.rangeEnd;
				return this.axis && null != i && "dataMax" !== i && "function" != typeof i && !F(i) && (i = this.axis.scale.parse(
					i)), i
			},
			getNeedCrossZero: function() {
				var t = this.option;
				return null == t.rangeStart && null == t.rangeEnd && !t.scale
			},
			getCoordSysModel: J,
			setRange: function(t, e) {
				this.option.rangeStart = t, this.option.rangeEnd = e
			},
			resetRange: function() {
				this.option.rangeStart = this.option.rangeEnd = null
			}
		},
		Ip = rs({
			type: "triangle",
			shape: {
				cx: 0,
				cy: 0,
				width: 0,
				height: 0
			},
			buildPath: function(t, e) {
				var i = e.cx,
					n = e.cy,
					r = e.width / 2,
					a = e.height / 2;
				t.moveTo(i, n - a), t.lineTo(i + r, n + a), t.lineTo(i - r, n + a), t.closePath()
			}
		}),
		Cp = rs({
			type: "diamond",
			shape: {
				cx: 0,
				cy: 0,
				width: 0,
				height: 0
			},
			buildPath: function(t, e) {
				var i = e.cx,
					n = e.cy,
					r = e.width / 2,
					a = e.height / 2;
				t.moveTo(i, n - a), t.lineTo(i + r, n), t.lineTo(i, n + a), t.lineTo(i - r, n), t.closePath()
			}
		}),
		Ap = rs({
			type: "pin",
			shape: {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			},
			buildPath: function(t, e) {
				var i = e.x,
					n = e.y,
					r = e.width / 5 * 3,
					a = Math.max(r, e.height),
					o = r / 2,
					s = o * o / (a - o),
					l = n - a + o + s,
					h = Math.asin(s / o),
					u = Math.cos(h) * o,
					c = Math.sin(h),
					d = Math.cos(h),
					f = .6 * o,
					p = .7 * o;
				t.moveTo(i - u, l + s), t.arc(i, l, o, Math.PI - h, 2 * Math.PI + h), t.bezierCurveTo(i + u - c * f, l + s + d *
					f, i, n - p, i, n), t.bezierCurveTo(i, n - p, i - u + c * f, l + s + d * f, i - u, l + s), t.closePath()
			}
		}),
		Tp = rs({
			type: "arrow",
			shape: {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			},
			buildPath: function(t, e) {
				var i = e.height,
					n = e.width,
					r = e.x,
					a = e.y,
					o = n / 3 * 2;
				t.moveTo(r, a), t.lineTo(r + o, a + i), t.lineTo(r, a + i / 4 * 3), t.lineTo(r - o, a + i), t.lineTo(r, a), t.closePath()
			}
		}),
		Dp = {
			line: function(t, e, i, n, r) {
				r.x1 = t, r.y1 = e + n / 2, r.x2 = t + i, r.y2 = e + n / 2
			},
			rect: function(t, e, i, n, r) {
				r.x = t, r.y = e, r.width = i, r.height = n
			},
			roundRect: function(t, e, i, n, r) {
				r.x = t, r.y = e, r.width = i, r.height = n, r.r = Math.min(i, n) / 4
			},
			square: function(t, e, i, n, r) {
				var a = Math.min(i, n);
				r.x = t, r.y = e, r.width = a, r.height = a
			},
			circle: function(t, e, i, n, r) {
				r.cx = t + i / 2, r.cy = e + n / 2, r.r = Math.min(i, n) / 2
			},
			diamond: function(t, e, i, n, r) {
				r.cx = t + i / 2, r.cy = e + n / 2, r.width = i, r.height = n
			},
			pin: function(t, e, i, n, r) {
				r.x = t + i / 2, r.y = e + n / 2, r.width = i, r.height = n
			},
			arrow: function(t, e, i, n, r) {
				r.x = t + i / 2, r.y = e + n / 2, r.width = i, r.height = n
			},
			triangle: function(t, e, i, n, r) {
				r.cx = t + i / 2, r.cy = e + n / 2, r.width = i, r.height = n
			}
		},
		kp = {};
	D({
		line: Bo,
		rect: No,
		roundRect: No,
		square: No,
		circle: So,
		diamond: Cp,
		pin: Ap,
		arrow: Tp,
		triangle: Ip
	}, function(t, e) {
		kp[e] = new t
	});
	var Pp = rs({
		type: "symbol",
		shape: {
			symbolType: "",
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		calculateTextPosition: function(t, e, i) {
			var n = on(t, e, i),
				r = this.shape;
			return r && "pin" === r.symbolType && "inside" === e.textPosition && (n.y = i.y + .4 * i.height), n
		},
		buildPath: function(t, e, i) {
			var n = e.symbolType;
			if ("none" !== n) {
				var r = kp[n];
				r = r || kp[n = "rect"], Dp[n](e.x, e.y, e.width, e.height, r.shape), r.buildPath(t, r.shape, i)
			}
		}
	});

	function Lp(t, e) {
		if ("image" !== this.type) {
			var i = this.style,
				n = this.shape;
			n && "line" === n.symbolType ? i.stroke = t : this.__isEmptyBrush ? (i.stroke = t, i.fill = e || "#fff") : (i.fill &&
				(i.fill = t), i.stroke && (i.stroke = t)), this.dirty(!1)
		}
	}

	function Op(t, e, i, n, r, a, o) {
		var s, l = 0 === t.indexOf("empty");
		return l && (t = t.substr(5, 1).toLowerCase() + t.substr(6)), (s = 0 === t.indexOf("image://") ? ls(t.slice(8), new vi(
			e, i, n, r), o ? "center" : "cover") : 0 === t.indexOf("path://") ? ss(t.slice(7), {}, new vi(e, i, n, r), o ?
			"center" : "cover") : new Pp({
			shape: {
				symbolType: t,
				x: e,
				y: i,
				width: n,
				height: r
			}
		})).__isEmptyBrush = l, s.setColor = Lp, s.setColor(a), s
	}
	var zp = {
		isDimensionStacked: Af,
		enableDataStack: Cf,
		getStackedDimension: Tf
	};
	var Ep = (Object.freeze || Object)({
			createList: function(t) {
				return Df(t.getSource(), t)
			},
			getLayoutRect: Zl,
			dataStack: zp,
			createScale: function(t, e) {
				var i = e;
				il.isInstance(e) || S(i = new il(e), Mp);
				var n = _p(i);
				return n.setExtent(t[0], t[1]), yp(n, i), n
			},
			mixinAxisModelCommonMethods: function(t) {
				S(t, Mp)
			},
			completeDimensions: Sf,
			createDimensions: If,
			createSymbol: Op
		}),
		Np = 1e-8;

	function Rp(t, e) {
		return Math.abs(t - e) < Np
	}

	function Bp(t, e, i) {
		var n = 0,
			r = t[0];
		if (!r) return !1;
		for (var a = 1; a < t.length; a++) {
			var o = t[a];
			n += Wa(r[0], r[1], o[0], o[1], e, i), r = o
		}
		var s = t[0];
		return Rp(r[0], s[0]) && Rp(r[1], s[1]) || (n += Wa(r[0], r[1], s[0], s[1], e, i)), 0 !== n
	}

	function Vp(t, e, i) {
		if (this.name = t, this.geometries = e, i) i = [i[0], i[1]];
		else {
			var n = this.getBoundingRect();
			i = [n.x + n.width / 2, n.y + n.height / 2]
		}
		this.center = i
	}

	function Fp(t, e, i) {
		for (var n = [], r = e[0], a = e[1], o = 0; o < t.length; o += 2) {
			var s = t.charCodeAt(o) - 64,
				l = t.charCodeAt(o + 1) - 64;
			s = s >> 1 ^ -(1 & s), l = l >> 1 ^ -(1 & l), r = s += r, a = l += a, n.push([s / i, l / i])
		}
		return n
	}
	Vp.prototype = {
		constructor: Vp,
		properties: null,
		getBoundingRect: function() {
			var t = this._rect;
			if (t) return t;
			for (var e = Number.MAX_VALUE, i = [e, e], n = [-e, -e], r = [], a = [], o = this.geometries, s = 0; s < o.length; s++) {
				if ("polygon" === o[s].type) ma(o[s].exterior, r, a), _t(i, i, r), xt(n, n, a)
			}
			return 0 === s && (i[0] = i[1] = n[0] = n[1] = 0), this._rect = new vi(i[0], i[1], n[0] - i[0], n[1] - i[1])
		},
		contain: function(t) {
			var e = this.getBoundingRect(),
				i = this.geometries;
			if (!e.contain(t[0], t[1])) return !1;
			t: for (var n = 0, r = i.length; n < r; n++)
				if ("polygon" === i[n].type) {
					var a = i[n].exterior,
						o = i[n].interiors;
					if (Bp(a, t[0], t[1])) {
						for (var s = 0; s < (o ? o.length : 0); s++)
							if (Bp(o[s])) continue t;
						return !0
					}
				}
			return !1
		},
		transformTo: function(t, e, i, n) {
			var r = this.getBoundingRect(),
				a = r.width / r.height;
			i ? n = n || i / a : i = a * n;
			for (var o = new vi(t, e, i, n), s = r.calculateTransform(o), l = this.geometries, h = 0; h < l.length; h++)
				if ("polygon" === l[h].type) {
					for (var u = l[h].exterior, c = l[h].interiors, d = 0; d < u.length; d++) yt(u[d], u[d], s);
					for (var f = 0; f < (c ? c.length : 0); f++)
						for (d = 0; d < c[f].length; d++) yt(c[f][d], c[f][d], s)
				}(r = this._rect). copy(o), this.center = [r.x + r.width / 2, r.y + r.height / 2]
		},
		cloneShallow: function(t) {
			null == t && (t = this.name);
			var e = new Vp(t, this.geometries, this.center);
			return e._rect = this._rect, e.transformTo = null, e
		}
	};

	function Hp(t) {
		return function(t) {
			if (!t.UTF8Encoding) return;
			var e = t.UTF8Scale;
			null == e && (e = 1024);
			for (var i = t.features, n = 0; n < i.length; n++)
				for (var r = i[n].geometry, a = r.coordinates, o = r.encodeOffsets, s = 0; s < a.length; s++) {
					var l = a[s];
					if ("Polygon" === r.type) a[s] = Fp(l, o[s], e);
					else if ("MultiPolygon" === r.type)
						for (var h = 0; h < l.length; h++) {
							var u = l[h];
							l[h] = Fp(u, o[s][h], e)
						}
				}
			t.UTF8Encoding = !1
		}(t), P(I(t.features, function(t) {
			return t.geometry && t.properties && 0 < t.geometry.coordinates.length
		}), function(t) {
			var e = t.properties,
				i = t.geometry,
				n = i.coordinates,
				r = [];
			"Polygon" === i.type && r.push({
				type: "polygon",
				exterior: n[0],
				interiors: n.slice(1)
			}), "MultiPolygon" === i.type && D(n, function(t) {
				t[0] && r.push({
					type: "polygon",
					exterior: t[0],
					interiors: t.slice(1)
				})
			});
			var a = new Vp(e.name, r, e.cp);
			return a.properties = e, a
		})
	}
	var Gp = Mr();

	function Wp(t) {
		return "category" === t.type ? function(t) {
			var e = t.getLabelModel(),
				i = Up(t, e);
			return !e.get("show") || t.scale.isBlank() ? {
				labels: [],
				labelCategoryInterval: i.labelCategoryInterval
			} : i
		}(t) : function(i) {
			var t = i.scale.getTicks(),
				n = xp(i);
			return {
				labels: P(t, function(t, e) {
					return {
						formattedLabel: n(t, e),
						rawLabel: i.scale.getLabel(t),
						tickValue: t
					}
				})
			}
		}(t)
	}

	function Zp(t, e) {
		return "category" === t.type ? function(t, e) {
			var i, n, r = Xp(t, "ticks"),
				a = bp(e),
				o = Yp(r, a);
			if (o) return o;
			e.get("show") && !t.scale.isBlank() || (i = []);
			if (z(a)) i = $p(t, a, !0);
			else if ("auto" === a) {
				var s = Up(t, t.getLabelModel());
				n = s.labelCategoryInterval, i = P(s.labels, function(t) {
					return t.tickValue
				})
			} else i = qp(t, n = a, !0);
			return jp(r, a, {
				ticks: i,
				tickCategoryInterval: n
			})
		}(t, e) : {
			ticks: t.scale.getTicks()
		}
	}

	function Up(t, e) {
		var i, n = Xp(t, "labels"),
			r = bp(e),
			a = Yp(n, r);
		return a || jp(n, r, {
			labels: z(r) ? $p(t, r) : qp(t, i = "auto" === r ? function(t) {
				var e = Gp(t).autoInterval;
				return null != e ? e : Gp(t).autoInterval = t.calculateCategoryInterval()
			}(t) : r),
			labelCategoryInterval: i
		})
	}

	function Xp(t, e) {
		return Gp(t)[e] || (Gp(t)[e] = [])
	}

	function Yp(t, e) {
		for (var i = 0; i < t.length; i++)
			if (t[i].key === e) return t[i].value
	}

	function jp(t, e, i) {
		return t.push({
			key: e,
			value: i
		}), i
	}

	function qp(t, e, i) {
		var n = xp(t),
			r = t.scale,
			a = r.getExtent(),
			o = t.getLabelModel(),
			s = [],
			l = Math.max((e || 0) + 1, 1),
			h = a[0],
			u = r.count();
		0 !== h && 1 < l && 2 < u / l && (h = Math.round(Math.ceil(h / l) * l));
		var c = Sp(t),
			d = o.get("showMinLabel") || c,
			f = o.get("showMaxLabel") || c;
		d && h !== a[0] && g(a[0]);
		for (var p = h; p <= a[1]; p += l) g(p);

		function g(t) {
			s.push(i ? t : {
				formattedLabel: n(t),
				rawLabel: r.getLabel(t),
				tickValue: t
			})
		}
		return f && p - l !== a[1] && g(a[1]), s
	}

	function $p(t, i, n) {
		var r = t.scale,
			a = xp(t),
			o = [];
		return D(r.getTicks(), function(t) {
			var e = r.getLabel(t);
			i(t, e) && o.push(n ? t : {
				formattedLabel: a(t),
				rawLabel: e,
				tickValue: t
			})
		}), o
	}

	function Kp(t, e, i) {
		this.dim = t, this.scale = e, this._extent = i || [0, 0], this.inverse = !1, this.onBand = !1
	}
	var Qp = [0, 1];

	function Jp(t, e) {
		var i = (t[1] - t[0]) / e / 2;
		t[0] += i, t[1] -= i
	}
	Kp.prototype = {
		constructor: Kp,
		contain: function(t) {
			var e = this._extent,
				i = Math.min(e[0], e[1]),
				n = Math.max(e[0], e[1]);
			return i <= t && t <= n
		},
		containData: function(t) {
			return this.contain(this.dataToCoord(t))
		},
		getExtent: function() {
			return this._extent.slice()
		},
		getPixelPrecision: function(t) {
			return pl(t || this.scale.getExtent(), this._extent)
		},
		setExtent: function(t, e) {
			var i = this._extent;
			i[0] = t, i[1] = e
		},
		dataToCoord: function(t, e) {
			var i = this._extent,
				n = this.scale;
			return t = n.normalize(t), this.onBand && "ordinal" === n.type && Jp(i = i.slice(), n.count()), ll(t, Qp, i, e)
		},
		coordToData: function(t, e) {
			var i = this._extent,
				n = this.scale;
			this.onBand && "ordinal" === n.type && Jp(i = i.slice(), n.count());
			var r = ll(t, i, Qp, e);
			return this.scale.scale(r)
		},
		pointToData: function(t, e) {},
		getTicksCoords: function(t) {
			var e = (t = t || {}).tickModel || this.getTickModel(),
				i = P(Zp(this, e).ticks, function(t) {
					return {
						coord: this.dataToCoord(t),
						tickValue: t
					}
				}, this);
			return function(t, e, i, n) {
				var r = e.length;
				if (!t.onBand || i || !r) return;
				var a, o, s = t.getExtent();
				if (1 === r) e[0].coord = s[0], a = e[1] = {
					coord: s[0]
				};
				else {
					var l = e[r - 1].tickValue - e[0].tickValue,
						h = (e[r - 1].coord - e[0].coord) / l;
					D(e, function(t) {
						t.coord -= h / 2
					});
					var u = t.scale.getExtent();
					o = 1 + u[1] - e[r - 1].tickValue, a = {
						coord: e[r - 1].coord + h * o
					}, e.push(a)
				}
				var c = s[0] > s[1];
				d(e[0].coord, s[0]) && (n ? e[0].coord = s[0] : e.shift());
				n && d(s[0], e[0].coord) && e.unshift({
					coord: s[0]
				});
				d(s[1], a.coord) && (n ? a.coord = s[1] : e.pop());
				n && d(a.coord, s[1]) && e.push({
					coord: s[1]
				});

				function d(t, e) {
					return t = ul(t), e = ul(e), c ? e < t : t < e
				}
			}(this, i, e.get("alignWithLabel"), t.clamp), i
		},
		getViewLabels: function() {
			return Wp(this).labels
		},
		getLabelModel: function() {
			return this.model.getModel("axisLabel")
		},
		getTickModel: function() {
			return this.model.getModel("axisTick")
		},
		getBandWidth: function() {
			var t = this._extent,
				e = this.scale.getExtent(),
				i = e[1] - e[0] + (this.onBand ? 1 : 0);
			0 === i && (i = 1);
			var n = Math.abs(t[1] - t[0]);
			return Math.abs(n) / i
		},
		isHorizontal: null,
		getRotate: null,
		calculateCategoryInterval: function() {
			return function(t) {
				var e = function(t) {
						var e = t.getLabelModel();
						return {
							axisRotate: t.getRotate ? t.getRotate() : t.isHorizontal && !t.isHorizontal() ? 90 : 0,
							labelRotate: e.get("rotate") || 0,
							font: e.getFont()
						}
					}(t),
					i = xp(t),
					n = (e.axisRotate - e.labelRotate) / 180 * Math.PI,
					r = t.scale,
					a = r.getExtent(),
					o = r.count();
				if (a[1] - a[0] < 1) return 0;
				var s = 1;
				40 < o && (s = Math.max(1, Math.floor(o / 40)));
				for (var l = a[0], h = t.dataToCoord(l + 1) - t.dataToCoord(l), u = Math.abs(h * Math.cos(n)), c = Math.abs(h *
						Math.sin(n)), d = 0, f = 0; l <= a[1]; l += s) {
					var p, g, v = nn(i(l), e.font, "center", "top");
					p = 1.3 * v.width, g = 1.3 * v.height, d = Math.max(d, p, 7), f = Math.max(f, g, 7)
				}
				var m = d / u,
					y = f / c;
				isNaN(m) && (m = 1 / 0), isNaN(y) && (y = 1 / 0);
				var _ = Math.max(0, Math.floor(Math.min(m, y))),
					x = Gp(t.model),
					w = t.getExtent(),
					b = x.lastAutoInterval,
					S = x.lastTickCount;
				return null != b && null != S && Math.abs(b - _) <= 1 && Math.abs(S - o) <= 1 && _ < b && x.axisExtend0 === w[0] &&
					x.axisExtend1 === w[1] ? _ = b : (x.lastTickCount = o, x.lastAutoInterval = _, x.axisExtend0 = w[0], x.axisExtend1 =
						w[1]), _
			}(this)
		}
	};
	var tg = Hp,
		eg = {};
	D(["map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString",
		"isObject", "isFunction", "extend", "defaults", "clone", "merge"
	], function(t) {
		eg[t] = tt[t]
	});
	var ig = {};

	function ng(t, e) {
		var i = t.mapDimension("defaultedLabel", !0),
			n = i.length;
		if (1 === n) return uu(t, e, i[0]);
		if (n) {
			for (var r = [], a = 0; a < i.length; a++) {
				var o = uu(t, e, i[a]);
				r.push(o)
			}
			return r.join(" ")
		}
	}

	function rg(t, e, i) {
		mi.call(this), this.updateData(t, e, i)
	}
	D(["extendShape", "extendPath", "makePath", "makeImage", "mergePath", "resizePath", "createIcon", "setHoverStyle",
		"setLabelStyle", "setTextStyle", "setText", "getFont", "updateProps", "initProps", "getTransform",
		"clipPointsByRect", "clipRectByRect", "registerShape", "getShapeClass", "Group", "Image", "Text", "Circle",
		"Sector", "Ring", "Polygon", "Polyline", "Rect", "Line", "BezierCurve", "Arc", "IncrementalDisplayable",
		"CompoundPath", "LinearGradient", "RadialGradient", "BoundingRect"
	], function(t) {
		ig[t] = qs[t]
	}), Tu.extend({
		type: "series.line",
		dependencies: ["grid", "polar"],
		getInitialData: function(t, e) {
			return Df(this.getSource(), this)
		},
		defaultOption: {
			zlevel: 0,
			z: 2,
			coordinateSystem: "cartesian2d",
			legendHoverLink: !0,
			hoverAnimation: !0,
			clip: !0,
			label: {
				position: "top"
			},
			lineStyle: {
				width: 2,
				type: "solid"
			},
			step: !1,
			smooth: !1,
			smoothMonotone: null,
			symbol: "emptyCircle",
			symbolSize: 4,
			symbolRotate: null,
			showSymbol: !0,
			showAllSymbol: "auto",
			connectNulls: !1,
			sampling: "none",
			animationEasing: "linear",
			progressive: 0,
			hoverLayerThreshold: 1 / 0
		}
	});
	var ag = rg.prototype,
		og = rg.getSymbolSize = function(t, e) {
			var i = t.getItemVisual(e, "symbolSize");
			return i instanceof Array ? i.slice() : [+i, +i]
		};

	function sg(t) {
		return [t[0] / 2, t[1] / 2]
	}

	function lg(t, e) {
		this.parent.drift(t, e)
	}
	ag._createSymbol = function(t, e, i, n, r) {
		this.removeAll();
		var a = Op(t, -1, -1, 2, 2, e.getItemVisual(i, "color"), r);
		a.attr({
			z2: 100,
			culling: !0,
			scale: sg(n)
		}), a.drift = lg, this._symbolType = t, this.add(a)
	}, ag.stopSymbolAnimation = function(t) {
		this.childAt(0).stopAnimation(t)
	}, ag.getSymbolPath = function() {
		return this.childAt(0)
	}, ag.getScale = function() {
		return this.childAt(0).scale
	}, ag.highlight = function() {
		this.childAt(0).trigger("emphasis")
	}, ag.downplay = function() {
		this.childAt(0).trigger("normal")
	}, ag.setZ = function(t, e) {
		var i = this.childAt(0);
		i.zlevel = t, i.z = e
	}, ag.setDraggable = function(t) {
		var e = this.childAt(0);
		e.draggable = t, e.cursor = t ? "move" : e.cursor
	}, ag.updateData = function(t, e, i) {
		this.silent = !1;
		var n = t.getItemVisual(e, "symbol") || "circle",
			r = t.hostModel,
			a = og(t, e),
			o = n !== this._symbolType;
		if (o) {
			var s = t.getItemVisual(e, "symbolKeepAspect");
			this._createSymbol(n, t, e, a, s)
		} else {
			(l = this.childAt(0)).silent = !1, Vs(l, {
				scale: sg(a)
			}, r, e)
		}
		if (this._updateCommon(t, e, a, i), o) {
			var l = this.childAt(0),
				h = i && i.fadeIn,
				u = {
					scale: l.scale.slice()
				};
			h && (u.style = {
				opacity: l.style.opacity
			}), l.scale = [0, 0], h && (l.style.opacity = 0), Fs(l, u, r, e)
		}
		this._seriesModel = r
	};
	var hg = ["itemStyle"],
		ug = ["emphasis", "itemStyle"],
		cg = ["label"],
		dg = ["emphasis", "label"];

	function fg(t, e) {
		if (!this.incremental && !this.useHoverLayer)
			if ("emphasis" === e) {
				var i = this.__symbolOriginalScale,
					n = i[1] / i[0],
					r = {
						scale: [Math.max(1.1 * i[0], i[0] + 3), Math.max(1.1 * i[1], i[1] + 3 * n)]
					};
				this.animateTo(r, 400, "elasticOut")
			} else "normal" === e && this.animateTo({
				scale: this.__symbolOriginalScale
			}, 400, "elasticOut")
	}

	function pg(t) {
		this.group = new mi, this._symbolCtor = t || rg
	}
	ag._updateCommon = function(i, t, e, n) {
		var r = this.childAt(0),
			a = i.hostModel,
			o = i.getItemVisual(t, "color");
		"image" !== r.type ? r.useStyle({
			strokeNoScale: !0
		}) : r.setStyle({
			opacity: null,
			shadowBlur: null,
			shadowOffsetX: null,
			shadowOffsetY: null,
			shadowColor: null
		});
		var s = n && n.itemStyle,
			l = n && n.hoverItemStyle,
			h = n && n.symbolRotate,
			u = n && n.symbolOffset,
			c = n && n.labelModel,
			d = n && n.hoverLabelModel,
			f = n && n.hoverAnimation,
			p = n && n.cursorStyle;
		if (!n || i.hasItemOption) {
			var g = n && n.itemModel ? n.itemModel : i.getItemModel(t);
			s = g.getModel(hg).getItemStyle(["color"]), l = g.getModel(ug).getItemStyle(), h = g.getShallow("symbolRotate"), u =
				g.getShallow("symbolOffset"), c = g.getModel(cg), d = g.getModel(dg), f = g.getShallow("hoverAnimation"), p = g.getShallow(
					"cursor")
		} else l = k({}, l);
		var v = r.style;
		r.attr("rotation", (h || 0) * Math.PI / 180 || 0), u && r.attr("position", [hl(u[0], e[0]), hl(u[1], e[1])]), p &&
			r.attr("cursor", p), r.setColor(o, n && n.symbolInnerColor), r.setStyle(s);
		var m = i.getItemVisual(t, "opacity");
		null != m && (v.opacity = m);
		var y = i.getItemVisual(t, "liftZ"),
			_ = r.__z2Origin;
		null != y ? null == _ && (r.__z2Origin = r.z2, r.z2 += y) : null != _ && (r.z2 = _, r.__z2Origin = null);
		var x = n && n.useNameLabel;
		ks(v, l, c, d, {
				labelFetcher: a,
				labelDataIndex: t,
				defaultText: function(t, e) {
					return x ? i.getName(t) : ng(i, t)
				},
				isRectText: !0,
				autoColor: o
			}), r.__symbolOriginalScale = sg(e), r.hoverStyle = l, r.highDownOnUpdate = f && a.isAnimationEnabled() ? fg :
			null, Cs(r)
	}, ag.fadeOut = function(t, e) {
		var i = this.childAt(0);
		this.silent = i.silent = !0, e && e.keepLabel || (i.style.text = null), Vs(i, {
			style: {
				opacity: 0
			},
			scale: [0, 0]
		}, this._seriesModel, this.dataIndex, t)
	}, w(rg, mi);
	var gg = pg.prototype;

	function vg(t, e, i, n) {
		return e && !isNaN(e[0]) && !isNaN(e[1]) && !(n.isIgnore && n.isIgnore(i)) && !(n.clipShape && !n.clipShape.contain(
			e[0], e[1])) && "none" !== t.getItemVisual(i, "symbol")
	}

	function mg(t) {
		return null == t || N(t) || (t = {
			isIgnore: t
		}), t || {}
	}

	function yg(t) {
		var e = t.hostModel;
		return {
			itemStyle: e.getModel("itemStyle").getItemStyle(["color"]),
			hoverItemStyle: e.getModel("emphasis.itemStyle").getItemStyle(),
			symbolRotate: e.get("symbolRotate"),
			symbolOffset: e.get("symbolOffset"),
			hoverAnimation: e.get("hoverAnimation"),
			labelModel: e.getModel("label"),
			hoverLabelModel: e.getModel("emphasis.label"),
			cursorStyle: e.get("cursor")
		}
	}

	function _g(t, e, i) {
		var n, r = t.getBaseAxis(),
			a = t.getOtherAxis(r),
			o = function(t, e) {
				var i = 0,
					n = t.scale.getExtent();
				"start" === e ? i = n[0] : "end" === e ? i = n[1] : 0 < n[0] ? i = n[0] : n[1] < 0 && (i = n[1]);
				return i
			}(a, i),
			s = r.dim,
			l = a.dim,
			h = e.mapDimension(l),
			u = e.mapDimension(s),
			c = "x" === l || "radius" === l ? 1 : 0,
			d = P(t.dimensions, function(t) {
				return e.mapDimension(t)
			}),
			f = e.getCalculationInfo("stackResultDimension");
		return (n |= Af(e, d[0])) && (d[0] = f), (n |= Af(e, d[1])) && (d[1] = f), {
			dataDimsForPoint: d,
			valueStart: o,
			valueAxisDim: l,
			baseAxisDim: s,
			stacked: !!n,
			valueDim: h,
			baseDim: u,
			baseDataOffset: c,
			stackedOverDimension: e.getCalculationInfo("stackedOverDimension")
		}
	}

	function xg(t, e, i, n) {
		var r = NaN;
		t.stacked && (r = i.get(i.getCalculationInfo("stackedOverDimension"), n)), isNaN(r) && (r = t.valueStart);
		var a = t.baseDataOffset,
			o = [];
		return o[a] = i.get(t.baseDim, n), o[1 - a] = r, e.dataToPoint(o)
	}
	gg.updateData = function(r, a) {
		a = mg(a);
		var o = this.group,
			s = r.hostModel,
			l = this._data,
			h = this._symbolCtor,
			u = yg(r);
		l || o.removeAll(), r.diff(l).add(function(t) {
			var e = r.getItemLayout(t);
			if (vg(r, e, t, a)) {
				var i = new h(r, t, u);
				i.attr("position", e), r.setItemGraphicEl(t, i), o.add(i)
			}
		}).update(function(t, e) {
			var i = l.getItemGraphicEl(e),
				n = r.getItemLayout(t);
			vg(r, n, t, a) ? (i ? (i.updateData(r, t, u), Vs(i, {
				position: n
			}, s)) : (i = new h(r, t)).attr("position", n), o.add(i), r.setItemGraphicEl(t, i)) : o.remove(i)
		}).remove(function(t) {
			var e = l.getItemGraphicEl(t);
			e && e.fadeOut(function() {
				o.remove(e)
			})
		}).execute(), this._data = r
	}, gg.isPersistent = function() {
		return !0
	}, gg.updateLayout = function() {
		var n = this._data;
		n && n.eachItemGraphicEl(function(t, e) {
			var i = n.getItemLayout(e);
			t.attr("position", i)
		})
	}, gg.incrementalPrepareUpdate = function(t) {
		this._seriesScope = yg(t), this._data = null, this.group.removeAll()
	}, gg.incrementalUpdate = function(t, e, i) {
		function n(t) {
			t.isGroup || (t.incremental = t.useHoverLayer = !0)
		}
		i = mg(i);
		for (var r = t.start; r < t.end; r++) {
			var a = e.getItemLayout(r);
			if (vg(e, a, r, i)) {
				var o = new this._symbolCtor(e, r, this._seriesScope);
				o.traverse(n), o.attr("position", a), this.group.add(o), e.setItemGraphicEl(r, o)
			}
		}
	}, gg.remove = function(t) {
		var e = this.group,
			i = this._data;
		i && t ? i.eachItemGraphicEl(function(t) {
			t.fadeOut(function() {
				e.remove(t)
			})
		}) : e.removeAll()
	};
	var wg = _t,
		bg = xt,
		Sg = ot,
		Mg = nt,
		Ig = [],
		Cg = [],
		Ag = [];

	function Tg(t) {
		return isNaN(t[0]) || isNaN(t[1])
	}

	function Dg(t, e, i, n, r, a, o, s, l, h) {
		return "none" !== h && h ? function(t, e, i, n, r, a, o, s, l, h, u) {
			for (var c = 0, d = i, f = 0; f < n; f++) {
				var p = e[d];
				if (r <= d || d < 0) break;
				if (Tg(p)) {
					if (u) {
						d += a;
						continue
					}
					break
				}
				if (d === i) t[0 < a ? "moveTo" : "lineTo"](p[0], p[1]);
				else if (0 < l) {
					var g = e[c],
						v = "y" === h ? 1 : 0,
						m = (p[v] - g[v]) * l;
					Mg(Cg, g), Cg[v] = g[v] + m, Mg(Ag, p), Ag[v] = p[v] - m, t.bezierCurveTo(Cg[0], Cg[1], Ag[0], Ag[1], p[0], p[1])
				} else t.lineTo(p[0], p[1]);
				c = d, d += a
			}
			return f
		}.apply(this, arguments) : function(t, e, i, n, r, a, o, s, l, h, u) {
			for (var c = 0, d = i, f = 0; f < n; f++) {
				var p = e[d];
				if (r <= d || d < 0) break;
				if (Tg(p)) {
					if (u) {
						d += a;
						continue
					}
					break
				}
				if (d === i) t[0 < a ? "moveTo" : "lineTo"](p[0], p[1]), Mg(Cg, p);
				else if (0 < l) {
					var g = d + a,
						v = e[g];
					if (u)
						for (; v && Tg(e[g]);) v = e[g += a];
					var m = .5,
						y = e[c];
					if (!(v = e[g]) || Tg(v)) Mg(Ag, p);
					else {
						var _, x;
						if (Tg(v) && !u && (v = p), st(Ig, v, y), "x" === h || "y" === h) {
							var w = "x" === h ? 0 : 1;
							_ = Math.abs(p[w] - y[w]), x = Math.abs(p[w] - v[w])
						} else _ = gt(p, y), x = gt(p, v);
						Sg(Ag, p, Ig, -l * (1 - (m = x / (x + _))))
					}
					wg(Cg, Cg, s), bg(Cg, Cg, o), wg(Ag, Ag, s), bg(Ag, Ag, o), t.bezierCurveTo(Cg[0], Cg[1], Ag[0], Ag[1], p[0], p[
						1]), Sg(Cg, p, Ig, l * m)
				} else t.lineTo(p[0], p[1]);
				c = d, d += a
			}
			return f
		}.apply(this, arguments)
	}

	function kg(t, e) {
		var i = [1 / 0, 1 / 0],
			n = [-1 / 0, -1 / 0];
		if (e)
			for (var r = 0; r < t.length; r++) {
				var a = t[r];
				a[0] < i[0] && (i[0] = a[0]), a[1] < i[1] && (i[1] = a[1]), a[0] > n[0] && (n[0] = a[0]), a[1] > n[1] && (n[1] = a[
					1])
			}
		return {
			min: e ? i : n,
			max: e ? n : i
		}
	}
	var Pg = io.extend({
			type: "ec-polyline",
			shape: {
				points: [],
				smooth: 0,
				smoothConstraint: !0,
				smoothMonotone: null,
				connectNulls: !1
			},
			style: {
				fill: null,
				stroke: "#000"
			},
			brush: bo(io.prototype.brush),
			buildPath: function(t, e) {
				var i = e.points,
					n = 0,
					r = i.length,
					a = kg(i, e.smoothConstraint);
				if (e.connectNulls) {
					for (; 0 < r && Tg(i[r - 1]); r--);
					for (; n < r && Tg(i[n]); n++);
				}
				for (; n < r;) n += Dg(t, i, n, r, r, 1, a.min, a.max, e.smooth, e.smoothMonotone, e.connectNulls) + 1
			}
		}),
		Lg = io.extend({
			type: "ec-polygon",
			shape: {
				points: [],
				stackedOnPoints: [],
				smooth: 0,
				stackedOnSmooth: 0,
				smoothConstraint: !0,
				smoothMonotone: null,
				connectNulls: !1
			},
			brush: bo(io.prototype.brush),
			buildPath: function(t, e) {
				var i = e.points,
					n = e.stackedOnPoints,
					r = 0,
					a = i.length,
					o = e.smoothMonotone,
					s = kg(i, e.smoothConstraint),
					l = kg(n, e.smoothConstraint);
				if (e.connectNulls) {
					for (; 0 < a && Tg(i[a - 1]); a--);
					for (; r < a && Tg(i[r]); r++);
				}
				for (; r < a;) {
					var h = Dg(t, i, r, a, a, 1, s.min, s.max, e.smooth, o, e.connectNulls);
					Dg(t, n, r + h - 1, h, a, -1, l.min, l.max, e.stackedOnSmooth, o, e.connectNulls), r += h + 1, t.closePath()
				}
			}
		});

	function Og(t, e, i) {
		var n = t.getArea(),
			r = t.getBaseAxis().isHorizontal(),
			a = n.x,
			o = n.y,
			s = n.width,
			l = n.height,
			h = i.get("lineStyle.width") || 2,
			u = new No({
				shape: {
					x: a -= h / 2,
					y: o -= h / 2,
					width: s += h,
					height: l += h
				}
			});
		return e && (u.shape[r ? "width" : "height"] = 0, Fs(u, {
			shape: {
				width: s,
				height: l
			}
		}, i)), u
	}

	function zg(t, e, i) {
		var n = t.getArea(),
			r = new Io({
				shape: {
					cx: ul(t.cx, 1),
					cy: ul(t.cy, 1),
					r0: ul(n.r0, 1),
					r: ul(n.r, 1),
					startAngle: n.startAngle,
					endAngle: n.endAngle,
					clockwise: n.clockwise
				}
			});
		return e && (r.shape.endAngle = n.startAngle, Fs(r, {
			shape: {
				endAngle: n.endAngle
			}
		}, i)), r
	}

	function Eg(t, e) {
		if (t.length === e.length) {
			for (var i = 0; i < t.length; i++) {
				var n = t[i],
					r = e[i];
				if (n[0] !== r[0] || n[1] !== r[1]) return
			}
			return !0
		}
	}

	function Ng(t) {
		return "number" == typeof t ? t : t ? .5 : 0
	}

	function Rg(t, e, i) {
		for (var n = e.getBaseAxis(), r = "x" === n.dim || "radius" === n.dim ? 0 : 1, a = [], o = 0; o < t.length - 1; o++) {
			var s = t[o + 1],
				l = t[o];
			a.push(l);
			var h = [];
			switch (i) {
				case "end":
					h[r] = s[r], h[1 - r] = l[1 - r], a.push(h);
					break;
				case "middle":
					var u = (l[r] + s[r]) / 2,
						c = [];
					h[r] = c[r] = u, h[1 - r] = l[1 - r], c[1 - r] = s[1 - r], a.push(h), a.push(c);
					break;
				default:
					h[r] = l[r], h[1 - r] = s[1 - r], a.push(h)
			}
		}
		return t[o] && a.push(t[o]), a
	}

	function Bg(t, e, i) {
		var n = t.get("showAllSymbol"),
			r = "auto" === n;
		if (!n || r) {
			var a = i.getAxesByScale("ordinal")[0];
			if (a && (!r || ! function(t, e) {
					var i = t.getExtent(),
						n = Math.abs(i[1] - i[0]) / t.scale.count();
					isNaN(n) && (n = 0);
					for (var r = e.count(), a = Math.max(1, Math.round(r / 5)), o = 0; o < r; o += a)
						if (1.5 * rg.getSymbolSize(e, o)[t.isHorizontal() ? 1 : 0] > n) return !1;
					return !0
				}(a, e))) {
				var o = e.mapDimension(a.dim),
					s = {};
				return D(a.getViewLabels(), function(t) {
						s[t.tickValue] = 1
					}),
					function(t) {
						return !s.hasOwnProperty(e.get(o, t))
					}
			}
		}
	}

	function Vg(t, e, i) {
		if ("cartesian2d" !== t.type) return zg(t, e, i);
		var n = t.getBaseAxis().isHorizontal(),
			r = Og(t, e, i);
		if (!i.get("clip", !0)) {
			var a = r.shape,
				o = Math.max(a.width, a.height);
			n ? (a.y -= o, a.height += 2 * o) : (a.x -= o, a.width += 2 * o)
		}
		return r
	}
	Hu.extend({
		type: "line",
		init: function() {
			var t = new mi,
				e = new pg;
			this.group.add(e.group), this._symbolDraw = e, this._lineGroup = t
		},
		render: function(t, e, i) {
			var n = t.coordinateSystem,
				r = this.group,
				a = t.getData(),
				o = t.getModel("lineStyle"),
				s = t.getModel("areaStyle"),
				l = a.mapArray(a.getItemLayout),
				h = "polar" === n.type,
				u = this._coordSys,
				c = this._symbolDraw,
				d = this._polyline,
				f = this._polygon,
				p = this._lineGroup,
				g = t.get("animation"),
				v = !s.isEmpty(),
				m = s.get("origin"),
				y = function(t, e, i) {
					if (!i.valueDim) return [];
					for (var n = [], r = 0, a = e.count(); r < a; r++) n.push(xg(i, t, e, r));
					return n
				}(n, a, _g(n, a, m)),
				_ = t.get("showSymbol"),
				x = _ && !h && Bg(t, a, n),
				w = this._data;
			w && w.eachItemGraphicEl(function(t, e) {
				t.__temp && (r.remove(t), w.setItemGraphicEl(e, null))
			}), _ || c.remove(), r.add(p);
			var b, S = !h && t.get("step");
			n && n.getArea && (null != (b = n.getArea()).width ? (b.x -= .1, b.y -= .1, b.width += .2, b.height += .2) : b.r0 &&
				(b.r0 -= .5, b.r1 += .5)), d && u.type === n.type && S === this._step ? (v && !f ? f = this._newPolygon(l, y,
				n, g) : f && !v && (p.remove(f), f = this._polygon = null), p.setClipPath(Vg(n, !1, t)), _ && c.updateData(a, {
				isIgnore: x,
				clipShape: b
			}), a.eachItemGraphicEl(function(t) {
				t.stopAnimation(!0)
			}), Eg(this._stackedOnPoints, y) && Eg(this._points, l) || (g ? this._updateAnimation(a, y, n, i, S, m) : (S &&
				(l = Rg(l, n, S), y = Rg(y, n, S)), d.setShape({
					points: l
				}), f && f.setShape({
					points: l,
					stackedOnPoints: y
				})))) : (_ && c.updateData(a, {
				isIgnore: x,
				clipShape: b
			}), S && (l = Rg(l, n, S), y = Rg(y, n, S)), d = this._newPolyline(l, n, g), v && (f = this._newPolygon(l, y,
				n, g)), p.setClipPath(Vg(n, !0, t)));
			var M = function(t, e) {
				var i = t.getVisual("visualMeta");
				if (i && i.length && t.count() && "cartesian2d" === e.type) {
					for (var n, r, a = i.length - 1; 0 <= a; a--) {
						var o = i[a].dimension,
							s = t.dimensions[o],
							l = t.getDimensionInfo(s);
						if ("x" === (n = l && l.coordDim) || "y" === n) {
							r = i[a];
							break
						}
					}
					if (r) {
						var h = e.getAxis(n),
							u = P(r.stops, function(t) {
								return {
									coord: h.toGlobalCoord(h.dataToCoord(t.value)),
									color: t.color
								}
							}),
							c = u.length,
							d = r.outerColors.slice();
						c && u[0].coord > u[c - 1].coord && (u.reverse(), d.reverse());
						var f = u[0].coord - 10,
							p = u[c - 1].coord + 10,
							g = p - f;
						if (g < .001) return "transparent";
						D(u, function(t) {
							t.offset = (t.coord - f) / g
						}), u.push({
							offset: c ? u[c - 1].offset : .5,
							color: d[1] || "transparent"
						}), u.unshift({
							offset: c ? u[0].offset : .5,
							color: d[0] || "transparent"
						});
						var v = new Uo(0, 0, 0, 0, u, !0);
						return v[n] = f, v[n + "2"] = p, v
					}
				}
			}(a, n) || a.getVisual("color");
			d.useStyle(T(o.getLineStyle(), {
				fill: "none",
				stroke: M,
				lineJoin: "bevel"
			}));
			var I = t.get("smooth");
			if (I = Ng(t.get("smooth")), d.setShape({
					smooth: I,
					smoothMonotone: t.get("smoothMonotone"),
					connectNulls: t.get("connectNulls")
				}), f) {
				var C = a.getCalculationInfo("stackedOnSeries"),
					A = 0;
				f.useStyle(T(s.getAreaStyle(), {
					fill: M,
					opacity: .7,
					lineJoin: "bevel"
				})), C && (A = Ng(C.get("smooth"))), f.setShape({
					smooth: I,
					stackedOnSmooth: A,
					smoothMonotone: t.get("smoothMonotone"),
					connectNulls: t.get("connectNulls")
				})
			}
			this._data = a, this._coordSys = n, this._stackedOnPoints = y, this._points = l, this._step = S, this._valueOrigin =
				m
		},
		dispose: function() {},
		highlight: function(t, e, i, n) {
			var r = t.getData(),
				a = Sr(r, n);
			if (!(a instanceof Array) && null != a && 0 <= a) {
				var o = r.getItemGraphicEl(a);
				if (!o) {
					var s = r.getItemLayout(a);
					if (!s) return;
					(o = new rg(r, a)).position = s, o.setZ(t.get("zlevel"), t.get("z")), o.ignore = isNaN(s[0]) || isNaN(s[1]), o
						.__temp = !0, r.setItemGraphicEl(a, o), o.stopSymbolAnimation(!0), this.group.add(o)
				}
				o.highlight()
			} else Hu.prototype.highlight.call(this, t, e, i, n)
		},
		downplay: function(t, e, i, n) {
			var r = t.getData(),
				a = Sr(r, n);
			if (null != a && 0 <= a) {
				var o = r.getItemGraphicEl(a);
				o && (o.__temp ? (r.setItemGraphicEl(a, null), this.group.remove(o)) : o.downplay())
			} else Hu.prototype.downplay.call(this, t, e, i, n)
		},
		_newPolyline: function(t) {
			var e = this._polyline;
			return e && this._lineGroup.remove(e), e = new Pg({
				shape: {
					points: t
				},
				silent: !0,
				z2: 10
			}), this._lineGroup.add(e), this._polyline = e
		},
		_newPolygon: function(t, e) {
			var i = this._polygon;
			return i && this._lineGroup.remove(i), i = new Lg({
				shape: {
					points: t,
					stackedOnPoints: e
				},
				silent: !0
			}), this._lineGroup.add(i), this._polygon = i
		},
		_updateAnimation: function(t, e, i, n, r, a) {
			var o = this._polyline,
				s = this._polygon,
				l = t.hostModel,
				h = function(t, e, i, n, r, a, o, s) {
					for (var l = function(t, e) {
							var i = [];
							return e.diff(t).add(function(t) {
								i.push({
									cmd: "+",
									idx: t
								})
							}).update(function(t, e) {
								i.push({
									cmd: "=",
									idx: e,
									idx1: t
								})
							}).remove(function(t) {
								i.push({
									cmd: "-",
									idx: t
								})
							}).execute(), i
						}(t, e), h = [], u = [], c = [], d = [], f = [], p = [], g = [], v = _g(r, e, o), m = _g(a, t, s), y = 0; y <
						l.length; y++) {
						var _ = l[y],
							x = !0;
						switch (_.cmd) {
							case "=":
								var w = t.getItemLayout(_.idx),
									b = e.getItemLayout(_.idx1);
								(isNaN(w[0]) || isNaN(w[1])) && (w = b.slice()), h.push(w), u.push(b), c.push(i[_.idx]), d.push(n[_.idx1]),
									g.push(e.getRawIndex(_.idx1));
								break;
							case "+":
								var S = _.idx;
								h.push(r.dataToPoint([e.get(v.dataDimsForPoint[0], S), e.get(v.dataDimsForPoint[1], S)])), u.push(e.getItemLayout(
									S).slice()), c.push(xg(v, r, e, S)), d.push(n[S]), g.push(e.getRawIndex(S));
								break;
							case "-":
								S = _.idx;
								var M = t.getRawIndex(S);
								M !== S ? (h.push(t.getItemLayout(S)), u.push(a.dataToPoint([t.get(m.dataDimsForPoint[0], S), t.get(m.dataDimsForPoint[
									1], S)])), c.push(i[S]), d.push(xg(m, a, t, S)), g.push(M)) : x = !1
						}
						x && (f.push(_), p.push(p.length))
					}
					p.sort(function(t, e) {
						return g[t] - g[e]
					});
					var I = [],
						C = [],
						A = [],
						T = [],
						D = [];
					for (y = 0; y < p.length; y++) {
						S = p[y];
						I[y] = h[S], C[y] = u[S], A[y] = c[S], T[y] = d[S], D[y] = f[S]
					}
					return {
						current: I,
						next: C,
						stackedOnCurrent: A,
						stackedOnNext: T,
						status: D
					}
				}(this._data, t, this._stackedOnPoints, e, this._coordSys, i, this._valueOrigin, a),
				u = h.current,
				c = h.stackedOnCurrent,
				d = h.next,
				f = h.stackedOnNext;
			r && (u = Rg(h.current, i, r), c = Rg(h.stackedOnCurrent, i, r), d = Rg(h.next, i, r), f = Rg(h.stackedOnNext, i,
				r)), o.shape.__points = h.current, o.shape.points = u, Vs(o, {
				shape: {
					points: d
				}
			}, l), s && (s.setShape({
				points: u,
				stackedOnPoints: c
			}), Vs(s, {
				shape: {
					points: d,
					stackedOnPoints: f
				}
			}, l));
			for (var p = [], g = h.status, v = 0; v < g.length; v++) {
				if ("=" === g[v].cmd) {
					var m = t.getItemGraphicEl(g[v].idx1);
					m && p.push({
						el: m,
						ptIdx: v
					})
				}
			}
			o.animators && o.animators.length && o.animators[0].during(function() {
				for (var t = 0; t < p.length; t++) {
					p[t].el.attr("position", o.shape.__points[p[t].ptIdx])
				}
			})
		},
		remove: function(t) {
			var i = this.group,
				n = this._data;
			this._lineGroup.removeAll(), this._symbolDraw.remove(!0), n && n.eachItemGraphicEl(function(t, e) {
				t.__temp && (i.remove(t), n.setItemGraphicEl(e, null))
			}), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null
		}
	});

	function Fg(t, o, s) {
		return {
			seriesType: t,
			performRawSeries: !0,
			reset: function(l, t, e) {
				var i = l.getData(),
					h = l.get("symbol"),
					u = l.get("symbolSize"),
					n = l.get("symbolKeepAspect"),
					c = z(h),
					d = z(u),
					f = c || d,
					r = !c && h ? h : o,
					a = d ? null : u;
				if (i.setVisual({
						legendSymbol: s || r,
						symbol: r,
						symbolSize: a,
						symbolKeepAspect: n
					}), !t.isSeriesFiltered(l)) return {
					dataEach: i.hasItemOption || f ? function(t, e) {
						if (f) {
							var i = l.getRawValue(e),
								n = l.getDataParams(e);
							c && t.setItemVisual(e, "symbol", h(i, n)), d && t.setItemVisual(e, "symbolSize", u(i, n))
						}
						if (t.hasItemOption) {
							var r = t.getItemModel(e),
								a = r.getShallow("symbol", !0),
								o = r.getShallow("symbolSize", !0),
								s = r.getShallow("symbolKeepAspect", !0);
							null != a && t.setItemVisual(e, "symbol", a), null != o && t.setItemVisual(e, "symbolSize", o), null != s &&
								t.setItemVisual(e, "symbolKeepAspect", s)
						}
					} : null
				}
			}
		}
	}

	function Hg(t) {
		return {
			seriesType: t,
			plan: Bu(),
			reset: function(t) {
				var e = t.getData(),
					c = t.coordinateSystem,
					d = t.pipelineContext.large;
				if (c) {
					var f = P(c.dimensions, function(t) {
							return e.mapDimension(t)
						}).slice(0, 2),
						p = f.length,
						i = e.getCalculationInfo("stackResultDimension");
					return Af(e, f[0]) && (f[0] = i), Af(e, f[1]) && (f[1] = i), p && {
						progress: function(t, e) {
							for (var i = t.end - t.start, n = d && new Float32Array(i * p), r = t.start, a = 0, o = [], s = []; r < t.end; r++) {
								var l;
								if (1 === p) {
									var h = e.get(f[0], r);
									l = !isNaN(h) && c.dataToPoint(h, null, s)
								} else {
									h = o[0] = e.get(f[0], r);
									var u = o[1] = e.get(f[1], r);
									l = !isNaN(h) && !isNaN(u) && c.dataToPoint(o, null, s)
								}
								d ? (n[a++] = l ? l[0] : NaN, n[a++] = l ? l[1] : NaN) : e.setItemLayout(r, l && l.slice() || [NaN, NaN])
							}
							d && e.setLayout("symbolPoints", n)
						}
					}
				}
			}
		}
	}

	function Gg(t, e) {
		return Math.round(t.length / 2)
	}
	var Wg = {
		average: function(t) {
			for (var e = 0, i = 0, n = 0; n < t.length; n++) isNaN(t[n]) || (e += t[n], i++);
			return 0 === i ? NaN : e / i
		},
		sum: function(t) {
			for (var e = 0, i = 0; i < t.length; i++) e += t[i] || 0;
			return e
		},
		max: function(t) {
			for (var e = -1 / 0, i = 0; i < t.length; i++) t[i] > e && (e = t[i]);
			return isFinite(e) ? e : NaN
		},
		min: function(t) {
			for (var e = 1 / 0, i = 0; i < t.length; i++) t[i] < e && (e = t[i]);
			return isFinite(e) ? e : NaN
		},
		nearest: function(t) {
			return t[0]
		}
	};

	function Zg(t) {
		return this._axes[t]
	}

	function Ug(t) {
		this._axes = {}, this._dimList = [], this.name = t || ""
	}

	function Xg(t) {
		Ug.call(this, t)
	}
	Ug.prototype = {
		constructor: Ug,
		type: "cartesian",
		getAxis: function(t) {
			return this._axes[t]
		},
		getAxes: function() {
			return P(this._dimList, Zg, this)
		},
		getAxesByScale: function(e) {
			return e = e.toLowerCase(), I(this.getAxes(), function(t) {
				return t.scale.type === e
			})
		},
		addAxis: function(t) {
			var e = t.dim;
			this._axes[e] = t, this._dimList.push(e)
		},
		dataToCoord: function(t) {
			return this._dataCoordConvert(t, "dataToCoord")
		},
		coordToData: function(t) {
			return this._dataCoordConvert(t, "coordToData")
		},
		_dataCoordConvert: function(t, e) {
			for (var i = this._dimList, n = t instanceof Array ? [] : {}, r = 0; r < i.length; r++) {
				var a = i[r],
					o = this._axes[a];
				n[a] = o[e](t[a])
			}
			return n
		}
	}, Xg.prototype = {
		constructor: Xg,
		type: "cartesian2d",
		dimensions: ["x", "y"],
		getBaseAxis: function() {
			return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x")
		},
		containPoint: function(t) {
			var e = this.getAxis("x"),
				i = this.getAxis("y");
			return e.contain(e.toLocalCoord(t[0])) && i.contain(i.toLocalCoord(t[1]))
		},
		containData: function(t) {
			return this.getAxis("x").containData(t[0]) && this.getAxis("y").containData(t[1])
		},
		dataToPoint: function(t, e, i) {
			var n = this.getAxis("x"),
				r = this.getAxis("y");
			return (i = i || [])[0] = n.toGlobalCoord(n.dataToCoord(t[0])), i[1] = r.toGlobalCoord(r.dataToCoord(t[1])), i
		},
		clampData: function(t, e) {
			var i = this.getAxis("x").scale,
				n = this.getAxis("y").scale,
				r = i.getExtent(),
				a = n.getExtent(),
				o = i.parse(t[0]),
				s = n.parse(t[1]);
			return (e = e || [])[0] = Math.min(Math.max(Math.min(r[0], r[1]), o), Math.max(r[0], r[1])), e[1] = Math.min(Math
				.max(Math.min(a[0], a[1]), s), Math.max(a[0], a[1])), e
		},
		pointToData: function(t, e) {
			var i = this.getAxis("x"),
				n = this.getAxis("y");
			return (e = e || [])[0] = i.coordToData(i.toLocalCoord(t[0])), e[1] = n.coordToData(n.toLocalCoord(t[1])), e
		},
		getOtherAxis: function(t) {
			return this.getAxis("x" === t.dim ? "y" : "x")
		},
		getArea: function() {
			var t = this.getAxis("x").getGlobalExtent(),
				e = this.getAxis("y").getGlobalExtent(),
				i = Math.min(t[0], t[1]),
				n = Math.min(e[0], e[1]);
			return new vi(i, n, Math.max(t[0], t[1]) - i, Math.max(e[0], e[1]) - n)
		}
	}, w(Xg, Ug);

	function Yg(t, e, i, n, r) {
		Kp.call(this, t, e, i), this.type = n || "value", this.position = r || "bottom"
	}
	Yg.prototype = {
		constructor: Yg,
		index: 0,
		getAxesOnZeroOf: null,
		model: null,
		isHorizontal: function() {
			var t = this.position;
			return "top" === t || "bottom" === t
		},
		getGlobalExtent: function(t) {
			var e = this.getExtent();
			return e[0] = this.toGlobalCoord(e[0]), e[1] = this.toGlobalCoord(e[1]), t && e[0] > e[1] && e.reverse(), e
		},
		getOtherAxis: function() {
			this.grid.getOtherAxis()
		},
		pointToData: function(t, e) {
			return this.coordToData(this.toLocalCoord(t["x" === this.dim ? 0 : 1]), e)
		},
		toLocalCoord: null,
		toGlobalCoord: null
	}, w(Yg, Kp);
	var jg = {
			show: !0,
			zlevel: 0,
			z: 0,
			inverse: !1,
			name: "",
			nameLocation: "end",
			nameRotate: null,
			nameTruncate: {
				maxWidth: null,
				ellipsis: "...",
				placeholder: "."
			},
			nameTextStyle: {},
			nameGap: 15,
			silent: !1,
			triggerEvent: !1,
			tooltip: {
				show: !1
			},
			axisPointer: {},
			axisLine: {
				show: !0,
				onZero: !0,
				onZeroAxisIndex: null,
				lineStyle: {
					color: "#333",
					width: 1,
					type: "solid"
				},
				symbol: ["none", "none"],
				symbolSize: [10, 15]
			},
			axisTick: {
				show: !0,
				inside: !1,
				length: 5,
				lineStyle: {
					width: 1
				}
			},
			axisLabel: {
				show: !0,
				inside: !1,
				rotate: 0,
				showMinLabel: null,
				showMaxLabel: null,
				margin: 8,
				fontSize: 12
			},
			splitLine: {
				show: !0,
				lineStyle: {
					color: ["#ccc"],
					width: 1,
					type: "solid"
				}
			},
			splitArea: {
				show: !1,
				areaStyle: {
					color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
				}
			}
		},
		qg = {};
	qg.categoryAxis = v({
		boundaryGap: !0,
		deduplication: null,
		splitLine: {
			show: !1
		},
		axisTick: {
			alignWithLabel: !1,
			interval: "auto"
		},
		axisLabel: {
			interval: "auto"
		}
	}, jg), qg.valueAxis = v({
		boundaryGap: [0, 0],
		splitNumber: 5
	}, jg), qg.timeAxis = T({
		scale: !0,
		min: "dataMin",
		max: "dataMax"
	}, qg.valueAxis), qg.logAxis = T({
		scale: !0,
		logBase: 10
	}, qg.valueAxis);

	function $g(a, t, o, e) {
		D(Kg, function(r) {
			t.extend({
				type: a + "Axis." + r,
				mergeDefaultAndTheme: function(t, e) {
					var i = this.layoutMode,
						n = i ? Yl(t) : {};
					v(t, e.getTheme().get(r + "Axis")), v(t, this.getDefaultOption()), t.type = o(a, t), i && Xl(t, n, i)
				},
				optionUpdated: function() {
					"category" === this.option.type && (this.__ordinalMeta = Pf.createByAxisModel(this))
				},
				getCategories: function(t) {
					var e = this.option;
					if ("category" === e.type) return t ? e.data : this.__ordinalMeta.categories
				},
				getOrdinalMeta: function() {
					return this.__ordinalMeta
				},
				defaultOption: p([{}, qg[r + "Axis"], e], !0)
			})
		}), Jl.registerSubTypeDefaulter(a + "Axis", A(o, a))
	}
	var Kg = ["value", "category", "time", "log"],
		Qg = Jl.extend({
			type: "cartesian2dAxis",
			axis: null,
			init: function() {
				Qg.superApply(this, "init", arguments), this.resetRange()
			},
			mergeOption: function() {
				Qg.superApply(this, "mergeOption", arguments), this.resetRange()
			},
			restoreData: function() {
				Qg.superApply(this, "restoreData", arguments), this.resetRange()
			},
			getCoordSysModel: function() {
				return this.ecModel.queryComponents({
					mainType: "grid",
					index: this.option.gridIndex,
					id: this.option.gridId
				})[0]
			}
		});

	function Jg(t, e) {
		return e.type || (e.data ? "category" : "value")
	}
	v(Qg.prototype, Mp);
	var tv = {
		offset: 0
	};

	function ev(t, e) {
		return t.getCoordSysModel() === e
	}

	function iv(t, e, i) {
		this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this._initCartesian(t, e, i),
			this.model = t
	}
	$g("x", Qg, Jg, tv), $g("y", Qg, Jg, tv), Jl.extend({
		type: "grid",
		dependencies: ["xAxis", "yAxis"],
		layoutMode: "box",
		coordinateSystem: null,
		defaultOption: {
			show: !1,
			zlevel: 0,
			z: 0,
			left: "10%",
			top: 60,
			right: "10%",
			bottom: 60,
			containLabel: !1,
			backgroundColor: "rgba(0,0,0,0)",
			borderWidth: 1,
			borderColor: "#ccc"
		}
	});
	var nv = iv.prototype;

	function rv(t, e, i, n) {
		i.getAxesOnZeroOf = function() {
			return r ? [r] : []
		};
		var r, a = t[e],
			o = i.model,
			s = o.get("axisLine.onZero"),
			l = o.get("axisLine.onZeroAxisIndex");
		if (s) {
			if (null != l) av(a[l]) && (r = a[l]);
			else
				for (var h in a)
					if (a.hasOwnProperty(h) && av(a[h]) && !n[u(a[h])]) {
						r = a[h];
						break
					} r && (n[u(r)] = !0)
		}

		function u(t) {
			return t.dim + "_" + t.index
		}
	}

	function av(t) {
		return t && "category" !== t.type && "time" !== t.type && function(t) {
			var e = t.scale.getExtent(),
				i = e[0],
				n = e[1];
			return !(0 < i && 0 < n || i < 0 && n < 0)
		}(t)
	}
	nv.type = "grid", nv.axisPointerEnabled = !0, nv.getRect = function() {
		return this._rect
	}, nv.update = function(t, e) {
		var i = this._axesMap;
		this._updateScale(t, this.model), D(i.x, function(t) {
			yp(t.scale, t.model)
		}), D(i.y, function(t) {
			yp(t.scale, t.model)
		});
		var n = {};
		D(i.x, function(t) {
			rv(i, "y", t, n)
		}), D(i.y, function(t) {
			rv(i, "x", t, n)
		}), this.resize(this.model, e)
	}, nv.resize = function(t, e, i) {
		var r = Zl(t.getBoxLayoutParams(), {
			width: e.getWidth(),
			height: e.getHeight()
		});
		this._rect = r;
		var n = this._axesList;

		function a() {
			D(n, function(t) {
				var e = t.isHorizontal(),
					i = e ? [0, r.width] : [0, r.height],
					n = t.inverse ? 1 : 0;
				t.setExtent(i[n], i[1 - n]),
					function(t, e) {
						var i = t.getExtent(),
							n = i[0] + i[1];
						t.toGlobalCoord = "x" === t.dim ? function(t) {
							return t + e
						} : function(t) {
							return n - t + e
						}, t.toLocalCoord = "x" === t.dim ? function(t) {
							return t - e
						} : function(t) {
							return n - t + e
						}
					}(t, e ? r.x : r.y)
			})
		}
		a(), !i && t.get("containLabel") && (D(n, function(t) {
			if (!t.model.get("axisLabel.inside")) {
				var e = function(t) {
					var e = t.model,
						i = t.scale;
					if (e.get("axisLabel.show") && !i.isBlank()) {
						var n, r, a = "category" === t.type,
							o = i.getExtent();
						r = a ? i.count() : (n = i.getTicks()).length;
						var s, l, h, u, c, d, f, p, g, v = t.getLabelModel(),
							m = xp(t),
							y = 1;
						40 < r && (y = Math.ceil(r / 40));
						for (var _ = 0; _ < r; _ += y) {
							var x = m(n ? n[_] : o[0] + _),
								w = v.getTextRect(x),
								b = (l = w, h = v.get("rotate") || 0, void 0, u = h * Math.PI / 180, c = l.plain(), d = c.width, f = c.height,
									p = d * Math.cos(u) + f * Math.sin(u), g = d * Math.sin(u) + f * Math.cos(u), new vi(c.x, c.y, p, g));
							s ? s.union(b) : s = b
						}
						return s
					}
				}(t);
				if (e) {
					var i = t.isHorizontal() ? "height" : "width",
						n = t.model.get("axisLabel.margin");
					r[i] -= e[i] + n, "top" === t.position ? r.y += e.height + n : "left" === t.position && (r.x += e.width + n)
				}
			}
		}), a())
	}, nv.getAxis = function(t, e) {
		var i = this._axesMap[t];
		if (null != i) {
			if (null == e)
				for (var n in i)
					if (i.hasOwnProperty(n)) return i[n];
			return i[e]
		}
	}, nv.getAxes = function() {
		return this._axesList.slice()
	}, nv.getCartesian = function(t, e) {
		if (null != t && null != e) {
			var i = "x" + t + "y" + e;
			return this._coordsMap[i]
		}
		N(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
		for (var n = 0, r = this._coordsList; n < r.length; n++)
			if (r[n].getAxis("x").index === t || r[n].getAxis("y").index === e) return r[n]
	}, nv.getCartesians = function() {
		return this._coordsList.slice()
	}, nv.convertToPixel = function(t, e, i) {
		var n = this._findConvertTarget(t, e);
		return n.cartesian ? n.cartesian.dataToPoint(i) : n.axis ? n.axis.toGlobalCoord(n.axis.dataToCoord(i)) : null
	}, nv.convertFromPixel = function(t, e, i) {
		var n = this._findConvertTarget(t, e);
		return n.cartesian ? n.cartesian.pointToData(i) : n.axis ? n.axis.coordToData(n.axis.toLocalCoord(i)) : null
	}, nv._findConvertTarget = function(t, e) {
		var i, n, r = e.seriesModel,
			a = e.xAxisModel || r && r.getReferringComponents("xAxis")[0],
			o = e.yAxisModel || r && r.getReferringComponents("yAxis")[0],
			s = e.gridModel,
			l = this._coordsList;
		if (r) x(l, i = r.coordinateSystem) < 0 && (i = null);
		else if (a && o) i = this.getCartesian(a.componentIndex, o.componentIndex);
		else if (a) n = this.getAxis("x", a.componentIndex);
		else if (o) n = this.getAxis("y", o.componentIndex);
		else if (s) {
			s.coordinateSystem === this && (i = this._coordsList[0])
		}
		return {
			cartesian: i,
			axis: n
		}
	}, nv.containPoint = function(t) {
		var e = this._coordsList[0];
		if (e) return e.containPoint(t)
	}, nv._initCartesian = function(o, t, e) {
		var s = {
				left: !1,
				right: !1,
				top: !1,
				bottom: !1
			},
			l = {
				x: {},
				y: {}
			},
			h = {
				x: 0,
				y: 0
			};
		if (t.eachComponent("xAxis", i("x"), this), t.eachComponent("yAxis", i("y"), this), !h.x || !h.y) return this._axesMap = {},
			void(this._axesList = []);

		function i(a) {
			return function(t, e) {
				if (ev(t, o)) {
					var i = t.get("position");
					"x" === a ? "top" !== i && "bottom" !== i && (i = s.bottom ? "top" : "bottom") : "left" !== i && "right" !== i &&
						(i = s.left ? "right" : "left"), s[i] = !0;
					var n = new Yg(a, _p(t), [0, 0], t.get("type"), i),
						r = "category" === n.type;
					n.onBand = r && t.get("boundaryGap"), n.inverse = t.get("inverse"), (t.axis = n).model = t, n.grid = this, n.index =
						e, this._axesList.push(n), l[a][e] = n, h[a]++
				}
			}
		}
		D((this._axesMap = l).x, function(r, a) {
			D(l.y, function(t, e) {
				var i = "x" + a + "y" + e,
					n = new Xg(i);
				n.grid = this, n.model = o, this._coordsMap[i] = n, this._coordsList.push(n), n.addAxis(r), n.addAxis(t)
			}, this)
		}, this)
	}, nv._updateScale = function(l, h) {
		function u(e, i) {
			D(e.mapDimension(i.dim, !0), function(t) {
				i.scale.unionExtentFromData(e, Tf(e, t))
			})
		}
		D(this._axesList, function(t) {
			t.scale.setExtent(1 / 0, -1 / 0)
		}), l.eachSeries(function(t) {
			if (lv(t)) {
				var e = sv(t, l),
					i = e[0],
					n = e[1];
				if (!ev(i, h) || !ev(n, h)) return;
				var r = this.getCartesian(i.componentIndex, n.componentIndex),
					a = t.getData(),
					o = r.getAxis("x"),
					s = r.getAxis("y");
				"list" === a.type && (u(a, o, t), u(a, s, t))
			}
		}, this)
	}, nv.getTooltipAxes = function(n) {
		var r = [],
			a = [];
		return D(this.getCartesians(), function(t) {
			var e = null != n && "auto" !== n ? t.getAxis(n) : t.getBaseAxis(),
				i = t.getOtherAxis(e);
			x(r, e) < 0 && r.push(e), x(a, i) < 0 && a.push(i)
		}), {
			baseAxes: r,
			otherAxes: a
		}
	};
	var ov = ["xAxis", "yAxis"];

	function sv(e) {
		return P(ov, function(t) {
			return e.getReferringComponents(t)[0]
		})
	}

	function lv(t) {
		return "cartesian2d" === t.get("coordinateSystem")
	}
	iv.create = function(n, r) {
		var a = [];
		return n.eachComponent("grid", function(t, e) {
			var i = new iv(t, n, r);
			i.name = "grid_" + e, i.resize(t, r, !0), t.coordinateSystem = i, a.push(i)
		}), n.eachSeries(function(t) {
			if (lv(t)) {
				var e = sv(t),
					i = e[0],
					n = e[1],
					r = i.getCoordSysModel().coordinateSystem;
				t.coordinateSystem = r.getCartesian(i.componentIndex, n.componentIndex)
			}
		}), a
	}, iv.dimensions = iv.prototype.dimensions = Xg.prototype.dimensions, Dh.register("cartesian2d", iv);

	function hv(t, e) {
		this.opt = e, this.axisModel = t, T(e, {
			labelOffset: 0,
			nameDirection: 1,
			tickDirection: 1,
			labelDirection: 1,
			silent: !0
		}), this.group = new mi;
		var i = new mi({
			position: e.position.slice(),
			rotation: e.rotation
		});
		i.updateTransform(), this._transform = i.transform, this._dumbGroup = i
	}
	var uv = Math.PI;
	hv.prototype = {
		constructor: hv,
		hasBuilder: function(t) {
			return !!cv[t]
		},
		add: function(t) {
			cv[t].call(this)
		},
		getGroup: function() {
			return this.group
		}
	};
	var cv = {
			axisLine: function() {
				var a = this.opt,
					t = this.axisModel;
				if (t.get("axisLine.show")) {
					var e = this.axisModel.axis.getExtent(),
						i = this._transform,
						o = [e[0], 0],
						n = [e[1], 0];
					i && (yt(o, o, i), yt(n, n, i));
					var s = k({
						lineCap: "round"
					}, t.getModel("axisLine.lineStyle").getLineStyle());
					this.group.add(new Bo({
						anid: "line",
						subPixelOptimize: !0,
						shape: {
							x1: o[0],
							y1: o[1],
							x2: n[0],
							y2: n[1]
						},
						style: s,
						strokeContainThreshold: a.strokeContainThreshold || 5,
						silent: !0,
						z2: 1
					}));
					var l = t.get("axisLine.symbol"),
						r = t.get("axisLine.symbolSize"),
						h = t.get("axisLine.symbolOffset") || 0;
					if ("number" == typeof h && (h = [h, h]), null != l) {
						"string" == typeof l && (l = [l, l]), "string" != typeof r && "number" != typeof r || (r = [r, r]);
						var u = r[0],
							c = r[1];
						D([{
							rotate: a.rotation + Math.PI / 2,
							offset: h[0],
							r: 0
						}, {
							rotate: a.rotation - Math.PI / 2,
							offset: h[1],
							r: Math.sqrt((o[0] - n[0]) * (o[0] - n[0]) + (o[1] - n[1]) * (o[1] - n[1]))
						}], function(t, e) {
							if ("none" !== l[e] && null != l[e]) {
								var i = Op(l[e], -u / 2, -c / 2, u, c, s.stroke, !0),
									n = t.r + t.offset,
									r = [o[0] + n * Math.cos(a.rotation), o[1] - n * Math.sin(a.rotation)];
								i.attr({
									rotation: t.rotate,
									position: r,
									silent: !0,
									z2: 11
								}), this.group.add(i)
							}
						}, this)
					}
				}
			},
			axisTickLabel: function() {
				var t = this.axisModel,
					e = this.opt,
					i = function(t, e, i) {
						var n = e.axis;
						if (!e.get("axisTick.show") || n.scale.isBlank()) return;
						for (var r = e.getModel("axisTick"), a = r.getModel("lineStyle"), o = r.get("length"), s = n.getTicksCoords(),
								l = [], h = [], u = t._transform, c = [], d = 0; d < s.length; d++) {
							var f = s[d].coord;
							l[0] = f, l[1] = 0, h[0] = f, h[1] = i.tickDirection * o, u && (yt(l, l, u), yt(h, h, u));
							var p = new Bo({
								anid: "tick_" + s[d].tickValue,
								subPixelOptimize: !0,
								shape: {
									x1: l[0],
									y1: l[1],
									x2: h[0],
									y2: h[1]
								},
								style: T(a.getLineStyle(), {
									stroke: e.get("axisLine.lineStyle.color")
								}),
								z2: 2,
								silent: !0
							});
							t.group.add(p), c.push(p)
						}
						return c
					}(this, t, e);
				! function(t, e, i) {
					if (Sp(t.axis)) return;
					var n = t.get("axisLabel.showMinLabel"),
						r = t.get("axisLabel.showMaxLabel");
					i = i || [];
					var a = (e = e || [])[0],
						o = e[1],
						s = e[e.length - 1],
						l = e[e.length - 2],
						h = i[0],
						u = i[1],
						c = i[i.length - 1],
						d = i[i.length - 2];
					!1 === n ? (gv(a), gv(h)) : vv(a, o) && (n ? (gv(o), gv(u)) : (gv(a), gv(h)));
					!1 === r ? (gv(s), gv(c)) : vv(l, s) && (r ? (gv(l), gv(d)) : (gv(s), gv(c)))
				}(t, function(h, u, c) {
					var d = u.axis;
					if (!H(c.axisLabelShow, u.get("axisLabel.show")) || d.scale.isBlank()) return;
					var f = u.getModel("axisLabel"),
						p = f.get("margin"),
						t = d.getViewLabels(),
						e = (H(c.labelRotate, f.get("rotate")) || 0) * uv / 180,
						g = fv(c.rotation, e, c.labelDirection),
						v = u.getCategories && u.getCategories(!0),
						m = [],
						y = pv(u),
						_ = u.get("triggerEvent");
					return D(t, function(t, e) {
						var i = t.tickValue,
							n = t.formattedLabel,
							r = t.rawLabel,
							a = f;
						v && v[i] && v[i].textStyle && (a = new il(v[i].textStyle, f, u.ecModel));
						var o = a.getTextColor() || u.get("axisLine.lineStyle.color"),
							s = [d.dataToCoord(i), c.labelOffset + c.labelDirection * p],
							l = new wo({
								anid: "label_" + i,
								position: s,
								rotation: g.rotation,
								silent: y,
								z2: 10
							});
						Ps(l.style, a, {
							text: n,
							textAlign: a.getShallow("align", !0) || g.textAlign,
							textVerticalAlign: a.getShallow("verticalAlign", !0) || a.getShallow("baseline", !0) || g.textVerticalAlign,
							textFill: "function" == typeof o ? o("category" === d.type ? r : "value" === d.type ? i + "" : i, e) : o
						}), _ && (l.eventData = dv(u), l.eventData.targetType = "axisLabel", l.eventData.value = r), h._dumbGroup.add(
							l), l.updateTransform(), m.push(l), h.group.add(l), l.decomposeTransform()
					}), m
				}(this, t, e), i)
			},
			axisName: function() {
				var t = this.opt,
					e = this.axisModel,
					i = H(t.axisName, e.get("name"));
				if (i) {
					var n, r, a = e.get("nameLocation"),
						o = t.nameDirection,
						s = e.getModel("nameTextStyle"),
						l = e.get("nameGap") || 0,
						h = this.axisModel.axis.getExtent(),
						u = h[0] > h[1] ? -1 : 1,
						c = ["start" === a ? h[0] - u * l : "end" === a ? h[1] + u * l : (h[0] + h[1]) / 2, mv(a) ? t.labelOffset + o *
							l : 0
						],
						d = e.get("nameRotate");
					null != d && (d = d * uv / 180), mv(a) ? n = fv(t.rotation, null != d ? d : t.rotation, o) : (n = function(t, e,
						i, n) {
						var r, a, o = vl(i - t.rotation),
							s = n[0] > n[1],
							l = "start" === e && !s || "start" !== e && s;
						r = ml(o - uv / 2) ? (a = l ? "bottom" : "top", "center") : ml(o - 1.5 * uv) ? (a = l ? "top" : "bottom",
							"center") : (a = "middle", o < 1.5 * uv && uv / 2 < o ? l ? "left" : "right" : l ? "right" : "left");
						return {
							rotation: o,
							textAlign: r,
							textVerticalAlign: a
						}
					}(t, a, d || 0, h), null != (r = t.axisNameAvailableWidth) && (r = Math.abs(r / Math.sin(n.rotation)),
						isFinite(r) || (r = null)));
					var f = s.getFont(),
						p = e.get("nameTruncate", !0) || {},
						g = p.ellipsis,
						v = H(t.nameTruncateMaxWidth, p.maxWidth, r),
						m = null != g && null != v ? Rl(i, v, f, g, {
							minChar: 2,
							placeholder: p.placeholder
						}) : i,
						y = e.get("tooltip", !0),
						_ = e.mainType,
						x = {
							componentType: _,
							name: i,
							$vars: ["name"]
						};
					x[_ + "Index"] = e.componentIndex;
					var w = new wo({
						anid: "name",
						__fullText: i,
						__truncatedText: m,
						position: c,
						rotation: n.rotation,
						silent: pv(e),
						z2: 1,
						tooltip: y && y.show ? k({
							content: i,
							formatter: function() {
								return i
							},
							formatterParams: x
						}, y) : null
					});
					Ps(w.style, s, {
							text: m,
							textFont: f,
							textFill: s.getTextColor() || e.get("axisLine.lineStyle.color"),
							textAlign: s.get("align") || n.textAlign,
							textVerticalAlign: s.get("verticalAlign") || n.textVerticalAlign
						}), e.get("triggerEvent") && (w.eventData = dv(e), w.eventData.targetType = "axisName", w.eventData.name = i),
						this._dumbGroup.add(w), w.updateTransform(), this.group.add(w), w.decomposeTransform()
				}
			}
		},
		dv = hv.makeAxisEventDataBase = function(t) {
			var e = {
				componentType: t.mainType,
				componentIndex: t.componentIndex
			};
			return e[t.mainType + "Index"] = t.componentIndex, e
		},
		fv = hv.innerTextLayout = function(t, e, i) {
			var n, r = vl(e - t);
			return {
				rotation: r,
				textAlign: ml(r) ? (n = 0 < i ? "top" : "bottom", "center") : ml(r - uv) ? (n = 0 < i ? "bottom" : "top", "center") :
					(n = "middle", 0 < r && r < uv ? 0 < i ? "right" : "left" : 0 < i ? "left" : "right"),
				textVerticalAlign: n
			}
		};
	var pv = hv.isLabelSilent = function(t) {
		var e = t.get("tooltip");
		return t.get("silent") || !(t.get("triggerEvent") || e && e.show)
	};

	function gv(t) {
		t && (t.ignore = !0)
	}

	function vv(t, e) {
		var i = t && t.getBoundingRect().clone(),
			n = e && e.getBoundingRect().clone();
		if (i && n) {
			var r = $t([]);
			return te(r, r, -t.rotation), i.applyTransform(Qt([], r, t.getLocalTransform())), n.applyTransform(Qt([], r, e.getLocalTransform())),
				i.intersect(n)
		}
	}

	function mv(t) {
		return "middle" === t || "center" === t
	}
	var yv = D,
		_v = A;

	function xv(t, e) {
		var i = {
			axesInfo: {},
			seriesInvolved: !1,
			coordSysAxesInfo: {},
			coordSysMap: {}
		};
		return function(p, g, t) {
			var a = g.getComponent("tooltip"),
				v = g.getComponent("axisPointer"),
				m = v.get("link", !0) || [],
				y = [];
			yv(t.getCoordinateSystems(), function(c) {
				if (c.axisPointerEnabled) {
					var t = Mv(c.model),
						d = p.coordSysAxesInfo[t] = {},
						f = (p.coordSysMap[t] = c).model.getModel("tooltip", a);
					if (yv(c.getAxes(), _v(r, !1, null)), c.getTooltipAxes && a && f.get("show")) {
						var e = "axis" === f.get("trigger"),
							i = "cross" === f.get("axisPointer.type"),
							n = c.getTooltipAxes(f.get("axisPointer.axis"));
						(e || i) && yv(n.baseAxes, _v(r, !i || "cross", e)), i && yv(n.otherAxes, _v(r, "cross", !1))
					}
				}

				function r(t, e, i) {
					var n = i.model.getModel("axisPointer", v),
						r = n.get("show");
					if (r && ("auto" !== r || t || Sv(n))) {
						null == e && (e = n.get("triggerTooltip"));
						var a = (n = t ? function(t, e, i, n, r, a) {
								var o = e.getModel("axisPointer"),
									s = {};
								yv(["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate",
									"animationEasingUpdate", "z"
								], function(t) {
									s[t] = b(o.get(t))
								}), s.snap = "category" !== t.type && !!a, "cross" === o.get("type") && (s.type = "line");
								var l = s.label || (s.label = {});
								if (null == l.show && (l.show = !1), "cross" === r) {
									var h = o.get("label.show");
									if (l.show = null == h || h, !a) {
										var u = s.lineStyle = o.get("crossStyle");
										u && T(l, u.textStyle)
									}
								}
								return t.model.getModel("axisPointer", new il(s, i, n))
							}(i, f, v, g, t, e) : n).get("snap"),
							o = Mv(i.model),
							s = e || a || "category" === i.type,
							l = p.axesInfo[o] = {
								key: o,
								axis: i,
								coordSys: c,
								axisPointerModel: n,
								triggerTooltip: e,
								involveSeries: s,
								snap: a,
								useHandle: Sv(n),
								seriesModels: []
							};
						d[o] = l, p.seriesInvolved |= s;
						var h = function(t, e) {
							for (var i = e.model, n = e.dim, r = 0; r < t.length; r++) {
								var a = t[r] || {};
								if (wv(a[n + "AxisId"], i.id) || wv(a[n + "AxisIndex"], i.componentIndex) || wv(a[n + "AxisName"], i.name))
									return r
							}
						}(m, i);
						if (null != h) {
							var u = y[h] || (y[h] = {
								axesInfo: {}
							});
							u.axesInfo[o] = l, u.mapper = m[h].mapper, l.linkGroup = u
						}
					}
				}
			})
		}(i, t, e), i.seriesInvolved && function(r, t) {
			t.eachSeries(function(i) {
				var n = i.coordinateSystem,
					t = i.get("tooltip.trigger", !0),
					e = i.get("tooltip.show", !0);
				n && "none" !== t && !1 !== t && "item" !== t && !1 !== e && !1 !== i.get("axisPointer.show", !0) && yv(r.coordSysAxesInfo[
					Mv(n.model)], function(t) {
					var e = t.axis;
					n.getAxis(e.dim) === e && (t.seriesModels.push(i), null == t.seriesDataCount && (t.seriesDataCount = 0), t.seriesDataCount +=
						i.getData().count())
				})
			}, this)
		}(i, t), i
	}

	function wv(t, e) {
		return "all" === t || O(t) && 0 <= x(t, e) || t === e
	}

	function bv(t) {
		var e = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
		return e && e.axesInfo[Mv(t)]
	}

	function Sv(t) {
		return !!t.get("handle.show")
	}

	function Mv(t) {
		return t.type + "||" + t.id
	}
	var Iv = Ud({
		type: "axis",
		_axisPointer: null,
		axisPointerClass: null,
		render: function(t, e, i, n) {
			this.axisPointerClass && function(t) {
				var e = bv(t);
				if (e) {
					var i = e.axisPointerModel,
						n = e.axis.scale,
						r = i.option,
						a = i.get("status"),
						o = i.get("value");
					null != o && (o = n.parse(o));
					var s = Sv(i);
					null == a && (r.status = s ? "show" : "hide");
					var l = n.getExtent().slice();
					l[0] > l[1] && l.reverse(), (null == o || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), r.value = o, s &&
						(r.status = e.axis.scale.isBlank() ? "hide" : "show")
				}
			}(t), Iv.superApply(this, "render", arguments), Cv(this, t, e, i, n, !0)
		},
		updateAxisPointer: function(t, e, i, n, r) {
			Cv(this, t, e, i, n, !1)
		},
		remove: function(t, e) {
			var i = this._axisPointer;
			i && i.remove(e), Iv.superApply(this, "remove", arguments)
		},
		dispose: function(t, e) {
			Av(this, e), Iv.superApply(this, "dispose", arguments)
		}
	});

	function Cv(t, e, i, n, r, a) {
		var o = Iv.getAxisPointerClass(t.axisPointerClass);
		if (o) {
			var s = function(t) {
				var e = bv(t);
				return e && e.axisPointerModel
			}(e);
			s ? (t._axisPointer || (t._axisPointer = new o)).render(e, s, n, a) : Av(t, n)
		}
	}

	function Av(t, e, i) {
		var n = t._axisPointer;
		n && n.dispose(e, i), t._axisPointer = null
	}
	var Tv = [];

	function Dv(t, e, i) {
		i = i || {};
		var n = t.coordinateSystem,
			r = e.axis,
			a = {},
			o = r.getAxesOnZeroOf()[0],
			s = r.position,
			l = o ? "onZero" : s,
			h = r.dim,
			u = n.getRect(),
			c = [u.x, u.x + u.width, u.y, u.y + u.height],
			d = {
				left: 0,
				right: 1,
				top: 0,
				bottom: 1,
				onZero: 2
			},
			f = e.get("offset") || 0,
			p = "x" === h ? [c[2] - f, c[3] + f] : [c[0] - f, c[1] + f];
		if (o) {
			var g = o.toGlobalCoord(o.dataToCoord(0));
			p[d.onZero] = Math.max(Math.min(g, p[1]), p[0])
		}
		a.position = ["y" === h ? p[d[l]] : c[0], "x" === h ? p[d[l]] : c[3]], a.rotation = Math.PI / 2 * ("x" === h ? 0 : 1);
		a.labelDirection = a.tickDirection = a.nameDirection = {
				top: -1,
				bottom: 1,
				left: -1,
				right: 1
			} [s], a.labelOffset = o ? p[d[s]] - p[d.onZero] : 0, e.get("axisTick.inside") && (a.tickDirection = -a.tickDirection),
			H(i.labelInside, e.get("axisLabel.inside")) && (a.labelDirection = -a.labelDirection);
		var v = e.get("axisLabel.rotate");
		return a.labelRotate = "top" === l ? -v : v, a.z2 = 1, a
	}
	Iv.registerAxisPointerClass = function(t, e) {
		Tv[t] = e
	}, Iv.getAxisPointerClass = function(t) {
		return t && Tv[t]
	};
	var kv = ["axisLine", "axisTickLabel", "axisName"],
		Pv = ["splitArea", "splitLine"],
		Lv = Iv.extend({
			type: "cartesianAxis",
			axisPointerClass: "CartesianAxisPointer",
			render: function(e, t, i, n) {
				this.group.removeAll();
				var r = this._axisGroup;
				if (this._axisGroup = new mi, this.group.add(this._axisGroup), e.get("show")) {
					var a = e.getCoordSysModel(),
						o = Dv(a, e),
						s = new hv(e, o);
					D(kv, s.add, s), this._axisGroup.add(s.getGroup()), D(Pv, function(t) {
						e.get(t + ".show") && this["_" + t](e, a)
					}, this), Zs(r, this._axisGroup, e), Lv.superCall(this, "render", e, t, i, n)
				}
			},
			remove: function() {
				this._splitAreaColors = null
			},
			_splitLine: function(t, e) {
				var i = t.axis;
				if (!i.scale.isBlank()) {
					var n = t.getModel("splitLine"),
						r = n.getModel("lineStyle"),
						a = r.get("color");
					a = O(a) ? a : [a];
					for (var o = e.coordinateSystem.getRect(), s = i.isHorizontal(), l = 0, h = i.getTicksCoords({
							tickModel: n
						}), u = [], c = [], d = r.getLineStyle(), f = 0; f < h.length; f++) {
						var p = i.toGlobalCoord(h[f].coord);
						s ? (u[0] = p, u[1] = o.y, c[0] = p, c[1] = o.y + o.height) : (u[0] = o.x, u[1] = p, c[0] = o.x + o.width, c[1] =
							p);
						var g = l++ % a.length,
							v = h[f].tickValue;
						this._axisGroup.add(new Bo({
							anid: null != v ? "line_" + h[f].tickValue : null,
							subPixelOptimize: !0,
							shape: {
								x1: u[0],
								y1: u[1],
								x2: c[0],
								y2: c[1]
							},
							style: T({
								stroke: a[g]
							}, d),
							silent: !0
						}))
					}
				}
			},
			_splitArea: function(t, e) {
				var i = t.axis;
				if (!i.scale.isBlank()) {
					var n = t.getModel("splitArea"),
						r = n.getModel("areaStyle"),
						a = r.get("color"),
						o = e.coordinateSystem.getRect(),
						s = i.getTicksCoords({
							tickModel: n,
							clamp: !0
						});
					if (s.length) {
						var l = a.length,
							h = this._splitAreaColors,
							u = Q(),
							c = 0;
						if (h)
							for (var d = 0; d < s.length; d++) {
								var f = h.get(s[d].tickValue);
								if (null != f) {
									c = (f + (l - 1) * d) % l;
									break
								}
							}
						var p = i.toGlobalCoord(s[0].coord),
							g = r.getAreaStyle();
						a = O(a) ? a : [a];
						for (d = 1; d < s.length; d++) {
							var v, m, y, _, x = i.toGlobalCoord(s[d].coord);
							p = i.isHorizontal() ? (v = p, m = o.y, y = x - v, _ = o.height, v + y) : (v = o.x, m = p, y = o.width, m + (
								_ = x - m));
							var w = s[d - 1].tickValue;
							null != w && u.set(w, c), this._axisGroup.add(new No({
								anid: null != w ? "area_" + w : null,
								shape: {
									x: v,
									y: m,
									width: y,
									height: _
								},
								style: T({
									fill: a[c]
								}, g),
								silent: !0
							})), c = (c + 1) % l
						}
						this._splitAreaColors = u
					}
				}
			}
		});

	function Ov(t, e) {
		"outside" === t.textPosition && (t.textPosition = e)
	}
	Lv.extend({
		type: "xAxis"
	}), Lv.extend({
		type: "yAxis"
	}), Ud({
		type: "grid",
		render: function(t, e) {
			this.group.removeAll(), t.get("show") && this.group.add(new No({
				shape: t.coordinateSystem.getRect(),
				style: T({
					fill: t.get("backgroundColor")
				}, t.getItemStyle()),
				silent: !0,
				z2: -1
			}))
		}
	}), Rd(function(t) {
		t.xAxis && t.yAxis && !t.grid && (t.grid = {})
	}), Hd(Fg("line", "circle", "line")), Fd(Hg("line")), Bd($c.PROCESSOR.STATISTIC, {
		seriesType: "line",
		modifyOutputEnd: !0,
		reset: function(t, e, i) {
			var n = t.getData(),
				r = t.get("sampling"),
				a = t.coordinateSystem;
			if ("cartesian2d" === a.type && r) {
				var o, s = a.getBaseAxis(),
					l = a.getOtherAxis(s),
					h = s.getExtent(),
					u = h[1] - h[0],
					c = Math.round(n.count() / u);
				1 < c && ("string" == typeof r ? o = Wg[r] : "function" == typeof r && (o = r), o && t.setData(n.downSample(n.mapDimension(
					l.dim), 1 / c, o, Gg)))
			}
		}
	}), Tu.extend({
		type: "series.__base_bar__",
		getInitialData: function(t, e) {
			return Df(this.getSource(), this)
		},
		getMarkerPosition: function(t) {
			var e = this.coordinateSystem;
			if (e) {
				var i = e.dataToPoint(e.clampData(t)),
					n = this.getData(),
					r = n.getLayout("offset"),
					a = n.getLayout("size");
				return i[e.getBaseAxis().isHorizontal() ? 0 : 1] += r + a / 2, i
			}
			return [NaN, NaN]
		},
		defaultOption: {
			zlevel: 0,
			z: 2,
			coordinateSystem: "cartesian2d",
			legendHoverLink: !0,
			barMinHeight: 0,
			barMinAngle: 0,
			large: !1,
			largeThreshold: 400,
			progressive: 3e3,
			progressiveChunkMode: "mod",
			itemStyle: {},
			emphasis: {}
		}
	}).extend({
		type: "series.bar",
		dependencies: ["grid", "polar"],
		brushSelector: "rect",
		getProgressive: function() {
			return !!this.get("large") && this.get("progressive")
		},
		getProgressiveThreshold: function() {
			var t = this.get("progressiveThreshold"),
				e = this.get("largeThreshold");
			return t < e && (t = e), t
		},
		defaultOption: {
			clip: !0,
			roundCap: !1
		}
	});
	var zv = Vr([
			["fill", "color"],
			["stroke", "borderColor"],
			["lineWidth", "borderWidth"],
			["stroke", "barBorderColor"],
			["lineWidth", "barBorderWidth"],
			["opacity"],
			["shadowBlur"],
			["shadowOffsetX"],
			["shadowOffsetY"],
			["shadowColor"]
		]),
		Ev = {
			getBarItemStyle: function(t) {
				var e = zv(this, t);
				if (this.getBorderLineDash) {
					var i = this.getBorderLineDash();
					i && (e.lineDash = i)
				}
				return e
			}
		},
		Nv = rs({
			type: "sausage",
			shape: {
				cx: 0,
				cy: 0,
				r0: 0,
				r: 0,
				startAngle: 0,
				endAngle: 2 * Math.PI,
				clockwise: !0
			},
			buildPath: function(t, e) {
				var i = e.cx,
					n = e.cy,
					r = Math.max(e.r0 || 0, 0),
					a = Math.max(e.r, 0),
					o = .5 * (a - r),
					s = r + o,
					l = e.startAngle,
					h = e.endAngle,
					u = e.clockwise,
					c = Math.cos(l),
					d = Math.sin(l),
					f = Math.cos(h),
					p = Math.sin(h);
				(u ? h - l < 2 * Math.PI : l - h < 2 * Math.PI) && (t.moveTo(c * r + i, d * r + n), t.arc(c * s + i, d * s + n,
					o, -Math.PI + l, l, !u)), t.arc(i, n, a, l, h, !u), t.moveTo(f * a + i, p * a + n), t.arc(f * s + i, p * s + n,
					o, h - 2 * Math.PI, h - Math.PI, !u), 0 !== r && (t.arc(i, n, r, h, l, u), t.moveTo(c * r + i, p * r + n)), t.closePath()
			}
		}),
		Rv = ["itemStyle", "barBorderWidth"],
		Bv = [0, 0];
	k(il.prototype, Ev), Yd({
		type: "bar",
		render: function(t, e, i) {
			this._updateDrawMode(t);
			var n = t.get("coordinateSystem");
			return "cartesian2d" !== n && "polar" !== n || (this._isLargeDraw ? this._renderLarge(t, e, i) : this._renderNormal(
				t, e, i)), this.group
		},
		incrementalPrepareRender: function(t, e, i) {
			this._clear(), this._updateDrawMode(t)
		},
		incrementalRender: function(t, e, i, n) {
			this._incrementalRenderLarge(t, e)
		},
		_updateDrawMode: function(t) {
			var e = t.pipelineContext.large;
			(null == this._isLargeDraw || e ^ this._isLargeDraw) && (this._isLargeDraw = e, this._clear())
		},
		_renderNormal: function(a, t, e) {
			var o, s = this.group,
				l = a.getData(),
				h = this._data,
				u = a.coordinateSystem,
				i = u.getBaseAxis();
			"cartesian2d" === u.type ? o = i.isHorizontal() : "polar" === u.type && (o = "angle" === i.dim);
			var c = a.isAnimationEnabled() ? a : null,
				d = a.get("clip", !0),
				f = function(t, e) {
					var i = t.getArea && t.getArea();
					if ("cartesian2d" === t.type) {
						var n = t.getBaseAxis();
						if ("category" !== n.type || !n.onBand) {
							var r = e.getLayout("bandWidth");
							n.isHorizontal() ? (i.x -= r, i.width += 2 * r) : (i.y -= r, i.height += 2 * r)
						}
					}
					return i
				}(u, l);
			s.removeClipPath();
			var p = a.get("roundCap", !0);
			l.diff(h).add(function(t) {
				if (l.hasValue(t)) {
					var e = l.getItemModel(t),
						i = Uv[u.type](l, t, e);
					if (d)
						if (Hv[u.type](f, i)) return void s.remove(n);
					var n = Gv[u.type](t, i, o, c, !1, p);
					l.setItemGraphicEl(t, n), s.add(n), Xv(n, l, t, e, i, a, o, "polar" === u.type)
				}
			}).update(function(t, e) {
				var i = h.getItemGraphicEl(e);
				if (l.hasValue(t)) {
					var n = l.getItemModel(t),
						r = Uv[u.type](l, t, n);
					if (d)
						if (Hv[u.type](f, r)) return void s.remove(i);
					i ? Vs(i, {
						shape: r
					}, c, t) : i = Gv[u.type](t, r, o, c, !0, p), l.setItemGraphicEl(t, i), s.add(i), Xv(i, l, t, n, r, a, o,
						"polar" === u.type)
				} else s.remove(i)
			}).remove(function(t) {
				var e = h.getItemGraphicEl(t);
				"cartesian2d" === u.type ? e && Wv(t, c, e) : e && Zv(t, c, e)
			}).execute(), this._data = l
		},
		_renderLarge: function(t, e, i) {
			this._clear(), jv(t, this.group);
			var n = t.get("clip", !0) ? function(t, e, i) {
				return t ? "polar" === t.type ? zg(t, e, i) : "cartesian2d" === t.type ? Og(t, e, i) : null : null
			}(t.coordinateSystem, !1, t) : null;
			n ? this.group.setClipPath(n) : this.group.removeClipPath()
		},
		_incrementalRenderLarge: function(t, e) {
			jv(e, this.group, !0)
		},
		dispose: J,
		remove: function(t) {
			this._clear(t)
		},
		_clear: function(e) {
			var t = this.group,
				i = this._data;
			e && e.get("animation") && i && !this._isLargeDraw ? i.eachItemGraphicEl(function(t) {
				"sector" === t.type ? Zv(t.dataIndex, e, t) : Wv(t.dataIndex, e, t)
			}) : t.removeAll(), this._data = null
		}
	});
	var Vv = Math.max,
		Fv = Math.min,
		Hv = {
			cartesian2d: function(t, e) {
				var i = e.width < 0 ? -1 : 1,
					n = e.height < 0 ? -1 : 1;
				i < 0 && (e.x += e.width, e.width = -e.width), n < 0 && (e.y += e.height, e.height = -e.height);
				var r = Vv(e.x, t.x),
					a = Fv(e.x + e.width, t.x + t.width),
					o = Vv(e.y, t.y),
					s = Fv(e.y + e.height, t.y + t.height);
				e.x = r, e.y = o, e.width = a - r, e.height = s - o;
				var l = e.width < 0 || e.height < 0;
				return i < 0 && (e.x += e.width, e.width = -e.width), n < 0 && (e.y += e.height, e.height = -e.height), l
			},
			polar: function(t) {
				return !1
			}
		},
		Gv = {
			cartesian2d: function(t, e, i, n, r) {
				var a = new No({
					shape: k({}, e)
				});
				if (n) {
					var o = i ? "height" : "width",
						s = {};
					a.shape[o] = 0, s[o] = e[o], qs[r ? "updateProps" : "initProps"](a, {
						shape: s
					}, n, t)
				}
				return a
			},
			polar: function(t, e, i, n, r, a) {
				var o = e.startAngle < e.endAngle,
					s = new(!i && a ? Nv : Io)({
						shape: T({
							clockwise: o
						}, e)
					});
				if (n) {
					var l = i ? "r" : "endAngle",
						h = {};
					s.shape[l] = i ? 0 : e.startAngle, h[l] = e[l], qs[r ? "updateProps" : "initProps"](s, {
						shape: h
					}, n, t)
				}
				return s
			}
		};

	function Wv(t, e, i) {
		i.style.text = null, Vs(i, {
			shape: {
				width: 0
			}
		}, e, t, function() {
			i.parent && i.parent.remove(i)
		})
	}

	function Zv(t, e, i) {
		i.style.text = null, Vs(i, {
			shape: {
				r: i.shape.r0
			}
		}, e, t, function() {
			i.parent && i.parent.remove(i)
		})
	}
	var Uv = {
		cartesian2d: function(t, e, i) {
			var n = t.getItemLayout(e),
				r = function(t, e) {
					var i = t.get(Rv) || 0;
					return Math.min(i, Math.abs(e.width), Math.abs(e.height))
				}(i, n),
				a = 0 < n.width ? 1 : -1,
				o = 0 < n.height ? 1 : -1;
			return {
				x: n.x + a * r / 2,
				y: n.y + o * r / 2,
				width: n.width - a * r,
				height: n.height - o * r
			}
		},
		polar: function(t, e, i) {
			var n = t.getItemLayout(e);
			return {
				cx: n.cx,
				cy: n.cy,
				r0: n.r0,
				r: n.r,
				startAngle: n.startAngle,
				endAngle: n.endAngle
			}
		}
	};

	function Xv(t, e, i, n, r, a, o, s) {
		var l = e.getItemVisual(i, "color"),
			h = e.getItemVisual(i, "opacity"),
			u = n.getModel("itemStyle"),
			c = n.getModel("emphasis.itemStyle").getBarItemStyle();
		s || t.setShape("r", u.get("barBorderRadius") || 0), t.useStyle(T({
			fill: l,
			opacity: h
		}, u.getBarItemStyle()));
		var d = n.getShallow("cursor");
		d && t.attr("cursor", d);
		o ? r.height : r.width;
		s || function(t, e, i, n, r, a) {
			ks(t, e, i.getModel("label"), i.getModel("emphasis.label"), {
				labelFetcher: r,
				labelDataIndex: a,
				defaultText: ng(r.getData(), a),
				isRectText: !0,
				autoColor: n
			}), Ov(t), Ov(e)
		}(t.style, c, n, l, a, i), Cs(t, c)
	}
	var Yv = io.extend({
		type: "largeBar",
		shape: {
			points: []
		},
		buildPath: function(t, e) {
			for (var i = e.points, n = this.__startPoint, r = this.__baseDimIdx, a = 0; a < i.length; a += 2) n[r] = i[a + r],
				t.moveTo(n[0], n[1]), t.lineTo(i[a], i[a + 1])
		}
	});

	function jv(t, e, i) {
		var n = t.getData(),
			r = [],
			a = n.getLayout("valueAxisHorizontal") ? 1 : 0;
		r[1 - a] = n.getLayout("valueAxisStart");
		var o = new Yv({
			shape: {
				points: n.getLayout("largePoints")
			},
			incremental: !!i,
			__startPoint: r,
			__baseDimIdx: a,
			__largeDataIndices: n.getLayout("largeDataIndices"),
			__barWidth: n.getLayout("barWidth")
		});
		e.add(o),
			function(t, e, i) {
				var n = i.getVisual("borderColor") || i.getVisual("color"),
					r = e.getModel("itemStyle").getItemStyle(["color", "borderColor"]);
				t.useStyle(r), t.style.fill = null, t.style.stroke = n, t.style.lineWidth = i.getLayout("barWidth")
			}(o, t, n), o.seriesIndex = t.seriesIndex, t.get("silent") || (o.on("mousedown", qv), o.on("mousemove", qv))
	}
	var qv = Ku(function(t) {
		var e = function(t, e, i) {
			var n = t.__baseDimIdx,
				r = 1 - n,
				a = t.shape.points,
				o = t.__largeDataIndices,
				s = Math.abs(t.__barWidth / 2),
				l = t.__startPoint[r];
			Bv[0] = e, Bv[1] = i;
			for (var h = Bv[n], u = Bv[1 - n], c = h - s, d = h + s, f = 0, p = a.length / 2; f < p; f++) {
				var g = 2 * f,
					v = a[g + n],
					m = a[g + r];
				if (c <= v && v <= d && (l <= m ? l <= u && u <= m : m <= u && u <= l)) return o[f]
			}
			return -1
		}(this, t.offsetX, t.offsetY);
		this.dataIndex = 0 <= e ? e : null
	}, 30, !1);
	Fd($c.VISUAL.LAYOUT, A(function(t, e) {
		var i = Yf(t, e),
			C = jf(i),
			A = {};
		D(i, function(t) {
			var e = t.getData(),
				i = t.coordinateSystem,
				n = i.getBaseAxis(),
				r = Uf(t),
				a = C[Xf(n)][r],
				o = a.offset,
				s = a.width,
				l = i.getOtherAxis(n),
				h = t.get("barMinHeight") || 0;
			A[r] = A[r] || [], e.setLayout({
				bandWidth: a.bandWidth,
				offset: o,
				size: s
			});
			for (var u = e.mapDimension(l.dim), c = e.mapDimension(n.dim), d = Af(e, u), f = l.isHorizontal(), p = Jf(n, l,
					d), g = 0, v = e.count(); g < v; g++) {
				var m = e.get(u, g),
					y = e.get(c, g);
				if (!isNaN(m) && !isNaN(y)) {
					var _, x, w, b, S, M = 0 <= m ? "p" : "n",
						I = p;
					if (d && (A[r][y] || (A[r][y] = {
							p: p,
							n: p
						}), I = A[r][y][M]), f) _ = I, x = (S = i.dataToPoint([m, y]))[1] + o, w = S[0] - p, b = s, Math.abs(w) < h &&
						(w = (w < 0 ? -1 : 1) * h), d && (A[r][y][M] += w);
					else _ = (S = i.dataToPoint([y, m]))[0] + o, x = I, w = s, b = S[1] - p, Math.abs(b) < h && (b = (b <= 0 ? -
						1 : 1) * h), d && (A[r][y][M] += b);
					e.setItemLayout(g, {
						x: _,
						y: x,
						width: w,
						height: b
					})
				}
			}
		}, this)
	}, "bar")), Fd($c.VISUAL.PROGRESSIVE_LAYOUT, $f), Hd({
		seriesType: "bar",
		reset: function(t) {
			t.getData().setVisual("legendSymbol", "roundRect")
		}
	});
	var $v = {
			updateSelectedMap: function(t) {
				this._targetList = O(t) ? t.slice() : [], this._selectTargetMap = M(t || [], function(t, e) {
					return t.set(e.name, e), t
				}, Q())
			},
			select: function(t, e) {
				var i = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
				"single" === this.get("selectedMode") && this._selectTargetMap.each(function(t) {
					t.selected = !1
				}), i && (i.selected = !0)
			},
			unSelect: function(t, e) {
				var i = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
				i && (i.selected = !1)
			},
			toggleSelected: function(t, e) {
				var i = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
				if (null != i) return this[i.selected ? "unSelect" : "select"](t, e), i.selected
			},
			isSelected: function(t, e) {
				var i = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
				return i && i.selected
			}
		},
		Kv = Xd({
			type: "series.pie",
			init: function(t) {
				Kv.superApply(this, "init", arguments), this.legendDataProvider = function() {
					return this.getRawData()
				}, this.updateSelectedMap(this._createSelectableList()), this._defaultLabelLine(t)
			},
			mergeOption: function(t) {
				Kv.superCall(this, "mergeOption", t), this.updateSelectedMap(this._createSelectableList())
			},
			getInitialData: function(t, e) {
				return function(t, e, i) {
					e = O(e) && {
						coordDimensions: e
					} || k({}, e);
					var n = t.getSource(),
						r = If(n, e),
						a = new uf(r, t);
					return a.initData(n, i), a
				}(this, ["value"])
			},
			_createSelectableList: function() {
				for (var t = this.getRawData(), e = t.mapDimension("value"), i = [], n = 0, r = t.count(); n < r; n++) i.push({
					name: t.getName(n),
					value: t.get(e, n),
					selected: cu(t, n, "selected")
				});
				return i
			},
			getDataParams: function(t) {
				var e = this.getData(),
					i = Kv.superCall(this, "getDataParams", t),
					n = [];
				return e.each(e.mapDimension("value"), function(t) {
					n.push(t)
				}), i.percent = gl(n, t, e.hostModel.get("percentPrecision")), i.$vars.push("percent"), i
			},
			_defaultLabelLine: function(t) {
				vr(t, "labelLine", ["show"]);
				var e = t.labelLine,
					i = t.emphasis.labelLine;
				e.show = e.show && t.label.show, i.show = i.show && t.emphasis.label.show
			},
			defaultOption: {
				zlevel: 0,
				z: 2,
				legendHoverLink: !0,
				hoverAnimation: !0,
				center: ["50%", "50%"],
				radius: [0, "75%"],
				clockwise: !0,
				startAngle: 90,
				minAngle: 0,
				minShowLabelAngle: 0,
				selectedOffset: 10,
				hoverOffset: 10,
				avoidLabelOverlap: !0,
				percentPrecision: 2,
				stillShowZeroSum: !0,
				label: {
					rotate: !1,
					show: !0,
					position: "outer"
				},
				labelLine: {
					show: !0,
					length: 15,
					length2: 15,
					smooth: !1,
					lineStyle: {
						width: 1,
						type: "solid"
					}
				},
				itemStyle: {
					borderWidth: 1
				},
				animationType: "expansion",
				animationTypeUpdate: "transition",
				animationEasing: "cubicOut"
			}
		});

	function Qv(t, e, i, n) {
		var r = e.getData(),
			a = this.dataIndex,
			o = r.getName(a),
			s = e.get("selectedOffset");
		n.dispatchAction({
			type: "pieToggleSelect",
			from: t,
			name: o,
			seriesId: e.id
		}), r.each(function(t) {
			Jv(r.getItemGraphicEl(t), r.getItemLayout(t), e.isSelected(r.getName(t)), s, i)
		})
	}

	function Jv(t, e, i, n, r) {
		var a = (e.startAngle + e.endAngle) / 2,
			o = i ? n : 0,
			s = [Math.cos(a) * o, Math.sin(a) * o];
		r ? t.animate().when(200, {
			position: s
		}).start("bounceOut") : t.attr("position", s)
	}

	function tm(t, e) {
		mi.call(this);
		var i = new Io({
				z2: 2
			}),
			n = new ko,
			r = new wo;
		this.add(i), this.add(n), this.add(r), this.updateData(t, e, !0)
	}
	S(Kv, $v);
	var em = tm.prototype;
	em.updateData = function(t, e, i) {
		var n = this.childAt(0),
			r = this.childAt(1),
			a = this.childAt(2),
			o = t.hostModel,
			s = t.getItemModel(e),
			l = t.getItemLayout(e),
			h = k({}, l);
		h.label = null;
		var u = o.getShallow("animationTypeUpdate");
		i ? (n.setShape(h), "scale" === o.getShallow("animationType") ? (n.shape.r = l.r0, Fs(n, {
			shape: {
				r: l.r
			}
		}, o, e)) : (n.shape.endAngle = l.startAngle, Vs(n, {
			shape: {
				endAngle: l.endAngle
			}
		}, o, e))) : "expansion" === u ? n.setShape(h) : Vs(n, {
			shape: h
		}, o, e);
		var c = t.getItemVisual(e, "color");
		n.useStyle(T({
			lineJoin: "bevel",
			fill: c
		}, s.getModel("itemStyle").getItemStyle())), n.hoverStyle = s.getModel("emphasis.itemStyle").getItemStyle();
		var d = s.getShallow("cursor");
		d && n.attr("cursor", d), Jv(this, t.getItemLayout(e), o.isSelected(null, e), o.get("selectedOffset"), o.get(
			"animation"));
		var f = !i && "transition" === u;
		this._updateLabel(t, e, f), this.highDownOnUpdate = s.get("hoverAnimation") && o.isAnimationEnabled() ? function(t,
			e) {
			"emphasis" === e ? (r.ignore = r.hoverIgnore, a.ignore = a.hoverIgnore, n.stopAnimation(!0), n.animateTo({
				shape: {
					r: l.r + o.get("hoverOffset")
				}
			}, 300, "elasticOut")) : (r.ignore = r.normalIgnore, a.ignore = a.normalIgnore, n.stopAnimation(!0), n.animateTo({
				shape: {
					r: l.r
				}
			}, 300, "elasticOut"))
		} : null, Cs(this)
	}, em._updateLabel = function(t, e, i) {
		var n = this.childAt(1),
			r = this.childAt(2),
			a = t.hostModel,
			o = t.getItemModel(e),
			s = t.getItemLayout(e).label,
			l = t.getItemVisual(e, "color");
		if (!s || isNaN(s.x) || isNaN(s.y)) r.ignore = r.normalIgnore = r.hoverIgnore = n.ignore = n.normalIgnore = n.hoverIgnore = !
			0;
		else {
			var h = {
					points: s.linePoints || [
						[s.x, s.y],
						[s.x, s.y],
						[s.x, s.y]
					]
				},
				u = {
					x: s.x,
					y: s.y
				};
			i ? (Vs(n, {
				shape: h
			}, a, e), Vs(r, {
				style: u
			}, a, e)) : (n.attr({
				shape: h
			}), r.attr({
				style: u
			})), r.attr({
				rotation: s.rotation,
				origin: [s.x, s.y],
				z2: 10
			});
			var c = o.getModel("label"),
				d = o.getModel("emphasis.label"),
				f = o.getModel("labelLine"),
				p = o.getModel("emphasis.labelLine");
			l = t.getItemVisual(e, "color");
			ks(r.style, r.hoverStyle = {}, c, d, {
				labelFetcher: t.hostModel,
				labelDataIndex: e,
				defaultText: t.getName(e),
				autoColor: l,
				useInsideStyle: !!s.inside
			}, {
				textAlign: s.textAlign,
				textVerticalAlign: s.verticalAlign,
				opacity: t.getItemVisual(e, "opacity")
			}), r.ignore = r.normalIgnore = !c.get("show"), r.hoverIgnore = !d.get("show"), n.ignore = n.normalIgnore = !f.get(
				"show"), n.hoverIgnore = !p.get("show"), n.setStyle({
				stroke: l,
				opacity: t.getItemVisual(e, "opacity")
			}), n.setStyle(f.getModel("lineStyle").getLineStyle()), n.hoverStyle = p.getModel("lineStyle").getLineStyle();
			var g = f.get("smooth");
			g && !0 === g && (g = .4), n.setShape({
				smooth: g
			})
		}
	}, w(tm, mi);
	Hu.extend({
		type: "pie",
		init: function() {
			var t = new mi;
			this._sectorGroup = t
		},
		render: function(t, e, i, n) {
			if (!n || n.from !== this.uid) {
				var r = t.getData(),
					a = this._data,
					o = this.group,
					s = e.get("animation"),
					l = !a,
					h = t.get("animationType"),
					u = t.get("animationTypeUpdate"),
					c = A(Qv, this.uid, t, s, i),
					d = t.get("selectedMode");
				if (r.diff(a).add(function(t) {
						var e = new tm(r, t);
						l && "scale" !== h && e.eachChild(function(t) {
							t.stopAnimation(!0)
						}), d && e.on("click", c), r.setItemGraphicEl(t, e), o.add(e)
					}).update(function(t, e) {
						var i = a.getItemGraphicEl(e);
						l || "transition" === u || i.eachChild(function(t) {
							t.stopAnimation(!0)
						}), i.updateData(r, t), i.off("click"), d && i.on("click", c), o.add(i), r.setItemGraphicEl(t, i)
					}).remove(function(t) {
						var e = a.getItemGraphicEl(t);
						o.remove(e)
					}).execute(), s && 0 < r.count() && (l ? "scale" !== h : "transition" !== u)) {
					for (var f = r.getItemLayout(0), p = 1; isNaN(f.startAngle) && p < r.count(); ++p) f = r.getItemLayout(p);
					var g = Math.max(i.getWidth(), i.getHeight()) / 2,
						v = C(o.removeClipPath, o);
					o.setClipPath(this._createClipPath(f.cx, f.cy, g, f.startAngle, f.clockwise, v, t, l))
				} else o.removeClipPath();
				this._data = r
			}
		},
		dispose: function() {},
		_createClipPath: function(t, e, i, n, r, a, o, s) {
			var l = new Io({
				shape: {
					cx: t,
					cy: e,
					r0: 0,
					r: i,
					startAngle: n,
					endAngle: n,
					clockwise: r
				}
			});
			return (s ? Fs : Vs)(l, {
				shape: {
					endAngle: n + (r ? 1 : -1) * Math.PI * 2
				}
			}, o, a), l
		},
		containPoint: function(t, e) {
			var i = e.getData().getItemLayout(0);
			if (i) {
				var n = t[0] - i.cx,
					r = t[1] - i.cy,
					a = Math.sqrt(n * n + r * r);
				return a <= i.r && a >= i.r0
			}
		}
	});
	var im = Math.PI / 180;

	function nm(r, t, e, i, n, a, o) {
		function s(t, e, i) {
			for (var n = t; n < e; n++)
				if (r[n].y += i, t < n && n + 1 < e && r[n + 1].y > r[n].y + r[n].height) return void l(n, i / 2);
			l(e - 1, i / 2)
		}

		function l(t, e) {
			for (var i = t; 0 <= i && (r[i].y -= e, !(0 < i && r[i].y > r[i - 1].y + r[i - 1].height)); i--);
		}

		function h(t, e, i, n, r, a) {
			for (var o = e ? Number.MAX_VALUE : 0, s = 0, l = t.length; s < l; s++) {
				var h = Math.abs(t[s].y - n),
					u = t[s].len,
					c = t[s].len2,
					d = h < r + u ? Math.sqrt((r + u + c) * (r + u + c) - h * h) : Math.abs(t[s].x - i);
				e && o <= d && (d = o - 10), !e && d <= o && (d = o + 10), t[s].x = i + d * a, o = d
			}
		}
		r.sort(function(t, e) {
			return t.y - e.y
		});
		for (var u, c = 0, d = r.length, f = [], p = [], g = 0; g < d; g++)(u = r[g].y - c) < 0 && s(g, d, -u), c = r[g].y +
			r[g].height;
		o - c < 0 && l(d - 1, c - o);
		for (g = 0; g < d; g++) r[g].y >= e ? p.push(r[g]) : f.push(r[g]);
		h(f, !1, t, e, i, n), h(p, !0, t, e, i, n)
	}

	function rm(t) {
		return "center" === t.position
	}

	function am(I, C, t, e, i) {
		var A, T, D = I.getData(),
			k = [],
			P = !1,
			L = (I.get("minShowLabelAngle") || 0) * im;
		D.each(function(t) {
			var e = D.getItemLayout(t),
				i = D.getItemModel(t),
				n = i.getModel("label"),
				r = n.get("position") || i.get("emphasis.label.position"),
				a = i.getModel("labelLine"),
				o = a.get("length"),
				s = a.get("length2");
			if (!(e.angle < L)) {
				var l, h, u, c, d = (e.startAngle + e.endAngle) / 2,
					f = Math.cos(d),
					p = Math.sin(d);
				A = e.cx, T = e.cy;
				var g = "inside" === r || "inner" === r;
				if ("center" === r) l = e.cx, h = e.cy, c = "center";
				else {
					var v = (g ? (e.r + e.r0) / 2 * f : e.r * f) + A,
						m = (g ? (e.r + e.r0) / 2 * p : e.r * p) + T;
					if (l = v + 3 * f, h = m + 3 * p, !g) {
						var y = v + f * (o + C - e.r),
							_ = m + p * (o + C - e.r),
							x = y + (f < 0 ? -1 : 1) * s;
						l = x + (f < 0 ? -5 : 5), u = [
							[v, m],
							[y, _],
							[x, h = _]
						]
					}
					c = g ? "center" : 0 < f ? "left" : "right"
				}
				var w, b = n.getFont(),
					S = n.get("rotate");
				w = "number" == typeof S ? S * (Math.PI / 180) : S ? f < 0 ? -d + Math.PI : -d : 0;
				var M = nn(I.getFormattedLabel(t, "normal") || D.getName(t), b, c, "top");
				P = !!w, e.label = {
					x: l,
					y: h,
					position: r,
					height: M.height,
					len: o,
					len2: s,
					linePoints: u,
					textAlign: c,
					verticalAlign: "middle",
					rotation: w,
					inside: g
				}, g || k.push(e.label)
			}
		}), !P && I.get("avoidLabelOverlap") && function(t, e, i, n, r, a) {
			for (var o = [], s = [], l = 0; l < t.length; l++) rm(t[l]) || (t[l].x < e ? o.push(t[l]) : s.push(t[l]));
			for (nm(s, e, i, n, 1, 0, a), nm(o, e, i, n, -1, 0, a), l = 0; l < t.length; l++)
				if (!rm(t[l])) {
					var h = t[l].linePoints;
					if (h) {
						var u = h[1][0] - h[2][0];
						t[l].x < e ? h[2][0] = t[l].x + 3 : h[2][0] = t[l].x - 3, h[1][1] = h[2][1] = t[l].y, h[1][0] = h[2][0] + u
					}
				}
		}(k, A, T, C, 0, e)
	}
	var om, sm, lm = 2 * Math.PI,
		hm = Math.PI / 180;
	om = "pie", D([{
		type: "pieToggleSelect",
		event: "pieselectchanged",
		method: "toggleSelected"
	}, {
		type: "pieSelect",
		event: "pieselected",
		method: "select"
	}, {
		type: "pieUnSelect",
		event: "pieunselected",
		method: "unSelect"
	}], function(a) {
		a.update = "updateView", Vd(a, function(t, e) {
			var r = {};
			return e.eachComponent({
				mainType: "series",
				subType: om,
				query: t
			}, function(i) {
				i[a.method] && i[a.method](t.name, t.dataIndex);
				var n = i.getData();
				n.each(function(t) {
					var e = n.getName(t);
					r[e] = i.isSelected(e) || !1
				})
			}), {
				name: t.name,
				selected: r,
				seriesId: t.seriesId
			}
		})
	}), Hd((sm = "pie", {
		getTargetSeries: function(t) {
			var e = {},
				i = Q();
			return t.eachSeriesByType(sm, function(t) {
				t.__paletteScope = e, i.set(t.uid, t)
			}), i
		},
		reset: function(s, t) {
			var l = s.getRawData(),
				h = {},
				u = s.getData();
			u.each(function(t) {
				var e = u.getRawIndex(t);
				h[e] = t
			}), l.each(function(t) {
				var e, i = h[t],
					n = null != i && u.getItemVisual(i, "color", !0),
					r = null != i && u.getItemVisual(i, "borderColor", !0);
				if (n && r || (e = l.getItemModel(t)), n) l.setItemVisual(t, "color", n);
				else {
					var a = e.get("itemStyle.color") || s.getColorFromPalette(l.getName(t) || t + "", s.__paletteScope, l.count());
					l.setItemVisual(t, "color", a), null != i && u.setItemVisual(i, "color", a)
				}
				if (r) l.setItemVisual(t, "borderColor", r);
				else {
					var o = e.get("itemStyle.borderColor");
					l.setItemVisual(t, "borderColor", o), null != i && u.setItemVisual(i, "borderColor", o)
				}
			})
		}
	})), Fd(A(function(t, e, C, i) {
		e.eachSeriesByType(t, function(t) {
			var r = t.getData(),
				e = r.mapDimension("value"),
				i = t.get("center"),
				n = t.get("radius");
			O(n) || (n = [0, n]), O(i) || (i = [i, i]);
			var a = C.getWidth(),
				o = C.getHeight(),
				s = Math.min(a, o),
				l = hl(i[0], a),
				h = hl(i[1], o),
				u = hl(n[0], s / 2),
				c = hl(n[1], s / 2),
				d = -t.get("startAngle") * hm,
				f = t.get("minAngle") * hm,
				p = 0;
			r.each(e, function(t) {
				isNaN(t) || p++
			});
			var g = r.getSum(e),
				v = Math.PI / (g || p) * 2,
				m = t.get("clockwise"),
				y = t.get("roseType"),
				_ = t.get("stillShowZeroSum"),
				x = r.getDataExtent(e);
			x[0] = 0;
			var w = lm,
				b = 0,
				S = d,
				M = m ? 1 : -1;
			if (r.each(e, function(t, e) {
					var i;
					if (isNaN(t)) r.setItemLayout(e, {
						angle: NaN,
						startAngle: NaN,
						endAngle: NaN,
						clockwise: m,
						cx: l,
						cy: h,
						r0: u,
						r: y ? NaN : c
					});
					else {
						(i = "area" !== y ? 0 === g && _ ? v : t * v : lm / p) < f ? w -= i = f : b += t;
						var n = S + M * i;
						r.setItemLayout(e, {
							angle: i,
							startAngle: S,
							endAngle: n,
							clockwise: m,
							cx: l,
							cy: h,
							r0: u,
							r: y ? ll(t, x, [u, c]) : c
						}), S = n
					}
				}), w < lm && p)
				if (w <= .001) {
					var I = lm / p;
					r.each(e, function(t, e) {
						if (!isNaN(t)) {
							var i = r.getItemLayout(e);
							i.angle = I, i.startAngle = d + M * e * I, i.endAngle = d + M * (e + 1) * I
						}
					})
				} else v = w / b, S = d, r.each(e, function(t, e) {
					if (!isNaN(t)) {
						var i = r.getItemLayout(e),
							n = i.angle === f ? f : t * v;
						i.startAngle = S, i.endAngle = S + M * n, S += M * n
					}
				});
			am(t, c, 0, o)
		})
	}, "pie")), Bd({
		seriesType: "pie",
		reset: function(t, e) {
			var n = e.findComponents({
				mainType: "legend"
			});
			if (n && n.length) {
				var r = t.getData();
				r.filterSelf(function(t) {
					for (var e = r.getName(t), i = 0; i < n.length; i++)
						if (!n[i].isSelected(e)) return !1;
					return !0
				})
			}
		}
	}), Tu.extend({
		type: "series.scatter",
		dependencies: ["grid", "polar", "geo", "singleAxis", "calendar"],
		getInitialData: function(t, e) {
			return Df(this.getSource(), this)
		},
		brushSelector: "point",
		getProgressive: function() {
			var t = this.option.progressive;
			return null == t ? this.option.large ? 5e3 : this.get("progressive") : t
		},
		getProgressiveThreshold: function() {
			var t = this.option.progressiveThreshold;
			return null == t ? this.option.large ? 1e4 : this.get("progressiveThreshold") : t
		},
		defaultOption: {
			coordinateSystem: "cartesian2d",
			zlevel: 0,
			z: 2,
			legendHoverLink: !0,
			hoverAnimation: !0,
			symbolSize: 10,
			large: !1,
			largeThreshold: 2e3,
			itemStyle: {
				opacity: .8
			},
			clip: !0
		}
	});
	var um = rs({
		shape: {
			points: null
		},
		symbolProxy: null,
		softClipShape: null,
		buildPath: function(t, e) {
			var i = e.points,
				n = e.size,
				r = this.symbolProxy,
				a = r.shape;
			if (!((t.getContext ? t.getContext() : t) && n[0] < 4))
				for (var o = 0; o < i.length;) {
					var s = i[o++],
						l = i[o++];
					isNaN(s) || isNaN(l) || this.softClipShape && !this.softClipShape.contain(s, l) || (a.x = s - n[0] / 2, a.y =
						l - n[1] / 2, a.width = n[0], a.height = n[1], r.buildPath(t, a, !0))
				}
		},
		afterBrush: function(t) {
			var e = this.shape,
				i = e.points,
				n = e.size;
			if (n[0] < 4) {
				this.setTransform(t);
				for (var r = 0; r < i.length;) {
					var a = i[r++],
						o = i[r++];
					isNaN(a) || isNaN(o) || this.softClipShape && !this.softClipShape.contain(a, o) || t.fillRect(a - n[0] / 2, o -
						n[1] / 2, n[0], n[1])
				}
				this.restoreTransform(t)
			}
		},
		findDataIndex: function(t, e) {
			for (var i = this.shape, n = i.points, r = i.size, a = Math.max(r[0], 4), o = Math.max(r[1], 4), s = n.length /
					2 - 1; 0 <= s; s--) {
				var l = 2 * s,
					h = n[l] - a / 2,
					u = n[1 + l] - o / 2;
				if (h <= t && u <= e && t <= h + a && e <= u + o) return s
			}
			return -1
		}
	});

	function cm() {
		this.group = new mi
	}
	var dm = cm.prototype;
	dm.isPersistent = function() {
		return !this._incremental
	}, dm.updateData = function(t, e) {
		this.group.removeAll();
		var i = new um({
			rectHover: !0,
			cursor: "default"
		});
		i.setShape({
			points: t.getLayout("symbolPoints")
		}), this._setCommon(i, t, !1, e), this.group.add(i), this._incremental = null
	}, dm.updateLayout = function(t) {
		if (!this._incremental) {
			var n = t.getLayout("symbolPoints");
			this.group.eachChild(function(t) {
				if (null != t.startIndex) {
					var e = 2 * (t.endIndex - t.startIndex),
						i = 4 * t.startIndex * 2;
					n = new Float32Array(n.buffer, i, e)
				}
				t.setShape("points", n)
			})
		}
	}, dm.incrementalPrepareUpdate = function(t) {
		this.group.removeAll(), this._clearIncremental(), 2e6 < t.count() ? (this._incremental || (this._incremental = new Yo({
			silent: !0
		})), this.group.add(this._incremental)) : this._incremental = null
	}, dm.incrementalUpdate = function(t, e, i) {
		var n;
		this._incremental ? (n = new um, this._incremental.addDisplayable(n, !0)) : ((n = new um({
			rectHover: !0,
			cursor: "default",
			startIndex: t.start,
			endIndex: t.end
		})).incremental = !0, this.group.add(n)), n.setShape({
			points: e.getLayout("symbolPoints")
		}), this._setCommon(n, e, !!this._incremental, i)
	}, dm._setCommon = function(i, t, e, n) {
		var r = t.hostModel;
		n = n || {};
		var a = t.getVisual("symbolSize");
		i.setShape("size", a instanceof Array ? a : [a, a]), i.softClipShape = n.clipShape || null, i.symbolProxy = Op(t.getVisual(
			"symbol"), 0, 0, 0, 0), i.setColor = i.symbolProxy.setColor;
		var o = i.shape.size[0] < 4;
		i.useStyle(r.getModel("itemStyle").getItemStyle(o ? ["color", "shadowBlur", "shadowColor"] : ["color"]));
		var s = t.getVisual("color");
		s && i.setColor(s), e || (i.seriesIndex = r.seriesIndex, i.on("mousemove", function(t) {
			i.dataIndex = null;
			var e = i.findDataIndex(t.offsetX, t.offsetY);
			0 <= e && (i.dataIndex = e + (i.startIndex || 0))
		}))
	}, dm.remove = function() {
		this._clearIncremental(), this._incremental = null, this.group.removeAll()
	}, dm._clearIncremental = function() {
		var t = this._incremental;
		t && t.clearDisplaybles()
	}, Yd({
		type: "scatter",
		render: function(t, e, i) {
			var n = t.getData();
			this._updateSymbolDraw(n, t).updateData(n, {
				clipShape: this._getClipShape(t)
			}), this._finished = !0
		},
		incrementalPrepareRender: function(t, e, i) {
			var n = t.getData();
			this._updateSymbolDraw(n, t).incrementalPrepareUpdate(n), this._finished = !1
		},
		incrementalRender: function(t, e, i) {
			this._symbolDraw.incrementalUpdate(t, e.getData(), {
				clipShape: this._getClipShape(e)
			}), this._finished = t.end === e.getData().count()
		},
		updateTransform: function(t, e, i) {
			var n = t.getData();
			if (this.group.dirty(), !this._finished || 1e4 < n.count() || !this._symbolDraw.isPersistent()) return {
				update: !0
			};
			var r = Hg().reset(t);
			r.progress && r.progress({
				start: 0,
				end: n.count()
			}, n), this._symbolDraw.updateLayout(n)
		},
		_getClipShape: function(t) {
			var e = t.coordinateSystem,
				i = e && e.getArea && e.getArea();
			return t.get("clip", !0) ? i : null
		},
		_updateSymbolDraw: function(t, e) {
			var i = this._symbolDraw,
				n = e.pipelineContext.large;
			return i && n === this._isLargeDraw || (i && i.remove(), i = this._symbolDraw = n ? new cm : new pg, this._isLargeDraw =
				n, this.group.removeAll()), this.group.add(i.group), i
		},
		remove: function(t, e) {
			this._symbolDraw && this._symbolDraw.remove(!0), this._symbolDraw = null
		},
		dispose: function() {}
	}), Hd(Fg("scatter", "circle")), Fd(Hg("scatter"));
	var fm = {
		path: null,
		compoundPath: null,
		group: mi,
		image: Hn,
		text: wo
	};
	Rd(function(t) {
		var e = t.graphic;
		O(e) ? e[0] && e[0].elements ? t.graphic = [t.graphic[0]] : t.graphic = [{
			elements: e
		}] : e && !e.elements && (t.graphic = [{
			elements: [e]
		}])
	});
	var pm = Zd({
		type: "graphic",
		defaultOption: {
			elements: [],
			parentId: null
		},
		_elOptionsToUpdate: null,
		mergeOption: function(t) {
			var e = this.option.elements;
			this.option.elements = null, pm.superApply(this, "mergeOption", arguments), this.option.elements = e
		},
		optionUpdated: function(t, e) {
			var i = this.option,
				n = (e ? i : t).elements,
				r = i.elements = e ? [] : i.elements,
				a = [];
			this._flatten(n, a);
			var o = _r(r, a);
			xr(o);
			var s = this._elOptionsToUpdate = [];
			D(o, function(t, e) {
				var i = t.option;
				i && (s.push(i), function(t, e) {
					var i = t.exist;
					if (e.id = t.keyInfo.id, !e.type && i && (e.type = i.type), null == e.parentId) {
						var n = e.parentOption;
						n ? e.parentId = n.id : i && (e.parentId = i.parentId)
					}
					e.parentOption = null
				}(t, i), function(t, e, i) {
					var n = k({}, i),
						r = t[e],
						a = i.$action || "merge";
					"merge" === a ? r ? (v(r, n, !0), Xl(r, n, {
						ignoreSize: !0
					}), jl(i, r)) : t[e] = n : "replace" === a ? t[e] = n : "remove" === a && r && (t[e] = null)
				}(r, e, i), function(t, e) {
					if (!t) return;
					t.hv = e.hv = [mm(e, ["left", "right"]), mm(e, ["top", "bottom"])], "group" === t.type && (null == t.width &&
						(t.width = e.width = 0), null == t.height && (t.height = e.height = 0))
				}(r[e], i))
			}, this);
			for (var l = r.length - 1; 0 <= l; l--) null == r[l] ? r.splice(l, 1) : delete r[l].$action
		},
		_flatten: function(t, i, n) {
			D(t, function(t) {
				if (t) {
					n && (t.parentOption = n), i.push(t);
					var e = t.children;
					"group" === t.type && e && this._flatten(e, i, t), delete t.children
				}
			}, this)
		},
		useElOptionsToUpdate: function() {
			var t = this._elOptionsToUpdate;
			return this._elOptionsToUpdate = null, t
		}
	});

	function gm(t, e, i, n) {
		var r = i.type,
			a = new(fm.hasOwnProperty(r) ? fm[r] : os(r))(i);
		e.add(a), n.set(t, a), a.__ecGraphicId = t
	}

	function vm(t, e) {
		var i = t && t.parent;
		i && ("group" === t.type && t.traverse(function(t) {
			vm(t, e)
		}), e.removeKey(t.__ecGraphicId), i.remove(t))
	}

	function mm(e, t) {
		var i;
		return D(t, function(t) {
			null != e[t] && "auto" !== e[t] && (i = !0)
		}), i
	}
	Ud({
		type: "graphic",
		init: function(t, e) {
			this._elMap = Q(), this._lastGraphicModel
		},
		render: function(t, e, i) {
			t !== this._lastGraphicModel && this._clear(), this._lastGraphicModel = t, this._updateElements(t), this._relocate(
				t, i)
		},
		_updateElements: function(h) {
			var t = h.useElOptionsToUpdate();
			if (t) {
				var u = this._elMap,
					c = this.group;
				D(t, function(t) {
					var e = t.$action,
						i = t.id,
						n = u.get(i),
						r = t.parentId,
						a = null != r ? u.get(r) : c,
						o = t.style;
					"text" === t.type && o && (t.hv && t.hv[1] && (o.textVerticalAlign = o.textBaseline = null), !o.hasOwnProperty(
						"textFill") && o.fill && (o.textFill = o.fill), !o.hasOwnProperty("textStroke") && o.stroke && (o.textStroke =
						o.stroke));
					var s = function(e) {
						return e = k({}, e), D(["id", "parentId", "$action", "hv", "bounding"].concat(Fl), function(t) {
							delete e[t]
						}), e
					}(t);
					e && "merge" !== e ? "replace" === e ? (vm(n, u), gm(i, a, s, u)) : "remove" === e && vm(n, u) : n ? n.attr(
						s) : gm(i, a, s, u);
					var l = u.get(i);
					l && (l.__ecGraphicWidthOption = t.width, l.__ecGraphicHeightOption = t.height, function(t, e) {
						var i = t.eventData;
						t.silent || t.ignore || i || (i = t.eventData = {
							componentType: "graphic",
							componentIndex: e.componentIndex,
							name: t.name
						});
						i && (i.info = t.info)
					}(l, h))
				})
			}
		},
		_relocate: function(t, e) {
			for (var i = t.option.elements, n = this.group, r = this._elMap, a = e.getWidth(), o = e.getHeight(), s = 0; s <
				i.length; s++) {
				var l = i[s];
				if ((u = r.get(l.id)) && u.isGroup) {
					var h = (c = u.parent) === n;
					u.__ecGraphicWidth = hl(u.__ecGraphicWidthOption, h ? a : c.__ecGraphicWidth) || 0, u.__ecGraphicHeight = hl(u
						.__ecGraphicHeightOption, h ? o : c.__ecGraphicHeight) || 0
				}
			}
			for (s = i.length - 1; 0 <= s; s--) {
				var u, c;
				l = i[s];
				if (u = r.get(l.id)) Ul(u, l, (c = u.parent) === n ? {
					width: a,
					height: o
				} : {
					width: c.__ecGraphicWidth,
					height: c.__ecGraphicHeight
				}, null, {
					hv: l.hv,
					boundingMode: l.bounding
				})
			}
		},
		_clear: function() {
			var e = this._elMap;
			e.each(function(t) {
				vm(t, e)
			}), this._elMap = Q()
		},
		dispose: function() {
			this._clear()
		}
	});

	function ym(t, e) {
		var i, n = [],
			r = t.seriesIndex;
		if (null == r || !(i = e.getSeriesByIndex(r))) return {
			point: []
		};
		var a = i.getData(),
			o = Sr(a, t);
		if (null == o || o < 0 || O(o)) return {
			point: []
		};
		var s = a.getItemGraphicEl(o),
			l = i.coordinateSystem;
		if (i.getTooltipPosition) n = i.getTooltipPosition(o) || [];
		else if (l && l.dataToPoint) n = l.dataToPoint(a.getValues(P(l.dimensions, function(t) {
			return a.mapDimension(t)
		}), o, !0)) || [];
		else if (s) {
			var h = s.getBoundingRect().clone();
			h.applyTransform(s.transform), n = [h.x + h.width / 2, h.y + h.height / 2]
		}
		return {
			point: n,
			el: s
		}
	}
	var _m = D,
		xm = A,
		wm = Mr();

	function bm(t, e, i, n, r) {
		var a = t.axis;
		if (!a.scale.isBlank() && a.containData(e))
			if (t.involveSeries) {
				var o = function(l, t) {
						var h = t.axis,
							u = h.dim,
							c = l,
							d = [],
							f = Number.MAX_VALUE,
							p = -1;
						return _m(t.seriesModels, function(e, t) {
							var i, n, r = e.getData().mapDimension(u, !0);
							if (e.getAxisTooltipData) {
								var a = e.getAxisTooltipData(r, l, h);
								n = a.dataIndices, i = a.nestestValue
							} else {
								if (!(n = e.getData().indicesOfNearest(r[0], l, "category" === h.type ? .5 : null)).length) return;
								i = e.getData().get(r[0], n[0])
							}
							if (null != i && isFinite(i)) {
								var o = l - i,
									s = Math.abs(o);
								s <= f && ((s < f || 0 <= o && p < 0) && (f = s, p = o, c = i, d.length = 0), _m(n, function(t) {
									d.push({
										seriesIndex: e.seriesIndex,
										dataIndexInside: t,
										dataIndex: e.getData().getRawIndex(t)
									})
								}))
							}
						}), {
							payloadBatch: d,
							snapToValue: c
						}
					}(e, t),
					s = o.payloadBatch,
					l = o.snapToValue;
				s[0] && null == r.seriesIndex && k(r, s[0]), !n && t.snap && a.containData(l) && null != l && (e = l), i.showPointer(
					t, e, s, r), i.showTooltip(t, o, l)
			} else i.showPointer(t, e)
	}

	function Sm(t, e, i, n) {
		t[e.key] = {
			value: i,
			payloadBatch: n
		}
	}

	function Mm(t, e, i, n) {
		var r = i.payloadBatch,
			a = e.axis,
			o = a.model,
			s = e.axisPointerModel;
		if (e.triggerTooltip && r.length) {
			var l = e.coordSys.model,
				h = Mv(l),
				u = t.map[h];
			u || (u = t.map[h] = {
				coordSysId: l.id,
				coordSysIndex: l.componentIndex,
				coordSysType: l.type,
				coordSysMainType: l.mainType,
				dataByAxis: []
			}, t.list.push(u)), u.dataByAxis.push({
				axisDim: a.dim,
				axisIndex: o.componentIndex,
				axisType: o.type,
				axisId: o.id,
				value: n,
				valueLabelOpt: {
					precision: s.get("label.precision"),
					formatter: s.get("label.formatter")
				},
				seriesDataIndices: r.slice()
			})
		}
	}

	function Im(t) {
		var e = t.axis.model,
			i = {},
			n = i.axisDim = t.axis.dim;
		return i.axisIndex = i[n + "AxisIndex"] = e.componentIndex, i.axisName = i[n + "AxisName"] = e.name, i.axisId = i[n +
			"AxisId"] = e.id, i
	}

	function Cm(t) {
		return !t || null == t[0] || isNaN(t[0]) || null == t[1] || isNaN(t[1])
	}
	Zd({
		type: "axisPointer",
		coordSysAxesInfo: null,
		defaultOption: {
			show: "auto",
			triggerOn: null,
			zlevel: 0,
			z: 50,
			type: "line",
			snap: !1,
			triggerTooltip: !0,
			value: null,
			status: null,
			link: [],
			animation: null,
			animationDurationUpdate: 200,
			lineStyle: {
				color: "#aaa",
				width: 1,
				type: "solid"
			},
			shadowStyle: {
				color: "rgba(150,150,150,0.3)"
			},
			label: {
				show: !0,
				formatter: null,
				precision: "auto",
				margin: 3,
				color: "#fff",
				padding: [5, 7, 5, 7],
				backgroundColor: "auto",
				borderColor: null,
				borderWidth: 0,
				shadowBlur: 3,
				shadowColor: "#aaa"
			},
			handle: {
				show: !1,
				icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
				size: 45,
				margin: 50,
				color: "#333",
				shadowBlur: 3,
				shadowColor: "#aaa",
				shadowOffsetX: 0,
				shadowOffsetY: 2,
				throttle: 40
			}
		}
	});
	var Am = Mr(),
		Tm = D;

	function Dm(t, e, i) {
		if (!m.node) {
			var n = e.getZr();
			Am(n).records || (Am(n).records = {}),
				function(r, a) {
					if (Am(r).initialized) return;

					function t(t, n) {
						r.on(t, function(e) {
							var i = function(i) {
								var n = {
										showTip: [],
										hideTip: []
									},
									r = function(t) {
										var e = n[t.type];
										e ? e.push(t) : (t.dispatchAction = r, i.dispatchAction(t))
									};
								return {
									dispatchAction: r,
									pendings: n
								}
							}(a);
							Tm(Am(r).records, function(t) {
									t && n(t, e, i.dispatchAction)
								}),
								function(t, e) {
									var i, n = t.showTip.length,
										r = t.hideTip.length;
									n ? i = t.showTip[n - 1] : r && (i = t.hideTip[r - 1]);
									i && (i.dispatchAction = null, e.dispatchAction(i))
								}(i.pendings, a)
						})
					}
					Am(r).initialized = !0, t("click", A(Pm, "click")), t("mousemove", A(Pm, "mousemove")), t("globalout", km)
				}(n, e), (Am(n).records[t] || (Am(n).records[t] = {})).handler = i
		}
	}

	function km(t, e, i) {
		t.handler("leave", null, i)
	}

	function Pm(t, e, i, n) {
		e.handler(t, i, n)
	}

	function Lm(t, e) {
		if (!m.node) {
			var i = e.getZr();
			(Am(i).records || {})[t] && (Am(i).records[t] = null)
		}
	}
	var Om = Ud({
			type: "axisPointer",
			render: function(t, e, i) {
				var n = e.getComponent("tooltip"),
					r = t.get("triggerOn") || n && n.get("triggerOn") || "mousemove|click";
				Dm("axisPointer", i, function(t, e, i) {
					"none" !== r && ("leave" === t || 0 <= r.indexOf(t)) && i({
						type: "updateAxisPointer",
						currTrigger: t,
						x: e && e.offsetX,
						y: e && e.offsetY
					})
				})
			},
			remove: function(t, e) {
				Lm(e.getZr(), "axisPointer"), Om.superApply(this._model, "remove", arguments)
			},
			dispose: function(t, e) {
				Lm("axisPointer", e), Om.superApply(this._model, "dispose", arguments)
			}
		}),
		zm = Mr(),
		Em = b,
		Nm = C;

	function Rm() {}

	function Bm(t, e, i, n) {
		! function i(n, t) {
			{
				if (N(n) && N(t)) {
					var r = !0;
					return D(t, function(t, e) {
						r = r && i(n[e], t)
					}), !!r
				}
				return n === t
			}
		}(zm(i).lastProp, n) && (zm(i).lastProp = n, e ? Vs(i, n, t) : (i.stopAnimation(), i.attr(n)))
	}

	function Vm(t, e) {
		t[e.get("label.show") ? "show" : "hide"]()
	}

	function Fm(t) {
		return {
			position: t.position.slice(),
			rotation: t.rotation || 0
		}
	}

	function Hm(t, e, i) {
		var n = e.get("z"),
			r = e.get("zlevel");
		t && t.traverse(function(t) {
			"group" !== t.type && (null != n && (t.z = n), null != r && (t.zlevel = r), t.silent = i)
		})
	}

	function Gm(t, e, i, n, r) {
		var a = Wm(i.get("value"), e.axis, e.ecModel, i.get("seriesDataIndices"), {
				precision: i.get("label.precision"),
				formatter: i.get("label.formatter")
			}),
			o = i.getModel("label"),
			s = Cl(o.get("padding") || 0),
			l = o.getFont(),
			h = nn(a, l),
			u = r.position,
			c = h.width + s[1] + s[3],
			d = h.height + s[0] + s[2],
			f = r.align;
		"right" === f && (u[0] -= c), "center" === f && (u[0] -= c / 2);
		var p = r.verticalAlign;
		"bottom" === p && (u[1] -= d), "middle" === p && (u[1] -= d / 2),
			function(t, e, i, n) {
				var r = n.getWidth(),
					a = n.getHeight();
				t[0] = Math.min(t[0] + e, r) - e, t[1] = Math.min(t[1] + i, a) - i, t[0] = Math.max(t[0], 0), t[1] = Math.max(t[1],
					0)
			}(u, c, d, n);
		var g = o.get("backgroundColor");
		g && "auto" !== g || (g = e.get("axisLine.lineStyle.color")), t.label = {
			shape: {
				x: 0,
				y: 0,
				width: c,
				height: d,
				r: o.get("borderRadius")
			},
			position: u.slice(),
			style: {
				text: a,
				textFont: l,
				textFill: o.getTextColor(),
				textPosition: "inside",
				textPadding: s,
				fill: g,
				stroke: o.get("borderColor") || "transparent",
				lineWidth: o.get("borderWidth") || 0,
				shadowBlur: o.get("shadowBlur"),
				shadowColor: o.get("shadowColor"),
				shadowOffsetX: o.get("shadowOffsetX"),
				shadowOffsetY: o.get("shadowOffsetY")
			},
			z2: 10
		}
	}

	function Wm(t, e, r, i, n) {
		t = e.scale.parse(t);
		var a = e.scale.getLabel(t, {
				precision: n.precision
			}),
			o = n.formatter;
		if (o) {
			var s = {
				value: wp(e, t),
				axisDimension: e.dim,
				axisIndex: e.index,
				seriesData: []
			};
			D(i, function(t) {
				var e = r.getSeriesByIndex(t.seriesIndex),
					i = t.dataIndexInside,
					n = e && e.getDataParams(i);
				n && s.seriesData.push(n)
			}), E(o) ? a = o.replace("{value}", a) : z(o) && (a = o(s))
		}
		return a
	}

	function Zm(t, e, i) {
		var n = qt();
		return te(n, n, i.rotation), Jt(n, n, i.position), Gs([t.dataToCoord(e), (i.labelOffset || 0) + (i.labelDirection ||
			1) * (i.labelMargin || 0)], n)
	}
	Or((Rm.prototype = {
		_group: null,
		_lastGraphicKey: null,
		_handle: null,
		_dragging: !1,
		_lastValue: null,
		_lastStatus: null,
		_payloadInfo: null,
		animationThreshold: 15,
		render: function(t, e, i, n) {
			var r = e.get("value"),
				a = e.get("status");
			if (this._axisModel = t, this._axisPointerModel = e, this._api = i, n || this._lastValue !== r || this._lastStatus !==
				a) {
				this._lastValue = r, this._lastStatus = a;
				var o = this._group,
					s = this._handle;
				if (!a || "hide" === a) return o && o.hide(), void(s && s.hide());
				o && o.show(), s && s.show();
				var l = {};
				this.makeElOption(l, r, t, e, i);
				var h = l.graphicKey;
				h !== this._lastGraphicKey && this.clear(i), this._lastGraphicKey = h;
				var u = this._moveAnimation = this.determineAnimation(t, e);
				if (o) {
					var c = A(Bm, e, u);
					this.updatePointerEl(o, l, c, e), this.updateLabelEl(o, l, c, e)
				} else o = this._group = new mi, this.createPointerEl(o, l, t, e), this.createLabelEl(o, l, t, e), i.getZr().add(
					o);
				Hm(o, e, !0), this._renderHandle(r)
			}
		},
		remove: function(t) {
			this.clear(t)
		},
		dispose: function(t) {
			this.clear(t)
		},
		determineAnimation: function(t, e) {
			var i = e.get("animation"),
				n = t.axis,
				r = "category" === n.type,
				a = e.get("snap");
			if (!a && !r) return !1;
			if ("auto" !== i && null != i) return !0 === i;
			var o = this.animationThreshold;
			if (r && n.getBandWidth() > o) return !0;
			if (a) {
				var s = bv(t).seriesDataCount,
					l = n.getExtent();
				return Math.abs(l[0] - l[1]) / s > o
			}
			return !1
		},
		makeElOption: function(t, e, i, n, r) {},
		createPointerEl: function(t, e, i, n) {
			var r = e.pointer;
			if (r) {
				var a = zm(t).pointerEl = new qs[r.type](Em(e.pointer));
				t.add(a)
			}
		},
		createLabelEl: function(t, e, i, n) {
			if (e.label) {
				var r = zm(t).labelEl = new No(Em(e.label));
				t.add(r), Vm(r, n)
			}
		},
		updatePointerEl: function(t, e, i) {
			var n = zm(t).pointerEl;
			n && e.pointer && (n.setStyle(e.pointer.style), i(n, {
				shape: e.pointer.shape
			}))
		},
		updateLabelEl: function(t, e, i, n) {
			var r = zm(t).labelEl;
			r && (r.setStyle(e.label.style), i(r, {
				shape: e.label.shape,
				position: e.label.position
			}), Vm(r, n))
		},
		_renderHandle: function(t) {
			if (!this._dragging && this.updateHandleTransform) {
				var e, i = this._axisPointerModel,
					n = this._api.getZr(),
					r = this._handle,
					a = i.getModel("handle"),
					o = i.get("status");
				if (!a.get("show") || !o || "hide" === o) return r && n.remove(r), void(this._handle = null);
				this._handle || (e = !0, r = this._handle = Xs(a.get("icon"), {
					cursor: "move",
					draggable: !0,
					onmousemove: function(t) {
						Rt(t.event)
					},
					onmousedown: Nm(this._onHandleDragMove, this, 0, 0),
					drift: Nm(this._onHandleDragMove, this),
					ondragend: Nm(this._onHandleDragEnd, this)
				}), n.add(r)), Hm(r, i, !1);
				r.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur",
					"shadowOffsetX", "shadowOffsetY"
				]));
				var s = a.get("size");
				O(s) || (s = [s, s]), r.attr("scale", [s[0] / 2, s[1] / 2]), Qu(this, "_doDispatchAxisPointer", a.get(
					"throttle") || 0, "fixRate"), this._moveHandleToValue(t, e)
			}
		},
		_moveHandleToValue: function(t, e) {
			Bm(this._axisPointerModel, !e && this._moveAnimation, this._handle, Fm(this.getHandleTransform(t, this._axisModel,
				this._axisPointerModel)))
		},
		_onHandleDragMove: function(t, e) {
			var i = this._handle;
			if (i) {
				this._dragging = !0;
				var n = this.updateHandleTransform(Fm(i), [t, e], this._axisModel, this._axisPointerModel);
				this._payloadInfo = n, i.stopAnimation(), i.attr(Fm(n)), zm(i).lastProp = null, this._doDispatchAxisPointer()
			}
		},
		_doDispatchAxisPointer: function() {
			if (this._handle) {
				var t = this._payloadInfo,
					e = this._axisModel;
				this._api.dispatchAction({
					type: "updateAxisPointer",
					x: t.cursorPoint[0],
					y: t.cursorPoint[1],
					tooltipOption: t.tooltipOption,
					axesInfo: [{
						axisDim: e.axis.dim,
						axisIndex: e.componentIndex
					}]
				})
			}
		},
		_onHandleDragEnd: function(t) {
			if (this._dragging = !1, this._handle) {
				var e = this._axisPointerModel.get("value");
				this._moveHandleToValue(e), this._api.dispatchAction({
					type: "hideTip"
				})
			}
		},
		getHandleTransform: null,
		updateHandleTransform: null,
		clear: function(t) {
			this._lastValue = null, this._lastStatus = null;
			var e = t.getZr(),
				i = this._group,
				n = this._handle;
			e && i && (this._lastGraphicKey = null, i && e.remove(i), n && e.remove(n), this._group = null, this._handle =
				null, this._payloadInfo = null)
		},
		doClear: function() {},
		buildLabel: function(t, e, i) {
			return {
				x: t[i = i || 0],
				y: t[1 - i],
				width: e[i],
				height: e[1 - i]
			}
		}
	}).constructor = Rm);
	var Um = Rm.extend({
		makeElOption: function(t, e, i, n, r) {
			var a = i.axis,
				o = a.grid,
				s = n.get("type"),
				l = Xm(o, a).getOtherAxis(a).getGlobalExtent(),
				h = a.toGlobalCoord(a.dataToCoord(e, !0));
			if (s && "none" !== s) {
				var u = function(t) {
						var e, i = t.get("type"),
							n = t.getModel(i + "Style");
						return "line" === i ? (e = n.getLineStyle()).fill = null : "shadow" === i && ((e = n.getAreaStyle()).stroke =
							null), e
					}(n),
					c = Ym[s](a, h, l);
				c.style = u, t.graphicKey = c.type, t.pointer = c
			}! function(t, e, i, n, r, a) {
				var o = hv.innerTextLayout(i.rotation, 0, i.labelDirection);
				i.labelMargin = r.get("label.margin"), Gm(e, n, r, a, {
					position: Zm(n.axis, t, i),
					align: o.textAlign,
					verticalAlign: o.textVerticalAlign
				})
			}(e, t, Dv(o.model, i), i, n, r)
		},
		getHandleTransform: function(t, e, i) {
			var n = Dv(e.axis.grid.model, e, {
				labelInside: !1
			});
			return n.labelMargin = i.get("handle.margin"), {
				position: Zm(e.axis, t, n),
				rotation: n.rotation + (n.labelDirection < 0 ? Math.PI : 0)
			}
		},
		updateHandleTransform: function(t, e, i, n) {
			var r = i.axis,
				a = r.grid,
				o = r.getGlobalExtent(!0),
				s = Xm(a, r).getOtherAxis(r).getGlobalExtent(),
				l = "x" === r.dim ? 0 : 1,
				h = t.position;
			h[l] += e[l], h[l] = Math.min(o[1], h[l]), h[l] = Math.max(o[0], h[l]);
			var u = (s[1] + s[0]) / 2,
				c = [u, u];
			c[l] = h[l];
			return {
				position: h,
				rotation: t.rotation,
				cursorPoint: c,
				tooltipOption: [{
					verticalAlign: "middle"
				}, {
					align: "center"
				}][l]
			}
		}
	});

	function Xm(t, e) {
		var i = {};
		return i[e.dim + "AxisIndex"] = e.index, t.getCartesian(i)
	}
	var Ym = {
		line: function(t, e, i) {
			return {
				type: "Line",
				subPixelOptimize: !0,
				shape: function(t, e, i) {
					return {
						x1: t[i = i || 0],
						y1: t[1 - i],
						x2: e[i],
						y2: e[1 - i]
					}
				}([e, i[0]], [e, i[1]], jm(t))
			}
		},
		shadow: function(t, e, i) {
			var n = Math.max(1, t.getBandWidth()),
				r = i[1] - i[0];
			return {
				type: "Rect",
				shape: function(t, e, i) {
					return {
						x: t[i = i || 0],
						y: t[1 - i],
						width: e[i],
						height: e[1 - i]
					}
				}([e - n / 2, i[0]], [n, r], jm(t))
			}
		}
	};

	function jm(t) {
		return "x" === t.dim ? 0 : 1
	}
	Iv.registerAxisPointerClass("CartesianAxisPointer", Um), Rd(function(t) {
		if (t) {
			t.axisPointer && 0 !== t.axisPointer.length || (t.axisPointer = {});
			var e = t.axisPointer.link;
			e && !O(e) && (t.axisPointer.link = [e])
		}
	}), Bd($c.PROCESSOR.STATISTIC, function(t, e) {
		t.getComponent("axisPointer").coordSysAxesInfo = xv(t, e)
	}), Vd({
		type: "updateAxisPointer",
		event: "updateAxisPointer",
		update: ":updateAxisPointer"
	}, function(t, e, i) {
		var n = t.currTrigger,
			o = [t.x, t.y],
			r = t,
			a = t.dispatchAction || C(i.dispatchAction, i),
			s = e.getComponent("axisPointer").coordSysAxesInfo;
		if (s) {
			Cm(o) && (o = ym({
				seriesIndex: r.seriesIndex,
				dataIndex: r.dataIndex
			}, e).point);
			var l = Cm(o),
				h = r.axesInfo,
				u = s.axesInfo,
				c = "leave" === n || Cm(o),
				d = {},
				f = {},
				p = {
					list: [],
					map: {}
				},
				g = {
					showPointer: xm(Sm, f),
					showTooltip: xm(Mm, p)
				};
			_m(s.coordSysMap, function(t, e) {
				var a = l || t.containPoint(o);
				_m(s.coordSysAxesInfo[e], function(t, e) {
					var i = t.axis,
						n = function(t, e) {
							for (var i = 0; i < (t || []).length; i++) {
								var n = t[i];
								if (e.axis.dim === n.axisDim && e.axis.model.componentIndex === n.axisIndex) return n
							}
						}(h, t);
					if (!c && a && (!h || n)) {
						var r = n && n.value;
						null != r || l || (r = i.pointToData(o)), null != r && bm(t, r, g, !1, d)
					}
				})
			});
			var v = {};
			return _m(u, function(r, t) {
					var a = r.linkGroup;
					a && !f[t] && _m(a.axesInfo, function(t, e) {
						var i = f[e];
						if (t !== r && i) {
							var n = i.value;
							a.mapper && (n = r.axis.scale.parse(a.mapper(n, Im(t), Im(r)))), v[r.key] = n
						}
					})
				}), _m(v, function(t, e) {
					bm(u[e], t, g, !0, d)
				}),
				function(r, t, e) {
					var a = e.axesInfo = [];
					_m(t, function(t, e) {
						var i = t.axisPointerModel.option,
							n = r[e];
						n ? (t.useHandle || (i.status = "show"), i.value = n.value, i.seriesDataIndices = (n.payloadBatch || []).slice()) :
							t.useHandle || (i.status = "hide"), "show" === i.status && a.push({
								axisDim: t.axis.dim,
								axisIndex: t.axis.model.componentIndex,
								value: i.value
							})
					})
				}(f, u, d),
				function(t, e, i, n) {
					if (Cm(e) || !t.list.length) return n({
						type: "hideTip"
					});
					var r = ((t.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
					n({
						type: "showTip",
						escapeConnect: !0,
						x: e[0],
						y: e[1],
						tooltipOption: i.tooltipOption,
						position: i.position,
						dataIndexInside: r.dataIndexInside,
						dataIndex: r.dataIndex,
						seriesIndex: r.seriesIndex,
						dataByCoordSys: t.list
					})
				}(p, o, t, a),
				function(t, e, i) {
					var n = i.getZr(),
						r = "axisPointerLastHighlights",
						a = wm(n)[r] || {},
						o = wm(n)[r] = {};
					_m(t, function(t, e) {
						var i = t.axisPointerModel.option;
						"show" === i.status && _m(i.seriesDataIndices, function(t) {
							var e = t.seriesIndex + " | " + t.dataIndex;
							o[e] = t
						})
					});
					var s = [],
						l = [];
					D(a, function(t, e) {
						o[e] || l.push(t)
					}), D(o, function(t, e) {
						a[e] || s.push(t)
					}), l.length && i.dispatchAction({
						type: "downplay",
						escapeConnect: !0,
						batch: l
					}), s.length && i.dispatchAction({
						type: "highlight",
						escapeConnect: !0,
						batch: s
					})
				}(u, 0, i), d
		}
	}), Zd({
		type: "tooltip",
		dependencies: ["axisPointer"],
		defaultOption: {
			zlevel: 0,
			z: 60,
			show: !0,
			showContent: !0,
			trigger: "item",
			triggerOn: "mousemove|click",
			alwaysShowContent: !1,
			displayMode: "single",
			renderMode: "auto",
			confine: !1,
			showDelay: 0,
			hideDelay: 100,
			transitionDuration: .4,
			enterable: !1,
			backgroundColor: "rgba(50,50,50,0.7)",
			borderColor: "#333",
			borderRadius: 4,
			borderWidth: 0,
			padding: 5,
			extraCssText: "",
			axisPointer: {
				type: "line",
				axis: "auto",
				animation: "auto",
				animationDurationUpdate: 200,
				animationEasingUpdate: "exponentialOut",
				crossStyle: {
					color: "#999",
					width: 1,
					type: "dashed",
					textStyle: {}
				}
			},
			textStyle: {
				color: "#fff",
				fontSize: 14
			}
		}
	});
	var qm = D,
		$m = Il,
		Km = ["", "-webkit-", "-moz-", "-o-"];

	function Qm(r) {
		var a = [],
			t = r.get("transitionDuration"),
			e = r.get("backgroundColor"),
			i = r.getModel("textStyle"),
			n = r.get("padding");
		return t && a.push(function(t) {
			var e = "cubic-bezier(0.23, 1, 0.32, 1)",
				i = "left " + t + "s " + e + ",top " + t + "s " + e;
			return P(Km, function(t) {
				return t + "transition:" + i
			}).join(";")
		}(t)), e && (m.canvasSupported ? a.push("background-Color:" + e) : (a.push("background-Color:#" + Oe(e)), a.push(
			"filter:alpha(opacity=70)"))), qm(["width", "color", "radius"], function(t) {
			var e = "border-" + t,
				i = $m(e),
				n = r.get(i);
			null != n && a.push(e + ":" + n + ("color" === t ? "" : "px"))
		}), a.push(function(i) {
			var n = [],
				t = i.get("fontSize"),
				e = i.getTextColor();
			return e && n.push("color:" + e), n.push("font:" + i.getFont()), t && n.push("line-height:" + Math.round(3 * t /
				2) + "px"), qm(["decoration", "align"], function(t) {
				var e = i.get(t);
				e && n.push("text-" + t + ":" + e)
			}), n.join(";")
		}(i)), null != n && a.push("padding:" + Cl(n).join("px ") + "px"), a.join(";") + ";"
	}

	function Jm(i, t) {
		if (m.wxa) return null;
		var e = document.createElement("div"),
			n = this._zr = t.getZr();
		this.el = e, this._x = t.getWidth() / 2, this._y = t.getHeight() / 2, i.appendChild(e), this._container = i, this._show = !
			1, this._hideTimeout;
		var r = this;
		e.onmouseenter = function() {
			r._enterable && (clearTimeout(r._hideTimeout), r._show = !0), r._inContent = !0
		}, e.onmousemove = function(t) {
			if (t = t || window.event, !r._enterable) {
				var e = n.handler;
				Et(i, t, !0), e.dispatch("mousemove", t)
			}
		}, e.onmouseleave = function() {
			r._enterable && r._show && r.hideLater(r._hideDelay), r._inContent = !1
		}
	}

	function ty(t) {
		this._zr = t.getZr(), this._show = !1, this._hideTimeout
	}
	Jm.prototype = {
		constructor: Jm,
		_enterable: !0,
		update: function() {
			var t = this._container,
				e = t.currentStyle || document.defaultView.getComputedStyle(t),
				i = t.style;
			"absolute" !== i.position && "absolute" !== e.position && (i.position = "relative")
		},
		show: function(t) {
			clearTimeout(this._hideTimeout);
			var e = this.el;
			e.style.cssText = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + Qm(t) +
				";left:" + this._x + "px;top:" + this._y + "px;" + (t.get("extraCssText") || ""), e.style.display = e.innerHTML ?
				"block" : "none", e.style.pointerEvents = this._enterable ? "auto" : "none", this._show = !0
		},
		setContent: function(t) {
			this.el.innerHTML = null == t ? "" : t
		},
		setEnterable: function(t) {
			this._enterable = t
		},
		getSize: function() {
			var t = this.el;
			return [t.clientWidth, t.clientHeight]
		},
		moveTo: function(t, e) {
			var i, n = this._zr;
			n && n.painter && (i = n.painter.getViewportRootOffset()) && (t += i.offsetLeft, e += i.offsetTop);
			var r = this.el.style;
			r.left = t + "px", r.top = e + "px", this._x = t, this._y = e
		},
		hide: function() {
			this.el.style.display = "none", this._show = !1
		},
		hideLater: function(t) {
			!this._show || this._inContent && this._enterable || (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout =
				setTimeout(C(this.hide, this), t)) : this.hide())
		},
		isShow: function() {
			return this._show
		},
		getOuterSize: function() {
			var t = this.el.clientWidth,
				e = this.el.clientHeight;
			if (document.defaultView && document.defaultView.getComputedStyle) {
				var i = document.defaultView.getComputedStyle(this.el);
				i && (t += parseInt(i.borderLeftWidth, 10) + parseInt(i.borderRightWidth, 10), e += parseInt(i.borderTopWidth,
					10) + parseInt(i.borderBottomWidth, 10))
			}
			return {
				width: t,
				height: e
			}
		}
	}, ty.prototype = {
		constructor: ty,
		_enterable: !0,
		update: function() {},
		show: function(t) {
			this._hideTimeout && clearTimeout(this._hideTimeout), this.el.attr("show", !0), this._show = !0
		},
		setContent: function(t, e, i) {
			this.el && this._zr.remove(this.el);
			for (var n = {}, r = t, a = "{marker", o = r.indexOf(a); 0 <= o;) {
				var s = r.indexOf("|}"),
					l = r.substr(o + a.length, s - o - a.length); - 1 < l.indexOf("sub") ? n["marker" + l] = {
					textWidth: 4,
					textHeight: 4,
					textBorderRadius: 2,
					textBackgroundColor: e[l],
					textOffset: [3, 0]
				} : n["marker" + l] = {
					textWidth: 10,
					textHeight: 10,
					textBorderRadius: 5,
					textBackgroundColor: e[l]
				}, o = (r = r.substr(s + 1)).indexOf("{marker")
			}
			this.el = new wo({
				style: {
					rich: n,
					text: t,
					textLineHeight: 20,
					textBackgroundColor: i.get("backgroundColor"),
					textBorderRadius: i.get("borderRadius"),
					textFill: i.get("textStyle.color"),
					textPadding: i.get("padding")
				},
				z: i.get("z")
			}), this._zr.add(this.el);
			var h = this;
			this.el.on("mouseover", function() {
				h._enterable && (clearTimeout(h._hideTimeout), h._show = !0), h._inContent = !0
			}), this.el.on("mouseout", function() {
				h._enterable && h._show && h.hideLater(h._hideDelay), h._inContent = !1
			})
		},
		setEnterable: function(t) {
			this._enterable = t
		},
		getSize: function() {
			var t = this.el.getBoundingRect();
			return [t.width, t.height]
		},
		moveTo: function(t, e) {
			this.el && this.el.attr("position", [t, e])
		},
		hide: function() {
			this.el && this.el.hide(), this._show = !1
		},
		hideLater: function(t) {
			!this._show || this._inContent && this._enterable || (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout =
				setTimeout(C(this.hide, this), t)) : this.hide())
		},
		isShow: function() {
			return this._show
		},
		getOuterSize: function() {
			var t = this.getSize();
			return {
				width: t[0],
				height: t[1]
			}
		}
	};
	var ey = C,
		iy = D,
		ny = hl,
		ry = new No({
			shape: {
				x: -1,
				y: -1,
				width: 2,
				height: 2
			}
		});

	function ay(t) {
		for (var e = t.pop(); t.length;) {
			var i = t.pop();
			i && (il.isInstance(i) && (i = i.get("tooltip", !0)), "string" == typeof i && (i = {
				formatter: i
			}), e = new il(i, e, e.ecModel))
		}
		return e
	}

	function oy(t, e) {
		return t.dispatchAction || C(e.dispatchAction, e)
	}

	function sy(t) {
		return "center" === t || "middle" === t
	}
	Ud({
		type: "tooltip",
		init: function(t, e) {
			if (!m.node) {
				var i, n = t.getComponent("tooltip").get("renderMode");
				this._renderMode = Dr(n), "html" === this._renderMode ? (i = new Jm(e.getDom(), e), this._newLine = "<br/>") :
					(i = new ty(e), this._newLine = "\n"), this._tooltipContent = i
			}
		},
		render: function(t, e, i) {
			if (!m.node) {
				this.group.removeAll(), this._tooltipModel = t, this._ecModel = e, this._api = i, this._lastDataByCoordSys =
					null, this._alwaysShowContent = t.get("alwaysShowContent");
				var n = this._tooltipContent;
				n.update(), n.setEnterable(t.get("enterable")), this._initGlobalListener(), this._keepShow()
			}
		},
		_initGlobalListener: function() {
			var n = this._tooltipModel.get("triggerOn");
			Dm("itemTooltip", this._api, ey(function(t, e, i) {
				"none" !== n && (0 <= n.indexOf(t) ? this._tryShow(e, i) : "leave" === t && this._hide(i))
			}, this))
		},
		_keepShow: function() {
			var t = this._tooltipModel,
				e = this._ecModel,
				i = this._api;
			if (null != this._lastX && null != this._lastY && "none" !== t.get("triggerOn")) {
				var n = this;
				clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function() {
					i.isDisposed() || n.manuallyShowTip(t, e, i, {
						x: n._lastX,
						y: n._lastY
					})
				})
			}
		},
		manuallyShowTip: function(t, e, i, n) {
			if (n.from !== this.uid && !m.node) {
				var r = oy(n, i);
				this._ticket = "";
				var a = n.dataByCoordSys;
				if (n.tooltip && null != n.x && null != n.y) {
					var o = ry;
					o.position = [n.x, n.y], o.update(), o.tooltip = n.tooltip, this._tryShow({
						offsetX: n.x,
						offsetY: n.y,
						target: o
					}, r)
				} else if (a) this._tryShow({
					offsetX: n.x,
					offsetY: n.y,
					position: n.position,
					event: {},
					dataByCoordSys: n.dataByCoordSys,
					tooltipOption: n.tooltipOption
				}, r);
				else if (null != n.seriesIndex) {
					if (this._manuallyAxisShowTip(t, e, i, n)) return;
					var s = ym(n, e),
						l = s.point[0],
						h = s.point[1];
					null != l && null != h && this._tryShow({
						offsetX: l,
						offsetY: h,
						position: n.position,
						target: s.el,
						event: {}
					}, r)
				} else null != n.x && null != n.y && (i.dispatchAction({
					type: "updateAxisPointer",
					x: n.x,
					y: n.y
				}), this._tryShow({
					offsetX: n.x,
					offsetY: n.y,
					position: n.position,
					target: i.getZr().findHover(n.x, n.y).target,
					event: {}
				}, r))
			}
		},
		manuallyHideTip: function(t, e, i, n) {
			var r = this._tooltipContent;
			!this._alwaysShowContent && this._tooltipModel && r.hideLater(this._tooltipModel.get("hideDelay")), this._lastX =
				this._lastY = null, n.from !== this.uid && this._hide(oy(n, i))
		},
		_manuallyAxisShowTip: function(t, e, i, n) {
			var r = n.seriesIndex,
				a = n.dataIndex,
				o = e.getComponent("axisPointer").coordSysAxesInfo;
			if (null != r && null != a && null != o) {
				var s = e.getSeriesByIndex(r);
				if (s)
					if ("axis" === (t = ay([s.getData().getItemModel(a), s, (s.coordinateSystem || {}).model, t])).get("trigger"))
						return i.dispatchAction({
							type: "updateAxisPointer",
							seriesIndex: r,
							dataIndex: a,
							position: n.position
						}), !0
			}
		},
		_tryShow: function(t, e) {
			var i = t.target;
			if (this._tooltipModel) {
				this._lastX = t.offsetX, this._lastY = t.offsetY;
				var n = t.dataByCoordSys;
				n && n.length ? this._showAxisTooltip(n, t) : i && null != i.dataIndex ? (this._lastDataByCoordSys = null, this
					._showSeriesItemTooltip(t, i, e)) : i && i.tooltip ? (this._lastDataByCoordSys = null, this._showComponentItemTooltip(
					t, i, e)) : (this._lastDataByCoordSys = null, this._hide(e))
			}
		},
		_showOrMove: function(t, e) {
			var i = t.get("showDelay");
			e = C(e, this), clearTimeout(this._showTimout), 0 < i ? this._showTimout = setTimeout(e, i) : e()
		},
		_showAxisTooltip: function(t, e) {
			var d = this._ecModel,
				i = this._tooltipModel,
				n = [e.offsetX, e.offsetY],
				r = [],
				f = [],
				a = ay([e.tooltipOption, i]),
				p = this._renderMode,
				o = this._newLine,
				g = {};
			iy(t, function(t) {
				iy(t.dataByAxis, function(s) {
					var l = d.getComponent(s.axisDim + "Axis", s.axisIndex),
						h = s.value,
						u = [];
					if (l && null != h) {
						var c = Wm(h, l.axis, d, s.seriesDataIndices, s.valueLabelOpt);
						D(s.seriesDataIndices, function(t) {
							var e = d.getSeriesByIndex(t.seriesIndex),
								i = t.dataIndexInside,
								n = e && e.getDataParams(i);
							if (n.axisDim = s.axisDim, n.axisIndex = s.axisIndex, n.axisType = s.axisType, n.axisId = s.axisId, n.axisValue =
								wp(l.axis, h), n.axisValueLabel = c, n) {
								f.push(n);
								var r, a = e.formatTooltip(i, !0, null, p);
								if (N(a)) {
									r = a.html;
									var o = a.markers;
									v(g, o)
								} else r = a;
								u.push(r)
							}
						});
						var t = c;
						"html" !== p ? r.push(u.join(o)) : r.push((t ? Dl(t) + o : "") + u.join(o))
					}
				})
			}, this), r.reverse(), r = r.join(this._newLine + this._newLine);
			var s = e.position;
			this._showOrMove(a, function() {
				this._updateContentNotChangedOnAxis(t) ? this._updatePosition(a, s, n[0], n[1], this._tooltipContent, f) :
					this._showTooltipContent(a, r, f, Math.random(), n[0], n[1], s, void 0, g)
			})
		},
		_showSeriesItemTooltip: function(t, e, i) {
			var n = this._ecModel,
				r = e.seriesIndex,
				a = n.getSeriesByIndex(r),
				o = e.dataModel || a,
				s = e.dataIndex,
				l = e.dataType,
				h = o.getData(),
				u = ay([h.getItemModel(s), o, a && (a.coordinateSystem || {}).model, this._tooltipModel]),
				c = u.get("trigger");
			if (null == c || "item" === c) {
				var d, f, p = o.getDataParams(s, l),
					g = o.formatTooltip(s, !1, l, this._renderMode);
				f = N(g) ? (d = g.html, g.markers) : (d = g, null);
				var v = "item_" + o.name + "_" + s;
				this._showOrMove(u, function() {
					this._showTooltipContent(u, d, p, v, t.offsetX, t.offsetY, t.position, t.target, f)
				}), i({
					type: "showTip",
					dataIndexInside: s,
					dataIndex: h.getRawIndex(s),
					seriesIndex: r,
					from: this.uid
				})
			}
		},
		_showComponentItemTooltip: function(t, e, i) {
			var n = e.tooltip;
			if ("string" == typeof n) {
				n = {
					content: n,
					formatter: n
				}
			}
			var r = new il(n, this._tooltipModel, this._ecModel),
				a = r.get("content"),
				o = Math.random();
			this._showOrMove(r, function() {
				this._showTooltipContent(r, a, r.get("formatterParams") || {}, o, t.offsetX, t.offsetY, t.position, e)
			}), i({
				type: "showTip",
				from: this.uid
			})
		},
		_showTooltipContent: function(i, t, n, e, r, a, o, s, l) {
			if (this._ticket = "", i.get("showContent") && i.get("show")) {
				var h = this._tooltipContent,
					u = i.get("formatter");
				o = o || i.get("position");
				var c = t;
				if (u && "string" == typeof u) c = Ll(u, n, !0);
				else if ("function" == typeof u) {
					var d = ey(function(t, e) {
						t === this._ticket && (h.setContent(e, l, i), this._updatePosition(i, o, r, a, h, n, s))
					}, this);
					this._ticket = e, c = u(n, e, d)
				}
				h.setContent(c, l, i), h.show(i), this._updatePosition(i, o, r, a, h, n, s)
			}
		},
		_updatePosition: function(t, e, i, n, r, a, o) {
			var s = this._api.getWidth(),
				l = this._api.getHeight();
			e = e || t.get("position");
			var h = r.getSize(),
				u = t.get("align"),
				c = t.get("verticalAlign"),
				d = o && o.getBoundingRect().clone();
			if (o && d.applyTransform(o.transform), "function" == typeof e && (e = e([i, n], a, r.el, d, {
					viewSize: [s, l],
					contentSize: h.slice()
				})), O(e)) i = ny(e[0], s), n = ny(e[1], l);
			else if (N(e)) {
				e.width = h[0], e.height = h[1];
				var f = Zl(e, {
					width: s,
					height: l
				});
				i = f.x, n = f.y, c = u = null
			} else if ("string" == typeof e && o) {
				i = (p = function(t, e, i) {
					var n = i[0],
						r = i[1],
						a = 0,
						o = 0,
						s = e.width,
						l = e.height;
					switch (t) {
						case "inside":
							a = e.x + s / 2 - n / 2, o = e.y + l / 2 - r / 2;
							break;
						case "top":
							a = e.x + s / 2 - n / 2, o = e.y - r - 5;
							break;
						case "bottom":
							a = e.x + s / 2 - n / 2, o = e.y + l + 5;
							break;
						case "left":
							a = e.x - n - 5, o = e.y + l / 2 - r / 2;
							break;
						case "right":
							a = e.x + s + 5, o = e.y + l / 2 - r / 2
					}
					return [a, o]
				}(e, d, h))[0], n = p[1]
			} else {
				var p;
				i = (p = function(t, e, i, n, r, a, o) {
					var s = i.getOuterSize(),
						l = s.width,
						h = s.height;
					null != a && (n < t + l + a ? t -= l + a : t += a);
					null != o && (r < e + h + o ? e -= h + o : e += o);
					return [t, e]
				}(i, n, r, s, l, u ? null : 20, c ? null : 20))[0], n = p[1]
			}
			u && (i -= sy(u) ? h[0] / 2 : "right" === u ? h[0] : 0), c && (n -= sy(c) ? h[1] / 2 : "bottom" === c ? h[1] : 0),
				t.get("confine") && (i = (p = function(t, e, i, n, r) {
					var a = i.getOuterSize(),
						o = a.width,
						s = a.height;
					return t = Math.min(t + o, n) - o, e = Math.min(e + s, r) - s, t = Math.max(t, 0), e = Math.max(e, 0), [t, e]
				}(i, n, r, s, l))[0], n = p[1]);
			r.moveTo(i, n)
		},
		_updateContentNotChangedOnAxis: function(n) {
			var t = this._lastDataByCoordSys,
				o = !!t && t.length === n.length;
			return o && iy(t, function(t, e) {
				var i = t.dataByAxis || {},
					a = (n[e] || {}).dataByAxis || [];
				(o &= i.length === a.length) && iy(i, function(t, e) {
					var i = a[e] || {},
						n = t.seriesDataIndices || [],
						r = i.seriesDataIndices || [];
					(o &= t.value === i.value && t.axisType === i.axisType && t.axisId === i.axisId && n.length === r.length) &&
					iy(n, function(t, e) {
						var i = r[e];
						o &= t.seriesIndex === i.seriesIndex && t.dataIndex === i.dataIndex
					})
				})
			}), this._lastDataByCoordSys = n, !!o
		},
		_hide: function(t) {
			this._lastDataByCoordSys = null, t({
				type: "hideTip",
				from: this.uid
			})
		},
		dispose: function(t, e) {
			m.node || (this._tooltipContent.hide(), Lm("itemTooltip", e))
		}
	}), Vd({
		type: "showTip",
		event: "showTip",
		update: "tooltip:manuallyShowTip"
	}, function() {}), Vd({
		type: "hideTip",
		event: "hideTip",
		update: "tooltip:manuallyHideTip"
	}, function() {});
	var ly = ec.legend.selector,
		hy = {
			all: {
				type: "all",
				title: b(ly.all)
			},
			inverse: {
				type: "inverse",
				title: b(ly.inverse)
			}
		},
		uy = Zd({
			type: "legend.plain",
			dependencies: ["series"],
			layoutMode: {
				type: "box",
				ignoreSize: !0
			},
			init: function(t, e, i) {
				this.mergeDefaultAndTheme(t, i), t.selected = t.selected || {}, this._updateSelector(t)
			},
			mergeOption: function(t) {
				uy.superCall(this, "mergeOption", t), this._updateSelector(t)
			},
			_updateSelector: function(t) {
				var i = t.selector;
				!0 === i && (i = t.selector = ["all", "inverse"]), O(i) && D(i, function(t, e) {
					E(t) && (t = {
						type: t
					}), i[e] = v(t, hy[t.type])
				})
			},
			optionUpdated: function() {
				this._updateData(this.ecModel);
				var t = this._data;
				if (t[0] && "single" === this.get("selectedMode")) {
					for (var e = !1, i = 0; i < t.length; i++) {
						var n = t[i].get("name");
						if (this.isSelected(n)) {
							this.select(n), e = !0;
							break
						}
					}
					e || this.select(t[0].get("name"))
				}
			},
			_updateData: function(a) {
				var o = [],
					s = [];
				a.eachRawSeries(function(t) {
					var e, i = t.name;
					if (s.push(i), t.legendDataProvider) {
						var n = t.legendDataProvider(),
							r = n.mapArray(n.getName);
						a.isSeriesFiltered(t) || (s = s.concat(r)), r.length ? o = o.concat(r) : e = !0
					} else e = !0;
					e && wr(t) && o.push(t.name)
				}), this._availableNames = s;
				var t = P(this.get("data") || o, function(t) {
					return "string" != typeof t && "number" != typeof t || (t = {
						name: t
					}), new il(t, this, this.ecModel)
				}, this);
				this._data = t
			},
			getData: function() {
				return this._data
			},
			select: function(t) {
				var e = this.option.selected;
				"single" === this.get("selectedMode") && D(this._data, function(t) {
					e[t.get("name")] = !1
				});
				e[t] = !0
			},
			unSelect: function(t) {
				"single" !== this.get("selectedMode") && (this.option.selected[t] = !1)
			},
			toggleSelected: function(t) {
				var e = this.option.selected;
				e.hasOwnProperty(t) || (e[t] = !0), this[e[t] ? "unSelect" : "select"](t)
			},
			allSelect: function() {
				var t = this._data,
					e = this.option.selected;
				D(t, function(t) {
					e[t.get("name", !0)] = !0
				})
			},
			inverseSelect: function() {
				var t = this._data,
					i = this.option.selected;
				D(t, function(t) {
					var e = t.get("name", !0);
					i.hasOwnProperty(e) || (i[e] = !0), i[e] = !i[e]
				})
			},
			isSelected: function(t) {
				var e = this.option.selected;
				return !(e.hasOwnProperty(t) && !e[t]) && 0 <= x(this._availableNames, t)
			},
			getOrient: function() {
				return "vertical" === this.get("orient") ? {
					index: 1,
					name: "vertical"
				} : {
					index: 0,
					name: "horizontal"
				}
			},
			defaultOption: {
				zlevel: 0,
				z: 4,
				show: !0,
				orient: "horizontal",
				left: "center",
				top: 0,
				align: "auto",
				backgroundColor: "rgba(0,0,0,0)",
				borderColor: "#ccc",
				borderRadius: 0,
				borderWidth: 0,
				padding: 5,
				itemGap: 10,
				itemWidth: 25,
				itemHeight: 14,
				inactiveColor: "#ccc",
				inactiveBorderColor: "#ccc",
				itemStyle: {
					borderWidth: 0
				},
				textStyle: {
					color: "#333"
				},
				selectedMode: !0,
				selector: !1,
				selectorLabel: {
					show: !0,
					borderRadius: 10,
					padding: [3, 5, 3, 5],
					fontSize: 12,
					fontFamily: " sans-serif",
					color: "#666",
					borderWidth: 1,
					borderColor: "#666"
				},
				emphasis: {
					selectorLabel: {
						show: !0,
						color: "#eee",
						backgroundColor: "#666"
					}
				},
				selectorPosition: "auto",
				selectorItemGap: 7,
				selectorButtonGap: 10,
				tooltip: {
					show: !1
				}
			}
		});

	function cy(t, e, i) {
		var r, a = {},
			o = "toggleSelected" === t;
		return i.eachComponent("legend", function(n) {
			o && null != r ? n[r ? "select" : "unSelect"](e.name) : "allSelect" === t || "inverseSelect" === t ? n[t]() : (n[
				t](e.name), r = n.isSelected(e.name)), D(n.getData(), function(t) {
				var e = t.get("name");
				if ("\n" !== e && "" !== e) {
					var i = n.isSelected(e);
					a.hasOwnProperty(e) ? a[e] = a[e] && i : a[e] = i
				}
			})
		}), "allSelect" === t || "inverseSelect" === t ? {
			selected: a
		} : {
			name: e.name,
			selected: a
		}
	}

	function dy(t, e) {
		var i = Cl(e.get("padding")),
			n = e.getItemStyle(["color", "opacity"]);
		return n.fill = e.get("backgroundColor"), t = new No({
			shape: {
				x: t.x - i[3],
				y: t.y - i[0],
				width: t.width + i[1] + i[3],
				height: t.height + i[0] + i[2],
				r: e.get("borderRadius")
			},
			style: n,
			silent: !0,
			z2: -1
		})
	}
	Vd("legendToggleSelect", "legendselectchanged", A(cy, "toggleSelected")), Vd("legendAllSelect", "legendselectall", A(
		cy, "allSelect")), Vd("legendInverseSelect", "legendinverseselect", A(cy, "inverseSelect")), Vd("legendSelect",
		"legendselected", A(cy, "select")), Vd("legendUnSelect", "legendunselected", A(cy, "unSelect"));
	var fy = A,
		py = D,
		gy = mi,
		vy = Ud({
			type: "legend.plain",
			newlineDisabled: !1,
			init: function() {
				this.group.add(this._contentGroup = new gy), this._backgroundEl, this.group.add(this._selectorGroup = new gy),
					this._isFirstRender = !0
			},
			getContentGroup: function() {
				return this._contentGroup
			},
			getSelectorGroup: function() {
				return this._selectorGroup
			},
			render: function(t, e, i) {
				var n = this._isFirstRender;
				if (this._isFirstRender = !1, this.resetInner(), t.get("show", !0)) {
					var r = t.get("align"),
						a = t.get("orient");
					r && "auto" !== r || (r = "right" === t.get("left") && "vertical" === a ? "right" : "left");
					var o = t.get("selector", !0),
						s = t.get("selectorPosition", !0);
					!o || s && "auto" !== s || (s = "horizontal" === a ? "end" : "start"), this.renderInner(r, t, e, i, o, a, s);
					var l = t.getBoxLayoutParams(),
						h = {
							width: i.getWidth(),
							height: i.getHeight()
						},
						u = t.get("padding"),
						c = Zl(l, h, u),
						d = this.layoutInner(t, r, c, n, o, s),
						f = Zl(T({
							width: d.width,
							height: d.height
						}, l), h, u);
					this.group.attr("position", [f.x - d.x, f.y - d.y]), this.group.add(this._backgroundEl = dy(d, t))
				}
			},
			resetInner: function() {
				this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup()
					.removeAll()
			},
			renderInner: function(h, u, c, d, t, e, i) {
				var f = this.getContentGroup(),
					p = Q(),
					g = u.get("selectedMode"),
					v = [];
				c.eachRawSeries(function(t) {
					t.get("legendHoverLink") || v.push(t.id)
				}), py(u.getData(), function(a, o) {
					var s = a.get("name");
					if (this.newlineDisabled || "" !== s && "\n" !== s) {
						var t = c.getSeriesByName(s)[0];
						if (!p.get(s))
							if (t) {
								var e = t.getData(),
									i = e.getVisual("color"),
									n = e.getVisual("borderColor");
								"function" == typeof i && (i = i(t.getDataParams(0))), "function" == typeof n && (n = n(t.getDataParams(0)));
								var r = e.getVisual("legendSymbol") || "roundRect",
									l = e.getVisual("symbol");
								this._createItem(s, o, a, u, r, l, h, i, n, g).on("click", fy(yy, s, d)).on("mouseover", fy(_y, t.name,
									null, d, v)).on("mouseout", fy(xy, t.name, null, d, v)), p.set(s, !0)
							} else c.eachRawSeries(function(t) {
								if (!p.get(s) && t.legendDataProvider) {
									var e = t.legendDataProvider(),
										i = e.indexOfName(s);
									if (i < 0) return;
									var n = e.getItemVisual(i, "color"),
										r = e.getItemVisual(i, "borderColor");
									this._createItem(s, o, a, u, "roundRect", null, h, n, r, g).on("click", fy(yy, s, d)).on("mouseover",
										fy(_y, null, s, d, v)).on("mouseout", fy(xy, null, s, d, v)), p.set(s, !0)
								}
							}, this)
					} else f.add(new gy({
						newline: !0
					}))
				}, this), t && this._createSelector(t, u, d, e, i)
			},
			_createSelector: function(t, a, o, e, i) {
				var s = this.getSelectorGroup();
				py(t, function(t) {
					! function(t) {
						var e = t.type,
							i = new wo({
								style: {
									x: 0,
									y: 0,
									align: "center",
									verticalAlign: "middle"
								},
								onclick: function() {
									o.dispatchAction({
										type: "all" === e ? "legendAllSelect" : "legendInverseSelect"
									})
								}
							});
						s.add(i);
						var n = a.getModel("selectorLabel"),
							r = a.getModel("emphasis.selectorLabel");
						ks(i.style, i.hoverStyle = {}, n, r, {
							defaultText: t.title,
							isRectText: !1
						}), Cs(i)
					}(t)
				})
			},
			_createItem: function(t, e, i, n, r, a, o, s, l, h) {
				var u = n.get("itemWidth"),
					c = n.get("itemHeight"),
					d = n.get("inactiveColor"),
					f = n.get("inactiveBorderColor"),
					p = n.get("symbolKeepAspect"),
					g = n.getModel("itemStyle"),
					v = n.isSelected(t),
					m = new gy,
					y = i.getModel("textStyle"),
					_ = i.get("icon"),
					x = i.getModel("tooltip"),
					w = x.parentModel,
					b = Op(r = _ || r, 0, 0, u, c, v ? s : d, null == p || p);
				if (m.add(my(b, r, g, l, f, v)), !_ && a && (a !== r || "none" === a)) {
					var S = .8 * c;
					"none" === a && (a = "circle");
					var M = Op(a, (u - S) / 2, (c - S) / 2, S, S, v ? s : d, null == p || p);
					m.add(my(M, a, g, l, f, v))
				}
				var I = "left" === o ? u + 5 : -5,
					C = o,
					A = n.get("formatter"),
					T = t;
				"string" == typeof A && A ? T = A.replace("{name}", null != t ? t : "") : "function" == typeof A && (T = A(t)),
					m.add(new wo({
						style: Ps({}, y, {
							text: T,
							x: I,
							y: c / 2,
							textFill: v ? y.getTextColor() : d,
							textAlign: C,
							textVerticalAlign: "middle"
						})
					}));
				var D = new No({
					shape: m.getBoundingRect(),
					invisible: !0,
					tooltip: x.get("show") ? k({
						content: t,
						formatter: w.get("formatter", !0) || function() {
							return t
						},
						formatterParams: {
							componentType: "legend",
							legendIndex: n.componentIndex,
							name: t,
							$vars: ["name"]
						}
					}, x.option) : null
				});
				return m.add(D), m.eachChild(function(t) {
					t.silent = !0
				}), D.silent = !h, this.getContentGroup().add(m), Cs(m), m.__legendDataIndex = e, m
			},
			layoutInner: function(t, e, i, n, r, a) {
				var o = this.getContentGroup(),
					s = this.getSelectorGroup();
				Wl(t.get("orient"), o, t.get("itemGap"), i.width, i.height);
				var l = o.getBoundingRect(),
					h = [-l.x, -l.y];
				if (r) {
					Wl("horizontal", s, t.get("selectorItemGap", !0));
					var u = s.getBoundingRect(),
						c = [-u.x, -u.y],
						d = t.get("selectorButtonGap", !0),
						f = t.getOrient().index,
						p = 0 === f ? "width" : "height",
						g = 0 === f ? "height" : "width",
						v = 0 === f ? "y" : "x";
					"end" === a ? c[f] += l[p] + d : h[f] += u[p] + d, c[1 - f] += l[g] / 2 - u[g] / 2, s.attr("position", c), o.attr(
						"position", h);
					var m = {
						x: 0,
						y: 0
					};
					return m[p] = l[p] + d + u[p], m[g] = Math.max(l[g], u[g]), m[v] = Math.min(0, u[v] + c[1 - f]), m
				}
				return o.attr("position", h), this.group.getBoundingRect()
			},
			remove: function() {
				this.getContentGroup().removeAll(), this._isFirstRender = !0
			}
		});

	function my(t, e, i, n, r, a) {
		var o;
		return "line" !== e && e.indexOf("empty") < 0 ? (o = i.getItemStyle(), t.style.stroke = n, a || (o.stroke = r)) : o =
			i.getItemStyle(["borderWidth", "borderColor"]), t.setStyle(o)
	}

	function yy(t, e) {
		e.dispatchAction({
			type: "legendToggleSelect",
			name: t
		})
	}

	function _y(t, e, i, n) {
		var r = i.getZr().storage.getDisplayList()[0];
		r && r.useHoverLayer || i.dispatchAction({
			type: "highlight",
			seriesName: t,
			name: e,
			excludeSeriesId: n
		})
	}

	function xy(t, e, i, n) {
		var r = i.getZr().storage.getDisplayList()[0];
		r && r.useHoverLayer || i.dispatchAction({
			type: "downplay",
			seriesName: t,
			name: e,
			excludeSeriesId: n
		})
	}
	Bd($c.PROCESSOR.SERIES_FILTER, function(t) {
		var i = t.findComponents({
			mainType: "legend"
		});
		i && i.length && t.filterSeries(function(t) {
			for (var e = 0; e < i.length; e++)
				if (!i[e].isSelected(t.name)) return !1;
			return !0
		})
	}), Jl.registerSubTypeDefaulter("legend", function() {
		return "plain"
	});
	var wy = uy.extend({
		type: "legend.scroll",
		setScrollDataIndex: function(t) {
			this.option.scrollDataIndex = t
		},
		defaultOption: {
			scrollDataIndex: 0,
			pageButtonItemGap: 5,
			pageButtonGap: null,
			pageButtonPosition: "end",
			pageFormatter: "{current}/{total}",
			pageIcons: {
				horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"],
				vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"]
			},
			pageIconColor: "#2f4554",
			pageIconInactiveColor: "#aaa",
			pageIconSize: 15,
			pageTextStyle: {
				color: "#333"
			},
			animationDurationUpdate: 800
		},
		init: function(t, e, i, n) {
			var r = Yl(t);
			wy.superCall(this, "init", t, e, i, n), by(this, t, r)
		},
		mergeOption: function(t, e) {
			wy.superCall(this, "mergeOption", t, e), by(this, this.option, t)
		}
	});

	function by(t, e, i) {
		var n = [1, 1];
		n[t.getOrient().index] = 0, Xl(e, i, {
			type: "box",
			ignoreSize: n
		})
	}
	var Sy = mi,
		My = ["width", "height"],
		Iy = ["x", "y"],
		Cy = vy.extend({
			type: "legend.scroll",
			newlineDisabled: !0,
			init: function() {
				Cy.superCall(this, "init"), this._currentIndex = 0, this.group.add(this._containerGroup = new Sy), this._containerGroup
					.add(this.getContentGroup()), this.group.add(this._controllerGroup = new Sy), this._showController
			},
			resetInner: function() {
				Cy.superCall(this, "resetInner"), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this
					._containerGroup.__rectSize = null
			},
			renderInner: function(t, r, e, a, i, n, o) {
				var s = this;
				Cy.superCall(this, "renderInner", t, r, e, a, i, n, o);
				var l = this._controllerGroup,
					h = r.get("pageIconSize", !0);
				O(h) || (h = [h, h]), c("pagePrev", 0);
				var u = r.getModel("pageTextStyle");

				function c(t, e) {
					var i = t + "DataIndex",
						n = Xs(r.get("pageIcons", !0)[r.getOrient().name][e], {
							onclick: C(s._pageGo, s, i, r, a)
						}, {
							x: -h[0] / 2,
							y: -h[1] / 2,
							width: h[0],
							height: h[1]
						});
					n.name = t, l.add(n)
				}
				l.add(new wo({
					name: "pageText",
					style: {
						textFill: u.getTextColor(),
						font: u.getFont(),
						textVerticalAlign: "middle",
						textAlign: "center"
					},
					silent: !0
				})), c("pageNext", 1)
			},
			layoutInner: function(t, e, i, n, r, a) {
				var o = this.getSelectorGroup(),
					s = t.getOrient().index,
					l = My[s],
					h = Iy[s],
					u = My[1 - s],
					c = Iy[1 - s];
				r && Wl("horizontal", o, t.get("selectorItemGap", !0));
				var d = t.get("selectorButtonGap", !0),
					f = o.getBoundingRect(),
					p = [-f.x, -f.y],
					g = b(i);
				r && (g[l] = i[l] - f[l] - d);
				var v = this._layoutContentAndController(t, n, g, s, l, u, c);
				if (r) {
					if ("end" === a) p[s] += v[l] + d;
					else {
						var m = f[l] + d;
						p[s] -= m, v[h] -= m
					}
					v[l] += f[l] + d, p[1 - s] += v[c] + v[u] / 2 - f[u] / 2, v[u] = Math.max(v[u], f[u]), v[c] = Math.min(v[c], f[
						c] + p[1 - s]), o.attr("position", p)
				}
				return v
			},
			_layoutContentAndController: function(t, e, i, n, r, a, o) {
				var s = this.getContentGroup(),
					l = this._containerGroup,
					h = this._controllerGroup;
				Wl(t.get("orient"), s, t.get("itemGap"), n ? i.width : null, n ? null : i.height), Wl("horizontal", h, t.get(
					"pageButtonItemGap", !0));
				var u = s.getBoundingRect(),
					c = h.getBoundingRect(),
					d = this._showController = u[r] > i[r],
					f = [-u.x, -u.y];
				e || (f[n] = s.position[n]);
				var p = [0, 0],
					g = [-c.x, -c.y],
					v = G(t.get("pageButtonGap", !0), t.get("itemGap", !0));
				d && ("end" === t.get("pageButtonPosition", !0) ? g[n] += i[r] - c[r] : p[n] += c[r] + v);
				g[1 - n] += u[a] / 2 - c[a] / 2, s.attr("position", f), l.attr("position", p), h.attr("position", g);
				var m = {
					x: 0,
					y: 0
				};
				if (m[r] = d ? i[r] : u[r], m[a] = Math.max(u[a], c[a]), m[o] = Math.min(0, c[o] + g[1 - n]), l.__rectSize = i[r],
					d) {
					var y = {
						x: 0,
						y: 0
					};
					y[r] = Math.max(i[r] - c[r] - v, 0), y[a] = m[a], l.setClipPath(new No({
						shape: y
					})), l.__rectSize = y[r]
				} else h.eachChild(function(t) {
					t.attr({
						invisible: !0,
						silent: !0
					})
				});
				var _ = this._getPageInfo(t);
				return null != _.pageIndex && Vs(s, {
					position: _.contentPosition
				}, d && t), this._updatePageInfoView(t, _), m
			},
			_pageGo: function(t, e, i) {
				var n = this._getPageInfo(e)[t];
				null != n && i.dispatchAction({
					type: "legendScroll",
					scrollDataIndex: n,
					legendId: e.id
				})
			},
			_updatePageInfoView: function(n, r) {
				var a = this._controllerGroup;
				D(["pagePrev", "pageNext"], function(t) {
					var e = null != r[t + "DataIndex"],
						i = a.childOfName(t);
					i && (i.setStyle("fill", e ? n.get("pageIconColor", !0) : n.get("pageIconInactiveColor", !0)), i.cursor = e ?
						"pointer" : "default")
				});
				var t = a.childOfName("pageText"),
					e = n.get("pageFormatter"),
					i = r.pageIndex,
					o = null != i ? i + 1 : 0,
					s = r.pageCount;
				t && e && t.setStyle("text", E(e) ? e.replace("{current}", o).replace("{total}", s) : e({
					current: o,
					total: s
				}))
			},
			_getPageInfo: function(t) {
				var e = t.get("scrollDataIndex", !0),
					i = this.getContentGroup(),
					n = this._containerGroup.__rectSize,
					r = t.getOrient().index,
					a = My[r],
					o = Iy[r],
					s = this._findTargetItemIndex(e),
					l = i.children(),
					h = l[s],
					u = l.length,
					c = u ? 1 : 0,
					d = {
						contentPosition: i.position.slice(),
						pageCount: c,
						pageIndex: c - 1,
						pagePrevDataIndex: null,
						pageNextDataIndex: null
					};
				if (!h) return d;
				var f = y(h);
				d.contentPosition[r] = -f.s;
				for (var p = s + 1, g = f, v = f, m = null; p <= u; ++p)(!(m = y(l[p])) && v.e > g.s + n || m && !_(m, g.s)) &&
					(g = v.i > g.i ? v : m) && (null == d.pageNextDataIndex && (d.pageNextDataIndex = g.i), ++d.pageCount), v = m;
				for (p = s - 1, g = f, v = f, m = null; - 1 <= p; --p)(m = y(l[p])) && _(v, m.s) || !(g.i < v.i) || (v = g, null ==
					d.pagePrevDataIndex && (d.pagePrevDataIndex = g.i), ++d.pageCount, ++d.pageIndex), g = m;
				return d;

				function y(t) {
					if (t) {
						var e = t.getBoundingRect(),
							i = e[o] + t.position[r];
						return {
							s: i,
							e: i + e[a],
							i: t.__legendDataIndex
						}
					}
				}

				function _(t, e) {
					return t.e >= e && t.s <= e + n
				}
			},
			_findTargetItemIndex: function(n) {
				var r, a, t = this.getContentGroup();
				return this._showController && t.eachChild(function(t, e) {
					var i = t.__legendDataIndex;
					null == a && null != i && (a = e), i === n && (r = e)
				}), null != r ? r : a
			}
		});
	Vd("legendScroll", "legendscroll", function(t, e) {
		var i = t.scrollDataIndex;
		null != i && e.eachComponent({
			mainType: "legend",
			subType: "scroll",
			query: t
		}, function(t) {
			t.setScrollDataIndex(i)
		})
	}), Zd({
		type: "title",
		layoutMode: {
			type: "box",
			ignoreSize: !0
		},
		defaultOption: {
			zlevel: 0,
			z: 6,
			show: !0,
			text: "",
			target: "blank",
			subtext: "",
			subtarget: "blank",
			left: 0,
			top: 0,
			backgroundColor: "rgba(0,0,0,0)",
			borderColor: "#ccc",
			borderWidth: 0,
			padding: 5,
			itemGap: 10,
			textStyle: {
				fontSize: 18,
				fontWeight: "bolder",
				color: "#333"
			},
			subtextStyle: {
				color: "#aaa"
			}
		}
	}), Ud({
		type: "title",
		render: function(t, e, i) {
			if (this.group.removeAll(), t.get("show")) {
				var n = this.group,
					r = t.getModel("textStyle"),
					a = t.getModel("subtextStyle"),
					o = t.get("textAlign"),
					s = G(t.get("textBaseline"), t.get("textVerticalAlign")),
					l = new wo({
						style: Ps({}, r, {
							text: t.get("text"),
							textFill: r.getTextColor()
						}, {
							disableBox: !0
						}),
						z2: 10
					}),
					h = l.getBoundingRect(),
					u = t.get("subtext"),
					c = new wo({
						style: Ps({}, a, {
							text: u,
							textFill: a.getTextColor(),
							y: h.height + t.get("itemGap"),
							textVerticalAlign: "top"
						}, {
							disableBox: !0
						}),
						z2: 10
					}),
					d = t.get("link"),
					f = t.get("sublink"),
					p = t.get("triggerEvent", !0);
				l.silent = !d && !p, c.silent = !f && !p, d && l.on("click", function() {
					window.open(d, "_" + t.get("target"))
				}), f && c.on("click", function() {
					window.open(f, "_" + t.get("subtarget"))
				}), l.eventData = c.eventData = p ? {
					componentType: "title",
					componentIndex: t.componentIndex
				} : null, n.add(l), u && n.add(c);
				var g = n.getBoundingRect(),
					v = t.getBoxLayoutParams();
				v.width = g.width, v.height = g.height;
				var m = Zl(v, {
					width: i.getWidth(),
					height: i.getHeight()
				}, t.get("padding"));
				o || ("middle" === (o = t.get("left") || t.get("right")) && (o = "center"), "right" === o ? m.x += m.width :
					"center" === o && (m.x += m.width / 2)), s || ("center" === (s = t.get("top") || t.get("bottom")) && (s =
					"middle"), "bottom" === s ? m.y += m.height : "middle" === s && (m.y += m.height / 2), s = s || "top"), n.attr(
					"position", [m.x, m.y]);
				var y = {
					textAlign: o,
					textVerticalAlign: s
				};
				l.setStyle(y), c.setStyle(y), g = n.getBoundingRect();
				var _ = m.margin,
					x = t.getItemStyle(["color", "opacity"]);
				x.fill = t.get("backgroundColor");
				var w = new No({
					shape: {
						x: g.x - _[3],
						y: g.y - _[0],
						width: g.width + _[1] + _[3],
						height: g.height + _[0] + _[2],
						r: t.get("borderRadius")
					},
					style: x,
					subPixelOptimize: !0,
					silent: !0
				});
				n.add(w)
			}
		}
	});
	var Ay = Ml,
		Ty = Dl;

	function Dy(t) {
		vr(t, "label", ["show"])
	}
	var ky = Zd({
		type: "marker",
		dependencies: ["series", "grid", "polar", "geo"],
		init: function(t, e, i) {
			this.mergeDefaultAndTheme(t, i), this._mergeOption(t, i, !1, !0)
		},
		isAnimationEnabled: function() {
			if (m.node) return !1;
			var t = this.__hostSeries;
			return this.getShallow("animation") && t && t.isAnimationEnabled()
		},
		mergeOption: function(t, e) {
			this._mergeOption(t, e, !1, !1)
		},
		_mergeOption: function(t, n, e, r) {
			var a = this.constructor,
				o = this.mainType + "Model";
			e || n.eachSeries(function(t) {
				var e = t.get(this.mainType, !0),
					i = t[o];
				e && e.data ? (i ? i._mergeOption(e, n, !0) : (r && Dy(e), D(e.data, function(t) {
					t instanceof Array ? (Dy(t[0]), Dy(t[1])) : Dy(t)
				}), k(i = new a(e, this, n), {
					mainType: this.mainType,
					seriesIndex: t.seriesIndex,
					name: t.name,
					createdBySelf: !0
				}), i.__hostSeries = t), t[o] = i) : t[o] = null
			}, this)
		},
		formatTooltip: function(t) {
			var e = this.getData(),
				i = this.getRawValue(t),
				n = O(i) ? P(i, Ay).join(", ") : Ay(i),
				r = e.getName(t),
				a = Ty(this.name);
			return null == i && !r || (a += "<br />"), r && (a += Ty(r), null != i && (a += " : ")), null != i && (a += Ty(n)),
				a
		},
		getData: function() {
			return this._data
		},
		setData: function(t) {
			this._data = t
		}
	});
	S(ky, fu), ky.extend({
		type: "markPoint",
		defaultOption: {
			zlevel: 0,
			z: 5,
			symbol: "pin",
			symbolSize: 50,
			tooltip: {
				trigger: "item"
			},
			label: {
				show: !0,
				position: "inside"
			},
			itemStyle: {
				borderWidth: 2
			},
			emphasis: {
				label: {
					show: !0
				}
			}
		}
	});
	var Py = x;

	function Ly(t, e, i, n, r, a) {
		var o = [],
			s = Af(e, n) ? e.getCalculationInfo("stackResultDimension") : n,
			l = Vy(e, s, t),
			h = e.indicesOfNearest(s, l)[0];
		o[r] = e.get(i, h), o[a] = e.get(n, h);
		var u = dl(e.get(n, h));
		return 0 <= (u = Math.min(u, 20)) && (o[a] = +o[a].toFixed(u)), o
	}
	var Oy = A,
		zy = {
			min: Oy(Ly, "min"),
			max: Oy(Ly, "max"),
			average: Oy(Ly, "average")
		};

	function Ey(t, e) {
		var i = t.getData(),
			n = t.coordinateSystem;
		if (e && ! function(t) {
				return !isNaN(parseFloat(t.x)) && !isNaN(parseFloat(t.y))
			}(e) && !O(e.coord) && n) {
			var r = n.dimensions,
				a = Ny(e, i, n, t);
			if ((e = b(e)).type && zy[e.type] && a.baseAxis && a.valueAxis) {
				var o = Py(r, a.baseAxis.dim),
					s = Py(r, a.valueAxis.dim);
				e.coord = zy[e.type](i, a.baseDataDim, a.valueDataDim, o, s), e.value = e.coord[s]
			} else {
				for (var l = [null != e.xAxis ? e.xAxis : e.radiusAxis, null != e.yAxis ? e.yAxis : e.angleAxis], h = 0; h < 2; h++)
					zy[l[h]] && (l[h] = Vy(i, i.mapDimension(r[h]), l[h]));
				e.coord = l
			}
		}
		return e
	}

	function Ny(t, e, i, n) {
		var r = {};
		return null != t.valueIndex || null != t.valueDim ? (r.valueDataDim = null != t.valueIndex ? e.getDimension(t.valueIndex) :
				t.valueDim, r.valueAxis = i.getAxis(function(t, e) {
					var i = t.getData(),
						n = i.dimensions;
					e = i.getDimension(e);
					for (var r = 0; r < n.length; r++) {
						var a = i.getDimensionInfo(n[r]);
						if (a.name === e) return a.coordDim
					}
				}(n, r.valueDataDim)), r.baseAxis = i.getOtherAxis(r.valueAxis), r.baseDataDim = e.mapDimension(r.baseAxis.dim)) :
			(r.baseAxis = n.getBaseAxis(), r.valueAxis = i.getOtherAxis(r.baseAxis), r.baseDataDim = e.mapDimension(r.baseAxis.dim),
				r.valueDataDim = e.mapDimension(r.valueAxis.dim)), r
	}

	function Ry(t, e) {
		return !(t && t.containData && e.coord && ! function(t) {
			return !(isNaN(parseFloat(t.x)) && isNaN(parseFloat(t.y)))
		}(e)) || t.containData(e.coord)
	}

	function By(t, e, i, n) {
		return n < 2 ? t.coord && t.coord[n] : t.value
	}

	function Vy(t, e, i) {
		if ("average" !== i) return "median" === i ? t.getMedian(e) : t.getDataExtent(e, !0)["max" === i ? 1 : 0];
		var n = 0,
			r = 0;
		return t.each(e, function(t, e) {
			isNaN(t) || (n += t, r++)
		}), n / r
	}
	var Fy = Ud({
		type: "marker",
		init: function() {
			this.markerGroupMap = Q()
		},
		render: function(t, i, n) {
			var e = this.markerGroupMap;
			e.each(function(t) {
				t.__keep = !1
			});
			var r = this.type + "Model";
			i.eachSeries(function(t) {
				var e = t[r];
				e && this.renderSeries(t, e, i, n)
			}, this), e.each(function(t) {
				t.__keep || this.group.remove(t.group)
			}, this)
		},
		renderSeries: function() {}
	});

	function Hy(s, l, h) {
		var u = l.coordinateSystem;
		s.each(function(t) {
			var e, i = s.getItemModel(t),
				n = hl(i.get("x"), h.getWidth()),
				r = hl(i.get("y"), h.getHeight());
			if (isNaN(n) || isNaN(r)) {
				if (l.getMarkerPosition) e = l.getMarkerPosition(s.getValues(s.dimensions, t));
				else if (u) {
					var a = s.get(u.dimensions[0], t),
						o = s.get(u.dimensions[1], t);
					e = u.dataToPoint([a, o])
				}
			} else e = [n, r];
			isNaN(n) || (e[0] = n), isNaN(r) || (e[1] = r), s.setItemLayout(t, e)
		})
	}
	Fy.extend({
		type: "markPoint",
		updateTransform: function(t, e, i) {
			e.eachSeries(function(t) {
				var e = t.markPointModel;
				e && (Hy(e.getData(), t, i), this.markerGroupMap.get(t.id).updateLayout(e))
			}, this)
		},
		renderSeries: function(t, l, e, i) {
			var n = t.coordinateSystem,
				r = t.id,
				h = t.getData(),
				a = this.markerGroupMap,
				o = a.get(r) || a.set(r, new pg),
				u = function(t, e, i) {
					var n;
					n = t ? P(t && t.dimensions, function(t) {
						return T({
							name: t
						}, e.getData().getDimensionInfo(e.getData().mapDimension(t)) || {})
					}) : [{
						name: "value",
						type: "float"
					}];
					var r = new uf(n, i),
						a = P(i.get("data"), A(Ey, e));
					t && (a = I(a, A(Ry, t)));
					return r.initData(a, null, t ? By : function(t) {
						return t.value
					}), r
				}(n, t, l);
			l.setData(u), Hy(l.getData(), t, i), u.each(function(t) {
				var e = u.getItemModel(t),
					i = e.getShallow("symbol"),
					n = e.getShallow("symbolSize"),
					r = z(i),
					a = z(n);
				if (r || a) {
					var o = l.getRawValue(t),
						s = l.getDataParams(t);
					r && (i = i(o, s)), a && (n = n(o, s))
				}
				u.setItemVisual(t, {
					symbol: i,
					symbolSize: n,
					color: e.get("itemStyle.color") || h.getVisual("color")
				})
			}), o.updateData(u), this.group.add(o.group), u.eachItemGraphicEl(function(t) {
				t.traverse(function(t) {
					t.dataModel = l
				})
			}), o.__keep = !0, o.group.silent = l.get("silent") || t.get("silent")
		}
	}), Rd(function(t) {
		t.markPoint = t.markPoint || {}
	}), ky.extend({
		type: "markLine",
		defaultOption: {
			zlevel: 0,
			z: 5,
			symbol: ["circle", "arrow"],
			symbolSize: [8, 16],
			precision: 2,
			tooltip: {
				trigger: "item"
			},
			label: {
				show: !0,
				position: "end"
			},
			lineStyle: {
				type: "dashed"
			},
			emphasis: {
				label: {
					show: !0
				},
				lineStyle: {
					width: 3
				}
			},
			animationEasing: "linear"
		}
	});
	var Gy = Bo.prototype,
		Wy = Go.prototype;

	function Zy(t) {
		return isNaN(+t.cpx1) || isNaN(+t.cpy1)
	}
	var Uy = rs({
			type: "ec-line",
			style: {
				stroke: "#000",
				fill: null
			},
			shape: {
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 0,
				percent: 1,
				cpx1: null,
				cpy1: null
			},
			buildPath: function(t, e) {
				this[Zy(e) ? "_buildPathLine" : "_buildPathCurve"](t, e)
			},
			_buildPathLine: Gy.buildPath,
			_buildPathCurve: Wy.buildPath,
			pointAt: function(t) {
				return this[Zy(this.shape) ? "_pointAtLine" : "_pointAtCurve"](t)
			},
			_pointAtLine: Gy.pointAt,
			_pointAtCurve: Wy.pointAt,
			tangentAt: function(t) {
				var e = this.shape,
					i = Zy(e) ? [e.x2 - e.x1, e.y2 - e.y1] : this._tangentAtCurve(t);
				return ft(i, i)
			},
			_tangentAtCurve: Wy.tangentAt
		}),
		Xy = ["fromSymbol", "toSymbol"];

	function Yy(t) {
		return "_" + t + "Type"
	}

	function jy(t, e, i) {
		var n = e.getItemVisual(i, "color"),
			r = e.getItemVisual(i, t),
			a = e.getItemVisual(i, t + "Size");
		if (r && "none" !== r) {
			O(a) || (a = [a, a]);
			var o = Op(r, -a[0] / 2, -a[1] / 2, a[0], a[1], n);
			return o.name = t, o
		}
	}

	function qy(t, e) {
		t.x1 = e[0][0], t.y1 = e[0][1], t.x2 = e[1][0], t.y2 = e[1][1], t.percent = 1;
		var i = e[2];
		i ? (t.cpx1 = i[0], t.cpy1 = i[1]) : (t.cpx1 = NaN, t.cpy1 = NaN)
	}

	function $y(t, e, i) {
		mi.call(this), this._createLine(t, e, i)
	}
	var Ky = $y.prototype;

	function Qy(t) {
		this._ctor = t || $y, this.group = new mi
	}
	Ky.beforeUpdate = function() {
		var t = this.childOfName("fromSymbol"),
			e = this.childOfName("toSymbol"),
			i = this.childOfName("label");
		if (t || e || !i.ignore) {
			for (var n = 1, r = this.parent; r;) r.scale && (n /= r.scale[0]), r = r.parent;
			var a = this.childOfName("line");
			if (this.__dirty || a.__dirty) {
				var o = a.shape.percent,
					s = a.pointAt(0),
					l = a.pointAt(o),
					h = st([], l, s);
				if (ft(h, h), t) {
					t.attr("position", s);
					var u = a.tangentAt(0);
					t.attr("rotation", Math.PI / 2 - Math.atan2(u[1], u[0])), t.attr("scale", [n * o, n * o])
				}
				if (e) {
					e.attr("position", l);
					u = a.tangentAt(1);
					e.attr("rotation", -Math.PI / 2 - Math.atan2(u[1], u[0])), e.attr("scale", [n * o, n * o])
				}
				if (!i.ignore) {
					var c, d, f;
					i.attr("position", l);
					var p = 5 * n;
					if ("end" === i.__position) c = [h[0] * p + l[0], h[1] * p + l[1]], d = .8 < h[0] ? "left" : h[0] < -.8 ?
						"right" : "center", f = .8 < h[1] ? "top" : h[1] < -.8 ? "bottom" : "middle";
					else if ("middle" === i.__position) {
						var g = o / 2,
							v = [(u = a.tangentAt(g))[1], -u[0]],
							m = a.pointAt(g);
						0 < v[1] && (v[0] = -v[0], v[1] = -v[1]), c = [m[0] + v[0] * p, m[1] + v[1] * p], d = "center", f = "bottom";
						var y = -Math.atan2(u[1], u[0]);
						l[0] < s[0] && (y = Math.PI + y), i.attr("rotation", y)
					} else c = [-h[0] * p + s[0], -h[1] * p + s[1]], d = .8 < h[0] ? "right" : h[0] < -.8 ? "left" : "center", f =
						.8 < h[1] ? "bottom" : h[1] < -.8 ? "top" : "middle";
					i.attr({
						style: {
							textVerticalAlign: i.__verticalAlign || f,
							textAlign: i.__textAlign || d
						},
						position: c,
						scale: [n, n]
					})
				}
			}
		}
	}, Ky._createLine = function(i, n, t) {
		var e = i.hostModel,
			r = function(t) {
				var e = new Uy({
					name: "line",
					subPixelOptimize: !0
				});
				return qy(e.shape, t), e
			}(i.getItemLayout(n));
		r.shape.percent = 0, Fs(r, {
			shape: {
				percent: 1
			}
		}, e, n), this.add(r);
		var a = new wo({
			name: "label",
			lineLabelOriginalOpacity: 1
		});
		this.add(a), D(Xy, function(t) {
			var e = jy(t, i, n);
			this.add(e), this[Yy(t)] = i.getItemVisual(n, t)
		}, this), this._updateCommonStl(i, n, t)
	}, Ky.updateData = function(r, a, t) {
		var e = r.hostModel,
			i = this.childOfName("line"),
			n = r.getItemLayout(a),
			o = {
				shape: {}
			};
		qy(o.shape, n), Vs(i, o, e, a), D(Xy, function(t) {
			var e = r.getItemVisual(a, t),
				i = Yy(t);
			if (this[i] !== e) {
				this.remove(this.childOfName(t));
				var n = jy(t, r, a);
				this.add(n)
			}
			this[i] = e
		}, this), this._updateCommonStl(r, a, t)
	}, Ky._updateCommonStl = function(t, e, i) {
		var n = t.hostModel,
			r = this.childOfName("line"),
			a = i && i.lineStyle,
			o = i && i.hoverLineStyle,
			s = i && i.labelModel,
			l = i && i.hoverLabelModel;
		if (!i || t.hasItemOption) {
			var h = t.getItemModel(e);
			a = h.getModel("lineStyle").getLineStyle(), o = h.getModel("emphasis.lineStyle").getLineStyle(), s = h.getModel(
				"label"), l = h.getModel("emphasis.label")
		}
		var u = t.getItemVisual(e, "color"),
			c = W(t.getItemVisual(e, "opacity"), a.opacity, 1);
		r.useStyle(T({
			strokeNoScale: !0,
			fill: "none",
			stroke: u,
			opacity: c
		}, a)), r.hoverStyle = o, D(Xy, function(t) {
			var e = this.childOfName(t);
			e && (e.setColor(u), e.setStyle({
				opacity: c
			}))
		}, this);
		var d, f, p = s.getShallow("show"),
			g = l.getShallow("show"),
			v = this.childOfName("label");
		if ((p || g) && (d = u || "#000", null == (f = n.getFormattedLabel(e, "normal", t.dataType)))) {
			var m = n.getRawValue(e);
			f = null == m ? t.getName(e) : isFinite(m) ? ul(m) : m
		}
		var y = p ? f : null,
			_ = g ? G(n.getFormattedLabel(e, "emphasis", t.dataType), f) : null,
			x = v.style;
		null == y && null == _ || (Ps(v.style, s, {
				text: y
			}, {
				autoColor: d
			}), v.__textAlign = x.textAlign, v.__verticalAlign = x.textVerticalAlign, v.__position = s.get("position") ||
			"middle"), v.hoverStyle = null != _ ? {
			text: _,
			textFill: l.getTextColor(!0),
			fontStyle: l.getShallow("fontStyle"),
			fontWeight: l.getShallow("fontWeight"),
			fontSize: l.getShallow("fontSize"),
			fontFamily: l.getShallow("fontFamily")
		} : {
			text: null
		}, v.ignore = !p && !g, Cs(this)
	}, Ky.highlight = function() {
		this.trigger("emphasis")
	}, Ky.downplay = function() {
		this.trigger("normal")
	}, Ky.updateLayout = function(t, e) {
		this.setLinePoints(t.getItemLayout(e))
	}, Ky.setLinePoints = function(t) {
		var e = this.childOfName("line");
		qy(e.shape, t), e.dirty()
	}, w($y, mi);
	var Jy = Qy.prototype;

	function t_(t) {
		var e = t.hostModel;
		return {
			lineStyle: e.getModel("lineStyle").getLineStyle(),
			hoverLineStyle: e.getModel("emphasis.lineStyle").getLineStyle(),
			labelModel: e.getModel("label"),
			hoverLabelModel: e.getModel("emphasis.label")
		}
	}

	function e_(t) {
		return isNaN(t[0]) || isNaN(t[1])
	}

	function i_(t) {
		return !e_(t[0]) && !e_(t[1])
	}
	Jy.isPersistent = function() {
		return !0
	}, Jy.updateData = function(i) {
		var n = this,
			e = n.group,
			r = n._lineData;
		n._lineData = i, r || e.removeAll();
		var a = t_(i);
		i.diff(r).add(function(t) {
			! function(t, e, i, n) {
				if (!i_(e.getItemLayout(i))) return;
				var r = new t._ctor(e, i, n);
				e.setItemGraphicEl(i, r), t.group.add(r)
			}(n, i, t, a)
		}).update(function(t, e) {
			! function(t, e, i, n, r, a) {
				var o = e.getItemGraphicEl(n);
				if (!i_(i.getItemLayout(r))) return t.group.remove(o);
				o ? o.updateData(i, r, a) : o = new t._ctor(i, r, a);
				i.setItemGraphicEl(r, o), t.group.add(o)
			}(n, r, i, e, t, a)
		}).remove(function(t) {
			e.remove(r.getItemGraphicEl(t))
		}).execute()
	}, Jy.updateLayout = function() {
		var i = this._lineData;
		i && i.eachItemGraphicEl(function(t, e) {
			t.updateLayout(i, e)
		}, this)
	}, Jy.incrementalPrepareUpdate = function(t) {
		this._seriesScope = t_(t), this._lineData = null, this.group.removeAll()
	}, Jy.incrementalUpdate = function(t, e) {
		function i(t) {
			t.isGroup || (t.incremental = t.useHoverLayer = !0)
		}
		for (var n = t.start; n < t.end; n++) {
			if (i_(e.getItemLayout(n))) {
				var r = new this._ctor(e, n, this._seriesScope);
				r.traverse(i), this.group.add(r), e.setItemGraphicEl(n, r)
			}
		}
	}, Jy.remove = function() {
		this._clearIncremental(), this._incremental = null, this.group.removeAll()
	}, Jy._clearIncremental = function() {
		var t = this._incremental;
		t && t.clearDisplaybles()
	};

	function n_(t, e, i, n) {
		var r = t.getData(),
			a = n.type;
		if (!O(n) && ("min" === a || "max" === a || "average" === a || "median" === a || null != n.xAxis || null != n.yAxis)) {
			var o, s;
			if (null != n.yAxis || null != n.xAxis) o = e.getAxis(null != n.yAxis ? "y" : "x"), s = H(n.yAxis, n.xAxis);
			else {
				var l = Ny(n, r, e, t);
				o = l.valueAxis, s = Vy(r, Tf(r, l.valueDataDim), a)
			}
			var h = "x" === o.dim ? 0 : 1,
				u = 1 - h,
				c = b(n),
				d = {};
			c.type = null, c.coord = [], d.coord = [], c.coord[u] = -1 / 0, d.coord[u] = 1 / 0;
			var f = i.get("precision");
			0 <= f && "number" == typeof s && (s = +s.toFixed(Math.min(f, 20))), c.coord[h] = d.coord[h] = s, n = [c, d, {
				type: a,
				valueIndex: n.valueIndex,
				value: s
			}]
		}
		return (n = [Ey(t, n[0]), Ey(t, n[1]), k({}, n[2])])[2].type = n[2].type || "", v(n[2], n[0]), v(n[2], n[1]), n
	}

	function r_(t) {
		return !isNaN(t) && !isFinite(t)
	}

	function a_(t, e, i, n) {
		var r = 1 - t,
			a = n.dimensions[t];
		return r_(e[r]) && r_(i[r]) && e[t] === i[t] && n.getAxis(a).containData(e[t])
	}

	function o_(t, e) {
		if ("cartesian2d" === t.type) {
			var i = e[0].coord,
				n = e[1].coord;
			if (i && n && (a_(1, i, n, t) || a_(0, i, n, t))) return !0
		}
		return Ry(t, e[0]) && Ry(t, e[1])
	}

	function s_(t, e, i, n, r) {
		var a, o = n.coordinateSystem,
			s = t.getItemModel(e),
			l = hl(s.get("x"), r.getWidth()),
			h = hl(s.get("y"), r.getHeight());
		if (isNaN(l) || isNaN(h)) {
			if (n.getMarkerPosition) a = n.getMarkerPosition(t.getValues(t.dimensions, e));
			else {
				var u = o.dimensions,
					c = t.get(u[0], e),
					d = t.get(u[1], e);
				a = o.dataToPoint([c, d])
			}
			if ("cartesian2d" === o.type) {
				var f = o.getAxis("x"),
					p = o.getAxis("y");
				u = o.dimensions;
				r_(t.get(u[0], e)) ? a[0] = f.toGlobalCoord(f.getExtent()[i ? 0 : 1]) : r_(t.get(u[1], e)) && (a[1] = p.toGlobalCoord(
					p.getExtent()[i ? 0 : 1]))
			}
			isNaN(l) || (a[0] = l), isNaN(h) || (a[1] = h)
		} else a = [l, h];
		t.setItemLayout(e, a)
	}
	Fy.extend({
		type: "markLine",
		updateTransform: function(t, e, a) {
			e.eachSeries(function(e) {
				var t = e.markLineModel;
				if (t) {
					var i = t.getData(),
						n = t.__from,
						r = t.__to;
					n.each(function(t) {
						s_(n, t, !0, e, a), s_(r, t, !1, e, a)
					}), i.each(function(t) {
						i.setItemLayout(t, [n.getItemLayout(t), r.getItemLayout(t)])
					}), this.markerGroupMap.get(e.id).updateLayout()
				}
			}, this)
		},
		renderSeries: function(r, i, t, a) {
			var e = r.coordinateSystem,
				n = r.id,
				o = r.getData(),
				s = this.markerGroupMap,
				l = s.get(n) || s.set(n, new Qy);
			this.group.add(l.group);
			var h = function(t, e, i) {
					var n;
					n = t ? P(t && t.dimensions, function(t) {
						return T({
							name: t
						}, e.getData().getDimensionInfo(e.getData().mapDimension(t)) || {})
					}) : [{
						name: "value",
						type: "float"
					}];
					var r = new uf(n, i),
						a = new uf(n, i),
						o = new uf([], i),
						s = P(i.get("data"), A(n_, e, t, i));
					t && (s = I(s, A(o_, t)));
					var l = t ? By : function(t) {
						return t.value
					};
					return r.initData(P(s, function(t) {
						return t[0]
					}), null, l), a.initData(P(s, function(t) {
						return t[1]
					}), null, l), o.initData(P(s, function(t) {
						return t[2]
					})), o.hasItemOption = !0, {
						from: r,
						to: a,
						line: o
					}
				}(e, r, i),
				u = h.from,
				c = h.to,
				d = h.line;
			i.__from = u, i.__to = c, i.setData(d);
			var f = i.get("symbol"),
				p = i.get("symbolSize");

			function g(t, e, i) {
				var n = t.getItemModel(e);
				s_(t, e, i, r, a), t.setItemVisual(e, {
					symbolSize: n.get("symbolSize") || p[i ? 0 : 1],
					symbol: n.get("symbol", !0) || f[i ? 0 : 1],
					color: n.get("itemStyle.color") || o.getVisual("color")
				})
			}
			O(f) || (f = [f, f]), "number" == typeof p && (p = [p, p]), h.from.each(function(t) {
				g(u, t, !0), g(c, t, !1)
			}), d.each(function(t) {
				var e = d.getItemModel(t).get("lineStyle.color");
				d.setItemVisual(t, {
					color: e || u.getItemVisual(t, "color")
				}), d.setItemLayout(t, [u.getItemLayout(t), c.getItemLayout(t)]), d.setItemVisual(t, {
					fromSymbolSize: u.getItemVisual(t, "symbolSize"),
					fromSymbol: u.getItemVisual(t, "symbol"),
					toSymbolSize: c.getItemVisual(t, "symbolSize"),
					toSymbol: c.getItemVisual(t, "symbol")
				})
			}), l.updateData(d), h.line.eachItemGraphicEl(function(t, e) {
				t.traverse(function(t) {
					t.dataModel = i
				})
			}), l.__keep = !0, l.group.silent = i.get("silent") || r.get("silent")
		}
	}), Rd(function(t) {
		t.markLine = t.markLine || {}
	}), ky.extend({
		type: "markArea",
		defaultOption: {
			zlevel: 0,
			z: 1,
			tooltip: {
				trigger: "item"
			},
			animation: !1,
			label: {
				show: !0,
				position: "top"
			},
			itemStyle: {
				borderWidth: 0
			},
			emphasis: {
				label: {
					show: !0,
					position: "top"
				}
			}
		}
	});

	function l_(t, e, i, n) {
		var r = Ey(t, n[0]),
			a = Ey(t, n[1]),
			o = H,
			s = r.coord,
			l = a.coord;
		s[0] = o(s[0], -1 / 0), s[1] = o(s[1], -1 / 0), l[0] = o(l[0], 1 / 0), l[1] = o(l[1], 1 / 0);
		var h = p([{}, r, a]);
		return h.coord = [r.coord, a.coord], h.x0 = r.x, h.y0 = r.y, h.x1 = a.x, h.y1 = a.y, h
	}

	function h_(t) {
		return !isNaN(t) && !isFinite(t)
	}

	function u_(t, e, i) {
		var n = 1 - t;
		return h_(e[n]) && h_(i[n])
	}

	function c_(t, e) {
		var i = e.coord[0],
			n = e.coord[1];
		return !("cartesian2d" !== t.type || !i || !n || !u_(1, i, n) && !u_(0, i, n)) || (Ry(t, {
			coord: i,
			x: e.x0,
			y: e.y0
		}) || Ry(t, {
			coord: n,
			x: e.x1,
			y: e.y1
		}))
	}

	function d_(t, e, i, n, r) {
		var a, o = n.coordinateSystem,
			s = t.getItemModel(e),
			l = hl(s.get(i[0]), r.getWidth()),
			h = hl(s.get(i[1]), r.getHeight());
		if (isNaN(l) || isNaN(h)) {
			if (n.getMarkerPosition) a = n.getMarkerPosition(t.getValues(i, e));
			else {
				var u = [f = t.get(i[0], e), p = t.get(i[1], e)];
				o.clampData && o.clampData(u, u), a = o.dataToPoint(u, !0)
			}
			if ("cartesian2d" === o.type) {
				var c = o.getAxis("x"),
					d = o.getAxis("y"),
					f = t.get(i[0], e),
					p = t.get(i[1], e);
				h_(f) ? a[0] = c.toGlobalCoord(c.getExtent()["x0" === i[0] ? 0 : 1]) : h_(p) && (a[1] = d.toGlobalCoord(d.getExtent()[
					"y0" === i[1] ? 0 : 1]))
			}
			isNaN(l) || (a[0] = l), isNaN(h) || (a[1] = h)
		} else a = [l, h];
		return a
	}
	var f_ = [
		["x0", "y0"],
		["x1", "y0"],
		["x1", "y1"],
		["x0", "y1"]
	];
	Fy.extend({
		type: "markArea",
		updateTransform: function(t, e, r) {
			e.eachSeries(function(i) {
				var t = i.markAreaModel;
				if (t) {
					var n = t.getData();
					n.each(function(e) {
						var t = P(f_, function(t) {
							return d_(n, e, t, i, r)
						});
						n.setItemLayout(e, t), n.getItemGraphicEl(e).setShape("points", t)
					})
				}
			}, this)
		},
		renderSeries: function(i, o, t, n) {
			var e = i.coordinateSystem,
				r = i.id,
				a = i.getData(),
				s = this.markerGroupMap,
				l = s.get(r) || s.set(r, {
					group: new mi
				});
			this.group.add(l.group), l.__keep = !0;
			var h = function(t, i, e) {
				var n, r;
				r = t ? (n = P(t && t.dimensions, function(t) {
					var e = i.getData();
					return T({
						name: t
					}, e.getDimensionInfo(e.mapDimension(t)) || {})
				}), new uf(P(["x0", "y0", "x1", "y1"], function(t, e) {
					return {
						name: t,
						type: n[e % 2].type
					}
				}), e)) : new uf(n = [{
					name: "value",
					type: "float"
				}], e);
				var a = P(e.get("data"), A(l_, i, t, e));
				t && (a = I(a, A(c_, t)));
				var o = t ? function(t, e, i, n) {
					return t.coord[Math.floor(n / 2)][n % 2]
				} : function(t) {
					return t.value
				};
				return r.initData(a, null, o), r.hasItemOption = !0, r
			}(e, i, o);
			o.setData(h), h.each(function(e) {
				h.setItemLayout(e, P(f_, function(t) {
					return d_(h, e, t, i, n)
				})), h.setItemVisual(e, {
					color: a.getVisual("color")
				})
			}), h.diff(l.__data).add(function(t) {
				var e = new Do({
					shape: {
						points: h.getItemLayout(t)
					}
				});
				h.setItemGraphicEl(t, e), l.group.add(e)
			}).update(function(t, e) {
				var i = l.__data.getItemGraphicEl(e);
				Vs(i, {
					shape: {
						points: h.getItemLayout(t)
					}
				}, o, t), l.group.add(i), h.setItemGraphicEl(t, i)
			}).remove(function(t) {
				var e = l.__data.getItemGraphicEl(t);
				l.group.remove(e)
			}).execute(), h.eachItemGraphicEl(function(t, e) {
				var i = h.getItemModel(e),
					n = i.getModel("label"),
					r = i.getModel("emphasis.label"),
					a = h.getItemVisual(e, "color");
				t.useStyle(T(i.getModel("itemStyle").getItemStyle(), {
					fill: Be(a, .4),
					stroke: a
				})), t.hoverStyle = i.getModel("emphasis.itemStyle").getItemStyle(), ks(t.style, t.hoverStyle, n, r, {
					labelFetcher: o,
					labelDataIndex: e,
					defaultText: h.getName(e) || "",
					isRectText: !0,
					autoColor: a
				}), Cs(t, {}), t.dataModel = o
			}), l.__data = h, l.group.silent = o.get("silent") || i.get("silent")
		}
	}), Rd(function(t) {
		t.markArea = t.markArea || {}
	}), Jl.registerSubTypeDefaulter("dataZoom", function() {
		return "slider"
	});
	var p_ = ["cartesian2d", "polar", "singleAxis"];
	var g_, v_, m_, y_, __ = (v_ = ["axisIndex", "axis", "index", "id"], m_ = P(g_ = (g_ = ["x", "y", "z", "radius",
		"angle", "single"
	]).slice(), Nl), y_ = P(v_ = (v_ || []).slice(), Nl), function(r, a) {
		D(g_, function(t, e) {
			for (var i = {
					name: t,
					capital: m_[e]
				}, n = 0; n < v_.length; n++) i[v_[n]] = t + y_[n];
			r.call(a, i)
		})
	});

	function x_(r, a, o) {
		return function(t) {
			var e, i = {
				nodes: [],
				records: {}
			};
			if (a(function(t) {
					i.records[t.name] = {}
				}), !t) return i;
			for (s(t, i); e = !1, r(n), e;);

			function n(t) {
				! function(t, e) {
					return 0 <= x(e.nodes, t)
				}(t, i) && function(t, i) {
					var n = !1;
					return a(function(e) {
						D(o(t, e) || [], function(t) {
							i.records[e.name][t] && (n = !0)
						})
					}), n
				}(t, i) && (s(t, i), e = !0)
			}
			return i
		};

		function s(t, i) {
			i.nodes.push(t), a(function(e) {
				D(o(t, e) || [], function(t) {
					i.records[e.name][t] = !0
				})
			})
		}
	}

	function w_(t, e, i, n, r, a) {
		t = t || 0;
		var o = i[1] - i[0];
		if (null != r && (r = S_(r, [0, o])), null != a && (a = Math.max(a, null != r ? r : 0)), "all" === n) {
			var s = Math.abs(e[1] - e[0]);
			r = a = S_(s = S_(s, [0, o]), [r, a]), n = 0
		}
		e[0] = S_(e[0], i), e[1] = S_(e[1], i);
		var l = b_(e, n);
		e[n] += t;
		var h = r || 0,
			u = i.slice();
		l.sign < 0 ? u[0] += h : u[1] -= h, e[n] = S_(e[n], u);
		var c = b_(e, n);
		return null != r && (c.sign !== l.sign || c.span < r) && (e[1 - n] = e[n] + l.sign * r), c = b_(e, n), null != a &&
			c.span > a && (e[1 - n] = e[n] + c.sign * a), e
	}

	function b_(t, e) {
		var i = t[e] - t[1 - e];
		return {
			span: Math.abs(i),
			sign: 0 < i ? -1 : i < 0 ? 1 : e ? -1 : 1
		}
	}

	function S_(t, e) {
		return Math.min(null != e[1] ? e[1] : 1 / 0, Math.max(null != e[0] ? e[0] : -1 / 0, t))
	}

	function M_(t, e, i, n) {
		this._dimName = t, this._axisIndex = e, this._valueWindow, this._percentWindow, this._dataExtent, this._minMaxSpan,
			this.ecModel = n, this._dataZoomModel = i
	}
	var I_ = D,
		C_ = cl;

	function A_(t, e) {
		var i = t.getAxisModel(),
			n = t._percentWindow,
			r = t._valueWindow;
		if (n) {
			var a = pl(r, [0, 500]);
			a = Math.min(a, 20);
			var o = e || 0 === n[0] && 100 === n[1];
			i.setRange(o ? null : +r[0].toFixed(a), o ? null : +r[1].toFixed(a))
		}
	}
	M_.prototype = {
		constructor: M_,
		hostedBy: function(t) {
			return this._dataZoomModel === t
		},
		getDataValueWindow: function() {
			return this._valueWindow.slice()
		},
		getDataPercentWindow: function() {
			return this._percentWindow.slice()
		},
		getTargetSeriesModels: function() {
			var n = [],
				r = this.ecModel;
			return r.eachSeries(function(t) {
				if (function(t) {
						return 0 <= x(p_, t)
					}(t.get("coordinateSystem"))) {
					var e = this._dimName,
						i = r.queryComponents({
							mainType: e + "Axis",
							index: t.get(e + "AxisIndex"),
							id: t.get(e + "AxisId")
						})[0];
					this._axisIndex === (i && i.componentIndex) && n.push(t)
				}
			}, this), n
		},
		getAxisModel: function() {
			return this.ecModel.getComponent(this._dimName + "Axis", this._axisIndex)
		},
		getOtherAxisModel: function() {
			var t, e, i, n = this._dimName,
				r = this.ecModel,
				a = this.getAxisModel();
			return t = "x" === n || "y" === n ? (e = "gridIndex", "x" === n ? "y" : "x") : (e = "polarIndex", "angle" === n ?
				"radius" : "angle"), r.eachComponent(t + "Axis", function(t) {
				(t.get(e) || 0) === (a.get(e) || 0) && (i = t)
			}), i
		},
		getMinMaxSpan: function() {
			return b(this._minMaxSpan)
		},
		calculateDataWindow: function(r) {
			var a, o = this._dataExtent,
				s = this.getAxisModel().axis.scale,
				l = this._dataZoomModel.getRangePropMode(),
				h = [0, 100],
				u = [],
				c = [];
			I_(["start", "end"], function(t, e) {
				var i = r[t],
					n = r[t + "Value"];
				"percent" === l[e] ? (null == i && (i = h[e]), n = s.parse(ll(i, h, o))) : (a = !0, i = ll(n = null == n ? o[e] :
					s.parse(n), o, h)), c[e] = n, u[e] = i
			}), C_(c), C_(u);
			var d = this._minMaxSpan;

			function t(t, e, i, n, r) {
				var a = r ? "Span" : "ValueSpan";
				w_(0, t, i, "all", d["min" + a], d["max" + a]);
				for (var o = 0; o < 2; o++) e[o] = ll(t[o], i, n, !0), r && (e[o] = s.parse(e[o]))
			}
			return a ? t(c, u, o, h, !1) : t(u, c, h, o, !0), {
				valueWindow: c,
				percentWindow: u
			}
		},
		reset: function(t) {
			if (t === this._dataZoomModel) {
				var e = this.getTargetSeriesModels();
				this._dataExtent = function(t, e, i) {
						var n = [1 / 0, -1 / 0];
						I_(i, function(t) {
							var i = t.getData();
							i && I_(i.mapDimension(e, !0), function(t) {
								var e = i.getApproximateExtent(t);
								e[0] < n[0] && (n[0] = e[0]), e[1] > n[1] && (n[1] = e[1])
							})
						}), n[1] < n[0] && (n = [NaN, NaN]);
						return function(t, e) {
							var i = t.getAxisModel(),
								n = i.getMin(!0),
								r = "category" === i.get("type"),
								a = r && i.getCategories().length;
							null != n && "dataMin" !== n && "function" != typeof n ? e[0] = n : r && (e[0] = 0 < a ? 0 : NaN);
							var o = i.getMax(!0);
							null != o && "dataMax" !== o && "function" != typeof o ? e[1] = o : r && (e[1] = 0 < a ? a - 1 : NaN);
							i.get("scale", !0) || (0 < e[0] && (e[0] = 0), e[1] < 0 && (e[1] = 0))
						}(t, n), n
					}(this, this._dimName, e),
					function(n) {
						var r = n._minMaxSpan = {},
							a = n._dataZoomModel,
							o = n._dataExtent;
						I_(["min", "max"], function(t) {
							var e = a.get(t + "Span"),
								i = a.get(t + "ValueSpan");
							null != i && (i = n.getAxisModel().axis.scale.parse(i)), null != i ? e = ll(o[0] + i, o, [0, 100], !0) :
								null != e && (i = ll(e, [0, 100], o, !0) - o[0]), r[t + "Span"] = e, r[t + "ValueSpan"] = i
						})
					}(this);
				var i = this.calculateDataWindow(t.settledOption);
				this._valueWindow = i.valueWindow, this._percentWindow = i.percentWindow, A_(this)
			}
		},
		restore: function(t) {
			t === this._dataZoomModel && (this._valueWindow = this._percentWindow = null, A_(this, !0))
		},
		filterData: function(t, e) {
			if (t === this._dataZoomModel) {
				var n = this._dimName,
					i = this.getTargetSeriesModels(),
					r = t.get("filterMode"),
					c = this._valueWindow;
				"none" !== r && I_(i, function(i) {
					var h = i.getData(),
						u = h.mapDimension(n, !0);
					u.length && ("weakFilter" === r ? h.filterSelf(function(t) {
						for (var e, i, n, r = 0; r < u.length; r++) {
							var a = h.get(u[r], t),
								o = !isNaN(a),
								s = a < c[0],
								l = a > c[1];
							if (o && !s && !l) return !0;
							o && (n = !0), s && (e = !0), l && (i = !0)
						}
						return n && e && i
					}) : I_(u, function(t) {
						if ("empty" === r) i.setData(h = h.map(t, function(t) {
							return function(t) {
								return t >= c[0] && t <= c[1]
							}(t) ? t : NaN
						}));
						else {
							var e = {};
							e[t] = c, h.selectRange(e)
						}
					}), I_(u, function(t) {
						h.setApproximateExtent(c, t)
					}))
				})
			}
		}
	};
	var T_ = D,
		D_ = __,
		k_ = Zd({
			type: "dataZoom",
			dependencies: ["xAxis", "yAxis", "zAxis", "radiusAxis", "angleAxis", "singleAxis", "series"],
			defaultOption: {
				zlevel: 0,
				z: 4,
				orient: null,
				xAxisIndex: null,
				yAxisIndex: null,
				filterMode: "filter",
				throttle: null,
				start: 0,
				end: 100,
				startValue: null,
				endValue: null,
				minSpan: null,
				maxSpan: null,
				minValueSpan: null,
				maxValueSpan: null,
				rangeMode: null
			},
			init: function(t, e, i) {
				this._dataIntervalByAxis = {}, this._dataInfo = {}, this._axisProxies = {}, this.textStyleModel, this._autoThrottle = !
					0, this._rangePropMode = ["percent", "percent"];
				var n = P_(t);
				this.settledOption = n, this.mergeDefaultAndTheme(t, i), this.doInit(n)
			},
			mergeOption: function(t) {
				var e = P_(t);
				v(this.option, t, !0), v(this.settledOption, e, !0), this.doInit(e)
			},
			doInit: function(t) {
				var i = this.option;
				m.canvasSupported || (i.realtime = !1), this._setDefaultThrottle(t), L_(this, t);
				var n = this.settledOption;
				T_([
					["start", "startValue"],
					["end", "endValue"]
				], function(t, e) {
					"value" === this._rangePropMode[e] && (i[t[0]] = n[t[0]] = null)
				}, this), this.textStyleModel = this.getModel("textStyle"), this._resetTarget(), this._giveAxisProxies()
			},
			_giveAxisProxies: function() {
				var o = this._axisProxies;
				this.eachTargetAxis(function(t, e, i, n) {
					var r = this.dependentModels[t.axis][e],
						a = r.__dzAxisProxy || (r.__dzAxisProxy = new M_(t.name, e, this, n));
					o[t.name + "_" + e] = a
				}, this)
			},
			_resetTarget: function() {
				var i = this.option,
					t = this._judgeAutoMode();
				D_(function(t) {
					var e = t.axisIndex;
					i[e] = gr(i[e])
				}, this), "axisIndex" === t ? this._autoSetAxisIndex() : "orient" === t && this._autoSetOrient()
			},
			_judgeAutoMode: function() {
				var e = this.option,
					i = !1;
				D_(function(t) {
					null != e[t.axisIndex] && (i = !0)
				}, this);
				var t = e.orient;
				return null == t && i ? "orient" : i ? void 0 : (null == t && (e.orient = "horizontal"), "axisIndex")
			},
			_autoSetAxisIndex: function() {
				var a = !0,
					e = this.get("orient", !0),
					o = this.option,
					t = this.dependentModels;
				if (a) {
					var i = "vertical" === e ? "y" : "x";
					t[i + "Axis"].length ? (o[i + "AxisIndex"] = [0], a = !1) : T_(t.singleAxis, function(t) {
						a && t.get("orient", !0) === e && (o.singleAxisIndex = [t.componentIndex], a = !1)
					})
				}
				a && D_(function(t) {
					if (a) {
						var e = [],
							i = this.dependentModels[t.axis];
						if (i.length && !e.length)
							for (var n = 0, r = i.length; n < r; n++) "category" === i[n].get("type") && e.push(n);
						(o[t.axisIndex] = e).length && (a = !1)
					}
				}, this), a && this.ecModel.eachSeries(function(r) {
					this._isSeriesHasAllAxesTypeOf(r, "value") && D_(function(t) {
						var e = o[t.axisIndex],
							i = r.get(t.axisIndex),
							n = r.get(t.axisId);
						x(e, i = r.ecModel.queryComponents({
							mainType: t.axis,
							index: i,
							id: n
						})[0].componentIndex) < 0 && e.push(i)
					})
				}, this)
			},
			_autoSetOrient: function() {
				var e;
				this.eachTargetAxis(function(t) {
					e = e || t.name
				}, this), this.option.orient = "y" === e ? "vertical" : "horizontal"
			},
			_isSeriesHasAllAxesTypeOf: function(n, r) {
				var a = !0;
				return D_(function(t) {
					var e = n.get(t.axisIndex),
						i = this.dependentModels[t.axis][e];
					i && i.get("type") === r || (a = !1)
				}, this), a
			},
			_setDefaultThrottle: function(t) {
				if (t.hasOwnProperty("throttle") && (this._autoThrottle = !1), this._autoThrottle) {
					var e = this.ecModel.option;
					this.option.throttle = e.animation && 0 < e.animationDurationUpdate ? 100 : 20
				}
			},
			getFirstTargetAxisModel: function() {
				var i;
				return D_(function(t) {
					if (null == i) {
						var e = this.get(t.axisIndex);
						e.length && (i = this.dependentModels[t.axis][e[0]])
					}
				}, this), i
			},
			eachTargetAxis: function(i, n) {
				var r = this.ecModel;
				D_(function(e) {
					T_(this.get(e.axisIndex), function(t) {
						i.call(n, e, t, this, r)
					}, this)
				}, this)
			},
			getAxisProxy: function(t, e) {
				return this._axisProxies[t + "_" + e]
			},
			getAxisModel: function(t, e) {
				var i = this.getAxisProxy(t, e);
				return i && i.getAxisModel()
			},
			setRawRange: function(e) {
				var i = this.option,
					n = this.settledOption;
				T_([
					["start", "startValue"],
					["end", "endValue"]
				], function(t) {
					null == e[t[0]] && null == e[t[1]] || (i[t[0]] = n[t[0]] = e[t[0]], i[t[1]] = n[t[1]] = e[t[1]])
				}, this), L_(this, e)
			},
			setCalculatedRange: function(e) {
				var i = this.option;
				T_(["start", "startValue", "end", "endValue"], function(t) {
					i[t] = e[t]
				})
			},
			getPercentRange: function() {
				var t = this.findRepresentativeAxisProxy();
				if (t) return t.getDataPercentWindow()
			},
			getValueRange: function(t, e) {
				if (null != t || null != e) return this.getAxisProxy(t, e).getDataValueWindow();
				var i = this.findRepresentativeAxisProxy();
				return i ? i.getDataValueWindow() : void 0
			},
			findRepresentativeAxisProxy: function(t) {
				if (t) return t.__dzAxisProxy;
				var e = this._axisProxies;
				for (var i in e)
					if (e.hasOwnProperty(i) && e[i].hostedBy(this)) return e[i];
				for (var i in e)
					if (e.hasOwnProperty(i) && !e[i].hostedBy(this)) return e[i]
			},
			getRangePropMode: function() {
				return this._rangePropMode.slice()
			}
		});

	function P_(e) {
		var i = {};
		return T_(["start", "end", "startValue", "endValue", "throttle"], function(t) {
			e.hasOwnProperty(t) && (i[t] = e[t])
		}), i
	}

	function L_(t, r) {
		var a = t._rangePropMode,
			o = t.get("rangeMode");
		T_([
			["start", "startValue"],
			["end", "endValue"]
		], function(t, e) {
			var i = null != r[t[0]],
				n = null != r[t[1]];
			i && !n ? a[e] = "percent" : !i && n ? a[e] = "value" : o ? a[e] = o[e] : i && (a[e] = "percent")
		})
	}
	var O_ = Nu.extend({
			type: "dataZoom",
			render: function(t, e, i, n) {
				this.dataZoomModel = t, this.ecModel = e, this.api = i
			},
			getTargetCoordInfo: function() {
				var t = this.dataZoomModel,
					r = this.ecModel,
					a = {};
				return t.eachTargetAxis(function(t, e) {
					var i = r.getComponent(t.axis, e);
					if (i) {
						var n = i.getCoordSysModel();
						n && function(t, e, i, n) {
							for (var r, a = 0; a < i.length; a++)
								if (i[a].model === t) {
									r = i[a];
									break
								} r || i.push(r = {
								model: t,
								axisModels: [],
								coordIndex: n
							});
							r.axisModels.push(e)
						}(n, i, a[n.mainType] || (a[n.mainType] = []), n.componentIndex)
					}
				}, this), a
			}
		}),
		z_ = (k_.extend({
			type: "dataZoom.slider",
			layoutMode: "box",
			defaultOption: {
				show: !0,
				right: "ph",
				top: "ph",
				width: "ph",
				height: "ph",
				left: null,
				bottom: null,
				backgroundColor: "rgba(47,69,84,0)",
				dataBackground: {
					lineStyle: {
						color: "#2f4554",
						width: .5,
						opacity: .3
					},
					areaStyle: {
						color: "rgba(47,69,84,0.3)",
						opacity: .3
					}
				},
				borderColor: "#ddd",
				fillerColor: "rgba(167,183,204,0.4)",
				handleIcon: "M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z",
				handleSize: "100%",
				handleStyle: {
					color: "#a7b7cc"
				},
				labelPrecision: null,
				labelFormatter: null,
				showDetail: !0,
				showDataShadow: "auto",
				realtime: !0,
				zoomLock: !1,
				textStyle: {
					color: "#333"
				}
			}
		}), No),
		E_ = ll,
		N_ = cl,
		R_ = C,
		B_ = D,
		V_ = "horizontal",
		F_ = "vertical",
		H_ = ["line", "bar", "candlestick", "scatter"],
		G_ = O_.extend({
			type: "dataZoom.slider",
			init: function(t, e) {
				this._displayables = {}, this._orient, this._range, this._handleEnds, this._size, this._handleWidth, this._handleHeight,
					this._location, this._dragging, this._dataShadowInfo, this.api = e
			},
			render: function(t, e, i, n) {
				G_.superApply(this, "render", arguments), Qu(this, "_dispatchZoomAction", this.dataZoomModel.get("throttle"),
					"fixRate"), this._orient = t.get("orient"), !1 !== this.dataZoomModel.get("show") ? (n && "dataZoom" === n.type &&
					n.from === this.uid || this._buildView(), this._updateView()) : this.group.removeAll()
			},
			remove: function() {
				G_.superApply(this, "remove", arguments), Ju(this, "_dispatchZoomAction")
			},
			dispose: function() {
				G_.superApply(this, "dispose", arguments), Ju(this, "_dispatchZoomAction")
			},
			_buildView: function() {
				var t = this.group;
				t.removeAll(), this._resetLocation(), this._resetInterval();
				var e = this._displayables.barGroup = new mi;
				this._renderBackground(), this._renderHandle(), this._renderDataShadow(), t.add(e), this._positionGroup()
			},
			_resetLocation: function() {
				var t = this.dataZoomModel,
					e = this.api,
					i = this._findCoordRect(),
					n = {
						width: e.getWidth(),
						height: e.getHeight()
					},
					r = this._orient === V_ ? {
						right: n.width - i.x - i.width,
						top: n.height - 30 - 7,
						width: i.width,
						height: 30
					} : {
						right: 7,
						top: i.y,
						width: 30,
						height: i.height
					},
					a = Yl(t.option);
				D(["right", "top", "width", "height"], function(t) {
					"ph" === a[t] && (a[t] = r[t])
				});
				var o = Zl(a, n, t.padding);
				this._location = {
					x: o.x,
					y: o.y
				}, this._size = [o.width, o.height], this._orient === F_ && this._size.reverse()
			},
			_positionGroup: function() {
				var t = this.group,
					e = this._location,
					i = this._orient,
					n = this.dataZoomModel.getFirstTargetAxisModel(),
					r = n && n.get("inverse"),
					a = this._displayables.barGroup,
					o = (this._dataShadowInfo || {}).otherAxisInverse;
				a.attr(i !== V_ || r ? i === V_ && r ? {
					scale: o ? [-1, 1] : [-1, -1]
				} : i !== F_ || r ? {
					scale: o ? [-1, -1] : [-1, 1],
					rotation: Math.PI / 2
				} : {
					scale: o ? [1, -1] : [1, 1],
					rotation: Math.PI / 2
				} : {
					scale: o ? [1, 1] : [1, -1]
				});
				var s = t.getBoundingRect([a]);
				t.attr("position", [e.x - s.x, e.y - s.y])
			},
			_getViewExtent: function() {
				return [0, this._size[0]]
			},
			_renderBackground: function() {
				var t = this.dataZoomModel,
					e = this._size,
					i = this._displayables.barGroup;
				i.add(new z_({
					silent: !0,
					shape: {
						x: 0,
						y: 0,
						width: e[0],
						height: e[1]
					},
					style: {
						fill: t.get("backgroundColor")
					},
					z2: -40
				})), i.add(new z_({
					shape: {
						x: 0,
						y: 0,
						width: e[0],
						height: e[1]
					},
					style: {
						fill: "transparent"
					},
					z2: 0,
					onclick: C(this._onClickPanelClick, this)
				}))
			},
			_renderDataShadow: function() {
				var t = this._dataShadowInfo = this._prepareDataShadowInfo();
				if (t) {
					var e = this._size,
						i = t.series,
						n = i.getRawData(),
						r = i.getShadowDim ? i.getShadowDim() : t.otherDim;
					if (null != r) {
						var a = n.getDataExtent(r),
							o = .3 * (a[1] - a[0]);
						a = [a[0] - o, a[1] + o];
						var s, l = [0, e[1]],
							h = [0, e[0]],
							u = [
								[e[0], 0],
								[0, 0]
							],
							c = [],
							d = h[1] / (n.count() - 1),
							f = 0,
							p = Math.round(n.count() / e[0]);
						n.each([r], function(t, e) {
							if (0 < p && e % p) f += d;
							else {
								var i = null == t || isNaN(t) || "" === t,
									n = i ? 0 : E_(t, a, l, !0);
								i && !s && e ? (u.push([u[u.length - 1][0], 0]), c.push([c[c.length - 1][0], 0])) : !i && s && (u.push([f,
									0
								]), c.push([f, 0])), u.push([f, n]), c.push([f, n]), f += d, s = i
							}
						});
						var g = this.dataZoomModel;
						this._displayables.barGroup.add(new Do({
							shape: {
								points: u
							},
							style: T({
								fill: g.get("dataBackgroundColor")
							}, g.getModel("dataBackground.areaStyle").getAreaStyle()),
							silent: !0,
							z2: -20
						})), this._displayables.barGroup.add(new ko({
							shape: {
								points: c
							},
							style: g.getModel("dataBackground.lineStyle").getLineStyle(),
							silent: !0,
							z2: -19
						}))
					}
				}
			},
			_prepareDataShadowInfo: function() {
				var t = this.dataZoomModel,
					s = t.get("showDataShadow");
				if (!1 !== s) {
					var l, h = this.ecModel;
					return t.eachTargetAxis(function(a, o) {
						D(t.getAxisProxy(a.name, o).getTargetSeriesModels(), function(t) {
							if (!(l || !0 !== s && x(H_, t.get("type")) < 0)) {
								var e, i = h.getComponent(a.axis, o).axis,
									n = function(t) {
										return {
											x: "y",
											y: "x",
											radius: "angle",
											angle: "radius"
										} [t]
									}(a.name),
									r = t.coordinateSystem;
								null != n && r.getOtherAxis && (e = r.getOtherAxis(i).inverse), n = t.getData().mapDimension(n), l = {
									thisAxis: i,
									series: t,
									thisDim: a.name,
									otherDim: n,
									otherAxisInverse: e
								}
							}
						}, this)
					}, this), l
				}
			},
			_renderHandle: function() {
				var t = this._displayables,
					a = t.handles = [],
					o = t.handleLabels = [],
					s = this._displayables.barGroup,
					e = this._size,
					l = this.dataZoomModel;
				s.add(t.filler = new z_({
					draggable: !0,
					cursor: W_(this._orient),
					drift: R_(this._onDragMove, this, "all"),
					onmousemove: function(t) {
						Rt(t.event)
					},
					ondragstart: R_(this._showDataInfo, this, !0),
					ondragend: R_(this._onDragEnd, this),
					onmouseover: R_(this._showDataInfo, this, !0),
					onmouseout: R_(this._showDataInfo, this, !1),
					style: {
						fill: l.get("fillerColor"),
						textPosition: "inside"
					}
				})), s.add(new z_({
					silent: !0,
					subPixelOptimize: !0,
					shape: {
						x: 0,
						y: 0,
						width: e[0],
						height: e[1]
					},
					style: {
						stroke: l.get("dataBackgroundColor") || l.get("borderColor"),
						lineWidth: 1,
						fill: "rgba(0,0,0,0)"
					}
				})), B_([0, 1], function(t) {
					var e = Xs(l.get("handleIcon"), {
							cursor: W_(this._orient),
							draggable: !0,
							drift: R_(this._onDragMove, this, t),
							onmousemove: function(t) {
								Rt(t.event)
							},
							ondragend: R_(this._onDragEnd, this),
							onmouseover: R_(this._showDataInfo, this, !0),
							onmouseout: R_(this._showDataInfo, this, !1)
						}, {
							x: -1,
							y: 0,
							width: 2,
							height: 2
						}),
						i = e.getBoundingRect();
					this._handleHeight = hl(l.get("handleSize"), this._size[1]), this._handleWidth = i.width / i.height * this._handleHeight,
						e.setStyle(l.getModel("handleStyle").getItemStyle());
					var n = l.get("handleColor");
					null != n && (e.style.fill = n), s.add(a[t] = e);
					var r = l.textStyleModel;
					this.group.add(o[t] = new wo({
						silent: !0,
						invisible: !0,
						style: {
							x: 0,
							y: 0,
							text: "",
							textVerticalAlign: "middle",
							textAlign: "center",
							textFill: r.getTextColor(),
							textFont: r.getFont()
						},
						z2: 10
					}))
				}, this)
			},
			_resetInterval: function() {
				var t = this._range = this.dataZoomModel.getPercentRange(),
					e = this._getViewExtent();
				this._handleEnds = [E_(t[0], [0, 100], e, !0), E_(t[1], [0, 100], e, !0)]
			},
			_updateInterval: function(t, e) {
				var i = this.dataZoomModel,
					n = this._handleEnds,
					r = this._getViewExtent(),
					a = i.findRepresentativeAxisProxy().getMinMaxSpan(),
					o = [0, 100];
				w_(e, n, r, i.get("zoomLock") ? "all" : t, null != a.minSpan ? E_(a.minSpan, o, r, !0) : null, null != a.maxSpan ?
					E_(a.maxSpan, o, r, !0) : null);
				var s = this._range,
					l = this._range = N_([E_(n[0], r, o, !0), E_(n[1], r, o, !0)]);
				return !s || s[0] !== l[0] || s[1] !== l[1]
			},
			_updateView: function(t) {
				var n = this._displayables,
					r = this._handleEnds,
					e = N_(r.slice()),
					a = this._size;
				B_([0, 1], function(t) {
					var e = n.handles[t],
						i = this._handleHeight;
					e.attr({
						scale: [i / 2, i / 2],
						position: [r[t], a[1] / 2 - i / 2]
					})
				}, this), n.filler.setShape({
					x: e[0],
					y: 0,
					width: e[1] - e[0],
					height: a[1]
				}), this._updateDataInfo(t)
			},
			_updateDataInfo: function(t) {
				var e = this.dataZoomModel,
					a = this._displayables,
					o = a.handleLabels,
					s = this._orient,
					l = ["", ""];
				if (e.get("showDetail")) {
					var i = e.findRepresentativeAxisProxy();
					if (i) {
						var n = i.getAxisModel().axis,
							r = this._range,
							h = t ? i.calculateDataWindow({
								start: r[0],
								end: r[1]
							}).valueWindow : i.getDataValueWindow();
						l = [this._formatLabel(h[0], n), this._formatLabel(h[1], n)]
					}
				}
				var u = N_(this._handleEnds.slice());

				function c(t) {
					var e = Hs(a.handles[t].parent, this.group),
						i = Ws(0 === t ? "right" : "left", e),
						n = this._handleWidth / 2 + 5,
						r = Gs([u[t] + (0 === t ? -n : n), this._size[1] / 2], e);
					o[t].setStyle({
						x: r[0],
						y: r[1],
						textVerticalAlign: s === V_ ? "middle" : i,
						textAlign: s === V_ ? i : "center",
						text: l[t]
					})
				}
				c.call(this, 0), c.call(this, 1)
			},
			_formatLabel: function(t, e) {
				var i = this.dataZoomModel,
					n = i.get("labelFormatter"),
					r = i.get("labelPrecision");
				null != r && "auto" !== r || (r = e.getPixelPrecision());
				var a = null == t || isNaN(t) ? "" : "category" === e.type || "time" === e.type ? e.scale.getLabel(Math.round(t)) :
					t.toFixed(Math.min(r, 20));
				return z(n) ? n(t, a) : E(n) ? n.replace("{value}", a) : a
			},
			_showDataInfo: function(t) {
				t = this._dragging || t;
				var e = this._displayables.handleLabels;
				e[0].attr("invisible", !t), e[1].attr("invisible", !t)
			},
			_onDragMove: function(t, e, i) {
				this._dragging = !0;
				var n = Gs([e, i], this._displayables.barGroup.getLocalTransform(), !0),
					r = this._updateInterval(t, n[0]),
					a = this.dataZoomModel.get("realtime");
				this._updateView(!a), r && a && this._dispatchZoomAction()
			},
			_onDragEnd: function() {
				this._dragging = !1, this._showDataInfo(!1), this.dataZoomModel.get("realtime") || this._dispatchZoomAction()
			},
			_onClickPanelClick: function(t) {
				var e = this._size,
					i = this._displayables.barGroup.transformCoordToLocal(t.offsetX, t.offsetY);
				if (!(i[0] < 0 || i[0] > e[0] || i[1] < 0 || i[1] > e[1])) {
					var n = this._handleEnds,
						r = (n[0] + n[1]) / 2,
						a = this._updateInterval("all", i[0] - r);
					this._updateView(), a && this._dispatchZoomAction()
				}
			},
			_dispatchZoomAction: function() {
				var t = this._range;
				this.api.dispatchAction({
					type: "dataZoom",
					from: this.uid,
					dataZoomId: this.dataZoomModel.id,
					start: t[0],
					end: t[1]
				})
			},
			_findCoordRect: function() {
				var i;
				if (B_(this.getTargetCoordInfo(), function(t) {
						if (!i && t.length) {
							var e = t[0].model.coordinateSystem;
							i = e.getRect && e.getRect()
						}
					}), !i) {
					var t = this.api.getWidth(),
						e = this.api.getHeight();
					i = {
						x: .2 * t,
						y: .2 * e,
						width: .6 * t,
						height: .6 * e
					}
				}
				return i
			}
		});

	function W_(t) {
		return "vertical" === t ? "ns-resize" : "ew-resize"
	}
	Bd({
		getTargetSeries: function(t) {
			var n = Q();
			return t.eachComponent("dataZoom", function(t) {
				t.eachTargetAxis(function(t, e, i) {
					D(i.getAxisProxy(t.name, e).getTargetSeriesModels(), function(t) {
						n.set(t.uid, t)
					})
				})
			}), n
		},
		modifyOutputEnd: !0,
		overallReset: function(t, n) {
			t.eachComponent("dataZoom", function(t) {
				t.eachTargetAxis(function(t, e, i) {
					i.getAxisProxy(t.name, e).reset(i, n)
				}), t.eachTargetAxis(function(t, e, i) {
					i.getAxisProxy(t.name, e).filterData(i, n)
				})
			}), t.eachComponent("dataZoom", function(t) {
				var e = t.findRepresentativeAxisProxy(),
					i = e.getDataPercentWindow(),
					n = e.getDataValueWindow();
				t.setCalculatedRange({
					start: i[0],
					end: i[1],
					startValue: n[0],
					endValue: n[1]
				})
			})
		}
	}), Vd("dataZoom", function(i, t) {
		var n = x_(C(t.eachComponent, t, "dataZoom"), __, function(t, e) {
				return t.get(e.axisIndex)
			}),
			r = [];
		t.eachComponent({
			mainType: "dataZoom",
			query: i
		}, function(t, e) {
			r.push.apply(r, n(t).nodes)
		}), D(r, function(t, e) {
			t.setRawRange({
				start: i.start,
				end: i.end,
				startValue: i.startValue,
				endValue: i.endValue
			})
		})
	}), k_.extend({
		type: "dataZoom.inside",
		defaultOption: {
			disabled: !1,
			zoomLock: !1,
			zoomOnMouseWheel: !0,
			moveOnMouseMove: !0,
			moveOnMouseWheel: !1,
			preventDefaultMouseMove: !0
		}
	});
	var Z_ = "\0_ec_interaction_mutex";

	function U_(t, e) {
		return !!X_(t)[e]
	}

	function X_(t) {
		return t[Z_] || (t[Z_] = {})
	}

	function Y_(i) {
		this.pointerChecker, this._zr = i, this._opt = {};
		var t = C,
			n = t(j_, this),
			r = t(q_, this),
			a = t($_, this),
			o = t(K_, this),
			s = t(Q_, this);
		It.call(this), this.setPointerChecker = function(t) {
			this.pointerChecker = t
		}, this.enable = function(t, e) {
			this.disable(), this._opt = T(b(e) || {}, {
				zoomOnMouseWheel: !0,
				moveOnMouseMove: !0,
				moveOnMouseWheel: !1,
				preventDefaultMouseMove: !0
			}), null == t && (t = !0), !0 !== t && "move" !== t && "pan" !== t || (i.on("mousedown", n), i.on("mousemove", r),
				i.on("mouseup", a)), !0 !== t && "scale" !== t && "zoom" !== t || (i.on("mousewheel", o), i.on("pinch", s))
		}, this.disable = function() {
			i.off("mousedown", n), i.off("mousemove", r), i.off("mouseup", a), i.off("mousewheel", o), i.off("pinch", s)
		}, this.dispose = this.disable, this.isDragging = function() {
			return this._dragging
		}, this.isPinching = function() {
			return this._pinching
		}
	}

	function j_(t) {
		if (!(Bt(t) || t.target && t.target.draggable)) {
			var e = t.offsetX,
				i = t.offsetY;
			this.pointerChecker && this.pointerChecker(t, e, i) && (this._x = e, this._y = i, this._dragging = !0)
		}
	}

	function q_(t) {
		if (this._dragging && ex("moveOnMouseMove", t, this._opt) && "pinch" !== t.gestureEvent && !U_(this._zr, "globalPan")) {
			var e = t.offsetX,
				i = t.offsetY,
				n = this._x,
				r = this._y,
				a = e - n,
				o = i - r;
			this._x = e, this._y = i, this._opt.preventDefaultMouseMove && Rt(t.event), tx(this, "pan", "moveOnMouseMove", t, {
				dx: a,
				dy: o,
				oldX: n,
				oldY: r,
				newX: e,
				newY: i
			})
		}
	}

	function $_(t) {
		Bt(t) || (this._dragging = !1)
	}

	function K_(t) {
		var e = ex("zoomOnMouseWheel", t, this._opt),
			i = ex("moveOnMouseWheel", t, this._opt),
			n = t.wheelDelta,
			r = Math.abs(n),
			a = t.offsetX,
			o = t.offsetY;
		if (0 !== n && (e || i)) {
			if (e) {
				var s = 3 < r ? 1.4 : 1 < r ? 1.2 : 1.1;
				J_(this, "zoom", "zoomOnMouseWheel", t, {
					scale: 0 < n ? s : 1 / s,
					originX: a,
					originY: o
				})
			}
			if (i) {
				var l = Math.abs(n);
				J_(this, "scrollMove", "moveOnMouseWheel", t, {
					scrollDelta: (0 < n ? 1 : -1) * (3 < l ? .4 : 1 < l ? .15 : .05),
					originX: a,
					originY: o
				})
			}
		}
	}

	function Q_(t) {
		U_(this._zr, "globalPan") || J_(this, "zoom", null, t, {
			scale: 1 < t.pinchScale ? 1.1 : 1 / 1.1,
			originX: t.pinchX,
			originY: t.pinchY
		})
	}

	function J_(t, e, i, n, r) {
		t.pointerChecker && t.pointerChecker(n, r.originX, r.originY) && (Rt(n.event), tx(t, e, i, n, r))
	}

	function tx(t, e, i, n, r) {
		r.isAvailableBehavior = C(ex, null, i, n), t.trigger(e, r)
	}

	function ex(t, e, i) {
		var n = i[t];
		return !t || n && (!E(n) || e.event[n + "Key"])
	}
	Vd({
		type: "takeGlobalCursor",
		event: "globalCursorTaken",
		update: "update"
	}, function() {}), S(Y_, It);
	var ix = "\0_ec_dataZoom_roams";

	function nx(t, n) {
		var e = ax(t),
			r = n.dataZoomId,
			a = n.coordId;
		D(e, function(t, e) {
			var i = t.dataZoomInfos;
			i[r] && x(n.allCoordIds, a) < 0 && (delete i[r], t.count--)
		}), ox(e);
		var i = e[a];
		i || ((i = e[a] = {
			coordId: a,
			dataZoomInfos: {},
			count: 0
		}).controller = function(t, o) {
			var e = new Y_(t.getZr());
			return D(["pan", "zoom", "scrollMove"], function(a) {
				e.on(a, function(n) {
					var r = [];
					D(o.dataZoomInfos, function(t) {
						if (n.isAvailableBehavior(t.dataZoomModel.option)) {
							var e = (t.getRange || {})[a],
								i = e && e(o.controller, n);
							!t.dataZoomModel.get("disabled", !0) && i && r.push({
								dataZoomId: t.dataZoomId,
								start: i[0],
								end: i[1]
							})
						}
					}), r.length && o.dispatchAction(r)
				})
			}), e
		}(t, i), i.dispatchAction = A(sx, t)), i.dataZoomInfos[r] || i.count++, i.dataZoomInfos[r] = n;
		var o = function(t) {
			var n, r = {
					type_true: 2,
					type_move: 1,
					type_false: 0,
					type_undefined: -1
				},
				a = !0;
			return D(t, function(t) {
				var e = t.dataZoomModel,
					i = !e.get("disabled", !0) && (!e.get("zoomLock", !0) || "move");
				r["type_" + n] < r["type_" + i] && (n = i), a &= e.get("preventDefaultMouseMove", !0)
			}), {
				controlType: n,
				opt: {
					zoomOnMouseWheel: !0,
					moveOnMouseMove: !0,
					moveOnMouseWheel: !0,
					preventDefaultMouseMove: !!a
				}
			}
		}(i.dataZoomInfos);
		i.controller.enable(o.controlType, o.opt), i.controller.setPointerChecker(n.containsPoint), Qu(i, "dispatchAction",
			n.dataZoomModel.get("throttle", !0), "fixRate")
	}

	function rx(t) {
		return t.type + "\0_" + t.id
	}

	function ax(t) {
		var e = t.getZr();
		return e[ix] || (e[ix] = {})
	}

	function ox(i) {
		D(i, function(t, e) {
			t.count || (t.controller.dispose(), delete i[e])
		})
	}

	function sx(t, e) {
		t.dispatchAction({
			type: "dataZoom",
			batch: e
		})
	}
	var lx = C,
		hx = O_.extend({
			type: "dataZoom.inside",
			init: function(t, e) {
				this._range
			},
			render: function(o, t, s, e) {
				hx.superApply(this, "render", arguments), this._range = o.getPercentRange(), D(this.getTargetCoordInfo(),
					function(t, r) {
						var a = P(t, function(t) {
							return rx(t.model)
						});
						D(t, function(e) {
							var n = e.model,
								i = {};
							D(["pan", "zoom", "scrollMove"], function(t) {
								i[t] = lx(ux[t], this, e, r)
							}, this), nx(s, {
								coordId: rx(n),
								allCoordIds: a,
								containsPoint: function(t, e, i) {
									return n.coordinateSystem.containPoint([e, i])
								},
								dataZoomId: o.id,
								dataZoomModel: o,
								getRange: i
							})
						}, this)
					}, this)
			},
			dispose: function() {
				! function(t, i) {
					var e = ax(t);
					D(e, function(t) {
						t.controller.dispose();
						var e = t.dataZoomInfos;
						e[i] && (delete e[i], t.count--)
					}), ox(e)
				}(this.api, this.dataZoomModel.id), hx.superApply(this, "dispose", arguments), this._range = null
			}
		}),
		ux = {
			zoom: function(t, e, i, n) {
				var r = this._range,
					a = r.slice(),
					o = t.axisModels[0];
				if (o) {
					var s = dx[e](null, [n.originX, n.originY], o, i, t),
						l = (0 < s.signal ? s.pixelStart + s.pixelLength - s.pixel : s.pixel - s.pixelStart) / s.pixelLength * (a[1] -
							a[0]) + a[0],
						h = Math.max(1 / n.scale, 0);
					a[0] = (a[0] - l) * h + l, a[1] = (a[1] - l) * h + l;
					var u = this.dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();
					return w_(0, a, [0, 100], 0, u.minSpan, u.maxSpan), this._range = a, r[0] !== a[0] || r[1] !== a[1] ? a : void 0
				}
			},
			pan: cx(function(t, e, i, n, r, a) {
				var o = dx[n]([a.oldX, a.oldY], [a.newX, a.newY], e, r, i);
				return o.signal * (t[1] - t[0]) * o.pixel / o.pixelLength
			}),
			scrollMove: cx(function(t, e, i, n, r, a) {
				return dx[n]([0, 0], [a.scrollDelta, a.scrollDelta], e, r, i).signal * (t[1] - t[0]) * a.scrollDelta
			})
		};

	function cx(l) {
		return function(t, e, i, n) {
			var r = this._range,
				a = r.slice(),
				o = t.axisModels[0];
			if (o) {
				var s = l(a, o, t, e, i, n);
				return w_(s, a, [0, 100], "all"), this._range = a, r[0] !== a[0] || r[1] !== a[1] ? a : void 0
			}
		}
	}
	var dx = {
			grid: function(t, e, i, n, r) {
				var a = i.axis,
					o = {},
					s = r.model.coordinateSystem.getRect();
				return t = t || [0, 0], "x" === a.dim ? (o.pixel = e[0] - t[0], o.pixelLength = s.width, o.pixelStart = s.x, o.signal =
					a.inverse ? 1 : -1) : (o.pixel = e[1] - t[1], o.pixelLength = s.height, o.pixelStart = s.y, o.signal = a.inverse ?
					-1 : 1), o
			},
			polar: function(t, e, i, n, r) {
				var a = i.axis,
					o = {},
					s = r.model.coordinateSystem,
					l = s.getRadiusAxis().getExtent(),
					h = s.getAngleAxis().getExtent();
				return t = t ? s.pointToCoord(t) : [0, 0], e = s.pointToCoord(e), "radiusAxis" === i.mainType ? (o.pixel = e[0] -
					t[0], o.pixelLength = l[1] - l[0], o.pixelStart = l[0], o.signal = a.inverse ? 1 : -1) : (o.pixel = e[1] - t[1],
					o.pixelLength = h[1] - h[0], o.pixelStart = h[0], o.signal = a.inverse ? -1 : 1), o
			},
			singleAxis: function(t, e, i, n, r) {
				var a = i.axis,
					o = r.model.coordinateSystem.getRect(),
					s = {};
				return t = t || [0, 0], "horizontal" === a.orient ? (s.pixel = e[0] - t[0], s.pixelLength = o.width, s.pixelStart =
					o.x, s.signal = a.inverse ? 1 : -1) : (s.pixel = e[1] - t[1], s.pixelLength = o.height, s.pixelStart = o.y, s.signal =
					a.inverse ? -1 : 1), s
			}
		},
		fx = {};

	function px(t, e) {
		fx[t] = e
	}

	function gx(t) {
		return fx[t]
	}
	var vx = Zd({
		type: "toolbox",
		layoutMode: {
			type: "box",
			ignoreSize: !0
		},
		optionUpdated: function() {
			vx.superApply(this, "optionUpdated", arguments), D(this.option.feature, function(t, e) {
				var i = gx(e);
				i && v(t, i.defaultOption)
			})
		},
		defaultOption: {
			show: !0,
			z: 6,
			zlevel: 0,
			orient: "horizontal",
			left: "right",
			top: "top",
			backgroundColor: "transparent",
			borderColor: "#ccc",
			borderRadius: 0,
			borderWidth: 0,
			padding: 5,
			itemSize: 15,
			itemGap: 8,
			showTitle: !0,
			iconStyle: {
				borderColor: "#666",
				color: "none"
			},
			emphasis: {
				iconStyle: {
					borderColor: "#3E98C5"
				}
			},
			tooltip: {
				show: !1
			}
		}
	});
	Ud({
		type: "toolbox",
		render: function(u, c, d, s) {
			var f = this.group;
			if (f.removeAll(), u.get("show")) {
				var p = +u.get("itemSize"),
					l = u.get("feature") || {},
					h = this._features || (this._features = {}),
					g = [];
				D(l, function(t, e) {
						g.push(e)
					}), new qd(this._featureNames || [], g).add(t).update(t).remove(A(t, null)).execute(), this._featureNames = g,
					function(t, e, i) {
						var n = e.getBoxLayoutParams(),
							r = e.get("padding"),
							a = {
								width: i.getWidth(),
								height: i.getHeight()
							},
							o = Zl(n, a, r);
						Wl(e.get("orient"), t, e.get("itemGap"), o.width, o.height), Ul(t, n, a, r)
					}(f, u, d), f.add(dy(f.getBoundingRect(), u)), f.eachChild(function(t) {
						var e = t.__title,
							i = t.hoverStyle;
						if (i && e) {
							var n = nn(e, gn(i)),
								r = t.position[0] + f.position[0],
								a = !1;
							t.position[1] + f.position[1] + p + n.height > d.getHeight() && (i.textPosition = "top", a = !0);
							var o = a ? -5 - n.height : p + 8;
							r + n.width / 2 > d.getWidth() ? (i.textPosition = ["100%", o], i.textAlign = "right") : r - n.width / 2 <
								0 && (i.textPosition = [0, o], i.textAlign = "left")
						}
					})
			}

			function t(t, e) {
				var i, n = g[t],
					r = g[e],
					a = new il(l[n], u, u.ecModel);
				if (n && !r) {
					if (function(t) {
							return 0 === t.indexOf("my")
						}(n)) i = {
						model: a,
						onclick: a.option.onclick,
						featureName: n
					};
					else {
						var o = gx(n);
						if (!o) return;
						i = new o(a, c, d)
					}
					h[n] = i
				} else {
					if (!(i = h[r])) return;
					i.model = a, i.ecModel = c, i.api = d
				}
				n || !r ? a.get("show") && !i.unusable ? (function(r, a, t) {
					var o = r.getModel("iconStyle"),
						s = r.getModel("emphasis.iconStyle"),
						e = a.getIcons ? a.getIcons() : r.get("icon"),
						l = r.get("title") || {};
					if ("string" == typeof e) {
						var i = e,
							n = l;
						l = {}, (e = {})[t] = i, l[t] = n
					}
					var h = r.iconPaths = {};
					D(e, function(t, e) {
						var i = Xs(t, {}, {
							x: -p / 2,
							y: -p / 2,
							width: p,
							height: p
						});
						i.setStyle(o.getItemStyle()), i.hoverStyle = s.getItemStyle(), i.setStyle({
							text: l[e],
							textAlign: s.get("textAlign"),
							textBorderRadius: s.get("textBorderRadius"),
							textPadding: s.get("textPadding"),
							textFill: null
						});
						var n = u.getModel("tooltip");
						n && n.get("show") && i.attr("tooltip", k({
								content: l[e],
								formatter: n.get("formatter", !0) || function() {
									return l[e]
								},
								formatterParams: {
									componentType: "toolbox",
									name: e,
									title: l[e],
									$vars: ["name", "title"]
								},
								position: n.get("position", !0) || "bottom"
							}, n.option)), Cs(i), u.get("showTitle") && (i.__title = l[e], i.on("mouseover", function() {
								var t = s.getItemStyle(),
									e = "vertical" === u.get("orient") ? null == u.get("right") ? "right" : "left" : null == u.get(
										"bottom") ? "bottom" : "top";
								i.setStyle({
									textFill: s.get("textFill") || t.fill || t.stroke || "#000",
									textBackgroundColor: s.get("textBackgroundColor"),
									textPosition: s.get("textPosition") || e
								})
							}).on("mouseout", function() {
								i.setStyle({
									textFill: null,
									textBackgroundColor: null
								})
							})), i.trigger(r.get("iconStatus." + e) || "normal"), f.add(i), i.on("click", C(a.onclick, a, c, d, e)),
							h[e] = i
					})
				}(a, i, n), a.setIconStatus = function(t, e) {
					var i = this.option,
						n = this.iconPaths;
					i.iconStatus = i.iconStatus || {}, i.iconStatus[t] = e, n[t] && n[t].trigger(e)
				}, i.render && i.render(a, c, d, s)) : i.remove && i.remove(c, d) : i.dispose && i.dispose(c, d)
			}
		},
		updateView: function(t, e, i, n) {
			D(this._features, function(t) {
				t.updateView && t.updateView(t.model, e, i, n)
			})
		},
		remove: function(e, i) {
			D(this._features, function(t) {
				t.remove && t.remove(e, i)
			}), this.group.removeAll()
		},
		dispose: function(e, i) {
			D(this._features, function(t) {
				t.dispose && t.dispose(e, i)
			})
		}
	});
	var mx = ec.toolbox.saveAsImage;

	function yx(t) {
		this.model = t
	}
	yx.defaultOption = {
		show: !0,
		icon: "M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0",
		title: mx.title,
		type: "png",
		connectedBackgroundColor: "#fff",
		name: "",
		excludeComponents: ["toolbox"],
		pixelRatio: 1,
		lang: mx.lang.slice()
	}, yx.prototype.unusable = !m.canvasSupported, yx.prototype.onclick = function(t, e) {
		var i = this.model,
			n = i.get("name") || t.get("title.0.text") || "echarts",
			r = i.get("type", !0) || "png",
			a = e.getConnectedDataURL({
				type: r,
				backgroundColor: i.get("backgroundColor", !0) || t.get("backgroundColor") || "#fff",
				connectedBackgroundColor: i.get("connectedBackgroundColor"),
				excludeComponents: i.get("excludeComponents"),
				pixelRatio: i.get("pixelRatio")
			});
		if ("function" != typeof MouseEvent || m.browser.ie || m.browser.edge)
			if (window.navigator.msSaveOrOpenBlob) {
				for (var o = atob(a.split(",")[1]), s = o.length, l = new Uint8Array(s); s--;) l[s] = o.charCodeAt(s);
				var h = new Blob([l]);
				window.navigator.msSaveOrOpenBlob(h, n + "." + r)
			} else {
				var u = i.get("lang"),
					c = '<body style="margin:0;"><img src="' + a + '" style="max-width:100%;" title="' + (u && u[0] || "") +
					'" /></body>';
				window.open().document.write(c)
			}
		else {
			var d = document.createElement("a");
			d.download = n + "." + r, d.target = "_blank", d.href = a;
			var f = new MouseEvent("click", {
				view: window,
				bubbles: !0,
				cancelable: !1
			});
			d.dispatchEvent(f)
		}
	}, px("saveAsImage", yx);
	var _x = ec.toolbox.magicType;

	function xx(t) {
		this.model = t
	}
	xx.defaultOption = {
		show: !0,
		type: [],
		icon: {
			line: "M4.1,28.9h7.1l9.3-22l7.4,38l9.7-19.7l3,12.8h14.9M4.1,58h51.4",
			bar: "M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7",
			stack: "M8.2,38.4l-8.4,4.1l30.6,15.3L60,42.5l-8.1-4.1l-21.5,11L8.2,38.4z M51.9,30l-8.1,4.2l-13.4,6.9l-13.9-6.9L8.2,30l-8.4,4.2l8.4,4.2l22.2,11l21.5-11l8.1-4.2L51.9,30z M51.9,21.7l-8.1,4.2L35.7,30l-5.3,2.8L24.9,30l-8.4-4.1l-8.3-4.2l-8.4,4.2L8.2,30l8.3,4.2l13.9,6.9l13.4-6.9l8.1-4.2l8.1-4.1L51.9,21.7zM30.4,2.2L-0.2,17.5l8.4,4.1l8.3,4.2l8.4,4.2l5.5,2.7l5.3-2.7l8.1-4.2l8.1-4.2l8.1-4.1L30.4,2.2z",
			tiled: "M2.3,2.2h22.8V25H2.3V2.2z M35,2.2h22.8V25H35V2.2zM2.3,35h22.8v22.8H2.3V35z M35,35h22.8v22.8H35V35z"
		},
		title: b(_x.title),
		option: {},
		seriesIndex: {}
	};
	var bx = xx.prototype;
	bx.getIcons = function() {
		var t = this.model,
			e = t.get("icon"),
			i = {};
		return D(t.get("type"), function(t) {
			e[t] && (i[t] = e[t])
		}), i
	};
	var Sx = {
			line: function(t, e, i, n) {
				if ("bar" === t) return v({
					id: e,
					type: "line",
					data: i.get("data"),
					stack: i.get("stack"),
					markPoint: i.get("markPoint"),
					markLine: i.get("markLine")
				}, n.get("option.line") || {}, !0)
			},
			bar: function(t, e, i, n) {
				if ("line" === t) return v({
					id: e,
					type: "bar",
					data: i.get("data"),
					stack: i.get("stack"),
					markPoint: i.get("markPoint"),
					markLine: i.get("markLine")
				}, n.get("option.bar") || {}, !0)
			},
			stack: function(t, e, i, n) {
				if ("line" === t || "bar" === t) return v({
					id: e,
					stack: "__ec_magicType_stack__"
				}, n.get("option.stack") || {}, !0)
			},
			tiled: function(t, e, i, n) {
				if ("line" === t || "bar" === t) return v({
					id: e,
					stack: ""
				}, n.get("option.tiled") || {}, !0)
			}
		},
		Mx = [
			["line", "bar"],
			["stack", "tiled"]
		];
	bx.onclick = function(h, t, u) {
		var c = this.model,
			e = c.get("seriesIndex." + u);
		if (Sx[u]) {
			var d = {
				series: []
			};
			D(Mx, function(t) {
				0 <= x(t, u) && D(t, function(t) {
					c.setIconStatus(t, "normal")
				})
			}), c.setIconStatus(u, "emphasis"), h.eachComponent({
				mainType: "series",
				query: null == e ? null : {
					seriesIndex: e
				}
			}, function(t) {
				var e = t.subType,
					i = t.id,
					n = Sx[u](e, i, t, c);
				n && (T(n, t.option), d.series.push(n));
				var r = t.coordinateSystem;
				if (r && "cartesian2d" === r.type && ("line" === u || "bar" === u)) {
					var a = r.getAxesByScale("ordinal")[0];
					if (a) {
						var o = a.dim + "Axis",
							s = h.queryComponents({
								mainType: o,
								index: t.get(name + "Index"),
								id: t.get(name + "Id")
							})[0].componentIndex;
						d[o] = d[o] || [];
						for (var l = 0; l <= s; l++) d[o][s] = d[o][s] || {};
						d[o][s].boundaryGap = "bar" === u
					}
				}
			}), t.dispatchAction({
				type: "changeMagicType",
				currentType: u,
				newOption: d
			})
		}
	}, Vd({
		type: "changeMagicType",
		event: "magicTypeChanged",
		update: "prepareAndUpdate"
	}, function(t, e) {
		e.mergeOption(t.newOption)
	}), px("magicType", xx);
	var Ix = ec.toolbox.dataView,
		Cx = new Array(60).join("-"),
		Ax = "\t";

	function Tx(t) {
		var e = function(t) {
			var r = {},
				a = [],
				o = [];
			return t.eachRawSeries(function(t) {
				var e = t.coordinateSystem;
				if (!e || "cartesian2d" !== e.type && "polar" !== e.type) a.push(t);
				else {
					var i = e.getBaseAxis();
					if ("category" === i.type) {
						var n = i.dim + "_" + i.index;
						r[n] || (r[n] = {
							categoryAxis: i,
							valueAxis: e.getOtherAxis(i),
							series: []
						}, o.push({
							axisDim: i.dim,
							axisIndex: i.index
						})), r[n].series.push(t)
					} else a.push(t)
				}
			}), {
				seriesGroupByCategoryAxis: r,
				other: a,
				meta: o
			}
		}(t);
		return {
			value: I([function(t) {
				var u = [];
				return D(t, function(t, e) {
					var i = t.categoryAxis,
						n = t.valueAxis.dim,
						r = [" "].concat(P(t.series, function(t) {
							return t.name
						})),
						a = [i.model.getCategories()];
					D(t.series, function(t) {
						a.push(t.getRawData().mapArray(n, function(t) {
							return t
						}))
					});
					for (var o = [r.join(Ax)], s = 0; s < a[0].length; s++) {
						for (var l = [], h = 0; h < a.length; h++) l.push(a[h][s]);
						o.push(l.join(Ax))
					}
					u.push(o.join("\n"))
				}), u.join("\n\n" + Cx + "\n\n")
			}(e.seriesGroupByCategoryAxis), function(t) {
				return P(t, function(t) {
					var r = t.getRawData(),
						a = [t.name],
						o = [];
					return r.each(r.dimensions, function() {
						for (var t = arguments.length, e = arguments[t - 1], i = r.getName(e), n = 0; n < t - 1; n++) o[n] =
							arguments[n];
						a.push((i ? i + Ax : "") + o.join(Ax))
					}), a.join("\n")
				}).join("\n\n" + Cx + "\n\n")
			}(e.other)], function(t) {
				return t.replace(/[\n\t\s]/g, "")
			}).join("\n\n" + Cx + "\n\n"),
			meta: e.meta
		}
	}

	function Dx(t) {
		return t.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
	}
	var kx = new RegExp("[" + Ax + "]+", "g");

	function Px(t, a) {
		var e = t.split(new RegExp("\n*" + Cx + "\n*", "g")),
			o = {
				series: []
			};
		return D(e, function(t, e) {
			if (function(t) {
					if (0 <= t.slice(0, t.indexOf("\n")).indexOf(Ax)) return !0
				}(t)) {
				var i = function(t) {
						for (var e = t.split(/\n+/g), i = [], n = P(Dx(e.shift()).split(kx), function(t) {
								return {
									name: t,
									data: []
								}
							}), r = 0; r < e.length; r++) {
							var a = Dx(e[r]).split(kx);
							i.push(a.shift());
							for (var o = 0; o < a.length; o++) n[o] && (n[o].data[r] = a[o])
						}
						return {
							series: n,
							categories: i
						}
					}(t),
					n = a[e],
					r = n.axisDim + "Axis";
				n && (o[r] = o[r] || [], o[r][n.axisIndex] = {
					data: i.categories
				}, o.series = o.series.concat(i.series))
			} else {
				i = function(t) {
					for (var e = t.split(/\n+/g), i = Dx(e.shift()), n = [], r = 0; r < e.length; r++) {
						var a, o = Dx(e[r]).split(kx),
							s = "",
							l = !1;
						a = isNaN(o[0]) ? (l = !0, s = o[0], o = o.slice(1), n[r] = {
							name: s,
							value: []
						}, n[r].value) : n[r] = [];
						for (var h = 0; h < o.length; h++) a.push(+o[h]);
						1 === a.length && (l ? n[r].value = a[0] : n[r] = a[0])
					}
					return {
						name: i,
						data: n
					}
				}(t);
				o.series.push(i)
			}
		}), o
	}

	function Lx(t) {
		this._dom = null, this.model = t
	}
	Lx.defaultOption = {
		show: !0,
		readOnly: !1,
		optionToContent: null,
		contentToOption: null,
		icon: "M17.5,17.3H33 M17.5,17.3H33 M45.4,29.5h-28 M11.5,2v56H51V14.8L38.4,2H11.5z M38.4,2.2v12.7H51 M45.4,41.7h-28",
		title: b(Ix.title),
		lang: b(Ix.lang),
		backgroundColor: "#fff",
		textColor: "#000",
		textareaColor: "#fff",
		textareaBorderColor: "#333",
		buttonColor: "#c23531",
		buttonTextColor: "#fff"
	}, Lx.prototype.onclick = function(t, e) {
		var i = e.getDom(),
			n = this.model;
		this._dom && i.removeChild(this._dom);
		var r = document.createElement("div");
		r.style.cssText = "position:absolute;left:5px;top:5px;bottom:5px;right:5px;", r.style.backgroundColor = n.get(
			"backgroundColor") || "#fff";
		var a = document.createElement("h4"),
			o = n.get("lang") || [];
		a.innerHTML = o[0] || n.get("title"), a.style.cssText = "margin: 10px 20px;", a.style.color = n.get("textColor");
		var s = document.createElement("div"),
			l = document.createElement("textarea");
		s.style.cssText = "display:block;width:100%;overflow:auto;";
		var h = n.get("optionToContent"),
			u = n.get("contentToOption"),
			c = Tx(t);
		if ("function" == typeof h) {
			var d = h(e.getOption());
			"string" == typeof d ? s.innerHTML = d : V(d) && s.appendChild(d)
		} else s.appendChild(l), l.readOnly = n.get("readOnly"), l.style.cssText =
			"width:100%;height:100%;font-family:monospace;font-size:14px;line-height:1.6rem;", l.style.color = n.get(
				"textColor"), l.style.borderColor = n.get("textareaBorderColor"), l.style.backgroundColor = n.get("textareaColor"),
			l.value = c.value;
		var f = c.meta,
			p = document.createElement("div");
		p.style.cssText = "position:absolute;bottom:0;left:0;right:0;";
		var g = "float:right;margin-right:20px;border:none;cursor:pointer;padding:2px 5px;font-size:12px;border-radius:3px",
			v = document.createElement("div"),
			m = document.createElement("div");
		g += ";background-color:" + n.get("buttonColor"), g += ";color:" + n.get("buttonTextColor");
		var y = this;

		function _() {
			i.removeChild(r), y._dom = null
		}
		Nt(v, "click", _), Nt(m, "click", function() {
				var t;
				try {
					t = "function" == typeof u ? u(s, e.getOption()) : Px(l.value, f)
				} catch (t) {
					throw _(), new Error("Data view format error " + t)
				}
				t && e.dispatchAction({
					type: "changeDataView",
					newOption: t
				}), _()
			}), v.innerHTML = o[1], m.innerHTML = o[2], m.style.cssText = g, v.style.cssText = g, n.get("readOnly") || p.appendChild(
				m), p.appendChild(v), r.appendChild(a), r.appendChild(s), r.appendChild(p), s.style.height = i.clientHeight - 80 +
			"px", i.appendChild(r), this._dom = r
	}, Lx.prototype.remove = function(t, e) {
		this._dom && e.getDom().removeChild(this._dom)
	}, Lx.prototype.dispose = function(t, e) {
		this.remove(t, e)
	}, px("dataView", Lx), Vd({
		type: "changeDataView",
		event: "dataViewChanged",
		update: "prepareAndUpdate"
	}, function(t, n) {
		var r = [];
		D(t.newOption.series, function(t) {
			var e = n.getSeriesByName(t.name)[0];
			if (e) {
				var i = e.get("data");
				r.push({
					name: t.name,
					data: function(t, n) {
						return P(t, function(t, e) {
							var i = n && n[e];
							return N(i) && !O(i) ? (N(t) && !O(t) && (t = t.value), T({
								value: t
							}, i)) : t
						})
					}(t.data, i)
				})
			} else r.push(k({
				type: "scatter"
			}, t))
		}), n.mergeOption(T({
			series: r
		}, t.newOption))
	});
	var Ox = A,
		zx = D,
		Ex = P,
		Nx = Math.min,
		Rx = Math.max,
		Bx = Math.pow,
		Vx = 1e4,
		Fx = 6,
		Hx = 6,
		Gx = "globalPan",
		Wx = {
			w: [0, 0],
			e: [0, 1],
			n: [1, 0],
			s: [1, 1]
		},
		Zx = {
			w: "ew",
			e: "ew",
			n: "ns",
			s: "ns",
			ne: "nesw",
			sw: "nesw",
			nw: "nwse",
			se: "nwse"
		},
		Ux = {
			brushStyle: {
				lineWidth: 2,
				stroke: "rgba(0,0,0,0.3)",
				fill: "rgba(0,0,0,0.1)"
			},
			transformable: !0,
			brushMode: "single",
			removeOnClick: !1
		},
		Xx = 0;

	function Yx(t) {
		It.call(this), this._zr = t, this.group = new mi, this._brushType, this._brushOption, this._panels, this._track = [],
			this._dragging, this._lastMouseMovePoint = {}, this._covers = [], this._creatingCover, this._creatingPanel, this._enableGlobalPan,
			this._uid = "brushController_" + Xx++, this._handlers = {}, zx(_w, function(t, e) {
				this._handlers[e] = C(t, this)
			}, this)
	}

	function jx(t, e) {
		var i = ww[e.brushType].createCover(t, e);
		return i.__brushOption = e, Kx(i, e), t.group.add(i), i
	}

	function qx(t, e) {
		var i = Jx(e);
		return i.endCreating && (i.endCreating(t, e), Kx(e, e.__brushOption)), e
	}

	function $x(t, e) {
		var i = e.__brushOption;
		Jx(e).updateCoverShape(t, e, i.range, i)
	}

	function Kx(t, e) {
		var i = e.z;
		null == i && (i = Vx), t.traverse(function(t) {
			t.z = i, t.z2 = i
		})
	}

	function Qx(t, e) {
		Jx(e).updateCommon(t, e), $x(t, e)
	}

	function Jx(t) {
		return ww[t.__brushOption.brushType]
	}

	function tw(t, e, i) {
		var n, r = t._panels;
		if (!r) return !0;
		var a = t._transform;
		return zx(r, function(t) {
			t.isTargetByCursor(e, i, a) && (n = t)
		}), n
	}

	function ew(t, e) {
		var i = t._panels;
		if (!i) return !0;
		var n = e.__brushOption.panelId;
		return null == n || i[n]
	}

	function iw(e) {
		var t = e._covers,
			i = t.length;
		return zx(t, function(t) {
			e.group.remove(t)
		}, e), t.length = 0, !!i
	}

	function nw(t, e) {
		var i = Ex(t._covers, function(t) {
			var e = t.__brushOption,
				i = b(e.range);
			return {
				brushType: e.brushType,
				panelId: e.panelId,
				range: i
			}
		});
		t.trigger("brush", i, {
			isEnd: !!e.isEnd,
			removeOnClick: !!e.removeOnClick
		})
	}

	function rw(t) {
		var e = t.length - 1;
		return e < 0 && (e = 0), [t[0], t[e]]
	}

	function aw(e, i, t, n) {
		var r = new mi;
		return r.add(new No({
			name: "main",
			style: hw(t),
			silent: !0,
			draggable: !0,
			cursor: "move",
			drift: Ox(e, i, r, "nswe"),
			ondragend: Ox(nw, i, {
				isEnd: !0
			})
		})), zx(n, function(t) {
			r.add(new No({
				name: t,
				style: {
					opacity: 0
				},
				draggable: !0,
				silent: !0,
				invisible: !0,
				drift: Ox(e, i, r, t),
				ondragend: Ox(nw, i, {
					isEnd: !0
				})
			}))
		}), r
	}

	function ow(t, e, i, n) {
		var r = n.brushStyle.lineWidth || 0,
			a = Rx(r, Hx),
			o = i[0][0],
			s = i[1][0],
			l = o - r / 2,
			h = s - r / 2,
			u = i[0][1],
			c = i[1][1],
			d = u - a + r / 2,
			f = c - a + r / 2,
			p = u - o,
			g = c - s,
			v = p + r,
			m = g + r;
		lw(t, e, "main", o, s, p, g), n.transformable && (lw(t, e, "w", l, h, a, m), lw(t, e, "e", d, h, a, m), lw(t, e, "n",
			l, h, v, a), lw(t, e, "s", l, f, v, a), lw(t, e, "nw", l, h, a, a), lw(t, e, "ne", d, h, a, a), lw(t, e, "sw", l,
			f, a, a), lw(t, e, "se", d, f, a, a))
	}

	function sw(n, r) {
		var t = r.__brushOption,
			a = t.transformable,
			e = r.childAt(0);
		e.useStyle(hw(t)), e.attr({
			silent: !a,
			cursor: a ? "move" : "default"
		}), zx(["w", "e", "n", "s", "se", "sw", "ne", "nw"], function(t) {
			var e = r.childOfName(t),
				i = function t(e, i) {
					{
						if (1 < i.length) {
							i = i.split("");
							var n = [t(e, i[0]), t(e, i[1])];
							return "e" !== n[0] && "w" !== n[0] || n.reverse(), n.join("")
						}
						var r = {
								w: "left",
								e: "right",
								n: "top",
								s: "bottom"
							},
							a = {
								left: "w",
								right: "e",
								top: "n",
								bottom: "s"
							},
							n = Ws(r[i], Hs(e.group));
						return a[n]
					}
				}(n, t);
			e && e.attr({
				silent: !a,
				invisible: !a,
				cursor: a ? Zx[i] + "-resize" : null
			})
		})
	}

	function lw(t, e, i, n, r, a, o) {
		var s = e.childOfName(i);
		s && s.setShape(function(t) {
			var e = Nx(t[0][0], t[1][0]),
				i = Nx(t[0][1], t[1][1]),
				n = Rx(t[0][0], t[1][0]),
				r = Rx(t[0][1], t[1][1]);
			return {
				x: e,
				y: i,
				width: n - e,
				height: r - i
			}
		}(pw(t, e, [
			[n, r],
			[n + a, r + o]
		])))
	}

	function hw(t) {
		return T({
			strokeNoScale: !0
		}, t.brushStyle)
	}

	function uw(t, e, i, n) {
		var r = [Nx(t, i), Nx(e, n)],
			a = [Rx(t, i), Rx(e, n)];
		return [
			[r[0], a[0]],
			[r[1], a[1]]
		]
	}

	function cw(t, e, i, n, r, a, o, s) {
		var l = n.__brushOption,
			h = t(l.range),
			u = fw(i, a, o);
		zx(r.split(""), function(t) {
			var e = Wx[t];
			h[e[0]][e[1]] += u[e[0]]
		}), l.range = e(uw(h[0][0], h[1][0], h[0][1], h[1][1])), Qx(i, n), nw(i, {
			isEnd: !1
		})
	}

	function dw(t, e, i, n, r) {
		var a = e.__brushOption.range,
			o = fw(t, i, n);
		zx(a, function(t) {
			t[0] += o[0], t[1] += o[1]
		}), Qx(t, e), nw(t, {
			isEnd: !1
		})
	}

	function fw(t, e, i) {
		var n = t.group,
			r = n.transformCoordToLocal(e, i),
			a = n.transformCoordToLocal(0, 0);
		return [r[0] - a[0], r[1] - a[1]]
	}

	function pw(t, e, i) {
		var n = ew(t, e);
		return n && !0 !== n ? n.clipPath(i, t._transform) : b(i)
	}

	function gw(t) {
		var e = t.event;
		e.preventDefault && e.preventDefault()
	}

	function vw(t, e, i) {
		return t.childOfName("main").contain(e, i)
	}

	function mw(t, e, i, n) {
		var r, a = t._creatingCover,
			o = t._creatingPanel,
			s = t._brushOption;
		if (t._track.push(i.slice()), function(t) {
				var e = t._track;
				if (!e.length) return !1;
				var i = e[e.length - 1],
					n = e[0],
					r = i[0] - n[0],
					a = i[1] - n[1],
					o = Bx(r * r + a * a, .5);
				return Fx < o
			}(t) || a) {
			if (o && !a) {
				"single" === s.brushMode && iw(t);
				var l = b(s);
				l.brushType = yw(l.brushType, o), l.panelId = !0 === o ? null : o.panelId, a = t._creatingCover = jx(t, l), t._covers
					.push(a)
			}
			if (a) {
				var h = ww[yw(t._brushType, o)];
				a.__brushOption.range = h.getCreatingRange(pw(t, a, t._track)), n && (qx(t, a), h.updateCommon(t, a)), $x(t, a), r = {
					isEnd: n
				}
			}
		} else n && "single" === s.brushMode && s.removeOnClick && tw(t, e, i) && iw(t) && (r = {
			isEnd: n,
			removeOnClick: !0
		});
		return r
	}

	function yw(t, e) {
		return "auto" === t ? e.defaultBrushType : t
	}
	Yx.prototype = {
		constructor: Yx,
		enableBrush: function(t) {
			return this._brushType && function(t) {
				var i = t._zr;
				(function(t, e, i) {
					var n = X_(t);
					n[e] === i && (n[e] = null)
				})(i, Gx, t._uid), zx(t._handlers, function(t, e) {
					i.off(e, t)
				}), t._brushType = t._brushOption = null
			}(this), t.brushType && function(t, e) {
				var i = t._zr;
				t._enableGlobalPan || function(t, e, i) {
					X_(t)[e] = i
				}(i, Gx, t._uid);
				zx(t._handlers, function(t, e) {
					i.on(e, t)
				}), t._brushType = e.brushType, t._brushOption = v(b(Ux), e, !0)
			}(this, t), this
		},
		setPanels: function(t) {
			if (t && t.length) {
				var e = this._panels = {};
				D(t, function(t) {
					e[t.panelId] = b(t)
				})
			} else this._panels = null;
			return this
		},
		mount: function(t) {
			t = t || {}, this._enableGlobalPan = t.enableGlobalPan;
			var e = this.group;
			return this._zr.add(e), e.attr({
				position: t.position || [0, 0],
				rotation: t.rotation || 0,
				scale: t.scale || [1, 1]
			}), this._transform = e.getLocalTransform(), this
		},
		eachCover: function(t, e) {
			zx(this._covers, t, e)
		},
		updateCovers: function(r) {
			r = P(r, function(t) {
				return v(b(Ux), t, !0)
			});
			var i = "\0-brush-index-",
				a = this._covers,
				o = this._covers = [],
				s = this,
				l = this._creatingCover;
			return new qd(a, r, function(t, e) {
				return n(t.__brushOption, e)
			}, n).add(t).update(t).remove(function(t) {
				a[t] !== l && s.group.remove(a[t])
			}).execute(), this;

			function n(t, e) {
				return (null != t.id ? t.id : i + e) + "-" + t.brushType
			}

			function t(t, e) {
				var i = r[t];
				if (null != e && a[e] === l) o[t] = a[e];
				else {
					var n = o[t] = null != e ? (a[e].__brushOption = i, a[e]) : qx(s, jx(s, i));
					Qx(s, n)
				}
			}
		},
		unmount: function() {
			return this.enableBrush(!1), iw(this), this._zr.remove(this.group), this
		},
		dispose: function() {
			this.unmount(), this.off()
		}
	}, S(Yx, It);
	var _w = {
		mousedown: function(t) {
			if (this._dragging) xw(this, t);
			else if (!t.target || !t.target.draggable) {
				gw(t);
				var e = this.group.transformCoordToLocal(t.offsetX, t.offsetY);
				this._creatingCover = null, (this._creatingPanel = tw(this, t, e)) && (this._dragging = !0, this._track = [e.slice()])
			}
		},
		mousemove: function(t) {
			var e = this._lastMouseMovePoint;
			e.x = t.offsetX, e.y = t.offsetY;
			var i = this.group.transformCoordToLocal(e.x, e.y);
			if (function(t, e, i) {
					if (t._brushType) {
						var n = t._zr,
							r = t._covers,
							a = tw(t, e, i);
						if (!t._dragging)
							for (var o = 0; o < r.length; o++) {
								var s = r[o].__brushOption;
								if (a && (!0 === a || s.panelId === a.panelId) && ww[s.brushType].contain(r[o], i[0], i[1])) return
							}
						a && n.setCursorStyle("crosshair")
					}
				}(this, t, i), this._dragging) {
				gw(t);
				var n = mw(this, t, i, !1);
				n && nw(this, n)
			}
		},
		mouseup: function(t) {
			xw(this, t)
		},
		globalout: function(t) {
			xw(this, t, !0)
		}
	};

	function xw(t, e, i) {
		if (t._dragging) {
			i || gw(e);
			var n = e.offsetX,
				r = e.offsetY,
				a = t._lastMouseMovePoint;
			i && (n = a.x, r = a.y);
			var o = t.group.transformCoordToLocal(n, r),
				s = mw(t, e, o, !0);
			t._dragging = !1, t._track = [], t._creatingCover = null, s && nw(t, s)
		}
	}
	var ww = {
		lineX: bw(0),
		lineY: bw(1),
		rect: {
			createCover: function(t, e) {
				return aw(Ox(cw, function(t) {
					return t
				}, function(t) {
					return t
				}), t, e, ["w", "e", "n", "s", "se", "sw", "ne", "nw"])
			},
			getCreatingRange: function(t) {
				var e = rw(t);
				return uw(e[1][0], e[1][1], e[0][0], e[0][1])
			},
			updateCoverShape: function(t, e, i, n) {
				ow(t, e, i, n)
			},
			updateCommon: sw,
			contain: vw
		},
		polygon: {
			createCover: function(t, e) {
				var i = new mi;
				return i.add(new ko({
					name: "main",
					style: hw(e),
					silent: !0
				})), i
			},
			getCreatingRange: function(t) {
				return t
			},
			endCreating: function(t, e) {
				e.remove(e.childAt(0)), e.add(new Do({
					name: "main",
					draggable: !0,
					drift: Ox(dw, t, e),
					ondragend: Ox(nw, t, {
						isEnd: !0
					})
				}))
			},
			updateCoverShape: function(t, e, i, n) {
				e.childAt(0).setShape({
					points: pw(t, e, i)
				})
			},
			updateCommon: sw,
			contain: vw
		}
	};

	function bw(l) {
		return {
			createCover: function(t, e) {
				return aw(Ox(cw, function(t) {
					var e = [t, [0, 100]];
					return l && e.reverse(), e
				}, function(t) {
					return t[l]
				}), t, e, [
					["w", "e"],
					["n", "s"]
				][l])
			},
			getCreatingRange: function(t) {
				var e = rw(t);
				return [Nx(e[0][l], e[1][l]), Rx(e[0][l], e[1][l])]
			},
			updateCoverShape: function(t, e, i, n) {
				var r, a = ew(t, e);
				if (!0 !== a && a.getLinearBrushOtherExtent) r = a.getLinearBrushOtherExtent(l, t._transform);
				else {
					var o = t._zr;
					r = [0, [o.getWidth(), o.getHeight()][1 - l]]
				}
				var s = [i, r];
				l && s.reverse(), ow(t, e, s, n)
			},
			updateCommon: sw,
			contain: vw
		}
	}
	var Sw = {
		axisPointer: 1,
		tooltip: 1,
		brush: 1
	};

	function Mw(n, r, a) {
		return n = Iw(n),
			function(t, e, i) {
				return n.contain(e[0], e[1]) && ! function(t, e, i) {
					var n = e.getComponentByElement(t.topTarget),
						r = n && n.coordinateSystem;
					return n && n !== i && !Sw[n.mainType] && r && r.model !== i
				}(t, r, a)
			}
	}

	function Iw(t) {
		return vi.create(t)
	}
	var Cw = D,
		Aw = x,
		Tw = A,
		Dw = ["dataToPoint", "pointToData"],
		kw = ["grid", "xAxis", "yAxis", "geo", "graph", "polar", "radiusAxis", "angleAxis", "bmap"];

	function Pw(t, e, i) {
		var n = this._targetInfoList = [],
			r = {},
			a = zw(e, t);
		Cw(Ew, function(t, e) {
			i && i.include && !(0 <= Aw(i.include, e)) || t(a, n, r)
		})
	}
	var Lw = Pw.prototype;

	function Ow(t) {
		return t[0] > t[1] && t.reverse(), t
	}

	function zw(t, e) {
		return Cr(t, e, {
			includeMainTypes: kw
		})
	}
	Lw.setOutputRanges = function(t, e) {
		this.matchOutputRanges(t, e, function(t, e, i) {
			if ((t.coordRanges || (t.coordRanges = [])).push(e), !t.coordRange) {
				t.coordRange = e;
				var n = Bw[t.brushType](0, i, e);
				t.__rangeOffset = {
					offset: Fw[t.brushType](n.values, t.range, [1, 1]),
					xyMinMax: n.xyMinMax
				}
			}
		})
	}, Lw.matchOutputRanges = function(t, n, r) {
		Cw(t, function(i) {
			var t = this.findTargetInfo(i, n);
			t && !0 !== t && D(t.coordSyses, function(t) {
				var e = Bw[i.brushType](1, t, i.range);
				r(i, e.values, t, n)
			})
		}, this)
	}, Lw.setInputRanges = function(t, r) {
		Cw(t, function(t) {
			var e = this.findTargetInfo(t, r);
			if (t.range = t.range || [], e && !0 !== e) {
				t.panelId = e.panelId;
				var i = Bw[t.brushType](0, e.coordSys, t.coordRange),
					n = t.__rangeOffset;
				t.range = n ? Fw[t.brushType](i.values, n.offset, function(t, e) {
					var i = Gw(t),
						n = Gw(e),
						r = [i[0] / n[0], i[1] / n[1]];
					return isNaN(r[0]) && (r[0] = 1), isNaN(r[1]) && (r[1] = 1), r
				}(i.xyMinMax, n.xyMinMax)) : i.values
			}
		}, this)
	}, Lw.makePanelOpts = function(i, n) {
		return P(this._targetInfoList, function(t) {
			var e = t.getPanelRect();
			return {
				panelId: t.panelId,
				defaultBrushType: n && n(t),
				clipPath: function(i) {
					return i = Iw(i),
						function(t, e) {
							return Us(t, i)
						}
				}(e),
				isTargetByCursor: Mw(e, i, t.coordSysModel),
				getLinearBrushOtherExtent: function(r, a) {
					return r = Iw(r),
						function(t) {
							var e = null != a ? a : t,
								i = e ? r.width : r.height,
								n = e ? r.x : r.y;
							return [n, n + (i || 0)]
						}
				}(e)
			}
		})
	}, Lw.controlSeries = function(t, e, i) {
		var n = this.findTargetInfo(t, i);
		return !0 === n || n && 0 <= Aw(n.coordSyses, e.coordinateSystem)
	}, Lw.findTargetInfo = function(t, e) {
		for (var i = this._targetInfoList, n = zw(e, t), r = 0; r < i.length; r++) {
			var a = i[r],
				o = t.panelId;
			if (o) {
				if (a.panelId === o) return a
			} else
				for (r = 0; r < Nw.length; r++)
					if (Nw[r](n, a)) return a
		}
		return !0
	};
	var Ew = {
			grid: function(t, n) {
				var r = t.xAxisModels,
					a = t.yAxisModels,
					e = t.gridModels,
					i = Q(),
					o = {},
					s = {};
				(r || a || e) && (Cw(r, function(t) {
					var e = t.axis.grid.model;
					i.set(e.id, e), o[e.id] = !0
				}), Cw(a, function(t) {
					var e = t.axis.grid.model;
					i.set(e.id, e), s[e.id] = !0
				}), Cw(e, function(t) {
					i.set(t.id, t), o[t.id] = !0, s[t.id] = !0
				}), i.each(function(t) {
					var e = t.coordinateSystem,
						i = [];
					Cw(e.getCartesians(), function(t, e) {
						(0 <= Aw(r, t.getAxis("x").model) || 0 <= Aw(a, t.getAxis("y").model)) && i.push(t)
					}), n.push({
						panelId: "grid--" + t.id,
						gridModel: t,
						coordSysModel: t,
						coordSys: i[0],
						coordSyses: i,
						getPanelRect: Rw.grid,
						xAxisDeclared: o[t.id],
						yAxisDeclared: s[t.id]
					})
				}))
			},
			geo: function(t, i) {
				Cw(t.geoModels, function(t) {
					var e = t.coordinateSystem;
					i.push({
						panelId: "geo--" + t.id,
						geoModel: t,
						coordSysModel: t,
						coordSys: e,
						coordSyses: [e],
						getPanelRect: Rw.geo
					})
				})
			}
		},
		Nw = [function(t, e) {
			var i = t.xAxisModel,
				n = t.yAxisModel,
				r = t.gridModel;
			return !r && i && (r = i.axis.grid.model), !r && n && (r = n.axis.grid.model), r && r === e.gridModel
		}, function(t, e) {
			var i = t.geoModel;
			return i && i === e.geoModel
		}],
		Rw = {
			grid: function() {
				return this.coordSys.grid.getRect().clone()
			},
			geo: function() {
				var t = this.coordSys,
					e = t.getBoundingRect().clone();
				return e.applyTransform(Hs(t)), e
			}
		},
		Bw = {
			lineX: Tw(Vw, 0),
			lineY: Tw(Vw, 1),
			rect: function(t, e, i) {
				var n = e[Dw[t]]([i[0][0], i[1][0]]),
					r = e[Dw[t]]([i[0][1], i[1][1]]),
					a = [Ow([n[0], r[0]]), Ow([n[1], r[1]])];
				return {
					values: a,
					xyMinMax: a
				}
			},
			polygon: function(i, n, t) {
				var r = [
					[1 / 0, -1 / 0],
					[1 / 0, -1 / 0]
				];
				return {
					values: P(t, function(t) {
						var e = n[Dw[i]](t);
						return r[0][0] = Math.min(r[0][0], e[0]), r[1][0] = Math.min(r[1][0], e[1]), r[0][1] = Math.max(r[0][1], e[0]),
							r[1][1] = Math.max(r[1][1], e[1]), e
					}),
					xyMinMax: r
				}
			}
		};

	function Vw(t, e, i, n) {
		var r = i.getAxis(["x", "y"][t]),
			a = Ow(P([0, 1], function(t) {
				return e ? r.coordToData(r.toLocalCoord(n[t])) : r.toGlobalCoord(r.dataToCoord(n[t]))
			})),
			o = [];
		return o[t] = a, o[1 - t] = [NaN, NaN], {
			values: a,
			xyMinMax: o
		}
	}
	var Fw = {
		lineX: Tw(Hw, 0),
		lineY: Tw(Hw, 1),
		rect: function(t, e, i) {
			return [
				[t[0][0] - i[0] * e[0][0], t[0][1] - i[0] * e[0][1]],
				[t[1][0] - i[1] * e[1][0], t[1][1] - i[1] * e[1][1]]
			]
		},
		polygon: function(t, i, n) {
			return P(t, function(t, e) {
				return [t[0] - n[0] * i[e][0], t[1] - n[1] * i[e][1]]
			})
		}
	};

	function Hw(t, e, i, n) {
		return [e[0] - n[t] * i[0], e[1] - n[t] * i[1]]
	}

	function Gw(t) {
		return t ? [t[0][1] - t[0][0], t[1][1] - t[1][0]] : [NaN, NaN]
	}
	var Ww = D,
		Zw = "\0_ec_hist_store";

	function Uw(t) {
		var e = t[Zw];
		return e = e || (t[Zw] = [{}])
	}
	k_.extend({
		type: "dataZoom.select"
	}), O_.extend({
		type: "dataZoom.select"
	});
	var Xw = ec.toolbox.dataZoom,
		Yw = D;

	function jw(t, e, i) {
		(this._brushController = new Yx(i.getZr())).on("brush", C(this._onBrush, this)).mount(), this._isZoomActive
	}
	jw.defaultOption = {
		show: !0,
		filterMode: "filter",
		icon: {
			zoom: "M0,13.5h26.9 M13.5,26.9V0 M32.1,13.5H58V58H13.5 V32.1",
			back: "M22,1.4L9.9,13.5l12.3,12.3 M10.3,13.5H54.9v44.6 H10.3v-26"
		},
		title: b(Xw.title)
	};
	var qw = jw.prototype;
	qw.render = function(t, e, i, n) {
		this.model = t, this.ecModel = e, this.api = i,
			function(t, e, i, n, r) {
				var a = i._isZoomActive;
				n && "takeGlobalCursor" === n.type && (a = "dataZoomSelect" === n.key && n.dataZoomSelectActive);
				i._isZoomActive = a, t.setIconStatus("zoom", a ? "emphasis" : "normal");
				var o = new Pw(Kw(t.option), e, {
					include: ["grid"]
				});
				i._brushController.setPanels(o.makePanelOpts(r, function(t) {
					return t.xAxisDeclared && !t.yAxisDeclared ? "lineX" : !t.xAxisDeclared && t.yAxisDeclared ? "lineY" : "rect"
				})).enableBrush(!!a && {
					brushType: "auto",
					brushStyle: {
						lineWidth: 0,
						fill: "rgba(0,0,0,0.2)"
					}
				})
			}(t, e, this, n, i),
			function(t, e) {
				t.setIconStatus("back", 1 < function(t) {
					return Uw(t).length
				}(e) ? "emphasis" : "normal")
			}(t, e)
	}, qw.onclick = function(t, e, i) {
		$w[i].call(this)
	}, qw.remove = function(t, e) {
		this._brushController.unmount()
	}, qw.dispose = function(t, e) {
		this._brushController.dispose()
	};
	var $w = {
		zoom: function() {
			var t = !this._isZoomActive;
			this.api.dispatchAction({
				type: "takeGlobalCursor",
				key: "dataZoomSelect",
				dataZoomSelectActive: t
			})
		},
		back: function() {
			this._dispatchZoomAction(function(t) {
				var n = Uw(t),
					e = n[n.length - 1];
				1 < n.length && n.pop();
				var r = {};
				return Ww(e, function(t, e) {
					for (var i = n.length - 1; 0 <= i; i--) {
						if (t = n[i][e]) {
							r[e] = t;
							break
						}
					}
				}), r
			}(this.ecModel))
		}
	};

	function Kw(e) {
		var i = {};
		return D(["xAxisIndex", "yAxisIndex"], function(t) {
			i[t] = e[t], null == i[t] && (i[t] = "all"), !1 !== i[t] && "none" !== i[t] || (i[t] = [])
		}), i
	}
	qw._onBrush = function(t, e) {
		if (e.isEnd && t.length) {
			var s = {},
				l = this.ecModel;
			this._brushController.updateCovers([]), new Pw(Kw(this.model.option), l, {
					include: ["grid"]
				}).matchOutputRanges(t, l, function(t, e, i) {
					if ("cartesian2d" === i.type) {
						var n = t.brushType;
						"rect" === n ? (r("x", i, e[0]), r("y", i, e[1])) : r({
							lineX: "x",
							lineY: "y"
						} [n], i, e)
					}
				}),
				function(a, t) {
					var o = Uw(a);
					Ww(t, function(t, e) {
						for (var i = o.length - 1; 0 <= i; i--) {
							if (o[i][e]) break
						}
						if (i < 0) {
							var n = a.queryComponents({
								mainType: "dataZoom",
								subType: "select",
								id: e
							})[0];
							if (n) {
								var r = n.getPercentRange();
								o[0][e] = {
									dataZoomId: e,
									start: r[0],
									end: r[1]
								}
							}
						}
					}), o.push(t)
				}(l, s), this._dispatchZoomAction(s)
		}

		function r(t, e, i) {
			var n = e.getAxis(t),
				r = n.model,
				a = function(e, i, t) {
					var n;
					return t.eachComponent({
						mainType: "dataZoom",
						subType: "select"
					}, function(t) {
						t.getAxisModel(e, i.componentIndex) && (n = t)
					}), n
				}(t, r, l),
				o = a.findRepresentativeAxisProxy(r).getMinMaxSpan();
			null == o.minValueSpan && null == o.maxValueSpan || (i = w_(0, i.slice(), n.scale.getExtent(), 0, o.minValueSpan,
				o.maxValueSpan)), a && (s[a.id] = {
				dataZoomId: a.id,
				startValue: i[0],
				endValue: i[1]
			})
		}
	}, qw._dispatchZoomAction = function(t) {
		var i = [];
		Yw(t, function(t, e) {
			i.push(b(t))
		}), i.length && this.api.dispatchAction({
			type: "dataZoom",
			from: this.uid,
			batch: i
		})
	}, px("dataZoom", jw), Rd(function(s) {
		if (s) {
			var l = s.dataZoom || (s.dataZoom = []);
			O(l) || (s.dataZoom = l = [l]);
			var t = s.toolbox;
			if (t && (O(t) && (t = t[0]), t && t.feature)) {
				var e = t.feature.dataZoom;
				i("xAxis", e), i("yAxis", e)
			}
		}

		function i(n, r) {
			if (r) {
				var a = n + "Index",
					o = r[a];
				null == o || "all" === o || O(o) || (o = !1 === o || "none" === o ? [] : [o]),
					function(t, e) {
						var i = s[t];
						O(i) || (i = i ? [i] : []);
						Yw(i, e)
					}(n, function(t, e) {
						if (null == o || "all" === o || -1 !== x(o, e)) {
							var i = {
								type: "select",
								$fromToolbox: !0,
								filterMode: r.filterMode || "filter",
								id: "\0_ec_\0toolbox-dataZoom_" + n + e
							};
							i[a] = e, l.push(i)
						}
					})
			}
		}
	});
	var Qw = ec.toolbox.restore;

	function Jw(t) {
		this.model = t
	}
	Jw.defaultOption = {
		show: !0,
		icon: "M3.8,33.4 M47,18.9h9.8V8.7 M56.3,20.1 C52.1,9,40.5,0.6,26.8,2.1C12.6,3.7,1.6,16.2,2.1,30.6 M13,41.1H3.1v10.2 M3.7,39.9c4.2,11.1,15.8,19.5,29.5,18 c14.2-1.6,25.2-14.1,24.7-28.5",
		title: Qw.title
	}, Jw.prototype.onclick = function(t, e, i) {
		! function(t) {
			t[Zw] = null
		}(t), e.dispatchAction({
			type: "restore",
			from: this.uid
		})
	}, px("restore", Jw), Vd({
		type: "restore",
		event: "restore",
		update: "prepareAndUpdate"
	}, function(t, e) {
		e.resetOption("recreate")
	});
	var tb, eb = "urn:schemas-microsoft-com:vml",
		ib = "undefined" == typeof window ? null : window,
		nb = !1,
		rb = ib && ib.document;

	function ab(t) {
		return tb(t)
	}
	if (rb && !m.canvasSupported) try {
		rb.namespaces.zrvml || rb.namespaces.add("zrvml", eb), tb = function(t) {
			return rb.createElement("<zrvml:" + t + ' class="zrvml">')
		}
	} catch (t) {
		tb = function(t) {
			return rb.createElement("<" + t + ' xmlns="' + eb + '" class="zrvml">')
		}
	}
	var ob, sb = Ea.CMD,
		lb = Math.round,
		hb = Math.sqrt,
		ub = Math.abs,
		cb = Math.cos,
		db = Math.sin,
		fb = Math.max;
	if (!m.canvasSupported) {
		var pb = ",",
			gb = "progid:DXImageTransform.Microsoft",
			vb = 21600,
			mb = vb / 2,
			yb = function(t) {
				t.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px;", t.coordsize = vb + "," + vb, t.coordorigin =
					"0,0"
			},
			_b = function(t, e, i) {
				return "rgb(" + [t, e, i].join(",") + ")"
			},
			xb = function(t, e) {
				e && t && e.parentNode !== t && t.appendChild(e)
			},
			wb = function(t, e) {
				e && t && e.parentNode === t && t.removeChild(e)
			},
			bb = function(t, e, i) {
				return 1e5 * (parseFloat(t) || 0) + 1e3 * (parseFloat(e) || 0) + i
			},
			Sb = En,
			Mb = function(t, e, i) {
				var n = ke(e);
				i = +i, isNaN(i) && (i = 1), n && (t.color = _b(n[0], n[1], n[2]), t.opacity = i * n[3])
			},
			Ib = function(t, e, i, n) {
				var r = "fill" === e,
					a = t.getElementsByTagName(e)[0];
				null != i[e] && "none" !== i[e] && (r || !r && i.lineWidth) ? (t[r ? "filled" : "stroked"] = "true", i[e] instanceof Ho &&
					wb(t, a), a = a || ab(e), r ? function(t, e, i) {
						var n, r, a = e.fill;
						if (null != a)
							if (a instanceof Ho) {
								var o, s = 0,
									l = [0, 0],
									h = 0,
									u = 1,
									c = i.getBoundingRect(),
									d = c.width,
									f = c.height;
								if ("linear" === a.type) {
									o = "gradient";
									var p = i.transform,
										g = [a.x * d, a.y * f],
										v = [a.x2 * d, a.y2 * f];
									p && (yt(g, g, p), yt(v, v, p));
									var m = v[0] - g[0],
										y = v[1] - g[1];
									(s = 180 * Math.atan2(m, y) / Math.PI) < 0 && (s += 360), s < 1e-6 && (s = 0)
								} else {
									o = "gradientradial";
									g = [a.x * d, a.y * f], p = i.transform;
									var _ = i.scale,
										x = d,
										w = f;
									l = [(g[0] - c.x) / x, (g[1] - c.y) / w], p && yt(g, g, p), x /= _[0] * vb, w /= _[1] * vb;
									var b = fb(x, w);
									h = 0 / b, u = 2 * a.r / b - h
								}
								var S = a.colorStops.slice();
								S.sort(function(t, e) {
									return t.offset - e.offset
								});
								for (var M = S.length, I = [], C = [], A = 0; A < M; A++) {
									var T = S[A],
										D = (n = T.color, void 0, r = ke(n), [_b(r[0], r[1], r[2]), r[3]]);
									C.push(T.offset * u + h + " " + D[0]), 0 !== A && A !== M - 1 || I.push(D)
								}
								if (2 <= M) {
									var k = I[0][0],
										P = I[1][0],
										L = I[0][1] * e.opacity,
										O = I[1][1] * e.opacity;
									t.type = o, t.method = "none", t.focus = "100%", t.angle = s, t.color = k, t.color2 = P, t.colors = C.join(
										","), t.opacity = O, t.opacity2 = L
								}
								"radial" === o && (t.focusposition = l.join(","))
							} else Mb(t, a, e.opacity)
					}(a, i, n) : function(t, e) {
						e.lineDash && (t.dashstyle = e.lineDash.join(" ")), null == e.stroke || e.stroke instanceof Ho || Mb(t, e.stroke,
							e.opacity)
					}(a, i), xb(t, a)) : (t[r ? "filled" : "stroked"] = "false", wb(t, a))
			},
			Cb = [
				[],
				[],
				[]
			];
		io.prototype.brushVML = function(t) {
			var e = this.style,
				i = this._vmlEl;
			i || (i = ab("shape"), yb(i), this._vmlEl = i), Ib(i, "fill", e, this), Ib(i, "stroke", e, this);
			var n = this.transform,
				r = null != n,
				a = i.getElementsByTagName("stroke")[0];
			if (a) {
				var o = e.lineWidth;
				if (r && !e.strokeNoScale) {
					var s = n[0] * n[3] - n[1] * n[2];
					o *= hb(ub(s))
				}
				a.weight = o + "px"
			}
			var l = this.path || (this.path = new Ea);
			this.__dirtyPath && (l.beginPath(), l.subPixelOptimize = !1, this.buildPath(l, this.shape), l.toStatic(), this.__dirtyPath = !
				1), i.path = function(t, e) {
				var i, n, r, a, o, s, l = sb.M,
					h = sb.C,
					u = sb.L,
					c = sb.A,
					d = sb.Q,
					f = [],
					p = t.data,
					g = t.len();
				for (a = 0; a < g;) {
					switch (n = "", i = 0, r = p[a++]) {
						case l:
							n = " m ", i = 1, o = p[a++], s = p[a++], Cb[0][0] = o, Cb[0][1] = s;
							break;
						case u:
							n = " l ", i = 1, o = p[a++], s = p[a++], Cb[0][0] = o, Cb[0][1] = s;
							break;
						case d:
						case h:
							n = " c ", i = 3;
							var v, m, y = p[a++],
								_ = p[a++],
								x = p[a++],
								w = p[a++];
							r === d ? (x = ((v = x) + 2 * y) / 3, w = ((m = w) + 2 * _) / 3, y = (o + 2 * y) / 3, _ = (s + 2 * _) / 3) :
								(v = p[a++], m = p[a++]), Cb[0][0] = y, Cb[0][1] = _, Cb[1][0] = x, Cb[1][1] = w, o = Cb[2][0] = v, s = Cb[2]
								[1] = m;
							break;
						case c:
							var b = 0,
								S = 0,
								M = 1,
								I = 1,
								C = 0;
							e && (b = e[4], S = e[5], M = hb(e[0] * e[0] + e[1] * e[1]), I = hb(e[2] * e[2] + e[3] * e[3]), C = Math.atan2(
								-e[1] / I, e[0] / M));
							var A = p[a++],
								T = p[a++],
								D = p[a++],
								k = p[a++],
								P = p[a++] + C,
								L = p[a++] + P + C;
							a++;
							var O = p[a++],
								z = A + cb(P) * D,
								E = T + db(P) * k,
								N = (y = A + cb(L) * D, _ = T + db(L) * k, O ? " wa " : " at ");
							Math.abs(z - y) < 1e-4 && (.01 < Math.abs(L - P) ? O && (z += .0125) : Math.abs(E - T) < 1e-4 ? O && z < A ||
								!O && A < z ? _ -= .0125 : _ += .0125 : O && E < T || !O && T < E ? y += .0125 : y -= .0125), f.push(N, lb(
									((A - D) * M + b) * vb - mb), pb, lb(((T - k) * I + S) * vb - mb), pb, lb(((A + D) * M + b) * vb - mb), pb,
								lb(((T + k) * I + S) * vb - mb), pb, lb((z * M + b) * vb - mb), pb, lb((E * I + S) * vb - mb), pb, lb((y *
									M + b) * vb - mb), pb, lb((_ * I + S) * vb - mb)), o = y, s = _;
							break;
						case sb.R:
							var R = Cb[0],
								B = Cb[1];
							R[0] = p[a++], R[1] = p[a++], B[0] = R[0] + p[a++], B[1] = R[1] + p[a++], e && (yt(R, R, e), yt(B, B, e)), R[
									0] = lb(R[0] * vb - mb), B[0] = lb(B[0] * vb - mb), R[1] = lb(R[1] * vb - mb), B[1] = lb(B[1] * vb - mb), f
								.push(" m ", R[0], pb, R[1], " l ", B[0], pb, R[1], " l ", B[0], pb, B[1], " l ", R[0], pb, B[1]);
							break;
						case sb.Z:
							f.push(" x ")
					}
					if (0 < i) {
						f.push(n);
						for (var V = 0; V < i; V++) {
							var F = Cb[V];
							e && yt(F, F, e), f.push(lb(F[0] * vb - mb), pb, lb(F[1] * vb - mb), V < i - 1 ? pb : "")
						}
					}
				}
				return f.join("")
			}(l, this.transform), i.style.zIndex = bb(this.zlevel, this.z, this.z2), xb(t, i), null != e.text ? this.drawRectText(
				t, this.getBoundingRect()) : this.removeRectText(t)
		}, io.prototype.onRemove = function(t) {
			wb(t, this._vmlEl), this.removeRectText(t)
		}, io.prototype.onAdd = function(t) {
			xb(t, this._vmlEl), this.appendRectText(t)
		};
		Hn.prototype.brushVML = function(t) {
			var e, i, n = this.style,
				r = n.image;
			if (function(t) {
					return "object" == typeof t && t.tagName && "IMG" === t.tagName.toUpperCase()
				}(r)) {
				var a = r.src;
				if (a === this._imageSrc) e = this._imageWidth, i = this._imageHeight;
				else {
					var o = r.runtimeStyle,
						s = o.width,
						l = o.height;
					o.width = "auto", o.height = "auto", e = r.width, i = r.height, o.width = s, o.height = l, this._imageSrc = a,
						this._imageWidth = e, this._imageHeight = i
				}
				r = a
			} else r === this._imageSrc && (e = this._imageWidth, i = this._imageHeight);
			if (r) {
				var h = n.x || 0,
					u = n.y || 0,
					c = n.width,
					d = n.height,
					f = n.sWidth,
					p = n.sHeight,
					g = n.sx || 0,
					v = n.sy || 0,
					m = f && p,
					y = this._vmlEl;
				y || (y = rb.createElement("div"), yb(y), this._vmlEl = y);
				var _, x = y.style,
					w = !1,
					b = 1,
					S = 1;
				if (this.transform && (_ = this.transform, b = hb(_[0] * _[0] + _[1] * _[1]), S = hb(_[2] * _[2] + _[3] * _[3]),
						w = _[1] || _[2]), w) {
					var M = [h, u],
						I = [h + c, u],
						C = [h, u + d],
						A = [h + c, u + d];
					yt(M, M, _), yt(I, I, _), yt(C, C, _), yt(A, A, _);
					var T = fb(M[0], I[0], C[0], A[0]),
						D = fb(M[1], I[1], C[1], A[1]),
						k = [];
					k.push("M11=", _[0] / b, pb, "M12=", _[2] / S, pb, "M21=", _[1] / b, pb, "M22=", _[3] / S, pb, "Dx=", lb(h * b +
							_[4]), pb, "Dy=", lb(u * S + _[5])), x.padding = "0 " + lb(T) + "px " + lb(D) + "px 0", x.filter = gb +
						".Matrix(" + k.join("") + ", SizingMethod=clip)"
				} else _ && (h = h * b + _[4], u = u * S + _[5]), x.filter = "", x.left = lb(h) + "px", x.top = lb(u) + "px";
				var P = this._imageEl,
					L = this._cropEl;
				P || (P = rb.createElement("div"), this._imageEl = P);
				var O = P.style;
				if (m) {
					if (e && i) O.width = lb(b * e * c / f) + "px", O.height = lb(S * i * d / p) + "px";
					else {
						var z = new Image,
							E = this;
						z.onload = function() {
							z.onload = null, e = z.width, i = z.height, O.width = lb(b * e * c / f) + "px", O.height = lb(S * i * d / p) +
								"px", E._imageWidth = e, E._imageHeight = i, E._imageSrc = r
						}, z.src = r
					}
					L || ((L = rb.createElement("div")).style.overflow = "hidden", this._cropEl = L);
					var N = L.style;
					N.width = lb((c + g * c / f) * b), N.height = lb((d + v * d / p) * S), N.filter = gb + ".Matrix(Dx=" + -g * c /
						f * b + ",Dy=" + -v * d / p * S + ")", L.parentNode || y.appendChild(L), P.parentNode !== L && L.appendChild(P)
				} else O.width = lb(b * c) + "px", O.height = lb(S * d) + "px", y.appendChild(P), L && L.parentNode && (y.removeChild(
					L), this._cropEl = null);
				var R = "",
					B = n.opacity;
				B < 1 && (R += ".Alpha(opacity=" + lb(100 * B) + ") "), R += gb + ".AlphaImageLoader(src=" + r +
					", SizingMethod=scale)", O.filter = R, y.style.zIndex = bb(this.zlevel, this.z, this.z2), xb(t, y), null != n.text &&
					this.drawRectText(t, this.getBoundingRect())
			}
		}, Hn.prototype.onRemove = function(t) {
			wb(t, this._vmlEl), this._vmlEl = null, this._cropEl = null, this._imageEl = null, this.removeRectText(t)
		}, Hn.prototype.onAdd = function(t) {
			xb(t, this._vmlEl), this.appendRectText(t)
		};
		var Ab, Tb = "normal",
			Db = {},
			kb = 0,
			Pb = document.createElement("div");
		ob = function(t, e) {
			var i = rb;
			Ab || ((Ab = i.createElement("div")).style.cssText =
				"position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;", rb.body.appendChild(Ab)
			);
			try {
				Ab.style.font = e
			} catch (t) {}
			return Ab.innerHTML = "", Ab.appendChild(i.createTextNode(t)), {
				width: Ab.offsetWidth
			}
		}, tn["measureText"] = ob;
		for (var Lb = new vi, Ob = function(t, e, i, n) {
				var r = this.style;
				this.__dirty && Sn(r);
				var a = r.text;
				if (null != a && (a += ""), a) {
					if (r.rich) {
						var o = fn(a, r);
						a = [];
						for (var s = 0; s < o.lines.length; s++) {
							for (var l = o.lines[s].tokens, h = [], u = 0; u < l.length; u++) h.push(l[u].text);
							a.push(h.join(""))
						}
						a = a.join("\n")
					}
					var c, d, f = r.textAlign,
						p = r.textVerticalAlign,
						g = function(t) {
							var e = Db[t];
							if (!e) {
								100 < kb && (kb = 0, Db = {});
								var i, n = Pb.style;
								try {
									n.font = t, i = n.fontFamily.split(",")[0]
								} catch (t) {}
								e = {
									style: n.fontStyle || Tb,
									variant: n.fontVariant || Tb,
									weight: n.fontWeight || Tb,
									size: 0 | parseFloat(n.fontSize || 12),
									family: i || "Microsoft YaHei"
								}, Db[t] = e, kb++
							}
							return e
						}(r.font),
						v = g.style + " " + g.variant + " " + g.weight + " " + g.size + 'px "' + g.family + '"';
					i = i || nn(a, v, f, p, r.textPadding, r.textLineHeight);
					var m = this.transform;
					if (m && !n && (Lb.copy(e), Lb.applyTransform(m), e = Lb), n) c = e.x, d = e.y;
					else {
						var y = r.textPosition;
						if (y instanceof Array) c = e.x + Sb(y[0], e.width), d = e.y + Sb(y[1], e.height), f = f || "left";
						else {
							var _ = this.calculateTextPosition ? this.calculateTextPosition({}, r, e) : on({}, r, e);
							c = _.x, d = _.y, f = f || _.textAlign, p = p || _.textVerticalAlign
						}
					}
					c = rn(c, i.width, f), d = an(d, i.height, p), d += i.height / 2;
					var x, w, b, S = ab,
						M = this._textVmlEl;
					M ? w = (x = (b = M.firstChild).nextSibling).nextSibling : (M = S("line"), x = S("path"), w = S("textpath"), b =
						S("skew"), w.style["v-text-align"] = "left", yb(M), x.textpathok = !0, w.on = !0, M.from = "0 0", M.to =
						"1000 0.05", xb(M, b), xb(M, x), xb(M, w), this._textVmlEl = M);
					var I = [c, d],
						C = M.style;
					m && n ? (yt(I, I, m), b.on = !0, b.matrix = m[0].toFixed(3) + pb + m[2].toFixed(3) + pb + m[1].toFixed(3) + pb +
						m[3].toFixed(3) + ",0,0", b.offset = (lb(I[0]) || 0) + "," + (lb(I[1]) || 0), b.origin = "0 0", C.left = "0px",
						C.top = "0px") : (b.on = !1, C.left = lb(c) + "px", C.top = lb(d) + "px"), w.string = function(t) {
						return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
					}(a);
					try {
						w.style.font = v
					} catch (t) {}
					Ib(M, "fill", {
						fill: r.textFill,
						opacity: r.opacity
					}, this), Ib(M, "stroke", {
						stroke: r.textStroke,
						opacity: r.opacity,
						lineDash: r.lineDash || null
					}, this), M.style.zIndex = bb(this.zlevel, this.z, this.z2), xb(t, M)
				}
			}, zb = function(t) {
				wb(t, this._textVmlEl), this._textVmlEl = null
			}, Eb = function(t) {
				xb(t, this._textVmlEl)
			}, Nb = [Bn, Fn, Hn, io, wo], Rb = 0; Rb < Nb.length; Rb++) {
			var Bb = Nb[Rb].prototype;
			Bb.drawRectText = Ob, Bb.removeRectText = zb, Bb.appendRectText = Eb
		}
		wo.prototype.brushVML = function(t) {
			var e = this.style;
			null != e.text ? this.drawRectText(t, {
				x: e.x || 0,
				y: e.y || 0,
				width: 0,
				height: 0
			}, this.getBoundingRect(), !0) : this.removeRectText(t)
		}, wo.prototype.onRemove = function(t) {
			this.removeRectText(t)
		}, wo.prototype.onAdd = function(t) {
			this.appendRectText(t)
		}
	}

	function Vb(t) {
		return parseInt(t, 10)
	}

	function Fb(t, e) {
		! function() {
			if (!nb && rb) {
				nb = !0;
				var t = rb.styleSheets;
				t.length < 31 ? rb.createStyleSheet().addRule(".zrvml", "behavior:url(#default#VML)") : t[0].addRule(".zrvml",
					"behavior:url(#default#VML)")
			}
		}(), this.root = t, this.storage = e;
		var i = document.createElement("div"),
			n = document.createElement("div");
		i.style.cssText = "display:inline-block;overflow:hidden;position:relative;width:300px;height:150px;", n.style.cssText =
			"position:absolute;left:0;top:0;", t.appendChild(i), this._vmlRoot = n, this._vmlViewport = i, this.resize();
		var r = e.delFromStorage,
			a = e.addToStorage;
		e.delFromStorage = function(t) {
			r.call(e, t), t && t.onRemove && t.onRemove(n)
		}, e.addToStorage = function(t) {
			t.onAdd && t.onAdd(n), a.call(e, t)
		}, this._firstPaint = !0
	}
	Fb.prototype = {
		constructor: Fb,
		getType: function() {
			return "vml"
		},
		getViewportRoot: function() {
			return this._vmlViewport
		},
		getViewportRootOffset: function() {
			var t = this.getViewportRoot();
			if (t) return {
				offsetLeft: t.offsetLeft || 0,
				offsetTop: t.offsetTop || 0
			}
		},
		refresh: function() {
			var t = this.storage.getDisplayList(!0, !0);
			this._paintList(t)
		},
		_paintList: function(t) {
			for (var e = this._vmlRoot, i = 0; i < t.length; i++) {
				var n = t[i];
				n.invisible || n.ignore ? (n.__alreadyNotVisible || n.onRemove(e), n.__alreadyNotVisible = !0) : (n.__alreadyNotVisible &&
					n.onAdd(e), n.__alreadyNotVisible = !1, n.__dirty && (n.beforeBrush && n.beforeBrush(), (n.brushVML || n.brush)
						.call(n, e), n.afterBrush && n.afterBrush())), n.__dirty = !1
			}
			this._firstPaint && (this._vmlViewport.appendChild(e), this._firstPaint = !1)
		},
		resize: function(t, e) {
			t = null == t ? this._getWidth() : t, e = null == e ? this._getHeight() : e;
			if (this._width !== t || this._height !== e) {
				this._width = t, this._height = e;
				var i = this._vmlViewport.style;
				i.width = t + "px", i.height = e + "px"
			}
		},
		dispose: function() {
			this.root.innerHTML = "", this._vmlRoot = this._vmlViewport = this.storage = null
		},
		getWidth: function() {
			return this._width
		},
		getHeight: function() {
			return this._height
		},
		clear: function() {
			this._vmlViewport && this.root.removeChild(this._vmlViewport)
		},
		_getWidth: function() {
			var t = this.root,
				e = t.currentStyle;
			return (t.clientWidth || Vb(e.width)) - Vb(e.paddingLeft) - Vb(e.paddingRight) | 0
		},
		_getHeight: function() {
			var t = this.root,
				e = t.currentStyle;
			return (t.clientHeight || Vb(e.height)) - Vb(e.paddingTop) - Vb(e.paddingBottom) | 0
		}
	}, D(["getLayer", "insertLayer", "eachLayer", "eachBuiltinLayer", "eachOtherLayer", "getLayers", "modLayer",
		"delLayer", "clearLayer", "toDataURL", "pathToImage"
	], function(t) {
		Fb.prototype[t] = function(t) {
			return function() {
				ai('In IE8.0 VML mode painter not support method "' + t + '"')
			}
		}(t)
	}), lr("vml", Fb);

	function Hb(t) {
		return document.createElementNS("http://www.w3.org/2000/svg", t)
	}
	var Gb = Ea.CMD,
		Wb = Array.prototype.join,
		Zb = "none",
		Ub = Math.round,
		Xb = Math.sin,
		Yb = Math.cos,
		jb = Math.PI,
		qb = 2 * Math.PI,
		$b = 180 / jb,
		Kb = 1e-4;

	function Qb(t) {
		return Ub(1e4 * t) / 1e4
	}

	function Jb(t) {
		return t < Kb && -Kb < t
	}

	function tS(t, e) {
		e && eS(t, "transform", "matrix(" + Wb.call(e, ",") + ")")
	}

	function eS(t, e, i) {
		i && ("linear" === i.type || "radial" === i.type) || t.setAttribute(e, i)
	}

	function iS(t, e, i, n) {
		if (function(t, e) {
				var i = e ? t.textFill : t.fill;
				return null != i && i !== Zb
			}(e, i)) {
			var r = i ? e.textFill : e.fill;
			eS(t, "fill", r = "transparent" === r ? Zb : r), eS(t, "fill-opacity", null != e.fillOpacity ? e.fillOpacity * e.opacity :
				e.opacity)
		} else eS(t, "fill", Zb);
		if (function(t, e) {
				var i = e ? t.textStroke : t.stroke;
				return null != i && i !== Zb
			}(e, i)) {
			var a = i ? e.textStroke : e.stroke;
			eS(t, "stroke", a = "transparent" === a ? Zb : a), eS(t, "stroke-width", (i ? e.textStrokeWidth : e.lineWidth) / (!
					i && e.strokeNoScale ? n.getLineScale() : 1)), eS(t, "paint-order", i ? "stroke" : "fill"), eS(t,
					"stroke-opacity", null != e.strokeOpacity ? e.strokeOpacity : e.opacity), e.lineDash ? (eS(t, "stroke-dasharray",
					e.lineDash.join(",")), eS(t, "stroke-dashoffset", Ub(e.lineDashOffset || 0))) : eS(t, "stroke-dasharray", ""), e.lineCap &&
				eS(t, "stroke-linecap", e.lineCap), e.lineJoin && eS(t, "stroke-linejoin", e.lineJoin), e.miterLimit && eS(t,
					"stroke-miterlimit", e.miterLimit)
		} else eS(t, "stroke", Zb)
	}
	var nS = {};
	nS.brush = function(t) {
		var e = t.style,
			i = t.__svgEl;
		i || (i = Hb("path"), t.__svgEl = i), t.path || t.createPathProxy();
		var n = t.path;
		if (t.__dirtyPath) {
			n.beginPath(), n.subPixelOptimize = !1, t.buildPath(n, t.shape), t.__dirtyPath = !1;
			var r = function(t) {
				for (var e = [], i = t.data, n = t.len(), r = 0; r < n;) {
					var a = "",
						o = 0;
					switch (i[r++]) {
						case Gb.M:
							a = "M", o = 2;
							break;
						case Gb.L:
							a = "L", o = 2;
							break;
						case Gb.Q:
							a = "Q", o = 4;
							break;
						case Gb.C:
							a = "C", o = 6;
							break;
						case Gb.A:
							var s = i[r++],
								l = i[r++],
								h = i[r++],
								u = i[r++],
								c = i[r++],
								d = i[r++],
								f = i[r++],
								p = i[r++],
								g = Math.abs(d),
								v = Jb(g - qb) || (p ? qb <= d : qb <= -d),
								m = 0 < d ? d % qb : d % qb + qb,
								y = !1;
							y = !!v || !Jb(g) && jb <= m == !!p;
							var _ = Qb(s + h * Yb(c)),
								x = Qb(l + u * Xb(c));
							v && (d = p ? qb - 1e-4 : 1e-4 - qb, y = !0, 9 === r && e.push("M", _, x));
							var w = Qb(s + h * Yb(c + d)),
								b = Qb(l + u * Xb(c + d));
							e.push("A", Qb(h), Qb(u), Ub(f * $b), +y, +p, w, b);
							break;
						case Gb.Z:
							a = "Z";
							break;
						case Gb.R:
							w = Qb(i[r++]), b = Qb(i[r++]);
							var S = Qb(i[r++]),
								M = Qb(i[r++]);
							e.push("M", w, b, "L", w + S, b, "L", w + S, b + M, "L", w, b + M, "L", w, b)
					}
					a && e.push(a);
					for (var I = 0; I < o; I++) e.push(Qb(i[r++]))
				}
				return e.join(" ")
			}(n);
			r.indexOf("NaN") < 0 && eS(i, "d", r)
		}
		iS(i, e, !1, t), tS(i, t.transform), null != e.text && uS(t, t.getBoundingRect())
	};
	var rS = {
			brush: function(t) {
				var e = t.style,
					i = e.image;
				i instanceof HTMLImageElement && (i = i.src);
				if (i) {
					var n = e.x || 0,
						r = e.y || 0,
						a = e.width,
						o = e.height,
						s = t.__svgEl;
					s || (s = Hb("image"), t.__svgEl = s), i !== t.__imageSrc && (function(t, e, i) {
						t.setAttributeNS("http://www.w3.org/1999/xlink", e, i)
					}(s, "href", i), t.__imageSrc = i), eS(s, "width", a), eS(s, "height", o), eS(s, "x", n), eS(s, "y", r), tS(s,
						t.transform), null != e.text && uS(t, t.getBoundingRect())
				}
			}
		},
		aS = {},
		oS = new vi,
		sS = {},
		lS = [],
		hS = {
			left: "start",
			right: "end",
			center: "middle",
			middle: "middle"
		},
		uS = function(t, e) {
			var i = t.style,
				n = t.transform,
				r = t instanceof wo || i.transformText;
			t.__dirty && Sn(i);
			var a = i.text;
			if (null != a && (a += ""), Rn(a, i)) {
				null == a && (a = ""), !r && n && (oS.copy(e), oS.applyTransform(n), e = oS);
				var o = t.__textSvgEl;
				o || (o = Hb("text"), t.__textSvgEl = o);
				var s = o.style,
					l = i.font || Ji,
					h = o.__computedFont;
				l !== o.__styleFont && (s.font = o.__styleFont = l, h = o.__computedFont = s.font);
				var u = i.textPadding,
					c = i.textLineHeight,
					d = t.__textCotentBlock;
				d && !t.__dirtyText || (d = t.__textCotentBlock = dn(a, h, u, c, i.truncate));
				var f = d.outerHeight,
					p = d.lineHeight;
				Pn(sS, t, i, e);
				var g = sS.baseX,
					v = sS.baseY,
					m = sS.textAlign || "left",
					y = sS.textVerticalAlign;
				! function(t, e, i, n, r, a, o) {
					$t(lS), e && i && Kt(lS, i);
					var s = n.textRotation;
					if (r && s) {
						var l = n.textOrigin;
						"center" === l ? (a = r.width / 2 + r.x, o = r.height / 2 + r.y) : l && (a = l[0] + r.x, o = l[1] + r.y), lS[4] -=
							a, lS[5] -= o, te(lS, lS, s), lS[4] += a, lS[5] += o
					}
					tS(t, lS)
				}(o, r, n, i, e, g, v);
				var _ = g,
					x = an(v, f, y);
				u && (_ = function(t, e, i) {
					return "right" === e ? t - i[1] : "center" === e ? t + i[3] / 2 - i[1] / 2 : t + i[3]
				}(g, m, u), x += u[0]), x += p / 2, iS(o, i, !0, t);
				var w = d.canCacheByTextString,
					b = t.__tspanList || (t.__tspanList = []),
					S = b.length;
				if (w && t.__canCacheByTextString && t.__text === a) {
					if (t.__dirtyText && S)
						for (var M = 0; M < S; ++M) cS(b[M], m, _, x + M * p)
				} else {
					t.__text = a, t.__canCacheByTextString = w;
					var I = d.lines,
						C = I.length;
					for (M = 0; M < C; M++) {
						var A = b[M],
							T = I[M];
						A ? A.__zrText !== T && (A.innerHTML = "", A.appendChild(document.createTextNode(T))) : (A = b[M] = Hb("tspan"),
							o.appendChild(A), A.appendChild(document.createTextNode(T))), cS(A, m, _, x + M * p)
					}
					if (C < S) {
						for (; M < S; M++) o.removeChild(b[M]);
						b.length = C
					}
				}
			}
		};

	function cS(t, e, i, n) {
		eS(t, "dominant-baseline", "middle"), eS(t, "text-anchor", hS[e]), eS(t, "x", i), eS(t, "y", n)
	}

	function dS() {}

	function fS(t, e) {
		for (var i = 0, n = e.length, r = 0, a = 0; i < n; i++) {
			var o = e[i];
			if (o.removed) {
				for (s = [], l = a; l < a + o.count; l++) s.push(l);
				o.indices = s, a += o.count
			} else {
				for (var s = [], l = r; l < r + o.count; l++) s.push(l);
				o.indices = s, r += o.count, o.added || (a += o.count)
			}
		}
		return e
	}
	aS.drawRectText = uS, aS.brush = function(t) {
		null != t.style.text && uS(t, !1)
	}, dS.prototype = {
		diff: function(l, h, t) {
			t = t || function(t, e) {
				return t === e
			}, this.equals = t;
			var u = this;
			l = l.slice();
			var c = (h = h.slice()).length,
				d = l.length,
				f = 1,
				e = c + d,
				p = [{
					newPos: -1,
					components: []
				}],
				i = this.extractCommon(p[0], h, l, 0);
			if (p[0].newPos + 1 >= c && d <= i + 1) {
				for (var n = [], r = 0; r < h.length; r++) n.push(r);
				return [{
					indices: n,
					count: h.length
				}]
			}

			function a() {
				for (var t = -1 * f; t <= f; t += 2) {
					var e, i = p[t - 1],
						n = p[t + 1],
						r = (n ? n.newPos : 0) - t;
					i && (p[t - 1] = void 0);
					var a = i && i.newPos + 1 < c,
						o = n && 0 <= r && r < d;
					if (a || o) {
						if (!a || o && i.newPos < n.newPos ? (e = {
								newPos: (s = n).newPos,
								components: s.components.slice(0)
							}, u.pushComponent(e.components, void 0, !0)) : ((e = i).newPos++, u.pushComponent(e.components, !0, void 0)),
							r = u.extractCommon(e, h, l, t), e.newPos + 1 >= c && d <= r + 1) return fS(u, e.components, h, l);
						p[t] = e
					} else p[t] = void 0
				}
				var s;
				f++
			}
			for (; f <= e;) {
				var o = a();
				if (o) return o
			}
		},
		pushComponent: function(t, e, i) {
			var n = t[t.length - 1];
			n && n.added === e && n.removed === i ? t[t.length - 1] = {
				count: n.count + 1,
				added: e,
				removed: i
			} : t.push({
				count: 1,
				added: e,
				removed: i
			})
		},
		extractCommon: function(t, e, i, n) {
			for (var r = e.length, a = i.length, o = t.newPos, s = o - n, l = 0; o + 1 < r && s + 1 < a && this.equals(e[o +
					1], i[s + 1]);) o++, s++, l++;
			return l && t.components.push({
				count: l
			}), t.newPos = o, s
		},
		tokenize: function(t) {
			return t.slice()
		},
		join: function(t) {
			return t.slice()
		}
	};
	var pS = new dS;

	function gS(t, e, i, n, r) {
		this._zrId = t, this._svgRoot = e, this._tagNames = "string" == typeof i ? [i] : i, this._markLabel = n, this._domName =
			r || "_dom", this.nextId = 0
	}

	function vS(t, e) {
		gS.call(this, t, e, ["linearGradient", "radialGradient"], "__gradient_in_use__")
	}

	function mS(t, e) {
		gS.call(this, t, e, "clipPath", "__clippath_in_use__")
	}

	function yS(t, e) {
		gS.call(this, t, e, ["filter"], "__filter_in_use__", "_shadowDom")
	}

	function _S(t) {
		return t && (t.shadowBlur || t.shadowOffsetX || t.shadowOffsetY || t.textShadowBlur || t.textShadowOffsetX || t.textShadowOffsetY)
	}

	function xS(t) {
		return parseInt(t, 10)
	}

	function wS(t, e) {
		return e && t && e.parentNode !== t
	}

	function bS(t, e, i) {
		if (wS(t, e) && i) {
			var n = i.nextSibling;
			n ? t.insertBefore(e, n) : t.appendChild(e)
		}
	}

	function SS(t, e) {
		if (wS(t, e)) {
			var i = t.firstChild;
			i ? t.insertBefore(e, i) : t.appendChild(e)
		}
	}

	function MS(t, e) {
		e && t && e.parentNode === t && t.removeChild(e)
	}

	function IS(t) {
		return t.__textSvgEl
	}

	function CS(t) {
		return t.__svgEl
	}
	gS.prototype.createElement = Hb, gS.prototype.getDefs = function(t) {
		var e = this._svgRoot,
			n = this._svgRoot.getElementsByTagName("defs");
		return 0 === n.length ? t ? ((n = e.insertBefore(this.createElement("defs"), e.firstChild)).contains || (n.contains =
			function(t) {
				var e = n.children;
				if (!e) return !1;
				for (var i = e.length - 1; 0 <= i; --i)
					if (e[i] === t) return !0;
				return !1
			}), n) : null : n[0]
	}, gS.prototype.update = function(t, e) {
		if (t) {
			var i = this.getDefs(!1);
			if (t[this._domName] && i.contains(t[this._domName])) "function" == typeof e && e(t);
			else {
				var n = this.add(t);
				n && (t[this._domName] = n)
			}
		}
	}, gS.prototype.addDom = function(t) {
		this.getDefs(!0).appendChild(t)
	}, gS.prototype.removeDom = function(t) {
		var e = this.getDefs(!1);
		e && t[this._domName] && (e.removeChild(t[this._domName]), t[this._domName] = null)
	}, gS.prototype.getDoms = function() {
		var i = this.getDefs(!1);
		if (!i) return [];
		var n = [];
		return D(this._tagNames, function(t) {
			var e = i.getElementsByTagName(t);
			n = n.concat([].slice.call(e))
		}), n
	}, gS.prototype.markAllUnused = function() {
		var t = this.getDoms(),
			e = this;
		D(t, function(t) {
			t[e._markLabel] = "0"
		})
	}, gS.prototype.markUsed = function(t) {
		t && (t[this._markLabel] = "1")
	}, gS.prototype.removeUnused = function() {
		var e = this.getDefs(!1);
		if (e) {
			var t = this.getDoms(),
				i = this;
			D(t, function(t) {
				"1" !== t[i._markLabel] && e.removeChild(t)
			})
		}
	}, gS.prototype.getSvgProxy = function(t) {
		return t instanceof io ? nS : t instanceof Hn ? rS : t instanceof wo ? aS : nS
	}, gS.prototype.getTextSvgElement = function(t) {
		return t.__textSvgEl
	}, gS.prototype.getSvgElement = function(t) {
		return t.__svgEl
	}, w(vS, gS), vS.prototype.addWithoutUpdate = function(a, o) {
		if (o && o.style) {
			var s = this;
			D(["fill", "stroke"], function(t) {
				if (o.style[t] && ("linear" === o.style[t].type || "radial" === o.style[t].type)) {
					var e, i = o.style[t],
						n = s.getDefs(!0);
					i._dom ? (e = i._dom, n.contains(i._dom) || s.addDom(e)) : e = s.add(i), s.markUsed(o);
					var r = e.getAttribute("id");
					a.setAttribute(t, "url(#" + r + ")")
				}
			})
		}
	}, vS.prototype.add = function(t) {
		var e;
		if ("linear" === t.type) e = this.createElement("linearGradient");
		else {
			if ("radial" !== t.type) return ai("Illegal gradient type."), null;
			e = this.createElement("radialGradient")
		}
		return t.id = t.id || this.nextId++, e.setAttribute("id", "zr" + this._zrId + "-gradient-" + t.id), this.updateDom(
			t, e), this.addDom(e), e
	}, vS.prototype.update = function(i) {
		var n = this;
		gS.prototype.update.call(this, i, function() {
			var t = i.type,
				e = i._dom.tagName;
			"linear" === t && "linearGradient" === e || "radial" === t && "radialGradient" === e ? n.updateDom(i, i._dom) :
				(n.removeDom(i), n.add(i))
		})
	}, vS.prototype.updateDom = function(t, e) {
		if ("linear" === t.type) e.setAttribute("x1", t.x), e.setAttribute("y1", t.y), e.setAttribute("x2", t.x2), e.setAttribute(
			"y2", t.y2);
		else {
			if ("radial" !== t.type) return void ai("Illegal gradient type.");
			e.setAttribute("cx", t.x), e.setAttribute("cy", t.y), e.setAttribute("r", t.r)
		}
		t.global ? e.setAttribute("gradientUnits", "userSpaceOnUse") : e.setAttribute("gradientUnits", "objectBoundingBox"),
			e.innerHTML = "";
		for (var i = t.colorStops, n = 0, r = i.length; n < r; ++n) {
			var a = this.createElement("stop");
			a.setAttribute("offset", 100 * i[n].offset + "%");
			var o = i[n].color;
			if (o.indexOf(!1)) {
				var s = ke(o)[3],
					l = Oe(o);
				a.setAttribute("stop-color", "#" + l), a.setAttribute("stop-opacity", s)
			} else a.setAttribute("stop-color", i[n].color);
			e.appendChild(a)
		}
		t._dom = e
	}, vS.prototype.markUsed = function(t) {
		if (t.style) {
			var e = t.style.fill;
			e && e._dom && gS.prototype.markUsed.call(this, e._dom), (e = t.style.stroke) && e._dom && gS.prototype.markUsed.call(
				this, e._dom)
		}
	}, w(mS, gS), mS.prototype.update = function(t) {
		var e = this.getSvgElement(t);
		e && this.updateDom(e, t.__clipPaths, !1);
		var i = this.getTextSvgElement(t);
		i && this.updateDom(i, t.__clipPaths, !0), this.markUsed(t)
	}, mS.prototype.updateDom = function(t, e, i) {
		if (e && 0 < e.length) {
			var n, r, a = this.getDefs(!0),
				o = e[0],
				s = i ? "_textDom" : "_dom";
			o[s] ? (r = o[s].getAttribute("id"), n = o[s], a.contains(n) || a.appendChild(n)) : (r = "zr" + this._zrId +
				"-clip-" + this.nextId, ++this.nextId, (n = this.createElement("clipPath")).setAttribute("id", r), a.appendChild(
					n), o[s] = n);
			var l = this.getSvgProxy(o);
			if (o.transform && o.parent.invTransform && !i) {
				var h = Array.prototype.slice.call(o.transform);
				Qt(o.transform, o.parent.invTransform, o.transform), l.brush(o), o.transform = h
			} else l.brush(o);
			var u = this.getSvgElement(o);
			n.innerHTML = "", n.appendChild(u.cloneNode()), t.setAttribute("clip-path", "url(#" + r + ")"), 1 < e.length &&
				this.updateDom(n, e.slice(1), i)
		} else t && t.setAttribute("clip-path", "none")
	}, mS.prototype.markUsed = function(t) {
		var e = this;
		t.__clipPaths && D(t.__clipPaths, function(t) {
			t._dom && gS.prototype.markUsed.call(e, t._dom), t._textDom && gS.prototype.markUsed.call(e, t._textDom)
		})
	}, w(yS, gS), yS.prototype.addWithoutUpdate = function(t, e) {
		if (e && _S(e.style)) {
			var i;
			if (e._shadowDom) i = e._shadowDom, this.getDefs(!0).contains(e._shadowDom) || this.addDom(i);
			else i = this.add(e);
			this.markUsed(e);
			var n = i.getAttribute("id");
			t.style.filter = "url(#" + n + ")"
		}
	}, yS.prototype.add = function(t) {
		var e = this.createElement("filter");
		return t._shadowDomId = t._shadowDomId || this.nextId++, e.setAttribute("id", "zr" + this._zrId + "-shadow-" + t._shadowDomId),
			this.updateDom(t, e), this.addDom(e), e
	}, yS.prototype.update = function(t, e) {
		if (_S(e.style)) {
			var i = this;
			gS.prototype.update.call(this, e, function() {
				i.updateDom(e, e._shadowDom)
			})
		} else this.remove(t, e)
	}, yS.prototype.remove = function(t, e) {
		null != e._shadowDomId && (this.removeDom(t), t.style.filter = "")
	}, yS.prototype.updateDom = function(t, e) {
		var i = e.getElementsByTagName("feDropShadow");
		i = 0 === i.length ? this.createElement("feDropShadow") : i[0];
		var n, r, a, o, s = t.style,
			l = t.scale && t.scale[0] || 1,
			h = t.scale && t.scale[1] || 1;
		if (s.shadowBlur || s.shadowOffsetX || s.shadowOffsetY) n = s.shadowOffsetX || 0, r = s.shadowOffsetY || 0, a = s.shadowBlur,
			o = s.shadowColor;
		else {
			if (!s.textShadowBlur) return void this.removeDom(e, s);
			n = s.textShadowOffsetX || 0, r = s.textShadowOffsetY || 0, a = s.textShadowBlur, o = s.textShadowColor
		}
		i.setAttribute("dx", n / l), i.setAttribute("dy", r / h), i.setAttribute("flood-color", o);
		var u = a / 2 / l + " " + a / 2 / h;
		i.setAttribute("stdDeviation", u), e.setAttribute("x", "-100%"), e.setAttribute("y", "-100%"), e.setAttribute(
				"width", Math.ceil(a / 2 * 200) + "%"), e.setAttribute("height", Math.ceil(a / 2 * 200) + "%"), e.appendChild(i),
			t._shadowDom = e
	}, yS.prototype.markUsed = function(t) {
		t._shadowDom && gS.prototype.markUsed.call(this, t._shadowDom)
	};

	function AS(t, e, i, n) {
		this.root = t, this.storage = e, this._opts = i = k({}, i || {});
		var r = Hb("svg");
		r.setAttribute("xmlns", "http://www.w3.org/2000/svg"), r.setAttribute("version", "1.1"), r.setAttribute(
				"baseProfile", "full"), r.style.cssText = "user-select:none;position:absolute;left:0;top:0;", this.gradientManager =
			new vS(n, r), this.clipPathManager = new mS(n, r), this.shadowManager = new yS(n, r);
		var a = document.createElement("div");
		a.style.cssText = "overflow:hidden;position:relative", this._svgRoot = r, this._viewport = a, t.appendChild(a), a.appendChild(
			r), this.resize(i.width, i.height), this._visibleList = []
	}
	AS.prototype = {
			constructor: AS,
			getType: function() {
				return "svg"
			},
			getViewportRoot: function() {
				return this._viewport
			},
			getViewportRootOffset: function() {
				var t = this.getViewportRoot();
				if (t) return {
					offsetLeft: t.offsetLeft || 0,
					offsetTop: t.offsetTop || 0
				}
			},
			refresh: function() {
				var t = this.storage.getDisplayList(!0);
				this._paintList(t)
			},
			setBackgroundColor: function(t) {
				this._viewport.style.background = t
			},
			_paintList: function(t) {
				this.gradientManager.markAllUnused(), this.clipPathManager.markAllUnused(), this.shadowManager.markAllUnused();
				var e, i, n = this._svgRoot,
					r = this._visibleList,
					a = t.length,
					o = [];
				for (e = 0; e < a; e++) {
					var s = t[e],
						l = (i = s) instanceof io ? nS : i instanceof Hn ? rS : i instanceof wo ? aS : nS,
						h = CS(s) || IS(s);
					s.invisible || (s.__dirty && (l && l.brush(s), this.clipPathManager.update(s), s.style && (this.gradientManager.update(
							s.style.fill), this.gradientManager.update(s.style.stroke), this.shadowManager.update(h, s)), s.__dirty = !1),
						o.push(s))
				}
				var u, c = function(t, e, i) {
					return pS.diff(t, e, i)
				}(r, o);
				for (e = 0; e < c.length; e++) {
					if ((p = c[e]).removed)
						for (var d = 0; d < p.count; d++) {
							h = CS(s = r[p.indices[d]]);
							var f = IS(s);
							MS(n, h), MS(n, f)
						}
				}
				for (e = 0; e < c.length; e++) {
					var p;
					if ((p = c[e]).added)
						for (d = 0; d < p.count; d++) {
							h = CS(s = o[p.indices[d]]), f = IS(s);
							u ? bS(n, h, u) : SS(n, h), h ? bS(n, f, h) : u ? bS(n, f, u) : SS(n, f), bS(n, f, h), u = f || h || u, this.gradientManager
								.addWithoutUpdate(h || f, s), this.shadowManager.addWithoutUpdate(h || f, s), this.clipPathManager.markUsed(s)
						} else if (!p.removed)
							for (d = 0; d < p.count; d++) {
								u = IS(s = o[p.indices[d]]) || CS(s) || u;
								h = CS(s), f = IS(s);
								this.gradientManager.markUsed(s), this.gradientManager.addWithoutUpdate(h || f, s), this.shadowManager.markUsed(
									s), this.shadowManager.addWithoutUpdate(h || f, s), this.clipPathManager.markUsed(s)
							}
				}
				this.gradientManager.removeUnused(), this.clipPathManager.removeUnused(), this.shadowManager.removeUnused(), this
					._visibleList = o
			},
			_getDefs: function(t) {
				var n, e = this._svgRoot;
				return 0 !== (n = this._svgRoot.getElementsByTagName("defs")).length ? n[0] : t ? ((n = e.insertBefore(Hb("defs"),
					e.firstChild)).contains || (n.contains = function(t) {
					var e = n.children;
					if (!e) return !1;
					for (var i = e.length - 1; 0 <= i; --i)
						if (e[i] === t) return !0;
					return !1
				}), n) : null
			},
			resize: function(t, e) {
				var i = this._viewport;
				i.style.display = "none";
				var n = this._opts;
				if (null != t && (n.width = t), null != e && (n.height = e), t = this._getSize(0), e = this._getSize(1), i.style.display =
					"", this._width !== t || this._height !== e) {
					this._width = t, this._height = e;
					var r = i.style;
					r.width = t + "px", r.height = e + "px";
					var a = this._svgRoot;
					a.setAttribute("width", t), a.setAttribute("height", e)
				}
			},
			getWidth: function() {
				return this._width
			},
			getHeight: function() {
				return this._height
			},
			_getSize: function(t) {
				var e = this._opts,
					i = ["width", "height"][t],
					n = ["clientWidth", "clientHeight"][t],
					r = ["paddingLeft", "paddingTop"][t],
					a = ["paddingRight", "paddingBottom"][t];
				if (null != e[i] && "auto" !== e[i]) return parseFloat(e[i]);
				var o = this.root,
					s = document.defaultView.getComputedStyle(o);
				return (o[n] || xS(s[i]) || xS(o.style[i])) - (xS(s[r]) || 0) - (xS(s[a]) || 0) | 0
			},
			dispose: function() {
				this.root.innerHTML = "", this._svgRoot = this._viewport = this.storage = null
			},
			clear: function() {
				this._viewport && this.root.removeChild(this._viewport)
			},
			pathToDataUrl: function() {
				return this.refresh(), "data:image/svg+xml;charset=UTF-8," + this._svgRoot.outerHTML
			}
		}, D(["getLayer", "insertLayer", "eachLayer", "eachBuiltinLayer", "eachOtherLayer", "getLayers", "modLayer",
			"delLayer", "clearLayer", "toDataURL", "pathToImage"
		], function(t) {
			AS.prototype[t] = function(t) {
				return function() {
					ai('In SVG mode painter not support method "' + t + '"')
				}
			}(t)
		}), lr("svg", AS), t.version = "4.5.0", t.dependencies = {
			zrender: "4.1.2"
		}, t.PRIORITY = $c, t.init = function(t, e, i) {
			var n = Ed(t);
			if (n) return n;
			var r = new id(t, e, i);
			return r.id = "ec_" + kd++, Td[r.id] = r, Tr(t, Ld, r.id),
				function(n) {
					var r = "__connectUpdateStatus";

					function a(t, e) {
						for (var i = 0; i < t.length; i++) {
							t[i][r] = e
						}
					}
					Xc(wd, function(t, e) {
						n._messageCenter.on(e, function(t) {
							if (Dd[n.group] && 0 !== n[r]) {
								if (t && t.escapeConnect) return;
								var e = n.makeActionFromEvent(t),
									i = [];
								Xc(Td, function(t) {
									t !== n && t.group === n.group && i.push(t)
								}), a(i, 0), Xc(i, function(t) {
									1 !== t[r] && t.dispatchAction(e)
								}), a(i, 2)
							}
						})
					})
				}(r), r
		}, t.connect = function(e) {
			if (O(e)) {
				var t = e;
				e = null, Xc(t, function(t) {
					null != t.group && (e = t.group)
				}), e = e || "g_" + Pd++, Xc(t, function(t) {
					t.group = e
				})
			}
			return Dd[e] = !0, e
		}, t.disConnect = Od, t.disconnect = zd, t.dispose = function(t) {
			"string" == typeof t ? t = Td[t] : t instanceof id || (t = Ed(t)), t instanceof id && !t.isDisposed() && t.dispose()
		}, t.getInstanceByDom = Ed, t.getInstanceById = function(t) {
			return Td[t]
		}, t.registerTheme = Nd, t.registerPreprocessor = Rd, t.registerProcessor = Bd, t.registerPostUpdate = function(t) {
			Md.push(t)
		}, t.registerAction = Vd, t.registerCoordinateSystem = function(t, e) {
			Dh.register(t, e)
		}, t.getCoordinateSystemDimensions = function(t) {
			var e = Dh.get(t);
			if (e) return e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice()
		}, t.registerLayout = Fd, t.registerVisual = Hd, t.registerLoading = Wd, t.extendComponentModel = Zd, t.extendComponentView =
		Ud, t.extendSeriesModel = Xd, t.extendChartView = Yd, t.setCanvasCreator = function(t) {
			f("createCanvas", t)
		}, t.registerMap = function(t, e, i) {
			Gc(t, e, i)
		}, t.getMap = function(t) {
			var e = Wc(t);
			return e && e[0] && {
				geoJson: e[0].geoJSON,
				specialAreas: e[0].specialAreas
			}
		}, t.dataTool = {}, t.zrender = ur, t.number = Sl, t.format = Bl, t.throttle = Ku, t.helper = Ep, t.matrix = ne, t.vector =
		wt, t.color = Fe, t.parseGeoJSON = Hp, t.parseGeoJson = tg, t.util = eg, t.graphic = ig, t.List = uf, t.Model = il,
		t.Axis = Kp, t.env = m
});
