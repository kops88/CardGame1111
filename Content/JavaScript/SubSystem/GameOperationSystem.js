"use strict";
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 15:40:45
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-18 12:20:52
 * @FilePath: \CG1111\TypeScript\SubSystem\GameOperationSystem.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOperationSystem = void 0;
const SystemManager_1 = require("./SystemManager");
const SystemName_1 = require("./SystemName");
class GameOperationSystem {
    static _instance;
    AS = undefined;
    HandZone = undefined;
    CardList = [];
    static get instance() {
        if (!GameOperationSystem._instance) {
            GameOperationSystem._instance = new GameOperationSystem();
        }
        if (!GameOperationSystem._instance.AS) {
            GameOperationSystem._instance.AS = SystemManager_1.SystemManager.instance?.GetSystem(SystemName_1.SystemEnum.AssetSystem);
        }
        if (!GameOperationSystem._instance.HandZone) {
            GameOperationSystem._instance.HandZone = SystemManager_1.SystemManager.instance?.GetHandZone();
        }
        return GameOperationSystem._instance;
    }
    /**
     * 统一的抽卡函数
     * @description 根据cid，抽取卡牌到手卡区域
     */
    DrawCardByCid(cid) {
        cid = typeof cid === 'number' ? cid.toString() : cid;
        const def = this.AS?.GetCardDefByCid(cid);
        if (def) {
            let card = this.HandZone?.AddCardToHand(def);
            if (card) {
                this.CardList.push(card);
            }
        }
    }
    /**
     * 统一的获取手卡数量函数
     */
    GetHandCardsNum() {
        if (!this.HandZone)
            return 0;
        return this.HandZone?.GetHandCardsNum();
    }
    UseCard() {
        this.CardList[0].Use();
    }
}
exports.GameOperationSystem = GameOperationSystem;
//# sourceMappingURL=GameOperationSystem.js.map