const path = require("path");
const os = require('os');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const {GenerateSW} = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// process.traceDeprecation = true;

const getLocalExternalIP = () => [].concat(...Object.values(os.networkInterfaces()))
    .filter(details => details.family === 'IPv4' && !details.internal)
    .pop().address

module.exports = (env, argv) => {
    const devMode = !argv || (argv.mode !== 'production');
    let addr = getLocalExternalIP() || '0.0.0.0';
    return {

        entry: {main: "./src/index.js"},
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: devMode ? "[name].js" : "[name].[contenthash].js",
            publicPath: devMode ? "/" : "./dist/"
            // publicPath: "./dist/"
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
                minify: false,
                filename: devMode ? "./index.html" : "../index.html"
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[contenthash].css'
            }),
            ...(devMode ? [] : [new GenerateSW({
                swDest: '../sw.js',
                // these options encourage the ServiceWorkers to get in there fast
                // and not allow any straggling "old" SWs to hang around
                clientsClaim: true,
                skipWaiting: true,
            })]),
            new webpack.DefinePlugin({
                __USE_SERVICE_WORKERS__: !devMode
            }),
            new CopyPlugin({
                patterns: [
                    { from: 'src/bin', to: './' }
                ],
            })
        ],
        devServer: {
            // contentBase: path.resolve(__dirname, "src"),
            historyApiFallback: true,
            compress: true,
            port: 8080,
            hot: true,
            open: true,
            host: addr,
            // clientLogLevel: 'debug',
            // watchContentBase: true,
        }
    }
};
