import './HomePage.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../../component/ProductList/ProductList';
import { getProducts } from '../../store/slices/productsSlice';
import { selectProducts } from '../../store/selectors/productsSelectors';

const HomePage = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);

  console.log(products);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => dispatch(getProducts(data)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      <h1> Liste des Produits</h1>
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;
