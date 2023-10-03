import { NavLink } from 'react-router-dom';
import './Nav.scss';

import {
  getFromLocalStorage,
  isKeyInLocalStorage,
} from '../../utils/localStorage';

export default function Nav() {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const style = ({ isActive }) => {
    return {
      color: isActive ? 'white' : 'gray',
      //   backgroundColor: isActive ? "white" : "rgb(31, 101, 115)",
    };
  };

  const displayFirstName = () => {
    if (isKeyInLocalStorage('user')) {
      const firstName = getFromLocalStorage('user').firstName;
      return capitalizeFirstLetter(firstName);
    }
    return 'Anonyme';
  };
  return (
    <nav className='nav-menu'>
      <NavLink className='home-link' to={'/'}>
        EZ Shopping
      </NavLink>
      <div>
        <NavLink style={style} to={'/login'}>
          {displayFirstName()}
        </NavLink>
        <NavLink style={style} to={'/cart'}>
          items:
        </NavLink>
        <button>darkmode</button>
      </div>
    </nav>
  );
}
