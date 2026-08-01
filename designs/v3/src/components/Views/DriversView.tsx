import React from 'react';
import { DRIVERS_LIST } from '../../data/transportData';
import { Star, ShieldCheck, Award, MessageSquare } from 'lucide-react';

export const DriversView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn pb-20 md:pb-8">
      <div className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-1">Equipo de Conductores Profesionales</h2>
        <p className="text-xs text-slate-400">
          Conductores certificados con formación continua en conducción eficiente y seguridad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DRIVERS_LIST.map((driver) => (
          <div key={driver.id} className="bg-[#111114] border border-white/5 rounded-3xl p-6 shadow-xl text-center space-y-4">
            <img
              src={driver.photo}
              alt={driver.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-xl mx-auto"
            />
            <h3 className="text-lg font-bold text-white">{driver.name}</h3>
            
            <div className="flex items-center justify-center space-x-1 text-amber-400 font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{driver.rating} / 5.0</span>
            </div>

            <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Viajes Realizados:</span>
                <span className="font-bold text-white">{driver.tripsCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Autobús Asignado:</span>
                <span className="font-bold text-indigo-400">#{driver.assignedBus}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Idiomas Atendidos
              </span>
              <div className="flex justify-center space-x-1.5">
                {driver.languages.map((lang) => (
                  <span key={lang} className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                    {lang}
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
