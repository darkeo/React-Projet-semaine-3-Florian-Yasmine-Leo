/* eslint-disable react/prop-types */
import './ProductList.scss';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/slices/cartSlice';
import { updateProduct } from '../../store/slices/productsSlice';
import Product from './Product';

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const handleQuantityChange = (e, productId) => {
    const quantity = e.target.value;
    dispatch(updateProduct({ quantity, productId }));
  };

  const handleAddToCart = (product) => {
    console.log('Product added to cart:', product.id);
    dispatch(addItemToCart({ id: product.id, quantity: product.quantity }));
  };
  return (
    <div>
      <div className='product-list'>
        {products.map((product) => (
          <Product
            key={product.id}
            category={product.category}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            handleQuantityChange={(e) => {
              handleQuantityChange(e, product.id);
            }}
            handleAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
