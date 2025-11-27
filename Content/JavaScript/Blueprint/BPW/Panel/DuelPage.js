"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuelPage = void 0;
const PanelInstance_1 = require("./PanelInstance");
const puerts_1 = require("puerts");
const Path_1 = require("../../Path");
const SystemManager_1 = require("../../../SubSystem/SystemManager");
const SystemName_1 = require("../../../SubSystem/SystemName");
const CardInstance_1 = require("../CardInstance/CardInstance");
const ue_1 = __importDefault(require("ue"));
class DuelPage extends PanelInstance_1.PanelInstance {
    mCardMovementComponent = null;
    CardList = [];
    DoInit() {
        this._path = Path_1.BlueprintPath.BPW_DuelPage;
        this.Load();
        SystemManager_1.SystemManager.instance?.SetHandZone(this);
        this.CreateMovementComponent();
        this.CardList = [];
        this.RegisterEvents();
    }
    RegisterEvents() {
        console.log("[BPW_DuelPage].RegisterEvents");
        // TestBtn1 点击后添加一个卡牌。
        this._panel.TestBtn1.OnClicked.Add(() => {
            console.log("[BPW_DuelPage].TestBtn1 Clicked");
            // this.mCardMovementComponent?.AddCard();
            const Op = SystemManager_1.SystemManager.instance?.GetSystem(SystemName_1.SystemEnum.GameOperationSystem);
            let cid = 1;
            Op?.DrawCardByCid(cid);
            // console.log("[DuelPage].TestBtn1 Op = ", Op);
            console.log("[DuelPage].TestBtn1 Clicked, cid = ", cid);
        });
        this._panel.StartGameBtn.OnClicked.Add(() => {
            SystemManager_1.SystemManager.instance?.GetSystem(SystemName_1.SystemEnum.GameOperationSystem).StartGame();
            // console.log("[BPW_DuelPage].StartGameBtn Clicked");
            // const Op = SystemManager.instance?.GetSystem(SystemEnum.GameOperationSystem);
            // Op?.UseCard();
        });
    }
    ;
    /**
     * @description 创建Movementcomponent组件
     */
    CreateMovementComponent() {
        const CompClass = ue_1.default.Class.Load(Path_1.BlueprintPath.BP_CardMovementComponent);
        puerts_1.blueprint.load(ue_1.default.Game.Blueprint.BPW.Page.BP_CardMovementComponentt.BP_CardMovementComponentt_C);
        this.mCardMovementComponent = ue_1.default.GameplayStatics.BeginDeferredActorSpawnFromClass(this._panel.GetWorld(), CompClass, ue_1.default.Transform.Identity);
        ue_1.default.GameplayStatics.FinishSpawningActor(this.mCardMovementComponent, ue_1.default.Transform.Identity);
        this.mCardMovementComponent?.SetNeedInfo(this._panel.CardUseZone, this);
        console.log("[BPW_DuelPage].Construct mCardMovementComponent:", this.mCardMovementComponent);
    }
    /**
     * 获取手卡数量
     */
    GetHandCardsNum() {
        return this.CardList.length;
    }
    /**
     * @description 创建卡牌、初始化、添加到手牌区
     * @Link GameOperationSystem.DrawCardByCid
     */
    AddCardToHand(def) {
        const card = new CardInstance_1.CardInstance(def);
        card.InitSample();
        this.CardList.push(card);
        this.mCardMovementComponent?.AddCard(card);
        // this.mCardMovementComponent?.print();
        // this.mCardMovementComponent?.SetSomeData(this.CardUseZone,this);
        return card;
    }
    /**
     * 当卡牌被拖到使用区，调用
     * @Link BP_CardMovementComponent.OnDragReleased
     */
    UseCard(idx) {
        console.log("[BPW_DuelPage].UseCard, idx = ", idx);
        this.CardList[idx].Use();
    }
    /**
     * 移除手卡
     * @description 移除card对应的CardList、SampleWidget中的元素，StartCardInterp，removefromparent
     * @Link GameOperationSystem.DestroyHandCard, Only
     */
    RemoveCard(card) {
        const sample = card.GetSample();
        if (sample) {
            this.mCardMovementComponent?.RemoveSample(sample);
        }
        this.CardList.splice(this.CardList.indexOf(card), 1);
        card.Destroy();
    }
}
exports.DuelPage = DuelPage;
exports.default = DuelPage;
//# sourceMappingURL=DuelPage.js.map