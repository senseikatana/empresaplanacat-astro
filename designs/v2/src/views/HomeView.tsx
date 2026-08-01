import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Calendar, AlertCircle, ArrowRight, Bus, Clock } from 'lucide-react';
import { ViewMode } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HomeViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [origin, setOrigin] = useState('Girona');
  const [destination, setDestination] = useState('Aeroport');
  const [date, setDate] = useState('2023-10-26');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('search-results');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="p-4 sm:p-6 max-w-2xl mx-auto space-y-5 text-white"
    >
      {/* Header search bar card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex items-center space-x-2.5 border-b border-slate-800 pb-3.5">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Search className="w-5 h-5" />
            </div>
            <h2 className="font-extrabold text-lg text-white">
              {t('search_schedules')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> Origen
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700/80 rounded-xl p-3 text-sm text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="Girona">Girona</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Cambrils">Cambrils</option>
                <option value="Salou">Salou</option>
                <option value="Reus">Reus</option>
                <option value="Prante">Prante</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Destino
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700/80 rounded-xl p-3 text-sm text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="Aeroport">Aeroport (GRO/BCN)</option>
                <option value="Tarragona">Tarragona Central</option>
                <option value="Barcelona">Barcelona Estació</option>
                <option value="Cambrils">Cambrils Estació</option>
                <option value="Girona">Girona Centro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Fecha del viaje
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700/80 rounded-xl p-3 text-sm text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2 active:scale-[0.99]"
          >
            <span>Buscar Horarios y Disponibilidad</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Grid: My Frequent Routes & Latest Network Updates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: My Frequent Routes */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="font-extrabold text-sm text-white pb-2.5 border-b border-slate-800 mb-3">
              {t('frequent_routes')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li
                onClick={() => onNavigate('search-results')}
                className="p-2.5 bg-slate-800/60 hover:bg-slate-800 rounded-2xl border border-slate-700/60 transition cursor-pointer flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-blue-400 block">Route 45</span>
                  <span className="text-slate-300">Girona - Aeroport</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </li>
              <li
                onClick={() => onNavigate('route-details')}
                className="p-2.5 bg-slate-800/60 hover:bg-slate-800 rounded-2xl border border-slate-700/60 transition cursor-pointer flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-blue-400 block">Route 3</span>
                  <span className="text-slate-300">Barcelona - Tarragona</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </li>
              <li
                onClick={() => onNavigate('route-details')}
                className="p-2.5 bg-slate-800/60 hover:bg-slate-800 rounded-2xl border border-slate-700/60 transition cursor-pointer flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-blue-400 block">Route 12A</span>
                  <span className="text-slate-300">Cambrils - Tarragona</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Latest Network Updates */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="font-extrabold text-sm text-white pb-2.5 border-b border-slate-800 mb-3">
              {t('network_updates')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-200">
                <span className="font-bold block text-amber-300">Tráfico denso</span>
                Retraso estimado +12m en la Route 45 por obras en la A-7.
              </li>
              <li className="p-2.5 bg-slate-800/60 border border-slate-700/60 rounded-2xl text-slate-300">
                <span className="font-bold block text-blue-400">Autobús 102</span>
                Aforo aproximándose al límite en horario punta.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-4 flex items-start space-x-3 text-amber-200">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm font-medium leading-relaxed">
          {t('no_online_booking')}
        </div>
      </div>

      {/* Quick Access to Employee/Driver profile button */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => onNavigate('driver-profile')}
          className="flex-1 p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl text-xs font-bold text-slate-200 flex items-center justify-center space-x-2 transition shadow-sm"
        >
          <Bus className="w-4 h-4 text-blue-400" />
          <span>Ver Perfil del Conductor (Carlos Gomez)</span>
        </button>

        <button
          onClick={() => onNavigate('fleet-manager')}
          className="flex-1 p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl text-xs font-bold text-slate-200 flex items-center justify-center space-x-2 transition shadow-sm"
        >
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Panel Gestor de Flota (Mapa Vivo)</span>
        </button>
      </div>
    </motion.div>
  );
};
