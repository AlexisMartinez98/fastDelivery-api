const mongoose = require("mongoose");
require("dotenv").config();
const Package = require("../models/packages.model");

describe("Package Model", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
  });

  test("should create a mongoose model", () => {
    expect(mongoose.model("Packages")).toBe(Package);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

    /*afterEach(async () => {
    await Package.deleteMany({});
  });*/

  describe("Create a new package", () => {
    test("should have the correct fields in the schema", () => {
      const schema = Package.schema.obj;
      expect(schema).toHaveProperty("address");
      expect(schema).toHaveProperty("amount");
      expect(schema).toHaveProperty("weight");
      expect(schema).toHaveProperty("delivery_date");
      expect(schema).toHaveProperty("receiver");
    });

    test("should require specific fields", () => {
      const schema = Package.schema.obj;
      expect(schema.address).toHaveProperty("required", true);
      expect(schema.amount).toHaveProperty("required", true);
      expect(schema.weight).toHaveProperty("required", true);
      expect(schema.delivery_date).toHaveProperty("required", true);
      expect(schema.receiver).toHaveProperty("required", true);
    });

    test("should add a package correctly", async () => {
      const newPackageData = {
        address: "123 Main St",
        amount: 5,
        weight: 10,
        delivery_date: new Date(),
        receiver: "Frodo",
      };

      const newPackage = new Package(newPackageData);

      const savedPackage = await newPackage.save();

      expect(savedPackage).toMatchObject(newPackageData);
      expect(savedPackage.receiver).toBe("Frodo");
    });
  });
});