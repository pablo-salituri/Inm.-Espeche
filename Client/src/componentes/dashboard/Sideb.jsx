import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleLoginLogout } from "../../redux/actions";
/* import { MdSpaceDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { IoStatsChartSharp, IoAddCircle } from "react-icons/io5"; */
import { IoChevronBack } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./Sidebar.module.css";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../Firebase/credentials";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const Sideb = ({ setShowSideBar }) => {
  const dispatch = useDispatch();
  const [role, setRole] = useState(null);

  const linksArray = [
    {
      label: "Inicio",
      labelRole: "all",
      // icon: <HomeDash />,
      to: "/",
    },
    {
      label: "Administrar Propiedades",
      labelRole: "all",
      // icon: <HomeDash />,
      to: "/admin/adminProps",
    },
    {
      label: "Agregar Propiedad",
      // icon: <HomeDash />,
      to: "/admin/crearPropiedad",
      labelRole: "all",
    },
    {
      label: "Crear Editor",
      // icon: <HomeDash />,
      to: "/admin/crearEditor",
      labelRole: "admin",
    },
    {
      label: "Administrar Editores",
      // icon: <HomeDash />,
      to: "/admin/eliminarEditor",
      labelRole: "admin",
    },
    {
      label: "Datos personales",
      // icon: <HomeDash />,
      to: "/admin/datosPersonales",
      labelRole: "all",
    },
    {
      label: "Cerrar Sesión",
      onClick: async () => {
        await signOut(auth);
        setTimeout(() => {
          window.location.href = "/";
          dispatch(
            handleLoginLogout({ operation: "handleloginlogout", uid: null })
          );
        }, 500);
      },
    },
  ];

  const uid = useSelector((state) => state.loggedUser);

  useEffect(() => {
    async function getData(uid) {
      const docuRef = doc(firestore, `usuarios/${uid}`);
      const docuCifrada = await getDoc(docuRef);
      setRole(docuCifrada.data().role);
    }

    getData(uid);
  }, []);

  return (
    <div className={style.sideBarContainer}>
      <div className={style.sidebar}>
        <div>
          <IoChevronBack
            className={style.contractIcon}
            onClick={() => setShowSideBar(false)}
          />
          {linksArray.map(({ icon, label, to, labelRole, onClick }) => (
            <div key={label}>
              {onClick ? ( // Si hay una función onClick, muestra el label como un botón
                <>
                  <div className={style.Linkicon}>{icon}</div>
                  <span className={style.LogoutLink} onClick={onClick}>
                    {label}
                  </span>
                </>
              ) : (
                (labelRole === "all" ||
                  (labelRole === "admin" && role === "admin")) && (
                  <NavLink
                    to={to}
                    className={(navData) =>
                      navData.isActive
                        ? `${style.Links} ${style.active}`
                        : style.Links
                    }
                  >
                    <div className={style.Linkicon}>{icon}</div>
                    <span>{label}</span>
                  </NavLink>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// {
//   label: "General",
//   icon: <MdSpaceDashboard />,
//   to: "/admin",
// },
// {
//   label: "Stats",
//   icon: <IoStatsChartSharp />,
//   to: "/stats",
// },
// {
//   label: "Comments",
//   icon: <FaCommentAlt />,
//   to: "/comments",
// },
// {
//   label: "Add Products",
//   icon: <IoAddCircle />,
//   to: "/form",
// },
// {
//   label: "Sign Out",
//   icon: <BiLogOut />,
//   to: "/",
// },
export default Sideb;
