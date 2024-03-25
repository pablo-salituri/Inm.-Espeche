const { Router } = require("express");
const operationTypeRouter = Router();
const operationsType = require ("../Controllers/property/operation")


operationTypeRouter.get("/", async (req, res) => {
  try {
    const operationType = await operationsType();
    res.status(200).json(operationType);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});




module.exports = operationTypeRouter;
