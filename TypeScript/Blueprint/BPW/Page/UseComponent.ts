/*
 * @Author: kops88_cmp 3036435162@qq.com
 * @Date: 2025-11-21 10:29:48
 * @LastEditors: kops88_cmp 3036435162@qq.com
 * @LastEditTime: 2025-11-21 10:30:19
 * @FilePath: \CG1111\TypeScript\Blueprint\BPW\Page\UseComponent.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { DuelPage } from "./BPW_DuelPage";
import { CardInstance } from '../CardInstance/CardInstance';

export class UseComponent {

    private page: DuelPage;
    private CardList: CardInstance[] = [];
    private SelectedCard: CardInstance | undefined = undefined;

    constructor(page: DuelPage) {
        this.page = page;
    }









    

}