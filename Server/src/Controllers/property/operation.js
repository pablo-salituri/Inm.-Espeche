const { OperationType, Property } = require("../../db");
const { operation } = require("../../operationData");


let cachedOperationTypes = null; // Variable para almacenar el resultado en caché

const operationsType = async () => {
  if (cachedOperationTypes !== null) {
    // Si ya hay datos en caché, devolverlos directamente
    return cachedOperationTypes;
  }

  let operationTypes = await OperationType.findAll();

  if (operationTypes.length <= 0) {
    const operationTypesData = operation.map((type) => {
      return {
        // id: type.id,
        name: type.name,
      };
    });

    for (const typeData of operationTypesData) {
      await OperationType.create(typeData);
    }

    // Obtener los tipos de operación creados
    operationTypes = await OperationType.findAll();

    // Almacenar el resultado en caché para su posterior reutilización
    cachedOperationTypes = operationTypes;
  }

  return operationTypes;
};


module.exports = operationsType;

