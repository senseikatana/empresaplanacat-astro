import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bus, Users, AlertTriangle, MapPin, RefreshCw, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ViewMode, BusNode } from '../types';
import { FLEET_MAP_NODES } from '../data/mockData';

interface FleetManagerViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const FleetManagerView: React.FC<FleetManagerViewProps> = ({ onNavigate }) => {
  const [selectedBus, setSelectedBus] = useState<BusNode | null>(FLEET_MAP_NODES[1]);
  const [buses, setBuses] = useState<BusNode[]>(FLEET_MAP_NODES);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="p-4 sm:p-6 max-w-2xl mx-auto space-y-5 text-slate-100 pb-20"
    >
      <div className="flex items-center justify-between pb-1">
        <h2 className="font-extrabold text-xl text-white tracking-tight">Fleet Manager</h2>
        <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>GPS Telemetry Active</span>
        </div>
      </div>

      {/* Metric Cards Top */}
      <div className="grid grid-cols-3 gap-3">
        {/* Active Buses */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
          <span className="text-xs font-semibold text-slate-400 leading-tight">Active Buses</span>
          <div className="flex items-center space-x-2.5 mt-2">
            <Bus className="w-5 h-5 text-emerald-400" />
            <span className="text-2xl font-extrabold text-white">124</span>
          </div>
        </div>

        {/* Drivers on Duty */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
          <span className="text-xs font-semibold text-slate-400 leading-tight">Drivers on Duty</span>
          <div className="flex items-center space-x-2.5 mt-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-extrabold text-white">87</span>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
          <span className="text-xs font-semibold text-slate-400 leading-tight">System Alerts</span>
          <div className="flex items-center space-x-2.5 mt-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span className="text-2xl font-extrabold text-white">3 <span className="text-xs text-rose-400 font-medium">Critical</span></span>
          </div>
        </div>
      </div>

      {/* Interactive Live Map Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-400" /> Mapa de Flota en Tiempo Real
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Actualizado hace 2s</span>
        </div>

        {/* Dark City Map Canvas Container */}
        <div className="relative w-full h-64 bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden shadow-inner">
          {/* Decorative Vector Roads & City Grid Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 40 Q 150 80 300 20 T 600 90" fill="none" stroke="#3b82f6" strokeWidth="4" />
            <path d="M 50 0 Q 120 150 250 260" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <path d="M 180 0 L 180 260" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 0 160 L 600 160" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 320 0 Q 380 120 550 260" fill="none" stroke="#0284c7" strokeWidth="3" />
          </svg>

          {/* Interactive Bus Node Markers */}
          {buses.map((bus) => {
            const isSelected = selectedBus?.id === bus.id;
            const isWarning = bus.status === 'warning' || bus.status === 'delayed';

            return (
              <button
                key={bus.id}
                onClick={() => setSelectedBus(bus)}
                style={{ top: bus.top, left: bus.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-lg transition-transform hover:scale-125 z-10 ${
                  isWarning
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 animate-pulse'
                    : 'bg-blue-600 text-white border border-blue-400'
                } ${isSelected ? 'scale-125 ring-2 ring-white z-20' : ''}`}
              >
                <Bus className="w-3 h-3" />
                <span>{bus.label}</span>
              </button>
            );
          })}

          {/* Bus details tooltip box overlay */}
          {selectedBus && (
            <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-2xl p-3 text-xs text-white flex items-center justify-between shadow-xl">
              <div>
                <span className="font-bold text-blue-400 text-sm">{selectedBus.label}</span> ({selectedBus.route})
                <p className="text-[10px] text-slate-300 mt-0.5">
                  Velocidad: 42 km/h • Capacidad: <strong className={selectedBus.capacityPct > 90 ? 'text-amber-400' : 'text-emerald-400'}>{selectedBus.capacityPct}%</strong>
                </p>
              </div>
              <button
                onClick={() => onNavigate('driver-profile')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition shadow-sm"
              >
                Ver Conductor
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Network Delays & Capacity Warnings List */}
      <div className="space-y-2.5">
        <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 text-center font-bold text-xs text-slate-300">
          Network Delays & Capacity Warnings
        </div>

        <div className="space-y-2.5">
          {/* Critical Delay Alert */}
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3.5 text-xs text-rose-200">
            <span className="font-bold text-rose-300 block mb-0.5">
              Route 45 (Girona - Aeroport) - Heavy Traffic, +12m delay.
            </span>
            <span className="text-[10px] text-rose-300/70">10:28 AM • Notificado a pasaje vía app</span>
          </div>

          {/* Capacity Alert */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5 text-xs text-amber-200">
            <span className="font-bold text-amber-300 block mb-0.5">
              Bus 102 (Route 22) - 95% Capacity, approaching limit.
            </span>
            <span className="text-[10px] text-amber-300/70">10:25 AM • Carlos Gomez (Conductor)</span>
          </div>

          {/* Incident Delay Alert */}
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3.5 text-xs text-rose-200">
            <span className="font-bold text-rose-300 block mb-0.5">
              Route 3 (Barcelona - Tarragona) - Incident, +25m delay.
            </span>
            <span className="text-[10px] text-rose-300/70">10:20 AM • Unidad de reemplazo enviada</span>
          </div>

          {/* Capacity Notice */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5 text-xs text-amber-200">
            <span className="font-bold text-amber-300 block mb-0.5">
              Bus 88 (Route 14) - 90% Capacity.
            </span>
            <span className="text-[10px] text-amber-300/70">10:15 AM</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
