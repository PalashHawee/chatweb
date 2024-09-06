const express = require('express');

// Internal imports
const { getInbox } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse'); 

const router = express.Router();

// Inbox page route
router.get('/', decorateHtmlResponse('Inbox'),getInbox); 

module.exports = router;
