import UE from "ue";
import { TemplateBase } from "./TemplateBase";
import { BlueprintPath } from "../../Path";
import { CardDef } from "../../Card/CardBase/CardInstance";
import { SystemManager } from "../../SubSystem/SystemManager";
import { SystemEnum } from "../../SubSystem/SystemName";
import { AssetSystem } from "../../SubSystem/AssetSystem";



export class Pull_CardBack extends TemplateBase { 

    static AS: AssetSystem;
    protected path = BlueprintPath.Pull_CardBack;
    protected name = "Pull_CardBack";
    protected declare object: UE.Game.Blueprint.BPW.Template.CardBack.CardBack_C;

    private cardDef: CardDef;
    private bFlip: boolean = false;

    override OnInit() {
        if(!Pull_CardBack.AS) {
            Pull_CardBack.AS = SystemManager.instance.GetSystem(SystemEnum.AssetSystem);
        }
        this.cardDef = Pull_CardBack.AS.GetCardDefByCid(1);
        this.RegisterEvent();
    }

    RegisterEvent() { 
        this.object.Trigger.OnClicked.Add(() => {
            if(!this.bFlip) {
                this.FlipCard();
                
            }
        });
    }

    SetCardDef(cardDef: CardDef) {
        this.cardDef = cardDef;
    }

    FlipCard() { 
        this.object.BorderBack.SetVisibility(UE.ESlateVisibility.Hidden);
        this.object.Image.SetBrushFromSoftTexture(this.cardDef.img);
        this.bFlip = true;
        // this.object.Border.SetVisibility(UE.ESlateVisibility.Hidden);
    }

    GetObject() { return this.object; }

}

export default Pull_CardBack;