import { useEffect } from "react";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import Swal from "sweetalert2";
import styles from "./Miniatures.module.css";

export default function Miniatures({
  tempMiniatures,
  handlePreviewDelete,
  handleCoverImage,
  cover,
}) {
  useEffect(() => {
    console.log("rerender");
  }, [cover]);

  return (
    <div className={styles.container}>
      {tempMiniatures.image.map((imageUrl, index) => {
        const url =
          imageUrl.origin === "Remote"
            ? imageUrl.path
            : imageUrl.miniatureImage;
        return (
          <div
            key={index}
            className="thumbnail-item"
            style={{ marginRight: "10px" }}
          >
            <img
              src={url}
              alt={`Thumbnail ${index}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />

            <button
              onClick={(event) => {
                if (
                  url === cover ||
                  (typeof cover === "number" && cover === index)
                ) {
                  event.preventDefault();
                  Swal.fire({
                    text: "No se puede eliminar una foto de portada",
                    icon: "error",
                    allowOutsideClick: false,
                  });
                } else {
                  handlePreviewDelete(event, imageUrl.origin, url);
                }
              }}
              className={styles.deleteButton}
            >
              X
            </button>

            <div
              onClick={() => {
                url !== cover && handleCoverImage(url, index);
              }}
              className={`${styles.star} ${
                url !== cover ? styles.pointerHover : ""
              }`}
            >
              {/*Como las rutas locales son muy largas, guardo la posicion del elemento. Antes de hacer el PUT del estado local, lo cambio por la URL correspondiente de cloudinary */}
              {url === cover ||
              (typeof cover === "number" && cover === index) ? (
                <IoIosStar />
              ) : (
                <IoIosStarOutline />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
