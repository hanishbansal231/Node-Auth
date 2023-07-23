const User = require('../model/userModel');
const bcrypt = require('bcrypt');
exports.signup = async (req,res,next) => {
    try{
        const {name,email,password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(402).json({
                success: false,
                message: 'Already Registered...'
            })
        }
        const createUser = User(req.body);
        const result = await createUser.save();
       return res.status(200).json({
            success: true,
            data: result,
            message: 'Successfully SignUp...'
        })
    }catch(e){
        console.error(e);
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

exports.signIn = async (req,res,next) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email}).select("+password");
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(402).json({
                success: false,
                message: 'Wrong...'
            })
        }
        const option = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        }
        const token = user.jwtToken();
        user.password = undefined;
        return res.cookie("token",token,option).status(200).json({
            success: true,
            data: user,
            message: 'Successfully SignIn...'
        })
    }catch(e){
        console.error(e);
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

exports.getData = async (req,res,next) => {
    const id = req.user.id;
    try{
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: user,
            message: 'Find Data Successfully...'
        })

    }catch(e){
        console.error(e);
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }   
}

exports.logout = async (req,res) => {
    try{
        const option = {
            expire: new Date(),
            httpOnly: true
        }
         res.cookie("token",null,option).status(200).json({
            success: true,
            message: 'Logout successfully...',
        })
    }catch(e){
        console.error(e);
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
}