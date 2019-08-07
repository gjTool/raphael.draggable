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
        var oDiv = this.canvas;
        oDiv.style.left = '0';
        oDiv.style.top = '0';
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