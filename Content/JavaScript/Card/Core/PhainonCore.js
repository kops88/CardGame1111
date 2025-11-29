"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhainonCore = void 0;
const SystemManager_1 = require("../../SubSystem/SystemManager");
const SystemName_1 = require("../../SubSystem/SystemName");
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
        this.GOS = SystemManager_1.SystemManager.instance?.GetSystem(SystemName_1.SystemEnum.GameOperationSystem);
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
    HandlePhase() {
        this.phase = this.UpdatePhase();
        this.ExecutePhase();
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
    ExecutePhase() {
        switch (this.phase) {
            case EPhase.StartGame:
                this.ProcessStartGame();
                break;
            case EPhase.Battle:
                this.ProcessBattle();
                break;
            case EPhase.FireMax:
                this.ProcessFireMax();
                break;
            case EPhase.EndGame:
                this.ProcessEndGame();
                break;
            default:
                console.log("[CoreCard] Error: phase is not found, phase = ", this.phase);
                break;
        }
    }
    ProcessStartGame() {
        this.GOS?.DrawCardByCid(this.fstCard);
    }
    ProcessBattle() {
        console.log("[CoreCard] ProcessBattle");
    }
    ProcessFireMax() {
    }
    ProcessEndGame() {
        console.log("[CoreCard] GAME OVER");
    }
    AddTagCount(tag, count) {
    }
}
exports.PhainonCore = PhainonCore;
var EPhase;
(function (EPhase) {
    EPhase[EPhase["None"] = 0] = "None";
    EPhase[EPhase["StartGame"] = 1] = "StartGame";
    EPhase[EPhase["Battle"] = 2] = "Battle";
    EPhase[EPhase["FireMax"] = 3] = "FireMax";
    EPhase[EPhase["EndGame"] = 4] = "EndGame";
})(EPhase || (EPhase = {}));
//# sourceMappingURL=PhainonCore.js.map