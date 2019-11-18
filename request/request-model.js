const db = require('../database/dbConfig');

module.exports = { 
    find, 
    add,
    update, 
    remove, 
    findById
};

function find() {
    return db
    .select('*')
    .from('request');
};


function add(request) {
    return db('request')
    .insert(request)
    .then(ids => ({ id: ids[0] }))
};

function update(change, id) {
    return db('request')
    .where({ id })
    .update(change)
};

function findById(id) {
    return db('request')
    .where({ id })
    .first();
}

function remove(id) {
    return findById(id)
    .then(request => {
        return db('request')
        .where({ id })
        .del()
        .then(() => request)
    })
};