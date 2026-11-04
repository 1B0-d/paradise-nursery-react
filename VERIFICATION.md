# Local verification

Built from IBM's `e-plantShopping` starter at `593fad009ebdc3ff51657387810cf698ff7ec457`.

`npm ci` succeeded using the supplied lockfile. `npm run build` transformed 51 modules and produced the static `dist` bundle. `npm test` passed four checks for catalog uniqueness, duplicate additions, quantity and monetary totals, and deletion.

Chrome loaded the production preview on the local machine. It displayed the landing background, company description and Get Started link. The catalog displayed three categories with six distinct plants each. Adding a plant disabled its button and updated the cart badge. All 19 bundled photos returned HTTP 200 as JPEGs from the production preview.

| Browser action | Badge and total plants | Cart total |
| --- | ---: | ---: |
| Add Snake Plant and Spider Plant | 2 | $27.00 |
| Increase Snake Plant | 3 | $42.00 |
| Decrease Snake Plant | 2 | $27.00 |
| Delete Spider Plant | 1 | $15.00 |
| Decrease the last Snake Plant to zero | 0 | $0.00 |

The Snake Plant row showed a $15.00 unit price and a $30.00 subtotal at quantity two. Checkout displayed the coming-soon message. Continue Shopping, Home, Plants and Cart all worked. The cart survived route changes and re-enabled Add to Cart after removal.

Course submission still requires a real public GitHub repository, published GitHub Pages URL, and the seven rubric file URLs. The archive contains source, bundled photos, the lockfile, and tests.
