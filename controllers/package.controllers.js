const PackageServices=require("../services/package.services")
const Package=require("../models/packages.model")

class PackageControllers{
    static async addPackage(req,res){
        const data=req.body

        try{
            const newPackage= await PackageServices.addPackage(data)
            res.status(201).json("Package Created")

        }

        catch(error){
            console.log(error)

        }

    }
}

module.exports=PackageControllers;