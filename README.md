# Paradise Nursery

Paradise Nursery is a React and Redux Toolkit storefront for the IBM Developing Front-End Apps with React course project. Its landing page introduces the nursery, the catalog offers 18 plants across three categories, and the cart tracks quantities and prices. Checkout displays a coming-soon message.

## Run locally

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. For a production build, run `npm run build`. Use `npm run preview` to serve the generated `dist` folder locally. The relative asset base and hash navigation work under a static host's repository subpath.

Run `npm test` for the catalog and cart reducer checks. `VERIFICATION.md` records the production build and Chrome walkthrough.

## Rubric files

| File | Responsibility |
| --- | --- |
| `src/AboutUs.jsx` | Company description |
| `src/App.css` | Landing background and shared styles |
| `src/App.jsx` | Landing page and route selection |
| `src/CartSlice.jsx` | Redux actions and cart totals |
| `src/ProductList.jsx` | Catalog, Add to Cart, and shared navigation |
| `src/CartItem.jsx` | Quantities, item prices, totals, delete, and checkout feedback |

The [IBM starter](https://github.com/ibm-developer-skills-network/e-plantShopping) at commit `593fad009ebdc3ff51657387810cf698ff7ec457` supplied the project skeleton and photo references. The original license is retained. The photo sources appear in `ASSET_SOURCES.md`. For GitHub Pages, publish the `docs` directory from the `main` branch. The static production build is included in `docs`.

