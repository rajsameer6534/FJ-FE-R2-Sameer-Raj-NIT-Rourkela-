import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ThankYouPage from './components/ThankYouPage'; // Ensure this component exists

const RouterSetup = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
    </Routes>
  </Router>
);

export default RouterSetup;
