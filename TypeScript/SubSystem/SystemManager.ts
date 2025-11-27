/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 14:50:41
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-27 17:45:33
 * @FilePath: \CG1111\TypeScript\SubSystem\SystemManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 14:50:41
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-27 17:36:33
 * @FilePath: \CG1111\TypeScript\SubSystem\SystemName.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log('[SystemManager] head');
import { $Nullable } from "puerts";
import UE from "ue";
import { SystemNameEnum, SystemType, SystemModuleType, SystemBase } from "./SystemName";
// import { DuelPage } from '../Blueprint/BPW/Page/BPW_DuelPage';
import DuelPage from '../Blueprint/BPW/Panel/DuelPage';
import { AssetSystem } from "./AssetSystem";
import { GameOperationSystem } from "./GameOperationSystem"
import { PanelSystem } from "./PanelSystem";

console.log('[SystemManager] start');

/**
 * 添加新系统步骤：
 * 1. SystemNameEnum 添加新枚举
 * 2. 创建新系统，无需继承SystemBase
 * 3. AddSystem 中添加 set
 */
export class SystemManager {

    private static _instance: SystemManager;
    
    private static WorldContext: $Nullable<UE.Object> = null;

    private AllSystems: Map<string, SystemBase> = new Map();

    private HandZone: DuelPage | undefined = undefined;

    private constructor() {
    }

    static get instance(): SystemManager | null {
        if(!SystemManager._instance) {
            SystemManager._instance = new SystemManager();
            SystemManager._instance.AllSystems = new Map();
            console.log("[SystemManager].instance: Create new instance, Create AllSystem = ", this._instance.AllSystems);
        }
        return SystemManager._instance;
    }

    

    GetSystem<T extends SystemType>(systemName: T): SystemModuleType[T] 
    GetSystem(systemName: string) {
        const syst = this.AllSystems?.get(systemName);
        if(syst) return syst;
        return this.AddSystem(systemName);
    }

    private AddSystem(systemName: string) {
        switch (SystemNameEnum[systemName as SystemType]) {
            case SystemNameEnum.AssetSystem:
                this.AllSystems.set(systemName, AssetSystem.GetInstance(SystemManager.WorldContext));
                console.log("[SystemManager].AddSystem:AssetSystem")
                break;
            case SystemNameEnum.GameOperationSystem:
                this.AllSystems.set(systemName, GameOperationSystem.instance);
                console.log("[SystemManager].AddSystem:GameOperationSystem")
                break;
            case SystemNameEnum.PanelSystem:
                this.AllSystems.set(systemName, PanelSystem.GetInstance());
                console.log("[SystemManager].AddSystem:PanelSystem")
                break;
            default:
                console.log("[SystemManager].AddSystem:Error: systemName is not found, systemName:", systemName);
                break;
        }
        return this.AllSystems?.get(systemName);
    }

    /**
     * @description 设置World，部分系统需要用到
     * @example BP_PC.ReceiveBeginPlay
     */
    static SetWorld(world: $Nullable<UE.Object>) {
        console.log("[SystemManager].SetWorld:", world);
        this.WorldContext = world;
    }

    /**
     * 方便获取World函数
     */
    static GetWorld() {
        if(!this.WorldContext) {
            console.log("[SystemManager].GetWorld:Error: WorldContext = ", this.WorldContext);
        }
        return this.WorldContext;
    }

    /**
     * @description 在 DuelPage 构造的时候调用。在需要的时候，通过SystemManager 获取 DuelPage
     * @param Hand DuelPage
     */
    SetHandZone(Hand: DuelPage) {
            console.log("[SystemManager].SetHandZone: HandZone is ", Hand);
        this.HandZone = Hand;
    }

    GetHandZone(): DuelPage | undefined {
        if(!this.HandZone) {
            console.log("[SystemManager].GetHandZone:Error: HandZone is Undefined")
            return undefined;
        }
        return this.HandZone;
    }



}


export class FunctionLibrary { 

    /**
     *@description  使用 BeginDeferredActorSpawnFromClass 创建 Actor 
     */
    static CreateAction(ActorClass: $Nullable<UE.Class>): UE.Actor {
        let actor = UE.GameplayStatics.BeginDeferredActorSpawnFromClass(SystemManager.GetWorld(), ActorClass, UE.Transform.Identity);
        UE.GameplayStatics.FinishSpawningActor(actor, UE.Transform.Identity);
        return actor;
    }

}







console.log("[SystemManager].Finish");