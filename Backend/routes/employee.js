const express = require('express');
const { create, update, getAll, deleteItem, getAllEmployees } = require('../controller/employee.controller');
const { authWithParams } = require('../utils/helper');
const router = express.Router();

router.route('/employee').get(authWithParams(['ADMIN']), getAllEmployees).post(authWithParams(['ADMIN']), create);
router.route('/employee/:id').put(authWithParams(['ADMIN']), update).delete(authWithParams(['ADMIN']), deleteItem);

module.exports = router;