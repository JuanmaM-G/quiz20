import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Registro from './components/registro';
import Index from './components/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"       element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/index"    element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;