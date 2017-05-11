const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Installed via npm
const webpack = require('webpack'); // To access built-in plugins

const config = {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:8080', // Enable websocket connection (needs url and port)
            'webpack/hot/only-dev-server', // Perform HMR in the browser BUT doesn't reload the page upon errors
            //'webpack/hot/dev-server', // Perform HMR in the browser and reload the page upon errors
            './src/app/index.js'
        ]
    },
    output: {
        filename:'[name].js',
        publicPath: '/bundles/', // The publicPath also affects the relative path of the injected scripts to index.html
        path: path.resolve('bundles')
    },
    module: {
        // Rules for the module (configure loaders, parser option, etc.)
        rules: [
            // No qoute around the tested egRex
            {test: /\.jsx?$/, loader: "react-hot-loader!babel-loader", include: path.resolve('./src/app')}
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
        }),
        new webpack.HotModuleReplacementPlugin() // To generate hot update chunks
    ],
    devServer: {
        hot: true, // Enable HMR in webpack-dev-server and in libs running in the the browser
        contentBase: './' // Tell webpack dev server where to serve content (static assets) from
    }
}

module.exports = config;
