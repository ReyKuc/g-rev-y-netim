const Task = require("../models/task")

const checkTaskOwnership = async (req,res,next)=>{
    try{
        const task = await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({message:"Task not found"})
        }
        if(req.user.role !== "admin"&& task.createdBy.toString() !== req.user.id){
            return res.status(403).json({message:"Access denied"})
        }

        req.task = task 
        next()
    }catch(error){
        res.status(500).json({message:"Server Error"})
    }

};

module.exports = {checkTaskOwnership}