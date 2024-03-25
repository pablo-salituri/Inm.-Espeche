const { Router } = require("express");
const typeRouter = Router();
const { getTypes }  = require ("../Controllers/property/getTypes")
const { PropertyType } =require ("../db")

typeRouter.get("/", async (req, res) => {
  try {
    const types = await getTypes();

    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});


typeRouter.get("/:type", async (req, res) => {
  const { type } = req.params;

  try {
    const propertyType = await PropertyType.findOne({
      where: { type },
    });

    if (!propertyType) {
      res.status(404).json({ error: "Type not found" });
      return;
    }

    res.status(200).json({ propertyTypeId: propertyType.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






module.exports = typeRouter;