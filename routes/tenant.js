import express from 'express';
import { getTenants, getTenantById, createTenant, updateTenant, deleteTenant } from '../controllers/tenantController.js';
import { protect } from '../middleware/authMiddleware.js';

const tenantRoutes = express.Router();

tenantRoutes.route('/')
  .get(protect, getTenants)
  .post(protect, createTenant);

tenantRoutes.route('/:id')
  .get(protect, getTenantById)
  .put(protect, updateTenant)
  .delete(protect, deleteTenant);

export default tenantRoutes;
