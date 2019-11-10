const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3001;
const todoRoutes = express.Router();

const mongoose = require("mongoose");
const Todo = require("./todoSchema");

app.use(cors());
app.use(bodyParser.json());

const db_uri =
  "mongodb+srv://axis-db-user:axis-workshops@axis-cluster-vzlqj.mongodb.net/axis-todos?retryWrites=true&w=majority";

mongoose
  .connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => console.log("MongoDB database connection error: ", error));

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

// Add TODO
todoRoutes.route("/add").post(function(req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new todo failed");
    });
});

// Fetch all TODOs
todoRoutes.route("/").get(function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      res.json({ error: err });
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

app.use("/api/todos/", todoRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
