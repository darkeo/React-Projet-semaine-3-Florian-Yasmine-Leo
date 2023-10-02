import './Login.scss';
import { useDispatch } from 'react-redux';
import { modifyPendingUser, validateUser } from '../../store/slices/userSlice';
import { useSelector } from 'react-redux';
import {
  selectErrors,
  selectFormValidation,
  selectPendingUser,
  selectUser,
} from '../../store/selectors/userSelectors';

const Login = () => {
  const dispatch = useDispatch();
  const pendingUser = useSelector(selectPendingUser);
  const user = useSelector(selectUser);

  const errors = useSelector(selectErrors);
  const formValidation = useSelector(selectFormValidation);

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

  return (
    <>
      <div className='page'>
        <h1>Hi {formValidation && user.firstName}</h1>
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
