import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import HTMLInlineCSSWebpackPlugin from "html-inline-css-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserJSPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import {InjectManifest} from "workbox-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

import webpack from "webpack";

import PACKAGE from "../package.json" with { type: "json" };

const prodConfig = () => {
    return {

        entry: {main: ["./src/index.js", "./src/css/style.css"]},
        output: {
            path: path.resolve(import.meta.dirname, "../docs"),
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
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css"
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: false
            }),
            new HTMLInlineCSSWebpackPlugin.default(),
            new InjectManifest({
                swDest: "sw.js",
                swSrc: "./src/sw.js",
                exclude: [
                    /index\.html$/,
                    /CNAME$/,
                    /\.nojekyll$/,
                    /_config\.yml$/,
                    /^.*well-known\/.*$/,
                ]
            }),
            new webpack.DefinePlugin({
                __USE_SERVICE_WORKERS__: true,
                __SERVICE_WORKER_VERSION__: JSON.stringify(PACKAGE.version)
            }),
            new CopyPlugin({
                patterns: [
                    { from: "./src/images", to: "./images" },
                    { from: "./github", to: "./" },
                    { from: "./src/app.webmanifest", to: "./" },
                    { from: "./.well-known", to: "./.well-known" },
                    { from: "src/rules.html", to: "./" },
                    { from: "src/bin", to: "./" }
                ],
            })
        ]
    };
};

export default prodConfig;
