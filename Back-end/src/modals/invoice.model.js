const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  service: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Paid', 'Overdue'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
