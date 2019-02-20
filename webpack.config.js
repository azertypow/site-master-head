const path                      = require('path')
const VueLoaderPlugin           = require('vue-loader/lib/plugin')
const TerserPlugin              = require('terser-webpack-plugin');
const MiniCssExtractPlugin      = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin   = require("optimize-css-assets-webpack-plugin");

module.exports = (env, argv) => {

    const WEBPACK_RUN_ON_PRODUCTION_MODE = argv.mode === 'production';

    console.log(WEBPACK_RUN_ON_PRODUCTION_MODE);

    return {
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'build.js'
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.scss$/,
                    use: [
                        //https://vue-loader.vuejs.org/guide/extract-css.html#webpack-4
                        //and
                        //https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
                        WEBPACK_RUN_ON_PRODUCTION_MODE ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS, using Node Sass by default
                    ]
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        outputPath: 'assets/dist/images/'
                    }
                },
                {
                    test: /\.(woff(2)?|otf|ttf|eot|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/dist/fonts/'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        devServer: {
            historyApiFallback: true,
            noInfo: false,
            contentBase: path.join(__dirname, './'),
            compress: true,
            port: 8080,
        },
        optimization: WEBPACK_RUN_ON_PRODUCTION_MODE ? {
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    sourceMap: true,
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        map: {
                            inline: false,
                            annotation: true,
                        }
                    }
                })
            ]
        } : {},
        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            })
        ],
        devtool: WEBPACK_RUN_ON_PRODUCTION_MODE ? '#source-map' : '#source-map'
    }
}
