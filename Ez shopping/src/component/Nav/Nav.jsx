import { NavLink } from "react-router-dom";
import "./Nav.scss";

import {
  getFromLocalStorage,
  isKeyInLocalStorage,
} from "../../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/selectors/userSelectors";
import { useEffect } from "react";
import { useState } from "react";
import { switchMode } from "../../store/slices/darkModeSlice";

import { BiSolidMoon } from "react-icons/bi";
import { BsSunFill } from "react-icons/bs";

export default function Nav() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [firstName, setFirstName] = useState("Anonyme");
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const style = ({ isActive }) => {
    return {
      color: isActive ? "white" : "gray",
      //   backgroundColor: isActive ? "white" : "rgb(31, 101, 115)",
    };
  };

  useEffect(() => {
    if (isKeyInLocalStorage("user")) {
      const firstName = getFromLocalStorage("user").firstName;
      firstName
        ? setFirstName(capitalizeFirstLetter(firstName))
        : setFirstName(capitalizeFirstLetter(user.firstName));
    }
  }, [user]);

  const toggleDarkMode = () => {
    dispatch(switchMode());
    setIsDarkMode(!isDarkMode); // Toggle the dark mode state
  };

  return (
    <nav className="nav-menu">
      <NavLink className="home-link" to={"/"}>
        EZ Shopping
      </NavLink>
      <div>
        <NavLink style={style} to={"/login"}>
          {firstName}
        </NavLink>
        <NavLink style={style} to={"/cart"}>
          Panier
        </NavLink>
        <div
          onClick={() => {
            toggleDarkMode();
          }}
          className="button-darkmode"
        >
          {isDarkMode ? <BsSunFill size={30} /> : <BiSolidMoon size={30} />}{" "}
          {/* Dark and light mode icons */}
        </div>
      </div>
    </nav>
  );
}
