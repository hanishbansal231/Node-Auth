const JWT = require('jsonwebtoken');
require('dotenv').config();
exports.authUser = async (req,res,next) => {
    const token = (req.cookies && req.cookies.token) || null;
    if(!token){
        return res.status(402).json({
            success: false,
            message: 'Token is not find...',
        })
    }
    try{
        const payload = JWT.verify(token,process.env.SCREAT);
        req.user = {id: payload._id, email: payload.email};
    }catch(e){
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
    next();
}