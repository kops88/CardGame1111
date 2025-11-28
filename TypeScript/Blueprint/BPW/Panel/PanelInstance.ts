/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-27 11:43:21
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-28 14:28:48
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\Panel\PanelInstance.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[PanelInstance] head");

import UE from 'ue';
import { SystemManager } from '../../../SubSystem/SystemManager';
import { blueprint, $Nullable, load } from 'puerts';
console.log("[PanelInstance] start");

/**
 * 创建 panelInstance 步骤：
 * 1. 创建子类，继承 panelInstance，实现 abstract 函数
 * 2. export default 子类
 * 3. PanelNameDef 中添加枚举
 */


export abstract class PanelInstance { 

    protected _panel: UE.UserWidget = null;
    protected _path: string = "";
    protected _id = -1;
    protected abstract _name: string;
    protected bShowState: boolean = false;
    protected world: $Nullable<UE.Object>

    constructor(id: number) {
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
    Load(visible: boolean = true) {
        const uclass = UE.Class.Load(this._path);
        this._panel = this._panel? this._panel : UE.WidgetBlueprintLibrary.Create(SystemManager.GetWorld(), uclass, null) as UE.UserWidget;
        this._panel.AddToViewport();
        if(!visible) { 
            this._panel.SetVisibility(UE.ESlateVisibility.Hidden);
        }
        console.log("[PanelInstance] Load. path:", this._path);
        console.log('[PanelInstance] Load. panel = ', this._panel);
    }

    /**
     * @description 设置可见性，显示面板
     */
    Show() { 
        this._panel.SetVisibility(UE.ESlateVisibility.Visible);
    }

    Hide() { 
        this.OnHide();
        this._panel.SetVisibility(UE.ESlateVisibility.Hidden);
    }

    Destroy() { 
        this.OnRemove();
        this._panel.RemoveFromParent();

    }

    GetName() {
        return this._name + '_' + this._id;
    }





    /**
     * 生命周期：初始化,必须实现
     * @description 进行 path Load，创建组件及初始化
     */
    abstract DoInit();
    /**
     * 生命周期：销毁前
     */
    OnRemove() {};
    /**
     * 生命周期：隐藏前
     */
    OnHide() {};




}











































console.log("[PanelInstance] finish");
