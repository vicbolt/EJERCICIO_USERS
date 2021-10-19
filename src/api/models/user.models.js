const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: String,
        default: 'off'
    }
}, {
    versionKey: false,
    timestamps: true,
})

userSchema.statics.encrypt = async function(password){
    const hash = await bcrypt.hash(password, 10)
    return hash
}

userSchema.statics.compare = async(plainpassword, password) =>{

   const pass = await bcrypt.compare(plainpassword, password)

    return pass
}



module.exports = model('User', userSchema)