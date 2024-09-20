import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {type: String, enum: ['user', 'admin','superadmin'] ,default: 'user'
  } // Role can be 'user' or 'admin'
});

const User = mongoose.model('User', userSchema);
export default User;
