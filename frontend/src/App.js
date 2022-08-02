import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header.jsx'

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>} />

            {/* Default: Redirect to home */}
            <Route path='*' element={<Navigate to="/" replace />} />
          </Routes>
        </div>

      </Router>
    </>
  );
}

export default App;
