import React, { useState } from 'react';
import { 
  BusMap 
} from '../Map/BusMap';
import { 
  Bus, 
  Wifi, 
  ShieldCheck, 
  Star, 
  Phone, 
  CreditCard, 
  DollarSign, 
  Ticket, 
  Clock, 
  Navigation,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SAMPLE_BUS_LINES } from '../../data/transportData';
import { BusLine } from '../../types';

interface ActiveRoutesViewProps {
  onOpenTicketModal: (line: BusLine) => void;
}

export const ActiveRoutesView: React.FC<ActiveRoutesViewProps> = ({ onOpenTicketModal }) => {
  const { t } = useLanguage();
  const [busProgress, setBusProgress] = useState(62);
  const activeLine = SAMPLE_BUS_LINES[0];

  return (
    <div className="space-y-6 animate-fadeIn pb-20 md:pb-8">
      {/* Header Route Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#111114] border border-white/5 p-5 rounded-3xl shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Live Tracking • Empresa Plana
          </span>
          <h2 className="text-xl md:text-2xl font-black text-white">
            {activeLine.origin} a {activeLine.destination}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setBusProgress((prev) => (prev + 10) % 100)}
            className="bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            <span>Simular Movimiento GPS</span>
          </button>
        </div>
      </div>

      {/* Main OpenStreetMap Map Container */}
      <div className="w-full h-[420px] md:h-[480px]">
        <BusMap busProgress={busProgress} isDarkMode={true} />
      </div>

      {/* Buy Digital Ticket CTA Button */}
      <div className="flex justify-center -mt-10 relative z-30 px-4">
        <button
          onClick={() => onOpenTicketModal(activeLine)}
          className="w-full max-w-md py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-2xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:scale-98 flex items-center justify-center space-x-3 border border-indigo-400/30"
        >
          <Ticket className="w-6 h-6" />
          <span>{t('buyDigitalTicket')}</span>
        </button>
      </div>

      {/* Live Bus Tracking Details Card */}
      <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          {/* Driver Info */}
          <div className="flex items-center space-x-4">
            <img
              src={activeLine.driverPhoto}
              alt={activeLine.driverName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
            />
            <div>
              <h3 className="text-lg font-bold text-white">Conductor: {activeLine.driverName}</h3>
              <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold mt-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-slate-200 ml-1.5">{activeLine.driverRating}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-300 mt-2">
                <span className="flex items-center space-x-1">
                  <Wifi className="w-3.5 h-3.5 text-indigo-400" />
                  <span>WiFi Disponible</span>
                </span>
                <span className="flex items-center space-x-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>GPS Verificado</span>
                </span>
              </div>
            </div>
          </div>

          {/* Payment Options Badges */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t('paymentOptionsTitle')}
            </span>
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-slate-300 mt-1 font-semibold">Debit</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-bold text-xs">
                  PayPal
                </div>
                <span className="text-[10px] text-slate-300 mt-1 font-semibold">PayPal</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-bold text-xs">
                  Bizum
                </div>
                <span className="text-[10px] text-slate-300 mt-1 font-semibold">Bizum</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bus Progress Tracker */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-xl font-black text-white">
              {t('bus5MinsAway')}
            </span>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/30">
              ETA: 11:40 AM
            </span>
          </div>

          {/* Custom Slider / Progress Bar */}
          <div className="relative pt-2">
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 rounded-full transition-all duration-300"
                style={{ width: `${busProgress}%` }}
              ></div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={busProgress}
              onChange={(e) => setBusProgress(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
            />
          </div>

          <div className="flex justify-between text-xs font-bold text-slate-300 pt-1">
            <span>Sitges Centro</span>
            <span>Aeroport Barcelona</span>
          </div>
        </div>

        {/* Station Contact CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button 
            onClick={() => alert('Llamando a la estación central de Tarragona: +34 977 21 44 75')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-400 font-bold text-xs border border-indigo-500/30 transition flex items-center justify-center space-x-2"
          >
            <Phone className="w-4 h-4" />
            <span>{t('contactStation')}</span>
          </button>
          <div className="text-xs text-slate-400">
            Autobús Nº: <strong className="text-white">{activeLine.busNumber}</strong> • Conductor: <strong className="text-white">{activeLine.driverName}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
