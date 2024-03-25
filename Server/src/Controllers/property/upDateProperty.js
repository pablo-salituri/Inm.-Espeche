const { Property } = require("../../db");

const upDateProperty = async (id, body) => {
  let {
    title,
    description,
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
    propertyTypeId,
    image,
    coverImage,
    operation,
  } = body;

  try {
    const property = await Property.findOne({ where: { id } });

    if (property) {
      await property.update({
        title,
        description,
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
        propertyTypeId,
        image,
        coverImage,
        operation,
      });
      return property;
    } else {
      throw new Error("the property specified was not found");
    }
  } catch (error) {
    throw new Error("There was an error updating the product");
  }
};
module.exports = upDateProperty;
