const mongoose = require('mongoose')
const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
    {
        email: {type: String,  required: true, trim: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, required: true},
    }
)

UserSchema.methods.encryptPassword = async function (password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
};

module.exports = model('User', UserSchema);