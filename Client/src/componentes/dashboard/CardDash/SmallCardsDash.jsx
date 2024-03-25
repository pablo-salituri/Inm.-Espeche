import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperty } from "../../../redux/actions";
import CardDashDelete from "./CardDashDelete";
import styles from "./SmallCardsDash.module.css";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const SmallCardsDash = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.filteredProperties);

  useEffect(() => {
    dispatch(getAllProperty());
  }, [dispatch]);

  return (
    <div className={styles.smallCardContainer}>
      <h1 style={{ color: "white" }}>PROPIEDADES</h1>

      {properties.length
        ? properties.map((property) => (
            <div className={styles.smallCard} key={property.id}>
              <span className={styles.propertyTitle}>{property.title}</span>
              <section className={styles.cardRow}>
                <section className={styles.cardCell}>
                  <span className={styles.field}>Barrio:</span>
                  <span>{property.neighborhood}</span>
                </section>

                <section
                  className={styles.cardCell}
                  style={{ alignItems: "end" }}
                >
                  <span className={styles.field}>Operación:</span>
                  <span>{property.operation?.join(", ")}</span>
                </section>
              </section>

              <section className={styles.cardRow}>
                <section className={styles.cardCell}>
                  <span className={styles.field}>Habitariones:</span>
                  <span>{property.bedrooms}</span>
                </section>

                <section
                  className={styles.cardCell}
                  style={{ alignItems: "end" }}
                >
                  <span className={styles.field}>Precio:</span>
                  <span>{property.price.toLocaleString()}</span>
                </section>
              </section>

              <section className={styles.cardRow}>
                {/* Utiliza Link para navegar a la página de edición */}
                <Link to={`/admin/editarPropiedad/${property.id}`}>
                  <button className={styles.editar}>
                    <FiEdit />
                  </button>
                </Link>
                <CardDashDelete id={property.id} />
              </section>
            </div>
          ))
        : null}
    </div>
  );
};

export default SmallCardsDash;
