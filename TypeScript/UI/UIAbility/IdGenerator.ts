



/**
 * 计数从1开始，currentID为最新的已创建的id
 */
export class IdGenerator {

    protected currentId = 0;

    constructor() { 
        this.currentId = 0;
    }

    GenerateId() { 
        return ++this.currentId;
    }


}