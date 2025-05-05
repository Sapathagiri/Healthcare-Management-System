const Patient = require('../modals/patient.model');

const generatePatientId = async () => {
  const count = await Patient.countDocuments();
  return `PAT${String(count + 1).padStart(3, "0")}`; // e.g. PAT001
};

exports.createPatient = async (data) => {
  const patientId = await generatePatientId();
  const newPatient = new Patient({ ...data, patientId });
  return await newPatient.save();
};

exports.getPatients = async () => {
  return await Patient.find();
};

exports.getPatientById = async (id) => {
  return await Patient.findById(id);
};

exports.updatePatient = async (id, data) => {
  return await Patient.findByIdAndUpdate(id, data, { new: true });
};

exports.deletePatient = async (id) => {
  return await Patient.findByIdAndDelete(id);
};
