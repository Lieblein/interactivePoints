const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const ENV = 'development';

const commonConfig = require('./webpack.common.js')({ env: ENV });
const helpers = require('./helpers');

const config = webpackMerge.smart(commonConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(ENV)
        })
    ]
});

// uncomment if you want to see configs merge result
// helpers.writeJSON(config);

module.exports = config;
