/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-26 15:54:42
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-27 10:06:17
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\CardActionBase\EndExtends.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[EndExtends].head");
import UE from "ue";
import { blueprint } from "puerts";
import  { OnEnd } from "../CardActionBase/ActionBase";
import { BlueprintMixin } from '../../../Utils/mixinUtils';
import { BlueprintPath } from "../../Path";

console.log("[EndExtends].StartMixin");

const uclass1 = UE.Class.Load(BlueprintPath.endprint);
const jsclass1 = blueprint.tojs(uclass1);
const uclass_CommonDestroy = UE.Class.Load(BlueprintPath.CommonDestroy);
const jsclass_CommonDestroy = blueprint.tojs(uclass_CommonDestroy);

// BlueprintMixin(BlueprintPath.CommonDestroy)
class CommonDestroy extends OnEnd { 

    executeEnd() {
        console.log("[OnEnd].CommonDestroy.executeEnd, instance = ", this.myInstance);
        if(this.myInstance) {
            OnEnd.OP.DestroyHandCard(this.myInstance)
        }
    }
}



// BlueprintMixin(BlueprintPath.endprint)
class EndPrint extends OnEnd { 
 
    executeEnd() {
        console.log("[EndExtends].EndPrint.executeEnd, 7758");
    }

}                    




blueprint.mixin(jsclass1, EndPrint);
blueprint.mixin(jsclass_CommonDestroy, CommonDestroy)


console.log("[EndExtends].Finish");


