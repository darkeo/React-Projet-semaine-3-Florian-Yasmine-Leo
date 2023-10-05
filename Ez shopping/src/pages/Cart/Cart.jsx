import { useDispatch, useSelector } from 'react-redux';
import CartList from '../../component/CartList/CartList';
import './Cart.scss';
import { removeAllItems } from '../../store/slices/cartSlice';
import { selectCart } from '../../store/selectors/cartSelectors';
import { selectUser } from '../../store/selectors/userSelectors';
import {
  getFromLocalStorage,
  isKeyInLocalStorage,
} from '../../utils/localStorage';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const userSelector = useSelector(selectUser);
  const user = () => {
    return isKeyInLocalStorage('user')
      ? getFromLocalStorage('user')
      : userSelector;
  };
  console.log(user);

  const handleClick = () => {
    dispatch(removeAllItems());
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      {cart.length > 0 ? (
        <h1>
          {user().firstName.length > 0
            ? `${user().firstName},`
            : `${user().firstName}`}{' '}
          voici votre panier
        </h1>
      ) : (
        <h1>{`${user().firstName},`} votre Panier est vide</h1>
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
