/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 14:50:00
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-15 17:00:59
 * @FilePath: \CG1111\TypeScript\SubSystem\AssetSystem.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

console.log('[AssetSystem] head')

import UE from 'ue';
import { $Nullable } from "puerts";
import { GameInstance } from '../Blueprint/GameMode/BP_GI';
import { CardDef } from '../Blueprint/BPW/CardInstance/CardInstance';
import { SystemBase } from './SystemName';
import { $ref, $unref } from 'puerts';
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
        let table = $ref(this.CardTable);
        (UE.GameplayStatics.GetGameInstance(WorldContextObject) as GameInstance).GetCardTable(table);
        this.CardTable =  $unref(table);
        console.log("[GameInstance] AS.constructor. CardTable = ", this.CardTable);
        (UE.GameplayStatics.GetGameInstance(WorldContextObject) as GameInstance).Printhello();
    }

    /**
     * @description 通过 cid(rowname) 获取CardDef结构
     */
    GetCardDefByCid(cid: string): CardDef | null {
        console.log("[AssetSystem].GetCardDefByCid.cid:", cid,"   this.CardTable:",this.CardTable);
        if(this.CardTable) {
            // 卡住：25.11.15 无法创建蓝图的struct，报错
            // Puerts: Error: (0x0000071DABD8C3B0) js callback exception 
            // TypeError: ue_1.default.Game.Blueprint.Table.CardDef is not a constructor
            
            // const outDef = new UE.Game.Blueprint.Table.CardDef.CardDef();
            // const outDef = new (UE.Game.Blueprint.Table.CardDef as any)(); 

            UE.DataTableFunctionLibrary.GetDataTableRowFromName(this.CardTable, cid, outDef as any);
            return outDef;
        }
        return null;
    }
}


console.log('[AssetSystem] finish')
