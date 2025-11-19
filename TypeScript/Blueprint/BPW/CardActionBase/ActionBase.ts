console.log("[7758]:  ActionBase.ts start");
import UE from 'ue';
import { BlueprintPath } from '../../Path'
import { BlueprintMixin } from '../../../Utils/mixinUtils';
import { TsDelegate } from '../../../SubSystem/EventSystem';

export interface OnTrigger extends UE.Game.Blueprint.CardAction.OnTrigger.BP_OnTrigger.BP_OnTrigger_C {}
export interface OnAction extends UE.Game.Blueprint.CardAction.OnAction.BP_OnAction.BP_OnAction_C {}
export interface OnEnd extends UE.Game.Blueprint.CardAction.OnEnd.BP_OnEnd.BP_OnEnd_C {}


@BlueprintMixin(BlueprintPath.BP_OnTrigger)
export class OnTrigger { 

    private mOnAction: TsDelegate<() => void> = new TsDelegate<() => void>();
    private params: Map<string, string> = new Map<string, string>();
    
    ReceiveBeginPlay() : void {
        console.log("[EffectTrigger].ReceiveBeginPlay");
        this.mOnAction= new TsDelegate<() => void>();
    }

    BindAction(action: OnAction) {
        console.log("[EffectTrigger].BindAction");
        this.mOnAction.Add(action.executeAction);
    }

    executeTrigger() {
        console.log("[EffectTrigger].executeTrigger");
        this.mOnAction.Broadcast()
    }

    SetParams(iparams: Map<string, string>) {
        this.params = iparams;
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
    private params: Map<string, string> = new Map<string, string>();

    ReceiveBeginPlay() { 
        console.log("[EffectTrigger].ReceiveBeginPlay");
        this.mOnEnd= new TsDelegate<() => void>();
    }

    BindEnd(end: OnEnd) {
        console.log("[EffectTrigger].BindEnd");
        this.mOnEnd.Add(end.executeEnd);        
    } 
    
    executeAction() { 
        console.log("[ActionExecute].executeAction");

    }

    SetParams(iparams: Map<string, string>) {
        this.params = iparams;
    }
}




@BlueprintMixin(BlueprintPath.BP_OnEnd)
export class OnEnd { 
    
    private params: Map<string, string> = new Map<string, string>();

    
    executeEnd() {
        console.log("[EffectTrigger].executeEnd");
    }

    SetParams(iparams: Map<string, string>) {
        this.params = iparams;
    }

}
























console.log("[7758]:  ActionBase.ts finish");
