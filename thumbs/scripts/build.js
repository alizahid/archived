var fs = require('fs')

var sass = require('node-sass')
var postcss = require('postcss')
var autoprefixer = require('autoprefixer')
var babel = require('babel-core')

module.exports = function(context) {
    var js = babel.transformFileSync('./www/js/thumbs.js', {minified: true})

    fs.writeFileSync('./www/js/thumbs.min.js', js.code)

    var css = sass.renderSync({file: './www/css/thumbs.scss'})

    var plugins = [autoprefixer({
            browsers: ['Android > 1', 'ChromeAndroid > 1', 'Samsung > 1', 'iOS > 1']
        })]

    var autoprefixed = postcss(plugins).process(css.css)

    fs.writeFileSync('./www/css/thumbs.min.css', autoprefixed.css)
}
