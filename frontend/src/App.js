import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import filmImage from './assets/film.jpg';

function App() {

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
    <div style={appStyle}>
      <Menu />
      <main style={mainStyle}>
       <h1 style={{ color: 'white', textAlign: 'center' }}>
        
       </h1>

      </main>
      <Footer />
    </div>
  );
}

export default App;
