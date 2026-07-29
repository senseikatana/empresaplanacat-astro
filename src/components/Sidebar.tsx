import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Bus,
  Search,
  Clock,
  CreditCard,
  UserCheck,
  LayoutDashboard,
  ShieldCheck,
  LogIn,
  LogOut,
  MapPin,
  ChevronRight,
  Sparkles,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ViewMode, UserRole } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentView,
  onNavigate,
}) => {
  const { user, logout, quickDemoLogin } = useAuth();
  const { t } = useLanguage();

  const handleSelectView = (view: ViewMode) => {
    onNavigate(view);
    onClose();
  };

  const navItems = [
    {
      id: 'home' as ViewMode,
      label: 'Buscador de Rutas',
      icon: Search,
      category: 'Pasajero',
      description: 'Consulta horaris i informació de la xarxa'
    },
    {
      id: 'search-results' as ViewMode,
      label: 'Resultados de Búsqueda',
      icon: Bus,
      category: 'Pasajero',
      description: 'Línies 45, 23, 22, 88 Girona - Aeroport'
    },
    {
      id: 'route-details' as ViewMode,
      label: 'Detalles de Ruta',
      icon: Clock,
      category: 'Pasajero',
      description: 'Cambrils a Tarragona (Parades y Horaris)'
    },
    {
      id: 'checkout' as ViewMode,
      label: 'Pantalla de Checkout',
      icon: CreditCard,
      category: 'Pasajero',
      description: 'Métodos de pago (Bizum, PayPal, Tarjeta)'
    },
    {
      id: 'driver-profile' as ViewMode,
      label: 'Perfil del Conductor',
      icon: UserCheck,
      category: 'Pasajero',
      description: 'Carlos Gomez - Dar las gracias'
    },
    {
      id: 'driver-dashboard' as ViewMode,
      label: 'Portal Conductor (Marc)',
      icon: LayoutDashboard,
      category: 'Empleado',
      description: 'Próximo turno, incidencias, pasaje'
    },
    {
      id: 'fleet-manager' as ViewMode,
      label: 'Gestor de Flota / Admin',
      icon: ShieldCheck,
      category: 'Gestión',
      description: 'Mapa interactivo en tiempo real y alertas'
    },
    {
      id: 'user-auth' as ViewMode,
      label: 'Login Pasajero',
      icon: LogIn,
      category: 'Autenticación',
      description: 'Acceso Firebase Google/Email'
    },
    {
      id: 'employee-auth' as ViewMode,
      label: 'Acceso Empleados',
      icon: Users,
      category: 'Autenticación',
      description: 'Selección de Rol (Driver, Staff, Manager)'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          {/* Drawer container */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-slate-900 border-r border-slate-800 text-slate-100 z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-extrabold text-base text-white tracking-tight">Empresa Plana</h2>
                  <p className="text-xs text-blue-400 font-semibold">Navegación & Vistas</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Auth user banner */}
            <div className="p-4 bg-slate-800/80 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={
                      user?.photoURL ||
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
                    }
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border border-blue-500/40"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.displayName || 'Usuario Demo'}
                  </p>
                  <p className="text-xs text-blue-400 capitalize flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    Rol: {user?.role || 'pasajero'}
                  </p>
                </div>
              </div>

              {/* Quick Role Switcher pills */}
              <div className="mt-3 pt-2.5 border-t border-slate-700/60">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1 font-bold">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Cambiar vista rápida:
                </p>
                <div className="grid grid-cols-4 gap-1 text-[11px]">
                  {(['passenger', 'driver', 'staff', 'manager'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        quickDemoLogin(role);
                        if (role === 'driver') onNavigate('driver-dashboard');
                        if (role === 'manager') onNavigate('fleet-manager');
                        if (role === 'passenger') onNavigate('home');
                      }}
                      className={`px-1.5 py-1 rounded-lg text-center capitalize transition border font-medium ${
                        user?.role === role
                          ? 'bg-blue-600 border-blue-500 text-white font-semibold shadow-sm'
                          : 'bg-slate-800 border-slate-700/80 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {role === 'passenger' ? 'Pasajero' : role === 'driver' ? 'Chofer' : role === 'staff' ? 'Staff' : 'Manager'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* View navigation list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-2 pb-1">
                Pantallas disponibles
              </p>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectView(item.id)}
                    className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between group ${
                      isActive
                        ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                        : 'hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`p-2 rounded-xl transition ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:bg-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold truncate text-slate-100">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-500 group-hover:text-slate-300 transition ${
                        isActive ? 'text-blue-400' : ''
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">v2.4 Empresa Plana</span>
              <button
                onClick={() => {
                  logout();
                  onNavigate('user-auth');
                  onClose();
                }}
                className="flex items-center space-x-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold px-2.5 py-1 rounded-lg hover:bg-rose-950/40 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Salir</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
