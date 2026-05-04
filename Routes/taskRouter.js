const express = require('express')
const router = express.Router()
const {createTask ,fetchAllTask, deleteTask, updateTask} = require('../Controllers/taskController')

// router.get('/',(req,res)=>{
//     res.send("ALL TASKS")                   // but this logic will go into controllers to keep the structure clean 
// })


//To post a task 

router.post('/post', createTask);
router.get('/all', fetchAllTask);
router.delete('/del/:id', deleteTask);
router.put('/update/:id',updateTask)
module.exports = router;