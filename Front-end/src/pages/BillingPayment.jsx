import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { 
  CreditCard, 
  FileText, 
  DollarSign, 
  PlusCircle 
} from 'lucide-react';

function BillingPayment() {
  const [invoices, setInvoices] = useState([
    // {
    //   id: 1,
    //   patientName: 'John Doe',
    //   service: 'Consultation',
    //   amount: 250.00,
    //   date: '2025-03-15',
    //   status: 'Paid'
    // },
    // {
    //   id: 2,
    //   patientName: 'Jane Smith',
    //   service: 'Lab Tests',
    //   amount: 350.50,
    //   date: '2025-03-20',
    //   status: 'Pending'
    // }
  ]);
  // Fetch Invoices from Backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/invoices")
      .then(res => setInvoices(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add New Invoice (POST Request)
  const handleAddInvoice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/invoices", newInvoice);
      setInvoices([...invoices, response.data]);
      setNewInvoice({
        patientName: '',
        service: '',
        amount: '',
        date: '',
        status: 'Pending'
      });
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };

  // Generate Report (Send all invoices to backend)
  const handleGenerateReport = async () => {
    try {
      await axios.post(API_URL, { invoices });
      alert('Report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };


  const [newInvoice, setNewInvoice] = useState({
    patientName: '',
    service: '',
    amount: '',
    date: '',
    status: 'Pending'
  });

  // const handleAddInvoice = (e) => {
  //   e.preventDefault();
  //   const invoice = {
  //     id: invoices.length + 1,
  //     ...newInvoice,
  //     amount: parseFloat(newInvoice.amount)
  //   };
  //   setInvoices([...invoices, invoice]);
  //   setNewInvoice({
  //     patientName: '',
  //     service: '',
  //     amount: '',
  //     date: '',
  //     status: 'Pending'
  //   });
  // };

  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidInvoicesCount = invoices.filter(inv => inv.status === 'Paid').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return 'bg-green-500/10 text-green-700';
      case 'Pending': return 'bg-yellow-500/10 text-yellow-700';
      case 'Overdue': return 'bg-red-500/10 text-red-700';
      default: return 'bg-gray-500/10 text-gray-700';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-8">
        <CreditCard className="w-10 h-10 mr-4 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Billing and Payments</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Create Invoice Column */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <PlusCircle className="w-6 h-6 mr-3 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Create Invoice</h2>
            </div>
            <form onSubmit={handleAddInvoice} className="space-y-4">
              <input
                type="text"
                placeholder="Patient Name"
                value={newInvoice.patientName}
                onChange={(e) => setNewInvoice(prev => ({
                  ...prev, 
                  patientName: e.target.value
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
              <input
                type="text"
                placeholder="Service Description"
                value={newInvoice.service}
                onChange={(e) => setNewInvoice(prev => ({
                  ...prev, 
                  service: e.target.value
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Amount"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice(prev => ({
                    ...prev, 
                    amount: e.target.value
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
                <input
                  type="date"
                  value={newInvoice.date}
                  onChange={(e) => setNewInvoice(prev => ({
                    ...prev, 
                    date: e.target.value
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>
              <select
                value={newInvoice.status}
                onChange={(e) => setNewInvoice(prev => ({
                  ...prev, 
                  status: e.target.value
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create Invoice
              </button>
            </form>
          </div>
        </div>

        {/* Invoice List and Summary Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Financial Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="w-6 h-6 mr-3 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Total Revenue</h3>
              </div>
              <p className="text-3xl font-bold text-green-700">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Paid Invoices</h3>
              </div>
              <p className="text-3xl font-bold text-blue-700">{paidInvoicesCount}</p>
            </div>
          </div>

          {/* Invoice List */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 mr-3 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-800">Invoice List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-sm text-gray-700">{invoice.patientName}</td>
                      <td className="p-3 text-sm text-gray-700">{invoice.service}</td>
                      <td className="p-3 text-sm text-gray-700">${invoice.amount.toFixed(2)}</td>
                      <td className="p-3 text-sm text-gray-700">{invoice.date}</td>
                      <td className="p-3">
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${getStatusColor(invoice.status)}
                        `}>
                          {invoice.status}
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

export default BillingPayment;
