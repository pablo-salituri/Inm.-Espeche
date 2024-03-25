import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EditPropertyForm.module.css";
import { useParams, useNavigate } from "react-router-dom";
import Miniatures from "../Miniatures/Miniatures";
import ValidateForm from "./ValidateForm";
import Swal from "sweetalert2";

const EditPropertyForm = ({ onCancel }) => {
  //Credenciales Cloudinary de Pablo. Cambiar
  const cloudName = "dreujwkes";
  const presetName = "upload_pablo";

  const { id } = useParams();
  // console.log("ID de la propiedad:", id);
  const navigate = useNavigate();

  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    price: 0,
    neighborhood: "",
    bedrooms: "",
    bathrooms: 0,
    hasGarage: "",
    hasPatio: "",
    streetAddress: "",
    googleMapsLatitude: "",
    googleMapsLongitude: "",
    type: "",
    operation: [],
    propertyTypeId: "",
    image: [],
    coverImage: "",
    // propertyTypeId: null,
  });
  const [formErrors, setFormErrors] = useState({
    title: "",
    type: "",
    description: "",
    // ... otros campos que necesitas validar
  });
  const [formErrorss, setFormErrorss] = useState({});
  const [tempMiniatures, setTempMiniatures] = useState({});

  function handleCoverImage(imageUrl, index) {
    // Como las rutas locales son muy largas, guardo la posicion del elemento. Antes de hacer el PUT del estado local, lo cambio por la URL correspondiente de cloudinary
    setPropertyData({
      ...propertyData,
      coverImage: imageUrl.length > 250 ? index : imageUrl,
    });
  }

  useEffect(() => {
    // Lógica para cargar los datos de la propiedad desde la API al montar el componente
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/properties/${id}`
        );

        setPropertyData(response.data);

        const tempImages = response.data.image.map((image) => ({
          path: image,
          origin: "Remote",
        }));

        setTempMiniatures({
          image: tempImages,
          coverImage: response.data.coverImage,
        });
      } catch (error) {
        console.error("Error al obtener los datos de la propiedad", error);
      }
    };

    fetchPropertyData();
  }, [id /* , propertyData.image.length */]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    // Validaciones de campos obligatorios

    if (name === "title" && !value) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        title: "El título es obligatorio.",
      }));
    } else if (name === "description" && !value) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        description: "La descripción es obligatoria.",
      }));

      // Si es otro campo, limpia el error correspondiente
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    const newErrors = ValidateForm({ ...propertyData, [name]: value });

    setFormErrorss((prevErrors) => {
      const { [name]: omit, ...rest } = prevErrors;
      return value !== "" ? { ...rest, [name]: newErrors[name] } : rest;
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    // Si es el campo "operation", analiza la cadena JSON
    const updatedValue = name === "operation" ? JSON.parse(value) : value;

    if (name === "type") {
      // Aquí deberías realizar una llamada a la API o base de datos para obtener el nuevo propertyTypeId
      try {
        const response = await fetch(`http://localhost:3001/types/${value}`); // Reemplaza con tu ruta y parámetros
        const data = await response.json();

        if (data.propertyTypeId) {
          setPropertyData({
            ...propertyData,
            type: value,
            propertyTypeId: data.propertyTypeId,
          });
        }
      } catch (error) {
        console.error("Error fetching property type", error);
      }
    } else {
      // Agregar la validación para convertir ciertos campos a valores numéricos
      const numericValue =
        name === "price" ||
        name === "bedrooms" ||
        name === "bathrooms" ||
        name === "googleMapsLatitude" ||
        name === "googleMapsLongitude"
          ? parseFloat(updatedValue) || 0
          : updatedValue;

      // Lógica para otros campos
      setPropertyData({
        ...propertyData,
        [name]: numericValue,
        updatedValue: updatedValue,
      });
    }
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
      const response = await fetch(`http://localhost:3001/types/${value}`);
      const data = await response.json();

      setPropertyData((prevData) => ({
        ...prevData,
        type: value,
        propertyTypeId: data.propertyTypeId,
      }));
    } catch (error) {
      console.error("Error fetching property type ID:", error);
      // Establecer el error del campo 'type' si hay un error en la petición
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        type: "Error al obtener el tipo de propiedad.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si hay errores antes de enviar la solicitud
    if (
      formErrors.title ||
      formErrors.type ||
      formErrors.description ||
      !propertyData.operation.length
    ) {
      console.error(
        "Hay errores en el formulario. Por favor, revisa los campos obligatorios."
      );
      return;
    }

    try {
      console.log("ID en handleSubmit:", id);

      const newImageArray = await handleCloudinaryUpload();

      const arrayToDelete = await handleCloudinaryDelete();

      const finalArray = newImageArray.filter(
        (element) => !arrayToDelete.includes(element)
      );

      console.log("arrayToDelete", arrayToDelete);
      console.log("FInalArray", finalArray);

      const updatedPropertyData = {
        ...propertyData,
        image: finalArray,
      };

      //Si se definió una imagen local como cover, espero a haber obtenido su url de Cloudinary
      if (typeof propertyData.coverImage === "number") {
        const coverIndex = propertyData.coverImage;
        updatedPropertyData.coverImage = finalArray[coverIndex];
      }

      // Enviar los datos actualizados al servidor
      const response = await axios.put(
        `http://localhost:3001/properties/${id}`,
        updatedPropertyData
      );
      console.log("Propiedad actualizada:", response.data);
      Swal.fire({
        text: "Propiedad actualizada",
        icon: "success",
        allowOutsideClick: false,
      }).then(() => navigate(`/properties/${id}`));
    } catch (error) {
      Swal.fire({
        text: "Error al actualizar la propiedad",
        icon: "error",
        allowOutsideClick: false,
      });
    }
  };

  //Maneja la carga temporal de imágenes para verse en preview, sin cargarse a cloudinary ni BBDD
  function handlePreviewUpload(event) {
    const file = event.target.files[0];

    // Si el usuario cancela la selección, no hace nada
    if (!file) {
      return;
    }

    // Muestra la miniatura inmediatamente
    const reader = new FileReader();
    reader.onload = () => {
      // Actualizar el estado local con la nueva imagen y la miniatura
      setTempMiniatures((prevData) => ({
        ...prevData,
        image: [
          ...prevData.image,
          {
            file: file,
            miniatureImage: reader.result,
            origin: "Local",
          },
        ],
      }));
    };

    reader.readAsDataURL(file);
  }

  //Maneja la eliminación temporal de imágenes para verse en preview, sin eliminarlas de cloudinary ni BBDD
  function handlePreviewDelete(event, origin, path) {
    event.preventDefault();
    const fieldToFilter = origin === "Remote" ? "path" : "miniatureImage";
    const filteredMiniatures = tempMiniatures.image.filter(
      (image) => image[fieldToFilter] !== path
    );
    console.log(filteredMiniatures);
    setTempMiniatures({ ...tempMiniatures, image: filteredMiniatures });
  }

  // Función para manejar la carga definitiva de imágenes
  const handleCloudinaryUpload = async (e) => {
    try {
      const imagesToUpload = tempMiniatures.image.length
        ? tempMiniatures.image.filter((elem) => elem.origin === "Local")
        : [];

      if (imagesToUpload.length) {
        const uploadedImages = await Promise.all(
          imagesToUpload.map(async ({ file }, index) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", presetName || "constanza"); // Reemplaza con tu upload preset de Cloudinary

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
        const backUpState = [...propertyData.image];
        const newImageArray = backUpState.concat(uploadedImages);
        setPropertyData({ ...propertyData, image: newImageArray });
        console.log("Carga con exito en cloudinary");
        return newImageArray;
      } else {
        console.log("No hay elementos para cargar en cloudinary");
        return [...propertyData.image];
      }
    } catch (error) {
      console.error("Error al cargar la imagen en cludinary", error);
    }
  };

  async function handleCloudinaryDelete() {
    //Obtención de las imágenes a eliminar
    let imagesToDelete = [];
    propertyData.image.forEach((elem) => {
      if (
        tempMiniatures.image.every(
          (temp) =>
            temp.origin === "Local" ||
            (temp.origin === "Remote" && temp.path !== elem)
        )
      )
        imagesToDelete.push(elem);
    });

    //Eliminación de imágenes de Cloudinary desde el back.
    if (imagesToDelete.length) {
      for (const imageUrl of imagesToDelete) {
        try {
          const response = await axios.delete(
            "http://localhost:3001/properties/deleteImage/",
            { data: { id, url: imageUrl } }
          );
          console.log(response.status);
          if (response.status === 200) {
            // Filtrar las imágenes eliminadas del state propertyData
            const updatedImages = propertyData.image.filter(
              (imgUrl) => imgUrl !== imageUrl
            );
            // Actualizar el state propertyData con las imágenes restantes
            setPropertyData({
              ...propertyData,
              image: updatedImages,
            });
          }
        } catch (error) {
          console.error(
            "Error al eliminar recursos de Cloudinary Front",
            error
          );
        }
      }
    } else console.log("No hay imagenes para borrar en cloudinary");

    return imagesToDelete;
  }

  return (
    <div className={styles.editPropertyContainer}>
      <section className={styles.editSectionOuter}>
        <div className={styles.createSectionInner}>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.70)",
              borderRadius: "5px",
              padding: "5% 3%",
            }}
          >
            <h1>Editar Propiedad</h1>
            <form className={styles.formEdit} onSubmit={handleSubmit}>
              <label htmlFor="title">Título:</label>
              {formErrors.title && (
                <span className={styles.error}>{formErrors.title}</span>
              )}

              <input
                type="text"
                className={styles.regularInput}
                id="title"
                name="title"
                value={propertyData.title}
                onChange={handleInputChange}
              />

              {/* <input type="text" id="description" name="description" value={propertyData.description} onChange={handleInputChange} /> */}
              <label htmlFor="description">Descripción:</label>
              {/* <input type="text" id="description" name="description" value={propertyData.description} onChange={handleInputChange} /> */}
              <textarea
                id="description"
                className={styles.regularInput}
                name="description"
                value={propertyData.description}
                onChange={handleInputChange}
                // placeholder="Ingrese la descripción de la propiedad..."
                rows="4" // Puedes ajustar el número de filas según tus necesidades
              ></textarea>
              {formErrors.description && (
                <span className={styles.error}>{formErrors.description}</span>
              )}

              <label htmlFor="streetAddress">Direccion:</label>
              <input
                type="text"
                className={styles.regularInput}
                id="streetAddress"
                name="streetAddress"
                value={propertyData.streetAddress}
                onChange={handleInputChange}
              />
              {formErrorss.streetAddress && (
                <p className={styles.error}>{formErrorss.streetAddress}</p>
              )}

              <label htmlFor="neighborhood">Barrio:</label>
              <input
                type="text"
                className={styles.regularInput}
                id="neighborhood"
                name="neighborhood"
                value={propertyData.neighborhood}
                onChange={handleInputChange}
              />
              {formErrorss.neighborhood && (
                <p className={styles.error}>{formErrorss.neighborhood}</p>
              )}

              <section className={styles.row}>
                <section className={styles.cell}>
                  <label htmlFor="bedrooms">Habitaciones:</label>
                  <input
                    type="number"
                    className={styles.smallInput}
                    id="bedrooms"
                    name="bedrooms"
                    value={propertyData.bedrooms}
                    onChange={handleInputChange}
                  />
                  {formErrorss.bedrooms && (
                    <p className={styles.error}>{formErrorss.bedrooms}</p>
                  )}
                </section>

                <section className={styles.cell}>
                  <label htmlFor="bathrooms">Baños:</label>
                  <input
                    type="number"
                    className={styles.smallInput}
                    id="bathrooms"
                    name="bathrooms"
                    value={propertyData.bathrooms}
                    onChange={handleInputChange}
                  />
                  {formErrorss.bathrooms && (
                    <p className={styles.error}>{formErrorss.bathrooms}</p>
                  )}
                </section>
              </section>

              <section className={styles.row}>
                <section className={styles.cell}>
                  <label htmlFor="hasGarage">Garage:</label>
                  <select
                    className={styles.smallInput}
                    id="hasGarage"
                    name="hasGarage"
                    onChange={handleInputChange}
                  >
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                  {formErrorss.hasGarage && (
                    <p className={styles.error}>{formErrorss.hasGarage}</p>
                  )}
                </section>

                <section className={styles.cell}>
                  <label htmlFor="hasPatio">Patio:</label>
                  <select
                    className={styles.smallInput}
                    id="hasPatio"
                    name="hasPatio"
                    onChange={handleInputChange}
                  >
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                  {formErrorss.hasPatio && (
                    <p className={styles.error}>{formErrorss.hasPatio}</p>
                  )}
                </section>
              </section>
              <section className={styles.row}>
                <section className={styles.cell}>
                  <label htmlFor="googleMapsLatitude">Latitude:</label>
                  <input
                    type="number"
                    className={styles.smallInput}
                    id="googleMapsLatitude"
                    name="googleMapsLatitude"
                    value={propertyData.googleMapsLatitude || ""}
                    onChange={handleInputChange}
                  />
                  {formErrorss.googleMapsLatitude && (
                    <p className={styles.error}>
                      {formErrorss.googleMapsLatitude}
                    </p>
                  )}
                </section>
                <section className={styles.cell}>
                  <label htmlFor="googleMapsLongitude">Longitude:</label>
                  <input
                    type="number"
                    className={styles.smallInput}
                    id="googleMapsLongitude"
                    name="googleMapsLongitude"
                    value={propertyData.googleMapsLongitude || ""}
                    onChange={handleInputChange}
                  />
                  {formErrorss.googleMapsLongitude && (
                    <p className={styles.error}>
                      {formErrorss.googleMapsLongitude}
                    </p>
                  )}
                </section>
              </section>
              <section className={styles.row}>
                <section className={styles.cell}>
                  <label>Tipo:</label>
                  <select
                    id="type"
                    className={styles.smallInput}
                    name="type"
                    value={propertyData.type}
                    onChange={handleTypeChange}
                  >
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Oficina">Oficina</option>
                    <option value="Terreno">Terreno</option>
                    <option value="Galpón">Galpón</option>
                    <option value="Local Comercial">Local Comercial</option>
                    <option value="Finca">Finca</option>
                    <option value="Fondo de Comercio">Fondo de Comercio</option>
                    <option value="Campo">Campo</option>
                    <option value="Cochera">Cochera</option>
                  </select>
                  {formErrors.type && (
                    <span className={styles.error}>{formErrors.type}</span>
                  )}
                </section>

                <section className={styles.cell}>
                  {/* Repite el patrón para otros campos */}
                  <label htmlFor="price">Precio:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={propertyData.price}
                    onChange={handleInputChange}
                  />
                  {formErrorss.price && (
                    <p className={styles.error}>{formErrorss.price}</p>
                  )}
                </section>
              </section>

              <label>Tipos de Operación:</label>
              <section className={styles.operationSection}>
                {!propertyData.operation.length && (
                  <span className={styles.error}>
                    Ingresar al menos un tipo de operación
                  </span>
                )}
                <div>
                  <input
                    type="checkbox"
                    id="Venta"
                    name="operation"
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
                  onChange={handlePreviewUpload}
                />
              </div>

              {/* Mostrar miniaturas de las imágenes seleccionadas */}
              {tempMiniatures.image && (
                <Miniatures
                  tempMiniatures={tempMiniatures}
                  handlePreviewDelete={handlePreviewDelete}
                  handleCoverImage={handleCoverImage}
                  cover={propertyData.coverImage}
                />
              )}

              <section className={styles.buttonSection}>
                <button className={styles.submit} type="submit">
                  Guardar Cambios
                </button>
                <button
                  className={styles.submit}
                  style={{ backgroundColor: "#567189" }}
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Regresar
                </button>
              </section>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditPropertyForm;
