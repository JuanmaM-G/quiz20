import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import login from './components/login'


function Layout() {
  return (
    <div className="min-h-screen bg-[#0c0b0a] text-white">
      <main>
        <Routes>
          <Route path="/login"       element={<login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;