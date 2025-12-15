<!--
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-13 09:48:50
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-12-15 21:24:41
 * @FilePath: \CG1111\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

Plugins文件： 使用Puerts （ThirdParty中）v8 使用 v8_9.4.146.24

未解决：
1. class 内的常用实例对象，需要通过"this"访问，有点麻烦？
2. CommonDestroy（OnEnd子类）调用时，GetName为CommonDestroy，execute调用的是OnEnd的方法。
3. 每个ts文件访问外面，都需要导入路径，巨麻烦。。。。
    建议1： 将同类型的文件放在一个文件夹下，这样一个文件导入路径后，其他文件可以直接copy过来。

### 12.15 类无限列表UMG，进度20%
    能在编辑器显示、预览。
    能在运行时显示。
### 12.13 开始写类无限列表UMG，进度5%

### 12.01 完成，TemplateBase、抽卡界面，ViewComp进度10%
完成，TemplateBase、抽卡界面，ViewComp进度10%


### 11.29 抽卡逻辑80%，TemplateBase基础70%
重新对代码文件进行分类。
完成抽卡界面的逻辑80%
TemplateBase基础70%

### 11.28 PanelSystem 基础框架完成，PanelInstnace 基础完成
完成了PanelSystem基础框架
完成了PanelInstance基础，接入子类 MainUI、DuelPage、PullMenu(抽卡界面)、PullResult（抽卡结果界面）、TaskMenu 界面。
开始写 TemplateBase 框架

问题：
1. 文件目录结构不清晰，需要整理。（参考项目文件）
2. PanelInstnace 的销毁生命周期。


### 11.27  PanelSystem 进度10%，卡牌效果执行链 95%
添加了 PanelSystem，重新整理了 Duelpage。
tsconfig 加入 node 模块

解决：
1. 卡牌效果执行 OnEnd 无法调用子类 executeEnd，修复。

### 11.26 
解决：
1. 卡牌效果执行 OnAction 修复。
2. 卡牌效果执行 OnTrigger 修复。
问题
 1. 执行效果CreateCardToHand时，this指针相同，但是params.Num为0，导致无法执行效果。（未知，已解决）
    OnAction 构造时，num 为1；
    tick中正常调用，偶尔为0，偶尔为-1321432342（随机乱码）
    tick调试断点时，num为1，正常。

    解决：将params字段放在蓝图。

2. OnEnd子类效果执行，无法执行对应子类executeEnd，只执行了OnEnd的executeEnd（已解决）
    mixin错误，原因未知。
    将修饰器更改为手动mixin，工作正常


### 11.24 卡牌效果执行链 80%，卡住：OnTrigger广播ExecuteAction时无法传递this

问题
1. 执行效果 CreateCardToHand 时, 丢失this上下文（已解决）
    原因:1）broadcast 时，this 丢失, 使用Bind绑定依然无效。
        2）broadcast时，使用的是函数调用模式（const func = obj.func(); func(); 丢失this），func 为纯函数，丢失this信息
    尝试：1）使用bind绑定this，无效
        2）使用箭头函数，自动绑定this，箭头函数为undefined



    
### 11.21 卡牌效果执行链 80%
完成：
    1. 卡牌效果执行链 80%
    2. action效果 * 3


问题
1. 如何避免两个文件的循环引用？（已解决）
    使用 Interface 将部分接口独立出来, 在需要的类使用 Implememnt 实现。（参考 IPageInterface ）
2. error: (0x00000BFD810B2AB0) Error: Bad parameters #0, expect a object. (@BlueprintMixin 报错)
    原因未知。
    重启就好了。


### 11.20 CoreCard进度10%，卡牌拖拽适应窗口

问题：
1. 卡牌的ui自适应错误,拖拽窗口时，卡牌的位置不理想(已解决)
    1) absolute viewport local 三种坐标系
    2）setRenderTransform() 设置的ViewportPosition，且是缩放前（DPI）的
    3）GetViewportSize 缩放后的物理尺寸。（窗口实际的），配合setRenderTransform需要 ViewportSize/DPI
    4）slot 内的信息，为蓝图编辑器内定义的信息，非绘制信息
    5）通过 GetCachedGeometry 获取的为绘制信息。配合UE.SlateBlueprintLibrary使用。

2.多出通过访问获取的局部变量，应该使用一个成员存储起来，避免每次都访问。

### 11.19 CardEffect框架完成 3 
完成：
CardEffect 框架完成

问题：
1. 创建UObject后ts中无法使用构造函数（已解决）：替换为Actor。

知识：
1. panel的slot机制：https://www.cnblogs.com/Qiu-Bai/p/18963874


### 11.18 SystemManager基本完成 3
完成：
SystemManager基本完成

问题：
1. 手动mixin到蓝图，麻烦（已解决）：创建修饰器BlueprintMixin，可以自动 mixin 蓝图。
2. ts中创建struct报错（已解决）：调用错误，详细看：AssetSystem.GetCardDefByCid。

