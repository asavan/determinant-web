import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import HTMLInlineCSSWebpackPlugin from "html-inline-css-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserJSPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

import webpack from "webpack";

const aConfig = () => {
    return {
        entry: {main: ["./src/index.js", "./src/css/style.css"]},
        output: {
            path: path.resolve(import.meta.dirname, "../android/app/src/main/assets/www"),
            filename: "[name].[contenthash].js",
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
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
            new HTMLInlineCSSWebpackPlugin.default(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: false
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css"
            }),
            new webpack.DefinePlugin({
                __USE_SERVICE_WORKERS__: false
            }),
            new CopyPlugin({
                patterns: [
                    { from: "./src/images", to: "./images" },
                    { from: "./src/app.webmanifest", to: "./" },
                    { from: "./.well-known", to: "./well-known" },
                    { from: "src/bin", to: "./" }
                ],
            })
        ]
    };
};

export default aConfig;
