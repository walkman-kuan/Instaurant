const path = require('path');
const webpack = require('webpack'); // To access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
    // entry tells webpack where to start looking
    entry: {
        main: ['./src/app/index.jsx'],
        vendor: [
            'classnames',
            'firebase',
            'immutability-helper',
            'prop-types',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-dom',
            'redux',
            'redux-thunk',
        ],
    },
    output: {
        // [name].[chunkhash] isn't compatible with dev server
        filename: '[name].js',
        // The publicPath affects the relative path of the injected scripts to index.html
        publicPath: '/bundles/',
        path: path.resolve('bundles'),
    },
    module: {
        // Rules for the module (configure loaders, parser option, etc.)
        rules: [
            // No qoute around the tested regRex
            {
                test: /\.jsx?$/,
                loader: process.env.NODE_ENV === 'production' ? 'babel-loader' : 'react-hot-loader!babel-loader',
                include: path.resolve('./src/app'),
            },
        ],
    },
    resolve: {
        // An array of extensions that should be used to automatically resolve modules.
        // https://webpack.js.org/configuration/resolve/#resolve-extensions
        extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js',
            // With more entries, this ensures that no other module goes into the vendor chunk)
            minChunks: Infinity,
        }),
        // process.env.NODE_ENV in the source code is replaced by stringified value
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        // By default, HtmlWebpackPlugin put the generated html under the directory: output.path
        new HtmlWebpackPlugin({
            template: './src/index.template.html', // where to find the template
            filename: '../index.html',
            inject: 'body',
        }),
    ],
};

if (process.env.NODE_ENV === 'production') {
    // Extract the css bundle into a separate css file
    webpackConfig.plugins.push(new ExtractTextPlugin({ filename: 'main.css' }));

    // Use in Prod since ExtractTextPlugin doesn't Hot Module Replacement
    webpackConfig.module.rules.push({
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader', // loader to be be applied when the CSS isn't extracted
            use: 'css-loader!less-loader', // loader(s) to be applied
        }),
    });
} else if (process.env.NODE_ENV === 'development') {
    // Enable websocket connection (needs url and port)
    webpackConfig.entry.main.push('webpack-dev-server/client?http://localhost:8080');
    // Perform HMR in the browser BUT doesn't reload the page upon errors
    webpackConfig.entry.main.push('webpack/hot/only-dev-server');
    // Perform HMR in the browser and reload the page upon errors
    // webpackConfig.entry.main.push('webpack/hot/dev-server');

    webpackConfig.entry.vendor.push('redux-logger');

    // To generate hot update chunks
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    webpackConfig.module.rules.push({ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' });

    // Note that executing 'webpack-dev-server' doesn't bundle resources and output them like
    // 'webpack' does.
    // In production, we use 'webpack' to bundle resource, and serve the ultimate js file
    // using a production server, e.g., Firebase Hosting
    webpackConfig.devServer = {
        // Enable HMR in webpack-dev-server and in libs running in the the browser
        hot: true,
        // Tell webpack dev server where to serve content (static assets) from
        contentBase: './',
        // The bundled files (including the hot update) will be available in the browser under this path'
        publicPath: '/bundles/',
        // Serve the index.html in place of 404 responses
        historyApiFallback: true,
    };
}

module.exports = webpackConfig;
