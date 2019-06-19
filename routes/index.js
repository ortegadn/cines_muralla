const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const peliculaController = require("../controllers/peliculacontroller");
const comidaController = require("../controllers/comidaController");
const sedeController = require("../controllers/sedeController");
const tipoSalaController = require("../controllers/tipoSalaController");
const tipoFormatoController = require("../controllers/tipoFormatoController");
const salaController = require("../controllers/salaController");
const generoController = require("../controllers/generoController")

router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

router.get("/agregar-tipo-sala", (req, res) => {
  res.render("./sala/agregarTipoSala", {title: "Tipo Sala"});
});

router.post("/agregarTipoSala", (req, res) => {
  tipoSalaController.CreateTipoSala(req.body);
  res.redirect("/administrar")
})

router.get("/agregar-tipo-formato", (req, res) => {
  res.render("./sala/agregarFormato", {title: "Tipo Formato"});
});

router.post("/agregarTipoFormato", (req, res) => {
  tipoFormatoController.CreateTipoFormato(req.body);
  res.redirect("/administrar")
})

router.get("/agregar-sala", (req, res) => {
  sedeController.GetSede((sede, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener sede"
      });
    else{
      res.render("./sala/agregarSala", {sede});
    }
  });
});

router.post("/agregarSala", (req, res) => {
  salaController.CreateSala(req.body);
  res.redirect('/administrar')
})

router.get("/agregar-genero", (req, res) => {
  res.render("./pelicula/agregarGenero", {title: "Tipo Genero"});
});

router.post("/agregarGenero", (req, res) => {
  generoController.CreateGenero(req.body);
  res.redirect("/administrar")
})

router.get("/agregar-sede", (req, res) => {
  res.render("./sede/agregarSede", { title: "Agregar Sede" });
});

router.post("/agregarSede", (req, res) => {
  sedeController.CreateSede(req.body);
  res.redirect('/administrar');
})
/*----------------------PELICULAS------------------------------*/
router.get("/agregar-pelicula", (req, res) => {
  res.render("./pelicula/add_movie", { title: "Agregar Pelicula"});
})

router.post("/createMovie" ,(req,res)=>{
  peliculaController.CreatePelicula(req.body);
  res.redirect('/get-peliculas');
});

router.get("/get-peliculas", (req,res)=>{
  peliculaController.GetPelicula((pelicula, err) => {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener peliculas"
      });
    else {
      res.render("./pelicula/get_movies", {pelicula});
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
      res.render("./pelicula/update_movie", {pelicula});
    }
  });
});

router.post("/updateMovie", (req, res) => {
  console.log(req.body);
    if(!!req.body.id_pelicula){ 
      console.log(req.body.id_pelicula);
    peliculaController.UpdatePelicula(req.body,req.body.id_pelicula);
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
      res.render("./pelicula/delete_movie", {pelicula});
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

router.get("signin", (req, res) => {
  res.render("auth/signin", { title: "Iniciar Sesion" });
});
router.post("signin", authController.signin);

router.get("signup", (req, res) => {
  res.render("auth/signup", { title: "Registrarse" });
});

router.post("signup", userController.signup, authController.signin);

module.exports = router;
