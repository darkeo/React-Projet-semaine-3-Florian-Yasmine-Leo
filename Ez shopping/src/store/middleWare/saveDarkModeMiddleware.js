import { addToLocalStorage } from '../../utils/localStorage';
import darkModeSlice from '../slices/darkModeSlice';

const saveDarkModeMiddleWare = (store) => (next) => (action) => {
  const nextAction = next(action);
  const darkMode = store.getState().darkMode.darkMode;
  if (action.type === darkModeSlice.actions.switchMode.toString()) {
    console.log(darkMode);
    addToLocalStorage('darkMode', darkMode);
  }
  return nextAction;
};

export default saveDarkModeMiddleWare;
