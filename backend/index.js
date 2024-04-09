import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./Routes/userRoutes.js";
import Connection from "./Connection/Connection.js";
import "../backend/processors/index.js";
import "./mail/transporter.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO || "mongodb://localhost:27017/yourdb");

//middleware

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const message = err.message || "something went worng";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: message,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`connected to backend ${PORT}`);
  Connection();
});
