console.log("[CardMovementComponent].Start")
import UE from 'ue';
import { blueprint } from 'puerts';
import { BlueprintPath } from '../../Path';
// import "Blueprint/BPW/CardInstance/BPW_CardInstance";
import { SampleWidget  } from './BPW_SampleWidget';



const uComponent = UE.Class.Load(BlueprintPath.BP_CardMovementComponent);
const jsComponent = blueprint.tojs(uComponent);


export interface BP_CardMovementComponent extends UE.Game.Blueprint.BPW.Page.BP_CardMovementComponentt.BP_CardMovementComponentt_C {}
export class BP_CardMovementComponent {

    /** 是否正在拖拽*/
    private bDragging: boolean = false;
    /** 是否开始插值 */
    private bStartInterp: boolean = false;
    /** 拖拽的卡牌 */
    private DraggedCard: UE.UserWidget | null = null;
    /** CardSample*/
    private SampleList: SampleWidget[] = [];
    /** 鼠标点击卡牌时的偏移 */
    private DragOffset: UE.Vector2D = new UE.Vector2D(0, 0);

    ReceiveBeginPlay() : void {
        console.log("[CardMovementComponent].ReceiveBeginPlay");
        this.InitData();
    }

    ReceiveTick(DeltaSeconds: number) : void {
        this.ProcessDragCard();
        this.ProcessInterp(DeltaSeconds);
    }

    /**
     * @description 初始化数据
     */
    private InitData(): void { 
        this.SampleList = [];
        this.DragOffset = new UE.Vector2D(0, 0);
        this.bStartInterp = false;
        this.TargetPos.Add(new UE.Vector2D(0, 0));
        console.log("[CardMovementComponent].InitData, bStartInterp = ", this.bStartInterp);
    }

    /**
     * @description 处理鼠标拖拽卡牌, Tick
     */
    private ProcessDragCard() {
        if(this.DraggedCard) {
            let MousePos: UE.Vector2D = UE.WidgetLayoutLibrary.GetMousePositionOnViewport(this.GetWorld())
        
            let transform = new UE.WidgetTransform();
            transform.Translation.X = MousePos.X - this.DragOffset.X;
            transform.Translation.Y = MousePos.Y - this.DragOffset.Y;
            this.DraggedCard.SetRenderTransform(transform);
        }
    }

    /**
     * @description 处理插值，Tick
     */
    private ProcessInterp(DeltaSeconds: number) {
        if(this.bStartInterp 
            && this.SampleList.length > 0 
            && this.TargetPos.Num() === this.SampleList.length
        ) {
            console.log("[CardMovementComponent].ReceiveTick, bStartInterp = true");
            for(let idx = 0; idx < this.SampleList.length; idx++) {
                console.log("[CardMovementComponent].ReceiveTick, idx = ", idx);
                if(this.bDragging && this.DraggedCard === this.SampleList[idx]) {
                    continue;
                }
                let OriginPos = this.SampleList[idx].RenderTransform.Translation;
                let TargetPos = UE.KismetMathLibrary.Vector2DInterpTo(OriginPos, this.TargetPos.Get(idx), DeltaSeconds, 10);
                let transform = new UE.WidgetTransform();
                transform.Translation.X = TargetPos.X;
                transform.Translation.Y = TargetPos.Y;
                this.SampleList[idx].SetRenderTransform(transform);
                
                // 判断是否移动完成，如果完成，则设置bStartInterp = false
                let length = this.SampleList.length;
                if(this.JudgeFinishInterp()) {
                    this.bStartInterp = false;
                }
            }
        }
    }

