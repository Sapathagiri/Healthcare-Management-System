const appointmentService = require('../services/Appointement.services');

exports.getAppointments = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== 'All' ? { status } : {};
    const appointments = await appointmentService.getAppointments(filter);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await appointmentService.updateAppointment(req.params.id, req.body);
    if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await appointmentService.deleteAppointment(req.params.id);
    if (!deletedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
