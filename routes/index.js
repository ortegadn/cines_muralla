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
const subtituloController = require("../controllers/subtituloController");
const funcionController = require("../controllers/funcionController");
const factsalesController = require("../controllers/factsalesController");
const comboController = require("../controllers/comboController");
const combocomidaController = require("../controllers/combocomidaController");

router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

router.get("/compra-comida", (req, res) => {
  let Combo;
  comboController.GetCombo((combo, err) => {
    Combo = combo;
  });

  comidaController.GetComida((comida, err) => {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener comida"
      });
    else {
      res.render("./compraComida/compra-comida", {comida, Combo});
    }
  });
});

router.post("/comidaCompra", (req, res) => {
  res.redirect("/");
});

router.post("/comboCompra", (req, res) => {
  combocomidaController.GetComboComidaByIdCombo(req.body, (comboC, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener comidas de combo"
      });
    else{
      res.render("./compraComida/vistaCombo", {comboC});
    }
  })
})

router.get("/sede-boleto", (req, res) => {
  sedeController.GetSede((sede, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener sede"
      });
    else{
      res.render("./compraBoletos/seleccionarSedeCompra", {sede});
    }
  });
});

router.post("/select-pelicula-repertorio", (req, res) => {
  console.log(req.body);
  
  repertorioController.GetRepertorioBySedeId(req.body, (repertorio, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener repertorio"
      });
    else{
      res.render("./compraBoletos/seleccionarRepertorioSede", {repertorio});
    }
  })
});

router.post("/select-funcion-pelicula", (req, res) => {
  console.log(req.body);
  
  funcionController.GetFuncionByRepertorioId(req.body, (funciones, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener funciones"
      });
    else{
      res.render("./compraBoletos/seleccionarFuncionSede", {funciones});
    }
  })
});

router.post("/select-butacas", (req, res) => {
  res.redirect("/");
})

/*-------------------------------------------------------------------*/
router.get("/select-funcion-sede", (req, res) => {
  sedeController.GetSede((sede, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener sede"
      });
    else{
      res.render("./funcion/deleteSelectSede", {sede});
    }
  });
})

router.post("/seleccionar-pelicula", (req, res) => {
  let sedeUbic;

  sedeController.GetSedeByID(req.body, (sede, err) => {
    sedeUbic = sede[0].ubicacion;  
  });

  repertorioController.GetRepertorioBySedeId(req.body, (repertorios, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener repertorios"
      });
    else{
      res.render("./funcion/seleccionarRepertorio", {repertorios, sedeUbic});
    }
  })
});

router.post("/eliminar-funcion", (req, res) => {
  let peliculaTitulo;
  let idioma;
  let subtitulo;

  repertorioController.GetRepertorioById(req.body, (repertorios, err) => {
    peliculaTitulo = repertorios[0].pelicula.titulo;
    idioma = repertorios[0].idioma.idioma;
    subtitulo = repertorios[0].subtitulo.idioma.idioma;
  });

  funcionController.GetFuncionByRepertorioId(req.body, (funciones, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener funciones"
      });
    else{
      res.render("./funcion/eliminarFuncion", {funciones, peliculaTitulo, idioma, subtitulo});
    }
  })
});

router.post("/deleteFuncion", (req, res) => {
  funcionController.DeleteFuncion(req.body);
  res.redirect("/administrar");
})

/*------------------------------------------------------------------*/
router.get("/seleccionar-repertorio", (req, res) => {
  sedeController.GetSede((sede, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener sede"
      });
    else{
      res.render("./repertorio/selectSedeRepertorio", {sede});
    }
  });
});

router.post("/quitar-pelicula-repertorio", (req, res) => {
  let sedeUbic;

  sedeController.GetSedeByID(req.body, (sede, err) => {
    sedeUbic = sede[0].ubicacion;  
  });

  repertorioController.GetRepertorioBySedeId(req.body, (repertorios, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener repertorios"
      });
    else{
      res.render("./repertorio/eliminarRepertorio", {repertorios, sedeUbic});
    }
  })
});

router.post("/eliminarRepertorio", (req, res) => {
  repertorioController.DeleteRepertorio(req.body);
  res.redirect("/visualizar-repertorios");
});
/*------------------------------------------------------------------*/
router.get("/seleccionar-sede", (req, res) => {
  sedeController.GetSede((sede, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener sede"
      });
    else{
      res.render("./funcion/seleccionarSede", {sede});
    }
  });
});

router.post("/agregar-funcion", (req, res) => {
  let Sala;
  let sedeUbic;

  salaController.GetSalasBySedeId(req.body, (sala, err) => {
    Sala = sala;
  });

  sedeController.GetSedeByID(req.body, (sede, err) => {
    sedeUbic = sede[0].ubicacion;  
  });

  repertorioController.GetRepertorioBySedeId(req.body, (repertorios, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener repertorios"
      });
    else{
      res.render("./funcion/agregarFuncion", {repertorios, Sala, sedeUbic});
    }
  })
});

