/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-18 10:33:39
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-18 18:12:23
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\CardInstance\EffectHandler.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log('[EffectHandler] head');
import UE from 'ue';
import { BlueprintPath } from '../../Path';
import { blueprint } from 'puerts';
import { CardDef } from './CardInstance';
import { OnTrigger, OnAction, OnEnd } from '../CardActionBase/ActionBase';
import { SystemManager } from '../../../SubSystem/SystemManager';


export class EffectHandler { 
    
    private OnTrigger: OnTrigger | undefined = undefined;
    private OnActions: OnAction[] = [];
    private OnEnd: OnEnd | undefined = undefined;

    /**
     * @description 若 def 有效果，则创建 OnTrigger、OnAction、OnEnd 并绑定。
     */
    constructor(def: CardDef) {
        // 遍历每组效果
        for (let effect of def.effects) {
            // 分别加载 trigger action end
            this.OnTrigger = UE.NewObject(effect.OnTrigger) as OnTrigger;
            let i = 0;
            for(let action of effect.OnActions) {
                this.OnActions.push(UE.NewObject(action) as OnAction);
                console.log("[EffectHandler].constructor: OnAction = ", this.OnActions[i++].GetName());
            }
            this.OnEnd = UE.NewObject(effect.OnEnd)  as OnEnd;
            if(!this.OnTrigger || !this.OnActions || !this.OnEnd) {
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


console.log('[EffectHandler] end');
