
import { IdGenerator } from "./IdGenerator"
import { TemplateNameToPath } from "../../UI/TemplateNameDef"
import { TemplateBase } from "../Template/TemplateBase";
import { PanelInstance } from "../Panel/PanelInstance";



export class TemplateAbility { 

    private idGenerator: IdGenerator = new IdGenerator();
    private TemplateInstMap: Map<number, TemplateBase> = new Map();
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