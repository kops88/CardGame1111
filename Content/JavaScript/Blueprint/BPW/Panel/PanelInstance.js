"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelInstance = void 0;
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-27 11:43:21
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-27 18:00:42
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\Panel\PanelInstance.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[PanelInstance] head");
const ue_1 = __importDefault(require("ue"));
console.log("[PanelInstance] start");
class PanelInstance {
    _panel = null;
    _path = "";
    bShowState = false;
    world;
    constructor(path) {
        this._path = path;
    }
    /**
     * 生命周期：创建
     * @description 在panelsystem中用new创建实例后，调用。
     * @Link PanelSystem.AddPanelByName()
     */
    Init() {
        this.DoInit();
    }
    /**
     * @description 加载蓝图, 创建实例
     */
    Load() {
        console.log("[PanelInstance] Load. path:", this._path);
        const uclass = ue_1.default.Class.Load(this._path);
        this._panel = this._panel ? this._panel : ue_1.default.WidgetBlueprintLibrary.Create(this.world, uclass, null);
    }
    /**
     * @description 设置可见性，显示面板
     */
    Show() {
        this._panel.SetVisibility(ue_1.default.ESlateVisibility.Visible);
        this._panel.AddToViewport();
    }
}
exports.PanelInstance = PanelInstance;
console.log("[PanelInstance] finish");
//# sourceMappingURL=PanelInstance.js.map