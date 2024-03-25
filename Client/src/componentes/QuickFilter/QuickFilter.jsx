import React, { useEffect } from "react";
import { filter_operation } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from "./QuickFilter.module.css";

const QuickFilter = ({ operation }) => {
  const dispatch = useDispatch();
  const operaciones = useSelector((state) => state.filteredProperties);
  const title =
    operation === "Venta" || operation === "Alquiler"
      ? `Propiedades en ${operation}`
      : "Alquiler Temporario";

  useEffect(() => {
    dispatch(filter_operation(operation));
  }, [operation, dispatch]);

  return (
    <div className={styles.quickFilterContainer}>
      <h1> {title} </h1>
      <div className={styles.cardList}>
        {operaciones.map(
          (property) =>
            property.active && (
              <Card
                key={property?.id}
                id={property?.id}
                title={property?.title}
                coverImage={property?.coverImage && property?.coverImage}
                neighborhood={property?.neighborhood}
                bedrooms={property?.bedrooms}
                price={property?.price}
                operation={property?.operation}
              />
            )
        )}
      </div>
    </div>
  );
};

export default QuickFilter;
