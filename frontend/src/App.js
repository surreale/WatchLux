import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Products from './components/Products'; // Termékek oldal importálása
import filmImage from './assets/film.jpg'; // Háttérkép importálása
import ProductDetails from './components/ProductDetails';

function App() {
  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const mainStyle = {
    backgroundImage: `url(${filmImage})`, // Template string a háttérképhez
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    flex: '1',
    padding: '20px',
  };

  return (
    <Router>
      <div style={appStyle}>
        <Menu />
        
        <Routes>
          {/* Főoldal */}
          <Route path="/" element={<main style={mainStyle} />} />
          {/* Termékek oldal */}
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
