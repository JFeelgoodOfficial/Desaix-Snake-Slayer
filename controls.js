/**
 * Mobile virtual controls for DESAIX Snake Slayer.
 *
 * Layout (bottom of screen):
 *   Left  → floating movement joystick
 *   Right → floating aim joystick  +  FIRE button
 *
 * Also hides the in-game Cursor crosshair sprite and the legacy
 * d-pad sprites every frame so they never appear on mobile.
 */
(function () {
    'use strict';

    var isMobile = ('ontouchstart' in window) ||
                   (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);

    if (!isMobile) return;

    /* ── constants ────────────────────────────────────────────────── */
    var JOY_RADIUS   = 60;    // outer ring radius (px)
    var KNOB_RADIUS  = 26;    // inner knob radius (px)
    var MOVE_REACH   = 280;   // world-unit lookahead for movement
    var BTN_RADIUS   = 36;    // fire button radius (px)
    var SPLIT        = 0.48;  // left/right screen split

    /* ── state ────────────────────────────────────────────────────── */
    var left  = { on:false, id:-1, bx:0, by:0, kx:0, ky:0, dx:0, dy:0 };
    var right = { on:false, id:-1, bx:0, by:0, kx:0, ky:0 };
    var fire  = { on:false, id:-1 };   // dedicated fire button

    /* ── resting positions (recalculated on resize) ───────────────── */
    var LBX, LBY, RBX, RBY, FBX, FBY;

    function setRestingPositions() {
        var w = window.innerWidth, h = window.innerHeight;
        LBX = w * 0.18;  LBY = h * 0.82;   // left joystick
        RBX = w * 0.72;  RBY = h * 0.82;   // right (aim) joystick
        FBX = w * 0.90;  FBY = h * 0.82;   // fire button
    }
    setRestingPositions();

    /* ── overlay canvas ───────────────────────────────────────────── */
    var oc = document.createElement('canvas');
    oc.id = 'joy-overlay';
    oc.style.cssText =
        'position:fixed;top:0;left:0;width:100%;height:100%;' +
        'pointer-events:none;z-index:9999;touch-action:none;';
    document.body.appendChild(oc);

    function resizeCanvas() {
        oc.width  = window.innerWidth;
        oc.height = window.innerHeight;
        setRestingPositions();
        if (!left.on)  { left.kx  = LBX; left.ky  = LBY; left.bx  = LBX; left.by  = LBY; }
        if (!right.on) { right.kx = RBX; right.ky = RBY; right.bx = RBX; right.by = RBY; }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    /* ── render ───────────────────────────────────────────────────── */
    function drawJoystick(ctx, j, rbx, rby) {
        var bx = j.on ? j.bx : rbx;
        var by = j.on ? j.by : rby;
        var kx = j.on ? j.kx : rbx;
        var ky = j.on ? j.ky : rby;

        /* outer ring */
        ctx.beginPath();
        ctx.arc(bx, by, JOY_RADIUS, 0, Math.PI * 2);
        ctx.strokeStyle = j.on ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = j.on ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)';
        ctx.fill();

        /* knob */
        ctx.beginPath();
        ctx.arc(kx, ky, KNOB_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = j.on ? 'rgba(255,210,60,0.92)' : 'rgba(255,255,255,0.40)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    function drawFireButton(ctx) {
        ctx.beginPath();
        ctx.arc(FBX, FBY, BTN_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = fire.on ? 'rgba(255,80,60,0.90)' : 'rgba(220,60,40,0.55)';
        ctx.fill();
        ctx.strokeStyle = fire.on ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        /* gun icon (simple lines) */
        ctx.save();
        ctx.translate(FBX, FBY);
        ctx.strokeStyle = 'rgba(255,255,255,0.95)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        /* barrel */
        ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.stroke();
        /* grip */
        ctx.beginPath(); ctx.moveTo(4, 0); ctx.lineTo(0, 12); ctx.stroke();
        /* trigger guard */
        ctx.beginPath(); ctx.moveTo(-4, 0); ctx.lineTo(-4, 8); ctx.lineTo(4, 8); ctx.stroke();
        ctx.restore();

        /* label */
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('FIRE', FBX, FBY + BTN_RADIUS + 14);
    }

    function drawLabels(ctx) {
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255,255,255,0.50)';
        ctx.fillText('MOVE', LBX, LBY + JOY_RADIUS + 14);
        ctx.fillText('AIM',  RBX, RBY + JOY_RADIUS + 14);
    }

    function render() {
        var ctx = oc.getContext('2d');
        ctx.clearRect(0, 0, oc.width, oc.height);
        drawJoystick(ctx, left,  LBX, LBY);
        drawJoystick(ctx, right, RBX, RBY);
        drawFireButton(ctx);
        drawLabels(ctx);
        requestAnimationFrame(render);
    }
    render();

    /* ── game-loop hook ───────────────────────────────────────────── */
    var _gameCanvas = null;
    var _DPAD_NAMES = ['right','left','up','down','joystick'];

    function gameUpdate() {
        if (typeof gdjs === 'undefined' || !gdjs._game) {
            requestAnimationFrame(gameUpdate);
            return;
        }

        var scene = null;
        try { scene = gdjs._game.getSceneStack().getCurrentScene(); } catch(e) {}

        if (scene) {
            /* hide in-game Cursor crosshair every frame */
            try {
                var cursors = scene.getObjects('Cursor');
                for (var ci = 0; ci < cursors.length; ci++) cursors[ci].hide();
            } catch(e) {}

            /* hide legacy d-pad sprites every frame */
            for (var dn = 0; dn < _DPAD_NAMES.length; dn++) {
                try {
                    var dObjs = scene.getObjects(_DPAD_NAMES[dn]);
                    for (var doi = 0; doi < dObjs.length; doi++) dObjs[doi].hide();
                } catch(e) {}
            }

            /* movement: project left joystick direction from player position */
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

            /* aim: feed right joystick screen position into InputManager */
            if (right.on || fire.on) {
                if (!_gameCanvas)
                    _gameCanvas = document.querySelector('#canvasArea canvas') ||
                                  document.querySelector('canvas');
                if (_gameCanvas) {
                    try {
                        var rect = _gameCanvas.getBoundingClientRect();
                        var gw = gdjs._game.getGameResolutionWidth();
                        var gh = gdjs._game.getGameResolutionHeight();
                        /* use right knob position; fallback to center-right when fire only */
                        var sx = right.on ? right.kx : FBX;
                        var sy = right.on ? right.ky : RBY;
                        var cx = (sx - rect.left) / rect.width  * gw;
                        var cy = (sy - rect.top)  / rect.height * gh;
                        gdjs._game.getInputManager()._setCursorPosition(cx, cy);
                    } catch(e) {}
                }
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
        if (len > JOY_RADIUS) {
            dx = dx / len * JOY_RADIUS;
            dy = dy / len * JOY_RADIUS;
            len = JOY_RADIUS;
        }
        j.kx = j.bx + dx;
        j.ky = j.by + dy;
        j.dx = len > 0 ? dx / JOY_RADIUS : 0;
        j.dy = len > 0 ? dy / JOY_RADIUS : 0;
    }

    function dist(ax, ay, bx, by) {
        var dx = ax - bx, dy = ay - by;
        return Math.sqrt(dx*dx + dy*dy);
    }

    function isLeftSide(x)      { return x < window.innerWidth * SPLIT; }
    function isFireButton(x, y) { return dist(x, y, FBX, FBY) <= BTN_RADIUS + 12; }

    /* ── touch events ─────────────────────────────────────────────── */
    function onTouchStart(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) {
            var t = e.changedTouches[i];
            var x = t.clientX, y = t.clientY;

            if (isFireButton(x, y) && !fire.on) {
                fire.on = true;
                fire.id = t.identifier;
            } else if (isLeftSide(x) && !left.on) {
                left.on = true;
                left.id = t.identifier;
                left.bx = x; left.by = y;
                left.kx = x; left.ky = y;
                left.dx = 0; left.dy = 0;
            } else if (!isLeftSide(x) && !right.on && !isFireButton(x,y)) {
                right.on = true;
                right.id = t.identifier;
                right.bx = x; right.by = y;
                right.kx = x; right.ky = y;
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
                left.on = false; left.id = -1;
                left.dx = 0; left.dy = 0;
                left.kx = LBX; left.ky = LBY;
                left.bx = LBX; left.by = LBY;
                if (typeof gdjs !== 'undefined') { gdjs._ptcX = undefined; gdjs._ptcY = undefined; }
            }
            if (t.identifier === right.id) {
                right.on = false; right.id = -1;
                right.kx = RBX; right.ky = RBY;
                right.bx = RBX; right.by = RBY;
            }
            if (t.identifier === fire.id) {
                fire.on = false; fire.id = -1;
            }
        }
    }

    document.addEventListener('touchstart',  onTouchStart, { passive:false, capture:true });
    document.addEventListener('touchmove',   onTouchMove,  { passive:false, capture:true });
    document.addEventListener('touchend',    onTouchEnd,   { passive:false, capture:true });
    document.addEventListener('touchcancel', onTouchEnd,   { passive:false, capture:true });

})();
