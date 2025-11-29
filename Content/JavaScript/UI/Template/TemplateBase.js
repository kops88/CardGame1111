"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateBase = void 0;
const ue_1 = __importDefault(require("ue"));
const SystemManager_1 = require("../../SubSystem/SystemManager");
class TemplateBase {
    id;
    object;
    parentPanel;
    Visibility = false;
    constructor(id) {
        this.id = id;
    }
    /**
     * Template类通用的初始化，OnInit内单独的初始化。
     */
    Init() {
        this.Load();
        this.OnInit();
    }
    /**
     * 创建蓝图到object
     */
    Load() {
        const uclass = ue_1.default.Class.Load(this.path);
        this.object = ue_1.default.WidgetBlueprintLibrary.Create(SystemManager_1.SystemManager.GetWorld(), uclass, null);
    }
    /** 可重写 */
    // SetParentSlot(parentWidget: UE.UserWidget, slot?: UE.PanelSlot) { 
    // }
    /**
     *
     * @param isV true使用addtoviewport，false使用setvisibility
     */
    Show(isV = true) {
        if (isV) {
            this.object.AddToViewport();
        }
        else {
            this.object.SetVisibility(ue_1.default.ESlateVisibility.Visible);
        }
        this.Visibility = true;
    }
    GetName() {
        return this.name + "_" + this.id.toString();
    }
    SetParentPanel(panel) {
        this.parentPanel = panel;
    }
    GetParentPanel() {
        return this.parentPanel;
    }
}
exports.TemplateBase = TemplateBase;
//# sourceMappingURL=TemplateBase.js.map