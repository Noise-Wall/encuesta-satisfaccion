const xlsxPopulate = require("xlsx-populate");
const { crearPlantilla } = require("./format-xlsx-template");
const { hojaCategoria } = require("./xlsx-hoja-cat")

async function generarXLSX(data) {
  await crearPlantilla(data.year);

  console.log("Creating XLSX file...");
  xlsxPopulate.fromFileAsync("template.xlsx").then((wb) => {
    const sheet = wb.sheet(0);
    sheet.name(`${data.year}`);

    const filteredData = {
      c1: filteredRespuestas(Object.values(data.respuestas), 1, sheet.name()),
      c2: filteredRespuestas(Object.values(data.respuestas), 2, sheet.name()),
      c3: filteredRespuestas(Object.values(data.respuestas), 3, sheet.name()),
      c4: filteredRespuestas(Object.values(data.respuestas), 4, sheet.name()),
    };

    filteredData.len = Object.values(filteredData).reduce((a, b) =>
      a.length > b.length ? a : b
    ).length;

    sheet.range("A1:BA1").forEach((cell) => {
      cell.column().width(5.1);
      cell.column().style({
        fontSize: 8,
        fontFamily: "Arial",
        fontGenericFamily: "sans-serif",
        horizontalAlignment: "center",
        verticalAlignment: "center",
      });
    });
    sheet.column("A").width(5.6);
    sheet.column("B").width(26.5);

    let rowSiguiente;
    let colSiguiente;

    crearTitulo(sheet);
    // Primera tabla
    rowSiguiente = poblarPreguntas(sheet, data.preguntas, 6);
    colSiguiente = poblarEncuestas(
      sheet,
      filteredData.c1,
      9,
      3,
      1,
      filteredData.len
    );
    colSiguiente = poblarEncuestas(
      sheet,
      filteredData.c2,
      9,
      colSiguiente,
      2,
      filteredData.len
    );
    poblarFuncionesEncuesta(
      sheet,
      rowSiguiente,
      colSiguiente - 1,
      data.preguntas.length
    );
    sombreroTabla(sheet, 6, colSiguiente - 1);
    // Segunda tabla

    poblarPreguntas(sheet, data.preguntas, rowSiguiente + 3);
    colSiguiente = poblarEncuestas(
      sheet,
      filteredData.c3,
      rowSiguiente + 6,
      3,
      3,
      filteredData.len
    );
    colSiguiente = poblarEncuestas(
      sheet,
      filteredData.c4,
      rowSiguiente + 6,
      colSiguiente,
      4,
      filteredData.len
    );
    poblarFuncionesEncuesta(
      sheet,
      rowSiguiente + data.preguntas.length + 6,
      colSiguiente - 1,
      data.preguntas.length
    );
    sombreroTabla(sheet, rowSiguiente + 3, colSiguiente - 1);

    console.log("Creando hoja de información por categoría...")

      
      hojaCategoria(wb.addSheet('Resultado anual por categoría'),data.categorias)

    console.log("XLSX creado.");
    return wb.toFileAsync("encuesta.xlsx");
    // return wb.outputAsync();
  });
}

function crearTitulo(sheet) {
  const range = sheet.range("D1:V4").merged(true);
  range.value("Análisis estadístico de encuestas de satisfacción al cliente");
  range.style({
    fontSize: 15,
    bold: true,
  });
}

//
// el estilizado de los bordes de la tabla necesita quitarse de aqui y pasarse a que opere sobre toda la tabla
function poblarPreguntas(sheet, data, rpos) {
  sheet
    .range(`A${rpos}:A${rpos + 2}`)
    .merged(true)
    .value("Concec.")
    .style({ border: "medium", bold: true });
  sheet
    .range(`B${rpos}:B${rpos + 2}`)
    .merged(true)
    .value("CONCEPTOS")
    .style({ border: "medium", bold: true });

  const preguntas = data.map((obj, index) => [
    index + 1,
    obj.contenidoPregunta,
  ]);

  sheet.cell(`A${rpos + 3}`).value(preguntas);

  sheet
    .range(`A${rpos + 3}:A${rpos + 2 + data.length}`)
    .style({ border: { left: "medium", right: "medium", bottom: "dashed" } });
  sheet.range(`B${rpos + 3}:B${rpos + 2 + data.length}`).style({
    border: { left: "medium", right: "medium", bottom: "dashed" },
    horizontalAlignment: "left",
  });

  return rpos + data.length + 3;
}

