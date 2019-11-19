
exports.seed = function(knex) {
  return knex('snacks').insert([
    { name: 'Carrot',
      numberOfServings: 2,
      totalWeight: '5 grams',
      price: '$4.99',
      subId: 1
    },
    { name: 'Chips',
      numberOfServings: 4,
      totalWeight: '8 grams',
      price: '$2.99',
      subId: 1
    },
  ]);

};
