/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-07 10:10:18
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-18 10:31:08
 * @FilePath: \CardGame1102\TypeScript\Blueprint\BPW\CardInstance\BPW_DragWidget.ts
 * @Description: 卡片的img、拖拽等功能，不负责数据和战斗逻辑。
 */
console.log("[BPW_SampleWidget] head")
import UE from 'ue';
import { blueprint, load } from 'puerts';
import { BlueprintPath } from '../../Path';
import { BlueprintMixin } from '../../Utils/mixinUtils';
import path = UE.Game.Blueprint.BPW.CardInstance;
import { TsDelegate } from '../../SubSystem/EventSystem';
import { CardDef } from './CardInstance';

console.log("[BPW_SampleWidget].Start")




export interface SampleWidget extends path.BPW_SampleWidget.BPW_SampleWidget_C {}
@BlueprintMixin(BlueprintPath.BPW_SampleWidget)
export class SampleWidget{
    aaa: string = "Hello";
    OnDragPressed: TsDelegate<(card: SampleWidget) => void> = new TsDelegate<(card: SampleWidget) => void>();
    OnDragReleased: TsDelegate<(card: SampleWidget) => void> = new TsDelegate<(card: SampleWidget) => void>();
    OnMouseHover: TsDelegate<(card: SampleWidget) => void> = new TsDelegate<(card: SampleWidget) => void>();
    OnMouseUnHover: TsDelegate<(card: SampleWidget) => void> = new TsDelegate<(card: SampleWidget) => void>();

    Construct(): void {
        this.OnDragPressed = new TsDelegate<(card: SampleWidget) => void>();
        this.OnDragReleased = new TsDelegate<(card: SampleWidget) => void>();
        this.OnMouseHover = new TsDelegate<(card: SampleWidget) => void>();
        this.OnMouseUnHover = new TsDelegate<(card: SampleWidget) => void>();
        console.log("[SampleWidget].SampleWidget.Construct  OnDragPressed =", this.OnDragPressed);
        console.log("[SampleWidget].SampleWidget.Construct  OnDragReleased =", this.OnDragReleased);
        this.RegisterEvent();
    }

    /**
     *@description 设置Sample的img 
     */
    Init(def: CardDef) {
        if(!def.img){
            console.log("[SampleWidget].Init:Error: img is null, cid = ", def.cid);
            return;
        }
        this.img.SetBrushFromSoftTexture(def.img);
        // console.log("[SampleWidget].Init:Success, cid = ", def.cid, "def.img = ", def.img.Get().GetName()); //GetName 在每次打开UE 的第一次运行会报错
    }

    /**
     * @description 绑定 Button 的按压和松开到 OnDragPressed 和 OnDragReleased 事件
     */
    private RegisterEvent(): void{
        this.Button.OnPressed.Add(() => {
            this.OnDragPressed.Broadcast(this);
        });

        this.Button.OnReleased.Add(() =>{
            this.OnDragReleased.Broadcast(this);
        });
    }

    OnMouseEnter(MyGeometry: UE.Geometry, MouseEvent: UE.PointerEvent) : void{
        this.OnMouseHover.Broadcast(this);
    }

    OnMouseLeave(MouseEvent: UE.PointerEvent) : void{
        this.OnMouseUnHover.Broadcast(this);
    }
}


console.log("[BPW_SampleWidget].Finish")