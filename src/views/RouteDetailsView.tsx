import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bus, MapPin, Download, CheckCircle2, Share2, ArrowLeft } from 'lucide-react';
import { ViewMode, BusRoute } from '../types';
import { CAMBRILS_ROUTE_STOPS } from '../data/mockData';

interface RouteDetailsViewProps {
  onNavigate: (view: ViewMode) => void;
  selectedRoute?: BusRoute | null;
}

export const RouteDetailsView: React.FC<RouteDetailsViewProps> = ({
  onNavigate,
  selectedRoute
}) => {
  const [toastVisible, setToastVisible] = useState(true);

  const routeName = selectedRoute 
    ? `${selectedRoute.origin} to ${selectedRoute.destination}` 
    : 'Cambrils to Tarragona';
  const depTime = selectedRoute?.departureTime || '06:50';
  const arrTime = selectedRoute?.arrivalTime || '07:35';
  const duration = selectedRoute?.duration || '45m';

  const handleDownloadPdf = () => {
    alert(`Descargando PDF de horarios oficiales para la ruta: ${routeName}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="p-4 sm:p-6 max-w-2xl mx-auto space-y-5 text-slate-100 pb-24 relative"
    >
      {/* Route Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-white leading-snug">{routeName}</h2>
              <div className="flex items-center space-x-2 text-xs text-slate-300 mt-0.5">
                <span className="font-bold text-blue-400">{depTime} → {arrTime}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Download Schedule PDF Button */}
        <button
          onClick={handleDownloadPdf}
          className="w-full mt-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download Schedule PDF</span>
        </button>
      </div>

      {/* Stops Timeline List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2 shadow-sm">
        <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-4 px-1">
          Paradas y Tiempos de Paso
        </h3>

        <div className="relative pl-6 space-y-4 border-l-2 border-slate-700 ml-3 py-1">
          {CAMBRILS_ROUTE_STOPS.map((stop) => (
            <div key={stop.id} className="relative group">
              {/* Timeline Pin Indicator */}
              <div
                className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-slate-900 ${
                  stop.isMainStation
                    ? 'border-blue-400 bg-blue-600 text-white'
                    : 'border-slate-600 bg-slate-800'
                }`}
              >
                <MapPin className="w-2.5 h-2.5 text-white" />
              </div>

              <div className="flex items-start justify-between text-xs">
                <div className="pr-2">
                  <p className={`font-semibold ${stop.isMainStation ? 'text-white font-bold' : 'text-slate-300'}`}>
                    {stop.name}
                  </p>
                  {stop.isMainStation && (
                    <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 mt-1 inline-block font-bold">
                      Estación Principal
                    </span>
                  )}
                </div>
                <span className="font-bold text-blue-400 whitespace-nowrap">{stop.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action to proceed to Checkout */}
      <div className="pt-2">
        <button
          onClick={() => onNavigate('checkout')}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-2xl transition shadow-md shadow-blue-600/20 text-center"
        >
          Proceder a Reserva / Checkout
        </button>
      </div>

      {/* Green Toast notification */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-20 left-4 right-4 max-w-md mx-auto bg-slate-900 border border-emerald-500/50 text-slate-100 rounded-2xl p-3.5 shadow-2xl flex items-center justify-between backdrop-blur-md z-40"
          >
            <div className="flex items-center space-x-2.5 text-xs font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Horario guardado correctamente</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setToastVisible(false)}
                className="text-xs font-bold text-emerald-400 hover:text-white px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
              >
                Ver
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
