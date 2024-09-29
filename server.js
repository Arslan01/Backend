import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'; 
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import ownerRoutes from './routes/owner.js';
import tenantRoutes from './routes/tenant.js';
import propertyRoutes from './routes/property.js';
import bookingRoutes from './routes/booking.js';
import paymentRoutes from './routes/payment.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware for parsing JSON
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
//app.use("/", router);
app.use('/', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/', categoryRoutes);
app.use('/', ownerRoutes);
app.use('/', tenantRoutes);
app.use('/', propertyRoutes);
app.use('/', bookingRoutes);
app.use('/', paymentRoutes);
app.use('/', userRoutes); // User routes



// Start the server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 