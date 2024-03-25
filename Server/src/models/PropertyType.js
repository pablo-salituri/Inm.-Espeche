const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('PropertyType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "propertyTypeId"
      },

      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // icon: {
      //   type: DataTypes.TEXT,
      //   allowNull: true,
      // },
    },
      {
        timestamps: false,
      }
  );
};