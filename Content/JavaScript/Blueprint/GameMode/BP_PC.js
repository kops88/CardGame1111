"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
console.log("[BP_PC] head");
const ue_1 = __importDefault(require("ue"));
const puerts_1 = require("puerts");
const Path_1 = require("../Path");
const SystemManager_1 = require("../../SubSystem/SystemManager");
const SystemName_1 = require("../../SubSystem/SystemName");
const PanelPath_1 = require("../../path/PanelPath");
/**
 * ts mixin 到蓝图类
 * 1. 加载蓝图类的uclass
 * 2. 转成jsclass
 * 3. 定义ts类，方法和属性和蓝图类一致
 * 4. 使用blueprint.mixin混入
 */
console.log("[BP_PC] Start");
const uclass_PC = ue_1.default.Class.Load(Path_1.BlueprintPath.BP_PC);
const jsclass_PC = puerts_1.blueprint.tojs(uclass_PC);
class PlayerController {
    testactor = null;
    ReceiveBeginPlay() {
        console.log("BP_PC ReceiveBeginPlay");
        const panelManager = SystemManager_1.SystemManager.instance?.GetSystem(SystemName_1.SystemEnum.PanelSystem);
        const DuelPage = panelManager.AddPanelByName(PanelPath_1.PaneNameEnum.DuelPage);
        DuelPage.Show();
        // UE.WidgetBlueprintLibrary.Create(this, UE.Class.Load(BlueprintPath.BPW_DuelPage), this).AddToViewport();
        this.bShowMouseCursor = true;
        SystemManager_1.SystemManager.SetWorld(this.GetWorld());
    }
}
exports.PlayerController = PlayerController;
puerts_1.blueprint.mixin(jsclass_PC, PlayerController);
console.log("[BP_PC] Finish");
//# sourceMappingURL=BP_PC.js.map