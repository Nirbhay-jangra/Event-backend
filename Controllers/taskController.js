const TaskModel = require('../Models/taskModel')

const createTask = async(req , res)=>{
    const data = req.body;
    try{const model = new TaskModel(data);
    await model.save();
    res.status(201).json({
        success : true,
        message : 'Task created successfully'
    })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : 'Failed to create a task'
        })
    }

}

const fetchAllTask = async(req, res)=>{
    try {
        const model = await TaskModel.find({});
        res.status(200).json({
            success : true,
            message : 'All the tasks below =>',
            data : model 
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : 'Failed to retrive tasks'
        })
}
}


const deleteTask = async(req,res)=>{
    try{
        const {id} = req.params;
        const model = await TaskModel.findByIdAndDelete(id);
        if(!model) return res.status(404).json({message : "Task can't be found"})
        res.status(200).json({
            message : 'Deleted task ',
            success : true,
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : 'Failed to delte tasks, server error'
        })
}
}

const updateTask = async(req,res)=>{
    try {
        const {id} = req.params;
        const {taskName , isDone} = req.body;
        const model = await TaskModel.findByIdAndUpdate(id , {taskName , isDone});
        if (!model) return res.status(404).json({message : "can't find task"})
        res.status(200).json({
            message : 'Updated Successfully',
            success : true
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : 'Failed to update tasks, server error'
        })
}
}

module.exports = {createTask , fetchAllTask, deleteTask,updateTask}