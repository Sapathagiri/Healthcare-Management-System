import axios from 'axios';

const API_URL = 'http://localhost:5000/api/patients';

export const getPatients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPatient = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPatient = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updatePatient = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deletePatient = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
