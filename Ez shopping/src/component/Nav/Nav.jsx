import { NavLink } from 'react-router-dom';
import './Nav.scss';

import {
  getFromLocalStorage,
  isKeyInLocalStorage,
} from '../../utils/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/selectors/userSelectors';
import { useEffect } from 'react';
import { useState } from 'react';
import { switchMode } from '../../store/slices/darkModeSlice';
import { selectCart } from '../../store/selectors/cartSelectors';

export default function Nav() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  console.log(cart);
  const [firstName, setFirstName] = useState('Anonyme');
  const [productsNumber, setProductsNumber] = useState(0);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const style = ({ isActive }) => {
    return {
      color: isActive ? 'white' : 'gray',
      display: 'flex',
      flexDirection: 'row',
      //   backgroundColor: isActive ? "white" : "rgb(31, 101, 115)",
    };
  };

  useEffect(() => {
    if (isKeyInLocalStorage('user')) {
      const firstName = getFromLocalStorage('user').firstName;
      firstName
        ? setFirstName(capitalizeFirstLetter(firstName))
        : setFirstName(capitalizeFirstLetter(user.firstName));
    }
  }, [user]);

  useEffect(() => {
    console.log(cart);
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setProductsNumber(total);
  }, [cart]);

  const toggleDarkMode = () => {
    dispatch(switchMode());
  };

  return (
    <nav className='nav-menu'>
      <NavLink className='home-link' to={'/'}>
        EZ Shopping
      </NavLink>
      <div>
        <NavLink style={style} to={'/login'}>
          {firstName}
        </NavLink>
        <NavLink style={style} to={'/cart'}>
          <span
            style={{
              display: 'block',
              textAlign: 'center',
              backgroundColor: 'red',
              marginRight: '5px',
              borderRadius: '50%',
              height: '30px',
              width: '30px',
            }}
          >
            {productsNumber}
          </span>
          Panier
        </NavLink>
        <button
          onClick={() => {
            toggleDarkMode();
          }}
        >
          darkmode
        </button>
      </div>
    </nav>
  );
}
