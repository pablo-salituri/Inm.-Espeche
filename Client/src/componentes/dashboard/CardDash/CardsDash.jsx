import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAllProperty } from "../../../redux/actions";
import CardDashDelete from "./CardDashDelete";
import styles from "./CardsDash.module.css";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import EditPropertyForm from "../EditPropertyForm"; // Importa el formulario de edición

const CardsDash = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.filteredProperties);
  const [editingPropertyId, setEditingPropertyId] = useState(null);

  useEffect(() => {
    dispatch(getAllProperty());
  }, [dispatch]);

  // Función para manejar el clic en el botón de editar
  const handleEditClick = (propertyId) => {
    setEditingPropertyId(propertyId);
  };

  return (
    <div className={styles.pag}>
      <div className={styles.containerDash}>
        <div className={styles.linkk}>
          <h2>Propiedades</h2>
          <hr></hr>

          <table>
            <thead>
              <tr>
                <td>Titulo</td>
                <td>Operacion</td>
                <td>Habitaciones</td>
                <td>Barrio</td>
                <td>Precio</td>
                <td colSpan={2}>Status</td>
              </tr>
            </thead>

            <tbody>
              {properties.length
                ? properties.map((property) => (
                    <tr key={property.id}>
                      <td>{property.title}</td>
                      <td>{property.operation?.join(", ")}</td>
                      <td>{property.bedrooms}</td>
                      <td>{property.neighborhood}</td>
                      <td>{property.price.toLocaleString()}</td>
                      <td>
                        <CardDashDelete id={property.id} />
                      </td>
                      <td>
                        {/* Utiliza Link para navegar a la página de edición */}
                        <Link to={`/admin/editarPropiedad/${property.id}`}>
                          <button
                            className={styles.editar}
                            onClick={() => handleEditClick(property.id)}
                          >
                            <FiEdit />
                          </button>
                        </Link>
                      </td>
                      {/* Renderizar el formulario de edición si está en modo de edición */}
                      {editingPropertyId === property.id && (
                        <td>
                          <EditPropertyForm
                            id={property.id} // Cambiado a 'id' en lugar de 'propertyId'
                            onCancel={() => setEditingPropertyId(null)}
                          />
                        </td>
                      )}
                    </tr>
                  ))
                : // <Error404 />
                  null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CardsDash;
