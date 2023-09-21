const express = require('express');
const { create, update, getAll, deleteItem } = require('../controller/branch.controller');
const { authWithParams } = require('../utils/helper');
const router = express.Router();

router.route('/branch').get(authWithParams(['ADMIN', 'CUSTOMER']), getAll).post(authWithParams(['ADMIN']), create);
router.route('/branch/:id').put(authWithParams(['ADMIN']), update).delete(authWithParams(['ADMIN']), deleteItem);

module.exports = router;