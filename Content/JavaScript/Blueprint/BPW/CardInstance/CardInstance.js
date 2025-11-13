"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardInstance = exports.CardDef = void 0;
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-10 18:08:19
 * @LastEditors: v_lyyulliu
 * @LastEditTime: 2025-11-13 16:07:29
 * @FilePath: \CardGame1102\TypeScript\Blueprint\BPW\CardInstance\CardInstance.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log('[CardInstance] head');
const ue_1 = __importDefault(require("ue"));
const Path_1 = require("../../Path");
const SystemManager_1 = require("../../../SubSystem/SystemManager");
// const uclass = UE.Class.Load(BlueprintPath.CardDef);
// const jsclass = blueprint.tojs(uclass);
console.log('[CardInstance] start');
class CardDef extends ue_1.default.Game.Blueprint.Table.CardDef.CardDef {
}
exports.CardDef = CardDef;
class CardInstance {
    Def;
    SampleWidget = undefined;
    constructor(def) {
        this.Def = def;
    }
    /**
     * @description 创建 SampleWidget，并给 SampleWidget 做初始化。
     */
    InitSample() {
        if (!this.Def) {
            console.log("[CardInstance].InitSample:Error: CardDef is ", this.Def);
            return;
        }
        this.CreateSample();
        this.SampleWidget?.Init(this.Def);
    }
    /**
     * @example BP_CardMovementComponent.AddCard
     */
    GetSample() {
        return this.SampleWidget;
    }
    CreateSample() {
        const CardClass = ue_1.default.Class.Load(Path_1.BlueprintPath.BPW_SampleWidget);
        if (CardClass) {
            this.SampleWidget = ue_1.default.WidgetBlueprintLibrary.Create(SystemManager_1.SystemManager.GetWorld(), CardClass, ue_1.default.GameplayStatics.GetPlayerController(SystemManager_1.SystemManager.GetWorld(), 0));
            console.log("[CardInstance] Created SampleWidget:", this.SampleWidget);
        }
        else {
            console.log("[CardInstance].CreateSample: No CardClass");
        }
    }
}
exports.CardInstance = CardInstance;
console.log('[CardInstance] finish');
//# sourceMappingURL=CardInstance.js.map