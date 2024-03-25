import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import "./Unauthorized.css";
// import robotImage from "./BrokenRobot.png";

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let seconds = 5;

    const timeout = setInterval(() => {
      document.getElementById("countdown").innerText = seconds;
      seconds--;

      if (seconds < 0) {
        // Redirige después de 3 segundos
        // window.location.replace("/");
        navigate("/");
        clearInterval(timeout);
      }
    }, 1000);

    return () => clearInterval(timeout);
  }, []);

  return (
    <div className="unauthorized-container">
      {/* <img
        src={robotImage}
        alt="Unauthorized robot"
        className="unauthorized-image"
      /> */}
      <h2 className="unauthorized-title">
        Oops... No estás autorizado para ingresar aquí
      </h2>
      <h4>
        Serás redirigido en <span id="countdown">5</span> segundos
      </h4>
    </div>
  );
};

export default Unauthorized;
