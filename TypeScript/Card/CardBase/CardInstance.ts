/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-10 18:08:19
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-18 10:26:26
 * @FilePath: \CardGame1102\TypeScript\Blueprint\BPW\CardInstance\CardInstance.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log('[CardInstance] head');
import UE from 'ue';
import { BlueprintPath } from '../../Path';
import { SampleWidget } from './BPW_SampleWidget';
import { SystemManager } from '../../SubSystem/SystemManager';
import { EffectHandler } from './EffectHandler';

console.log('[CardInstance] start');


export type CardDef = UE.Game.Blueprint.Table.CardDef.CardDef;

export class CardInstance {
    /** 卡牌定义 */ 
    private Def: CardDef;
    /** 处理图像、移动 */ 
    private SampleWidget: SampleWidget | undefined = undefined;
    /** 处理效果 */ 
    private EffectHandler: EffectHandler | undefined = undefined;

    constructor(def: CardDef) {
        this.Def = def;
        this.EffectHandler = new EffectHandler(this.Def, this);
    }

    /**
     * @description 创建 SampleWidget，并给 SampleWidget 做初始化。
     */
    InitSample() {
        if(!this.Def) {
            console.log("[CardInstance].InitSample:Error: CardDef is ", this.Def);
            return;
        }

        //创建 空白SampleWidget。
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

        // 给 SampleWidget 赋值 def
        this.SampleWidget?.Init(this.Def);
    }

    /**
     * 获取 SampleWidget 组件，用于动画、移动。
     * @example BP_CardMovementComponent.AddCard
     */
    GetSample() {
        return this.SampleWidget;
    }

    Use() { 
        console.log("[CardInstance].Use , cid = ", this.Def.cid);
        this.EffectHandler?.Use();
    }

    Destroy() { 
        this.SampleWidget?.RemoveFromParent();
    }

    GetParamsNum() { 
        return this.EffectHandler?.GetParamsNum();
    }
}



console.log('[CardInstance] finish');
