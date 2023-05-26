const { query } = require("./query");
const controller = {};

controller.getLatest = async (req, res) => {
  const tabla = req.params.tabla.replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );
  const sql = `SELECT id${tabla} FROM ${tabla} ORDER BY id${tabla} DESC LIMIT 1`;

  await query(req, res, sql)
    .then((data) => res.json(data[0]))
    .catch((e) => res.json(e));
};

module.exports = controller;
