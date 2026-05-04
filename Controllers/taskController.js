const TaskModel = require('../Models/TaskModel');

// Fetch all tasks
const fetchAllTask = async (req, res) => {
    try {
        const model = await TaskModel.find({});
        res.status(200).json({
            success: true,
            message: "All the tasks below =>",
            data: model // Matches your frontend's 'const { data } = await GetAllTasks()'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tasks",
            error: err.message
        });
    }
};

// Create a new task
const createTask = async (req, res) => {
    const data = req.body;
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({
            success: true,
            message: "Task created successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create task",
            error: err.message
        });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const obj = { $set: { ...body } };
        await TaskModel.findByIdAndUpdate(id, obj);
        res.status(200).json({
            success: true,
            message: "Task updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update task",
            error: err.message
        });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete task",
            error: err.message
        });
    }
};

module.exports = {
    createTask,
    fetchAllTask,
    deleteTask,
    updateTask
};
