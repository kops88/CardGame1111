"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectHandler = void 0;
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-18 10:33:39
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-18 18:12:23
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\CardInstance\EffectHandler.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log('[EffectHandler] head');
const ue_1 = __importDefault(require("ue"));
class EffectHandler {
    OnTrigger = undefined;
    OnActions = [];
    OnEnd = undefined;
    /**
     * @description 若 def 有效果，则创建 OnTrigger、OnAction、OnEnd 并绑定。
     */
    constructor(def) {
        // 遍历每组效果
        for (let effect of def.effects) {
            // 分别加载 trigger action end
            this.OnTrigger = ue_1.default.NewObject(effect.OnTrigger);
            let i = 0;
            for (let action of effect.OnActions) {
                this.OnActions.push(ue_1.default.NewObject(action));
                console.log("[EffectHandler].constructor: OnAction = ", this.OnActions[i++].GetName());
            }
            this.OnEnd = ue_1.default.NewObject(effect.OnEnd);
            if (!this.OnTrigger || !this.OnActions || !this.OnEnd) {
                // 打印不代表错误。
                console.log("[EffectHandler].constructor: Error: OnTrigger or OnAction or OnEnd is null");
                return;
            }
            // 绑定
            this.OnActions.forEach((action, idx) => {
                this.OnTrigger?.BindAction(action);
                console.log("[EffectHandler].constructor: BindAction: action = ", action.GetName());
            });
            this.OnActions[0].BindEnd(this.OnEnd);
        }
    }
    /**
     * @example GameOperationSystem.UseCard()
     */
    Use() {
        this.OnTrigger?.executeTrigger();
    }
}
exports.EffectHandler = EffectHandler;
console.log('[EffectHandler] end');
//# sourceMappingURL=EffectHandler.js.map