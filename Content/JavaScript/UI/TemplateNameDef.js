"use strict";
// import "../Template/Pull_CardBack" 相对于 TemplateBility
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewNameEnum = exports.ViewNameToPath = exports.TemplateNameEnum = exports.TemplateNameToPath = void 0;
// 名字到路径,只在获取ts类（require）时使用
exports.TemplateNameToPath = {
    Pull_CardBack: "../Template/Pull_CardBack",
};
exports.TemplateNameEnum = {};
for (const k in exports.TemplateNameToPath) {
    exports.TemplateNameEnum[k] = k;
}
exports.ViewNameToPath = {
    a: " patha ",
};
exports.ViewNameEnum = {};
for (const k in exports.ViewNameToPath) {
    exports.ViewNameEnum[k] = k;
}
//# sourceMappingURL=TemplateNameDef.js.map