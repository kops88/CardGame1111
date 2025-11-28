/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-06 09:49:49
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-19 11:46:02
 * @FilePath: \CardGame1102\TypeScript\Blueprint\Path.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import UE from "ue"
console.log("[Path].Start")

export const BlueprintPath = {
    BP_PC: "/Game/Blueprint/GameMode/BP_PC.BP_PC_C",
    BP_GI: "/Game/Blueprint/GameMode/BP_GI.BP_GI_C",

    // Page
    BPW_DuelPage: "/Game/Blueprint/BPW/Page/BPW_DuelPage.BPW_DuelPage_C",
    mainUI: "/Game/Blueprint/BPW/Page/mainUI.mainUI_C",
    PullMenu: "/Game/Blueprint/BPW/Page/PullMenu.PullMenu_C",
    PullResult: "/Game/Blueprint/BPW/Page/PullResult.PullResult_C",
    TaskMenu: "/Game/Blueprint/BPW/Page/TaskMenu.TaskMenu_C",

    // CardInstance
    BPW_SampleWidget: "/Game/Blueprint/BPW/CardInstance/BPW_SampleWidget.BPW_SampleWidget_C",
    // Table
    CardDef: "/Game/Blueprint/Table/CardDef.CardDef",
    
    BP_CardMovementComponent: "/Game/Blueprint/BPW/Page/BP_CardMovementComponentt.BP_CardMovementComponentt_C",

    // CardAction
    BP_OnTrigger: "/Game/Blueprint/CardAction/OnTrigger/BP_OnTrigger.BP_OnTrigger_C",
    BP_OnAction: "/Game/Blueprint/CardAction/OnAction/BP_OnAction.BP_OnAction_C",
    BP_OnEnd:"/Game/Blueprint/CardAction/OnEnd/BP_OnEnd.BP_OnEnd_C",

    // ActionExtend
    AddTagCount:"/Game/Blueprint/CardAction/OnAction/AddTagCount.AddTagCount_C",
    CreateCardToHand:'/Game/Blueprint/CardAction/OnAction/CreateCardToHand.CreateCardToHand_C',
    DealDamage:'/Game/Blueprint/CardAction/OnAction/DealDamage.DealDamage_C',
    print1:"/Game/Blueprint/CardAction/OnAction/print1.print1_C",

    // EndExtend
    CommonDestroy:"/Game/Blueprint/CardAction/OnEnd/CommonDestroy.CommonDestroy_C",
    endprint:"/Game/Blueprint/CardAction/OnEnd/endprint.endprint_C",
};

console.log("[Path].Finish")
