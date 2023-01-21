const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');



const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})



//encrypting for password!

// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password']}); 



module.exports = new mongoose.model("users", userSchema);  