import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProperties, getAllProperty } from "../../redux/actions";
import { Form, FormControl, Button } from "react-bootstrap";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (value === "") {
      dispatch(getAllProperty());
    } else {
      dispatch(filterProperties(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterProperties(searchTerm));
  };

  return (
    <Form onSubmit={handleSubmit} className="b">
      <div className="d-flex container-searchbar">
        <FormControl
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
          className=""
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            // boxShadow: "none",
          }}
        />
        <Button
          variant="secondary"
          type="submit"
          className="ml-2 button-buscar"
        >
          BUSCAR
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { filterProperties, getAllProperty } from "../../redux/actions";
// import { Form } from "react-bootstrap";

// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = (e) => {
//     const { value } = e.target;
//     setSearchTerm(value);

//     if (value === "") {
//       dispatch(getAllProperty());
//     } else {
//       dispatch(filterProperties(value));
//     }
//   };

//   return (
//     <div>
//       <Form
//         style={{
//             background: "transparent", position: "relative",
//             // bottom: "1px"
//            }}
//       >
//         <Form.Control
//           type="text"
//           placeholder="Buscar..."
//           value={searchTerm}
//           onChange={handleSearch}
//           style={{ backgroundColor: "rgba(255, 255, 255, 0.7)",
//           // border: "solid",
//            boxShadow: "none" }}
//           className="col col-sm-8 col-md- col-lg-4"
//         />
//       </Form>
//     </div>
//   );
// };

// export default SearchBar;
