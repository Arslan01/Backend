import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

// Routes for Categories
categoryRoutes.post('/createCategory', createCategory);            // Create a new category
categoryRoutes.get('/getCategories', getCategories);              // Get all categories
categoryRoutes.get('/getCategoryById/:id', getCategoryById);         // Get a category by ID
categoryRoutes.put('/updateCategory/:id', updateCategory);          // Update a category
categoryRoutes.delete('/deleteCategory/:id', deleteCategory);       // Delete a category

export default categoryRoutes;
