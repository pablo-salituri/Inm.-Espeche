import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Filters from "../Filters/Filters";
import MobileFilter from "../Filters/MobileFilter";
import Card from "../Card/Card";
import styles from "./FilteredProperty.module.css";

const FilteredProperties = () => {
  const properties = useSelector((state) => state.properties);
  const filtersApplied = useSelector((state) => state.filtersApplied);

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const filteredHouses = properties.filter((property) => {
      const filterOperation =
        filtersApplied.operation === "all" ||
        property.operation.includes(filtersApplied.operation);
      const filterTypes =
        filtersApplied.type === "all" || property.type === filtersApplied.type;
      const filterBedrooms =
        filtersApplied.bedrooms === "all" ||
        property.bedrooms === filtersApplied.bedrooms;

      return filterOperation && filterTypes && filterBedrooms;
    });
    setFilteredProperties(filteredHouses);

    // Aquí puedes realizar cualquier acción adicional que necesites al cargar los resultados de filtrado
    setIsLoading(false);
  }, [properties, filtersApplied]);

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
    <div className={styles.pageContainer}>
      <section className={styles.superiorRow}>
        <h1 className={styles.h1}>Resultados de Búsqueda</h1>
        <div className={styles.filters}>
          <h5 className={styles.tituloFiltros}>ENCONTRA TU PROPIEDAD</h5>
          <div
            className={
              width < 769
                ? styles.shortFilterBar
                : width < 1025
                ? styles.mediumFilterBar
                : styles.longFilterBar
            }
          >
            {width < 769 ? <MobileFilter /> : <Filters width={width} />}
          </div>
        </div>
      </section>

      {filteredProperties.length > 0 ? (
        <section className={styles.cardList}>
          {filteredProperties.map(
            (property) =>
              property.active && (
                <Card
                  key={property?.id}
                  id={property?.id}
                  title={property?.title}
                  // image={property?.image && property?.image[0]}
                  coverImage={property?.coverImage && property?.coverImage}
                  neighborhood={property?.neighborhood}
                  bedrooms={property?.bedrooms}
                  price={property?.price}
                  operation={property?.operation}
                />
              )
          )}
        </section>
      ) : (
        <section className={styles.noResultsDiv}>
          <p className="noResults">No hay resultados para esta búsqueda</p>
        </section>
      )}
      {/* <div className="card-list-container">
        <div className="loading-container">
          {isLoading && (
            <img src={load} alt="Loading" className="loading-gif" />
          )}
        </div>

        <h1>Resultados de Búsqueda</h1>
        <div className="card-list">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div key={property?.id} className="card">
                <Card
                  id={property?.id}
                  title={property?.title}
                  image={property?.image && property?.image[0]}
                  neighborhood={property?.neighborhood}
                  bedrooms={property?.bedrooms}
                  price={property?.price}
                  operation={property?.operation}
                />
              </div>
            ))
          ) : (
            <div className="noResultsDiv">
              <p className="noResults">No hay resultados para esta búsqueda</p>
            </div>
          )}
        </div>
      </div>

      <div className="filters">
        <h5 className="titulo-filtros">ENCONTRA TU PROPIEDAD</h5>
        <Filters />
      </div> */}
    </div>
  );
};

export default FilteredProperties;
