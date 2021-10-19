const { Router } = require('express');

const models = require('../api/models/index')
const session = require('express-session');
const { remove } = require('../api/models/user.models');

const router = Router();




router.get('/inicio-sesion', async (req, res) =>{

    return res.render('inicio-sesion.pug', {title: 'INICIO DE SESION'})
})




router.get('/registro', (req,res) =>{

    return res.render('registro.pug', { title: 'REGISTRO' })
})




router.get('/usuarios', async (req, res)=>{

    const users = await models.user.find()

    if(req.session.admin === "on"){
        return res.render('usuarios.pug', { title: 'USUARIOS', users})
    }

    return res.render('inicio-sesion.pug', {title: 'INICIO DE SESION'})
})


router.delete('/usuarios', async (req, res)=>{


    res.render('usuarios.pug', { title: 'USUARIO' })
})




module.exports = router