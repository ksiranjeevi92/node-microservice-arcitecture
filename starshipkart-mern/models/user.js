const mongoose = require('mongoose');
const crypto = require('crypto')

const  uuidv4 =  require('uuid');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: false
    },
    about: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type:  Array,
        default: []
    }
},{timestamps: true});

//virtual fields

userSchema.virtual("password")
.set(function(password){
    this._password = password
    this.salt = uuidv4.v1()
    this.hashed_password = this.encryptPasssword(password)
})
.get(function(){
    return this.password
})

userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPasssword(plainText) === this.hashed_password
    }
    ,
    encryptPasssword: function(password){
        if(!password){
            return ""
        }
        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password).digest('hex')
        }
        catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model('User', userSchema);