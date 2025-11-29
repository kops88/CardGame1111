console.log("[TaskMenu] start");
import UE from "ue";
import { PanelInstance } from "./PanelInstance";
import { BlueprintPath } from "../../Path";
import { PanelSystem } from '../../SubSystem/PanelSystem';
import { SystemEnum } from '../../SubSystem/SystemName';
import { PanelNameEnum } from "../../UI/PanelNameDef"

type BPW_TaskMenu = UE.Game.Blueprint.BPW.Page.TaskMenu.TaskMenu_C;

class TaskMenu extends PanelInstance {

    protected declare _panel: BPW_TaskMenu;
    protected _name = "TaskMenu";
    protected _path = BlueprintPath.TaskMenu;

    override DoInit() {
        this.RegisterEvent();
    }

    RegisterEvent() {
        this._panel.BackBtn.OnClicked.Add(() => {
            this.Hide();
            PanelSystem.GetInstance().AddPanelByName(PanelNameEnum.MainUI);
        })
    }

}

export default TaskMenu;