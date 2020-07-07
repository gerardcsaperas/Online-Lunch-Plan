const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
});

module.exports = Order = mongoose.model('order', OrderSchema);