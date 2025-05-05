import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { 
  FileText, 
  Plus, 
  ClipboardList, 
  FileCheck, 
  FileClock 
} from 'lucide-react';

function ReportsManagement() {
  const [reports, setReports] = useState([
    // {
    //   id: 1,
    //   patientName: 'John Doe',
    //   type: 'Lab Report',
    //   date: '2025-03-15',
    //   doctor: 'Dr. Emily Chen',
    //   status: 'Completed'
    // },
    // {
    //   id: 2,
    //   patientName: 'Jane Smith',
    //   type: 'X-Ray',
    //   date: '2025-03-20',
    //   doctor: 'Dr. Michael Rodriguez',
    //   status: 'Pending'
    // }
  ]);

  const [newReport, setNewReport] = useState({
    patientName: '',
    type: '',
    date: '',
    doctor: '',
    status: 'Pending'
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports')
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
      });
  }, []);
  // Handle "Generate Report" click
  const handleGenerateReport = async () => {
    if (!newReport.patientName || !newReport.type || !newReport.date || !newReport.doctor) {
      alert("Please fill in all fields before generating a report.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reports', newReport);
      setReports([...reports, response.data]); // Add new report to state
      setNewReport({ patientName: '', type: '', date: '', doctor: '', status: 'Pending' });
    } catch (error) {
      console.error('Error adding report:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-500/10 text-green-700';
      case 'Pending': return 'bg-yellow-500/10 text-yellow-700';
      case 'Reviewing': return 'bg-blue-500/10 text-blue-700';
      default: return 'bg-gray-500/10 text-gray-700';
    }
  };

  const reportTypes = [
    'Lab Report', 'X-Ray', 'MRI', 'Blood Test', 
    'CT Scan', 'Ultrasound', 'ECG', 'Pathology'
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-8">
        <FileText className="w-10 h-10 mr-4 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Reports Management</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Create Report Column */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Plus className="w-6 h-6 mr-3 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Generate New Report</h2>
            </div>
            <form  className="space-y-4">
              <input
                type="text"
                placeholder="Patient Name"
                value={newReport.patientName}
                onChange={(e) => setNewReport(prev => ({
                  ...prev, 
                  patientName: e.target.value
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
              <select
                value={newReport.type}
                onChange={(e) => setNewReport(prev => ({
                  ...prev, 
                  type: e.target.value
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                required
              >
                <option value="">Select Report Type</option>
                {reportTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={newReport.date}
                  onChange={(e) => setNewReport(prev => ({
                    ...prev, 
                    date: e.target.value
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
                <input
                  type="text"
                  placeholder="Doctor"
                  value={newReport.doctor}
                  onChange={(e) => setNewReport(prev => ({
                    ...prev, 
                    doctor: e.target.value
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>
              <select
                value={newReport.status}
                onChange={(e) => setNewReport(prev => ({
                  ...prev, 
                  status: e.target.value
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Reviewing">Reviewing</option>
              </select>
              <button
                type="submit"
                onClick={handleGenerateReport}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Generate Report
              </button>
            </form>
          </div>
        </div>

        {/* Reports List and Summary Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Reports Summary */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center">
              <ClipboardList className="w-10 h-10 mr-4 text-blue-600" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Reports</h3>
                <p className="text-3xl font-bold text-blue-700">{reports.length}</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center">
              <FileCheck className="w-10 h-10 mr-4 text-green-600" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                <p className="text-3xl font-bold text-green-700">
                  {reports.filter(rep => rep.status === 'Completed').length}
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center">
              <FileClock className="w-10 h-10 mr-4 text-yellow-600" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                <p className="text-3xl font-bold text-yellow-700">
                  {reports.filter(rep => rep.status === 'Pending').length}
                </p>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 mr-3 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-800">Reports List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    {['Patient', 'Report Type', 'Date', 'Doctor', 'Status'].map((header) => (
                      <th 
                        key={header} 
                        className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr 
                      key={report.id} 
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 text-sm text-gray-700">{report.patientName}</td>
                      <td className="p-3 text-sm text-gray-700">{report.type}</td>
                      <td className="p-3 text-sm text-gray-700">{report.date}</td>
                      <td className="p-3 text-sm text-gray-700">{report.doctor}</td>
                      <td className="p-3">
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${getStatusColor(report.status)}
                        `}>
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsManagement;
