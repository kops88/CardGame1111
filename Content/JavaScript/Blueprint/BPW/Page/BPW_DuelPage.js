"use strict";
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 11:25:07
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-27 10:58:43
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\Page\BPW_DuelPage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
exports.DuelPage = void 0;
console.log("[BPW_DuelPage] head");
const ue_1 = __importDefault(require("ue"));
const puerts_1 = require("puerts");
const Path_1 = require("../../Path");
const SystemManager_1 = require("../../../SubSystem/SystemManager");
const SystemName_1 = require("../../../SubSystem/SystemName");
const CardInstance_1 = require("../CardInstance/CardInstance");
const mixinUtils_1 = require("../../../Utils/mixinUtils");
console.log("[BPW_DuelPage] Start");
let DuelPage = class DuelPage {
    mCardMovementComponent = null;
    CardList = [];
    Construct() {
        // SystemManager.instance?.SetHandZone(this);
        console.log("[BPW_DuelPage].Construct, instance = ", SystemManager_1.SystemManager.instance);
        this.CreateMovementComponent();
        this.CardList = [];
        this.RegisterEvents();
    }
    RegisterEvents() {
        console.log("[BPW_DuelPage].RegisterEvents");
        // TestBtn1 点击后添加一个卡牌。
        this.TestBtn1.OnClicked.Add(() => {
            console.log("[BPW_DuelPage].TestBtn1 Clicked");
            // this.mCardMovementComponent?.AddCard();
            const Op = SystemManager_1.SystemManager.instance?.GetSystem(SystemName_1.SystemEnum.GameOperationSystem);
            let cid = 1;
            Op?.DrawCardByCid(cid);
            // console.log("[DuelPage].TestBtn1 Op = ", Op);
            console.log("[DuelPage].TestBtn1 Clicked, cid = ", cid);
        });
        this.StartGameBtn.OnClicked.Add(() => {
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
        this.mCardMovementComponent = ue_1.default.GameplayStatics.BeginDeferredActorSpawnFromClass(this.GetWorld(), CompClass, ue_1.default.Transform.Identity);
        ue_1.default.GameplayStatics.FinishSpawningActor(this.mCardMovementComponent, ue_1.default.Transform.Identity);
        this.mCardMovementComponent?.SetNeedInfo(this.CardUseZone, this);
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
};
exports.DuelPage = DuelPage;
exports.DuelPage = DuelPage = __decorate([
    (0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.BPW_DuelPage)
], DuelPage);
console.log("[BPW_DuelPage].Finish");
//# sourceMappingURL=BPW_DuelPage.js.map