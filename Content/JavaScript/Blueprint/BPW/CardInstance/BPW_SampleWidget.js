"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleWidget = void 0;
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-07 10:10:18
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-18 10:31:08
 * @FilePath: \CardGame1102\TypeScript\Blueprint\BPW\CardInstance\BPW_DragWidget.ts
 * @Description: 卡片的img、拖拽等功能，不负责数据和战斗逻辑。
 */
console.log("[BPW_SampleWidget] head");
const Path_1 = require("../../Path");
const mixinUtils_1 = require("../../../Utils/mixinUtils");
const EventSystem_1 = require("../../../SubSystem/EventSystem");
console.log("[BPW_SampleWidget].Start");
let SampleWidget = class SampleWidget {
    aaa = "Hello";
    OnDragPressed = new EventSystem_1.TsDelegate();
    OnDragReleased = new EventSystem_1.TsDelegate();
    OnMouseHover = new EventSystem_1.TsDelegate();
    OnMouseUnHover = new EventSystem_1.TsDelegate();
    Construct() {
        this.OnDragPressed = new EventSystem_1.TsDelegate();
        this.OnDragReleased = new EventSystem_1.TsDelegate();
        this.OnMouseHover = new EventSystem_1.TsDelegate();
        this.OnMouseUnHover = new EventSystem_1.TsDelegate();
        console.log("[SampleWidget].SampleWidget.Construct  OnDragPressed =", this.OnDragPressed);
        console.log("[SampleWidget].SampleWidget.Construct  OnDragReleased =", this.OnDragReleased);
        this.RegisterEvent();
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
        // console.log("[SampleWidget].Init:Success, cid = ", def.cid, "def.img = ", def.img.Get().GetName()); //GetName 在每次打开UE 的第一次运行会报错
    }
    /**
     * @description 绑定 Button 的按压和松开到 OnDragPressed 和 OnDragReleased 事件
     */
    RegisterEvent() {
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
};
exports.SampleWidget = SampleWidget;
exports.SampleWidget = SampleWidget = __decorate([
    (0, mixinUtils_1.BlueprintMixin)(Path_1.BlueprintPath.BPW_SampleWidget)
], SampleWidget);
console.log("[BPW_SampleWidget].Finish");
//# sourceMappingURL=BPW_SampleWidget.js.map