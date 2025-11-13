/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-07 10:10:18
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-11 10:34:29
 * @FilePath: \CardGame1102\TypeScript\Blueprint\BPW\CardInstance\BPW_DragWidget.ts
 * @Description: 卡片的img、拖拽等功能，不负责数据和战斗逻辑。
 */
console.log("[BPW_SampleWidget].Start")
import UE from 'ue';
import { blueprint, load } from 'puerts';
import { BlueprintPath } from '../../Path';
import path = UE.Game.Blueprint.BPW.CardInstance;
import { TsDelegate } from '../../../SubSystem/EventSystem';

console.log("[BPW_SampleWidget].uclass.loadStart")
const uclass = UE.Class.Load("/Game/Blueprint/BPW/CardInstance/BPW_SampleWidget.BPW_SampleWidget_C");
console.log("[BPW_SampleWidget].uclass.loadFinish")
const jsclass = blueprint.tojs(uclass);
console.log("[BPW_SampleWidget].jsclass.tojsFinish")



export interface SampleWidget extends path.BPW_SampleWidget.BPW_SampleWidget_C {}
export class SampleWidget{
    aaa: string = "Hello";
    OnDragPressed: TsDelegate<(card: SampleWidget) => void> = new TsDelegate<(card: SampleWidget) => void>();
    OnDragReleased: TsDelegate<(card: SampleWidget) => void> = new TsDelegate<(card: SampleWidget) => void>();
    OnMouseHover: TsDelegate<(card: SampleWidget) => void> = new TsDelegate<(card: SampleWidget) => void>();
    OnMouseUnHover: TsDelegate<(card: SampleWidget) => void> = new TsDelegate<(card: SampleWidget) => void>();

    Construct(): void {
        console.log("[SampleWidget].SampleWidget.Construct");
        console.log("[SampleWidget].SampleWidget.Construct  this.Button =", this.Button);
        this.OnDragPressed = new TsDelegate<(card: SampleWidget) => void>();
        this.OnDragReleased = new TsDelegate<(card: SampleWidget) => void>();
        this.OnMouseHover = new TsDelegate<(card: SampleWidget) => void>();
        this.OnMouseUnHover = new TsDelegate<(card: SampleWidget) => void>();
        console.log("[SampleWidget].SampleWidget.Construct  OnDragPressed =", this.OnDragPressed);
        console.log("[SampleWidget].SampleWidget.Construct  OnDragReleased =", this.OnDragReleased);
        this.RegisterEvent();
    }

    private RegisterEvent(): void{

        console.log("[SampleWidget].SampleWidget.RegisterEvent; Button = ", this.Button);
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

blueprint.mixin(jsclass, SampleWidget);
console.log("[BPW_SampleWidget].Finish")