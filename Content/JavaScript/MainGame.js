"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-06 09:49:49
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-26 16:23:51
 * @FilePath: \CardGame1102\TypeScript\MainGame.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%
 */
// import "BP/BP_Cube";
console.log("[MainGame].head");
require("Card/Action/ActionBase"); //加这个是因为， actionbase 无法在EffectHandler 中导入。 // 再次注释，因为与ActionExtends 重复。
require("Card/Action/ActionExtends"); // 导入其中的mixin。
require("Card/Action/EndExtends"); // 导入其中的mixin。
require("GameMode/BP_PC");
require("UI/UIComponent/BP_CardMovementComponent");
require("UI/Panel/DuelPage");
require("Card/CardBase/CardInstance");
require("Card/CardBase/BPW_SampleWidget");
console.log("[MainGame].Start");
// console.log("Hello World 7758");
// console.log(UE.uclass);
// console.log(UE.SoundClass)
console.log("[MainGame].Finish");
//# sourceMappingURL=MainGame.js.map