router.post("/agregarFuncion", (req, res) => {
  funcionController.CreateFuncion(req.body);
  res.redirect("/administrar")
})
/*------------------------------------------------------------------*/

/*------------------------------------------------------------------*/
router.get("/visualizar-repertorios", (req, res) => {
  let Sede;

  sedeController.GetSede((sede, err) => {
    Sede = sede;
  });

  repertorioController.GetRepertorios((repertorios, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener repertorios"
      });
    else{
      res.render("./repertorio/verRepertorio", {repertorios, Sede});
    }
  })
});

router.post("/visualizar-repertorios", (req, res) => {
  if(req.body.id_sede == "todos"){
    res.redirect("/visualizar-repertorios");
  }else{
    let Sede;
    sedeController.GetSede((sede, err) => {
      Sede = sede;
    });
    
    let sedeUbic;
    sedeController.GetSedeByID(req.body, (sede, err) => {
      sedeUbic = sede[0].ubicacion;  
    });

    repertorioController.GetRepertorioBySedeId(req.body, (repertorios, err) => {
      if(err)
        res.json({
          success: false,
          msg: "Fallo en obtener repertorios"
        });
      else{
        res.render("./repertorio/tablaRepertorios", {repertorios, Sede, sedeUbic});
      }
    })
  }
})
/*------------------------------------------------------------------*/

/*------------------------------------------------------------------*/
router.get("/visualizar-salas", (req, res) => {
  let Sede;

  sedeController.GetSede((sede, err) => {
    Sede = sede;
  });

  salaController.GetSalas((salas, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener sede"
      });
    else{
      //salaUbic = salas[0].idsede.ubicacion
      res.render("./sala/getSalaPorSede", {salas, Sede});
    }
  });
});

router.post("/visualizar-salas", (req, res) => {
  if(req.body.id_sede == "todos"){
    res.redirect("/visualizar-salas");
  }else{
    let Sede;
    sedeController.GetSede((sede, err) => {
      Sede = sede;
    });

    let sedeUbic;
    sedeController.GetSedeByID(req.body, (sede, err) => {
      sedeUbic = sede[0].ubicacion;  
    });
    
    salaController.GetSalasBySedeId(req.body, (salas, err) => {
      if(err)
        res.json({
          success: false,
          msg: "Fallo en obtener sede"
        });
      else{
        res.render("./sala/tablaSalas", {salas, Sede, sedeUbic});
      }
    });
  } 
});
/*------------------------------------------------------------------*/

/*------------------------------------------------------------------*/
router.get("/agregar-repertorio", (req, res) => {
  let Idioma;
  let Subtitulo;
  let Censura;
  let Pelicula;

  peliculaController.GetPelicula((pelicula, err) => {
    Pelicula = pelicula;
  });

  censuraController.GetCensura((censura, err) => {
    Censura=censura;
  });

  idiomaController.GetIdioma((idioma, err) => {
    Idioma = idioma;
  });

  subtituloController.GetSubtitulos((subtitulo, err) => {
    Subtitulo = subtitulo;
    console.log(Subtitulo);
    
  })

  sedeController.GetSede((sede, err) => {
    if(err)
      res.json({
        success: false,
        msg: "Fallo en obtener sede"
      });
    else{
      console.log(Censura);
      
      res.render("./repertorio/agregarRepertorio", {sede,Idioma,Censura,Pelicula,Subtitulo});
    }
  });
});

router.post("/agregarRepertorio", (req, res) => {
  repertorioController.CreateRepertorio(req.body);
  res.redirect("/administrar")
})
/*------------------------------------------------------------------*/

/*------------------------------------------------------------------*/
router.get("/agregar-censura", (req, res) => {
  res.render("./repertorio/agregarCensura", {title: "Censura"});
});

router.post("/agregarCensura", (req, res) => {
  censuraController.CreateCensura(req.body);
  res.redirect("/administrar")
});
/*------------------------------------------------------------------*/

/*------------------------------------------------------------------*/
router.get("/agregar-idioma", (req, res) => {
  res.render("./repertorio/agregarIdioma", {title: "Idioma"});
});

router.post("/agregarIdioma", (req, res) => {
  idiomaController.CreateIdioma(req.body);
  res.redirect("/administrar")
});
/*------------------------------------------------------------------*/

/*------------------------------------------------------------------*/
router.get("/agregar-tipo-sala", (req, res) => {
  res.render("./sala/agregarTipoSala", {title: "Tipo Sala"});
});

router.post("/agregarTipoSala", (req, res) => {
  tipoSalaController.CreateTipoSala(req.body);
  res.redirect("/administrar")
});
/*------------------------------------------------------------------*/

/*------------------------------------------------------------------*/
router.get("/agregar-tipo-formato", (req, res) => {
  res.render("./sala/agregarFormato", {title: "Tipo Formato"});
});

