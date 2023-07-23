const User = require('../model/userModel');

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
        const createUser = await User.create(req.body);
       return res.status(200).json({
            success: true,
            data: createUser,
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
        const user = await User.findOne({email});
        if(!user || password !== user.password){
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