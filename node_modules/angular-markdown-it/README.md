![Bower version][bower-image]
![NPM version][npm-image]
[![Build Status][ci-image]][ci-url]
[![Code Coverage status][codecov-image]][codecov-url]

# angular-markdown-it

> [Angular 1.x](https://angularjs.org) directive for rendering markdown with [markdown-it](https://github.com/markdown-it/markdown-it). This directive is based on @btford's [markdown directive](https://github.com/btford/angular-markdown-directive).

## Getting started

### Quick start

Pick one of these options:

- [Download latest release](https://github.com/macedigital/angular-markdown-it/archive/master.zip)
- Clone the repository `git clone https://github.com/macedigital/angular-markdown-it.git`
- Install with [NPM](https://npmjs.org/) `npm install angular-markdown-it`
- Install with [Bower](http://bower.io/) `bower install angular-markdown-it`

### Installation

You'll need to load `angular`, `angular-sanitize`, and `markdown-it` in your markup like in the example below (assuming you installed via `npm`). 

````html
<html ng-app="myapp">
  <head>
    <!-- ... -->
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-sanitize/angular-sanitize.min.js"></script>
    <script src="node_modules/markdown-it/dist/markdown-it.min.js"></script>
    <script src="node_modules/angular-markdown-it/dist/ng-markdownit.min.js"></script>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
````

Since release 0.5 it is possible to lazy-load the `markdown-it` dependency. Just make sure it is available before a markdown-it directive is first called. 

If you like *browserify*, you could include this snippet into your `entry.js` file instead.
 
````js
require('angular');
require('angular-sanitize');
global.markdownit = require('markdown-it');
require('angular-markdown-it');

angular.module('myapp', ['mdMarkdownIt']);
````

## Usage

Include the `markdown-it` directive in your templates:

````html
<markdown-it>
# Hey there!
*It works!*
</markdown-it>
````

You can also bind the markdown input to a scope variable:

````html
<div markdown-it="markdown"></div>
<!-- Uses $scope.markdown -->
````

Or, you include a markdown file:

````html
<div markdown-it ng-include="'README.md'"></div>
<!-- Uses content from README.md -->
````

## Configuration

By default, nothing has to be configured. All markdown will be rendered similar to [GFM](https://help.github.com/categories/writing-on-github/), but without HTML, typographer & autolinker features.

Nonetheless, there are two methods for changing behavior, which can be combined:

### Changing options

You can pass in custom options to the `markdownItConverterProvider` by choosing a preset, and/or custom settings calling the `config()` method.

````js
angular.module('myapp', ['ngSanitize', 'mdMarkdownIt'])
  .config(['markdownItConverterProvider', function(markdownItConverter) {
      markdownItConverter.config('commonmark', {
        breaks: true,
        html: true
      });
  }])
````

In above example, we'll use [CommonMark](http://commonmark.org/) mode, render line-breaks as `<br>` tags, and enable HTML tags in the source.

See [markdown-it presets and options](https://github.com/markdown-it/markdown-it#init-with-presets-and-options) for all possible variations.

### Using plugins

Adding plugins is supported by calling the `use()` method.

Each plugin must be added individually, but you can use method-chaining to simplify the process. The signature of `use()` mimicks the way how you would add plugins to vanilla `markdown-it`.  

````js
angular.module('myapp', ['ngSanitize', 'mdMarkdownIt'])
  .config(['markdownItConverterProvider', function(markdownItConverter) {
      markdownItConverter
        .use(plugin1)
        .use(plugin2, opts, ...)
        .use(plugin3)
      ;
  }])
````

There are many [markdown-it plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin) available.

## License

MIT

[npm-image]:https://img.shields.io/npm/v/angular-markdown-it.svg?style=flat
[bower-image]:https://img.shields.io/bower/v/angular-markdown-it.svg?style=flat
[ci-image]: https://travis-ci.org/macedigital/angular-markdown-it.svg?style=flat
[ci-url]: https://travis-ci.org/macedigital/angular-markdown-it
[codecov-image]:https://img.shields.io/codecov/c/github/macedigital/angular-markdown-it.svg?style=flat
[codecov-url]:https://codecov.io/github/macedigital/angular-markdown-it