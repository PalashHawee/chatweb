const express = require('express');

// Internal imports
const { getUsers, addUser } = require('../controller/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse'); 
const avatarUpload=require('../middlewares/users/avatarUplaod') // Fixed typo here
const { addUserValidators, addUserValidationHandler } = require('../middlewares/users/userValidators');

const router = express.Router();

// Users page route
router.get('/', decorateHtmlResponse('Users'), getUsers); 

// Add user route
router.post('/', avatarUpload,addUserValidators,addUserValidationHandler, addUser                
);

module.exports = router;
