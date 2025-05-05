// // // index.js
// // require('dotenv').config();
// // const http = require('http');
// // const App = require('./app');
// // const Database = require('./src/config/database');

// // class Server {
// //   constructor() {
// //     this.app = App.getApp();
// //     this.port = process.env.PORT || 5000;
// //     this.server = http.createServer(this.app);
// //   }

// //   async start() {
// //     try {
// //       // Connect to database
// //       await Database.connect();

// //       // Start server
// //       this.server.listen(this.port, () => {
// //         console.log(`Server running on port ${this.port}`);
// //         console.log(`Environment: ${process.env.NODE_ENV}`);
// //       });
// //     } catch (error) {
// //       console.error('Failed to start server:', error);
// //       process.exit(1);
// //     }
// //   }

// //   // Graceful shutdown
// //   shutdown() {
// //     this.server.close(() => {
// //       console.log('Server closed');
// //       Database.disconnect();
// //       process.exit(0);
// //     });
// //   }
// // }

// // // Create and start server
// // const server = new Server();
// // server.start();

// // // Handle process termination
// // process.on('SIGTERM', () => server.shutdown());
// // process.on('SIGINT', () => server.shutdown());

// // module.exports = server;


// // SERVER SETUP
// // src/index.js
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const authRoutes = require("./src/routes/auth.routes");
// const userRoutes = require('./src/routes/user.routes');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const app = require('./app');

// ENV variables
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});