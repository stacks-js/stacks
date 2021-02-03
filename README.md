<img width="116" height="116" src="https://github.com/stacks-js/stacks/blob/main/.github/logo.png?raw=true" />

# Stacks

<br />

Stacks.js is a Javascript library for building fully programmating and reactive user interfaces. You can build very robust web ui's in very short time with Stacks. Fans of Apple's [SwiftUI](https://developer.apple.com/xcode/swiftui/) will enjoy the similarity of the component based structure along with the flexibility of Javascript.

<br />

## Overview
### Contents
 - [Minimal Example](#minimal-example)
 - [Features](#features)
    - [Styling](#intelligent-styling-out-of-the-box)
    - [Event System](#a-comprehensive-event-system)
    - [State Management](#state-management-built-in)
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
Stacks is a young, but still feature-rich library with potential and the tools to grow into a full UI ecosystem.

Some of it's features include:

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

### State Management Built In

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

## Installation
So, you want to try out Stacks for yourself? I must say, that's a good decision. All jokes aside though, adding Stacks to your own project is very easy. You can add it incrementally, even in an existing project, or start fresh(possibly with our [CLI]()).

### CDN or File
If you have an HTML project or don't want to worry about bundlers and whatnot(I feel your pain), feel free to either download the `stacks.min.js` from the `publish/` directory of the project or import it through the CDN:

```html
<script src="https://unpkg.com/stacks-js"></script>
```

> :warning: **If you decide to import Stacks the above way,** you won't have to deal with importing the correct blocks and classes you are using. However, you will also be sacraficing the use of intellisense-type features in most IDE's.

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

For a more detailed overview of Stacks, as well as example code, a getting started guide, and full api documentation, visit the Stacks website at [stacks.js.org](https://stacks.js.org). The code for the website itself is available [here](https://github.com/stacks-js/website) and is written entirely in Stacks(apart from GitBook and TypeDoc documentation, which are autogenerated).

## Contact

Please feel free to leave any questions or issues in the *issues* tab of the Github page or send me a private message to discuss other Stacks topics. Thank you!