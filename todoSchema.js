const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Todo = new Schema(
  {
    todo_title: { type: String },
    todo_description: { type: String },
    todo_completed: { type: Boolean }
  },
  { collection: "todos" }
);

module.exports = mongoose.model("Todo", Todo);
