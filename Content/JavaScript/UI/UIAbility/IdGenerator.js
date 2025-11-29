"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerator = void 0;
class IdGenerator {
    currentId = 0;
    constructor() {
        this.currentId = 0;
    }
    GenerateId() {
        return ++this.currentId;
    }
}
exports.IdGenerator = IdGenerator;
//# sourceMappingURL=IdGenerator.js.map