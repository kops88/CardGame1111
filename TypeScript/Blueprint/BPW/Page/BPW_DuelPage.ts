/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-12 11:25:07
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-12 15:38:26
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\Page\BPW_DuelPage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-06 09:49:49
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-12 11:41:05
 * @FilePath: \CardGame1102\TypeScript\Blueprint\BPW\Page\BPW_DuelPage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log("[BPW_DuelPage].Start")
import UE, { Class, TArray } from 'ue';
import { blueprint } from 'puerts';
import { BlueprintPath } from '../../Path';
// import "Blueprint/BPW/CardInstance/BPW_CardInstance";
import { BP_CardMovementComponent } from "../CardInstance/BP_CardMovementComponent";


console.log("[BPW_DuelPage].Mixin Start");
const uclass = UE.Class.Load(BlueprintPath.BPW_DuelPage);
const jsclass = blueprint.tojs(uclass);

export interface DuelPage extends UE.Game.Blueprint.BPW.Page.BPW_DuelPage.BPW_DuelPage_C {}
export class DuelPage {

    private mCardMovementComponent: BP_CardMovementComponent | null = null;

    Construct() {
        console.log("[BPW_DuelPage].Construct");

        this.InitMovementComponent();

        this.RegisterEvents();
    }


    RegisterEvents() {
        console.log("[BPW_DuelPage].RegisterEvents");

        // TestBtn1 点击后添加一个卡牌。
        this.TestBtn1.OnClicked.Add(() => {
            console.log("[BPW_DuelPage].TestBtn1 Clicked");
            this.mCardMovementComponent?.AddCard();
        });

        this.StartGameBtn.OnClicked.Add(() => {
            console.log("[BPW_DuelPage].StartGameBtn Clicked");
            
        });

    };

    private InitMovementComponent() { 
        const CompClass = UE.Class.Load(BlueprintPath.BP_CardMovementComponent);
        blueprint.load(UE.Game.Blueprint.BPW.Page.BP_CardMovementComponentt.BP_CardMovementComponentt_C);
        this.mCardMovementComponent = UE.GameplayStatics.BeginDeferredActorSpawnFromClass(
            this.GetWorld(),
            CompClass,
            UE.Transform.Identity
        ) as unknown as BP_CardMovementComponent;
        UE.GameplayStatics.FinishSpawningActor(this.mCardMovementComponent, UE.Transform.Identity);
        console.log("[BPW_DuelPage].Construct mCardMovementComponent:", this.mCardMovementComponent);
    }
}


blueprint.mixin(jsclass, DuelPage);
console.log("[BPW_DuelPage].Finish")