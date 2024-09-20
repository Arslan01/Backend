import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const productRoutes = express.Router();

// Routes for Products
productRoutes.post('/createProduct', protect, createProduct); // Create a new product (authenticated users only)
productRoutes.get('/getProducts', getProducts);             // Get all products
productRoutes.get('/getProductById/:id', getProductById);       // Get a product by ID
productRoutes.put('/updateProduct/:id', protect, updateProduct); // Update a product (authenticated users only)
productRoutes.delete('/deleteProduct/:id', protect, deleteProduct); // Delete a product (authenticated users only)

export default productRoutes;
