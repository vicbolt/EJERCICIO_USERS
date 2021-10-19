const models = require('../models/index')

const session = require('express-session')

const create = async (req,res) => {

    const { username, password, password2, admin } = req.body;

    const existUser = await models.user.findOne({ username })
    if (existUser){

        req.session.errorMsg = 'El usuario ya existe'

        return res.redirect('/pages/registro')
    }

    if (!username || !password || !password2 ){
        
        req.session.errorMsg = 'Se deben de rellenar todos los campos'

        return res.redirect('/pages/registro')
    }

    if (password !== password2){
        req.session.errorMsg = 'Las contraseñas no coinciden'

        return res.redirect('/pages/registro')
    }

    const hash = await models.user.encrypt(password)

    const user = models.user({ username, password: hash, admin})

    await user.save()

    res.redirect('/pages/inicio-sesion')

    res.json({ user })
}



const inicioSesion = async (req, res) => {

    const { username, password } = req.body

    const user = await models.user.findOne({ username })

    if (!user){
        req.session.errorMsg = 'El usuario no existe'
        return res.redirect('/pages/registro')
    }

    const isValid = await models.user.compare(password, user.password)

    if(!isValid){
        console.log('contraseña incorrecta')
        req.session.errorMsg = 'La contraseña es incorrecta'
        return res.redirect('/pages/inicio-sesion')
    }

        req.session.username = user.username
        req.session.admin = user.admin

    if(req.session.admin === 'off'){
        return res.redirect('/pages/usuario')
    } else {
        return res.redirect('/pages/usuarios')
    }

    

}

const usuario = async (req, res) => {

    return res.redirect('/pages/usuario')
}


function remove() {

    const users = models.user.findOneAndDelete({ username })

    console.log({users})


}



// esto de momento no

// const getAll = async (req,res) => {

//     const user = await models.user.find()
//     return res.json({user})
// }

// const getOne = async (req,res) => {

//     const id = req.params.id

//     const user = await models.user.findOne({ _id: id })

//     return res.json({user})
// }

// const update = async (req,res) => {

//     const _username = req.body.username
//     const _password = req.body.password
//     const id = req.params.id

//     const user = await models.user.findOne({ _id: id })
   
//     await user.update({username:_username, password: _password})

//     return res.json( {user} )
    
// }

// const remove = async (req,res) => {

//     const id = req.params.id
//     const user = await models.user.findOneAndDelete({ _id: id })

//     return res.json({user})
// }




module.exports = {
    create,
    inicioSesion,
    usuario,
    remove,
}