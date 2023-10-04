import {
  addToLocalStorage,
  addToLocalStorageFromMiddleware,
  isKeyInLocalStorage,
} from '../../utils/localStorage';
import cartSlice from '../slices/cartSlice';

const saveBasketMiddleware = (store) => (next) => (action) => {
  const nextAction = next(action);
  if (action.type === cartSlice.actions.addItemToCart.toString()) {
    const productId = action.payload;

    addToLocalStorageFromMiddleware('cart', productId);
  }

  return nextAction;
};

export default saveBasketMiddleware;
