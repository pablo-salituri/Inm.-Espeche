import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getType,
  get_operation,
  setFilters,
  // filterTypeAndOperation,
} from "../../redux/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Filters.css";
import { Button } from "react-bootstrap";

const Filters = () => {
  const dispatch = useDispatch();

  const filtrosTipos = useSelector((state) => state.types);
  const operaciones = useSelector((state) => state.operations);
  const filtersOnRedux = useSelector((state) => state.filtersApplied);

  const [filtersApplied, setFiltersApplied] = useState(filtersOnRedux);
  const navigate = useNavigate();

  function handleLocalFilters(filter, value) {
    if (filter === "bedrooms" && value !== "all") value = parseInt(value);
    setFiltersApplied({ ...filtersApplied, [filter]: value });
  }

  const handleFilterClick = () => {
    dispatch(setFilters(filtersApplied));
    navigate("/properties/");
  };

  useEffect(() => {
    dispatch(getType());
    dispatch(get_operation());
    setFiltersApplied(filtersOnRedux);
  }, [dispatch, filtersOnRedux]);

  return (
    <div className="filters-container containerInFilter">
      <select
        id="select1"
        className="form-select custom-select"
        value={filtersApplied.operation}
        onChange={(event) =>
          handleLocalFilters("operation", event.target.value)
        }
      >
        <option className="operacion" value="all">
          Todas las Operaciones
        </option>
        {operaciones.map((op) => (
          <option key={op.id} value={op.name}>
            {op.name}
          </option>
        ))}
      </select>

      <select
        id="select2"
        className="form-select custom-select"
        value={filtersApplied.type}
        onChange={(event) => handleLocalFilters("type", event.target.value)}
      >
        <option className="tipo" value="all">
          Todos los tipos
        </option>
        {filtrosTipos.map((type) => (
          <option key={type.id} value={type.type}>
            {type.type}
          </option>
        ))}
      </select>

      <select
        id="select3"
        className="form-select custom-select"
        value={filtersApplied.bedrooms}
        onChange={(event) => handleLocalFilters("bedrooms", event.target.value)}
      >
        <option className="tipo" value="all">
          Todas las habitaciones
        </option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>

      <Button
        id="fil"
        variant="secondary"
        type="submit"
        className="ml-2 button-filtrar"
        onClick={handleFilterClick}
      >
        FILTRAR
      </Button>

      {/* <button onClick={handleFilterClick}>Filter</button> */}
    </div>
  );
};

// const Filters = () => {
//   const dispatch = useDispatch();
//   const filtrosTipos = useSelector((state) => state.types);
//   const operaciones = useSelector((state) => state.operations);

//   const [selectedType, setSelectedType] = useState("");
//   const [selectedOp, setSelectedOp] = useState("");
//   const navigate = useNavigate();

//   const handleTypeChange = (event) => {
//     const type = event.target.value;
//     setSelectedType(type);
//   };

//   const handleOperation = (event) => {
//     const operation = event.target.value;
//     setSelectedOp(operation);
//   };

//   const handleFilterClick = () => {
//     if (selectedType || selectedOp) {
//       const queryParams = [];
//       if (selectedType) {
//         dispatch(filterType(selectedType));
//         queryParams.push(`type=${selectedType}`);
//       }
//       if (selectedOp) {
//         dispatch(filter_operation(selectedOp));
//         queryParams.push(`operation=${selectedOp}`);
//       }
//       const queryString = queryParams.join("&");
//       navigate(`/properties/?${queryString}`);
//     }
//   };

//   useEffect(() => {
//     dispatch(getType());
//     dispatch(get_operation());
//   }, [dispatch]);

//   return (
//     <div>
//       <select
//         className="form-select"
//         value={selectedOp}
//         onChange={handleOperation}
//         style={{
//           backgroundColor: "rgba(255, 255, 255, 0.7)",
//           boxShadow: "none",
//         }}
//       >
//         <option value="">Tipos de operaciones</option>
//         {operaciones.map((op) => (
//           <option key={op.id} value={op.name}>
//             {op.name}
//           </option>
//         ))}
//       </select>

