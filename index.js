const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // logging framework
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:auth/auth';
mongoose.connect(dbUrl);

// Middlewares
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'})); // all request json
router(app);


const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);