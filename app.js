const express = require("express");
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const app = express();
const PORT = 3000;

//Connection MongoDB
mongoose.connect(MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB yeah");
});

mongoose.connection.on("error", (error) => {
  console.log("Error: " + error);
});

//Models import
require("./models/post");
require("./models/category");
require("./models/comment");

app.use(express.json());

//Router import
app.use(require("./routes/post"));
app.use(require("./routes/category"));
app.use(require("./routes/comment"));

app.listen(PORT, () => {
  console.log("App is started at " + PORT);
});
