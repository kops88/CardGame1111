
import { IdGenerator } from "./IdGenerator"
import { TemplateNameToPath } from "../../../path/TemplateNameDef"
import { TemplateBase } from "../Template/TemplateBase";



class TemplateAbility { 

    private idGenerator: IdGenerator = new IdGenerator();




    public CreateChildTemplate(TemplateName: string) {

        const id = this.idGenerator.GenerateId();
        const TemplateClass = require(TemplateNameToPath[TemplateName])?.default;
        if(TemplateClass) {
            const template = new TemplateClass(id) as TemplateBase;

            return template;
        }



    }











}