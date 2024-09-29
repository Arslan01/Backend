import express from 'express';
import { getOwners, getOwnerById, createOwner, updateOwner, deleteOwner } from '../controllers/ownerController.js';
import { protect,authorizeRole } from '../middleware/authMiddleware.js'; // Apply authentication middleware

const ownerRoutes = express.Router();

ownerRoutes.route('/')
  .get(protect, getOwners)
  .post(protect, createOwner);

ownerRoutes.route('/:id')
  .get(protect, getOwnerById)
  .put(protect, updateOwner)
  .delete(protect, deleteOwner);

  // Protect routes and only allow 'Owner' role to access

// router.route('/')
//   .get(protect, authorizeRole('Owner', 'Admin'), getOwners) // Only 'Owner' and 'Admin' can access
//   .post(protect, authorizeRole('Owner', 'Admin'), createOwner); // Only 'Owner' and 'Admin' can create

// router.route('/:id')
//   .get(protect, authorizeRole('Owner', 'Admin'), getOwnerById) // Only 'Owner' and 'Admin' can access
//   .put(protect, authorizeRole('Owner', 'Admin'), updateOwner)  // Only 'Owner' and 'Admin' can update
//   .delete(protect, authorizeRole('Admin'), deleteOwner); // Only 'Admin' can delete



export default ownerRoutes;
