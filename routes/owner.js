import express from 'express';
import { getOwners, getOwnerById, createOwner, updateOwner, deleteOwner } from '../controllers/ownerController.js';
import { protect } from '../middleware/authMiddleware.js'; // Apply authentication middleware

const ownerRoutes = express.Router();

ownerRoutes.route('/')
  .get(protect, getOwners)
  .post(protect, createOwner);

ownerRoutes.route('/:id')
  .get(protect, getOwnerById)
  .put(protect, updateOwner)
  .delete(protect, deleteOwner);

export default ownerRoutes;
