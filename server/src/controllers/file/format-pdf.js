const { jsPDF } = require("jspdf");
require("jspdf-autotable");
const { readFileSync } = require("fs");
const { join } = require("path");

function palomearValor(valor) {
  const check = "x";
  const arrays = [
    { content: valor === 10 ? `${check}` : "", styles: { halign: "center" } },
    { content: valor === 8 ? `${check}` : "", styles: { halign: "center" } },
    { content: valor === 6 ? `${check}` : "", styles: { halign: "center" } },
    { content: valor === 4 ? `${check}` : "", styles: { halign: "center" } },
    { content: valor === 2 ? `${check}` : "", styles: { halign: "center" } },
    { content: !valor ? `${check}` : "", styles: { halign: "center" } },
    { content: valor, styles: { halign: "center" } },
  ];
  return arrays;
}

function generarTabla(doc, marginLeft, marginTop, dataRespuestas, comentarios) {
  const full = { fontStyle: "bold", fillColor: "#d3d3d3" };
  const padding = { top: 1, bottom: 1, left: 5, right: 5 };
  const body = [];
  for (let i = 0; i < dataRespuestas.length; i++) {
    if (
      i === 0 ||
      dataRespuestas[i].contenidoCategoria !==
        dataRespuestas[i - 1].contenidoCategoria
    ) {
      body.push([
        {
          content: dataRespuestas[i].contenidoCategoria.toUpperCase(),
          colSpan: 8,
          styles: full,
        },
      ]);
    }
    body.push(
      [{ content: `${i}- ` + dataRespuestas[i].contenidoPregunta }].concat(
        palomearValor(dataRespuestas[i].valor)
      )
    );
  }
  body.push([
    {
      content: "CALIFICACIÓN (PROMEDIO)",
      styles: { fontSize: 10, fontStyle: "bold" },
    },
    {
      content: 10,
      colSpan: 7,
      styles: { fontSize: 10, fontStyle: "bold", halign: "center" },
    },
  ]);
  body.push([
    {
      content:
        "2.-Si desea realizar alguna observación sobre el servicio que no hayamos contemplado en la encuesta háganos el favor de compartirla:",
      colSpan: 8,
      styles: { fontSize: 10, fontStyle: "bold" },
    },
  ]);
  body.push([
    {
      content: comentarios,
      colSpan: 8,
      styles: { fontSize: 10, align: 'justify' },
    },
  ]);

  doc.autoTable({
    margin: {
      top: marginTop,
      left: marginLeft,
    },
    tableWidth: 365,
    head: [
      [
        "\nPreguntas",
        "Excelente\n(10)",
        "Bueno\n(8)",
        "Regular\n(6)",
        "Malo\n(4)",
        "Pésimo\n(2)",
        "N/A",
        "CALIFICACIÓN POR ATRIBUTO",
      ],
    ],
    body: body,
    styles: {
      textColor: "black",
      lineColor: "black",
      lineWidth: 1,
      minCellWidth: 29,
    },
    headStyles: {
      fontSize: 9,
      fillColor: "#548dd4",
      halign: "center",
    },
    bodyStyles: {
      cellPadding: padding,
      fontSize: 8,
    },
    columnStyles: {
      0: {
        minCellWidth: 120,
      },
      7: {
        minCellWidth: 50,
      },
    },
  });
}

function generarPDF(dataEncuesta, dataRespuestas) {
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });

  const logo = join(__dirname, "logo.png");
  const imgData = readFileSync(logo).toString("base64");
  const marginLeft = 40;
  const marginRight = 380;
  const marginTop = 30;
  const marginBottom = 580;
  const maxPWidth = 320;

  // logo
  doc.addImage(imgData, "png", marginLeft, marginTop, 134, 42);

  // header
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("Encuesta de Satisfacción al Cliente", marginRight, marginTop + 25, {
    align: "right",
  });
  
  // parrafo introductorio
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(
    `        Estimado cliente, nos dirigimos a usted para solicitarle la realización del siguiente cuestionario con el propósito de ajustarnos mejor a sus necesidades. Su opinión es de gran importancia para nosotros para así poder ajustarnos mejor al servicio que usted prefiera.`,
    marginLeft + 20,
    marginTop + 60,
    { maxWidth: maxPWidth, align: "justify", lineHeightFactor: 1.5}
  );

  // datos
  doc.setFontSize(8);
  doc.text(
    `EMPRESA: ${dataEncuesta.nombreEmpresa}\nNOMBRE DEL CONTACTO: ${dataEncuesta.nombreContacto}\nCORREO ELECTRÓNICO: ${dataEncuesta.correo}`.toUpperCase(),
    marginLeft + 20,
    marginTop + 110,
    { align: "left", lineHeightFactor: 2.5}
  );
  doc.text(
    `FECHA: ${new Intl.DateTimeFormat("es", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dataEncuesta.fecha))}`.toUpperCase(),
    marginRight,
    marginTop + 110,
    { align: "right" }
  );

  doc.text("1.-", marginLeft + 20, marginTop + 155);
  doc.text(
      "A continuación se suministrará una serie de preguntas con el propósito de mejorar nuestra calidad de servicio, favor de marcar la opción que corresponda a su opinión.",
    marginLeft + 30,
    marginTop + 155,
    { maxWidth: maxPWidth - 20 }
  );

  generarTabla(
      doc,
      marginLeft,
      marginTop + 170,
      dataRespuestas,
      dataEncuesta.comentarios
      );
      
doc.setFont("helvetica", "normal")
doc.setFontSize(8)
doc.text(`Criterios de Evaluación son los siguientes: Excelente (10 puntos), Bueno (8 puntos), Regular (6 puntos), Malo (4 puntos) y Pésimo (2 puntos), se suman los resultados y se saca un promedio.`, marginLeft + 20, marginBottom - 50, { maxWidth: maxPWidth, align: "justify" });
doc.text(`
Criterio de                      calificación promedio mayor / igual a 7`, marginLeft + 20, marginBottom - 40, { maxWidth: maxPWidth - 7, align: "justify" });
doc.text(`Criterio de                  calificación promedio menor a 7 `, marginLeft + 20, marginBottom - 25, { maxWidth: maxPWidth - 7, align: "justify" });
doc.text("Ref: PGE-AD-004", marginLeft + 20, marginBottom)
doc.text("LAQUIN MR S.A. DE C.V.", 230, marginBottom, { maxWidth: maxPWidth, align: "center"})
doc.text("F 068\nR 04", marginRight, marginBottom, { align: "right"})
doc.setFont("helvetica", "bold")
doc.text("Aceptación:", marginLeft + 49, marginBottom - 33)
doc.text("Rechazo:", marginLeft + 49, marginBottom - 25)
  // guardar
  doc.save("resultados.pdf");
  return;
}

module.exports = { generarPDF };
