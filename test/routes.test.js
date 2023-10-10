const mongoose = require("mongoose");
require("dotenv").config();
const Users=require("../models/user.model")




describe("History Tests", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URL);
    });
  
    afterAll(async () => {
      await mongoose.disconnect();
    });
  
    afterEach(async () => {
      await Users.deleteMany({});
    });
  
    describe("Get all users", () => {
    test("trae todos los ususarios", async () => {
        Users.find()
        .then((response)=>{expect(response.length).toEqual(2)})
    });
    });
  });