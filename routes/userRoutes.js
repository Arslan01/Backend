import express from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    registerUser,
    loginUser,
    resetPassword,
  } from '../controllers/userController.js';

  import uploads from '../utils/helper.js';
  import{Middleware,roleBasemiddleware} from '../middleware/authMiddleware.js';
  
// const userRoute = express.Router();

// userRoute.post('/createUser', postUserData );
// userRoute.get('/getUser', getUsersData );
// userRoute.get('/getUser/:id', getUserById );
// userRoute.delete('/delUser/:id', delUser );


const userRoute = express.Router();

// Routes for Users
userRoute.post('/createUser',uploads.single('image'),  createUser);             // Create a new user (register)
userRoute.get('/getUser', getUsers);                   // Get all users
userRoute.get('/getUserById/:id', getUserById);          // Get a user by ID
userRoute.put('/updateUser/:id', updateUser);           // Update a user
userRoute.delete('/deleteUser/:id', deleteUser);        // Delete a user

// User registration and login routes
userRoute.post('/register', registerUser); // POST /api/users/register
userRoute.post('/login', loginUser); // POST /api/users/login

// Reset password route (with token)
userRoute.put('/reset-password/:token', resetPassword);

export default userRoute;