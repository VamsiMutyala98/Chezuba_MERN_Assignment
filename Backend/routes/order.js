const express = require('express');
const { create, statusUpdate, getOrderDetails, getOrderAnalysis } = require('../controller/order.controller');
const { authWithParams } = require('../utils/helper');
const router = express.Router();

router.route('/order-placed').post(authWithParams(['CUSTOMER']), create);
router.route('/update-order/:id').put(authWithParams(['EMPLOYEE', 'CUSTOMER']), statusUpdate);
router.route('/order-details').get(authWithParams(['EMPLOYEE', 'CUSTOMER']), getOrderDetails);
router.route('/order-analysis').get(authWithParams(['ADMIN']), getOrderAnalysis);


module.exports = router;