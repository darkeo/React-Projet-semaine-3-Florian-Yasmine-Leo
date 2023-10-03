import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Login from "./pages/Login/Login";
import Nav from "./component/Nav/Nav";
import Cart from "./pages/Cart/Cart";
function App() {
  return (
    <>
      <main>
        <header>
          <Nav />
        </header>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
