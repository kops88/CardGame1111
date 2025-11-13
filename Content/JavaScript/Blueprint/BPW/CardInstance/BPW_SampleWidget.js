"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleWidget = void 0;
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-07 10:10:18
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-11 10:34:29
 * @FilePath: \CardGame1102\TypeScript\Blueprint\BPW\CardInstance\BPW_DragWidget.ts
 * @Description: 卡片的img、拖拽等功能，不负责数据和战斗逻辑。
 */
console.log("[BPW_SampleWidget].Start");
const ue_1 = __importDefault(require("ue"));
const puerts_1 = require("puerts");
const EventSystem_1 = require("../../../SubSystem/EventSystem");
console.log("[BPW_SampleWidget].uclass.loadStart");
const uclass = ue_1.default.Class.Load("/Game/Blueprint/BPW/CardInstance/BPW_SampleWidget.BPW_SampleWidget_C");
console.log("[BPW_SampleWidget].uclass.loadFinish");
const jsclass = puerts_1.blueprint.tojs(uclass);
console.log("[BPW_SampleWidget].jsclass.tojsFinish");
class SampleWidget {
    aaa = "Hello";
    OnDragPressed = new EventSystem_1.TsDelegate();
    OnDragReleased = new EventSystem_1.TsDelegate();
    OnMouseHover = new EventSystem_1.TsDelegate();
    OnMouseUnHover = new EventSystem_1.TsDelegate();
    Construct() {
        console.log("[SampleWidget].SampleWidget.Construct");
        console.log("[SampleWidget].SampleWidget.Construct  this.Button =", this.Button);
        this.OnDragPressed = new EventSystem_1.TsDelegate();
        this.OnDragReleased = new EventSystem_1.TsDelegate();
        this.OnMouseHover = new EventSystem_1.TsDelegate();
        this.OnMouseUnHover = new EventSystem_1.TsDelegate();
        console.log("[SampleWidget].SampleWidget.Construct  OnDragPressed =", this.OnDragPressed);
        console.log("[SampleWidget].SampleWidget.Construct  OnDragReleased =", this.OnDragReleased);
        this.RegisterEvent();
    }
    RegisterEvent() {
        console.log("[SampleWidget].SampleWidget.RegisterEvent; Button = ", this.Button);
        this.Button.OnPressed.Add(() => {
            this.OnDragPressed.Broadcast(this);
        });
        this.Button.OnReleased.Add(() => {
            this.OnDragReleased.Broadcast(this);
        });
    }
    OnMouseEnter(MyGeometry, MouseEvent) {
        this.OnMouseHover.Broadcast(this);
    }
    OnMouseLeave(MouseEvent) {
        this.OnMouseUnHover.Broadcast(this);
    }
}
exports.SampleWidget = SampleWidget;
puerts_1.blueprint.mixin(jsclass, SampleWidget);
console.log("[BPW_SampleWidget].Finish");
//# sourceMappingURL=BPW_SampleWidget.js.map