//       <select
//         className="form-select"
//         value={selectedType}
//         onChange={handleTypeChange}
//         style={{
//           backgroundColor: "rgba(255, 255, 255, 0.7)",
//           boxShadow: "none",
//         }}
//       >
//         <option value="">Tipos de propiedades</option>
//         {filtrosTipos.map((type) => (
//           <option key={type.id} value={type.id}>
//             {type.type}
//           </option>
//         ))}
//       </select>

//       <button onClick={handleFilterClick}>Filter</button>
//     </div>
//   );
// };

// const Filters = () => {
//   const dispatch = useDispatch();
//   const filtrosTipos = useSelector((state) => state.types);
//   const operaciones = useSelector((state) => state.operations);

//   const [selectedType, setSelectedType] = useState("");
//   const [selectedOp, setSelectedOp] = useState("");

//   const handleTypeChange = (event) => {
//     const type = event.target.value;
//     setSelectedType(type);
//     dispatch(filterType(type));

//     // Si el filtro de operación está seleccionado, aplicar ambos filtros
//     if (selectedOp) {
//       dispatch(filterTypeAndOperation(type, selectedOp));
//     }
//   };

//   const handleOperation = (event) => {
//     const operation = event.target.value;
//     setSelectedOp(operation);
//     dispatch(filter_operation(operation));

//     // Si el filtro de tipo está seleccionado, aplicar ambos filtros
//     if (selectedType) {
//       dispatch(filterTypeAndOperation(selectedType, operation));
//     }
//   }

//   useEffect(() => {
//     dispatch(getType());
//     dispatch(get_operation())
//   }, [dispatch]);

//   return (
//     <div>
//       <select
//         className="form-select"
//         value={selectedOp}
//         onChange={handleOperation}
//         style={{
//           backgroundColor: "rgba(255, 255, 255, 0.7)",
//           boxShadow: "none",
//         }}
//       >
//         <option value="">Tipos de operaciones</option>
//         {operaciones.map((op) => (
//           <option key={op.id} value={op.name}>
//             {op.name}
//           </option>
//         ))}
//       </select>

//       <select
//         className="form-select"
//         value={selectedType}
//         onChange={handleTypeChange}
//         style={{
//           backgroundColor: "rgba(255, 255, 255, 0.7)",
//           boxShadow: "none",
//         }}
//       >
//         <option value="">Tipos de propiedades</option>
//         {filtrosTipos.map((type) => (
//           <option key={type.id} value={type.id}>
//             {type.type}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// const Filters = () => {
//   const dispatch = useDispatch();
//   const filtrosTipos = useSelector((state) => state.types);
//   const operaciones = useSelector((state) => state.operations);

//   const [selectedType, setSelectedType] = useState("");
//   const [selectedOp, setSelectedOp] = useState("");

//   const handleTypeChange = (event) => {
//     const type = event.target.value;
//     setSelectedType(type);
//     dispatch(filterType(type));
//     // dispatch(filterTypeAndOperation(type, selectedOp));
//   };

//   const handleOperation = (event) => {
//     const operation = event.target.value;
//     setSelectedOp(operation);
//     dispatch(filter_operation(operation))
//     // dispatch(filterTypeAndOperation(selectedType, operation));
//   }

//   useEffect(() => {
//     dispatch(getType());
//     dispatch(get_operation())
//   }, [dispatch]);

//   return (
//     <div>
//       <select className="form-select" value={selectedOp} onChange={handleOperation}
//           style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", boxShadow: "none" }}
//           >
//         <option value="">Tipos de operaciones</option>
//         {operaciones.map((op) => (
//           <option key={op.id} value={op.name}>
//             {op.name}
//           </option>
//         ))}
//       </select>

//       <select className="form-select" value={selectedType} onChange={handleTypeChange}
//           style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", boxShadow: "none" }}
//           >
//         <option value="">Tipos de propiedades</option>
//         {filtrosTipos.map((type) => (
//           <option key={type.id} value={type.id}>
//             {type.type}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

export default Filters;
