import os from "os";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack";

function getLocalExternalIP(defaultAddr) {
    const cand = Object.values(os.networkInterfaces())
        .flat()
        .filter(a => a.family === "IPv4" && !a.internal)
        .map(a => a.address);
    if (cand.length === 0) {
        return defaultAddr;
    }
    console.log(cand);
    return cand.slice(-1)[0];
}

const devConfig = () => {
    console.log(getLocalExternalIP("0.0.0.0"));
    const addr = "0.0.0.0";
    return {

        entry: {main: ["./src/index.js", "./src/css/style.css"]},
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                scriptLoading: "module",
                minify: false,
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css"
            }),
            new webpack.DefinePlugin({
                __USE_SERVICE_WORKERS__: false
            }),
            new CopyPlugin({
                patterns: [
                    { from: "./src/images", to: "./images" },
                    { from: "./src/manifest.json", to: "./" },
                    { from: "./.well-known", to: "./.well-known" },
                    { from: "src/rules.html", to: "./" },
                    { from: "src/bin", to: "./" }
                ],
            })
        ],
        devServer: {
            compress: true,
            port: 8080,
            hot: true,
            open: true,
            host: addr
        }
    };
};

export default devConfig;
