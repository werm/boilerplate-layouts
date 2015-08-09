# boilerplate-layouts

> A boilerplate for static website development with metalsmith and metalsmith-layouts (and a bunch of other plugins)

This is a boilerplate to get you started with static site development with `metalsmith-layouts`. It's rather opinionated, so change, add and remove parts as you see fit. It's merely meant to illustrate what `metalsmith-layouts` can do, and help you get started quickly.

## Getting started

1. Clone this repository with `git clone git@github.com:superwolff/boilerplate-layouts.git`.
2. Run `npm install` in the folder you've cloned to (make sure [io.js](https://iojs.org/en/index.html) is installed beforehand).
3. That's it! Run `make serve` to develop and `make build` to build a production ready version.

Some things this boilerplate does:

* Allow you to use [partials](http://handlebarsjs.com/partials.html) and [layouts](https://github.com/superwolff/metalsmith-layouts), together with all other [handlebars](http://handlebarsjs.com/) features
* Set up a live-reloading development server with [browser-sync](http://www.browsersync.io/)
* [Autoprefix](https://github.com/postcss/autoprefixer) your css and process it with [postcss](https://github.com/postcss/postcss) (which has been configured for [suitcss](https://suitcss.github.io/))
* Minify html, js and css for production builds
* Rev assets for cache-busting
* Import js and css dependencies, without a manifesto, with [duo](http://duojs.org/)

## Feedback

If you have any suggestions, encounter issues or want to help feel free to open an issue or a pull request!

## Thanks

Many thanks to the authors of the many plugins used in this boilerplate!
