console.log("[CardMovementComponent].Start")
import UE from 'ue';
import { BlueprintPath } from '../../Path';
import { SampleWidget  } from '../CardInstance/BPW_SampleWidget'
import { CardInstance } from '../CardInstance/CardInstance'
import { SystemManager } from '../../../SubSystem/SystemManager';
import { BlueprintMixin } from '../../../Utils/mixinUtils';
import { DuelPage } from './BPW_DuelPage';
// import { DuelPage } from './BPW_DuelPage';


// export interface IPageInterface { 
//     UseCard(idx: number): void; // 避免循环引用
// }

export interface BP_CardMovementComponent extends UE.Game.Blueprint.BPW.Page.BP_CardMovementComponentt.BP_CardMovementComponentt_C {}
@BlueprintMixin(BlueprintPath.BP_CardMovementComponent)
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
    private UseZone: UE.Image | null = null;
    private Page: DuelPage | null = null;

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


    ReceiveBeginPlay() : void {
        console.log("[CardMovementComponent].ReceiveBeginPlay");
        this.InitData();
    }

    ReceiveTick(DeltaSeconds: number) : void {
        this.ProcessDragCard();
        this.ProcessInterp(DeltaSeconds);
    }

    // SetNeedInfo(useZone: UE.Image, page: IPageInterface) { 
    //     this.UseZone = useZone;
    //     this.Page = page;
    // }
    SetNeedInfo(useZone: UE.Image, page: DuelPage) { 
        this.UseZone = useZone;
        this.Page = page;
    }


    print(){
        console.log("amzing");

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
            for(let idx = 0; idx < this.SampleList.length; idx++) {
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
     * AddCard时，注册点击、悬挂事件
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
        this.bDragging = false;
        if (this.DraggedCard !== card) {
            console.log("[CardMovementComponent][Error].OnDragReleased: Mismatched card");
        }

        // 使用卡牌
        if (this.JudgeUsable()) {
            const idx = this.SampleList.indexOf(card as SampleWidget);
            this.Page?.UseCard(idx);
        }

        this.DraggedCard = null;
        this.DragOffset = new UE.Vector2D(0, 0);
    }

    /**
     * @description 鼠标悬停时，设置 TargetPos ，用于 tick 移动。
     * @param card 
     */
    private OnMouseHover(card: UE.UserWidget): void {
        this.TargetPos.Empty();
        const HoverIdx = this.SampleList.indexOf(card as SampleWidget);

        // 保证 TargetPos 足够多的元素。
        while(this.TargetPos.Num() < this.SampleList.length) {
            this.TargetPos.Add(new UE.Vector2D(0, 0));
        }

        for(let idx = 0; idx < this.SampleList.length; idx++) {
            if(idx === HoverIdx) {
                let pos = new UE.Vector2D(this.CalculateCardPosByIdx(idx), this.CalculateCardPosY(true));
                this.TargetPos.Set(idx, pos);
                continue;
            }
            const Direction: number = idx > HoverIdx ? 1 : -1;
            // -50 是向上的偏移距离
            let pos = new UE.Vector2D(this.CalculateCardPosByIdx(idx) + this.HoverOffsetX * Direction, this.CalculateCardPosY(false));
            this.TargetPos.Set(idx, pos);
        }
        if(!this.bDragging){
            this.StartInterp();
        }
    }

    private OnMouseHoverEnd(card: UE.UserWidget): void {
        this.TargetPos.Empty();

        // 保证 TargetPos 足够多的元素。
        while(this.TargetPos.Num() < this.SampleList.length) {
            this.TargetPos.Add(new UE.Vector2D(0, 0));
        }   

        for(let idx = 0; idx < this.SampleList.length; idx++) {
            let pos = new UE.Vector2D(this.CalculateCardPosByIdx(idx), this.CalculateCardPosY(false));
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
     * @description 获取CardInstance 的 SampleWidget，添加到 SampleList，设置位置，开始插值
     */
    AddCard(cardInstance: CardInstance): void {
        console.log("[CardMovementComponent].AddCardSampleAndMoveCardToHand");

        let mSampleWidget = cardInstance.GetSample();
        if(mSampleWidget)
        {
            mSampleWidget.AddToViewport();
            this.RegisterEvents(mSampleWidget);
            this.SampleList.push(mSampleWidget);
            let transform = new UE.WidgetTransform();
            transform.Translation.X = 200;
            transform.Translation.Y = this.CalculateCardPosY(false);
            mSampleWidget.SetRenderTransform(transform);
            console.log("[CardMovementComponent].AddCardSampleAndMoveCardToHand, mSampleWidget.SetRenderTransform");

            // 计算目标位置
            this.TargetPos.Empty();
            for(let idx = 0; idx < this.SampleList.length; idx++){
                let pos = new UE.Vector2D(this.CalculateCardPosByIdx(idx) , this.CalculateCardPosY(false));
                this.TargetPos.Add(pos);
            }
        }
        this.StartInterp();
        this.print();
    }
    
   

    /**
     * @description 计算卡牌的目标位置
     * @param idx 在 CardSample 中的序号
     * @returns 返回卡牌的 x 目标位置
     */
    private CalculateCardPosByIdx(idx: number): number {
        let ViewPortSize: UE.Vector2D = UE.WidgetLayoutLibrary.GetViewportSize(this);
        let DPIScale = UE.WidgetLayoutLibrary.GetViewportScale(SystemManager.GetWorld());
        let result  = ViewPortSize.X / 2 / DPIScale + (idx - (this.SampleList.length - 1) / 2) * this.Interval - 100 * DPIScale;
        return result;
    }

    private CalculateCardPosY(IsSelected: boolean): number {
        let DPIScale = UE.WidgetLayoutLibrary.GetViewportScale(SystemManager.GetWorld());
        const ViewPortSize: UE.Vector2D = UE.WidgetLayoutLibrary.GetViewportSize(this);
        let res = ViewPortSize.Y / DPIScale - this.High  - (IsSelected ? 50 : 0);
        return res;
    }

    /**
     * 
     *  判断拖拽的卡是否在使用区内
     */
    private JudgeUsable(): boolean {
        if(!this.DraggedCard || !this.UseZone) return false;
        const cardGeo = this.DraggedCard.GetCachedGeometry();
        const HandGeo = this.UseZone?.GetCachedGeometry();
        const cardLocal = UE.SlateBlueprintLibrary.GetLocalTopLeft(cardGeo);
        const cardPos = UE.SlateBlueprintLibrary.LocalToAbsolute(cardGeo, cardLocal);
        const cardSize = UE.SlateBlueprintLibrary.GetAbsoluteSize(cardGeo);
        const UseZoneLocal = UE.SlateBlueprintLibrary.GetLocalTopLeft(HandGeo);
        const UseZonePos = UE.SlateBlueprintLibrary.LocalToAbsolute(HandGeo, UseZoneLocal);
        const UseZoneSize = UE.SlateBlueprintLibrary.GetAbsoluteSize(cardGeo);

        const centerX = cardPos.X + cardSize.X / 2;
        const centerY = cardPos.Y + cardSize.Y / 2;
        let IsInside: boolean = 
            centerX > UseZonePos.X && centerX < UseZonePos.X + UseZoneSize.X &&
            centerY > UseZonePos.Y && centerY < UseZonePos.Y + UseZoneSize.Y;
        
        return IsInside;
    }


}
