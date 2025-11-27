import { PanelInstance } from "./PanelInstance";
import { blueprint } from 'puerts';
import { BlueprintPath } from "../../Path";
import { SystemManager } from '../../../SubSystem/SystemManager';
import { SystemEnum } from '../../../SubSystem/SystemName';
import { CardDef, CardInstance } from '../CardInstance/CardInstance';
import { BP_CardMovementComponent } from '../Page/BP_CardMovementComponent';
import UE from "ue";

type BPW_DuelPage_C = UE.Game.Blueprint.BPW.Page.BPW_DuelPage.BPW_DuelPage_C;


export class DuelPage extends PanelInstance {

    protected declare _panel: BPW_DuelPage_C;
    private mCardMovementComponent: BP_CardMovementComponent | null = null;
    private CardList: CardInstance[] = [];
    
    override DoInit() {
        this._path = BlueprintPath.BPW_DuelPage;
        this.Load();

        SystemManager.instance?.SetHandZone(this);
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
            const Op = SystemManager.instance?.GetSystem(SystemEnum.GameOperationSystem);
            let cid = 1;
            Op?.DrawCardByCid(cid);
            // console.log("[DuelPage].TestBtn1 Op = ", Op);
            console.log("[DuelPage].TestBtn1 Clicked, cid = ", cid);
        });

        this._panel.StartGameBtn.OnClicked.Add(() => {
            SystemManager.instance?.GetSystem(SystemEnum.GameOperationSystem).StartGame();
            // console.log("[BPW_DuelPage].StartGameBtn Clicked");
            // const Op = SystemManager.instance?.GetSystem(SystemEnum.GameOperationSystem);
            // Op?.UseCard();
            
        });
    };

    /**
     * @description 创建Movementcomponent组件
     */
    private CreateMovementComponent() { 
        const CompClass = UE.Class.Load(BlueprintPath.BP_CardMovementComponent);
        blueprint.load(UE.Game.Blueprint.BPW.Page.BP_CardMovementComponentt.BP_CardMovementComponentt_C);
        this.mCardMovementComponent = UE.GameplayStatics.BeginDeferredActorSpawnFromClass(
            this._panel.GetWorld(),
            CompClass,
            UE.Transform.Identity
        ) as unknown as BP_CardMovementComponent;
        UE.GameplayStatics.FinishSpawningActor(this.mCardMovementComponent, UE.Transform.Identity);
        this.mCardMovementComponent?.SetNeedInfo(this._panel.CardUseZone, this);
        console.log("[BPW_DuelPage].Construct mCardMovementComponent:", this.mCardMovementComponent);     
    }


    /**
     * 获取手卡数量
     */
    GetHandCardsNum(): number { 
        return this.CardList.length;
    }

    /**
     * @description 创建卡牌、初始化、添加到手牌区
     * @Link GameOperationSystem.DrawCardByCid
     */
    AddCardToHand(def: CardDef): CardInstance {
        const card = new CardInstance(def);
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
    UseCard(idx: number) { 
        console.log("[BPW_DuelPage].UseCard, idx = ", idx);
        this.CardList[idx].Use();
    }

    /**
     * 移除手卡
     * @description 移除card对应的CardList、SampleWidget中的元素，StartCardInterp，removefromparent
     * @Link GameOperationSystem.DestroyHandCard, Only
     */
    RemoveCard(card: CardInstance) {
        const sample = card.GetSample();
        if(sample) {
            this.mCardMovementComponent?.RemoveSample(sample);
        }
        this.CardList.splice(this.CardList.indexOf(card), 1);
        card.Destroy();
    }

}

export default DuelPage;