const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');

// @route   GET api/orders/today
// @desc    Get current user's profile
// @access  Public

// @route   POST api/orders
// @desc    Update orders count
// @access  Public