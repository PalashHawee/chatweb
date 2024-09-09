const bcrypt = require('bcrypt');
const User = require('../models/People');

function getUsers(req, res, next) {
    res.render('users');
}

async function addUser(req, res, next) {
    try {
        // Check if password exists in request body
        if (!req.body.password) {
            return res.status(400).json({
                message: 'Password is required',
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the user object with or without avatar
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
            avatar: req.files && req.files.length > 0 ? req.files[0].filename : undefined,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send a success response
        res.status(201).json({
            message: 'User created successfully',
            user: savedUser
        });
    } catch (error) {
        // Handle errors
        console.error('Error adding user:', error);
        res.status(500).json({
            message: 'Failed to create user',
            error: error.message
        });
    }
}

module.exports = {
    getUsers,
    addUser
};
