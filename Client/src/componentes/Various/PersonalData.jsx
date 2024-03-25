import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleLoginLogout } from "../../redux/actions";
import {
  getAuth,
  verifyBeforeUpdateEmail,
  signOut,
  updatePassword,
} from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import firebaseApp from "../Firebase/credentials";
import { FaRegEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import Sidebar from "../dashboard/Sideb";
import SmallPersonalData from "./SmallPersonalData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import styles from "./PersonalData.module.css";

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default function PersonalData() {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.loggedUser);

  const [showSideBar, setShowSideBar] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const [originalData, setOriginalData] = useState({
    name: null,
    email: null,
    surname: null,
    password: null,
  });

  const [hasEdition, setHasEdition] = useState({
    name: false,
    email: false,
    surname: false,
    password: false,
  });

  const [newData, setNewData] = useState({
    name: "",
    email: "",
    repeatEmail: "",
    surname: "",
    password: "",
    repeatPassword: "",
  });

  // Si se oprimen los botones de habilitar edición, se cambian los botones por inputs
  function enableEdit(field) {
    let updatedEdition = { ...hasEdition, [field]: true };

    if (field === "email") {
      updatedEdition = { ...updatedEdition, password: false };
      handleTrash("password");
    } else if (field === "password") {
      updatedEdition = { ...updatedEdition, email: false };
      handleTrash("email");
    }

    setHasEdition(updatedEdition);
  }

  function handleInputChange(event) {
    setNewData({
      ...newData,
      [event.target.name]: event.target.value,
    });
  }

  function handleTrash(field) {
    setHasEdition({ ...hasEdition, [field]: false });
    switch (field) {
      case "email":
        setNewData({ ...newData, email: "", repeatEmail: "" });
        break;
      case "password":
        setNewData({ ...newData, password: "", repeatPassword: "" });
        break;
      default:
        setNewData({ ...newData, [field]: "" });
    }
  }

  function setButton() {
    // Si no se cambió nada
    if (Object.values(hasEdition).every((field) => field === false))
      return true;

    // Si se habilitó alguna edición pero no se ingresó nada
    for (let prop in hasEdition) {
      if (hasEdition[prop] && newData[prop] === "") return true;
    }

    // Si los emails no coincidennewData
    if (newData.email !== newData.repeatEmail) return true;

    // Si los passwords no coincidennewData
    if (newData.password !== newData.repeatPassword) return true;

    // Si los passwords tienen menos de 6 caracteres
    if (
      hasEdition.password &&
      newData.password.length < 6 &&
      newData.repeatPassword.length < 6
    )
      return true;
  }

  // Cuando se confirman los cambios, se actualizan los campos correspondientes de la Firestore
  function updateFirestore(fields) {
    const updates = {};
    fields.map((field) => {
      updates[field] = newData[field];
      return null;
    });
    const docRef = doc(firestore, "usuarios", uid);
    updateDoc(docRef, updates)
      .then(() => {
        console.log("Updated In Firestore");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // La actualización del Email se hace aparte, porque pertenece al Authenticator
  function handleupdateEmail() {
    verifyBeforeUpdateEmail(auth.currentUser, newData.email)
      .then(() => {
        console.log("Email actualizado");
      })

      .catch((error) => {
        console.log(error);
      });
  }

  // La actualización del Password se hace aparte, porque pertenece al Authenticator
  function handleupdatePassword(newPassword) {
    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        console.log("Password actualizado");
      })

      .catch((error) => {
        console.log(error);
      });
  }

  // Confirmación de los cambios
  function submitChanges() {
    try {
      const changes = [];

      function handleSuccess() {
        Swal.fire({
          text: "Datos cambiados con éxito.",
          icon: "success",
          allowOutsideClick: false,
        })
          .then(() => {
            return signOut(auth);
          })
          .then(() => {
            setTimeout(() => {
              window.location.href = "/";
              dispatch(
                handleLoginLogout({ operation: "handleloginlogout", uid: null })
              );
            }, 300);
          });
      }

      if (newData.name && originalData.name !== newData.name)
        changes.push("name");
      if (newData.surname && originalData.surname !== newData.surname)
        changes.push("surname");
      if (newData.email && originalData.email !== newData.email)
        changes.push("email");

      changes.length && updateFirestore(changes);

      if (newData.password && originalData.password !== newData.password)
        handleupdatePassword(newData.password);
      if (newData.email && originalData.email !== newData.email)
        handleupdateEmail(/* ["email"] */);

      //Output de la función
      if (newData.email && originalData.email !== newData.email) {
        Swal.fire({
          title: "Revise su correo",
          text: "La dirección de correo no se actualizará hasta que confirme la nueva dirección.",
          icon: "warning",
          allowOutsideClick: false,
        }).then(() => {
          handleSuccess();
        });
      } else handleSuccess();
    } catch (error) {
      Swal.fire({
        text: "Error al actualizar los datos.",
        icon: "error",
        allowOutsideClick: false,
      });
    }
  }

  useEffect(() => {
    async function getData(uid) {
      const docuRef = doc(firestore, `usuarios/${uid}`);
      const docuCifrada = await getDoc(docuRef);
      const infoFinal = docuCifrada.data();
      const { status, role, ...infoRecortada } = infoFinal;
      setOriginalData(infoRecortada);
    }

    getData(uid);
  }, []);

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
    <div className={styles.personalDataContainer}>
      {showSideBar && <Sidebar setShowSideBar={setShowSideBar} />}
      <section className={styles.personalDataOuter}>
        <button
          type="button"
          className={styles.menuBurgerButton}
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <FontAwesomeIcon icon={faBars} className={styles.icon} />
        </button>
        <div className={styles.personalDataInner}>
          {originalData.name && (
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.70)",
                borderRadius: "8px",
                padding: "5% 3%",
              }}
            >
              <h1 className={styles.h1}>Datos Personales</h1>

              {width < 850 ? (
                <SmallPersonalData
                  originalData={originalData}
                  newData={newData}
                  hasEdition={hasEdition}
                  handleInputChange={handleInputChange}
                  enableEdit={enableEdit}
                  handleTrash={handleTrash}
                  /* data={data}
                handleEnableDisable={handleEnableDisable}
                deleteFromFirestore={deleteFromFirestore} */
                />
              ) : (
                <table className={styles.table}>
                  <tbody>
                    <tr className={styles.row}>
                      {/* //**********************************  Nombre  ************************************/}
                      <td>Nombre</td>
                      <td>{originalData.name}</td>
                      <td className={styles.cell}>
                        {hasEdition.name ? (
                          <input
                            name="name"
                            className={styles.input}
                            placeholder="Ingrese Nombre"
                            type="text"
                            autoComplete="off"
                            onChange={(event) => handleInputChange(event)}
                          />
                        ) : (
                          <div className={styles.editButtonContainer}>
                            <FaRegEdit
                              onClick={() => enableEdit("name")}
                              className={styles.editIcon}
                            />
                          </div>
                        )}
                      </td>
                      {hasEdition.name && (
                        <>
                          <td style={{ visibility: "hidden" }}>Blank</td>
                          <td>
                            <FaTrashAlt
                              className={styles.deleteIcon}
                              onClick={() => handleTrash("name")}
                            />
                          </td>
                        </>
                      )}
                    </tr>

                    {/* //***********************************  Apellido  **********************************/}
                    <tr className={styles.row}>
                      <td>Apellido</td>
                      <td>{originalData.surname}</td>
                      <td className={styles.cell}>
                        {hasEdition.surname ? (
                          <input
                            name="surname"
                            className={styles.input}
                            placeholder="Ingrese Apellido"
                            type="text"
                            autoComplete="off"
                            onChange={(event) => handleInputChange(event)}
                          />
                        ) : (
                          <div className={styles.editButtonContainer}>
                            <FaRegEdit
                              onClick={() => enableEdit("surname")}
                              className={styles.editIcon}
                            />
                          </div>
                        )}
                      </td>
                      {hasEdition.surname && (
                        <>
                          <td style={{ visibility: "hidden" }}>Blank</td>
                          <td>
                            <FaTrashAlt
                              className={styles.deleteIcon}
                              onClick={() => handleTrash("surname")}
                            />
                          </td>
                        </>
                      )}
                    </tr>

                    {/* //********************************  Email   ********************************/}
                    <tr className={styles.row}>
                      <td>Email</td>
                      <td>{originalData.email}</td>
                      <td className={styles.cell}>
                        {hasEdition.email ? (
                          <input
                            name="email"
                            className={styles.input}
                            placeholder="Ingrese Email"
                            type="email"
                            autoComplete="off"
                            onChange={(event) => handleInputChange(event)}
                          />
                        ) : (
                          <div className={styles.editButtonContainer}>
                            <FaRegEdit
                              onClick={() => enableEdit("email")}
                              className={styles.editIcon}
                            />
                          </div>
                        )}
                      </td>
                      <td>
                        {hasEdition.email && (
                          <input
                            type="email"
                            name="repeatEmail"
                            className={styles.input}
                            placeholder="Repita Email"
                            autoComplete="off"
                            onChange={(event) => handleInputChange(event)}
                          />
                        )}
                      </td>

                      {newData.email !== "" && newData.repeatEmail !== "" && (
                        <td>
                          {newData.email === newData.repeatEmail ? (
                            <FaCheckCircle
                              className={styles.errorIcon}
                              style={{ color: "green" }}
                            />
                          ) : (
                            <MdError className={styles.errorIcon} />
                          )}
                        </td>
                      )}

                      {hasEdition.email && (
                        <td>
                          <FaTrashAlt
                            className={styles.deleteIcon}
                            onClick={() => handleTrash("email")}
                          />
                        </td>
                      )}
                    </tr>

                    {/* //*********************************  Contraseña   *********************************/}
                    <tr className={styles.row}>
                      <td>Contraseña</td>
                      <td>***********</td>
                      <td className={styles.cell}>
                        {hasEdition.password ? (
                          <input
                            name="password"
                            className={styles.input}
                            placeholder="Ingrese Contraseña"
                            type="text"
                            autoComplete="off"
                            onChange={(event) => handleInputChange(event)}
                          />
                        ) : (
                          <div className={styles.editButtonContainer}>
                            <FaRegEdit
                              onClick={() => enableEdit("password")}
                              className={styles.editIcon}
                            />
                          </div>
                        )}
                      </td>
                      <td>
                        {hasEdition.password && (
                          <input
                            type="text"
                            name="repeatPassword"
                            className={styles.input}
                            placeholder="Repita contraseña"
                            autoComplete="off"
                            onChange={(event) => handleInputChange(event)}
                          />
                        )}
                      </td>

                      {newData.password !== "" &&
                        newData.repeatPassword !== "" && (
                          <td>
                            {newData.password === newData.repeatPassword ? (
                              <FaCheckCircle
                                className={styles.errorIcon}
                                style={{ color: "green" }}
                              />
                            ) : (
                              <MdError className={styles.errorIcon} />
                            )}
                          </td>
                        )}

                      {hasEdition.password && (
                        <td>
                          <FaTrashAlt
                            className={styles.deleteIcon}
                            onClick={() => handleTrash("password")}
                          />
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              )}
              <p
                className={styles.warning}
                style={{
                  visibility:
                    newData.password !== "" &&
                    newData.repeatPassword !== "" &&
                    newData.password.length < 6
                      ? "visible"
                      : "hidden",
                }}
              >
                La contraseña debe contener al menos 6 caracteres
              </p>
              <button
                className={styles.submit}
                style={
                  setButton()
                    ? { backgroundColor: "#cbcbcb", border: "#cbcbcb" }
                    : {}
                }
                onClick={() => submitChanges()}
                disabled={setButton()}
              >
                Guardar cambios
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
