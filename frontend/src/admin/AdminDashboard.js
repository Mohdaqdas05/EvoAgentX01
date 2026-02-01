import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Menu,
  X,
  BarChart3,
  UtensilsCrossed,
  Calendar,
  ShoppingCart,
  Settings,
  MessageSquare,
} from 'lucide-react';

import MenuManager from './MenuManager';
import ReservationManager from './ReservationManager';
import OrderManager from './OrderManager';
import SettingsManager from './SettingsManager';
import ContactManager from './ContactManager';
import Dashboard from './Dashboard';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, component: Dashboard },
    { id: 'menu', label: 'Menu Items', icon: UtensilsCrossed, component: MenuManager },
    { id: 'reservations', label: 'Reservations', icon: Calendar, component: ReservationManager },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, component: OrderManager },
    { id: 'contact', label: 'Contact Messages', icon: MessageSquare, component: ContactManager },
    { id: 'settings', label: 'Settings', icon: Settings, component: SettingsManager },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || Dashboard;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 overflow-y-auto`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold">🥡 KGN Admin</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-800 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-red-600'
                    : 'hover:bg-gray-800'
                }`}
                title={tab.label}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-700 p-4">
          {sidebarOpen && (
            <div className="mb-4 text-sm">
              <p className="text-gray-400">Logged in as</p>
              <p className="font-semibold">{user?.name}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            {tabs.find((tab) => tab.id === activeTab)?.label}
          </h1>
        </div>

        {/* Content */}
        <div className="p-8">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
