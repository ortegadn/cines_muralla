const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

router.get("/agregar-pelicula", (req, res) => {
  res.render("add_movie", { title: "Agregar Pelicula"});
})


/*router.get("/home", (req, res) => {
  res.render("home", { title: "home" });
});*/

router.get("/administrar", (req, res) => {
  res.render("administrar", { title: "administrar" });
});

router.get("/compra-boletos", (req, res) => {
  res.render("compra-boletos", { title: "compra-boletos" });
});

router.get("/compra-combos", (req, res) => {
  res.render("compra-combos", { title: "compra-combos" });
});

router.get("/agregarSede", (req, res) => {
  res.render("agregarSede", { title: "AgregarSede" });
});


router.get("signin", (req, res) => {
  res.render("auth/signin", { title: "Iniciar Sesion" });
});
router.post("signin", authController.signin);
router.get("signup", (req, res) => {
  res.render("auth/signup", { title: "Registrarse" });
});
router.post("signup", userController.signup, authController.signin);

module.exports = router;
