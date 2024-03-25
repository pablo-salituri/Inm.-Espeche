const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Property', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type:  DataTypes.TEXT,
      allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hasGarage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hasPatio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    streetAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      googleMapsLatitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      googleMapsLongitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      operation: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        // type: DataTypes.STRING,
        allowNull: true,
        defaultValue: [], // Valor por defecto como un array vacío
        validate: {
          isArray: function(value) {
            if (!Array.isArray(value)) {
              throw new Error('Operation must be an array');
            }
          },
        },
      },
    
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // por defecto, están activos
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // operationTypeId:{
      //     type: DataTypes.INTEGER,
      //     allowNull: true,
      //   },

      // propertyTypeId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
    //   user_id: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //       model: 'User',
    //       key: 'id',
    //     },
    //   },
    },
      {
        timestamps: false,
      }
  );
};
