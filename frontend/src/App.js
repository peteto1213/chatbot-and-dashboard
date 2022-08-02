import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            {/* <Route paht='/' element={<Home/>} /> */}


            <Route paht='*' element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
