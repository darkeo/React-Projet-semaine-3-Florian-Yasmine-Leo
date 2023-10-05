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
    setIsDarkMode(!isDarkMode); // Toggle the dark mode state
  };

  return (
    <nav className='nav-menu'>
      <NavLink className='home-link' to={'/'}>
        EZ Shopping
      </NavLink>
      <div>
        <NavLink style={style} to={'/login'}>
          <ImUser style={{ marginRight: '5px' }} />
          {firstName}
        </NavLink>
        <NavLink style={style} to={'/cart'}>
          <BsBasket2Fill style={{ marginRight: '5px' }} />
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
              marginRight: '5px',
              borderRadius: '50%',
              height: '30px',
              width: '30px',
              marginLeft: '5px',
              color: 'white',
            }}
          >
            {productsNumber}
          </span>
          <span>Panier</span>
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
