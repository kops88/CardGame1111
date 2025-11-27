"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-26 15:54:42
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-27 10:06:17
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\CardActionBase\EndExtends.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[EndExtends].head");
const ue_1 = __importDefault(require("ue"));
const puerts_1 = require("puerts");
const ActionBase_1 = require("../CardActionBase/ActionBase");
const Path_1 = require("../../Path");
console.log("[EndExtends].StartMixin");
const uclass1 = ue_1.default.Class.Load(Path_1.BlueprintPath.endprint);
const jsclass1 = puerts_1.blueprint.tojs(uclass1);
const uclass_CommonDestroy = ue_1.default.Class.Load(Path_1.BlueprintPath.CommonDestroy);
const jsclass_CommonDestroy = puerts_1.blueprint.tojs(uclass_CommonDestroy);
// BlueprintMixin(BlueprintPath.CommonDestroy)
class CommonDestroy extends ActionBase_1.OnEnd {
    executeEnd() {
        console.log("[OnEnd].CommonDestroy.executeEnd, instance = ", this.myInstance);
        if (this.myInstance) {
            ActionBase_1.OnEnd.OP.DestroyHandCard(this.myInstance);
        }
    }
}
// BlueprintMixin(BlueprintPath.endprint)
class EndPrint extends ActionBase_1.OnEnd {
    executeEnd() {
        console.log("[EndExtends].EndPrint.executeEnd, 7758");
    }
}
puerts_1.blueprint.mixin(jsclass1, EndPrint);
puerts_1.blueprint.mixin(jsclass_CommonDestroy, CommonDestroy);
console.log("[EndExtends].Finish");
//# sourceMappingURL=EndExtends.js.map