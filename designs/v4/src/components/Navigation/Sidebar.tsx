import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  Ticket, 
  User, 
  Radio, 
  ShieldCheck, 
  X, 
  Bus, 
  MapPin, 
  Settings, 
  FileText, 
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DEMO_MAP_IMAGES } from '../../data/mockData';

export type TabView = 'home' | 'search' | 'trips' | 'live' | 'staff' | 'route-details';

interface SidebarProps {
  currentTab: TabView;
  onSelectTab: (tab: TabView) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenAuth: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onOpenAuth
}) => {
  const { user } = useAuth();

  const navItems = [
    { id: 'home' as TabView, label: 'Inicio', icon: Home, badge: null },
    { id: 'search' as TabView, label: 'Buscar Rutas', icon: Search, badge: null },
    { id: 'trips' as TabView, label: 'Mis Billetes', icon: Ticket, badge: '2' },
    { id: 'live' as TabView, label: 'En Tiempo Real', icon: Radio, badge: 'LIVE' },
  ];

  if (user?.isStaff) {
    navItems.push({
      id: 'staff' as TabView,
      label: 'Panel de Control Staff',
      icon: ShieldCheck,
      badge: 'Admin'
    });
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-sm shrink-0">
            <Bus className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight tracking-tight text-white">Empresa Plana</h2>
            <p className="text-[11px] text-slate-400 font-medium">Costa Daurada Transit</p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="p-2 text-slate-400 hover:text-white rounded-lg lg:hidden transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Nav Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
          Navegación
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-400 opacity-80'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : item.badge === 'LIVE'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* System Settings & Help */}
        <div className="pt-6 mt-6 border-t border-slate-800 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
            Servicios & Ajustes
          </div>
          
          <button
            onClick={() => {
              onSelectTab('live');
              onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Mapa de Paradas</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={onOpenAuth}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-slate-400" />
              <span>Perfil & Preferencias</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>

      {/* User Account Footer Card */}
      <div className="p-4 border-t border-slate-800 bg-slate-900 shrink-0 space-y-3">
        <button
          onClick={onOpenAuth}
          className="w-full p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 transition-colors text-left flex items-center gap-3 group"
        >
          <img
            src={user?.photoURL || DEMO_MAP_IMAGES.avatarMateo}
            alt="User avatar"
            className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-600"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-white truncate">
              {user?.displayName || 'Mateo Rodriguez'}
            </h4>
            <p className="text-[11px] text-slate-400 truncate">
              {user?.membershipTier || 'Gold Member'}
            </p>
          </div>
          <Settings className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
        </button>

        <div className="flex items-center justify-between text-xs font-mono bg-slate-800/60 px-3 py-1.5 rounded-md border border-slate-800">
          <span className="text-emerald-400 flex items-center gap-1.5 text-[11px]">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            Firebase Activo
          </span>
          <span className="text-slate-500 text-[10px]">v9.1</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 z-30 shadow-xl">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpenMobile && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-80 max-w-[85vw] h-full shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
