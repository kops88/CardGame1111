/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-18 17:29:51
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-21 17:54:17
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\CardActionBase\ActionExtends.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

console.log("[ActionExtends].head");
import UE from "ue"
import  { OnAction, ActionName, } from "../CardActionBase/ActionBase";
import { BlueprintMixin } from '../../../Utils/mixinUtils';
import { BlueprintPath } from "../../Path";

console.log("[ActionExtends].StartMixin");

/**
 * 添加标签计数，全局机制
 * @description Tag_TagName, Count 
 */

@BlueprintMixin(BlueprintPath.print1)
class print1 extends OnAction {

    executeAction(): void {
        console.log("[ActionExecute].print1");
    }

}


@BlueprintMixin(BlueprintPath.AddTagCount)
class AddTagCount extends OnAction { 

    executeAction(): void {
        for( const param of this.strParams) {
            
            const keyStr = param[0];
            const valueStr: number = parseInt(param[1]);
            if(keyStr.startsWith("Tag_")) {
                const tag = keyStr.substring(4);
                OnAction.OP.GetCoreCard().AddTagCount(tag, valueStr);
            }
        }
        super.executeAction();
    }
}

/**
//  * 创建卡牌到手牌
//  * @description CreateCard, cid
//  */
@BlueprintMixin(BlueprintPath.CreateCardToHand)
class CreateCardToHand extends OnAction {

    executeAction(): void {
        console.log("[ActionExecute].CreateCardToHand.params = ", this.params.GetKey(0));
        for(const param of this.params)
        {
            if(param[0] === ActionName.CreateCard) {
                OnAction.OP.DrawCardByCid(param[1]);
            }
        }
        super.executeAction();
    }
}

/**
 * 造成伤害
 * @description DealDamage, Count
 * @Notice 需要在OP.DealDamage()中，添加伤害的逻辑
 */
@BlueprintMixin(BlueprintPath.DealDamage)
class DealDamage extends OnAction {

    executeAction(): void {
        for(const param of this.params) {
            if(param[0] === ActionName.DealDamage) {
            OnAction.OP.DealDamage(param[1]);
            }
        }
    }

}






console.log("[ActionExtends].End");