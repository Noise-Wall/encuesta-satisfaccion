const exceljs = require("exceljs");
const { join } = require("path");

async function crearPlantilla(year) {
  const wb = new exceljs.Workbook();

  wb.creator = "LAQUIN MR SA. DE CV.";
  wb.created = new Date();
  wb.modified = new Date();

  const ws = wb.addWorksheet(year);

  console.log("Creating template...");

  const logo = wb.addImage({
    filename: join(__dirname, "logo.png"),
    extension: "png",
  });

  ws.addImage(logo, "A1:C5");
  await wb.xlsx.writeFile("template.xlsx");
}

module.exports = { crearPlantilla };
