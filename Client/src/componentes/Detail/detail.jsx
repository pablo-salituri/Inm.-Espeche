import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { propertyDetail, cleanPropertyDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import ContactForm from "../Form/Form";
import imageNotFound from "./notFound.jpg";
import noUbication from "./noUbication.webp";
import "./detail.css";
import compartir from "../../assets/logoW.png";
import Modal from "react-modal";
// import ReactImageZoom from 'react-image-zoom';
import load from "../../assets/load.gif";

// import Flip from 'react-reveal/Flip';
// import Fade from 'react-reveal/Fade';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // const handleReturnToAllCards = () => {
  //   const scrollPosition = window.scrollY;
  //   localStorage.setItem('scrollPosition', scrollPosition);
  // };

  const property = useSelector((state) => state.detail);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  // Sin Loading
  // useEffect(() => {
  //   window.scrollTo(0, 0);

  //   dispatch(propertyDetail(id));
  //   return () => dispatch(cleanPropertyDetail());
  // }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Marca el inicio de la carga
    setIsLoading(true);
    dispatch(propertyDetail(id))
      .then(() => {
        // Marca el final de la carga
        setIsLoading(false);
        // Limpia la propiedad al finalizar la carga con éxito
        return () => dispatch(cleanPropertyDetail());
      })
      .catch((error) => {
        console.error("Error al cargar la propiedad", error);
        // En caso de error, también marca el final de la carga
        setIsLoading(false);
      });
  }, [dispatch, id]);
  // window.addEventListener('beforeunload', () => {
  //   localStorage.setItem('scrollPosition', window.scrollY);
  // });

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  //---------------------------GOOGLE MAPS------------------------------------------------------------------------------//
  const handleShare = () => {
    const message = `¡Echa un vistazo a esta propiedad! ${property.title} - ${property.description} ${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  };

  //-------------------------------- MODAL PARA VER LA IMAGEN MAS GRANDE-------------------------------------------------//
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOpenModal = (index) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsImageModalOpen(false);
  };

  //--------------------------------------------------------------------------------------------------------------------------//
  return (
    <div className="container mt-4">
      {/* // <div id="property-details"> */}
      <div className="card">
        {isLoading && (
          <div className="loading-container">
            <img src={load} alt="Loading" className="loading-image" />
            <p>Cargando...</p>
          </div>
        )}

        {!isLoading && property && (
          <>
            {/* {property && (
            <> */}
            <div className="carousel-form-container">
              {/* <Flip left duration={2000} delay={500}> */}

              <div className="carousel-container">
                <h3>{property.title}</h3>

                {property.image?.length > 0 && (
                  <Carousel
                    activeIndex={activeImageIndex}
                    onSelect={handleThumbnailClick}
                    interval={null}
                  >
                    {property.image.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="carousel-image img-fluid"
                          src={image}
                          onError={(event) => {
                            event.target.src = imageNotFound;
                            event.onerror = null;
                            event.target.style.transform = "scale(0.5)";
                          }}
                          onClick={() => handleOpenModal(index)}
                          alt={index}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}

                {/* ------------------------------MODAL--------------------------------------------- */}
                {/* <Modal
  isOpen={isImageModalOpen}
  onRequestClose={handleCloseModal}
  contentLabel="Imagen en tamaño completo"
  className="modal1"
>
  {property.image && property.image.length > 0 && (
    <React.Fragment>
      <ReactImageZoom
        {...{
          width: 500,
          height: 400,
          zoomWidth: 2200,
          img: property.image[selectedImageIndex],
          zoomPosition: 'original',
        }}
      />
      <button onClick={handleCloseModal} className="x">✖</button>
    </React.Fragment>
  )}
</Modal> */}

                <Modal
                  isOpen={isImageModalOpen}
                  onRequestClose={handleCloseModal}
                  contentLabel="Imagen en tamaño completo"
                  className="modal1 modal-dialog-centered"
                >
                  <div className="row">
                    {/* <Fade left duration={1000} delay={500}> */}

                    <div className="col-12">
                      {property.image && (
                        <div>
                          <img
                            className="img-agrandada"
                            src={property.image[selectedImageIndex]}
                            alt={`Imagen en tamaño completo ${selectedImageIndex}`}
                          />
                          <button onClick={handleCloseModal} className="x">
                            ✖
                          </button>
                        </div>
                      )}
                    </div>
                    {/* </Fade> */}
                  </div>
                </Modal>
                {/* 
                  <Modal
                    isOpen={isImageModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Imagen en tamaño completo"
                    className="modal1"
                  >
                    {property.image && (
                     
                     <div>
                      <img
                        className="img-agrandada"
                        src={property.image[selectedImageIndex]}
                        alt={`Imagen en tamaño completo ${selectedImageIndex}`}
                      />
                      <button onClick={handleCloseModal} className="x">✖</button>
                      </div>
                    )}
                  </Modal> */}

                {/* ------------------------------------IMAGENES DEBAJO DEL CARRUSEL---------------------------------------------- */}

                <div className="thumbnail-container">
                  {property.image?.map((image, index) => (
                    <img
                      key={index}
                      className={`thumbnail-image ${
                        activeImageIndex === index ? "active" : ""
                      }`}
                      src={image}
                      onError={(event) => {
                        event.target.src = imageNotFound;
                        event.onerror = null;
                      }}
                      alt={`Thumbnail ${index}`}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ))}
                </div>
              </div>

              {/* </Flip> */}

              {/* -------------------------------------FORMULARIO------------------------------------------------------------------- */}

              <div className="form-container">
                <ContactForm propertyTitle={property.title} />
              </div>
            </div>

            <div className="text-container mx-auto col-12">
              {/* <Fade left duration={2000} delay={500}> */}

              <h3 className="property-item">
                <strong>{property.title}</strong>
                <hr />
              </h3>
              <h5 className="property-item">
                <strong>Descripción:</strong> {property?.description}
              </h5>
              <h5 className="property-item">
                <strong>Tipo De Operación:</strong>{" "}
                {property?.operation?.join(", ") || "---"}
              </h5>

              <h5 className="property-item">
                <strong>Barrio:</strong> {property?.neighborhood || "---"}
              </h5>
              <h5 className="property-item">
                <strong>Direccion:</strong> {property?.streetAddress || "---"}
              </h5>
              <h5 className="property-item">
                <strong>Habitaciones:</strong> {property?.bedrooms || "---"}
              </h5>
              <h5 className="property-item">
                <strong>Baños:</strong> {property?.bathrooms || "---"}
              </h5>

              <h5 className="property-item">
                {/* <strong>Garage:</strong> {property?.hasGarage} */}
                {/* <strong>Garage:</strong> {property?.hasGarage} */}
                <strong>Garage:</strong>{" "}
                {property?.hasGarage ? property?.hasGarage : "---"}
              </h5>
              <h5 className="property-item">
                {/* <strong>Patio:</strong> {property?.hasPatio ? 'Sí' : 'No'} */}
                {/* <strong>Patio:</strong> {property?.hasPatio} */}
                {/* <strong>Patio:</strong> {property?.hasPatio} */}
                <strong>Patio:</strong>{" "}
                {property?.hasPatio ? property?.hasPatio : "---"}
              </h5>
              <h5 className="property-item">
                <strong>Precio:</strong> {property?.price || "---"}
              </h5>
              {/* </Fade> */}

              {/* -----------------------------------BOTON COMPARTIR WPP--------------------------------------------------------------- */}
              <div className="share-button-container">
                {/* <Fade right duration={2000} delay={500}> */}

                <button
                  className="share-button p-1"
                  onClick={handleShare}
                  style={{
                    position: "relative",
                    left: "40%",
                    cursor: "pointer",
                  }}
                >
                  Compartir propiedad
                  <img
                    className="imgc m-1 p-2"
                    src={compartir}
                    alt="Icon 2"
                    style={{ width: "30px", height: "30px" }}
                  />
                </button>
                {/* </Fade> */}
              </div>
            </div>

            {/* -----------------------------------------------GOOGLE MAPS-------------------------------------------------// */}

            <div className="map-container">
              <h5>UBICACIÓN</h5>
              {property.googleMapsLatitude && property.googleMapsLongitude ? (
                <div
                  style={{
                    height: "400px",
                    width: "100%",
                  }}
                >
                  <iframe
                    title="Google Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCR8CG0IF3aAct5F86NxlH4E_EKg-DlXqo&q=${property.googleMapsLatitude},${property.googleMapsLongitude}`}
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div
                  style={{
                    height: "400px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src={noUbication} alt="Ubication not found" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Detail;
