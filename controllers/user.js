const bcrypt = require("bcryptjs");
const Usuario = require("../models/UsuarioModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    usuario = new Usuario(req.body);

    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    await usuario.save();

    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    jwt.sign(
      payload,
      process.env.CRYPTWORD,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) throw err;

        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
