const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const { resolve } = require('path');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// eMail
const nodemailer = require('nodemailer');

// Connect Database
const connectDB = require('./config/db');
const Order = require('./models/Order.js');
connectDB();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// eMail when order made
app.post('/email', (req, res) => {
    const {
        data,
        comanda,
        begudes,
        totalPrice,
        nomReserva,
        email,
        tenda,
        municipi,
        address,
        tel,
        comentaris
    } = req.body;

    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gcsaperas@gmail.com',
            pass: process.env.GMAIL_PASS
        },
        tls: { rejectUnauthorized: false }
    });

    // Mail for business
    const rogerMailOptions = {
        from: 'gcsaperas@gmail.com',
        to: 'gcsaperas@gmail.com',
        subject: 'Càtering Roser - Nova Comanda',
        html: `<p>Hola Roger!<br><br>Tens una nova comanda, amb un valor total de ${totalPrice} €.<br><br><b>Detalls d'entrega:</b><br>Dia: ${data}<br>Nom Reserva: ${nomReserva}<br>Tenda o Municipi: ${tenda +
			municipi}<br>Adreça: ${address}<br>Telèfon: ${tel}<br>Email: ${email}<br>Comentaris: ${comentaris}<br><br><b>Comanda:</b><br><b>Menús: </b>${comanda}<br><b>Begudes:</b> ${begudes}<br></br>A tope hostia!!!<br>Salut,<br>Gerard</p>`
    };

    // Mail for customer
    const customerMailOptions = {
        from: 'gcsaperas@gmail.com',
        to: `${email}`,
        subject: 'Càtering Roser - Nova Comanda',
        html: `<p>Hola ${nomReserva},<br><br>Hem rebut la seva comanda correctament.<br><br><b>Detalls d'entrega:</b><br>Dia: ${data}<br>Nom Reserva: ${nomReserva}<br>Tenda o Municipi: ${tenda +
			municipi}<br>Adreça: ${address}<br>Telèfon: ${tel}<br>Email: ${email}<br>Comentaris: ${comentaris}<br><br><b>Comanda:</b><br><b>Menús: </b>${comanda}<br><b>Begudes:</b> ${begudes}<br><br>Que vagi de gust!<br><br>Salut,<br>Càtering Roser<br><br>Per a qualsevol dubte, es pot posar en contacte amb nosaltres mitjançant els telèfons que trobarà a www.cateringroser.cat</p>`
    };

    // Send the actual emails to both business and customer
    transporter.sendMail(rogerMailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    transporter.sendMail(customerMailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

// Calculate total order amount

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

// Create a PaymentIntent with the order amount and currency (Stripe)
app.post('/create-payment-intent', async(req, res) => {
    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'eur'
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

// Sum the orders to the order's count database (in order to never go pass 100 orders, which is business' max capacity)
app.post('/orders', async(req, res) => {
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
});

app.use('/api/orders', require('./routes/api/orders'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 5000);