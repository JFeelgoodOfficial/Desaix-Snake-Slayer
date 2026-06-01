/**
 * Mobile virtual controls — left MOVE joystick only.
 * Sword auto-kills enemies on proximity; no fire button needed.
 * Desktop: untouched.
 */
(function () {
    'use strict';

    function init() {

    var isMobile = ('ontouchstart' in window) ||
                   (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);

    if (!isMobile) return;

    /* ── constants ─────────────────────────────────────────────────── */
    var JOY_SIZE   = 130;
    var KNOB_SIZE  = 52;
    var MOVE_REACH = 280;

    /* ── joystick state ─────────────────────────────────────────────── */
    var left = { on:false, id:-1, bx:0, by:0, dx:0, dy:0 };

    /* ── build DOM ──────────────────────────────────────────────────── */
    var wrap = document.createElement('div');
    wrap.id  = 'vc-wrap';
    wrap.style.cssText =
        'position:fixed;top:0;left:0;width:100%;height:100%;' +
        'pointer-events:none;z-index:9998;user-select:none;';
    document.body.appendChild(wrap);

    function makeRing(id, label) {
        var el = document.createElement('div');
        el.id  = id;
        el.style.cssText =
            'position:absolute;width:' + JOY_SIZE + 'px;height:' + JOY_SIZE + 'px;' +
            'border-radius:50%;' +
            'border:4px solid rgba(255,255,255,0.55);' +
            'background:rgba(255,255,255,0.08);' +
            'box-sizing:border-box;pointer-events:none;';
        var lbl = document.createElement('span');
        lbl.textContent = label;
        lbl.style.cssText =
            'position:absolute;bottom:-22px;left:0;right:0;' +
            'text-align:center;color:rgba(255,255,255,0.65);' +
            'font:bold 12px sans-serif;letter-spacing:1px;';
        el.appendChild(lbl);
        wrap.appendChild(el);
        return el;
    }

    function makeKnob(id) {
        var el = document.createElement('div');
        el.id  = id;
        el.style.cssText =
            'position:absolute;width:' + KNOB_SIZE + 'px;height:' + KNOB_SIZE + 'px;' +
            'border-radius:50%;' +
            'background:rgba(255,210,60,0.88);' +
            'border:2px solid rgba(0,0,0,0.25);' +
            'box-shadow:0 2px 8px rgba(0,0,0,0.4);' +
            'pointer-events:none;';
        wrap.appendChild(el);
        return el;
    }

    var lRing = makeRing('vc-lring', 'MOVE');
    var lKnob = makeKnob('vc-lknob');

    /* ── position helpers ───────────────────────────────────────────── */
    var LBX, LBY;

    function placeEl(el, cx, cy, size) {
        el.style.left = (cx - size / 2) + 'px';
        el.style.top  = (cy - size / 2) + 'px';
    }

    function layout() {
        var w = window.innerWidth, h = window.innerHeight;
        LBX = w * 0.16; LBY = h * 0.80;
        placeEl(lRing, LBX, LBY, JOY_SIZE);
        if (!left.on) placeEl(lKnob, LBX, LBY, KNOB_SIZE);
    }
    layout();
    window.addEventListener('resize', layout);

    /* ── knob clamping ──────────────────────────────────────────────── */
    var JOY_R = JOY_SIZE / 2;

    function clampKnob(j, tx, ty) {
        var dx  = tx - j.bx;
        var dy  = ty - j.by;
        var len = Math.sqrt(dx * dx + dy * dy);
        if (len > JOY_R) { dx = dx / len * JOY_R; dy = dy / len * JOY_R; len = JOY_R; }
        j.dx = len > 0 ? dx / JOY_R : 0;
        j.dy = len > 0 ? dy / JOY_R : 0;
        return { kx: j.bx + dx, ky: j.by + dy };
    }

    /* ── game-loop hook ─────────────────────────────────────────────── */
    function gameUpdate() {
        if (typeof gdjs !== 'undefined' && gdjs._game) {
            var scene = null;
            try { scene = gdjs._game.getSceneStack().getCurrentScene(); } catch(e) {}

            if (scene && left.on) {
                try {
                    var players = scene.getObjects('Player');
                    if (players && players.length > 0) {
                        var p = players[0];
                        gdjs._ptcX = p.getX() + left.dx * MOVE_REACH;
                        gdjs._ptcY = p.getY() + left.dy * MOVE_REACH;
                    }
                } catch(e) {}
            }
        }
        requestAnimationFrame(gameUpdate);
    }
    gameUpdate();

    /* ── touch events ───────────────────────────────────────────────── */
    function onTouchStart(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) {
            var t = e.changedTouches[i];
            var x = t.clientX, y = t.clientY;
            if (!left.on) {
                left.on = true; left.id = t.identifier;
                left.bx = LBX; left.by = LBY;
                left.dx = 0; left.dy = 0;
                placeEl(lKnob, LBX, LBY, KNOB_SIZE);
            }
        }
    }

    function onTouchMove(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) {
            var t = e.changedTouches[i];
            if (t.identifier === left.id) {
                var lk = clampKnob(left, t.clientX, t.clientY);
                placeEl(lKnob, lk.kx, lk.ky, KNOB_SIZE);
            }
        }
    }

    function onTouchEnd(e) {
        for (var i = 0; i < e.changedTouches.length; i++) {
            var t = e.changedTouches[i];
            if (t.identifier === left.id) {
                left.on = false; left.id = -1; left.dx = 0; left.dy = 0;
                placeEl(lRing, LBX, LBY, JOY_SIZE);
                placeEl(lKnob, LBX, LBY, KNOB_SIZE);
                if (typeof gdjs !== 'undefined') { gdjs._ptcX = undefined; gdjs._ptcY = undefined; }
            }
        }
    }

    document.addEventListener('touchstart',  onTouchStart, { passive:false, capture:true });
    document.addEventListener('touchmove',   onTouchMove,  { passive:false, capture:true });
    document.addEventListener('touchend',    onTouchEnd,   { passive:false, capture:true });
    document.addEventListener('touchcancel', onTouchEnd,   { passive:false, capture:true });

    } // end init

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
