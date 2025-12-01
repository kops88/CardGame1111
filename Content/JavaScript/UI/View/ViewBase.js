"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewBase = void 0;
class ViewBase {
    id = -1;
    object;
    parentPanel;
    constructor(id) {
        this.id = id;
    }
    show() {
    }
    SetParentPanel(panel) {
        this.parentPanel = panel;
    }
    SetObject(obj) {
        this.object = obj;
    }
}
exports.ViewBase = ViewBase;
//# sourceMappingURL=ViewBase.js.map