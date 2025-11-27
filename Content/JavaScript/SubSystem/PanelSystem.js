"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelSystem = void 0;
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-27 11:18:22
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-27 18:23:45
 * @FilePath: \CG1111\TypeScript\SubSystem\PanelSystem.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[PanelSystem] head");
const PanelPath_1 = require("../path/PanelPath");
/**
 * only 创建class ，还需其他步骤到Systemmanager；。
 */
class PanelSystem {
    static _instance;
    _allPanel = new Map();
    static GetInstance() {
        if (!PanelSystem._instance) {
            PanelSystem._instance = new PanelSystem();
        }
        return PanelSystem._instance;
    }
    AddPanelByName(panelName) {
        // 存在panel 直接显示， 并返回
        const panel = this._allPanel.get(panelName);
        if (panel) {
            panel.Show();
            return panel;
        }
        // 不存在 panel 创建， 添加 返回
        const name = PanelPath_1.PaneNameEnum[panelName];
        const panelClass = require(PanelPath_1.PanelModule[name])?.default;
        // const panelClass = this.LoadPanelByName(name);
        if (panelClass) {
            const panel = new panelClass();
            this._allPanel.set(panelName, panel);
            return panel;
        }
        console.log("[PanelSystem] AddPanelByName:Error: panelClass is null, panelName:", panelName);
    }
}
exports.PanelSystem = PanelSystem;
//# sourceMappingURL=PanelSystem.js.map