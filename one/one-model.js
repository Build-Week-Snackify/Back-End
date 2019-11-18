const db = require('../database/dbConfig');

module.exports = { 
    find, 
    add,
    addOne,
    update, 
    remove, 
    findById
};

function find() {
    return db
    .select('*')
    .from('one');
};


function add(request) {
    return db('one')
    .insert(request)
    .then(ids => ({ id: ids[0] }))
};

function addOne(one) {
    return db('one')
    .insert(one)
    .then(ids => ({ id: ids[0] }))
}

function update(change, id) {
    return db('one')
    .where({ id })
    .update(change)
};

function findById(id) {
    return db('one')
    .where({ id })
    .first();
}

function remove(id) {
    return findById(id)
    .then(request => {
        return db('one')
        .where({ id })
        .del()
        .then(() => request)
    })
};