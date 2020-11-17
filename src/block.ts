// export class Body{
//     html:"";

//     constructor(){

//     }
// }

// import { Text } from "./text.js"

// export class Block {
//     body: Block;
//     bodyfunc: Function;
//     html: string = "";
//     type: string = "div";
//     properties: { href?: string }  = {};
    
//     constructor(body?: Function, type?:string) {
//         if(body) {
//             this.bodyfunc = body;
//             this.body = this.bodyfunc();
//         }else{
//             this.body = null;
//         }

//         if(type){
//             this.type = type;
//         }
//     }

//     link(href: string) {
//         this.type = "a";
//         let newblock = new Block(this.bodyfunc, "a");
//         console.log(newblock.get())
//         return newblock;
//     }

//     get(){
//         console.log("get" + this.type)
//         let head:string = "<" + this.type + ">";
//         let tail:string = "</" + this.type + ">";
//         if(this.body != null) {
//             this.html = head + this.body.html + tail;
//             return this.html;
//         }
//         return head + tail;
//     }

//     static Text(text : string, style?:string) {
//         return new Text(text, style);
//     }
// }

// export class Element {
//     html:string;
//     type:string;
//     body:Element;

//     constructor(type?:string, html?:string, body?:Function) {
//         if(type) {
//             this.type = type;
//         }
//         if(html) {
//             this.html = html;
//         }
//         if(body) {
//             this.body = body();
//         }
//     }

//     get(){
//         if(!this.type){
//             this.type = "div";
//         }
//         if(!this.html){
//             let tag = this.type + ">";
//         }
//         return this.html;
//     }
// }

export class Block {
    body: Function = null;
    html: string;
}