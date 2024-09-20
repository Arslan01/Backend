import Owner from "../models/owner.js";

// Get all owners
export const getOwners = async (req, res) => {
  try {
    const owners = await Owner.find().populate('user', 'username email');
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single owner by ID
export const getOwnerById = async (req, res) => {
  const { id } = req.params;
  try {
    const owner = await Owner.findById(id).populate('user', 'username email');
    if (!owner) return res.status(404).json({ message: 'Owner not found' });
    res.status(200).json(owner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new owner
export const createOwner = async (req, res) => {
  const { firstName, lastName, contactNumber, emailAddress, user } = req.body;
  try {
    const owner = new Owner({ firstName, lastName, contactNumber, emailAddress, user });
    const newOwner = await owner.save();
    res.status(201).json(newOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update owner
export const updateOwner = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, contactNumber, emailAddress } = req.body;
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(id, { firstName, lastName, contactNumber, emailAddress }, { new: true });
    if (!updatedOwner) return res.status(404).json({ message: 'Owner not found' });
    res.status(200).json(updatedOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete owner
export const deleteOwner = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOwner = await Owner.findByIdAndDelete(id);
    if (!deletedOwner) return res.status(404).json({ message: 'Owner not found' });
    res.status(200).json({ message: 'Owner deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
