// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Card.css";

// const Card = ({ id, title, image, price, operation }) => {
//   const getOperationClass = (operation) => {
//     if (operation.includes("Venta")) {
//       return "sale";
//     } else if (operation.includes("Alquiler")) {
//       return "rent";
//     } else if (operation.includes("Alquiler Temporario")) {
//       return "temp";
//     } else {
//       return "";
//     }
//   };

//   const operationClass = getOperationClass(operation);

//   return (
//     <div className="card my-3 mx-2">
//       <div className="position-relative">
//         <Link to={`/properties/${id}`}>
//           <div className="card-image-container">
//             <img className="card-img-top" src={image} alt={title} />
//           </div>
//         </Link>
//         <span className={`badge text-white operation-label ${operationClass}`}>
//           {operation.join(", ")}
//         </span>
//       </div>
//       <div className="card-body">
//         <h5 className="card-title">{title}</h5>
//         <h5 className="card-text">Precio: ${price}</h5>
//         <Link to={`/properties/${id}`} className="btn btn-outline-secondary">
//           Consultar
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React from "react";
import { Link } from "react-router-dom";
import imageNotFound from "../Detail/notFound.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";

const Card = ({
  id,
  title,
  coverImage,
  operation,
  neighborhood,
  bathrooms,
  bedrooms,
}) => {
  // console.log(title, image, neighborhood, bedrooms, bathrooms);
  const capitalizedTitle = title.toUpperCase();

  return (
    <div className="cardContainer">
      <div className="position-relative">
        <Link to={`/properties/${id}`}>
          <div className="card-image-container">
            {coverImage === null || coverImage === "" ? (
              <img
                className="card-img-top"
                src={imageNotFound}
                alt={"Not Found"}
              />
            ) : (
              <img
                className="card-img-top"
                src={coverImage}
                alt={title}
                onError={(event) => {
                  event.target.src = imageNotFound;
                  event.onerror = null;
                  /* event.target.style.transform = "scale(0.5)"; */
                }}
              />
            )}
          </div>
        </Link>
        <div className="operation-labels">
          {operation.map((op) => (
            <span
              key={op}
              className={`badge text-white operation-label ${getOperationClass(
                op
              )}`}
            >
              {op}
            </span>
          ))}
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{capitalizedTitle}</h5>
        <h5 className="card-neighborhood">Barrio: {neighborhood}</h5>
        <h5 className="card-bedrooms">Habitaciones: {bedrooms}</h5>
        {/* <h5 className="item">baños: {bathrooms}</h5> */}

        {/* <h5 className="card-text">Precio: ${price}</h5> */}
        <Link to={`/properties/${id}`} className="btn btn-outline-secondary">
          Ver más
        </Link>

        {/* <a href={`/property/${id}#property-details`} className="btn btn-outline-secondary">Ver más</a> */}
      </div>
    </div>
  );
};

const getOperationClass = (operation) => {
  switch (operation) {
    case "Venta":
      return "sale";
    case "Alquiler":
      return "rent";
    case "Alquiler Temporario":
      return "temp";
    default:
      return "";
  }
};

export default Card;
