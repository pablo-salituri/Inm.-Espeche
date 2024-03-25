const { Property } = require("../../db");
const cloudinary = require('cloudinary').v2
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;


cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET 
});

const deleteImage = async(idProp, url) => {

    //* Ajustar a la url que coincida con el PublicId de Cloudinary
    const splitUrl = url.split("/").slice(-2);
    const imageName = splitUrl[1].split(".");
    const publicId = splitUrl[0] + "/" + imageName[0];
    
    try {
        // Borra imagen de la DB
        /* const property = await Property.findOne({ where: { id: idProp } });
        const images = property.image
        const updatedArray = images.filter(image => image !== url)

        await Property.update({ image: updatedArray }, { where: { id: idProp } }); */
        // // const updatedProperty = await Property.findOne({ where: { id: idProp } });

        // Borrar imagen de Cloudinary
        cloudinary.uploader.destroy(publicId,(error, result) => {
            console.log(error, result)
        })

        return {message: `Imagen eliminada con éxito de Cloudinary`}

      } catch (error) {
        //*Corregir
        return {error: 'No se pudo eliminar la imagen'}
      }
}


module.exports = deleteImage