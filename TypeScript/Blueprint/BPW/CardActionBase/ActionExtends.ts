/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-18 17:29:51
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-18 17:38:40
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\CardActionBase\ActionExtends.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { OnAction } from "../CardActionBase/ActionBase";
import { BlueprintMixin } from '../../../Utils/mixinUtils';
import { BlueprintPaletteFavorites } from "ue";
import { BlueprintPath } from "../../Path";


@BlueprintMixin(BlueprintPath.print1)
class print1 extends OnAction {

    executeAction(): void {
        console.log("[EffectTrigger].print1");
    }

}

@BlueprintMixin(BlueprintPath.print2)
class print2 extends OnAction { 

    executeAction(): void {
        console.log("[EffectTrigger].print2");
    }

}