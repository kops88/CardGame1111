<!--
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-13 09:48:50
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-19 17:34:56
 * @FilePath: \CG1111\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
Plugins文件： 使用Puerts （ThirdParty中）v8 使用 v8_9.4.146.24
 


### 11.18 SystemManager基本完成 3
完成：
SystemManager基本完成

解决：
1. 手动mixin到蓝图，麻烦（已解决）：创建修饰器BlueprintMixin，可以自动 mixin 蓝图。
2. ts中创建struct报错（已解决）：调用错误，详细看：AssetSystem.GetCardDefByCid。


### 11.19 CardEffect框架完成 3 
完成：
CardEffect 框架完成

问题：
1. 卡牌的ui自适应错误：拖拽窗口时，卡牌的位置不理想。
2. 创建UObject后ts中无法使用构造函数（已解决）：替换为Actor。

知识：
1. panel的slot机制
