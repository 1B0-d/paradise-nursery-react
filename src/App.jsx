import { useEffect, useSyncExternalStore } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList, { ShopNavigation } from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import './App.css';

function subscribeToPage(notify) {
  window.addEventListener('hashchange', notify);
  return () => window.removeEventListener('hashchange', notify);
}

function readPage() {
  const route = window.location.hash;
  if (route === '#/plants') return 'plants';
  if (route === '#/cart') return 'cart';
  return 'home';
}

export default function App() {
  const page = useSyncExternalStore(subscribeToPage, readPage);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = page === 'home' ? 'Paradise Nursery' :
      (page === 'plants' ? 'Plants' : 'Cart') + ' | Paradise Nursery';
  }, [page]);

  if (page === 'home') {
    return (
      <main className="landing-page">
        <div className="landing-content">
          <p className="eyebrow">A little more green</p>
          <h1>Paradise<br />Nursery</h1>
          <AboutUs />
          <a className="button button-light" href="#/plants">Get Started <span aria-hidden="true">↗</span></a>
        </div>
      </main>
    );
  }

  return (
    <>
      <ShopNavigation page={page} />
      {page === 'plants' ? <ProductList /> : <CartItem />}
    </>
  );
}
