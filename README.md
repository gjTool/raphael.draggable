## raphael.draggable.js
- raphael.js扩展拖拽功能。画布整体拖动，滚轮缩放，还原，以及单独元素拖动
## 使用方式：
```
<div id="container"></div>
```

```
<script src="raphael.min.js"></script>
<script src="raphael.draggable.js"></script>
<script type="text/javascript">
    window.onload = function () {
        var paper = Raphael("container", 640, 720);
        var circle = paper.circle(100, 100, 100).attr({ 'fill': '270-#FAE56B:0-#E56B6B:100' });
        var text = paper.text(400, 50, "我是被绘制出来的图片")
        text.attr({
            "font-size": "30px"
        });
        //画布背景整体拖动
        paper.draggable()
        text.click(function () {
            //画布背景还原初始位置
            paper.reset()
        })
        //单独元素拖动
        circle.draggable()
        paper.zoomEnable()
    };
</script>
```
