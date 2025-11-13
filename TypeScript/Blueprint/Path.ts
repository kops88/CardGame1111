/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-06 09:49:49
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-11 09:54:40
 * @FilePath: \CardGame1102\TypeScript\Blueprint\Path.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import UE from "ue"
console.log("[Path].Start")

export const BlueprintPath = {
    BP_PC: "/Game/Blueprint/GameMode/BP_PC.BP_PC_C",
    BP_GI: "/Game/Blueprint/GameMode/BP_GI.BP_GI_C",
    BPW_DuelPage: "/Game/Blueprint/BPW/Page/BPW_DuelPage.BPW_DuelPage_C",
    //BP_CardInstance: "/Game/Blueprint/BPW/CardInstance/BPW_CardInstance.BPW_CardInstance_C",

    // CardInstance
    BPW_SampleWidget: "/Game/Blueprint/BPW/CardInstance/BPW_SampleWidget.BPW_SampleWidget_C",
    // Table
    CardDef: "/Game/Blueprint/Table/CardDef.CardDef",
    
    BP_CardMovementComponent: "/Game/Blueprint/BPW/Page/BP_CardMovementComponentt.BP_CardMovementComponentt_C",
};

console.log("[Path].Finish")