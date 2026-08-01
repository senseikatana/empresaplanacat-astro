import React from 'react';
import { Home, Search, MapPin, Ticket, User } from 'lucide-react';
import { ViewMode } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface MobileBottomBarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenAuth: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentView,
  onSelectView,
  onOpenAuth
}) => {
  const { t } = useLanguage();

  const TABS = [
    { id: 'overview' as ViewMode, label: 'Inicio', icon: <Home className="w-5 h-5" /> },
    { id: 'search' as ViewMode, label: 'Buscar', icon: <Search className="w-5 h-5" /> },
    { id: 'active-routes' as ViewMode, label: 'Rutas', icon: <MapPin className="w-5 h-5" /> },
    { id: 'settings' as ViewMode, label: 'Perfil', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d10]/95 backdrop-blur-lg border-t border-white/5 px-4 py-2 flex items-center justify-around shadow-2xl">
      {TABS.map((tab) => {
        const isActive = currentView === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectView(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive 
                ? 'text-indigo-400 font-bold scale-105' 
                : 'text-slate-400 hover:text-slate-200 font-medium'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${isActive ? 'bg-white/5 border border-white/10 text-indigo-400' : ''}`}>
              {tab.icon}
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
