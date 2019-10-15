/*
 需要引用jq
*/
(function (R) {
    R.prototype.reset = function () {
        var oDiv = this.canvas, scale = this._scale;
        scale.w = oDiv.width.baseVal.value;
        scale.h = oDiv.height.baseVal.value;
        scale.x = 0;
        scale.y = 0;
        scale.vari = 0.02;
        scale.zoom = 1;
        this._scale = scale;
        this.setViewBox(scale.x, scale.y, scale.w, scale.h, false);
    }
    R.prototype._scale = { vari: 0.1, zoom: 1, w: 0, h: 0, x: 0, y: 0,maxZoom:6,minZoom:0.5 };
    R.prototype.getId = function (){
        this.parent = $(this.canvas).parent();
        this.parentId = this.parent[0].id;
        return this.parentId;
    }
    R.prototype.zoomEnable = function () {
        var oDiv = this.canvas, scale = this._scale, that = this;
        scale.w = oDiv.width.baseVal.value;
        scale.h = oDiv.height.baseVal.value;
        this.parent = $(this.canvas).parent();
        this.parentId = this.parent[0].id;
        var $svgTest = this.parent[0];
       $svgTest.onmousewheel = function (e) {
            var cw = oDiv.width.baseVal.value, ch = oDiv.height.baseVal.value;
            var w = scale.w, h = scale.h, x = scale.x, y = scale.y;
            var vari = scale.vari - 0;
            e = e || window.event;
            var cx = e.clientX - offset($svgTest).left;
            var cy = e.clientY - offset($svgTest).top;
            var dtl = e.wheelDelta ?  e.wheelDelta : e.detail;
            var px, py, nx, ny;
            var posv = 1 / scale.zoom;
            px = cx * posv;
            py = cy * posv;
            if (dtl < 0) {
                if (scale.zoom <= scale.minZoom) return;
                scale.zoom -= vari;
            } else {
                if (scale.zoom >= scale.maxZoom) return;
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
            that._scale = scale
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
    function offset(elem){
        var o = {};
        o.left = elem.offsetLeft;
        o.top= elem.offsetTop;
        while(elem.offsetParent){
            elem = elem.offsetParent;
            o.left += elem.offsetLeft;
            o.top += elem.offsetTop;
        }
        return o;
    }
})(Raphael);
