import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Bus, 
  Share2, 
  Ticket,
  ChevronRight,
  Globe
} from 'lucide-react';
import { BusRoute } from '../types';
import { useAuth } from '../context/AuthContext';

interface RouteDetailsViewProps {
  route: BusRoute;
  onBack: () => void;
  onBook: (route: BusRoute) => void;
}

export const RouteDetailsView: React.FC<RouteDetailsViewProps> = ({
  route,
  onBack,
  onBook
}) => {
  const { user, toggleSavedOfflineRoute } = useAuth();
  const [showToast, setShowToast] = useState(false);

  const isSaved = user?.savedOfflineRoutes.includes(route.id) || false;

  const handleToggleOffline = () => {
    toggleSavedOfflineRoute(route.id);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleDownloadPdf = () => {
    // Generate a downloadable text file summary simulating PDF download
    const content = `EMPRESA PLANA - HORARIO OFICIAL
------------------------------------------
Línea: ${route.lineCode}
Trayecto: ${route.origin} -> ${route.destination}
Salida: ${route.departureTime} | Llegada: ${route.arrivalTime} (${route.duration})
Precio: €${route.price.toFixed(2)}

PARADAS Y HORARIOS:
${route.stops.map(s => `- ${s.time} | ${s.name}`).join('\n')}

Gracias por viajar con Empresa Plana.
Contacto: info@empresaplana.cat | www.empresaplana.cat`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Horario_${route.origin}_${route.destination}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center justify-between gap-4 w-[90%] max-w-md"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs font-semibold">
                {isSaved ? 'Horario guardado correctamente para consulta offline' : 'Eliminado de tus guardados offline'}
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="text-xs font-bold text-[#EB8E02] hover:underline"
            >
              Cerrar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-600" />
            <span>Volver</span>
          </button>

          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold rounded-md">
            {route.lineCode}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {route.origin} a {route.destination}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold mt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                {route.departureTime} → {route.arrivalTime}
              </span>
              <span>•</span>
              <span>Duración: {route.duration}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-bold text-slate-900">
              €{route.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons: Save Offline & Download PDF */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleToggleOffline}
            className={`py-2.5 px-4 rounded-lg text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
              isSaved
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{isSaved ? 'Guardado en Modo Offline' : 'Guardar Horario Offline'}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Horario (PDF)</span>
          </button>
        </div>
      </div>

      {/* Stops Timeline */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Itinerario y Paradas ({route.stops.length} Estaciones)
        </h3>

        <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-indigo-100">
          {route.stops.map((stop) => {
            return (
              <div key={stop.id} className="relative flex items-start justify-between group">
                {/* Stop Bullet Indicator */}
                <div
                  className={`absolute -left-[29px] top-1 w-4 h-4 rounded-full border-2 border-white ${
                    stop.passed
                      ? 'bg-indigo-600 ring-2 ring-indigo-200'
                      : stop.isTerminal
                      ? 'bg-slate-900 ring-2 ring-slate-200'
                      : 'bg-slate-300'
                  }`}
                />

                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {stop.name}
                    </span>
                    {stop.isTerminal && (
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 text-[9px] font-bold rounded-md">
                        Terminal
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Parada oficial Empresa Plana
                  </p>
                </div>

                <span className="text-xs font-bold text-slate-900 bg-slate-50 px-2.5 py-1 rounded-md shrink-0 border border-slate-100">
                  {stop.time}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Floating Bottom Ticket Buying Bar */}
      <div className="fixed bottom-16 lg:bottom-4 left-0 right-0 z-30 px-4">
        <div className="max-w-md mx-auto bg-slate-900 text-white p-4 rounded-xl shadow-xl border border-slate-800 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">Billete de autobús</span>
            <span className="text-lg font-bold text-white">€{route.price.toFixed(2)} / pers</span>
          </div>

          <button
            onClick={() => onBook(route)}
            className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-xs flex items-center gap-2 transition-colors active:scale-95"
          >
            <Ticket className="w-4 h-4" />
            <span>Comprar Billete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
