const Task = require("../models/task");

exports.createTask = async(req,res)=>{
    try{
        console.log("Request body:",req.body);
        const {title, description,status,priority} = req.body;

        const task = new Task({
            title,
            description,
            status,
            priority,
            createdBy: req.user.id,
        });

        await task.save();

        console.log("Task created:",task);
        res.status(201).json(task);
    }catch(error){
        console.error("Create Task Error:",error.message);
        res.status(500).json({message:"Server Error",error})
    }
};

exports.getAllTasks = async(req,res)=>{
    try{
        const task = await Task.find();
        res.json(task);

    }catch(error){
        res.status(500).json({message:"Server Error"})
    }
};

exports.getTaskById = async(req,res)=>{
    try{
        const { title,description,status,priority}= req.body;
        const task = await Task.findById(req.params.id)
        if(!task) return res.status (404).json({message:"Task Not Found"});

        task.title = title !==undefined ? title:task.title;
        task.description = description !==undefined? description:task.description;
        task.status = status !== undefined ? status:task.status;
        task.priority = priority !==undefined ? priority:task.priority;

        await task.save();
        res.json(task);
    }catch(error){
        res.status(500).json({message:"Server Error"})
    }
}

exports.deleteTask = async(req,res)=>{
    try{
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(404).json({message:"Task not found"})

        res.json({message:"Task deleted"})
    }catch(error){
        res.status(500).json({message:"Server Error"})
    }
}