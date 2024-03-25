import React from "react";
import "./Form.css";

import { useState } from "react";

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setFormData({
//       nombre: "",
//       telefono: "",
//       email: "",
//       consulta: "",
//     });
//   };

//   return (
//     <form
//       className="form"
//       action="https://formspree.io/f/mnqkwgbz" // Agrega el enlace proporcionado por Formspree
//       method="POST"
//       onSubmit={handleSubmit}
//     >
//       <h5 className="titulo">CONTACTANOS</h5>
//       <div className="form-row">
//         <div className="form-group">
//           <label htmlFor="nombre"></label>
//           <input
//             placeholder="Nombre"
//             type="text"
//             name="nombre"
//             value={formData.nombre}
//             onChange={handleChange}
//             className="form-control input-field"
//             id="nombre"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="telefono"></label>
//           <input
//             type="tel"
//             placeholder="Teléfono"
//             name="telefono"
//             value={formData.telefono}
//             onChange={handleChange}
//             className="form-control input-field"
//             id="telefono"
//             title="INGRESA SOLO NUMEROS."
//             inputMode="numeric"
//             pattern="^[0-9]{7,14}$"
//             required
//           />
//         </div>
//       </div>
//       <div className="form-group">
//         <label htmlFor="email"></label>
//         <input
//           placeholder="Email"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="form-control input-field"
//           id="email"
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="consulta"></label>
//         <textarea
//           placeholder="Consulta"
//           name="consulta"
//           value={formData.consulta}
//           onChange={handleChange}
//           className="form-control input-field"
//           id="consulta"
//           rows="5"
//           required
//         />
//       </div>
//       <button type="submit" className="btn btn-primary m-3">
//         Solicitar Información
//       </button>
//     </form>
//   );
// };

const ContactForm = ({ propertyTitle }) => {
  const initialFormData = {
    nombre: "",
    telefono: "",
    email: "",
    consulta: "",
  };

  const fullUrl = window.location.href;

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event) => {
    // event.preventDefault();
    // Restablece los valores de los campos a sus valores iniciales
    setFormData(initialFormData);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="form"
      // Coti
      action="https://formspree.io/f/mnqkwgbz"
      // Pablo
      // action="https://formspree.io/f/xknldwwj"
      method="POST"
    >
      <h5 className="titulo">CONTACTANOS</h5>
      <div className="form-row">
        <div className="form-group">
          <input type="hidden" name="Link" value={fullUrl} />
          <input
            type="hidden"
            name="Nombre de la Propiedad"
            value={propertyTitle}
          />
          <label htmlFor="nombre"></label>
          <input
            placeholder="Nombre"
            type="text"
            name="nombre"
            className="form-control input-field"
            id="nombre"
            required
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono"></label>
          <input
            type="tel"
            placeholder="Teléfono"
            name="telefono"
            className="form-control input-field"
            id="telefono"
            title="INGRESA SOLO NUMEROS."
            inputMode="numeric"
            pattern="^[0-9]{7,14}$"
            required
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
          />
          {/* <small className="form-text text-muted">Solo numeros</small> */}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email"></label>
        <input
          placeholder="Email"
          name="email"
          type="email"
          className="form-control input-field"
          id="email"
          required
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="consulta"></label>
        <textarea
          placeholder="Consulta"
          name="consulta"
          className="form-control input-field"
          id="consulta"
          rows="5"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <section className="buttonContainer">
        <button type="submit" className="btn btn-primary m-3">
          Solicitar Información
        </button>
      </section>
    </form>
  );
};

export default ContactForm;
