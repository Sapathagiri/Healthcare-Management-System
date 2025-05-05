// // ROUTES
// // src/routes/authRoutes.js
// const express = require('express');
// const { login, getMe, logout } = require('../controller/auth.controller');
// const { protect } = require('../middleware/auth.middleware');

// const router = express.Router();

// router.post('/login', login);
// router.get('/me', protect, getMe);
// router.get('/logout', protect, logout);

// module.exports = router;


// src/routes/authRoutes.js (Update to include register endpoint)
const express = require('express');
const { 
  login, 
  register, 
  getMe, 
  logout, 
  forgotPassword, 
  resetPassword 
} = require('../controller/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;
