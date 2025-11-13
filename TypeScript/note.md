


1. UserWidget 在 ts 中的构造函数是 Construct(): void  而非 Constructor

2. 对于 UserWidget 使用 UE create 创造，第一次创造调用Construct ，第二次创造，不会调用构造
                        new 创造，第一次调用Construct，第二次创造调用 Constructor
正确做法：在maingame.ts中import + 使用Construct 初始化 + 使用UE.create 。错误的话，总有一个出错（UserWidget）

3. 蓝图重写及构造函数调用：Construct 是重写蓝图函数。ts重写了，蓝图就不会调用。
    可以直接在蓝图创建函数，在ts直接重写。




    会议：
    1. 尽量用id获取，而非构建实例？ 16.10分

    0530 重复getpanelmanager 有性能问题，用本地变量存储
