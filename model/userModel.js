const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

userSchema.methods = {
    jwtToken(){
        return JWT.sign(
            {_id: this._id,email:this.email},
            process.env.SCREAT,
            {
                expiresIn: '24h'
            }
        )
    }
}

module.exports = mongoose.model('User',userSchema);