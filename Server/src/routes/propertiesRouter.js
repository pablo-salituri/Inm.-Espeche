const { Router } = require ("express");
const propertiesRouter = Router();
const { Property } = require ("../db");
const getPropertyId = require ("../Controllers/property/getProperty");
const getAllProperty = require("../Controllers/property/getAllProperty");
const deleteImage = require('../Controllers/property/deleteImage')
const byName = require ("../Controllers/property/byName");
const postProperty = require("../Controllers/property/postProperty");
const upDateProperty = require ("../Controllers/property/upDateProperty");
const getAllProperties = require("../Controllers/property/getAllProperty");
const updateActive = require("../Controllers/property/updateActive");


///////////////////////////////// GET ALL /////////////////////////////

    propertiesRouter.get("/", async (req, res) => {
        try {
            const { title } = req.query;
            let properties;
            
            if (title) {
                properties = await byName(title);
            } else {
                properties = await getAllProperties();
            }
            
            res.status(200).json(properties);
        } catch (error) {
            res.status(404).send({ error: error.message });
        }
    });
    


/////////////////////////////// BY ID ////////////////////////////////////

propertiesRouter.get("/:id", async (req, res) => {
const { id } = req.params;
try {
    const propertyId= await getPropertyId(id);
    res.status(200).json(propertyId);
} catch (error) {
    res.status(404).send({ error: error.message });
}
})


// propertiesRouter.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//       const property = await Property.findByPk(id, {
//         include: OperationType, // Incluye los tipos de operación asociados a la propiedad
//       });
//       res.status(200).json(property);
//     } catch (error) {
//       res.status(404).send({ error: error.message });
//     }
//   });
  

///////////////////////////////////// POST //////////////////////////////////////////
propertiesRouter.post("/", async (req, res) => {

    try {
        const property= await postProperty(req.body);
        res.status(200).json(property);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
    })

///////////////////////////////////// PUT //////////////////////////////////////////

propertiesRouter.put("/:id", async (req, res) => {

    const { id } = req.params;
    const { body } = req;
    console.log('id en put image', id);
    console.log('body en put image', body);

    try {
        const upDate= await upDateProperty(id, body);
        res.status(200).json(upDate);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
    })


    ////////////////////////////// ACTIVE / INACTIVE //////////////////////////////////////////////

    propertiesRouter.put("/active/:id", async (req, res) => {
        const { id } = req.params;
        const { active } = req.body; // Debes obtener la propiedad 'active' del cuerpo de la solicitud (req.body), no 'req'.
      
        try {
          const property = await Property.findOne({ where: { id: id } });
          if (!property) {
            return res.status(404).send({ error: "Property not found" });
          }
          
          // Aquí deberías usar el nombre correcto de la función 'updateProductActive' en lugar de 'updatedActive'.
          const updatedProperty = await updateActive(id, active);
          
          res.status(200).json(updatedProperty); // Debes usar 'updatedProperty' en lugar de 'updateActive'.
        } catch (error) {
          res.status(500).send({ error: error.message });
        }
      });
      
///////////////////////////////////////// DELETE ///////////////////////////////////
propertiesRouter.delete('/deleteImage/', async (req, res) => {
    /* const idProp = req.query.id
    const url = req.query.url */


    console.log('reqqqqqqqqqqqqqqqq', req.body);

    const idProp = req.body.id;
    const url = req.body.url;
    
    const answer = await deleteImage(idProp, url)
    if (!answer.error)
        return res.status(200).json(answer)
    return res.status(500).json(answer)
});

propertiesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deleteProp = await Property.findByPk(id);
      await deleteProp.destroy();
      res.status(200).json({ message: "Property removed successfully" });
    } catch (error) {
      res.status(404).send("Failed to remove property");
    }
});


module.exports = propertiesRouter;