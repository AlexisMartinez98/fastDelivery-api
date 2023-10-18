const mongoose = require("mongoose");
require("dotenv").config();
const Users = require("../../models/user.model");

describe("Users Model", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  /*afterEach(async () => {
    await Users.deleteMany({});
  });*/

  describe("Validators", function () {
    describe("email", () => {
      test("Should throw an error if email not defined", () => {
        const user = new Users({
          confirm_password: "@Milanesa123",
          password: "@Milanesa123",
          email: undefined,
          salt: "ssssfsfsdfdfd",
        });
        return user
          .save()

          .catch((error) => {
            expect(error.message).toBe(
              "User validation failed: email: Path `email` is required."
            );
          });
      });

      test("Should throw an error if email is not a string", () => {
        const user = new Users({
          confirm_password: "@Milanesa123",
          password: "fadfdfadff",
          email: [],
          salt: "ssssfsfsdfdfd",
        });
        return user
          .save()

          .catch((error) => {
            expect(error.message).toBe(
              'User validation failed: email: Cast to string failed for value "[]" (type Array) at path "email"'
            );
          });
      });
    });

    describe("password", () => {
      test("Should throw an error if password is not defined", () => {
        const user = new Users({
          confirm_password: "@Milanesa123",
          password: undefined,
          email: "algo@gmail.com",
          salt: "ssssfsfsdfdfd",
        });
        return user
          .save()

          .catch((error) => {
            expect(error.message).toBe(
              "User validation failed: password: Path `password` is required."
            );
          });
      });

      test("Should throw an error if password is not a string", () => {
        const user = new Users({
          confirm_password: "@Milanesa123",
          password: [],
          email: "algo@gmail",
          salt: "ssssfsfsdfdfd",
        });
        return user
          .save()

          .catch((error) => {
            expect(error.message).toBe(
              'User validation failed: password: Cast to string failed for value "[]" (type Array) at path "password"'
            );
          });
      });
      test("should set password and salt correctly", async () => {
        const user = new Users();
        const password = "mypassword";
        await user.setPassword(password);

        expect(user.password).not.toBe(password); // Password should be hashed
        expect(user.salt).toBeTruthy(); // Salt should be set
      });

      test("should validate the correct password", async () => {
        const user = new Users();
        const password = "mypassword";
        await user.setPassword(password);

        const isPasswordValid = await user.validPassword(password);
        expect(isPasswordValid).toBe(true);
      });

      test("should validate an incorrect password", async () => {
        const user = new Users();
        const password = "mypassword";
        await user.setPassword(password);

        const isPasswordValid = await user.validPassword("wrongpassword");
        expect(isPasswordValid).toBe(false);
      });
    });
  });

  describe("Create new users", () => {
    test("should have the correct model structure", () => {
      const user = new Users();
      const fields = user.schema.obj;

      expect(fields.email).toBeDefined();
      expect(fields.password).toBeDefined();
      expect(fields.confirm_password).toBeDefined();
      expect(fields.salt).toBeDefined();
      expect(fields.is_admin).toBeDefined();
      expect(fields.token).toBeDefined();
      expect(fields.confirm).toBeDefined();
    });

    test("should create a new user", async () => {
      const user = new Users({
        email: "testeando@hotmail.com",
        password: "@Milanesa123",
        confirm_password: "@Milanesa123",
        salt: "ssssfsfsdfdfd",
      });

      return user.save().then((newUser) => {
        expect(newUser._id).toBeDefined();

        expect(newUser.email).toBe("testeando@hotmail.com");
      });
    });

    test("should't create a new user if already exist", async () => {
      const user = new Users({
        email: "testeando@hotmail.com",
        password: "@Milanesa123",
        confirm_password: "@Milanesa123",
        salt: "ssssfsfsdfdfd",
      });

      return user.save().catch((error) => {
        expect(error.message).toBe(
          'E11000 duplicate key error collection: dev.users index: email_1 dup key: { email: "testeando@hotmail.com" }'
        );
      });
    });
  });
});
