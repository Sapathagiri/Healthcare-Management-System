const Appointment = require('../modals/Appointment.model');

const getAppointments = async (filter = {}) => {
  return await Appointment.find(filter);
};

const createAppointment = async (appointmentData) => {
  return await Appointment.create(appointmentData);
};

const updateAppointment = async (id, updateData) => {
  return await Appointment.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAppointment = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
