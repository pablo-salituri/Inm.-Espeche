import { useEffect, useState } from "react";
import firebaseApp from "../Firebase/credentials";
import {
  getDocs,
  collection,
  getFirestore,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Sidebar from "../dashboard/Sideb";
import SmallHandleEtitor from "./SmallHandleEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import styles from "./DeleteEditor.module.css";

const firestore = getFirestore(firebaseApp);

export default function DeleteEditor() {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [showSideBar, setShowSideBar] = useState(true);

  // Changes no indica nada. Es sólo para forzar la re-renderización
  const [changes, setChanges] = useState(true);

  function handleEnableDisable(action, uid) {
    const docRef = doc(firestore, "usuarios", uid);
    const newValue = action === "Disable" ? "disabled" : "enabled";

    updateDoc(docRef, { status: newValue })
      .then(() => {
        Swal.fire({
          text: `Editor ${
            action === "Disable" ? "bloqueado" : "desbloqueado"
          } con éxito.`,
          icon: "success",
          allowOutsideClick: false,
        });
      })
      .then(() => setChanges(!changes))
      .catch(() => {
        Swal.fire({
          text: `Error al ${
            action === "Disable" ? "bloqueado" : "desbloqueado"
          } editor.`,
          icon: "error",
          allowOutsideClick: false,
        });
      });
  }

  function deleteFromFirestore(event) {
    const uid = event.target.id;
    const docRef = doc(firestore, "usuarios", uid);

    Swal.fire({
      title: `¿Borrar Editor?`,
      // text:
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(docRef).then(() => {
            console.log("Entire Document has been deleted successfully.");
            Swal.fire({
              title: "Editor eliminado exitosamente",
              // text: "Artículo creado correctamente",
              icon: "success",
            }).then((okay) => {
              if (okay) {
                setChanges(!changes);
              }
            });
          });
        } catch (error) {
          Swal.fire({
            title: "Error al eliminar editor",
            // text: "Error al eliminar el artículo",
            icon: "error",
          });
        }
      }
    });

    /* deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
      }); */
  }

  useEffect(() => {
    const fetchEditorRecords = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "usuarios"));
        const editors = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().role === "editor")
            editors.push({ id: doc.id, data: doc.data() });
        });
        setData(editors);
      } catch (error) {
        console.error("Error al obtener registros:", error);
      }
    };
    fetchEditorRecords();
  }, [changes]);

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
    <div className={styles.deleteEditorContainer}>
      {showSideBar && <Sidebar setShowSideBar={setShowSideBar} />}

      <section className={styles.deleteSectionOuter}>
        <button
          type="button"
          className={styles.menuBurgerButton}
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <FontAwesomeIcon icon={faBars} className={styles.icon} />
        </button>
        <div className={styles.deleteSectionInner}>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.70)",
              borderRadius: "8px",
              padding: "5% 3%",
            }}
          >
            <h1 className={styles.h1}>Administrar Editores</h1>
            {width < 769 ? (
              <SmallHandleEtitor
                data={data}
                handleEnableDisable={handleEnableDisable}
                deleteFromFirestore={deleteFromFirestore}
              />
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr className={styles.row}>
                    <th style={{ width: "20%" }}>Nombre</th>
                    <th style={{ width: "20%" }}>Apellido</th>
                    <th style={{ width: "20%" }}>Email</th>
                    <th style={{ width: "20%" }}>Bloquear</th>
                    <th style={{ width: "20%" }}>Borrar</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((user) => (
                    <tr key={user.id} className={styles.row}>
                      <td>{user.data.name}</td>
                      <td>{user.data.surname}</td>
                      <td>{user.data.email}</td>
                      <td>
                        <button
                          name={
                            user.data.status === "enabled"
                              ? "Disable"
                              : "Enable"
                          }
                          id={user.id}
                          className={styles.button}
                          onClick={(event) =>
                            handleEnableDisable(
                              event.target.name,
                              event.target.id
                            )
                          }
                        >
                          {user.data.status === "enabled"
                            ? "Bloquear"
                            : "Desboloquear"}
                        </button>
                      </td>

                      <td>
                        <button
                          id={user.id}
                          className={styles.button}
                          style={{ backgroundColor: "#ffb2b2" }}
                          onClick={(event) => deleteFromFirestore(event)}
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
