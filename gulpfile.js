const gulp = require('gulp');

gulp.task('js-vendor', () => {
  gulp
    .src([
      'node_modules/vue/dist/vue.*',
      'node_modules/bootstrap/dist/js/*.*',
      'node_modules/jquery/dist/jquery.*',
    ])
    .pipe(gulp.dest('public/vendor/js'));
});

gulp.task('css-vendor', () => {
  gulp
    .src([
      'node_modules/bootstrap/dist/css/*.*',
    ])
    .pipe(gulp.dest('public/vendor/css'));
});

gulp.task('fonts-vendor', () => {
  gulp
    .src([
      'node_modules/bootstrap/dist/fonts/*.*',
    ])
    .pipe(gulp.dest('public/vendor/fonts'));
});

gulp.task('default', ['js-vendor', 'css-vendor', 'fonts-vendor']);

