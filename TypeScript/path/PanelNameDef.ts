import { DuelPage } from "../Blueprint/BPW/Panel/DuelPage";
// import { MainUI } from "../Blueprint/BPW/Panel/mainUI";
// import { TaskMenu } from "../Blueprint/BPW/Panel/TaskMenu";
// import { PullResult } from "../Blueprint/BPW/Panel/PullResult";
// import { PullMenu} from "../Blueprint/BPW/Panel/PullMenu";



export const PanelNameDef = { 
    DuelPage: "../Blueprint/BPW/Panel/DuelPage",
    MainUI: "../Blueprint/BPW/Panel/mainUI",
    PullMenu: "../Blueprint/BPW/Panel/PullMenu",
    PullResult: "../Blueprint/BPW/Panel/PullResult",
    TaskMenu: "../Blueprint/BPW/Panel/TaskMenu",

}

// 获取键的联合类型
export type PanelNameType = keyof typeof PanelNameDef;
export const PanelModule: { [k in PanelNameType]: string }  = PanelNameDef as any;

// 设置 panelname: "panelName"
const _panelNameEnum = { };
for( const k in PanelNameDef) { 
    _panelNameEnum[k] = k;
}

// 设置枚举, as any 规避属性。
export const PanelNameEnum: { [k in PanelNameType]: k} = _panelNameEnum as any;






