import Input from "./input.js";

/**
 * This is a file upload.
 * ```javascript
 * new FileInput("filename".bind(this))
 *  .onChange((value) => {
 *      console.log(`Uploded file ${value}`);
 *  });
 * 
 * //value can also be accessed through this.states.filename because that is what it was bound to in the first line.
 * ```
 * 
 * Note that the FileInput is still a WIP and only returns the name of the file as of now. 
 */
export default class FileInput extends Input<File> {
    constructor(key:Array<any>, placeholder?:string) {
        super(key, "file", (input:string):File => {
            return new File(null, input, null);
        });

        if(placeholder)
            this.params.attributes["placeholder"] = placeholder;
    }
}