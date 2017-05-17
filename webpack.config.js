const path = require('path');
const webpack = require('webpack'); // To access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:8080', // Enable websocket connection (needs url and port)
            'webpack/hot/only-dev-server', // Perform HMR in the browser BUT doesn't reload the page upon errors
            // 'webpack/hot/dev-server', // Perform HMR in the browser and reload the page upon errors
            './src/app/index.jsx',
        ],
    },
    output: {
        filename: '[name].js', // [name].[chunkhash] isn't compatible with dev server
        publicPath: '/bundles/', // The publicPath also affects the relative path of the injected scripts to index.html
        path: path.resolve('bundles'),
    },
    module: {
        // Rules for the module (configure loaders, parser option, etc.)
        rules: [
            // No qoute around the tested regRex
            { test: /\.jsx?$/, loader: 'react-hot-loader!babel-loader', include: path.resolve('./src/app') },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            /*
            // Use for prod since ExtractTextPlugin doesn't Hot Module Replacement
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', // loader to be be applied when the CSS isn't extracted
                    use: 'css-loader!less-loader', // loader(s) to be applied
                }),
            },
            */
        ],
    },
    resolve: {
        // An array of extensions that should be used to automatically resolve modules.
        // https://webpack.js.org/configuration/resolve/#resolve-extensions
        extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),

        /*
        // Extract the css bundle into a separate css file
        new ExtractTextPlugin({
            filename: 'main.css',
        }),
        */
        // By default, HtmlWebpackPlugin put the generated html under the directory: output.path
        new HtmlWebpackPlugin({
            template: './src/index.template.html',
            filename: '../index.html',
            inject: 'body',
        }),
        new webpack.HotModuleReplacementPlugin(), // To generate hot update chunks
    ],
    devServer: {
        hot: true, // Enable HMR in webpack-dev-server and in libs running in the the browser
        contentBase: './', // Tell webpack dev server where to serve content (static assets) from
        // The bundled files (including the hot update) will be available in the browser under this path'
        publicPath: '/bundles/',
        historyApiFallback: true, //  Serve the index.html in place of 404 responses
    },
};

module.exports = config;
