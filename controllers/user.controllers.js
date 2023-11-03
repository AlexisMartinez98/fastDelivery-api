const UserService = require("../services/user.services");
const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const { generateJWT, verifyJWT } = require("../helpers/generateJwt");
const {
  sendRegistrationEmail,
  forgetPassword,
} = require("../helpers/config.mailer");
const generateId = require("../helpers/generateId");

class UserController {
  static async createUser(req, res) {
    try {
      const {
        email,
        password,
        salt,
        is_admin,
        confirm_password,
        name,
        last_name,
        image,
      } = req.body;
      const userExists = await userModel.findOne({ email: email });
      if (userExists) return res.status(400).json("El usuario ya existe");
      if (password !== confirm_password) {
        return res.status(404).json("passwords do not match");
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await UserService.createUser({
        name,
        last_name,
        image,
        email,
        password,
        salt,
        is_admin,
      });
      await sendRegistrationEmail(
        email,
        email.trim().split("@")[0],
        user.token
      );
      return res.status(201).json({ user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async authentication(req, res) {
    try {
      const { email, password, is_admin } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return res.status(404).json({ msg: "El usuario no existe." });
      }
      if (!user.confirm) {
        const error = new Error("Tu cuenta no esta confirmada");
        return res.status(403).json({ msg: error.message });
      }
      if (await user.validPassword(password)) {
        res.status(200).json({
          _id: user._id,
          email: user.email,
          token: generateJWT(user.email, user.is_admin,user._id),
        });
      } else {
        res.status(401).json({ msg: "Credenciales invalidas" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async me(req, res) {
    try {
      const token = req.headers.cookies;
      if (!token) {
        return res.status(401).json({ msg: "No hay usuario" });
      }
      const { payload } = verifyJWT(token);
      if (!payload) {
        return res.status(404).json({ msg: "El usuario no existe" });
      }
      res.status(200).json(payload);
    } catch (error) {
      console.error("Error en la verificación de usuario:", error);
      res.status(500).json({ msg: "Error interno del servidor" });
    }
  }

  static async confirm(req, res) {
    const { token } = req.params;
    const userConfirm = await userModel.findOne({ token: token });
    if (!userConfirm) {
      const error = new Error("Token no valido");
      return res.status(404).json({ msg: error.message });
    }
    if (userConfirm.confirm === true) {
      const error = new Error("El usuario ya esta confirmado");
      return res.status(404).json({ msg: error.message });
    }
    try {
      userConfirm.confirm = true;
      userConfirm.token = "";
      await userConfirm.save();
      res.json({ msg: "Usuario confirmado" });
    } catch (error) {
      console.log(error);
    }
  }
  static async forgetPassword(req, res) {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }
    if (user.confirm === false) {
      const error = new Error("Tu cuenta no esta confirmada");
      return res.status(403).json({ msg: error.message });
    }
    if (user.token !== "") {
      const error = new Error("Ya se ha enviado un correo");
      return res.status(403).json({ msg: error.message });
    }

    try {
      user.token = generateId();
      await user.save();
      await forgetPassword(email, email.trim().split("@")[0], user.token);
      res.json({ msg: "Se ha enviado un correo para cambiar la contraseña" });
    } catch (error) {
      console.log(error);
    }
  }
  static async newPassword(req, res) {
    const { token } = req.params;
    const { password, confirm_password } = req.body;
    if (password !== confirm_password) {
      const error = new Error("Contraseñas no coinciden");
      return res.status(404).json({ msg: error.message });
    }
    const userValidate = await userModel.findOne({ token });
    if (!userValidate) {
      const error = new Error("Token no valido");
      return res.status(404).json({ msg: error.message });
    }
    if (userValidate.confirm === false) {
      const error = new Error("Tu cuenta no esta confirmada");
      return res.status(403).json({ msg: error.message });
    }
    if (userValidate) {
      await userValidate.setPassword(password);
      userValidate.token = "";
      try {
        await userValidate.save();
        res.json({ msg: "Contraseña cambiada correctamente" });
      } catch (error) {
        console.log(error);
      }
    } else {
      const error = new Error("Token no valido");
      return res.status(404).json({ msg: error.message });
    }
  }
  static async logout(req, res) {
    try {
      res.clearCookie("token");
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ error: "Logout failed" });
    }
  }
}

module.exports = UserController;
