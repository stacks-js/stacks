import Input from "./input.js";

export default class FileInput extends Input<File> {
    constructor(key:Array<any>, placeholder?:string) {
        super(key, "file", (input:string):File => {
            return new File(null, input, null);
        });

        if(placeholder)
            this.params.attributes["placeholder"] = placeholder;
    }
}