import express from 'express';
import { getBookings, getBookingById, updateBooking, deleteBooking } from '../controllers/bookingController.js';
import { createBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const bookingrouter = express.Router();

bookingrouter.route('/')
  .get(protect, getBookings)
  .post(protect, createBooking);

bookingrouter.route('/:id')
  .get(protect, getBookingById)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

export default bookingrouter;
