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
const generoController = require("../controllers/generoController");
const idiomaController = require("../controllers/idiomaController");
const censuraController = require("../controllers/censuraController");
const repertorioController = require("../controllers/repertorioController");
const comboController = require("../controllers/comboController");

router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

router.get("/agregar-repertorio", (req, res) => {
  let Idioma;
  let Censura;
  let Pelicula;

  peliculaController.GetPelicula((pelicula, err) => {
    Pelicula = pelicula;
  })

  censuraController.GetCensura((censura, err) => {
    Censura=censura;
  });

  idiomaController.GetIdioma((idioma, err) => {
    Idioma = idioma;
  });

  sedeController.GetSede((sede, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener sede"
      });
    else{
      console.log(Censura);
      
      res.render("./repertorio/agregarRepertorio", {sede,Idioma,Censura,Pelicula});
    }
  });
});

router.post("/agregarRepertorio", (req, res) => {
  repertorioController.CreateRepertorio(req.body);
  res.redirect("/administrar")
})

router.get("/agregar-censura", (req, res) => {
  res.render("./repertorio/agregarCensura", {title: "Censura"});
});

router.post("/agregarCensura", (req, res) => {
  censuraController.CreateCensura(req.body);
  res.redirect("/administrar")
});

router.get("/agregar-idioma", (req, res) => {
  res.render("./repertorio/agregarIdioma", {title: "Idioma"});
});

router.post("/agregarIdioma", (req, res) => {
  idiomaController.CreateIdioma(req.body);
  res.redirect("/administrar")
});

router.get("/agregar-tipo-sala", (req, res) => {
  res.render("./sala/agregarTipoSala", {title: "Tipo Sala"});
});

router.post("/agregarTipoSala", (req, res) => {
  tipoSalaController.CreateTipoSala(req.body);
  res.redirect("/administrar")
});

router.get("/agregar-tipo-formato", (req, res) => {
  res.render("./sala/agregarFormato", {title: "Tipo Formato"});
});

router.post("/agregarTipoFormato", (req, res) => {
  tipoFormatoController.CreateTipoFormato(req.body);
  res.redirect("/administrar")
})

router.get("/agregar-sala", (req, res) => {
  let Tformato;
  let Tsala;

  tipoFormatoController.GetTipoFormato((tipoFormato, err) => {
    Tformato=tipoFormato;
  });

  tipoSalaController.GetTipoSala((tipoSala, err) => {
    Tsala = tipoSala;
  });

  sedeController.GetSede((sede, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener sede"
      });
    else{
      console.log(Tformato);
      console.log(Tsala);
      
      res.render("./sala/agregarSala", {sede,Tformato,Tsala});
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

router.post("/agregarCombo", (req, res) => {
  comboController.CreateCombo(req.body);
  res.redirect('/administrar');
})
/*----------------------PELICULAS------------------------------*/
router.get("/agregar-pelicula", (req, res) => {
  generoController.GetGeneros((genero, err) => {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener generos"
      });
    else {
      res.render("./pelicula/add_movie", {genero});
    }
  })
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
  res.render("./comida/agregar_comida", { title: "Agregar Comida"});
});

router.post("/createComida" ,(req,res)=>{
  comidaController.CreateComida(req.body);
  res.redirect('/');
});

router.get("/get-comida", (req,res)=>{
  comidaController.GetComida((comida, err) => {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener comida"
      });
    else {
      res.render("./comida/agregar_comida", {comida});
    }
  });
});

router.get('/eliminar-comida', (req,res)=> {
  comidaController.GetComida((comida, err) => {
    if (err)
      res.json({
        success:false,
      msg: "fallo en obtener comidas"
    });
  else {
    res.render("./comida/eliminar_comida", {comida});
    }
  });
}); 



router.post("/delete-comida",(req,res)=>{
  comidaController.DeleteComida(req.body,req.body.nombre_comida);
  res.redirect('/');
});


/*-------------------------------------------------------*/



router.get("/ModificarSala", (req, res) => {
  res.render("modificarSala", { title: "ModificarSala" });
});

router.get("/EliminarSala", (req, res) => {
  res.render("EliminarSala", { title: "EliminarSala" });
});

router.get("/AgregarSala", (req, res) => {
  res.render("AgregarSala", { title: "AgregarSala" });
});

router.get("/ModificarSede", (req, res) => {
  res.render("ModificarSede", { title: "ModificarSede" });
});

router.get("/administrar", (req, res) => {
  res.render("administrar", { title: "administrar" });
});

router.get("/catalogocines", (req, res) => {
  res.render("catalogocines", { title: "catalogocines" });
});

router.get("/peliculasxsede", (req, res) => {
  res.render("peliculasxsede", { title: "peliculasxsede" });
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
