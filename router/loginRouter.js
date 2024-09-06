const express = require('express');

// Internal imports
const { getLogin } = require('../controller/loginController'); 
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

const router = express.Router();

// Login page route
router.get('/',decorateHtmlResponse('Login'), getLogin); 

module.exports = router;
