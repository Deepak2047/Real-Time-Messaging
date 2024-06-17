const jwt=require('jsonwebtoken')

const generateToken=(id)=>{
    return jwt.sign({id},process.env.J_S,{
        expiresIn:"2y",
    });
};

module.exports=generateToken;