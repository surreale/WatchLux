import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Products from './components/Products'; 
import filmImage from './assets/film.jpg'; 
import ProductDetails from './components/ProductDetails';
import { CartProvider } from "./components/CartContext";
import Cart from "./components/Cart";
import { FavoritesProvider } from './components/FavoritesContext';
import Favorites from './components/Favorites';
import Checkout from "./components/Checkout";
import "./components/Checkout.css";
import Login from './components/Login'; 
import { useState } from 'react';
import Profile from './components/Profile'; 
import Aszf from "./components/Aszf";
import OrderSummary from './components/OrderSummary';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginOpen = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const mainStyle = {
    backgroundImage: `url(${filmImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    flex: '1',
    padding: '20px',
  };

  return (
    <FavoritesProvider>
    <CartProvider>
    <Router>
      <div style={appStyle} className="main-content">
        <Menu onLoginClick={handleLoginOpen} /> {}
        
        <Routes>
          
          <Route path="/" element={<main style={mainStyle} />} />
         
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/kedvencek/" element={<Favorites />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile showProfile={true} handleProfileClose={() => {}} />} /> 
          <Route path="/aszf" element={<Aszf />} />
          <Route path="/order-summary" element={<OrderSummary />} />

        </Routes>

        <Footer />

        
        <Login showLogin={showLogin} handleLoginClose={handleLoginClose} />
      </div>
    </Router>
    </CartProvider>
    </FavoritesProvider>
  );
}

export default App;
