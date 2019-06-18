const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
<<<<<<< HEAD

router.get("/", (req, res) => {
  res.render("layout", { title: "Layout" });
});

/**/
router.get("/prueba", (req, res) => {
  res.render("prueba", { title: "Prueba" });
});
/**/
=======
const peliculaController = require("../controllers/peliculacontroller");
const comidaController = require("../controllers/comidaController")

router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

/*----------------------PELICULAS------------------------------*/
router.get("/agregar-pelicula", (req, res) => {
  res.render("add_movie", { title: "Agregar Pelicula"});
})

router.post("/createMovie" ,(req,res)=>{
  peliculaController.CreatePelicula(req.body);
  res.redirect('/get_peliculas');
});

router.get("/get-peliculas", (req,res)=>{
  peliculaController.GetPelicula((pelicula, err) => {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener peliculas"
      });
    else {
      res.render("get_movies", {pelicula});
    }
  });
});

router.get("/modificar-pelicula", (req,res)=>{
  peliculaController.GetPelicula((pelicula, err) => {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener peliculas"
      });
    else {
      res.render("update_movie", {pelicula});
    }
  });
});

router.post("/updateMovie", (req, res) => {
  console.log(req.body);
    if(!!req.body.titulo){ 
      console.log(req.body.titulo);
    peliculaController.UpdatePelicula(req.body,req.body.titulo);
  }
  res.redirect('/get-peliculas');
});

router.get('/eliminar-pelicula', (req,res)=>{
  peliculaController.GetPelicula((pelicula, err) => {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener peliculas"
      });
    else {
      res.render("delete_movie", {pelicula});
    }
  });
});

router.post("/delete-pelicula",(req,res)=>{
  peliculaController.DeletePelicula(req.body,req.body.titulo);
  res.redirect('/get-peliculas');
});
/*-------------------------------------------------------------*/

/*------------------------COMIDA-------------------------*/
router.get("/agregar-comida", (req, res) => {
  res.render("agregar_comida", { title: "Agregar Comida"});
});

router.post("/createComida" ,(req,res)=>{
  comidaController.CreateComida(req.body);
  res.redirect('/');
});
/*-------------------------------------------------------*/

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
>>>>>>> origin/DevErick

router.get("signin", (req, res) => {
  res.render("auth/signin", { title: "Iniciar Sesion" });
});
router.post("signin", authController.signin);
<<<<<<< HEAD
router.get("signup", (req, res) => {
  res.render("auth/signup", { title: "Registrarse" });
});
=======

router.get("signup", (req, res) => {
  res.render("auth/signup", { title: "Registrarse" });
});

>>>>>>> origin/DevErick
router.post("signup", userController.signup, authController.signin);

module.exports = router;
