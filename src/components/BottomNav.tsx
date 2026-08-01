import React from 'react';
import { Home, Calendar, Mail, User, MapPin, ShieldCheck, CreditCard } from 'lucide-react';
import { ViewMode } from '../types';
import { useAuth } from '../context/AuthContext';

interface BottomNavProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const { user } = useAuth();
  const isDriverOrManager = user?.role === 'driver' || user?.role === 'manager';

  const tabs = [
    {
      id: 'home' as ViewMode,
      label: 'Inicio',
      icon: Home
    },
    {
      id: 'search-results' as ViewMode,
      label: 'Horarios',
      icon: Calendar
    },
    {
      id: 'route-details' as ViewMode,
      label: 'Rutas',
      icon: MapPin
    },
    {
      id: isDriverOrManager ? 'driver-dashboard' : 'driver-profile' as ViewMode,
      label: 'Perfil',
      icon: User
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-2.5 px-4 z-30 flex items-center justify-around text-xs text-slate-400 shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentView === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-xl transition ${
              isActive ? 'text-blue-400 font-bold bg-blue-500/10' : 'hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
            <span className="text-[11px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
