exports.up = function(knex) {
    return knex.schema
    .createTable('org', tbl => {
      tbl.increments();
  
      tbl
      .string('username', 255)
      .notNullable()
      .unique();
  
      tbl.string('password', 255).notNullable();
  
      tbl.string('email', 255).notNullable();
  
      tbl.string('phoneNumber', 255).notNullable();
  
      tbl.string('streetAddress', 255).notNullable();
  
      tbl.string('state', 255).notNullable();
  
      tbl.string('zipcode', 255).notNullable();
  
      tbl.string('organizationName', 255).notNullable();
  
      tbl.string('contactPerson', 255).notNullable();
  
      tbl.string('role', 255).notNullable();
    })
  
  
    .createTable('employee', tbl => {
      tbl.increments();
  
      tbl
      .string('username', 255)
      .notNullable()
      .unique();
  
      tbl.string('password', 255).notNullable();
  
      tbl.string('email', 255).notNullable();
  
      tbl.string('phoneNumber', 255).notNullable();
  
      tbl.string('streetAddress', 255).notNullable();
  
      tbl.string('state', 255).notNullable();
  
      tbl.string('zipcode', 255).notNullable();
  
      tbl.string('fullName', 255).notNullable();
  
      tbl.string('contactPerson', 255).notNullable();
  
      tbl.string('role', 255).notNullable();
  
      tbl.integer('orgId')
      .unsigned()
      .references('id')
      .inTable('org')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    })
  
  
    .createTable('subs', tbl => {
        tbl.increments();
        tbl.float('monthlyFee');
        tbl.datetime('lengthOfSubscription');
        tbl.string('nameOfSubscription', 255);
        tbl.integer('orgId')
      .unsigned()
      .references('id')
      .inTable('org')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  
    })
  
  
    .createTable('snacks', tbl => {
        tbl.increments();
        tbl.string('name', 255);
        tbl.integer('numberOfServings');
        tbl.float('totalWeight');
        tbl.float('price');
        tbl.integer('subId')
      .unsigned()
      .references('id')
      .inTable('subs')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    })
  
  
    .createTable('nutrition', tbl => {
        tbl.increments();
        tbl.float('calories');
        tbl.float('totalFat');
        tbl.float('totalSugars'); 
        tbl.float('protein');
        tbl.float('carbs');
        tbl.string('allergens', 255)
        tbl.integer('snackId')
      .unsigned()
      .references('id')
      .inTable('snacks')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    })
  
  
    .createTable('request', tbl => {
        tbl.increments();
        tbl.string('snackName', 255);
      tbl.integer('subId')
      .unsigned()
      .references('id')
      .inTable('subs')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    })
  
    .createTable('one', tbl => {
      tbl.increments();
      tbl.string('snackName', 255);
      tbl.integer('subId')
      .unsigned()
      .references('id')
      .inTable('subs')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('one')
    .dropTableIfExists('request')
    .dropTableIfExists('nutrition')
    .dropTableIfExists('snacks')
    .dropTableIfExists('subs')
    .dropTableIfExists('employee')
    .dropTableIfExists('org')
  };
  
