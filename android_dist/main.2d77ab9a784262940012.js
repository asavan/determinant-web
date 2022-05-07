(() => {
    "use strict";
    var e, t, n = {
        21: (e, t, n) => {
            function r(e) {
                e && e.remove()
            }

            n.d(t, {ew: () => r, Bk: () => o});
            !function () {
                const e = document.createElement("canvas"), t = document.getElementById("favicon");
                e.height = e.width = 16;
                const n = e.getContext("2d");
                n.fillStyle = "#000"
            }();

            function i(e) {
                switch (e.toLowerCase().trim()) {
                    case"true":
                    case"yes":
                    case"1":
                        return !0;
                    case"false":
                    case"no":
                    case"0":
                    case null:
                        return !1;
                    default:
                        return Boolean(e)
                }
            }

            function o(e, t, n) {
                const r = e.location.search, o = new URLSearchParams(r);
                for (const [e, t] of o) "number" == typeof n[e] ? n[e] = parseInt(t, 10) : "boolean" == typeof n[e] ? n[e] = i(t) : n[e] = t
            }
        }
    }, r = {};

    function i(e) {
        var t = r[e];
        if (void 0 !== t) return t.exports;
        var o = r[e] = {exports: {}};
        return n[e](o, o.exports, i), o.exports
    }

    i.m = n, i.d = (e, t) => {
        for (var n in t) i.o(t, n) && !i.o(e, n) && Object.defineProperty(e, n, {enumerable: !0, get: t[n]})
    }, i.f = {}, i.e = e => Promise.all(Object.keys(i.f).reduce(((t, n) => (i.f[n](e, t), t)), [])), i.u = e => e + "." + {
        154: "c7551f111805794e1224",
        547: "fe90aa3ab5c33d1eefca"
    }[e] + ".js", i.miniCssF = e => {
    }, i.g = function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), e = {}, t = "determinant-web:", i.l = (n, r, o, s) => {
        if (e[n]) e[n].push(r); else {
            var a, l;
            if (void 0 !== o) for (var c = document.getElementsByTagName("script"), u = 0; u < c.length; u++) {
                var d = c[u];
                if (d.getAttribute("src") == n || d.getAttribute("data-webpack") == t + o) {
                    a = d;
                    break
                }
            }
            a || (l = !0, (a = document.createElement("script")).charset = "utf-8", a.timeout = 120, i.nc && a.setAttribute("nonce", i.nc), a.setAttribute("data-webpack", t + o), a.src = n), e[n] = [r];
            var f = (t, r) => {
                a.onerror = a.onload = null, clearTimeout(m);
                var i = e[n];
                if (delete e[n], a.parentNode && a.parentNode.removeChild(a), i && i.forEach((e => e(r))), t) return t(r)
            }, m = setTimeout(f.bind(null, void 0, {type: "timeout", target: a}), 12e4);
            a.onerror = f.bind(null, a.onerror), a.onload = f.bind(null, a.onload), l && document.head.appendChild(a)
        }
    }, i.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, (() => {
        var e;
        i.g.importScripts && (e = i.g.location + "");
        var t = i.g.document;
        if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
            var n = t.getElementsByTagName("script");
            n.length && (e = n[n.length - 1].src)
        }
        if (!e) throw new Error("Automatic publicPath is not supported in this browser");
        e = e.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), i.p = e
    })(), (() => {
        var e = {179: 0};
        i.f.j = (t, n) => {
            var r = i.o(e, t) ? e[t] : void 0;
            if (0 !== r) if (r) n.push(r[2]); else {
                var o = new Promise(((n, i) => r = e[t] = [n, i]));
                n.push(r[2] = o);
                var s = i.p + i.u(t), a = new Error;
                i.l(s, (n => {
                    if (i.o(e, t) && (0 !== (r = e[t]) && (e[t] = void 0), r)) {
                        var o = n && ("load" === n.type ? "missing" : n.type), s = n && n.target && n.target.src;
                        a.message = "Loading chunk " + t + " failed.\n(" + o + ": " + s + ")", a.name = "ChunkLoadError", a.type = o, a.request = s, r[1](a)
                    }
                }), "chunk-" + t, t)
            }
        };
        var t = (t, n) => {
            var r, o, [s, a, l] = n, c = 0;
            if (s.some((t => 0 !== e[t]))) {
                for (r in a) i.o(a, r) && (i.m[r] = a[r]);
                if (l) l(i)
            }
            for (t && t(n); c < s.length; c++) o = s[c], i.o(e, o) && e[o] && e[o][0](), e[o] = 0
        }, n = self.webpackChunkdeterminant_web = self.webpackChunkdeterminant_web || [];
        n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n))
    })(), (() => {
        const e = {
            modes: ["net", "fake", "ai", "hotseat", "netOrAi", "server", "cheating"],
            currentMode: "ai",
            debug: !0,
            wsPort: 8088,
            negotiatedId: 3,
            startRed: !1,
            color: "blue",
            size: 3
        };

        function t(e, t) {
            let n = t.startRed, r = -1, i = -1, o = -1, s = -1, a = -1, l = -1, c = 0, u = 0;
            const d = Array(e.getSizeSqr()).fill(0), f = Array(e.getSizeSqr()).fill(!1),
                m = Array(e.getSizeSqr()).fill(!1), g = Array(e.getSizeSqr()).fill(!1);
            const v = () => {
                if (c) return c;
                const t = [];
                e.copy_matrix(d, t), e.fill_matrix(t);
                const n = e.determinant(t);
                return c = n, n
            }, p = function (t, c) {
                const v = function (t, n, c) {
                    return !(t < 0 || n < 0 || 0 !== d[t] || (d[t] = n + 1, c ? (m[t] = !0, o = t) : (f[t] = !0, s = t), u = e.fill_digits(d, g), r = -1, i = -1, l = -1, a = -1, 0))
                }(t, c, n);
                return v && (n = !n), v
            }, h = () => i, b = () => r;
            return {
                matrix_result: d,
                player_moves: f,
                comp_moves: m,
                getLastCompMove: () => o,
                getLastUserMove: () => s,
                isLastMove: e => o === e || s === e,
                getResult: v,
                getActiveDigitIndex: h,
                setActiveDigitIndex: function (e) {
                    n && "hotseat" !== t.currentMode || (i = e >= 0 && g[e] ? -1 : e)
                },
                getActivePosition: b,
                setActivePosition: function (e) {
                    n && "hotseat" !== t.currentMode || (r = e >= 0 && d[e] > 0 ? -1 : e)
                },
                onAiMove: function (e) {
                    return c = e.result, p(e.bestPos, e.bestK)
                },
                onAiHint: function (e) {
                    c = e.result, l = e.bestPos, a = e.bestK
                },
                getDigits: () => g,
                getStep: () => u,
                isWin: e => v() > 0 !== e,
                lessThanTwoMoves: () => u + 2 > d.length,
                tryMove: function () {
                    return p(b(), h())
                },
                isCurrentRed: () => n,
                isBestDigit: e => a === e,
                isBestPosition: e => l === e
            }
        }

        function n() {
        }

        const r = function (e, t) {
            return e.preventDefault(), e.target.classList.contains("cell") || e.target.classList.contains("digit") ? function (e, t) {
                const n = e.target || e.srcElement;
                for (let e = 0; e < t.children.length; e++) if (t.children[e] === n) return e;
                return -1
            }(e, t) : -1
        };

        function o(e, i, o) {
            const s = i.getElementsByClassName("box")[0], a = i.getElementsByClassName("digits")[0],
                l = i.getElementsByClassName("overlay")[0], c = i.getElementsByClassName("close")[0],
                u = i.getElementsByClassName("install")[0];
            if (3 !== o.size) {
                i.documentElement.style.setProperty("--field-size", o.size)
            }
            const d = o.startRed, f = function (e) {
                const t = e * e;

                function n(e, n) {
                    let r = 0;
                    for (let i = 0; i < t; ++i) {
                        const t = e[i];
                        t > 0 && (++r, n[t - 1] = !0)
                    }
                    return r
                }

                return {
                    fill_digits: n, fill_matrix: function (e) {
                        const t = [];
                        let r = n(e, t);
                        for (let n = 0, i = 0; n < e.length && i < t.length; ++n, ++i) {
                            for (; 0 !== e[n];) if (++n, n >= e.length) return r;
                            for (; t[i];) if (++i, i >= t.length) return r;
                            n < e.length && (e[n] = i + 1, t[i] = !0, ++r)
                        }
                        return r
                    }, matrix_to_int: function (e) {
                        let n = 0;
                        for (let r = 0; r < t; ++r) n *= 10, n += e[r];
                        return n
                    }, copy_matrix: (e, t) => {
                        for (let n = 0; n < e.length; ++n) t[n] = e[n]
                    }, int_to_result: function (e) {
                        const t = e < 0 ? -1 : 1, n = (e *= t) % 10;
                        e -= n;
                        const r = (e /= 10) % 10;
                        return e -= r, {result: t * (e /= 10), bestK: r, bestPos: n}
                    }, determinant: function (n) {
                        return 3 === e ? (e => e[0] * e[4] * e[8] + e[6] * e[1] * e[5] + e[3] * e[7] * e[2] - e[2] * e[4] * e[6] - e[1] * e[3] * e[8] - e[0] * e[5] * e[7])(n) : 2 === e ? (e => e[0] * e[3] - e[1] * e[2])(n) : t
                    }, getSize: () => e, getSizeSqr: () => t
                }
            }(o.size), m = t(f, o), g = {playerMove: n, enemyMove: n, meMove: n, aiMove: n, aiHint: n, gameover: n};

            function v(e, t) {
                h(), e && (m.lessThanTwoMoves() && function () {
                    const e = m.isWin(d) ? "You win" : "You lose";
                    l.querySelector("h2").textContent = e, l.querySelector(".content").textContent = "Determinant =  " + m.getResult(), l.classList.add("show"), u.classList.remove("hidden2"), g.gameover(m.isWin(d))
                }(), t ? (m.getLastUserMove() >= 0 && g.playerMove({
                    bestPos: m.getLastUserMove(),
                    bestK: m.matrix_result[m.getLastUserMove()] - 1,
                    result: 0
                }), g.aiMove(m.matrix_result)) : (m.getLastCompMove() >= 0 && g.enemyMove({
                    bestPos: m.getLastCompMove(),
                    bestK: m.matrix_result[m.getLastCompMove()] - 1,
                    result: 0
                }), g.meMove(m.matrix_result)))
            }

            function p() {
                v(m.tryMove(), m.isCurrentRed())
            }

            function h() {
                !function (e, t, n) {
                    for (let n = 0; n < e.matrix_result.length; n++) {
                        const r = t.childNodes[n], i = e.matrix_result[n];
                        r.textContent = i.toString(), r.className = i ? "cell disabled" : "cell hole", e.getActivePosition() === n && (r.classList.add("active"), e.isCurrentRed() ? r.classList.add("comp") : r.classList.add("player")), e.comp_moves[n] && r.classList.add("comp"), e.player_moves[n] && r.classList.add("player"), e.isLastMove(n) && r.classList.add("last"), e.isBestPosition(n) && r.classList.add("best")
                    }
                    const r = e.getDigits();
                    for (let t = 0; t < e.matrix_result.length; t++) {
                        const i = n.childNodes[t], o = r[t], s = t + 1;
                        i.textContent = s.toString(), i.className = "digit", o && i.classList.add("disabled"), e.getActiveDigitIndex() === t && (i.classList.add("active"), e.isCurrentRed() ? i.classList.add("comp") : i.classList.add("player")), t === e.matrix_result[e.getLastCompMove()] - 1 && i.classList.add("comp"), t === e.matrix_result[e.getLastUserMove()] - 1 && i.classList.add("player"), e.isBestDigit(t) && i.classList.add("best")
                    }
                }(m, s, a)
            }

            function b(e, t, n) {
                for (let r = 0; r < e; r++) {
                    const e = i.createElement("div");
                    e.className = t, n.appendChild(e)
                }
            }

            return b(m.matrix_result.length, "cell", s), b(m.matrix_result.length, "digit", a), s.addEventListener("click", (function (e) {
                m.setActivePosition(r(e, s)), p()
            }), !1), a.addEventListener("click", (function (e) {
                m.setActiveDigitIndex(r(e, a)), p()
            }), !1), c.addEventListener("click", (function (e) {
                e.preventDefault(), l.classList.remove("show")
            }), !1), v(!0, m.isCurrentRed()), {
                guess: function () {
                    g.aiHint(m.matrix_result)
                }, allCallbacksInited: function () {
                    d ? g.aiMove(m.matrix_result) : g.meMove(m.matrix_result)
                }, on: function (e, t) {
                    g[e] = t
                }, wrap: function (e, t) {
                    const n = g[e];
                    g[e] = e => {
                        n(e), t(e)
                    }
                }, aiMove: function (e) {
                    v(m.onAiMove(e), m.isCurrentRed())
                }, aiHint: function (e) {
                    m.onAiHint(e), h()
                }, getSolver: function () {
                    return f
                }
            }
        }

        var s = i(21);
        !function (e, t, n) {
            "loading" !== n.readyState ? e(t, n) : n.addEventListener("DOMContentLoaded", (function (r) {
                e(t, n)
            }))
        }((function (t, n) {
            if ((0, s.Bk)(t, n, e), e.startRed = "red" === e.color, "net" === e.currentMode) i.e(547).then(i.bind(i, 547)).then((r => {
                r.default(t, n, e, o)
            })); else if ("cheating" === e.currentMode) Promise.all([i.e(547).then(i.bind(i, 547)), i.e(154).then(i.bind(i, 154))]).then((([r, i]) => {
                r.default(t, n, e, o).then((e => {
                    const t = i.default(e.getSolver());
                    e.on("meMove", (n => t.makeMove(n, e.aiHint))), e.allCallbacksInited()
                }))
            })); else {
                const r = o(0, n, e);
                "ai" === e.currentMode ? i.e(154).then(i.bind(i, 154)).then((e => {
                    const t = e.default(r.getSolver());
                    r.on("aiMove", (e => t.makeMove(e, r.aiMove))), r.on("aiHint", (e => t.makeMove(e, r.aiHint))), r.allCallbacksInited()
                })) : e.currentMode, t.gameObj = r
            }
        }), window, document)
    })()
})();