"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var run = require('gulp-run');
var del = require('del');

var JCR_ROOT = './src/main/content/jcr_root',
    SOURCE_SASS = JCR_ROOT + '/etc/designs/filevault/stylesheets',
    SOURCE_JS = JCR_ROOT + '/etc/designs/filevault/clientlibs/js/',    
    DEST_CSS = JCR_ROOT + '/etc/designs/filevault/clientlibs/css/min',
    DEST_JS = JCR_ROOT + '/etc/designs/filevault/clientlibs/js/min';    

gulp.task('clean-css', function () {
    del([DEST_CSS + '/*.min.*']).then(paths => {
        console.log('Cleaned CSS files:\n', paths.join('\n'));
    });
});

gulp.task('clean-js', function () {
    del([DEST_JS + '/*.min.*']).then(paths => {
        console.log('Cleaned JS files:\n', paths.join('\n'));
    });
});

gulp.task('generate-js', function() {
  return gulp.src([ 
            SOURCE_JS + '/**/*.js',
            '!' + SOURCE_JS + '/**/*.min.*'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('site.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(DEST_JS));
});

gulp.task('generate-css', function () {
  return gulp.src(SOURCE_SASS + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(concat('site.min.css'))
    
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest(DEST_CSS))
    ;
});

gulp.task('sync-js', function() {
  runSequence(
      'clean-js',
      'generate-js',
      'import-js'
  );
});

gulp.task('import-js', function() {
  run('vlt --credentials admin:admin import http://localhost:4502/crx ./etc/designs/filevault/clientlibs/js/min', 
      {cwd:JCR_ROOT}).exec();
});

gulp.task('watch-js', function () {
    gulp.watch([
        SOURCE_JS + '/**/*.js', 
        '!' + DEST_JS + '/**/*.min.*'
      ], ['sync-js']);
});

gulp.task('import-css', function(){
    run('vlt --credentials admin:admin import http://localhost:4502/crx ./etc/designs/filevault/clientlibs/css/min', 
      {cwd:JCR_ROOT}).exec();
});

gulp.task('sync-css', function() {
  runSequence(
      'clean-css',
      'generate-css',
      'import-css'
  );
});

gulp.task('watch-sass', function () {
    gulp.watch(SOURCE_SASS + '/**/*.scss', ['sync-css']);
});

gulp.task('default', [
    'clean-css', 
    'generate-css',
    'clean-js', 
    'generate-js', 
    'watch-sass', 
    'watch-js'
    ]
);

gulp.task('build', [
    'clean-css',
    'clean-js',
    'generate-css',
    'generate-js', 
    ]
);