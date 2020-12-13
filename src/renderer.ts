import {Block} from "./block.js";

export class StacksRenderer {
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


    render(block : Block): void{
        let body:HTMLElement = block.get(true);
    
        document.body.appendChild(body);

        // console.log(this.watching)
        
        window.onresize = () => {
            body.style.height = window.innerHeight.toString() + "px";
        }
    }

    update(block : Block) {
        console.trace("<h2>UPDATE</h2>")
        // let count:number = 0;
        // console.log("YEYYY")
        // console.log(StacksRenderer.getInstance().stateful)
        // StacksRenderer.getInstance().stateful.forEach(block => {
        const id:string = block.body().get().id;
        const old =  document.getElementById(id);
        const parent = old ? old.parentElement : document.body;
        const children = parent.childNodes;
        
        children.forEach(child => {
            if(child === old){
                console.log(parent.childNodes[0])
                console.log(block.body().get())
                parent.childNodes[0].replaceWith(block.body().get());
            }
        });

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

    generateId(block?:string): string {
        return (block ? block : "sjsblock") + this.elemcount++;
    }
}