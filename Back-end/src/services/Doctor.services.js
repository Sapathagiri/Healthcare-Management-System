const Doctor = require('../modals/Doctor.model');

class DoctorService {
  static async getAllDoctors() {
    return await Doctor.find();
  }

  static async getDoctorById(id) {
    return await Doctor.findById(id);
  }

  static async addDoctor(data) {
    const doctor = new Doctor(data);
    return await doctor.save();
  }

  static async updateDoctor(id, data) {
    return await Doctor.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteDoctor(id) {
    return await Doctor.findByIdAndDelete(id);
  }
}

module.exports = DoctorService;
