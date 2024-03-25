const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Image', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    urls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
      {
        timestamps: false,
      }
  );
};
