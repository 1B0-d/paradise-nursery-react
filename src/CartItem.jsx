import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, selectCartAmount, selectCartItems, selectCartQuantity, updateQuantity } from './CartSlice.jsx';
import { formatPrice } from './plantCatalog.js';
import './CartItem.css';

export default function CartItem() {
  const cart = useSelector(selectCartItems);
  const quantity = useSelector(selectCartQuantity);
  const amount = useSelector(selectCartAmount);
  const dispatch = useDispatch();
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  return (
    <main className="page-content cart-page">
      <div className="page-intro">
        <p className="eyebrow">Your selection</p>
        <h1>Shopping Cart</h1>
      </div>
      <div className="cart-layout">
        <div className="cart-lines" aria-label="Cart items">
          {cart.length === 0 && <p className="empty-cart">Your cart is empty. Explore the collection to add a plant.</p>}
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h2>{item.name}</h2>
                <p>Unit price: {formatPrice(item.priceCents)}</p>
                <div className="quantity-controls">
                  <button type="button" aria-label={'Decrease ' + item.name + ' quantity'}
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                  <span aria-label={item.name + ' quantity'}>{item.quantity}</span>
                  <button type="button" aria-label={'Increase ' + item.name + ' quantity'}
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                </div>
                <button type="button" className="delete-button" aria-label={'Delete ' + item.name}
                  onClick={() => dispatch(removeItem(item.id))}>Delete</button>
              </div>
              <p className="line-total">Subtotal <strong>{formatPrice(item.priceCents * item.quantity)}</strong></p>
            </article>
          ))}
        </div>
        <aside className="cart-summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Order summary</h2>
          <div aria-live="polite">
            <p className="summary-row"><span>Total plants</span><strong>{quantity}</strong></p>
            <p className="summary-row summary-total"><span>Total cart amount</span><strong>{formatPrice(amount)}</strong></p>
          </div>
          <button className="button" type="button" onClick={() => setShowCheckoutMessage(true)}>Checkout</button>
          {showCheckoutMessage && <p role="status" className="checkout-message">Checkout is coming soon.</p>}
          <a className="continue-shopping" href="#/plants">Continue Shopping <span aria-hidden="true">↗</span></a>
        </aside>
      </div>
    </main>
  );
}
