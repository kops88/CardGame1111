/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-10 18:08:19
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-12 11:33:49
 * @FilePath: \CardGame1102\TypeScript\Blueprint\BPW\CardInstance\CardInstance.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import UE from 'ue';
import { BlueprintPath } from '../../Path';
import { blueprint } from 'puerts';
// const uclass = UE.Class.Load(BlueprintPath.CardDef);
// const jsclass = blueprint.tojs(uclass);


export class CardDef extends UE.Game.Blueprint.Table.CardDef.CardDef {};

class CardInstance {
    private cardDef: CardDef;

    constructor(def: CardDef) {
        this.cardDef = def;
    }

    






}

