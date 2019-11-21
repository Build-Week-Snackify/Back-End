const router = require('express').Router();

const Subs = require('./sub-model');




//GETS ALL SUBS

router.get('/', checkRole(['organization', 'orgAdmin']),  (req, res, next) => {
    const id = req.decodedJwt.orgId || req.decodedJwt.id
    
    console.log(req.decodedJwt)
    
        Subs.findSub(id)
            .then(subs => {
                res.send(subs)
                
            })
            .catch(err => res.json(err))
    });

//GET ALL SNACKS BY SUB ID
router.get('/:id/snacks', checkRole(['organization', 'orgAdmin']),  (req, res) => {
    // const orgid = req.decodedJwt.orgId || req.decodedJwt.id
    
    // const id = req.decodedJwt.orgId || req.decodedJwt.id
  const { id } = req.params;
            
     Subs.findSnacks(id)
            
        .then(snacks => {
            if (snacks.length) {
            res.json(snacks)
            } else {
            res.status(404).json({ message: 'Failed to get sub!'})
            }
        })
   
        
    // })
    
        .catch(err => {
            res.status(500).json(err)
        })
});

//ADDS NEW SUB
router.post('/', checkRole(['organization', 'orgAdmin']), (req, res) => {
    const id = req.decodedJwt.orgId || req.decodedJwt.id
    const subData = req.body;

    Subs.addSub(subData, id)
    .then(sub => {
        res.status(201).json(sub);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to add new sub!' })
    })
});

//UPDATES A SUB BY ID
router.put('/:id', checkRole(['organization', 'orgAdmin']), (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Subs.findSubById(id)
    .then(sub => {
        if (sub) {
            Subs.update(changes, id)
            .then(updatedSub => {
                res.json(updatedSub)
            })
        } else {
            res.status(404).json({ message: 'Could not find sub with the given ID!' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to update sub data!' })
    })
});

router.delete('/:id', checkRole(['organization', 'orgAdmin']), (req, res) => {
    const { id } = req.params;
    
    Subs.remove(id)
    .then(deleted => {
        if (deleted) {
            res.json({ removed: deleted })
        } else {
            res.status(404).json({ message: 'Could not find the sub with the given ID!' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete sub!' })
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
function checkUser(id) {
    return function(req, res, next) {
        const org = req.params.id
        console.log(req.decodedJwt)
        const id = req.decodedJwt.orgId || req.decodedJwt.id
        if(org === id) { // ← no need to add another || here
            next();
        } else {
            res.status(403).json({ message: 'Sorry!'})
        }
    }
}

// console.log(req.decodedJwt)

    // Subs.findSub(id)
    //     .then(subs => {
    //         res.send(subs)
    //     })
    //     .catch(err => res.json(err))