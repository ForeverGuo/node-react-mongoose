const pathLib = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('./config/config');

const ROOT_PATH = pathLib.resolve(__dirname);
const ENTRY_PATH = pathLib.resolve(ROOT_PATH, 'src');
const OUTPUT_PATH = pathLib.resolve(ROOT_PATH, 'build');
const AppHtml = pathLib.resolve(ENTRY_PATH,'index.html')
console.log(pathLib.resolve(ENTRY_PATH, 'index.js'));

module.exports = {
    mode:"development",
    entry: {
        index: [
          'react-hot-loader/patch',
          `webpack-hot-middleware/client?path=http://${config.host}:${config.port}/__webpack_hmr`,
          'babel-polyfill',
          pathLib.resolve(ENTRY_PATH, 'index.js')
        ],
        vendor: ['react', 'react-dom', 'react-router-dom']
    },
    output: {
        path: OUTPUT_PATH,
        publicPath: '/',
        filename: '[name]-[hash:8].js'
    },
    devtool: 'false',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader'
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: ["style-loader", 'css-loader', "postcss-loader", "less-loader"]
            },
            {
                test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),//改善chunk传输
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "progress.env.NODE_ENV": JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: AppHtml,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.NoEmitOnErrorsPlugin(),//保证出错时页面不阻塞，且会在编译结束后报错
        new webpack.HashedModuleIdsPlugin(),//用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化
        // webpack 3.x 使用以下方式
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: function (module) {
        //         return module.context && module.context.indexOf('node_modules') !== -1;
        //     }
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "manifest"
        // }),
        new OpenBrowserPlugin({
            url: `http://${config.host}:${config.port}`
        }),
    ],
    // webpack 4.x 使用以下方式
    optimization: {
        splitChunks: {
            cacheGroups: {
                vandor: {
                    chunks: 'async',
                    minChunks: 2,
                    name: 'vendor',
                    test: /node_modules/,
                    // minChunks: function (module) {
                    //     return module.context && module.context.indexOf('node_modules') !== -1;
                    // }
                },
                common: {
                    chunks: 'async',
                    minChunks: 2,
                    name: "common",
                    reuseExistingChunk: true,
                    enforce: true,
                }
            }
        },
    },
    resolve: {
        extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx','.css','*'],
        alias: {
            '@': pathLib.join(__dirname,'src'),
            'react-dom': '@hot-loader/react-dom'
        }
    },
}
