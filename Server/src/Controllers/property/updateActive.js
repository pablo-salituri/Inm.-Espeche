const { Property } = require("../../db");

const updateActive = async (id, active) => {
    try {
        const property = await Property.findOne({ where: { id: id } });
        if (!property) {
          throw new Error("Property not found");
        }
        await Property.update({ active: active }, { where: { id: id } });
        const updatedProperty = await Property.findOne({ where: { id: id } });
        return updatedProperty;
      } catch (error) {
        throw new Error(error.message);
      }
    };

    module.exports= updateActive;

