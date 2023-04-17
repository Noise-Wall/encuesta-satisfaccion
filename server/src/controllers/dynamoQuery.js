const AWS = require("aws-sdk")
const s3 = new AWS.S3()

// 
// nueva ubicacion del control del crud, que funcionara para todas las colecciones.

const controller = {}

controller.get = async (res, collection) => {
    try {
        let all = await s3.listObjects(collection)
        console.log(all)
        // let all = await collection.list()
        res.status(201).json(all)
      } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
      }
}

controller.insert = async (res, collection, key, data) => {
    try {
        let insert = await collection.set(key, data)
        res.status(201).json({"insert":"true"})
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
}
// controller.getSingle = async(req,res,collection) => {}
// controller.update = async(req,res,collection) => {}
// controller.delete = async(req,res,collection) => {}

module.exports = controller