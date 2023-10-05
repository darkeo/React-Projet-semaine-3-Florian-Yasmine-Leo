import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../store/selectors/cartSelectors';
import './CartList.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  decreaseQuantity,
  increaseQuantity,
  removeAllItems,
  removeItem,
} from '../../store/slices/cartSlice';
import {
  getFromLocalStorage,
  isKeyInLocalStorage,
} from '../../utils/localStorage';

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

  const handleRemoveAll = () => {
    dispatch(removeAllItems());
  };

  return (
    <>
      <div className='cartPage'>
        <h2>Votre panier</h2>
        <div>
          {cartProducts.map((product, index) => {
            return (
              <div key={`${product.id}${index}`}>
                <div>
                  <img src={product.image} alt={product.title} />
                </div>
                <div>
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <p>{product.price} €</p>
                  <div>
                    <button
                      onClick={() => {
                        handleDecrease(product.id, product.quantity);
                      }}
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() => {
                        handleIncrease(product.id);
                      }}
                    >
                      +
                    </button>
                  </div>{' '}
                  <button
                    onClick={() => {
                      handleRemove(product.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            handleRemoveAll();
          }}
        >
          Remove All
        </button>
      </div>
    </>
  );
};

export default CartList;
