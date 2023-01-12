const express = require("express");
const dotenv = require("dotenv");
const http = require('http');
const bodyParser=require("body-parser");
const sequelize = require('./models/index.js');
const userRouter =require("./routes/user.routes");
const cors=require("cors");
const corsFunction=require("./utils/cors");
const swaggerUiExpress =require("swagger-ui-express");
const docs =require("./utils/swagger");

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// app.use(corsFunction);

app.use('/api-docs',swaggerUiExpress.serve,swaggerUiExpress.setup(docs));

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