const express = require("express");
const userRoutes = express.Router();
const UserController = require("../controllers/user.controllers");
const Package=require("../models/packages.model")
const User=require("../models/user.model")
const {
  createUserValidation,
  loginValidation,
} = require("../midlewares/userValidator.midlewares");

userRoutes.post("/register", createUserValidation, UserController.createUser);
userRoutes.post("/login", loginValidation, UserController.authentication);
userRoutes.get("/me", UserController.me);
userRoutes.get("/confirm/:token", UserController.confirm);
userRoutes.post("/forgetPassword", UserController.forgetPassword);
userRoutes.post("/newPassword/:token", UserController.newPassword);
userRoutes.get("/logout", UserController.logout);
userRoutes.post("/history",UserController.userHistory)
userRoutes.put("/take-package",UserController.takePackage)
userRoutes.post("/dealers",UserController.getDealers)



/*userRoutes.post("/dealers",(req,res)=>{
  const {delivery_date}=req.body;
  Package.find({delivery_date:delivery_date})
  .then((packages)=>{
    let usersId=[]
    for(let i=0;i<packages.length;i++){
      if(!usersId.includes(packages[i].deliveryMan_id)){
        usersId.push(packages[i].deliveryMan_id)
      }
    }
    packages.push(usersId)
    return packages
  
    })
    .then((package)=>{
      let usersId=package.pop()
      let promesas=usersId.map((userId)=>{return User.findById(userId)})


      Promise.all(promesas)
      .then((users)=>{
        res.status(200).json({users,package})
      })

    })
    

})
*/


module.exports = userRoutes;
