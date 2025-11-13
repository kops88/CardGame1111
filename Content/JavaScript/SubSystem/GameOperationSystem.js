"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOperationSystem = void 0;
const SystemManager_1 = require("./SystemManager");
const SystemName_1 = require("./SystemName");
class GameOperationSystem {
    static _instance;
    AS = undefined;
    HandZone = undefined;
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
            this.HandZone?.AddCardToHand(def);
        }
    }
}
exports.GameOperationSystem = GameOperationSystem;
//# sourceMappingURL=GameOperationSystem.js.map