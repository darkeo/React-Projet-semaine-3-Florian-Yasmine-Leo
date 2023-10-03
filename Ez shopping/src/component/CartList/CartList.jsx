import { useSelector } from "react-redux";
import { selectCart } from "../../store/selectors/cartSelectors";
import "./CartList.scss";

const CartList = () => {
  const cartItems = useSelector(selectCart);
  
  console.log(cartItems, 'items added')
  return (
    <div>
      <h2>Votre panier</h2>
      <div>
        {/* {cartItems?.map((item) => (
          <div key={item.id}>
            <h3>{item.title} </h3>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default CartList;
