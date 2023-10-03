import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../store/selectors/cartSelectors';
import './CartList.scss';
import { useEffect } from 'react';
import { selectProducts } from '../../store/selectors/productsSelectors';
import { useState } from 'react';
import { removeItem } from '../../store/slices/cartSlice';
import { lazy } from 'react';
import { addToLocalStorage } from '../../utils/localStorage';

const CartList = () => {
  const cartIds = useSelector(selectCart);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const cartItems = products.filter((product) => {
      return cartIds.includes(product.id);
    });
    setCartProducts(cartItems);
    console.log(cartProducts);
  }, [cartIds]);

  useEffect(() => {
    addToLocalStorage('cart', cartProducts);
  }, [cartProducts]);

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleDecrease = (product) => {
    const newCartProducts = cartProducts.map((element) => {
      if (element === product) {
        if (element.quantity === 1) {
          dispatch(removeItem(element.id));
        }
        return { ...element, quantity: element.quantity - 1 };
      } else {
        return element;
      }
    });
    console.log(newCartProducts);
    setCartProducts(newCartProducts);
  };

  const handleIncrease = (product) => {
    const newCartProducts = cartProducts.map((element) => {
      if (element === product) {
        return { ...element, quantity: element.quantity + 1 };
      } else {
        return element;
      }
    });
    console.log(newCartProducts);
    setCartProducts(newCartProducts);
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
                      handleDecrease(product);
                    }}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() => {
                      handleIncrease(product);
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
