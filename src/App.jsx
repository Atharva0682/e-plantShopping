import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [page, setPage] = useState('landing');

  if (page === 'landing') {
    return (
      <div className="landing-page">
        <div className="landing-content">
          <h1 className="landing-title">Paradise Nursery</h1>
          <p className="landing-tagline">
            Where green dreams come true — houseplants delivered to your door.
          </p>
          <button
            className="get-started-btn"
            onClick={() => setPage('plants')}
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  if (page === 'plants') return <ProductList onNavigate={setPage} />;
  if (page === 'cart')   return <CartItem onNavigate={setPage} />;
  if (page === 'about')  return <AboutUs onNavigate={setPage} />;

  return null;
}

export default App;
