const Usuario = require("../models/UsuarioModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id).select("-password");
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.autheticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    const passwordCorrect = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrect) {
      return res.status(400).json({ msg: "El password es incorrecto" });
    }

    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    jwt.sign(payload, process.env.CRYPTWORD, (err, token) => {
      if (err) throw err;

      return res.json({ token });
    });
  } catch (error) {
    console.log(error);
  }
};
