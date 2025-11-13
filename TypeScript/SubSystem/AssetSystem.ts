
console.log('[AssetSystem] head')

import UE from 'ue';
import { $Nullable } from "puerts";
console.log("[AssetSystem] before import gameInstance");
import { GameInstance } from '../Blueprint/GameMode/BP_GI';
console.log("[AssetSystem] After import gameInstance");
import { CardDef } from '../Blueprint/BPW/CardInstance/CardInstance';
import { SystemBase } from './SystemName';
console.log('[AssetSystem] start');




export class AssetSystem extends SystemBase{
    private static _instance: AssetSystem;
    private CardTable:UE.DataTable | undefined = undefined;
    
    static GetInstance(WorldContextObject: $Nullable<UE.Object>): AssetSystem {
        if (!AssetSystem._instance) {
            AssetSystem._instance = new AssetSystem(WorldContextObject);
        }
        return AssetSystem._instance;
    }

    private constructor(WorldContextObject: $Nullable<UE.Object>) {
        super();
        // this.CardTable = (UE.GameplayStatics.GetGameInstance(WorldContextObject) as GameInstance).GetCardTable();
        console.log("[GameInstance] AS.constructor hello");
        (UE.GameplayStatics.GetGameInstance(WorldContextObject) as GameInstance).printhello();
    }

    /**
     * @description 通过 cid(rowname) 获取CardDef结构
     */
    GetCardDefByCid(cid: string): CardDef | null {
        console.log("[AssetSystem].GetCardDefByCid.cid:", cid,"   this.CardTable:",this.CardTable);
        if(this.CardTable) {
            const outDef = new UE.Game.Blueprint.Table.CardDef.CardDef();
            UE.DataTableFunctionLibrary.GetDataTableRowFromName(this.CardTable, cid, outDef as any);
            return outDef;
        }
        return null;
    }
}


console.log('[AssetSystem] finish')
