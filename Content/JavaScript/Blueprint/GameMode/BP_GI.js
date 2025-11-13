"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameInstance = void 0;
console.log("[GameInstance].head");
const ue_1 = __importDefault(require("ue"));
const Path_1 = require("../Path");
const puerts_1 = require("puerts");
console.log("[GameInstance].Start");
const uclass = ue_1.default.Class.Load(Path_1.BlueprintPath.BP_GI);
const jsclass = puerts_1.blueprint.tojs(uclass);
class GameInstance {
    GetCardTable() {
        console.log("[GameInstance].GetCardTable");
        if (!this.CardTable) {
            console.log("[GameInstance].GetCardTable:Error: !this.CardTable");
        }
        return this.CardTable;
    }
    printhello() {
        console.log("[GameInstance] hello");
    }
}
exports.GameInstance = GameInstance;
puerts_1.blueprint.mixin(jsclass, GameInstance);
console.log("[GameInstance].Finish");
//# sourceMappingURL=BP_GI.js.map