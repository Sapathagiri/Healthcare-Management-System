const Report = require('../modals/report.model');

class ReportService {
  static async createReport(data) {
    return await Report.create(data);
  }

  static async getAllReports() {
    return await Report.find();
  }

  static async getReportById(id) {
    return await Report.findById(id);
  }

  static async updateReport(id, data) {
    return await Report.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteReport(id) {
    return await Report.findByIdAndDelete(id);
  }
}

module.exports = ReportService;
