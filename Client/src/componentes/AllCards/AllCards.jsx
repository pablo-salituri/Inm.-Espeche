import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperty, seeMoreProps } from "../../redux/actions";
import Card from "../Card/Card";
import Carrusel from "../Carrusel/Carrusel";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import MobileFilter from "../Filters/MobileFilter";
// import wpp from "../../assets/logoW.png";
import { setFilters } from "../../redux/actions";
import load from "../../assets/load.gif";
import "./AllCards.css";

const AllCards = () => {
  const dispatch = useDispatch();
  const allProperties = useSelector((state) => state.filteredProperties);
  const propertiesPerPage = useSelector((state) => state.propertiesPerPage);
  const [isLoading, setIsLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  // const location = useLocation();

  useEffect(() => {
    dispatch(getAllProperty()).then(() => {
      setIsLoading(false);
    });
    dispatch(setFilters({ operation: "all", type: "all", bedrooms: "all" }));
  }, [dispatch]);

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
    <div className="allCardsContainer">
      <section className="carruselContainer">
        <Carrusel />
        <section className="filterContainerInHome">
          <div
            className={
              width < 769
                ? "shortFilterBar"
                : width < 1025
                ? "mediumFilterBar"
                : "longFilterBar"
            }
          >
            <SearchBar />
            {width < 769 ? <MobileFilter /> : <Filters width={width} />}
          </div>
        </section>
      </section>

      <div className="destacados">
        <h3 style={{ marginBottom: "0", marginTop: "3%" }}>
          PROPIEDADES DESTACADAS
        </h3>
      </div>
      {isLoading ? (
        <div className="loading-container">
          <img src={load} alt="Loading" className="loading-gif" />
        </div>
      ) : (
        <div className="scrollSection">
          <section className="section">
            <div className="cardsContainerInHome">
              {allProperties
                .slice(0, propertiesPerPage)
                .map(
                  (property) =>
                    property.active && (
                      <Card
                        key={property?.id}
                        id={property?.id}
                        title={property?.title}
                        coverImage={
                          property?.coverImage && property?.coverImage
                        }
                        neighborhood={property?.neighborhood || "---"}
                        bedrooms={property?.bedrooms || "---"}
                        price={property?.price}
                        operation={property?.operation}
                      />
                    )
                )}
            </div>
            <section className="buttonSection">
              <button
                className="btn btn-outline-secondary seeMoreButtton"
                disabled={propertiesPerPage >= allProperties.length}
                onClick={() => dispatch(seeMoreProps())}
              >
                Ver más
              </button>
            </section>
          </section>
        </div>
      )}

      <br />
    </div>
  );
};

export default AllCards;
