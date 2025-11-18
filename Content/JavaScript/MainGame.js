"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-06 09:49:49
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-18 16:09:26
 * @FilePath: \CardGame1102\TypeScript\MainGame.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%
 */
// import "BP/BP_Cube";
console.log("[MainGame].head");
require("Blueprint/BPw/CardActionBase/ActionBase"); //加这个是因为， actionbase 无法在EffectHandler 中导入。
require("Blueprint/GameMode/BP_PC");
require("Blueprint/BPW/Page/BPW_DuelPage");
// import "Blueprint/BPW/CardInstance/BPW_CardInstance";
require("Blueprint/BPW/CardInstance/BPW_SampleWidget");
require("Blueprint/BPW/CardInstance/BP_CardMovementComponent");
console.log("[MainGame].Start");
// console.log("Hello World 7758");
// console.log(UE.uclass);
// console.log(UE.SoundClass)
console.log("[MainGame].Finish");
//# sourceMappingURL=MainGame.js.map