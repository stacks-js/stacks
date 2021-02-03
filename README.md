<img width="116" height="116" src="https://github.com/stacks-js/stacks/blob/main/.github/logo.png?raw=true" />

# Stacks

<br />

Stacks.js is a Javascript library for building fully programmating and reactive user interfaces. You can build very robust web ui's in very short time with Stacks. Fans of Apple's [SwiftUI](https://developer.apple.com/xcode/swiftui/) will enjoy the similarity of the component based structure along with the flexibility of Javascript.

<br />

## Example
Create interfaces without a single line of HTML or CSS. 

```javascript
class MyBlock extends Block {
    body = () => {
        return new Text("Hello there!")
    }
}

StacksRenderer.getInstance().render(new MyBlock());
```

## Intelligent Styling Out of the Box
No more do web developers have to ask the daunting question of *how do I center a div?*

With Stacks, common CSS applications are included on Blocks **right out of the box**.

The design philosophy that drove Stack's development was based on the [Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern).

With this, adding traits to your blocks is as easy as *stack*ing methods like this:

```javascript
class MyBlock extends Block {
    body = () => {
        return new Text("I am centered and have a border!")
            .border(3, "green")
            .center()
    }
}
```

## A Comprehensive Event System

The Stacks lifecycle includes room for typical Javascript events, such as clicks. These are applied the same way as styles, making your code concise and readable.

```javascript
new Text("Click me!")
    .onClick(() => {
        alert("I have been clicked!");
    })
    // more attributes can be applied here
```

Different types of blocks also have different events, such as input blocks with `onChange` and `onInput`, among others.

```javascript
// we will talk about binding in a bit, but yes, Stacks has binding variables as well
new TextField("text".bind(this))
    .onInput((value) => {
        console.log(`Value has been changed to ${value}`);
    })
```

# State Management Built In

With Stacks, there's no need for any external libraries to manage your Blocks' states. Every block has a built-in `states` object that watches for changes and recursively updates only what has changed in the view.

Using states is as easy as can be. Simply define the original value(if any is needed) in the constructor of the block and it just works!

```javascript
class MyBlock extends Block {
    constructor() {
        //make sure to call super here
        super();
        this.states.count = 0;
    }

    body = () => {
        return new Text(this.states.count > 0 ? `I have been clicked ${this.states.count} times!` : 0)
            .onClick(() => {
                this.states.count ++;
            })
    }
}
```