const {src, dest, series, parallel} = require('gulp');
const jsmin = require('gulp-jsmin');
const cleanCSS = require('gulp-clean-css');

function scriptTask() {
  return src('src/*.js')
  .pipe(jsmin())
  .pipe(dest('dist'))
}

function stylesTask() {
  return src('src/*.css')
  .pipe(cleanCSS())
  .pipe(dest('dist'))
}

function pageTask() {
  return src('src/*.html')
  .pipe(dest('dist'))
}

exports.default = parallel(pageTask, series(scriptTask, stylesTask))
