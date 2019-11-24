const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: 'development',
    devtool: 'none',
    output: {
        filename: '[name]-[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: '[name]-[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new StyleLintPlugin({
            // Use regex to match files that should be linted
            files: ['src/**/*.vue']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'template/index.ejs'),
            // TODO: ADD FAVICON
            // favicon: path.resolve(__dirname, 'template/favicon.ico'),
            filename: 'index.html',
            env: process.env.NODE_ENV
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, '../src')
        }
    }
};

module.exports = config;
