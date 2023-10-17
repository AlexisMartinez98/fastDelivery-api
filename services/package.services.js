const Package=require("../models/packages.model")

class PackageServices{

    static async addPackage(data){
       
        try{
            const newPackage=await new Package(data).save()
            return newPackage

        }

        catch(error){console.log(error)

        }

    }
}


module.exports=PackageServices;