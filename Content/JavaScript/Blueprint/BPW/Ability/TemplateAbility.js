"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IdGenerator_1 = require("./IdGenerator");
const TemplateNameDef_1 = require("../../../path/TemplateNameDef");
class TemplateAbility {
    idGenerator = new IdGenerator_1.IdGenerator();
    CreateChildTemplate(TemplateName) {
        const id = this.idGenerator.GenerateId();
        const TemplateClass = require(TemplateNameDef_1.TemplateNameToPath[TemplateName])?.default;
        if (TemplateClass) {
            const template = new TemplateClass(id);
            return template;
        }
    }
}
//# sourceMappingURL=TemplateAbility.js.map