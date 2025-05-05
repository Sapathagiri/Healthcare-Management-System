const express = require('express');
const router = express.Router();
const InvoiceController = require('../controller/invoice.controller');

router.get('/', InvoiceController.getAllInvoices);
router.get('/:id', InvoiceController.getInvoice);
router.post('/', InvoiceController.addInvoice);
router.put('/:id', InvoiceController.updateInvoice);
router.delete('/:id', InvoiceController.deleteInvoice);

module.exports = router;
