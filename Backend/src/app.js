const express = require("express");
const main = require("./config/db");
const cookieParser=require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());



const initializeConnection = async () => {
  await main();
  console.log("Database connected");
  app.listen(process.env.PORT, () => {
    console.log("server listen at port: ", process.env.PORT);
  });
};

initializeConnection();