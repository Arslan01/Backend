import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  // name: { type: String, required: true },
  // price: { type: Number, required: true },
  // description: {String,required: true},
  // stock_quantity: { type: Number, default: 0 },
  // reorder_level: { type: Number, default: 10 },
  // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Linked to Category
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Linked to User (who created the product)
});

const Product = mongoose.model('Product', productSchema);
export default Product;
