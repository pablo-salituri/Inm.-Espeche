import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";  

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //sirve para conectarnos con la extension del navegador reduxdevtools

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware)) //conecto el thunk para poder hacer las peticiones
);

export default store;