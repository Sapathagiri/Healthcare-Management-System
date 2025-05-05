const express = require('express');
const ReportController = require('../controller/report.controller');

const router = express.Router();

router.post('/', ReportController.createReport);
router.get('/', ReportController.getAllReports);
router.get('/reports/:id', ReportController.getReportById);
router.put('/reports/:id', ReportController.updateReport);
router.delete('/reports/:id', ReportController.deleteReport);

module.exports = router;
