import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Liste des Produits</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;