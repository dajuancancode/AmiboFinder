const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const useref = require('gulp-useref')
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if')
const cssnano = require('gulp-cssnano')
const imagein = require('gulp-imagemin')
const cache = require('gulp-cache');

gulp.task('sass', () => {
  return gulp.src("app/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream())
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
})

gulp.task('images', () => {
  return gulp.src('app/images/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagein({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
})

gulp.task('serve', gulp.series('sass', 'useref', () => {
  browserSync.init({
    server: "./app"
  })
  gulp.watch('app/scss/**/*.scss', gulp.series('sass'))
  gulp.watch('app/*.html', gulp.series('useref', 'images')).on('change', browserSync.reload)
}))

module.serve = gulp.series('serve')