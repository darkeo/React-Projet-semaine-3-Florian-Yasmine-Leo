import "./Login.scss";
import { useDispatch } from "react-redux";
import { modifyPendingUser, validateUser } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../store/selectors/darkModeSelectors";

import {
  selectErrors,
  selectPendingUser,
} from '../../store/selectors/userSelectors';
import {
  getFromLocalStorage,
  isKeyInLocalStorage,
} from '../../utils/localStorage';
import { capitalizeFirstLetter } from '../../utils/capitalize';

const Login = () => {
  const dispatch = useDispatch();

  const pendingUser = useSelector(selectPendingUser);
  const errors = useSelector(selectErrors);
  const darkMode = useSelector(selectDarkMode);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    dispatch(modifyPendingUser({ ...pendingUser, firstName: value }));
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    dispatch(modifyPendingUser({ ...pendingUser, lastName: value }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    dispatch(modifyPendingUser({ ...pendingUser, email: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(validateUser(pendingUser));
  };

  const displayFirstName = () => {
    if (isKeyInLocalStorage('user')) {
      const firstName = getFromLocalStorage('user').firstName;
      return capitalizeFirstLetter(firstName);
    }
    return;
  };

  return (
    <div className='page-login'>
      <h1>Hi {displayFirstName()}</h1>
      <h2>Customize your profile here</h2>
      <div className="form-container">
        <form className={darkMode ? "dark-form form" : "light-form form"} onSubmit={submitForm}>
          <div className="form-input-box">
            <label>Firstname</label>
            <input
              onChange={handleFirstNameChange}
              type='text'
              value={pendingUser.firstName}
              placeholder='Jhon'
            />
          </div>
          <div className='form-input-box'>
            <label>LastName</label>
            <input
              onChange={handleLastNameChange}
              type='text'
              value={pendingUser.lastName}
              placeholder='Smith'
            />
          </div>
          <div className='form-input-box'>
            <label>Email</label>
            <input
              type='email'
              onChange={handleEmailChange}
              value={pendingUser.email}
              placeholder='your@email.com'
            />
          </div>
          <ul style={{ padding: '0px', width: '70%', margin: '0 auto' }}>
            {errors &&
              errors.map((error, index) => {
                return (
                  <li className='errorMessage' key={index}>
                    {error}
                  </li>
                );
              })}
          </ul>
          <button className={darkMode ? "dark-button form__button" : "light-button form__button"} type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
