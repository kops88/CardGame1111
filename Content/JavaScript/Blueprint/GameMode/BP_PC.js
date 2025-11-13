"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const ue_1 = __importDefault(require("ue"));
const Path_1 = require("../Path");
const puerts_1 = require("puerts");
/**
 * ts mixin 到蓝图类
 * 1. 加载蓝图类的uclass
 * 2. 转成jsclass
 * 3. 定义ts类，方法和属性和蓝图类一致
 * 4. 使用blueprint.mixin混入
 */
console.log("[BP_PC].StartMixin");
const uclass_PC = ue_1.default.Class.Load(Path_1.BlueprintPath.BP_PC);
const jsclass_PC = puerts_1.blueprint.tojs(uclass_PC);
class PlayerController {
    testactor = null;
    ReceiveBeginPlay() {
        console.log("BP_PC ReceiveBeginPlay");
        ue_1.default.WidgetBlueprintLibrary.Create(this, ue_1.default.Class.Load(Path_1.BlueprintPath.BPW_DuelPage), this).AddToViewport();
        this.bShowMouseCursor = true;
    }
}
exports.PlayerController = PlayerController;
puerts_1.blueprint.mixin(jsclass_PC, PlayerController);
console.log("[BP_PC].Mixed in Finished");
//# sourceMappingURL=BP_PC.js.map