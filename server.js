const express = require('express');
const connectDb = require("./config/dbConnection");
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

console.log("Server connected");

connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Running on ${port}`);
});

module.exports = app;
