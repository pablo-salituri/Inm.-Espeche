import { Link } from "react-router-dom";
import styles from "./UnknownRoute.module.css";

export default function UnknownRoute() {
  return (
    <div className={styles.unknownContainer}>
      <h2 style={{ fontSize: "35px" }}>La URL ingresada no existe.</h2>
      <Link to="/">
        <span style={{ textDecoration: "underline" }}>Volver al sitio</span>
      </Link>
    </div>
  );
}
