import React from "react";
// import Icon1 from "../../assets/FACEBN.png";
import Icon2 from "../../assets/i3.png";
import Icon3 from "../../assets/w33.png";
import Icon4 from "../../assets/c3.png";
import Icon5 from "../../assets/t3.png";
import Icon6 from "../../assets/u3.png";
import "./NavSuperior.css";

const NavSuperior = () => {
  // {/* ----------------VARIABLES QUE SE PUEDEN MODIFICAR --------------------- */}

  const message = "¡Hola! Quisiera obtener más información.";
  const phoneNumber = "+5493515197368";
  const email = "constanzaespeche.dev@gmail.com";
  const location =
    "https://www.google.com/maps/place/Alvear+62,+G4200EKA+Santiago+del+Estero/@-27.7828979,-64.2713978,17z/data=!3m1!4b1!4m6!3m5!1s0x943b526ab5e6d60d:0x373b094533b3185a!8m2!3d-27.782898!4d-64.2665269!16s%2Fg%2F11tgbmvbxy?entry=ttu";

  return (
    <nav className="social-nav d-flex align-items-center navSuperiorContainer">
      <hr className="d-lg-none" />

      {/* ----------------ICONO TELEFONO Y NUMERO DE TELEFONO--------------------- */}
      <a
        href={`tel:${phoneNumber}`}
        className="phone-link"
        style={{
          height: "100%",
          position: "absolute",
          left: "3%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={Icon5} alt="Icon 5" style={{ height: "80%" }} />
        <span className="phone-number p-1 " style={{ fontSize: "0.9rem" }}>
          {phoneNumber}
        </span>
      </a>

      <ul className="iconsContainer">
        {/* ----------------ICONO Y LINK INSTAGRAM --------------------- */}

        <a
          href="https://www.instagram.com/inmobiliariaespeche"
          target="_blank"
          rel="noreferrer"
          className="instagram-link"
          style={{ zIndex: "100" }}
        >
          <img
            src={Icon2}
            alt="Icon 2"
            style={{ height: "80%", top: "10%", position: "relative" }}
            className="hover"
          />
        </a>

        {/* ----------------ICONO Y LINK WHATSAPP --------------------- */}

        <a
          href={`https://wa.me/5493541570774?text=${encodeURIComponent(
            message
          )}`}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-link"
          style={{ zIndex: "100" }}
        >
          <img
            src={Icon3}
            alt="Icon 3"
            style={{ height: "80%", top: "10%", position: "relative" }}
            className="hover"
          />
        </a>

        {/* ----------------ICONO Y LINK CORREO --------------------- */}

        <a
          href={`mailto:${email}`}
          className="email-link"
          style={{ zIndex: "100" }}
        >
          <img
            src={Icon4}
            alt="Icon 4"
            style={{ height: "80%", top: "10%", position: "relative" }}
            className="hover"
          />
        </a>

        {/* ----------------ICONO Y LINK UBICACION --------------------- */}

        <a
          href={location}
          target="_blank"
          rel="noreferrer"
          className="location-link"
          style={{ zIndex: "100" }}
        >
          <img
            src={Icon6}
            alt="Icon 4"
            style={{ height: "80%", top: "10%", position: "relative" }}
            className="hover"
          />
        </a>
      </ul>
    </nav>
  );
};

export default NavSuperior;
