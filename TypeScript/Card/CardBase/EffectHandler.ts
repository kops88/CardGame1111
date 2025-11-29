/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-18 10:33:39
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-27 10:04:31
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\CardInstance\EffectHandler.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log('[EffectHandler] head');
import UE from 'ue';
import { BlueprintPath } from '../../Path';
import { CardDef, CardInstance } from './CardInstance';
import { OnTrigger, OnAction, OnEnd } from '../Action/ActionBase';
import { FunctionLibrary } from '../../SubSystem/SystemManager';

export class EffectHandler { 
    
    private OnTrigger: OnTrigger | undefined = undefined;
    private OnActions: OnAction[] = [];
    private OnEnd: OnEnd | undefined = undefined;
    private OnActionTest: OnAction | undefined = undefined;
    /**
     * @description 若 def 有效果，则创建 OnTrigger、OnAction、OnEnd 并绑定。
     * @link cardinstance.construct
     */
    constructor(def: CardDef, cardInstance: CardInstance) {
        // 遍历每组效果
        for (let effect of def.Effects) {

            /**
             * 分别加载 trigger action end
             */
            this.OnTrigger = FunctionLibrary.CreateAction(effect.OnTrigger) as OnTrigger;

            let i = 0; 
            for(let action of effect.OnActions) {
                let actionIns = FunctionLibrary.CreateAction(action);
                this.OnActions.push(actionIns as OnAction);
                console.log("[EffectHandler].constructor: OnEnd = ", this.OnActions[i++].GetName());
            }
            
            this.OnEnd = FunctionLibrary.CreateAction(effect.OnEnd)  as OnEnd;

            if(!this.OnTrigger || !this.OnActions || !this.OnEnd) {
                // 打印不代表错误。
                console.log("[EffectHandler].constructor: Error: OnTrigger or OnAction or OnEnd is null");
                return;
            }

            /**
             * 绑定 trigger action end instance
             */
            this.OnActions.forEach((action) => {  
                console.log("[EffectHandler].constructor: action.params = ", effect.params.GetKey(0), "and ", effect.params.Get(0));
                console.log("[OnAction].EffectHandler.constructor: params Num = ", effect.params.Num());
                action.SetParams(effect.params, effect.StrParams)           
            });

            this.OnActions.forEach((action, idx) => {
                this.OnTrigger?.BindAction(action);
                this.OnActionTest = action;
                console.log("[EffectHandler].constructor: BindAction: action = ", action.GetName());
            });
            
            this.OnActions[0].BindEnd(this.OnEnd);
            this.OnEnd.SetInstance(cardInstance)
            
            /**
             * set Params
             */
            
        }
        
    }

    GetParamsNum() { 
        return this.OnActionTest?.paramsNum();
    }

    /**
     * @ref CardInstance.Use()
     */
    Use() {
        this.OnTrigger?.executeTrigger();
    }
}


console.log('[EffectHandler] end');
