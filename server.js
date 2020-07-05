const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const { resolve } = require('path');

const stripe = require('stripe')(
    'sk_test_51GwkS9AhsXSRq7ctp0cnsmIeKuTcUR6ofvy0PcJCgPcXN4Vri25Rdkqrp281lZmJmruIowTSQZkVBZno8ubWwXEu00CGVqfsgq'
);

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// app.use(express.json());
const calculateOrderAmount = (items) => {
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
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'eur'
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

app.get('/ping', function(req, res) {
    return res.send('pong');
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);