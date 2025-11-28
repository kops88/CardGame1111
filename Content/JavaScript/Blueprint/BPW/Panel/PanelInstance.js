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
 * @LastEditTime: 2025-11-28 14:28:48
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\Panel\PanelInstance.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[PanelInstance] head");
const ue_1 = __importDefault(require("ue"));
const SystemManager_1 = require("../../../SubSystem/SystemManager");
console.log("[PanelInstance] start");
/**
 * 创建 panelInstance 步骤：
 * 1. 创建子类，继承 panelInstance，实现 abstract 函数
 * 2. export default 子类
 * 3. PanelNameDef 中添加枚举
 */
class PanelInstance {
    _panel = null;
    _path = "";
    _id = -1;
    bShowState = false;
    world;
    constructor(id) {
        this._id = id;
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
     * @description 加载蓝图, 为 _panel 创建实例
     * @param visible 是否显示，默认显示
     */
    Load(visible = true) {
        const uclass = ue_1.default.Class.Load(this._path);
        this._panel = this._panel ? this._panel : ue_1.default.WidgetBlueprintLibrary.Create(SystemManager_1.SystemManager.GetWorld(), uclass, null);
        this._panel.AddToViewport();
        if (!visible) {
            this._panel.SetVisibility(ue_1.default.ESlateVisibility.Hidden);
        }
        console.log("[PanelInstance] Load. path:", this._path);
        console.log('[PanelInstance] Load. panel = ', this._panel);
    }
    /**
     * @description 设置可见性，显示面板
     */
    Show() {
        this._panel.SetVisibility(ue_1.default.ESlateVisibility.Visible);
    }
    Hide() {
        this.OnHide();
        this._panel.SetVisibility(ue_1.default.ESlateVisibility.Hidden);
    }
    Destroy() {
        this.OnRemove();
        this._panel.RemoveFromParent();
    }
    GetName() {
        return this._name + '_' + this._id;
    }
    /**
     * 生命周期：销毁前
     */
    OnRemove() { }
    ;
    /**
     * 生命周期：隐藏前
     */
    OnHide() { }
    ;
}
exports.PanelInstance = PanelInstance;
console.log("[PanelInstance] finish");
//# sourceMappingURL=PanelInstance.js.map