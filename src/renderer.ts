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
        let body:HTMLElement = block.body().get(true);
    
        document.body.appendChild(body);

        // console.log(this.watching)
        
        window.onresize = () => {
            body.style.height = window.innerHeight.toString() + "px";
        }
    }

    update(block : Block) {
        // let count:number = 0;
        // console.log("YEYYY")
        // console.log(StacksRenderer.getInstance().stateful)
        // StacksRenderer.getInstance().stateful.forEach(block => {
        const old:HTMLElement = block.body().get(block.params.wasView);
        document.body.removeChild(document.getElementById(old.id));
        this.render(block);

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