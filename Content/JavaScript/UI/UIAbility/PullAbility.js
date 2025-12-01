"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullAbility = void 0;
console.log("[PullAbility] start");
const SystemManager_1 = require("../../SubSystem/SystemManager");
const SystemName_1 = require("../../SubSystem/SystemName");
class PullAbility {
    ms;
    /**
     * 开始生命周期
     */
    OnStart() {
        this.ms = SystemManager_1.SystemManager.instance.GetSystem(SystemName_1.SystemEnum.AssetSystem);
    }
    /**
     * 抽一张牌，暂时返回卡1；
     */
    OnePull() {
        return this.ms.GetCardDefByCid(1);
    }
    /**
     * 抽十张牌，暂时返回卡1；
     */
    TenPull() {
        let CardList = [];
        for (let i = 0; i < 10; i++) {
            CardList.push(this.OnePull());
        }
        return CardList;
    }
}
exports.PullAbility = PullAbility;
console.log("[PullAbility] Finish");
//# sourceMappingURL=PullAbility.js.map