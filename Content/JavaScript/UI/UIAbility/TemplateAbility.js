"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewCompAbility = exports.TemplateAbility = void 0;
const IdGenerator_1 = require("./IdGenerator");
const TemplateNameDef_1 = require("../../UI/TemplateNameDef");
class TemplateAbility {
    idGenerator = new IdGenerator_1.IdGenerator();
    TemplateInstMap = new Map();
    parentPanel;
    constructor(parentPanel) {
        this.parentPanel = parentPanel;
    }
    /**
     * 创建子模板，并设置父panel，返回template
     * @param TemplateName 模板名称，使用TemplateNameEnum获取
     */
    CreateChildTemplate(TemplateName, Show = true) {
        const id = this.idGenerator.GenerateId();
        const TemplateClass = require(TemplateNameDef_1.TemplateNameToPath[TemplateName])?.default;
        if (TemplateClass) {
            const template = new TemplateClass(id);
            template.Init();
            template.SetParentPanel(this.parentPanel);
            this.TemplateInstMap.set(id, template);
            if (Show)
                template.Show();
            return template;
        }
    }
}
exports.TemplateAbility = TemplateAbility;
class ViewCompAbility {
    /**
     * id加载器
     * map id到实例
     * 所属的panel
     * 创建方法
     */
    idGenerator = new IdGenerator_1.IdGenerator();
    ViewInsMap = new Map();
    parentPanel;
    constructor(parent) {
        this.parentPanel = parent;
    }
    /**
     * 创建view， 传入string-path的映射，加载path，使用require 加载class
     * 生成class，调用方法setparent
     * 预留声明周期函数
     * 生成id
     */
    CreateChildView(name) {
        const id = this.idGenerator.GenerateId();
        const ViewClass = require(TemplateNameDef_1.ViewNameToPath[name])?.default;
        if (ViewClass) {
            const view = new ViewClass(id);
            view.Load();
            view.OnInit();
            view.SetParentPanel(this.parentPanel);
            this.ViewInsMap.set(id, view);
            view.show();
            return view;
        }
        console.log("[CreateChildView] CreateChildView, error");
    }
    /**
     * 不调用 Load，直接将传入的widget设置给object
     * @param name 使用 ViewNameEnum
     * @param widget 蓝图中已经加载的组件
     */
    CreateChildViewByExist(name, widget) {
        const id = this.idGenerator.GenerateId();
        const ViewClass = require(TemplateNameDef_1.ViewNameToPath[name])?.default;
        if (ViewClass) {
            const view = new ViewClass(id);
            view.SetObject(widget);
            view.OnInit();
            view.SetParentPanel(this.parentPanel);
            this.ViewInsMap.set(id, view);
            view.show();
            return view;
        }
        console.log("[CreateChildView] CreateChildView, error");
    }
}
exports.ViewCompAbility = ViewCompAbility;
//# sourceMappingURL=TemplateAbility.js.map