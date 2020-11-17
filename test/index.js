import { Block } from "../out/block.js"
import { Text } from "../out/text.js"
import { Image } from "../out/image.js"
import { render } from "../out/renderer.js"

class View extends Block {
    body = () => {
        return new Text("https://www.w3schools.com/images/colorpicker.gif")
            .link("https://www.youtube.com")
            
    }
}

render(new View());