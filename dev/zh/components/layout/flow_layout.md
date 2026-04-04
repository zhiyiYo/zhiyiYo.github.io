---
title: 流式布局
date: 2024-02-26 19:40:01
permalink: /zh/pages/components/flowlayout/
---

### [FlowLayout](https://pyqt-fluent-widgets.readthedocs.io/zh-cn/latest/autoapi/qfluentwidgets/components/layout/flow_layout/index.html)

![FlowLayout](/img/components/flowlayout/FlowLayout.png)

`FlowLayout` 能够自适应视口宽度，在内部组件超出视口宽度时自动换行。

```python
class Demo(QWidget):

    def __init__(self):
        super().__init__()
        layout = FlowLayout(self, needAni=True)  # 启用动画

        # 自定义动画参数
        layout.setAnimation(250, QEasingCurve.OutQuad)

        layout.setContentsMargins(30, 30, 30, 30)
        layout.setVerticalSpacing(20)
        layout.setHorizontalSpacing(10)

        layout.addWidget(QPushButton('aiko'))
        layout.addWidget(QPushButton('刘静爱'))
        layout.addWidget(QPushButton('柳井爱子'))
        layout.addWidget(QPushButton('aiko 赛高'))
        layout.addWidget(QPushButton('aiko 太爱啦😘'))

        self.resize(250, 300)
```

在某些情况下，流式布局中的组件可能发生重叠，可使用下述方法强制刷新布局：
```python
# 移除全部组件
flowLayout.removeAllWidgets()

# 重新添加组件
for w in widgets:
    flowLayout.addWidget(w)
```


### [AdaptiveFlowLayout](https://pyqt-fluent-widgets.readthedocs.io/zh-cn/latest/autoapi/qfluentwidgets/components/layout/flow_layout/index.html)

![AdaptiveFlowLayout](/img/components/flowlayout/FlowLayout.png)

`AdaptiveFlowLayout` 是 `FlowLayout` 的进阶版本，它能根据容器宽度自动计算每行应该放置多少个组件，并自动调整组件宽度以填满整行。

相比 `FlowLayout` 的自由排列方式，`AdaptiveFlowLayout` 更适合用于卡片网格布局，保证每行的布局更整齐、宽度利用效率更高。

```python
class Demo(QWidget):

    def __init__(self):
        super().__init__()
        layout = AdaptiveFlowLayout(self, needAni=False)

        # 设置组件最小宽度（必须）
        layout.setWidgetMinimumWidth(150)

        # （可选）设置组件最大宽度，防止组件过宽
        # layout.setWidgetMaximumWidth(160)

        layout.setContentsMargins(30, 30, 30, 30)
        layout.setVerticalSpacing(20)
        layout.setHorizontalSpacing(10)

        layout.addWidget(PushButton('aiko'))
        layout.addWidget(PushButton('刘静爱'))
        layout.addWidget(PushButton('柳井爱子'))
        layout.addWidget(PushButton('aiko 赛高'))
        layout.addWidget(PushButton('aiko 太爱啦😘'))

        # 支持在指定位置插入组件
        layout.insertWidget(1, PrimaryPushButton('西宫硝子'))

        self.resize(400, 300)
```


### [WaterfallLayout](https://qfluentwidgets.com/zh/price)

![WaterfallLayout](/img/components/flowlayout/WaterfallLayout.png)

`WaterfallLayout` 一种多列等宽不等高的页面布局方式。