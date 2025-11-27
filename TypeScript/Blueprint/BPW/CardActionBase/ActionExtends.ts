/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-18 17:29:51
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-26 15:53:30
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\CardActionBase\ActionExtends.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

console.log("[ActionExtends].head");
import UE from "ue"
import  { OnAction, ActionName, ActionType, } from "../CardActionBase/ActionBase";
import { BlueprintMixin } from '../../../Utils/mixinUtils';
import { BlueprintPath } from "../../Path";

console.log("[ActionExtends].StartMixin");

/**
 * 添加标签计数，全局机制
 * @description Tag_TagName, Count 
 */
@BlueprintMixin(BlueprintPath.print1)
class print1 extends OnAction {

    executeAction() {
        console.log("[ActionExecute].print1");
    }

}


@BlueprintMixin(BlueprintPath.AddTagCount)
class AddTagCount extends OnAction { 

    executeAction() {
        if(!this.strParams) return;
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


    SetParams(iparams: UE.TMap<ActionType, string>, istrParams?: UE.TMap<string, string>): void {
        super.SetParams(iparams, istrParams);
        if(!this.params) return;
        console.log("[OnAction].CreateCardToHand.SetParams.param Num= ", this.params.Num(), "this = ", this.GetName());
    }

    executeAction() {
        if(!this.params) return;
        console.log("[OnAction].CreateCardToHand.executeAction.param Num= ", this.params.Num(), "this = ", this.GetName());
        for(const param of this.params)
        {
            console.log("[OnAction].CreateCardToHand.executeAction.param = ", param[0]);
            
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

    executeAction() {
        if(!this.params) return;
        for(const param of this.params) {
            if(param[0] === ActionName.DealDamage) {
            OnAction.OP.DealDamage(param[1]);
            }
        }
        super.executeAction();
    }

}

console.log("[ActionExtends].End");