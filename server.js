const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const { resolve } = require('path');

// Connect Database
const connectDB = require('./config/db');
connectDB();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Define API routes (more info inside './routes/api/<name-of-the-route>')
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/create-payment-intent', require('./routes/api/create-payment-intent'));
app.use('/api/send-email', require('./routes/api/send-email'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 5000);