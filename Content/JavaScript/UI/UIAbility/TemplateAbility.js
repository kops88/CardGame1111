"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateAbility = void 0;
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
//# sourceMappingURL=TemplateAbility.js.map