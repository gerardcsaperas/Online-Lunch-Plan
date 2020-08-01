const express = require('express');
const router = express.Router();

// Get total orders' count. If = 100, it won't let any other customer order for this day (client-side code). Customers will be able to choose other days.

// @route   POST api/users
// @desc    Register User
// @access  Public
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

module.exports = router;