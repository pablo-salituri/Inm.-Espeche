import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "../Firebase/credentials";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import Swal from "sweetalert2";
import styles from "./RecoverPass.module.css";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function RecoverPass() {
  const [input, setInput] = useState("");

  async function recoverPassword(event) {
    let found = false;
    event.preventDefault();
    const querySnapshot = await getDocs(collection(firestore, "usuarios"));
    querySnapshot.forEach((doc) => {
      if (doc.data().email === input) found = true;
    });

    if (found) {
      sendPasswordResetEmail(auth, input)
        .then(() => {
          Swal.fire({
            title: "Recuperación enviada",
            text: "Revise su correo",
            icon: "success",
            allowOutsideClick: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else
      Swal.fire({
        text: "El usuario ingresado no existe.",
        icon: "error",
        allowOutsideClick: false,
      });
  }

  return (
    <div className={styles.recoverContainer}>
      <h1 className={styles.h1}>Recuperar Contraseña</h1>
      <input
        type="text"
        className={styles.input}
        placeholder="Dirección de correo"
        onChange={(event) => setInput(event.target.value)}
        value={input}
      />
      <button
        className={styles.submit}
        onClick={(event) => recoverPassword(event)}
        disabled={!input}
      >
        Recuperar
      </button>
    </div>
  );
}
