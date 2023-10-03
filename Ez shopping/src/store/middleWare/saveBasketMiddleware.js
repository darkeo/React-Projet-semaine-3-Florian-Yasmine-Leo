import { addToLocalStorage } from '../../utils/localStorage';
import cartSlice from '../slices/cartSlice';

const saveBasketMiddleware = (store) => (next) => (action) => {
  const nextAction = next(action);
  if (action.type === cartSlice.actions.addItemToCart.toString()) {
    const productId = action.payload;
    addToLocalStorage('panier', { panier: [productId] });
  }

  return nextAction;
};

export default saveBasketMiddleware;
