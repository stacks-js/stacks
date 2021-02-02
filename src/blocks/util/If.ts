import Block from "../block.js";

/**
 * @ignore
 */
export default class IfBlock extends Block {
    condition:boolean;

    static If(condition:boolean):IfBlock {
        return new IfBlock(condition);
    }

    constructor(condition:boolean){
        super();
        this.condition = condition;
    }

    then(block:Block) {
        
        return this;
    }

    else(block:Block) {
        
        return this;
    }
}