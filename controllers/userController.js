
// export const postUserData = async ( req, res) => {
//     try {
//         const { name, email, password,userName} = req.body;
//         console.log(name, email, password,userName);
      
//       const userExists = await user.findOne({ email:email });
//       if (userExists) {
//         return res.status(400).json({ message: "User already exists" });
//       }

//       const userData =  new user({ name, email, password,userName});
//       await userData.save();
//      return res.status(201).json({ message: "User data saved successfully", success: true, data: userData });   


//     } catch (error) {
//         res.status(500).json(error.message);
//     }   
// }

// export const getUsersData = async (req, res) => {
//     try {
//         const getUsers = await user.find();
//         return res.status(200).json({ message: "User data fetched successfully", success: true, data: getUsers });
//     } catch (error) {
//        return res.status(500).json(error.message);
//     }
// }   

// export const getUserById = async (req, res) => {
//     try {
//         const { getuserId } = req.params.id;
//         const getUser = await user.findById(getuserId);
//         return res.status(200).json({ message: "User data fetched successfully", success: true, data: getUser });
//     } catch (error) {
//        return res.status(500).json(error.message);
//     }
// }


// export const updatedUser = async (req, res) => {
//     try {
//         const { updateuserId } = req.params.id;
//         const updatedUser = await user.findByIdAndUpdate(updateuserId, req.body, { new: true });
//         return res.status(200).json({ message: "User data updated successfully", success: true, data: updatedUser });
//     } catch (error) {
//        return res.status(500).json(error.message); 

//     }
// }

// export const delUser = async (req, res) => {
//     try {
//         const { deluserId } = req.params.id;
//         const delUser = await user.findByIdAndDelete(deluserId);
//         return res.status(200).json({ message: "User data deleted successfully", success: true, data: delUser });
//     } catch (error) {
//        return res.status(500).json(error.message);
//     }
// }

import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';


// Create a new user (Register)
export const createUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    const token = generateToken(newUser._id);
    res.status(201).json({ newUser, token });
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


export const register = async (req, res) => {
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    } 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    } 
    const token=await JsonWebTokenError.sign({id:user._id},process.env.PRIVATE_KEY,{expiresIn:"5m"});
    //const token = generateToken(user._id);
    //cookie
    res.cookie('token',token,{httpOnly:true,maxAge:5*60*1000});
    return res.json({ message: 'Login successful',user, token });
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  } 
} 