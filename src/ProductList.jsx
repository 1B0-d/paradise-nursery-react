import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems, selectCartQuantity } from './CartSlice.jsx';
import { formatPrice, plantCategories } from './plantCatalog.js';
import './ProductList.css';

export function ShopNavigation({ page }) {
  const quantity = useSelector(selectCartQuantity);
  return (
    <header className="shop-header">
      <nav className="shop-nav" aria-label="Main navigation">
        <a className="wordmark" href="#/home">Paradise Nursery</a>
        <div className="nav-links">
          <a href="#/home">Home</a>
          <a href="#/plants" aria-current={page === 'plants' ? 'page' : undefined}>Plants</a>
          <a className="cart-link" href="#/cart" aria-current={page === 'cart' ? 'page' : undefined}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M4 8h16l1 13H3L4 8Z M8 9V6a4 4 0 0 1 8 0v3" />
            </svg>
            Cart <span className="cart-count" aria-label={quantity + (quantity === 1 ? ' item in cart' : ' items in cart')}>{quantity}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default function ProductList() {
  const cart = useSelector(selectCartItems);
  const dispatch = useDispatch();

  return (
    <main className="page-content catalog">
      <div className="page-intro">
        <p className="eyebrow">The collection</p>
        <h1>Find your next plant</h1>
        <p>Browse 18 plants, from leafy companions to windowsill favorites.</p>
      </div>
      {plantCategories.map((category, index) => (
        <section className="plant-category" aria-labelledby={'category-' + index} key={category.name}>
          <h2 id={'category-' + index}>{category.name}</h2>
          <div className="plant-grid">
            {category.plants.map((plant) => {
              const inCart = cart.some((item) => item.id === plant.id);
              return (
                <article className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} loading={index ? 'lazy' : 'eager'} />
                  <div className="plant-card-body">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <div className="plant-card-footer">
                      <strong>{formatPrice(plant.priceCents)}</strong>
                      <button className="button" type="button" disabled={inCart}
                        onClick={() => dispatch(addItem(plant))}>
                        {inCart ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
