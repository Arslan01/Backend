import Payment from '../models/payment.js';

// Get all payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('booking', 'startDate endDate').populate('tenant', 'firstName lastName');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single payment by ID
export const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findById(id).populate('booking', 'startDate endDate').populate('tenant', 'firstName lastName');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new payment
export const createPayment = async (req, res) => {
  const { amountPaid, paymentMethod, booking } = req.body;
  try {
    const payment = new Payment({ amountPaid, paymentMethod, booking });
    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update payment
export const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amountPaid, paymentMethod, status } = req.body;
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(id, { amountPaid, paymentMethod, status }, { new: true });
    if (!updatedPayment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete payment
export const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPayment = await Payment.findByIdAndDelete(id);
    if (!deletedPayment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
