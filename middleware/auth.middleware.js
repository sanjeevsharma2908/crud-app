const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) =>{
const token = req.headers.authorization?.split(" ")[1];
if(token){
    jwt.verify(token,process.env.JWT_KEY, (err, decoded) =>{
        if(decoded){
            req.body.userID = decoded.userID
            req.body.username = decoded.username
            next();
        }else{
            res.status(400).json({
                message:err.message
            })
        }
    })
    }else{
        res.status(400).json({
            message:"token not found"
        })
}
} 

module.exports = auth;