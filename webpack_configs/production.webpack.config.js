import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import {GenerateSW} from 'workbox-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'
import webpack from 'webpack'

const prodConfig = (env, argv) => {
    const devMode = false;
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    return {

        entry: {main: "./src/index.js"},
        output: {
            path: path.resolve(dirname, "../docs"),
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
                    { from: './src/images', to: './images' },
                    { from: './github', to: './' },
                    { from: './src/manifest.json', to: './' },
                    { from: './.well-known', to: './.well-known' },
                    { from: 'src/rules.html', to: './' },
                    { from: 'src/bin', to: './' }
                ],
            })
        ]
    }
};

export default prodConfig;
