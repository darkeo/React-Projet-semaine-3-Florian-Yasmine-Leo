import { NavLink } from "react-router-dom";
import "./Nav.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/selectors/userSelectors"; // Update the import path as needed
import { selectFormValidation } from "../../store/selectors/userSelectors";

export default function Nav() {
  const user = useSelector(selectUser);
  const userValid = useSelector(selectFormValidation);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const style = ({ isActive }) => {
    return {
      color: isActive ? "white" : "gray",
      //   backgroundColor: isActive ? "white" : "rgb(31, 101, 115)",
    };
  };
  return (
    <nav className="nav-menu">
      <NavLink className="home-link" to={"/"}>
        EZ Shopping
      </NavLink>
      <div>
        <NavLink style={style} to={"/login"}>
          {userValid
            ? `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(
                user.lastName
              )}`
            : "Anonyme"}
        </NavLink>
        <NavLink style={style} to={"/cart"}>
          items:
        </NavLink>
        <button>
          darkmode
        </button>
      </div>
    </nav>
  );
}
