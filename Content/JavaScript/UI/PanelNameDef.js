"use strict";
// import { MainUI } from "../UI/Panel/MainUI";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelNameEnum = exports.PanelModule = exports.PanelNameDef = void 0;
exports.PanelNameDef = {
    DuelPage: "../UI/Panel/DuelPage",
    MainUI: "../UI/Panel/mainUI",
    PullMenu: "../UI/Panel/PullMenu",
    PullResult: "../UI/Panel/PullResult",
    TaskMenu: "../UI/Panel/TaskMenu",
};
exports.PanelModule = exports.PanelNameDef;
// 设置 枚举到string
const _panelNameEnum = {};
for (const k in exports.PanelNameDef) {
    _panelNameEnum[k] = k;
}
// 设置枚举, as any 规避属性。
exports.PanelNameEnum = _panelNameEnum;
//# sourceMappingURL=PanelNameDef.js.map