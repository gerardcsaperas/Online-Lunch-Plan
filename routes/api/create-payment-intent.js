const express = require('express');
const router = express.Router();

// Function to calculate order amount
const calculateOrderAmount = require('../../functions/calculateOrderAmount');

// Stripe (payments API)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/*
@route  POST api/create-payment-intent
@desc.  Create a PaymentIntent with the
        order amount and currency. 
*/
router.post('/', async(req, res) => {
    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'eur'
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

module.exports = router;