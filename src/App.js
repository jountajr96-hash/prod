import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import FeaturedProject from './components/FeaturedProject';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(loggedInStatus);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Services />
              <Portfolio />
              <FeaturedProject />
              <BookingForm />
              <Footer />
            </>
          } />
          <Route path="/book" element={
            <>
              <Navbar />
              <BookingForm />
              <Footer />
            </>
          } />
          <Route path="/admin/login" element={
            isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin setIsAuthenticated={setIsAuthenticated} />
          } />
          <Route path="/admin/dashboard" element={
            isAuthenticated ? <AdminDashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/admin/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;