"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionLibrary = exports.SystemManager = void 0;
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 14:50:41
 * @LastEditors: v_lyyulliu
 * @LastEditTime: 2025-11-15 16:43:50
 * @FilePath: \CG1111\TypeScript\SubSystem\SystemName.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log('[SystemManager] head');
const ue_1 = __importDefault(require("ue"));
const SystemName_1 = require("./SystemName");
const AssetSystem_1 = require("./AssetSystem");
const GameOperationSystem_1 = require("./GameOperationSystem");
console.log('[SystemManager] start');
class SystemManager {
    static _instance;
    static WorldContext = null;
    AllSystems = new Map();
    HandZone = undefined;
    constructor() {
    }
    static get instance() {
        if (!SystemManager._instance) {
            SystemManager._instance = new SystemManager();
            SystemManager._instance.AllSystems = new Map();
            console.log("[SystemManager].instance: Create new instance, Create AllSystem = ", this._instance.AllSystems);
        }
        return SystemManager._instance;
    }
    GetSystem(systemName) {
        const syst = this.AllSystems?.get(systemName);
        if (syst)
            return syst;
        return this.AddSystem(systemName);
    }
    AddSystem(systemName) {
        switch (SystemName_1.SystemNameEnum[systemName]) {
            case SystemName_1.SystemNameEnum.AssetSystem:
                this.AllSystems.set(systemName, AssetSystem_1.AssetSystem.GetInstance(SystemManager.WorldContext));
                console.log("[SystemManager].AddSystem:AssetSystem");
                break;
            case SystemName_1.SystemNameEnum.GameOperationSystem:
                this.AllSystems.set(systemName, GameOperationSystem_1.GameOperationSystem.instance);
                console.log("[SystemManager].AddSystem:GameOperationSystem");
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
    static SetWorld(world) {
        console.log("[SystemManager].SetWorld:", world);
        this.WorldContext = world;
    }
    /**
     * 方便获取World函数
     */
    static GetWorld() {
        if (!this.WorldContext) {
            console.log("[SystemManager].GetWorld:Error: WorldContext = ", this.WorldContext);
        }
        return this.WorldContext;
    }
    /**
     * @description 在 DuelPage 构造的时候调用。在需要的时候，通过SystemManager 获取 DuelPage
     * @param Hand DuelPage
     */
    SetHandZone(Hand) {
        console.log("[SystemManager].SetHandZone: HandZone is ", Hand);
        this.HandZone = Hand;
    }
    GetHandZone() {
        if (!this.HandZone) {
            console.log("[SystemManager].GetHandZone:Error: HandZone is Undefined");
            return undefined;
        }
        return this.HandZone;
    }
}
exports.SystemManager = SystemManager;
class FunctionLibrary {
    /**
     *@description  使用 BeginDeferredActorSpawnFromClass 创建 Actor
     */
    static CreateAction(ActorClass) {
        let actor = ue_1.default.GameplayStatics.BeginDeferredActorSpawnFromClass(SystemManager.GetWorld(), ActorClass, ue_1.default.Transform.Identity);
        ue_1.default.GameplayStatics.FinishSpawningActor(actor, ue_1.default.Transform.Identity);
        return actor;
    }
}
exports.FunctionLibrary = FunctionLibrary;
console.log("[SystemManager].Finish");
//# sourceMappingURL=SystemManager.js.map