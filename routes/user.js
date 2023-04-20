const express = require("express");
require("express-group-routes");
const app = express();
const router = express.Router();
const user = require("../controllers/user");
const { check } = require("express-validator");

app.group("/", () => {
  router.post(
    "/",
    [
      check("name", "El nombre es un campo obligatorio").not().isEmpty(),
      check("email", "El email es un campo obligatorio").isEmail(),
      check("password", "El password es un campo obligatorio").not().isEmpty(),
      check(
        "password",
        "El password debe de tener mínimo de 6 caracteres"
      ).isLength({ min: 6 }),
    ],
    user.createUser
  );
});

module.exports = router;
