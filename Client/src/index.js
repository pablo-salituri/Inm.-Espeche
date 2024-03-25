import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from "react-router-dom"; // pq uso rutas
import { Provider } from 'react-redux'; //envuelve todo con el estado global
import { Auth0Provider } from '@auth0/auth0-react'
import store from "./redux/store"
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';


import favicon from '../src/assets/logo7.png'; // Ruta al archivo de icono

const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
link.type = "image/x-icon";
link.rel = "shortcut icon";
link.href = favicon;
document.getElementsByTagName("head")[0].appendChild(link);

// -------------------------  AUTH 0----------------------------------

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID


// -------------------------------------------------------------------


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}

    //Mantiene la sesión iniciada mientras exista en el local Storage
    useRefreshTokens
    cacheLocation="localstorage"
  >
    <Provider store={store}>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
  // </React.StrictMode>
);

reportWebVitals();

