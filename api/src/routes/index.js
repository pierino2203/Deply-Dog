const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament, Op } = require("../db");
const e = require("express");
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    try {
      const apiUrl = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      const apiInfo = await apiUrl.data.map(d => {
      return  {
        id: d.id,
        name: d.name,
        height_min: d.height.metric.split(" - ")[0] && d.height.metric.split(" - ")[0],
        height_max: d.height.metric.split(" - ")[1] && d.height.metric.split(" - ")[1],
        weight_min: d.weight.metric.split(" - ")[0] && d.weight.metric.split(" - ")[0],
        weight_max: d.weight.metric.split(" - ")[1] && d.weight.metric.split(" - ")[1],
        life_time_mix: d.life_span.split(" - ")[0] && d.life_span.split(" - ")[0],
        life_time_max: d.life_span.split(" - ")[1] && d.life_span.split(" - ")[1].split(" ")[0],
        temperament: d.temperament ? d.temperament : "Perro sin Temperamentos",
        img: d.image.url,

      }
      
    })
    return apiInfo;
    } catch (error) {
      console.log("Hubo un error en getApiInfo",error)
    }
}

const getDbInfo = async () => {
  try {
    return await Dog.findAll({
      include:  {
        model: Temperament,
        attributes: ["name"],
        through:  {
          attributes: [],
        },
      }
    })
  } catch (error) {
    console.log("Hubo un error en getDbInfo", error);
  }
}

const getAllDogs= async ()  =>  {
  try {
    const api = await getApiInfo();
    const db = await getDbInfo();
    const infoTotal = api.concat(db);
    return infoTotal;
  } catch (error) {
    console.log("Error en infoTotal",error);
  }
}

router.get('/dogs', async (req,res) =>  {
  try {
    const { name } =req.query;
    let dogsTotal = await getAllDogs();
    if(name) {
      let dogsName = await dogsTotal.filter ((d) => d.name.toLowerCase().includes(name.toLowerCase()));
      dogsName.length
      ? res.status(200).send(dogsName)
      : res.status(404).send("No se encontro el perro");
    } else {
      res.status(200).send(dogsTotal);
    }
  } catch (error) {
    console.log("Hubo un error en tu",error)
  }
})

router.get ('/temperament', async (req,res) =>  {
  try {
    const allTemp= await Temperament.findAll();

      const apiTemp= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`); 
      const temps = apiTemp.data.map((r) => {  //me guardo en temps todos los temperamentos desde la api
        const all =r.temperament;
        return all;
      })
      const sinEspacios = temps.map( (r) => r && r.split(", ")).flat(); // tomo el array de temperamentos y aplico el map y cada elemento un spli, con el flat transformo el areglo de arreglos en un solo arreglo de elementos 
      
      
      sinEspacios.forEach( async t => {
        if(t){
          await Temperament.findOrCreate({
            where:  { name : t }
          })
        }
      } )
      const allTemperaments = await Temperament.findAll();
      res.send(allTemperaments);
  } catch (error) {
    console.log("error en post",e)
  }
    
    });
    router.post("/dogs", async (req, res) => {
      try{
    
        const {
          name,
          height_max,
          height_min,
          weight_max,
          weight_min,
          life_time_max,
          life_time_min,
          temperament,
          img,
          createInDb,
        } = req.body;
      
        let dogCreated = await Dog.create({
          name,
          height_max,
          height_min,
          weight_max,
          weight_min,
          life_time_max,
          life_time_min,
          img,
          createInDb,
        });
      
        let temperamentDb = await Temperament.findAll({
          where: { name: temperament },
        });
        await dogCreated.addTemperaments(temperamentDb); // se agrega el await para esperar que se encuentren los temperaments
        res.send("El Perrito ha sido creado con exito");
      }
      catch(error){
        console.log("Se presento un error en el Post", error)
      }
    });
router.get("/dogs/:id", async (req,res) => {
  try {
    const { id } = req.params;
    const dogsTotal= await getAllDogs();
    if(id){
      let dogId= await dogsTotal.filter((r) => r.id.toString() === id.toString());
      dogId.length
      ?res.status(200).json(dogId)
      :res.status(404).send(`No se encontro el perro con el id:${id}`)
      
    }
  } catch (error) {
    console.log("Hubo un error",error)
  }
} )
module.exports = router;
