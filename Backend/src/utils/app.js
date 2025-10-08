const express = require("express");
const main = require("../config/db");
const cookieParser = require("cookie-parser");
const userRouter = require("../domains/auth/auth.routes");
const problemRouter = require("../domains/problem/problem.routes");
const solutionRouter=require("../domains/solution/solution.routes");
const client = require("../config/redis");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRouter);
app.use("/problem", problemRouter);
app.use("/solution",solutionRouter);

const initializeConnection = async () => {
  try {
    await Promise.all([main(), client.connect()]);
    console.log("Databases connected");
    app.listen(process.env.PORT, () => {
      console.log("server listen at port: ", process.env.PORT);
    });
  } catch (err) {
    throw err;
  }
};

initializeConnection();
