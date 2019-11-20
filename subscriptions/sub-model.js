const db = require('../database/dbConfig');

module.exports = {
    findSub,
    findSubById,
    addSub,
    updateSub, 
    removeSub, 
    findSnacks
};

function findSub() {

    return db
    .select('*')
    .from('subs');
  
};

function findSubById(id) {
    return db('subs')
    .where({ id })
    .first();
};

function findSnacks(id) {
    return db('subs')
    .join("snacks", "subs.id", "snacks.subId")
    .select("subs.id as subId", "subs.nameOfSubsription", "snacks.name as snackName", "snacks.price")
    .where({ subId: id})
}
// function addSub(sub) {
//     return db('subs')
//     .insert(sub)
//     .then(ids => ({ id: ids[0] }))
// };

async function addSub(sub) {
    const [id] = await db('subs').insert(sub, 'id');

    return findSubById(id);


};


function updateSub(change, id) {
    return db('subs')
    .where({ id })
    .update(change)
};

function removeSub(id) {
    return findById(id)
    .then(sub => {
        return db('subs')
        .where({ id }) 
        .del()
        .then(() => sub)
    })
};
