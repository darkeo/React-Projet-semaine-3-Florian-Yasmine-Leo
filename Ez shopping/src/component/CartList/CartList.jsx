import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../store/selectors/cartSelectors';
import '../ProductList/ProductList.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from '../../store/slices/cartSlice';
import {
  getFromLocalStorage,
  isKeyInLocalStorage,
} from '../../utils/localStorage';
import Product from '../ProductList/Product';
import { selectProducts } from '../../store/selectors/productsSelectors';

const CartList = () => {
  const cart = useSelector(selectCart);
  const products = getFromLocalStorage('products') || [];
  const dispatch = useDispatch();
  const localStorageCart = () => {
    if (isKeyInLocalStorage('cart')) {
      return getFromLocalStorage('cart');
    }
    return false;
  };

  console.log(localStorageCart());

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const ids = cart.map((product) => product.id);

    // Filter the products based on the IDs from the cart
    const cartItems = products.filter((product) => ids.includes(product.id));

    // Update the quantities for each cart item from the cart data
    const cartItemsWithQuantities = cartItems.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      return { ...product, quantity: cartItem ? cartItem.quantity : 0 };
    });

    console.log(cartItemsWithQuantities);

    setCartProducts(cartItemsWithQuantities);
  }, [cart]);

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleDecrease = (productId, productQuantity) => {
    if (productQuantity <= 1) {
      dispatch(removeItem(productId));
      return;
    }
    dispatch(decreaseQuantity(productId));
  };

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  return (
    <div>
      <div className='product-list'>
        {cartProducts.map((product, index) => {
          return (
            <Product
              isInCart={true}
              key={`${product.id}${index}`}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
              handleDecrease={() => {
                handleDecrease(product.id, product.quantity);
              }}
              handleIncrease={() => {
                handleIncrease(product.id);
              }}
              handleRemove={() => {
                handleRemove(product.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CartList;
