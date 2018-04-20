const express = require('express');
const server = express();
var path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 3000;

server.use(bodyParser.json());
server.use(cors());
server.disable('x-powered-by');

if (process.env.NODE_ENV !== 'test') server.use(morgan('dev'));
const postPath = require('./src/routes/posts');

server.use('/posts', postPath);
server.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ error: err });
});

server.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found'});
});

const listener = console.log(`server running on ${port}`);
server.listen(port, listener);

module.exports = server;