const path = require("path");
    // Este es un modulo que ya viene incluido con webpack.

//Plugins
    // Instanciamos los plugins para poder configurarlo en webpack.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


//Configuración del proyecto
module.exports = {
    entry: "./src/index.js",
        //Entry point, punto de inicio de donde va a partir todo el proyecto.
    output: { //Output
        path: path.resolve(__dirname, "dist"),
            // En que carpeta va a enviar la compilación. (se crea si aun no lo esta)
        filename: "main.js",
            // Nombre del archivo con la extensión que va a contener el codigo resultante.
    },
    resolve: {
        extensions: [".js"]
            // Con que extensiones va a trabajar, se deben de poner todas con las que va a compilar el royecto, si utiliza ya sea react, svelt u otro framework u otro lenguaje de programación, se debe de establecer aqui.
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
        new MiniCssExtractPlugin()
    ]
}