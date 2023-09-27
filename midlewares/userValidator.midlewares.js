const { body } = require("express-validator");
exports.createUserValidation = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("email").notEmpty().withMessage("Email cannot be empty"),

  body("password").notEmpty().withMessage("password is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 character"),

  body("password")
    .matches(/\d/)
    .withMessage("password must contain at least one number"),
  body("password")
    .matches(/[a-z]/)
    .withMessage("password must contain at least one lowercase letter"),
  body("password")
    .matches(/[A-Z]/)
    .withMessage("password must contain at least one capital letter"),
];
exports.loginValidation = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("email").notEmpty().withMessage("Email cannot be empty"),

  body("password").notEmpty().withMessage("password is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 character"),
];
