const router = require('express').Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');

const Users = require('../users/users-model');

const { validateUser } = require('../users/users-helpers');

const authenticate = require('../auth/authenticate-middleware');

router.post('/register/organization', (req, res) => {
    let user = req.body;

    const validateResult = validateUser(user)

    if(validateResult.isSuccessful === true) {

        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Users.insert(user)
            .then(saved => {
                
                res.status(201).json({ message: 'Register successful!', user})
            })
            .catch(err => {
                res.status(500).json(err);
            })
    } else {
        res.status(400).json({error: validateResult.errors})
    }
});

router.post('/register/employee', (req, res) => {
    let user = req.body;

    const validateResult = validateUser(user)

    if(validateResult.isSuccessful === true) {

        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Users.add(user)
            .then(saved => {
                res.status(201).json({ message: 'Register successful!', user})
            })
            .catch(err => {
                res.status(500).json(err);
            })
    } else {
        res.status(400).json({error: validateResult.errors})
    }
});

router.post('/login/organization', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                
                const token = getJwtToken(user)

                res.status(200).json({
                    message: `User ID: ${user.id} & Role: ${user.role}!`,
                    token,
                    
                });
            } else {
                res.status(401).json({ message: 'Invalid credentials, try again!'})
            }
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

router.post('/login/employee', (req, res) => {
    let { username, password } = req.body;

    Users.findEmBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                
                const token = getJwtToken(user)

                res.status(200).json({
                    message: `User ID: ${user.id} & Role: ${user.role}!`,
                    token
                });
            } else {
                res.status(401).json({ message: 'Invalid credentials, try again!'})
            }
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

//ALLOWS A ORG/ORGADMIN TO CHANGE THE ROLE OF AN EMPLOYEE
router.put('/:id/update-role', authenticate, checkRole(['organization', 'orgAdmin']), (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Users.findEmployeeById(id)
    .then(employee => {
        if (employee) {
            Users.updateEmployee(changes, id)
            .then(updatedEmployee => {
                res.json(updatedEmployee)
            })
        } else {
            res.status(404).json({ message: 'Could not find employee with the given ID!' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to update employee!' })
    })
});

router.get('/employees', authenticate, checkRole(['organization', 'orgAdmin']), (req, res) => {

    Users.find()
        .then(employees => {
            res.send(employees)
        })
        .catch(err => res.json(err))
});


function getJwtToken(user) {
    console.log(user)
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role
    };

    const options = {
        expiresIn: '20h'
    };

    return jwt.sign(payload, secrets.jwtSecret, options)
};

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