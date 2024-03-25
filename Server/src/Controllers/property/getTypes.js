const { PropertyType, Property } = require("../../db");
const { types } = require("../../type");

const getTypes = async () => {
  const propertyTypes = await PropertyType.findAll({
    // attributes: ["type"], // Especificar los campos que deseas obtener en la respuesta

    // include: Property, // Incluir el modelo Property en la consulta
  });

  if (propertyTypes.length <= 0) {
    const typesToCreate = types.map((prop) => {
      return {
        id: prop.id,
        type: prop.type,
      };
    });

    await PropertyType.bulkCreate(typesToCreate);
    return typesToCreate;
  }

  return propertyTypes;
};

module.exports = { getTypes };

// const { PropertyType } = require("../../db");
// const { types } = require("../../type");

// const getTypes = async () => {
//   // Crear tipos de propiedades si no existen
//   if (types.length > 0) {
//     const existingTypes = await PropertyType.findAll({ attributes: ["type", "id"] });
//     const existingTypeNames = existingTypes.map((type) => type.type);

//     const typesToCreate = types.filter((type) => !existingTypeNames.includes(type.type));
//     await PropertyType.bulkCreate(typesToCreate);
//   }

//   // Obtener todos los tipos de propiedades
//   const propertyTypes = await PropertyType.findAll();

//   return propertyTypes;
// };

// module.exports = { getTypes };

// Con esta modificación, primero se verifica si existen tipos de propiedades en la base de datos. Si no existen, se filtran los tipos que aún no han sido creados y se realiza la operación de bulkCreate para crearlos. Luego, se realiza la consulta findAll para obtener todos los tipos de propiedades (independientemente de si se crearon nuevos tipos o no). Esto asegura que primero se creen los tipos que faltan y luego se obtengan todos los tipos existentes en la base de datos.