const Todo = require('../models/todo')

// 1. Add a Todo task to a Todo collection
// 2. Update a particular Todo task
// 3. Delete Todo task
// 4. Retrieve all Todo tasks (pagination optional)

// @desc      Add todo
// @route     POST /api/v1/todos/
// @access    Public
exports.addTask = async(req, res) => {
    const {title,description} = req.body
    try{
      const data = {title,description};
      const todo = await Todo.create(data)

     res.status(200).json({
        success: true,
        message: 'Task created successfully',
        todo
      });

    }
    catch(err){
        res.status(400).json({
          success: false,
          message: 'Could not add todo',
          error: err.message
        });
    }
}

// @desc      Update a task
// @route     PATCH /api/v1/todo/:id
// @access    Public
exports.updateTask = async(req, res) => {  
  const id = req.params.id
  const updates = {...req.body}
  try{
    const task = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'task details updated successfully',
      data:task
    });
  }catch(err){ 
      res.status(400).json({
        success: false,
        message: 'could not update task details',
        error: err.message
      });
  }
};

// @desc      Delete a todo
// @route     DELETE /api/v1/todo/:id
// @access    Public
exports.deleteTask = async(req, res) => {
  const id = req.params.id;
  
  try{
     const task = await Todo.findByIdAndDelete(id)
      res.status(200).json({
        success: true,
        message: 'task deleted successfully',
        data:{}
      });
  }
  catch(err){
    res.status(400).json({
      success: false,
      message: 'failed to delete task',
      error: err.message
    });
  }
};

// @desc      Get all Tasks
// @route     GET /api/v1/todo ||  /api/v1/todo?page=<num>&limit=<num>
// @access    Public
exports.getTasks = async(req, res) => {
  let limit = Math.abs(req.query.limit) || 10;
  let page = Math.abs(req.query.page) || 0;
  try{
    const tasks = await Todo.find()
    .skip(page * limit)
    .limit(limit)
    
    res.status(200)
    .json({
        success: true,
        message: 'All task retrieved',
        data: tasks,
    });
  }
  catch(err){
    res.status(400)
    .json({
        success: false,
        message: 'failed to retrieve tasks',
        error: err
    });
  }  
};



// Extra sheet

// @desc      Get single todo
// @route     GET /api/v1/todo/:id
// @access    Public
exports.getTask = async(req, res) => {
  const id = req.params.id;

  try{
    const task = await Todo.findById(id)

    res.status(200)
    .json({
        success: true,
        message: 'Task retrieved',
        data: task,
    });
  }catch(err){
    res.status(400)
    .json({
        success: false,
        message: 'failed to retrieve task',
        error: err
    });
  }
};



