const ValidateForm = (formData) => {
    const errors = {};
  


  
    // // Validar el título
    // if (!formData.title) {
    //   errors.title = "* Este campo es obligatorio";
    // }
  
    // // Validar la descripción
    // if (!formData.description) {
    //   errors.description = "* Este campo es obligatorio";
    // }
  
    // Validar el precio (números enteros)
    if (!Number.isInteger(Number(formData.price))) {
      errors.price = "El precio debe ser un número entero";
    }
  
    // Validar el barrio
    if (!/^[a-zA-Z0-9\s]+$/.test(formData.neighborhood)) {
      errors.neighborhood = "El barrio debe contener letras y números solamente";
    }
  
    // Validar habitaciones y baños (números positivos)
  
    if (formData.bedrooms < 0) {
      errors.bedrooms = "Error";
    }
  
    if (formData.bathrooms < 0) {
      errors.bathrooms = "Error";
    }
  
    // Validar patio y garage (solo texto)
    const textOnlyRegex = /^[a-zA-Z\s]+$/;
  
    if (!textOnlyRegex.test(formData.hasGarage)) {
      errors.hasGarage = "Garage debe contener solo texto";
    }
  
    if (!textOnlyRegex.test(formData.hasPatio)) {
      errors.hasPatio = "Patio debe contener solo texto";
    }
  
    // Validar dirección
    if (!/^[a-zA-Z0-9\s]+$/.test(formData.streetAddress)) {
      errors.streetAddress = "La dirección debe contener letras y números solamente";
    }
  
    // Validar latitud y longitud (números decimales)
    const decimalNumberRegex = /^-?\d+(\.\d+)?$/;
  
    if (!decimalNumberRegex.test(formData.googleMapsLatitude)) {
      errors.googleMapsLatitude = "Escriba la Latitud proporcionada por Google Maps";
    }
  
    if (!decimalNumberRegex.test(formData.googleMapsLongitude)) {
      errors.googleMapsLongitude = "Escriba la Longitud proporcionada por Google Maps";
    }
  
    return errors;
  };
  
 
  
  
  export default ValidateForm;