import Block from "../blocks/block.js";
import { centerBlocks, getParentBlockElement } from "./render-utils.js";

export default class StacksRenderer {
    private static inst:StacksRenderer = null;

    static getInstance():StacksRenderer {
        if(!StacksRenderer.inst)
            StacksRenderer.inst = new StacksRenderer();
        return StacksRenderer.inst;
    }

    watching: Record<string, HTMLElement> = {};
    stateful: Block[] = [];
    ids: string[] = [];
    elemcount:number = -1;
    centered: string[] = [];


    render(block : Block): void{
        let body:HTMLElement = block.get(true);
    
        document.body.appendChild(body);
        
        if(block.params.centered)
            body.style.height = window.innerHeight + "px";
        // if(block.params.centered)
        // if(body.children[0].getAttribute("centered"))
        //     center(body);
        
        // console.log(this.watching)

        centerBlocks(this.centered);
        
        window.onresize = () => {
            // if(block.params.centered)
            //     body.style.height = window.innerHeight + "px";
            // for(let block in StacksRenderer.getInstance().centered) {
            //     let body = StacksRenderer.getInstance().centered[block];
            //     body.style.height = window.innerHeight.toString() + "px";
            //     console.log(body)
            // }
            centerBlocks(this.centered);
        }
    }

    update(block : Block) {
        // console.trace("<h2>UPDATE</h2>")
        // let count:number = 0;
        // console.log("YEYYY")
        // console.log(StacksRenderer.getInstance().stateful)
        // StacksRenderer.getInstance().stateful.forEach(block => {
        

        // children.forEach(child => {
        //     if(child === old){
        getParentBlockElement(block.id, (parent) => {
            const New = block.body().get();
            const Old = <HTMLElement>parent.childNodes[0];

            // console.log(New);
            // console.log(Old);

            const oldId = Old.id; 

            New.id = oldId;
            // Old.replaceWith(New);
            this.replaceElement(New, Old);
        });

        
        //     }
        // });

        // parent.replaceChild(old, document.createElement("p"));

        // try {
        //     document.body.removeChild(document.getElementById(old));
        // } catch (e) {
        //     console.log({e: "ERRPR", id: old})        
        // }
        // this.render(block);

        // });
        // StacksRenderer.getInstance().stateful.forEach(block => {
        //     const id = StacksRenderer.getInstance().ids[count];
        //     const old:HTMLElement = document.getElementById(id);
        //     let something:HTMLElement = block.get();

        //     console.log(something)

        //     document.body.removeChild(old)
        //     document.body.appendChild(something);
        //     // console.log(something);
        //     count++;
        // });
        // let old = document.getElementById(id);
        // console.log(id + "yeyyey")
        // if(!old)
        //     return;

        // console.log({elem: elem, old:document.getElementById(id)})
        // document.body.replaceChild(document.getElementById(id).parentNode, elem)

        // console.log("HELLO")
    }

    replaceElement(New:HTMLElement, Old:HTMLElement) {
        if(New.outerHTML === Old.outerHTML)
            return;
        
        let count = 0;
        New.childNodes.forEach(c => {
            let newChild:HTMLElement = <HTMLElement> c;
            let oldChild:HTMLElement = <HTMLElement> Old.childNodes[count];
            // console.log(newChild)
            if(!oldChild || oldChild.nodeType != 1){
                this.resetNodeValue(New, Old, Old.parentElement);
            }
            else {
                let inners = newChild.innerHTML != oldChild.innerHTML;
                let attrs = newChild.attributes.length != oldChild.attributes.length;
                // console.log(attrs);
                if(inners || (attrs && inners)) {
                    this.replaceElement(newChild, oldChild);
                }
            }

            count++;
        });
    }

    resetNodeValue(New:HTMLElement, Old:HTMLElement, Parent:HTMLElement) {
        const id = Old.id;
        New.id = id;
        Parent.replaceChild(New, Old);
    }

    generateId(block?:string): string {
        return (block ? block : "sjsblock") + this.elemcount++;
    }
}