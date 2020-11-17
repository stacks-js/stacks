import { Block } from "../out/block.js"
import { Text } from "../out/text.js"
import { Image } from "../out/image.js"
import { render } from "../out/renderer.js"

class View extends Block {
    body = () => {
        return new Image("https://www.w3schools.com/images/colorpicker.gif")
            .link("https://www.youtube.com")
            .padding(40)
            .border(5, "green", 10)
        }
}

render(new View());