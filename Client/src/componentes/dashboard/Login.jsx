import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import firebaseApp from "../Firebase/credentials";
import { handleLoginLogout } from "../../redux/actions";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import RecoverPass from "../Various/RecoverPass";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import styles from "./Login.module.css";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Login = ({ setLoginStatus }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [tabs, setTabs] = useState("Login");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe y la página se refresque

    /* Como la eliminación de usuarios se hace manipulando la firestore, pero NO el
    authenticator, primero reviso si el usuario existe en la firestore y está habilitado*/
    try {
      const usersFromFS = [];
      const querySnapshot = await getDocs(collection(firestore, "usuarios"));
      querySnapshot.forEach((doc) => {
        usersFromFS.push({
          status: doc.data().status,
          email: doc.data().email,
        });
      });
      const userExists = usersFromFS.some(
        (userFromFS) =>
          userFromFS.email === user && userFromFS.status === "enabled"
      );
      if (userExists) {
        setPersistence(auth, browserSessionPersistence);
        const response = await signInWithEmailAndPassword(auth, user, password);
        dispatch(
          handleLoginLogout({ operation: "login", uid: response.user.uid })
        );
        navigate("/admin/adminProps");
      } else
        Swal.fire({
          text: "Credenciales incorrectas",
          icon: "error",
          allowOutsideClick: false,
        });
    } catch (error) {
      Swal.fire({
        text: "Credenciales incorrectas",
        icon: "error",
        allowOutsideClick: false,
      });
    }
  };

  return (
    <div className={styles.containerLogin}>
      <form
        className={styles.formLogin}
        onSubmit={tabs === "Login" ? handleLogin : undefined}
      >
        <section className={styles.tabs}>
          <p
            className={styles.tab}
            style={
              tabs === "Login" ? { borderBottom: "3px solid #ad9494" } : {}
            }
            onClick={() => setTabs("Login")}
          >
            Iniciar Sesión
          </p>
          <p
            className={styles.tab}
            style={
              tabs === "Recover" ? { borderBottom: "3px solid #ad9494" } : {}
            }
            onClick={() => setTabs("Recover")}
          >
            Recuperar Contraseña
          </p>
        </section>

        {tabs === "Login" ? (
          <>
            <h1 className={styles.h1}>Inicio de Sesión</h1>
            <input
              className={styles.loginName}
              type="text"
              placeholder="Nombre de usuario"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
              autoComplete="off"
            />
            <section className={styles.passwordSection}>
              <input
                className={styles.loginPass}
                // type="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="off"
              />
              {passwordVisible ? (
                <FaEyeSlash
                  className={styles.eye}
                  onClick={() => setPasswordVisible(false)}
                />
              ) : (
                <FaEye
                  className={styles.eye}
                  onClick={() => setPasswordVisible(true)}
                />
              )}
            </section>
            <button
              className={styles.submit}
              type="submit"
              disabled={!user || !password}
            >
              Iniciar Sesión
            </button>{" "}
          </>
        ) : (
          <RecoverPass />
        )}
      </form>
    </div>
  );
};

export default Login;
