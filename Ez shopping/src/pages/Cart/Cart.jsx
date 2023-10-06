import { useDispatch, useSelector } from "react-redux";
import CartList from "../../component/CartList/CartList";
import "./Cart.scss";
import { removeAllItems } from "../../store/slices/cartSlice";
import { selectCart } from "../../store/selectors/cartSelectors";
import { selectUser } from "../../store/selectors/userSelectors";
import { selectDarkMode } from "../../store/selectors/darkModeSelectors";
import { capitalizeFirstLetter } from '../../utils/capitalize';
import {
  getFromLocalStorage,
  isKeyInLocalStorage,
} from "../../utils/localStorage";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const userSelector = useSelector(selectUser);
  const darkMode = useSelector(selectDarkMode);

  const user = () => {
    return isKeyInLocalStorage("user")
      ? getFromLocalStorage("user")
      : userSelector;
  };
  console.log(user);

  const handleClick = () => {
    dispatch(removeAllItems());
  };
  return (
    <div style={{ minHeight: "100vh" }} className="cart-parent">
      <div className="cart-title-and-button-box">
        {cart.length > 0 ? (
          <h1>
          {user().firstName.length > 0
            ? `${capitalizeFirstLetter(user().firstName)},`
            : `${capitalizeFirstLetter(user().firstName)}`}{' '}
          voici votre panier
        </h1>
        ) : (
          <h1>
          {user().firstName.length > 0
            ? `${capitalizeFirstLetter(user().firstName)},`
            : `${capitalizeFirstLetter(user().firstName)}`}{' '}
          votre panier est vide
        </h1>
        )}

        {cart.length > 0 && (
          <div className="cart-button-remove-all">
            <button
              className={
                darkMode
                  ? "dark-rem-all cart-remove-all-button"
                  : "light-rem-all cart-remove-all-button"
              }
              onClick={() => {
                handleClick();
              }}
            >
              Vider le panier
            </button>
          </div>
        )}
      </div>
      <CartList />
    </div>
  );
}
