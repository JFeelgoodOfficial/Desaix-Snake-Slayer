/**
 * Mobile virtual controls — DOM-based dual-stick + FIRE button.
 * Left  side : MOVE joystick
 * Right side : AIM joystick + FIRE button
 * Desktop    : untouched (auto-fire stays on)
 */
(function () {
    'use strict';

    var isMobile = ('ontouchstart' in window) ||
                   (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);

    /* On mobile disable auto-fire; FIRE button re-enables it while held. */
    if (typeof gdjs !== 'undefined') gdjs._fireActive = !isMobile;

    if (!isMobile) return;

    /* ── constants ─────────────────────────────────────────────────── */
    var JOY_SIZE    = 130;   // outer ring diameter px
    var KNOB_SIZE   = 52;    // knob diameter px
    var BTN_SIZE    = 90;    // fire button diameter px
    var MOVE_REACH  = 280;   // world units ahead of player per joystick unit
    var HALF        = 0.48;  // left/right split fraction

    /* ── joystick state ─────────────────────────────────────────────── */
    var left  = { on:false, id:-1, bx:0, by:0, dx:0, dy:0 };
    var right = { on:false, id:-1, bx:0, by:0, kx:0, ky:0 };
    var fire  = { on:false, id:-1 };

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

    function makeFireBtn() {
        var el = document.createElement('div');
        el.id  = 'vc-fire';
        el.style.cssText =
            'position:absolute;width:' + BTN_SIZE + 'px;height:' + BTN_SIZE + 'px;' +
            'border-radius:50%;' +
            'background:rgba(220,55,40,0.80);' +
            'border:4px solid rgba(255,255,255,0.65);' +
            'box-shadow:0 0 18px rgba(255,80,50,0.55);' +
            'display:flex;align-items:center;justify-content:center;' +
            'flex-direction:column;pointer-events:none;box-sizing:border-box;';
        el.innerHTML =
            '<span style="font-size:22px;line-height:1;">🔫</span>' +
            '<span style="color:#fff;font:bold 11px sans-serif;letter-spacing:1px;margin-top:2px;">FIRE</span>';
        wrap.appendChild(el);
        return el;
    }

    var lRing  = makeRing('vc-lring', 'MOVE');
    var lKnob  = makeKnob('vc-lknob');
    var rRing  = makeRing('vc-rring', 'AIM');
    var rKnob  = makeKnob('vc-rknob');
    var fireBtn = makeFireBtn();

    /* ── position helpers ───────────────────────────────────────────── */
    var LBX, LBY, RBX, RBY, FBX, FBY;

    function placeEl(el, cx, cy, size) {
        el.style.left = (cx - size / 2) + 'px';
        el.style.top  = (cy - size / 2) + 'px';
    }

    function layout() {
        var w = window.innerWidth, h = window.innerHeight;
        LBX = w * 0.16; LBY = h * 0.80;
        RBX = w * 0.68; RBY = h * 0.80;
        FBX = w * 0.88; FBY = h * 0.80;
        placeEl(lRing, LBX, LBY, JOY_SIZE);
        placeEl(rRing, RBX, RBY, JOY_SIZE);
        placeEl(fireBtn, FBX, FBY, BTN_SIZE);
        if (!left.on)  placeEl(lKnob, LBX, LBY, KNOB_SIZE);
        if (!right.on) placeEl(rKnob, RBX, RBY, KNOB_SIZE);
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

    function dist(ax, ay, bx, by) {
        var dx = ax-bx, dy = ay-by; return Math.sqrt(dx*dx+dy*dy);
    }

    function isFireZone(x, y) { return dist(x, y, FBX, FBY) <= BTN_SIZE / 2 + 16; }
    function isLeftSide(x)    { return x < window.innerWidth * HALF; }

    /* ── fire button visual ─────────────────────────────────────────── */
    function setFireVisual(on) {
        fireBtn.style.background = on
            ? 'rgba(255,80,50,0.95)'
            : 'rgba(220,55,40,0.80)';
        fireBtn.style.transform = on ? 'scale(0.93)' : 'scale(1)';
    }

    /* ── game-loop hook ─────────────────────────────────────────────── */
    var _gc = null;

    function gameUpdate() {
        if (typeof gdjs !== 'undefined' && gdjs._game) {
            var scene = null;
            try { scene = gdjs._game.getSceneStack().getCurrentScene(); } catch(e) {}

            if (scene) {
                /* movement */
                if (left.on) {
                    try {
                        var players = scene.getObjects('Player');
                        if (players && players.length > 0) {
                            var p = players[0];
                            gdjs._ptcX = p.getX() + left.dx * MOVE_REACH;
                            gdjs._ptcY = p.getY() + left.dy * MOVE_REACH;
                        }
                    } catch(e) {}
                }

                /* aim cursor */
                if (right.on) {
                    if (!_gc) _gc = document.querySelector('#canvasArea canvas') || document.querySelector('canvas');
                    if (_gc) {
                        try {
                            var r  = _gc.getBoundingClientRect();
                            var gw = gdjs._game.getGameResolutionWidth();
                            var gh = gdjs._game.getGameResolutionHeight();
                            var cx = (right.kx - r.left) / r.width  * gw;
                            var cy = (right.ky - r.top)  / r.height * gh;
                            gdjs._game.getInputManager()._setCursorPosition(cx, cy);
                        } catch(e) {}
                    }
                }
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

            if (isFireZone(x, y) && !fire.on) {
                fire.on = true; fire.id = t.identifier;
                gdjs._fireActive = true;
                setFireVisual(true);
            } else if (isLeftSide(x) && !left.on) {
                left.on = true; left.id = t.identifier;
                left.bx = x; left.by = y;
                left.dx = 0; left.dy = 0;
                placeEl(lRing, x, y, JOY_SIZE);
                placeEl(lKnob, x, y, KNOB_SIZE);
            } else if (!isLeftSide(x) && !right.on && !isFireZone(x, y)) {
                right.on = true; right.id = t.identifier;
                right.bx = x; right.by = y;
                right.kx = x; right.ky = y;
                placeEl(rRing, x, y, JOY_SIZE);
                placeEl(rKnob, x, y, KNOB_SIZE);
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
            if (t.identifier === right.id) {
                right.kx = t.clientX; right.ky = t.clientY;
                placeEl(rKnob, t.clientX, t.clientY, KNOB_SIZE);
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
            if (t.identifier === right.id) {
                right.on = false; right.id = -1;
                placeEl(rRing, RBX, RBY, JOY_SIZE);
                placeEl(rKnob, RBX, RBY, KNOB_SIZE);
            }
            if (t.identifier === fire.id) {
                fire.on = false; fire.id = -1;
                gdjs._fireActive = false;
                setFireVisual(false);
            }
        }
    }

    document.addEventListener('touchstart',  onTouchStart, { passive:false, capture:true });
    document.addEventListener('touchmove',   onTouchMove,  { passive:false, capture:true });
    document.addEventListener('touchend',    onTouchEnd,   { passive:false, capture:true });
    document.addEventListener('touchcancel', onTouchEnd,   { passive:false, capture:true });

})();
