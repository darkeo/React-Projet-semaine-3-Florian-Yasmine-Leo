import React from 'react';
import "./ProductList.scss"

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Liste des Produits</h2>
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt="" className='product-image'/>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>
            <h4 className="product-price">${product.price}</h4>
            <div className='product-quantity'>
              <p className='product-quantity-text'>Quantity</p>
              <input 
                type="number"
                id={`product-quantity-box-${product.id}`}
                name="quantity"
                min="1"
                max="10"
                //value={quantity}
                //onChange={handleQuantityChange}
                />
            </div>
            <button className='product-add-to-cart'>Add to basket</button>
          </div>
        ))}
    </div>
  );
}

export default ProductList;