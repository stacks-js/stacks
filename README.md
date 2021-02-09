<img width="116" height="116" src="https://github.com/stacks-js/stacks/blob/main/.github/logo.png?raw=true" />

# Stacks

<br />

Stacks.js is a Javascript library for building fully programmatic and reactive user interfaces. You can build very robust web UI's in a short amount of time with Stacks. Fans of Apple's [SwiftUI](https://developer.apple.com/xcode/swiftui/) will enjoy the similarity of the component-based structure along with the flexibility of Javascript.

**Frontend, backend, and all in between developers rejoice when they see Stacks. Stacks allows developers to seamlessly couple the layout, styling, and business logic of web development together with one language and very little code.**

Stacks is a declarative and component-based library, similar to React. Much of this project was inspired by SwiftUI, React, and Flutter as a whole.

<br />

## Overview
### Contents
 - [Minimal Example](#minimal-example)
 - [Features](#features)
    - [Styling](#intelligent-styling-out-of-the-box)
    - [Event System](#a-comprehensive-event-system)
    - [State Management](#state-management-built-in)
    - [Rich Component Library](#rich-component-library)
- [Installation](#installation)
    - [CDN](#cdn-or-file)
    - [NPM](#npm)
- [Stacks CLI](#stacks-cli)
- [Website and Documentation](#website-and-documentation)
- [Contact](#contact)

## Minimal Example

```javascript
class MyBlock extends Block {
    body = () => {
        return new Text("Hello there!")
    }
}

StacksRenderer.getInstance().render(new MyBlock());
```

<br />

## Features
Stacks is a young but still feature-rich library with potential and the tools to grow into a full UI ecosystem.

Some of its features include:

### Intelligent Styling Out of the Box
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

### A Comprehensive Event System

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

### State Management Built-In

With Stacks, there's no need for any external libraries to manage your Blocks' states. Every block has a built-in `states` object that watches for changes and recursively updates only what has changed in the view.

Using states is as easy as can be. Simply define the original value(if any is needed) in the constructor of the block and, it just works!

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

### Rich Component Library

Like all other component-based frameworks, Stacks has a term for the UI elements on the screen. React calls them *Components*, SwiftUI calls them *Views*, Flutter calls them *Widgets*, and Stacks calls them *Blocks*. All these terms, however, mean essentially the same thing. 

With Stacks, a term I like to use is *Everything is a Block*. When I say everything, I mean *everything*. The parameter of the `render` function is a block in itself. 

The way interfaces are built out is by combining together so-called **System Blocks**. These are elements that the browser knows how to render, such as text, images, etc. The user's job is to define what combination of System Blocks they want, along with how they want it styled. The framework does the rest of the heavy lifting in actually converting that to renderable content.

Stacks, similar to SwiftUI, take this *Everything is a Block* phrase even further. As explained in the [styling](#intelligent-styling-out-of-the-box) section, we implement the Builder Paradigm or Pattern. This means that every block modifier also returns a block and therefore is Stackable. 

That being said, Stacks has a wide array of System components available, with several more to come.

These include:
 - Text
 - Image
 - Stack
 - Spacer
 - Inputs
    - TextField
    - NumberField
    - DatePicker
    - ColorPicker
    - and more
 - and more

One of the key ones in here are **Stacks**

Stacks in Stacks(I know, right) work as a way to sort of bridge the gap between how things can be rendered. For example, the renderer takes in only one block as an argument, and the `body` function of a block returns a single block. How, then, are we to combine blocks together without losing the modularity that Stacks.js as a whole provides? This is where Stacks come in. Stacks are a way for you to combine several different Blocks together and to be rendered as one. This is done like this:

```javascript
new Stack("y", 
    new Text("Hello there! I am in a YStack!"),
    new Image("./image.png")
);
```

Stacks take an unlimited number of arguments and the first one will be either "x" or "y" or "z" XStacks are horizontally aligned, YStacks are vertically aligned, and ZStacks put blocks on top of one another. Read more about stacks in the [documentation](https://stacks.js.org)

## Installation
So, you want to try out Stacks for yourself? I must say, that's a good decision. All jokes aside though, adding Stacks to your own project is very easy. You can add it incrementally, even in an existing project, or start fresh(possibly with our [CLI]()).

> Just as a disclaimer, as of 2/3/2021, I have not published Stacks, and therefore these installation processes won't work. This is what they will eventually be though. Anyone can still use the downloaded file from the publish directory(read below for more information on that)

### CDN or File
If you have an HTML project or don't want to worry about bundlers and whatnot(I feel your pain), feel free to either download the `stacks.min.js` from the `publish/` directory of the project or import it through the CDN:

```html
<script src="https://unpkg.com/stacks-js"></script>
```

> :warning: **If you decide to import Stacks the above way,** you won't have to deal with importing the correct blocks and classes you are using. However, you will also be sacrificing the use of intellisense-type features in most IDE's.

### NPM

Stacks is also available as an [npm]("https://npmjs.org") package. Install it with:

```bash
# Using NPM
$ npm install stacks-js

# Or using Yarn
$ yarn install stacks-js

# type definition files are included by default
```

Here, you will most likely have to use some form of a module bundler, such as Parcel, Webpack, or Rollup, to deploy your app onto the web. I would recommend this method, but if you are unsure of how a bundler works or just don't want to set up the Stacks project from scratch, you can use the **Stacks CLI**

<br />

## Stacks CLI

**the CLI is still a work in progress, sorry about that**

## Website and Documentation

For a more detailed overview of Stacks, as well as example code, a getting started guide, and full API documentation, visit the Stacks website at [stacks.js.org](https://stacks.js.org). The code for the website itself is available [here](https://github.com/stacks-js/website) and is written entirely in Stacks(apart from GitBook and TypeDoc documentation, which are autogenerated).

## Contact

Please feel free to leave any questions or issues in the *issues* tab of the Github page or send me a private message to discuss other Stacks topics. Thank you!