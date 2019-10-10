## raphael.draggable.js
- raphael.js扩展拖拽功能。画布整体拖动，滚轮缩放，还原，以及单独元素拖动
## 使用方式：
```html
<div id="container"></div>
```

```javascript
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
        // text.click(function () {
        //     //画布背景还原初始位置
        //     paper.reset()
        // })
        //单独元素拖动
        circle.draggable()
        paper.zoomEnable()
    };
</script>
```
## 整体拖拽还有另一种实现方式
```html
<div id="container"></div>
```

```javascript
    <script src="raphael.min.js"></script>
    <script src="raphael.draggable.js"></script>
    <script type="text/javascript">
        window.onload = function () {
            var paper = new Raphael('container', 500, 500);
            paper.zoomEnable()
            var dice = paper.set();

            dice.push(paper.circle(100, 100, 100).attr({ 'fill': '270-#FAE56B:0-#E56B6B:100' }))
            var text = paper.text(400, 50, "我是被绘制出来的图片")
            text.attr({
                "font-size": "30px"
            });
            dice.push(text)

            dice.push(paper.rect(10, 10, 60, 60, 4).attr('fill', '#FFF'));
            dice.push(paper.circle(22, 58, 5).attr('fill', '#000'));
            dice.push(paper.circle(58, 22, 5).attr('fill', '#000'));
            dice.push(paper.circle(40, 40, 5).attr('fill', '#000'));
            dice.push(paper.circle(22, 22, 5).attr('fill', '#000'));
            dice.push(paper.circle(58, 59, 5).attr('fill', '#000'));
            dice.push(paper.circle(58, 59, 5).attr('fill', '#000'));
            //画布整体拖拽 - 拖拽所有元素，以达到拖拽画布整体的效果
            dice.drag(function (dx, dy, x, y, e) {
                dice.transform(this.data('mytransform') + 'T' + dx + ',' + dy);
            }, function (x, y, e) {
                dice.data('mytransform', this.transform());
            }, function (e) {
                dice.data('mytransform', this.transform());
            });

        }
    </script>
```