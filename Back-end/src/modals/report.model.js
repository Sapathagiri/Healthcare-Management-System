const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  doctor: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Reviewing'], default: 'Pending' }
});

module.exports = mongoose.model('Report', ReportSchema);
