const { dest, src, parallel, watch } = require('gulp')

const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const sass = require('gulp-sass')

const scripts = callback => {
  src('./src/scripts/*.js')
    .pipe(babel())
    .pipe(dest('./blogs/assets/'))

  callback()
}

const styles = callback => {
  src('./src/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest('./blogs/assets/'))

  callback()
}

const watchTask = callback => {
  watch('./src/scripts/*.js', scripts)
  watch('./src/stylesheets/*.scss', styles)

  callback()
}

exports.watch = watchTask
exports.default = parallel(scripts, styles)
