import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./DropdownFilters.module.css";

export default function DropdownFilters({ x, y, handleLocalFilters, field }) {
  const [position, setPosition] = useState({ left: parseInt(x, 10), top: y });
  const [containerWidth, setContainerWidth] = useState(null);
  const dropDownFilterRef = useRef(null);

  const filtersApplied = useSelector((state) => state.filtersApplied);

  const data = {
    operation: ["Todas", "Alquiler", "Venta", "Temporario"],
    type: [
      "Todas",
      "Departamento",
      "Casa",
      "Oficina",
      "Local Comercial",
      "Galpón",
      "Cochera",
      "Finca",
      "Fondo de Comerio",
      "Terreno",
      "Campo",
    ],
    bedrooms: ["Todas", 1, 2, 3, 4],
  };

  function checkVisibility(row, field, index) {
    switch (true) {
      case index === 0 && filtersApplied[field] === "all":
        return "visible";
      case filtersApplied[field] === row:
        return "visible";
      case filtersApplied[field] === "Alquiler Temporario" &&
        row === "Temporario":
        return "visible";
      default:
        return "hidden";
    }
  }

  useEffect(() => {
    setPosition({ left: parseInt(x, 10), top: y });
    if (dropDownFilterRef.current) {
      const width = dropDownFilterRef.current.offsetWidth;
      setContainerWidth(width);
    }
  }, [x, y]);

  return (
    <div
      className={styles.dropDownContainer}
      ref={dropDownFilterRef}
      style={{
        left: position.left - containerWidth / 2,
        top: position.top - 50,
        zIndex: "3",
        position: "absolute",
      }}
    >
      <table style={{ borderCollapse: "separate", borderSpacing: "12px 0" }}>
        <tbody>
          {data[field].map((row, index) => (
            <tr key={row}>
              <td
                style={{ textAlign: "left" }}
                onClick={() =>
                  handleLocalFilters(
                    field,
                    row === "Todas"
                      ? "all"
                      : row === "Temporario"
                      ? "Alquiler Temporario"
                      : row
                  )
                }
              >
                {row}
              </td>
              <td style={{ visibility: checkVisibility(row, field, index) }}>
                ✓
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
