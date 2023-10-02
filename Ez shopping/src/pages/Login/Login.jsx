import './Login.scss';
import { useDispatch } from 'react-redux';
import { modifyUser, validateUser } from '../../store/slices/userSlice';
import { useSelector } from 'react-redux';
import {
  selectErros,
  selectFormValidation,
  selectUser,
} from '../../store/selectors/userSelectors';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const errors = useSelector(selectErros);
  const formValidation = useSelector(selectFormValidation);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    dispatch(modifyUser({ ...user, firstName: value }));
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    dispatch(modifyUser({ ...user, lastName: value }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    dispatch(modifyUser({ ...user, email: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(validateUser(user));
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
              value={user.firstName}
            />
          </label>
          <br />
          <label>
            Your lastName :
            <input
              onChange={handleLastNameChange}
              type='text'
              value={user.lastName}
            />
          </label>
          <br />
          <label>
            Your email :
            <input
              type='email'
              onChange={handleEmailChange}
              value={user.email}
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
