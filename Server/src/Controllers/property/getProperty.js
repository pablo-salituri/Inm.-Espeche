const { Property } = require ("../../db");

const getPropertyId = async (id) => {
    try {
        const property = await Property.findByPk(id);
        if (!property) throw Error ("Property not found");
        return property
    } catch (error) {
        return error.message
        
    }
}


module.exports = getPropertyId