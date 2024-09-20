import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;

  // Check for the token in the request headers or cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token; // Token from cookie
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Token from Authorization header
  }

  if (token) {
    try {
      // Verify token and extract user ID from it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Find user by ID and attach it to the request object
      req.user = await User.findById(decoded.id).select('-password'); // Exclude password from user data

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to allow only admin users
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};
