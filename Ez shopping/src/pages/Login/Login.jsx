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

  useEffect(() => {
    if (formValidation) {
      navigate('/');
    }
  }, [formValidation]);

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
      <h1>Login</h1>
      <form onSubmit={submitForm}>
        <label>
          Prénom
          <input onChange={handleFirstNameChange} type='text' />
        </label>
        <label>
          Nom
          <input onChange={handleLastNameChange} type='text' />
        </label>
        <label>
          Email
          <input type='email' onChange={handleEmailChange} />
        </label>
        <ul>
          {errors &&
            errors.map((error, index) => {
              return <li key={index}>{error}</li>;
            })}
        </ul>
        <input type='submit' value={'Se connecter'} />
      </form>
    </>
  );
};

export default Login;
