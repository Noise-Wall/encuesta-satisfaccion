const xlsxPopulate = require("xlsx-populate");
const { mergeWith, isArray } = require("lodash");

function hojaCategoria(sheet, data) {
  //   console.log(Object.entries(data));
  const filteredData = {
    c1: filteredCategorias(data, 1),
    c2: filteredCategorias(data, 2),
    c3: filteredCategorias(data, 3),
    c4: filteredCategorias(data, 4),
  };
  filteredData.len =
    Object.values(filteredData.c1).length ||
    Object.values(filteredData.c2).length ||
    Object.values(filteredData.c3).length ||
    Object.values(filteredData.c4).length;
  filteredData.nombres =
    Object.keys(filteredData.c1) ||
    Object.keys(filteredData.c2) ||
    Object.keys(filteredData.c3) ||
    Object.keys(filteredData.c4);

  sheet.range("A1:BA1").forEach((cell) => {
    cell.column().width(5.6);
    cell.column().style({
      fontSize: 8,
      fontFamily: "Arial",
      fontGenericFamily: "sans-serif",
      horizontalAlignment: "center",
      verticalAlignment: "center",
    });
    sheet.column("A").width(26.5);
  });

  const titulos = ["Conceptos", "1° TRIM", "2° TRIM", "3° TRIM", "4° TRIM", "PROM."];
  sheet.range("A5:F5").forEach((cell) => {
    cell
      .rangeTo(cell.relativeCell(1, 0))
      .merged(true)
      .style({
        border: "medium",
        bold: true,
      })
      .value(titulos[cell.columnNumber() - 1]);
  });

  sheet.range(7, 1, 7 + filteredData.len - 1, 1).forEach((cell) => {
    cell
      .value(filteredData.nombres[cell.rowNumber() - 7])
      .style({ border: { left: "medium", right: "medium", bottom: "dashed" } });
  });

  poblarCategorias(
    sheet,
    Object.values(filteredData.c1),
    7,
    2,
    filteredData.len
  );
  poblarCategorias(
    sheet,
    Object.values(filteredData.c2),
    7,
    3,
    filteredData.len
  );
  poblarCategorias(
    sheet,
    Object.values(filteredData.c3),
    7,
    4,
    filteredData.len
  );
  poblarCategorias(
    sheet,
    Object.values(filteredData.c4),
    7,
    5,
    filteredData.len
  );

  sheet
    .range(7 + filteredData.len, 1, 7 + filteredData.len, 5)
    .forEach((cell) => {
      cell.style({ border: "medium", numberFormat: "0.00" });
      if (cell.columnNumber() !== 1)
      cell.formula(
          `AVERAGE(${cell.relativeCell(-filteredData.len, 0).address()}:${cell
            .relativeCell(-1, 0)
            .address()})`
            );
      else cell.value("Promedio trimestral");
    });

    sheet.range(7, 6, 7 + filteredData.len, 6).forEach((cell) => {
        cell.style({ border: "medium", numberFormat: "0.00" })
        .formula(
            `AVERAGE(B${cell.rowNumber()}:E${cell.rowNumber()})`
              );
    })
}

function filteredCategorias(data, trimestre) {
  if (trimestre < 1 || trimestre > 4) return [];
  const fin = (trimestre + 1) * 3 - 2;
  const inicio = trimestre * 3 - 2;
  const info = Object.entries(data).filter(
    (obj) => obj[0].substring(5, 7) < fin && obj[0].substring(5, 7) >= inicio
  );

  if (info.length < 1) return {};

  return info.reduce((a, b) =>
    mergeWith(a, b, (obj, src) => {
      if (isArray(obj)) return obj.concat(src);
    })
  )[1];
}

function poblarCategorias(sheet, data, rpos, cpos, length) {
  sheet.range(rpos, cpos, rpos + length - 1, cpos).forEach((cell) => {
    cell
      .style({
        border: { left: "medium", right: "medium", bottom: "dashed" },
        numberFormat: "0.00",
      })
      .value("-");
    // console.log(data[cell.rowNumber()-rpos])
    if (isArray(data[cell.rowNumber() - rpos]))
      cell.value(
        data[cell.rowNumber() - rpos].reduce((a, b) => a + b, 0) /
          data[cell.rowNumber() - rpos].length
      );
  });
}

module.exports = { hojaCategoria };
