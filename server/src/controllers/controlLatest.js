const { query } = require("./query");
const controller = {};

controller.getLatest = (req, res) => {
    const tabla=req.params.tabla.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    const sql=`SELECT id${tabla} FROM ${tabla} ORDER BY id${tabla} DESC LIMIT 1`
    // console.log(sql);
    const queryLatest = query(req,res,sql,"");
    Promise.all([queryLatest]).then((data)=>{
        return res.json(data[0])
    }).catch(e => res.json(e)
    )
}

module.exports = controller;