    /**
     * @description 判断插值完成
     */
    private JudgeFinishInterp(): boolean {
        let translation = new UE.Vector2D(0, 0);
        let target = new UE.Vector2D(0, 0);
        if(this.SampleList.length !== this.TargetPos.Num())
            return false;
        for(let idx = 0; idx < this.SampleList.length; idx++){
            translation = this.SampleList[idx].RenderTransform.Translation;
            target = this.TargetPos.Get(idx);
            const DiffCondition: boolean = Math.abs(translation.X - target.X) < 0.01 && Math.abs(translation.Y - target.Y) < 0.01;
            if(!DiffCondition) {
                return false;
            }
        }
        return true;
    }

    /**
     * @description 创建 SampleWidget，添加到 SampleList，设置位置，开始插值
     */
    AddCard(): void {
        console.log("[CardMovementComponent].AddCardSampleAndMoveCardToHand");
        const CardClass = UE.Class.Load(BlueprintPath.BPW_SampleWidget);
        if (CardClass) {
            let mSampleWidget = UE.WidgetBlueprintLibrary.Create(this.GetWorld(),
                CardClass,
                UE.GameplayStatics.GetPlayerController(this.GetWorld(), 0)
            ) as SampleWidget;
            console.log("Created SampleWidget:", mSampleWidget);
            mSampleWidget.AddToViewport();
            this.RegisterEvents(mSampleWidget);
            this.SampleList.push(mSampleWidget);

            let transform = new UE.WidgetTransform();
            const ViewPortSize: UE.Vector2D = UE.WidgetLayoutLibrary.GetViewportSize(this);
            const WindowCenter = new UE.Vector2D(ViewPortSize.X / 2, ViewPortSize.Y / 2);
            transform.Translation.X = 200;
            transform.Translation.Y = 2 * WindowCenter.Y - this.High;
            mSampleWidget.SetRenderTransform(transform);
            console.log("[CardMovementComponent].AddCardSampleAndMoveCardToHand, mSampleWidget.SetRenderTransform");

            // 计算目标位置
            this.TargetPos.Empty();
            for(let idx = 0; idx < this.SampleList.length; idx++){
                let pos = new UE.Vector2D(this.CalculateCardPosByIdx(idx), 2 * WindowCenter.Y - this.High);
                this.TargetPos.Add(pos);
            }
        }
        this.StartInterp();
    }

    /**
     * @description 注册点击、悬挂事件
     * @param card 
     */
    private RegisterEvents(card: SampleWidget): void {
        // 注册点击卡牌开始拖拽事件
        console.log("[CardMovementComponent].RegisterEvents");
        console.log(card.aaa);
        card.OnDragPressed.Add(
            (Incard: SampleWidget) => {
                this.OnDragPressed(Incard);
            }
        );

        card.OnDragReleased.Add(
            (Incard: SampleWidget) => {
                this.OnDragReleased(Incard);
            }
        );

        card.OnMouseHover.Add(
            (Incard: SampleWidget) => {
                this.OnMouseHover(Incard);
            }
        );

        card.OnMouseUnHover.Add(
            (Incard: SampleWidget) => {
                this.OnMouseHoverEnd(Incard);
            }
        );
    }

    /**
     * @description 按下后，设置 bDragging 和 DraggedCard 以及 DragOffset，用于 tick 拖拽。 
     * @param card 点击的 CardSample
     */
    private OnDragPressed(card: UE.UserWidget): void {
        console.log("[CardMovementComponent].OnDragPressed, incard = ", card);
        this.bDragging = true;
        this.DraggedCard = card;

        let MousePos: UE.Vector2D = UE.WidgetLayoutLibrary.GetMousePositionOnViewport(this.GetWorld())  
        const DragOffsetX = MousePos.X - this.DraggedCard.RenderTransform.Translation.X; 
        const DragOffsetY = MousePos.Y - this.DraggedCard.RenderTransform.Translation.Y;
        this.DragOffset.X = DragOffsetX;
        this.DragOffset.Y = DragOffsetY;
    }

