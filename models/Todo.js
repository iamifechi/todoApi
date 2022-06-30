const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please include a task title'],
    },
    description: {
      type: String,
      required: [true, 'Please include a task description'],
    }
  },
  {
    timestamps: true,
  }
);




module.exports = mongoose.model('Todo', TodoSchema);
