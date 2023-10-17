const express=require("express");
const packageRouter=express.Router();
const Package=require("../models/packages.model")
const PackagecControllers=require("../controllers/package.controllers")


packageRouter.post("/add",PackagecControllers.addPackage)




/*packageRouter.post("/myPackages",(req,res)=>{
    let {user_id}=req.body;
    Package.find({user_id:user_id,status:true})
    .then((packages) => {
        res.status(200).json(packages);
      })
      .catch((err) => {
        console.error("Error al buscar paquetes por user_id:", err);
        res.status(500).json({ error: "Error al buscar paquetes en la base de datos" });
      });

})*/
module.exports=packageRouter
