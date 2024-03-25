const { Router } = require('express');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const usersRouter = require("./usersRouter");
const propertiesRouter = require ("./propertiesRouter")
const typeRouter = require ("./typeRouter")
const operationTypeRouter = require ("./operationTypeRouter")
// const userRouter = require ("./userRouter")

const router = Router();


// router.use("/users", usersRouter);
router.use("/properties", propertiesRouter);
// router.use("/images", imagesRouter);
router.use("/types", typeRouter);
router.use("/operations", operationTypeRouter);
// router.use("/users", userRouter);

// router.use("/operation", operationTypeRouter);





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;