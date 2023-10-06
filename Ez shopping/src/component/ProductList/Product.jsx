import "./ProductList.scss";
import { BsCart2 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../store/selectors/darkModeSelectors";

const Product = ({
  id,
  category,
  image,
  title,
  quantity,
  description,
  price,
  handleQuantityChange,
  handleAddToCart,
  handleDecrease,
  handleIncrease,
  handleRemove,
  isInCart,
}) => {
  const darkMode = useSelector(selectDarkMode);

  return (
    <div className={darkMode ? "dark product-item" : "light product-item"}>
      {!isInCart ? (
        <div className="product-box-category">
          <p
            className={
              darkMode
                ? "dark-cat-p product-category"
                : "light-cat-p product-category"
            }
          >
            {category}
          </p>
        </div>
      ) : null}

      <div className='picture-view'>
        <img src={image} alt={title} className='product-image' />
      </div>
      <div className="product-info">
        <h3
          className={
            darkMode ? "dark-title product-title" : "light-title product-title"
          }
        >
          {title}
        </h3>
        <p
          className={
            darkMode
              ? "dark-description product-description"
              : "light-description product-description"
          }
        >
          {description}
        </p>
        <h4
          className={
            darkMode ? "dark-price product-price" : "light-price product-price"
          }
        >
          ${price}
        </h4>

        {!isInCart ? (
          <>
            <div className="product-quantity">
              <p
                className={
                  darkMode
                    ? "dark-qnt-text product-quantity-text"
                    : "light-qnt-text product-quantity-text"
                }
              >
                Quantity
              </p>
              <input
                type='number'
                id={`product-quantity-box-${id}`}
                className={
                  darkMode
                    ? "dark-pro-qua-inp product-quantity-input"
                    : "light-pro-qua-inp product-quantity-input"
                }
                name="quantity"
                min="1"
                max="10"
                onChange={handleQuantityChange}
              />
            </div>
            <button
              onClick={handleAddToCart}
              className={
                darkMode
                  ? "dark-add product-add-to-cart"
                  : "light-add product-add-to-cart"
              }
            >
              <p>Add to basket</p>
              <BsCart2 style={{ width: 20, height: 20 }} />
            </button>
          </>
        ) : (
          <div className='product-quantity-cart '>
            <div className='quantity-manager'>
              <button className='quantity-button'
                // onClick={() => {
                //   handleDecrease(product.id, product.quantity);
                // }}
                onClick={handleDecrease}
              >
                -
              </button>
              <span className={darkMode ? "dark-quantity-display" : ""}>{quantity}</span>
              <button className='quantity-button'
                // onClick={() => {
                //   handleIncrease(product.id);
                // }}
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
            <button
              //   onClick={() => {
              //     handleRemove(product.id);
              //   }}
              onClick={handleRemove}
              className='product-remove-item'
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
