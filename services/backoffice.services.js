const userModel = require("../models/user.model");
const packageModel = require("../models/packages.model");


class backofficeServices {

    
      static async getDealers(data){
        const {delivery_date}=data;
        try{
          
          const packages=await packageModel.find({delivery_date})
          const users=await userModel.find()
          return {users,packages};
    
        }
        catch(error){console.log(error)
    
        }
      }


}

module.exports=backofficeServices;