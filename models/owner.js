import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, 
  lastName: { type: String, required: true },  
  contactNumber: { type: String, required: true },  
  emailAddress: { type: String, required: true, unique: true },  
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  
});

const Owner = mongoose.model('Owner', ownerSchema);
export default Owner;
