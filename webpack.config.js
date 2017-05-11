const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
//const webpack = require('webpack'); //to access built-in plugins

const config = {
    entry: {
        main: './src/app/index.js'
    },
    output: {
        filename:'[name].js',
        publicPath: 'bundles/', // The publicPath also affects the relative path of the injected scripts to index.html
        path: path.resolve('bundles')
    },
    module: {
        // Rules for the module (configure loaders, parser option, etc.)
        rules: [
            // No qoute around the tested egRex
            {test: /\.jsx?$/, loader: "babel-loader", include: path.resolve('./src/app')}
        ]
    },
    resolve: {
        // An array of extensions that should be used to automatically resolve modules.
        // https://webpack.js.org/configuration/resolve/#resolve-extensions
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),

        // By default, HtmlWebpackPlugin put the generated html under the directory: output.path
        new HtmlWebpackPlugin({
            template: './src/index.template.html',
            filename: '../index.html',
            inject: 'body'
        })
    ]
}

module.exports = config;
