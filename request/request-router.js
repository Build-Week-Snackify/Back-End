const router = require('express').Router();

const Request = require('./request-model');

//GET ALL REQUESTS
router.get('/', checkRole('employee'), (req, res) => {

    Request.find()
        .then(request => {
            res.send(request)
        })
        .catch(err => res.json(err))
});

//ADDS NEW REQUEST
router.post('/', checkRole('employee'), (req, res) => {
    const requestData = req.body;

    Request.add(requestData)
    .then(request => {
        res.status(201).json(request);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to add new request!' })
    })
});

//UPDATES REQUEST
router.put('/:id', checkRole('employee'), (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Request.findById(id)
    .then(request => {
        if (request) {
            Request.update(changes, id)
            .then(updatedRequest => {
                res.json(updatedRequest)
            })
        } else {
            res.status(404).json({ message: 'Could not find the request with the given ID!' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to update request!' })
    })
});

//DELETES REQUEST
router.delete('/:id', checkRole('employee'), (req, res) => {
    const { id } = req.params;
    
    Request.remove(id)
    .then(deleted => {
        if (deleted) {
            res.json({ removed: deleted })
        } else {
            res.status(404).json({ message: 'Could not find the request with the given ID!' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete the request!' })
    })
});


module.exports = router;

function checkRole(role) {

    return function(req, res, next) {
        console.log(req.decodedJwt)

        if(role === req.decodedJwt.role) {
            next();
        } else {
            res.status(403).send('Sorry, only employees allowed!')
        }
    }
};