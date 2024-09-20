import Tenant from '../models/tenant.js';

// Get all tenants
export const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find().populate('user', 'username email');
    res.status(200).json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single tenant by ID
export const getTenantById = async (req, res) => {
  const { id } = req.params;
  try {
    const tenant = await Tenant.findById(id).populate('user', 'username email');
    if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
    res.status(200).json(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new tenant
export const createTenant = async (req, res) => {
  const { firstName, lastName, contactNumber, emailAddress, user } = req.body;
  try {
    const tenant = new Tenant({ firstName, lastName, contactNumber, emailAddress, user });
    const newTenant = await tenant.save();
    res.status(201).json(newTenant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update tenant
export const updateTenant = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, contactNumber, emailAddress } = req.body;
  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(id, { firstName, lastName, contactNumber, emailAddress }, { new: true });
    if (!updatedTenant) return res.status(404).json({ message: 'Tenant not found' });
    res.status(200).json(updatedTenant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete tenant
export const deleteTenant = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTenant = await Tenant.findByIdAndDelete(id);
    if (!deletedTenant) return res.status(404).json({ message: 'Tenant not found' });
    res.status(200).json({ message: 'Tenant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
