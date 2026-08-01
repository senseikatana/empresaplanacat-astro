import React, { useState } from 'react';
import { Bell, User, Shield, Menu, Globe, ChevronDown, Check, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DEMO_MAP_IMAGES } from '../../data/mockData';

interface TopHeaderProps {
  onOpenSidebar: () => void;
  onOpenAuth: () => void;
  currentRouteName?: string;
  onBack?: () => void;
  unreadNotificationsCount?: number;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenSidebar,
  onOpenAuth,
  currentRouteName,
  onBack,
  unreadNotificationsCount = 2
}) => {
  const { user } = useAuth();
  const [lang, setLang] = useState<'ES' | 'CA' | 'EN' | 'FR'>('ES');
  const [langOpen, setLangOpen] = useState(false);
  const [showNotifToast, setShowNotifToast] = useState(false);

  const languages: Array<'ES' | 'CA' | 'EN' | 'FR'> = ['ES', 'CA', 'EN', 'FR'];

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shadow-xs transition-colors">
      {/* Left section: Breadcrumb and logo/menu */}
      <div className="flex items-center gap-3">
        {onBack ? (
          <button
            onClick={onBack}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Volver"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
        ) : (
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden transition-colors"
            title="Abrir Menú"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
          <span className="hidden sm:inline">Empresa Plana</span>
          <span className="hidden sm:inline text-slate-300">/</span>
          {currentRouteName ? (
            <span className="text-indigo-600 font-semibold truncate max-w-[200px] sm:max-w-none">
              {currentRouteName}
            </span>
          ) : (
            <span className="text-indigo-600 font-semibold">Dashboard</span>
          )}
        </div>
      </div>

      {/* Right section: Language selector + Notifications + Auth/Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Quick Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Buscar rutas..."
            className="bg-slate-100 border-none rounded-full px-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Globe className="w-4 h-4 text-slate-400" />
            <span>{lang}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {langOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setLangOpen(false);
                  }}
                  className="w-full px-3 py-1.5 text-xs text-left font-medium text-slate-700 hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>{l === 'ES' ? 'Español' : l === 'CA' ? 'Català' : l === 'EN' ? 'English' : 'Français'}</span>
                  {lang === l && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Staff Indicator badge */}
        {user?.isStaff && (
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-amber-50 text-amber-700 rounded-md border border-amber-200">
            <Shield className="w-3 h-3" />
            Staff
          </span>
        )}

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifToast(!showNotifToast)}
            className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Notificaciones de tráfico"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {showNotifToast && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-50 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h4 className="text-xs font-bold text-slate-900">Alertas de Servicio</h4>
                <button onClick={() => setShowNotifToast(false)} className="text-[11px] text-indigo-600 font-medium hover:underline">
                  Cerrar
                </button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-amber-50 border border-amber-200/80 rounded-lg">
                  <p className="font-bold text-amber-900">Línea 45 - Retraso 12 min</p>
                  <p className="text-[11px] text-amber-800 mt-0.5">Obras de mantenimiento cerca de Port de Mar.</p>
                </div>
                <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-lg">
                  <p className="font-bold text-indigo-900">Refuerzo Costa Express</p>
                  <p className="text-[11px] text-indigo-800 mt-0.5">Añadidos autobuses extra para la ruta Tarragona - Barcelona.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile / Auth Action */}
        <button
          onClick={onOpenAuth}
          className="bg-indigo-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-indigo-700 shadow-xs transition-colors flex items-center gap-2"
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'Usuario'}
              className="w-5 h-5 rounded-full object-cover"
            />
          ) : (
            <User className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">{user ? user.displayName?.split(' ')[0] : 'Cuenta'}</span>
        </button>
      </div>
    </header>
  );
};
