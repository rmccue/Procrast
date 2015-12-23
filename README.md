# Procrast

A homepage designed to help me beat my procrastination. Also a relatively simple little project using React, Redux, and Webpack (with hot loading).

Based on [React Transform Boilerplate](https://github.com/gaearon/react-transform-boilerplate) - use that if you're starting a new project, rather than copying pieces from here.

## Getting Started

```sh
# Grab the code
git clone https://github.com/rmccue/Procrast
cd Procrast

# Install dependencies
npm install

# Run Grunt + Webpack in watch mode, with hotloading
grunt

# Open in your browser
open http://localhost:3000/
```

## Neat Features

### LocalStorage

There's a tiny amount of code used to add support for localStorage, see `src/createStore.jsx`

This is simply a piece of [Redux middleware](http://rackt.org/redux/docs/advanced/Middleware.html) that saves the state to localStorage after it's changed, and loads it as the initial state if it exists.

There's no support here for synching across tabs, which would be cool, but requires more Redux trickery than I can be bothered with. (Essentially, you need to fire a custom action like `SYNC_STORAGE` with the entire store, then replace the store in your reducer. Bit of a pain.)

### Dev Tools

Redux Devtools are included here, as part of the boilerplate. Hit `Ctrl-H` to open/close this, and `Ctrl-Q` to change the position in the browser window if needed.

These should be compiled out for production, but I'm lazy and haven't done that.

### Grunt + Webpack

I like separation of concerns; in particular, separating Sass from JS. For this reason, Grunt handles Sass compilation (with watching) and Webpack handles JS compilation.

Note however that I'm using grunt-concurrent to allow just `grunt` to run both simultaneously.

## Coding Style

For the React-specific code, I'm using Khan Academy's [React coding standards](https://github.com/Khan/style-guides/blob/master/style/react.md), which specify things like method order in components.
