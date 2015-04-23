'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var notifier = require('node-notifier');
var app_url = "http://yourvhostsite.com/";

gulp.task('clean', require('del').bind(null, ['style.css', 'style.css.map']));

gulp.task('styles', function() {
    return  $.rubySass('style.scss',{
        style: 'expanded',
        precision: 10,
        sourcemap: true
      })
      .on('error', function (err) {
        $.notify.onError({
          title: 'Error!',
          message: err.message,
          sound: true
        })(err);
      })
      .pipe($.postcss([
        require('autoprefixer-core')({browsers: ['last 1 version']})
      ]))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('.'))
      .pipe($.notify({title: 'gulp styles' ,message: 'Sass Compiled!', onLast: true, sound: true }));
});

gulp.task('lint', function () {
    gulp.src('scripts/coffee/**/*.coffee')
        .pipe($.coffeelint())
        .pipe($.coffeelint.reporter());
});

gulp.task('coffee', function() {
  gulp.src('scripts/coffee/**/*.coffee')
    .pipe($.coffee({bare: true}).on('error', function (err) {
      $.notify.onError({
        title: 'Error!',
        message: err.message,
        sound: true
      })(err);
    }))
    .pipe(gulp.dest('scripts/js'))
    .pipe($.notify({title: 'gulp coffee', message: 'Scripts Compiled!', onLast: true, sound: true }));
});

gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('styles/*.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('styles'));

  gulp.src('views/**/*.twig')
    .pipe(wiredep({
      ignorePath: /^(\/|\.+(?!\/[^\.]))+\.+/,
      exclude: ['bootstrap-sass-official/', 'bootstrap/'],
    fileTypes: {
      html: {
        replace: {
          js: '<script src="\{\{site.theme.link\}\}{{filePath}}"></script>',
          css: ' <link rel="stylesheet" href="\{\{site.theme.link\}\}{{filePath}}" type="text/css" media="screen" />'
        }
      }
    }
    }))
    .pipe(gulp.dest('views'));

  notifier.notify({ title: 'gulp wiredep', message: 'Dependency Wired!', sound: true});
});

gulp.task('watch', function () {
  $.livereload.listen();
  gulp.watch([
      'views/**/*.twig',
      'style.css',
      'scripts/**/*.js',
      'images/**/*',
      '*.php'
    ]).on('change', $.livereload.changed);

  gulp.watch('styles/**/*.scss', ['styles']);
  gulp.watch('scripts/coffee/**/*.coffee', ['coffee']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('serve', ['wiredep', 'styles', 'coffee', 'watch'], function () {
  require('opn')(app_url);
});

gulp.task('build', ['wiredep', 'styles', 'lint', 'coffee'], function() {
  $.util.log('Build Complete!');
  notifier.notify({ title: 'gulp build', message: 'Build Complete!', sound: true});
});

gulp.task('default', ['clean'], function () {
  gulp.start('watch');
});
