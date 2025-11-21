import { GameOperationSystem } from "../SubSystem/GameOperationSystem";
import { SystemManager } from "../SubSystem/SystemManager";
import { SystemEnum } from '../SubSystem/SystemName'



export interface CoreCard {
    
    /**
     * 添加 tag 的数量。全局机制。
     */

    AddTagCount(tag: string, count: number): void;


}

export class PhainonCore implements CoreCard {

    private GOS: GameOperationSystem | undefined = undefined;
    private fstCard: number = 1;
    private phase: EPhase = EPhase.None;


    private FireMax = 0;
    private FireSeed = 0;
    private LoseNum = 0;
    private Possibility = 0;

    private FireSeedMax = 12;

    private Init() { 
        this.GOS = SystemManager.instance?.GetSystem(SystemEnum.GameOperationSystem) as GameOperationSystem;
    }

    /**
     * Core 启动函数
     */
    Start() {
        this.Init();
        this.phase = EPhase.StartGame;
        this.HandlePhase();
        // updateStateText() 初始化 状态栏显示
    }

    // Action 添加的回调
    private HandlePhase() { 
        this.phase = this.UpdatePhase();
        this.ExecutePhase();
    }

    private UpdatePhase() {
        let cardsNum = this.GOS?.GetHandCardsNum();
        if( this.phase == EPhase.StartGame ) 
            return EPhase.StartGame;
        else if (this.FireSeed >= this.FireSeedMax)
            return EPhase.FireMax;
        else if (cardsNum == 0)
            return EPhase.EndGame;
        else 
            return EPhase.Battle;
    }

    private ExecutePhase() {
        switch(this.phase) {
            case EPhase.StartGame: this.ProcessStartGame();break;
            case EPhase.Battle: this.ProcessBattle();break;
            case EPhase.FireMax: this.ProcessFireMax();break;
            case EPhase.EndGame: this.ProcessEndGame();break;
            default: 
                console.log("[CoreCard] Error: phase is not found, phase = ", this.phase);
                break;
        }
    }

    private ProcessStartGame() { 
        this.GOS?.DrawCardByCid(this.fstCard);
    }

    private ProcessBattle() { 
        console.log("[CoreCard] ProcessBattle");
        
    }

    private ProcessFireMax() { 

    }

    private ProcessEndGame() { 
        console.log("[CoreCard] GAME OVER");
    }

    AddTagCount(tag: string, count: number): void {
        
    }

}

enum EPhase { 
    None = 0,
    StartGame,
    Battle,
    FireMax,
    EndGame,
}