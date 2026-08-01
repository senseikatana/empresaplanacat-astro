import React, { useState } from 'react';
import { 
  BusLine 
} from '../../types';
import { 
  SAMPLE_BUS_LINES 
} from '../../data/transportData';
import { 
  ArrowRight, 
  Clock, 
  Euro, 
  Info, 
  Ticket, 
  ChevronRight, 
  SlidersHorizontal,
  Check,
  AlertCircle,
  X
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SearchRoutesViewProps {
  onSelectLine: (line: BusLine) => void;
  onOpenTicketModal: (line: BusLine) => void;
}

export const SearchRoutesView: React.FC<SearchRoutesViewProps> = ({
  onSelectLine,
  onOpenTicketModal
}) => {
  const { t } = useLanguage();
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [filterType, setFilterType] = useState<'ALL' | 'EXPRESS' | 'REGULAR'>('ALL');

  const filteredLines = SAMPLE_BUS_LINES.filter((line) => {
    if (filterType === 'ALL') return true;
    return line.type === filterType;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-20 md:pb-8 relative">
      {/* Route Header */}
      <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            Tarragona → Barcelona
          </p>
          <h2 className="text-2xl font-black text-white">Horarios para Hoy</h2>
        </div>

        {/* Highlight Cards: FASTEST & BEST PRICE */}
        <div className="flex space-x-3">
          <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">FASTEST</span>
            <span className="text-base font-black text-white">1h 15m</span>
          </div>
          <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
            <span className="block text-[10px] font-bold text-slate-400 uppercase">BEST PRICE</span>
            <span className="text-base font-black text-emerald-400">€9.45</span>
          </div>
        </div>
      </div>

      {/* Notice Bar */}
      <div className="bg-white/5 border border-white/10 text-slate-200 font-medium px-4 py-3 rounded-2xl text-xs md:text-sm text-center">
        Tickets for these services can be purchased online or at station/on-board.
      </div>

      {/* Filters Bar */}
      <div className="flex items-center justify-between bg-[#111114] p-2 rounded-2xl border border-white/5">
        <div className="flex space-x-2">
          {(['ALL', 'EXPRESS', 'REGULAR'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                filterType === type 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {type === 'ALL' ? 'Todos' : type}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-semibold pr-2">
          {filteredLines.length} resultados
        </span>
      </div>

      {/* Schedule Results List */}
      <div className="space-y-4">
        {filteredLines.map((line, idx) => (
          <div
            key={line.id}
            className="bg-[#111114] border border-white/5 hover:border-indigo-500/40 rounded-3xl p-6 shadow-xl transition group relative"
          >
            {/* Badge for Next Bus */}
            {idx === 0 && (
              <span className="absolute -top-2.5 right-6 bg-indigo-500 text-white font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-lg">
                PRÓXIMO AUTOBÚS
              </span>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Type & Delay Status */}
              <div className="flex items-center space-x-3">
                <span className="bg-white/5 text-white font-extrabold text-xs px-3 py-1 rounded-xl border border-white/10">
                  {line.type}
                </span>
                {line.status === 'Delayed' ? (
                  <span className="text-xs font-bold text-red-400 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{line.delayMinutes} min delay</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>On Time</span>
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="text-right">
                <span className="text-2xl font-black text-indigo-400">€{line.price.toFixed(2)}</span>
                <span className="block text-[10px] text-slate-400">Tickets at Station or Online</span>
              </div>
            </div>

            {/* Time & Stops Line */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 py-4 border-y border-white/5 items-center">
              <div>
                <span className="text-xl font-extrabold text-white">{line.departureTime}</span>
                <span className="block text-xs font-semibold text-slate-400">{line.origin}</span>
              </div>

              <div className="text-center">
                <span className="text-xs font-bold text-slate-300">{line.duration}</span>
                <div className="flex items-center justify-center space-x-2 my-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <div className="h-0.5 flex-1 bg-white/10 max-w-[120px]"></div>
                  <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold">
                  {line.stopsCount === 0 ? 'Directo' : `${line.stopsCount} paradas`}
                </span>
              </div>

              <div className="text-right md:text-right">
                <span className="text-xl font-extrabold text-white">{line.arrivalTime}</span>
                <span className="block text-xs font-semibold text-slate-400">{line.destination}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => onSelectLine(line)}
                className="w-full sm:w-auto text-xs font-bold text-indigo-400 hover:underline flex items-center justify-center space-x-1"
              >
                <span>Ver mapa de paradas e itinerario completo</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenTicketModal(line)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition flex items-center justify-center space-x-1.5"
              >
                <Ticket className="w-4 h-4" />
                <span>Comprar Billete Digital</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-16 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 bg-[#111114]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl space-y-3">
          <p className="text-xs text-slate-300 leading-relaxed">
            El sitio web utiliza cookies propias y de terceros con fines analíticos y técnicos para mejorar la experiencia de navegación.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => setShowCookieBanner(false)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition"
            >
              Aceptar cookies
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowCookieBanner(false)}
                className="py-1.5 bg-red-600/80 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition"
              >
                Denegar
              </button>
              <button
                onClick={() => setShowCookieBanner(false)}
                className="py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs rounded-xl border border-white/10 transition"
              >
                Configuración
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
