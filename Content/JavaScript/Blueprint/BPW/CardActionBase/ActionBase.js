"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var OnAction_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnEnd = exports.OnAction = exports.OnTrigger = exports.ActionName = void 0;
console.log("[ActionBase]:  ActionBase.ts start");
const ue_1 = __importDefault(require("ue"));
const Path_1 = require("../../Path");
const mixinUtils_1 = require("../../../Utils/mixinUtils");
const EventSystem_1 = require("../../../SubSystem/EventSystem");
const SystemManager_1 = require("../../../SubSystem/SystemManager");
const SystemName_1 = require("../../../SubSystem/SystemName");
exports.ActionName = ue_1.default.Game.Blueprint.CardAction.ActionName.ActionName;
let OnTrigger = class OnTrigger {
    mOnAction = new EventSystem_1.TsDelegate();
    params = new Map();
    ReceiveBeginPlay() {
        console.log("[EffectTrigger].ReceiveBeginPlay");
        this.mOnAction = new EventSystem_1.TsDelegate();
    }
    /**
     * 初始化调用，绑定对应的 action
     * @rule 一组effect，绑定所有action
     */
    BindAction(action) {
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
        this.mOnAction.Broadcast();
    }
    /**
     * 暂时不用
     */
    SetParams(iparams) {
        this.params = iparams;
    }
};
exports.OnTrigger = OnTrigger;
exports.OnTrigger = OnTrigger = __decorate([
    (0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.BP_OnTrigger)
], OnTrigger);
/**
 * 效果基类
 * @function 重写 executeAction 方法
 * @description log 使用 EffectTrigger
 */
let OnAction = class OnAction {
    static { OnAction_1 = this; }
    mOnEnd = new EventSystem_1.TsDelegate();
    params = undefined;
    strParams = undefined;
    static OP;
    ReceiveBeginPlay() {
        console.log("[OnAction].ReceiveBeginPlay, param Num= ", this.params ? this.params.Num() : 0, "this = ", this.GetName(), "func = ", this.executeAction);
        this.mOnEnd = new EventSystem_1.TsDelegate();
        let OP1 = SystemManager_1.SystemManager.instance?.GetSystem(SystemName_1.SystemEnum.GameOperationSystem);
        if (OP1)
            OnAction_1.OP = OP1;
        console.log("[OnAction].ReceiveBeginPlay, param Num= ", this.params ? this.params.Num() : 0, "this = ", this.GetName(), "End func = ", this.executeAction);
    }
    BindEnd(end) {
        console.log("[OnAction].BindEnd, param Num= ", this.params ? this.params.Num() : 0, "this = ", this.GetName(), "func = ", this.executeAction);
        this.mOnEnd.Add(end.executeEnd);
    }
    /**
     * 子类务必 super，用于执行结束回调
     */
    executeAction = () => {
        console.log("[OnAction].executeAction");
    };
    superExecute() {
        console.log("[OnAction].executeAction, param Num= ", this.params ? this.params.Num() : 0, "this = ", this.GetName(), "func = ", this.executeAction);
        this.mOnEnd.Broadcast();
    }
    SetParams(iparams, istrParams) {
        this.params = iparams;
        console.log("[OnAction].SetParams: , param Num= ", this.params ? this.params.Num() : 0, "this = ", this.GetName(), "func = ", this.executeAction);
        if (istrParams)
            this.strParams = istrParams;
    }
    paramsNum() { return this.params ? this.params.Num() : 0; }
};
exports.OnAction = OnAction;
exports.OnAction = OnAction = OnAction_1 = __decorate([
    (0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.BP_OnAction)
], OnAction);
let OnEnd = class OnEnd {
    params = new Map();
    executeEnd() {
        console.log("[EffectTrigger].executeEnd");
    }
    SetParams(iparams) {
        this.params = iparams;
    }
};
exports.OnEnd = OnEnd;
exports.OnEnd = OnEnd = __decorate([
    (0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.BP_OnEnd)
], OnEnd);
console.log("[ActionBase]:  ActionBase.ts finish");
//# sourceMappingURL=ActionBase.js.map