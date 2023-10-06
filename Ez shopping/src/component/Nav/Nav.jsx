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

import { BiSolidMoon } from 'react-icons/bi';
import { BsSunFill } from 'react-icons/bs';
import { BsBasket2Fill } from 'react-icons/bs';
import { ImUser } from 'react-icons/im';
import { capitalizeFirstLetter } from '../../utils/capitalize';

export default function Nav() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  console.log(cart);
  const [firstName, setFirstName] = useState('Anonyme');
  const [productsNumber, setProductsNumber] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const style = ({ isActive }) => {
    return {
      color: isActive ? 'white' : 'gray',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
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
    setIsDarkMode(!isDarkMode); // Toggle the dark mode state
  };

  return (
    <nav className='nav-menu'>
      <NavLink className='home-link' to={'/'}>
        EZ Shopping
      </NavLink>
      <div>
        <NavLink style={style} to={'/login'}>
          <div className='button-user-box'>
            <ImUser size={30} />
            <span>{firstName}</span>
          </div>
        </NavLink>
        <NavLink style={style} to={'/cart'}>
          <div style={{ position: 'relative' }} className='button-cart-box'>
            <BsBasket2Fill size={30} className='cart-icon' />
            <span className='cart-counter'>{productsNumber}</span>
          </div>
          {/* <span>Panier</span> */}
        </NavLink>
        <div
          onClick={() => {
            toggleDarkMode();
          }}
          className='button-darkmode'
        >
          {isDarkMode ? <BsSunFill size={30} /> : <BiSolidMoon size={30} />}{' '}
          {/* Dark and light mode icons */}
        </div>
      </div>
    </nav>
  );
}
