const { Router } = require('express')

const router = Router()

const controllers = require('../controllers/index')

//CRUD

router.post('/create', controllers.user.create )

router.post('/inicioSesion', controllers.user.inicioSesion)

router.get('/usuario', controllers.user.usuario)

router.delete('usuario', controllers.user.remove)



// DE MOMENTO NO SE VA A USAR, fue para practicar el crus completo=>

// router.get('/get-all', controllers.user.getAll)

// router.get('/get/:id', controllers.user.getOne)

// router.put('/update/:id', controllers.user.update)

// router.delete('/delete/:id', controllers.user.remove)


module.exports = router