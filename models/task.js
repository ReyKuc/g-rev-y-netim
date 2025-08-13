//tamamlandı
const taskSchema = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:["To Do","In Progress","Done"],
        default:"To Do"
    },
    priority:{
        type:String,
        enum:["Low","Medium","Heigh"],
        default:"Medium"
    },
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("Task",taskSchema)