import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../store/selectors/cartSelectors';
import './CartList.scss';
import { useEffect } from 'react';
import { selectProducts } from '../../store/selectors/productsSelectors';
import { useState } from 'react';
import {
  copyLocalStorageToCArt,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from '../../store/slices/cartSlice';
import { lazy } from 'react';
import {
  addToLocalStorage,
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
    // Si localStorage contient des produits >> copier le localStorage dans le cart de Redux
    dispatch(copyLocalStorageToCArt());

    console.log(cart);

    const ids = cart.map((product) => {
      return product.id;
    });
    console.log(ids);
    console.log(products);
    const cartItems = products.filter((product) => {
      return ids.includes(product.id);
    });
    console.log(cartItems);
    setCartProducts(cartItems);
  }, []);

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const getQuantityFromCart = (productId) => {
    const filteredProduct = cart.filter((product) => {
      return product.id === productId;
    });
    console.log(filteredProduct);
    console.log(filteredProduct[0].quantity);
    return filteredProduct[0].quantity;
  };

  return (
    <div>
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
                      handleDecrease(product.id);
                    }}
                  >
                    -
                  </button>
                  <span>{getQuantityFromCart(product.id)}</span>
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
    </div>
  );
};

export default CartList;
