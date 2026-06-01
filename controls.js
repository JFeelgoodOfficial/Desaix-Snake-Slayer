/**
 * Mobile virtual controls for DESAIX Snake Slayer.
 * Left half of screen  → movement joystick  (steers player)
 * Right half of screen → aim joystick       (rotates gun)
 * Desktop mouse stays untouched.
 */
(function () {
    'use strict';

    var isMobile = ('ontouchstart' in window) ||
                   (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);

    if (!isMobile) return;

    /* ── constants ────────────────────────────────────────────────── */
    var JOY_RADIUS      = 55;   // outer ring radius (px)
    var KNOB_RADIUS     = 22;   // inner knob radius (px)
    var MOVE_REACH      = 260;  // world-unit lookahead for movement destination
    var HALF_SPLIT      = 0.5;  // left/right screen split fraction

    /* ── joystick state ───────────────────────────────────────────── */
    var left  = { on: false, id: -1, bx: 0, by: 0, kx: 0, ky: 0, dx: 0, dy: 0 };
    var right = { on: false, id: -1, bx: 0, by: 0, kx: 0, ky: 0 };

    /* ── overlay canvas ───────────────────────────────────────────── */
    var oc = document.createElement('canvas');
    oc.id    = 'joy-overlay';
    oc.style.cssText =
        'position:fixed;top:0;left:0;width:100%;height:100%;' +
        'pointer-events:none;z-index:9999;touch-action:none;';
    document.body.appendChild(oc);

    function resize() {
        oc.width  = window.innerWidth;
        oc.height = window.innerHeight;
        // Reset default resting positions
        left.bx  = window.innerWidth  * 0.15;
        left.by  = window.innerHeight * 0.78;
        right.bx = window.innerWidth  * 0.85;
        right.by = window.innerHeight * 0.78;
        if (!left.on)  { left.kx  = left.bx;  left.ky  = left.by;  }
        if (!right.on) { right.kx = right.bx; right.ky = right.by; }
    }
    resize();
    window.addEventListener('resize', resize);

    /* ── render loop ──────────────────────────────────────────────── */
    function drawStick(ctx, j, resting_bx, resting_by) {
        var bx = j.on ? j.bx : resting_bx;
        var by = j.on ? j.by : resting_by;
        var kx = j.on ? j.kx : resting_bx;
        var ky = j.on ? j.ky : resting_by;

        /* outer ring */
        ctx.beginPath();
        ctx.arc(bx, by, JOY_RADIUS, 0, Math.PI * 2);
        ctx.strokeStyle = j.on ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)';
        ctx.lineWidth   = 3;
        ctx.stroke();
        ctx.fillStyle   = j.on ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)';
        ctx.fill();

        /* knob */
        ctx.beginPath();
        ctx.arc(kx, ky, KNOB_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = j.on ? 'rgba(255,210,80,0.85)' : 'rgba(255,255,255,0.35)';
        ctx.fill();
    }

    function render() {
        var ctx = oc.getContext('2d');
        ctx.clearRect(0, 0, oc.width, oc.height);
        drawStick(ctx, left,  left.bx,  left.by);
        drawStick(ctx, right, right.bx, right.by);
        requestAnimationFrame(render);
    }
    render();

    /* ── game-loop hook: inject inputs into GDevelop every frame ──── */
    function gameUpdate() {
        if (typeof gdjs === 'undefined' || !gdjs._game) {
            requestAnimationFrame(gameUpdate);
            return;
        }

        var scene = null;
        try { scene = gdjs._game.getSceneStack().getCurrentScene(); } catch (e) {}

        if (scene) {
            /* movement: shift player destination in joystick direction */
            if (left.on) {
                try {
                    var players = scene.getObjects('Player');
                    if (players && players.length > 0) {
                        var p = players[0];
                        gdjs._ptcX = p.getX() + left.dx * MOVE_REACH;
                        gdjs._ptcY = p.getY() + left.dy * MOVE_REACH;
                    }
                } catch (e) {}
            }

            /* aim: feed right-joystick screen position into InputManager cursor */
            if (right.on) {
                try {
                    var canvas = document.querySelector('#canvasArea canvas') ||
                                 document.querySelector('canvas');
                    if (canvas) {
                        var r   = canvas.getBoundingClientRect();
                        var gw  = gdjs._game.getGameResolutionWidth();
                        var gh  = gdjs._game.getGameResolutionHeight();
                        var cx  = (right.kx - r.left) / r.width  * gw;
                        var cy  = (right.ky - r.top)  / r.height * gh;
                        gdjs._game.getInputManager()._setCursorPosition(cx, cy);
                    }
                } catch (e) {}
            }
        }

        requestAnimationFrame(gameUpdate);
    }
    gameUpdate();

    /* ── helpers ──────────────────────────────────────────────────── */
    function clampKnob(j, tx, ty) {
        var dx  = tx - j.bx;
        var dy  = ty - j.by;
        var len = Math.sqrt(dx * dx + dy * dy);
        if (len > JOY_RADIUS) { dx = dx / len * JOY_RADIUS; dy = dy / len * JOY_RADIUS; len = JOY_RADIUS; }
        j.kx = j.bx + dx;
        j.ky = j.by + dy;
        j.dx = len > 0 ? dx / JOY_RADIUS : 0;
        j.dy = len > 0 ? dy / JOY_RADIUS : 0;
    }

    function isLeft(x) { return x < window.innerWidth * HALF_SPLIT; }

    /* ── touch events (capture phase, no passive) ─────────────────── */
    function onTouchStart(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) {
            var t = e.changedTouches[i];
            if (isLeft(t.clientX) && !left.on) {
                left.on = true;
                left.id = t.identifier;
                left.bx = t.clientX;
                left.by = t.clientY;
                left.kx = t.clientX;
                left.ky = t.clientY;
                left.dx = 0;
                left.dy = 0;
            } else if (!isLeft(t.clientX) && !right.on) {
                right.on = true;
                right.id = t.identifier;
                right.bx = t.clientX;
                right.by = t.clientY;
                right.kx = t.clientX;
                right.ky = t.clientY;
            }
        }
    }

    function onTouchMove(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) {
            var t = e.changedTouches[i];
            if (t.identifier === left.id)  clampKnob(left,  t.clientX, t.clientY);
            if (t.identifier === right.id) { right.kx = t.clientX; right.ky = t.clientY; }
        }
    }

    function onTouchEnd(e) {
        for (var i = 0; i < e.changedTouches.length; i++) {
            var t = e.changedTouches[i];
            if (t.identifier === left.id) {
                left.on = false; left.id = -1; left.dx = 0; left.dy = 0;
                left.kx = left.bx; left.ky = left.by;
                /* stop player movement */
                if (typeof gdjs !== 'undefined') { gdjs._ptcX = undefined; gdjs._ptcY = undefined; }
            }
            if (t.identifier === right.id) {
                right.on = false; right.id = -1;
            }
        }
    }

    document.addEventListener('touchstart',  onTouchStart,  { passive: false, capture: true });
    document.addEventListener('touchmove',   onTouchMove,   { passive: false, capture: true });
    document.addEventListener('touchend',    onTouchEnd,    { passive: false, capture: true });
    document.addEventListener('touchcancel', onTouchEnd,    { passive: false, capture: true });

})();
