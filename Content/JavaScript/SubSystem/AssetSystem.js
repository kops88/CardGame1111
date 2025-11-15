"use strict";
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 14:50:00
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-15 17:00:59
 * @FilePath: \CG1111\TypeScript\SubSystem\AssetSystem.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetSystem = void 0;
console.log('[AssetSystem] head');
const ue_1 = __importDefault(require("ue"));
const SystemName_1 = require("./SystemName");
const puerts_1 = require("puerts");
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
        let table = (0, puerts_1.$ref)(this.CardTable);
        ue_1.default.GameplayStatics.GetGameInstance(WorldContextObject).GetCardTable(table);
        this.CardTable = (0, puerts_1.$unref)(table);
        console.log("[GameInstance] AS.constructor. CardTable = ", this.CardTable);
        ue_1.default.GameplayStatics.GetGameInstance(WorldContextObject).Printhello();
    }
    /**
     * @description 通过 cid(rowname) 获取CardDef结构
     */
    GetCardDefByCid(cid) {
        console.log("[AssetSystem].GetCardDefByCid.cid:", cid, "   this.CardTable:", this.CardTable);
        if (this.CardTable) {
            // 卡住：25.11.15 无法创建蓝图的struct，报错
            // Puerts: Error: (0x0000071DABD8C3B0) js callback exception 
            // TypeError: ue_1.default.Game.Blueprint.Table.CardDef is not a constructor
            // const outDef = new UE.Game.Blueprint.Table.CardDef.CardDef();
            // const outDef = new (UE.Game.Blueprint.Table.CardDef as any)(); 
            ue_1.default.DataTableFunctionLibrary.GetDataTableRowFromName(this.CardTable, cid, outDef);
            return outDef;
        }
        return null;
    }
}
exports.AssetSystem = AssetSystem;
console.log('[AssetSystem] finish');
//# sourceMappingURL=AssetSystem.js.map