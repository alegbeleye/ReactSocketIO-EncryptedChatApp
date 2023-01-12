const express = require("express");
const app = express();

const userRouter = require("./routes/userRoute");

app.use(express.json({ limit: "10kb" }))

app.use("/api/v1/users", userRouter)

module.exports = app;