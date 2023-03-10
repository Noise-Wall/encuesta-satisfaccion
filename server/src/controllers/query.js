// funcion para regresar informacion de un query de la base de datos
const query = async (req, res, sql, input) => {
  return new Promise((resolve) => {
    req.getConnection((err, conn) => {
      conn.query(sql, input, (err, result) => {
        if (err) {
          return res.json(err);
        }
        resolve(result);
      });
    });
  });
};

module.exports = { query };
