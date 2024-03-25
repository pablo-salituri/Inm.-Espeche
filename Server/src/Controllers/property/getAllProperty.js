// const { Property, OperationType } = require("../../db");
// const { data } = require("../../data");
// const fs = require('fs');

// let cachedProperties = null; // Variable para almacenar el resultado en caché

// const getAllProperties = async () => {
//   if (cachedProperties !== null) {
//     // Si ya hay datos en caché, devolverlos directamente
//     return cachedProperties;
//   }

//   const propertiesFromDB = await Property.findAll();

//   if (propertiesFromDB.length === 0) {
//     const createdProperties = await Property.bulkCreate(data);

//     const operationTypes = await OperationType.findAll();

//     for (const property of createdProperties) {
//       const { operation } = property;
//       const operationTypeIds = operation.map((op) => {
//         const foundType = operationTypes.find((type) => type.name === op);
//         return foundType ? foundType.id : null;
//       });
//       await property.addOperationTypes(operationTypeIds);
//     }

//     cachedProperties = createdProperties; // Almacenar el resultado en caché

//     return createdProperties;
//   }

//   cachedProperties = propertiesFromDB; // Almacenar el resultado en caché
// console.log(cachedProperties)
//   // Combina las propiedades del JSON y de la base de datos
//   const combinedProperties = [...data, ...propertiesFromDB];
//   console.log(combinedProperties);

//   return combinedProperties;
  
// };

// module.exports = getAllProperties;

const { Property, OperationType } = require("../../db");
const { data } = require("../../data");
const fs = require('fs');

const data1 = data.map((property) => {
  return {
 
    title:property.title,
    description: property.description,
    image: property.image,
    coverImage: property.coverImage,
    price:property.price,
    neighborhood:property.neighborhood,
    bedrooms:property.bedrooms,
    bathrooms:property.bathrooms,
    hasGarage: property.hasGarage,
    hasPatio:property.hasPatio,
    streetAddress:property.streetAddress,
    googleMapsLatitude:property.googleMapsLatitude,
    googleMapsLongitude:property.googleMapsLongitude,
    type:property.type,
    active: property.active,
    operation:property.operation,
    propertyTypeId:property.propertyTypeId,
  };
});

const getAllProperties = async () => {
  const properties = await Property.findAll();
  
  if (properties.length === 0) {
    const propertyDb = await Property.bulkCreate(data1);
    return propertyDb;
  }
  return properties;
}

module.exports = getAllProperties;

// let cachedProperties = null; // Variable para almacenar el resultado en caché

// const getAllProperty = async () => {
//   if (cachedProperties !== null) {
//     // Si ya hay datos en caché, devolverlos directamente
//     return cachedProperties;
//   }

//   const properties = await Property.findAll();

//   if (properties.length === 0) {
//     const createdProperties = await Property.bulkCreate(data);

//     const operationTypes = await OperationType.findAll();

//     for (const property of createdProperties) {
//       const { operation } = property;
//       const operationTypeIds = operation.map((op) => {
//         const foundType = operationTypes.find((type) => type.name === op);
//         return foundType ? foundType.id : null;
//       });
//       await property.addOperationTypes(operationTypeIds);
//     }

//     cachedProperties = createdProperties; // Almacenar el resultado en caché
//     return createdProperties;
//   }

//   cachedProperties = properties; // Almacenar el resultado en caché
//   console.log(cachedProperties)

//   return properties;
// };

// module.exports = getAllProperty;

// const { Property, OperationType } = require("../../db");
// const { data } = require("../../data");
// const { operation } = require("../../operationData");
// const fs = require('fs');

// let cachedProperties = null; // Variable para almacenar el resultado en caché

// const getAllProperty = async () => {
//   if (cachedProperties !== null) {
//     // Si ya hay datos en caché, devolverlos directamente
//     return cachedProperties;
//   }

//   const properties = await Property.findAll();

//   if (properties.length === 0) {
//     const data1 = data.map((property) => {
//       return {
//         ...property
//         // Otros atributos de la propiedad si los hay
//       };
//     });

//     const createdProperties = await Property.bulkCreate(data1);

//     const operationTypes = await OperationType.findAll();

//     for (const property of createdProperties) {
//       if (typeof property.operation === 'string') {
//         // Si property.operation es una cadena de texto, convertirlo a un array con un solo elemento
//         property.operation = [property.operation];
//       }

//       for (const operationName of property.operation) {
//         const operationType = operationTypes.find((type) => type.name === operationName);
//         if (operationType) {
//           await property.addOperationType(operationType);
//         }
//       }
//     }

//     cachedProperties = createdProperties; // Almacenar el resultado en caché

//     return createdProperties;
//   }

//   cachedProperties = properties; // Almacenar el resultado en caché

//   return properties;
// };

// module.exports = 
//   getAllProperty