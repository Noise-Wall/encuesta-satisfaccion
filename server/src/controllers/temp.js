const controller = {};

controller.temp = (req, res) => {
  res.json({
    data: [true],
  });
};

module.exports = controller;
