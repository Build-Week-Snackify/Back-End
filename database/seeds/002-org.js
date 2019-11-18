exports.seed = function(knex) {

  return knex('org').insert([
    { username: 'hello',
      password: 'goodbye',
      email: 'tester@yahoo.com',
      phoneNumber: '123-4578',
      streetAddress: '123 Tester',
      state: 'Nowhere',
      zipcode: '12345',
      organizationName: 'Tester',
      contactPerson: 'Fake Person',
      role: 'organization'
    },
    { username: 'another',
      password: 'tester',
      email: 'tester@yahoo.com',
      phoneNumber: '123-4578',
      streetAddress: '123 Tester',
      state: 'Nowhere',
      zipcode: '12345',
      organizationName: 'Tester',
      contactPerson: 'Fake Person',
      role: 'organization'
    }
  ]);

};
