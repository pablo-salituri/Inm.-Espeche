import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { setFilters } from "../../redux/actions";
import { HiHome } from "react-icons/hi2";
import { IoIosBed } from "react-icons/io";
import DropdownFilters from "./DropdownFilters";
import styles from "./MobileFilter.module.css";

export default function MobileFilter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const filtersOnRedux = useSelector((state) => state.filtersApplied);

  const [showDropDown, setShowDropDown] = useState(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const handleDropDownMenu = (event, field) => {
    setShowDropDown(showDropDown === field ? null : field);
    const buttonClicked = event.currentTarget.getBoundingClientRect();
    const x = `${buttonClicked.x + buttonClicked.width / 2}px`;
    const y = `${buttonClicked.y + buttonClicked.height + 6}px`;
    setButtonPosition({ x, y });
  };

  function handleLocalFilters(filter, value) {
    if (filter === "bedrooms" && value !== "all") value = parseInt(value);
    dispatch(setFilters({ ...filtersOnRedux, [filter]: value }));
    navigate("/properties/");
  }

  return (
    <>
      <div className={styles.mobileFilterContainer}>
        <section
          className={styles.iconContainer}
          style={{ height: location.pathname === "/" ? "75%" : "90%" }}
          onClick={(event) => handleDropDownMenu(event, "operation")}
        >
          <FaArrowRightArrowLeft className={styles.icon} />
        </section>
        <section
          className={styles.iconContainer}
          style={{ height: location.pathname === "/" ? "75%" : "90%" }}
          onClick={(event) => handleDropDownMenu(event, "type")}
        >
          <HiHome className={styles.icon} />
        </section>
        <section
          className={styles.iconContainer}
          style={{ height: location.pathname === "/" ? "75%" : "90%" }}
          onClick={(event) => handleDropDownMenu(event, "bedrooms")}
        >
          <IoIosBed className={styles.icon} />
        </section>
      </div>
      {showDropDown && (
        <DropdownFilters
          x={buttonPosition.x}
          y={buttonPosition.y}
          handleLocalFilters={handleLocalFilters}
          field={showDropDown}
        />
      )}
    </>
  );
}
