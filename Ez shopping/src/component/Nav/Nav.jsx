import { NavLink } from "react-router-dom";
import "./Nav.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/selectors/userSelectors"; // Update the import path as needed

export default function Nav() {
  const user = useSelector(selectUser);
  console.log(user, "user");
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
      <div className="">
        <NavLink style={style} to={"/login"}>
          {`${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(
            user.lastName
          )}`}
        </NavLink>
        <NavLink style={style} to={"/cart"}>
          items: 
        </NavLink>
        <NavLink style={style} to={" "}>
          darkmode
        </NavLink>
      </div>
    </nav>
  );
}
