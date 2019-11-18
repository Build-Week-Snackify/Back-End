const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    if(token) {
        
        const secret = process.env.JWT_SECRET || 'build week secret!'

        jwt.verify(token, secret, (err, decodedToken) => {

            if(err) {
                res.status(401).json({ message: 'Invalid credentials, please try again!'})
            } else {
                req.decodedJwt = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'Sorry, you are not allowed!' })
    }
};