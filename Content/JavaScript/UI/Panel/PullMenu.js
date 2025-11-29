"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-28 11:47:42
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-28 16:21:21
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\Panel\PullMenu.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEP
 */
console.log("[PullMenu] start");
const PanelInstance_1 = require("./PanelInstance");
const Path_1 = require("../../Path");
const PanelSystem_1 = require("../../SubSystem/PanelSystem");
const PanelNameDef_1 = require("../../UI/PanelNameDef");
const PullAbility_1 = require("../UIAbility/PullAbility");
class PullMenu extends PanelInstance_1.PanelInstance {
    _name = "PullMenu";
    _path = Path_1.BlueprintPath.PullMenu;
    PullAbility;
    DoInit() {
        this.PullAbility = new PullAbility_1.PullAbility();
        this.PullAbility.OnStart();
        this.RegisterEvent();
    }
    RegisterEvent() {
        // 返回主页面 btn
        this._panel.BackBtn.OnClicked.Add(() => {
            this.Hide();
            PanelSystem_1.PanelSystem.GetInstance().AddPanelByName(PanelNameDef_1.PanelNameEnum.MainUI);
        });
        this._panel.TenPullBtn.OnClicked.Add(() => {
            const result = this.PullAbility.TenPull();
            this.Hide();
            const resultPanel = PanelSystem_1.PanelSystem.GetInstance().AddPanelByName(PanelNameDef_1.PanelNameEnum.PullResult);
            resultPanel.ShowResultTen(result);
        });
    }
}
exports.default = PullMenu;
//# sourceMappingURL=PullMenu.js.map