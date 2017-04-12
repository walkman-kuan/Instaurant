const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
//const webpack = require('webpack'); //to access built-in plugins

const config = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename:'[name].[chunkhash].js',
        // publicPath: '../' // The publicPath also affects the relative path of the injected scripts to index.html
        path: path.resolve('bundles')
    },
    module: {
        rules: [
            {test: '/\.jsx?$/', use: 'babel-loader', include: path.resolve('./src/index.js')}
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),

        // By default, HtmlWebpackPlugin put the generated html under the directory: output.path
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '../index.html',
            inject: 'body'
        })
    ]
}

module.exports = config;
