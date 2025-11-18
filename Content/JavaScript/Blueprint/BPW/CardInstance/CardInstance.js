"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardInstance = void 0;
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-10 18:08:19
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-18 10:26:26
 * @FilePath: \CardGame1102\TypeScript\Blueprint\BPW\CardInstance\CardInstance.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log('[CardInstance] head');
const ue_1 = __importDefault(require("ue"));
const Path_1 = require("../../Path");
const SystemManager_1 = require("../../../SubSystem/SystemManager");
const EffectHandler_1 = require("./EffectHandler");
console.log('[CardInstance] start');
class CardInstance {
    /** 卡牌定义 */
    Def;
    /** 处理图像、移动 */
    SampleWidget = undefined;
    /** 处理效果 */
    EffectHandler = undefined;
    constructor(def) {
        this.Def = def;
        this.EffectHandler = new EffectHandler_1.EffectHandler(this.Def);
    }
    /**
     * @description 创建 SampleWidget，并给 SampleWidget 做初始化。
     */
    InitSample() {
        if (!this.Def) {
            console.log("[CardInstance].InitSample:Error: CardDef is ", this.Def);
            return;
        }
        //创建 空白SampleWidget。
        const CardClass = ue_1.default.Class.Load(Path_1.BlueprintPath.BPW_SampleWidget);
        if (CardClass) {
            this.SampleWidget = ue_1.default.WidgetBlueprintLibrary.Create(SystemManager_1.SystemManager.GetWorld(), CardClass, ue_1.default.GameplayStatics.GetPlayerController(SystemManager_1.SystemManager.GetWorld(), 0));
            console.log("[CardInstance] Created SampleWidget:", this.SampleWidget);
        }
        else {
            console.log("[CardInstance].CreateSample: No CardClass");
        }
        // 给 SampleWidget 赋值 def
        this.SampleWidget?.Init(this.Def);
    }
    /**
     * 获取 SampleWidget 组件，用于动画、移动。
     * @example BP_CardMovementComponent.AddCard
     */
    GetSample() {
        return this.SampleWidget;
    }
    Use() {
        console.log("[CardInstance].Use , cid = ", this.Def.cid);
        this.EffectHandler?.Use();
    }
}
exports.CardInstance = CardInstance;
console.log('[CardInstance] finish');
//# sourceMappingURL=CardInstance.js.map