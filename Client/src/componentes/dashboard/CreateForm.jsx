import React from "react";
import { useState } from "react";
import { useNavigate /* , useParams */ } from "react-router-dom";
import axios from "axios";
import load from "../../assets/load.gif";
import ValidateForm from "./ValidateForm";
import Sidebar from "./Sideb";
import Swal from "sweetalert2";
import styles from "./CreateForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./CreateForm.css";

const backEndUrl = process.env.REACT_APP_BACKEND_URL;

const CreateForm = () => {
  const cloudName = process.env.REACT_APP_CLOUDNAME;
  const presetName = process.env.REACT_APP_PRESETNAME;

  // const { id } = useParams();
  const navigate = useNavigate();

  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    price: 0,
    neighborhood: "",
    bedrooms: 0,
    bathrooms: 0,
    hasGarage: "Si",
    hasPatio: "Si",
    streetAddress: "",
    googleMapsLatitude: 0,
    googleMapsLongitude: 0,
    type: "",
    operation: [],
    // propertyTypeId: '',
    image: [],
    propertyTypeId: "",
    active: "",
    coverImage: "",
  });

  // const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [showSideBar, setShowSideBar] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["title", "description", "type", "operation"];
    const requiredFieldErrors = {};

    requiredFields.forEach((fieldName) => {
      const fieldValue = Array.isArray(propertyData[fieldName])
        ? propertyData[fieldName].length
        : propertyData[fieldName];
      if (!fieldValue) {
        requiredFieldErrors[fieldName] = "Este campo es obligatorio.";
      } else {
        requiredFieldErrors[fieldName] = "";
      }
    });

    // Actualizar errores solo para campos obligatorios
    setFieldErrors(requiredFieldErrors);
    console.log("fieldErrors después de la actualización:", fieldErrors);

    // Comprobar si hay errores en campos obligatorios
    const hasRequiredFieldErrors = Object.values(requiredFieldErrors).some(
      (error) => error !== ""
    );

    if (hasRequiredFieldErrors) {
      console.error(
        "Existen errores en campos obligatorios. Por favor, revíselos."
      );
      return; // Detener el envío del formulario si hay errores obligatorios
    }

    try {
      // Iniciar la carga
      setIsLoading(true);

      // Cargar las imágenes en Cloudinary solo después de enviar el formulario
      const uploadedImages = await Promise.all(
        propertyData.image.map(async ({ file }, index) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", presetName); // Reemplaza con tu upload preset de Cloudinary

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${
              cloudName || "da5vj79fy"
            }/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          console.log(
            `Imagen ${index + 1} cargada en Cloudinary:`,
            data.secure_url
          );

          return data.secure_url;
        })
      );

      console.log(uploadedImages[0]);

      // Después de cargar las imágenes, enviar los datos al servidor para crear una nueva propiedad
      const response = await axios.post(`${backEndUrl}/properties`, {
        ...propertyData,
        image: uploadedImages, // Pasar las URL de las imágenes en lugar de los objetos de archivo
        coverImage: uploadedImages[0],
      });

      console.log("Después de la solicitud POST");
      console.log("Propiedad CREADA:", response.data);

      // Obtener el ID de la propiedad creada desde la respuesta del servidor
      const createdPropertyId = response.data.id;

      Swal.fire({
        text: "Propiedad creada con éxito.",
        icon: "success",
        allowOutsideClick: false,
      }).then(() => navigate(`/properties/${createdPropertyId}`));
    } catch (error) {
      Swal.fire({
        text: "Error al CREAR la propiedad",
        icon: "error",
        allowOutsideClick: false,
      });
      // Finalizar la carga en caso de error
      setIsLoading(false);
    }
  };

  // const [selectedImages, setSelectedImages] = useState([]);

  // Función para manejar la carga de imágenes al hacer submit

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    // Si el usuario cancela la selección, no hace nada
    if (!file) {
      return;
    }

    // Muestra la miniatura inmediatamente
    const reader = new FileReader();
    reader.onload = () => {
      // Actualizar el estado local con la nueva imagen y la miniatura
      setPropertyData((prevData) => ({
        ...prevData,
        image: [
          ...prevData.image,
          {
            file: file,
            miniatureImage: reader.result,
          },
        ],
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleImageDelete = (index, e) => {
    // Detener la propagación del evento para evitar que alcance el manejador del formulario
    e.stopPropagation();

    // Restablecer el valor del input de archivo a null solo si es la última imagen
    if (index === propertyData.image.length - 1) {
      document.getElementById("imageInput").value = null;
    }

    // Filtrar las imágenes excluyendo la que se va a eliminar
    const updatedImages = propertyData.image.filter((_, i) => i !== index);

    // Actualizar el estado solo después de haber filtrado todas las imágenes
    setPropertyData((prevData) => ({
      ...prevData,
      image: updatedImages,
    }));
  };

  // Impide que se ingrese un signo '-' directamente desde el teclado
  const handleKeyPress = (e) => {
    switch (true) {
      case e.target.name === "price" && e.key === "-":
        e.preventDefault();
        break;
      case e.target.name === "bedrooms" && (e.key === "-" || e.key === "."):
        e.preventDefault();
        break;
      case e.target.name === "bathrooms" && (e.key === "-" || e.key === "."):
        e.preventDefault();
        break;

      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]:
        name === "price" ||
        name === "bedrooms" ||
        name === "bathrooms" ||
        name === "googleMapsLatitude" ||
        name === "googleMapsLongitude"
          ? parseFloat(value) || null
          : value,
    }));

    const newErrors = ValidateForm({ ...propertyData, [name]: value });

    // Limpiar el error si el campo se completa correctamente o se deja vacío
    setFormErrors((prevErrors) => {
      const { [name]: omit, ...rest } = prevErrors;
      return value !== "" ? { ...rest, [name]: newErrors[name] } : rest;
    });
    // setFieldErrors((prevErrors) => {
    //   const { [name]: omit, ...rest } = prevErrors;
    //   return value !== "" ? { ...rest, [name]: newErrors[name] } : rest;
    // });
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value !== "" ? newErrors[name] : "",
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setPropertyData((prevData) => ({
      ...prevData,
      operation: checked
        ? [...prevData.operation, value]
        : prevData.operation.filter((option) => option !== value),
    }));
  };

  const handleTypeChange = async (event) => {
    const { value } = event.target;

    try {
      const response = await fetch(`${backEndUrl}/types/${value}`); // Reemplaza con tu ruta y parámetros
      const data = await response.json();

      console.log("Original propertyData:", propertyData); // Antes de la actualización
      console.log("Response from server:", data); // Información del servidor

      setPropertyData((prevData) => {
        const newData = {
          ...prevData,
          type: value,
          propertyTypeId: data.propertyTypeId,
        };

        setFieldErrors((prevErrors) => {
          const { type: omit, ...rest } = prevErrors;
          return { ...rest, type: "" };
        });

        return newData;
      });
    } catch (error) {
      console.error("Error fetching property type ID:", error);
    }
  };

  return (
    <div className={styles.createPropertyContainer}>
      {isLoading && (
        <div className="loading-overlay">
          {/* Reemplaza 'ruta/a/tu/imagen.gif' con la ruta correcta de tu imagen GIF */}
          <img className="loading-image" src={load} alt="Cargando..." />
        </div>
      )}
      {showSideBar && <Sidebar setShowSideBar={setShowSideBar} />}
      <section className={styles.createSectionOuter}>
        <button
          type="button"
          className={styles.menuBurgerButton}
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <FontAwesomeIcon icon={faBars} className={styles.icon} />
        </button>
        <div className={styles.createSectionInner}>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.70)",
              borderRadius: "5px",
              padding: "5% 3%",
            }}
          >
            <h1 className="h1">Crear Nueva Propiedad</h1>
            <div className={styles.container}>
              <form className={styles.formEdit} onSubmit={handleSubmit}>
                {formErrors.title && <p>{formErrors.title}</p>}
                <label htmlFor="title">Título:</label>
                <input
                  className={styles.regularInput}
                  type="text"
                  id="title"
                  name="title"
                  value={propertyData.title}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
                {fieldErrors.title && (
                  <p className="error-message">{fieldErrors.title}</p>
                )}
                {/* {formErrors.description && <p>{formErrors.description}</p>} */}
                <label htmlFor="description">Descripción:</label>
                {/* <input type="text" id="description" name="description" value={propertyData.description} onChange={handleInputChange} /> */}
                <textarea
                  id="description"
                  className={styles.regularInput}
                  name="description"
                  value={propertyData.description}
                  onChange={handleInputChange}
                  rows="4" // Puedes ajustar el número de filas según tus necesidades
                ></textarea>
                {fieldErrors.description && (
                  <p className="error-message">{fieldErrors.description}</p>
                )}

                {/* {formErrors.streetAddress && <p>{formErrors.streetAddress}</p>} */}

                <label htmlFor="streetAddress">Direccion:</label>
                <input
                  type="text"
                  className={styles.regularInput}
                  id="streetAddress"
                  name="streetAddress"
                  value={propertyData.streetAddress}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
                {formErrors.streetAddress && (
                  <p className="error-message">{formErrors.streetAddress}</p>
                )}

                {/* {formErrors.price && <p>{formErrors.price}</p>} */}
                <section className={styles.middleSection}>
                  {/* <section className="middleSectionColumn"> */}

                  {/* {formErrors.neighborhood && <p>{formErrors.neighborhood}</p>} */}
                  <label htmlFor="neighborhood">Barrio:</label>
                  <input
                    type="text"
                    className={styles.regularInput}
                    id="neighborhood"
                    name="neighborhood"
                    value={propertyData.neighborhood}
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                  {formErrors.neighborhood && (
                    <p className="error-message">{formErrors.neighborhood}</p>
                  )}
                  {/* {formErrors.bedrooms && <p>{formErrors.bedrooms}</p>} */}
                  <section className={styles.row}>
                    <section className={styles.cell}>
                      <label htmlFor="bedrooms">Habitaciones:</label>
                      <input
                        type="number"
                        id="bedrooms"
                        name="bedrooms"
                        value={propertyData.bedrooms}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        min="0"
                      />
                      {formErrors.bedrooms && (
                        <p className="error-message">{formErrors.bedrooms}</p>
                      )}
                    </section>
                    <section className={styles.cell}>
                      {/* {formErrors.bathrooms && <p>{formErrors.bathrooms}</p>} */}
                      <label htmlFor="bathrooms">Baños:</label>
                      <input
                        type="number"
                        id="bathrooms"
                        name="bathrooms"
                        value={propertyData.bathrooms}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        min="0"
                      />
                      {formErrors.bathrooms && (
                        <p className="error-message">{formErrors.bathrooms}</p>
                      )}
                    </section>
                  </section>

                  <section className={styles.row}>
                    <section className={styles.cell}>
                      {/* {formErrors.hasGarage && <p>{formErrors.hasGarage}</p>} */}

                      <label htmlFor="hasGarage">Garage:</label>
                      <select
                        name="hasGarage"
                        className={styles.smallInput}
                        id="hasGarage"
                        onChange={handleInputChange}
                      >
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                      {formErrors.hasGarage && (
                        <p className="error-message">{formErrors.hasGarage}</p>
                      )}
                    </section>

                    <section className={styles.cell}>
                      {/* {formErrors.hasPatio && <p>{formErrors.hasPatio}</p>} */}
                      <label htmlFor="hasPatio">Patio:</label>
                      <select
                        name="hasPatio"
                        className={styles.smallInput}
                        id="hasPatio"
                        onChange={handleInputChange}
                      >
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                      {formErrors.hasPatio && (
                        <p className="error-message">{formErrors.hasPatio}</p>
                      )}
                    </section>
                  </section>

                  <section className={styles.row}>
                    <section className={styles.cell}>
                      {/* {formErrors.googleMapsLatitude && <p>{formErrors.googleMapsLatitude}</p>} */}

                      <label htmlFor="googleMapsLatitude">Latitud:</label>
                      <input
                        type="number"
                        id="googleMapsLatitude"
                        name="googleMapsLatitude"
                        value={propertyData.googleMapsLatitude || ""} // Asegúrate de manejar valores nulos
                        onChange={handleInputChange}
                      />
                      {formErrors.googleMapsLatitude && (
                        <p className="error-message">
                          {formErrors.googleMapsLatitude}
                        </p>
                      )}
                    </section>

                    <section className={styles.cell}>
                      <label htmlFor="googleMapsLongitude">Longitud:</label>
                      <input
                        type="number"
                        id="googleMapsLongitude"
                        name="googleMapsLongitude"
                        value={propertyData.googleMapsLongitude || ""} // Asegúrate de manejar valores nulos
                        onChange={handleInputChange}
                      />
                      {formErrors.googleMapsLongitude && (
                        <p className="error-message">
                          {formErrors.googleMapsLongitude}
                        </p>
                      )}
                    </section>
                  </section>

                  <section className={styles.row}>
                    <section className={styles.cell}>
                      <label>Tipo de Propiedad:</label>
                      <select
                        id="type"
                        className={styles.smallInput}
                        name="type"
                        value={propertyData.type}
                        onChange={handleTypeChange}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Casa">Casa</option>
                        <option value="Departamento">Departamento</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Terreno">Terreno</option>
                        <option value="Galpón">Galpón</option>
                        <option value="Local Comercial">Local Comercial</option>
                        <option value="Finca">Finca</option>
                        <option value="Fondo de Comercio">
                          Fondo de Comercio
                        </option>
                        <option value="Campo">Campo</option>
                        <option value="Cochera">Cochera</option>
                      </select>

                      {fieldErrors.type && (
                        <p
                          className="error-message"
                          style={{ color: "red", fontWeight: "bold" }}
                        >
                          {fieldErrors.type}
                        </p>
                      )}
                    </section>
                    <section className={styles.cell}>
                      <label htmlFor="price">Precio:</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={propertyData.price}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        min="0"
                      />
                      {formErrors.price && (
                        <p className="error-message">{formErrors.price}</p>
                      )}
                    </section>
                  </section>
                </section>

                <label>Tipos de Operación:</label>
                <section className={styles.operationSection}>
                  <div>
                    <input
                      type="checkbox"
                      id="Venta"
                      name="operation"
                      style={{ marginRight: "8px" }}
                      value="Venta"
                      checked={propertyData.operation.includes("Venta")}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="Venta">Venta</label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="Alquiler"
                      name="operation"
                      style={{ marginRight: "8px" }}
                      value="Alquiler"
                      checked={propertyData.operation.includes("Alquiler")}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="Alquiler">Alquiler</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="Alquiler"
                      name="operation"
                      style={{ marginRight: "8px" }}
                      value="Alquiler Temporario"
                      checked={propertyData.operation.includes(
                        "Alquiler Temporario"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="Alquiler Temporario">
                      Alquiler Temporario
                    </label>
                  </div>
                  {fieldErrors.operation && (
                    <p
                      className="error-message"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      {fieldErrors.operation}
                    </p>
                  )}
                </section>

                <label htmlFor="image">Seleccionar Imagen:</label>
                <div
                  style={{
                    marginTop: "10px",
                    border: "1px solid lightgray",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => document.getElementById("imageInput").click()}
                >
                  Seleccionar Archivo
                  <input
                    type="file"
                    id="imageInput"
                    name="image"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Mostrar miniaturas de las imágenes seleccionadas */}
                <div className="thumbnail-container">
                  {propertyData.image &&
                    propertyData.image.map((item, index) => {
                      // Verificar si el elemento tiene la estructura esperada
                      if (item && item.file && item.miniatureImage) {
                        const { /* file, */ miniatureImage } = item;
                        return (
                          <div key={index} className="thumbnail-item">
                            <img
                              src={miniatureImage}
                              alt={`Thumbnail ${index}`}
                              className="thumbnail-image"
                            />

                            <button
                              onClick={(e) => handleImageDelete(index, e)}
                              className="delete-button"
                            >
                              X
                            </button>
                          </div>
                        );
                      }
                      return null; // Opción adicional para manejar casos donde la estructura no es la esperada
                    })}
                </div>

                <button
                  className={styles.submit}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateForm;
