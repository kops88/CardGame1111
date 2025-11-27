/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-27 11:43:21
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-27 18:00:42
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\Panel\PanelInstance.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[PanelInstance] head");

import UE from 'ue';
import { blueprint, $Nullable, load } from 'puerts';
console.log("[PanelInstance] start");



export abstract class PanelInstance { 

    protected _panel: UE.UserWidget = null;
    protected _path: string = "";
    protected bShowState: boolean = false;
    protected world: $Nullable<UE.Object>

    /**
     * 生命周期：初始化,必须实现
     */
    abstract DoInit();

    constructor(path: string) {
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
        const uclass = UE.Class.Load(this._path);
        this._panel = this._panel? this._panel : UE.WidgetBlueprintLibrary.Create(this.world, uclass, null);
    }

    /**
     * @description 设置可见性，显示面板
     */
    Show() { 
        this._panel.SetVisibility(UE.ESlateVisibility.Visible);
        this._panel.AddToViewport();
    }











}











































console.log("[PanelInstance] finish");
