import React from 'react';
import { NETWORK_ALERTS } from '../../data/transportData';
import { Bell, AlertTriangle, Info, ShieldAlert } from 'lucide-react';

export const AlertsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn pb-20 md:pb-8">
      <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-xl flex items-center space-x-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
          <Bell className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Avisos e Incidencias en Tiempo Real</h2>
          <p className="text-xs text-slate-400">Canal oficial de información sobre el estado de la red de autobuses.</p>
        </div>
      </div>

      <div className="space-y-4">
        {NETWORK_ALERTS.map((alert) => (
          <div key={alert.id} className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/30">
                {alert.date}
              </span>
              <span className="text-xs font-semibold text-slate-400">Estado: Activo</span>
            </div>
            <h3 className="text-base font-bold text-white">{alert.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{alert.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
