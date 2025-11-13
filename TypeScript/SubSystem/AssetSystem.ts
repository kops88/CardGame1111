import UE from 'ue';
import { GameInstance } from '../Blueprint/GameMode/BP_GI';
import { CardDef } from '../Blueprint/BPW/CardInstance/CardInstance';
import { $Nullable } from "puerts";

export class AssetSystem {


    private static _instance: AssetSystem;
    private CardTable:UE.DataTable;
    
    static GetInstance(WorldContextObject: $Nullable<UE.Object>): AssetSystem {
        if (!AssetSystem._instance) {
            AssetSystem._instance = new AssetSystem(WorldContextObject);
        }
        return AssetSystem._instance;
    }

    private constructor(WorldContextObject: $Nullable<UE.Object>) {
        this.CardTable = (UE.GameplayStatics.GetGameInstance(WorldContextObject) as GameInstance).GetCardTable();
    }

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