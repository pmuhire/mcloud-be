const express = require("express");
const dotenv = require("dotenv");
const http = require('http');
const bodyParser=require("body-parser");
const sequelize = require('./models/index.js');
const userRouter =require("./routes/user.routes");
const cors=require("cors");
const corsFunction=require("./utils/cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(corsFunction);

app.use("/api/v1/user",userRouter);

app.get("/", (req, res) => {
    console.log("Reaching the server");
    res.send("welcome to mcloud-be")
})

const port = process.env.PORT || 8001;
const server = http.createServer(app).listen(port, async () => {
    console.log(`Server started on port ${port}!`);
    console.log("Database connected . . .");
    await sequelize.authenticate;
});
module.exports=server;