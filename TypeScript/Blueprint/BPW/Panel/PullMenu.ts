/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-28 11:47:42
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-28 16:21:21
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\Panel\PullMenu.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEP
 */
console.log("[PullMenu] start");
import UE from "ue";
import { PanelInstance } from "./PanelInstance";
import { BlueprintPath } from "../../Path";
import { PanelSystem } from '../../../SubSystem/PanelSystem';
import { SystemEnum } from '../../../SubSystem/SystemName';
import { PanelNameEnum } from "../../../path/PanelNameDef"
import { PullAbility } from "../Ability/PullAbility";

type BPW_PullMenu = UE.Game.Blueprint.BPW.Page.PullMenu.PullMenu_C;

class PullMenu extends PanelInstance {

    protected declare _panel: BPW_PullMenu;
    protected _name = "PullMenu";
    private PullAbility: PullAbility;

    override DoInit() {
        this._path = BlueprintPath.PullMenu;
        this.PullAbility = new PullAbility();
        this.PullAbility.OnStart();
        this.Load();
        this.RegisterEvent();
    }

    RegisterEvent() { 
        // 返回主页面 btn
        this._panel.BackBtn.OnClicked.Add(() => {
            this.Hide();
            PanelSystem.GetInstance().AddPanelByName(PanelNameEnum.MainUI);
        });

        this._panel.TenPullBtn.OnClicked.Add(() => { 
            const result = this.PullAbility.TenPull();
        })



    }
}

export default PullMenu;

