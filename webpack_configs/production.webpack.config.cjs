const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const {GenerateSW} = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = (env, argv) => {
    const devMode = false;
    return {

        entry: {main: "./src/index.js"},
        output: {
            path: path.resolve(__dirname, "../docs"),
            filename: "[name].[contenthash].js"
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [{
                        loader: MiniCssExtractPlugin.loader
                    }, 'css-loader'],
                },
                {
                    test: /worker\.js$/,
                    use: { loader: 'worker-loader' },
                }
            ]
        },
        optimization: {
            minimizer: [new TerserJSPlugin({
                terserOptions: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    }
                }
            }), new CssMinimizerPlugin()],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: false
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            }),
            new GenerateSW({
                swDest: 'sw.js',
                // these options encourage the ServiceWorkers to get in there fast
                // and not allow any straggling "old" SWs to hang around
                clientsClaim: true,
                skipWaiting: true,
                exclude: [
                    /index\.html$/,
                    /CNAME$/,
                    /\.nojekyll$/,
                    /_config\.yml$/,
                    /^.*well-known\/.*$/,
                ]
            }),
            new webpack.DefinePlugin({
                __USE_SERVICE_WORKERS__: !devMode
            }),
            new CopyPlugin({
                patterns: [
                    { from: './images', to: './images' },
                    { from: './github', to: './' },
                    { from: './manifest.json', to: './' },
                    { from: './.well-known', to: './.well-known' },
                    { from: 'src/rules.html', to: './' },
                    { from: 'src/bin', to: './' }
                ],
            })
        ]
    }
};
