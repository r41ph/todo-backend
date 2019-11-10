const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3001;

const mongoose = require("mongoose");

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

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
