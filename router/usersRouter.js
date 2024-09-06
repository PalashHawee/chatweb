const express = require('express');

// Internal imports
const { getUsers } = require('../controller/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse'); 

const router = express.Router();

// Users page route
router.get('/', decorateHtmlResponse('Users'),getUsers); 

module.exports = router;
