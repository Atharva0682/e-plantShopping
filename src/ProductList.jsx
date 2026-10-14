import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

/* Navbar — reused on Product Listing and Cart pages */
export function Navbar({ onNavigate }) {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="navbar">
      <button onClick={() => onNavigate('landing')}>Home</button>
      <button onClick={() => onNavigate('plants')}>Plants</button>
      <button onClick={() => onNavigate('cart')}>
        Cart <span className="cart-count">{totalQuantity}</span>
      </button>
    </nav>
  );
}

/* 3 sections x 6 plants = 18 unique plants */
const plantData = [
  /* Aromatic Plants */
  { id: 1,  name: 'Lavender',     category: 'Aromatic Plants',  description: 'Calming purple blooms with a soothing floral scent.',       price: 20, image: 'https://placehold.co/300x300/7e57c2/ffffff?text=Lavender' },
  { id: 2,  name: 'Jasmine',      category: 'Aromatic Plants',  description: 'Sweet night-blooming flowers that perfume any room.',       price: 32, image: 'https://placehold.co/300x300/7e57c2/ffffff?text=Jasmine' },
  { id: 3,  name: 'Rosemary',     category: 'Aromatic Plants',  description: 'Pine-scented herb that doubles as a kitchen staple.',       price: 18, image: 'https://placehold.co/300x300/7e57c2/ffffff?text=Rosemary' },
  { id: 4,  name: 'Mint',         category: 'Aromatic Plants',  description: 'Cool, refreshing leaves that grow fast and smell great.',   price: 14, image: 'https://placehold.co/300x300/7e57c2/ffffff?text=Mint' },
  { id: 5,  name: 'Lemon Balm',   category: 'Aromatic Plants',  description: 'Citrus-scented foliage that lifts the mood instantly.',     price: 16, image: 'https://placehold.co/300x300/7e57c2/ffffff?text=Lemon+Balm' },
  { id: 6,  name: 'Gardenia',     category: 'Aromatic Plants',  description: 'Glossy leaves and creamy flowers with rich fragrance.',     price: 38, image: 'https://placehold.co/300x300/7e57c2/ffffff?text=Gardenia' },

  /* Medicinal Plants */
  { id: 7,  name: 'Aloe Vera',    category: 'Medicinal Plants', description: 'Soothing gel inside the leaves, a classic first-aid plant.', price: 18, image: 'https://placehold.co/300x300/2e7d32/ffffff?text=Aloe+Vera' },
  { id: 8,  name: 'Tulsi',        category: 'Medicinal Plants', description: 'Revered Ayurvedic herb used in teas and remedies.',          price: 22, image: 'https://placehold.co/300x300/2e7d32/ffffff?text=Tulsi' },
  { id: 9,  name: 'Chamomile',    category: 'Medicinal Plants', description: 'Delicate daisy-like flowers brewed for calm evenings.',      price: 19, image: 'https://placehold.co/300x300/2e7d32/ffffff?text=Chamomile' },
  { id: 10, name: 'Echinacea',    category: 'Medicinal Plants', description: 'Purple coneflower traditionally used to support immunity.',  price: 26, image: 'https://placehold.co/300x300/2e7d32/ffffff?text=Echinacea' },
  { id: 11, name: 'Peppermint',   category: 'Medicinal Plants', description: 'Strong menthol aroma, perfect for digestive teas.',          price: 15, image: 'https://placehold.co/300x300/2e7d32/ffffff?text=Peppermint' },
  { id: 12, name: 'Calendula',    category: 'Medicinal Plants', description: 'Bright orange petals used in skin-soothing salves.',         price: 21, image: 'https://placehold.co/300x300/2e7d32/ffffff?text=Calendula' },

  /* Succulents */
  { id: 13, name: 'Echeveria',    category: 'Succulents',       description: 'Rosette-shaped succulent in soft pastel tones.',             price: 12, image: 'https://placehold.co/300x300/ef6c00/ffffff?text=Echeveria' },
  { id: 14, name: 'Jade Plant',   category: 'Succulents',       description: 'Glossy oval leaves on a lucky, long-lived plant.',           price: 22, image: 'https://placehold.co/300x300/ef6c00/ffffff?text=Jade+Plant' },
  { id: 15, name: 'Haworthia',    category: 'Succulents',       description: 'Zebra-striped leaves that thrive on neglect.',               price: 14, image: 'https://placehold.co/300x300/ef6c00/ffffff?text=Haworthia' },
  { id: 16, name: 'Sedum',        category: 'Succulents',       description: 'Trailing stonecrop, great for hanging planters.',            price: 10, image: 'https://placehold.co/300x300/ef6c00/ffffff?text=Sedum' },
  { id: 17, name: 'Kalanchoe',    category: 'Succulents',       description: 'Cheerful clusters of long-lasting colourful blooms.',        price: 16, image: 'https://placehold.co/300x300/ef6c00/ffffff?text=Kalanchoe' },
  { id: 18, name: 'Zebra Cactus', category: 'Succulents',       description: 'Compact cactus with bold white stripes.',                    price: 17, image: 'https://placehold.co/300x300/ef6c00/ffffff?text=Zebra+Cactus' },
];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const categories = [...new Set(plantData.map((plant) => plant.category))];

  return (
    <div>
      <Navbar onNavigate={onNavigate} />
      <h1 className="section-title">Paradise Nursery — Our Plants</h1>

      {categories.map((category) => (
        <section key={category}>
          <h2 className="section-title">{category}</h2>

          <div className="product-grid">
            {plantData
              .filter((plant) => plant.category === category)
              .map((plant) => {
                const inCart = cartItems.some((item) => item.id === plant.id);

                return (
                  <div className="product-card" key={plant.id}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p className="product-desc">{plant.description}</p>
                    <p className="product-price">${plant.price}</p>

                    <button
                      className="add-btn"
                      disabled={inCart}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {inCart ? 'Added to Cart' : 'Add to Cart'}
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
