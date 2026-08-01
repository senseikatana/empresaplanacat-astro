import React, { useState } from 'react';
import { Bus, ArrowLeft, Menu, User, ChevronDown, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ViewMode, Language } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenSidebar: () => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showShare?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSidebar,
  title,
  showBack,
  onBack,
  showShare
}) => {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages: Language[] = ['ES', 'CA', 'EN', 'FR'];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between text-slate-100 shadow-sm">
      <div className="flex items-center space-x-3">
        {showBack ? (
          <button
            onClick={onBack || (() => onNavigate('home'))}
            className="p-1.5 rounded-xl hover:bg-slate-800 transition text-blue-400 flex items-center gap-1 font-medium"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm hidden sm:inline font-semibold">Atrás</span>
          </button>
        ) : (
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Bus className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight leading-tight text-white group-hover:text-blue-300 transition">
              Empresa Plana
            </span>
            {title ? (
              <span className="text-xs text-blue-400 font-semibold leading-none mt-0.5">
                {title}
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-none mt-0.5">
                Costa Daurada
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {showShare && (
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'Empresa Plana', url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Enlace copiado al portapapeles');
              }
            }}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            title="Compartir"
          >
            <Share2 className="w-5 h-5" />
          </button>
        )}

        {/* Language Selector Selector ES | CA | EN | FR */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition"
          >
            <span className="text-blue-400 font-bold">{language}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 text-[11px]">ES/CA/EN/FR</span>
            <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-slate-400" />
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-1.5 z-50 text-xs">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-slate-800 transition ${
                    language === lang ? 'text-blue-400 font-bold bg-blue-500/10' : 'text-slate-300'
                  }`}
                >
                  <span>
                    {lang === 'ES' && 'Español'}
                    {lang === 'CA' && 'Català'}
                    {lang === 'EN' && 'English'}
                    {lang === 'FR' && 'Français'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{lang}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Account / Login Button */}
        <button
          onClick={() => onNavigate(user ? (user.role === 'driver' ? 'driver-dashboard' : 'driver-profile') : 'user-auth')}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-blue-400 transition shadow-sm"
          title={user ? user.displayName || 'Mi Cuenta' : 'Iniciar Sesión'}
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              className="w-full h-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <User className="w-4.5 h-4.5 text-slate-300" />
          )}
        </button>
      </div>
    </header>
  );
};
