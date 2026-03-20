import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registrarse from './components/Registro';
import Index from './components/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Login />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/trabajos"    element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;