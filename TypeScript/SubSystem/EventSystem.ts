/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 11:25:07
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-24 11:52:56
 * @FilePath: \CG1111\TypeScript\SubSystem\EventSystem.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
type Constructor = new (...args: any[]) => any;

export class GameEventSystem {
    private static instance: GameEventSystem;
    private static EventMap: Map<Constructor, Function[]> = new Map();

    public static GetInstance(): GameEventSystem {
        if (!GameEventSystem.instance) {
            GameEventSystem.instance = new GameEventSystem();
        }
        return GameEventSystem.instance;
    }

    public RegisterEvent<T extends Constructor>(EventID: T, cb: (...args: any[]) => void): void {
        if (!GameEventSystem.EventMap.has(EventID)) {
            GameEventSystem.EventMap.set(EventID, []);
        }
        const callbacks = GameEventSystem.EventMap.get(EventID)!;
        callbacks.push(cb);
    }

    public UnregisterEvent<T extends Constructor>(EventID: T, cb: () => any): void {
        const callbacks = GameEventSystem.EventMap.get(EventID);
        if (callbacks && callbacks.indexOf(cb) !== -1) {
            callbacks.splice(callbacks.indexOf(cb), 1);
        }
    }

    public TriggerEvent<T extends Constructor> (EventID: T, ...args: any[]): void {
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


export class TsDelegate<T extends Function> {
    private callbacks: T[] = [];

    /**
     * @param cb 委托的回调函数
     */
    Add(cb: T): void {
        this.callbacks.push(cb);
    }

    Remove(cb: T): void {
        const index = this.callbacks.indexOf(cb);
        if (index !== -1) {
            this.callbacks.splice(index, 1);
        }
    }

    Broadcast(...args: any[]): void {
        for (const cb of this.callbacks) {
            cb(...args);
        }
    }

    Clear(): void {
        this.callbacks = [];
    }
}