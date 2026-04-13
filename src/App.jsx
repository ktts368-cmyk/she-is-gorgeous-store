import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturedCollections from './components/FeaturedCollections';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function Storefront() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCollections />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
