/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 15:40:45
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-21 14:51:14
 * @FilePath: \CG1111\TypeScript\SubSystem\GameOperationSystem.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { AssetSystem } from './AssetSystem';
import { SystemManager,  } from './SystemManager';
import { SystemEnum, SystemType } from './SystemName';
import { DuelPage } from '../Blueprint/BPW/Page/BPW_DuelPage';
import { CardInstance } from '../Blueprint/BPW/CardInstance/CardInstance';
import { PhainonCore, CoreCard } from '../Deck/PhainonCore'


export class GameOperationSystem {

    private static _instance: GameOperationSystem;
    private AS: AssetSystem | undefined = undefined;
    private HandZone: DuelPage | undefined = undefined;
    private CardList: CardInstance[] = [];
    private core: PhainonCore | undefined = undefined;

    static get instance(): GameOperationSystem {
        if(!GameOperationSystem._instance) {
            GameOperationSystem._instance = new GameOperationSystem();
        }
        if(!GameOperationSystem._instance.AS) {
            GameOperationSystem._instance.AS = SystemManager.instance?.GetSystem(SystemEnum.AssetSystem) as AssetSystem;
        }
        if(!GameOperationSystem._instance.HandZone) {
            GameOperationSystem._instance.HandZone = SystemManager.instance?.GetHandZone();
        }
        return GameOperationSystem._instance;
    }

    /**
     * 统一的开始游戏函数
     */
    StartGame() { 
        this.core = new PhainonCore() as PhainonCore;
        this.core.Start();
    }

    /** 
     * 统一的抽卡函数
     * @description 根据cid，抽取卡牌到手卡区域
     */
    DrawCardByCid(cid: string | number): void {
        cid = typeof cid === 'number'? cid.toString() : cid;
        const def = this.AS?.GetCardDefByCid(cid);
        if(def) {
            let card = this.HandZone?.AddCardToHand(def);
            if(card) {

                this.CardList.push(card);

            }
        }
    }

    DealDamage(damage: number | string): void { 
        if(typeof damage === 'string') {
            damage = parseInt(damage);
        }
        console.log("[GameOperationSystem].DealDamage: damage = ", damage);
    }

    /**
     * 统一的获取手卡数量函数
     */
    GetHandCardsNum(): number { 
        if(!this.HandZone) return 0;
        return this.HandZone?.GetHandCardsNum();
    }

    UseCard() {
        this.CardList[0].Use();
    }

    GetCoreCard(): CoreCard{ 
        return this.core as CoreCard;
    }
}