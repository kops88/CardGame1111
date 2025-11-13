
import { AssetSystem } from './AssetSystem';
import { SystemManager, SystemNameEnum, SystemType } from './SystemManager';




class GameOperationSystem {

    private static _instance: GameOperationSystem;
    private AS: AssetSystem | null = null;
    static get instance(): GameOperationSystem {
        if(!GameOperationSystem._instance) {
            GameOperationSystem._instance = new GameOperationSystem();
        }
        if(!GameOperationSystem._instance.AS) {
            GameOperationSystem._instance.AS = SystemManager.instance?.GetSystem(SystemNameEnum.AssetSystem as SystemType) as AssetSystem;
        }
        return GameOperationSystem._instance;
    }

    DrawCardByCid(cid: string): void {

    }

}