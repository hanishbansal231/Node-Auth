const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
        select: false,
    }
},{
    timestamps: true,
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    return next();
})


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