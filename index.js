const express = require("express");
const app = express();
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./route/user.route");
const { empRouter } = require("./route/employee.route");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("", userRouter);
app.use("/employees", empRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`App is running at port ${process.env.port}`);
  } catch (err) {
    console.log(err);
  }
});
