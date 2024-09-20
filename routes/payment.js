import express from 'express';
import { getPayments, getPaymentById, createPayment, updatePayment, deletePayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const paymentRoutes = express.Router();

paymentRoutes.route('/')
  .get(protect, getPayments)
  .post(protect, createPayment);

paymentRoutes.route('/:id')
  .get(protect, getPaymentById)
  .put(protect, updatePayment)
  .delete(protect, deletePayment);

export default paymentRoutes;
