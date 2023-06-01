const { generarPDF } = require("./format-pdf");

console.log(process.argv[2]);

//
//
// hacer una funcion para acortar el insertado de texto a:
// insertarTexto({texto, fuente, estilo, tamano, x, y, options})
if (process.argv[2] === "pdf") {
  generarPDF();
  return;
}

if (process.argv[2] === "xlsx") {
  console.log("xlsx file handling");
  return;
}

console.log("Enter a file extension as an argument.");
