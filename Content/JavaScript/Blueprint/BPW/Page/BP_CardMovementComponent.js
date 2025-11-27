"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BP_CardMovementComponent = void 0;
console.log("[CardMovementComponent].Start");
const ue_1 = __importDefault(require("ue"));
const Path_1 = require("../../Path");
const SystemManager_1 = require("../../../SubSystem/SystemManager");
const mixinUtils_1 = require("../../../Utils/mixinUtils");
let BP_CardMovementComponent = class BP_CardMovementComponent {
    /** 是否正在拖拽*/
    bDragging = false;
    /** 是否开始插值 */
    bStartInterp = false;
    /** 拖拽的卡牌 */
    DraggedCard = null;
    /** CardSample*/
    SampleList = [];
    /** 鼠标点击卡牌时的偏移 */
    DragOffset = new ue_1.default.Vector2D(0, 0);
    UseZone = null;
    Page = null;
    /**
     * @description 初始化数据
     */
    InitData() {
        this.SampleList = [];
        this.DragOffset = new ue_1.default.Vector2D(0, 0);
        this.bStartInterp = false;
        this.TargetPos.Add(new ue_1.default.Vector2D(0, 0));
        console.log("[CardMovementComponent].InitData, bStartInterp = ", this.bStartInterp);
    }
    ReceiveBeginPlay() {
        console.log("[CardMovementComponent].ReceiveBeginPlay");
        this.InitData();
    }
    ReceiveTick(DeltaSeconds) {
        this.ProcessDragCard();
        this.ProcessInterp(DeltaSeconds);
    }
    // SetNeedInfo(useZone: UE.Image, page: IPageInterface) { 
    //     this.UseZone = useZone;
    //     this.Page = page;
    // }
    SetNeedInfo(useZone, page) {
        this.UseZone = useZone;
        this.Page = page;
    }
    print() {
        console.log("amzing");
    }
    /**
     * @description 处理鼠标拖拽卡牌, Tick
     */
    ProcessDragCard() {
        if (this.DraggedCard) {
            let MousePos = ue_1.default.WidgetLayoutLibrary.GetMousePositionOnViewport(this.GetWorld());
            let transform = new ue_1.default.WidgetTransform();
            transform.Translation.X = MousePos.X - this.DragOffset.X;
            transform.Translation.Y = MousePos.Y - this.DragOffset.Y;
            this.DraggedCard.SetRenderTransform(transform);
        }
    }
    /**
     * @description 处理插值，Tick
     */
    ProcessInterp(DeltaSeconds) {
        if (this.bStartInterp
            && this.SampleList.length > 0
            && this.TargetPos.Num() === this.SampleList.length) {
            for (let idx = 0; idx < this.SampleList.length; idx++) {
                if (this.bDragging && this.DraggedCard === this.SampleList[idx]) {
                    continue;
                }
                let OriginPos = this.SampleList[idx].RenderTransform.Translation;
                let TargetPos = ue_1.default.KismetMathLibrary.Vector2DInterpTo(OriginPos, this.TargetPos.Get(idx), DeltaSeconds, 10);
                let transform = new ue_1.default.WidgetTransform();
                transform.Translation.X = TargetPos.X;
                transform.Translation.Y = TargetPos.Y;
                this.SampleList[idx].SetRenderTransform(transform);
                // 判断是否移动完成，如果完成，则设置bStartInterp = false
                let length = this.SampleList.length;
                if (this.JudgeFinishInterp()) {
                    this.bStartInterp = false;
                }
            }
        }
    }
    /**
     * @description 判断插值完成
     */
    JudgeFinishInterp() {
        let translation = new ue_1.default.Vector2D(0, 0);
        let target = new ue_1.default.Vector2D(0, 0);
        if (this.SampleList.length !== this.TargetPos.Num())
            return false;
        for (let idx = 0; idx < this.SampleList.length; idx++) {
            translation = this.SampleList[idx].RenderTransform.Translation;
            target = this.TargetPos.Get(idx);
            const DiffCondition = Math.abs(translation.X - target.X) < 0.01 && Math.abs(translation.Y - target.Y) < 0.01;
            if (!DiffCondition) {
                return false;
            }
        }
        return true;
    }
    /**
    * AddCard时，注册点击、悬挂事件
    * @param card
    */
    RegisterEvents(card) {
        // 注册点击卡牌开始拖拽事件
        console.log("[CardMovementComponent].RegisterEvents");
        console.log(card.aaa);
        card.OnDragPressed.Add((Incard) => {
            this.OnDragPressed(Incard);
        });
        card.OnDragReleased.Add((Incard) => {
            this.OnDragReleased(Incard);
        });
        card.OnMouseHover.Add((Incard) => {
            this.OnMouseHover(Incard);
        });
        card.OnMouseUnHover.Add((Incard) => {
            this.OnMouseHoverEnd(Incard);
        });
    }
    /**
     * @description 按下后，设置 bDragging 和 DraggedCard 以及 DragOffset，用于 tick 拖拽。
     * @param card 点击的 CardSample
     */
    OnDragPressed(card) {
        this.bDragging = true;
        this.DraggedCard = card;
        let MousePos = ue_1.default.WidgetLayoutLibrary.GetMousePositionOnViewport(this.GetWorld());
        const DragOffsetX = MousePos.X - this.DraggedCard.RenderTransform.Translation.X;
        const DragOffsetY = MousePos.Y - this.DraggedCard.RenderTransform.Translation.Y;
        this.DragOffset.X = DragOffsetX;
        this.DragOffset.Y = DragOffsetY;
    }
    /**
     * 松开后，设置 bDragging 和 DraggedCard，用于 tick 拖拽。
     * 如果卡牌可以使用，则使用卡牌。
     * @param card 点击的 CardSample
     */
    OnDragReleased(card) {
        this.bDragging = false;
        if (this.DraggedCard !== card) {
            console.log("[CardMovementComponent][Error].OnDragReleased: Mismatched card");
        }
        // 使用卡牌
        if (this.JudgeUsable()) {
            const idx = this.SampleList.indexOf(card);
            this.Page?.UseCard(idx);
        }
        this.DraggedCard = null;
        this.DragOffset = new ue_1.default.Vector2D(0, 0);
    }
    /**
     * @description 鼠标悬停时，设置 TargetPos ，用于 tick 移动。
     * @param card
     */
    OnMouseHover(card) {
        this.TargetPos.Empty();
        const HoverIdx = this.SampleList.indexOf(card);
        // 保证 TargetPos 足够多的元素。
        while (this.TargetPos.Num() < this.SampleList.length) {
            this.TargetPos.Add(new ue_1.default.Vector2D(0, 0));
        }
        for (let idx = 0; idx < this.SampleList.length; idx++) {
            if (idx === HoverIdx) {
                let pos = new ue_1.default.Vector2D(this.CalculateCardPosByIdx(idx), this.CalculateCardPosY(true));
                this.TargetPos.Set(idx, pos);
                continue;
            }
            const Direction = idx > HoverIdx ? 1 : -1;
            // -50 是向上的偏移距离
            let pos = new ue_1.default.Vector2D(this.CalculateCardPosByIdx(idx) + this.HoverOffsetX * Direction, this.CalculateCardPosY(false));
            this.TargetPos.Set(idx, pos);
        }
        if (!this.bDragging) {
            this.StartInterp();
        }
    }
    OnMouseHoverEnd(card) {
        this.TargetPos.Empty();
        // 保证 TargetPos 足够多的元素。
        while (this.TargetPos.Num() < this.SampleList.length) {
            this.TargetPos.Add(new ue_1.default.Vector2D(0, 0));
        }
        for (let idx = 0; idx < this.SampleList.length; idx++) {
            let pos = new ue_1.default.Vector2D(this.CalculateCardPosByIdx(idx), this.CalculateCardPosY(false));
            this.TargetPos.Set(idx, pos);
        }
        if (!this.bDragging) {
            this.StartInterp();
        }
    }
    /**
     * @description 重新计算TargetPos，并startinterp
     */
    StartCardInterp() {
        this.TargetPos.Empty();
        for (let idx = 0; idx < this.SampleList.length; idx++) {
            let pos = new ue_1.default.Vector2D(this.CalculateCardPosByIdx(idx), this.CalculateCardPosY(false));
            this.TargetPos.Add(pos);
        }
        this.StartInterp();
    }
    /**
     * @description 开始插值
     */
    StartInterp() {
        this.bStartInterp = true;
    }
    /**
     * @description 停止插值
     */
    StopInterp() {
        this.bStartInterp = false;
    }
    /**
     * @description 获取CardInstance 的 SampleWidget，添加到 SampleList，设置位置，开始插值
     */
    AddCard(cardInstance) {
        console.log("[CardMovementComponent].AddCardSampleAndMoveCardToHand");
        let mSampleWidget = cardInstance.GetSample();
        if (mSampleWidget) {
            mSampleWidget.AddToViewport();
            this.RegisterEvents(mSampleWidget);
            this.SampleList.push(mSampleWidget);
            let transform = new ue_1.default.WidgetTransform();
            transform.Translation.X = 200;
            transform.Translation.Y = this.CalculateCardPosY(false);
            mSampleWidget.SetRenderTransform(transform);
            console.log("[CardMovementComponent].AddCardSampleAndMoveCardToHand, mSampleWidget.SetRenderTransform");
        }
        this.StartCardInterp();
        this.print();
    }
    /**
     * @description 计算卡牌的目标位置
     * @param idx 在 CardSample 中的序号
     * @returns 返回卡牌的 x 目标位置
     */
    CalculateCardPosByIdx(idx) {
        let ViewPortSize = ue_1.default.WidgetLayoutLibrary.GetViewportSize(this);
        let DPIScale = ue_1.default.WidgetLayoutLibrary.GetViewportScale(SystemManager_1.SystemManager.GetWorld());
        let result = ViewPortSize.X / 2 / DPIScale + (idx - (this.SampleList.length - 1) / 2) * this.Interval - 100 * DPIScale;
        return result;
    }
    CalculateCardPosY(IsSelected) {
        let DPIScale = ue_1.default.WidgetLayoutLibrary.GetViewportScale(SystemManager_1.SystemManager.GetWorld());
        const ViewPortSize = ue_1.default.WidgetLayoutLibrary.GetViewportSize(this);
        let res = ViewPortSize.Y / DPIScale - this.High - (IsSelected ? 50 : 0);
        return res;
    }
    /**
     *
     *  判断拖拽的卡是否在使用区内
     */
    JudgeUsable() {
        if (!this.DraggedCard || !this.UseZone)
            return false;
        const cardGeo = this.DraggedCard.GetCachedGeometry();
        const HandGeo = this.UseZone?.GetCachedGeometry();
        const cardLocal = ue_1.default.SlateBlueprintLibrary.GetLocalTopLeft(cardGeo);
        const cardPos = ue_1.default.SlateBlueprintLibrary.LocalToAbsolute(cardGeo, cardLocal);
        const cardSize = ue_1.default.SlateBlueprintLibrary.GetAbsoluteSize(cardGeo);
        const UseZoneLocal = ue_1.default.SlateBlueprintLibrary.GetLocalTopLeft(HandGeo);
        const UseZonePos = ue_1.default.SlateBlueprintLibrary.LocalToAbsolute(HandGeo, UseZoneLocal);
        const UseZoneSize = ue_1.default.SlateBlueprintLibrary.GetAbsoluteSize(cardGeo);
        const centerX = cardPos.X + cardSize.X / 2;
        const centerY = cardPos.Y + cardSize.Y / 2;
        let IsInside = centerX > UseZonePos.X && centerX < UseZonePos.X + UseZoneSize.X &&
            centerY > UseZonePos.Y && centerY < UseZonePos.Y + UseZoneSize.Y;
        return IsInside;
    }
    /**
     * @description 移除SampleList，并StartCardInterp
     * @Link DuelPage.RemoveCard Only
     */
    RemoveSample(sample) {
        this.SampleList.splice(this.SampleList.indexOf(sample), 1);
        this.StartCardInterp();
    }
};
exports.BP_CardMovementComponent = BP_CardMovementComponent;
exports.BP_CardMovementComponent = BP_CardMovementComponent = __decorate([
    (0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.BP_CardMovementComponent)
], BP_CardMovementComponent);
//# sourceMappingURL=BP_CardMovementComponent.js.map