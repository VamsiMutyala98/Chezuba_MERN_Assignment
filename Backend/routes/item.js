const express = require('express');
const { create, update, getAll, deleteItem } = require('../controller/item.controller');
const { authWithParams } = require('../utils/helper');
const router = express.Router();

router.route('/items').get(authWithParams(['ADMIN', 'CUSTOMER']), getAll).post(authWithParams(['ADMIN']), create);
router.route('/item/:id').put(authWithParams(['ADMIN']), update).delete(authWithParams(['ADMIN']), deleteItem);

module.exports = router;