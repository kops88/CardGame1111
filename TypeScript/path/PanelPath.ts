import { DuelPage } from "../Blueprint/BPW/Panel/DuelPage";



export const PanelPath = { 
    DuelPage: "../Blueprint/BPW/Panel/DuelPage",

}

// 获取键的联合类型
export type PanelNameType = keyof typeof PanelPath;
export const PanelModule: { [k in PanelNameType]: string }  = PanelPath as any;

// 设置 panelname: "panelName"
const _panelNameEnum = { };
for( const k in PanelPath) { 
    _panelNameEnum[k] = k;
}

// 设置枚举, as any 规避属性。
export const PaneNameEnum: { [k in PanelNameType]: k} = _panelNameEnum as any;






