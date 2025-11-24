console.log("[ActionBase]:  ActionBase.ts start");
import UE, { Enum } from 'ue';
import { BlueprintPath } from '../../Path'
import { BlueprintMixin } from '../../../Utils/mixinUtils';
import { TsDelegate } from '../../../SubSystem/EventSystem';
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
    private params: Map<string, string> = new Map<string, string>();
    
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
        // this.mOnAction.Add(action.executeAction.bind(action));
        this.mOnAction.Add(action.executeAction);
        console.log("[OnTrigger][OnAction].BindAction, param Num = ", action.paramsNum(), "this = ", action.GetName(), "func = ", action.executeAction);
        
    }

    /**
     * @ref EffectHandler.Use()
     */
    executeTrigger() {
        console.log("[EffectTrigger].executeTrigger");
        this.mOnAction.Broadcast()
    }

    /**
     * 暂时不用 
     */
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
    protected params: UE.TMap<ActionType, string> | undefined = undefined;
    protected strParams: UE.TMap<string, string> | undefined = undefined;
    protected static OP: GameOperationSystem;

    ReceiveBeginPlay() { 
        console.log("[OnAction].ReceiveBeginPlay, param Num= ", this.params? this.params.Num() : 0 , "this = ", this.GetName(), "func = ", this.executeAction);
        this.mOnEnd= new TsDelegate<() => void>();
        let OP1 = SystemManager.instance?.GetSystem(SystemEnum.GameOperationSystem);
        if(OP1) OnAction.OP = OP1;
        console.log("[OnAction].ReceiveBeginPlay, param Num= ", this.params? this.params.Num() : 0 , "this = ", this.GetName(), "End func = ", this.executeAction);
    }

    BindEnd(end: OnEnd) {
        console.log("[OnAction].BindEnd, param Num= ", this.params? this.params.Num() : 0 , "this = ", this.GetName(), "func = ", this.executeAction);
        this.mOnEnd.Add(end.executeEnd);        
    } 
    
    /**
     * 子类务必 super，用于执行结束回调
     */
    executeAction = () => {
        console.log("[OnAction].executeAction");
    }

    superExecute() {
        console.log("[OnAction].executeAction, param Num= ", this.params? this.params.Num() : 0 , "this = ", this.GetName(), "func = ", this.executeAction);
        this.mOnEnd.Broadcast();
    }

    SetParams(iparams: UE.TMap<ActionType, string>, istrParams?: UE.TMap<string, string>) {
        this.params = iparams;
        console.log("[OnAction].SetParams: , param Num= ", this.params? this.params.Num() : 0 , "this = ", this.GetName(), "func = ", this.executeAction);
        if(istrParams) this.strParams = istrParams;
    }

    paramsNum() { return this.params? this.params.Num() : 0;}
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
























console.log("[ActionBase]:  ActionBase.ts finish");
