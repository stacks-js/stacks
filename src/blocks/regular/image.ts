import Block from "../block.js";

/**
 * Creates an image element with the passed path. 
 * ```javascript
 *  new Image("https://google.com/favicon.ico");
 * ```
 */
export default class Image extends Block {
    path:string;

    /**
     * Creates an image object.
     * @param path Path to image
     */
    constructor(path:string){
        super();
        this.path = path;

        let imageObject = document.createElement("img")
        imageObject.setAttribute("src", path);
        
        this.object = imageObject;
    }
}