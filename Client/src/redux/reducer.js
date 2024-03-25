import {
  GET_ALL_PROPERTY,
  PROPERTY_DETAIL,
  CLEAN_PROPERTY_DETAIL,
  FILTER_PROPERTIES,
  GET_TYPE,
  SEE_MORE_PROPS,
  GET_OPERATION,
  FILTER_OPERATION,
  // FILTER_TYPE_AND_OPERATION,
  SET_FILTERS,
  SET_CURRENT_PAGE,
  SAVE_SCROLL_POSITION,
  TOGGLE_PROPERTY_ACTIVE,
  HANDLE_LOGIN_LOGOUT
} from "./actions-types";

const initialState = {
  properties: [],
  detail: [],
  filteredProperties: [],
  types: [],
  operations: [],
  currentPage: 1,
  propertiesPerPage: 3,
  scrollPosition: 0,
  firstRender: true,
  filtersApplied:{operation:'all', type:'all', bedrooms:'all'},
  loggedUser:null
  // filteredOperations: [],
};

const reducer = (state = initialState, action) => {
  // let filteredOperations = [];

  switch (action.type) {
    case GET_ALL_PROPERTY:
    if (state.firstRender) {
      return {
        ...state,
        properties: action.payload,
        filteredProperties: action.payload,
        firstRender: false
      }}
    else return  {
      ...state,
      properties: action.payload,
      filteredProperties: action.payload,
      filtersApplied:{operation:'all', type:'all', bedrooms:'all'}
    }

    case FILTER_PROPERTIES:
      const searchTerm = action.payload.toLowerCase();
      const filteredProperties = state.properties.filter((property) => {
        return (
          property.title.toLowerCase().includes(searchTerm) ||
          property.description.toLowerCase().includes(searchTerm) ||
          property.neighborhood.toLowerCase().includes(searchTerm) ||
          // property.price.toString().includes(searchTerm)
          (property.price && property.price.toString().includes(searchTerm)) // Verificación de nulidad añadida
        );
      });
      return {
        ...state,
        filteredProperties: filteredProperties,
      };

    case GET_TYPE:
      return {
        ...state,
        types: action.payload,
      };

    /* case FILTER_TYPE:
      let filteredPropertiesByType = state.properties;
      if (action.payload !== "") {
        filteredPropertiesByType = state.properties.filter(
          (property) => property.propertyTypeId === parseInt(action.payload)
        );
      }
  
    
       
      return {
        ...state,
        filteredProperties: filteredPropertiesByType,
      }; */

      
    
      // Obtener las propiedades filtradas por tipo de operación
//   const filteredOperation = state.properties.filter((property) =>
//   property.operation.includes(action.operation)
// );

// // Intersectar los resultados de ambos filtrados
// const combinedFilteredProperties = filteredPropertiesByType.filter((property) =>
//   filteredOperation.includes(property)
// );

// return {
//   ...state,
//   filteredProperties: combinedFilteredProperties,
// };

    case PROPERTY_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case CLEAN_PROPERTY_DETAIL:
      return {
        ...state,
        detail: [],
      };

    case GET_OPERATION:
      return {
        ...state,
        operations: action.payload,
        // filteredOperations: action.payload, // Inicialmente, las operaciones filtradas son las mismas que las operaciones sin filtrar
      };

    
      case FILTER_OPERATION:
        // console.log('Action payload:', action.payload);
        const filteredPropertiesByOperation = state.properties.filter((property) =>
          property.operation.includes(action.payload)
        );
        // console.log('Filtered properties:', filteredPropertiesByOperation);
        return {
          ...state,
          filteredProperties: filteredPropertiesByOperation,
        };
      
      // case FILTER_OPERATION:
      //   const { operation } = action.payload;
        
      //   const filteredPropertiesByOperation = state.properties.filter((property) =>
      //     (operation === "" || property.operation.includes(operation)) &&
      //     (state.filteredProperties.length === 0 || state.filteredProperties.includes(property))
      //   );
      //   return {
      //     ...state,
      //     filteredProperties: filteredPropertiesByOperation,
      //   }
      /* case FILTER_TYPE_AND_OPERATION:
  const filteredProp = state.properties.filter((property) => {
    const matchesType = property.propertyTypeId === parseInt(action.payload.type);
    const matchesOperation = property.operation.includes(action.payload.operation);
    return matchesType && matchesOperation;
  });
  return {
    ...state,
    filteredProperties: filteredProp,
  }; */

  case SET_CURRENT_PAGE:
    return {
      ...state,
      currentPage: action.payload,
    };

    case SAVE_SCROLL_POSITION:
  return {
    ...state,
    scrollPosition: action.payload, // Actualiza la posición de desplazamiento en el estado
  };

  case TOGGLE_PROPERTY_ACTIVE:
    const updatedProperties = state.filteredProperties.map((property) =>
    property.id === action.payload.id ? { ...property, active: !property.active } : property
  );
  return {
    ...state,
    properties: action.payload.updatedProperties,
    filteredProperties: updatedProperties,
  };

  case SET_FILTERS:
  return {
    ...state,
    filtersApplied: action.payload,
  };

  case SEE_MORE_PROPS:
  return {
    ...state,
    propertiesPerPage: state.propertiesPerPage + 6,
  };

  case HANDLE_LOGIN_LOGOUT:
    const {operation, uid} = action.payload
  return {
    ...state,
    loggedUser: operation === 'login' ? uid : null
  };

  default:
    return { ...state };

  }
};

export default reducer;
