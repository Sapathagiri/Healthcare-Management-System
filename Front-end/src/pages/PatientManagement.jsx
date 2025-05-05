
import React, { useState, useEffect } from "react";
import { Users, Plus, Edit, Trash2, Search } from "lucide-react";
import axios from "axios";
import { message } from "antd";

function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    contact: "",
    lastVisit: "",
    status: "Active",
  });
  
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/patients");
      setPatients(data); 
      console.log(data, "data checking");
    } catch (error) {
      message.error("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPatients();
  }, []);
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      setPatients((prev) => prev.filter((patient) => patient._id !== id)); 
      message.success("Patient deleted successfully");
    } catch (error) {
      message.error("Failed to delete patient");
    }
  };
  

  // const filteredPatients = patients?.filter(patient => patient?.name.includes(searchQuery)) || [];


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(newPatient);
  

  try {
    if (editingPatient) {
      // Update existing patient
      await axios.put(`http://localhost:5000/api/patients/${editingPatient._id}`, newPatient);
      console.log("Patient updated:", newPatient);
    } else {
      // Add new patient
      await axios.post("http://localhost:5000/api/patients", newPatient);
      console.log("Patient added:", newPatient);
    }
fetchPatients();
    // Close modal and reset state
    setIsModalOpen(false);
    setEditingPatient(null);
    setNewPatient({
      name: "",
      age: "",
      gender: "",
      contact: "",
      lastVisit: "",
      status: "Active",
    });
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


const handleEditClick = (patient) => {
  setEditingPatient(patient);
  // Create a copy of the patient object with formatted date
  const formattedPatient = {
    ...patient,
    lastVisit: formatDateForInput(patient.lastVisit)
  };
  setNewPatient(formattedPatient); // Prefill form with patient data
  setIsModalOpen(true);
};

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  
  try {
    // Try to parse the date string
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return "";
    
    // Format the date as YYYY-MM-DD
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};
  

const filteredPatients = patients.filter((patient) => {
  const matchesSearch = 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contact.includes(searchQuery) ||
    (patient.patientId && patient.patientId.toLowerCase().includes(searchQuery.toLowerCase()));
  
  // Apply status filter if not "All"
  const matchesStatus = filterStatus === "All" || patient.status === filterStatus;
  
  return matchesSearch && matchesStatus;
});

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Users className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
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
            <Plus className="mr-2" /> Add Patient
          </button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
            <input
    type="text"
    placeholder="Search patients..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
            <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  >
    <option value="All">All Status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
    <option value="Pending">Pending</option>
  </select>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                {["Name", "PatientID","Age", "Gender", "Contact", "Last Visit", "Status", "Actions"].map((header) => (
                  <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
  {filteredPatients?.map((patient) => (
    <tr key={patient._id} className="hover:bg-gray-50 transition border-b last:border-b-0">
      <td className="px-4 py-4">{patient.name}</td>
      <td className="px-4 py-4">{patient.patientId}</td>
      <td className="px-4 py-4">{patient.age}</td>
      <td className="px-4 py-4">{patient.gender}</td>
      <td className="px-4 py-4">{patient.contact}</td>
      <td className="px-4 py-4">{patient.lastVisit}</td>
      <td className="px-4 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {patient.status}
        </span>
      </td>
      <td className="px-4 py-4 flex space-x-2">
        <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition">
          <Edit size={20} onClick={() => handleEditClick(patient)}/>
        </button>
        <button onClick={() => handleDelete(patient._id)} className="text-red-600 hover:bg-red-100 p-2 rounded-full transition">
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
         {/* Add Patient Modal */}
         {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-96 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {editingPatient ? "Edit Patient" : "Add New Patient"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newPatient.name}
              onChange={(e) => setNewPatient((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Age"
                value={newPatient.age}
                onChange={(e) => setNewPatient((prev) => ({ ...prev, age: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={newPatient.gender}
                onChange={(e) => setNewPatient((prev) => ({ ...prev, gender: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <input
              type="tel"
              placeholder="Contact Number"
              value={newPatient.contact}
              onChange={(e) => setNewPatient((prev) => ({ ...prev, contact: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={newPatient.lastVisit}
                onChange={(e) => setNewPatient((prev) => ({ ...prev, lastVisit: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={newPatient.status}
                onChange={(e) => setNewPatient((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                {editId ? "Update Patient" : "Add Patient"}
              </button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-full bg-gray-200 text-gray-700 p-3 rounded-lg hover:bg-gray-300 transition">
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

export default PatientManagement;
