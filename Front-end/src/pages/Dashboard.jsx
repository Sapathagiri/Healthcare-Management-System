import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, ShieldPlus, CalendarCheck } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    activeDoctors: 0,
    appointmentsToday: 0,
    departmentStats: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard");
        setStats(response.data || { totalPatients: 0, activeDoctors: 0, appointmentsToday: 0, departmentStats: [] });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    {
      icon: Users,
      title: "Total Patients",
      value: stats.totalPatients,
      color: "text-blue-600",
      background: "bg-blue-100",
    },
    {
      icon: ShieldPlus,
      title: "Active Doctors",
      value: stats.activeDoctors,
      color: "text-green-600",
      background: "bg-green-100",
    },
    {
      icon: CalendarCheck,
      title: "Appointments Today",
      value: stats.appointmentsToday,
      color: "text-purple-600",
      background: "bg-purple-100",
    },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff6b6b', '#00C49F'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Hospital Management Dashboard
        </h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {statItems.map((stat) => (
            <div
              key={stat.title}
              className={`${stat.background} border rounded-xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col items-center`}
            >
              <stat.icon className={`h-10 w-10 ${stat.color} mb-2`} />
              <h2 className="text-md font-medium text-gray-700 mb-2">{stat.title}</h2>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white shadow-md p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Appointments by Department</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.departmentStats || []}>
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="appointments" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow-md p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Patient Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={stats.departmentStats || []} dataKey="patients" nameKey="department" outerRadius={100} label>
                  {Array.isArray(stats.departmentStats) && stats.departmentStats.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;