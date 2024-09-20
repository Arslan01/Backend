import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingDate: { type: Date, default: Date.now },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  rentAmount: { type: Number, required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
