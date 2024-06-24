const { type } = require("express/lib/response");
const { default: mongoose } = require("mongoose");


const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userID:{
        type:String,
   
    },
    username:{
        type:String,
    
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},
{versionKey:false}
);

const noteModel = mongoose.model("note",noteSchema);

module.exports =  noteModel;
