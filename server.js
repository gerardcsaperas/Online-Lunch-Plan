const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// Responsive Images
const sharp = require('sharp');

// Images
// const originalFolder = './src/assets/original-images/';
// const destFolder = './src/assets/images/';

// sharp(`${originalFolder}logo-catering-roser-color.jpg`).resize(1000, 767).toFile(`${destFolder}650x435-logo.jpeg`);

// sharp(`${originalFolder}abhishek-sanwa-limbu-LR559Dcst70-unsplash.jpg`)
//     .resize(650, 435)
//     .toFile(`${destFolder}650x435-gyoza.jpeg`);

// sharp(`${originalFolder}brooke-lark-HlNcigvUi4Q-unsplash.jpg`)
//     .resize(1000, 700)
//     .toFile(`${destFolder}1000x700-about.jpeg`);

// sharp(`${originalFolder}davide-cantelli-jpkfc5_d-DI-unsplash.jpg`)
//     .resize(650, 435)
//     .toFile(`${destFolder}650x435-menudiari.jpeg`);

// sharp(`${originalFolder}rachel-park-hrlvr2ZlUNk-unsplash.jpg`)
//     .resize(650, 435)
//     .toFile(`${destFolder}650x435-menumig.jpeg`);

// Images...

const app = express();

const { resolve } = require('path');

const stripe = require('stripe')(
    'sk_test_51GwkS9AhsXSRq7ctp0cnsmIeKuTcUR6ofvy0PcJCgPcXN4Vri25Rdkqrp281lZmJmruIowTSQZkVBZno8ubWwXEu00CGVqfsgq'
);

// Connect Database
// const connectDB = require('./config/db');
// connectDB();

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

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
    console.log(items);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'eur'
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

app.post('/update-orders', async(req, res) => {
    const { items } = req.body;
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);