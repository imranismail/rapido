import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpackConfig from './webpack.config.babel';
import webpack from 'webpack';
import gutil from 'gulp-util';

// Development Compiler
var devConfig = Object.create(webpackConfig);
devConfig.devtool = 'inline-source-map';
devConfig.debug = true;
var devCompiler = webpack(devConfig);

// Production Compiler
var prodConfig = Object.create(webpackConfig);
prodConfig.plugins = prodConfig.plugins.concat(
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
);
var prodCompiler = webpack(prodConfig);

gulp.task('default', ['serve']);

gulp.task('build', ['webpack:production']);

gulp.task('serve', ['webpack:development', 'browser-sync'], () => {
  gulp.watch(['assets/**/*'], ['webpack:development']);
});

gulp.task('webpack:production', (callback) => {
  prodCompiler.run((err, stats) => {
    if(err) throw new gutil.PluginError('webpack:production', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack:development', (callback) => {
  devCompiler.run((err, stats) => {
    if(err) throw new gutil.PluginError('webpack:development', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('browser-sync', () => {
  browserSync.init(['assets/dist/*'], {
    proxy: 'rapido.dev'
  });
});
