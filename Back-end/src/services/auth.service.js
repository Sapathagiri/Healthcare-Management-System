
// src/services/authService.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../modals/user.model');

class AuthService {
  // Authenticate user and generate token
  async authenticateUser(username, password) {
    try {
      // Find user by username
      const user = await User.findOne({ username });
      
      if (!user) {
        return { success: false, message: 'Invalid credentials' };
      }
      
      // Verify password
      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        return { success: false, message: 'Invalid credentials' };
      }
      
      // Update last login time
      user.lastLogin = Date.now();
      await user.save();
      
      // Generate token
      const token = this.generateToken(user._id);
      
      return {
        success: true,
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      };
    } catch (error) {
      console.error('Authentication error:', error);
      return { success: false, message: 'Server error' };
    }
  }
  
  // Generate JWT token
  generateToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
  }
  
  // Verify JWT token
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Token verification error:', error);
      return null;
    }
  }
  
  // Generate password reset token
  async generatePasswordResetToken(user) {
    // Generate random token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
      
    // Set expiration (10 minutes)
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    
    await user.save();
    
    return resetToken;
  }
  
  // Reset password with token
  async resetPassword(resetToken, newPassword) {
    try {
      // Hash token to compare with stored hash
      const resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
        
      // Find user with valid token
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      });
      
      if (!user) {
        return { 
          success: false, 
          message: 'Invalid or expired token' 
        };
      }
      
      // Set new password
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      
      await user.save();
      
      return { 
        success: true, 
        message: 'Password reset successful' 
      };
    } catch (error) {
      console.error('Reset password error:', error);
      return { 
        success: false, 
        message: 'Password reset failed' 
      };
    }
  }
}

module.exports = new AuthService();
