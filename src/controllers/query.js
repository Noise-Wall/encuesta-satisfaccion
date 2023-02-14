// funcion para regresar informacion de un query de la base de datos
// para metodos GET
const query = async (req, res, sql, input) => {
    return new Promise((resolve) => {
      req.getConnection((err, conn) => {
        conn.query(sql, input, (err, result) => {
          if (err) {
            res.json(err);
          }
          resolve(result);
        });
      });
    });
  };
  
  // funcion para hace un query y redireccionar a una ruta diferente
  // para metodos POST y DELETE
  const queryRedirect = (req, res, sql, input, route='/') => {
    req.getConnection((err, conn) => {
      conn.query(sql, input, (err, result) => {
        if (err) {
          throw err;
        }
        res.redirect(route);
      });
    });
  };
  
  module.exports = { query, queryRedirect }