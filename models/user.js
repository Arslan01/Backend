import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String,},
  role: {type: String, enum: ['user', 'Owner','Tenant'] , // Roles defined
  default: 'user', required: true },

  resetPasswordToken: String, // Stores the password reset token
  resetPasswordExpire: Date,  // Stores when the token expires

},
{timestamps: true});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to match password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate a reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash the reset token and set it to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set token expiration time (1 hour)
  this.resetPasswordExpire = Date.now() + 60 * 60 * 1000;

  return resetToken;
};


const User = mongoose.model('User', userSchema);
export default User;
