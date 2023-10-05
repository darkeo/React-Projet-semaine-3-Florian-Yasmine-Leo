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

  const darkModeStyle = {
    backGroundColor: '#333',
    color: 'white',
  };

  const lightModeStyle = {
    backGroundColor: 'white',
    color: '#333',
  };

  return (
    <>
      <main style={darkMode ? darkModeStyle : lightModeStyle}>
        <header>
          <Nav />
        </header>
        <div>
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
