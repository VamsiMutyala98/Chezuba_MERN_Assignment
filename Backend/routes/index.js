const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const itemRoutes = require('./item');
const branchRoutes = require('./branch');
const employeeRoutes = require('./employee');
const orderRoutes = require('./order');

router.use('/v1', userRoutes);
router.use('/v1', itemRoutes);
router.use('/v1', branchRoutes);
router.use('/v1', employeeRoutes);
router.use('/v1', orderRoutes);


module.exports = router;