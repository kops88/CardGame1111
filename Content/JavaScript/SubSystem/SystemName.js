"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemBase = exports.SystemEnum = exports.SystemNameEnum = void 0;
console.log('[SystemName] head');
console.log('[SystemName] start');
/**
 * @description 子系统管理器名称
 */
exports.SystemNameEnum = {
    AssetSystem: "AssetSystem",
    GameOperationSystem: "GameOperationSystem",
    PanelSystem: "PanelSystem",
};
exports.SystemEnum = exports.SystemNameEnum;
class SystemBase {
    constructor() { }
}
exports.SystemBase = SystemBase;
console.log('[SystemName] finish');
//# sourceMappingURL=SystemName.js.map