const router = require('express').Router();

const Request = require('./one-model');

//GET ALL REQUESTS
router.get('/',  (req, res) => {

    Request.find()
        .then(request => {
            res.send(request)
        })
        .catch(err => res.json(err))
});

//ADDS NEW REQUEST
router.post('/',  (req, res) => {
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
router.put('/:id',  (req, res) => {
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
router.delete('/:id',  (req, res) => {
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

