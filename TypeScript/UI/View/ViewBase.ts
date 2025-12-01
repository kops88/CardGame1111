import UE from "ue";
import { PanelInstance } from '../Panel/PanelInstance';








export abstract class ViewBase {


    protected id: number = -1;
    protected object: UE.UserWidget;
    protected abstract name: string;
    protected abstract path: string;
    protected parentPanel: PanelInstance;
    /** 创建时调用，在这里加载蓝图 */
    abstract Load(); 
    /** 创建时，Load后调用，这里执行初始化 */
    abstract OnInit();


    constructor(id:number) {
        this.id = id;
    
    }

    

    show() {

    }

    SetParentPanel(panel: PanelInstance) { 
        this.parentPanel = panel;
    }

    SetObject(obj: UE.UserWidget) { 
        this.object = obj;
    }














}
