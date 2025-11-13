/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-10 18:08:19
 * @LastEditors: v_lyyulliu
 * @LastEditTime: 2025-11-13 17:18:36
 * @FilePath: \CardGame1102\TypeScript\Blueprint\BPW\CardInstance\CardInstance.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log('[CardInstance] head');
import UE from 'ue';
import { BlueprintPath } from '../../Path';
import { SampleWidget } from './BPW_SampleWidget';
import { SystemManager } from '../../../SubSystem/SystemManager';
// const uclass = UE.Class.Load(BlueprintPath.CardDef);
// const jsclass = blueprint.tojs(uclass);
console.log('[CardInstance] start');

// export class CardDef extends UE.Game.Blueprint.Table.CardDef.CardDef{
//     constructor() {
//         super();
//     }
// }

export type CardDef = UE.Game.Blueprint.Table.CardDef.CardDef;

export class CardInstance {
    private Def: CardDef;
    private SampleWidget: SampleWidget | undefined = undefined;

    constructor(def: CardDef) {
        this.Def = def;
    }

    /**
     * @description 创建 SampleWidget，并给 SampleWidget 做初始化。
     */
    InitSample() {
        if(!this.Def) {
            console.log("[CardInstance].InitSample:Error: CardDef is ", this.Def);
            return;
        }
        this.CreateSample();
        this.SampleWidget?.Init(this.Def);
    }

    /**
     * @example BP_CardMovementComponent.AddCard
     */
    GetSample() {
        return this.SampleWidget;
    }
    private CreateSample() {
        const CardClass = UE.Class.Load(BlueprintPath.BPW_SampleWidget);
        if (CardClass) {
            this.SampleWidget = UE.WidgetBlueprintLibrary.Create(SystemManager.GetWorld(),
                CardClass,
                UE.GameplayStatics.GetPlayerController(SystemManager.GetWorld(), 0)
            ) as SampleWidget;
            console.log("[CardInstance] Created SampleWidget:", this.SampleWidget);
        }
        else {
            console.log("[CardInstance].CreateSample: No CardClass");
        }
    }

}

console.log('[CardInstance] finish');
