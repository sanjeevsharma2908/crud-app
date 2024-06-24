const express = require("express");
const {userModel} = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();


const userRouter = express.Router();
userRouter.post("/register",async(req,res) =>{
    // user registration logic
    const {username,email,password} = req.body;

    try{
        bcrypt.hash(password, 5, async(err, hash) =>{
            if(err){
                res.status(200).json({
                    message:err.message
                })
            }else{
               const user = new userModel({username,email,password:hash});
               await user.save();
                res.status(200).json({
                    message:"user registered successfully"
                })
            }
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
} )


userRouter.post("/login",async(req,res) =>{
    // user login logic
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        bcrypt.compare(password, user.password,(err, result) =>{
            if(result){
                console.log(user._id,user.username)
                const token = jwt.sign({userID:user._id,username:user.username},process.env.JWT_KEY);
                res.status(200).json({
                    message:"user logged in successfully",
                    token:token
                })
            }else{
                res.status(200).json({
                    message:"invalid credentials"
                  
                })
            }
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
} )

module.exports = userRouter;