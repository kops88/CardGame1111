"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelNameEnum = exports.PanelModule = exports.PanelNameDef = void 0;
// import { MainUI } from "../Blueprint/BPW/Panel/mainUI";
// import { TaskMenu } from "../Blueprint/BPW/Panel/TaskMenu";
// import { PullResult } from "../Blueprint/BPW/Panel/PullResult";
// import { PullMenu} from "../Blueprint/BPW/Panel/PullMenu";
exports.PanelNameDef = {
    DuelPage: "../Blueprint/BPW/Panel/DuelPage",
    MainUI: "../Blueprint/BPW/Panel/mainUI",
    PullMenu: "../Blueprint/BPW/Panel/PullMenu",
    PullResult: "../Blueprint/BPW/Panel/PullResult",
    TaskMenu: "../Blueprint/BPW/Panel/TaskMenu",
};
exports.PanelModule = exports.PanelNameDef;
// 设置 panelname: "panelName"
const _panelNameEnum = {};
for (const k in exports.PanelNameDef) {
    _panelNameEnum[k] = k;
}
// 设置枚举, as any 规避属性。
exports.PanelNameEnum = _panelNameEnum;
//# sourceMappingURL=PanelNameDef.js.map