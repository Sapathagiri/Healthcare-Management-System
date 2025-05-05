import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../assets/image.png"; // Adjust the path as necessary
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarCheck,
  CreditCard,
  FileText,
  LogOut
} from 'lucide-react';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Patient Management', path: '/patients', icon: Users },
    { name: 'Doctor Management', path: '/doctors', icon: Stethoscope },
    { name: 'Appointments', path: '/appointments', icon: CalendarCheck },
    { name: 'Billing', path: '/billing', icon: CreditCard },
    { name: 'Reports', path: '/reports', icon: FileText }
  ];

  const isActive = (path) => location.pathname === path;
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    
    navigate('/auth');
  };

  return (
    <aside
      className={`
        bg-white
        shadow-lg
        h-screen
        transition-all
        duration-300
        ${isCollapsed ? 'w-20' : 'w-64'}
        flex
        flex-col
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b">
        {!isCollapsed && (
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-auto w-12 " />
            <p className="text-xl font-sans text-blue-600 transition-opacity">HealthCare Management System</p>
          </div>
        )}
          <button
            onClick={toggleSidebar}
            className={`
              p-4 rounded transition-all duration-300
              ${isCollapsed ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'}
            `}
            >
            {isCollapsed ? <span className="text-lg">☰</span> : <span className="text-lg">←</span>}
          </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto py-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex
              items-center
              px-4
              py-3
              mx-2
              rounded
              transition
              group
              ${isActive(item.path)
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'}
            `}
          >
            <item.icon
              className={`
                mr-3
                ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}
                ${isCollapsed ? 'mx-auto' : ''}
              `}
              size={24}
            />
            {!isCollapsed && (
              <span className="transition-opacity">{item.name}</span>
            )}
          </Link>
        ))}
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`
            flex
            items-center
            px-4
            py-3
            mx-2
            rounded
            hover:bg-red-100
            text-red-600
            transition
            group
            w-full
            text-left
          `}
        >
          <LogOut
            className={`
              mr-3
              text-red-500
              ${isCollapsed ? 'mx-auto' : ''}
            `}
            size={24}
          />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </nav>
      
      {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t text-center text-xs text-gray-500 flex flex-col items-center">
            <img src={Logo} alt="Logo" className="h-10 w-auto mb-2" /> 
            <span>HealthCare Management System</span>
          </div>
        )}
    </aside>
  );
}

export default Sidebar;