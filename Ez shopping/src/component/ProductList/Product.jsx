/* eslint-disable react/prop-types */
import './ProductList.scss';
import { BsCart2 } from 'react-icons/bs';

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
  return (
    <div className='product-item'>
      {!isInCart ? (
        <div className='product-box-category'>
          <p className='product-category'>{category}</p>
        </div>
      ) : null}

      <div className='picture-view'>
        <img src={image} alt={title} className='product-image' />
      </div>
      <div className='product-info'>
        <h3 className='product-title'>{title}</h3>
        <p className='product-description'>{description}</p>
        <h4 className='product-price'>${price}</h4>

        {!isInCart ? (
          <>
            <div className='product-quantity'>
              <p className='product-quantity-text'>Quantity</p>
              <input
                type='number'
                id={`product-quantity-box-${id}`}
                className='product-quantity-input'
                name='quantity'
                min='1'
                max='10'
                onChange={handleQuantityChange}
              />
            </div>
            <button onClick={handleAddToCart} className='product-add-to-cart'>
              <p>Add to basket</p>
              <BsCart2 style={{ width: 20, height: 20 }} />
            </button>
          </>
        ) : (
          <div className='product-quantity-cart '>
            <div>
              <button
                // onClick={() => {
                //   handleDecrease(product.id, product.quantity);
                // }}
                onClick={handleDecrease}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
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
