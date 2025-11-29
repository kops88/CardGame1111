/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-27 11:18:22
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-28 17:53:35
 * @FilePath: \CG1111\TypeScript\SubSystem\PanelSystem.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[PanelSystem] head");
import { PanelInstance } from "../UI/Panel/PanelInstance";
import {PanelModule } from "../UI/PanelNameDef";
import { IdGenerator } from "../UI/UIAbility/IdGenerator";

/**
 * only 创建class ，还需其他步骤到Systemmanager；。
 */
export class PanelSystem {

    private static _instance: PanelSystem;
    private _allPanel: Map<string, PanelInstance> = new Map();
    /**
     * 最新生成的id
     */
    private IdGenerator: IdGenerator = new IdGenerator();


    static GetInstance(): PanelSystem {
        if (!PanelSystem._instance) {
            PanelSystem._instance = new PanelSystem();
        }
        return PanelSystem._instance;
    }   

    /**
     * @description 如果存在panel，显示并返回。 如果不存在，创建并返回，显示。
     * @param panelName 使用 PanelNameEnum 枚举
     */
    AddPanelByName(panelName: string) { 
        // 存在panel 直接显示， 并返回
        console.log("[PanelSystem] AddPanelByName: panelName = ", panelName);
         
        const panel = this._allPanel.get(panelName);
        if(panel) {
            panel.Show();
            return panel; 
        }

        // 不存在 panel 创建， 添加 返回
        // const name = PanelNameEnum[panelName];
        const panel_id = this.IdGenerator.GenerateId();
        const panelClass = require(PanelModule[panelName])?.default;
        // const panelClass = this.LoadPanelByName(name);
        if(panelClass) {
            // console.log('[panelSystem] AddPanelByName: panelClass = ', panelClass);
            
            const panel = new panelClass(panel_id) as PanelInstance;
            panel.Init();
            panel.Show();
            console.log('[panelSystem] AddPanelByName: panel = ', panel);
            
            this._allPanel.set(panelName, panel);
            
            return panel;
        }
        console.log("[PanelSystem] AddPanelByName:Error: panelClass is null, panelName:", panelName);
    }



}
