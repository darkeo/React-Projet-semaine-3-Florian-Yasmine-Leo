import { useDispatch, useSelector } from 'react-redux';
import CartList from '../../component/CartList/CartList';
import './Cart.scss';
import { removeAllItems } from '../../store/slices/cartSlice';
import { selectCart } from '../../store/selectors/cartSelectors';
import { selectUser } from '../../store/selectors/userSelectors';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  console.log(user);

  const handleClick = () => {
    dispatch(removeAllItems());
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      {cart.length > 0 ? (
        <h1>{user.firstName}, voici votre panier</h1>
      ) : (
        <h1>{user.firstName}, Votre Panier est vide</h1>
      )}
      {cart.length > 0 && (
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Vider le panier
        </button>
      )}

      <CartList />
    </div>
  );
}
