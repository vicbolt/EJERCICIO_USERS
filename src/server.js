const express = require('express');

const path = require('path')
const pagesRoutes = require('./routes/index')
const apiRoutes = require('./api/routes/index')

const session = require('express-session')

const server = express();


//settings
server.set('PORT', 4700)

server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'pug')


//middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.use(session({
    secret: "hola",
    resave: false,
    saveUninitialized: false,
}))

//routes 
server.use('/pages', pagesRoutes.pages)
server.use('/api', apiRoutes.user)

//public folder
server.use(express.static('public'))

module.exports = server