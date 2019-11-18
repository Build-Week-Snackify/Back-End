const db = require('../database/dbConfig');

module.exports = { 
    find, 
    add,
    addNutrition,
    update, 
    updateNutrition,
    remove, 
    removeNutrition,
    findById,
    findNutrition,
    findNutritionById
};

function find() {
    return db
    .select('*')
    .from('snacks');
};

function findById(id) {
    return db('snacks')
    .where({ id })
    .first();
}

function findNutritionById(id) {
    return db('nutrition')
    .where({ id })
    .first();
}

function add(snack) {
    return db('snacks')
    .insert(snack, 'id')
    .then(ids => ({ id: ids[0] }))
};

function addNutrition(nutrition) {
    return db('nutrition')
    .insert(nutrition, 'id')
    .then(ids => ({ id: ids[0] }))
}

function update(change, id) {
    return db('snacks')
    .where({ id })
    .update(change)
};

function updateNutrition(change, id) {
    return db('nutrition')
    .where({ id })
    .update(change)
};


function remove(id) {
    return findById(id)
    .then(snack => {
        return db('snacks')
        .where({ id })
        .del()
        .then(() => snack)
    })
};

function removeNutrition(id) {
    return findNutritionById(id)
    .then(nutrition => {
        return db('nutrition')
        .where({ id })
        .del()
        .then(() => nutrition)
    })
};

function findNutrition(id) {
    return db('nutrition')
    .join("snacks", "snacks.id", "nutrition.snackId")
    .select("snacks.id as snackId", "snacks.name", "nutrition.calories", "nutrition.totalFat", "nutrition.protein",
    "nutrition.carbs", "nutrition.allergens", "nutrition.id as nutritionId")
    .where({ snackId: id})
};