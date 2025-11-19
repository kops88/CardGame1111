"use strict";
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-18 17:29:51
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-19 11:54:47
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\CardActionBase\ActionExtends.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("[ActionExtends].Start");
const ActionBase_1 = require("../CardActionBase/ActionBase");
const mixinUtils_1 = require("../../../Utils/mixinUtils");
const Path_1 = require("../../Path");
let print1 = class print1 extends ActionBase_1.OnAction {
    executeAction() {
        console.log("[ActionExecute].print1");
    }
};
print1 = __decorate([
    (0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.print1)
], print1);
let print2 = class print2 extends ActionBase_1.OnAction {
    executeAction() {
        console.log("[ActionExecute].print2");
    }
};
print2 = __decorate([
    (0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.print2)
], print2);
console.log("[ActionExtends].End");
//# sourceMappingURL=ActionExtends.js.map