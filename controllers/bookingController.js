import Booking from '../models/booking.js';

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('tenant', 'firstName lastName').populate('property', 'address city');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single booking by ID
export const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id).populate('tenant', 'firstName lastName').populate('property', 'address city');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new booking
export const createBooking = async (req, res) => {
  const { startDate, endDate, rentAmount, tenant, property } = req.body;
  try {
    const booking = new Booking({ startDate, endDate, rentAmount, tenant, property });
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update booking
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, rentAmount } = req.body;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, { startDate, endDate, rentAmount }, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
