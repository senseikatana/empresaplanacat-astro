import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Info, 
  Ticket, 
  AlertTriangle, 
  Map as MapIcon, 
  ChevronRight,
  Sparkles,
  Star,
  CheckCircle,
  Bus
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  INITIAL_FREQUENT_ROUTES, 
  UPCOMING_DEPARTURES, 
  NETWORK_ALERTS, 
  CITY_LOCATIONS,
  SAMPLE_BUS_LINES
} from '../../data/transportData';
import { BusLine, ViewMode } from '../../types';

interface OverviewViewProps {
  onSelectLine: (line: BusLine) => void;
  onNavigateToView: (view: ViewMode) => void;
  onOpenTicketModal: (line: BusLine) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectLine,
  onNavigateToView,
  onOpenTicketModal
}) => {
  const { t } = useLanguage();
  const [origin, setOrigin] = useState('Aeroport de Barcelona - El Prat (T1 / T2)');
  const [destination, setDestination] = useState('Salou (Passeig Jaume I)');
  const [date, setDate] = useState('2026-07-29');
  const [time, setTime] = useState('Cualquier hora');
  const [searchType, setSearchType] = useState('Rutas directas');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateToView('search');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-20 md:pb-8">
      {/* Top Banner Notice */}
      <div className="bg-[#111114] border border-white/5 text-slate-200 font-medium px-5 py-3.5 rounded-2xl shadow-lg flex items-center justify-between text-xs md:text-sm">
        <div className="flex items-center space-x-3">
          <Info className="w-5 h-5 text-indigo-400 shrink-0" />
          <span>No online booking mandatory — Purchase tickets at ticket offices, on-board or buy digital ticket right here!</span>
        </div>
        <button
          onClick={() => onNavigateToView('search')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ml-2 shadow-md shadow-indigo-600/20"
        >
          {t('searchButton')}
        </button>
      </div>

      {/* Main Search Box - BUSCADOR DE LÍNEAS */}
      <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
          <h3 className="text-base md:text-lg font-bold text-white tracking-wider uppercase">
            {t('searchHeader')}
          </h3>
        </div>

        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Origin Dropdown */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 focus-within:border-indigo-500/50 transition">
              <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                {t('originLabel')}
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
              >
                {CITY_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} className="bg-[#111114] text-slate-200">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Dropdown */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 focus-within:border-indigo-500/50 transition">
              <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                {t('destinationLabel')}
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
              >
                {CITY_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} className="bg-[#111114] text-slate-200">
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Picker */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 focus-within:border-indigo-500/50 transition">
              <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                {t('dateLabel')}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
              />
            </div>

            {/* Time Picker */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 focus-within:border-indigo-500/50 transition">
              <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                {t('timeLabel')}
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="Cualquier hora" className="bg-[#111114]">{t('anytimeOption')}</option>
                <option value="Mañana (06:00 - 12:00)" className="bg-[#111114]">Mañana (06:00 - 12:00)</option>
                <option value="Tarde (12:00 - 18:00)" className="bg-[#111114]">Tarde (12:00 - 18:00)</option>
                <option value="Noche (18:00 - 24:00)" className="bg-[#111114]">Noche (18:00 - 24:00)</option>
              </select>
            </div>

            {/* Search Type */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 focus-within:border-indigo-500/50 transition">
              <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                {t('searchTypeLabel')}
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="Rutas directas" className="bg-[#111114]">{t('directRoutesOption')}</option>
                <option value="Todas las rutas" className="bg-[#111114]">{t('allRoutesOption')}</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/25 transition active:scale-98 flex items-center justify-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>{t('searchButton')}</span>
          </button>
        </form>
      </div>

      {/* Grid: Frequent Routes & Nearby Stops */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Frequent Routes */}
        <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-xl">
          <h4 className="text-base font-bold text-white mb-4 flex items-center justify-between">
            <span>{t('frequentRoutesTitle')}</span>
            <span className="text-xs text-indigo-400 cursor-pointer font-semibold hover:underline" onClick={() => onNavigateToView('search')}>
              Ver todas →
            </span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INITIAL_FREQUENT_ROUTES.map((route) => (
              <div
                key={route.id}
                onClick={() => onNavigateToView('search')}
                className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-4 cursor-pointer transition group"
              >
                <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition flex items-center space-x-1">
                  <span>{route.origin}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{route.destination}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  ({route.frequency}, {route.departureTime})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Stops Preview Widget */}
        <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-white">{t('nearbyStopsTitle')}</h4>
              <button
                onClick={() => onNavigateToView('active-routes')}
                className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-xl font-semibold hover:bg-indigo-500/30 transition flex items-center space-x-1.5"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Ver Mapa</span>
              </button>
            </div>
            {/* Mini map preview banner */}
            <div 
              onClick={() => onNavigateToView('active-routes')}
              className="bg-white/5 rounded-2xl h-28 border border-white/10 overflow-hidden relative cursor-pointer group flex items-center justify-center"
            >
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="relative z-10 bg-[#09090b]/90 px-4 py-2 rounded-xl border border-indigo-500/40 text-xs font-bold text-indigo-400 group-hover:scale-105 transition flex items-center space-x-2 shadow-lg">
                <MapPin className="w-4 h-4 text-indigo-400 animate-bounce" />
                <span>Ubicación GPS: 3 paradas a menos de 500m</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-xs text-slate-300 flex items-center justify-between">
            <span>Parada Próxima: <strong className="text-white">Passeig de Gràcia</strong></span>
            <span className="text-emerald-400 font-bold">2 min walk</span>
          </div>
        </div>
      </div>

      {/* Upcoming Departures list */}
      <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-xl">
        <h4 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
          <Bus className="w-5 h-5 text-indigo-400" />
          <span>{t('upcomingDeparturesTitle')}</span>
        </h4>
        <div className="space-y-3">
          {UPCOMING_DEPARTURES.map((dep) => (
            <div
              key={dep.id}
              onClick={() => onSelectLine(SAMPLE_BUS_LINES[0])}
              className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 hover:border-indigo-500/30 cursor-pointer transition"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-extrabold text-sm flex items-center justify-center">
                  {dep.lineCode}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{dep.destination}</p>
                  <p className="text-xs text-slate-400">Llega en {dep.etaMinutes} min • {dep.platform}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Latest Network Updates */}
      <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-xl">
        <h4 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>{t('networkAlertsTitle')}</span>
        </h4>
        <div className="space-y-3">
          {NETWORK_ALERTS.map((alert) => (
            <div key={alert.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
              <div>
                <h5 className="text-xs font-bold text-white">{alert.title}</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Buy Box matching Hero Card style */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white relative overflow-hidden flex items-center justify-between shadow-2xl">
        <div className="relative z-10 flex items-center space-x-5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-base font-bold mb-1">{t('howToBuyTitle')}</h4>
            <p className="text-xs text-white/80 max-w-md">{t('howToBuyDesc')}</p>
          </div>
        </div>
        <button
          onClick={() => onOpenTicketModal(SAMPLE_BUS_LINES[0])}
          className="relative z-10 bg-white text-indigo-600 hover:bg-slate-100 font-bold px-6 py-2.5 rounded-full text-xs transition shrink-0 shadow-xl"
        >
          Comprar
        </button>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
};
