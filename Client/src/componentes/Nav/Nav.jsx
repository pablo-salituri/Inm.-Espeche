import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Login from "../Authentication/Login";
import logo from "../../assets/logoRecortado.png";
import DropDownMenu from "./DropDownMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GiPadlock } from "react-icons/gi";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { filter_operation, handleLoginLogout } from "../../redux/actions";
import firebaseApp from "../Firebase/credentials";
import { getAuth, signOut } from "firebase/auth";
import "./Nav.css";
import styles from "./Nav.module.css";

const auth = getAuth(firebaseApp);

const Nav = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.loggedUser);
  const [width, setWidth] = useState(window.innerWidth);
  const [showDropDown, setShowDropDown] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const handleFilterByOperation = () => {
    const operationValue = "Alquiler"; // Esto debería ser el valor que se pasa como payload
    dispatch(filter_operation(operationValue));
  };

  const handleFilterByOperationVenta = () => {
    const operationValue = "Venta"; // Esto debería ser el valor que se pasa como payload
    dispatch(filter_operation(operationValue));
  };

  const handleFilterByOperationTemporario = () => {
    const operationValue = "Alquiler Temporario"; // Esto debería ser el valor que se pasa como payload
    dispatch(filter_operation(operationValue));
  };

  const handleDropDownMenu = (event) => {
    setShowDropDown(!showDropDown);
    const buttonClicked = event.currentTarget.getBoundingClientRect();
    const x = `${buttonClicked.x + buttonClicked.width - 3}px`;
    const y = `${buttonClicked.y + 5}px`;
    setButtonPosition({ x, y });
  };

  async function handleLogOut() {
    await signOut(auth);
    dispatch(handleLoginLogout({ operation: "handleloginlogout", uid: null }));
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.navContainer}>
      <Link className={styles.imageLink} to="/">
        <img src={logo} alt="Logo" className={styles.image} />
      </Link>

      {width < 769 ? (
        <>
          <button
            type="button"
            className={styles.menuBurgerButton}
            onClick={(event) => handleDropDownMenu(event)}
          >
            <FontAwesomeIcon icon={faBars} className="icono" />
          </button>
          {showDropDown && (
            <DropDownMenu
              x={buttonPosition.x}
              y={buttonPosition.y}
              logged={uid ? true : false}
              handleDropDownMenu={handleDropDownMenu}
              handleLogOut={handleLogOut}
            />
          )}
        </>
      ) : (
        <div className={styles.greater769Section}>
          <section className={styles.adminSection}>
            {uid ? (
              <>
                <Link
                  to="/admin/adminProps"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Panel de Admin
                </Link>
                <span className={styles.logout} onClick={() => handleLogOut()}>
                  Logout
                </span>
              </>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Login
              </Link>
            )}
            <GiPadlock
              style={{
                width: "20px",
                height: "20px",
                color: "white",
              }}
            />
          </section>
          <ul className={`navbar-nav ${styles.options}`}>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={handleFilterByOperation}
                to="/rent"
              >
                Alquilar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={handleFilterByOperationVenta}
                className="nav-link"
                to="/buy"
              >
                Comprar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={handleFilterByOperationTemporario}
                className="nav-link"
                to="/temporyRent"
              >
                Temporario
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;

// </button>
// <ul className="dropdown-menu dropdown-menu-custom">

// {/* <ul className="dropdown-menu"> */}
//   <li>
//     <Link className="dropdown-item p-2" to="/">
//       Inicio
//       {/* <hr></hr> */}
//     </Link>
//   </li>
//   <li>
//     <Link className="dropdown-item p-2" to="/rent">
//       Alquiler
//       {/* <hr></hr> */}

//     </Link>
//   </li>
//   <li>
//     <Link className="dropdown-item p-2" to="/buy">
//       Comprar
//       {/* <hr></hr> */}

//     </Link>
//   </li>
// </ul>