router.post("/agregarTipoFormato", (req, res) => {
  tipoFormatoController.CreateTipoFormato(req.body);
  res.redirect("/administrar")
})
/*------------------------------------------------------------------*/

/*------------------------------------------------------------------*/
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
/*------------------------------------------------------------------*/

/*------------------------------------------------------------------*/
router.get("/agregar-genero", (req, res) => {
  res.render("./pelicula/agregarGenero", {title: "Tipo Genero"});
});

router.post("/agregarGenero", (req, res) => {
  generoController.CreateGenero(req.body);
  res.redirect("/administrar")
})
/*------------------------------------------------------------------*/

/*------------------------------------------------------------------*/
router.get("/agregar-sede", (req, res) => {
  res.render("./sede/agregarSede", { title: "Agregar Sede" });
});

router.post("/agregarSede", (req, res) => {
  sedeController.CreateSede(req.body);
  res.redirect('/administrar');
})
/*------------------------------------------------------------------*/

/*------------------------------------------------------------------*/
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
/*------------------------------------------------------------------*/

router.post("/updateMovie", (req, res) => {
  console.log(req.body);
    if(!!req.body.id_pelicula){ 
      console.log(req.body.id_pelicula);
    peliculaController.UpdatePelicula(req.body,req.body.id_pelicula);
  }
  res.redirect('/get-peliculas');
});

router.get("/modificar-sede", (req, res) =>{
  sedeController.GetSede((sede, err)=> {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener sede"
      });
    else{
      res.render("./sede/modificarSede", {sede});
    }
  });
});

router.post("/updateSede", (req, res)=>{
  console.log(req.body);
  if(!!req.body.id_sede){
    console.log(req.body.id_sede);
  sedeController.UpdateSede(req.body,req.body.id_sede);
  }
  res.redirect('/administrar');
});

router.get("/lista-sedes", (req,res)=>{
  sedeController.GetSede((sede, err) => {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener sedes"
      });
    else {
      res.render("./sede/listaSede", {sede});
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
/*------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
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
/*------------------------------------------------------------------*/

/*------------------------------------------------------------------*/
router.get("/agregar-comida", (req, res) => {
  res.render("./comida/agregar_comida", { title: "Agregar Comida"});
});

router.post("/createComida" ,(req,res)=>{
  comidaController.CreateComida(req.body);
  res.redirect('/administrar');
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
  res.redirect('/administrar');
});


/*--------------------------COMBOS------------------------*/
router.get("/agregar-combo", (req, res) => {
  res.render("./comida/combo");
});

router.post("/agregarCombo", (req, res) => {
  comboController.CreateCombo(req.body);
  res.redirect('/administrar');
})

router.get("/comida-combo", (req, res) => {
  let Combo

  comboController.GetCombo((combo, err) => {
    Combo = combo;
  });

  comidaController.GetComida((comida, err) => {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener comidas"
      });
    else {
      res.render("./comida/agregar-comida-combo", {comida, Combo});
    }
  });
});

let comidasSelec = [];

router.post("/agregar-comida-combo" ,(req,res)=>{
  let comboId = req.body.id_combo;
  console.log("----------------" + comboId + "----------------");
  

  comidasSelec.push(req.body);
  console.log(comidasSelec);

  comidaController.GetComida((comida, err) => {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener comidas"
      });
    else {
      res.render("./comida/nextComidaCombo", {comida, comidasSelec, comboId});
    }
  });
});

router.post("/agregar-comida-combo#" ,(req,res)=>{
  let comboId = req.body.id_combo;
  console.log(comboId);
  

  comidasSelec.push(req.body);
  console.log(comidasSelec);

  comidaController.GetComida((comida, err) => {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener comidas"
      });
    else {
      res.render("./comida/nextComidaCombo", {comida, comidasSelec, comboId});
    }
  });
});

router.post("/agregar-lista-comida", (req, res) => {
  comidasSelec.forEach(comida => {
    combocomidaController.AddComidaToCombo(comida);
  });
  comidasSelec = [];
  console.log(comidasSelec);
  res.redirect("/administrar");
}); 

router.get("/get-combo", (req,res)=>{
  comboController.GetCombo((combo, err) => {
    if (err)
      res.json({
        success: false,
        msg: "Fallo en obtener combo"
      });
    else {
      res.render("./comida/combo", {combo});
    }
  });
});


router.get('/eliminar-combo', (req,res)=> {
  combocomidaController.GetComboComidaCombo((comboC, err) => {
    if (err)
      res.json({
        success:false,
      msg: "fallo en obtener combos"
    });
    else {
      res.render("./comida/eliminar_combo", {comboC});
    }
  })
}); 


router.post("/delete-combo",(req,res)=>{
  combocomidaController.DeleteCombo(req.body)
  res.redirect('/administrar');
});


/*------------------------OTROS---------------------------*/

/*------------------------------------------------------------------*/
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
