const path = require("path");
    // Este es un modulo que ya viene incluido con webpack.

//Plugins
    // Instanciamos los plugins para poder configurarlo en webpack.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");


//Configuración del proyecto
module.exports = {
    entry: "./src/index.js",
        //Entry point, punto de inicio de donde va a partir todo el proyecto.
    output: { //Output
        path: path.resolve(__dirname, "dist"),
            // En que carpeta va a enviar la compilación (se crea si aun no lo esta), siando el path la raiz del proyecto y (__dirname, "dist") definiendo el nombre de la carpeta a crear.
        filename: "[name].[contenthash].js",
            // Nombre del archivo con la extensión que va a contener el codigo resultante.
    },
    resolve: {
        extensions: [".js"],
            // Con que extensiones va a trabajar, se deben de poner todas con las que va a compilar el royecto, si utiliza ya sea react, svelt u otro framework u otro lenguaje de programación, se debe de establecer aqui.
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
        // Destro de module, implementamos las reglas de nuestro proyecto, que van a estar en el apartado "rules" y en un array de objetos con estas reglas.
        rules: [
            {
                test: /\.m?js$/,
                    // Esto es una expresión regular, que lo que hace es establecer con que tipos de archivos se va a trabajar, empieza "/" ya sea cualquier "\." .m o "?" cualquier .js, y la expresión termina con "$/".
                exclude: /node_modules/,
                    // Este apartado es para excluir carpetas del proyecto que no se necesitan leer. (IMPORTANTE)
                use: {
                    // Aqui, configuramos que loaders se van a utilizar en nuestro proyecto.
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
                // De esta forma, configuramos el loader para que trabaje con las imagenes indicadas.
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
    plugins: [
        // Aqui se configuran los plugins que va a utilizar webpack, y se instancian con "new" y la variable que contiene al plugin.
        new HtmlWebpackPlugin({
            // Configuramos los parametros que necesitamos.
            inject: true,
                // Este apartado indica que se hara una incersión del script (enlace) dentro del archivo html.
                    //* Se indica "true" para insertarlo ya sea en el body o el head, "body" para incertarlo directamente en el body, "head" para insertarlo directamente en el head, y "false" para que no se haga una inserción.
            template: "./public/index.html",
                // Este apartado nos sirve para indicar un template que va a utilizar el proyecto.
            filename: "index.html"
                // Este partado nos sirve para indicar el nombre del archivo resultante de la compilación de HTML.
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                // Aqui, configuramos las rutas y archivos que se van a copiar la carpeta dist, configurando las rutas personalizadas.
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                        // Aqui, se esta indicando la ruta desde donde va a coger los archivos que va a copiar.
                    to: "assets/images"
                        // Aqui, se esta indicando la ruta donde se van a pegar los archivos en la cartepa dist, y si no esta esata ruta, se creara.
                }
            ]
        }),
        new Dotenv(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
}