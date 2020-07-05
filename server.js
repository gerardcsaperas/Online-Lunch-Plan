const { createServer } = require('https');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

const app = express();
const dev = app.get('env') !== 'production';

if (!dev) {
    app.disable('x-powered-by');
    app.use(compression()); // "Will handle a few things for us... (?)"
    app.use(morgan('common'));

    app.use(express.static(path.join(__dirname, 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

const server = createServer(app);

const { resolve } = require('path');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

const calculateOrderAmount = (items) => {
    console.log(items);
    let drinksTotal = 0;
    const { water, cola, colaZero, beer, lemonFanta, orangeFanta } = items.drinks;
    drinksTotal += water * 100;
    drinksTotal += (cola + colaZero + lemonFanta + orangeFanta) * 130;
    drinksTotal += beer * 150;

    let foodTotal = 0;
    foodTotal += items.primerSegonCount * 895;
    foodTotal += items.dosPrimersCount * 795;
    foodTotal += items.platPostresCount * 695;

    grandTotal = parseInt(drinksTotal + foodTotal);

    console.log(grandTotal);

    return grandTotal;
};

app.post('/create-payment-intent', async(req, res) => {
    const { items } = req.body;
    console.log(items);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'eur'
    });
    res.send({
        clientSecret: '123_secret_123' //paymentIntent.client_secret
    });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(PORT, (err) => {
    if (err) throw err;

    console.log('Server started on port ' + PORT);
});