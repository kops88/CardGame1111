"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetSystem = void 0;
console.log('[AssetSystem] head');
const ue_1 = __importDefault(require("ue"));
console.log("[AssetSystem] before import gameInstance");
console.log("[AssetSystem] After import gameInstance");
const SystemName_1 = require("./SystemName");
console.log('[AssetSystem] start');
class AssetSystem extends SystemName_1.SystemBase {
    static _instance;
    CardTable = undefined;
    static GetInstance(WorldContextObject) {
        if (!AssetSystem._instance) {
            AssetSystem._instance = new AssetSystem(WorldContextObject);
        }
        return AssetSystem._instance;
    }
    constructor(WorldContextObject) {
        super();
        // this.CardTable = (UE.GameplayStatics.GetGameInstance(WorldContextObject) as GameInstance).GetCardTable();
        console.log("[GameInstance] AS.constructor hello");
        ue_1.default.GameplayStatics.GetGameInstance(WorldContextObject).printhello();
    }
    /**
     * @description 通过 cid(rowname) 获取CardDef结构
     */
    GetCardDefByCid(cid) {
        console.log("[AssetSystem].GetCardDefByCid.cid:", cid, "   this.CardTable:", this.CardTable);
        if (this.CardTable) {
            const outDef = new ue_1.default.Game.Blueprint.Table.CardDef.CardDef();
            ue_1.default.DataTableFunctionLibrary.GetDataTableRowFromName(this.CardTable, cid, outDef);
            return outDef;
        }
        return null;
    }
}
exports.AssetSystem = AssetSystem;
console.log('[AssetSystem] finish');
//# sourceMappingURL=AssetSystem.js.map