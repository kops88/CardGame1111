<!--
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-13 09:48:50
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-20 17:24:04
 * @FilePath: \CG1111\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
Plugins文件： 使用Puerts （ThirdParty中）v8 使用 v8_9.4.146.24
 

### 11.20 卡牌拖拽适应窗口

问题：
1.class 内的常用实例对象，需要通过"this"访问，有点麻烦？

### 11.19 CardEffect框架完成 3 
完成：
CardEffect 框架完成

问题：
1. 卡牌的ui自适应错误,拖拽窗口时，卡牌的位置不理想(已解决)
    1) absolute viewport local 三种坐标系
    2）setRenderTransform() 设置的ViewportPosition，且是缩放前（DPI）的
    3）GetViewportSize 缩放后的物理尺寸。（窗口实际的），配合setRenderTransform需要 ViewportSize/DPI
    4）slot 内的信息，为蓝图编辑器内定义的信息，非绘制信息
    5）通过 GetCachedGeometry 获取的为绘制信息。配合UE.SlateBlueprintLibrary使用。
2. 创建UObject后ts中无法使用构造函数（已解决）：替换为Actor。

知识：
1. panel的slot机制：https://www.cnblogs.com/Qiu-Bai/p/18963874


### 11.18 SystemManager基本完成 3
完成：
SystemManager基本完成

问题：
1. 手动mixin到蓝图，麻烦（已解决）：创建修饰器BlueprintMixin，可以自动 mixin 蓝图。
2. ts中创建struct报错（已解决）：调用错误，详细看：AssetSystem.GetCardDefByCid。

