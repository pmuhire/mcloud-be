const { Router } = require('express')

const { addUser,signIn,getUser,getUsers,editUser } = require("../controllers/user.controller");

const userRouter=Router();

userRouter.post("/newuser",addUser);
userRouter.post("/login",signIn);
userRouter.patch("/modify/:uuid",editUser)
userRouter.get("/",getUsers);
userRouter.get("/:uuid",getUser);

module.exports=userRouter;