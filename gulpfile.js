var gulp = require('gulp'); 
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');

gulp.task('start', function () {
  nodemon({
    script: 'app.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('sass', function () {
  return gulp.src('assets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css/'));
});
 
gulp.task('minify-css', function() {
  return gulp.src('assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css/'));
});
 
gulp.task('concat', function () {
  return gulp.src('assets/css/*.css')
    .pipe(concatCss("assets/style.css"))
    .pipe(gulp.dest('build/'));
});