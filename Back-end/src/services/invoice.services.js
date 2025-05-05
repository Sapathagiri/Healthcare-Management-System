const Invoice = require('../modals/invoice.model');

const getInvoices = async () => await Invoice.find();
const getInvoiceById = async (id) => await Invoice.findById(id);
const createInvoice = async (data) => await Invoice.create(data);
const updateInvoice = async (id, data) => await Invoice.findByIdAndUpdate(id, data, { new: true });
const deleteInvoice = async (id) => await Invoice.findByIdAndDelete(id);

module.exports = {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice
};
