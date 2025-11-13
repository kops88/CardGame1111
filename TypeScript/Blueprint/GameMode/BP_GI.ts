console.log("[GameInstance].head")
import UE from 'ue';
import { BlueprintPath } from '../Path';
import { blueprint } from 'puerts';

console.log("[GameInstance].Start")


const uclass = UE.Class.Load(BlueprintPath.BP_GI);
const jsclass = blueprint.tojs(uclass); 

export interface GameInstance extends UE.Game.Blueprint.GameMode.BP_GI.BP_GI_C {}
export class GameInstance {

    GetCardTable() {
        console.log("[GameInstance].GetCardTable")
        if(!this.CardTable) {
            console.log("[GameInstance].GetCardTable:Error: !this.CardTable")
        }
        return this.CardTable;
    }

    printhello() {
        console.log("[GameInstance] hello");
    }

}

blueprint.mixin(jsclass, GameInstance)
console.log("[GameInstance].Finish")