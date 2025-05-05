const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    unique: true,
  },
  
  name: {
    type: String,
    // required: [true, 'Patient name is required'],
    trim: true
  },
  age: {
    type: Number,
    // required: [true, 'Patient age is required']
  },
  gender: {
    type: String,
    // required: [true, 'Patient gender is required'],
    enum: ['Male', 'Female', 'Other']
  },
  contact: {
    type: String,
    // required: [true, 'Contact number is required'],
    trim: true
  },
  lastVisit: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  medicalHistory: {
    type: String,
    default: ''
  },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create a text index for search functionality
patientSchema.index({ 
  name: 'text', 
  contact: 'text',
  medicalHistory: 'text' 
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;