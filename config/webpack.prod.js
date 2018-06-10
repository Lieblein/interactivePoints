const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = 'production';

const getConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const ASSETS_PATH = './assets/';

const JS_FOLDER = ASSETS_PATH + 'js/';
const IMG_FOLDER = ASSETS_PATH + 'images/';
const FONTS_FOLDER = ASSETS_PATH + 'fonts/';
const CSS_FOLDER = ASSETS_PATH + 'css/';

const commonConfig = getConfig({
    env: ENV,
    js_folder: JS_FOLDER,
    img_folder: IMG_FOLDER,
    fonts_folder: FONTS_FOLDER,
    css_folder: CSS_FOLDER,
});

const config = webpackMerge.smart(commonConfig, {
    module: {
        rules: [
            {
                test: /\.(p)?css$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../../',
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(jpg|png|gif)$|(img\.svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: IMG_FOLDER + '[name].[ext]' }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                            svgo:{
                                plugins: [
                                    { removeViewBox: false },
                                    { removeEmptyAttrs: false }
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(ENV)
        }),
        new ExtractTextPlugin(CSS_FOLDER + '[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        })
    ]
});

// uncomment if you want to see configs merge result
// helpers.writeJSON(config);

module.exports = config;
