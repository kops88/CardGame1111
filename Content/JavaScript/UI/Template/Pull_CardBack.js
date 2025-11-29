"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pull_CardBack = void 0;
const ue_1 = __importDefault(require("ue"));
const TemplateBase_1 = require("./TemplateBase");
const Path_1 = require("../../Path");
const SystemManager_1 = require("../../SubSystem/SystemManager");
const SystemName_1 = require("../../SubSystem/SystemName");
class Pull_CardBack extends TemplateBase_1.TemplateBase {
    static AS;
    path = Path_1.BlueprintPath.Pull_CardBack;
    name = "Pull_CardBack";
    cardDef;
    bFlip = false;
    OnInit() {
        if (!Pull_CardBack.AS) {
            Pull_CardBack.AS = SystemManager_1.SystemManager.instance.GetSystem(SystemName_1.SystemEnum.AssetSystem);
        }
        this.cardDef = Pull_CardBack.AS.GetCardDefByCid(1);
        this.RegisterEvent();
    }
    RegisterEvent() {
        this.object.Trigger.OnClicked.Add(() => {
            if (!this.bFlip) {
                this.FlipCard();
                this.bFlip = true;
            }
        });
    }
    SetCardDef(cardDef) {
        this.cardDef = cardDef;
    }
    FlipCard() {
        this.object.BorderBack.SetVisibility(ue_1.default.ESlateVisibility.Hidden);
        this.object.Image.SetBrushFromSoftTexture(this.cardDef.img);
        // this.object.Border.SetVisibility(UE.ESlateVisibility.Hidden);
    }
    GetObject() { return this.object; }
}
exports.Pull_CardBack = Pull_CardBack;
exports.default = Pull_CardBack;
//# sourceMappingURL=Pull_CardBack.js.map