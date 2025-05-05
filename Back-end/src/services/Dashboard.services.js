const Patient = require("../modals/patient.model");
const Doctor = require("../modals/Doctor.model");
const Appointment = require("../modals/Appointment.model");

const getDashboardStats = async () => {
  try {
    const totalPatients = await Patient.countDocuments();
    const activeDoctors = await Doctor.countDocuments({ status: "Active" });
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const appointmentsToday = await Appointment.countDocuments({ date: today });

    return { totalPatients, activeDoctors, appointmentsToday };
  } catch (error) {
    throw new Error("Error fetching dashboard stats");
  }
};

module.exports = { getDashboardStats };
