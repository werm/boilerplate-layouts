/**
 * Dependencies
 */
var autoprefixer = require('metalsmith-autoprefixer');
var browserSync = require('metalsmith-browser-sync');
var calc = require('postcss-calc');
var customMedia = require('postcss-custom-media');
var customProperties = require('postcss-custom-properties');
var duo = require('metalsmith-duo');
var fingerprint = require('metalsmith-fingerprint');
var ignore = require('metalsmith-ignore');
var layouts = require('metalsmith-layouts');
var metalsmith = require('metalsmith');
var postcss = require('metalsmith-postcss');
var rename = require('metalsmith-rename');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

var branch = require('metalsmith-branch');

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
  .use(fingerprint({pattern: ['css/index.css']}))
  .use(ignore(['css/index.css']))

  // Process js
  .use(duo({entry: ['js/index.js']}))
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

  // Serve and watch for changes
  .use(browserSync({
    server : 'build',
    files : ['src/**/*', 'layouts/**/*']
  }))

  // Build site
  .build(function(err){
    if (err) throw err;
  });
