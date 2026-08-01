import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Search, 
  Bus, 
  Users, 
  Bell, 
  Settings, 
  Ticket, 
  ChevronRight,
  LogOut,
  UserCheck
} from 'lucide-react';
import { ViewMode } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenAuth: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  onOpenAuth
}) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const NAV_ITEMS: { id: ViewMode; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'overview', labelKey: 'navOverview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'active-routes', labelKey: 'navActiveRoutes', icon: <MapPin className="w-5 h-5" /> },
    { id: 'search', labelKey: 'navSearch', icon: <Search className="w-5 h-5" /> },
    { id: 'fleet', labelKey: 'navFleet', icon: <Bus className="w-5 h-5" /> },
    { id: 'drivers', labelKey: 'navDrivers', icon: <Users className="w-5 h-5" /> },
    { id: 'alerts', labelKey: 'navAlerts', icon: <Bell className="w-5 h-5" /> },
    { id: 'settings', labelKey: 'navSettings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#0d0d10] border-r border-white/5 text-slate-300 min-h-screen p-5 select-none shrink-0">
      {/* Brand Header */}
      <div 
        onClick={() => onSelectView('overview')}
        className="flex items-center space-x-3 px-2 py-3 mb-8 cursor-pointer hover:opacity-90 transition"
      >
        <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Bus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-white text-lg tracking-tight leading-none">
            Empresa Plana
          </h1>
          <p className="text-[11px] text-indigo-400 font-semibold tracking-wider uppercase mt-1">
            Transport & Rutes
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${
                isActive
                  ? 'bg-white/5 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200 transition'}>
                  {item.icon}
                </span>
                <span>{t(item.labelKey)}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-indigo-400" />}
            </button>
          );
        })}
      </nav>

      {/* Firebase Auth & User Card */}
      <div className="pt-4 border-t border-white/5 mt-auto">
        {user ? (
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30">
                {user.email ? user.email.charAt(0).toUpperCase() : 'G'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {user.isAnonymous ? 'Usuario Invitado' : user.email}
                </p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Firebase Conectado
                </p>
              </div>
              <button 
                onClick={() => logout()}
                title="Cerrar sesión"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition active:scale-98"
          >
            <UserCheck className="w-4 h-4" />
            <span>Acceso Firebase</span>
          </button>
        )}
      </div>
    </aside>
  );
};
