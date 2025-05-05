import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Authentication from './pages/Authentication';
import PatientManagement from './pages/PatientManagement';
import DoctorManagement from './pages/DoctorManagement';
import AppointmentScheduling from './pages/AppointmentScheduling';
import BillingPayment from './pages/BillingPayment';
import ReportsManagement from './pages/ReportsManagement';
import AIchatbot from './components/AIchatbot';
import AuthLayout from './components/AuthLayout';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return isAuthenticated ? (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
        <AIchatbot />
      </main>
    </div>
  ) : (
    <Navigate to="/auth" replace />
  );
};

function App() {
  return (
    <Router>
      <Routes>
      <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
       {/* Protected Routes */}
       <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/patients" element={<ProtectedRoute><PatientManagement /></ProtectedRoute>} />
        <Route path="/doctors" element={<ProtectedRoute><DoctorManagement /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><AppointmentScheduling /></ProtectedRoute>} />
        <Route path="/billing" element={<ProtectedRoute><BillingPayment /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><ReportsManagement /></ProtectedRoute>} />

        {/* Redirect to Sign In if no route matches */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
