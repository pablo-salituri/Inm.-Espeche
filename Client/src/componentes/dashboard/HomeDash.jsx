import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sideb";
import styles from "./HomeDash.module.css";
import SmallCardDash from "./CardDash/SmallCardsDash";
import CardsDash from "./CardDash/CardsDash";
import SearchBar from "../SearchBar/SearchBar";
import firebaseApp from "../Firebase/credentials";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const firestore = getFirestore(firebaseApp);

const HomeDash = () => {
  const uid = useSelector((state) => state.loggedUser);
  const [width, setWidth] = useState(window.innerWidth);
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    async function getData(uid) {
      const docuRef = doc(firestore, `usuarios/${uid}`);
      const docuCifrada = await getDoc(docuRef);
      const infoFinal = docuCifrada.data();
      console.log(infoFinal);
    }

    getData(uid);
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
    <div className={styles.dashContainer}>
      {showSideBar && <Sidebar setShowSideBar={setShowSideBar} />}
      <div className={styles.dashBody}>
        <section
          style={{
            width: "85%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            type="button"
            className={styles.menuBurgerButton}
            onClick={() => setShowSideBar(!showSideBar)}
          >
            <FontAwesomeIcon icon={faBars} className="icono" />
          </button>
          <SearchBar />
        </section>
        {width < 650 ? <SmallCardDash /> : <CardsDash />}
      </div>
    </div>
  );
};

export default HomeDash;
// export default withAuthenticationRequired(HomeDash);
