/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 11:25:07
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-28 14:09:40
 * @FilePath: \CG1111\TypeScript\Blueprint\GameMode\BP_PC.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[BP_PC] head")
import UE from 'ue';
import { blueprint } from 'puerts';
import { BlueprintPath } from '../Path';
import { SystemManager } from '../SubSystem/SystemManager';
import { SystemEnum } from '../SubSystem/SystemName';
import { PanelNameEnum } from '../UI/PanelNameDef';
import { PanelInstance } from '../UI/Panel/PanelInstance';
import { log } from 'console';

/**
 * ts mixin 到蓝图类
 * 1. 加载蓝图类的uclass
 * 2. 转成jsclass
 * 3. 定义ts类，方法和属性和蓝图类一致
 * 4. 使用blueprint.mixin混入
 */
console.log("[BP_PC] Start")
const uclass_PC = UE.Class.Load(BlueprintPath.BP_PC);
const jsclass_PC = blueprint.tojs(uclass_PC);
export interface PlayerController extends UE.Game.Blueprint.GameMode.BP_PC.BP_PC_C {}
export class PlayerController {
    testactor: any = null;
    
    ReceiveBeginPlay() {
        console.log("BP_PC ReceiveBeginPlay");
        SystemManager.SetWorld(this.GetWorld());
        
        const panelManager = SystemManager.instance?.GetSystem(SystemEnum.PanelSystem);
        const StartPage = panelManager.AddPanelByName(PanelNameEnum.MainUI) as PanelInstance;
        StartPage.Show();

        this.bShowMouseCursor = true;
    }
}




blueprint.mixin(jsclass_PC, PlayerController); 
console.log("[BP_PC] Finish");



