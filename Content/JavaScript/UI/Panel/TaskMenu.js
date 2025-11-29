"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("[TaskMenu] start");
const PanelInstance_1 = require("./PanelInstance");
const Path_1 = require("../../Path");
const PanelSystem_1 = require("../../SubSystem/PanelSystem");
const PanelNameDef_1 = require("../../UI/PanelNameDef");
class TaskMenu extends PanelInstance_1.PanelInstance {
    _name = "TaskMenu";
    _path = Path_1.BlueprintPath.TaskMenu;
    DoInit() {
        this.RegisterEvent();
    }
    RegisterEvent() {
        this._panel.BackBtn.OnClicked.Add(() => {
            this.Hide();
            PanelSystem_1.PanelSystem.GetInstance().AddPanelByName(PanelNameDef_1.PanelNameEnum.MainUI);
        });
    }
}
exports.default = TaskMenu;
//# sourceMappingURL=TaskMenu.js.map