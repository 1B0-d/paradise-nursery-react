import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import { configureStore } from '@reduxjs/toolkit';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' });
after(() => server.close());
const {
  default: reducer, addItem, removeItem, updateQuantity,
  selectCartItems, selectCartQuantity, selectCartAmount,
} = await server.ssrLoadModule('/src/CartSlice.jsx');
const { plantCategories, formatPrice } = await server.ssrLoadModule('/src/plantCatalog.js');
const makeStore = () => configureStore({ reducer: { cart: reducer } });
const snake = plantCategories[0].plants[0];
const spider = plantCategories[0].plants[1];

test('catalog contains six distinct plants in each of three categories', () => {
  assert.equal(plantCategories.length, 3);
  const ids = plantCategories.flatMap(({ plants }) => {
    assert.equal(plants.length, 6);
    return plants.map(({ id }) => id);
  });
  assert.equal(new Set(ids).size, 18);
});

test('adding the same plant again keeps one line and one unit', () => {
  const store = makeStore();
  store.dispatch(addItem(snake));
  store.dispatch(addItem(snake));
  assert.equal(selectCartItems(store.getState()).length, 1);
  assert.equal(selectCartQuantity(store.getState()), 1);
});

test('quantity, line items and total stay consistent after add and edit', () => {
  const store = makeStore();
  store.dispatch(addItem(snake));
  store.dispatch(addItem(spider));
  store.dispatch(updateQuantity({ id: snake.id, quantity: 3 }));
  assert.equal(selectCartQuantity(store.getState()), 4);
  assert.equal(formatPrice(selectCartAmount(store.getState())), '$57.00');
  store.dispatch(updateQuantity({ id: snake.id, quantity: 2 }));
  assert.equal(selectCartQuantity(store.getState()), 3);
  assert.equal(selectCartAmount(store.getState()), 4200);
});

test('decrementing to zero and deleting remove the correct lines', () => {
  const store = makeStore();
  store.dispatch(addItem(snake));
  store.dispatch(addItem(spider));
  store.dispatch(updateQuantity({ id: snake.id, quantity: 0 }));
  assert.deepEqual(selectCartItems(store.getState()).map(({ id }) => id), [spider.id]);
  store.dispatch(removeItem(spider.id));
  assert.equal(selectCartQuantity(store.getState()), 0);
  assert.equal(selectCartAmount(store.getState()), 0);
  store.dispatch(addItem(snake));
  assert.equal(selectCartQuantity(store.getState()), 1);
});
