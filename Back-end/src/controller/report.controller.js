const ReportService = require('../services/report.services');

class ReportController {
  static async createReport(req, res) {
    try {
      const report = await ReportService.createReport(req.body);
      res.status(201).json(report);
    } catch (error) {
      res.status(500).json({ message: 'Error creating report', error });
    }
  }

  static async getAllReports(req, res) {
    try {
      const reports = await ReportService.getAllReports();
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  }

  static async getReportById(req, res) {
    try {
      const report = await ReportService.getReportById(req.params.id);
      if (!report) return res.status(404).json({ message: 'Report not found' });
      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching report', error });
    }
  }

  static async updateReport(req, res) {
    try {
      const updatedReport = await ReportService.updateReport(req.params.id, req.body);
      if (!updatedReport) return res.status(404).json({ message: 'Report not found' });
      res.status(200).json(updatedReport);
    } catch (error) {
      res.status(500).json({ message: 'Error updating report', error });
    }
  }

  static async deleteReport(req, res) {
    try {
      const deletedReport = await ReportService.deleteReport(req.params.id);
      if (!deletedReport) return res.status(404).json({ message: 'Report not found' });
      res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting report', error });
    }
  }
}

module.exports = ReportController;
