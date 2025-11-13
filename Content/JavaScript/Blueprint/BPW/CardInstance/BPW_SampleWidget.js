"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleWidget = void 0;
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-07 10:10:18
 * @LastEditors: v_lyyulliu
 * @LastEditTime: 2025-11-13 15:01:03
 * @FilePath: \CardGame1102\TypeScript\Blueprint\BPW\CardInstance\BPW_DragWidget.ts
 * @Description: 卡片的img、拖拽等功能，不负责数据和战斗逻辑。
 */
console.log("[BPW_SampleWidget] head");
const ue_1 = __importDefault(require("ue"));
const puerts_1 = require("puerts");
const EventSystem_1 = require("../../../SubSystem/EventSystem");
console.log("[BPW_SampleWidget].Start");
const uclass = ue_1.default.Class.Load("/Game/Blueprint/BPW/CardInstance/BPW_SampleWidget.BPW_SampleWidget_C");
const jsclass = puerts_1.blueprint.tojs(uclass);
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
    /**
     *@description 设置Sample的img
     */
    Init(def) {
        if (!def.img) {
            console.log("[SampleWidget].Init:Error: img is null, cid = ", def.cid);
            return;
        }
        this.img.SetBrushFromSoftTexture(def.img);
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