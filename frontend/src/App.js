import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// Pages import
import Home from './pages/Home'
import ChatbotPage from './pages/ChatbotPage';
import AllQuestions from './pages/AllQuestions';
import QuestionCategory from './pages/QuestionCategory';
import GeographicalData from './pages/GeographicalData';

// Components import
import Header from './components/Header.jsx'

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>} />

            <Route path='/chatbotPage' element={<ChatbotPage />} />

            <Route path='/allQuestions' element={<AllQuestions />}/>

            <Route path='/questionCategory' element={<QuestionCategory />}/>

            <Route path='/geographical' element={<GeographicalData />}/>


            {/* Default: Redirect to home */}
            <Route path='*' element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
