const bcrypt = require('bcrypt');
const User=require('../models/People')


function getUsers(req, res, next) {
    res.render('users');
}

//add user to the Database
// async function addUser(req, res, next) {
//     let newUser
//     const hashedPassword = await bcrypt.hash(req.body.password,10)  

//     if(req.files && req.files.length>0){
//         newUser= new User({
//             ...req.body,
//             avatar: req.files[0].filename,
//             password: hashedPassword
//         })
//     }else{
//         newUser= new User({
//             ...req.body,
//             password: hashedPassword
//         })
//     }
// }
//save users to the database or send errors
// try {
//     const result = await newUser.save()
//     res.status(201).json({
//         message:"User added successfully",
//         details: result
//     })
// }catch(err){
//     res.status(400).json({
//         errors:{
//             common:{
//                 msg:"Unknown error occurred"
//             }
//         }
//     })
// }

//ChatGpt modfied code for addUser function

async function addUser(req, res, next) {
    try {
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
