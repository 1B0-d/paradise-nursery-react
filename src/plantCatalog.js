const plant = (id, name, dollars, description) => ({
  id,
  name,
  priceCents: dollars * 100,
  description,
  image: import.meta.env.BASE_URL + 'plants/' + id + '.jpg',
});

export const plantCategories = [
  {
    name: 'Leafy favorites',
    plants: [
      plant('snake-plant', 'Snake Plant', 15, 'Upright leaves with striking bands.'),
      plant('spider-plant', 'Spider Plant', 12, 'Striped leaves that arch over the pot.'),
      plant('peace-lily', 'Peace Lily', 18, 'Glossy foliage and white blooms.'),
      plant('boston-fern', 'Boston Fern', 20, 'Soft, feathery fronds for a humid corner.'),
      plant('rubber-plant', 'Rubber Plant', 17, 'Bold, broad leaves with a polished finish.'),
      plant('aloe-vera', 'Aloe Vera', 14, 'A sculptural succulent for a sunny spot.'),
    ],
  },
  {
    name: 'Fragrant plants',
    plants: [
      plant('lavender', 'Lavender', 20, 'Purple flower spikes and a familiar scent.'),
      plant('jasmine', 'Jasmine', 18, 'Delicate flowers with a sweet fragrance.'),
      plant('rosemary', 'Rosemary', 15, 'Needle-like leaves with a woodsy aroma.'),
      plant('mint', 'Mint', 12, 'Bright green leaves with a fresh scent.'),
      plant('lemon-balm', 'Lemon Balm', 14, 'Soft leaves with a light citrus fragrance.'),
      plant('hyacinth', 'Hyacinth', 22, 'A densely packed cluster of fragrant flowers.'),
    ],
  },
  {
    name: 'Easy care and color',
    plants: [
      plant('zz-plant', 'ZZ Plant', 25, 'Shiny leaves on gently arching stems.'),
      plant('pothos', 'Pothos', 10, 'A trailing vine for shelves and hanging pots.'),
      plant('cast-iron-plant', 'Cast Iron Plant', 20, 'Deep green leaves for a shaded corner.'),
      plant('succulents', 'Succulents', 18, 'Compact plants with fleshy, textured leaves.'),
      plant('aglaonema', 'Aglaonema', 22, 'A lush mix of silver and green foliage.'),
      plant('geraniums', 'Geraniums', 20, 'Colorful flowers for a bright windowsill.'),
    ],
  },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
export const formatPrice = (cents) => currency.format(cents / 100);
