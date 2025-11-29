/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-28 11:49:57
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-28 11:50:40
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\Panel\PullResult.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[PullResult] start");
import UE from "ue";
import { PanelInstance } from "./PanelInstance";
import { BlueprintPath } from "../../Path";
import { CardDef } from "../../Card/CardBase/CardInstance";
import { TemplateNameEnum } from "../TemplateNameDef";
import { Pull_CardBack } from "../Template/Pull_CardBack";
import { SystemManager } from "../../SubSystem/SystemManager";
import { PanelSystem } from "../../SubSystem/PanelSystem";
import { PanelNameEnum } from "../PanelNameDef";

type BPW_PullResult = UE.Game.Blueprint.BPW.Page.PullResult.PullResult_C;

class PullResult extends PanelInstance {

    protected declare _panel: BPW_PullResult;
    protected _path = BlueprintPath.PullResult;
    protected _name = "PullResult";

    override DoInit() {

    }

    RegisterEvent() { 
        this._panel.Close.OnClicked.Add(() => {
            this.Destroy();
            PanelSystem.GetInstance().AddPanelByName(PanelNameEnum.PullMenu); 
        })
    }

    ShowResultTen(cardList: CardDef[]) { 
        this._panel.WrapBox.ClearChildren();
        for(const card of cardList) {
            const template = this.TemplateUtils.CreateChildTemplate(TemplateNameEnum.Pull_CardBack, false) as Pull_CardBack

            template.SetCardDef(card);
            template.SetParentPanel(this);
            template.Show(false);
            this._panel.WrapBox.AddChildToWrapBox(template.GetObject());
        }
    }
















}

export default PullResult;