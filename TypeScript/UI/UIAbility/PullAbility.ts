console.log("[PullAbility] start");

import { CardDef } from "../../Card/CardBase/CardInstance";
import { AssetSystem } from "../../SubSystem/AssetSystem";
import { SystemManager } from "../../SubSystem/SystemManager";
import { SystemEnum } from "../../SubSystem/SystemName";



export class PullAbility {

    private ms: AssetSystem;

    /**
     * 开始生命周期
     */
    OnStart() { 
        this.ms = SystemManager.instance.GetSystem(SystemEnum.AssetSystem);
    }

    /**
     * 抽一张牌，暂时返回卡1；
     */
    OnePull() { 
        return this.ms.GetCardDefByCid(1);
    }

    /**
     * 抽十张牌，暂时返回卡1；
     */
    TenPull() { 
        let CardList: CardDef[] = [];
        for(let i = 0; i < 10; i++) {
             CardList.push(this.OnePull());
        }
        return CardList;
    }


}









console.log("[PullAbility] Finish");
