const express = require('express');
const router = express.Router();

// Import model for Orders
const Order = require('../../models/Order');

/*
@route   GET api/orders
@desc    Get total orders count for a given day.
         If there are 100 or more orders, the user
         won't be able to place an order for that day.
*/
router.get('/', async(req, res) => {
    const { currDate } = req.query;

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

/*
@route   POST api/orders
@desc    Sum the orders to the order's count database
         (in order to never go pass 100 orders, which
         is business' max capacity)
*/
router.post('/', async(req, res) => {
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

module.exports = router;