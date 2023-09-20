const express = require('express');
const { create, update, login } = require('../controller/user.controller');
const { authWithParams } = require('../utils/helper');
const router = express.Router();

router.route('/login').post(login);
router.route('/sign-up').post(create);
router.route('/user').post(authWithParams(['CUSTOMER']), update);

module.exports = router;