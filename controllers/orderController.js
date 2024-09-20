import Order from '../models/order.js';
import Product from '../models/product.js';

// Create a new order (only authenticated users)
export const createOrder = async (req, res) => {
  const { products } = req.body; // Array of products with product ID and quantity

  try {
    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (product) {
        totalAmount += product.price * item.quantity;
      } else {
        return res.status(404).json({ error: `Product with id ${item.product} not found` });
      }
    }

    const newOrder = new Order({
      user: req.user._id, // The logged-in user placing the order
      products,
      total_amount: totalAmount,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user products.product');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Update an order (e.g., change status)
export const updateOrder = async (req, res) => {
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
