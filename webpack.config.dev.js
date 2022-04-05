const path = require("path");

//Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
    },
    mode: "development",
    devtool: "source-map",
    resolve: {
        extensions: [".js"],
        alias: {
            "@utils": path.resolve(__dirname, "./src/utils/"),
            "@templates": path.resolve(__dirname, "./src/templates/"),
            "@styles": path.resolve(__dirname, "./src/styles/"),
            "@images": path.resolve(__dirname, "./src/assets/images/"),
            "@fonts": path.resolve(__dirname, "./src/assets/fonts/")
        }
    },

    //Herramientas y loaders
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css|.styl$/i,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "stylus-loader"
                ]
            },
            {
                test: /\.png$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/images/[hash][ext]"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "assets/fonts/[name].[contenthash].[ext]"
                }
            }
        ]
    },
    //Plugins
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
            watch: true
        },
        watchFiles: ["./**"],
        compress: true,
        historyApiFallback: true,
        port: 3005,
        open: true
    }
}