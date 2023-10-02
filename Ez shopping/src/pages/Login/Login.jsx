import { useDispatch } from 'react-redux';
import { modifyUser, validateUser } from '../../store/slices/userSlice';
import { useSelector } from 'react-redux';
import { selectErros, selectUser } from '../../store/selectors/userSelectors';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const errors = useSelector(selectErros);

  console.log(errors);

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
        <input type='submit' value={'Se connecter'} />
      </form>
    </>
  );
};

export default Login;
