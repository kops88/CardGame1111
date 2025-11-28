"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 11:25:07
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-28 14:09:40
 * @FilePath: \CG1111\TypeScript\Blueprint\GameMode\BP_PC.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[BP_PC] head");
const ue_1 = __importDefault(require("ue"));
const puerts_1 = require("puerts");
const Path_1 = require("../Path");
const SystemManager_1 = require("../../SubSystem/SystemManager");
const SystemName_1 = require("../../SubSystem/SystemName");
const PanelNameDef_1 = require("../../path/PanelNameDef");
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
        SystemManager_1.SystemManager.SetWorld(this.GetWorld());
        const panelManager = SystemManager_1.SystemManager.instance?.GetSystem(SystemName_1.SystemEnum.PanelSystem);
        const StartPage = panelManager.AddPanelByName(PanelNameDef_1.PanelNameEnum.MainUI);
        StartPage.Show();
        this.bShowMouseCursor = true;
    }
}
exports.PlayerController = PlayerController;
puerts_1.blueprint.mixin(jsclass_PC, PlayerController);
console.log("[BP_PC] Finish");
//# sourceMappingURL=BP_PC.js.map