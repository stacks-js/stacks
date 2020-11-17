import { Block } from "../out/block.js"
import { Text } from "../out/text.js"
import { Image } from "../out/image.js"
import { Stack } from "../out/stack.js"
import { render } from "../out/renderer.js"

class View extends Block {
    body = () => {
        // return new Image("https://assets.learnosity.com/organisations/154/170ba087-78ba-4c1b-9044-cfadf0cc18b1.jpg")
        //     .link("https://www.youtube.com")
        //     .padding(40)
        //     .border(5, "green", 10, "dashed")

        return new Stack(
            new Image("https://assets.learnosity.com/organisations/154/170ba087-78ba-4c1b-9044-cfadf0cc18b1.jpg")
                .link("https://www.google.com")
                .padding(40),
            
            new Image("https://assets.learnosity.com/organisations/154/170ba087-78ba-4c1b-9044-cfadf0cc18b1.jpg")
        );
    }
}

render(new View());