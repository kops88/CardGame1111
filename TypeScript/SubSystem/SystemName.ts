console.log('[SystemName] head');
import { AssetSystem } from "./AssetSystem";
import { GameOperationSystem } from "./GameOperationSystem"
console.log('[SystemName] start');

/**
 * @description 子系统管理器名称
 */
export const SystemNameEnum = {
    AssetSystem: "AssetSystem" as unknown as AssetSystem,
    GameOperationSystem: "GameOperationSystem" as unknown as GameOperationSystem,

};

/**
 * @description export type SystemModuleType = typeof SystemNameEnum;
 */
export type SystemModuleType = typeof SystemNameEnum;

/**
 * @description export type SystemType = keyof typeof SystemNameEnum;
 */
export type SystemType = keyof typeof SystemNameEnum;

export const SystemEnum: { [k in SystemType]: k} = SystemNameEnum as any;



export abstract class SystemBase {
    constructor() {}
}




console.log('[SystemName] finish');
