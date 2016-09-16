const gulp = require('gulp');
const typescript = require('typescript');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json', { typescript });

gulp.task('typescript', () =>
  tsProject
    .src('client/**/*.ts')
    .pipe(ts(tsProject))
    .js
    .pipe(gulp.dest('.dist/app'))
);

gulp.task('html', () =>
  gulp
    .src([
      'client/**/*.html',
    ])
    .pipe(gulp.dest('.dist'))
);

gulp.task('css', () =>
  gulp
    .src([
      'client/**/*.css',
    ])
    .pipe(gulp.dest('.dist'))
);

gulp.task('js', () =>
  gulp
    .src([
      'client/**/*.js',
    ])
    .pipe(gulp.dest('.dist'))
);

gulp.task('angular', () =>
  gulp
    .src('node_modules/@angular/**/*.*')
    .pipe(gulp.dest('.dist/dist/@angular'))
);

gulp.task('rxjs', () =>
  gulp
    .src('node_modules/rxjs/**/*.*')
    .pipe(gulp.dest('.dist/dist/rxjs'))
);

gulp.task('core-js', () =>
  gulp
    .src('node_modules/core-js/**/*.*')
    .pipe(gulp.dest('.dist/dist/core-js'))
);

gulp.task('zone.js', () =>
  gulp
    .src('node_modules/zone.js/**/*.*')
    .pipe(gulp.dest('.dist/dist/zone.js'))
);

gulp.task('reflect-metadata', () =>
  gulp
    .src('node_modules/reflect-metadata/**/*.*')
    .pipe(gulp.dest('.dist/dist/reflect-metadata'))
);

gulp.task('systemjs', () =>
  gulp
    .src('node_modules/systemjs/**/*.*')
    .pipe(gulp.dest('.dist/dist/systemjs'))
);

gulp.task('css-vendor', () =>
  gulp
    .src([
      'node_modules/bootstrap/dist/css/*.*',
    ])
    .pipe(gulp.dest('.dist/dist'))
);

gulp.task('fonts-vendor', () =>
   gulp
    .src([
      'node_modules/bootstrap/dist/fonts/*.*',
    ])
    .pipe(gulp.dest('.dist/dist'))
);

gulp.task('js-vendor', ['angular', 'rxjs', 'core-js',
  'zone.js', 'reflect-metadata', 'systemjs']);

gulp.task('watch', () =>
  gulp.watch('client/**/*.*', ['compile'])
);

gulp.task('compile', ['typescript', 'html', 'css', 'js']);

gulp.task('default', ['html', 'css', 'js', 'js-vendor', 'css-vendor',
  'fonts-vendor', 'compile', 'watch']);

