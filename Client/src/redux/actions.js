import { GET_ALL_PROPERTY, 
  PROPERTY_DETAIL,
  CLEAN_PROPERTY_DETAIL,
  FILTER_PROPERTIES, 
  GET_TYPE,
  SEE_MORE_PROPS,
  FILTER_OPERATION, 
  GET_OPERATION, 
  // FILTER_TYPE_AND_OPERATION,
  SET_FILTERS,
 SET_CURRENT_PAGE,
 SAVE_SCROLL_POSITION,
 TOGGLE_PROPERTY_ACTIVE,
 HANDLE_LOGIN_LOGOUT
  // GET_MAPS
 } from "./actions-types";
import axios from "axios";

const backEndUrl = process.env.REACT_APP_BACKEND_URL;


export const getAllProperty = () => {
    return async function (dispatch) { //le aviso a mi fn que le hago algo async
        var json = await axios.get(`${backEndUrl}/properties/`)
        return dispatch({
            type: GET_ALL_PROPERTY,
            payload: json.data
        })
    }
}

export const filterProperties = (filteredProperties) => {
    return {
      type: FILTER_PROPERTIES,
      payload: filteredProperties,
    };
  };
  
  export const getType = () => {
    return async function (dispatch) {
        var response = await axios.get(`${backEndUrl}/types/`);
        return dispatch({
          type: GET_TYPE,
          payload: response.data,
        });
    };
  };
  
/* export const filterType = (type) => {
  return {
    type: FILTER_TYPE,
    payload: type,
  };
}; */

export const propertyDetail = (id) => {
    return async function (dispatch){
    var response = await axios.get(`${backEndUrl}/properties/${id}`)
    const propertyData= response.data


    dispatch ({
        type: PROPERTY_DETAIL,
        payload: propertyData,
    })
}
};


export const cleanPropertyDetail = () => {
    return {type: CLEAN_PROPERTY_DETAIL}
};


export const get_operation = () => {
    return async function (dispatch) {
        var response = await axios.get(`${backEndUrl}/operations/`);
        return dispatch({
            type: GET_OPERATION,
            payload: response.data
        })
    }
}

export const filter_operation = (operation) => {
    return{
        type: FILTER_OPERATION,
        payload:operation
    }
}

/* export const filterTypeAndOperation = (type, operation) => {
    return {
      type: FILTER_TYPE_AND_OPERATION,
      payload: {
        type: type,
        operation: operation,
      },
    };
  }; */
  


// actions.js

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

// En el archivo '../../redux/actions'

export const saveScrollPosition = (position) => ({
  type: SAVE_SCROLL_POSITION,
  payload: position,
});


export const togglePropertyActive = (id, active) => {
  return async function (dispatch) {
    await axios.put(`${backEndUrl}/properties/active/${id}`, {
      active: active,
    });

    const response = await axios.get(`${backEndUrl}/properties/`);
    const updatedProperties = response.data;

    return dispatch({
      type: TOGGLE_PROPERTY_ACTIVE,
      payload: { id, updatedProperties },
    });
  };
};



export const setFilters = (criteria) => {
  return async function (dispatch) {
    return dispatch({
      type: SET_FILTERS,
      payload: criteria
    })
  }
}

export const handleLoginLogout = (operation) => {
  return async function (dispatch) {
    return dispatch({
      type: HANDLE_LOGIN_LOGOUT,
      payload: operation
    })
  }
}

export const seeMoreProps = () => {
  return {type: SEE_MORE_PROPS}
};