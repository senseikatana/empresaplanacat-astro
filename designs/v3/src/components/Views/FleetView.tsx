import React from 'react';
import { BUS_FLEET } from '../../data/transportData';
import { Bus, Wifi, ShieldCheck, Zap, Users, CheckCircle } from 'lucide-react';

export const FleetView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn pb-20 md:pb-8">
      <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-1">Flota de Autobuses Empresa Plana</h2>
        <p className="text-xs text-slate-400">
          Vehículos ecológicos Euro VI con conectividad WiFi 5G y máxima accesibilidad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BUS_FLEET.map((bus) => (
          <div key={bus.id} className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 font-black text-lg flex items-center justify-center">
                  #{bus.busNumber}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{bus.model}</h3>
                  <p className="text-xs text-slate-400">Matrícula: {bus.licensePlate}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                bus.status === 'In Service' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {bus.status}
              </span>
            </div>

            {bus.currentRoute && (
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-xs text-indigo-300 font-semibold flex items-center space-x-2">
                <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>En ruta: {bus.currentRoute}</span>
              </div>
            )}

            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Características y Equipamiento ({bus.capacity} Plazas)
              </span>
              <div className="flex flex-wrap gap-2">
                {bus.features.map((ft, i) => (
                  <span key={i} className="bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1 rounded-xl flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-indigo-400" />
                    <span>{ft}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
