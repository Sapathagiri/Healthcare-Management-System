const DoctorService = require('../services/Doctor.services');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorService.getAllDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doctors', error });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await DoctorService.getDoctorById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error });
  }
};

exports.addDoctor = async (req, res) => {
  try {
    const doctor = await DoctorService.addDoctor(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add doctor', error });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await DoctorService.updateDoctor(req.params.id, req.body);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update doctor', error });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await DoctorService.deleteDoctor(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete doctor', error });
  }
};
