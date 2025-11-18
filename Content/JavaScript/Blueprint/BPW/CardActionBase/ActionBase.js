"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnEnd = exports.OnAction = exports.OnTrigger = void 0;
console.log("[7758]:  ActionBase.ts start");
const Path_1 = require("../../Path");
const mixinUtils_1 = require("../../../Utils/mixinUtils");
const EventSystem_1 = require("../../../SubSystem/EventSystem");
let OnTrigger = class OnTrigger {
    mOnAction = new EventSystem_1.TsDelegate();
    params = new Map();
    BindAction(action) {
        console.log("[EffectTrigger].BindAction");
        this.mOnAction = new EventSystem_1.TsDelegate();
        this.mOnAction.Add(action.executeAction);
    }
    executeTrigger() {
        console.log("[EffectTrigger].executeTrigger");
        this.mOnAction.Broadcast();
    }
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
    mOnEnd = new EventSystem_1.TsDelegate();
    params = new Map();
    BindEnd(end) {
        console.log("[EffectTrigger].BindEnd");
        this.mOnEnd = new EventSystem_1.TsDelegate();
        this.mOnEnd.Add(end.executeEnd);
    }
    executeAction() {
        console.log("[EffectTrigger].executeAction");
    }
    SetParams(iparams) {
        this.params = iparams;
    }
};
exports.OnAction = OnAction;
exports.OnAction = OnAction = __decorate([
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
console.log("[7758]:  ActionBase.ts finish");
//# sourceMappingURL=ActionBase.js.map