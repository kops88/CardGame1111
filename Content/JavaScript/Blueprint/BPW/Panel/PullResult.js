"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-28 11:49:57
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-28 11:50:40
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\Panel\PullResult.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[PullResult] start");
const PanelInstance_1 = require("./PanelInstance");
const Path_1 = require("../../Path");
class PullResult extends PanelInstance_1.PanelInstance {
    _name = "PullResult";
    DoInit() {
        this._path = Path_1.BlueprintPath.PullResult;
        this.Load();
    }
}
exports.default = PullResult;
//# sourceMappingURL=PullResult.js.map