import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";
import styles from "./CardDash.module.css";
// import axios from "axios";
import { togglePropertyActive } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const CardDashDelete = ({ id }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const isDeleted = JSON.parse(localStorage.getItem(`property${id}`));
    setIsDeleted(isDeleted || false); // si el valor recuperado es null o algún otro valor falsy, entonces false se utilizará como valor predeterminado
  }, [id]);

  const toggleActive = (id, active) => {
    try {
      dispatch(togglePropertyActive(id, active));
      // setIsDeleted(!isDeleted);
      console.log("successfully modified property");

      // Guarda el valor en localStorage
      // localStorage.setItem(`property${id}`, JSON.stringify(!isDeleted));
    } catch (error) {
      console.error("Error changing property activation", error);
    }
  };

  const onClose = async () => {
    setIsDeleted(false);
    await toggleActive(id, true);

    // Guarda el valor en localStorage
    localStorage.setItem(`property${id}`, JSON.stringify(false));
  };

  const handleDelete = async () => {
    await toggleActive(id, false);

    // Guarda el valor en localStorage
    localStorage.setItem(`property${id}`, JSON.stringify(true));
  };

  const handleOnClick = (e) => {
    e.stopPropagation();
    setIsDeleted(!isDeleted);
  };

  const cardClassName = `${styles.containerCard} ${
    isDeleted ? styles.opacidad : ""
  }`;

  return (
    <div className={cardClassName} onClick={handleOnClick}>
      {isDeleted ? (
        <button className={styles.eliminar} onClick={onClose}>
          {" "}
          <VscDebugRestart />{" "}
        </button>
      ) : (
        <button className={styles.eliminar} onClick={handleDelete}>
          {" "}
          <MdDelete />{" "}
        </button>
      )}
    </div>
  );
};

export default CardDashDelete;

// const CardDashDelete = ({ id }) => {
//   const [isDeleted, setIsDeleted] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const isDeleted = JSON.parse(localStorage.getItem(`property${id}`));
//     setIsDeleted(isDeleted || false);
//   }, [id]);

//   const toggleProperty = async (id, active) => {
//     try {
//       await axios.put(`http://localhost:3001/properties/active/${id}`, {
//         active: active,
//       });
//       setIsDeleted(!isDeleted);
//       console.log("successfully modified property");

//       // Guarda el valor en localStorage
//       localStorage.setItem(`property${id}`, JSON.stringify(!isDeleted));

//       // Despacha la acción para actualizar el estado en Redux
//       dispatch(togglePropertyActive(id, active));
//     } catch (error) {
//       console.error("Error changing property activation", error);
//     }
//   };

//   const onClose = async () => {
//     setIsDeleted(true);
//     await toggleProperty(id, true);

//     // Guarda el valor en localStorage
//     localStorage.setItem(`property${id}`, JSON.stringify(true));
//   };

//   const handleDelete = async () => {
//     await toggleProperty(id, false);

//     // Guarda el valor en localStorage
//     localStorage.setItem(`property${id}`, JSON.stringify(true));
//   };

//   const handleOnClick = (e) => {
//     e.stopPropagation();
//     setIsDeleted(!isDeleted);
//     console.log("isDeleted:", isDeleted);
//   };

//   const cardClassName = `${styles.containerCard} ${
//     isDeleted ? styles.opacidad : ""
//   }`;

//   return (
//     <div className={cardClassName} onClick={handleOnClick}>
//       {isDeleted ? (
//         <button className={styles.eliminar} onClick={onClose}>
//           {" "}
//           <VscDebugRestart />{" "}
//         </button>
//       ) : (
//         <button className={styles.eliminar} onClick={handleDelete}>
//           {" "}
//           <MdDelete />{" "}
//         </button>
//       )}
//     </div>
//   );
// };

// export default CardDashDelete;

// const CardDashDelete = ({ id }) => {
//   const [isDeleted, setIsDeleted] = useState(false);

//   useEffect(() => {
//     const isDeleted = JSON.parse(localStorage.getItem(`property_${id}`));
//     setIsDeleted(isDeleted || false);
//   }, [id]);

//   const togglePropertyActive = async (id, active) => {
//     try {
//       await axios.put(`/properties/${id}`, { active: active });
//       setIsDeleted(!isDeleted);
//       console.log("successfully modified property");

//       localStorage.setItem(`product_${id}`, JSON.stringify(!isDeleted));
//     } catch (error) {
//       console.error("Error changing property activation", error);
//     }
//   };

//   const onClose = async () => {
//     setIsDeleted(false);
//     await togglePropertyActive(id, true);
//     localStorage.setItem(`product_${id}`, JSON.stringify(false));
//   };

//   const handleDelete = async () => {
//     await togglePropertyActive(id, false);
//     localStorage.setItem(`product_${id}`, JSON.stringify(true));
//   };

//   const handleOnClick = (e) => {
//     e.stopPropagation();
//     setIsDeleted(!isDeleted);
//     console.log("isDeleted:", isDeleted);
//   };

//   // Renderiza el componente solo si no está eliminado
//   return !isDeleted ? (
//     <div className={styles.containerCard} onClick={handleOnClick}>
//       {isDeleted ? (
//         <button className={styles.eliminar} onClick={onClose}>
//           {" "}
//           <VscDebugRestart />{" "}
//         </button>
//       ) : (
//         <button className={styles.eliminar} onClick={handleDelete}>
//           {" "}
//           <MdDelete />{" "}
//         </button>
//       )}
//     </div>
//   ) : null;
// };

// export default CardDashDelete;
