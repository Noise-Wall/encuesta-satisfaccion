// funcion para regresar informacion de un query de la base de datos
const query = async (req, res, sql, input=null) => {
  return new Promise((resolve, reject) => {
    req.getConnection((err, conn) => {
      if (err) console.log(err);
      try {
        conn.query(sql, input, (err, result) => {
          if (err) {
            return res.status(400).json(err);
          }
          resolve(result);
        });
      } catch (e) {
        console.log(e.message);
        reject({message: 'Hubo un error al intentar conectar a la base de datos.',});
      }
    });
  });
};

module.exports = { query };
