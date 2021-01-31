import Block from "../../blocks/block.js";

//bound object has main block, block has og block
const Bind = (boundObject: Array<any>, block: Block) => {
    // if(typeof boundObject != typeof Array<any> || boundObject.length != 2)
    //     return console.error(boundObject);
    block.attachBoundAttribute(boundObject);
}

export default Bind;