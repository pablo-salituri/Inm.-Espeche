import { FaRegEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import styles from "./SmallPersonalData.module.css";

export default function SmallPersonalData({
  originalData,
  newData,
  hasEdition,
  handleInputChange,
  enableEdit,
  handleTrash,
}) {
  return (
    <div>
      {/* //**********************************  Nombre  ************************************/}
      <section className={styles.row}>
        <span>Nombre: {originalData.name}</span>
        {!hasEdition.name && (
          <div className={styles.editButtonContainer}>
            <FaRegEdit
              onClick={() => enableEdit("name")}
              className={styles.editIcon}
            />
          </div>
        )}
      </section>
      {hasEdition.name && (
        <section className={styles.row}>
          <input
            name="name"
            className={styles.input}
            placeholder="Ingrese Nombre"
            type="text"
            autoComplete="off"
            onChange={(event) => handleInputChange(event)}
          />

          <div className={styles.deleteIconContainer}>
            <FaTrashAlt
              className={styles.deleteIcon}
              onClick={() => handleTrash("name")}
            />
          </div>
        </section>
      )}
      <hr className={styles.separator} />
      {/* //***********************************  Apellido  **********************************/}
      <section className={styles.row}>
        <span>Apellido: {originalData.surname}</span>
        {!hasEdition.surname && (
          <div className={styles.editButtonContainer}>
            <FaRegEdit
              onClick={() => enableEdit("surname")}
              className={styles.editIcon}
            />
          </div>
        )}
      </section>
      {hasEdition.surname && (
        <section className={styles.row}>
          <input
            name="surname"
            className={styles.input}
            placeholder="Ingrese Apellido"
            type="text"
            autoComplete="off"
            onChange={(event) => handleInputChange(event)}
          />

          <div className={styles.deleteIconContainer}>
            <FaTrashAlt
              className={styles.deleteIcon}
              onClick={() => handleTrash("surname")}
            />
          </div>
        </section>
      )}
      <hr className={styles.separator} />
      {/* //********************************  Email   ********************************/}
      <section className={styles.row}>
        <span>Email: {originalData.email}</span>
        {!hasEdition.email && (
          <div className={styles.editButtonContainer}>
            <FaRegEdit
              onClick={() => enableEdit("email")}
              className={styles.editIcon}
            />
          </div>
        )}
      </section>
      {hasEdition.email && (
        <section className={styles.column}>
          <section className={styles.row}>
            <input
              name="email"
              className={styles.input}
              placeholder="Ingrese Email"
              type="email"
              autoComplete="off"
              onChange={(event) => handleInputChange(event)}
            />

            {newData.email !== "" && newData.repeatEmail !== "" && (
              <>
                {newData.email === newData.repeatEmail ? (
                  <FaCheckCircle
                    className={styles.errorIcon}
                    style={{ color: "green" }}
                  />
                ) : (
                  <MdError className={styles.errorIcon} />
                )}
              </>
            )}
          </section>
          <section className={styles.row}>
            <input
              type="email"
              name="repeatEmail"
              className={styles.input}
              placeholder="Repita Email"
              autoComplete="off"
              onChange={(event) => handleInputChange(event)}
            />
            <div className={styles.deleteIconContainer}>
              <FaTrashAlt
                className={styles.deleteIcon}
                onClick={() => handleTrash("email")}
              />
            </div>
          </section>
        </section>
      )}
      <hr className={styles.separator} />
      {/* //*********************************  Contraseña   *********************************/}

      <section className={styles.row}>
        <span>Contraseña: ***********</span>
        {!hasEdition.password && (
          <div className={styles.editButtonContainer}>
            <FaRegEdit
              onClick={() => enableEdit("password")}
              className={styles.editIcon}
            />
          </div>
        )}
      </section>
      {hasEdition.password && (
        <section className={styles.column}>
          <section className={styles.row}>
            <input
              name="password"
              className={styles.input}
              placeholder="Ingrese Contraseña"
              type="password"
              autoComplete="off"
              onChange={(event) => handleInputChange(event)}
            />

            {newData.password !== "" && newData.repeatPassword !== "" && (
              <>
                {newData.password === newData.repeatPassword ? (
                  <FaCheckCircle
                    className={styles.errorIcon}
                    style={{ color: "green" }}
                  />
                ) : (
                  <MdError className={styles.errorIcon} />
                )}
              </>
            )}
          </section>
          <section className={styles.row}>
            <input
              type="password"
              name="repeatPassword"
              className={styles.input}
              placeholder="Repita Contraseña"
              autoComplete="off"
              onChange={(event) => handleInputChange(event)}
            />
            <div className={styles.deleteIconContainer}>
              <FaTrashAlt
                className={styles.deleteIcon}
                onClick={() => handleTrash("password")}
              />
            </div>
          </section>
        </section>
      )}
    </div>
  );
}