    /**
     * @description 松开后，设置 bDragging 和 DraggedCard，用于 tick 拖拽。 
     * @param card 点击的 CardSample
     */
    private OnDragReleased(card: UE.UserWidget): void {
        console.log("[CardMovementComponent].OnDragReleased, incard = ", card);
        this.bDragging = false;
        if (this.DraggedCard !== card) {
            console.log("[CardMovementComponent][Error].OnDragReleased: Mismatched card");
        }
        this.DraggedCard = null;
        this.DragOffset = new UE.Vector2D(0, 0);
    }

    /**
     * @description 鼠标悬停时，设置 TargetPos ，用于 tick 移动。
     * @param card 
     */
    private OnMouseHover(card: UE.UserWidget): void {
        console.log("[CardMovementComponent].OnMouseHover, incard = ", card);
        const ViewPortSize: UE.Vector2D = UE.WidgetLayoutLibrary.GetViewportSize(this);
        const WindowCenter = new UE.Vector2D(ViewPortSize.X / 2, ViewPortSize.Y / 2);

        this.TargetPos.Empty();
        const HoverIdx = this.SampleList.indexOf(card as SampleWidget);

        // 保证 TargetPos 足够多的元素。
        while(this.TargetPos.Num() < this.SampleList.length) {
            this.TargetPos.Add(new UE.Vector2D(0, 0));
        }

        console.log("[CardMovementComponent].OnMouseHover, HoverIdx = ", HoverIdx);

        for(let idx = 0; idx < this.SampleList.length; idx++) {
            if(idx === HoverIdx) {
                let pos = new UE.Vector2D(this.CalculateCardPosByIdx(idx), 2 * WindowCenter.Y - this.High - 50);
                this.TargetPos.Set(idx, pos);
                continue;
            }
            const Direction: number = idx > HoverIdx ? 1 : -1;
            // -50 是向上的偏移距离
            let pos = new UE.Vector2D(this.CalculateCardPosByIdx(idx) + this.HoverOffsetX * Direction, 2 * WindowCenter.Y - this.High);
            this.TargetPos.Set(idx, pos);
        }
        if(!this.bDragging){
            this.StartInterp();
        }
        console.log("[CardMovementComponent].OnMouseHover, End"); 
    }

    private OnMouseHoverEnd(card: UE.UserWidget): void {

        console.log("[CardMovementComponent].OnMouseUnHover, incard = ", card);
        const ViewPortSize: UE.Vector2D = UE.WidgetLayoutLibrary.GetViewportSize(this);
        const WindowCenter = new UE.Vector2D(ViewPortSize.X / 2, ViewPortSize.Y / 2);
        this.TargetPos.Empty();

        // 保证 TargetPos 足够多的元素。
        while(this.TargetPos.Num() < this.SampleList.length) {
            this.TargetPos.Add(new UE.Vector2D(0, 0));
        }   

        for(let idx = 0; idx < this.SampleList.length; idx++) {
            let pos = new UE.Vector2D(this.CalculateCardPosByIdx(idx), 2 * WindowCenter.Y - this.High);
            this.TargetPos.Set(idx, pos);
        }
        if(!this.bDragging){
            this.StartInterp();
        }
    }

    /**
     * @description 开始插值
     */
    private StartInterp(): void {
        this.bStartInterp = true;
    }

    /**
     * @description 停止插值
     */
    private StopInterp(): void {
        this.bStartInterp = false;
    }

    /**
     * @description UnHover 时，计算卡牌的目标位置
     * @param idx 在 CardSample 中的序号
     * @returns 返回卡牌的 x 目标位置
     */
    private CalculateCardPosByIdx(idx: number): number {
        const ViewPortSize: UE.Vector2D = UE.WidgetLayoutLibrary.GetViewportSize(this);
        let result  = ViewPortSize.X / 2 + (idx - (this.SampleList.length - 1) / 2) * this.Interval;
        console.log("[CardMovementComponent].CalculateCardPosByIdx, result = ", result);
        return result;
    }


}

blueprint.mixin(jsComponent, BP_CardMovementComponent);
console.log("[CardMovementComponent].Finish")
