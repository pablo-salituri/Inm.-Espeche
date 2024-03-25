// const { Router } = require ("express");

// const getAllUser = require ("../Controllers/user/getAllUser")

// const userRouter = Router();


// userRouter.get("/", async (req, res) => {

//     try {
//       const users = await getAllUser(); // Llama al controlador para obtener todos los usuarios
//       res.status(200).json(users); // Devuelve los usuarios en formato JSON con un código de estado 200
//     } catch (error) {
//       res.status(500).json({ error: error.message }); // Devuelve un error con un código de estado 500 si ocurre algún problema al buscar los usuarios
//     }
//     });


//     module.exports= userRouter;