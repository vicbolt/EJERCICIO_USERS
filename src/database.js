const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/usuarios1')
.then (() =>{
    console.log('DB CONNECTED')
})
.catch((err) =>{
    console.log(err)
})