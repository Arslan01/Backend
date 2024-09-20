import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Apartment, House
  numberOfRooms: { type: Number, required: true },
  area: { type: Number, required: true },
  rentAmount: { type: Number, required: true },
  status: { type: String, default: 'Available' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true }
});

const Property = mongoose.model('Property', propertySchema);
export default Property;
