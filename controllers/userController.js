import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';


// Create a new user (Register)
export const createUser = async (req, res) => {
  const { username, password, email } = req.body;
  const image = req.fle && req.file.name;
  // const image = req.fle && req.file.path;
  try {
     // Check if the user already exists
     const userExists = await User.findOne({ email });

     if (userExists) {
       return res.status(400).json({ message: 'Email already exists' });
     }
 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email,role, image: image  });
    const savedUser = await newUser.save();
    const token = generateToken(savedUser._id);

    // Send the response with user info and token

    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role
      },
      token 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { username, email, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, role },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user
//export const deleteUser = async (req, res)

export const deleteUser = async (req, res) => {
    try {
        const { deluserId } = req.params.id;
        const delUser = await user.findByIdAndDelete(deluserId);
        return res.status(200).json({ message: "User data deleted successfully", success: true, data: delUser });
    } catch (error) {
       return res.status(500).json(error.message);
    }
}


export const registerUser = async (req, res) => {
  try {

    let userData=req.body
    let isEmailExisted = await User.findOne({ email: userData.email });
    if(isEmailExisted) return res.json({message:"email already exist"})

    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password=hashedPassword;
    const User=await User.create(userData);
    return res.json({message:"user created successfully", User})

  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    } 
    
    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    } 
        // Generate JWT token
    const token=await JsonWebTokenError.sign({id:user._id},process.env.PRIVATE_KEY,{expiresIn:"5m"});
    //const token = generateToken(user._id);
    //cookie
    res.cookie('token',token,{httpOnly:true,maxAge:5*60*1000});
    return res.json({
      message: 'Login successful',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token, 
      });
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  } 
} 


//Request password reset
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    //Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    //Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash the reset token and store it in the database with an expiration date
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 3600000; // Token valid for 1 hour

    await user.save();

    // Create the reset URL (frontend URL where user will reset their password)
    const resetUrl = `${req.protocol}://${req.get('host')}/password-reset/${resetToken}`;

    // Send the reset URL to the user's email
    const message = `You have requested a password reset. Please make a PUT request to: \n\n ${resetUrl}`;

    // Configure email sending (using nodemailer or any other email service)
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // You can use other services
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: `Email sent to: ${user.email}` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};


// Reset Password
export const resetPassword = async (req, res) => {
  const resetToken = req.params.token;

  try {
    // Hash the token to compare with the stored hashed token in the DB
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Find the user by the hashed token and ensure the token hasn't expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }, // Ensure token hasn't expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Set the new password
    const { password } = req.body;
    user.password = password;

    // Clear the reset token and expiration
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Save the updated user with the new password
    await user.save();

    // Generate a new JWT token (optional) after password reset
    const token = generateToken(user._id);

    res.status(200).json({ message: 'Password updated successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password', error: error.message });
  }
};
