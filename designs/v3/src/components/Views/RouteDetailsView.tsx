import React, { useState } from 'react';
import { 
  BusLine 
} from '../../types';
import { 
  SAMPLE_BUS_LINES 
} from '../../data/transportData';
import { 
  ArrowLeft, 
  Download, 
  MapPin, 
  CheckCircle, 
  Ticket, 
  CreditCard, 
  Clock, 
  Map, 
  Bookmark,
  Share2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface RouteDetailsViewProps {
  line?: BusLine | null;
  onBack?: () => void;
  onOpenTicketModal: (line: BusLine) => void;
}

export const RouteDetailsView: React.FC<RouteDetailsViewProps> = ({
  line: customLine,
  onBack,
  onOpenTicketModal
}) => {
  const { t } = useLanguage();
  const line = customLine || SAMPLE_BUS_LINES[2]; // Cambrils -> Tarragona
  const [offlineToast, setOfflineToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'table'>('timeline');

  const handleSaveOffline = () => {
    setOfflineToast(true);
    setTimeout(() => {
      setOfflineToast(false);
    }, 3500);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-24 md:pb-8 relative">
      {/* Back Button & Header */}
      <div className="flex items-center justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-300 hover:text-white bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold transition"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400" />
            <span>Volver a la búsqueda</span>
          </button>
        )}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'timeline' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Línea de Tiempo
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'table' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Tabla de Paradas
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-2xl space-y-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Empresa Plana • Línea {line.lineNumber}
          </span>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1">
            {line.origin} → {line.destination}
          </h2>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
          <div>
            <span className="block text-[10px] text-slate-400 uppercase font-semibold">Salida</span>
            <span className="text-sm font-bold text-white">{line.departureTime}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 uppercase font-semibold">Llegada</span>
            <span className="text-sm font-bold text-white">{line.arrivalTime}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 uppercase font-semibold">Duración</span>
            <span className="text-sm font-bold text-indigo-400">{line.duration}</span>
          </div>
        </div>

        {/* Payment options bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/5 gap-2">
          <span className="font-semibold text-slate-400">Opciones de Pago:</span>
          <div className="flex items-center space-x-3 text-xs font-bold text-slate-200">
            <span>💳 ATM Card</span>
            <span>💳 Tarjeta</span>
            <span>💵 Efectivo</span>
          </div>
        </div>

        {/* Top Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleSaveOffline}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs rounded-2xl flex items-center justify-center space-x-2 transition shadow-lg"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>{t('saveOfflineSchedule')}</span>
          </button>

          <button
            onClick={() => onOpenTicketModal(line)}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-2xl shadow-lg shadow-indigo-600/20 transition flex items-center justify-center space-x-2"
          >
            <Ticket className="w-4 h-4" />
            <span>Comprar Billete (€{line.price.toFixed(2)})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Timeline View */}
      {activeTab === 'timeline' ? (
        <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider text-indigo-400">
            Itinerario Completo de Paradas ({line.stops.length})
          </h3>

          <div className="relative pl-6 space-y-6">
            {/* Connecting Vertical Line */}
            <div className="absolute left-[31px] top-3 bottom-3 w-0.5 bg-indigo-500/50"></div>

            {line.stops.map((stop) => (
              <div key={stop.id} className="relative flex items-start space-x-4 group">
                {/* Dot Marker */}
                <div 
                  className={`w-4 h-4 rounded-full border-2 z-10 shrink-0 mt-0.5 transition ${
                    stop.passed 
                      ? 'bg-indigo-500 border-indigo-400 shadow-md shadow-indigo-500/50 ring-4 ring-indigo-500/20' 
                      : 'bg-[#09090b] border-slate-600'
                  }`}
                />

                <div className="flex-1 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 transition flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-indigo-400 mr-2">{stop.time}</span>
                    <span className="text-sm font-bold text-white">{stop.location}</span>
                    <span className="block text-[11px] text-slate-400">{stop.city}</span>
                  </div>
                  <MapPin className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Tab 2: Table View */
        <div className="bg-[#111114] border border-white/5 rounded-3xl p-5 shadow-2xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-slate-400 font-bold uppercase">
                <th className="p-3">Población</th>
                <th className="p-3">Parada</th>
                <th className="p-3">Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {line.stops.map((stop) => (
                <tr key={stop.id} className="hover:bg-white/5 text-slate-200">
                  <td className="p-3 font-semibold text-indigo-400">{stop.city}</td>
                  <td className="p-3 font-bold text-white">{stop.location}</td>
                  <td className="p-3 font-mono text-slate-300">{stop.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Offline Toast Notification */}
      {offlineToast && (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#111114] border border-indigo-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{t('offlineSavedToast')}</span>
        </div>
      )}
    </div>
  );
};
