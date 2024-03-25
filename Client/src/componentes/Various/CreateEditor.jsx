import { useState } from "react";
import Sidebar from "../dashboard/Sideb";
import { MdError } from "react-icons/md";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import firebaseApp from "../Firebase/credentials";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import styles from "./CreateEditor.module.css";

const auth = getAuth(firebaseApp);

export default function CreateEditor() {
  const firestore = getFirestore(firebaseApp);

  const initialData = {
    name: "",
    surname: "",
    email: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
  };
  const [data, setData] = useState(initialData);
  const [showSideBar, setShowSideBar] = useState(true);

  const [passwordVisible, setPasswordVisible] = useState(false);

  function inputChange(event) {
    const field = event.target.id;
    const value = event.target.value;

    setData({ ...data, [field]: value });
  }

  async function createUSer(event) {
    event.preventDefault();

    try {
      // Se crea el usuario
      const infoUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(infoUser);

      // Con la información del usuario se escribe la BBDD
      const uid = infoUser.user.uid;
      const docuRef = doc(firestore, `usuarios/${uid}`);

      setDoc(docuRef, {
        name: data.name,
        surname: data.surname,
        email: data.email,
        // password: data.password,
        role: "editor",
        status: "enabled",
      });

      Swal.fire({
        text: "Editor creado con éxito.",
        icon: "success",
        allowOutsideClick: false,
      }).then(() => setData(initialData));
    } catch (error) {
      Swal.fire({
        text: "Error al crear editor.",
        icon: "error",
        allowOutsideClick: false,
      });
    }
  }

  function setButton() {
    if (Object.values(data).some((field) => field === "")) return true;
    if (data.email !== data.repeatEmail) return true;
    if (data.password !== data.repeatPassword) return true;
    if (data.password.length < 6 && data.repeatPassword.length < 6) return true;
  }

  return (
    <div className={styles.createEditorContainer}>
      {showSideBar && <Sidebar setShowSideBar={setShowSideBar} />}
      <section className={styles.createSectionOuter}>
        <button
          type="button"
          className={styles.menuBurgerButton}
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <FontAwesomeIcon icon={faBars} className={styles.icon} />
        </button>
        <div className={styles.createSectionInner}>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.70)",
              borderRadius: "8px",
              padding: "5% 3%",
            }}
          >
            <h1 className="h1">Crear Editor</h1>
            <form className={styles.formEdit} onSubmit={createUSer}>
              <span>Nombre</span>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(event) => inputChange(event)}
                autoComplete="off"
              />

              <span>Apellido</span>
              <input
                type="text"
                id="surname"
                value={data.surname}
                onChange={(event) => inputChange(event)}
                autoComplete="off"
              />

              <section className={styles.credentials}>
                <div className={styles.field}>
                  <span>Email</span>
                  <input
                    type="text"
                    id="email"
                    value={data.email}
                    onChange={(event) => inputChange(event)}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.field}>
                  <span>Repetir Email</span>

                  <input
                    type="text"
                    id="repeatEmail"
                    value={data.repeatEmail}
                    onChange={(event) => inputChange(event)}
                    autoComplete="off"
                  />
                </div>

                {data.email !== "" &&
                  data.repeatEmail !== "" &&
                  data.email !== data.repeatEmail && (
                    <MdError className={styles.errorIcon} />
                  )}

                {data.email !== "" &&
                  data.repeatEmail !== "" &&
                  data.email === data.repeatEmail && (
                    <FaCheckCircle
                      className={styles.errorIcon}
                      style={{ color: "green" }}
                    />
                  )}
              </section>

              <section className={styles.credentials}>
                <div className={styles.field}>
                  <span>Contraseña</span>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    value={data.password}
                    onChange={(event) => inputChange(event)}
                    autoComplete="off"
                  />
                </div>

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

                <div className={styles.field}>
                  <span>Repetir Contraseña</span>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="repeatPassword"
                    value={data.repeatPassword}
                    onChange={(event) => inputChange(event)}
                    autoComplete="off"
                  />
                </div>

                {data.password !== "" &&
                  data.repeatPassword !== "" &&
                  data.password !== data.repeatPassword && (
                    <MdError className={styles.errorIcon} />
                  )}

                {data.password !== "" &&
                  data.repeatPassword !== "" &&
                  data.password === data.repeatPassword && (
                    <FaCheckCircle
                      className={styles.errorIcon}
                      style={{ color: "green" }}
                    />
                  )}
              </section>

              <p
                className={styles.warning}
                style={{
                  visibility:
                    data.password !== "" &&
                    data.repeatPassword !== "" &&
                    data.password.length < 6
                      ? "visible"
                      : "hidden",
                }}
              >
                La contraseña debe contener al menos 6 caracteres
              </p>

              <button
                type="submit"
                className={styles.submit}
                style={
                  setButton()
                    ? { backgroundColor: "#cbcbcb", border: "#cbcbcb" }
                    : {}
                }
                disabled={setButton()}
              >
                Crear
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
