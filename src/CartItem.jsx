import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Navbar } from './ProductList';
import './CartItem.css';

function CartItem({ onContinueShopping, onNavigate }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  // Task 3: subtotal for a single plant type
  const calculateTotalCost = (item) => {
    const unit = parseFloat(item.cost.substring(1));
    return unit * item.quantity;
  };

  // Task 3: overall cart total
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (sum, item) => sum + calculateTotalCost(item),
      0
    );
  };

  // Task 3: continue shopping delegates to parent via onContinueShopping
  const handleContinueShopping = (e) => {
    if (onContinueShopping) onContinueShopping(e);
    else if (onNavigate) onNavigate('plants');
  };

  // Task 3: exact alert required by spec
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Task 3: increment
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Task 3: decrement — remove if quantity would drop to 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Task 3: remove entirely
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  return (
    <div>
      <Navbar onNavigate={onNavigate} />

      <div className="cart-page">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div>
            <p>Your cart is empty.</p>
            <button className="continue-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <p className="cart-count-line">
              Total items in cart: <strong>{totalQuantity}</strong>
            </p>

            {cartItems.map((item) => (
              <div className="cart-card" key={item.name}>
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>Unit Price: {item.cost}</p>
                  <p>
                    Total Cost: <strong>${calculateTotalCost(item)}</strong>
                  </p>
                </div>

                <div className="qty-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleRemove(item.name)}
                >
                  Delete
                </button>
              </div>
            ))}

            <h2 className="cart-total">
              Total Cart Amount: ${calculateTotalAmount()}
            </h2>

            <div className="cart-actions">
              <button className="checkout-btn" onClick={handleCheckoutShopping}>
                Checkout
              </button>
              <button className="continue-btn" onClick={handleContinueShopping}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
