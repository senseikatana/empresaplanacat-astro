import React, { useState } from 'react';
import { 
  Globe, 
  Bell, 
  User, 
  Bus, 
  ChevronDown, 
  Menu,
  Check
} from 'lucide-react';
import { Language, ViewMode } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  currentView: ViewMode;
  onOpenAuth: () => void;
  unreadAlertsCount?: number;
  onSelectView: (view: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onOpenAuth,
  unreadAlertsCount = 3,
  onSelectView
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const LANGUAGES: Language[] = ['ES', 'CA', 'EN', 'FR'];

  const getViewTitle = () => {
    switch (currentView) {
      case 'overview': return 'Empresa Plana - OpenStreetMap';
      case 'active-routes': return 'Seguimiento en Vivo y Rutas';
      case 'search': return 'Buscador de Líneas';
      case 'route-details': return 'Detalles de Horarios y Paradas';
      case 'fleet': return 'Flota de Autobuses';
      case 'drivers': return 'Equipo de Conductores';
      case 'alerts': return 'Avisos e Incidencias';
      case 'settings': return 'Perfil de Usuario';
      default: return 'Empresa Plana';
    }
  };

  return (
    <header className="bg-[#09090b]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-4 md:px-8 py-4 flex items-center justify-between">
      {/* View Title / Mobile Brand */}
      <div className="flex items-center space-x-3">
        <div className="md:hidden flex items-center space-x-2" onClick={() => onSelectView('overview')}>
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white">
            <Bus className="w-5 h-5" />
          </div>
          <span className="font-bold text-white text-base">Plana</span>
        </div>
        <h2 className="hidden md:block font-bold text-xl text-white tracking-tight">
          {getViewTitle()}
        </h2>
      </div>

      {/* Header Actions: Language Switcher, Alerts, Profile */}
      <div className="flex items-center space-x-3">
        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center space-x-1.5 bg-white/5 hover:bg-white/10 text-slate-200 px-3.5 py-2 rounded-xl border border-white/10 text-xs font-semibold transition"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>{language}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-[#111114] border border-white/10 rounded-xl shadow-2xl py-1 z-50">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-white/5 ${
                    language === lang ? 'text-indigo-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  <span>
                    {lang === 'ES' && 'Español'}
                    {lang === 'CA' && 'Català'}
                    {lang === 'EN' && 'English'}
                    {lang === 'FR' && 'Français'}
                  </span>
                  {language === lang && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Alerts Bell */}
        <button
          onClick={() => onSelectView('alerts')}
          className="relative p-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl border border-white/10 transition"
          title="Avisos"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#09090b]"></span>
          )}
        </button>

        {/* Profile Avatar Button */}
        <button
          onClick={() => {
            if (user) {
              onSelectView('settings');
            } else {
              onOpenAuth();
            }
          }}
          className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white p-1.5 md:px-3 md:py-2 rounded-xl transition"
        >
          <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center font-bold text-xs">
            {user?.email ? user.email.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <span className="hidden md:inline text-xs font-semibold text-slate-200">
            {user ? (user.isAnonymous ? 'Invitado' : user.email?.split('@')[0]) : 'Acceder'}
          </span>
        </button>
      </div>
    </header>
  );
};
