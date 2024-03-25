import styles from "./SmallHandleEditor.module.css";

export default function SmallHandleEtitor({
  data,
  handleEnableDisable,
  deleteFromFirestore,
}) {
  return (
    <div className={styles.SmallHandleEtitor}>
      {data.map((user, index) => (
        <div key={user.id}>
          {index !== 0 && <hr className={styles.separator} />}
          <div className={styles.userCard}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={styles.cell}>
                    <span>Nombre:</span>
                  </td>
                  <td className={styles.cell}>
                    <span>
                      {user.data.surname}, {user.data.name}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.cell}>
                    <span>Email:</span>
                  </td>
                  <td className={styles.cell}>
                    <span>{user.data.email}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <section className={styles.buttonSection}>
              <button
                name={user.data.status === "enabled" ? "Disable" : "Enable"}
                id={user.id}
                className={styles.button}
                onClick={(event) =>
                  handleEnableDisable(event.target.name, event.target.id)
                }
              >
                {user.data.status === "enabled" ? "Bloquear" : "Desboloquear"}{" "}
              </button>
              <button
                id={user.id}
                className={styles.button}
                style={{ backgroundColor: "#ffb2b2" }}
                onClick={(event) => deleteFromFirestore(event)}
              >
                Borrar
              </button>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
}
