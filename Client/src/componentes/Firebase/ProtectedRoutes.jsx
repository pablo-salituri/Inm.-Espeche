import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Unauthorized from "./unauthorized";
import Loading from "../Various/Loading";
import firebaseApp from "./credentials";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

const ProtectedRoutes = ({ allowedRoles }) => {
  const [isLoading, setIsLoading] = useState(true);

  const uid = useSelector((state) => state.loggedUser);
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function getData(uid) {
      const docuRef = doc(firestore, `usuarios/${uid}`);
      const docuCifrada = await getDoc(docuRef);

      if (docuCifrada.exists()) {
        const infoFinal = docuCifrada.data();
        infoFinal !== undefined && setRole(infoFinal.role);
      } else {
        setRole("unauthorized");
      }

      setIsLoading(false);
    }

    getData(uid);
  }, [uid]);

  switch (true) {
    case isLoading:
      return <Loading />;

    // El usuario existe, pero no tiene el rol adecuado
    case role === "unauthorized":
      return <Unauthorized />;

    // El usuario no existe
    case !allowedRoles.includes(role):
      return <Unauthorized />;
    default:
      return <Outlet />;
  }
};

export default ProtectedRoutes;
