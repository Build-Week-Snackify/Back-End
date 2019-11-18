const router = require('express').Router();

const Snacks = require('./snack-model');


//GETS ALL SNACKS
router.get('/', checkRole('organization', 'orgAdmin'), (req, res) => {

    Snacks.find()
        .then(snacks => {
            res.send(snacks)
        })
        .catch(err => res.json(err))
});

//GETS NUTRITIONAL FACTS BY SNACK ID
router.get('/:id/nutrition', checkRole('organization', 'orgAdmin'), (req, res) => {

    const { id } = req.params;

    Snacks.findNutrition(id)
        .then(nutrition => {
            if (nutrition.length) {
            res.json(nutrition)
            } else {
            res.status(404).json({ message: 'Failed to get nutrition facts!'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

//ADDS NUTRITIONAL FACT
router.post('/nutrition', checkRole('organization', 'orgAdmin'), (req, res) => {
    const nutritionData = req.body;

    Snacks.addNutrition(nutritionData)
    .then(nutrition => {
        res.status(201).json(nutrition);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to add new nutritional fact!' })
    })
});

//ADDS A SNACK
router.post('/', checkRole('organization', 'orgAdmin'), (req, res) => {
    const snackData = req.body;

    Snacks.add(snackData)
    .then(snack => {
        res.status(201).json(snack);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to add new snack!' })
    })
});

//UPDATES A SNACK
router.put('/:id', checkRole('organization', 'orgAdmin'), (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Snacks.findById(id)
    .then(snack => {
        if (snack) {
            Snacks.update(changes, id)
            .then(updatedSnack => {
                res.json(updatedSnack)
            })
        } else {
            res.status(404).json({ message: 'Could not find snack with the given ID!' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to update snack!' })
    })
});

//UPDATES NUTRITION BY ID
router.put('/:id/nutrition', checkRole('organization', 'orgAdmin'), (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Snacks.findNutritionById(id)
    .then(nutrition => {
        if (nutrition) {
            Snacks.updateNutrition(changes, id)
            .then(updatedNutriton => {
                res.json(updatedNutriton)
            })
        } else {
            res.status(404).json({ message: 'Could not find nutritional facts with the given ID!' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to update nutritional facts!' })
    })
});

//DELETES A SNACK BY ID
router.delete('/:id', checkRole('organization', 'orgAdmin'), (req, res) => {
    const { id } = req.params;
    
    Snacks.remove(id)
    .then(deleted => {
        if (deleted) {
            res.json({ removed: deleted })
        } else {
            res.status(404).json({ message: 'Could not find the snack with the given ID!' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete snack!' })
    })
});

//DELETES A NUTRITIONAL FACT BY ID
router.delete('/:id/nutrition', checkRole('organization', 'orgAdmin'), (req, res) => {
    const { id } = req.params;
    
    Snacks.removeNutrition(id)
    .then(deleted => {
        if (deleted) {
            res.json({ removed: deleted })
        } else {
            res.status(404).json({ message: 'Could not find the nutritional fact with the given ID!' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete snack!' })
    })
});

module.exports = router;

function checkRole(rolesArr) {

    return function(req, res, next) {
        console.log(req.decodedJwt)

        if(rolesArr.includes(req.decodedJwt.role)) {
            next();
        } else {
            res.status(403).send('Sorry, only organizations and organization admins allowed!')
        }
    }
};