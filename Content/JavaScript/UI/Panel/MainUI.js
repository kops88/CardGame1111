"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("[mainUI] start");
const ue_1 = __importDefault(require("ue"));
const PanelInstance_1 = require("./PanelInstance");
const Path_1 = require("../../Path");
// import { SystemManager } from "../../../SubSystem/SystemManager";
const PanelNameDef_1 = require("../../UI/PanelNameDef");
const PanelSystem_1 = require("../../SubSystem/PanelSystem");
const SystemManager_1 = require("../../SubSystem/SystemManager");
class MainUI extends PanelInstance_1.PanelInstance {
    _name = "mainUI";
    _path = Path_1.BlueprintPath.mainUI;
    PS;
    DoInit() {
        this.PS = PanelSystem_1.PanelSystem.GetInstance();
        this.RegisterEvent();
    }
    RegisterEvent() {
        console.log("[mainUI] RegisterEvent, this = ", this.GetName());
        // 打开Game 
        this._panel.PlayBtn.OnClicked.Add(() => {
            console.log("[mainUI] StartPlay, this = ", this.GetName());
            this.Hide();
            this.PS.AddPanelByName(PanelNameDef_1.PanelNameEnum.DuelPage).Show();
        });
        // 打开抽卡界面
        this._panel.PullBtn.OnClicked.Add(() => {
            console.log("[mainUI] OpenPullMenu");
            this.Hide();
            this.PS.AddPanelByName(PanelNameDef_1.PanelNameEnum.PullMenu).Show();
        });
        // 打开任务栏
        this._panel.TaskBtn.OnClicked.Add(() => {
            console.log("[mainUI] OpenTaskMenu");
            this.Hide();
            this.PS.AddPanelByName(PanelNameDef_1.PanelNameEnum.TaskMenu).Show();
        });
        // 退出游戏
        this._panel.QuitBtn.OnClicked.Add(() => {
            console.log("[mainUI] QuitGame");
            const world = SystemManager_1.SystemManager.GetWorld();
            ue_1.default.KismetSystemLibrary.QuitGame(world, ue_1.default.GameplayStatics.GetPlayerController(world, 0), ue_1.default.EQuitPreference.Quit, false);
        });
    }
}
exports.default = MainUI;
//# sourceMappingURL=MainUI.js.map