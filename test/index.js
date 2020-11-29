import { Block } from "../dist/block.js"
import { Text } from "../dist/text.js.js"
import { Image } from "../dist/image.js.js"
import { Stack } from "../dist/stack.js"
import { render } from "../dist/renderer.js.js"

class View extends Block {
    body = () => {
        // return new Image("https://assets.learnosity.com/organisations/154/170ba087-78ba-4c1b-9044-cfadf0cc18b1.jpg")
        //     .link("https://www.youtube.com")
        //     .padding(40)
        //     .border(5, "green", 10, "dashed")

        return new Stack(
            new Text("https://assets.learnosity.com/organisations/154/170ba087-78ba-4c1b-9044-cfadf0cc18b1.jpg"),
            
            new Text("https://assets.learnosity.com/organisations/154/170ba087-78ba-4c1b-9044-cfadf0cc18b1.jpg")
        );
    }
}

render(new View());