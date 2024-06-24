const express = require("express");
const noteModel = require("../models/note.model")
require("dotenv").config();
const auth = require("../middleware/auth.middleware")

const noteRouter = express.Router();
noteRouter.post("/create",auth, async(req,res) =>{
    try{
        const note = new noteModel(req.body);
        await note.save();
        res.status(200).json({
            message:"note created successfully"
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
} )

noteRouter.get("/", auth, async(req,res) =>{
    try{
        const notes = await noteModel.find({userID:req.body.userID});
        res.status(200).json({
            notes
        }) 
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})
noteRouter.patch("/update/:noteID",auth,  async(req,res) =>{
    const {noteID} = req.params
    try{
        const note = await noteModel.findOne({_id:noteID})
        if(req.body.userID === note.userID){
            await noteModel.findByIDAndUpdate({_id:noteID},req.body)
            res.status(200).json({
                message:"note updated successfully"
            })
        }else{
            res.status(400).json({
                message:"You are not authorized to update the this note"
            })
        }
     
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})
noteRouter.delete("/delete/:noteID",auth, async(req,res) =>{
    const {noteID} = req.params
    try{
        const note = await noteModel.findOne({_id:noteID});
        if(req.body.userID === note.userID){
            await noteModel.findByIdAndDelete({_id:noteID});
            res.status(200).json({
                message:"note deleted successfully"
            })
        }else{
            res.status(200).json({
                message:"You are not authorized to delete this note"
            })
        }
       
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})





module.exports = noteRouter;