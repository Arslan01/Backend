import express from 'express';
import { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty } from '../controllers/propertyController.js';
import { protect } from '../middleware/authMiddleware.js';

const propertyRoutes = express.Router();

propertyRoutes.route('/')
  .get(protect, getProperties)
  .post(protect, createProperty);

propertyRoutes.route('/:id')
  .get(protect, getPropertyById)
  .put(protect, updateProperty)
  .delete(protect, deleteProperty);

export default propertyRoutes;
