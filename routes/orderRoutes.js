import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
//import { protect } from '../middlewares/authMiddleware.js';

const orderRoutes = express.Router();

// Routes for Orders
// orderRoutes.post('/createOrder', protect, createOrder);   // Create a new order (only authenticated users)
orderRoutes.post('/createOrder', createOrder);   // Create a new order (only authenticated users)
orderRoutes.get('/getOrders', getOrders);      // Get all orders (authenticated users)
orderRoutes.get('/getOrderById/:id', getOrderById);// Get an order by ID (authenticated users)
orderRoutes.put('/updateOrder/:id', updateOrder); // Update an order (authenticated users)
orderRoutes.delete('/deleteOrder/:id', deleteOrder); // Delete an order (authenticated users)

export default orderRoutes;
