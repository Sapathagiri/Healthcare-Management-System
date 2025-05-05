const InvoiceService = require('../services/invoice.services');

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceService.getInvoices();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceService.getInvoiceById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceService.createInvoice(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceService.updateInvoice(req.params.id, req.body);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceService.deleteInvoice(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.json({ message: "Invoice deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllInvoices, getInvoice, addInvoice, updateInvoice, deleteInvoice };
