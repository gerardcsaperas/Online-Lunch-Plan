const express = require('express');
const path = require('path');
// Responsive Images
const sharp = require('sharp');

// Images
// const originalFolder = './src/assets/original-images/';
// const destFolder = './src/assets/images/';

// sharp(`${originalFolder}logo-catering-roser-color.jpg`).resize(355, 240).toFile(`${destFolder}mobile-logo.jpg`);

// sharp(`${originalFolder}abhishek-sanwa-limbu-LR559Dcst70-unsplash.jpg`)
//     .resize(355, 240)
//     .toFile(`${destFolder}mobile-gyoza.jpg`);

// sharp(`${originalFolder}brooke-lark-HlNcigvUi4Q-unsplash.jpg`).resize(355, 240).toFile(`${destFolder}mobile-about.jpg`);

// sharp(`${originalFolder}davide-cantelli-jpkfc5_d-DI-unsplash.jpg`)
//     .resize(355, 240)
//     .toFile(`${destFolder}mobile-menudiari.jpg`);

// sharp(`${originalFolder}rachel-park-hrlvr2ZlUNk-unsplash.jpg`)
//     .resize(355, 240)
//     .toFile(`${destFolder}mobile-menumig.jpg`);

// Images...

const app = express();

const { resolve } = require('path');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
        amount: 100, //calculateOrderAmount(items),
        currency: 'eur'
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);