const db = require('../database/dbConfig');

module.exports = {
    find,
    insert, 
     add,
    findBy,
    findEmBy,
    findEmployeeById,
    remove,
    updateEmployee
};

function find() {
    return db
    .select('*')
    .from('employee');
};

function findBy(filter) {
    return db('org')
    .where(filter)
};

function findEmBy(filter) {
    return db('employee')
    .where(filter)
};

function insert(org) {
    return db('org')
    .insert(org, 'id')
    .then(ids => {
        const id = ids[0]
        return db('org')
        .where({ id })
        .first()
    })

};

function add(employee) {
    return db('employee')
    .insert(employee, 'id')
    .then(ids => {
        const id = ids[0]
        return db('employee')
        .where({ id })
        .first()
    })
};

function findEmployeeById(id) {
    return db('employee')
    .where({ id })
    .first();
};

function remove(id) {
    return findById(id)
    .then(user => {
        return db('users')
        .where({ id })
        .del()
        .then(() => user)
    })
};

function updateEmployee(change, id) {
    return db('employee')
    .where({ id })
    .update(change)
};