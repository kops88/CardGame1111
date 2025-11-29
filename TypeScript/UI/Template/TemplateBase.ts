import UE from 'ue';
import { SystemManager } from '../../SubSystem/SystemManager';
import { PanelInstance } from '../Panel/PanelInstance';
import { load } from 'puerts';



export abstract class TemplateBase { 

    protected id: number;
    protected object: UE.UserWidget; 
    /** 蓝图路径 */
    protected abstract path: string;
    protected abstract name: string;
    protected parentPanel: PanelInstance;
    protected Visibility: boolean = false;

    /** 创建,Load后的初始化 */
    abstract OnInit();

    constructor(id: number) { 
        this.id = id;
    }

    /**
     * Template类通用的初始化，OnInit内单独的初始化。
     */
    Init() { 
        this.Load();
        this.OnInit();
    }

    /**
     * 创建蓝图到object
     */
    Load() { 
        const uclass = UE.Class.Load(this.path);
        this.object = UE.WidgetBlueprintLibrary.Create(SystemManager.GetWorld(), uclass, null) as UE.UserWidget;
    }

    /** 可重写 */
    // SetParentSlot(parentWidget: UE.UserWidget, slot?: UE.PanelSlot) { 

    // }

    /**
     * 
     * @param isV true使用addtoviewport，false使用setvisibility
     */
    Show(isV: boolean = true) { 
        if(isV) {
            this.object.AddToViewport();
        } else {
            this.object.SetVisibility(UE.ESlateVisibility.Visible);
        }
        this.Visibility = true;
    }

    GetName() { 
        return this.name + "_" + this.id.toString();
    }

    SetParentPanel(panel: PanelInstance) {
        this.parentPanel = panel;
    }

    GetParentPanel() {
        return this.parentPanel;
    }





}
