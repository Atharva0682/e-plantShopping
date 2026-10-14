import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

/* Navbar — shown on both the Product Listing and Cart pages */
export function Navbar({ onNavigate }) {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="navbar">
      <button className="nav-link" onClick={() => onNavigate('landing')}>
        Paradise Nursery
      </button>
      <button className="nav-link" onClick={() => onNavigate('plants')}>
        Plants
      </button>
      <button className="nav-link" onClick={() => onNavigate('cart')}>
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{totalQuantity}</span>
      </button>
    </nav>
  );
}

/* Each plant object: category, name, image URL, description, cost (string) */
const plantsArray = [
  /* ---- Aromatic Plants ---- */
  { category: 'Aromatic Plants', name: 'Lavender',    image: 'https://placehold.co/300x300/7e57c2/ffffff?text=Lavender',    description: 'Calming purple blooms with a soothing floral scent.',         cost: '$20' },
  { category: 'Aromatic Plants', name: 'Jasmine',     image: 'https://placehold.co/300x300/7e57c2/ffffff?text=Jasmine',     description: 'Sweet night-blooming flowers that perfume any room.',         cost: '$32' },
  { category: 'Aromatic Plants', name: 'Rosemary',    image: 'https://placehold.co/300x300/7e57c2/ffffff?text=Rosemary',    description: 'Pine-scented herb that doubles as a kitchen staple.',         cost: '$18' },
  { category: 'Aromatic Plants', name: 'Mint',        image: 'https://placehold.co/300x300/7e57c2/ffffff?text=Mint',        description: 'Cool, refreshing leaves that grow fast and smell great.',     cost: '$14' },
  { category: 'Aromatic Plants', name: 'Lemon Balm',  image: 'https://placehold.co/300x300/7e57c2/ffffff?text=Lemon+Balm',  description: 'Citrus-scented foliage that lifts the mood instantly.',       cost: '$16' },
  { category: 'Aromatic Plants', name: 'Gardenia',    image: 'https://placehold.co/300x300/7e57c2/ffffff?text=Gardenia',    description: 'Glossy leaves and creamy flowers with rich fragrance.',       cost: '$38' },

  /* ---- Medicinal Plants ---- */
  { category: 'Medicinal Plants', name: 'Aloe Vera',  image: 'https://placehold.co/300x300/2e7d32/ffffff?text=Aloe+Vera',  description: 'Soothing gel inside the leaves, a classic first-aid plant.',  cost: '$18' },
  { category: 'Medicinal Plants', name: 'Tulsi',      image: 'https://placehold.co/300x300/2e7d32/ffffff?text=Tulsi',      description: 'Revered Ayurvedic herb used in teas and remedies.',           cost: '$22' },
  { category: 'Medicinal Plants', name: 'Chamomile',  image: 'https://placehold.co/300x300/2e7d32/ffffff?text=Chamomile',  description: 'Delicate daisy-like flowers brewed for calm evenings.',       cost: '$19' },
  { category: 'Medicinal Plants', name: 'Echinacea',  image: 'https://placehold.co/300x300/2e7d32/ffffff?text=Echinacea',  description: 'Purple coneflower traditionally used to support immunity.',   cost: '$26' },
  { category: 'Medicinal Plants', name: 'Peppermint', image: 'https://placehold.co/300x300/2e7d32/ffffff?text=Peppermint', description: 'Strong menthol aroma, perfect for digestive teas.',           cost: '$15' },
  { category: 'Medicinal Plants', name: 'Calendula',  image: 'https://placehold.co/300x300/2e7d32/ffffff?text=Calendula',  description: 'Bright orange petals used in skin-soothing salves.',          cost: '$21' },

  /* ---- Succulents ---- */
  { category: 'Succulents', name: 'Echeveria',    image: 'https://placehold.co/300x300/ef6c00/ffffff?text=Echeveria',    description: 'Rosette-shaped succulent in soft pastel tones.',              cost: '$12' },
  { category: 'Succulents', name: 'Jade Plant',   image: 'https://placehold.co/300x300/ef6c00/ffffff?text=Jade+Plant',   description: 'Glossy oval leaves on a lucky, long-lived plant.',            cost: '$22' },
  { category: 'Succulents', name: 'Haworthia',    image: 'https://placehold.co/300x300/ef6c00/ffffff?text=Haworthia',    description: 'Zebra-striped leaves that thrive on neglect.',                cost: '$14' },
  { category: 'Succulents', name: 'Sedum',        image: 'https://placehold.co/300x300/ef6c00/ffffff?text=Sedum',        description: 'Trailing stonecrop, great for hanging planters.',             cost: '$10' },
  { category: 'Succulents', name: 'Kalanchoe',    image: 'https://placehold.co/300x300/ef6c00/ffffff?text=Kalanchoe',    description: 'Cheerful clusters of long-lasting colourful blooms.',         cost: '$16' },
  { category: 'Succulents', name: 'Zebra Cactus', image: 'https://placehold.co/300x300/ef6c00/ffffff?text=Zebra+Cactus', description: 'Compact cactus with bold white stripes.',                     cost: '$17' },
];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  // Task 1: state variable named addedToCart tracking which product names are in the cart
  const [addedToCart, setAddedToCart] = useState({});
  const cartItems = useSelector((state) => state.cart.items);

  // Task 1: handleAddToCart dispatches the plant to addItem and updates local state
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  // Group plants by category for sectioned rendering
  const categories = [...new Set(plantsArray.map((p) => p.category))];

  // Track item names already in the cart (in case state resets)
  const inCartByName = (name) =>
    addedToCart[name] || cartItems.some((item) => item.name === name);

  return (
    <div>
      <Navbar onNavigate={onNavigate} />

      <h1 className="page-title">Our Plants</h1>

      {categories.map((category) => (
        <section key={category}>
          <h2 className="section-title">{category}</h2>

          <div className="product-grid">
            {plantsArray
              .filter((plant) => plant.category === category)
              .map((plant) => {
                const already = inCartByName(plant.name);

                return (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p className="product-desc">{plant.description}</p>
                    <p className="product-cost">{plant.cost}</p>

                    <button
                      className="add-btn"
                      disabled={already}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {already ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
