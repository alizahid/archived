import gulp from 'gulp'

import livereload from 'gulp-livereload'

import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import clean from 'gulp-clean-css'

import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'

gulp.task('styles', () => {
	return gulp.src('./src/stylesheets/resume5.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(clean())
		.pipe(gulp.dest('./public/assets/css/'))
		.pipe(livereload())
})

gulp.task('scripts', () => {
	return gulp.src('./src/scripts/*.js')
		.pipe(babel())
		.pipe(concat('resume5.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/assets/js/'))
		.pipe(livereload())
})

gulp.task('default', () => {
	livereload.listen()

	gulp.watch('./src/stylesheets/*.scss', ['styles'])
	gulp.watch('./src/scripts/*.js', ['scripts'])
})
