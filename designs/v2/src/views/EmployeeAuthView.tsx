import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, Bus, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ViewMode, UserRole } from '../types';

interface EmployeeAuthViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const EmployeeAuthView: React.FC<EmployeeAuthViewProps> = ({ onNavigate }) => {
  const { quickDemoLogin } = useAuth();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('driver');

  const handleLoginRole = (role: UserRole) => {
    quickDemoLogin(role);
    if (role === 'driver') onNavigate('driver-dashboard');
    else if (role === 'manager') onNavigate('fleet-manager');
    else onNavigate('driver-dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="p-4 sm:p-6 max-w-md mx-auto space-y-5 text-slate-100"
    >
      <div className="text-center space-y-2 pt-2">
        <h2 className="font-extrabold text-xl text-white tracking-tight">Employee Login</h2>
      </div>

      {/* Main Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-sm">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
            <User className="w-6 h-6" />
          </div>
          <span className="text-xs text-slate-400 font-semibold">Company Logo</span>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            onClick={() => handleLoginRole(selectedRole)}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-600/20"
          >
            Login
          </button>
        </div>
      </div>

      {/* Role Selection Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
        <h3 className="font-extrabold text-base text-white text-center">Select Role</h3>

        <div className="space-y-2.5">
          <button
            onClick={() => handleLoginRole('driver')}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-600/20"
          >
            Driver
          </button>

          <button
            onClick={() => handleLoginRole('staff')}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-600/20"
          >
            Station Staff
          </button>

          <button
            onClick={() => handleLoginRole('manager')}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-600/20"
          >
            Manager
          </button>
        </div>
      </div>
    </motion.div>
  );
};
