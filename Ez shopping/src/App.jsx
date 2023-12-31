import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage/HomePage.jsx';
import Login from './pages/Login/Login';
import Nav from './component/Nav/Nav';
import Cart from './pages/Cart/Cart';
import { useSelector } from 'react-redux';
import { selectDarkMode } from './store/selectors/darkModeSelectors';
function App() {
  const darkMode = useSelector(selectDarkMode);

  return (
    <>
      <main className={darkMode ? 'darkMode' : 'lightMode'}>
        <header>
          <Nav />
        </header>
        <div className='page'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
