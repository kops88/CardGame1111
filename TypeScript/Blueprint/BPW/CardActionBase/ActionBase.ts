console.log("[ActionBase]:  ActionBase.ts start");
import UE, { Enum } from 'ue';
import { BlueprintPath } from '../../Path'
import { BlueprintMixin } from '../../../Utils/mixinUtils';
import { TsDelegate } from '../../../SubSystem/EventSystem';
import { CardInstance } from '../CardInstance/CardInstance';
import { GameOperationSystem } from '../../../SubSystem/GameOperationSystem';
import { SystemManager } from '../../../SubSystem/SystemManager';
import { SystemEnum } from '../../../SubSystem/SystemName';

export interface OnTrigger extends UE.Game.Blueprint.CardAction.OnTrigger.BP_OnTrigger.BP_OnTrigger_C {}
export interface OnAction extends UE.Game.Blueprint.CardAction.OnAction.BP_OnAction.BP_OnAction_C {}
export interface OnEnd extends UE.Game.Blueprint.CardAction.OnEnd.BP_OnEnd.BP_OnEnd_C {}

export const ActionName = UE.Game.Blueprint.CardAction.ActionName.ActionName;
export type ActionType = UE.Game.Blueprint.CardAction.ActionName.ActionName;

@BlueprintMixin(BlueprintPath.BP_OnTrigger)
export class OnTrigger { 

    private mOnAction: TsDelegate<() => void> = new TsDelegate<() => void>();
    
    ReceiveBeginPlay() : void {
        console.log("[EffectTrigger].ReceiveBeginPlay");
        this.mOnAction= new TsDelegate<() => void>();
    }

    /**
     * 初始化调用，绑定对应的 action
     * @rule 一组effect，绑定所有action
     */
    BindAction(action: OnAction) {
        console.log("[EffectTrigger].BindAction");
        this.mOnAction.Add(action.executeAction.bind(action));
        console.log("[OnTrigger][OnAction].BindAction, param Num = ", action.paramsNum(), "this = ", action.GetName());
    }

    /**
     * @Link EffectHandler.Use()
     */
    executeTrigger() {
        console.log("[EffectTrigger].executeTrigger");
        this.mOnAction.Broadcast(this);
    }

}


/**
 * 效果基类
 * @function 重写 executeAction 方法
 * @description log 使用 EffectTrigger
 */
@BlueprintMixin(BlueprintPath.BP_OnAction)
export class OnAction { 

    private mOnEnd: TsDelegate<() => void> = new TsDelegate<() => void>();
    protected static OP: GameOperationSystem;

    ReceiveBeginPlay() { 
        console.log("[OnAction].ReceiveBeginPlay, param Num= ", this.params? this.params.Num() : "undefined" , "this = ", this.GetName());
        this.mOnEnd= new TsDelegate<() => void>();
        let OP1 = SystemManager.instance?.GetSystem(SystemEnum.GameOperationSystem);
        if(OP1) OnAction.OP = OP1;
        console.log("[OnAction].ReceiveBeginPlay, param Num= ", this.params? this.params.Num() : "undefined" , "this = ", this.GetName());
    }


    BindEnd(end: OnEnd) {
        console.log("[OnAction].BindEnd, param Num= ", this.params? this.params.Num() : "undefined" , "this = ", this.GetName());
        this.mOnEnd.Add(end.executeEnd.bind(end));        
    } 
    
    /**
     * 子类务必 super，用于执行结束回调
     */
    executeAction() {
        console.log("[OnAction].executeAction, param Num= ", this.params? this.params.Num() : "undefined" , "this = ", this.GetName());
        this.mOnEnd.Broadcast(this);
    }

    SetParams(iparams: UE.TMap<ActionType, string>, istrParams?: UE.TMap<string, string>) {
        this.params = iparams;
        console.log("[OnAction].SetParams: , param Num= ", this.params? this.params.Num() : "undefined" , "this = ", this.GetName());
        if(istrParams) this.strParams = istrParams;
    }

    paramsNum() { return this.params? this.params.Num() : 0;}
}



@BlueprintMixin(BlueprintPath.BP_OnEnd)
export class OnEnd {

    executeEnd() { 
        console.log("[OnEnd].executeEnd");
    }
    
}


// @BlueprintMixin(BlueprintPath.BP_OnEnd)
// export class OnEnd { 
//    protected mInstance: CardInstance | undefined = undefined;
//    protected static OP: GameOperationSystem;

    
//     ReceiveBeginPlay() { 

//         console.log("[OnEnd].ReceiveBeginPlay, name = ", this.GetName());
        
//     }
//     /**
//      * 重写 executeEnd 方法
//      */
//     executeEnd() {
//         console.log("[EffectTrigger].executeEnd");
//     }

//     /**
//      * @Link EffectHandler.Constructor
//      */
//     SetInstance(instance: CardInstance) { 

//         if(!OnEnd.OP && SystemManager.instance?.GetSystem(SystemEnum.GameOperationSystem)) {
//             OnEnd.OP = SystemManager.instance?.GetSystem(SystemEnum.GameOperationSystem);
//         }

//         this.mInstance = instance;
//     }
// }
























console.log("[ActionBase]:  ActionBase.ts finish");
