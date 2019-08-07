(function (R) {
    R.prototype.draggable = function (flag) {
        var oDiv = this.canvas;
        var that = this;
        if (flag === false) {
            oDiv.onmousedown = null;
            document.onmousemove = null;
            document.onmouseup = null;
            document.ondragstart = null;
            return
        }
        oDiv.onmousedown = function (evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            if (flag === true && target.tagName.toLowerCase() === 'svg') {
                drag(e, oDiv, that)
            }
            if (flag !== true && flag !== false) {
                drag(e, oDiv, that)
            }
        }
    }
    R.prototype.reset = function () {
        var oDiv = this.canvas, scale = this._scale;
        scale.w = oDiv.width.baseVal.value
        scale.h = oDiv.height.baseVal.value,
        scale.x = 0;
        scale.y = 0;
        scale.vari= 0.02;
        scale.zoom= 1;
        oDiv.style.left = '0';
        oDiv.style.top = '0';
        this._scale = scale;
        this.setViewBox(scale.x, scale.y, scale.w, scale.h, false);
    }
    function drag(e, oDiv, that) {
        var disX = e.offsetX;
        var disY = e.offsetY;
        document.onmousemove = function (evt) {
            var e = evt || window.event;
            var left = e.pageX - disX;
            var top = e.pageY - disY;
            if (that._draging) {
                return
            }
            oDiv.style.left = left + 'px';
            oDiv.style.top = top + 'px';
        }
        document.onmouseup = function () {
            document.onmousemove = null;
        }
        document.ondragstart = function () {
            return false;
        }
    }
    R.prototype._draging = false;
    R.prototype._scale = { vari: .02, zoom: 1, w: 0, h: 0, x: 0, y: 0 };
    R.prototype.zoomEnable = function () {
        var oDiv = this.canvas, scale = this._scale, that = this;
        scale.w = oDiv.width.baseVal.value
        scale.h = oDiv.height.baseVal.value,
            oDiv.onmousewheel = function (e) {
                var cw = 640, ch = 720;
                var w = scale.w, h = scale.h, x = scale.x, y = scale.y;
                var vari = scale.vari - 0;
                e = e || window.event;
                var cx = e.clientX;
                var cy = e.clientY;
                var dtl;
                if (e.wheelDelta) {
                    dtl = e.wheelDelta;
                } else if (e.detail) {
                    dtl = e.detail;
                }
                var px, py, nx, ny;
                var posv = 1 / scale.zoom;
                px = cx * posv;
                py = cy * posv;
                if (dtl < 0) {
                    if (scale.zoom < 0.1) return;
                    scale.zoom -= vari;
                } else {
                    if (scale.zoom > 4.9) return;
                    scale.zoom += vari;
                }
                posv = 1 / scale.zoom;
                w = cw * posv;
                h = ch * posv;
                nx = cx * posv;
                ny = cy * posv;
                var dx = px - nx;
                var dy = py - ny;
                x += dx;
                y += dy;
                scale.w = w;
                scale.h = h;
                scale.x = x;
                scale.y = y;
                that.setViewBox(scale.x, scale.y, scale.w, scale.h, false);
            }
    }
    R.el.draggable = function (move, start, up) {
        this._ui = this._ui || {};
        var that = this;
        this._ui.onMove = R.is(move, 'function') ?
            move : function (distanceX, distanceY, x, y, deltaX, deltaY) {
                that.translate(deltaX, deltaY);
            };
        this._ui.onStart = R.is(start, 'function') ? start : function (x, y) {

        };
        this._ui.onUp = R.is(up, 'function') ? up : function (x, y) {

        };
        function onMove(distanceX, distanceY, x, y) {
            var deltaX = x - that._ui.lastX;
            var deltaY = y - that._ui.lastY;
            that._ui.lastX = x;
            that._ui.lastY = y;
            that._ui.onMove(distanceX, distanceY, x, y, deltaX, deltaY);
        };
        function onStart(x, y) {
            R.prototype._draging = true;
            that._ui.lastX = x;
            that._ui.lastY = y;
            that._ui.onStart(x, y);
        };
        function onUp(x, y) {
            R.prototype._draging = false;
        }
        return this.drag(onMove, onStart, onUp);
    };
})(Raphael);