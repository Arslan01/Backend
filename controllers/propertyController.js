import Property from '../models/property.js';

// Get all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'firstName lastName');
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single property by ID
export const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id).populate('owner', 'firstName lastName');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new property
export const createProperty = async (req, res) => {
  const { address, city, state, zipCode, type, numberOfRooms, area, rentAmount, owner } = req.body;
  try {
    const property = new Property({ address, city, state, zipCode, type, numberOfRooms, area, rentAmount, owner });
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update property
export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const { address, city, state, zipCode, type, numberOfRooms, area, rentAmount, status } = req.body;
  try {
    const updatedProperty = await Property.findByIdAndUpdate(id, { address, city, state, zipCode, type, numberOfRooms, area, rentAmount, status }, { new: true });
    if (!updatedProperty) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
