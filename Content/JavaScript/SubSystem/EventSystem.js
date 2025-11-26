"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsDelegate_new = exports.TsDelegate = exports.GameEventSystem = void 0;
class GameEventSystem {
    static instance;
    static EventMap = new Map();
    static GetInstance() {
        if (!GameEventSystem.instance) {
            GameEventSystem.instance = new GameEventSystem();
        }
        return GameEventSystem.instance;
    }
    RegisterEvent(EventID, cb) {
        if (!GameEventSystem.EventMap.has(EventID)) {
            GameEventSystem.EventMap.set(EventID, []);
        }
        const callbacks = GameEventSystem.EventMap.get(EventID);
        callbacks.push(cb);
    }
    UnregisterEvent(EventID, cb) {
        const callbacks = GameEventSystem.EventMap.get(EventID);
        if (callbacks && callbacks.indexOf(cb) !== -1) {
            callbacks.splice(callbacks.indexOf(cb), 1);
        }
    }
    TriggerEvent(EventID, ...args) {
        const callbacks = GameEventSystem.EventMap.get(EventID);
        if (callbacks) {
            // 复制一份回调列表，防止在回调中修改原列表导致遍历问题
            const cbs = callbacks.slice();
            for (const cb of cbs) {
                cb(...args);
            }
        }
    }
}
exports.GameEventSystem = GameEventSystem;
class TsDelegate {
    callbacks = [];
    /**
     * @param cb 委托的回调函数
     */
    Add(cb) {
        this.callbacks.push(cb);
    }
    Remove(cb) {
        const index = this.callbacks.indexOf(cb);
        if (index !== -1) {
            this.callbacks.splice(index, 1);
        }
    }
    Broadcast(...args) {
        for (const cb of this.callbacks) {
            cb(...args);
        }
    }
    Clear() {
        this.callbacks = [];
    }
}
exports.TsDelegate = TsDelegate;
class TsDelegate_new {
    entries = [];
    /**
     * @param cb 委托的回调函数
     */
    Add(target, cb) {
        this.entries.push({ target, callback: cb });
    }
    Remove(target, cb) {
        const index = this.entries.findIndex(entry => entry.target === target && entry.callback === cb);
        if (index !== -1) {
            this.entries.splice(index, 1);
        }
    }
    Broadcast(...args) {
        for (const entry of this.entries) {
            entry.callback.call(entry.target, ...args);
        }
    }
    Clear() {
        this.entries = [];
    }
}
exports.TsDelegate_new = TsDelegate_new;
//# sourceMappingURL=EventSystem.js.map