"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaneNameEnum = exports.PanelModule = exports.PanelPath = void 0;
exports.PanelPath = {
    DuelPage: "../Blueprint/BPW/Panel/DuelPage",
};
exports.PanelModule = exports.PanelPath;
// 设置 panelname: "panelName"
const _panelNameEnum = {};
for (const k in exports.PanelPath) {
    _panelNameEnum[k] = k;
}
// 设置枚举, as any 规避属性。
exports.PaneNameEnum = _panelNameEnum;
//# sourceMappingURL=PanelPath.js.map