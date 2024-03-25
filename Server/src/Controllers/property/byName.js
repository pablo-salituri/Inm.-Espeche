const { Property } = require ("../../db");
const { Op } = require ("sequelize");

const byName = async (title) => {
    if (typeof title !== "string") {
        throw Error ("Invalid iput : name must be a string");
    }
    const dataName = await Property.findAll({
where : {
    title : { [Op.iLike]: `%${title}%`},
},
})
if (dataName.length) return dataName;
throw Error (`There is no property whith the name : ${title}`)
}

module.exports = byName;