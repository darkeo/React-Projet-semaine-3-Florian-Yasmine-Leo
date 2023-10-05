import { useDispatch, useSelector } from 'react-redux';
import CartList from '../../component/CartList/CartList';
import './Cart.scss';
import { removeAllItems } from '../../store/slices/cartSlice';
import { selectCart } from '../../store/selectors/cartSelectors';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const handleClick = () => {
    dispatch(removeAllItems());
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      {cart.length > 0 ? <h1>Votre Panier</h1> : <h1>Votre Panier est vide</h1>}
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
