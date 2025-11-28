console.log("[mainUI] start");
import UE from "ue";
import { PanelInstance } from "./PanelInstance";
import { BlueprintPath } from "../../Path";
// import { SystemManager } from "../../../SubSystem/SystemManager";
import { PanelNameEnum } from "../../../path/PanelNameDef";
import { PanelSystem } from "../../../SubSystem/PanelSystem";
import { log } from "console";
import { SystemManager } from "../../../SubSystem/SystemManager";

type BPW_MainUI = UE.Game.Blueprint.BPW.Page.mainUI.mainUI_C;

class MainUI extends PanelInstance {

    protected declare _panel: BPW_MainUI;
    protected _name = "mainUI";
    private PS: PanelSystem;

    override DoInit() {
        this._path = BlueprintPath.mainUI;
        this.Load();
        this.PS = PanelSystem.GetInstance();
        this.RegisterEvent();
    }

    RegisterEvent() { 
        console.log("[mainUI] RegisterEvent, this = ",this.GetName());
        
        // 打开Game 
        this._panel.PlayBtn.OnClicked.Add( () => {
            console.log("[mainUI] StartPlay, this = ",this.GetName());
            this.Hide();
            this.PS.AddPanelByName(PanelNameEnum.DuelPage).Show();
        });

        // 打开抽卡界面
        this._panel.PullBtn.OnClicked.Add(() => {
            console.log("[mainUI] OpenPullMenu");
            this.Hide();
            this.PS.AddPanelByName(PanelNameEnum.PullMenu).Show();
        });

        // 打开任务栏
        this._panel.TaskBtn.OnClicked.Add(() => {
            console.log("[mainUI] OpenTaskMenu");
            this.Hide();
            this.PS.AddPanelByName(PanelNameEnum.TaskMenu).Show();
        });

        // 退出游戏
        this._panel.QuitBtn.OnClicked.Add(() => {
            console.log("[mainUI] QuitGame");
            const world = SystemManager.GetWorld();
            UE.KismetSystemLibrary.QuitGame(world, UE.GameplayStatics.GetPlayerController(world, 0), UE.EQuitPreference.Quit, false);
        });
    }
















}

export default MainUI;
