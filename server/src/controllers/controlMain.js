const controller = {};

controller.all = (req, res) => {
  res.json({ info: "Encuesta de Satisfacción REST API." });
};

controller.file = (req, res) => {
  const fileName = join(__dirname, "../../a4.pdf");
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent: ", fileName);
    }
  });
};

module.exports = controller;