function poblarEncuestas(sheet, data, rpos, cpos, trimestre, maxLength) {
  for (let i = 0; i < maxLength; i++) {
    let dataInicio = sheet.row(rpos).cell(cpos + i);
    if (data[i]) {
      dataInicio.value(data[i]).style({
        border: { left: "medium", right: "medium", bottom: "dashed" },
      });
    } else {
      while (dataInicio.relativeCell(0, -1).value() != null) {
        dataInicio.value("-").style({
          border: { left: "medium", right: "medium", bottom: "dashed" },
        });
        dataInicio = dataInicio.relativeCell(1, 0);
      }
    }
  }

  // Titulos de los datos de la encuesta
  sheet
    .range(rpos - 1, cpos, rpos - 1, cpos + maxLength - 1)
    .forEach((valor) => valor.value(`C${valor.columnNumber() - cpos + 1}`))
    .style({ border: "medium", bold: true });

  sheet
    .range(rpos - 2, cpos, rpos - 2, cpos + maxLength)
    .merged(true)
    .value(`${trimestre}${trimestre == 1 ? "ER" : "°"} TRIMESTRE`)
    .style({ border: "medium" });

  poblarFuncionesPregunta(sheet, rpos - 1, cpos + maxLength, maxLength);

  return cpos + maxLength + 1;
}

function poblarFuncionesPregunta(sheet, rpos, cpos, offset) {
  console.log("rpos: ", rpos, "cpos: ", cpos, "offset: ", offset)
  // Titulo de columna de promedios
  let pos = sheet.cell(rpos, cpos);
  pos.value("Prom.").style({ border: "medium", bold: true });
  let posOffset = sheet.cell(rpos + 1, cpos - offset);
  pos = pos.relativeCell(1, 0);

  while (!isNaN(posOffset.value()) || posOffset.value() === "-") {
    pos
      .formula(
        `AVERAGE(${posOffset.address()}:${pos.relativeCell(0, -1).address()})`
      )
      .style({
        border: { left: "medium", right: "medium", bottom: "dashed" },
        numberFormat: "0.00",
      });
    pos = pos.relativeCell(1, 0);
    posOffset = posOffset.relativeCell(1, 0);
  }
}

function poblarFuncionesEncuesta(sheet, rpos, cpos, offset) {
  // Va a poblar todas las hileras desde la hilera indicada hasta
  // la columna senalada

  sheet
    .range(rpos, 1, rpos, 2)
    .merged(true)
    .value("Promedios")
    .style({ border: "medium", horizontalAlignment: "right" });
  sheet
    .range(rpos, 2, rpos, cpos)
    .forEach((celda) =>
      celda
        .formula(
          `AVERAGE(${celda.relativeCell(-offset, 0).address()}:${celda
            .relativeCell(-1, 0)
            .address()})`
        )
        .style({ border: "medium", numberFormat: "0.00" })
    );
}

function sombreroTabla(sheet, rpos, cpos) {
  sheet
    .range(rpos, 3, rpos, cpos)
    .merged(true)
    .value("ENCUESTAS")
    .style({ border: "medium", bold: true });
}

function filteredRespuestas(data, trimestre, year) {
  // Filtrado de datos por fecha
  let calc = (trimestre) => {
    return trimestre * 3 - 2;
  };
  let inicio = `${year}-${calc(trimestre) <= 9 ? "0" : ""}${calc(
    trimestre
  )}-01`;
  let fin;
  if (trimestre === 4) fin = `${parseInt(year) + 1}-01-01`;
  else
    fin = `${year}-${calc(trimestre) <= 9 ? "0" : ""}${calc(trimestre + 1)}-01`;

  // console.log("inicio: ", inicio, "fin: ", fin);

  // Llenado de datos de la encuesta
  const dataFilter = data
    .filter(
      (res) =>
        new Date(res[1].fecha) >= new Date(inicio) &&
        new Date(res[1].fecha) < new Date(fin)
    )
    .sort((a, b) => {
      return new Date(a[1].fecha) > new Date(b[1].fecha);
    })
    .map((valor) => Object.values(valor[0]))
    .map((valor) => valor.map((entry) => [entry]));

  return dataFilter;
}

module.exports = { generarXLSX };
