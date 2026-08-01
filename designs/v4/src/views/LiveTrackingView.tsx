import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Bus, 
  MapPin, 
  Navigation, 
  Layers, 
  Share2, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Info,
  Radio
} from 'lucide-react';
import { DEMO_MAP_IMAGES } from '../data/mockData';

export const LiveTrackingView: React.FC = () => {
  const [busPos, setBusPos] = useState({ x: 160, y: 380 });
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBusPos((prev) => {
        let newY = prev.y - 1.5;
        let newX = prev.x + (Math.random() - 0.5) * 2;
        if (newY < 120) {
          newY = 480;
          newX = 140;
        }
        return { x: newX, y: newY };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-lg flex flex-col">
      {/* Map Simulated Layer */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={DEMO_MAP_IMAGES.liveMap}
          alt="Mapa en vivo Barcelona Coastline"
          className="w-full h-full object-cover opacity-80 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
      </div>

      {/* SVG Animated Route Path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 800">
        <path
          d="M 120 650 Q 180 500 150 400 T 260 200 T 340 80"
          fill="none"
          stroke="#4f46e5"
          strokeWidth="8"
          strokeLinecap="round"
          className="opacity-40"
        />
        <path
          d="M 120 650 Q 180 500 150 400 T 260 200 T 340 80"
          fill="none"
          stroke="#6366f1"
          strokeWidth="6"
          strokeDasharray="12 12"
          strokeLinecap="round"
          className="animate-[dash_20s_linear_infinite]"
        />

        {/* Stops */}
        <circle cx="120" cy="650" r="7" fill="#4f46e5" stroke="#fff" strokeWidth="2" />
        <circle cx="150" cy="400" r="7" fill="#4f46e5" stroke="#fff" strokeWidth="2" />
        <circle cx="260" cy="200" r="7" fill="#4f46e5" stroke="#fff" strokeWidth="2" />
        <circle cx="340" cy="80" r="7" fill="#4f46e5" stroke="#fff" strokeWidth="2" />
      </svg>

      {/* Live Bus Marker */}
      <div
        className="absolute z-30 transition-all duration-1000 ease-in-out -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: `${busPos.x}px`, top: `${busPos.y}px` }}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute w-12 h-12 rounded-full bg-indigo-500/30 animate-ping" />
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
            <Bus className="w-5 h-5" />
          </div>

          <div className="absolute top-12 bg-white px-3 py-1 rounded-lg shadow-md border border-slate-200 whitespace-nowrap">
            <span className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
              Bus L1 - En Vivo
            </span>
          </div>
        </div>
      </div>

      {/* Floating Map Controls */}
      <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
        <button
          onClick={() => setBusPos({ x: 160, y: 380 })}
          className="p-3 bg-white/90 text-slate-800 rounded-lg shadow-md hover:bg-white transition-all backdrop-blur-md border border-slate-200"
          title="Centrar GPS"
        >
          <Navigation className="w-5 h-5 text-indigo-600" />
        </button>
        <button
          className="p-3 bg-white/90 text-slate-800 rounded-lg shadow-md hover:bg-white transition-all backdrop-blur-md border border-slate-200"
          title="Capas del mapa"
        >
          <Layers className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      {/* Bottom Floating Information Overlay Cards */}
      <div className="mt-auto p-4 md:p-6 z-40 space-y-3 max-w-md mx-auto w-full">
        {/* Alert Card Banner */}
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-rose-950/90 border border-rose-800 text-white rounded-xl shadow-xl backdrop-blur-md flex items-start gap-3"
          >
            <div className="p-2 bg-rose-600 rounded-lg shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-rose-200">Línea 1: 12 min de retraso</h4>
              <p className="text-[11px] text-rose-300/80 mt-0.5">
                Tráfico denso cerca de Port de Mar por obras viales.
              </p>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-xs text-rose-300 hover:text-white font-bold"
            >
              ✕
            </button>
          </motion.div>
        )}

        {/* Live Arrival Main Card */}
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-indigo-600 text-white font-bold text-lg rounded-lg flex items-center justify-center shadow-xs">
                L1
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Llegada en 5 mins
                </h3>
                <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  Próxima parada: Port de Mar
                </p>
              </div>
            </div>

            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-md border border-emerald-200 flex items-center gap-1">
              <Clock className="w-3 h-3" /> GPS
            </span>
          </div>

          <div className="h-[1px] bg-slate-100 w-full" />

          <div className="flex gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'Seguimiento de Autobús Plana', url: window.location.href }).catch(() => {});
                } else {
                  alert('Enlace de trayecto copiado al portapapeles');
                }
              }}
              className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartir Trayecto</span>
            </button>

            <button
              onClick={() => alert('Autobús Adaptado con Rampa y WiFi gratis a bordo.')}
              className="p-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              title="Información del vehículo"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
