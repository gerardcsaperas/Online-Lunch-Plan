const express = require('express');
const app = express();
const { resolve } = require('path');
const env = require('dotenv').config({ path: './.env' });

// This is your real test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.static('.'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
    console.log('Hello World');
});

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client

    let primerSegonCount = 0;
    const primerSegonPrice = 8.95;

    let dosPrimersCount = 0;
    const dosPrimersPrice = 7.95;


    let platPostresCount = 0;
    const platPostresPrice = 6.95


    items.forEach(item => {
        switch (item.menuType) {
            default: console.log('You got a problem @line 26, CheckOutChildren.js');
            break;
            case 'primerSegon':
                    primerSegonCount++;
                break;
            case 'dosPrimers':
                    dosPrimersCount++;
                break;
            case 'platPostres':
                    platPostresCount++;
                break;
        }
    })

    const grandTotal = (primerSegonCount * primerSegonPrice + dosPrimersCount * dosPrimersPrice + platPostresCount * platPostresPrice).toFixed(2);

    return grandTotal;
};

app.post('/create-payment-intent', async(req, res) => {
    console.log(req.body);
    const items = req.body.cashRegister;
    // // Create a PaymentIntent with the order amount and currency

    console.log(calculateOrderAmount(items));

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'eur'
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));