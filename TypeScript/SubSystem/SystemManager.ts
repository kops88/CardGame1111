/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 14:50:41
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-12 17:38:04
 * @FilePath: \CG1111\TypeScript\SubSystem\SystemName.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { $Nullable } from "puerts";
import UE from "ue";
import { AssetSystem } from "./AssetSystem";

export const SystemNameEnum = {
    AssetSystem: "AssetSystem",

};

export type SystemType = keyof typeof SystemNameEnum;
// const SystemNameMap: {[k: string]: string}= {};
// for (const k in SystemName) {
//     SystemNameMap[k] = k;
// }
// export const SystemNameEnum: {[k in SystemType]: k} = SystemNameMap as any;







export abstract class SystemBase {
}


export class SystemManager {

    private static _instance: SystemManager;
    
    private static WorldContext: $Nullable<UE.Object> = null;

    private AllSystems: Map<string, SystemBase> = new Map();

    private constructor() {
    }

    static get instance(): SystemManager | null {
        if(!SystemManager.WorldContext) {
            console.log("[SystemManager].WorldContext is null");
            return null;
        }
        if(!SystemManager._instance) {
            SystemManager._instance = new SystemManager();
        }
        return SystemManager._instance;
    }

    static SetWorld(world: $Nullable<UE.Object>) {
        console.log("[SystemManager].SetWorld:", world);
        this.WorldContext = world;
    }

    GetSystem(systemName: SystemType) {
        const syst = this.AllSystems?.get(systemName);
        if(syst) return syst;
        return this.AddSystem(systemName);
        
    }

    private AddSystem(systemName: SystemType) {
        switch (systemName) {
            case SystemNameEnum.AssetSystem:
                this.AllSystems.set(systemName, AssetSystem.GetInstance(SystemManager.WorldContext));
                break;
            default:
                console.log("[SystemManager].AddSystem:Error: systemName is not found, systemName:", systemName);
                break;
        }
    }



}

console.log("[SystemName].Finish");