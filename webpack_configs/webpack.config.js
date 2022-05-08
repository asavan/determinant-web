import os from 'os'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import webpack from 'webpack'

const getLocalExternalIP = () => [].concat(...Object.values(os.networkInterfaces()))
    .filter(details => details.family === 4 && !details.internal)
    .pop()?.address

const devConfig = (env, argv) => {
    const devMode = true;
    let addr = getLocalExternalIP() || '0.0.0.0';
    return {

        entry: {main: ["./src/index.js", "./src/css/style.css"]},
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
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: false,
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[contenthash].css'
            }),
            new webpack.DefinePlugin({
                __USE_SERVICE_WORKERS__: !devMode
            }),
            new CopyPlugin({
                patterns: [
                    { from: './src/images', to: './images' },
                    { from: './src/manifest.json', to: './' },
                    { from: './.well-known', to: './.well-known' },
                    { from: 'src/rules.html', to: './' },
                    { from: 'src/bin', to: './' }
                ],
            })
        ],
        devServer: {
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

export default devConfig;