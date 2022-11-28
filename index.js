const express = require("express");
const dotenv = require("dotenv");
const http = require('http');
const sequelize = require('./models/index.js');
const userRouter =require("./routes/user.routes");

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 8001;
app.use("/api/v1/user",userRouter);

app.get("/", (req, res) => {
    console.log("Reaching the server");
    res.send("welcome to mcloud-be")
})

const server = http.createServer(app).listen(port, async () => {
    console.log(`Server started on port ${port}!`);
    console.log("Database connected . . .");
    await sequelize.authenticate;
});