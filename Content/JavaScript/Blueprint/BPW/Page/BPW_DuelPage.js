"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuelPage = void 0;
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-06 09:49:49
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-12 11:41:05
 * @FilePath: \CardGame1102\TypeScript\Blueprint\BPW\Page\BPW_DuelPage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[BPW_DuelPage].Start");
const ue_1 = __importDefault(require("ue"));
const puerts_1 = require("puerts");
const Path_1 = require("../../Path");
console.log("[BPW_DuelPage].Mixin Start");
const uclass = ue_1.default.Class.Load(Path_1.BlueprintPath.BPW_DuelPage);
const jsclass = puerts_1.blueprint.tojs(uclass);
class DuelPage {
    mCardMovementComponent = null;
    Construct() {
        console.log("[BPW_DuelPage].Construct");
        const CompClass = ue_1.default.Class.Load(Path_1.BlueprintPath.BP_CardMovementComponent);
        puerts_1.blueprint.load(ue_1.default.Game.Blueprint.BPW.Page.BP_CardMovementComponentt.BP_CardMovementComponentt_C);
        this.mCardMovementComponent = ue_1.default.GameplayStatics.BeginDeferredActorSpawnFromClass(this.GetWorld(), CompClass, ue_1.default.Transform.Identity);
        ue_1.default.GameplayStatics.FinishSpawningActor(this.mCardMovementComponent, ue_1.default.Transform.Identity);
        console.log("[BPW_DuelPage].Construct mCardMovementComponent:", this.mCardMovementComponent);
        this.RegisterEvents();
    }
    RegisterEvents() {
        console.log("[BPW_DuelPage].RegisterEvents");
        // TestBtn1 点击后添加一个卡牌。
        this.TestBtn1.OnClicked.Add(() => {
            console.log("[BPW_DuelPage].TestBtn1 Clicked");
            this.mCardMovementComponent?.AddCard();
        });
    }
    ;
}
exports.DuelPage = DuelPage;
puerts_1.blueprint.mixin(jsclass, DuelPage);
console.log("[BPW_DuelPage].Finish");
//# sourceMappingURL=BPW_DuelPage.js.map