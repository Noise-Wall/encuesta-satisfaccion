const controller = {}

controller.get = (req, res) => {
    res.status(200).render('index')
}

module.exports = controller