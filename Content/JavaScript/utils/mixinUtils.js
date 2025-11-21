"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintMixin = BlueprintMixin;
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-17 17:50:25
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-21 17:08:52
 * @FilePath: \CG1111\TypeScript\Utils\mixinUtils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[mixinUtils].head");
const ue_1 = __importDefault(require("ue"));
const puerts_1 = require("puerts");
/**
 * 蓝图类混合修饰器
 * 自动处理UE蓝图类与TypeScript类的混合过程
 * @param blueprintPath UE蓝图类路径
 * @returns 修饰器函数
 */
function BlueprintMixin(blueprintPath) {
    return function (constructor) {
        // 1. 加载蓝图类
        const uclass = ue_1.default.Class.Load(blueprintPath);
        // 2. 转换为JavaScript类
        const jsclass = puerts_1.blueprint.tojs(uclass);
        // 3. 自动生成接口扩展类型名称
        // 从路径中提取类名
        const classNameMatch = blueprintPath.match(/([^/]+)\_C$/);
        const className = classNameMatch ? classNameMatch[1] : 'UnknownClass';
        // 4. 执行mixin操作
        puerts_1.blueprint.mixin(jsclass, constructor);
        // 保存原始构造函数
        const OriginalClass = constructor;
        // 返回一个新的构造函数，在创建实例时使用蓝图类
        return class extends OriginalClass {
            constructor(...args) {
                super(...args);
                // 在构造时可以执行额外的初始化
            }
        };
    };
}
console.log("[mixinUtils].Finish");
//# sourceMappingURL=mixinUtils.js.map