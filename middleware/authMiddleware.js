import jwt from 'jsonwebtoken';
import User from '../models/user.js';

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

// Middleware for role-based access (e.g., Owner or Tenant)
export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role ${req.user.role} is not authorized to access this route` });
    }
    next();
  };
};



//made in class middleware
export const Middleware = async (req, res, next) => {
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }
    await jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
        if (err) {
            return res.status(403).json("You are not Authorized")
        }
        req.user = user;
        next();
    })
}


export const roleBasemiddleware = async (...allroles) => {
  return async (req, res, next) => {
    try {
    if (!allroles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role ${req.user.role} is not authorized to access this route` });
    }
    next(); 
    } catch (error) {
      res.status(500).json({ message: 'Not authorized, failed' });
  };
  };
}