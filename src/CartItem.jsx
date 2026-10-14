import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Navbar } from './ProductList';

function CartItem({ onNavigate }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const handleIncrease = (item) =>
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));

  const handleDecrease = (item) =>
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));

  const handleDelete = (id) => dispatch(removeItem(id));

  const handleCheckout = () =>
    alert('Coming Soon! Checkout is not available yet.');

  return (
    <div>
      <Navbar onNavigate={onNavigate} />

      <div className="cart-page">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div>
            <p>Your cart is empty.</p>
            <button
              className="continue-btn"
              onClick={() => onNavigate('plants')}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <p>{totalQuantity} item(s) in your cart</p>

            {cartItems.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.price}</p>
                  <p>
                    Total Cost: <strong>${item.price * item.quantity}</strong>
                  </p>
                </div>

                <div className="qty-controls">
                  <button onClick={() => handleDecrease(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item)}>+</button>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}

            <h2 className="cart-total">Total Cart Amount: ${totalAmount}</h2>

            <div className="cart-actions">
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
              <button
                className="continue-btn"
                onClick={() => onNavigate('plants')}
              >
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
