import express from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
  } from '../controllers/userController.js';
  
// const userRoute = express.Router();

// userRoute.post('/createUser', postUserData );
// userRoute.get('/getUser', getUsersData );
// userRoute.get('/getUser/:id', getUserById );
// userRoute.delete('/delUser/:id', delUser );


const userRoute = express.Router();

// Routes for Users
userRoute.post('/createUser', createUser);             // Create a new user (register)
userRoute.get('/getUser', getUsers);                   // Get all users
userRoute.get('/getUserById/:id', getUserById);          // Get a user by ID
userRoute.put('/updateUser/:id', updateUser);           // Update a user
userRoute.delete('/deleteUser/:id', deleteUser);        // Delete a user

export default userRoute;
