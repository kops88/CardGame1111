import UE from "ue";
import { IdGenerator } from "./IdGenerator"
import { TemplateNameToPath, ViewNameToPath } from "../../UI/TemplateNameDef"
import { ViewBase } from "../View/ViewBase"
import { TemplateBase } from "../Template/TemplateBase";
import { PanelInstance } from "../Panel/PanelInstance";



export class TemplateAbility { 

    private idGenerator: IdGenerator = new IdGenerator();
    TemplateInstMap: Map<number, TemplateBase> = new Map();
    private parentPanel: PanelInstance;

    constructor(parentPanel: PanelInstance) { 
        this.parentPanel = parentPanel;
    }

    /**
     * 创建子模板，并设置父panel，返回template
     * @param TemplateName 模板名称，使用TemplateNameEnum获取
     */
    public CreateChildTemplate(TemplateName: string, Show: boolean = true) {
        const id = this.idGenerator.GenerateId();
        const TemplateClass = require(TemplateNameToPath[TemplateName])?.default;
        if(TemplateClass) {
            const template = new TemplateClass(id) as TemplateBase;
            template.Init();
            template.SetParentPanel(this.parentPanel);
            this.TemplateInstMap.set(id, template);
            if(Show) template.Show();
            return template;
        }
    }


}


export class ViewCompAbility { 

    /**
     * id加载器
     * map id到实例
     * 所属的panel
     * 创建方法
     */

    idGenerator: IdGenerator = new IdGenerator();
    ViewInsMap: Map<number, ViewBase> = new Map();
    private parentPanel: PanelInstance;

    constructor(parent: PanelInstance) { 
        this.parentPanel = parent;
    }

    /**
     * 创建view， 传入string-path的映射，加载path，使用require 加载class
     * 生成class，调用方法setparent
     * 预留声明周期函数
     * 生成id
     */
    CreateChildView(name: string) {

        const id = this.idGenerator.GenerateId();
        const ViewClass = require(ViewNameToPath[name])?.default;
        if(ViewClass) {
            const view = new ViewClass(id) as ViewBase;
            view.Load();
            view.OnInit();
            view.SetParentPanel(this.parentPanel)
            this.ViewInsMap.set(id, view);
            view.show();
            return view;
        }
        console.log("[CreateChildView] CreateChildView, error")
    }

    /**
     * 不调用 Load，直接将传入的widget设置给object 
     * @param name 使用 ViewNameEnum
     * @param widget 蓝图中已经加载的组件
     */
    CreateChildViewByExist(name: string, widget: UE.UserWidget) { 
        const id = this.idGenerator.GenerateId();
        const ViewClass = require(ViewNameToPath[name])?.default;
        if(ViewClass) {
            const view = new ViewClass(id) as ViewBase;
            view.SetObject(widget);
            view.OnInit();
            view.SetParentPanel(this.parentPanel)
            this.ViewInsMap.set(id, view);
            view.show();
            return view;
        }
        console.log("[CreateChildView] CreateChildView, error")
    
    
    }










}