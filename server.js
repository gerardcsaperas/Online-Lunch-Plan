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
    process.env.STRIPE_SECRET_KEY ||
    'sk_test_51GwkS9AhsXSRq7ctp0cnsmIeKuTcUR6ofvy0PcJCgPcXN4Vri25Rdkqrp281lZmJmruIowTSQZkVBZno8ubWwXEu00CGVqfsgq'
);

// Connect Database
const connectDB = require('./config/db');
const Order = require('./models/Order.js');
connectDB();

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
    const { currDate, primerSegonCount, dosPrimersCount, platPostresCount } = items;
    const totalComanda = primerSegonCount + dosPrimersCount + platPostresCount;

    const date = new Date(currDate);
    const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const queryDate = new Date(dateString);

    Order.countDocuments({ date: queryDate }, async(err, count) => {
        if (err) console.log(err);
        if (count === 0) {
            // Create
            const order = new Order({
                date: queryDate,
                count: totalComanda
            });
            await order.save((err) => {
                if (err) console.log(err);
            });
        } else {
            // Update
            const order = await Order.findOne({ date: queryDate });

            const lastCount = order.count;
            const newCount = lastCount + totalComanda;
            order.count = newCount;
            await order.save();
        }
    });

    console.log(`Total Comanda: ` + totalComanda);
    console.log(`Order Date: ${dateString}`);
});

app.get('/update-orders', async(req, res) => {
    const { currDate } = req.query;

    console.log(currDate);

    const date = new Date(currDate);
    const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const queryDate = new Date(dateString);

    Order.countDocuments({ date: queryDate }, async(err, count) => {
        if (err) console.log(err);
        if (count !== 0) {
            Order.find({ date: queryDate }, (err, data) => {
                if (err) throw err;
                res.send(data);
            });
        } else {
            res.json({ count: 0 });
        }
    });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);