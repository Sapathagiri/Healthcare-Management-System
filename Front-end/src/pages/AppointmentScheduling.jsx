import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { 
  Calendar, 
  Clock, 
  User, 
  Plus, 
  MoreVertical, 
  Check, 
  X, 
  Filter, 
  Search, 
  Edit,
  Trash2
} from 'lucide-react';

function AppointmentScheduling() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [appointments, setAppointments] = useState([
    // {
    //   id: 1,
    //   patient: 'John Doe',
    //   doctor: 'Dr. Emily Smith',
    //   date: '2025-03-26',
    //   time: '10:00 AM',
    //   status: 'Scheduled',
    //   department: 'Cardiology'
    // },
    // {
    //   id: 2,
    //   patient: 'Jane Wilson',
    //   doctor: 'Dr. Michael Johnson',
    //   date: '2025-03-27',
    //   time: '02:30 PM',
    //   status: 'Completed',
    //   department: 'Neurology'
    // }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    doctor: '',
    date: '',
    time: '',
    department: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchAppointment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(data); 
      console.log(data, "data checking");
    } catch (error) {
      message.error("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchAppointment();
    }, []);
    
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/appointments/${id}`);
        setAppointments((prev) => prev.filter((patient) => patient._id !== id)); 
        message.success("Patient deleted successfully");
      } catch (error) {
        message.error("Failed to delete patient");
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        if (editingAppointment) {
          // Update existing patient
          await axios.put(`http://localhost:5000/api/appointments/${editingAppointment._id}`, newAppointment);
          console.log("Patient updated:", newAppointment);
        } else {
          // Add new patient
          await axios.post("http://localhost:5000/api/appointments", newAppointment);
          console.log("Patient added:", newAppointment);
        }
    
        // Close modal and reset state
        setIsModalOpen(false);
        setEditingAppointment(null);
        setNewAppointment({
          patient: '',
    doctor: '',
    date: '',
    time: '',
    department: ''
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    const handleEditClick = (patient) => {
      setEditingAppointment(patient);
      setNewAppointment(patient); // Prefill form with patient data
      setIsModalOpen(true);
    };

  // const handleAddAppointment = (e) => {
  //   e.preventDefault();
  //   const appointment = {
  //     id: appointments.length + 1,
  //     ...newAppointment,
  //     status: 'Scheduled'
  //   };
  //   setAppointments([...appointments, appointment]);
  //   setNewAppointment({ 
  //     patient: '', 
  //     doctor: '', 
  //     date: '', 
  //     time: '', 
  //     department: '' 
  //   });
  //   setIsModalOpen(false);
  // };

  // const filteredAppointments = appointments.filter(appt => 
  //   (statusFilter === 'All' || appt.status === statusFilter) &&
  //   (appt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //    appt.doctor.toLowerCase().includes(searchTerm.toLowerCase()))
  // );

  const departments = [
    'Cardiology', 
    'Neurology', 
    'Pediatrics', 
    'Orthopedics', 
    'Oncology'
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Calendar className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">
              Appointment Scheduling
            </h1>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="
              flex items-center 
              bg-blue-600 
              text-white 
              px-4 py-2 
              rounded-lg 
              hover:bg-blue-700 
              transition
            "
          >
            <Plus className="mr-2" /> Book Appointment
          </button>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  pl-10 
                  pr-4 
                  py-2 
                  border 
                  rounded-lg 
                  w-64 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500
                "
              />
              <Search 
                className="absolute left-3 top-3 text-gray-400" 
                size={20} 
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
                px-4 
                py-2 
                border 
                rounded-lg 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500
              "
            >
              <option value="All">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                {['Patient', 'Doctor', 'Department', 'Date & Time', 'Status', 'Actions'].map((header) => (
                  <th 
                    key={header} 
                    className="
                      px-4 
                      py-3 
                      text-left 
                      text-xs 
                      font-medium 
                      text-gray-500 
                      uppercase 
                      tracking-wider
                    "
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr 
                  key={appt.id} 
                  className="
                    hover:bg-gray-50 
                    transition 
                    border-b 
                    last:border-b-0
                  "
                >
                  <td className="px-4 py-4 flex items-center space-x-3">
                    <User className="text-gray-400" size={20} />
                    <span>{appt.patient}</span>
                  </td>
                  <td className="px-4 py-4">{appt.doctor}</td>
                  <td className="px-4 py-4">{appt.department}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-gray-400" size={16} />
                      <span>{appt.date}</span>
                      <Clock className="text-gray-400" size={16} />
                      <span>{appt.time}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span 
                      className={`
                        px-3 
                        py-1 
                        rounded-full 
                        text-xs 
                        font-semibold 
                        ${appt.status === 'Scheduled' 
                          ? 'bg-blue-100 text-blue-800' 
                          : appt.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'}
                      `}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative">
                    <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition">
          <Edit size={20} onClick={() => handleEditClick(appt)}/>
        </button>
        <button onClick={() => handleDelete(appt._id)} className="text-red-600 hover:bg-red-100 p-2 rounded-full transition">
          <Trash2 size={20} />
        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Appointment Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {editingAppointment ? "Book New Appointment" : "Edit Appointment" }
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Patient Name"
                  value={newAppointment.patient}
                  onChange={(e) => setNewAppointment(prev => ({
                    ...prev, 
                    patient: e.target.value
                  }))}
                  className="
                    w-full 
                    p-3 
                    border 
                    rounded-lg 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-blue-500
                  "
                  required
                />
                <input
                  type="text"
                  placeholder="Doctor Name"
                  value={newAppointment.doctor}
                  onChange={(e) => setNewAppointment(prev => ({
                    ...prev, 
                    doctor: e.target.value
                  }))}
                  className="
                    w-full 
                    p-3 
                    border 
                    rounded-lg 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-blue-500
                  "
                  required
                />
                <select
                  value={newAppointment.department}
                  onChange={(e) => setNewAppointment(prev => ({
                    ...prev, 
                    department: e.target.value
                  }))}
                  className="
                    w-full 
                    p-3 
                    border 
                    rounded-lg 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-blue-500
                  "
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment(prev => ({
                      ...prev, 
                      date: e.target.value
                    }))}
                    className="
                      w-full 
                      p-3 
                      border 
                      rounded-lg 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-blue-500
                    "
                    required
                  />
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment(prev => ({
                      ...prev, 
                      time: e.target.value
                    }))}
                    className="
                      w-full 
                      p-3 
                      border 
                      rounded-lg 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-blue-500
                    "
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="
                      w-full 
                      bg-blue-600 
                      text-white 
                      p-3 
                      rounded-lg 
                      hover:bg-blue-700 
                      transition
                    "
                  >
                    Schedule Appointment
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="
                      w-full 
                      bg-gray-200 
                      text-gray-700 
                      p-3 
                      rounded-lg 
                      hover:bg-gray-300 
                      transition
                    "
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentScheduling;
