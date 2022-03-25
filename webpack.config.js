const path = require("path");
    // Este es un modulo que ya viene incluido con webpack.

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
    }
}