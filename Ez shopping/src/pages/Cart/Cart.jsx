import { useDispatch } from 'react-redux';
import CartList from '../../component/CartList/CartList';
import './Cart.scss';
import { removeAllItems } from '../../store/slices/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeAllItems());
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <h1>Votre Panier</h1>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Vider le panier
      </button>
      <CartList />
    </div>
  );
}
