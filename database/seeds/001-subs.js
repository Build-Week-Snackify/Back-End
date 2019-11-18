
exports.seed = function(knex) {

  return knex('subs').insert([
    { monthlyFee: '$5.00', 
    lengthOfSubscription: '3/10/2020 - 4/10/20',
    nameOfSubscription: 'Tester',
    orgId: 1}
  ]);

};