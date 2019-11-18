const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware');
const authRouter = require('../auth/auth-router');
const snackRouter = require('../snacks/snacks-router');
const subRouter = require('../subscriptions/sub-router');
// const requestRouter = require('../request/request-router');
const purchaseRouter = require('../one/one-router');


const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());


server.use('/auth', authRouter);
server.use('/snacks', authenticate, snackRouter);
server.use('/subs', authenticate, subRouter);
server.use('/request', authenticate, requestRouter);
server.use('/purchase', authenticate, purchaseRouter);



module.exports = server;