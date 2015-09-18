import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  cache: true,

  context: path.join(__dirname, 'assets'),

  entry: ['./scripts/app'],

  output: {
    path: path.join(__dirname, 'assets', 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  resolve: {
    root: [
      path.join(__dirname, 'bower_components'),
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'assets'),
    ]
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', },

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!resolve-url!'),
      },

      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url!sass?sourceMap&indentedSyntax' +
          '&includePaths[]=' +
            path.join(__dirname, 'bower_components')),
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url!sass?sourceMap' +
          '&includePaths[]=' +
            path.join(__dirname, 'bower_components')),
      },

      { test: /\.(png|jpg|jpeg|gif)/, loader: 'url' },

      { test: /\.(woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url' },

      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' },
    ]
  },

  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('package.json', ['main'])
    ),

    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    ),

    new ExtractTextPlugin('bundle.css')
  ],
};
