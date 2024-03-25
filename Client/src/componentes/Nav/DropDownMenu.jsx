import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./DropDownMenu.module.css";

export default function DropDownMenu({
  x,
  y,
  logged,
  handleDropDownMenu,
  handleLogOut,
}) {
  const [position] = useState({ left: parseInt(x, 10), top: y });
  const [containerWidth, setContainerWidth] = useState(null);
  const dropDownContainerRef = useRef(null);

  useEffect(() => {
    if (dropDownContainerRef.current) {
      const width = dropDownContainerRef.current.offsetWidth;
      setContainerWidth(width);
    }
  }, []);

  return (
    <div
      ref={dropDownContainerRef}
      className={styles.dropDownContainer}
      style={{
        left: position.left - containerWidth,
        top: position.top,
        zIndex: "3",
      }}
    >
      <ul className={styles.list}>
        <li>
          <Link className="nav-link" to="/" onClick={handleDropDownMenu}>
            Inicio
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/rent" onClick={handleDropDownMenu}>
            Alquilar
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/buy" onClick={handleDropDownMenu}>
            Comprar
          </Link>
        </li>
        <li>
          <Link
            className="nav-link"
            to="/temporyRent"
            onClick={handleDropDownMenu}
          >
            Temporario
          </Link>
        </li>
        <hr className={styles.separator} />
        {logged ? (
          <>
            <li>
              <Link
                to="/admin/adminProps"
                className="nav-link"
                onClick={handleDropDownMenu}
              >
                Panel de Admin
              </Link>
            </li>
            <hr className={styles.separator} />
            <li onClick={() => handleLogOut()}>Logout</li>
          </>
        ) : (
          <li>
            <Link className="nav-link" to="/login" onClick={handleDropDownMenu}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
