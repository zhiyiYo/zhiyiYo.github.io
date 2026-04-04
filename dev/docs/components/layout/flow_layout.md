---
title: Flow Layout
date: 2024-02-26 19:40:01
permalink: /pages/components/flowlayout/
---

### [FlowLayout](https://pyqt-fluent-widgets.readthedocs.io/en/latest/autoapi/qfluentwidgets/components/layout/flow_layout/index.html)

![FlowLayout](/img/components/flowlayout/FlowLayout.png)

`FlowLayout` is able to adapt to the viewport width and automatically wraps when the internal components exceed the viewport width.

```python
class Demo(QWidget):

    def __init__(self):
        super().__init__()
        layout = FlowLayout(self, needAni=True)  # Enable animation

        # Custom animation parameters
        layout.setAnimation(250, QEasingCurve.OutQuad)

        layout.setContentsMargins(30, 30, 30, 30)
        layout.setVerticalSpacing(20)
        layout.setHorizontalSpacing(10)

        layout.addWidget(QPushButton('aiko'))
        layout.addWidget(QPushButton('Liu Jingai'))
        layout.addWidget(QPushButton('Liu Ai Zi'))
        layout.addWidget(QPushButton('aiko Dai Suki'))
        layout.addWidget(QPushButton('aiko too love 😘'))

        self.resize(250, 300)
```

In some situations, the components in a flow layout may overlap. The following method can be used to force a refresh of the layout:
```python
# Remove all widgets
flowLayout.removeAllWidgets()

# Re-add widgets
for w in widgets:
    flowLayout.addWidget(w)
```


### [AdaptiveFlowLayout](https://pyqt-fluent-widgets.readthedocs.io/zh-cn/latest/autoapi/qfluentwidgets/components/layout/flow_layout/index.html)

![AdaptiveFlowLayout](/img/components/flowlayout/FlowLayout.png)

`AdaptiveFlowLayout` is an advanced version of `FlowLayout`. It automatically calculates how many components should be placed per row based on the container width, and adjusts the width of each component to fill the entire row.

Compared to the free-form arrangement of `FlowLayout`, `AdaptiveFlowLayout` is more suitable for card grid layouts, ensuring a neater layout per row and higher width utilization efficiency.

```python
class Demo(QWidget):

    def __init__(self):
        super().__init__()
        layout = AdaptiveFlowLayout(self, needAni=False)

        # Set the minimum width of components (required)
        layout.setWidgetMinimumWidth(150)

        # (Optional) Set the maximum width of components to prevent them from being too wide
        # layout.setWidgetMaximumWidth(160)

        layout.setContentsMargins(30, 30, 30, 30)
        layout.setVerticalSpacing(20)
        layout.setHorizontalSpacing(10)

        layout.addWidget(PushButton('aiko'))
        layout.addWidget(PushButton('Liu Jing'ai'))
        layout.addWidget(PushButton('Yanai Aiko'))
        layout.addWidget(PushButton('aiko is the best'))
        layout.addWidget(PushButton('Love aiko so much😘'))

        # Supports inserting components at specified positions
        layout.insertWidget(1, PrimaryPushButton('Nishimiya Shoko'))

        self.resize(400, 300)
```

### [WaterfallLayout](https://qfluentwidgets.com/price)

![WaterfallLayout](/img/components/flowlayout/WaterfallLayout.png)

`WaterfallLayout` is a type of page layout with multiple columns of equal width but varying height.