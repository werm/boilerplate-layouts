/**
 * Dependencies
 */
var autoprefixer = require('metalsmith-autoprefixer');
var branch = require('metalsmith-branch');
var calc = require('postcss-calc');
var cleanCss = require('metalsmith-clean-css');
var customMedia = require('postcss-custom-media');
var customProperties = require("postcss-custom-properties");
var duo = require('metalsmith-duo');
var fingerprint = require('metalsmith-fingerprint');
var ignore = require('metalsmith-ignore');
var layouts = require('metalsmith-layouts');
var metalsmith = require('metalsmith');
var minify = require("metalsmith-html-minifier");
var postcss = require('metalsmith-postcss');
var rename = require('metalsmith-rename');
var uglify = require('metalsmith-uglify');

/**
 * Import metadata
 */
var metadata = require('./metadata');

/**
 * Postcss plugins
 */
var plugins = [
  customMedia,
  customProperties,
  calc
];

/**
 * Autoprefixer settings
 */
var supported = {browsers: ['> 1%', 'last 2 versions', 'IE >= 9']}

/**
 * Build
 */
metalsmith(__dirname)
  // Process metadata
  .metadata(metadata)

  // Process css
  .use(duo({entry: ['css/index.css']}))
  .use(autoprefixer(supported))
  .use(postcss(plugins))
  .use(cleanCss({files: 'css/index.css'}))
  .use(fingerprint({pattern: ['css/index.css']}))
  .use(ignore(['css/index.css']))

  // Process js
  .use(duo({entry: ['js/index.js']}))
  .use(uglify({filter: 'js/index.js'}))
  .use(rename([['js/index.min.js', 'js/index.js']]))
  .use(fingerprint({pattern: ['js/index.js']}))
  .use(ignore(['js/index.js']))

  // Process templates
  .use(branch('*.hbs')
    .use(layouts({
      engine: 'handlebars',
      partials: 'partials'
    }))
  )
  .use(rename([[/\.hbs$/, '.html']]))
  .use(minify())

  // Build site
  .build(function(err){
    if (err) throw err;
  });
