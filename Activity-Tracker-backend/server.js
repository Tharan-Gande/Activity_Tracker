// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware
const activityRoutes = require('./routes/activityRoutes');

const app = express();
const PORT = process.env.PORT || 3005;

// Use cors middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

//MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/activityDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//  app.get('/',(req,res)=>{
//   res.send("<h1>Welcome to Backend</h1>");
//  });
//app.post('/checkpoint',req,res)

// Routes
app.use('/', activityRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
