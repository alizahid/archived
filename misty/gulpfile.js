const fs = require('fs-extra')
const gulp = require('gulp')
const handlebars = require('handlebars')

const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean-css')
const connect = require('gulp-connect')
const sass = require('gulp-sass')

gulp.task('connect', () =>
  connect.server({
    livereload: true,
    root: 'public'
  })
)

gulp.task('livereload', () => gulp.src('./public/**/*').pipe(connect.reload()))

gulp.task('watch', () => {
  gulp.watch('./src/stylesheets/*.scss', ['stylesheets'])
  gulp.watch('./src/data.json', ['templates'])
  gulp.watch('./src/templates/*.hbs', ['templates'])
  gulp.watch('./public/**/*', ['livereload'])
})

gulp.task('dev', ['connect', 'watch', 'default'])

gulp.task('stylesheets', () =>
  gulp
    .src('./src/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(clean())
    .pipe(gulp.dest('./public/assets/css/'))
    .pipe(connect.reload())
)

gulp.task('templates', async () => {
  const load = name =>
    new Promise(resolve => {
      fs.readFile(
        `./src/templates/${name}.hbs`,
        {
          encoding: 'utf8'
        },
        (err, template) => {
          resolve({
            name: name,
            template: template
          })
        }
      )
    })

  const data = await fs.readJson('src/data.json')

  const templates = ['footer', 'header', 'main', 'nav'].map(name =>
    fs
      .readFile(`src/templates/${name}.hbs`, 'utf8')
      .then(template => handlebars.registerPartial(name, template))
  )

  await Promise.all(templates)

  const layout = await fs.readFile('src/templates/layout.hbs', 'utf8')

  const template = handlebars.compile(layout)

  const html = template(data)

  await fs.outputFile('public/index.html', html)

  connect.reload()
})

gulp.task('default', ['stylesheets', 'templates'])
