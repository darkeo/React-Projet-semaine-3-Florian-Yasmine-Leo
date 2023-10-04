import { addToLocalStorage } from '../../utils/localStorage';
import cartSlice from '../slices/cartSlice';

const saveBasketMiddleware = (store) => (next) => (action) => {
  const nextAction = next(action);
  const cart = store.getState().cart.cart;
  if (
    action.type === cartSlice.actions.addItemToCart.toString() ||
    action.type === cartSlice.actions.decreaseQuantity.toString() ||
    action.type === cartSlice.actions.increaseQuantity.toString() ||
    action.type === cartSlice.actions.removeItem.toString()
  ) {
    console.log(cart);
    addToLocalStorage('cart', cart);
  }

  return nextAction;
};

export default saveBasketMiddleware;
