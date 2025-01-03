require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth.js');
const taskRoutes = require('./routes/task.js');
const adminRoutes = require('./routes/admin.js');
const errorHandler = require('./middleware/errorHandler.js');

// Initialize express
const app = express();

// Connect to database
connectDB().catch((error) => {
  console.log("Failed to connect to MongoDB", error);
  process.exit(1);
});

// Middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.json({message:"Welcome to Task Management API"});
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

// Catch-all route
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});