import { GameOperationSystem } from "../SubSystem/GameOperationSystem";



class PhainonCore {

    private GOS: GameOperationSystem | undefined = undefined;
    private fstCard: number = 1;
    private phase: EPhase = EPhase.None;


    private FireMax = 0;
    private FireSeed = 0;
    private LoseNum = 0;
    private Possibility = 0;

    private FireSeedMax = 12;

    private Init() { 
        this.GOS = GameOperationSystem.instance;
    }

    StartGame() { 
        this.Init();
        this.GOS?.DrawCardByCid(this.fstCard);
        this.phase = EPhase.StartGame;
        // this.HandlePhase();
        // updateStateText() 初始化 状态栏显示
    }

    // Action 添加的回调
    HandlePhase() { 
        this.phase = this.UpdatePhase();
        this.ExecutePhase();
    }

    ExecutePhase() {
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


}

enum EPhase { 
    None = 0,
    StartGame,
    Battle,
    FireMax,
    EndGame,
}