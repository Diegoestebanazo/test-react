import MiComponente from './components/MiComponente';
import FormNew from './components/form-new';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import logoBanco from './assets/img/logoBanco.png';


function App() {


  return (

    <div>
      <div className='logo'>
        <img src={logoBanco} alt="Logo" width="200" />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<MiComponente />} />
          <Route path="/form" element={<FormNew />} />
          {/* Agrega más rutas aquí */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;