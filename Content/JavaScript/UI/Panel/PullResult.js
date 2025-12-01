"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-28 11:49:57
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-28 11:50:40
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\Panel\PullResult.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[PullResult] start");
const PanelInstance_1 = require("./PanelInstance");
const Path_1 = require("../../Path");
const TemplateNameDef_1 = require("../TemplateNameDef");
const Pull_CardBack_1 = require("../Template/Pull_CardBack");
const PanelSystem_1 = require("../../SubSystem/PanelSystem");
const PanelNameDef_1 = require("../PanelNameDef");
class PullResult extends PanelInstance_1.PanelInstance {
    _path = Path_1.BlueprintPath.PullResult;
    _name = "PullResult";
    DoInit() {
        this.RegisterEvent();
    }
    RegisterEvent() {
        this._panel.Close.OnClicked.Add(() => {
            console.log("Close 7758");
            this.Destroy();
            PanelSystem_1.PanelSystem.GetInstance().AddPanelByName(PanelNameDef_1.PanelNameEnum.PullMenu);
        });
        this._panel.Skip.OnClicked.Add(() => {
            // 调用所有子组件的show方法
            this.TemplateUtils.TemplateInstMap.forEach((value, key) => {
                if (value instanceof Pull_CardBack_1.Pull_CardBack) {
                    value.FlipCard();
                }
            });
        });
    }
    ShowResultTen(cardList) {
        this._panel.WrapBox.ClearChildren();
        for (const card of cardList) {
            const template = this.TemplateUtils.CreateChildTemplate(TemplateNameDef_1.TemplateNameEnum.Pull_CardBack, false);
            template.SetCardDef(card);
            template.SetParentPanel(this);
            template.Show(false);
            this._panel.WrapBox.AddChildToWrapBox(template.GetObject());
        }
    }
    ShowResultOne(card) {
        this._panel.WrapBox.ClearChildren();
        const template = this.TemplateUtils.CreateChildTemplate(TemplateNameDef_1.TemplateNameEnum.Pull_CardBack, false);
        template.SetCardDef(card);
        template.SetParentPanel(this);
        template.Show(false);
        this._panel.WrapBox.AddChildToWrapBox(template.GetObject());
    }
}
exports.default = PullResult;
//# sourceMappingURL=PullResult.js.map