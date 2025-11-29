// import { MainUI } from "../UI/Panel/MainUI";



export const PanelNameDef = { 
    DuelPage: "../UI/Panel/DuelPage",
    MainUI: "../UI/Panel/mainUI",
    PullMenu: "../UI/Panel/PullMenu",
    PullResult: "../UI/Panel/PullResult",
    TaskMenu: "../UI/Panel/TaskMenu",

}

// 获取键的联合类型
export type PanelNameType = keyof typeof PanelNameDef;
export const PanelModule: { [k in PanelNameType]: string }  = PanelNameDef as any;

// 设置 枚举到string
const _panelNameEnum = { };
for( const k in PanelNameDef) { 
    _panelNameEnum[k] = k;
}

// 设置枚举, as any 规避属性。
export const PanelNameEnum: { [k in PanelNameType]: k} = _panelNameEnum as any;

