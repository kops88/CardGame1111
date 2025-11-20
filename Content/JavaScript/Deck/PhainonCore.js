"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameOperationSystem_1 = require("../SubSystem/GameOperationSystem");
class PhainonCore {
    GOS = undefined;
    fstCard = 1;
    phase = EPhase.None;
    FireMax = 0;
    FireSeed = 0;
    LoseNum = 0;
    Possibility = 0;
    FireSeedMax = 12;
    Init() {
        this.GOS = GameOperationSystem_1.GameOperationSystem.instance;
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
    UpdatePhase() {
        let cardsNum = this.GOS?.GetHandCardsNum();
        if (this.phase == EPhase.StartGame)
            return EPhase.StartGame;
        else if (this.FireSeed >= this.FireSeedMax)
            return EPhase.FireMax;
        else if (cardsNum == 0)
            return EPhase.EndGame;
        else
            return EPhase.Battle;
    }
}
var EPhase;
(function (EPhase) {
    EPhase[EPhase["None"] = 0] = "None";
    EPhase[EPhase["StartGame"] = 1] = "StartGame";
    EPhase[EPhase["Battle"] = 2] = "Battle";
    EPhase[EPhase["FireMax"] = 3] = "FireMax";
    EPhase[EPhase["EndGame"] = 4] = "EndGame";
})(EPhase || (EPhase = {}));
//# sourceMappingURL=PhainonCore.js.map