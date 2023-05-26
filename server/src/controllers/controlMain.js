const controller = {};

controller.all = (req, res) => {
    res.json({ info: 'Encuesta de Satisfacción REST API.' })
};

module.exports = controller;
