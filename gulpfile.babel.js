// generated on 2015-07-01 using generator-gulp-webapp 1.0.2
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('assets/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('assets/styles'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  },
  globals: {
    assert: false,
    expect: false,
    should: false
  }
};

gulp.task('lint', lint('scripts/**/*.js'));

gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({searchPath: ['assets', '.']});

  return gulp.src('views/**/*.twig')
    .pipe($.replace('{{site.theme.link}}', ''))
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(gulp.dest('assets/dist'));
});

gulp.task('images', () => {
  return gulp.src('assets/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('assets/dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('assets/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('assets/dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'assets/*.*',
    '!views/*.twig'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'views/**/*.twig',
    'assets/scripts/**/*.js',
    'assets/images/**/*',
    'assets/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('assets/styles/**/*.scss', ['styles']);
  gulp.watch('assets/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('assets/styles/**/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('assets/styles'));

  gulp.src('views/**/*.twig')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./,
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
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
