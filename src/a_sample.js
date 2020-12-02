/**
 * This file is used as my document to plan out what I would like an "ideal" usable release
 * of Stacks to be.
 * 
 * Core features:
 *  - Custom Blocks - DONE
 *  - Stacks - DONE
 *  - Image - DONE
 *  - Text - DONE
 *  - Modifiers(scale, opacity, etc)
 */
class Subview extends Block {
    body = () => {
        return Stack.with("x", 
            new Text("hello there"),
            Stack.with("z", 
                new Image("image1.png")
                    .setScale(1.5),
                new Text("How are you doing")
            ),
            new Text("ok now done")
        );
    }
}

class MainView extends Block {
    body = () => {
        return Stack.with("y", 
            new Text("User Profile"),
            new Subview(),
            Stack.with("x", 
                Text("Again another text"),
                Image("image2.png")
            )
        );
    }
}

Stacks.render(MainView, "Page Title");