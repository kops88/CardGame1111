"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-26 15:54:42
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-26 17:43:58
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\CardActionBase\EndExtends.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[EndExtends].head");
const ActionBase_1 = require("../CardActionBase/ActionBase");
const mixinUtils_1 = require("../../../Utils/mixinUtils");
const Path_1 = require("../../Path");
console.log("[EndExtends].StartMixin");
(0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.CommonDestroy);
class CommonDestroy extends ActionBase_1.OnEnd {
    executeEnd() {
        console.log("[EndExtends].CommonDestroy.executeEnd");
        // if(this.mInstance) {
        // OnEnd.OP.DestroyCard(this.mInstance)
        // }
        super.executeEnd();
    }
}
// BlueprintMixin(BlueprintPath.endprint)
class EndPrint extends ActionBase_1.OnEnd {
    executeEnd() {
        console.log("[EndExtends].EndPrint.executeEnd, 7758");
        super.executeEnd();
    }
}
console.log("[EndExtends].Finish");
//# sourceMappingURL=EndExtends.js.map