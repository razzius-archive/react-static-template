import browserify from 'browserify'
import source from 'vinyl-source-stream'
import gulp from 'gulp'
import gutil from 'gulp-util'
import buffer from 'vinyl-buffer'
import rename from 'gulp-rename'
import babelify from 'babelify'
import livereload from 'gulp-livereload'


gulp.task('browserify', function () {
  const transpiler = browserify('app.es', {
    debug: true,
    transform: [babelify]
  })

  const bundle = transpiler.bundle()
  bundle.on('error', function(err) {
    console.log(err.toString())
    this.emit('end')
  })

  return bundle
    .pipe(source('app.es'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(livereload())
})

gulp.task('default', function() {
  livereload.listen()
  gulp.watch('app.es', ['browserify'])
})
