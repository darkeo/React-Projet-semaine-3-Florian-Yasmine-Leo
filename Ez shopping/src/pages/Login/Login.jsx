import './Login.scss';
import { useDispatch } from 'react-redux';
import { modifyPendingUser, validateUser } from '../../store/slices/userSlice';
import { useSelector } from 'react-redux';
import {
  selectErrors,
  selectPendingUser,
} from '../../store/selectors/userSelectors';
import {
  getFromLocalStorage,
  isKeyInLocalStorage,
} from '../../utils/localStorage';

const Login = () => {
  const dispatch = useDispatch();
  const pendingUser = useSelector(selectPendingUser);

  const errors = useSelector(selectErrors);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
    <>
      <div className='page'>
        <h1>Hi {displayFirstName()}</h1>
        <h2>Customize your profile here</h2>
        <form className='form' onSubmit={submitForm}>
          <label>
            Your firstname :
            <input
              onChange={handleFirstNameChange}
              type='text'
              value={pendingUser.firstName}
            />
          </label>
          <br />
          <label>
            Your lastName :
            <input
              onChange={handleLastNameChange}
              type='text'
              value={pendingUser.lastName}
            />
          </label>
          <br />
          <label>
            Your email :
            <input
              type='email'
              onChange={handleEmailChange}
              value={pendingUser.email}
            />
          </label>
          <ul>
            {errors &&
              errors.map((error, index) => {
                return (
                  <li className='errorMessage' key={index}>
                    {error}
                  </li>
                );
              })}
          </ul>
          <input className='form__button' type='submit' value={'Save'} />
        </form>
      </div>
    </>
  );
};

export default Login;
