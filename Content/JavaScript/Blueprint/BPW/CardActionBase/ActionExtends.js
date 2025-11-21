"use strict";
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-18 17:29:51
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-21 17:54:17
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
console.log("[ActionExtends].head");
const ActionBase_1 = require("../CardActionBase/ActionBase");
const mixinUtils_1 = require("../../../Utils/mixinUtils");
const Path_1 = require("../../Path");
console.log("[ActionExtends].StartMixin");
/**
 * 添加标签计数，全局机制
 * @description Tag_TagName, Count
 */
let print1 = class print1 extends ActionBase_1.OnAction {
    executeAction() {
        console.log("[ActionExecute].print1");
    }
};
print1 = __decorate([
    (0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.print1)
], print1);
let AddTagCount = class AddTagCount extends ActionBase_1.OnAction {
    executeAction() {
        for (const param of this.strParams) {
            const keyStr = param[0];
            const valueStr = parseInt(param[1]);
            if (keyStr.startsWith("Tag_")) {
                const tag = keyStr.substring(4);
                ActionBase_1.OnAction.OP.GetCoreCard().AddTagCount(tag, valueStr);
            }
        }
        super.executeAction();
    }
};
AddTagCount = __decorate([
    (0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.AddTagCount)
], AddTagCount);
/**
//  * 创建卡牌到手牌
//  * @description CreateCard, cid
//  */
let CreateCardToHand = class CreateCardToHand extends ActionBase_1.OnAction {
    executeAction() {
        console.log("[ActionExecute].CreateCardToHand.params = ", this.params.GetKey(0));
        for (const param of this.params) {
            if (param[0] === ActionBase_1.ActionName.CreateCard) {
                ActionBase_1.OnAction.OP.DrawCardByCid(param[1]);
            }
        }
        super.executeAction();
    }
};
CreateCardToHand = __decorate([
    (0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.CreateCardToHand)
], CreateCardToHand);
/**
 * 造成伤害
 * @description DealDamage, Count
 * @Notice 需要在OP.DealDamage()中，添加伤害的逻辑
 */
let DealDamage = class DealDamage extends ActionBase_1.OnAction {
    executeAction() {
        for (const param of this.params) {
            if (param[0] === ActionBase_1.ActionName.DealDamage) {
                ActionBase_1.OnAction.OP.DealDamage(param[1]);
            }
        }
    }
};
DealDamage = __decorate([
    (0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.DealDamage)
], DealDamage);
console.log("[ActionExtends].End");
//# sourceMappingURL=ActionExtends.js.map