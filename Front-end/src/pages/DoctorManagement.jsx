import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { 
  UserPlus, 
  User, 
  Stethoscope, 
  Phone, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  ClockIcon 
} from 'lucide-react';

function DoctorManagement() {
  const [doctors, setDoctors] = useState([
    // {
    //   id: 1,
    //   name: 'Dr. Emily Chen',
    //   specialty: 'Cardiology',
    //   contact: '(555) 234-5678',
    //   availability: 'Mon, Wed, Fri',
    //   status: 'Active'
    // },
    // {
    //   id: 2,
    //   name: 'Dr. Michael Rodriguez',
    //   specialty: 'Pediatrics',
    //   contact: '(555) 876-5432',
    //   availability: 'Tue, Thu, Sat',
    //   status: 'Active'
    // }
  ]);

  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    contact: '',
    availability: '',
    status: 'Active'
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors").then((response) => setDoctors(response.data));
  }, []);
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/doctors", newDoctor);
      setDoctors([...doctors, response.data]);
      setNewDoctor({ name: "", specialty: "", contact: "", availability: "", status: "Active" });
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };
  

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Active': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'On Leave': return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      case 'Inactive': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-500/10 text-green-700';
      case 'On Leave': return 'bg-yellow-500/10 text-yellow-700';
      case 'Inactive': return 'bg-red-500/10 text-red-700';
      default: return 'bg-gray-500/10 text-gray-700';
    }
  };

  const specialties = [
    'Cardiology', 'Pediatrics', 'Neurology', 'Oncology', 
    'Dermatology', 'Orthopedics', 'Psychiatry', 'Radiology'
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-8">
        <Stethoscope className="w-10 h-10 mr-4 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Add Doctor Column */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <UserPlus className="w-6 h-6 mr-3 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Add New Doctor</h2>
            </div>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor(prev => ({
                    ...prev, 
                    name: e.target.value
                  }))}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={newDoctor.specialty}
                  onChange={(e) => setNewDoctor(prev => ({
                    ...prev, 
                    specialty: e.target.value
                  }))}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                >
                  <option value="">Select Specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Contact Number"
                  value={newDoctor.contact}
                  onChange={(e) => setNewDoctor(prev => ({
                    ...prev, 
                    contact: e.target.value
                  }))}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Availability (e.g., Mon, Wed, Fri)"
                  value={newDoctor.availability}
                  onChange={(e) => setNewDoctor(prev => ({
                    ...prev, 
                    availability: e.target.value
                  }))}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>
              <select
                value={newDoctor.status}
                onChange={(e) => setNewDoctor(prev => ({
                  ...prev, 
                  status: e.target.value
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Add Doctor
              </button>
            </form>
          </div>
        </div>

        {/* Doctor List and Summary Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Doctor Summary */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center">
              <User className="w-10 h-10 mr-4 text-blue-600" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Doctors</h3>
                <p className="text-3xl font-bold text-blue-700">{doctors.length}</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center">
              <CheckCircle className="w-10 h-10 mr-4 text-green-600" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Active</h3>
                <p className="text-3xl font-bold text-green-700">
                  {doctors.filter(doc => doc.status === 'Active').length}
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center">
              <ClockIcon className="w-10 h-10 mr-4 text-yellow-600" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">On Leave</h3>
                <p className="text-3xl font-bold text-yellow-700">
                  {doctors.filter(doc => doc.status === 'On Leave').length}
                </p>
              </div>
            </div>
          </div>

          {/* Doctor List */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Stethoscope className="w-6 h-6 mr-3 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-800">Doctor List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    {['Name', 'Specialty', 'Contact', 'Availability', 'Status'].map((header) => (
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
                  {doctors.map((doctor) => (
                    <tr 
                      key={doctor.id} 
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 text-sm text-gray-700 flex items-center">
                        <div className="mr-3">{getStatusIcon(doctor.status)}</div>
                        {doctor.name}
                      </td>
                      <td className="p-3 text-sm text-gray-700">{doctor.specialty}</td>
                      <td className="p-3 text-sm text-gray-700">{doctor.contact}</td>
                      <td className="p-3 text-sm text-gray-700">{doctor.availability}</td>
                      <td className="p-3">
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${getStatusColor(doctor.status)}
                        `}>
                          {doctor.status}
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

export default DoctorManagement;
