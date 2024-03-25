const { Property, PropertyType, OperationType } = require("../../db");

const postProperty = async (property) => {
  let {
    title,
    description,
    image,
    price,
    neighborhood,
    bedrooms,
    bathrooms,
    hasGarage,
    hasPatio,
    streetAddress,
    googleMapsLatitude,
    googleMapsLongitude,
    type,
    active,
    operation,
    propertyTypeId,
    coverImage
  } = property;

  if (!title || !description ) {
    throw new Error(
      "Please provide title and description for the new property."
    );
  }
  console.log("Creating property:", property);

  try {
    const propertyType = await PropertyType.findByPk(propertyTypeId);

    if (!propertyType) {
      throw new Error("Invalid property type.");
    }

    const newProperty = await Property.create({
      title,
      description,
      image,
      price,
      neighborhood,
      bedrooms,
      bathrooms,
      hasGarage,
      hasPatio,
      streetAddress,
      googleMapsLatitude,
      googleMapsLongitude,
      type,
      propertyTypeId,
      operation,
      active: true,
      coverImage
    });




    // if (image && image.length > 0) {
    //   // Si tienes un modelo Image en tu base de datos:
    //   const images = await Image.bulkCreate(image.map((url) => ({ urls: [url] })));
    //   // Asocia las imágenes a la propiedad
    //   await newProperty.setImages(images);
    // }

    // if (operation && operation.length > 0) {
    //   // Asigna las operaciones a la propiedad
    //   const operationTypes = await OperationType.findAll();
    //   const operationTypeIds = operation.map((op) => {
    //     const foundType = operationTypes.find((type) => type.name === op);
    //     return foundType ? foundType.id : null;
    //   });
    //   await newProperty.setOperationTypes(operationTypeIds);
    // }

    return newProperty;
  } catch (error) {
    console.error("Failed to create property:", error);
    throw new Error("Failed to create property.");
  }
};

module.exports = postProperty;
