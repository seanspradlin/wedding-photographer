const gulp = require('gulp');

gulp.task('js-vendor', () => {
  gulp
    .src([
      'node_modules/vue/dist/vue.*',
    ])
    .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['js-vendor']);

