




export class IdGenerator {

    protected currentId = 0;

    constructor() { 
        this.currentId = 0;
    }

    GenerateId() { 
        return ++this.currentId;
    }


}