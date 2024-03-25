import React, { useState, useEffect } from "react";
import Icon2 from "../../assets/i3.png";
import Icon3 from "../../assets/w33.png";
import Icon4 from "../../assets/c3.png";
import Icon6 from "../../assets/u3.png";
import "./Footer.css";

const Footer = () => {
  const slogans = [
    "Inverti en vivir tranquilo",
    "Tu hogar, tu felicidad",
    "Calidad y comodidad garantizada",
    "Inversiones seguras y rentables",
    "Tenemos lo que buscas",
    "El lugar perfecto para empezar tu historia",
    "Calidad y confianza en cada propiedad.",
    "Encuentra tu espacio ideal con nosotros.",
  ];

  const [currentSlogan, setCurrentSlogan] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeSlogan = () => {
      const randomIndex = Math.floor(Math.random() * slogans.length);
      setCurrentSlogan(slogans[randomIndex]);
    };

    changeSlogan();

    const interval = setInterval(changeSlogan, 5000);

    return () => clearInterval(interval);
  }, []);

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
    <footer className="footerContainer">
      <div className="slogan-container">
        <div className="slogan">{currentSlogan}</div>
      </div>
      <div className="belowFooterContainer">
        <section className="leftSection">
          <a
            href="https://wa.me/5493541570774?text=¡Hola! Quisiera obtener más información."
            target="_blank"
            rel="noreferrer"
          >
            <img src={Icon3} alt="WhatsApp" />
          </a>
          <a
            href="https://www.instagram.com/inmobiliariaespeche"
            target="_blank"
            rel="noreferrer"
            className="social-link mx-1"
          >
            <img src={Icon2} alt="Instagram" />
          </a>
        </section>

        <section className="middleSection">
          © 2023 Mi Sitio Web. Todos los derechos reservados.
        </section>

        <section className="rightSection">
          {width > 1024 && (
            <>
              <a
                href="https://wa.me/5493541570774?text=¡Hola! Quisiera obtener más información."
                target="_blank"
                rel="noreferrer"
              >
                <img src={Icon3} alt="WhatsApp" />
              </a>
              <a
                href="https://www.instagram.com/inmobiliariaespeche"
                target="_blank"
                rel="noreferrer"
                className="social-link mx-1"
              >
                <img src={Icon2} alt="Instagram" />
              </a>
            </>
          )}
          <a
            href="mailto:constanzaespeche.dev@gmail.com"
            className="social-link mx-1"
          >
            <img src={Icon4} alt="Correo" />
          </a>
          <a
            href="https://www.google.com/maps/place/Alvear+62,+G4200EKA+Santiago+del+Estero/@-27.7828979,-64.2713978,17z/data=!3m1!4b1!4m6!3m5!1s0x943b526ab5e6d60d:0x373b094533b3185a!8m2!3d-27.782898!4d-64.2665269!16s%2Fg%2F11tgbmvbxy?entry=ttu"
            target="_blank"
            rel="noreferrer"
            className="social-link mx-1"
          >
            <img src={Icon6} alt="Ubicación" />
          </a>
        </section>
      </div>
    </footer>
  );
};

export default Footer;

// import React, { useState, useEffect } from "react";
// import "./Footer.css"; // Importa el archivo CSS personalizado

// import { random } from "lodash"; // Importa la función random de la biblioteca lodash

// const Footer = () => {
//   const slogans = [
//     "Inverti en vivir tranquilo",
//     "Tu hogar, tu felicidad",
//     "Calidad y comodidad garantizada",
//     "Inversiones seguras y rentables",
//     "Tenemos lo que buscas",
//     "El lugar perfecto para empezar tu historia",
//     "Calidad y confianza en cada propiedad.",
//     "Encuentra tu espacio ideal con nosotros."
//   ];

//   const [currentSlogan, setCurrentSlogan] = useState("");

//   useEffect(() => {
//     const changeSlogan = () => {
//       const randomIndex = Math.floor(Math.random() * slogans.length);
//       setCurrentSlogan(slogans[randomIndex]);
//     };

//     changeSlogan();

//     const interval = setInterval(changeSlogan, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <footer>
//       <div className="slogan-container">
//         <div className="slogan">{currentSlogan}</div>
//       </div>

//       <div className="footer bg-dark">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12 text-center bg-dark">
//               <h6>© 2023 Mi Sitio Web. Todos los derechos reservados.</h6>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
