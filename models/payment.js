import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  paymentDate: { type: Date, default: Date.now },
  amountPaid: { type: Number, required: true },
  paymentMethod: { type: String, required: true }, // e.g., Bank Transfer, Credit Card
  status: { type: String, default: 'Completed' },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
